import type { Chapter, Item } from './types'

// [Zeichen, Name (Thai), Name-Umschrift, Bedeutung, Klasse, Anlaut, Auslaut, Emoji?, Notiz?]
type C = [string, string, string, string, 'mid' | 'high' | 'low', string, string, string?, string?]

const CONSONANTS: C[] = [
  ['ก', 'กอ ไก่', 'gor gài', 'Huhn', 'mid', 'g', 'k', '🐔', 'Ungehauchtes g/k – zwischen deutschem g und k.'],
  ['ข', 'ขอ ไข่', 'kǒr kài', 'Ei', 'high', 'k', 'k', '🥚', 'Gehauchtes k. Sieht aus wie ช, aber ohne Zacke.'],
  ['ฃ', 'ฃอ ขวด', 'kǒr kùat', 'Flasche', 'high', 'k', 'k', '🍾', 'Veraltet – wird heute nicht mehr verwendet.'],
  ['ค', 'คอ ควาย', 'kor kwaai', 'Wasserbüffel', 'low', 'k', 'k', '🐃', 'Häufigster k-Laut der tiefen Klasse.'],
  ['ฅ', 'ฅอ คน', 'kor kon', 'Mensch', 'low', 'k', 'k', '🧍', 'Veraltet – wird heute nicht mehr verwendet.'],
  ['ฆ', 'ฆอ ระฆัง', 'kor rá-kang', 'Glocke', 'low', 'k', 'k', '🔔', 'Selten, v.a. in Lehnwörtern aus dem Sanskrit.'],
  ['ง', 'งอ งู', 'ngor nguu', 'Schlange', 'low', 'ng', 'ng', '🐍', 'ng wie in „singen“ – kommt auch am Wortanfang vor!'],
  ['จ', 'จอ จาน', 'jor jaan', 'Teller', 'mid', 'j', 't', '🍽️', 'Ungehauchtes dsch/tsch.'],
  ['ฉ', 'ฉอ ฉิ่ง', 'chǒr chìng', 'Becken (Instrument)', 'high', 'ch', '–', '🥁', 'Gehauchtes tsch.'],
  ['ช', 'ชอ ช้าง', 'chor cháang', 'Elefant', 'low', 'ch', 't', '🐘', 'Wie ข mit einer Zacke oben.'],
  ['ซ', 'ซอ โซ่', 'sor sôo', 'Kette', 'low', 's', 't', '⛓️', 'Wie ช mit zusätzlichem Häkchen.'],
  ['ฌ', 'ฌอ เฌอ', 'chor cher', 'Baum', 'low', 'ch', '–', '🌳', 'Sehr selten.'],
  ['ญ', 'ญอ หญิง', 'yor yǐng', 'Frau', 'low', 'y', 'n', '👩', 'Als Auslaut wie n gesprochen.'],
  ['ฎ', 'ฎอ ชฎา', 'dor chá-daa', 'Tanzkrone', 'mid', 'd', 't', '👑', 'Selten. Unten mit kleinem Bogen – vgl. ฏ.'],
  ['ฏ', 'ฏอ ปฏัก', 'dtor bpà-dtàk', 'Treibstachel', 'mid', 'dt', 't', '🪡', 'Selten. Unten mit Häkchen – vgl. ฎ.'],
  ['ฐ', 'ฐอ ฐาน', 'tǒr tǎan', 'Sockel', 'high', 't', 't', '🗿', 'Selten. Der „Schwanz“ unten wird oft weggelassen.'],
  ['ฑ', 'ฑอ มณโฑ', 'tor mon-too', 'Montho (Figur im Ramakien)', 'low', 't', 't', '👸', 'Manchmal auch wie d gesprochen.'],
  ['ฒ', 'ฒอ ผู้เฒ่า', 'tor pûu-tâo', 'alter Mann', 'low', 't', 't', '👴', 'Selten.'],
  ['ณ', 'ณอ เณร', 'nor neen', 'Novize', 'low', 'n', 'n', '🧑‍🦲', 'Seltenere n-Form, z.B. in คุณ.'],
  ['ด', 'ดอ เด็ก', 'dor dèk', 'Kind', 'mid', 'd', 't', '🧒', 'Klares d. Kringel innen – vgl. ต.'],
  ['ต', 'ตอ เต่า', 'dtor dtào', 'Schildkröte', 'mid', 'dt', 't', '🐢', 'Ungehauchtes t (zwischen d und t). Wie ด mit Zacke.'],
  ['ถ', 'ถอ ถุง', 'tǒr tǔng', 'Beutel', 'high', 't', 't', '🛍️', 'Gehauchtes t.'],
  ['ท', 'ทอ ทหาร', 'tor tá-hǎan', 'Soldat', 'low', 't', 't', '💂', 'Häufigster t-Laut. Nicht mit ห verwechseln!'],
  ['ธ', 'ธอ ธง', 'tor tong', 'Fahne', 'low', 't', 't', '🚩', ''],
  ['น', 'นอ หนู', 'nor nǔu', 'Maus', 'low', 'n', 'n', '🐭', 'Häufigstes n.'],
  ['บ', 'บอ ใบไม้', 'bor bai-máai', 'Blatt', 'mid', 'b', 'p', '🍃', 'Klares b. Ohne Strich nach oben – vgl. ป.'],
  ['ป', 'ปอ ปลา', 'bpor bplaa', 'Fisch', 'mid', 'bp', 'p', '🐟', 'Ungehauchtes p. Wie บ mit langem Strich nach oben.'],
  ['ผ', 'ผอ ผึ้ง', 'pǒr pûeng', 'Biene', 'high', 'p', '–', '🐝', 'Gehauchtes p. Vgl. ฝ (mit langem Strich).'],
  ['ฝ', 'ฝอ ฝา', 'fǒr fǎa', 'Deckel', 'high', 'f', '–', '🫕', 'Wie ผ mit langem Strich nach oben.'],
  ['พ', 'พอ พาน', 'por paan', 'Opferschale', 'low', 'p', 'p', '🏺', 'Häufigstes p der tiefen Klasse. Vgl. ฟ.'],
  ['ฟ', 'ฟอ ฟัน', 'for fan', 'Zahn', 'low', 'f', 'p', '🦷', 'Wie พ mit langem Strich nach oben.'],
  ['ภ', 'ภอ สำเภา', 'por sǎm-pao', 'Dschunke', 'low', 'p', 'p', '⛵', 'Selten. Wie ถ mit Schwänzchen unten.'],
  ['ม', 'มอ ม้า', 'mor máa', 'Pferd', 'low', 'm', 'm', '🐎', ''],
  ['ย', 'ยอ ยักษ์', 'yor yák', 'Riese', 'low', 'y', 'i', '👹', 'Am Silbenende Teil eines Vokals (z.B. -ai).'],
  ['ร', 'รอ เรือ', 'ror ruea', 'Boot', 'low', 'r', 'n', '🚣', 'Gerolltes r – im Alltag oft wie l. Als Auslaut wie n.'],
  ['ล', 'ลอ ลิง', 'lor ling', 'Affe', 'low', 'l', 'n', '🐒', 'Als Auslaut wie n.'],
  ['ว', 'วอ แหวน', 'wor wǎen', 'Ring', 'low', 'w', 'o', '💍', 'Englisches w. Am Silbenende Teil eines Vokals (-ao, -iu).'],
  ['ศ', 'ศอ ศาลา', 'sǒr sǎa-laa', 'Pavillon', 'high', 's', 't', '⛩️', 'Seltener s-Laut der hohen Klasse.'],
  ['ษ', 'ษอ ฤๅษี', 'sǒr rue-sǐi', 'Einsiedler', 'high', 's', 't', '🧙', 'Seltener s-Laut der hohen Klasse.'],
  ['ส', 'สอ เสือ', 'sǒr sǔea', 'Tiger', 'high', 's', 't', '🐅', 'Häufigster s-Laut der hohen Klasse.'],
  ['ห', 'หอ หีบ', 'hǒr hìip', 'Truhe', 'high', 'h', '–', '📦', 'Auch stummes „Vorzeichen“, das Tiefklasse-Konsonanten zur hohen Klasse macht (หมา).'],
  ['ฬ', 'ฬอ จุฬา', 'lor jù-laa', 'Sterndrachen', 'low', 'l', 'n', '🪁', 'Selten.'],
  ['อ', 'ออ อ่าง', 'or àang', 'Wanne', 'mid', '(stumm)', '–', '🛁', 'Stummer Träger für Vokale am Silbenanfang; auch Vokal „o“.'],
  ['ฮ', 'ฮอ นกฮูก', 'hor nók-hûuk', 'Eule', 'low', 'h', '–', '🦉', 'h der tiefen Klasse.'],
]

