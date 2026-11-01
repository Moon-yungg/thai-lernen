"""Erzeugt die Vergleichs-Audios mit edge-tts (Microsoft, online)."""
import asyncio, json, pathlib, time
import edge_tts

root = pathlib.Path(__file__).resolve().parent.parent
texts = json.loads((root / "scripts" / "compare_texts.json").read_text(encoding="utf-8"))

async def main():
    for voice, name in [("th-TH-PremwadeeNeural", "edge_f"), ("th-TH-NiwatNeural", "edge_m")]:
        out = root / "vergleich" / name
        out.mkdir(parents=True, exist_ok=True)
        times = {}
        for i, t in enumerate(texts):
            t0 = time.time()
            for attempt in range(3):
                try:
                    # Sehr kurze Einzelwörter liefert der Dienst manchmal nicht – dann ohne Tempo-Anpassung erneut
                    await edge_tts.Communicate(t, voice, **({"rate": "-10%"} if attempt == 0 else {})).save(str(out / f"{i:02d}.mp3"))
                    times[t] = round(time.time() - t0, 2)
                    break
                except edge_tts.exceptions.NoAudioReceived:
                    print("kein Audio:", voice, t, "Versuch", attempt + 1)
        (out / "times.json").write_text(json.dumps(times, ensure_ascii=False), encoding="utf-8")
        print(name, "ok")

asyncio.run(main())
