// Kapitel 10–13 (A2): Arbeit & Beruf, Wohnen & Haushalt, Freizeit & Hobbys, Pläne & Zeitangaben
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

export const items3: Item[] = [
  // ======================= Kapitel 10: Arbeit & Beruf =======================
  // L1 Im Büro
  w('k10-company', 'บริษัท', 'bor-rí-sàt', 'Firma', { alt: ['Unternehmen', 'die Firma', 'Betrieb'], emoji: '🏢' }),
  w('k10-office', 'ออฟฟิศ', 'órp-fít', 'Büro', {
    alt: ['das Büro', 'Office'],
    note: 'Aus dem Englischen „office“. Formell: สำนักงาน.',
  }),
  w('k10-colleague', 'เพื่อนร่วมงาน', 'pûean-rûam-ngaan', 'Kollege', {
    alt: ['Kollegin', 'Kollegen', 'Arbeitskollege', 'der Kollege'],
    note: 'Wörtlich „Freund, mit dem man zusammen arbeitet“: เพื่อน Freund + ร่วม gemeinsam + งาน Arbeit.',
  }),
  w('k10-boss', 'หัวหน้า', 'hǔa-nâa', 'Chef', {
    alt: ['Chefin', 'Vorgesetzter', 'Vorgesetzte', 'der Chef', 'Teamleiter'],
    note: 'Wörtlich „Kopf vorne“. Der Firmeninhaber ist eher เจ้านาย oder เจ้าของ.',
  }),
  w('k10-customer', 'ลูกค้า', 'lôok-káa', 'Kunde', { alt: ['Kundin', 'Kunden', 'der Kunde'] }),
  w('k10-meeting', 'ประชุม', 'bprà-chum', 'Meeting', { alt: ['Besprechung', 'Sitzung', 'eine Besprechung haben', 'das Meeting'] }),
  w('k10-computer', 'คอมพิวเตอร์', 'kom-piu-dtêr', 'Computer', {
    alt: ['der Computer', 'Rechner', 'PC'],
    emoji: '💻',
    note: 'Im Alltag oft nur คอม (kom).',
  }),
  w('k10-email', 'อีเมล', 'ee-men', 'E-Mail', { alt: ['die E-Mail', 'Mail', 'Email'], emoji: '📧', note: 'Viele Thais sprechen es eher wie „ii-meo“ aus.' }),

  // L2 Arbeitsalltag
  w('k10-salary', 'เงินเดือน', 'ngern-duean', 'Gehalt', {
    alt: ['Lohn', 'das Gehalt', 'Monatsgehalt'],
    emoji: '💵',
    note: 'Wörtlich „Geld Monat“ – Gehalt wird in Thailand monatlich gezahlt.',
  }),
  w('k10-startwork', 'เข้างาน', 'kâo-ngaan', 'Arbeitsbeginn', { alt: ['mit der Arbeit anfangen', 'zur Arbeit kommen', 'Dienstbeginn'] }),
  w('k10-finishwork', 'เลิกงาน', 'lêrk-ngaan', 'Feierabend', {
    alt: ['Feierabend machen', 'Schluss machen', 'Arbeitsende', 'mit der Arbeit aufhören'],
    note: 'เลิก = aufhören. Gegenteil: เข้างาน.',
  }),
  w('k10-busy', 'ยุ่ง', 'yûng', 'beschäftigt', { alt: ['busy', 'viel zu tun', 'im Stress'] }),
  w('k10-ontime', 'ตรงเวลา', 'dtrong-we-laa', 'pünktlich', {
    alt: ['rechtzeitig', 'zur rechten Zeit'],
    emoji: '⏰',
    note: 'ตรง = genau/gerade, เวลา = Zeit.',
  }),
  w('k10-late', 'มาสาย', 'maa-sǎai', 'zu spät kommen', { alt: ['sich verspäten', 'zu spät', 'verspätet'] }),
  w('k10-leave', 'ลางาน', 'laa-ngaan', 'Urlaub nehmen', {
    alt: ['frei nehmen', 'sich freinehmen', 'Urlaub beantragen'],
    note: 'ลา = sich verabschieden / um Erlaubnis bitten. ลาป่วย = sich krankmelden.',
  }),
  w('k10-dayoff', 'วันหยุด', 'wan-yùt', 'freier Tag', { alt: ['Feiertag', 'Urlaub', 'Ruhetag', 'Urlaubstag'], emoji: '🏖️' }),

  // L3 Mein Job (Sätze)
  s('k10-s-work-company', 'ผม|ทำงาน|ที่|บริษัท|เยอรมัน', 'pǒm tam-ngaan têe bor-rí-sàt yer-rá-man', 'Ich arbeite bei einer deutschen Firma.', {
    alt: ['Ich arbeite in einer deutschen Firma', 'Ich arbeite für eine deutsche Firma'],
  }),
  s('k10-s-mon-fri', 'ผม|ทำงาน|วันจันทร์|ถึง|วันศุกร์', 'pǒm tam-ngaan wan-jan tǔeng wan-sùk', 'Ich arbeite von Montag bis Freitag.', {
    alt: ['Ich arbeite Montag bis Freitag'],
    note: 'ถึง = bis (zeitlich und räumlich).',
  }),
  s('k10-s-start-nine', 'ผม|เข้างาน|เก้า|โมง|เช้า', 'pǒm kâo-ngaan gâo mohng cháao', 'Ich fange um neun Uhr morgens an.', {
    alt: ['Ich fange um 9 Uhr an', 'Ich beginne um neun Uhr zu arbeiten', 'Ich fange um neun Uhr an'],
  }),
  s('k10-s-finish-six', 'ผม|เลิกงาน|หก|โมง|เย็น', 'pǒm lêrk-ngaan hòk mohng yen', 'Ich habe um 18 Uhr Feierabend.', {
    alt: ['Ich habe um sechs Uhr abends Feierabend', 'Ich höre um 18 Uhr auf zu arbeiten'],
  }),
  s('k10-s-boss-kind', 'หัวหน้า|ของ|ผม|ใจดี', 'hǔa-nâa kǒrng pǒm jai-dee', 'Mein Chef ist nett.', { alt: ['Meine Chefin ist nett', 'Mein Chef ist freundlich'] }),
  s('k10-s-colleague-thai', 'เพื่อนร่วมงาน|ของ|ผม|เป็น|คน|ไทย', 'pûean-rûam-ngaan kǒrng pǒm bpen kon tai', 'Mein Kollege ist Thai.', {
    alt: ['Meine Kollegen sind Thais', 'Meine Kollegin ist Thailänderin', 'Mein Kollege ist Thailänder'],
  }),
  s('k10-s-skytrain', 'ผม|นั่ง|รถไฟฟ้า|ไป|ทำงาน', 'pǒm nâng rót-fai-fáa bpai tam-ngaan', 'Ich fahre mit dem Skytrain zur Arbeit.', {
    alt: ['Ich nehme den Skytrain zur Arbeit', 'Ich fahre mit der Bahn zur Arbeit'],
    note: 'นั่ง (sitzen) + Verkehrsmittel + ไป = „mit … fahren“. รถไฟฟ้า = BTS-Skytrain.',
  }),

  // L4 Jobsuche
  w('k10-apply', 'สมัครงาน', 'sà-màk-ngaan', 'sich bewerben', { alt: ['Bewerbung', 'bewerben', 'sich um eine Stelle bewerben'], note: 'สมัคร = sich anmelden/bewerben – auch für Kurse oder Apps.' }),
  w('k10-interview', 'สัมภาษณ์', 'sǎm-pâat', 'Vorstellungsgespräch', { alt: ['Interview', 'interviewen', 'Bewerbungsgespräch'] }),
  w('k10-experience', 'ประสบการณ์', 'bprà-sòp-gaan', 'Erfahrung', { alt: ['Berufserfahrung', 'die Erfahrung'] }),
  w('k10-jobsearch', 'หางาน', 'hǎa-ngaan', 'Arbeit suchen', { alt: ['Job suchen', 'eine Stelle suchen', 'Jobsuche'] }),
  w('k10-changejob', 'เปลี่ยนงาน', 'bplìan-ngaan', 'den Job wechseln', { alt: ['Job wechseln', 'die Stelle wechseln', 'Jobwechsel'] }),
  w('k10-quit', 'ลาออก', 'laa-òrk', 'kündigen', {
    alt: ['den Job kündigen', 'zurücktreten', 'aufhören'],
    note: 'Wörtlich „sich verabschieden + hinaus“. Gekündigt WERDEN heißt โดนไล่ออก.',
  }),
  w('k10-unemployed', 'ตกงาน', 'dtòk-ngaan', 'arbeitslos werden', { alt: ['arbeitslos', 'den Job verlieren', 'arbeitslos sein'], note: 'ตก = fallen – man „fällt aus der Arbeit“.' }),

  // L5 Arbeitsleben
  p('k10-muchwork', 'งาน|เยอะ', 'ngaan yér', 'viel Arbeit', { alt: ['viel zu tun', 'eine Menge Arbeit'], note: 'เยอะ ist umgangssprachlich für „viel“ (= มาก).' }),
  p('k10-sendmail', 'ส่ง|อีเมล', 'sòng ee-men', 'eine E-Mail schicken', { alt: ['E-Mail senden', 'E-Mail schicken', 'mailen'] }),
  w('k10-stressed', 'เครียด', 'krîat', 'gestresst', { alt: ['Stress', 'angespannt', 'unter Stress'], emoji: '😫' }),
  p('k10-overtime', 'ทำงาน|ล่วงเวลา', 'tam-ngaan lûang-we-laa', 'Überstunden machen', { alt: ['Überstunden', 'länger arbeiten'], note: 'ล่วง = überschreiten. Im Alltag sagt man auch ทำโอที (OT).' }),
  p('k10-homeoffice', 'ทำงาน|ที่|บ้าน', 'tam-ngaan têe bâan', 'im Homeoffice arbeiten', { alt: ['Homeoffice', 'von zu Hause arbeiten', 'zu Hause arbeiten'], emoji: '🏠' }),
  p('k10-raise', 'ขึ้น|เงินเดือน', 'kûen ngern-duean', 'Gehaltserhöhung', { alt: ['Gehalt erhöhen', 'mehr Gehalt', 'Lohnerhöhung'], emoji: '📈', note: 'ขึ้น = steigen/hinaufgehen.' }),
  p('k10-joinmeeting', 'เข้า|ประชุม', 'kâo bprà-chum', 'ins Meeting gehen', { alt: ['an einem Meeting teilnehmen', 'in einer Besprechung sein', 'zur Besprechung gehen'] }),

  // L6 Ein stressiger Tag (Sätze)
  s('k10-s-busy-today', 'วันนี้|ผม|ยุ่ง|มาก', 'wan-née pǒm yûng mâak', 'Heute bin ich sehr beschäftigt.', { alt: ['Ich bin heute sehr beschäftigt', 'Heute habe ich viel zu tun'] }),
  s('k10-s-meeting-2pm', 'ผม|มี|ประชุม|ตอน|บ่าย|สอง|โมง', 'pǒm mee bprà-chum dtorn bàai sǒrng mohng', 'Ich habe um 14 Uhr ein Meeting.', {
    alt: ['Ich habe um zwei Uhr nachmittags ein Meeting', 'Ich habe um 14 Uhr eine Besprechung'],
    note: 'บ่าย … โมง = nachmittags … Uhr (บ่ายสองโมง = 14 Uhr).',
  }),
  s('k10-s-send-mail', 'เดี๋ยว|ผม|ส่ง|อีเมล|ให้|นะ|ครับ', 'dǐao pǒm sòng ee-men hâi ná kráp', 'Ich schicke dir gleich eine E-Mail.', {
    alt: ['Ich schicke Ihnen gleich eine E-Mail', 'Ich maile dir gleich'],
    note: 'เดี๋ยว = gleich, ให้ = für jemanden (etwas tun).',
  }),
  s('k10-s-sorry-late', 'ขอโทษ|ที่|มา|สาย|ครับ', 'kǒr-tôht têe maa sǎai kráp', 'Entschuldigung, dass ich zu spät bin.', {
    alt: ['Entschuldigen Sie die Verspätung', 'Sorry, dass ich zu spät komme', 'Entschuldigung für die Verspätung'],
    note: 'ขอโทษที่ … = Entschuldigung, dass …',
  }),
  s('k10-s-leave-tomorrow', 'พรุ่งนี้|ผม|ลางาน|ครับ', 'prûng-née pǒm laa-ngaan kráp', 'Morgen nehme ich frei.', { alt: ['Morgen habe ich Urlaub', 'Ich nehme morgen frei'] }),
  s('k10-s-overtime', 'ผม|ต้อง|ทำงาน|ล่วงเวลา', 'pǒm dtôrng tam-ngaan lûang-we-laa', 'Ich muss Überstunden machen.', { alt: ['Ich muss länger arbeiten'] }),
  s('k10-s-want-quit', 'ผม|อยาก|ลาออก', 'pǒm yàak laa-òrk', 'Ich möchte kündigen.', { alt: ['Ich will kündigen', 'Ich möchte meinen Job kündigen'] }),

  // L7 Bewerbung (Sätze)
  s('k10-s-new-job', 'ผม|กำลัง|หา|งาน|ใหม่', 'pǒm gam-lang hǎa ngaan mài', 'Ich suche gerade einen neuen Job.', {
    alt: ['Ich suche eine neue Arbeit', 'Ich bin auf Jobsuche', 'Ich suche gerade eine neue Stelle'],
  }),
  s('k10-s-apply-here', 'ผม|สมัครงาน|ที่|บริษัท|นี้', 'pǒm sà-màk-ngaan têe bor-rí-sàt née', 'Ich bewerbe mich bei dieser Firma.', { alt: ['Ich habe mich bei dieser Firma beworben'] }),
  s('k10-s-interview', 'พรุ่งนี้|ผม|มี|สัมภาษณ์|งาน', 'prûng-née pǒm mee sǎm-pâat ngaan', 'Morgen habe ich ein Vorstellungsgespräch.', { alt: ['Ich habe morgen ein Vorstellungsgespräch', 'Morgen habe ich ein Bewerbungsgespräch'] }),
  s('k10-s-experience', 'ผม|มี|ประสบการณ์|ห้า|ปี', 'pǒm mee bprà-sòp-gaan hâa bpee', 'Ich habe fünf Jahre Erfahrung.', { alt: ['Ich habe 5 Jahre Erfahrung', 'Ich habe fünf Jahre Berufserfahrung'] }),
  s('k10-s-salary', 'เงินเดือน|เท่าไหร่|ครับ', 'ngern-duean tâo-rài kráp', 'Wie hoch ist das Gehalt?', { alt: ['Wie viel ist das Gehalt', 'Wie viel verdient man', 'Was ist das Gehalt'] }),
  s('k10-s-changed-job', 'ผม|เปลี่ยนงาน|เมื่อ|ปี|ที่แล้ว', 'pǒm bplìan-ngaan mûea bpee têe-láeo', 'Ich habe letztes Jahr den Job gewechselt.', {
    alt: ['Letztes Jahr habe ich den Job gewechselt', 'Ich habe letztes Jahr die Stelle gewechselt'],
    note: 'เมื่อ + Zeitangabe = „(damals) als/im …“ für Vergangenes.',
  }),

  // ======================= Kapitel 11: Wohnen & Haushalt =======================
  // L1 Die Wohnung
  w('k11-condo', 'คอนโด', 'kon-doh', 'Eigentumswohnung', {
    alt: ['Wohnung', 'Condo', 'Apartment', 'Appartement'],
    emoji: '🏢',
    note: 'In Bangkok wohnt man meist im „Condo“ – auch zur Miete.',
  }),
  w('k11-bedroom', 'ห้องนอน', 'hôrng-norn', 'Schlafzimmer', { alt: ['das Schlafzimmer'], note: 'ห้อง + Tätigkeit = Raum: ห้องนอน (schlafen), ห้องน้ำ (Wasser → Bad).' }),
  w('k11-kitchen', 'ห้องครัว', 'hôrng-krua', 'Küche', { alt: ['die Küche'] }),
  w('k11-livingroom', 'ห้องนั่งเล่น', 'hôrng-nâng-lên', 'Wohnzimmer', { alt: ['das Wohnzimmer'], note: 'Wörtlich „Zimmer sitzen spielen“ – das Zimmer zum Entspannen.' }),
  w('k11-balcony', 'ระเบียง', 'rá-biang', 'Balkon', { alt: ['der Balkon', 'Terrasse', 'Veranda'] }),
  w('k11-floor', 'ชั้น', 'chán', 'Stockwerk', { alt: ['Etage', 'Stock', 'das Stockwerk', 'Geschoss'], note: 'ชั้นห้า = 5. Stock. ชั้น heißt auch „Regal(brett)“ oder „Klasse“.' }),
  w('k11-lift', 'ลิฟต์', 'líp', 'Aufzug', { alt: ['Lift', 'Fahrstuhl', 'der Aufzug'], emoji: '🛗' }),
  w('k11-move', 'ย้ายบ้าน', 'yáai-bâan', 'umziehen', { alt: ['Umzug', 'die Wohnung wechseln'], emoji: '📦' }),

  // L2 Mieten
  w('k11-rent-v', 'เช่า', 'châo', 'mieten', { alt: ['vermieten', 'leihen', 'pachten'], note: 'Nicht verwechseln mit เช้า (cháao) „Morgen“ – anderer Ton und andere Vokallänge!' }),
  w('k11-rent-n', 'ค่าเช่า', 'kâa-châo', 'Miete', { alt: ['die Miete', 'Mietpreis'], note: 'ค่า + Sache = Kosten/Gebühr für etwas: ค่าเช่า, ค่าไฟ, ค่าน้ำ.' }),
  w('k11-landlord', 'เจ้าของห้อง', 'jâo-kǒrng-hôrng', 'Vermieter', { alt: ['Vermieterin', 'Wohnungseigentümer', 'Eigentümer', 'der Vermieter'], note: 'เจ้าของ = Besitzer. Beim Haus: เจ้าของบ้าน.' }),
  w('k11-deposit', 'เงินมัดจำ', 'ngern-mát-jam', 'Kaution', { alt: ['die Kaution', 'Anzahlung', 'Pfand'] }),
  w('k11-contract', 'สัญญา', 'sǎn-yaa', 'Vertrag', { alt: ['Mietvertrag', 'der Vertrag', 'Versprechen', 'versprechen'], emoji: '📄' }),
  w('k11-electricity', 'ค่าไฟ', 'kâa-fai', 'Stromkosten', { alt: ['Strom', 'Stromrechnung', 'Strompreis'], emoji: '💡' }),
  w('k11-watercost', 'ค่าน้ำ', 'kâa-náam', 'Wasserkosten', { alt: ['Wassergeld', 'Wasserrechnung', 'Wasser'], emoji: '🚰' }),
  w('k11-neighbor', 'เพื่อนบ้าน', 'pûean-bâan', 'Nachbar', { alt: ['Nachbarin', 'Nachbarn', 'der Nachbar'], note: 'Wörtlich „Haus-Freund“.' }),

  // L3 Wohnung suchen (Sätze)
  s('k11-s-want-rent', 'ผม|อยาก|เช่า|คอนโด|ใกล้|รถไฟฟ้า', 'pǒm yàak châo kon-doh glâi rót-fai-fáa', 'Ich möchte eine Wohnung nahe dem Skytrain mieten.', {
    alt: ['Ich möchte ein Condo in der Nähe des Skytrains mieten', 'Ich will eine Wohnung nahe der BTS mieten'],
  }),
  s('k11-s-rent-howmuch', 'ค่าเช่า|เดือน|ละ|เท่าไหร่|ครับ', 'kâa-châo duean lá tâo-rài kráp', 'Wie hoch ist die Miete pro Monat?', {
    alt: ['Wie viel kostet die Miete im Monat', 'Was kostet die Miete pro Monat'],
    note: 'Einheit + ละ = pro: เดือนละ (pro Monat), วันละ (pro Tag).',
  }),
  s('k11-s-rent-10000', 'ค่าเช่า|เดือน|ละ|หนึ่ง|หมื่น|บาท', 'kâa-châo duean lá nùeng mùuen bàat', 'Die Miete beträgt 10.000 Baht im Monat.', {
    alt: ['Die Miete ist 10000 Baht pro Monat', 'Die Miete kostet zehntausend Baht im Monat'],
    note: 'หมื่น = zehntausend – Thai hat ein eigenes Wort dafür.',
  }),
  s('k11-s-incl-utilities', 'รวม|ค่าน้ำ|ค่าไฟ|ไหม|ครับ', 'ruam kâa-náam kâa-fai mǎi kráp', 'Sind Wasser und Strom inklusive?', {
    alt: ['Ist Wasser und Strom inklusive', 'Sind Wasser und Strom dabei', 'Inklusive Wasser und Strom?'],
    note: 'รวม = zusammen / inklusive.',
  }),
  s('k11-s-two-bedrooms', 'ห้อง|นี้|มี|สอง|ห้องนอน', 'hôrng née mee sǒrng hôrng-norn', 'Diese Wohnung hat zwei Schlafzimmer.', { alt: ['Das Zimmer hat zwei Schlafzimmer', 'Die Wohnung hat zwei Schlafzimmer'] }),
  s('k11-s-deposit', 'ต้อง|จ่าย|เงินมัดจำ|สอง|เดือน', 'dtôrng jàai ngern-mát-jam sǒrng duean', 'Man muss zwei Monatsmieten Kaution zahlen.', {
    alt: ['Man muss zwei Monate Kaution zahlen', 'Die Kaution beträgt zwei Monatsmieten'],
    note: 'Ohne Subjekt = „man“.',
  }),
  s('k11-s-move-next-month', 'ผม|จะ|ย้ายบ้าน|เดือน|หน้า', 'pǒm jà yáai-bâan duean nâa', 'Ich ziehe nächsten Monat um.', { alt: ['Nächsten Monat ziehe ich um', 'Ich werde nächsten Monat umziehen'] }),

  // L4 Möbel & Geräte
  w('k11-furniture', 'เฟอร์นิเจอร์', 'fer-ní-jer', 'Möbel', { alt: ['die Möbel', 'Einrichtung', 'Mobiliar'], note: 'Aus dem Englischen „furniture“. „Möbliert“ = มีเฟอร์นิเจอร์ / เฟอร์ครบ.' }),
  w('k11-sofa', 'โซฟา', 'soh-faa', 'Sofa', { alt: ['Couch', 'das Sofa'], emoji: '🛋️' }),
  w('k11-bed', 'เตียง', 'dtiang', 'Bett', { alt: ['das Bett'], emoji: '🛏️' }),
  w('k11-table', 'โต๊ะ', 'dtó', 'Tisch', { alt: ['der Tisch', 'Schreibtisch'] }),
  w('k11-chair', 'เก้าอี้', 'gâo-êe', 'Stuhl', { alt: ['der Stuhl', 'Sessel', 'Sitz'], emoji: '🪑' }),
  w('k11-fridge', 'ตู้เย็น', 'dtôo-yen', 'Kühlschrank', { alt: ['der Kühlschrank'], note: 'Wörtlich „kalter Schrank“ (ตู้ = Schrank, เย็น = kühl).' }),
  w('k11-washer', 'เครื่องซักผ้า', 'krûeang-sák-pâa', 'Waschmaschine', { alt: ['die Waschmaschine'], note: 'เครื่อง = Maschine/Gerät, ซักผ้า = Wäsche waschen.' }),
  w('k11-fan', 'พัดลม', 'pát-lom', 'Ventilator', { alt: ['der Ventilator', 'Lüfter'], note: 'พัด = fächeln, ลม = Wind.' }),

  // L5 Hausarbeit
  w('k11-clean', 'ทำความสะอาด', 'tam-kwaam-sà-àat', 'putzen', { alt: ['sauber machen', 'aufräumen', 'reinigen', 'saubermachen'], emoji: '🧹', note: 'สะอาด = sauber; ทำความ… macht daraus „Sauberkeit machen“.' }),
  w('k11-laundry', 'ซักผ้า', 'sák-pâa', 'Wäsche waschen', { alt: ['waschen', 'Wäsche machen'], emoji: '🧺' }),
  w('k11-cook', 'ทำอาหาร', 'tam-aa-hǎan', 'kochen', { alt: ['Essen machen', 'Essen kochen'], emoji: '🍳' }),
  w('k11-dishes', 'ล้างจาน', 'láang-jaan', 'abwaschen', { alt: ['Geschirr spülen', 'spülen', 'abspülen'], emoji: '🍽️' }),
  w('k11-iron', 'รีดผ้า', 'rêet-pâa', 'bügeln', { alt: ['Wäsche bügeln'] }),
  w('k11-trash', 'ทิ้งขยะ', 'tíng-kà-yà', 'Müll rausbringen', { alt: ['Müll wegwerfen', 'den Müll rausbringen', 'Abfall wegwerfen'], emoji: '🗑️', note: 'ทิ้ง = wegwerfen, ขยะ = Müll.' }),
  w('k11-sweep', 'กวาดบ้าน', 'gwàat-bâan', 'fegen', { alt: ['kehren', 'das Haus fegen', 'den Boden fegen'] }),

  // L6 Probleme im Haus
  w('k11-broken', 'เสีย', 'sǐa', 'kaputt', { alt: ['defekt', 'verdorben', 'kaputt sein'], note: 'Bei Geräten „kaputt“, bei Essen „verdorben“. Zerbrochenes ist แตก.' }),
  p('k11-ac-broken', 'แอร์|เสีย', 'ae sǐa', 'Die Klimaanlage ist kaputt.', { alt: ['Klimaanlage kaputt', 'die Klimaanlage ist kaputt', 'Die Klimaanlage funktioniert nicht'] }),
  p('k11-no-water', 'น้ำ|ไม่|ไหล', 'náam mâi lǎi', 'Es kommt kein Wasser.', { alt: ['kein Wasser', 'Das Wasser läuft nicht', 'Es fließt kein Wasser'], note: 'ไหล = fließen.' }),
  p('k11-powercut', 'ไฟ|ดับ', 'fai dàp', 'Der Strom ist ausgefallen.', { alt: ['Stromausfall', 'Kein Strom', 'Das Licht ist aus'], note: 'ดับ = ausgehen/erlöschen.' }),
  w('k11-repair', 'ซ่อม', 'sôrm', 'reparieren', { alt: ['ausbessern', 'flicken', 'Reparatur'], emoji: '🔧' }),
  w('k11-technician', 'ช่าง', 'châang', 'Handwerker', { alt: ['Techniker', 'Mechaniker', 'der Handwerker'], emoji: '👷', note: 'ช่าง + Fach = Berufsbezeichnung: ช่างไฟ (Elektriker), ช่างแอร์ (Klimatechniker).' }),
  p('k11-noisy', 'เสียง|ดัง', 'sǐang dang', 'laut', { alt: ['zu laut', 'Lärm', 'es ist laut'], emoji: '🔊', note: 'เสียง = Geräusch/Stimme, ดัง = laut.' }),

  // L7 Haushaltsprobleme (Sätze)
  s('k11-s-ac-bedroom', 'แอร์|ใน|ห้องนอน|เสีย|ครับ', 'ae nai hôrng-norn sǐa kráp', 'Die Klimaanlage im Schlafzimmer ist kaputt.', { alt: ['Die Klimaanlage im Schlafzimmer funktioniert nicht'] }),
  s('k11-s-send-tech', 'ช่วย|ส่ง|ช่าง|มา|ซ่อม|ได้|ไหม|ครับ', 'chûay sòng châang maa sôrm dâi mǎi kráp', 'Können Sie einen Handwerker zum Reparieren schicken?', {
    alt: ['Können Sie einen Techniker schicken', 'Kannst du einen Handwerker schicken, der das repariert'],
    note: 'ช่วย … ได้ไหม = Könnten Sie bitte …? Sehr höflich und nützlich.',
  }),
  s('k11-s-bath-nowater', 'ห้องน้ำ|น้ำ|ไม่|ไหล', 'hôrng-náam náam mâi lǎi', 'Im Bad kommt kein Wasser.', { alt: ['Im Badezimmer kommt kein Wasser', 'Im Bad läuft kein Wasser'] }),
  s('k11-s-neighbor-loud', 'เพื่อนบ้าน|เสียง|ดัง|มาก', 'pûean-bâan sǐang dang mâak', 'Die Nachbarn sind sehr laut.', { alt: ['Der Nachbar ist sehr laut', 'Die Nachbarin ist sehr laut'] }),
  s('k11-s-laundry-sat', 'ผม|ซักผ้า|ทุก|วันเสาร์', 'pǒm sák-pâa túk wan-sǎo', 'Ich wasche jeden Samstag Wäsche.', { alt: ['Jeden Samstag wasche ich Wäsche', 'Ich wasche samstags Wäsche'] }),
  s('k11-s-no-dishes', 'ผม|ไม่|ชอบ|ล้างจาน', 'pǒm mâi chôrp láang-jaan', 'Ich wasche nicht gern ab.', { alt: ['Ich mag kein Abwaschen', 'Ich spüle nicht gern'] }),
  s('k11-s-powercut', 'เมื่อคืน|ไฟ|ดับ', 'mûea-kuuen fai dàp', 'Letzte Nacht ist der Strom ausgefallen.', { alt: ['Gestern Nacht gab es einen Stromausfall', 'Gestern Nacht war der Strom weg'], note: 'เมื่อคืน = letzte Nacht (vgl. เมื่อวาน = gestern).' }),

  // ======================= Kapitel 12: Freizeit & Hobbys =======================
  // L1 Sport
  w('k12-sport', 'กีฬา', 'gee-laa', 'Sport', { alt: ['der Sport'], emoji: '🏅', note: 'Sport treiben = เล่นกีฬา (wörtlich „Sport spielen“).' }),
  w('k12-swim', 'ว่ายน้ำ', 'wâai-náam', 'schwimmen', { alt: ['Schwimmen'], emoji: '🏊' }),
  w('k12-football', 'ฟุตบอล', 'fút-bon', 'Fußball', { alt: ['der Fußball', 'Fussball'], emoji: '⚽', note: 'Fußball spielen = เตะฟุตบอล (wörtlich „Fußball treten“).' }),
  w('k12-run', 'วิ่ง', 'wîng', 'laufen', { alt: ['rennen', 'joggen', 'Laufen'], emoji: '🏃' }),
  w('k12-cycle', 'ปั่นจักรยาน', 'bpàn-jàk-grà-yaan', 'Rad fahren', { alt: ['Fahrrad fahren', 'Radfahren', 'radeln'], emoji: '🚴', note: 'จักรยาน = Fahrrad, ปั่น = treten/drehen.' }),
  w('k12-gym', 'ฟิตเนส', 'fít-nét', 'Fitnessstudio', { alt: ['Fitness', 'Gym', 'Fitnesscenter'], emoji: '🏋️' }),
  w('k12-muaythai', 'มวยไทย', 'muay-tai', 'Muay Thai', { alt: ['Thaiboxen', 'Thai-Boxen'], emoji: '🥊' }),
  w('k12-yoga', 'โยคะ', 'yoh-ká', 'Yoga', { alt: ['das Yoga'], emoji: '🧘' }),

  // L2 Hobbys
  w('k12-music', 'ดนตรี', 'don-dtree', 'Musik', { alt: ['die Musik'], emoji: '🎵', note: 'ดนตรี = Musik allgemein; ein Lied ist เพลง.' }),
  w('k12-listenmusic', 'ฟังเพลง', 'fang-pleng', 'Musik hören', { alt: ['Lieder hören'], emoji: '🎧' }),
  w('k12-sing', 'ร้องเพลง', 'rórng-pleng', 'singen', { alt: ['ein Lied singen', 'Singen'], emoji: '🎤', note: 'Karaoke ist in Thailand Volkssport!' }),
  w('k12-watchmovie', 'ดูหนัง', 'doo-nǎng', 'einen Film sehen', { alt: ['Film schauen', 'ins Kino gehen', 'Filme schauen'], emoji: '🎬', note: 'หนัง = Film (eigentlich „Haut/Leder“ – vom alten Schattentheater).' }),
  w('k12-cinema', 'โรงหนัง', 'rohng-nǎng', 'Kino', { alt: ['das Kino', 'Filmtheater'], emoji: '🍿', note: 'โรง = Halle/Gebäude: โรงแรม, โรงพยาบาล, โรงหนัง.' }),
  w('k12-read', 'อ่านหนังสือ', 'àan-nǎng-sǔue', 'lesen', { alt: ['ein Buch lesen', 'Bücher lesen', 'lernen'], emoji: '📖', note: 'Auch „lernen (für die Prüfung)“.' }),
  w('k12-photo', 'ถ่ายรูป', 'tàai-rôop', 'fotografieren', { alt: ['Fotos machen', 'ein Foto machen', 'knipsen'], emoji: '📷' }),
  w('k12-game', 'เล่นเกม', 'lên-gem', 'Videospiele spielen', { alt: ['zocken', 'Spiele spielen', 'gamen', 'Games spielen'], emoji: '🎮' }),

  // L3 Freizeit
  w('k12-hobby', 'งานอดิเรก', 'ngaan-à-dì-rèk', 'Hobby', { alt: ['das Hobby', 'Hobbys', 'Freizeitbeschäftigung'] }),
  w('k12-freetime', 'เวลาว่าง', 'we-laa-wâang', 'Freizeit', { alt: ['freie Zeit', 'die Freizeit'] }),
  w('k12-free', 'ว่าง', 'wâang', 'frei', { alt: ['Zeit haben', 'nicht beschäftigt', 'leer', 'frei sein'], note: 'ว่างไหม? = Hast du Zeit? Auch: Platz/Zimmer ist frei.' }),
  w('k12-weekend', 'เสาร์อาทิตย์', 'sǎo-aa-tít', 'Wochenende', { alt: ['das Wochenende', 'am Wochenende', 'Samstag und Sonntag'], note: 'Einfach „Samstag-Sonntag“. Formell: วันหยุดสุดสัปดาห์.' }),
  w('k12-trip', 'เที่ยว', 'tîao', 'ausgehen', { alt: ['reisen', 'einen Ausflug machen', 'Urlaub machen', 'sich vergnügen', 'herumreisen'], note: 'ไปเที่ยว = zum Vergnügen irgendwohin gehen: Ausflug, Urlaub, Party.' }),
  w('k12-travel', 'เดินทาง', 'dern-taang', 'reisen', { alt: ['verreisen', 'unterwegs sein', 'fahren'], emoji: '🧳', note: 'Neutral „eine Reise machen / unterwegs sein“ – auch geschäftlich.' }),
  w('k12-massage', 'นวด', 'nûat', 'Massage', { alt: ['massieren', 'die Massage'], emoji: '💆' }),
  w('k12-invite', 'ชวน', 'chuan', 'einladen', { alt: ['auffordern', 'fragen, ob jemand mitkommt'], note: 'ชวน = zum Mitmachen einladen. Wer zahlt, sagt เลี้ยง.' }),

  // L4 Was ich gern mache (Sätze)
  s('k12-s-hobby-q', 'งานอดิเรก|ของ|คุณ|คือ|อะไร|ครับ', 'ngaan-à-dì-rèk kǒrng kun kuue à-rai kráp', 'Was ist dein Hobby?', { alt: ['Was sind deine Hobbys', 'Was ist Ihr Hobby', 'Was für Hobbys hast du'] }),
  s('k12-s-like-swim', 'ผม|ชอบ|ว่ายน้ำ', 'pǒm chôrp wâai-náam', 'Ich schwimme gern.', { alt: ['Ich mag Schwimmen', 'Ich schwimme gerne'] }),
  s('k12-s-like-photo', 'ผม|ชอบ|ถ่ายรูป|มาก', 'pǒm chôrp tàai-rôop mâak', 'Ich fotografiere sehr gern.', { alt: ['Ich mag Fotografieren sehr', 'Ich fotografiere total gern'] }),
  s('k12-s-thai-songs', 'ผม|ชอบ|ฟังเพลง|ไทย', 'pǒm chôrp fang-pleng tai', 'Ich höre gern thailändische Musik.', { alt: ['Ich mag thailändische Lieder', 'Ich höre gern Thai-Musik'] }),
  s('k12-s-no-football', 'ผม|ไม่|ชอบ|ดู|ฟุตบอล', 'pǒm mâi chôrp doo fút-bon', 'Ich schaue nicht gern Fußball.', { alt: ['Ich mag kein Fußballschauen', 'Ich sehe nicht gern Fußball'] }),
  s('k12-s-guitar', 'ผม|เล่น|กีตาร์|ไม่|เป็น', 'pǒm lên gee-dtâa mâi bpen', 'Ich kann nicht Gitarre spielen.', {
    alt: ['Ich kann kein Gitarre spielen', 'Ich spiele nicht Gitarre'],
    note: 'Verb + เป็น = etwas gelernt haben / können. Verneint: Verb + ไม่เป็น.',
  }),
  s('k12-s-freetime-read', 'เวลาว่าง|ผม|ชอบ|อ่านหนังสือ', 'we-laa-wâang pǒm chôrp àan-nǎng-sǔue', 'In meiner Freizeit lese ich gern.', { alt: ['In der Freizeit lese ich gern', 'In meiner Freizeit lese ich gerne'] }),

  // L5 Wie oft?
  w('k12-often', 'บ่อย', 'bòi', 'oft', { alt: ['häufig', 'öfters'], note: 'Steht hinter dem Verb: ไปบ่อย = gehe oft hin.' }),
  w('k12-sometimes', 'บางครั้ง', 'baang-kráng', 'manchmal', { alt: ['ab und zu', 'gelegentlich'], note: 'Steht meist am Satzanfang. Umgangssprachlich auch บางที.' }),
  p('k12-rarely', 'ไม่|ค่อย', 'mâi kôi', 'nicht so oft', { alt: ['kaum', 'selten', 'nicht besonders', 'nicht so sehr'], note: 'ไม่ค่อย + Verb/Adjektiv = „nicht so sehr/kaum“: ไม่ค่อยเผ็ด = nicht sehr scharf.' }),
  p('k12-everyday', 'ทุก|วัน', 'túk wan', 'jeden Tag', { alt: ['täglich', 'alle Tage'], note: 'ทุก = jede(r/s): ทุกเช้า (jeden Morgen), ทุกปี (jedes Jahr).' }),
  w('k12-always', 'เสมอ', 'sà-mǒr', 'immer', { alt: ['stets', 'jedes Mal'] }),
  w('k12-time-n', 'ครั้ง', 'kráng', 'Mal', { alt: ['das Mal', 'mal'], note: 'สองครั้ง = zweimal, ครั้งแรก = das erste Mal.' }),
  p('k12-onceweek', 'อาทิตย์|ละ|ครั้ง', 'aa-tít lá kráng', 'einmal pro Woche', { alt: ['einmal die Woche', 'einmal wöchentlich', 'wöchentlich'], note: 'อาทิตย์ = Woche (umgangssprachlich), ละ = pro.' }),

  // L6 Wie oft? (Sätze)
  s('k12-s-gym-often', 'ผม|ไป|ฟิตเนส|บ่อย', 'pǒm bpai fít-nét bòi', 'Ich gehe oft ins Fitnessstudio.', { alt: ['Ich gehe häufig ins Fitnessstudio', 'Ich gehe oft ins Gym'] }),
  s('k12-s-swim-twice', 'ผม|ไป|ว่ายน้ำ|อาทิตย์|ละ|สอง|ครั้ง', 'pǒm bpai wâai-náam aa-tít lá sǒrng kráng', 'Ich gehe zweimal pro Woche schwimmen.', { alt: ['Ich gehe zweimal die Woche schwimmen', 'Zweimal pro Woche gehe ich schwimmen'] }),
  s('k12-s-sometimes-movie', 'บางครั้ง|ผม|ไป|ดูหนัง|กับ|เพื่อน', 'baang-kráng pǒm bpai doo-nǎng gàp pûean', 'Manchmal gehe ich mit Freunden ins Kino.', { alt: ['Manchmal gehe ich mit einem Freund ins Kino', 'Manchmal schaue ich mit Freunden einen Film'] }),
  s('k12-s-rarely-tv', 'ผม|ไม่|ค่อย|ดู|ทีวี', 'pǒm mâi kôi doo tee-wee', 'Ich sehe kaum fern.', { alt: ['Ich schaue nicht oft fern', 'Ich sehe selten fern', 'Ich schaue kaum Fernsehen'] }),
  s('k12-s-run-morning', 'ผม|วิ่ง|ทุก|เช้า', 'pǒm wîng túk cháao', 'Ich laufe jeden Morgen.', { alt: ['Ich jogge jeden Morgen', 'Jeden Morgen gehe ich laufen'] }),
  s('k12-s-massage-often', 'คุณ|ไป|นวด|บ่อย|ไหม|ครับ', 'kun bpai nûat bòi mǎi kráp', 'Gehst du oft zur Massage?', { alt: ['Gehen Sie oft zur Massage', 'Lässt du dich oft massieren'] }),

  // L7 Verabreden & einladen (Sätze)
  s('k12-s-weekend-free', 'เสาร์อาทิตย์|นี้|ว่าง|ไหม|ครับ', 'sǎo-aa-tít née wâang mǎi kráp', 'Hast du dieses Wochenende Zeit?', { alt: ['Haben Sie dieses Wochenende Zeit', 'Bist du dieses Wochenende frei'] }),
  s('k12-s-movie-together', 'ไป|ดูหนัง|ด้วยกัน|ไหม|ครับ', 'bpai doo-nǎng dûay-gan mǎi kráp', 'Wollen wir zusammen ins Kino gehen?', { alt: ['Gehen wir zusammen ins Kino', 'Wollen wir zusammen einen Film sehen'], note: 'ไป … ด้วยกันไหม = Lass uns zusammen … – die typische Einladung.' }),
  s('k12-s-football-together', 'ไป|เตะ|ฟุตบอล|กัน|ไหม', 'bpai dtè fút-bon gan mǎi', 'Wollen wir Fußball spielen gehen?', { alt: ['Gehen wir Fußball spielen', 'Lust auf Fußball'] }),
  s('k12-s-massage-together', 'ไป|นวด|กัน|ไหม|ครับ', 'bpai nûat gan mǎi kráp', 'Wollen wir zur Massage gehen?', { alt: ['Gehen wir zusammen zur Massage', 'Lust auf eine Massage'] }),
  s('k12-s-sure', 'ได้|เลย|ครับ', 'dâi loei kráp', 'Klar, gern!', { alt: ['Gerne', 'Na klar', 'Auf jeden Fall', 'Klar'], note: 'เลย verstärkt: ได้เลย = „aber sicher!“' }),
  s('k12-s-not-free', 'วัน|นั้น|ผม|ไม่|ว่าง|ครับ', 'wan nán pǒm mâi wâang kráp', 'An dem Tag habe ich keine Zeit.', { alt: ['An diesem Tag habe ich keine Zeit', 'Da habe ich keine Zeit'] }),
  s('k12-s-invite-sea', 'ผม|ชวน|เพื่อน|ไป|เที่ยว|ทะเล', 'pǒm chuan pûean bpai tîao tá-lee', 'Ich lade einen Freund zu einem Ausflug ans Meer ein.', { alt: ['Ich lade Freunde ans Meer ein', 'Ich lade einen Freund zum Meer ein'] }),

  // ======================= Kapitel 13: Pläne & Zeitangaben =======================
  // L1 Wochen, Monate, Jahre
  w('k13-month', 'เดือน', 'duean', 'Monat', { alt: ['der Monat', 'Mond'], emoji: '📅' }),
  w('k13-week', 'สัปดาห์', 'sàp-daa', 'Woche', { alt: ['die Woche'], note: 'Eher formell/schriftlich. Im Gespräch sagt man meist อาทิตย์.' }),
  p('k13-nextweek', 'อาทิตย์|หน้า', 'aa-tít nâa', 'nächste Woche', { alt: ['kommende Woche'], note: 'หน้า = vorne → das, was vor einem liegt: nächste(r).' }),
  p('k13-lastweek', 'อาทิตย์|ที่แล้ว', 'aa-tít têe-láeo', 'letzte Woche', { alt: ['vorige Woche', 'vergangene Woche'], note: 'ที่แล้ว = vergangen/letzte(r).' }),
  p('k13-nextmonth', 'เดือน|หน้า', 'duean nâa', 'nächsten Monat', { alt: ['nächster Monat', 'kommenden Monat'] }),
  p('k13-lastyear', 'ปี|ที่แล้ว', 'bpee têe-láeo', 'letztes Jahr', { alt: ['voriges Jahr', 'im letzten Jahr', 'vergangenes Jahr'] }),
  p('k13-nextyear', 'ปี|หน้า', 'bpee nâa', 'nächstes Jahr', { alt: ['kommendes Jahr', 'im nächsten Jahr'] }),
  w('k13-dayaftertomorrow', 'มะรืนนี้', 'má-ruuen-née', 'übermorgen', { alt: ['Übermorgen'] }),

  // L2 Zeitpunkte
  p('k13-soon', 'เร็วๆ|นี้', 'reo-reo née', 'bald', { alt: ['demnächst', 'in Kürze'], note: 'ๆ verdoppelt das Wort davor: เร็วๆ = reo-reo.' }),
  w('k13-justnow', 'เมื่อกี้', 'mûea-gêe', 'vorhin', { alt: ['gerade eben', 'eben', 'vor kurzem'] }),
  w('k13-later', 'ทีหลัง', 'tee-lǎng', 'später', { alt: ['nachher', 'danach'] }),
  w('k13-justdone', 'เพิ่ง', 'pêrng', 'gerade erst', { alt: ['eben erst', 'soeben', 'erst'], note: 'Steht VOR dem Verb: ผมเพิ่งมา = Ich bin gerade erst gekommen.' }),
  w('k13-since', 'ตั้งแต่', 'dtâng-dtàe', 'seit', { alt: ['ab', 'von … an'], note: 'ตั้งแต่ … ถึง … = von … bis …' }),
  w('k13-until', 'ถึง', 'tǔeng', 'bis', { alt: ['ankommen', 'erreichen', 'bis zu'], note: 'Auch „ankommen“: มาถึง = ankommen.' }),
  w('k13-before', 'ก่อน', 'gòrn', 'bevor', { alt: ['vor', 'zuerst', 'vorher'], note: 'ก่อน + Verb = bevor; Verb + ก่อน = zuerst (ไปก่อน = ich gehe schon mal).' }),
  w('k13-after', 'หลังจาก', 'lǎng-jàak', 'nachdem', { alt: ['nach', 'danach'], note: 'หลัง = hinten/nach, จาก = von.' }),

  // L3 Zeitformen
  w('k13-will', 'จะ', 'jà', 'werden (Zukunft)', { alt: ['werden', 'wird', 'Zukunft', 'Futur'], note: 'จะ vor dem Verb = Zukunft/Absicht. Das Verb selbst ändert sich nie!' }),
  w('k13-already', 'แล้ว', 'láeo', 'schon', { alt: ['bereits', 'fertig', 'dann'], note: 'Am Satzende = abgeschlossen (schon). Am Satzanfang = und dann.' }),
  w('k13-ever', 'เคย', 'koei', 'schon einmal', { alt: ['schon mal', 'jemals', 'früher'], note: 'เคย + Verb = Erfahrung: Hast du schon mal …? ไม่เคย = noch nie.' }),
  w('k13-ing', 'กำลัง', 'gam-lang', 'gerade (dabei)', { alt: ['gerade', 'dabei sein', 'gerade dabei'], note: 'กำลัง + Verb (+ อยู่) = Verlaufsform: Ich bin gerade dabei, …' }),
  w('k13-still', 'ยัง', 'yang', 'noch', { alt: ['immer noch', 'noch immer'], note: 'ยัง + Verb = immer noch. Frage: …หรือยัง? = schon …?' }),
  p('k13-notyet', 'ยัง|ไม่', 'yang mâi', 'noch nicht', { alt: ['bisher nicht'], note: 'Antwort auf „schon?“: ยังครับ = noch nicht.' }),

  // L4 Was war, was wird (Sätze)
  s('k13-s-will-chiangmai', 'พรุ่งนี้|ผม|จะ|ไป|เชียงใหม่', 'prûng-née pǒm jà bpai chiang-mài', 'Morgen fahre ich nach Chiang Mai.', { alt: ['Morgen werde ich nach Chiang Mai fahren', 'Ich fahre morgen nach Chiang Mai', 'Morgen gehe ich nach Chiang Mai'] }),
  s('k13-s-ate-already', 'ผม|กิน|ข้าว|แล้ว', 'pǒm gin kâao láeo', 'Ich habe schon gegessen.', { alt: ['Ich habe bereits gegessen'], note: 'Antwort auf die Grußfrage กินข้าวหรือยัง? (Schon gegessen?)' }),
  s('k13-s-not-eaten', 'ผม|ยัง|ไม่|ได้|กิน|ข้าว', 'pǒm yang mâi dâi gin kâao', 'Ich habe noch nicht gegessen.', { alt: ['Ich habe noch nichts gegessen'], note: 'ไม่ได้ + Verb = (in der Vergangenheit) nicht getan.' }),
  s('k13-s-been-phuket', 'คุณ|เคย|ไป|ภูเก็ต|ไหม|ครับ', 'kun koei bpai poo-gèt mǎi kráp', 'Warst du schon einmal in Phuket?', { alt: ['Warst du schon mal in Phuket', 'Waren Sie schon einmal in Phuket', 'Bist du schon mal nach Phuket gefahren'] }),
  s('k13-s-been-twice', 'ผม|เคย|ไป|เชียงใหม่|สอง|ครั้ง', 'pǒm koei bpai chiang-mài sǒrng kráng', 'Ich war schon zweimal in Chiang Mai.', { alt: ['Ich bin schon zweimal in Chiang Mai gewesen'] }),
  s('k13-s-working-now', 'ผม|กำลัง|ทำงาน|อยู่', 'pǒm gam-lang tam-ngaan yòo', 'Ich arbeite gerade.', { alt: ['Ich bin gerade bei der Arbeit', 'Ich bin gerade am Arbeiten'] }),
  s('k13-s-just-arrived', 'ผม|เพิ่ง|มา|ถึง', 'pǒm pêrng maa tǔeng', 'Ich bin gerade erst angekommen.', { alt: ['Ich bin eben erst angekommen', 'Ich bin gerade angekommen'] }),

  // L5 Termine
  w('k13-appointment', 'นัด', 'nát', 'Verabredung', { alt: ['Termin', 'sich verabreden', 'Treffen', 'verabreden'], note: 'Als Verb: sich verabreden. นัดหมอ = Arzttermin.' }),
  w('k13-plan', 'แผน', 'pǎen', 'Plan', { alt: ['der Plan', 'Pläne'], emoji: '🗺️' }),
  w('k13-postpone', 'เลื่อน', 'lûean', 'verschieben', { alt: ['verlegen', 'aufschieben'], note: 'Wörtlich „gleiten/rutschen“ – den Termin wegrutschen lassen.' }),
  w('k13-cancel', 'ยกเลิก', 'yók-lêrk', 'absagen', { alt: ['stornieren', 'abbrechen', 'canceln'], emoji: '❌' }),
  w('k13-convenient', 'สะดวก', 'sà-dùak', 'passend', { alt: ['bequem', 'praktisch', 'es passt', 'günstig'], note: 'สะดวกไหม? = Passt es dir? Sehr höflich bei Terminen.' }),
  w('k13-about', 'ประมาณ', 'bprà-maan', 'ungefähr', { alt: ['etwa', 'circa', 'zirka', 'rund'] }),
  w('k13-afternoon', 'ตอนบ่าย', 'dtorn-bàai', 'nachmittags', { alt: ['am Nachmittag', 'Nachmittag'] }),
  w('k13-night', 'ตอนกลางคืน', 'dtorn-glaang-kuuen', 'nachts', { alt: ['in der Nacht', 'Nacht'], emoji: '🌙' }),

  // L6 Seit, bis, bevor (Sätze)
  s('k13-s-since-lastyear', 'ผม|อยู่|เมืองไทย|ตั้งแต่|ปี|ที่แล้ว', 'pǒm yòo mueang-tai dtâng-dtàe bpee têe-láeo', 'Ich lebe seit letztem Jahr in Thailand.', { alt: ['Seit letztem Jahr lebe ich in Thailand', 'Ich wohne seit letztem Jahr in Thailand'], note: 'เมืองไทย = umgangssprachlich für Thailand.' }),
  s('k13-s-two-years', 'ผม|เรียน|ภาษา|ไทย|มา|สอง|ปี|แล้ว', 'pǒm rian paa-sǎa tai maa sǒrng bpee láeo', 'Ich lerne seit zwei Jahren Thai.', { alt: ['Ich lerne schon seit zwei Jahren Thai', 'Ich lerne seit 2 Jahren Thai'], note: 'Verb + มา + Dauer + แล้ว = etwas seit … tun.' }),
  s('k13-s-work-until-six', 'ผม|ทำงาน|ถึง|หก|โมง|เย็น', 'pǒm tam-ngaan tǔeng hòk mohng yen', 'Ich arbeite bis 18 Uhr.', { alt: ['Ich arbeite bis sechs Uhr abends', 'Ich arbeite bis um 18 Uhr'] }),
  s('k13-s-read-before-bed', 'ก่อน|นอน|ผม|อ่านหนังสือ', 'gòrn norn pǒm àan-nǎng-sǔue', 'Vor dem Schlafen lese ich.', { alt: ['Bevor ich schlafe, lese ich', 'Vor dem Schlafengehen lese ich'] }),
  s('k13-s-gym-after-work', 'หลังจาก|เลิกงาน|ผม|ไป|ฟิตเนส', 'lǎng-jàak lêrk-ngaan pǒm bpai fít-nét', 'Nach Feierabend gehe ich ins Fitnessstudio.', { alt: ['Nach der Arbeit gehe ich ins Fitnessstudio', 'Nachdem ich Feierabend habe, gehe ich ins Gym'] }),
  s('k13-s-call-back', 'เดี๋ยว|ผม|โทร|กลับ|นะ|ครับ', 'dǐao pǒm toh glàp ná kráp', 'Ich rufe gleich zurück.', { alt: ['Ich rufe dich gleich zurück', 'Ich rufe Sie gleich zurück'], note: 'โทร = telefonieren (von โทรศัพท์), กลับ = zurück.' }),

  // L7 Verabredungen (Sätze)
  s('k13-s-free-nextweek', 'อาทิตย์|หน้า|คุณ|ว่าง|ไหม|ครับ', 'aa-tít nâa kun wâang mǎi kráp', 'Hast du nächste Woche Zeit?', { alt: ['Haben Sie nächste Woche Zeit', 'Bist du nächste Woche frei'] }),
  s('k13-s-what-time', 'เรา|เจอ|กัน|กี่|โมง|ดี|ครับ', 'rao jer gan gèe mohng dee kráp', 'Um wie viel Uhr treffen wir uns?', { alt: ['Wann treffen wir uns', 'Um wie viel Uhr sollen wir uns treffen'], note: '… ดี am Ende = „am besten“: Wann passt es am besten?' }),
  s('k13-s-meet-3pm', 'เจอ|กัน|บ่าย|สาม|โมง|นะ|ครับ', 'jer gan bàai sǎam mohng ná kráp', 'Wir treffen uns um 15 Uhr, okay?', { alt: ['Treffen wir uns um drei Uhr nachmittags', 'Bis um 15 Uhr', 'Wir sehen uns um 15 Uhr'] }),
  s('k13-s-postpone-friday', 'ขอ|เลื่อน|นัด|เป็น|วันศุกร์|ได้|ไหม|ครับ', 'kǒr lûean nát bpen wan-sùk dâi mǎi kráp', 'Kann ich den Termin auf Freitag verschieben?', { alt: ['Können wir den Termin auf Freitag verschieben', 'Darf ich die Verabredung auf Freitag verschieben'] }),
  s('k13-s-cancel-today', 'ผม|ต้อง|ยกเลิก|นัด|วันนี้|ครับ', 'pǒm dtôrng yók-lêrk nát wan-née kráp', 'Ich muss den Termin heute absagen.', { alt: ['Ich muss das heutige Treffen absagen', 'Ich muss die Verabredung heute absagen'] }),
  s('k13-s-which-day', 'วัน|ไหน|สะดวก|ครับ', 'wan nǎi sà-dùak kráp', 'Welcher Tag passt dir?', { alt: ['Welcher Tag passt Ihnen', 'An welchem Tag passt es'] }),
  s('k13-s-ten-minutes', 'อีก|สิบ|นาที|ผม|จะ|ไป|ถึง|ครับ', 'èek sìp naa-tee pǒm jà bpai tǔeng kráp', 'Ich bin in zehn Minuten da.', { alt: ['Ich komme in zehn Minuten an', 'Ich bin in 10 Minuten da', 'In zehn Minuten bin ich da'] }),
]