const cid = (ch: string) => 'c-' + CONSONANTS.findIndex((c) => c[0] === ch)

const consonantItems: Item[] = CONSONANTS.map(([th, name, nameRom, nameDe, cls, initial, final, emoji, note], i) => ({
  id: 'c-' + i,
  th,
  kind: 'consonant',
  rom: nameRom.split(' ')[0],
  de: `${initial} – ${nameDe}`,
  name,
  nameRom,
  nameDe,
  cls,
  initial,
  final,
  emoji,
  note: note || undefined,
  say: name,
  draw: th,
}))

// [Form mit Platzhalter, Laut, Länge, Sprechname, darstellbares Zeichen zum Zeichnen?, Notiz?]
type V = [string, string, 'short' | 'long', string, string?, string?]
const VOWELS: V[] = [
  ['–ะ', 'a', 'short', 'สระอะ', 'ะ', 'In geschlossenen Silben wird ะ zu ั (z.B. กัน).'],
  ['–า', 'aa', 'long', 'สระอา', 'า', 'Langes a wie in „Vater“.'],
  ['–ิ', 'i', 'short', 'สระอิ', undefined, 'Steht über dem Konsonanten.'],
  ['–ี', 'ii', 'long', 'สระอี', undefined, 'Wie –ิ mit Strich – langes i.'],
  ['–ึ', 'ue', 'short', 'สระอึ', undefined, 'Ungerundetes ü – Lippen breit, Zunge hinten.'],
  ['–ือ', 'uue', 'long', 'สระอือ', undefined, 'Langes ue. Ohne Endkonsonant mit อ geschrieben.'],
  ['–ุ', 'u', 'short', 'สระอุ', undefined, 'Steht unter dem Konsonanten.'],
  ['–ู', 'uu', 'long', 'สระอู', undefined, 'Langes u, steht unter dem Konsonanten.'],
  ['เ–ะ', 'e', 'short', 'สระเอะ', undefined, 'เ wird VOR dem Konsonanten geschrieben, aber danach gesprochen!'],
  ['เ–', 'ee', 'long', 'สระเอ', 'เ', 'Langes e wie in „See“. Vor dem Konsonanten geschrieben.'],
  ['แ–ะ', 'ae', 'short', 'สระแอะ', undefined, 'Offenes ä, kurz.'],
  ['แ–', 'aae', 'long', 'สระแอ', 'แ', 'Langes, offenes ä wie in „Bär“.'],
  ['โ–ะ', 'o', 'short', 'สระโอะ', undefined, 'In geschlossenen Silben unsichtbar (z.B. คน = kon).'],
  ['โ–', 'oo', 'long', 'สระโอ', 'โ', 'Langes geschlossenes o wie in „Boot“.'],
  ['เ–าะ', 'or', 'short', 'สระเอาะ', undefined, 'Kurzes offenes o wie in „Gott“.'],
  ['–อ', 'or', 'long', 'สระออ', undefined, 'Langes offenes o wie in englisch „law“.'],
  ['เ–อะ', 'er', 'short', 'สระเออะ', undefined, 'Kurzes ö-artiges „ə“.'],
  ['เ–อ', 'er', 'long', 'สระเออ', undefined, 'Langes „ə“, wie englisch „her“ ohne r.'],
  ['เ–ียะ', 'ia', 'short', 'สระเอียะ', undefined, 'Selten.'],
  ['เ–ีย', 'iia', 'long', 'สระเอีย', undefined, 'Wie „ia“ in „Maria“. Beispiel: เบียร์ (Bier).'],
  ['เ–ือะ', 'uea', 'short', 'สระเอือะ', undefined, 'Sehr selten.'],
  ['เ–ือ', 'uea', 'long', 'สระเอือ', undefined, 'ue + a. Beispiel: เสือ (Tiger).'],
  ['–ัวะ', 'ua', 'short', 'สระอัวะ', undefined, 'Selten.'],
  ['–ัว', 'uua', 'long', 'สระอัว', undefined, 'Wie „ua“. Beispiel: ตัว (Körper).'],
  ['–ำ', 'am', 'short', 'สระอำ', 'ำ', 'Kurzes a + m. Beispiel: น้ำ (Wasser).'],
  ['ใ–', 'ai', 'short', 'สระใอ ไม้ม้วน', 'ใ', '„Mai muan“ – nur in 20 Wörtern, z.B. ใช่, ใหม่, ใจ.'],
  ['ไ–', 'ai', 'short', 'สระไอ ไม้มลาย', 'ไ', '„Mai malai“ – die normale Schreibung für ai.'],
  ['เ–า', 'ao', 'short', 'สระเอา', undefined, 'Wie „au“ in „Haus“. Beispiel: เรา (wir).'],
  ['ฤ', 'rue', 'short', 'ตัวรึ', 'ฤ', 'Sanskrit-Vokal, z.B. in อังกฤษ (England).'],
]

