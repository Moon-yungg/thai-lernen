# Prüfung: Schrift (letters.ts), Dialoge (dialogues.ts), Grammatik (grammar.ts)

Stand: 01.11.2026 · Prüfer: KI (kein Muttersprachler) · Grundlage: verbindliches Umschrift-Schema in `src/data/types.ts`

## Vorgehen

- Alle Thai/Umschrift-Paare wurden maschinell mit PyThaiNLP (`syllable_tokenize` + `tone_detector`) gegen die Tonzeichen der Umschrift abgeglichen. Jede Abweichung wurde einzeln von Hand geprüft.
- Übrig gebliebene Abweichungen sind **Fehler von PyThaiNLP** und keine Datenfehler: ขอ (richtig: steigend kǒr), นก (hoch nók), เล็ก (hoch lék), อัน (mittel an), เจอ (mittel jer), ลด (hoch lót), เช็ค (hoch chék), แฟ (mittel), โฑ (mittel), ฮูก (fallend hôok). Dazu kommen falsche Silbentrennungen (สวัสดี, ตลาด, อะไร, เยอรมัน, วิศวกร, ว่ายน้ำ) und **bewusst gesprochene Formen**: ก็ gôr, เท่าไร tâo-rài, เมื่อไร mûea-rài, มิเตอร์ mí-dtêr.
- Struktur, IDs und exportierte Namen sind unverändert. Alle 46 „me“-Züge in den Dialogen haben genau 3 Optionen, davon genau eine richtige, und die ist identisch mit dem Zug (per Skript geprüft).

## Änderungen

### Umschrift an das Schema angepasst (alle drei Dateien)

| Vorher | Nachher | Grund laut Schema | Betroffene Wörter (Auswahl) |
|---|---|---|---|
| uu | oo | ู = oo | รู้จัก róo-jàk, อยู่ yòo, ถูก tòok, พูด pôot, สูง sǒong, ภูเก็ต poo-gèt, เมนู me-noo, ศูนย์ sǒon, หนู nǒo, งู ngoo, ผู้ pôo, ฮูก hôok |
| ii | ee | ี = ee | หีบ hèep, ฤๅษี ruue-sěe |
| ue (bei ื) | uue | ื = uue (lang) | ชื่อ chûue, ซื้อ súue, หนังสือ nǎng-sǔue, ดื่ม dùuem, หรือ rǔue, ฤๅ ruue |
| o / oo (bei โ–) | oh | โ– = oh | โทษ tôht, โมง mohng, โรงแรม rohng-raem, โทร toh, โอเค oh-ke, กิโล gì-loh, มณโฑ mon-toh, โซ่ sôh, ไม้โท máai toh |
| ee (bei เ–) | e | เ– = e | เอก èk, เณร nen |
| kòp / chôp / dton | kòrp / chôrp / dtorn | –อ = or | ขอบคุณ kòrp-kun, ขอบใจ kòrp-jai, ชอบ chôrp, ตอนนี้ dtorn-née |
| -aew | -aeo | แ–ว = aeo | แล้ว láeo, แก้ว gâeo, แมว maeo |
| dâai | dâi | ได้ wird kurz gesprochen (Wörterbuch: /dâj/) | alle ได้, ไม่ได้, อยากได้ |
| mái (Holz) | máai | ไม้ wird lang gesprochen (/máːj/), passend zu tw-wood | ไม้, ใบไม้, ผลไม้ pǒn-lá-máai, ไม้เอก/โท/ตรี/จัตวา, ไม้ยมก |
| mí-dter | mí-dtêr | englische Lehnwörter auf -er werden fallend gesprochen | มิเตอร์ |

Auch Umschriften in Fließtexten (`md`), Tabellenköpfen und Quizfragen wurden angepasst (z. B. „máai èk“, „rǔue bplào“, „chôrp“, „mâi dâi“).

### letters.ts – Inhalt

- **Vokal-Lautnamen** nach Schema: ii→ee, uu→oo, ee→e, aae→ae, oo→oh, iia→ia, uua→ua. Untertitel der Lektion „Einfache Vokale“ entsprechend: „a aa i ee u oo“.
- **ฑ**: Bedeutung präzisiert: „Montho (Gattin Thotsakans im Ramakien)“.
- **ห-Notiz**: ห macht nur die *klingenden* Tiefklasse-Konsonanten (ง ญ น ม ย ร ล ว) zur hohen Klasse, nicht alle Tiefklasse-Konsonanten.
- **–ึ**: „Ungerundetes ü“ war irreführend (ein ungerundetes ü wäre i). Neu: „Wie u, aber mit breit gezogenen (nicht gerundeten) Lippen“.
- **เ–อะ**: „ö-artig“ ersetzt durch „ə mit gespreizten Lippen (kein ö!)“.
- **เ–อ**: Hinweis ergänzt, dass es mit Endkonsonant meist als เ–ิ– geschrieben wird (เดิน).
- **–ัว**: Hinweis ergänzt, dass ั mit Endkonsonant wegfällt (สวน).
- **–ำ**: Das Beispiel น้ำ war ungünstig, weil es lang gesprochen wird. Neues Beispiel ist ทำ, dazu ein Hinweis auf น้ำ.
- **ฤ**: ergänzt, dass es je nach Wort als rue, ri oder rer gelesen wird (ฤดู, อังกฤษ).
- **tw-q (ไหม)**: Hinweis ergänzt, dass es im Alltag oft hoch (mái) gesprochen wird. Die Umschrift bleibt mǎi.
- Geprüft und korrekt: alle Klassen, An- und Auslaute (u. a. ฉ ผ ฝ ห อ ฮ ohne Auslaut; ญ ร ล ฬ → n; ศ ษ ส ซ ฎ ฏ ฐ ฑ ฒ → t; ภ ฟ → p), alle Buchstabennamen, alle Tonzeichen-Regeln.

