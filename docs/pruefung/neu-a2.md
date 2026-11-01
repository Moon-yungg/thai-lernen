
## Kapitel 10–13

Datei: `src/data/content3.ts` (203 Items: K10 50, K11 52, K12 51, K13 50). Abgleich mit PyThaiNLP erfolgt; die folgenden Punkte bitte von einem Muttersprachler prüfen.

### Töne / Umschrift (Lehnwörter und gesprochene Abweichungen)
- **ออฟฟิศ** `órp-fít` (k10-office) – PyThaiNLP sagt tief (òrp); gesprochen meist hoch. Unsicher.
- **คอมพิวเตอร์** `kom-piu-dtêr` (k10-computer) – Schrift ergibt mittel (dter); gesprochen fallend. Auch พิว evtl. hoch (píu).
- **อีเมล** `ee-men` (k10-email, k10-sendmail, k10-s-send-mail) – Umschrift folgt der Schrift (ล → n); viele sprechen „ii-meo“.
- **ฟิตเนส** `fít-nét` (k12-gym u. a.) – PyThaiNLP: เนส fallend; gesprochen hoch angenommen.
- **กีตาร์** `gee-dtâa` (k12-s-guitar) – Schrift mittel, gesprochen fallend angenommen.
- **เฟอร์นิเจอร์** `fer-ní-jer` (k11-furniture) – Lehnwort, Töne unsicher.
- **ลิฟต์** `líp` (k11-lift) – Lehnwort, hoch angenommen.
- **เมื่อกี้** `mûea-gêe` (k13-justnow) – nach Schrift fallend; umgangssprachlich oft hoch („mûea-gíi“).
- **เพิ่ง** `pêrng` (k13-justdone, k13-s-just-arrived) – auch „pûeng“ zu hören.
- **เลิก** `lêrk` (k10-finishwork, k13-cancel …) – PyThaiNLP sagt hoch; nach Regel (tief, lang, tot) fallend. Bewusst so gelassen.
- **คือ / หนังสือ / คืน / หมื่น** – nach Schema mit langem `uue` umschrieben, obwohl im Redefluss oft kurz.

### Wortwahl / Natürlichkeit
- **เจ้าของห้อง** als „Vermieter“ (k11-landlord) – passt zum Condo; alternativ เจ้าของบ้าน / เจ้าของหอ.
- **เข้างาน** „Arbeitsbeginn“ (k10-startwork) – idiomatisch? Alternativ เริ่มงาน.
- **ทำงานที่บ้าน** als „Homeoffice“ (k10-homeoffice) – auch WFH / เวิร์กฟรอมโฮม üblich.
- **ห้องนี้มีสองห้องนอน** (k11-s-two-bedrooms) – ห้อง doppelt; evtl. besser คอนโดนี้มีสองห้องนอน.
- **ต้องจ่ายเงินมัดจำสองเดือน** (k11-s-deposit) – natürlich, aber ohne Subjekt.
- **ผมชวนเพื่อนไปเที่ยวทะเล** (k12-s-invite-sea) – deutsche Übersetzung etwas frei.
- **เที่ยว** mit Hauptbedeutung „ausgehen“ (k12-trip) – deckt „reisen/Ausflug“ über alt ab; Abgrenzung zu เดินทาง prüfen.
- **อีกสิบนาทีผมจะไปถึงครับ** (k13-s-ten-minutes) – ไป evtl. überflüssig (อีกสิบนาทีผมจะถึง).

## Kapitel 14–17

Datei: `src/data/content4.ts` (`items4`, `chapters4`) – 202 Items, 28 Lektionen (k14: 51, k15: 51, k16: 51, k17: 49 Items). IDs eindeutig, alle Lektions-Items vorhanden, `tokens.join('') === th` überall, keine `th`-Dubletten mit content1/content2/letters (ไอ „husten“ kollidierte mit dem Vokal-Item v-26 und wurde durch เป็นหวัด „erkältet sein“ ersetzt; ไอ steht nur noch in Sätzen/Notiz).
Töne mit PyThaiNLP abgeglichen; verbleibende Abweichungen sind Tool-Fehler (Silbentrennung, รถ, บัตร, เม็ด, แพทย์, บาตร, สันต์, เจอ) oder gesprochene Ausnahmen (ก็ = gôr).

### Unsicher – bitte prüfen
- **ซิมการ์ด `sim-gáat`**: Lehnwort; gesprochen meist hoher Ton (káat), nach Schrift wäre es tief (gàat). Hoch gewählt.
- **ขโมย `kà-mǒi`**: zweite Silbe steigend (ข als Leitkonsonant für ม) – so im Wörterbuch; einige Lernquellen schreiben mittel.
- **สิ `sì`**: nach Schrift tief; im Alltag oft hoch (ซิ, sí) gesprochen. Tief gewählt, Notiz erwähnt die Variante.
- **หรอก `ròrk`**: im Gespräch oft kurz (ròk) – Vokallänge nach Schrift umschrieben.
- **มั้ย `mái`** als eigenes Item neben ไหม (mǎi) – bewusst als Umgangsform; Ton hoch wie gesprochen.
- **ยูโร `yoo-roh`**, **เอทีเอ็ม `e-tee-em`**, **แสตมป์ `sà-dtaem`**: Lehnwörter, Töne als mittel angenommen.
- **k14-s-how-many-days** (ส่งไปเยอรมนีกี่วันถึงครับ): Wortstellung umgangssprachlich; alternativ „…ใช้เวลากี่วันครับ“.
- **k16-think** (คิดว่า) als Phrase mit Tokens คิด|ว่า; Sätze nutzen ebenfalls getrennte Tokens.
- **k17-ja จ้ะ**: Registerhinweis (eher weiblich / zu Kindern, Partnerin) – prüfen, ob für männlichen Lerner überhaupt sinnvoll.
- **k17-s-women-monks** (ผู้หญิงห้ามจับพระ): inhaltlich korrekt, aber als Regel formuliert recht hart – evtl. „ผู้หญิงไม่ควรจับพระ“.
- **k17-s-king**: heikles Thema; bewusst neutral formuliert (ไม่ควรพูดไม่ดีเรื่องในหลวง).
- **อุบัติเหตุ `ù-bàt-dtì-hèt`**: เหตุ mit langem e gesprochen; Schema schreibt เ- als „e“.
- **k14-appointment นัดหมาย `nát-mǎai`**: statt นัด (bereits als k13-appointment in content3.ts vorhanden); Sätze verwenden weiter das kürzere นัด.
