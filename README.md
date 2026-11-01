# Thai lernen 🇹🇭

Eine Lern-App für Thai im Stil von Duolingo und Drops. Sie läuft als PWA: Du öffnest sie im Handy-Browser und legst sie mit „Zum Startbildschirm hinzufügen“ als App ab. Danach funktioniert sie auch offline. Die Spracherkennung braucht allerdings Internet.

## Starten

```bash
npm install
npm run dev        # http://localhost:5173 – und im WLAN über die angezeigte IP
npm run build      # Produktions-Build nach dist/
```

**Wichtig fürs Handy:** Mikrofon und Installation als App gehen nur über **HTTPS** (oder localhost). Im WLAN über `http://192.168…` laufen alle Übungen außer Sprechen. Für die volle Nutzung hostest du die App zum Beispiel auf GitHub Pages. Die Datei `.github/workflows/pages.yml` ist dafür schon vorbereitet.

## Vom PC aus aufs Handy (mit Laut- und Tonanalyse)

Doppelklick auf **`start.bat`**. Beim ersten Start wird alles installiert (etwa 4 GB: PyTorch mit CUDA und das Thai-Sprachmodell). Danach wird die App gebaut, und der Server startet. Er zeigt eine Adresse wie `https://192.168.178.23:8443` und einen QR-Code an.

1. Das Handy muss im selben WLAN sein. Scanne den QR-Code.
2. Chrome warnt vor dem Zertifikat, weil es selbst ausgestellt ist. Tippe auf „Erweitert“ und dann auf „Weiter zu …“.
3. Erlaube den Mikrofon-Zugriff.

Die App erkennt den Server automatisch. Die Sprech-Übungen und Rollenspiele laufen dann über die lokale Analyse auf der GPU.

## Aufbau

| Pfad | Inhalt |
|---|---|
| `src/data/letters.ts` | Kapitel 1: 44 Konsonanten, 29 Vokale, Tonzeichen und erste Wörter |
| `src/data/content1.ts` | Kapitel 2–5: Begrüßung, Vorstellen, Zahlen & Zeit, Alltag |
| `src/data/content2.ts` | Kapitel 6–9: Essen, Unterwegs & Einkaufen, Beziehung, Natur & Körper |
| `src/data/dialogues.ts` | 8 Rollenspiele mit Antwortoptionen und Feedback |
| `src/data/grammar.ts` | 12 interaktive Grammatik-Themen, dazu Ton-Rechner und Konsonantenklassen |
| `src/lib/session.ts` | erzeugt die Übungen (über 15 Typen) |
| `src/lib/store.ts` | Fortschritt (localStorage) und Spaced Repetition (vereinfachtes SM-2) |
| `src/lib/handwriting.ts` | Handschrift-Erkennung |
| `src/lib/speech.ts` | Ausspracheanalyse |
| `src/lib/audio.ts` | Sprachausgabe und Soundeffekte |

## Wie die Technik funktioniert

**Sprachausgabe.** Standardmäßig spricht die Thai-Stimme des Systems (Web Speech API). Auf Android ist das die Google-TTS. Falls keine Thai-Stimme installiert ist, gehst du so vor: *Einstellungen → System → Sprachen → Text-in-Sprache → Google → Thai installieren*.

**Vorbild-Audios.** Die Ordner `public/audio/*.mp3` und `manifest.json` enthalten neuronale Microsoft-Stimmen, erzeugt mit edge-tts. Sätze mit ครับ oder ผม spricht Niwat, alle anderen Texte Premwadee. Die App spielt diese Dateien bevorzugt ab, auch offline. Der Analyse-Server vergleicht deine Tonverläufe mit ihnen.

Wenn du neue Inhalte hinzufügst, ergänzt du die Audios so:

```bash
npm run export-texts
server/.venv/Scripts/python scripts/gen_audio.py   # erzeugt nur neue Texte
```

Einen Vergleich mit dem lokalen F5-TTS-THAI findest du in `vergleich/index.html`. Die Skripte dafür liegen unter `scripts/compare_*.py`.