export const chapters3: Chapter[] = [
  {
    id: 'k10',
    title: 'Arbeit & Beruf',
    subtitle: 'Büro, Kollegen, Feierabend und Bewerbung',
    icon: '💼',
    color: '#5b8def',
    lessons: [
      { id: 'k10-l1', title: 'Im Büro', subtitle: 'Firma, Chef und Kollegen', icon: '🏢', type: 'vocab', items: ['k10-company', 'k10-office', 'k10-colleague', 'k10-boss', 'k10-customer', 'k10-meeting', 'k10-computer', 'k10-email'] },
      { id: 'k10-l2', title: 'Arbeitsalltag', subtitle: 'Gehalt, pünktlich, Feierabend', icon: '⏰', type: 'vocab', items: ['k10-salary', 'k10-startwork', 'k10-finishwork', 'k10-busy', 'k10-ontime', 'k10-late', 'k10-leave', 'k10-dayoff'] },
      { id: 'k10-l3', title: 'Mein Job', subtitle: 'Wo und wann ich arbeite', icon: '👔', type: 'sentences', grammar: 'g-verbs-serial', items: ['k10-s-work-company', 'k10-s-mon-fri', 'k10-s-start-nine', 'k10-s-finish-six', 'k10-s-boss-kind', 'k10-s-colleague-thai', 'k10-s-skytrain'] },
      { id: 'k10-l4', title: 'Jobsuche', subtitle: 'Bewerben, kündigen, wechseln', icon: '📝', type: 'vocab', items: ['k10-apply', 'k10-interview', 'k10-experience', 'k10-jobsearch', 'k10-changejob', 'k10-quit', 'k10-unemployed'] },
      { id: 'k10-l5', title: 'Arbeitsleben', subtitle: 'Stress, Überstunden, Homeoffice', icon: '📈', type: 'vocab', items: ['k10-muchwork', 'k10-sendmail', 'k10-stressed', 'k10-overtime', 'k10-homeoffice', 'k10-raise', 'k10-joinmeeting'] },
      { id: 'k10-l6', title: 'Ein voller Tag', subtitle: 'Meetings, Mails, Verspätung', icon: '📧', type: 'sentences', grammar: 'g-time', items: ['k10-s-busy-today', 'k10-s-meeting-2pm', 'k10-s-send-mail', 'k10-s-sorry-late', 'k10-s-leave-tomorrow', 'k10-s-overtime', 'k10-s-want-quit'] },
      { id: 'k10-l7', title: 'Die Bewerbung', subtitle: 'Über Erfahrung und Gehalt sprechen', icon: '🤝', type: 'sentences', items: ['k10-s-new-job', 'k10-s-apply-here', 'k10-s-interview', 'k10-s-experience', 'k10-s-salary', 'k10-s-changed-job'] },
    ],
  },
  {
    id: 'k11',
    title: 'Wohnen & Haushalt',
    subtitle: 'Wohnung mieten, Möbel, Hausarbeit und Reparaturen',
    icon: '🏠',
    color: '#e67e22',
    lessons: [
      { id: 'k11-l1', title: 'Die Wohnung', subtitle: 'Zimmer, Balkon, Aufzug', icon: '🏢', type: 'vocab', items: ['k11-condo', 'k11-bedroom', 'k11-kitchen', 'k11-livingroom', 'k11-balcony', 'k11-floor', 'k11-lift', 'k11-move'] },
      { id: 'k11-l2', title: 'Mieten', subtitle: 'Miete, Kaution, Vertrag', icon: '🔑', type: 'vocab', items: ['k11-rent-v', 'k11-rent-n', 'k11-landlord', 'k11-deposit', 'k11-contract', 'k11-electricity', 'k11-watercost', 'k11-neighbor'] },
      { id: 'k11-l3', title: 'Wohnungssuche', subtitle: 'Fragen an den Vermieter', icon: '🔍', type: 'sentences', grammar: 'g-questions', items: ['k11-s-want-rent', 'k11-s-rent-howmuch', 'k11-s-rent-10000', 'k11-s-incl-utilities', 'k11-s-two-bedrooms', 'k11-s-deposit', 'k11-s-move-next-month'] },
      { id: 'k11-l4', title: 'Möbel & Geräte', subtitle: 'Bett, Tisch, Kühlschrank', icon: '🛋️', type: 'vocab', items: ['k11-furniture', 'k11-sofa', 'k11-bed', 'k11-table', 'k11-chair', 'k11-fridge', 'k11-washer', 'k11-fan'] },
      { id: 'k11-l5', title: 'Hausarbeit', subtitle: 'Putzen, waschen, kochen', icon: '🧹', type: 'vocab', items: ['k11-clean', 'k11-laundry', 'k11-cook', 'k11-dishes', 'k11-iron', 'k11-trash', 'k11-sweep'] },
      { id: 'k11-l6', title: 'Etwas ist kaputt', subtitle: 'Klimaanlage, Wasser, Strom', icon: '🔧', type: 'vocab', items: ['k11-broken', 'k11-ac-broken', 'k11-no-water', 'k11-powercut', 'k11-repair', 'k11-technician', 'k11-noisy'] },
      { id: 'k11-l7', title: 'Probleme melden', subtitle: 'Reparaturen und Nachbarn', icon: '🛠️', type: 'sentences', grammar: 'g-negation', items: ['k11-s-ac-bedroom', 'k11-s-send-tech', 'k11-s-bath-nowater', 'k11-s-neighbor-loud', 'k11-s-laundry-sat', 'k11-s-no-dishes', 'k11-s-powercut'] },
    ],
  },
  {
    id: 'k12',
    title: 'Freizeit & Hobbys',
    subtitle: 'Sport, Musik, Kino – und Verabredungen',
    icon: '⚽',
    color: '#16a085',
    lessons: [
      { id: 'k12-l1', title: 'Sport', subtitle: 'Schwimmen, Fußball, Muay Thai', icon: '🏊', type: 'vocab', items: ['k12-sport', 'k12-swim', 'k12-football', 'k12-run', 'k12-cycle', 'k12-gym', 'k12-muaythai', 'k12-yoga'] },
      { id: 'k12-l2', title: 'Hobbys', subtitle: 'Musik, Kino, Lesen, Fotos', icon: '🎧', type: 'vocab', items: ['k12-music', 'k12-listenmusic', 'k12-sing', 'k12-watchmovie', 'k12-cinema', 'k12-read', 'k12-photo', 'k12-game'] },
      { id: 'k12-l3', title: 'Freizeit', subtitle: 'Wochenende, Ausflüge, Massage', icon: '💆', type: 'vocab', items: ['k12-hobby', 'k12-freetime', 'k12-free', 'k12-weekend', 'k12-trip', 'k12-travel', 'k12-massage', 'k12-invite'] },
      { id: 'k12-l4', title: 'Was ich gern mache', subtitle: 'Vorlieben ausdrücken', icon: '❤️', type: 'sentences', grammar: 'g-want-like', items: ['k12-s-hobby-q', 'k12-s-like-swim', 'k12-s-like-photo', 'k12-s-thai-songs', 'k12-s-no-football', 'k12-s-guitar', 'k12-s-freetime-read'] },
      { id: 'k12-l5', title: 'Wie oft?', subtitle: 'Oft, manchmal, kaum', icon: '🔁', type: 'vocab', items: ['k12-often', 'k12-sometimes', 'k12-rarely', 'k12-everyday', 'k12-always', 'k12-time-n', 'k12-onceweek'] },
      { id: 'k12-l6', title: 'Meine Routine', subtitle: 'Häufigkeit in Sätzen', icon: '📆', type: 'sentences', items: ['k12-s-gym-often', 'k12-s-swim-twice', 'k12-s-sometimes-movie', 'k12-s-rarely-tv', 'k12-s-run-morning', 'k12-s-massage-often'] },
      { id: 'k12-l7', title: 'Einladen', subtitle: 'Zusagen und absagen', icon: '🎉', type: 'sentences', grammar: 'g-questions', items: ['k12-s-weekend-free', 'k12-s-movie-together', 'k12-s-football-together', 'k12-s-massage-together', 'k12-s-sure', 'k12-s-not-free', 'k12-s-invite-sea'] },
    ],
  },
  {
    id: 'k13',
    title: 'Pläne & Zeitangaben',
    subtitle: 'Vergangenheit, Zukunft und Termine',
    icon: '🗓️',
    color: '#8e44ad',
    lessons: [
      { id: 'k13-l1', title: 'Wochen & Jahre', subtitle: 'Nächste Woche, letztes Jahr', icon: '📅', type: 'vocab', grammar: 'g-time', items: ['k13-month', 'k13-week', 'k13-nextweek', 'k13-lastweek', 'k13-nextmonth', 'k13-lastyear', 'k13-nextyear', 'k13-dayaftertomorrow'] },
      { id: 'k13-l2', title: 'Zeitpunkte', subtitle: 'Bald, vorhin, seit, bis', icon: '⏳', type: 'vocab', items: ['k13-soon', 'k13-justnow', 'k13-later', 'k13-justdone', 'k13-since', 'k13-until', 'k13-before', 'k13-after'] },
      { id: 'k13-l3', title: 'Zeitformen', subtitle: 'จะ, แล้ว, เคย, กำลัง', icon: '🕰️', type: 'vocab', items: ['k13-will', 'k13-already', 'k13-ever', 'k13-ing', 'k13-still', 'k13-notyet'] },
      { id: 'k13-l4', title: 'Was war, was wird', subtitle: 'Vergangenheit und Zukunft', icon: '🔮', type: 'sentences', grammar: 'g-time', items: ['k13-s-will-chiangmai', 'k13-s-ate-already', 'k13-s-not-eaten', 'k13-s-been-phuket', 'k13-s-been-twice', 'k13-s-working-now', 'k13-s-just-arrived'] },
      { id: 'k13-l5', title: 'Termine', subtitle: 'Verabreden, verschieben, absagen', icon: '📌', type: 'vocab', items: ['k13-appointment', 'k13-plan', 'k13-postpone', 'k13-cancel', 'k13-convenient', 'k13-about', 'k13-afternoon', 'k13-night'] },
      { id: 'k13-l6', title: 'Seit, bis, bevor', subtitle: 'Zeiträume beschreiben', icon: '↔️', type: 'sentences', items: ['k13-s-since-lastyear', 'k13-s-two-years', 'k13-s-work-until-six', 'k13-s-read-before-bed', 'k13-s-gym-after-work', 'k13-s-call-back'] },
      { id: 'k13-l7', title: 'Verabredungen', subtitle: 'Treffen planen', icon: '🤝', type: 'sentences', grammar: 'g-questions', items: ['k13-s-free-nextweek', 'k13-s-what-time', 'k13-s-meet-3pm', 'k13-s-postpone-friday', 'k13-s-cancel-today', 'k13-s-which-day', 'k13-s-ten-minutes'] },
    ],
  },
]
