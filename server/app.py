"""Lokaler Thai-Server: Ausspracheanalyse (Laute + Töne), Sprachausgabe auf Abruf und Auslieferung der App über HTTPS.

Pipeline der Analyse:
  1. Aufnahme (WAV, 16 kHz) vom Handy
  2. wav2vec2 (Thai, CTC auf Zeichenebene) → was wurde *tatsächlich* gesagt (ohne Wörterbuch-Autokorrektur)
  3. Forced Alignment des Zieltextes → Zeitspanne jedes Zeichens + Wahrscheinlichkeit (GOP-artiger Score)
  4. Silben (PyThaiNLP) + erwarteter Ton je Silbe (Thai-Tonregeln)
  5. Tonhöhenverlauf (Praat) je Silbe → Vergleich mit Ton-Schablonen → erkannter Ton
"""
from __future__ import annotations

import hashlib
import io
import os
import pathlib
import time

import numpy as np
import parselmouth
import soundfile as sf
import torch
import torchaudio.functional as AF
from fastapi import FastAPI, File, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from pythainlp.tokenize import syllable_tokenize
from pythainlp.util import tone_detector
from transformers import AutoModelForCTC, AutoProcessor

import explain

ROOT = pathlib.Path(__file__).resolve().parent
DIST = ROOT.parent / "dist"
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
SR = 16000

ASR_MODEL = os.environ.get("THAI_ASR_MODEL", "airesearch/wav2vec2-large-xlsr-53-th")

print(f"[thai] Gerät: {DEVICE} – lade {ASR_MODEL} …")
processor = AutoProcessor.from_pretrained(ASR_MODEL)
# Halbe Genauigkeit direkt auf die GPU laden – spart RAM und VRAM
asr = AutoModelForCTC.from_pretrained(ASR_MODEL, dtype=torch.float16 if DEVICE == "cuda" else torch.float32, low_cpu_mem_usage=True).to(DEVICE).eval()
vocab: dict[str, int] = processor.tokenizer.get_vocab()
BLANK = processor.tokenizer.pad_token_id
id2ch = {i: c for c, i in vocab.items()}

# ---------------------------------------------------------------- Audio
def load_audio(data: bytes) -> np.ndarray:
    wav, sr = sf.read(io.BytesIO(data), dtype="float32", always_2d=True)
    wav = wav.mean(axis=1)
    if sr != SR:
        wav = AF.resample(torch.from_numpy(wav), sr, SR).numpy()
    # Stille am Anfang/Ende abschneiden
    frame = 320
    rms = np.sqrt(np.convolve(wav**2, np.ones(frame) / frame, mode="same"))
    thr = max(0.01, rms.max() * 0.06)
    idx = np.where(rms > thr)[0]
    if len(idx):
        wav = wav[max(0, idx[0] - 2400) : idx[-1] + 2400]
    peak = np.abs(wav).max()
    return wav / peak * 0.9 if peak > 0 else wav


# ---------------------------------------------------------------- Töne
TONE_DE = {"m": "mittel", "l": "tief", "f": "fallend", "h": "hoch", "r": "steigend"}
# Typische Verläufe (Halbtöne relativ zur Sprecher-Mitte, 5 Stützpunkte) nach Abramson / Morén & Zsiga
TEMPLATES = {
    "m": np.array([0.3, 0.1, -0.2, -0.5, -0.8]),
    "l": np.array([-0.8, -1.8, -2.6, -3.2, -3.6]),
    "f": np.array([1.2, 2.2, 1.8, 0.0, -2.8]),
    "h": np.array([0.4, 0.6, 1.2, 2.2, 3.2]),
    "r": np.array([-1.0, -2.4, -2.4, -0.8, 2.2]),
}


def expected_tone(syl: str) -> str | None:
    try:
        t = tone_detector(syl)
        return t if t in TONE_DE else None
    except Exception:
        return None


