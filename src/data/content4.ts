// Kapitel 14–17 (A2): Bank/Post/Behörden, Gesundheit & Notfälle, Meinungen & Gespräche, Umgangssprache & Kultur
// Umschrift: verbindliches Schema aus types.ts (gesprochene Töne!).
import type { Item, Chapter, Kind } from './types'

type Extra = Partial<Omit<Item, 'id' | 'th' | 'rom' | 'de' | 'kind' | 'tokens'>>

/** Einzelwort */
const w = (id: string, th: string, rom: string, de: string, extra: Extra = {}, kind: Kind = 'word'): Item => ({
  id,
  th,
  rom,
  de,
  kind,
  ...extra,
})

/** Phrase oder Satz: Tokens mit "|" getrennt, th = Tokens zusammengefügt */
const seg = (kind: 'phrase' | 'sentence') => (id: string, tokens: string, rom: string, de: string, extra: Extra = {}): Item => {
  const tk = tokens.split('|')
  return { id, th: tk.join(''), rom, de, kind, tokens: tk, ...extra }
}
const p = seg('phrase')
const s = seg('sentence')

export const items4: Item[] = [
  // ======================= Kapitel 14: Bank, Post & Behörden =======================
  // L1 Auf der Bank
  w('k14-bank', 'ธนาคาร', 'tá-naa-kaan', 'Bank', { alt: ['die Bank', 'Geldinstitut'], emoji: '🏦' }),
  w('k14-account', 'บัญชี', 'ban-chee', 'Konto', {
    alt: ['das Konto', 'Bankkonto'],
    note: 'บัญชี heißt auch „Liste/Buchhaltung“. เลขบัญชี = Kontonummer.',
  }),
  p('k14-withdraw', 'ถอน|เงิน', 'tǒrn ngern', 'Geld abheben', { alt: ['abheben', 'Bargeld abheben'] }),
  p('k14-transfer', 'โอน|เงิน', 'ohn ngern', 'Geld überweisen', {
    alt: ['überweisen', 'Überweisung'],
    note: 'In Thailand läuft fast alles per App-Überweisung oder QR-Code (PromptPay).',
  }),
  p('k14-atm', 'ตู้|เอทีเอ็ม', 'dtôo e-tee-em', 'Geldautomat', {
    alt: ['ATM', 'Bankautomat', 'der Geldautomat'],
    emoji: '🏧',
    note: 'ตู้ = Schrank/Kasten. Ausländische Karten zahlen pro Abhebung meist 220 Baht Gebühr.',
  }),
  w('k14-card', 'บัตร', 'bàt', 'Karte', { alt: ['Bankkarte', 'Ausweiskarte', 'die Karte', 'Ticket'], emoji: '💳' }),
  w('k14-pin', 'รหัส', 'rá-hàt', 'PIN', { alt: ['Code', 'Geheimzahl', 'Passwort', 'Kennwort'] }),
  p('k14-exchange', 'แลก|เงิน', 'lâek ngern', 'Geld wechseln', {
    alt: ['wechseln', 'Geld umtauschen'],
    emoji: '💱',
    note: 'Wechselstuben heißen ร้านแลกเงิน – oft bessere Kurse als die Bank.',
  }),

  // L2 Sätze auf der Bank
  s('k14-s-open-account', 'ผม|อยาก|เปิด|บัญชี|ครับ', 'pǒm yàak bpèrt ban-chee kráp', 'Ich möchte ein Konto eröffnen.', {
    alt: ['Ich will ein Konto eröffnen', 'Ich möchte ein Konto aufmachen'],
    note: 'เปิด = öffnen – wie im Deutschen „ein Konto eröffnen“.',
  }),
  s('k14-s-where-atm', 'ตู้|เอทีเอ็ม|อยู่|ที่ไหน|ครับ', 'dtôo e-tee-em yòo têe-nǎi kráp', 'Wo ist ein Geldautomat?', {
    alt: ['Wo ist der Geldautomat', 'Wo gibt es einen Geldautomaten', 'Wo ist ein ATM'],
  }),
  s('k14-s-exchange-euro', 'ผม|อยาก|แลก|เงิน|ยูโร|ครับ', 'pǒm yàak lâek ngern yoo-roh kráp', 'Ich möchte Euro wechseln.', {
    alt: ['Ich will Euro wechseln', 'Ich möchte Euro umtauschen'],
  }),
  s('k14-s-transfer', 'ผม|จะ|โอน|เงิน|ไป|เยอรมนี|ครับ', 'pǒm jà ohn ngern bpai yer-rá-má-nee kráp', 'Ich werde Geld nach Deutschland überweisen.', {
    alt: ['Ich überweise Geld nach Deutschland', 'Ich will Geld nach Deutschland überweisen'],
  }),
  s('k14-s-card-stuck', 'บัตร|ของ|ผม|ติด|อยู่|ใน|ตู้|ครับ', 'bàt kǒrng pǒm dtìt yòo nai dtôo kráp', 'Meine Karte steckt im Automaten fest.', {
    alt: ['Meine Karte steckt im Automaten', 'Der Automat hat meine Karte eingezogen'],
    note: 'ติดอยู่ = feststecken, hängen bleiben (auch im Stau: รถติด).',
  }),
  s('k14-s-forgot-pin', 'ผม|ลืม|รหัส|ครับ', 'pǒm luuem rá-hàt kráp', 'Ich habe die PIN vergessen.', {
    alt: ['Ich habe meine PIN vergessen', 'Ich habe den Code vergessen'],
  }),
  s('k14-s-limit', 'ถอน|เงิน|ได้|วัน|ละ|เท่าไหร่|ครับ', 'tǒrn ngern dâi wan lá tâo-rài kráp', 'Wie viel kann man pro Tag abheben?', {
    alt: ['Wie viel kann ich am Tag abheben', 'Wie viel darf man pro Tag abheben'],
    note: 'วันละ … = pro Tag (wie bei กินยาวันละสามครั้ง).',
  }),

  // L3 Post
  w('k14-post', 'ไปรษณีย์', 'bprai-sà-nee', 'Post', { alt: ['Postamt', 'die Post'], emoji: '📮' }),
  w('k14-parcel', 'พัสดุ', 'pát-sà-dù', 'Paket', { alt: ['das Paket', 'Päckchen', 'Sendung'], emoji: '📦' }),
  w('k14-stamp', 'แสตมป์', 'sà-dtaem', 'Briefmarke', {
    alt: ['die Briefmarke', 'Marke'],
    note: 'Aus dem Englischen „stamp“. Zählwort: ดวง (wie bei Sonne und Sternen).',
  }),
  w('k14-letter', 'จดหมาย', 'jòt-mǎai', 'Brief', { alt: ['der Brief', 'Post'], emoji: '✉️' }),
  w('k14-send', 'ส่ง', 'sòng', 'schicken', { alt: ['senden', 'verschicken', 'bringen', 'liefern'] }),
  w('k14-address', 'ที่อยู่', 'têe-yòo', 'Adresse', {
    alt: ['die Adresse', 'Anschrift', 'Wohnort'],
    note: 'Wörtlich „Ort, wo (man) ist“ – ที่ + อยู่.',
  }),
  w('k14-registered', 'ลงทะเบียน', 'long-tá-bian', 'einschreiben', {
    alt: ['registrieren', 'Einschreiben', 'anmelden'],
    note: 'Bei der Post: ส่งลงทะเบียน = per Einschreiben schicken. Sonst allgemein „sich registrieren“.',
  }),
  w('k14-express', 'ด่วน', 'dùan', 'eilig', { alt: ['Express', 'dringend', 'schnell'] }),

  // L4 Sätze auf der Post
  s('k14-s-send-parcel', 'ผม|อยาก|ส่ง|พัสดุ|ไป|เยอรมนี|ครับ', 'pǒm yàak sòng pát-sà-dù bpai yer-rá-má-nee kráp', 'Ich möchte ein Paket nach Deutschland schicken.', {
    alt: ['Ich will ein Paket nach Deutschland schicken', 'Ich möchte ein Paket nach Deutschland senden'],
  }),
  s('k14-s-how-many-days', 'ส่ง|ไป|เยอรมนี|กี่|วัน|ถึง|ครับ', 'sòng bpai yer-rá-má-nee gèe wan tǔeng kráp', 'Wie viele Tage braucht es nach Deutschland?', {
    alt: ['Wie lange dauert es nach Deutschland', 'Wie viele Tage dauert es nach Deutschland'],
    note: 'Wörtlich „Schicken nach Deutschland – wie viele Tage – ankommen?“. ถึง = ankommen.',
  }),
  s('k14-s-three-stamps', 'ขอ|แสตมป์|สาม|ดวง|ครับ', 'kǒr sà-dtaem sǎam duang kráp', 'Drei Briefmarken, bitte.', {
    alt: ['Ich hätte gern drei Briefmarken', 'Drei Briefmarken bitte'],
  }),
  s('k14-s-express-price', 'ส่ง|ด่วน|เท่าไหร่|ครับ', 'sòng dùan tâo-rài kráp', 'Was kostet Express?', {
    alt: ['Wie viel kostet Express', 'Was kostet der Expressversand'],
    note: 'Thailändische Post: EMS = Express, ลงทะเบียน = Einschreiben.',
  }),
  s('k14-s-whats-inside', 'ข้างใน|มี|อะไร|ครับ', 'kâang-nai mee à-rai kráp', 'Was ist darin?', {
    alt: ['Was ist drin', 'Was ist im Paket', 'Was ist da drin'],
  }),
  s('k14-s-write-address', 'กรุณา|เขียน|ที่อยู่|ตรงนี้|ครับ', 'gà-rú-naa kǐan têe-yòo dtrong-née kráp', 'Bitte schreiben Sie die Adresse hierhin.', {
    alt: ['Bitte schreiben Sie die Adresse hier', 'Bitte die Adresse hier hinschreiben'],
    note: 'กรุณา = „bitte“ (förmlich, Schilder, Ämter). Im Alltag reicht ช่วย … หน่อย.',
  }),

  // L5 Behörden & Papiere
  w('k14-passport', 'หนังสือเดินทาง', 'nǎng-sǔue-dern-taang', 'Reisepass', {
    alt: ['Pass', 'der Pass', 'der Reisepass'],
    emoji: '🛂',
    note: 'Wörtlich „Reisebuch“. Umgangssprachlich auch พาสปอร์ต.',
  }),
  w('k14-visa', 'วีซ่า', 'wee-sâa', 'Visum', { alt: ['das Visum', 'Visa'] }),
  w('k14-form', 'แบบฟอร์ม', 'bàep-form', 'Formular', { alt: ['das Formular', 'Antrag', 'Vordruck'], emoji: '📝' }),
  w('k14-sign', 'เซ็นชื่อ', 'sen-chûue', 'unterschreiben', {
    alt: ['unterzeichnen', 'Unterschrift'],
    emoji: '✍️',
    note: 'เซ็น kommt vom englischen „sign“, ชื่อ = Name. Kurz auch nur เซ็น.',
  }),
  w('k14-copy', 'สำเนา', 'sǎm-nao', 'Kopie', {
    alt: ['die Kopie', 'Fotokopie', 'Abschrift'],
    note: 'Bei Ämtern immer dabei: สำเนาหนังสือเดินทาง (Passkopie) – unterschrieben!',
  }),
  w('k14-photo', 'รูปถ่าย', 'rôop-tàai', 'Foto', { alt: ['Passfoto', 'das Foto', 'Bild'] }),
  w('k14-immigration', 'ตรวจคนเข้าเมือง', 'dtrùat-kon-kâo-mueang', 'Einwanderungsbehörde', {
    alt: ['Immigration', 'Ausländerbehörde', 'Einwanderungsamt'],
    note: 'Wörtlich „Kontrolle der Menschen, die ins Land kommen“. Hier verlängert man Visa und meldet sich alle 90 Tage.',
  }),

  // L6 Service & Warten
  w('k14-sim', 'ซิมการ์ด', 'sim-gáat', 'SIM-Karte', { alt: ['SIM', 'Simkarte', 'die SIM-Karte'] }),
  p('k14-topup', 'เติม|เงิน', 'dterm ngern', 'Guthaben aufladen', {
    alt: ['aufladen', 'Handy aufladen', 'Geld aufladen'],
    note: 'เติม = auffüllen. Auch beim Tanken: เติมน้ำมัน.',
  }),
  w('k14-appointment', 'นัดหมาย', 'nát-mǎai', 'Termin', {
    alt: ['der Termin', 'Verabredung', 'Terminvereinbarung'],
    note: 'Förmlich (Arzt, Amt). Im Alltag reicht นัด: ผมมีนัด = ich habe einen Termin.',
  }),
  w('k14-wait', 'รอ', 'ror', 'warten', { alt: ['abwarten', 'auf etwas warten'], emoji: '⏳' }),
  w('k14-queue', 'คิว', 'kiu', 'Warteschlange', {
    alt: ['Schlange', 'Wartenummer', 'Reihe'],
    note: 'Aus dem Englischen „queue“. บัตรคิว = Wartenummer zum Ziehen.',
  }),
  p('k14-line-up', 'ต่อ|แถว', 'dtòr tǎeo', 'Schlange stehen', { alt: ['anstehen', 'sich anstellen'] }),
  w('k14-fee', 'ค่าธรรมเนียม', 'kâa-tam-niam', 'Gebühr', {
    alt: ['die Gebühr', 'Gebühren'],
    note: 'ค่า + … = Kosten für …: ค่าห้อง (Zimmerpreis), ค่าไฟ (Strom).',
  }),
  w('k14-documents', 'เอกสาร', 'èk-gà-sǎan', 'Dokumente', { alt: ['Unterlagen', 'Papiere', 'Dokument'], emoji: '📄' }),

  // L7 Sätze bei Behörden
  s('k14-s-extend-visa', 'ผม|ต้อง|ต่อ|วีซ่า|ครับ', 'pǒm dtôrng dtòr wee-sâa kráp', 'Ich muss mein Visum verlängern.', {
    alt: ['Ich muss das Visum verlängern', 'Ich muss mein Visum verlängern lassen'],
    note: 'ต่อ = verlängern, anschließen. ต่อวีซ่า macht man beim ตรวจคนเข้าเมือง.',
  }),
  s('k14-s-which-docs', 'ต้อง|ใช้|เอกสาร|อะไร|บ้าง|ครับ', 'dtôrng chái èk-gà-sǎan à-rai bâang kráp', 'Welche Dokumente brauche ich?', {
    alt: ['Welche Unterlagen brauche ich', 'Welche Papiere braucht man'],
    note: 'อะไรบ้าง = „was alles“ – erwartet eine Aufzählung.',
  }),
  s('k14-s-sign-here', 'เซ็นชื่อ|ตรงนี้|นะ|ครับ', 'sen-chûue dtrong-née ná kráp', 'Unterschreiben Sie bitte hier.', {
    alt: ['Bitte hier unterschreiben', 'Unterschreib bitte hier'],
  }),
  s('k14-s-wait-long', 'ต้อง|รอ|คิว|นาน|ไหม|ครับ', 'dtôrng ror kiu naan mǎi kráp', 'Muss man lange warten?', {
    alt: ['Muss ich lange warten', 'Ist die Wartezeit lang', 'Muss man lange anstehen'],
  }),
  s('k14-s-appointment', 'ผม|มี|นัด|ตอน|บ่าย|สอง|โมง|ครับ', 'pǒm mee nát dtorn bàai sǒrng mohng kráp', 'Ich habe um 14 Uhr einen Termin.', {
    alt: ['Ich habe um zwei Uhr nachmittags einen Termin', 'Ich habe einen Termin um 14 Uhr'],
    note: 'บ่ายสองโมง = 14 Uhr (nachmittags zählt man ab บ่ายโมง = 13 Uhr).',
  }),
  s('k14-s-buy-sim', 'ผม|อยาก|ซื้อ|ซิมการ์ด|ครับ', 'pǒm yàak súue sim-gáat kráp', 'Ich möchte eine SIM-Karte kaufen.', {
    alt: ['Ich will eine SIM-Karte kaufen', 'Ich möchte eine SIM kaufen'],
    note: 'Für eine SIM-Karte brauchst du deinen Pass – sie wird darauf registriert.',
  }),
  s('k14-s-topup', 'ช่วย|เติม|เงิน|สาม|ร้อย|บาท|ครับ', 'chûai dterm ngern sǎam rói bàat kráp', 'Bitte 300 Baht aufladen.', {
    alt: ['Laden Sie bitte 300 Baht auf', 'Bitte dreihundert Baht aufladen'],
    note: 'ช่วย … = „Helfen Sie mir …“, eine höfliche Bitte.',
  }),

  // ======================= Kapitel 15: Gesundheit & Notfälle =======================
  // L1 Symptome
  p('k15-cold', 'เป็น|หวัด', 'bpen wàt', 'erkältet sein', {
    alt: ['Erkältung', 'erkältet', 'eine Erkältung haben'],
    note: 'หวัด = Erkältung. Dazu passt ไอ = husten (ยาแก้ไอ = Hustenmittel).',
  }),
  p('k15-sore-throat', 'เจ็บ|คอ', 'jèp kor', 'Halsschmerzen', {
    alt: ['Halsweh', 'Hals tut weh'],
    note: 'คอ = Hals. เจ็บ für stechenden/wunden Schmerz, ปวด für dumpfen (Kopf, Bauch).',
  }),
  w('k15-diarrhea', 'ท้องเสีย', 'tórng-sǐa', 'Durchfall', {
    alt: ['Durchfall haben', 'der Durchfall'],
    note: 'Wörtlich „Bauch kaputt“ (เสีย = verdorben, kaputt).',
  }),
  w('k15-nausea', 'คลื่นไส้', 'klûuen-sâi', 'übel', { alt: ['Übelkeit', 'mir ist übel', 'schlecht (Magen)'], emoji: '🤢' }),
  w('k15-dizzy', 'เวียนหัว', 'wian-hǔa', 'schwindlig', { alt: ['Schwindel', 'mir ist schwindlig'], emoji: '😵' }),
  p('k15-runny-nose', 'น้ำมูก|ไหล', 'náam-môok lǎi', 'laufende Nase', {
    alt: ['Schnupfen', 'die Nase läuft'],
    emoji: '🤧',
    note: 'น้ำมูก = Nasenschleim, ไหล = fließen.',
  }),
  w('k15-allergic', 'แพ้', 'páe', 'allergisch sein', {
    alt: ['allergisch', 'Allergie', 'nicht vertragen', 'verlieren'],
    note: 'แพ้ heißt auch „verlieren“ (im Spiel). แพ้ + Sache = allergisch gegen …',
  }),
  p('k15-high-fever', 'ไข้|สูง', 'kâi sǒong', 'hohes Fieber', { alt: ['starkes Fieber'] }),

  // L2 Beim Arzt
  s('k15-s-cough-since', 'ผม|ไอ|มาก|ตั้งแต่|เมื่อวาน|ครับ', 'pǒm ai mâak dtâng-dtàe mûea-waan kráp', 'Ich huste seit gestern stark.', {
    alt: ['Ich huste seit gestern sehr', 'Seit gestern huste ich stark'],
    note: 'ตั้งแต่ = seit.',
  }),
  s('k15-s-diarrhea', 'ผม|ท้องเสีย|ครับ', 'pǒm tórng-sǐa kráp', 'Ich habe Durchfall.', { alt: ['Ich hab Durchfall'] }),
  s('k15-s-throat-nose', 'ผม|เจ็บ|คอ|และ|น้ำมูก|ไหล|ครับ', 'pǒm jèp kor láe náam-môok lǎi kráp', 'Ich habe Halsschmerzen und eine laufende Nase.', {
    alt: ['Mir tut der Hals weh und meine Nase läuft', 'Ich habe Halsweh und Schnupfen'],
  }),
  s('k15-s-allergic-nuts', 'ผม|แพ้|ถั่ว|ครับ', 'pǒm páe tùa kráp', 'Ich bin allergisch gegen Nüsse.', {
    alt: ['Ich habe eine Nussallergie', 'Ich vertrage keine Nüsse', 'Ich bin gegen Erdnüsse allergisch'],
    note: 'ถั่ว = Bohnen, Nüsse, Hülsenfrüchte allgemein. Erdnuss = ถั่วลิสง – steckt oft in Thai-Gerichten!',
  }),
  s('k15-s-nausea', 'ผม|รู้สึก|คลื่นไส้|และ|เวียนหัว|ครับ', 'pǒm róo-sùek klûuen-sâi láe wian-hǔa kráp', 'Mir ist übel und schwindlig.', {
    alt: ['Ich fühle mich übel und schwindlig', 'Mir ist schlecht und schwindlig'],
  }),
  s('k15-s-high-fever', 'มี|ไข้|สูง|ไหม|ครับ', 'mee kâi sǒong mǎi kráp', 'Haben Sie hohes Fieber?', {
    alt: ['Hast du hohes Fieber', 'Haben Sie starkes Fieber'],
  }),
  s('k15-s-three-days', 'ผม|เป็น|มา|สาม|วัน|แล้ว|ครับ', 'pǒm bpen maa sǎam wan láeo kráp', 'Ich habe das seit drei Tagen.', {
    alt: ['Das habe ich schon seit drei Tagen', 'Seit drei Tagen schon'],
    note: 'Verb + มา + Zeitdauer + แล้ว = „schon seit …“. เป็น steht hier für „krank sein / es haben“.',
  }),

  // L3 Apotheke & Versicherung
  w('k15-pharmacy', 'ร้านขายยา', 'ráan-kǎai-yaa', 'Apotheke', {
    alt: ['die Apotheke', 'Drogerie'],
    note: 'Wörtlich „Laden, der Medizin verkauft“. Viele Medikamente gibt es dort ohne Rezept.',
  }),
  w('k15-pharmacist', 'เภสัชกร', 'pee-sàt-chá-gorn', 'Apotheker', { alt: ['Apothekerin', 'der Apotheker'] }),
  w('k15-pill', 'ยาเม็ด', 'yaa-mét', 'Tablette', {
    alt: ['Pille', 'die Tablette', 'Tabletten'],
    emoji: '💊',
    note: 'เม็ด ist auch das Zählwort für Tabletten: สองเม็ด = zwei Tabletten.',
  }),
  w('k15-painkiller', 'ยาแก้ปวด', 'yaa-gâe-bpùat', 'Schmerzmittel', {
    alt: ['Schmerztablette', 'das Schmerzmittel'],
    note: 'ยาแก้ + Beschwerde = Mittel gegen …: ยาแก้ไอ (Husten), ยาแก้แพ้ (Allergie).',
  }),
  w('k15-prescription', 'ใบสั่งยา', 'bai-sàng-yaa', 'Rezept', { alt: ['das Rezept', 'ärztliches Rezept'] }),
  p('k15-before-meal', 'ก่อน|อาหาร', 'gòrn aa-hǎan', 'vor dem Essen', { alt: ['vor den Mahlzeiten', 'vor der Mahlzeit'] }),
  p('k15-after-meal', 'หลัง|อาหาร', 'lǎng aa-hǎan', 'nach dem Essen', { alt: ['nach den Mahlzeiten', 'nach der Mahlzeit'] }),
  w('k15-insurance', 'ประกัน', 'bprà-gan', 'Versicherung', {
    alt: ['die Versicherung', 'versichern', 'Garantie'],
    note: 'ประกันสุขภาพ = Krankenversicherung, ประกันการเดินทาง = Reiseversicherung.',
  }),

  // L4 In der Apotheke
  s('k15-s-cough-medicine', 'มี|ยาแก้ไอ|ไหม|ครับ', 'mee yaa-gâe-ai mǎi kráp', 'Haben Sie etwas gegen Husten?', {
    alt: ['Haben Sie Hustenmedizin', 'Gibt es Hustensaft', 'Haben Sie ein Hustenmittel'],
  }),
  s('k15-s-need-prescription', 'ยา|นี้|ต้อง|มี|ใบสั่งยา|ไหม|ครับ', 'yaa née dtôrng mee bai-sàng-yaa mǎi kráp', 'Braucht man für dieses Medikament ein Rezept?', {
    alt: ['Ist das Medikament rezeptpflichtig', 'Braucht man dafür ein Rezept'],
  }),
  s('k15-s-two-pills', 'กิน|ครั้ง|ละ|สอง|เม็ด|ครับ', 'gin kráng lá sǒrng mét kráp', 'Nehmen Sie jeweils zwei Tabletten.', {
    alt: ['Jedes Mal zwei Tabletten nehmen', 'Zwei Tabletten pro Einnahme'],
    note: 'Medizin „isst“ man auf Thai: กินยา. ครั้งละ = pro Mal.',
  }),
  s('k15-s-after-meal', 'กิน|หลัง|อาหาร|นะ|ครับ', 'gin lǎng aa-hǎan ná kráp', 'Nach dem Essen einnehmen.', {
    alt: ['Bitte nach dem Essen nehmen', 'Nehmen Sie es nach dem Essen'],
  }),
  s('k15-s-drowsy', 'ยา|นี้|ทำให้|ง่วง|ไหม|ครับ', 'yaa née tam-hâi ngûang mǎi kráp', 'Macht dieses Medikament müde?', {
    alt: ['Macht das Medikament müde', 'Wird man davon müde'],
    note: 'ทำให้ + Zustand = „bewirken, dass …“, „machen“.',
  }),
  s('k15-s-nearest-pharmacy', 'ร้านขายยา|ที่|ใกล้|ที่สุด|อยู่|ที่ไหน|ครับ', 'ráan-kǎai-yaa têe glâi têe-sùt yòo têe-nǎi kráp', 'Wo ist die nächste Apotheke?', {
    alt: ['Wo ist die nächstgelegene Apotheke', 'Wo ist eine Apotheke in der Nähe'],
  }),

  // L5 Notfall
  w('k15-help', 'ช่วยด้วย', 'chûai-dûai', 'Hilfe!', { alt: ['Hilfe', 'Helft mir', 'Hilfe bitte'], emoji: '🆘' }),
  w('k15-accident', 'อุบัติเหตุ', 'ù-bàt-dtì-hèt', 'Unfall', { alt: ['der Unfall', 'Unglück'], emoji: '💥' }),
  w('k15-fire', 'ไฟไหม้', 'fai-mâi', 'Feuer!', {
    alt: ['Feuer', 'Brand', 'es brennt'],
    emoji: '🔥',
    note: 'ไฟ = Feuer/Licht, ไหม้ = brennen. Feuerwehr: 199.',
  }),
  w('k15-ambulance', 'รถพยาบาล', 'rót-pá-yaa-baan', 'Krankenwagen', {
    alt: ['Rettungswagen', 'Ambulanz', 'der Krankenwagen'],
    emoji: '🚑',
    note: 'พยาบาล = pflegen/Krankenschwester – wie in โรงพยาบาล. Notruf: 1669.',
  }),
  p('k15-emergency-number', 'เบอร์|ฉุกเฉิน', 'ber chùk-chěrn', 'Notrufnummer', {
    alt: ['Notruf', 'Notfallnummer'],
    note: 'ฉุกเฉิน = Notfall. In Thailand: 191 Polizei, 1669 Rettung, 199 Feuerwehr, 1155 Touristenpolizei (Englisch).',
  }),
  w('k15-thief', 'ขโมย', 'kà-mǒi', 'Dieb', {
    alt: ['stehlen', 'klauen', 'der Dieb'],
    note: 'Nomen und Verb zugleich. Zweite Silbe steigend, weil ข das ม „mitzieht“.',
  }),
  w('k15-report', 'แจ้งความ', 'jâeng-kwaam', 'Anzeige erstatten', { alt: ['Anzeige', 'anzeigen', 'melden'] }),
  w('k15-wallet', 'กระเป๋าสตางค์', 'grà-bpǎo-sà-dtaang', 'Geldbörse', {
    alt: ['Portemonnaie', 'Geldbeutel', 'die Geldbörse', 'Brieftasche'],
    emoji: '👛',
    note: 'กระเป๋า = Tasche, สตางค์ = Satang (Cent) bzw. Geld.',
  }),

  // L6 Im Notfall
  s('k15-s-call-ambulance', 'เรียก|รถพยาบาล|ด้วย|ครับ', 'rîak rót-pá-yaa-baan dûai kráp', 'Rufen Sie bitte einen Krankenwagen!', {
    alt: ['Ruf einen Krankenwagen', 'Bitte einen Krankenwagen rufen', 'Rufen Sie einen Krankenwagen'],
    note: '… ด้วย am Satzende macht eine dringende Bitte.',
  }),
  s('k15-s-call-police', 'เรียก|ตำรวจ|ด้วย|ครับ', 'rîak dtam-rùat dûai kráp', 'Rufen Sie bitte die Polizei!', {
    alt: ['Ruf die Polizei', 'Bitte die Polizei rufen', 'Rufen Sie die Polizei'],
  }),
  s('k15-s-accident', 'มี|อุบัติเหตุ|ครับ', 'mee ù-bàt-dtì-hèt kráp', 'Es hat einen Unfall gegeben.', {
    alt: ['Es gab einen Unfall', 'Da ist ein Unfall'],
  }),
  s('k15-s-injured', 'มี|คน|เจ็บ|ครับ', 'mee kon jèp kráp', 'Jemand ist verletzt.', {
    alt: ['Es gibt Verletzte', 'Hier ist ein Verletzter', 'Jemand ist verletzt'],
  }),
  s('k15-s-cant-breathe', 'เขา|หายใจ|ไม่|ออก|ครับ', 'kǎo hǎai-jai mâi òrk kráp', 'Er bekommt keine Luft.', {
    alt: ['Er kann nicht atmen', 'Sie bekommt keine Luft', 'Sie kann nicht atmen'],
    note: 'หายใจ = atmen. Verb + ไม่ออก = „kriegt es nicht hin“ (wörtlich: kommt nicht heraus).',
  }),
  s('k15-s-fire-floor', 'ไฟไหม้|ที่|ชั้น|สาม|ครับ', 'fai-mâi têe chán sǎam kráp', 'Im dritten Stock brennt es.', {
    alt: ['Feuer im dritten Stock', 'Es brennt im dritten Stock'],
  }),
  s('k15-s-hit-by-car', 'ผม|โดน|รถ|ชน|ครับ', 'pǒm dohn rót chon kráp', 'Ich bin von einem Auto angefahren worden.', {
    alt: ['Ich wurde von einem Auto angefahren', 'Mich hat ein Auto angefahren'],
    note: 'โดน = Passiv für Unangenehmes („erleiden“). ชน = zusammenstoßen.',
  }),

  // L7 Polizei & Versicherung
  s('k15-s-wallet-stolen', 'กระเป๋าสตางค์|ของ|ผม|โดน|ขโมย|ครับ', 'grà-bpǎo-sà-dtaang kǒrng pǒm dohn kà-mǒi kráp', 'Meine Geldbörse wurde gestohlen.', {
    alt: ['Mein Portemonnaie wurde gestohlen', 'Man hat meine Geldbörse gestohlen'],
  }),
  s('k15-s-passport-lost', 'หนังสือเดินทาง|ของ|ผม|หาย|ครับ', 'nǎng-sǔue-dern-taang kǒrng pǒm hǎai kráp', 'Mein Pass ist weg.', {
    alt: ['Ich habe meinen Pass verloren', 'Mein Reisepass ist verschwunden'],
    note: 'หาย = verschwinden, weg sein (auch: gesund werden – หายแล้ว = wieder gesund).',
  }),
  s('k15-s-file-report', 'ผม|ต้องการ|แจ้งความ|ครับ', 'pǒm dtôrng-gaan jâeng-kwaam kráp', 'Ich möchte Anzeige erstatten.', {
    alt: ['Ich will Anzeige erstatten', 'Ich möchte eine Anzeige machen'],
    note: 'ต้องการ = benötigen, wünschen – förmlicher als อยาก. Für die Versicherung brauchst du das Protokoll (ใบแจ้งความ).',
  }),
  s('k15-s-police-station', 'สถานี|ตำรวจ|อยู่|ที่ไหน|ครับ', 'sà-tǎa-nee dtam-rùat yòo têe-nǎi kráp', 'Wo ist die Polizeiwache?', {
    alt: ['Wo ist die Polizeistation', 'Wo ist die Polizei'],
  }),
  s('k15-s-travel-insurance', 'ผม|มี|ประกัน|การเดินทาง|ครับ', 'pǒm mee bprà-gan gaan-dern-taang kráp', 'Ich habe eine Reiseversicherung.', {
    alt: ['Ich bin reiseversichert', 'Ich habe eine Auslandsreiseversicherung'],
  }),
  s('k15-s-insurance-pay', 'ประกัน|จ่าย|ไหม|ครับ', 'bprà-gan jàai mǎi kráp', 'Zahlt die Versicherung?', {
    alt: ['Übernimmt die Versicherung das', 'Bezahlt das die Versicherung'],
  }),
  s('k15-s-medical-cert', 'ขอ|ใบรับรองแพทย์|ด้วย|ครับ', 'kǒr bai-ráp-rorng-pâet dûai kráp', 'Ich hätte gern ein ärztliches Attest.', {
    alt: ['Bitte ein ärztliches Attest', 'Ein Attest bitte', 'Ich brauche ein ärztliches Attest'],
    note: 'แพทย์ = Arzt (förmlich, sonst หมอ). Rechnung + Attest für die Versicherung aufheben!',
  }),

  // ======================= Kapitel 16: Meinungen & Gespräche =======================
  // L1 Denken & Meinen
  p('k16-think', 'คิด|ว่า', 'kít wâa', 'denken, dass', {
    alt: ['glauben', 'meinen', 'finden', 'denken'],
    note: 'คิดว่า + Satz = „ich denke/finde, dass …“ – die Standardform für Meinungen.',
  }),
  w('k16-believe', 'เชื่อ', 'chûea', 'glauben', { alt: ['vertrauen', 'jemandem glauben'] }),
  w('k16-feel', 'รู้สึก', 'róo-sùek', 'fühlen', {
    alt: ['sich fühlen', 'das Gefühl haben', 'empfinden'],
    note: 'รู้สึกว่า … = „ich habe das Gefühl, dass …“ – weicher als คิดว่า.',
  }),
  w('k16-agree', 'เห็นด้วย', 'hěn-dûai', 'einverstanden', {
    alt: ['zustimmen', 'einer Meinung sein', 'der gleichen Meinung'],
    emoji: '👍',
    note: 'Wörtlich „mit-sehen“.',
  }),
  p('k16-disagree', 'ไม่|เห็นด้วย', 'mâi hěn-dûai', 'nicht einverstanden', {
    alt: ['anderer Meinung', 'nicht zustimmen', 'dagegen'],
    emoji: '👎',
  }),
  w('k16-opinion', 'ความคิดเห็น', 'kwaam-kít-hěn', 'Meinung', {
    alt: ['Ansicht', 'die Meinung', 'Standpunkt'],
    note: 'ความ + Verb/Adjektiv macht ein Nomen: ความสุข = Glück, ความรัก = Liebe.',
  }),
  w('k16-true', 'จริง', 'jing', 'wahr', { alt: ['wirklich', 'echt', 'richtig'] }),
  w('k16-correct', 'ถูกต้อง', 'tòok-dtôrng', 'richtig', { alt: ['korrekt', 'stimmt', 'genau'], emoji: '✅' }),

  // L2 Meinung sagen
  s('k16-s-thai-food-best', 'ผม|คิด|ว่า|อาหาร|ไทย|อร่อย|ที่สุด', 'pǒm kít wâa aa-hǎan tai à-ròi têe-sùt', 'Ich finde, thailändisches Essen ist das leckerste.', {
    alt: ['Ich denke, Thai-Essen ist am leckersten', 'Ich finde Thai-Essen am leckersten'],
  }),
  s('k16-s-what-think', 'คุณ|คิด|ว่า|ยังไง|ครับ', 'kun kít wâa yang-ngai kráp', 'Was meinst du?', {
    alt: ['Was denkst du', 'Was meinen Sie', 'Wie findest du das'],
    note: 'ยังไง = wie (umgangssprachlich für อย่างไร). Nicht „คิดว่าอะไร“!',
  }),
  s('k16-s-agree', 'ผม|เห็นด้วย|ครับ', 'pǒm hěn-dûai kráp', 'Da stimme ich zu.', {
    alt: ['Ich bin einverstanden', 'Ich stimme zu', 'Ich bin der gleichen Meinung'],
  }),
  s('k16-s-not-quite', 'ผม|ไม่ค่อย|เห็นด้วย|ครับ', 'pǒm mâi-kôi hěn-dûai kráp', 'Da bin ich nicht ganz einverstanden.', {
    alt: ['Ich stimme nicht ganz zu', 'Ich bin nicht so ganz einverstanden'],
    note: 'ไม่ค่อย = „nicht so sehr“. Direktes Widersprechen wirkt in Thailand schnell unhöflich – ไม่ค่อย macht es weicher.',
  }),
  s('k16-s-really', 'จริง|เหรอ|ครับ', 'jing rěr kráp', 'Wirklich?', {
    alt: ['Echt', 'Ist das wahr', 'Im Ernst'],
    note: 'เหรอ = überraschte Rückfrage („ach ja?“). Mehr dazu im Kapitel Umgangssprache.',
  }),
  s('k16-s-believe', 'ผม|เชื่อ|ว่า|เขา|พูด|จริง', 'pǒm chûea wâa kǎo pôot jing', 'Ich glaube, er sagt die Wahrheit.', {
    alt: ['Ich glaube, dass er die Wahrheit sagt', 'Ich glaube, sie sagt die Wahrheit'],
  }),
  s('k16-s-too-hot', 'ผม|รู้สึก|ว่า|ที่นี่|ร้อน|เกินไป', 'pǒm róo-sùek wâa têe-nêe rórn gern-bpai', 'Ich finde, hier ist es zu heiß.', {
    alt: ['Ich habe das Gefühl, hier ist es zu heiß', 'Mir ist es hier zu heiß'],
    note: 'Adjektiv + เกินไป = „zu …“ (zu viel des Guten).',
  }),

  // L3 Verbindungswörter
  w('k16-because', 'เพราะ', 'prór', 'weil', { alt: ['denn', 'da'], note: 'Für die Frage „warum?“ antwortet man mit เพราะ … – auch allein am Satzanfang.' }),
  w('k16-but', 'แต่', 'dtàe', 'aber', { alt: ['sondern', 'jedoch'] }),
  w('k16-so', 'ก็เลย', 'gôr-loei', 'deshalb', {
    alt: ['darum', 'also', 'deswegen', 'daher'],
    note: 'Steht nach dem Subjekt: ผมก็เลยไม่ไป = „deshalb gehe ich nicht“. Umgangssprachlich auch nur เลย.',
  }),
  w('k16-if', 'ถ้า', 'tâa', 'wenn', {
    alt: ['falls', 'ob'],
    note: 'Typisch: ถ้า …, ก็ … = „wenn …, dann …“.',
  }),
  w('k16-maybe', 'อาจจะ', 'àat-jà', 'vielleicht', { alt: ['möglicherweise', 'eventuell', 'könnte'] }),
  w('k16-sure', 'แน่นอน', 'nâe-norn', 'sicher', { alt: ['bestimmt', 'natürlich', 'auf jeden Fall', 'klar'] }),
  p('k16-actually', 'จริงๆ|แล้ว', 'jing-jing láeo', 'eigentlich', {
    alt: ['ehrlich gesagt', 'in Wirklichkeit', 'tatsächlich'],
    note: 'Leitet eine Richtigstellung oder ein Geständnis ein.',
  }),
  w('k16-both', 'ทั้ง', 'táng', 'sowohl', {
    alt: ['sowohl … als auch', 'beide', 'ganz'],
    note: 'ทั้ง A และ B = sowohl A als auch B. ทั้งหมด = alles, insgesamt.',
  }),

  // L4 Gründe & Bedingungen
  s('k16-s-learn-because', 'ผม|เรียน|ภาษา|ไทย|เพราะ|ผม|ชอบ|ประเทศไทย', 'pǒm rian paa-sǎa tai prór pǒm chôrp bprà-têt tai', 'Ich lerne Thai, weil ich Thailand mag.', {
    alt: ['Ich lerne Thai, weil ich Thailand liebe', 'Ich lerne Thailändisch, weil ich Thailand mag'],
    note: 'Wortstellung nach เพราะ bleibt normal (S–V–O), anders als im deutschen Nebensatz.',
  }),
  s('k16-s-rain-so', 'วันนี้|ฝน|ตก|ผม|ก็เลย|ไม่|ไป', 'wan-née fǒn dtòk pǒm gôr-loei mâi bpai', 'Heute regnet es, deshalb gehe ich nicht.', {
    alt: ['Heute regnet es, also gehe ich nicht', 'Es regnet heute, darum gehe ich nicht'],
  }),
  s('k16-s-tasty-but', 'อาหาร|นี้|อร่อย|แต่|เผ็ด|ไป|หน่อย', 'aa-hǎan née à-ròi dtàe pèt bpai nòi', 'Das Essen ist lecker, aber etwas zu scharf.', {
    alt: ['Das Essen ist lecker, aber ein bisschen zu scharf', 'Lecker, aber etwas zu scharf'],
    note: 'Adjektiv + ไปหน่อย = „etwas zu …“ – höflich verpackte Kritik.',
  }),
  s('k16-s-if-free', 'ถ้า|พรุ่งนี้|ว่าง|ไป|ทะเล|กัน|ไหม', 'tâa prûng-née wâang bpai tá-le gan mǎi', 'Wenn du morgen Zeit hast, fahren wir ans Meer?', {
    alt: ['Wenn du morgen frei hast, wollen wir ans Meer', 'Falls du morgen Zeit hast, gehen wir ans Meer'],
    note: 'ว่าง = frei, Zeit haben. Subjekt „du“ fällt weg, weil es klar ist.',
  }),
  s('k16-s-maybe-late', 'เขา|อาจจะ|มา|สาย|ครับ', 'kǎo àat-jà maa sǎai kráp', 'Er kommt vielleicht zu spät.', {
    alt: ['Sie kommt vielleicht zu spät', 'Er kommt möglicherweise spät'],
    note: 'มาสาย = zu spät kommen (สาย = spät am Vormittag).',
  }),
  s('k16-s-actually-beer', 'จริงๆ|แล้ว|ผม|ไม่|ชอบ|เบียร์', 'jing-jing láeo pǒm mâi chôrp bia', 'Eigentlich mag ich kein Bier.', {
    alt: ['Ehrlich gesagt mag ich kein Bier', 'Eigentlich mag ich Bier nicht'],
  }),
  s('k16-s-both', 'ผม|ชอบ|ทั้ง|อาหาร|ไทย|และ|อาหาร|เยอรมัน', 'pǒm chôrp táng aa-hǎan tai láe aa-hǎan yer-rá-man', 'Ich mag sowohl thailändisches als auch deutsches Essen.', {
    alt: ['Ich mag thailändisches und deutsches Essen', 'Ich mag sowohl Thai-Essen als auch deutsches Essen'],
  }),

  // L5 Im Gespräch
  w('k16-topic', 'เรื่อง', 'rûeang', 'Sache', {
    alt: ['Thema', 'Geschichte', 'Angelegenheit', 'über'],
    note: 'Auch „über“: คุยเรื่องงาน = über die Arbeit reden.',
  }),
  w('k16-problem', 'ปัญหา', 'bpan-hǎa', 'Problem', { alt: ['das Problem', 'Schwierigkeit'] }),
  w('k16-okay', 'ตกลง', 'dtòk-long', 'abgemacht', {
    alt: ['okay', 'einverstanden', 'in Ordnung', 'ok'],
    emoji: '👌',
    note: 'Als Frage (ตกลงไหม?) = „Abgemacht?“. Am Satzanfang auch „also, letztlich …“.',
  }),
  w('k16-up-to-you', 'แล้วแต่', 'láeo-dtàe', 'je nachdem', {
    alt: ['wie du willst', 'das hängt davon ab', 'kommt darauf an'],
    note: 'แล้วแต่คุณ = „wie du willst“. Sehr häufig – Thais überlassen gern dem anderen die Wahl.',
  }),
  w('k16-fine-too', 'ก็ได้', 'gôr-dâi', 'geht auch', { alt: ['meinetwegen', 'auch gut', 'ist auch okay', 'kann man machen'] }),
  w('k16-important', 'สำคัญ', 'sǎm-kan', 'wichtig', { alt: ['bedeutend'] }),
  w('k16-easy', 'ง่าย', 'ngâai', 'einfach', { alt: ['leicht', 'simpel'] }),
  w('k16-difficult', 'ยาก', 'yâak', 'schwierig', { alt: ['schwer', 'kompliziert'] }),

  // L6 Gesprächsfloskeln
  s('k16-s-not-difficult', 'ภาษา|ไทย|ไม่|ยาก|แต่|ต้อง|ฝึก|ทุก|วัน', 'paa-sǎa tai mâi yâak dtàe dtôrng fùek túk wan', 'Thai ist nicht schwer, aber man muss jeden Tag üben.', {
    alt: ['Thai ist nicht schwierig, aber man muss täglich üben', 'Thailändisch ist nicht schwer, aber man muss jeden Tag üben'],
    note: 'ฝึก = üben, trainieren. ทุกวัน = jeden Tag.',
  }),
  s('k16-s-important', 'เรื่อง|นี้|สำคัญ|มาก', 'rûeang née sǎm-kan mâak', 'Diese Sache ist sehr wichtig.', {
    alt: ['Das ist sehr wichtig', 'Dieses Thema ist sehr wichtig'],
  }),
  s('k16-s-okay-tomorrow', 'ตกลง|เจอ|กัน|พรุ่งนี้|นะ|ครับ', 'dtòk-long jer gan prûng-née ná kráp', 'Abgemacht, wir sehen uns morgen.', {
    alt: ['Okay, bis morgen', 'Gut, wir sehen uns morgen', 'Okay, wir sehen uns morgen'],
    note: 'เจอกัน = sich treffen – lockerer als พบกัน.',
  }),
  s('k16-s-up-to-you', 'แล้วแต่|คุณ|ครับ', 'láeo-dtàe kun kráp', 'Wie du willst.', {
    alt: ['Du entscheidest', 'Ganz wie Sie wollen', 'Wie Sie möchten'],
  }),
  s('k16-s-tomorrow-fine', 'ไป|พรุ่งนี้|ก็ได้|ครับ', 'bpai prûng-née gôr-dâi kráp', 'Wir können auch morgen gehen.', {
    alt: ['Morgen geht auch', 'Wir können auch morgen hin'],
  }),
  s('k16-s-german-right', 'คุณ|เป็น|คน|เยอรมัน|ใช่ไหม|ครับ', 'kun bpen kon yer-rá-man châi-mǎi kráp', 'Du bist Deutscher, oder?', {
    alt: ['Sie sind Deutscher, nicht wahr', 'Du bist doch Deutscher', 'Bist du Deutscher, oder'],
    note: 'ใช่ไหม am Satzende = „…, oder? / nicht wahr?“ – man erwartet Zustimmung.',
  }),
  s('k16-s-no-problem', 'ไม่|มี|ปัญหา|แน่นอน|ครับ', 'mâi mee bpan-hǎa nâe-norn kráp', 'Ganz sicher kein Problem.', {
    alt: ['Kein Problem, ganz sicher', 'Sicher kein Problem', 'Bestimmt kein Problem'],
  }),

  // L7 Meinungen begründen
  s('k16-s-think-because', 'ผม|คิด|ว่า|เขา|ไม่|มา|เพราะ|ฝน|ตก', 'pǒm kít wâa kǎo mâi maa prór fǒn dtòk', 'Ich glaube, er kommt nicht, weil es regnet.', {
    alt: ['Ich denke, er kommt nicht, weil es regnet', 'Ich glaube, sie kommt nicht, weil es regnet'],
  }),
  s('k16-s-tell-me', 'ถ้า|คุณ|ไม่|เห็นด้วย|ก็|บอก|ได้|นะ|ครับ', 'tâa kun mâi hěn-dûai gôr bòrk dâi ná kráp', 'Wenn du nicht einverstanden bist, sag es ruhig.', {
    alt: ['Wenn du anderer Meinung bist, kannst du es sagen', 'Wenn Sie nicht einverstanden sind, sagen Sie es ruhig'],
    note: 'ถ้า …, ก็ … = „wenn …, dann …“. บอก = sagen, mitteilen.',
  }),
  s('k16-s-i-think-better', 'ผม|ว่า|ร้าน|นี้|ดี|กว่า', 'pǒm wâa ráan née dee gwàa', 'Ich finde, dieser Laden ist besser.', {
    alt: ['Ich finde dieses Restaurant besser', 'Ich glaube, dieser Laden ist besser'],
    note: 'ผมว่า … = umgangssprachlich „ich finde …“ (ohne คิด).',
  }),
  s('k16-s-talks-too-much', 'เขา|เป็น|คน|ดี|แต่|พูด|มาก|ไป|หน่อย', 'kǎo bpen kon dee dtàe pôot mâak bpai nòi', 'Er ist nett, aber redet etwas zu viel.', {
    alt: ['Er ist ein guter Mensch, aber redet etwas zu viel', 'Sie ist nett, aber redet ein bisschen zu viel'],
  }),
  s('k16-s-not-sure', 'ผม|ไม่|แน่ใจ|ว่า|เขา|จะ|มา|ไหม', 'pǒm mâi nâe-jai wâa kǎo jà maa mǎi', 'Ich bin nicht sicher, ob er kommt.', {
    alt: ['Ich weiß nicht sicher, ob er kommt', 'Ich bin mir nicht sicher, ob sie kommt'],
    note: 'แน่ใจ = (sich) sicher sein. „ob“ = ว่า … ไหม.',
  }),
  s('k16-s-could-be', 'อาจจะ|จริง|ก็ได้', 'àat-jà jing gôr-dâi', 'Das könnte schon stimmen.', {
    alt: ['Kann schon sein', 'Vielleicht stimmt das', 'Mag sein'],
    note: 'อาจจะ … ก็ได้ = „es kann ja sein, dass …“ – vorsichtige Zustimmung.',
  }),

  // ======================= Kapitel 17: Umgangssprache & Kultur =======================
  // L1 Satzpartikel
  w('k17-si', 'สิ', 'sì', 'doch! (Aufforderung)', {
    alt: ['doch', 'mach doch', 'los'],
    note: 'Treibt an oder bestätigt nachdrücklich: ไปสิ = „Geh doch!“. Im Gespräch oft hoch gesprochen (ซิ). Ohne ครับ wirkt es leicht fordernd.',
  }),
  w('k17-loei', 'เลย', 'loei', 'total / gleich', {
    alt: ['total', 'sofort', 'echt', 'gleich', 'überhaupt'],
    note: 'Verstärkt: ดีมากเลย = „echt super“. ไม่…เลย = „überhaupt nicht“. ไปเลย = „geh gleich/los“.',
  }),
  w('k17-jang', 'จัง', 'jang', 'so sehr', {
    alt: ['so', 'wirklich', 'echt'],
    note: 'Gefühlsbetontes „so …!“: น่ารักจัง = „wie süß!“. Eher locker, oft mit เลย kombiniert.',
  }),
  w('k17-rok', 'หรอก', 'ròrk', 'doch nicht (abschwächend)', {
    alt: ['gar nicht', 'eigentlich nicht', 'doch nicht'],
    note: 'Nur in verneinten Sätzen: Es mildert ein „nein“ ab oder widerspricht sanft: ไม่แพงหรอก = „ist doch nicht teuer“.',
  }),
  w('k17-la', 'ล่ะ', 'lâ', 'denn / und …?', {
    alt: ['denn', 'und', 'und was ist mit'],
    note: 'Für Rückfragen und Themenwechsel: แล้วคุณล่ะ? = „Und du?“. In Fragen klingt es wie das deutsche „denn“.',
  }),
  w('k17-ja', 'จ้ะ', 'jâ', 'ja (liebevoll)', {
    alt: ['ja', 'ja, Schatz', 'okay'],
    note: 'Weiche, vertraute Antwort – Frauen benutzen es oft, Männer gegenüber Kindern, Partnerin oder Jüngeren. Nicht bei Fremden oder Chefs!',
  }),
  w('k17-rer', 'เหรอ', 'rěr', 'echt? / ach ja?', {
    alt: ['echt', 'wirklich', 'ach so', 'ach ja'],
    note: 'Lockere Form von หรือ als Rückfrage – drückt Überraschung oder Nachfragen aus.',
  }),
  w('k17-mai', 'มั้ย', 'mái', 'Fragewort (locker)', {
    alt: ['Frage', 'oder', 'ja oder nein'],
    note: 'So wird ไหม im Alltag ausgesprochen und in Chats auch geschrieben.',
  }),

  // L2 Partikel im Satz
  s('k17-s-eat-si', 'กิน|สิ|ครับ', 'gin sì kráp', 'Iss doch!', {
    alt: ['Greif zu', 'Iss ruhig', 'Essen Sie doch'],
    note: 'Typisch als Gastgeber – mit ครับ bleibt es freundlich.',
  }),
  s('k17-s-so-tasty', 'อร่อย|จัง|เลย', 'à-ròi jang loei', 'Ist das lecker!', {
    alt: ['So lecker', 'Echt lecker', 'Wie lecker'],
  }),
  s('k17-s-no-worries', 'ไม่|เป็น|ไร|หรอก|ครับ', 'mâi bpen rai ròrk kráp', 'Ach, das macht doch nichts.', {
    alt: ['Das macht doch nichts', 'Keine Sorge', 'Schon gut'],
    note: 'หรอก macht das ไม่เป็นไร noch beruhigender.',
  }),
  s('k17-s-where-la', 'แล้ว|คุณ|จะ|ไป|ไหน|ล่ะ', 'láeo kun jà bpai nǎi lâ', 'Und wohin gehst du denn?', {
    alt: ['Und wo gehst du denn hin', 'Und wohin willst du denn'],
    note: 'ไปไหน ist auch eine alltägliche Begrüßung – keine echte Frage, eher „Na, unterwegs?“.',
  }),
  s('k17-s-gone-rer', 'เขา|ไป|แล้ว|เหรอ', 'kǎo bpai láeo rěr', 'Ist er schon weg?', {
    alt: ['Ist sie schon gegangen', 'Ist er schon gegangen', 'Er ist schon weg?'],
  }),
  s('k17-s-come-along', 'ไป|ด้วยกัน|มั้ย', 'bpai dûai-gan mái', 'Kommst du mit?', {
    alt: ['Gehen wir zusammen', 'Kommst du mit', 'Wollen wir zusammen gehen'],
  }),
  s('k17-s-help-na', 'ช่วย|หน่อย|นะ|ครับ', 'chûai nòi ná kráp', 'Hilf mir doch bitte mal.', {
    alt: ['Hilf mir bitte', 'Kannst du mir bitte helfen', 'Helfen Sie mir bitte'],
    note: 'นะ macht Bitten weich und freundlich – wie „doch mal, ja?“.',
  }),

  // L3 Thai-Lebensgefühl
  w('k17-sabai-sabai', 'สบายๆ', 'sà-baai-sà-baai', 'entspannt', {
    alt: ['locker', 'gemütlich', 'ganz ruhig', 'easy'],
    emoji: '😌',
    note: 'Das Lebensmotto schlechthin: alles locker, ohne Stress. ๆ verdoppelt das Wort.',
  }),
  w('k17-jai-yen', 'ใจเย็นๆ', 'jai-yen-yen', 'Ruhig Blut!', {
    alt: ['Immer mit der Ruhe', 'Bleib ruhig', 'Beruhige dich', 'ruhig bleiben'],
    note: 'Wörtlich „kühles Herz“. Laut werden (ใจร้อน, „heißes Herz“) gilt als Gesichtsverlust – für beide Seiten.',
  }),
  w('k17-kreng-jai', 'เกรงใจ', 'greng-jai', 'Rücksicht nehmen', {
    alt: ['rücksichtsvoll sein', 'sich nicht trauen', 'niemandem zur Last fallen wollen'],
    note: 'Schlüsselbegriff: anderen keine Umstände machen wollen. Deshalb sagen Thais selten direkt „nein“.',
  }),
  w('k17-sanuk', 'สนุก', 'sà-nùk', 'Spaß machen', {
    alt: ['lustig', 'Spaß', 'unterhaltsam', 'macht Spaß'],
    emoji: '🎉',
    note: 'Was nicht สนุก ist, wird gern vermieden – auch Arbeit soll Spaß machen.',
  }),
  w('k17-lose-face', 'เสียหน้า', 'sǐa-nâa', 'das Gesicht verlieren', {
    alt: ['Gesicht verlieren', 'blamiert sein', 'sich blamieren'],
    note: 'Kritisiere niemanden vor anderen – lieber unter vier Augen und mit Lächeln.',
  }),
  w('k17-nam-jai', 'น้ำใจ', 'náam-jai', 'Hilfsbereitschaft', {
    alt: ['Großzügigkeit', 'Güte', 'Freundlichkeit'],
    note: 'Wörtlich „Herzenswasser“. มีน้ำใจ = hilfsbereit, großzügig.',
  }),
  w('k17-make-yourself', 'ตามสบาย', 'dtaam-sà-baai', 'Fühl dich wie zu Hause', {
    alt: ['Mach es dir bequem', 'wie du willst', 'nach Belieben'],
    note: 'Wörtlich „wie es bequem ist“. Gastgeber sagen es ständig.',
  }),

  // L4 Locker reden
  s('k17-s-calm-down', 'ใจเย็นๆ|นะ|ครับ', 'jai-yen-yen ná kráp', 'Immer mit der Ruhe.', {
    alt: ['Bleib ruhig', 'Ruhig Blut', 'Beruhige dich'],
  }),
  s('k17-s-no-kreng-jai', 'ไม่|ต้อง|เกรงใจ|ครับ', 'mâi dtôrng greng-jai kráp', 'Keine falsche Zurückhaltung!', {
    alt: ['Greif ruhig zu', 'Fühl dich frei', 'Du musst dich nicht zurückhalten', 'Keine Umstände'],
    note: 'Sagt man, wenn jemand aus Höflichkeit ablehnt – z. B. beim Essen oder bei Hilfe.',
  }),
  s('k17-s-relaxed-life', 'ที่นี่|ชีวิต|สบายๆ', 'têe-nêe chee-wít sà-baai-sà-baai', 'Hier lebt man entspannt.', {
    alt: ['Hier ist das Leben entspannt', 'Hier ist das Leben gemütlich'],
  }),
  s('k17-s-fun-yesterday', 'เมื่อวาน|สนุก|มาก|เลย', 'mûea-waan sà-nùk mâak loei', 'Gestern war es echt lustig.', {
    alt: ['Gestern hat es total Spaß gemacht', 'Gestern war es super lustig', 'Gestern war es richtig lustig'],
  }),
  s('k17-s-make-yourself', 'ตามสบาย|นะ|ครับ', 'dtaam-sà-baai ná kráp', 'Mach es dir bequem.', {
    alt: ['Fühl dich wie zu Hause', 'Machen Sie es sich bequem'],
  }),
  s('k17-s-nam-jai', 'คน|ไทย|มี|น้ำใจ|มาก', 'kon tai mee náam-jai mâak', 'Thais sind sehr hilfsbereit.', {
    alt: ['Thailänder sind sehr hilfsbereit', 'Thais sind sehr großzügig'],
  }),
  s('k17-s-lose-face', 'อย่า|ทำให้|เขา|เสียหน้า|นะ', 'yàa tam-hâi kǎo sǐa-nâa ná', 'Bring ihn nicht in Verlegenheit.', {
    alt: ['Lass ihn nicht das Gesicht verlieren', 'Blamier ihn nicht'],
  }),

  // L5 Tempel, Feste & Tabus
  w('k17-temple', 'วัด', 'wát', 'Tempel', { alt: ['der Tempel', 'Kloster', 'Wat'], emoji: '🛕' }),
  w('k17-monk', 'พระ', 'prá', 'Mönch', {
    alt: ['der Mönch', 'Buddha', 'heilig'],
    note: 'พระ steht auch vor heiligen/königlichen Dingen: พระพุทธรูป = Buddhastatue.',
  }),
  w('k17-wai', 'ไหว้', 'wâi', 'Wai (Gruß)', {
    alt: ['Wai', 'mit Wai grüßen', 'grüßen', 'verbeugen'],
    emoji: '🙏',
    note: 'Der Jüngere grüßt zuerst; je höher die Hände, desto mehr Respekt. Kellner oder Kinder grüßt man nicht mit Wai, man erwidert nur mit Nicken.',
  }),
  w('k17-tambun', 'ทำบุญ', 'tam-bun', 'Verdienste erwerben', {
    alt: ['Gutes tun', 'spenden', 'Almosen geben'],
    note: 'Gute Taten (Spenden, Essen für Mönche) sammeln „Verdienst“ (บุญ) fürs Karma.',
  }),
  w('k17-songkran', 'สงกรานต์', 'sǒng-graan', 'Songkran', {
    alt: ['Thai-Neujahr', 'Wasserfest', 'Songkran-Fest'],
    emoji: '💦',
    note: 'Thai-Neujahr am 13.–15. April: Wasserschlachten, und man gießt Älteren respektvoll Wasser über die Hände (รดน้ำดำหัว).',
  }),
  w('k17-loy-krathong', 'ลอยกระทง', 'loi-grà-tong', 'Loy Krathong', {
    alt: ['Lichterfest', 'Loi Krathong'],
    note: 'Im November bei Vollmond lässt man Körbchen (กระทง) mit Kerzen auf dem Wasser treiben (ลอย = schwimmen).',
  }),
  w('k17-forbidden', 'ห้าม', 'hâam', 'verboten', { alt: ['verbieten', 'nicht erlaubt', 'Verbot'], emoji: '🚫' }),
  w('k17-foot', 'เท้า', 'táo', 'Fuß', {
    alt: ['der Fuß', 'Füße'],
    emoji: '🦶',
    note: 'Der Fuß ist der „niedrigste“ Körperteil: nie auf Menschen oder Buddha-Bilder zeigen, nie über Essen steigen.',
  }),

  // L6 Im Tempel
  s('k17-s-shoes-off', 'ต้อง|ถอด|รองเท้า|ก่อน|เข้า|วัด', 'dtôrng tòrt rorng-táo gòrn kâo wát', 'Vor dem Tempel muss man die Schuhe ausziehen.', {
    alt: ['Man muss vor dem Tempel die Schuhe ausziehen', 'Vor dem Betreten des Tempels die Schuhe ausziehen'],
    note: 'Auch in Wohnungen und manchen Läden: Schuhe vor der Tür lassen. ถอด = ausziehen, รองเท้า = Schuhe.',
  }),
  s('k17-s-tambun', 'พรุ่งนี้|เช้า|ผม|จะ|ไป|ทำบุญ|ที่|วัด', 'prûng-née cháo pǒm jà bpai tam-bun têe wát', 'Morgen früh gehe ich im Tempel Verdienste erwerben.', {
    alt: ['Morgen früh gehe ich zum Tempel, um Gutes zu tun', 'Morgen früh gehe ich in den Tempel spenden'],
  }),
  s('k17-s-women-monks', 'ผู้หญิง|ห้าม|จับ|พระ', 'pôo-yǐng hâam jàp prá', 'Frauen dürfen Mönche nicht berühren.', {
    alt: ['Frauen dürfen keine Mönche anfassen', 'Für Frauen ist es verboten, Mönche zu berühren'],
    note: 'Frauen geben Mönchen Dinge nicht direkt in die Hand, sondern legen sie auf ein Tuch. จับ = anfassen.',
  }),
  s('k17-s-kids-wai', 'เด็ก|ไหว้|ผู้ใหญ่|ก่อน', 'dèk wâi pôo-yài gòrn', 'Kinder grüßen Erwachsene zuerst mit dem Wai.', {
    alt: ['Kinder grüßen Erwachsene zuerst', 'Die Kinder machen zuerst den Wai vor den Erwachsenen'],
  }),
  s('k17-s-alms', 'ตอนเช้า|คน|ไทย|ใส่บาตร', 'dtorn-cháo kon tai sài-bàat', 'Morgens geben Thais den Mönchen Essen.', {
    alt: ['Morgens geben die Thais den Mönchen Almosen', 'Am Morgen spenden Thais den Mönchen Essen'],
    note: 'ใส่บาตร = Essen in die Almosenschale (บาตร) der Mönche geben – bei Sonnenaufgang auf der Straße.',
  }),
  s('k17-s-dress-polite', 'ใน|วัด|ต้อง|แต่งตัว|สุภาพ', 'nai wát dtôrng dtàeng-dtua sù-pâap', 'Im Tempel muss man sich anständig kleiden.', {
    alt: ['Im Tempel muss man ordentlich angezogen sein', 'Im Tempel muss man sich ordentlich anziehen'],
    note: 'สุภาพ = höflich, anständig: Schultern und Knie bedeckt.',
  }),

  // L7 Feste & Tabus
  s('k17-s-songkran', 'ช่วง|สงกรานต์|คน|ไทย|เล่น|น้ำ|กัน', 'chûang sǒng-graan kon tai lên náam gan', 'An Songkran machen die Thais Wasserschlachten.', {
    alt: ['Zu Songkran spielen die Thais mit Wasser', 'An Songkran bespritzen sich die Thais mit Wasser'],
    note: 'เล่นน้ำ = mit Wasser spielen, ช่วง = Zeitraum.',
  }),
  s('k17-s-loy-krathong', 'คืนนี้|ไป|ลอยกระทง|กัน|ไหม', 'kuuen-née bpai loi-grà-tong gan mǎi', 'Gehen wir heute Abend zu Loy Krathong?', {
    alt: ['Wollen wir heute Abend Loy Krathong feiern', 'Gehen wir heute Nacht Krathong schwimmen lassen'],
  }),
  s('k17-s-dont-touch-head', 'อย่า|จับ|หัว|คน|ไทย|นะ', 'yàa jàp hǔa kon tai ná', 'Fass Thais nicht an den Kopf!', {
    alt: ['Berühre nicht den Kopf von Thais', 'Fass Thailändern nicht an den Kopf'],
    note: 'Der Kopf gilt als heiligster Körperteil – auch Kindern nicht über den Kopf streichen.',
  }),
  s('k17-s-dont-point-feet', 'อย่า|ใช้|เท้า|ชี้|ของ', 'yàa chái táo chée kǒrng', 'Zeig nicht mit dem Fuß auf Dinge.', {
    alt: ['Zeig nicht mit den Füßen auf Sachen', 'Benutze nicht die Füße zum Zeigen'],
    note: 'ชี้ = zeigen (deuten). Auch Türen oder Gegenstände nie mit dem Fuß anschieben.',
  }),
  s('k17-s-king', 'ไม่|ควร|พูด|ไม่|ดี|เรื่อง|ในหลวง', 'mâi kuan pôot mâi dee rûeang nai-lǔang', 'Man sollte nicht schlecht über den König reden.', {
    alt: ['Man soll nicht schlecht über den König sprechen', 'Sprich nicht schlecht über den König'],
    note: 'ในหลวง = der König (respektvoll-vertraut). Majestätsbeleidigung ist streng strafbar – auch für Ausländer. ควร = sollte.',
  }),
  s('k17-s-happy-songkran', 'สุขสันต์|วัน|สงกรานต์|ครับ', 'sùk-sǎn wan sǒng-graan kráp', 'Frohes Songkran!', {
    alt: ['Frohes Songkran-Fest', 'Schönes Songkran', 'Frohes neues Jahr'],
    note: 'สุขสันต์ = „fröhlich“ in Glückwünschen: สุขสันต์วันเกิด = Alles Gute zum Geburtstag.',
  }),
]

