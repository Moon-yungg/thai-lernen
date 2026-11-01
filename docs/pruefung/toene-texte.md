# Prüfliste: Ton-Kapitel (`tones.ts`) und Lesetexte (`stories.ts`)

Automatische Prüfung: Alle 112 Wörter in den 43 Ton-Sets wurden mit PyThaiNLP (`tone_detector`) geprüft. Der aus der Schrift berechnete Ton stimmt bei allen mit der Umschrift überein. Innerhalb jedes Sets hat jedes Wort einen anderen Ton.

Bei den Lesetexten meldet PyThaiNLP 36 Sätze mit Abweichungen. Ich habe jede einzeln angesehen: Alle gehen auf Grenzen des Werkzeugs zurück, also auf falsche Silbentrennung bei Clustern und versteckten Vokalen (z. B. ตลาด, สวัส, ผลไม้, จตุจักร, โทรศัพท์) oder auf falsch erkannte tote Silben (z. B. รถ, เล็ก, ลด, เลิก). Wo es nötig war, gilt in der Umschrift der gesprochene Ton.

## Ton-Sets – bitte von Muttersprachler*in gegenhören

| Wort | Umschrift | Anmerkung |
|---|---|---|
| คา | kaa | „stecken bleiben“ – allein eher selten, wird aber für den klassischen Fünf-Ton-Satz คา/ข่า/ค่า/ค้า/ขา gebraucht. |
| ไข | kǎi | „aufschließen“ (ไขกุญแจ) – mittelhäufig. |
| ข้น / ค้น | kôn / kón | Beide Wörter sind gängig, gehören aber nicht zum A1-Wortschatz. |
| ถี่ | tèe | „dicht, häufig“ – mittelhäufig. |
| หนอง | nǒrng | „Teich, Sumpf“ (auch „Eiter“). |
| ส่าย | sàai | „(den Kopf) schütteln“ – eher selten. |
| ซวย | suai | umgangssprachlich („Pech haben“), etwas derb. Eventuell austauschen. |
| เขา | kǎo | Im Alltag wird es oft hoch gesprochen (káo). Die Umschrift folgt der Schreibung und dem übrigen Kurs (kǎo). |
| ทราย | saai | ทร wird als s gesprochen; der Ton ist mittel (ท = Tiefklasse). |
| ป้า / ย่า / ปู่ | – | Die Bedeutungen sind vereinfacht (Verwandtschaftsbezeichnungen nach Elternseite). |
| น้า | náa | Die Übersetzung „jüngere Geschwister der Mutter“ ist vereinfacht. |

## Lesetexte – unsichere Stellen

- **คอนโด** – geschrieben mit คอน, gesprochen meist „kon-doh“. Die Umschrift lautet *korn-doh* (nach Schreibung). Bitte prüfen.
- **โอเค** – umgeschrieben als *oh-ke* (mittel/mittel). Gesprochen hört man auch *oh-kay*.
- **อีเมล** – umgeschrieben als *ee-meo*, so wie es gesprochen wird.
- **เหนื่อย** – umgeschrieben als *nùeai*, weil das Schema für เ-ือย keine eigene Regel hat.
- **เที่ยว / เที่ยง** – umgeschrieben als *tîao* / *tîang*, weil das Schema für เ-ียว keine eigene Regel hat.
- **เลิก** – umgeschrieben als *lêrk* (Tiefklasse, tote Silbe mit langem Vokal → fallend).
- **เมษายน** – umgeschrieben als *me-sǎa-yon* (nach Schema เ- = e).
- **ห้อง เช่า** – in st-flat sind das zwei Tokens. Als Kompositum ห้องเช่า wäre auch ein einziges Token möglich.
- **st-weekend**: „โทร หา แม่ ที่ เยอรมัน“ – umgangssprachlich verkürzt für ที่ประเทศเยอรมนี.
- **Abweichungen vom bestehenden Kurs**: Die Umschrift folgt hier strikt dem Schema in `types.ts` (z. B. ชื่อ *chûue*, เพื่อน *pûean*, ขอบคุณ *kòrp-kun*, ข้าว *kâao*). In `content1.ts` und `content2.ts` stehen teils andere Schreibweisen (*chêu*, *kòp-kun*, *kâo*). Das betrifft nur die Umschrift, nicht die Töne.
