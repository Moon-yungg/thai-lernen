"""Bewertet die Vergleichs-Audios: Verständlichkeit (Zeichenfehler der Spracherkennung) und Töne bei Einzelwörtern.
Schreibt vergleich/index.html zum Anhören."""
import html, json, pathlib, sys
import numpy as np

root = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(root / "server"))
import app  # noqa: E402

texts = json.loads((root / "scripts" / "compare_texts.json").read_text(encoding="utf-8"))
engines = [("edge_f", "edge-tts Premwadee (♀)", "mp3"), ("edge_m", "edge-tts Niwat (♂)", "mp3"), ("f5", "F5-TTS-THAI (lokal)", "wav")]
TONE = app.explain.TONE_DE
res = {e: [] for e, _, _ in engines}
for e, _, ext in engines:
    times = json.loads((root / "vergleich" / e / "times.json").read_text(encoding="utf-8"))
    for i, t in enumerate(texts):
        f = root / "vergleich" / e / f"{i:02d}.{ext}"
        if not f.exists():
            res[e].append(None)
            continue
        wav = app.load_audio(f.read_bytes())
        rec, clean, _, syl, cer = app.measure(wav, t)
        tone = None
        if len(syl) == 1 and syl[0]["contour"] and syl[0]["expected"]:
            c5 = np.interp(np.linspace(0, 1, 5), np.linspace(0, 1, 20), syl[0]["contour"])
            tone = (syl[0]["expected"], app.classify(c5, 0.0)[0])
        res[e].append({"rec": rec, "cer": cer, "tone": tone, "time": times.get(t), "contour": syl[0]["contour"] if len(syl) == 1 else None})

summary = {}
for e, name, _ in engines:
    r = [x for x in res[e] if x]
    tones = [x["tone"] for x in r if x["tone"]]
    summary[e] = {
        "name": name,
        "cer": float(np.mean([min(1, x["cer"]) for x in r])),
        "exact": sum(x["cer"] == 0 for x in r) / len(r),
        "tone_acc": sum(a == b for a, b in tones) / max(1, len(tones)),
        "n_tone": len(tones),
        "time": float(np.mean([x["time"] for x in r if x["time"]])),
        "missing": len(texts) - len(r),
    }
    print(name, json.dumps(summary[e], ensure_ascii=False))

# Tonkonsistenz F5 vs. Premwadee bei Einzelwörtern
sims = [app.contour_similarity(a["contour"], b["contour"]) for a, b in zip(res["f5"], res["edge_f"]) if a and b and a["contour"] and b["contour"]]
print("Tonverlauf-Ähnlichkeit F5 ↔ Premwadee (Einzelwörter):", round(float(np.mean(sims)), 3) if sims else None)

rows = []
for i, t in enumerate(texts):
    cells = []
    for e, _, ext in engines:
        x = res[e][i]
        if not x:
            cells.append("<td>–</td>")
            continue
        ok = x["cer"] == 0
        tone = f"<br><small>Ton: {TONE[x['tone'][1]]} {'✓' if x['tone'][0] == x['tone'][1] else '✗'}</small>" if x["tone"] else ""
        cells.append(f"<td><audio controls preload='none' src='{e}/{i:02d}.{ext}'></audio><br><small class='{'ok' if ok else 'bad'}'>erkannt: {html.escape(x['rec'])}</small>{tone}</td>")
    rows.append(f"<tr><th>{html.escape(t)}</th>{''.join(cells)}</tr>")
summ = "".join(
    f"<tr><th>{s['name']}</th><td>{100 * (1 - s['cer']):.0f}%</td><td>{100 * s['exact']:.0f}%</td><td>{100 * s['tone_acc']:.0f}% ({s['n_tone']})</td><td>{s['time']:.1f} s</td><td>{s['missing']}</td></tr>"
    for s in summary.values()
)
page = f"""<!doctype html><html lang="de"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>TTS-Vergleich Thai</title>
<style>body{{font-family:system-ui,sans-serif;margin:16px;background:#fff8f1;color:#2b2340}}table{{border-collapse:collapse;width:100%}}
td,th{{border-bottom:1px solid #e6dcd2;padding:8px;text-align:left;vertical-align:top}}th{{font-size:20px}}audio{{width:190px;height:34px}}
small{{color:#7a7090}}.ok{{color:#1fa158}}.bad{{color:#d93242}}h2{{margin-top:28px}}
@media (prefers-color-scheme:dark){{body{{background:#17131f;color:#f4eefb}}td,th{{border-color:#3a3149}}}}</style>
<h1>Thai-Sprachausgabe: edge-tts vs. F5-TTS-THAI</h1>
<h2>Messwerte</h2>
<table><tr><th></th><th>Verständlich (Zeichen)</th><th>Komplett richtig erkannt</th><th>Töne Einzelwörter</th><th>Zeit/Text</th><th>fehlend</th></tr>{summ}</table>
<p><small>Verständlichkeit = Thai-Spracherkennung (wav2vec2) erkennt den Text. Töne = grobe Schablonen-Schätzung bei 16 Einzelwörtern (auch mit perfekter Stimme nicht 100%). Zeit bei F5 während nebenher ein Spiel lief.</small></p>
<h2>Selbst anhören</h2>
<table><tr><th>Text</th>{''.join(f'<th style="font-size:14px">{n}</th>' for _, n, _ in engines)}</tr>{''.join(rows)}</table></html>"""
(root / "vergleich" / "index.html").write_text(page, encoding="utf-8")
print("geschrieben:", root / "vergleich" / "index.html")
