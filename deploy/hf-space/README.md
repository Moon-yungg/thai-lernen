---
title: Thai Lernen Analyse
emoji: 🗣️
colorFrom: red
colorTo: yellow
sdk: docker
app_port: 7860
pinned: false
---

Analyse-Server für die Thai-Lern-App: Laut-Analyse (wav2vec2 Thai + Forced Alignment), Tonverlauf (Praat) im Vergleich zu Vorbild-Aufnahmen und Hörbeispiele (edge-tts).

Endpunkte: `GET /api/health`, `POST /api/analyze` (audio=WAV, text=Thai), `GET /api/say?text=…`
