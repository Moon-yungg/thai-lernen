# Prüfung content1.ts (Kapitel 2–5)

Geprüft: alle 197 Items (Thai-Schreibung, Bedeutung, Notizen, Tokens, Umschrift, Töne).
Töne wurden pro Silbe mit PyThaiNLP (`tone_detector`) gegen die Umschrift abgeglichen; alle Abweichungen wurden einzeln beurteilt (siehe unten).

## Änderungen

### Umschrift an das verbindliche Schema angepasst (35 Stellen, Töne unverändert)
| alt | neu | betroffen |
|---|---|---|
| kòp-kun | kòrp-kun (ขอบ = ออ → or) | ขอบคุณ (3×) |
| měuan | mǔean (เ-ือ → uea) | เหมือนกัน (2×) |
| mêua | mûea | เมื่อวาน, เมื่อไหร่ (4×) |
| chêu | chûue (ื → uue) | ชื่อ (4×) |
| dèum | dùuem | ดื่ม (2×) |
| séu | súue | ซื้อ |
| keu | kuue | คือ |
| nèung | nùeng (ึ → ue) | หนึ่ง (Item + Notiz k4-100) |
| réu | rúe (ฤ = รึ) | พฤหัส(บดี) (Item + Notiz) |
| dâai | dâi (ไ- → ai) | ได้ (7×) |
| láew | láeo (แ-ว → aeo) | แล้ว (5×) |
| sǔay | sǔai (Auslaut ย → i) | สวย (2×) |

### Inhalt
- k2-mai (ไหม): Notiz ergänzt, dass ไหม umgangssprachlich meist mit hohem Ton (mái / มั้ย) gesprochen wird.

### Keine Fehler gefunden bei
Thai-Schreibung, Tokens (alle `tokens.join('') === th`), IDs (eindeutig, alle Lektions-Referenzen vorhanden), deutschen Übersetzungen. Gesprochene Töne waren durchweg korrekt.

### Bewusst NICHT an PyThaiNLP angepasst (Tool-Fehler bzw. gesprochene Ausnahme)
ขอ kǒr (Tool: tief), เธอ ter (Tool: fallend), พบ póp (Tool: fallend), อัน an / อัง ang (Tool: tief), เล็ก lék (Tool: fallend), ศุกร์ sùk (Tool: steigend, stummes ร์), ตำรวจ dtam-rùat (Tool: fallend – gesprochen tief, unregelmäßig), sowie Silbentrennungsfehler bei สวัสดี, สบาย, วิศวกร, พนักงาน, เยอรมัน/เยอรมนี, พฤหัสบดี, โรงพยาบาล, อร่อย.

## Bitte von Thai-Lehrer:in prüfen lassen

| ID | Thai | Umschrift | Frage / Bedenken |
|---|---|---|---|
| k2-mai (+ alle Sätze mit ไหม) | ไหม | mǎi | Geschrieben steigend, im Alltag fast immer hoch (mái). Wir behalten mǎi (Schriftform, passend zur Sprachausgabe). Okay so? |
| k3-police, k3-s-police | ตำรวจ | dtam-rùat | Schriftregel ergäbe fallend (rûat); gesprochen wird tief angenommen. Bestätigen. |
| k3-germany, k3-s-fromgermany, k5-s-coldgermany | (ประเทศ)เยอรมนี | yer-rá-má-nee | Töne der Mittelsilben (rá, má) und Silbenzahl korrekt? |
| k3-german, k3-s-german, k3-s-wegerman | เยอรมัน | yer-rá-man | Wie oben: rá hoch? |
| k4-thu | วันพฤหัสบดี | wan pá-rúe-hàt-sà-bor-dee | Silbenaufteilung/Töne der Langform bestätigen. |
| k3-engineer, k3-s-engineer | วิศวกร | wít-sà-wá-gorn | Töne der Mittelsilben (sà, wá) bestätigen. |
| k3-employee | พนักงานบริษัท | pá-nák-ngaan bor-rí-sàt | bor-rí-sàt: Töne bestätigen. |
| k2-nicetomeet u.a. | ได้ | dâi | Nach Schema kurz (dâi); wird oft lang gesprochen. Unkritisch für Töne. |
| k2-seeyou, k2-s-seeyou, k4-s-seeyoutomorrow | แล้วพบกัน… | láeo póp gan … | พบ wirkt etwas förmlich; im Alltag eher เจอกัน (jer gan). Austauschen? |
| k5-s-cheapgood | ร้านนี้ถูกและอร่อย | ráan née tòok láe à-ròi | และ klingt gesprochen etwas steif; natürlicher evtl. „ร้านนี้ทั้งถูกทั้งอร่อย“. |
| k2-bye | ลาก่อน | laa gòrn | Note sagt „eher endgültig“ – Einschätzung bestätigen. |
| k5-why | ทำไม | tam-mai | Notiz „steht meist am Satzanfang“ – steht auch oft am Ende. Formulierung okay? |
| k4-mohng | โมง / เก้าโมงเช้า | mohng | 9 Uhr morgens: เก้าโมงเช้า vs. สามโมงเช้า – beide üblich? Ggf. Notiz ergänzen. |
