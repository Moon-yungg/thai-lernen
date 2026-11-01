// Kapitel „Töne hören“: Minimalpaare/-gruppen für das Ton-Hörtraining.
// Umschrift nach dem Schema in types.ts – die Tonzeichen in rom sind die GESPROCHENEN Töne.
// Alle Wörter wurden mit PyThaiNLP (tone_detector) gegen die Schreibregel geprüft.
import type { Chapter, Item, ToneSet } from './types'

type W = { id: string; th: string; rom: string; de: string; emoji?: string; note: string }

const sets: { id: string; words: W[] }[] = [
  {
    id: 'ts-set-maa',
    words: [
      { id: 'ts-maa', th: 'มา', rom: 'maa', de: 'kommen', note: 'ม = Tiefklasse, lebende Silbe ohne Tonzeichen → mittel.' },
      { id: 'ts-maa-h', th: 'ม้า', rom: 'máa', de: 'Pferd', emoji: '🐎', note: 'ม = Tiefklasse + mái toh (้) → hoch.' },
      { id: 'ts-maa-r', th: 'หมา', rom: 'mǎa', de: 'Hund', emoji: '🐕', note: 'stummes ห macht ม zur Hochklasse, lebende Silbe ohne Tonzeichen → steigend.' },
    ],
  },
  {
    id: 'ts-set-naa',
    words: [
      { id: 'ts-naa', th: 'นา', rom: 'naa', de: 'Reisfeld', emoji: '🌾', note: 'น = Tiefklasse, lebende Silbe ohne Tonzeichen → mittel.' },
      { id: 'ts-naa-f', th: 'หน้า', rom: 'nâa', de: 'Gesicht; vorne', note: 'stummes ห macht น zur Hochklasse + mái toh (้) → fallend.' },
      { id: 'ts-naa-h', th: 'น้า', rom: 'náa', de: 'Onkel/Tante (jüngere Geschwister der Mutter)', note: 'น = Tiefklasse + mái toh (้) → hoch.' },
      { id: 'ts-naa-r', th: 'หนา', rom: 'nǎa', de: 'dick (Buch, Stoff)', note: 'stummes ห macht น zur Hochklasse, lebende Silbe ohne Tonzeichen → steigend.' },
    ],
  },
  {
    id: 'ts-set-mor',
    words: [
      { id: 'ts-mor-r', th: 'หมอ', rom: 'mǒr', de: 'Arzt', emoji: '🧑‍⚕️', note: 'stummes ห macht ม zur Hochklasse, lebende Silbe ohne Tonzeichen → steigend.' },
      { id: 'ts-mor-f', th: 'หม้อ', rom: 'môr', de: 'Topf', emoji: '🍲', note: 'stummes ห macht ม zur Hochklasse + mái toh (้) → fallend.' },
    ],
  },
  {
    id: 'ts-set-norn',
    words: [
      { id: 'ts-norn', th: 'นอน', rom: 'norn', de: 'schlafen', emoji: '😴', note: 'น = Tiefklasse, lebende Silbe ohne Tonzeichen → mittel.' },
      { id: 'ts-norn-r', th: 'หนอน', rom: 'nǒrn', de: 'Wurm, Raupe', emoji: '🐛', note: 'stummes ห macht น zur Hochklasse, lebende Silbe ohne Tonzeichen → steigend.' },
    ],
  },
  {
    id: 'ts-set-nong',
    words: [
      { id: 'ts-nong-h', th: 'น้อง', rom: 'nórng', de: 'jüngeres Geschwister', note: 'น = Tiefklasse + mái toh (้) → hoch.' },
      { id: 'ts-nong-r', th: 'หนอง', rom: 'nǒrng', de: 'Teich, Sumpf', note: 'stummes ห macht น zur Hochklasse, lebende Silbe ohne Tonzeichen → steigend.' },
    ],
  },
  {
    id: 'ts-set-noi',
    words: [
      { id: 'ts-noi-l', th: 'หน่อย', rom: 'nòi', de: 'ein bisschen (Bitte abmildern)', note: 'stummes ห macht น zur Hochklasse + mái èk (่) → tief.' },
      { id: 'ts-noi-h', th: 'น้อย', rom: 'nói', de: 'wenig', note: 'น = Tiefklasse + mái toh (้) → hoch.' },
    ],
  },
  {
    id: 'ts-set-kaao',
    words: [
      { id: 'ts-kaao-r', th: 'ขาว', rom: 'kǎao', de: 'weiß', emoji: '⚪', note: 'ข = Hochklasse, lebende Silbe ohne Tonzeichen → steigend.' },
      { id: 'ts-kaao-l', th: 'ข่าว', rom: 'kàao', de: 'Nachrichten', emoji: '📰', note: 'ข = Hochklasse + mái èk (่) → tief.' },
      { id: 'ts-kaao-f', th: 'ข้าว', rom: 'kâao', de: 'Reis', emoji: '🍚', note: 'ข = Hochklasse + mái toh (้) → fallend.' },
    ],
  },
  {
    id: 'ts-set-suea',
    words: [
      { id: 'ts-suea-r', th: 'เสือ', rom: 'sǔea', de: 'Tiger', emoji: '🐅', note: 'ส = Hochklasse, lebende Silbe ohne Tonzeichen → steigend.' },
      { id: 'ts-suea-l', th: 'เสื่อ', rom: 'sùea', de: 'Matte (zum Sitzen)', note: 'ส = Hochklasse + mái èk (่) → tief.' },
      { id: 'ts-suea-f', th: 'เสื้อ', rom: 'sûea', de: 'Hemd, Oberteil', emoji: '👕', note: 'ส = Hochklasse + mái toh (้) → fallend.' },
    ],
  },
  {
    id: 'ts-set-bpaa',
    words: [
      { id: 'ts-bpaa', th: 'ปา', rom: 'bpaa', de: 'werfen', note: 'ป = Mittelklasse, lebende Silbe ohne Tonzeichen → mittel.' },
      { id: 'ts-bpaa-l', th: 'ป่า', rom: 'bpàa', de: 'Wald', emoji: '🌳', note: 'ป = Mittelklasse + mái èk (่) → tief.' },
      { id: 'ts-bpaa-f', th: 'ป้า', rom: 'bpâa', de: 'Tante (ältere Schwester der Eltern)', emoji: '👵', note: 'ป = Mittelklasse + mái toh (้) → fallend.' },
    ],
  },
  {
    id: 'ts-set-gao',
    words: [
      { id: 'ts-gao', th: 'เกา', rom: 'gao', de: 'kratzen', note: 'ก = Mittelklasse, lebende Silbe ohne Tonzeichen → mittel.' },
      { id: 'ts-gao-l', th: 'เก่า', rom: 'gào', de: 'alt (Dinge)', note: 'ก = Mittelklasse + mái èk (่) → tief.' },
      { id: 'ts-gao-f', th: 'เก้า', rom: 'gâo', de: 'neun', emoji: '9️⃣', note: 'ก = Mittelklasse + mái toh (้) → fallend.' },
    ],
  },
  {
    id: 'ts-set-bpuu',
    words: [
      { id: 'ts-bpuu', th: 'ปู', rom: 'bpoo', de: 'Krabbe', emoji: '🦀', note: 'ป = Mittelklasse, lebende Silbe ohne Tonzeichen → mittel.' },
      { id: 'ts-bpuu-l', th: 'ปู่', rom: 'bpòo', de: 'Opa (Vater des Vaters)', emoji: '👴', note: 'ป = Mittelklasse + mái èk (่) → tief.' },
    ],
  },
  {
    id: 'ts-set-mai',
    words: [
      { id: 'ts-mai-h', th: 'ไม้', rom: 'máai', de: 'Holz', emoji: '🪵', note: 'ม = Tiefklasse + mái toh (้) → hoch.' },
      { id: 'ts-mai-l', th: 'ใหม่', rom: 'mài', de: 'neu', emoji: '🆕', note: 'stummes ห macht ม zur Hochklasse + mái èk (่) → tief.' },
      { id: 'ts-mai-f', th: 'ไม่', rom: 'mâi', de: 'nicht', emoji: '🚫', note: 'ม = Tiefklasse + mái èk (่) → fallend.' },
      { id: 'ts-mai-r', th: 'ไหม', rom: 'mǎi', de: 'Fragepartikel (ja/nein)', emoji: '❓', note: 'stummes ห macht ม zur Hochklasse, lebende Silbe ohne Tonzeichen → steigend.' },
    ],
  },
  {
    id: 'ts-set-glai',
    words: [
      { id: 'ts-glai', th: 'ไกล', rom: 'glai', de: 'weit (entfernt)', note: 'ก = Mittelklasse, lebende Silbe ohne Tonzeichen → mittel.' },
      { id: 'ts-glai-f', th: 'ใกล้', rom: 'glâi', de: 'nah', note: 'ก = Mittelklasse + mái toh (้) → fallend.' },
    ],
  },
  {
    id: 'ts-set-nai',
    words: [
      { id: 'ts-nai', th: 'ใน', rom: 'nai', de: 'in', note: 'น = Tiefklasse, lebende Silbe ohne Tonzeichen → mittel.' },
      { id: 'ts-nai-r', th: 'ไหน', rom: 'nǎi', de: 'wo, welche(r)', note: 'stummes ห macht น zur Hochklasse, lebende Silbe ohne Tonzeichen → steigend.' },
    ],
  },
  {
    id: 'ts-set-kaa',
    words: [
      { id: 'ts-kaa', th: 'คา', rom: 'kaa', de: 'stecken bleiben', note: 'ค = Tiefklasse, lebende Silbe ohne Tonzeichen → mittel.' },
      { id: 'ts-kaa-l', th: 'ข่า', rom: 'kàa', de: 'Galgant', note: 'ข = Hochklasse + mái èk (่) → tief.' },
      { id: 'ts-kaa-f', th: 'ค่า', rom: 'kâa', de: 'Wert, Gebühr', note: 'ค = Tiefklasse + mái èk (่) → fallend.' },
      { id: 'ts-kaa-h', th: 'ค้า', rom: 'káa', de: 'handeln (Handel treiben)', note: 'ค = Tiefklasse + mái toh (้) → hoch.' },
      { id: 'ts-kaa-r', th: 'ขา', rom: 'kǎa', de: 'Bein', emoji: '🦵', note: 'ข = Hochklasse, lebende Silbe ohne Tonzeichen → steigend.' },
    ],
  },
  {
    id: 'ts-set-kao',
    words: [
      { id: 'ts-kao-r', th: 'เขา', rom: 'kǎo', de: 'er, sie; Berg', note: 'ข = Hochklasse, lebende Silbe ohne Tonzeichen → steigend.' },
      { id: 'ts-kao-l', th: 'เข่า', rom: 'kào', de: 'Knie', note: 'ข = Hochklasse + mái èk (่) → tief.' },
      { id: 'ts-kao-f', th: 'เข้า', rom: 'kâo', de: 'hineingehen', note: 'ข = Hochklasse + mái toh (้) → fallend.' },
    ],
  },
  {
    id: 'ts-set-yaa',
    words: [
      { id: 'ts-yaa', th: 'ยา', rom: 'yaa', de: 'Medizin', emoji: '💊', note: 'ย = Tiefklasse, lebende Silbe ohne Tonzeichen → mittel.' },
      { id: 'ts-yaa-l', th: 'อย่า', rom: 'yàa', de: 'nicht! (Verbot)', emoji: '⛔', note: 'อ vor ย macht die Silbe zur Mittelklasse + mái èk (่) → tief.' },
      { id: 'ts-yaa-f', th: 'ย่า', rom: 'yâa', de: 'Oma (Mutter des Vaters)', emoji: '👵', note: 'ย = Tiefklasse + mái èk (่) → fallend.' },
    ],
  },
  {
    id: 'ts-set-haa',
    words: [
      { id: 'ts-haa-r', th: 'หา', rom: 'hǎa', de: 'suchen; besuchen', emoji: '🔍', note: 'ห = Hochklasse, lebende Silbe ohne Tonzeichen → steigend.' },
      { id: 'ts-haa-f', th: 'ห้า', rom: 'hâa', de: 'fünf', emoji: '5️⃣', note: 'ห = Hochklasse + mái toh (้) → fallend.' },
    ],
  },
  {
    id: 'ts-set-kai',
    words: [
      { id: 'ts-kai-r', th: 'ไข', rom: 'kǎi', de: 'aufschließen (Schloss)', emoji: '🔑', note: 'ข = Hochklasse, lebende Silbe ohne Tonzeichen → steigend.' },
      { id: 'ts-kai-l', th: 'ไข่', rom: 'kài', de: 'Ei', emoji: '🥚', note: 'ข = Hochklasse + mái èk (่) → tief.' },
      { id: 'ts-kai-f', th: 'ไข้', rom: 'kâi', de: 'Fieber', emoji: '🤒', note: 'ข = Hochklasse + mái toh (้) → fallend.' },
    ],
  },
  {
    id: 'ts-set-kon',
    words: [
      { id: 'ts-kon', th: 'คน', rom: 'kon', de: 'Mensch', emoji: '🧍', note: 'ค = Tiefklasse, lebende Silbe ohne Tonzeichen → mittel.' },
      { id: 'ts-kon-f', th: 'ข้น', rom: 'kôn', de: 'dickflüssig', note: 'ข = Hochklasse + mái toh (้) → fallend.' },
      { id: 'ts-kon-h', th: 'ค้น', rom: 'kón', de: 'durchsuchen', note: 'ค = Tiefklasse + mái toh (้) → hoch.' },
      { id: 'ts-kon-r', th: 'ขน', rom: 'kǒn', de: 'Haar (Körper), Fell', note: 'ข = Hochklasse, lebende Silbe ohne Tonzeichen → steigend.' },
    ],
  },
  {
    id: 'ts-set-wai',
    words: [
      { id: 'ts-wai', th: 'ไว', rom: 'wai', de: 'schnell, flink', note: 'ว = Tiefklasse, lebende Silbe ohne Tonzeichen → mittel.' },
      { id: 'ts-wai-h', th: 'ไว้', rom: 'wái', de: 'aufbewahren, (hin)legen', note: 'ว = Tiefklasse + mái toh (้) → hoch.' },
      { id: 'ts-wai-r', th: 'ไหว', rom: 'wǎi', de: 'es schaffen, aushalten', note: 'stummes ห macht ว zur Hochklasse, lebende Silbe ohne Tonzeichen → steigend.' },
    ],
  },
  {
    id: 'ts-set-laa',
    words: [
      { id: 'ts-laa', th: 'ลา', rom: 'laa', de: 'Esel; sich verabschieden', emoji: '🫏', note: 'ล = Tiefklasse, lebende Silbe ohne Tonzeichen → mittel.' },
      { id: 'ts-laa-f', th: 'ล่า', rom: 'lâa', de: 'jagen', note: 'ล = Tiefklasse + mái èk (่) → fallend.' },
      { id: 'ts-laa-h', th: 'ล้า', rom: 'láa', de: 'erschöpft', note: 'ล = Tiefklasse + mái toh (้) → hoch.' },
    ],
  },
  {
    id: 'ts-set-lai',
    words: [
      { id: 'ts-lai-r', th: 'ไหล', rom: 'lǎi', de: 'fließen', note: 'stummes ห macht ล zur Hochklasse, lebende Silbe ohne Tonzeichen → steigend.' },
      { id: 'ts-lai-l', th: 'ไหล่', rom: 'lài', de: 'Schulter', note: 'stummes ห macht ล zur Hochklasse + mái èk (่) → tief.' },
      { id: 'ts-lai-f', th: 'ไล่', rom: 'lâi', de: 'verjagen', note: 'ล = Tiefklasse + mái èk (่) → fallend.' },
    ],
  },
  {
    id: 'ts-set-laan',
    words: [
      { id: 'ts-laan', th: 'ลาน', rom: 'laan', de: 'Platz, Hof', note: 'ล = Tiefklasse, lebende Silbe ohne Tonzeichen → mittel.' },
      { id: 'ts-laan-h', th: 'ล้าน', rom: 'láan', de: 'Million', note: 'ล = Tiefklasse + mái toh (้) → hoch.' },
      { id: 'ts-laan-r', th: 'หลาน', rom: 'lǎan', de: 'Enkel; Neffe/Nichte', note: 'stummes ห macht ล zur Hochklasse, lebende Silbe ohne Tonzeichen → steigend.' },
    ],
  },
  {
    id: 'ts-set-roi',
    words: [
      { id: 'ts-roi', th: 'รอย', rom: 'roi', de: 'Spur, Abdruck', emoji: '👣', note: 'ร = Tiefklasse, lebende Silbe ohne Tonzeichen → mittel.' },
      { id: 'ts-roi-h', th: 'ร้อย', rom: 'rói', de: 'hundert', emoji: '💯', note: 'ร = Tiefklasse + mái toh (้) → hoch.' },
    ],
  },
  {
    id: 'ts-set-roo',
    words: [
      { id: 'ts-roo', th: 'รู', rom: 'roo', de: 'Loch', emoji: '🕳️', note: 'ร = Tiefklasse, lebende Silbe ohne Tonzeichen → mittel.' },
      { id: 'ts-roo-h', th: 'รู้', rom: 'róo', de: 'wissen', emoji: '💡', note: 'ร = Tiefklasse + mái toh (้) → hoch.' },
    ],
  },
  {
    id: 'ts-set-kaang',
    words: [
      { id: 'ts-kaang', th: 'คาง', rom: 'kaang', de: 'Kinn', note: 'ค = Tiefklasse, lebende Silbe ohne Tonzeichen → mittel.' },
      { id: 'ts-kaang-f', th: 'ข้าง', rom: 'kâang', de: 'Seite, neben', note: 'ข = Hochklasse + mái toh (้) → fallend.' },
      { id: 'ts-kaang-h', th: 'ค้าง', rom: 'káang', de: 'übernachten; hängen bleiben', note: 'ค = Tiefklasse + mái toh (้) → hoch.' },
    ],
  },
  {
    id: 'ts-set-haang',
    words: [
      { id: 'ts-haang-r', th: 'หาง', rom: 'hǎang', de: 'Schwanz', note: 'ห = Hochklasse, lebende Silbe ohne Tonzeichen → steigend.' },
      { id: 'ts-haang-l', th: 'ห่าง', rom: 'hàang', de: 'entfernt, weit weg', note: 'ห = Hochklasse + mái èk (่) → tief.' },
      { id: 'ts-haang-f', th: 'ห้าง', rom: 'hâang', de: 'Kaufhaus', emoji: '🏬', note: 'ห = Hochklasse + mái toh (้) → fallend.' },
    ],
  },
  {
    id: 'ts-set-kaai',
    words: [
      { id: 'ts-kaai-r', th: 'ขาย', rom: 'kǎai', de: 'verkaufen', note: 'ข = Hochklasse, lebende Silbe ohne Tonzeichen → steigend.' },
      { id: 'ts-kaai-f', th: 'ค่าย', rom: 'kâai', de: 'Lager, Camp', emoji: '⛺', note: 'ค = Tiefklasse + mái èk (่) → fallend.' },
    ],
  },
  {
    id: 'ts-set-saai',
    words: [
      { id: 'ts-saai', th: 'ทราย', rom: 'saai', de: 'Sand', emoji: '🏖️', note: 'ท = Tiefklasse, lebende Silbe ohne Tonzeichen → mittel. ทร wird wie s gesprochen; ท ist Tiefklasse.' },
      { id: 'ts-saai-l', th: 'ส่าย', rom: 'sàai', de: 'schütteln (Kopf)', note: 'ส = Hochklasse + mái èk (่) → tief.' },
      { id: 'ts-saai-h', th: 'ซ้าย', rom: 'sáai', de: 'links', emoji: '⬅️', note: 'ซ = Tiefklasse + mái toh (้) → hoch.' },
      { id: 'ts-saai-r', th: 'สาย', rom: 'sǎai', de: 'spät (am Vormittag); Linie', note: 'ส = Hochklasse, lebende Silbe ohne Tonzeichen → steigend.' },
    ],
  },
  {
    id: 'ts-set-kwaa',
    words: [
      { id: 'ts-kwaa-h', th: 'คว้า', rom: 'kwáa', de: 'greifen, schnappen', note: 'ค = Tiefklasse + mái toh (้) → hoch.' },
      { id: 'ts-kwaa-r', th: 'ขวา', rom: 'kwǎa', de: 'rechts', emoji: '➡️', note: 'ข = Hochklasse, lebende Silbe ohne Tonzeichen → steigend.' },
    ],
  },
  {
    id: 'ts-set-sii',
    words: [
      { id: 'ts-sii-r', th: 'สี', rom: 'sěe', de: 'Farbe', emoji: '🎨', note: 'ส = Hochklasse, lebende Silbe ohne Tonzeichen → steigend.' },
      { id: 'ts-sii-l', th: 'สี่', rom: 'sèe', de: 'vier', emoji: '4️⃣', note: 'ส = Hochklasse + mái èk (่) → tief.' },
    ],
  },
  {
    id: 'ts-set-song',
    words: [
      { id: 'ts-song-r', th: 'สอง', rom: 'sǒrng', de: 'zwei', emoji: '2️⃣', note: 'ส = Hochklasse, lebende Silbe ohne Tonzeichen → steigend.' },
      { id: 'ts-song-l', th: 'ส่อง', rom: 'sòrng', de: 'leuchten, (an)strahlen', emoji: '🔦', note: 'ส = Hochklasse + mái èk (่) → tief.' },
    ],
  },
  {
    id: 'ts-set-pii',
    words: [
      { id: 'ts-pii-r', th: 'ผี', rom: 'pěe', de: 'Geist, Gespenst', emoji: '👻', note: 'ผ = Hochklasse, lebende Silbe ohne Tonzeichen → steigend.' },
      { id: 'ts-pii-f', th: 'พี่', rom: 'pêe', de: 'älteres Geschwister', note: 'พ = Tiefklasse + mái èk (่) → fallend.' },
    ],
  },
  {
    id: 'ts-set-tii',
    words: [
      { id: 'ts-tii', th: 'ที', rom: 'tee', de: 'Mal (einmal, zweimal)', note: 'ท = Tiefklasse, lebende Silbe ohne Tonzeichen → mittel.' },
      { id: 'ts-tii-l', th: 'ถี่', rom: 'tèe', de: 'dicht, häufig', note: 'ถ = Hochklasse + mái èk (่) → tief.' },
      { id: 'ts-tii-f', th: 'ที่', rom: 'têe', de: 'Ort; bei, in', emoji: '📍', note: 'ท = Tiefklasse + mái èk (่) → fallend.' },
    ],
  },
  {
    id: 'ts-set-chai',
    words: [
      { id: 'ts-chai-f', th: 'ใช่', rom: 'châi', de: 'ja, richtig', emoji: '✅', note: 'ช = Tiefklasse + mái èk (่) → fallend.' },
      { id: 'ts-chai-h', th: 'ใช้', rom: 'chái', de: 'benutzen', note: 'ช = Tiefklasse + mái toh (้) → hoch.' },
    ],
  },
  {
    id: 'ts-set-chaa',
    words: [
      { id: 'ts-chaa', th: 'ชา', rom: 'chaa', de: 'Tee', emoji: '🍵', note: 'ช = Tiefklasse, lebende Silbe ohne Tonzeichen → mittel.' },
      { id: 'ts-chaa-h', th: 'ช้า', rom: 'cháa', de: 'langsam', emoji: '🐢', note: 'ช = Tiefklasse + mái toh (้) → hoch.' },
    ],
  },
  {
    id: 'ts-set-chaang',
    words: [
      { id: 'ts-chaang-f', th: 'ช่าง', rom: 'châang', de: 'Handwerker, Mechaniker', emoji: '🔧', note: 'ช = Tiefklasse + mái èk (่) → fallend.' },
      { id: 'ts-chaang-h', th: 'ช้าง', rom: 'cháang', de: 'Elefant', emoji: '🐘', note: 'ช = Tiefklasse + mái toh (้) → hoch.' },
    ],
  },
  {
    id: 'ts-set-tam',
    words: [
      { id: 'ts-tam', th: 'ทำ', rom: 'tam', de: 'machen, tun', note: 'ท = Tiefklasse, lebende Silbe ohne Tonzeichen → mittel.' },
      { id: 'ts-tam-f', th: 'ถ้ำ', rom: 'tâm', de: 'Höhle', note: 'ถ = Hochklasse + mái toh (้) → fallend.' },
    ],
  },
  {
    id: 'ts-set-baan',
    words: [
      { id: 'ts-baan', th: 'บาน', rom: 'baan', de: 'aufblühen; Zählwort für Türen', emoji: '🌸', note: 'บ = Mittelklasse, lebende Silbe ohne Tonzeichen → mittel.' },
      { id: 'ts-baan-f', th: 'บ้าน', rom: 'bâan', de: 'Haus', emoji: '🏠', note: 'บ = Mittelklasse + mái toh (้) → fallend.' },
    ],
  },
  {
    id: 'ts-set-paa',
    words: [
      { id: 'ts-paa', th: 'พา', rom: 'paa', de: 'mitnehmen, führen', note: 'พ = Tiefklasse, lebende Silbe ohne Tonzeichen → mittel.' },
      { id: 'ts-paa-f', th: 'ผ้า', rom: 'pâa', de: 'Stoff, Tuch', note: 'ผ = Hochklasse + mái toh (้) → fallend.' },
    ],
  },
  {
    id: 'ts-set-suai',
    words: [
      { id: 'ts-suai-r', th: 'สวย', rom: 'sǔai', de: 'schön', emoji: '🌺', note: 'ส = Hochklasse, lebende Silbe ohne Tonzeichen → steigend.' },
      { id: 'ts-suai', th: 'ซวย', rom: 'suai', de: 'Pech haben (umgangssprachlich)', note: 'ซ = Tiefklasse, lebende Silbe ohne Tonzeichen → mittel.' },
    ],
  },
  {
    id: 'ts-set-sen',
    words: [
      { id: 'ts-sen', th: 'เซ็น', rom: 'sen', de: 'unterschreiben', emoji: '✍️', note: 'ซ = Tiefklasse, lebende Silbe ohne Tonzeichen → mittel.' },
      { id: 'ts-sen-f', th: 'เส้น', rom: 'sên', de: 'Linie; Nudel', emoji: '🍜', note: 'ส = Hochklasse + mái toh (้) → fallend.' },
    ],
  },
]