const vowelItems: Item[] = VOWELS.map(([form, sound, length, say, draw, note], i) => ({
  id: 'v-' + i,
  th: form.replace(/–/g, 'อ'), // อ als Trägerkonsonant
  kind: 'vowel',
  rom: sound,
  de: `${sound} (${length === 'long' ? 'lang' : 'kurz'})`,
  form,
  length,
  say,
  draw,
  note,
}))
const vid = (form: string) => 'v-' + VOWELS.findIndex((v) => v[0] === form)

const toneItems: Item[] = [
  { id: 't-ek', th: 'อ่', kind: 'tone', rom: 'mái èek', de: 'Mai Ek (1. Tonzeichen)', name: 'ไม้เอก', say: 'ไม้เอก', note: 'Mittel-/Hochklasse → tiefer Ton; Tiefklasse → fallender Ton.' },
  { id: 't-tho', th: 'อ้', kind: 'tone', rom: 'mái toh', de: 'Mai Tho (2. Tonzeichen)', name: 'ไม้โท', say: 'ไม้โท', note: 'Mittel-/Hochklasse → fallender Ton; Tiefklasse → hoher Ton.' },
  { id: 't-tri', th: 'อ๊', kind: 'tone', rom: 'mái dtree', de: 'Mai Tri (3. Tonzeichen)', name: 'ไม้ตรี', say: 'ไม้ตรี', note: 'Nur mit Mittelklasse → hoher Ton.' },
  { id: 't-jat', th: 'อ๋', kind: 'tone', rom: 'mái jàt-dtà-waa', de: 'Mai Chattawa (4. Tonzeichen)', name: 'ไม้จัตวา', say: 'ไม้จัตวา', note: 'Nur mit Mittelklasse → steigender Ton.' },
]