export const chapters4: Chapter[] = [
  {
    id: 'k14',
    title: 'Bank, Post & Behörden',
    subtitle: 'Geld, Pakete, Visum und SIM-Karte',
    icon: '🏦',
    color: '#34495e',
    lessons: [
      {
        id: 'k14-l1',
        title: 'Auf der Bank',
        subtitle: 'Konto, abheben, überweisen',
        icon: '🏧',
        type: 'vocab',
        items: ['k14-bank', 'k14-account', 'k14-withdraw', 'k14-transfer', 'k14-atm', 'k14-card', 'k14-pin', 'k14-exchange'],
      },
      {
        id: 'k14-l2',
        title: 'Bankgeschäfte',
        subtitle: 'Wechseln, Karte steckt fest',
        icon: '💳',
        type: 'sentences',
        grammar: 'g-want-like',
        items: ['k14-s-open-account', 'k14-s-where-atm', 'k14-s-exchange-euro', 'k14-s-transfer', 'k14-s-card-stuck', 'k14-s-forgot-pin', 'k14-s-limit'],
      },
      {
        id: 'k14-l3',
        title: 'Auf der Post',
        subtitle: 'Paket, Brief, Briefmarke',
        icon: '📮',
        type: 'vocab',
        items: ['k14-post', 'k14-parcel', 'k14-stamp', 'k14-letter', 'k14-send', 'k14-address', 'k14-registered', 'k14-express'],
      },
      {
        id: 'k14-l4',
        title: 'Pakete verschicken',
        subtitle: 'Am Postschalter',
        icon: '📦',
        type: 'sentences',
        items: ['k14-s-send-parcel', 'k14-s-how-many-days', 'k14-s-three-stamps', 'k14-s-express-price', 'k14-s-whats-inside', 'k14-s-write-address'],
      },
      {
        id: 'k14-l5',
        title: 'Papiere',
        subtitle: 'Pass, Visum, Formular',
        icon: '🛂',
        type: 'vocab',
        items: ['k14-passport', 'k14-visa', 'k14-form', 'k14-sign', 'k14-copy', 'k14-photo', 'k14-immigration'],
      },
      {
        id: 'k14-l6',
        title: 'Service & Warten',
        subtitle: 'SIM-Karte, Termin, Schlange',
        icon: '⏳',
        type: 'vocab',
        items: ['k14-sim', 'k14-topup', 'k14-appointment', 'k14-wait', 'k14-queue', 'k14-line-up', 'k14-fee', 'k14-documents'],
      },
      {
        id: 'k14-l7',
        title: 'Auf dem Amt',
        subtitle: 'Visum verlängern, SIM aufladen',
        icon: '🏛️',
        type: 'sentences',
        grammar: 'g-verbs-serial',
        items: ['k14-s-extend-visa', 'k14-s-which-docs', 'k14-s-sign-here', 'k14-s-wait-long', 'k14-s-appointment', 'k14-s-buy-sim', 'k14-s-topup'],
      },
    ],
  },
  {
    id: 'k15',
    title: 'Gesundheit & Notfälle',
    subtitle: 'Beim Arzt, in der Apotheke und wenn es brennt',
    icon: '🚑',
    color: '#e74c3c',
    lessons: [
      {
        id: 'k15-l1',
        title: 'Symptome',
        subtitle: 'Husten, Durchfall, Allergie',
        icon: '🤧',
        type: 'vocab',
        items: ['k15-cold','k15-sore-throat', 'k15-diarrhea', 'k15-nausea', 'k15-dizzy', 'k15-runny-nose', 'k15-allergic', 'k15-high-fever'],
      },
      {
        id: 'k15-l2',
        title: 'Beim Arzt',
        subtitle: 'Beschwerden beschreiben',
        icon: '🩺',
        type: 'sentences',
        grammar: 'g-time',
        items: ['k15-s-cough-since', 'k15-s-diarrhea', 'k15-s-throat-nose', 'k15-s-allergic-nuts', 'k15-s-nausea', 'k15-s-high-fever', 'k15-s-three-days'],
      },
      {
        id: 'k15-l3',
        title: 'Apotheke',
        subtitle: 'Tabletten, Rezept, Versicherung',
        icon: '💊',
        type: 'vocab',
        items: ['k15-pharmacy', 'k15-pharmacist', 'k15-pill', 'k15-painkiller', 'k15-prescription', 'k15-before-meal', 'k15-after-meal', 'k15-insurance'],
      },
      {
        id: 'k15-l4',
        title: 'In der Apotheke',
        subtitle: 'Fragen und Einnahme',
        icon: '🏪',
        type: 'sentences',
        grammar: 'g-questions',
        items: ['k15-s-cough-medicine', 'k15-s-need-prescription', 'k15-s-two-pills', 'k15-s-after-meal', 'k15-s-drowsy', 'k15-s-nearest-pharmacy'],
      },
      {
        id: 'k15-l5',
        title: 'Notfall',
        subtitle: 'Hilfe, Unfall, Feuer',
        icon: '🆘',
        type: 'vocab',
        items: ['k15-help', 'k15-accident', 'k15-fire', 'k15-ambulance', 'k15-emergency-number', 'k15-thief', 'k15-report', 'k15-wallet'],
      },
      {
        id: 'k15-l6',
        title: 'Im Notfall',
        subtitle: 'Hilfe holen',
        icon: '🚨',
        type: 'sentences',
        items: ['k15-s-call-ambulance', 'k15-s-call-police', 'k15-s-accident', 'k15-s-injured', 'k15-s-cant-breathe', 'k15-s-fire-floor', 'k15-s-hit-by-car'],
      },
      {
        id: 'k15-l7',
        title: 'Polizei & Versicherung',
        subtitle: 'Diebstahl melden, Attest holen',
        icon: '👮',
        type: 'sentences',
        items: ['k15-s-wallet-stolen', 'k15-s-passport-lost', 'k15-s-file-report', 'k15-s-police-station', 'k15-s-travel-insurance', 'k15-s-insurance-pay', 'k15-s-medical-cert'],
      },
    ],
  },
  {
    id: 'k16',
    title: 'Meinungen & Gespräche',
    subtitle: 'Sagen, was du denkst – und warum',
    icon: '💭',
    color: '#2980b9',
    lessons: [
      {
        id: 'k16-l1',
        title: 'Denken & Meinen',
        subtitle: 'glauben, finden, zustimmen',
        icon: '🤔',
        type: 'vocab',
        items: ['k16-think', 'k16-believe', 'k16-feel', 'k16-agree', 'k16-disagree', 'k16-opinion', 'k16-true', 'k16-correct'],
      },
      {
        id: 'k16-l2',
        title: 'Meinung sagen',
        subtitle: 'Ich finde … – Was meinst du?',
        icon: '💬',
        type: 'sentences',
        items: ['k16-s-thai-food-best', 'k16-s-what-think', 'k16-s-agree', 'k16-s-not-quite', 'k16-s-really', 'k16-s-believe', 'k16-s-too-hot'],
      },
      {
        id: 'k16-l3',
        title: 'Verbindungswörter',
        subtitle: 'weil, aber, deshalb, wenn',
        icon: '🔗',
        type: 'vocab',
        items: ['k16-because', 'k16-but', 'k16-so', 'k16-if', 'k16-maybe', 'k16-sure', 'k16-actually', 'k16-both'],
      },
      {
        id: 'k16-l4',
        title: 'Gründe & Bedingungen',
        subtitle: 'Sätze verbinden',
        icon: '🧩',
        type: 'sentences',
        items: ['k16-s-learn-because', 'k16-s-rain-so', 'k16-s-tasty-but', 'k16-s-if-free', 'k16-s-maybe-late', 'k16-s-actually-beer', 'k16-s-both'],
      },
      {
        id: 'k16-l5',
        title: 'Im Gespräch',
        subtitle: 'okay, wichtig, schwierig',
        icon: '🗨️',
        type: 'vocab',
        items: ['k16-topic', 'k16-problem', 'k16-okay', 'k16-up-to-you', 'k16-fine-too', 'k16-important', 'k16-easy', 'k16-difficult'],
      },
      {
        id: 'k16-l6',
        title: 'Gesprächsfloskeln',
        subtitle: 'Abgemacht! Wie du willst.',
        icon: '🤝',
        type: 'sentences',
        grammar: 'g-questions',
        items: ['k16-s-not-difficult', 'k16-s-important', 'k16-s-okay-tomorrow', 'k16-s-up-to-you', 'k16-s-tomorrow-fine', 'k16-s-german-right', 'k16-s-no-problem'],
      },
      {
        id: 'k16-l7',
        title: 'Meinungen begründen',
        subtitle: 'Ich glaube …, weil …',
        icon: '⚖️',
        type: 'sentences',
        grammar: 'g-comparison',
        items: ['k16-s-think-because', 'k16-s-tell-me', 'k16-s-i-think-better', 'k16-s-talks-too-much', 'k16-s-not-sure', 'k16-s-could-be'],
      },
    ],
  },
  {
    id: 'k17',
    title: 'Umgangssprache & Kultur',
    subtitle: 'Partikel, Lebensgefühl, Tempel und Tabus',
    icon: '🛕',
    color: '#d35400',
    lessons: [
      {
        id: 'k17-l1',
        title: 'Satzpartikel',
        subtitle: 'สิ, เลย, จัง, หรอก, ล่ะ …',
        icon: '✨',
        type: 'vocab',
        items: ['k17-si', 'k17-loei', 'k17-jang', 'k17-rok', 'k17-la', 'k17-ja', 'k17-rer', 'k17-mai'],
      },
      {
        id: 'k17-l2',
        title: 'Partikel im Satz',
        subtitle: 'Wie Thais wirklich reden',
        icon: '🗣️',
        type: 'sentences',
        grammar: 'g-polite',
        items: ['k17-s-eat-si', 'k17-s-so-tasty', 'k17-s-no-worries', 'k17-s-where-la', 'k17-s-gone-rer', 'k17-s-come-along', 'k17-s-help-na'],
      },
      {
        id: 'k17-l3',
        title: 'Thai-Lebensgefühl',
        subtitle: 'สบาย, สนุก, เกรงใจ',
        icon: '😌',
        type: 'vocab',
        items: ['k17-sabai-sabai', 'k17-jai-yen', 'k17-kreng-jai', 'k17-sanuk', 'k17-lose-face', 'k17-nam-jai', 'k17-make-yourself'],
      },
      {
        id: 'k17-l4',
        title: 'Locker reden',
        subtitle: 'Ruhig Blut und keine Umstände',
        icon: '🌴',
        type: 'sentences',
        items: ['k17-s-calm-down', 'k17-s-no-kreng-jai', 'k17-s-relaxed-life', 'k17-s-fun-yesterday', 'k17-s-make-yourself', 'k17-s-nam-jai', 'k17-s-lose-face'],
      },
      {
        id: 'k17-l5',
        title: 'Tempel, Feste & Tabus',
        subtitle: 'วัด, ไหว้, Songkran',
        icon: '🙏',
        type: 'vocab',
        items: ['k17-temple', 'k17-monk', 'k17-wai', 'k17-tambun', 'k17-songkran', 'k17-loy-krathong', 'k17-forbidden', 'k17-foot'],
      },
      {
        id: 'k17-l6',
        title: 'Im Tempel',
        subtitle: 'Schuhe aus, Schultern bedeckt',
        icon: '🛕',
        type: 'sentences',
        items: ['k17-s-shoes-off', 'k17-s-tambun', 'k17-s-women-monks', 'k17-s-kids-wai', 'k17-s-alms', 'k17-s-dress-polite'],
      },
      {
        id: 'k17-l7',
        title: 'Feste & Tabus',
        subtitle: 'Kopf, Füße und der König',
        icon: '🏮',
        type: 'sentences',
        grammar: 'g-negation',
        items: ['k17-s-songkran', 'k17-s-loy-krathong', 'k17-s-dont-touch-head', 'k17-s-dont-point-feet', 'k17-s-king', 'k17-s-happy-songkran'],
      },
    ],
  },
]
