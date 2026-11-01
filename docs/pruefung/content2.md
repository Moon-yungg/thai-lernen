# Prüfung `src/data/content2.ts` (Kapitel 6–9)

Geprüft: alle 197 Items (Thai-Schreibung, Natürlichkeit, Übersetzung, Notizen, Tokens, Umschrift/Töne).
Kapitel-/Lektionsstruktur, IDs, Reihenfolge und Grammatik-/Dialog-Verweise sind unverändert.
Hinweis: Das Material wurde KI-geprüft, nicht von Muttersprachlern. Die Tabelle unten ist für eine Thai-Lehrkraft gedacht.

## Was geändert wurde

### 1. Umschrift (`rom`) auf das verbindliche Schema gebracht (praktisch alle Items)
- Langes a → `aa` (kâao, mâak, yàak, náam, sà-baai, bàat …)
- Langes u → `oo` (mǒo, me-noo, yòo, lôok, tòok, ngoo, hǒo, jà-mòok …)
- ต → `dt`, ป → `bp` (dtôm-yam-gûng, sôm-dtam, bpai, dtà-làat, bplaa, bpùai, bpen, dtrong …)
- ออ mit Endkonsonant → `or…` (kǒrng, hôrng, nórng, chôrp, jorng, rórn, tórng, dòrk-mái, jòrt, sǒrng, krôrp-krua, dtôrng)
- โ → `oh` (rohng-raem, dtaeng-moh, gròht, rohng-pá-yaa-baan)
- ื → `uue` (súue, kuuen, muue, dùuem, jùuet); เ-ิ/เ-อ → `er` (ngern, kěrn)
- Diphthonge: -วย → `uai` (sǔai, glûai, dûai, bpùai), -อย → `oi` (à-ròi, nòi), เ-ือย → `ueai` (nùeai), -ิว → `iu` (hǐu), แ-ว → `aeo` (láeo, gâeo, maeo), -าว → `aao` (kâao, sǎao, nǎao, má-práao), -าย → `aai` (sáai, chaai)
- Falsche Konsonanten: อากาศ `a-kàt` → `aa-gàat`
- Spezialfälle wie gesprochen: น้ำ `náam` (lang), เท่าไหร่ `tâo-rài`, ไม้ `mái`
- Tonzeichen: alle Silben gegen die Schriftregeln geprüft (inkl. PyThaiNLP-Abgleich). Abweichungen von PyThaiNLP (z. B. รถ, นก, ขอ, สัตว์, เช็ค, กุญแจ, ทิตย์, Silbentrennung bei อร่อย/สนาม/ตลาด/สบาย/พยา/จมูก) sind Fehler von PyThaiNLP, nicht der Umschrift. Es wurden keine echten Tonfehler gefunden; die alten Töne stimmten bereits, nur die Schreibweise war falsch.

### 2. Inhaltliche Korrekturen
| ID | Vorher | Nachher | Grund |
|---|---|---|---|
| k6-onemore | เอาอีกหนึ่งครับ | ขออีกอันครับ (Tokens + Notiz angepasst) | „เอาอีกหนึ่ง“ ohne Zählwort klingt unvollständig; ขอ + อีก + Zählwort ist die übliche, höfliche Form |
| k6-durian | Notiz „Königin der Früchte“ | „König der Früchte“ | Durian = König, Mangostane = Königin |
| k7-motorbike | alt „Motorradtaxi“ | entfernt; Notiz ergänzt (มอไซค์, วินมอเตอร์ไซค์) | Motorradtaxi ist nicht die Bedeutung |
| k7-aircon | Emoji ❄️ | entfernt, Notiz (ห้องแอร์) ergänzt | gleiches Emoji wie k9-snow (Schnee) → mehrdeutig in Bild-Übungen |
| k8-happy | alt „Glück haben“, Notiz „wörtlich Glück haben“ | alt entfernt, Notiz präzisiert (Zufallsglück = โชคดี) | „Glück haben“ heißt auf Deutsch etwas anderes |
| k8-date | Notiz | Hinweis auf offizielle Schreibung เดต ergänzt | เดท bleibt, da im Alltag üblicher |