const toneWords: Item[] = [
  { id: 'tw-maa', th: 'มา', kind: 'word', rom: 'maa', de: 'kommen', emoji: '👋', note: 'Mittlerer Ton – flach.' },
  { id: 'tw-horse', th: 'ม้า', kind: 'word', rom: 'máa', de: 'Pferd', emoji: '🐎', note: 'Hoher Ton – Tiefklasse + ไม้โท.' },
  { id: 'tw-dog', th: 'หมา', kind: 'word', rom: 'mǎa', de: 'Hund', emoji: '🐕', note: 'Steigender Ton – das stumme ห macht ม zur hohen Klasse.' },
  { id: 'tw-wood', th: 'ไม้', kind: 'word', rom: 'máai', de: 'Holz', emoji: '🪵' },
  { id: 'tw-new', th: 'ใหม่', kind: 'word', rom: 'mài', de: 'neu', alt: ['neue', 'neuer'], emoji: '✨', note: 'Tiefer Ton.' },
  { id: 'tw-not', th: 'ไม่', kind: 'word', rom: 'mâi', de: 'nicht', alt: ['nein', 'kein'], emoji: '🚫', note: 'Fallender Ton.' },
  { id: 'tw-burn', th: 'ไหม้', kind: 'word', rom: 'mâi', de: 'brennen', alt: ['verbrennen', 'verbrannt'], emoji: '🔥', note: 'Klingt genau wie ไม่!' },
  { id: 'tw-q', th: 'ไหม', kind: 'word', rom: 'mǎi', de: 'Fragepartikel (ja/nein)', alt: ['Fragepartikel', 'oder', 'Seide'], emoji: '❓', note: 'Ans Satzende gestellt macht es eine Ja/Nein-Frage.' },
]

