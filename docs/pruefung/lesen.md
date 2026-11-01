# Prüfung reading.ts (Kapitel k1r „Lesen lernen“)

Inhalt: 72 Lese-Items (`r-…`), 9 Lese-Themen (`g-read-…`), 9 Lektionen (`k1r-l1` … `k1r-l9`, je 8 Items, `focus: 'reading'`).

Töne wurden pro Silbe mit PyThaiNLP (`syllable_tokenize` + `tone_detector`) gegen die Umschrift geprüft. 57 von 72 Items stimmen direkt überein. Die 15 Abweichungen habe ich einzeln angesehen. Alle gehen auf Grenzen des Werkzeugs oder auf gesprochene Ausnahmen zurück:

| Wort | Umschrift | PyThaiNLP | Begründung |
|---|---|---|---|
| มด | mót | fallend | Das unsichtbare o ist kurz → tot, kurz, Tiefklasse → hoch. PyThaiNLP nimmt einen langen Vokal an. |
| ถนน, ขนม, สนุก, ฉลาด, ขนมปัง | tà-nǒn, kà-nǒm, sà-nùk, chà-làat, kà-nǒm-bpang | 1 Silbe | Das Werkzeug trennt das unsichtbare a nicht ab. Der Ton der 2. Silbe stimmt. |
| ห้องสมุด, มหาวิทยาลัย, ผลไม้, ศิลปะ, จักรยาน, โทรศัพท์ | … | Silben fehlen | Verbindungssilben (lá, tá, grà, rá) und das unsichtbare a werden nicht erkannt. |
| ฤดู | rúe-doo | ? | ฤ wird nicht erkannt. Wörterbuch: rʉ́-duu. |
| ก็ | gôr | tief | Gesprochene Ausnahme (fallend, lang). |
| เท่าไร | tâo-rài | …-mittel | Gesprochene Ausnahme. Die Schreibung เท่าไหร่ gibt die Aussprache wieder. |

Keine Item-`th` überschneidet sich mit content1/2/3, letters, tones, dialogues oder stories. Zuerst gewählte Wörter, die schon in tones.ts, letters.ts oder content3.ts stehen (ขา, ป่า, ป้า, โต๊ะ, ไข่, เสื้อ, ม้า, ฟุตบอล, หน้า, อย่า, ทราย, สัปดาห์, ไม้), habe ich ersetzt. In den Erklärtexten kommen sie weiter als Beispiele vor.

## Unsichere Punkte – bitte prüfen

1. **ได้ / เก้า**: Laut Projektentscheid (schrift-dialoge-grammatik.md) sind sie kurz (dâi, gâo). In der Ausnahmetabelle von `g-read-special` stehen sie deshalb NICHT. Dort stehen nur น้ำ (náam) und ไม้ (máai) als „geschrieben kurz, gesprochen lang“. ไม้ = máai passt zu tones.ts. grammar.ts schreibt in einem Build aber noch `ไม้ 'mái'`.
2. **ก็, Spalte „nach Regel“**: Dort steht `gòr`. Wie man ก็ „nach Regel“ liest, ist nicht eindeutig (kurz gò?). Die gesprochene Form gôr ist sicher.
3. **หรือ**: Die Umschrift folgt mit rǔue dem Wörterbuch. Im Alltag hört man oft rúe oder rěr (เหรอ). Ein Hinweis steht in rule und Tabelle.
4. **เขา / ฉัน / ไหม**: In der Tabelle steht die umgangssprachliche Variante mit hohem Ton (káo, chán, mái) als zweite Form. Die Items in content1 nutzen die Standardform.
5. **Geliehene Klasse (อักษรนำ ohne ห)**: Die Regel ist so formuliert, dass sie auch für die Mittelklasse gilt (ตลาด dtà-làat). Als Ausnahme ist ขโมย (kà-moi) genannt. Es gibt vermutlich weitere Ausnahmen. Die Regel gilt also nur „in der Regel“.
6. **การ์ตูน gaa-dtoon**: Lehnwort. Beide Silben habe ich mit mittlerem Ton umschrieben (Wörterbuch: gaa-dtuun). Manche Sprecher sagen den 2. Ton höher.
7. **บ๊วย búai**: Die Bedeutung ist mit „eingelegte/getrocknete Salzpflaume“ angegeben. Die Notiz zu „Schlusslicht“ (เป็นบ๊วย) ist umgangssprachlich.
8. **หนู als „ich“**: Die Notiz sagt, dass Mädchen und junge Frauen es gegenüber Älteren benutzen. Das stimmt, ist aber vereinfacht.
9. **Merksatz อย่าอยู่อย่างอยาก**: Die Übersetzung „Lebe nicht voller Begierden“ ist frei.
10. **Cluster-Liste**: Genannt sind กร กล กว · ขร ขล ขว · คร คล คว · ปร ปล · พร พล · ตร. ผล (z. B. ผลัก) und Lehnwort-Cluster (บร, ฟร, ดร in Fremdwörtern) fehlen bewusst.
11. **ฤ = rue / ri / rer**: So steht es im Text. Belegt ist das nur mit ฤดู (rúe) und อังกฤษ (grìt). Für „rer“ gibt es kein Beispiel.
12. **Widget**: `g-read-live-dead` bindet `tone-calculator` ein. Unter der Annahme, dass das Widget allein steht, sollte das funktionieren.
13. **Umschrift-Stil in content2.ts**: Sie weicht vom Schema ab (z. B. `kâo`, `mǔ`, `kwǎ`, `ngoen`). reading.ts folgt dem Schema in types.ts (wie content1).
