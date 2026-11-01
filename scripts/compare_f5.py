"""Erzeugt die Vergleichs-Audios mit F5-TTS-THAI (lokal). Aufruf mit server/.venv-f5."""
import json, pathlib, time
import soundfile as sf
import torch
import torchaudio

# torchaudio ≥2.9 lädt Audio über torchcodec/FFmpeg – ohne FFmpeg-Installation auf soundfile umleiten
def _load(path, *a, **k):
    data, sr = sf.read(str(path), dtype="float32", always_2d=True)
    return torch.from_numpy(data.T.copy()), sr

torchaudio.load = _load
from huggingface_hub import hf_hub_download
from f5_tts_th.tts import TTS

root = pathlib.Path(__file__).resolve().parent.parent
out = root / "vergleich" / "f5"
out.mkdir(parents=True, exist_ok=True)
texts = json.loads((root / "scripts" / "compare_texts.json").read_text(encoding="utf-8"))
ref = hf_hub_download("VIZINTZOR/F5-TTS-THAI", "sample/ref_audio.wav")
ref_text = "ฉันเดินทางไปเที่ยวที่จังหวัดเชียงใหม่ในช่วงฤดูหนาวเพื่อสัมผัสอากาศเย็นสบาย"
tts = TTS(model="v1")
times = {}
for i, t in enumerate(texts):
    t0 = time.time()
    wav = tts.infer(ref_audio=ref, ref_text=ref_text, gen_text=t, step=32, cfg=2.0, speed=0.9)
    times[t] = round(time.time() - t0, 2)
    sf.write(out / f"{i:02d}.wav", wav, 24000)
    print(i, t, times[t], flush=True)
(out / "times.json").write_text(json.dumps(times, ensure_ascii=False), encoding="utf-8")