### grammar.ts – Inhalt

- **g-polite (Tipp)**: „klingt oft wie kâp oder káp“ geändert in „klingt oft wie káp (ohne r)“. Die fallende Variante ist nicht der Normalfall.
- **g-tones (Text)**: Die Liste der Konsonanten beim stummen ห ist jetzt vollständig: ง ญ น ม ย ร ล ว (ญ fehlte). Beim stummen อ steht jetzt, dass es nur in vier Wörtern vorkommt: อยาก, อยู่, อย่า, อย่าง.
- Alle übrigen Aussagen wurden geprüft und sind korrekt: SVO, Adjektiv nach dem Nomen, ไม่/ไม่ใช่/ไม่ได้ (Stellung), Fragepartikeln, Zeitmarker, Klassifikatoren (Nomen + Zahl + KLF, KLF + นี้), Tontabellen (lebend/tot × Klasse, Tonzeichen × Klasse), Verbserien, Vergleich (กว่า, ที่สุด, เท่ากับ, เท่ากัน, เหมือน). Auch alle Quiz-Antworten stimmen.

### dialogues.ts – Inhalt

- Thai-Sätze, Höflichkeit (Lernender: ผม/ครับ, Frauen: ค่ะ/คะ, Mutter: จ้ะ/จ๊ะ), Übersetzungen und Feedback zu den falschen Optionen wurden geprüft. Inhaltlich musste nichts geändert werden, nur die Umschrift (siehe oben).

## Bitte von einer Thai-Lehrkraft prüfen lassen

| Datei | ID / Stelle | Thai | Frage / Bedenken |
|---|---|---|---|
| alle | überall | ได้ | Umschrift jetzt **dâi** (kurz). Bisher stand dâai, andere Dateien nutzen das evtl. noch. Bitte festlegen und überall gleich machen. |
| alle | überall | ไม้, ผลไม้ | Umschrift **máai** (lang). Wird ไม้ in ไม้เอก/ไม้โท tatsächlich lang gesprochen oder verkürzt (mái)? |
| alle | überall | ไหม | Bleibt **mǎi** (Schreibton). Im Alltag hört man fast immer mái. Soll die App in Dialogen den gesprochenen Ton zeigen? |
| dialogues.ts | d-taxi | มิเตอร์ | **mí-dtêr** (fallend) angenommen, wie bei คอมพิวเตอร์. Bitte bestätigen. |
| dialogues.ts | d-market | โอเค | **oh-ke**, beide Silben mittel? Manche sprechen oh-kee/ó-kê. |
| dialogues.ts | d-date | เบอร์โทร | ber-toh, beide Silben mittel? |
| dialogues.ts | d-smalltalk | ผมมาจากเยอรมันครับ | Umgangssprachlich üblich, korrekt wäre ประเทศเยอรมนี (yer-rá-má-nee). Reicht die Alltagsform für Lernende? |
| dialogues.ts | d-restaurant | ไม่ครับ เช็คบิลด้วยครับ | Wäre „ไม่แล้วครับ“ (nichts mehr) natürlicher als „ไม่ครับ“? |
| dialogues.ts | d-market | แพงจัง ลดได้ไหมครับ | Klingt „ลดหน่อยได้ไหมครับ“ natürlicher? |
| dialogues.ts | d-family | ขอบใจจ้ะ | Ist ขอบใจ (Ältere zu Jüngeren) hier passend? |
| letters.ts | c-ษ (ษอ ฤๅษี) | ฤๅษี | Umschrift ruue-sěe (ฤๅ = langes rue). Stimmt das? |
| letters.ts | c-ฑ | มณโฑ | mon-toh (mittel/mittel). Wird ฑ hier als t gesprochen, nicht als d? |
| letters.ts | c-ฌ, c-ฉ, c-ห usw. | Auslaut „–“ | Bei ฌ steht „kommt nicht als Auslaut vor“. Es gibt aber seltene Lehnwörter (z. B. Pali). Reicht das für Lernende? |
| letters.ts | Vokale | เ–อะ, –ึ | Sind die deutschen Lautbeschreibungen (ə mit gespreizten Lippen / u ohne Lippenrundung) verständlich und richtig? |
| letters.ts | t-jat | ไม้จัตวา | Die deutsche Bezeichnung „Mai Chattawa“ entspricht der Schreibung, die Umschrift ist jàt-dtà-waa. Auf eine Form vereinheitlichen? |
| grammar.ts | g-time, Tabelle | เมื่อกี้ | mûea-gêe (nach Schrift). Gesprochen eher mûea-gí? |
| grammar.ts | g-questions | หรือเปล่า | rǔue bplào. Gesprochen oft rúe-bplào oder rěr-bplào. Schrift- oder Sprechform zeigen? |
| grammar.ts | g-pronouns | ฉัน | chǎn (nach Schrift). Gesprochen oft chán. Hinweis aufnehmen? |
| grammar.ts | g-comparison | ผมสูงเท่ากับพี่ชาย | Wäre „ผมสูงเท่าพี่ชาย“ (ohne กับ) natürlicher? |
| grammar.ts | g-verbs-serial | เราไปดื่มกาแฟกัน | Natürlicher wäre eventuell „ไปกินกาแฟกัน“. |