const firstWords: Item[] = [
  { id: 'fw-good', th: 'ดี', kind: 'word', rom: 'dee', de: 'gut', emoji: '👍', note: 'ด + –ี' },
  { id: 'fw-eye', th: 'ตา', kind: 'word', rom: 'dtaa', de: 'Auge', emoji: '👁️', note: 'ต + –า' },
  { id: 'fw-crab', th: 'ปู', kind: 'word', rom: 'bpoo', de: 'Krabbe', emoji: '🦀', note: 'ป + –ู' },
  { id: 'fw-snake', th: 'งู', kind: 'word', rom: 'ngoo', de: 'Schlange', emoji: '🐍', note: 'ง + –ู' },
  { id: 'fw-fish', th: 'ปลา', kind: 'word', rom: 'bplaa', de: 'Fisch', emoji: '🐟', note: 'Konsonantencluster ปล + –า' },
  { id: 'fw-chicken', th: 'ไก่', kind: 'word', rom: 'gài', de: 'Huhn', emoji: '🐔', note: 'ไ– + ก + Mai Ek → tiefer Ton.' },
  { id: 'fw-egg', th: 'ไข่', kind: 'word', rom: 'kài', de: 'Ei', emoji: '🥚' },
  { id: 'fw-tiger', th: 'เสือ', kind: 'word', rom: 'sǔea', de: 'Tiger', emoji: '🐅', note: 'เ–ือ um ส: steigender Ton (hohe Klasse, lebende Silbe).' },
  { id: 'fw-water', th: 'น้ำ', kind: 'word', rom: 'náam', de: 'Wasser', emoji: '💧', note: 'Wird lang gesprochen, obwohl –ำ eigentlich kurz ist.' },
  { id: 'fw-boat', th: 'เรือ', kind: 'word', rom: 'ruea', de: 'Boot', emoji: '🚣' },
]

export const letterItems: Item[] = [...consonantItems, ...vowelItems, ...toneItems, ...toneWords, ...firstWords]

const L = (chars: string) => [...chars].map(cid)

