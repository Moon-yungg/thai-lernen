"""Erzeugt hochwertige Thai-Audiodateien (Vorbild-Aufnahmen) mit edge-tts.

Nutzt die Microsoft-Neural-Stimmen aus Edge (kostenlos, kein Konto; die Texte werden dabei an Microsoft gesendet).
Die App spielt danach offline die MP3s ab, und der Analyse-Server vergleicht deine Tonverläufe mit ihnen.

    npm run export-texts
    server/.venv/Scripts/python scripts/gen_audio.py      # → public/audio/*.mp3 + manifest.json

Bereits erzeugte Texte werden übersprungen – das Skript kann jederzeit erneut laufen.
"""
import asyncio
import hashlib
import json
import pathlib

import edge_tts

MALE, FEMALE = "th-TH-NiwatNeural", "th-TH-PremwadeeNeural"
root = pathlib.Path(__file__).resolve().parent.parent
out = root / "public" / "audio"
out.mkdir(parents=True, exist_ok=True)
texts = json.loads((root / "scripts" / "texts.json").read_text(encoding="utf-8"))
manifest_path = out / "manifest.json"
manifest = json.loads(manifest_path.read_text(encoding="utf-8")) if manifest_path.exists() else {}


def voice_for(text: str) -> str:
    # Der Lernende ist männlich: Sätze mit ครับ/ผม mit Männerstimme, typisch weibliche Sätze und alles andere mit Frauenstimme
    if any(w in text for w in ("ครับ", "ผม")):
        return MALE
    return FEMALE


async def gen(text: str, path: pathlib.Path) -> bool:
    voice = voice_for(text)
    for attempt in range(4):
        try:
            # Sehr kurze Texte liefert der Dienst manchmal nicht → ohne Tempo-Anpassung / andere Stimme erneut
            kw = {"rate": "-10%"} if attempt == 0 else {}
            v = voice if attempt < 2 else (FEMALE if voice == MALE else MALE)
            await edge_tts.Communicate(text, v, **kw).save(str(path))
            return True
        except edge_tts.exceptions.NoAudioReceived:
            await asyncio.sleep(0.5)
        except Exception as e:  # Netzwerkfehler o.ä.
            print("Fehler:", text, e)
            await asyncio.sleep(2)
    return False


async def main():
    todo = [t for t in texts if t not in manifest]
    print(f"{len(texts)} Texte, {len(todo)} neu")
    failed = []
    for i, t in enumerate(todo):
        name = hashlib.md5(t.encode()).hexdigest()[:12] + ".mp3"
        if await gen(t, out / name):
            manifest[t] = name
        else:
            failed.append(t)
        if i % 25 == 0:
            print(f"{i + 1}/{len(todo)}", flush=True)
            manifest_path.write_text(json.dumps(manifest, ensure_ascii=False), encoding="utf-8")
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False), encoding="utf-8")
    print("fertig:", len(manifest), "Dateien; fehlgeschlagen:", failed)


asyncio.run(main())