export const toneSets: ToneSet[] = sets.map((s) => ({
  id: s.id,
  words: s.words.map(({ id, th, rom, de, emoji }) => (emoji ? { id, th, rom, de, emoji } : { id, th, rom, de })),
}))

export const toneItems: Item[] = sets.flatMap((s) =>
  s.words.map(({ id, th, rom, de, emoji, note }) => ({ id, th, rom, de, kind: 'word' as const, note, ...(emoji ? { emoji } : {}) })),
)

export const toneChapter: Chapter = {
  id: 'k1t',
  title: 'Töne hören',
  subtitle: 'Fünf Töne unterscheiden – mit Minimalpaaren',
  icon: '🎵',
  color: '#ff3d7f',
  lessons: [
    {
      id: 'k1t-l1',
      title: 'Mittel, hoch, steigend',
      subtitle: 'มา · ม้า · หมา und นา · น้า · หนา',
      icon: '🐎',
      type: 'vocab',
      focus: 'tones',
      grammar: 'g-tones',
      items: ['ts-maa', 'ts-maa-h', 'ts-maa-r', 'ts-naa', 'ts-naa-h', 'ts-naa-r'],
    },
    {
      id: 'k1t-l2',
      title: 'Tief oder fallend?',
      subtitle: 'ขาว · ข่าว · ข้าว und เสือ · เสื่อ · เสื้อ',
      icon: '🍚',
      type: 'vocab',
      focus: 'tones',
      grammar: 'g-tones',
      items: ['ts-kaao-r', 'ts-kaao-l', 'ts-kaao-f', 'ts-suea-r', 'ts-suea-l', 'ts-suea-f'],
    },
    {
      id: 'k1t-l3',
      title: 'Mittelklasse: mittel, tief, fallend',
      subtitle: 'ปา · ป่า · ป้า, เกา · เก่า · เก้า, ปู · ปู่',
      icon: '🌳',
      type: 'vocab',
      focus: 'tones',
      grammar: 'g-tones',
      items: ['ts-bpaa', 'ts-bpaa-l', 'ts-bpaa-f', 'ts-gao', 'ts-gao-l', 'ts-gao-f', 'ts-bpuu', 'ts-bpuu-l'],
    },
    {
      id: 'k1t-l4',
      title: 'Der Holz-Zungenbrecher',
      subtitle: 'ไม้ · ใหม่ · ไม่ · ไหม, ใกล้ · ไกล, ใน · ไหน',
      icon: '🪵',
      type: 'vocab',
      focus: 'tones',
      grammar: 'g-tones',
      items: ['ts-mai-h', 'ts-mai-l', 'ts-mai-f', 'ts-mai-r', 'ts-glai', 'ts-glai-f', 'ts-nai', 'ts-nai-r'],
    },
    {
      id: 'k1t-l5',
      title: 'Alle fünf Töne',
      subtitle: 'คา · ข่า · ค่า · ค้า · ขา und เขา · เข่า · เข้า',
      icon: '🦵',
      type: 'vocab',
      focus: 'tones',
      grammar: 'g-tones',
      items: ['ts-kaa', 'ts-kaa-l', 'ts-kaa-f', 'ts-kaa-h', 'ts-kaa-r', 'ts-kao-r', 'ts-kao-l', 'ts-kao-f'],
    },
    {
      id: 'k1t-l6',
      title: 'Medizin, Ei und Fieber',
      subtitle: 'ยา · อย่า · ย่า, หา · ห้า, ไข · ไข่ · ไข้',
      icon: '💊',
      type: 'vocab',
      focus: 'tones',
      grammar: 'g-tones',
      items: ['ts-yaa', 'ts-yaa-l', 'ts-yaa-f', 'ts-haa-r', 'ts-haa-f', 'ts-kai-r', 'ts-kai-l', 'ts-kai-f'],
    },
    {
      id: 'k1t-l7',
      title: 'Links, rechts, Elefant',
      subtitle: 'ทราย · ส่าย · ซ้าย · สาย, ขวา · คว้า, ช่าง · ช้าง',
      icon: '🐘',
      type: 'vocab',
      focus: 'tones',
      grammar: 'g-tones',
      items: ['ts-saai', 'ts-saai-l', 'ts-saai-h', 'ts-saai-r', 'ts-kwaa-h', 'ts-kwaa-r', 'ts-chaang-f', 'ts-chaang-h'],
    },
    {
      id: 'k1t-l8',
      title: 'Gemischte Wiederholung',
      subtitle: 'Hund, Reis, neu – alles durcheinander',
      icon: '🎧',
      type: 'vocab',
      focus: 'tones',
      grammar: 'g-tones',
      items: ['ts-maa', 'ts-maa-h', 'ts-maa-r', 'ts-kaao-r', 'ts-kaao-l', 'ts-kaao-f', 'ts-mai-l', 'ts-mai-f'],
    },
  ],
}