**Ausspracheanalyse mit dem lokalen Server** (`server/app.py`):
1. **Laute:** Das Modell wav2vec2-XLSR-Thai (`airesearch/wav2vec2-large-xlsr-53-th`) erkennt Zeichen für Zeichen, was du tatsächlich gesagt hast. Es korrigiert dabei nicht über ein Wörterbuch. Anschließend wird der Zieltext per Forced Alignment über die Aufnahme gelegt, und jede Silbe bekommt einen eigenen Laut-Score.
2. **Töne:** Praat misst die Tonhöhe. Daraus entsteht für jede Silbe ein Tonverlauf. Liegt eine Vorbild-Aufnahme vor (`public/audio/manifest.json`), vergleicht der Server deinen Verlauf mit dem des Vorbilds. Ohne Vorbild schätzt er den Ton nur bei Einzelwörtern anhand typischer Tonverläufe.
   - So wurde das geprüft: mit echten Thai-Aufnahmen aus Google FLEURS.
   - Ergebnis des Vorbild-Vergleichs: Dieselbe Silbe von zwei verschiedenen Sprechern erreicht im Median 0,71 Ähnlichkeit, zufällige Silben 0,47.
   - Ergebnis der Ton-Klassifikation ohne Vorbild: Im Satzfluss trifft sie nur zufällig. Deshalb gibt die App bei Sätzen ohne Vorbild bewusst kein Ton-Urteil ab.
   - Bei Einzelwörtern trennt weder der Kurvenvergleich (Männer- gegen Frauenstimme) noch ein Vergleich der Tonvarianten über die Spracherkennung die Töne zuverlässig: etwa 64 % Treffer bei 4–5 Varianten.
   - Töne erscheinen deshalb nur als weicher Hinweis mit Kurvenvergleich und zählen nur zu 15 % in die Note.
   - Für eine wirklich verlässliche Tonbewertung bräuchte es einen eigens trainierten Ton-Klassifikator.

3. **Fehler zum Anhören:** Regeln der Thai-Phonetik ordnen Fehler ein, zum Beispiel Behauchung, stimmhaft/stimmlos, Vokallänge, i/ue/u, r/l, ng oder Auslaut. Zu jedem Fehler gibt es Knöpfe: ✅ richtig und ❌ „so klang es“. Bei Konsonanten kommen noch die beiden Buchstabennamen dazu. Unbekannte Silben spricht der Server auf Abruf per edge-tts und speichert sie in `server/say_cache`.

**Ausspracheanalyse ohne Server:** So arbeiten die meisten Sprach-Apps: Die Spracherkennung (Chrome/Android, `th-TH`) wandelt das Gesprochene in Text um. Dieser Text wird mit dem Zieltext verglichen (Levenshtein, mit mehreren Erkennungsalternativen). Erkennt die App die richtigen Laute, aber ein anderes Tonzeichen, gibt sie einen **Ton-Hinweis**. Ohne Spracherkennung, zum Beispiel in Firefox, nimmst du dich selbst auf und vergleichst die Aufnahme mit dem Vorbild.

**Handschrift.** Die Glyphe aus der Schriftart Sarabun (eine Schrift mit Kringeln) wird gerastert. Deine Striche werden genauso normalisiert, und dann vergleicht die App beide über Überdeckung mit Toleranz (F-Score). Zum Vergleich prüft sie dieselbe Zeichnung gegen alle anderen Zeichen. So kann sie sagen „sieht eher aus wie ป“.

Die Strichfolge prüft die App über die wichtigste Thai-Regel: **Man beginnt am Kringel.** Den Kringel erkennt sie automatisch als kleinstes geschlossenes Loch der Glyphe und markiert ihn mit ①. Die Prüfung ist bewusst tolerant eingestellt.

**Bilder.** Für Bild-Übungen verwendet die App Emojis. Jedes Item kann aber ein `img` bekommen, das das Emoji ersetzt, zum Beispiel ein lokal generiertes Bild.