def pitch_track(wav: np.ndarray):
    snd = parselmouth.Sound(wav.astype(np.float64), sampling_frequency=SR)
    # Zwei Durchgänge: grob den Sprecherbereich schätzen, dann eng begrenzt neu messen (vermeidet Oktavsprünge)
    p = snd.to_pitch_ac(time_step=0.01, pitch_floor=70, pitch_ceiling=500)
    f0 = p.selected_array["frequency"]
    v = f0[f0 > 0]
    if len(v) > 10:
        med = float(np.median(v))
        p = snd.to_pitch_ac(time_step=0.01, pitch_floor=max(60, med * 0.6), pitch_ceiling=min(600, med * 1.8), octave_jump_cost=0.6, voicing_threshold=0.5)
        f0 = p.selected_array["frequency"]
    # Medianfilter gegen Ausreißer (nur stimmhafte Bereiche)
    out = f0.copy()
    for i in range(len(f0)):
        if f0[i] > 0:
            win = f0[max(0, i - 2) : i + 3]
            win = win[win > 0]
            out[i] = np.median(win)
    return p.xs(), out


def classify(contour: np.ndarray, spread: float):
    """contour: 5 Werte in Halbtönen relativ zur Sprecher-Mitte."""
    scores = {}
    for t, tpl in TEMPLATES.items():
        shape = np.mean((contour - contour.mean() - (tpl - tpl.mean())) ** 2)  # Form
        level = (contour.mean() - tpl.mean()) ** 2  # Lage
        scores[t] = shape + level * (0.5 if spread > 2 else 0.15)
    best = min(scores, key=scores.get)
    vals = np.array(list(scores.values()))
    probs = np.exp(-vals / 2) / np.exp(-vals / 2).sum()
    conf = float(probs[list(scores).index(best)])
    return best, conf