export const letterChapters: Chapter[] = [
  {
    id: 'k1',
    title: 'Konsonanten',
    subtitle: 'Die 44 Konsonanten – Klang, Name und Schreiben',
    icon: 'ก',
    color: '#ff6b4a',
    lessons: [
      { id: 'k1-l1', title: 'Mittelklasse', subtitle: 'ก จ ด ต บ ป อ', icon: '🐔', type: 'letters', items: L('กจดตบปอ'), grammar: 'g-tones' },
      { id: 'k1-l2', title: 'Tiefklasse I', subtitle: 'ค ง ช ซ ท น', icon: '🐘', type: 'letters', items: L('คงชซทน') },
      { id: 'k1-l3', title: 'Tiefklasse II', subtitle: 'พ ฟ ม ย ร ล ว', icon: '🐎', type: 'letters', items: L('พฟมยรลว') },
      { id: 'k1-l4', title: 'Hohe Klasse', subtitle: 'ข ฉ ถ ผ ฝ ส ห', icon: '🐅', type: 'letters', items: L('ขฉถผฝสห') },
      { id: 'k1-l5', title: 'Seltene I', subtitle: 'ฆ ญ ฐ ฑ ฒ ณ ธ ฌ', icon: '🔔', type: 'letters', items: L('ฆญฐฑฒณธฌ') },
      { id: 'k1-l6', title: 'Seltene II', subtitle: 'ภ ศ ษ ฬ ฮ ฎ ฏ ฃ ฅ', icon: '🦉', type: 'letters', items: L('ภศษฬฮฎฏฃฅ') },
    ],
  },
  {
    id: 'k1v',
    title: 'Vokale & Töne',
    subtitle: 'Vokalzeichen, Tonzeichen und erste Wörter',
    icon: 'า',
    color: '#ff9f1c',
    lessons: [
      { id: 'k1v-l1', title: 'Einfache Vokale', subtitle: 'a aa i ii u uu', icon: '🅰️', type: 'letters', items: ['–ะ', '–า', '–ิ', '–ี', '–ุ', '–ู'].map(vid) },
      { id: 'k1v-l2', title: 'Vokale davor', subtitle: 'เ แ โ und –อ –ึ –ื', icon: '⬅️', type: 'letters', items: ['เ–', 'แ–', 'โ–', '–อ', '–ึ', '–ือ'].map(vid) },
      { id: 'k1v-l3', title: 'Diphthonge', subtitle: 'ไ ใ ำ เา ัว เีย เือ', icon: '🎵', type: 'letters', items: ['ไ–', 'ใ–', '–ำ', 'เ–า', '–ัว', 'เ–ีย', 'เ–ือ'].map(vid) },
      { id: 'k1v-l4', title: 'Kurze Formen', subtitle: 'เ–ะ แ–ะ โ–ะ เ–าะ …', icon: '⚡', type: 'letters', items: ['เ–ะ', 'แ–ะ', 'โ–ะ', 'เ–าะ', 'เ–อะ', 'เ–อ', 'ฤ'].map(vid) },
      { id: 'k1v-l5', title: 'Seltene Vokale', subtitle: 'เ–ียะ เ–ือะ –ัวะ', icon: '🔍', type: 'letters', items: ['เ–ียะ', 'เ–ือะ', '–ัวะ'].map(vid) },
      { id: 'k1v-l6', title: 'Tonzeichen', subtitle: '่ ้ ๊ ๋', icon: '🎶', type: 'letters', items: toneItems.map((t) => t.id), grammar: 'g-tones' },
      { id: 'k1v-l7', title: 'Töne hören', subtitle: 'มา ม้า หมา · ไม้ ใหม่ ไม่', icon: '👂', type: 'vocab', items: toneWords.map((t) => t.id), grammar: 'g-tones' },
      { id: 'k1v-l8', title: 'Erste Wörter lesen', subtitle: 'ดี ตา ปู ปลา ไก่ …', icon: '📖', type: 'vocab', items: firstWords.map((t) => t.id) },
    ],
  },
]