### 3. Geprüft und für korrekt befunden (Auswahl der Autor-Zweifel)
- **เดท vs. เดต**: เดท ist die gebräuchliche Alltagsschreibung, เดต die Schreibung nach Royal-Institute-Regeln. Beibehalten, Notiz ergänzt.
- **เหนื่อย**: Ton tief (ห-นำ + ไม้เอก) – `nùeai` nach Schema.
- **มอเตอร์ไซค์**: Schreibung korrekt.
- Tokens: alle `tokens.join('') === th`; alle 197 IDs eindeutig.

## Unsichere Punkte – bitte von einer Thai-Lehrkraft prüfen lassen

| ID | Thai | rom (jetzt) | Frage / Bedenken |
|---|---|---|---|
| k8-date | เดท | dèt | Gesprochener Ton? Nach Schrift tief; viele sprechen Lehnwörter hoch („เด๊ท“). Vokal kurz oder lang? |
| k7-motorbike | มอเตอร์ไซค์ | mor-dter-sai | Wird เตอร์ gesprochen mittel (dter) oder fallend (dtêr, „มอเต้อไซ“)? |
| k6-onemore | ขออีกอันครับ | kǒr èek an kráp | Natürlich im Restaurant? Oder lieber ขออีกที่ / ขออีกแก้ว / เอาอีกอันครับ? |
| k8-tired, k8-s-tired | เหนื่อย | nùeai | Ton (tief) sicher; Bitte Vokal bestätigen (เ-ือย, lang). |
| k7-size | ไซส์ | sai | Schreibung: ไซส์ (häufig) vs. ไซซ์ (offiziell?). |
| k6-checkbill, k7-checkin | เช็คบิล / เช็คอิน | chék-bin / chék-in | Offiziell เช็ก…, im Alltag เช็ค…; Ton hoch korrekt? |
| k7-taxi | แท็กซี่ | táek-sêe | Ton der 2. Silbe (fallend) wie gesprochen? |
| k7-bus, k7-s-train-faster | รถเมล์ | rót-me | Ton und Vokallänge von เมล์ (mittel, lang) ok? |
| k6-menu, k6-s-menu-please | เมนู | me-noo | Töne gesprochen mittel–mittel? |
| k6-coffee | กาแฟ | gaa-fae | Manche sprechen „กา-แฟ“ mit anderem Ton – mittel–mittel ok? |
| k9-s-mountain-cold | ที่ภูเขาหนาว | têe poo-kǎo nǎao | Natürlich? Evtl. besser บนภูเขาอากาศหนาว / บนดอยหนาว. |
| k7-s-stop-here | จอดที่นี่ครับ | jòrt têe-nêe kráp | Im Taxi üblicher: จอดตรงนี้ครับ? |
| k8-s-have-partner | คุณมีแฟนไหมครับ | kun mee faen mǎi kráp | Natürlicher evtl. มีแฟนหรือยังครับ. |
| k8-s-fell-in-love | ผมตกหลุมรักคุณ | pǒm dtòk-lǔm-rák kun | Klingt ohne แล้ว (ตกหลุมรักคุณแล้ว) evtl. unvollständig? |
| k8-s-dont-be-sad | อย่าเสียใจนะ | yàa sǐa-jai ná | Natürlich zum Trösten? Ggf. นะครับ (männlich, höflich). |
| k9-sun | ดวงอาทิตย์ | duang-aa-tít | Im Alltag eher พระอาทิตย์? |
| k9-s-see-doctor | ผมต้องไปหาหมอ | pǒm dtôrng bpai hǎa mǒr | ต้อง: nach Schema `or`, gesprochen oft kurz (dtông). Vokallänge bestätigen. |
| k9-tree, k9-flower | ต้นไม้ / ดอกไม้ | dtôn-mái / dòrk-mái | ไม้ als kurzes `ai` umschrieben – gesprochen eher lang (máai)? |
| k7-s-booked | ผมจองห้องไว้สองคืน | pǒm jorng hôrng wái sǒrng kuuen | Natürlich so? |

## Hinweis zur Konsistenz
Das Schema verlangt `aeo` für แ-ว (láeo, gâeo, maeo) und `uue` für ื (súue, kuuen). Andere Dateien (z. B. `dialogues.ts`) schreiben noch `láew` / `chûe` – dort ggf. angleichen.