# ---------------------------------------------------------------- Analyse
def measure(wav: np.ndarray, target: str):
    """Erkennung, Alignment und Tonhöhenverlauf je Silbe für eine Aufnahme."""
    inputs = processor(wav, sampling_rate=SR, return_tensors="pt").input_values.to(DEVICE, dtype=asr.dtype)
    with torch.inference_mode():
        logits = asr(inputs).logits[0].float()
    logp = torch.log_softmax(logits, dim=-1)
    frames = logp.shape[0]
    sec_per_frame = len(wav) / SR / frames

    # Freie Erkennung (greedy CTC) – zeigt, was tatsächlich gesagt wurde
    ids = logp.argmax(-1).tolist()
    out, prev = [], None
    for i in ids:
        if i != prev and i != BLANK:
            out.append(id2ch.get(i, ""))
        prev = i
    recognized = "".join(out).replace("|", " ").strip()

    clean = "".join(ch for ch in target if not ch.isspace() and ch not in "?!.,ๆฯ")
    tokens = [(k, ch, vocab[ch]) for k, ch in enumerate(clean) if ch in vocab]
    syllables = [x for x in syllable_tokenize(clean) if x.strip()]

    # Forced Alignment des Zieltextes
    char_score = {k: 0.0 for k in range(len(clean))}
    char_span: dict[int, tuple[int, int]] = {}
    if tokens and frames >= len(tokens):
        targets = torch.tensor([[t[2] for t in tokens]], dtype=torch.int32, device=logp.device)
        ali, sc = AF.forced_align(logp[None], targets, blank=BLANK)
        for (k, _, _), sp in zip(tokens, AF.merge_tokens(ali[0], sc[0].exp())):
            char_score[k] = float(sp.score)
            char_span[k] = (sp.start, sp.end)

    times, f0 = pitch_track(wav)
    voiced = f0[f0 > 0]
    if len(voiced) > 5:
        semis = np.where(f0 > 0, 12 * np.log2(np.maximum(f0, 1)) - np.median(12 * np.log2(voiced)), np.nan)
    else:
        semis = np.full_like(f0, np.nan)
    voiced_idx = np.where(~np.isnan(semis))[0]

    bounds, pos = [], 0
    for x in syllables:
        ks = list(range(pos, pos + len(x)))
        pos += len(x)
        fr = [char_span[k] for k in ks if k in char_span]
        bounds.append((x, ks, (min(a for a, _ in fr), max(b for _, b in fr)) if fr else None))

    res = []
    for j, (x, ks, span) in enumerate(bounds):
        e = {"text": x, "pron": round(float(np.mean([char_score[k] for k in ks])) if ks else 0.0, 3), "expected": expected_tone(x),
             "detected": None, "conf": 0.0, "contour": None, "ref": None, "sim": None, "start": None, "end": None}
        if len(bounds) == 1 and len(voiced_idx) >= 4:
            a, b = times[voiced_idx[0]], times[voiced_idx[-1]]  # Einzelsilbe: gesamter stimmhafter Bereich
        elif span:
            nxt = next((bb[2][0] for bb in bounds[j + 1 :] if bb[2]), None)
            a = span[0] * sec_per_frame
            b = (nxt * sec_per_frame) if nxt else min(len(wav) / SR, (span[1] + 12) * sec_per_frame)
        else:
            res.append(e)
            continue
        e["start"], e["end"] = round(float(a), 3), round(float(b), 3)
        pts = semis[(times >= a) & (times <= b) & ~np.isnan(semis)]
        if len(pts) >= 4:
            cut = max(1, len(pts) // 8)
            core = pts[cut : len(pts) - cut] if len(pts) > 8 else pts
            core = np.convolve(core, np.ones(3) / 3, mode="valid") if len(core) > 5 else core
            e["contour"] = [round(float(v), 2) for v in np.interp(np.linspace(0, 1, 20), np.linspace(0, 1, len(core)), core)]
        res.append(e)
    # Tonzeichen zählen nicht zur Laut-Bewertung (die Erkennung lässt sie oft weg; Töne werden separat betrachtet)
    strip = lambda x: "".join(ch for ch in x if ch not in "่้๊๋")
    cer = levenshtein(strip(recognized.replace(" ", "")), strip(clean)) / max(1, len(strip(clean)))
    return recognized, clean, char_score, res, cer


def contour_similarity(u: list[float], r: list[float]) -> float:
    """Ähnlichkeit zweier Tonverläufe (Form + Lage), 0..1."""
    u, r = np.array(u), np.array(r)
    du, dr = u - u.mean(), r - r.mean()
    shape = float(np.sqrt(np.mean((du - dr) ** 2)))
    level = abs(float(u.mean() - r.mean()))
    return float(np.exp(-(shape**2 + 0.25 * level**2) / 4))


# ---------------------------------------------------------------- Referenz-Aufnahmen (Muttersprachler/TTS)
REF_DIRS = [ROOT / "audio", ROOT.parent / "public" / "audio", DIST / "audio"]  # ROOT/audio: im Hugging Face Space
_ref_cache: dict[str, list] = {}


def reference(target: str):
    key = target.replace("–", "").replace("-", "")
    if key in _ref_cache:
        return _ref_cache[key]
    for d in REF_DIRS:
        man = d / "manifest.json"
        if man.exists():
            import json

            f = json.loads(man.read_text(encoding="utf-8")).get(key)
            if f and (d / f).exists():
                _, _, _, syl, _ = measure(load_audio((d / f).read_bytes()), key)
                _ref_cache[key] = syl
                return syl
    _ref_cache[key] = None
    return None


def analyze(wav: np.ndarray, target: str):
    t0 = time.time()
    recognized, clean, char_score, syl, cer = measure(wav, target)
    ref = reference(target)
    use_ref = ref is not None and len(ref) == len(syl)
    for j, e in enumerate(syl):
        if not e["contour"]:
            continue
        if use_ref and ref[j]["contour"]:
            e["ref"] = ref[j]["contour"]
            e["sim"] = round(contour_similarity(e["contour"], ref[j]["contour"]), 3)
        elif len(syl) <= 2:
            # ohne Vorbild-Aufnahme: Schablonen-Schätzung nur für Einzelwörter (im Satzfluss unzuverlässig)
            c5 = np.interp(np.linspace(0, 1, 5), np.linspace(0, 1, 20), e["contour"])
            det, conf = classify(c5, 3.0 if len(syl) > 1 else 0.0)
            e["detected"], e["conf"] = det, round(conf, 2)

    pron_avg = float(np.mean([e["pron"] for e in syl])) if syl else 0.0
    if use_ref:
        sims = [e["sim"] for e in syl if e["sim"] is not None]
        tone_ratio = float(np.mean([min(1, s / 0.6) for s in sims])) if sims else None
    else:
        checked = [e for e in syl if e["expected"] and e["detected"]]
        tone_ratio = sum(e["detected"] == e["expected"] for e in checked) / len(checked) if checked else None
    # Erkennungsfehler (CER) ist robuster als die Alignment-Wahrscheinlichkeit, die ein falsches Wort „hinbiegen“ kann
    sounds = 0.35 * min(1, pron_avg / 0.6) + 0.65 * (1 - min(1, cer))
    sounds = max(0.0, min(1.0, sounds, 1 - min(1, cer) + 0.25))
    # Tonbewertung ist bei Einzelwörtern nur ~60% zuverlässig (siehe README) → nur geringes Gewicht in der Note
    score = sounds if tone_ratio is None else 0.85 * sounds + 0.15 * tone_ratio
    return {
        "target": target,
        "recognized": recognized,
        "cer": round(cer, 3),
        "sounds": round(sounds, 3),
        "tones": None if tone_ratio is None else round(tone_ratio, 3),
        "toneMode": "reference" if use_ref else ("template" if len(syl) <= 2 else None),
        "score": round(score, 3),
        "syllables": syl,
        "issues": explain.diagnose(clean, recognized, syl, "reference" if use_ref else ("template" if len(syl) <= 2 else None)),
        "chars": [{"ch": clean[k], "score": round(char_score[k], 3)} for k in range(len(clean))],
        "duration": round(len(wav) / SR, 2),
        "ms": int((time.time() - t0) * 1000),
    }


def levenshtein(a: str, b: str) -> int:
    dp = list(range(len(b) + 1))
    for i in range(1, len(a) + 1):
        prev, dp[0] = dp[0], i
        for j in range(1, len(b) + 1):
            cur = dp[j]
            dp[j] = min(dp[j] + 1, dp[j - 1] + 1, prev + (a[i - 1] != b[j - 1]))
            prev = cur
    return dp[-1]


# ---------------------------------------------------------------- API
app = FastAPI(title="Thai lernen – Analyse-Server")
# Die App kann von anderer Adresse kommen (z.B. GitHub Pages) – keine Cookies/Logins, daher offen
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["GET", "POST"], allow_headers=["*"])


@app.get("/api/health")
def health():
    return {"ok": True, "device": DEVICE, "gpu": torch.cuda.get_device_name(0) if DEVICE == "cuda" else None, "asr": ASR_MODEL}


@app.post("/api/analyze")
async def api_analyze(audio: UploadFile = File(...), text: str = Form(...)):
    try:
        wav = load_audio(await audio.read())
        if len(wav) < SR * 0.25:
            return JSONResponse({"error": "Aufnahme zu kurz"}, status_code=400)
        return analyze(wav, text)
    except Exception as e:  # noqa: BLE001
        return JSONResponse({"error": str(e)}, status_code=500)


SAY_CACHE = ROOT / "say_cache"
SAY_CACHE.mkdir(exist_ok=True)


@app.get("/api/say")
async def api_say(text: str):
    """Beliebigen Thai-Text per edge-tts sprechen (z.B. „so klang es“-Beispiele), zwischengespeichert."""
    import edge_tts

    text = text.strip()[:200]
    path = SAY_CACHE / (hashlib.md5(text.encode()).hexdigest() + ".mp3")
    if not path.exists():
        # Immer dieselbe Stimme, damit „richtig“ und „so klang es“ direkt vergleichbar sind
        for kw in ({"voice": "th-TH-PremwadeeNeural", "rate": "-15%"}, {"voice": "th-TH-PremwadeeNeural"}, {"voice": "th-TH-NiwatNeural"}):
            try:
                await edge_tts.Communicate(text, **kw).save(str(path))
                break
            except Exception:  # noqa: BLE001 – kurze Texte liefert der Dienst manchmal nicht
                path.unlink(missing_ok=True)
        else:
            return JSONResponse({"error": "Keine Sprachausgabe möglich"}, status_code=404)
    return FileResponse(path, media_type="audio/mpeg")


if DIST.exists():
    app.mount("/", StaticFiles(directory=DIST, html=True), name="app")
