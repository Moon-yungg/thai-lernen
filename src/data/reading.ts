// Kapitel „Lesen lernen“: Leseregeln systematisch – lebende/tote Silben, Tonzeichen,
// unsichtbare Vokale, Auslaute, führendes ห/อ, Konsonantenverbindungen, stumme Zeichen,
// Sonderschreibungen und Ausnahmen.
// Umschrift: verbindliches Schema aus types.ts – jede Silbe trägt ihren GESPROCHENEN Ton.
import type { Chapter, GlossWord, GrammarTopic, Item, Role } from './types'

type Extra = Partial<Omit<Item, 'id' | 'th' | 'rom' | 'de' | 'kind' | 'rule'>>

/** Lesewort mit Leseregel */
const r = (id: string, th: string, rom: string, de: string, rule: string, extra: Extra = {}): Item => ({
  id,
  th,
  rom,
  de,
  kind: 'word',
  rule,
  ...extra,
})

// Kurzschreibweise für Glossen
const w = (th: string, rom: string, de: string, role?: Role): GlossWord => (role ? { th, rom, de, role } : { th, rom, de })

export const readingItems: Item[] = [
  // ======================= L1: Lebende & tote Silben =======================
  r('r-live-kaa', 'กา', 'gaa', 'Krähe', 'ก ist Mittelklasse, die Silbe endet auf langes -า und ist damit lebend → ohne Tonzeichen mittlerer Ton: gaa.', {
    alt: ['Rabe', 'die Krähe', 'Kanne'],
    emoji: '🐦‍⬛',
    note: 'กา heißt auch „Kanne“ (กาน้ำ = Wasserkessel).',
  }),
  r('r-live-hin', 'หิน', 'hǐn', 'Stein', 'ห ist Hochklasse, die Silbe endet auf น (lebend) → ohne Tonzeichen steigender Ton: hǐn.', {
    alt: ['der Stein', 'Fels', 'Felsen'],
    emoji: '🪨',
  }),
  r('r-live-yaao', 'ยาว', 'yaao', 'lang', 'ย ist Tiefklasse, die Silbe endet auf -ว (lebend) → ohne Tonzeichen mittlerer Ton: yaao.', {
    alt: ['lange'],
    emoji: '📏',
  }),
  r('r-dead-jap', 'จับ', 'jàp', 'fangen', 'จ ist Mittelklasse, die Silbe endet auf บ (= p) und ist tot → tiefer Ton: jàp.', {
    alt: ['greifen', 'festhalten', 'anfassen'],
    emoji: '🤲',
  }),
  r('r-dead-piik', 'ปีก', 'bpèek', 'Flügel', 'ป ist Mittelklasse, langer Vokal, aber Auslaut ก (= k) → tote Silbe → tiefer Ton: bpèek. Bei Mittelklasse ist die Vokallänge egal.', {
    alt: ['der Flügel', 'Chicken Wing'],
    emoji: '🪽',
    note: 'ปีกไก่ = Hühnerflügel.',
  }),
  r('r-dead-khap', 'ขับ', 'kàp', 'fahren (lenken)', 'ข ist Hochklasse, Auslaut บ (= p) → tote Silbe → tiefer Ton: kàp. Hochklasse tot = immer tief.', {
    alt: ['fahren', 'lenken', 'steuern', 'Auto fahren'],
    emoji: '🚗',
    note: 'ขับรถ = Auto fahren.',
  }),
  r('r-dead-phak', 'พัก', 'pák', 'sich ausruhen', 'พ ist Tiefklasse, kurzer Vokal -ั + Auslaut ก → tot und kurz → hoher Ton: pák.', {
    alt: ['ausruhen', 'Pause machen', 'übernachten', 'wohnen'],
    emoji: '😴',
    note: 'Auch „übernachten“: พักที่โรงแรม = im Hotel übernachten.',
  }),
  r('r-dead-miit', 'มีด', 'mêet', 'Messer', 'ม ist Tiefklasse, langer Vokal -ี + Auslaut ด (= t) → tot und lang → fallender Ton: mêet.', {
    alt: ['das Messer'],
    emoji: '🔪',
  }),

  // ======================= L2: Tonzeichen in Aktion =======================
  r('r-mark-jaai', 'จ่าย', 'jàai', 'bezahlen', 'Mittelklasse จ + mái èk (่) → tiefer Ton: jàai.', {
    alt: ['zahlen', 'ausgeben', 'bezahlen'],
    emoji: '💸',
  }),
  r('r-mark-tuu', 'ตู้', 'dtôo', 'Schrank', 'Mittelklasse ต + mái toh (้) → fallender Ton: dtôo.', {
    alt: ['der Schrank', 'Kasten', 'Kühlschrank', 'Automat'],
    emoji: '🗄️',
    note: 'ตู้เย็น (dtôo-yen, „kalter Schrank“) = Kühlschrank.',
  }),
  r('r-mark-buai', 'บ๊วย', 'búai', 'eingelegte Pflaume', 'Mittelklasse บ + mái dtree (๊) → hoher Ton: búai. ๊ und ๋ kommen nur bei Mittelklasse vor.', {
    alt: ['Pflaume', 'Salzpflaume', 'Aprikose'],
    note: 'Getrocknete Salzpflaumen sind ein beliebter Snack. Umgangssprachlich auch „Letzter“ (เป็นบ๊วย = Schlusslicht sein).',
  }),
  r('r-mark-kuaytiao', 'ก๋วยเตี๋ยว', 'gǔai-dtǐao', 'Nudelsuppe', 'Zweimal Mittelklasse (ก, ต) + mái jàt-dtà-waa (๋) → beide Silben steigend: gǔai-dtǐao.', {
    alt: ['Nudeln', 'Reisnudeln', 'Nudelsuppe', 'Kuay Tiao'],
    emoji: '🍜',
  }),
  r('r-mark-thaai', 'ถ่าย', 'tàai', 'fotografieren', 'Hochklasse ถ + mái èk (่) → tiefer Ton: tàai.', {
    alt: ['Foto machen', 'fotografieren', 'filmen', 'aufnehmen'],
    emoji: '📸',
    note: 'ถ่ายรูป = ein Foto machen.',
  }),
  r('r-mark-thuai', 'ถ้วย', 'tûai', 'Tasse, Schale', 'Hochklasse ถ + mái toh (้) → fallender Ton: tûai. Das Tonzeichen steht über dem Konsonanten, nicht über dem Vokal.', {
    alt: ['Tasse', 'Schale', 'Schüssel', 'Becher', 'Pokal'],
    emoji: '☕',
  }),
  r('r-mark-rom', 'ร่ม', 'rôm', 'Schirm', 'Tiefklasse ร + mái èk (่) → fallender Ton (nicht tief!): rôm. Bei Tiefklasse liegt jedes Zeichen eine Stufe „höher“.', {
    alt: ['Regenschirm', 'Sonnenschirm', 'Schatten', 'der Schirm'],
    emoji: '☂️',
  }),
  r('r-mark-lin', 'ลิ้น', 'lín', 'Zunge', 'Tiefklasse ล + mái toh (้) → hoher Ton (nicht fallend!): lín.', {
    alt: ['die Zunge'],
    emoji: '👅',
  }),

  // ======================= L3: Unsichtbare Vokale =======================
  r('r-hid-nom', 'นม', 'nom', 'Milch', 'Zwei Konsonanten ohne Vokal → dazwischen steckt ein kurzes o: น-o-ม = nom. Endet auf ม → lebend, Tiefklasse → mittel.', {
    alt: ['die Milch'],
    emoji: '🥛',
  }),
  r('r-hid-mot', 'มด', 'mót', 'Ameise', 'Unsichtbares kurzes o zwischen ม und ด. Auslaut ด = t → tot und kurz, Tiefklasse → hoher Ton: mót.', {
    alt: ['die Ameise', 'Ameisen'],
    emoji: '🐜',
  }),
  r('r-hid-thanon', 'ถนน', 'tà-nǒn', 'Straße', 'Drei Konsonanten: ถ bekommt ein unsichtbares a (tà), นน ein unsichtbares o (nǒn). Weil ถ Hochklasse ist, „leiht“ es น seine Klasse → steigend.', {
    alt: ['die Straße', 'Weg'],
    emoji: '🛣️',
    note: 'Ohne diese Regel würde man fälschlich „tà-non“ lesen.',
  }),
  r('r-hid-khanom', 'ขนม', 'kà-nǒm', 'Süßigkeit, Snack', 'ข bekommt ein unsichtbares kurzes a (kà), dann น-o-ม (nǒm). Das Hochklasse-ข macht auch นม zur Hochklasse → steigend.', {
    alt: ['Süßigkeit', 'Snack', 'Kuchen', 'Dessert', 'Nachtisch', 'Süßes'],
    emoji: '🍡',
  }),
  r('r-hid-sanuk', 'สนุก', 'sà-nùk', 'Spaß machen', 'ส + unsichtbares a = sà. นุก folgt der Hochklasse von ส und ist tot → tief: nùk.', {
    alt: ['lustig', 'Spaß', 'spaßig', 'unterhaltsam', 'Spaß haben'],
    emoji: '🥳',
    note: 'Ein Kernwort der thailändischen Kultur: Alles sollte สนุก sein!',
  }),
  r('r-hid-chalaat', 'ฉลาด', 'chà-làat', 'klug', 'ฉ + unsichtbares a = chà. ลาด übernimmt die Hochklasse von ฉ → tote Silbe → tief: làat (sonst wäre es fallend).', {
    alt: ['schlau', 'intelligent', 'clever'],
    emoji: '🧠',
  }),
  r('r-hid-aahaan', 'อาหาร', 'aa-hǎan', 'Essen', 'ร am Silbenende klingt wie n: หาร = hǎan (Hochklasse ห, lebend → steigend).', {
    alt: ['Nahrung', 'Gericht', 'Mahlzeit', 'das Essen', 'Speise'],
    emoji: '🍲',
  }),
  r('r-hid-kankrai', 'กรรไกร', 'gan-grai', 'Schere', 'รร ohne folgenden Endkonsonanten liest man „an“: กรร = gan. Danach ไกร mit Cluster กร = grai.', {
    alt: ['die Schere'],
    emoji: '✂️',
  }),

  // ======================= L4: Auslaute =======================
  r('r-fin-khuat', 'ขวด', 'kùat', 'Flasche', 'Auslaut ด klingt als t. Vokal -ว- = ua, Hochklasse + tote Silbe → tief: kùat.', {
    alt: ['die Flasche'],
    emoji: '🍾',
  }),
  r('r-fin-phuuet', 'พืช', 'pûuet', 'Pflanze', 'Auslaut ช klingt am Silbenende als t. Tiefklasse, langer Vokal, tot → fallend: pûuet.', {
    alt: ['die Pflanze', 'Pflanzen', 'Gewächs'],
    emoji: '🌱',
  }),
  r('r-fin-phiset', 'พิเศษ', 'pí-sèt', 'besonders', 'Auslaut ษ klingt als t (wie ศ und ส). พิ: Tiefklasse, kurz und offen → hoch; เศษ: Hochklasse, tot → tief.', {
    alt: ['speziell', 'extra', 'Spezial', 'außergewöhnlich'],
    emoji: '✨',
    note: 'Im Restaurant: พิเศษ = „extra groß“ (mehr Fleisch/Portion).',
  }),
  r('r-fin-mongkon', 'มงคล', 'mong-kon', 'glückverheißend', 'Auslaut ล klingt als n: คล = kon (unsichtbares o). Beide Silben Tiefklasse und lebend → mittel.', {
    alt: ['Glück bringend', 'segensreich', 'Segen', 'glücksbringend'],
    emoji: '🍀',
    note: 'Bei Hochzeiten, Hauseinweihungen usw. ist alles มงคล – Glück bringend.',
  }),
  r('r-fin-choen', 'เชิญ', 'chern', 'bitte (herein)', 'Auslaut ญ klingt als n. Lebende Silbe, Tiefklasse → mittel: chern.', {
    alt: ['einladen', 'bitte', 'herein', 'bitte schön'],
    emoji: '🤗',
    note: 'Höfliche Aufforderung: เชิญครับ = „Bitte sehr, treten Sie ein / bedienen Sie sich.“',
  }),
  r('r-fin-waan', 'วาฬ', 'waan', 'Wal', 'Auslaut ฬ klingt als n (wie ล). Lebend, Tiefklasse → mittel: waan.', {
    alt: ['der Wal', 'Walfisch'],
    emoji: '🐋',
  }),
  r('r-fin-phaap', 'ภาพ', 'pâap', 'Bild', 'Auslaut พ klingt als p. ภ ist Tiefklasse, langer Vokal, tot → fallend: pâap.', {
    alt: ['das Bild', 'Foto', 'Gemälde', 'Abbildung'],
    emoji: '🖼️',
  }),
  r('r-fin-lek', 'เลข', 'lêk', 'Zahl, Ziffer', 'Auslaut ข klingt als k. Tiefklasse ล, langes e, tot → fallend: lêk.', {
    alt: ['Zahl', 'Ziffer', 'Nummer'],
    emoji: '🔢',
  }),

  // ======================= L5: Führendes ห und อ =======================
  r('r-lead-nuu', 'หนู', 'nǒo', 'Maus', 'Stummes ห vor น: Die Silbe wird Hochklasse, lebend → steigend: nǒo.', {
    alt: ['Ratte', 'die Maus', 'ich (Kind/Frau, Ich-Form)'],
    emoji: '🐭',
    note: 'Mädchen und junge Frauen nennen sich gegenüber Älteren auch selbst หนู („ich“).',
  }),
  r('r-lead-laai', 'หลาย', 'lǎai', 'viele, mehrere', 'Stummes ห vor ล → Hochklasse, lebend (-าย) → steigend: lǎai.', {
    alt: ['viele', 'mehrere', 'zahlreich'],
  }),
  r('r-lead-ying', 'หญิง', 'yǐng', 'Frau, weiblich', 'Stummes ห vor ญ → Hochklasse, Auslaut ง (lebend) → steigend: yǐng.', {
    alt: ['Frau', 'weiblich', 'Mädchen'],
    emoji: '👩',
    note: 'ผู้หญิง (pôo-yǐng) = Frau.',
  }),
  r('r-lead-yut', 'หยุด', 'yùt', 'aufhören, anhalten', 'Stummes ห vor ย → Hochklasse. Auslaut ด = t → tot → tief: yùt.', {
    alt: ['stoppen', 'halten', 'aufhören', 'anhalten', 'Pause', 'stopp'],
    emoji: '✋',
    note: 'วันหยุด = Feiertag, freier Tag.',
  }),
  r('r-lead-mon', 'หมอน', 'mǒrn', 'Kissen', 'Stummes ห vor ม → Hochklasse, lebend (Auslaut น) → steigend: mǒrn.', {
    alt: ['Kopfkissen', 'das Kissen'],
    emoji: '🛏️',
  }),
  r('r-lead-wai', 'ไหว้', 'wâi', 'Wai (Gruß)', 'Stummes ห vor ว → Hochklasse. Mit mái toh (้) → fallend: wâi. Das Tonzeichen sitzt auf ว, nicht auf ห.', {
    alt: ['grüßen', 'Wai', 'verbeugen', 'beten', 'Gruß'],
    emoji: '🙏',
    note: 'Der thailändische Gruß mit zusammengelegten Händen.',
  }),
  r('r-lead-muak', 'หมวก', 'mùak', 'Mütze, Hut', 'Stummes ห vor ม → Hochklasse. Vokal -ว- = ua, Auslaut ก → tot → tief: mùak.', {
    alt: ['Hut', 'Mütze', 'Kappe', 'Helm'],
    emoji: '🧢',
    note: 'หมวกกันน็อก = Motorradhelm.',
  }),
  r('r-lead-yaang', 'อย่าง', 'yàang', 'Art, Sorte; wie', 'Stummes อ vor ย → Mittelklasse + mái èk (่) → tief: yàang (ohne อ wäre ย่าง yâang, fallend).', {
    alt: ['Art', 'Sorte', 'wie', 'Weise', 'Stück'],
    note: 'อย่างไร = wie? · อย่างนี้ = so (auf diese Weise).',
  }),

  // ======================= L6: Konsonantenverbindungen =======================
  r('r-cl-prik', 'พริก', 'prík', 'Chili', 'Echtes Cluster พร: beide Laute werden gesprochen. Der Ton richtet sich nach พ (Tiefklasse): kurz und tot → hoch: prík.', {
    alt: ['Chilischote', 'Peperoni', 'Pfeffer', 'der Chili'],
    emoji: '🌶️',
    note: 'Im Alltag sagen viele „pík“ – das ร wird oft verschluckt.',
  }),
  r('r-cl-pleng', 'เพลง', 'pleng', 'Lied', 'Cluster พล: p und l werden zusammen gesprochen. พ = Tiefklasse, lebend → mittel: pleng.', {
    alt: ['das Lied', 'Song', 'Musik'],
    emoji: '🎵',
  }),
  r('r-cl-klong', 'กลอง', 'glorng', 'Trommel', 'Cluster กล: g + l. Klasse von ก (Mittel), lebend → mittel: glorng.', {
    alt: ['die Trommel'],
    emoji: '🥁',
  }),
  r('r-cl-kwaang', 'กว้าง', 'gwâang', 'breit, weit', 'Cluster กว: g + w. Das Tonzeichen steht über dem zweiten Konsonanten (ว), zählt aber für ก (Mittelklasse) + ้ → fallend: gwâang.', {
    alt: ['breit', 'weit', 'geräumig', 'groß'],
    emoji: '↔️',
  }),
  r('r-cl-saang', 'สร้าง', 'sâang', 'bauen', 'Falsches Cluster สร = s (ร stumm). Hochklasse ส + mái toh (้) → fallend: sâang.', {
    alt: ['bauen', 'erschaffen', 'errichten', 'schaffen'],
    emoji: '🏗️',
  }),
  r('r-cl-saap', 'ทราบ', 'sâap', 'wissen (höflich)', 'Falsches Cluster ทร = s. Tiefklasse ท, langer Vokal, tot → fallend: sâap.', {
    alt: ['wissen', 'erfahren', 'Bescheid wissen', 'kennen'],
    note: 'Höfliche Form von รู้. ทราบแล้วครับ = „Ich habe verstanden / zur Kenntnis genommen.“',
  }),
  r('r-cl-jing', 'จริง', 'jing', 'wahr, echt', 'Falsches Cluster: Bei จร wird das ร nicht gesprochen → j. Mittelklasse, lebend → mittel: jing.', {
    alt: ['wahr', 'echt', 'wirklich', 'richtig', 'stimmt'],
    emoji: '💯',
    note: 'จริงเหรอ? = Echt jetzt? Wirklich?',
  }),
  r('r-cl-sao', 'เศร้า', 'sâo', 'traurig', 'Falsches Cluster ศร = s (ร stumm). Hochklasse ศ + mái toh (้) → fallend: sâo.', {
    alt: ['betrübt', 'deprimiert', 'traurig sein'],
    emoji: '😢',
  }),

  // ======================= L7: Stumme Buchstaben ์ und ็ =======================
  r('r-sil-aajaan', 'อาจารย์', 'aa-jaan', 'Lehrer(in), Dozent', 'Das ์ (gaa-ran) macht ย stumm: จารย์ = jaan. Lebend, Mittelklasse → mittel.', {
    alt: ['Lehrer', 'Lehrerin', 'Dozent', 'Professor', 'Meister'],
    emoji: '👨‍🏫',
    note: 'Respektvolle Anrede für Lehrer an Uni und Schule sowie für Meister (z. B. Mönche, Kampfsportlehrer).',
  }),
  r('r-sil-yak', 'ยักษ์', 'yák', 'Riese', 'Das ์ macht ษ stumm, ก ist der Auslaut. Tiefklasse ย, kurz, tot → hoch: yák.', {
    alt: ['der Riese', 'Dämon', 'Tempelwächter', 'riesig'],
    emoji: '👹',
    note: 'Die bunten Wächterfiguren an Tempeltoren. Als Adjektiv: riesig.',
  }),
  r('r-sil-thorasap', 'โทรศัพท์', 'toh-rá-sàp', 'Telefon', 'ท์ am Ende ist stumm. In โทร wird ร als eigene Silbe rá gelesen, ศัพ: Hochklasse, tot → tief.', {
    alt: ['das Telefon', 'Handy', 'Telefonnummer', 'anrufen'],
    emoji: '📱',
    note: 'Kurz: โทร (toh) = anrufen.',
  }),
  r('r-sil-kaatuun', 'การ์ตูน', 'gaa-dtoon', 'Comic, Zeichentrick', 'Das ์ über ร macht es stumm: การ์ = gaa. Beide Silben mittel.', {
    alt: ['Cartoon', 'Comic', 'Zeichentrickfilm', 'Manga'],
    emoji: '🦸',
    note: 'Lehnwort aus dem Englischen „cartoon“.',
  }),
  r('r-sil-dek', 'เด็ก', 'dèk', 'Kind', 'Das ็ (mái dtài-kúu) kürzt เ- zu kurzem e. Mittelklasse, tot (Auslaut ก) → tief: dèk.', {
    alt: ['das Kind', 'Kinder', 'Junge', 'Mädchen'],
    emoji: '🧒',
  }),
  r('r-sil-hen', 'เห็น', 'hěn', 'sehen', 'ห (hier normaler Anlaut h) ist Hochklasse. ็ kürzt den Vokal, aber Auslaut น → lebend → steigend: hěn.', {
    alt: ['erblicken', 'meinen', 'finden'],
    emoji: '👀',
    note: 'เห็นด้วย = einverstanden sein (wörtlich: „mit-sehen“).',
  }),
  r('r-sil-khaeng', 'แข็ง', 'kǎeng', 'hart', '็ kürzt แ- zu kurzem ae. Hochklasse ข, Auslaut ง → lebend → steigend: kǎeng.', {
    alt: ['fest', 'steif', 'stark', 'gefroren'],
    emoji: '🪨',
  }),
  r('r-sil-yen', 'เย็น', 'yen', 'kühl; Abend', '็ macht aus เ- ein kurzes e. Tiefklasse ย, Auslaut น → lebend → mittel: yen.', {
    alt: ['kalt', 'kühl', 'Abend', 'abends', 'Abendzeit'],
    emoji: '🧊',
    note: 'น้ำเย็น = kaltes Wasser · ตอนเย็น = am Abend.',
  }),

  // ======================= L8: Besondere Schreibungen =======================
  r('r-sp-kam', 'คำ', 'kam', 'Wort', '-ำ ist ein eigenes Vokalzeichen: a + m. ค ist Tiefklasse, -ำ zählt als lebend → mittel: kam.', {
    alt: ['das Wort', 'Bissen', 'Happen'],
    emoji: '🔤',
    note: 'Auch „Bissen“: คำเดียว = ein Bissen.',
  }),
  r('r-sp-jai', 'ใจ', 'jai', 'Herz', 'ใ- klingt genau wie ไ- (ai). Mittelklasse, lebend → mittel: jai.', {
    alt: ['das Herz', 'Geist', 'Seele', 'Gemüt'],
    emoji: '❤️',
    note: 'Steckt in vielen Gefühlswörtern: ดีใจ (froh), เสียใจ (traurig), เข้าใจ (verstehen).',
  }),
  r('r-sp-fai', 'ไฟ', 'fai', 'Feuer, Licht', 'ไ- = ai, die häufigere der beiden ai-Schreibungen. Tiefklasse ฟ, lebend → mittel: fai.', {
    alt: ['Feuer', 'Licht', 'Strom', 'Lampe', 'das Feuer'],
    emoji: '🔥',
    note: 'รถไฟ = „Feuerwagen“ = Zug.',
  }),
  r('r-sp-thao', 'เท้า', 'táo', 'Fuß', 'เ-า = ao (lebend). Tiefklasse ท + mái toh (้) → hoch: táo.', {
    alt: ['der Fuß', 'Füße'],
    emoji: '🦶',
  }),
  r('r-sp-ruedoo', 'ฤดู', 'rúe-doo', 'Jahreszeit', 'ฤ ist ein eigenes Zeichen für die Silbe „rue“ (hier mit hohem Ton gesprochen). ดู = doo.', {
    alt: ['Saison', 'die Jahreszeit'],
    emoji: '🍂',
    note: 'ฤดูร้อน = heiße Jahreszeit, ฤดูฝน = Regenzeit.',
  }),
  r('r-sp-kor', 'ก็', 'gôr', 'auch, dann', 'Ausnahme: ก็ wird mit fallendem Ton und langem o gesprochen – gôr –, obwohl die Schreibung einen kurzen tiefen Ton erwarten ließe.', {
    alt: ['auch', 'dann', 'also', 'eben', 'ebenfalls'],
    note: 'Sehr häufiges Füllwort: ผมก็ไป = Ich gehe auch.',
  }),
  r('r-sp-rue', 'หรือ', 'rǔue', 'oder', 'Stummes ห vor ร → Hochklasse, lebend → steigend: rǔue. Umgangssprachlich oft kurz und hoch: rúe.', {
    alt: ['oder', 'oder?'],
    note: 'Am Satzende macht หรือ eine Frage: „…, oder?“',
  }),
  r('r-sp-taorai', 'เท่าไร', 'tâo-rài', 'wie viel', 'Ausnahme: ไร wäre nach der Regel mittel (rai), wird aber tief gesprochen: tâo-rài. Darum schreibt man oft lautgetreu เท่าไหร่.', {
    alt: ['wieviel', 'wie viel', 'wie teuer', 'wie viele'],
    emoji: '💰',
  }),

  // ======================= L9: Lesen üben =======================
  r('r-mix-khanompang', 'ขนมปัง', 'kà-nǒm-bpang', 'Brot', 'ขนม mit unsichtbarem a und o (kà-nǒm, ข „leiht“ seine Hochklasse) + ปัง (Mittelklasse, lebend → mittel).', {
    alt: ['das Brot', 'Toast'],
    emoji: '🍞',
  }),
  r('r-mix-university', 'มหาวิทยาลัย', 'má-hǎa-wít-tá-yaa-lai', 'Universität', 'ม mit unsichtbarem a (má), หา steigend, วิท + verbindendes ทะ (wít-tá), ลัย = lai (-ัย = ai).', {
    alt: ['Uni', 'Hochschule', 'die Universität'],
    emoji: '🎓',
    note: 'Kurz: มหาลัย (má-hǎa-lai).',
  }),
  r('r-mix-library', 'ห้องสมุด', 'hôrng-sà-mùt', 'Bibliothek', 'ห้อง: Hochklasse + ้ → fallend. สมุด: ส + unsichtbares a (sà), มุด übernimmt die Hochklasse von ส → tot → tief: mùt.', {
    alt: ['die Bibliothek', 'Bücherei'],
    emoji: '📚',
    note: 'สมุด allein = Heft.',
  }),
  r('r-mix-fruit', 'ผลไม้', 'pǒn-lá-máai', 'Obst', 'ผล: ล als Auslaut = n → pǒn. Dann wird ล noch einmal als Verbindungssilbe lá gelesen. ไม้ wird lang gesprochen: máai.', {
    alt: ['das Obst', 'Früchte', 'Frucht'],
    emoji: '🍎',
  }),
  r('r-mix-door', 'ประตู', 'bprà-dtoo', 'Tür', 'Cluster ปร mit unsichtbarem a: bprà (Mittelklasse, kurz → tief). ตู: Mittelklasse, lebend → mittel.', {
    alt: ['die Tür', 'Tor'],
    emoji: '🚪',
  }),
  r('r-mix-bicycle', 'จักรยาน', 'jàk-grà-yaan', 'Fahrrad', 'จักร: ก ist Auslaut (jàk), dann wird กร noch einmal als Cluster mit unsichtbarem a gelesen: grà. ยาน = yaan.', {
    alt: ['das Fahrrad', 'Rad', 'Velo'],
    emoji: '🚲',
  }),
  r('r-mix-set', 'เสร็จ', 'sèt', 'fertig', 'Falsches Cluster สร = s, ็ kürzt den Vokal, จ als Auslaut = t. Hochklasse, tot → tief: sèt.', {
    alt: ['beendet', 'erledigt', 'fertig sein', 'abgeschlossen'],
    emoji: '✅',
    note: 'เสร็จแล้ว = schon fertig.',
  }),
  r('r-mix-art', 'ศิลปะ', 'sǐn-lá-bpà', 'Kunst', 'ศิล: ล als Auslaut = n, Hochklasse, lebend → steigend: sǐn. Verbindungssilbe lá, dann ปะ (Mittelklasse, kurz → tief).', {
    alt: ['die Kunst'],
    emoji: '🎨',
  }),
]

export const readingTopics: GrammarTopic[] = [
  // ==================================================================
  {
    id: 'g-read-live-dead',
    title: 'Lebende & tote Silben',
    icon: '💓',
    summary: 'Ohne Tonzeichen bestimmen Konsonantenklasse und Silbenart (lebend/tot) den Ton.',
    sections: [
      {
        type: 'text',
        md: 'Du kennst schon alle Buchstaben. Jetzt geht es darum, **unbekannte Wörter sicher vorzulesen** – mit dem richtigen Ton.\n\nDie wichtigste Frage bei jeder Silbe ohne Tonzeichen lautet: **Ist sie lebend oder tot?**\n\n**Lebend** (คำเป็น) ist eine Silbe, die man „lang klingen lassen“ kann:\n\n– sie endet auf einen **langen Vokal**: กา (gaa), ดี (dee)\n\n– oder auf einen **Nasal oder Halbvokal**: m, n, ng, i (ย), o (ว): ยาว (yaao), นม (nom)\n\n– auch **-ำ, ไ-, ใ-, เ-า** gelten als lebend: คำ, ไฟ, ใจ, เรา\n\n**Tot** (คำตาย) ist eine Silbe, die „abgehackt“ endet:\n\n– auf einen **kurzen Vokal**: จะ (jà), คะ (ká)\n\n– oder auf einen **Verschlusslaut k, p, t**: จับ (jàp), มีด (mêet)',
      },
      {
        type: 'table',
        head: ['Klasse', 'lebend', 'tot, kurzer Vokal', 'tot, langer Vokal'],
        rows: [
          ['Mittelklasse', 'mittel – กา gaa', 'tief – จับ jàp', 'tief – ปีก bpèek'],
          ['Hochklasse', 'steigend – ขา kǎa', 'tief – ขับ kàp', 'tief – ขวด kùat'],
          ['Tiefklasse', 'mittel – ยาว yaao', 'hoch – พัก pák', 'fallend – มีด mêet'],
        ],
      },
      {
        type: 'tip',
        md: '**Eselsbrücke:** Tote Silben sind fast immer **tief** – nur die **Tiefklasse** tanzt aus der Reihe: kurz → **hoch**, lang → **fallend**. Und nur die **Hochklasse** steigt, wenn sie lebt.',
      },
      {
        type: 'example',
        words: [w('ขา', 'kǎa', 'Bein'), w('กา', 'gaa', 'Krähe'), w('ยาว', 'yaao', 'lang')],
        de: 'Drei lebende Silben: Hoch-, Mittel-, Tiefklasse',
        note: 'Nur die Hochklasse (ข) bringt ohne Tonzeichen den steigenden Ton. Mittel- und Tiefklasse bleiben mittel.',
      },
      {
        type: 'example',
        words: [w('พัก', 'pák', 'ausruhen'), w('มีด', 'mêet', 'Messer')],
        de: 'Tiefklasse, tot: kurz → hoch, lang → fallend',
        note: 'Beide enden auf einen Verschlusslaut (ก = k, ด = t). Der Unterschied liegt nur in der Vokallänge: -ั ist kurz, -ี ist lang.',
      },
      {
        type: 'text',
        md: '**So gehst du vor:**\n\n1. Anfangskonsonant → **Klasse** bestimmen\n\n2. Endet die Silbe auf **k, p, t** oder einen **kurzen offenen Vokal**? → **tot**, sonst **lebend**\n\n3. Bei Tiefklasse + tot: **Vokallänge** prüfen\n\n4. Ton aus der Tabelle ablesen',
      },
      { type: 'widget', widget: 'tone-calculator' },
      {
        type: 'quiz',
        question: 'Wie wird ขับ (fahren) gelesen? (ข = Hochklasse, Auslaut บ = p)',
        options: ['kǎp', 'kàp', 'káp', 'kâp'],
        answer: 1,
        explain: 'Auslaut p → tote Silbe. Hochklasse + tot = tief: kàp.',
      },
      {
        type: 'quiz',
        question: 'Welchen Ton hat มีด (Messer)? (ม = Tiefklasse)',
        options: ['mittel', 'hoch', 'fallend', 'steigend'],
        answer: 2,
        explain: 'Auslaut ด = t → tot. Tiefklasse + tot + langer Vokal (-ี) = fallend: mêet.',
      },
      {
        type: 'quiz',
        question: 'Ist นม (Milch) eine lebende oder tote Silbe?',
        options: ['lebend', 'tot'],
        answer: 0,
        explain: 'Sie endet auf ม (m) – ein Nasal. Also lebend, und mit Tiefklasse ohne Tonzeichen: mittel (nom).',
      },
    ],
  },
  // ==================================================================
  {
    id: 'g-read-tone-marks',
    title: 'Tonzeichen in Aktion',
    icon: '🎚️',
    summary: 'Ein Tonzeichen überstimmt die Silbenart – was es bewirkt, hängt aber von der Konsonantenklasse ab.',
    sections: [
      {
        type: 'text',
        md: 'Steht ein **Tonzeichen** über der Silbe, ist es egal, ob sie lebend oder tot ist – das Zeichen entscheidet zusammen mit der **Klasse**.\n\nDas Zeichen sitzt immer **über dem Anfangskonsonanten** (bei Vokalen wie -ิ -ี -ื noch über dem Vokal). Bei Konsonantenverbindungen und stummem ห sitzt es auf dem **zweiten** Konsonanten: กว้าง, หน้า.',
      },
      {
        type: 'table',
        head: ['Klasse', '่ mái èk', '้ mái toh', '๊ mái dtree', '๋ mái jàt-dtà-waa'],
        rows: [
          ['Mittelklasse', 'tief – ป่า bpàa', 'fallend – ป้า bpâa', 'hoch – โต๊ะ dtó', 'steigend – ก๋วย gǔai'],
          ['Hochklasse', 'tief – ไข่ kài', 'fallend – เสื้อ sûea', '–', '–'],
          ['Tiefklasse', 'fallend – ร่ม rôm', 'hoch – ม้า máa', '–', '–'],
        ],
      },
      {
        type: 'tip',
        md: '**Die Tiefklasse ist „eine Stufe verschoben“:** Wo Mittel- und Hochklasse mit ่ tief und mit ้ fallend werden, wird die Tiefklasse mit ่ **fallend** und mit ้ **hoch**. Die Zeichen ๊ und ๋ gibt es nur bei der **Mittelklasse**.',
      },
      {
        type: 'example',
        words: [w('ป่า', 'bpàa', 'Wald'), w('ป้า', 'bpâa', 'Tante')],
        de: 'Gleiche Buchstaben, anderes Zeichen, andere Bedeutung',
        note: 'ป ist Mittelklasse: ่ → tief, ้ → fallend.',
      },
      {
        type: 'example',
        words: [w('ไข่', 'kài', 'Ei'), w('ไข้', 'kâi', 'Fieber')],
        de: 'Ei oder Fieber?',
        note: 'ข ist Hochklasse: ่ → tief (Ei), ้ → fallend (Fieber).',
      },
      {
        type: 'example',
        words: [w('มา', 'maa', 'kommen'), w('ม้า', 'máa', 'Pferd'), w('หมา', 'mǎa', 'Hund')],
        de: 'Drei Wörter, drei Töne',
        note: 'Tiefklasse ม ohne Zeichen → mittel, mit ้ → hoch. Den steigenden Ton schafft ม allein nicht – dafür braucht es ein stummes ห davor (Lektion 5).',
      },
      {
        type: 'text',
        md: '**Wer kann welchen Ton?**\n\nDie **Mittelklasse** kann mit Zeichen alle fünf Töne.\n\nDie **Hochklasse** kommt nur auf steigend, tief und fallend – nie auf mittel oder hoch.\n\nDie **Tiefklasse** kommt nur auf mittel, hoch und fallend – nie auf tief oder steigend.\n\nDarum gibt es viele Laute **doppelt**: Hoch- und Tiefklasse teilen sich die Töne. ข (hoch) und ค (tief) klingen beide wie k – zusammen decken sie alle Töne ab.',
      },
      {
        type: 'quiz',
        question: 'Wie liest man ร่ม (Schirm)? (ร = Tiefklasse)',
        options: ['ròm', 'rôm', 'róm', 'rom'],
        answer: 1,
        explain: 'Tiefklasse + mái èk = fallend: rôm. Nicht tief – bei der Tiefklasse ist jedes Zeichen eine Stufe verschoben.',
      },
      {
        type: 'quiz',
        question: 'Wie liest man เสื้อ (Hemd)? (ส = Hochklasse)',
        options: ['sùea', 'sǔea', 'sûea', 'súea'],
        answer: 2,
        explain: 'Hochklasse + mái toh (้) = fallend: sûea.',
      },
      {
        type: 'quiz',
        question: 'Welche Tonzeichen kommen bei Hochklasse-Konsonanten vor?',
        options: ['nur ่ und ้', 'alle vier', 'nur ๊ und ๋', 'gar keine'],
        answer: 0,
        explain: '๊ und ๋ stehen nur über Mittelklasse-Konsonanten. Hoch- und Tiefklasse nutzen nur ่ und ้.',
      },
    ],
  },
  // ==================================================================
  {
    id: 'g-read-hidden-vowels',
    title: 'Unsichtbare Vokale',
    icon: '👻',
    summary: 'Viele Silben haben gar kein Vokalzeichen – dann steckt ein unsichtbares o oder a darin.',
    sections: [
      {
        type: 'text',
        md: 'Siehst du **zwei Konsonanten ohne Vokalzeichen**, liest du dazwischen ein **kurzes o**:\n\n**คน** = k-o-n → **kon** (Mensch)\n\n**นก** = n-o-k → **nók** (Vogel)\n\n**นม** = n-o-m → **nom** (Milch)\n\nDas ist das „versteckte“ โ-ะ. Die Silbe kann lebend (นม) oder tot (นก, มด) sein.',
      },
      {
        type: 'example',
        words: [w('มด', 'mót', 'Ameise')],
        de: 'Ameise',
        note: 'ม-o-ด: Auslaut ด = t, kurzer Vokal, Tiefklasse → hoher Ton.',
      },
      {
        type: 'text',
        md: 'Steht ein Konsonant **allein** am Anfang eines Wortes und passt nicht zur nächsten Silbe, bekommt er ein **unsichtbares kurzes a**:\n\n**สบาย** = ส(ะ) + บาย → **sà-baai** (gut, angenehm)\n\n**ตลาด** = ต(ะ) + ลาด → **dtà-làat** (Markt)\n\nDiese a-Silbe ist kurz und offen, also **tot**: Mittel- und Hochklasse → **tief** (sà, dtà), Tiefklasse → **hoch** (má, rá).',
      },
      {
        type: 'text',
        md: '**Wichtig – die „geliehene“ Klasse:** Folgt auf einen Mittel- oder Hochklasse-Konsonanten mit unsichtbarem a ein **Tiefklasse-Sonorant** (ง ญ น ม ย ร ล ว), dann übernimmt die zweite Silbe die **Klasse des ersten Konsonanten** – als stünde ein unsichtbares ห davor.\n\n**ขนม** → kà + **nǒm** (nicht nom!)\n\n**ถนน** → tà + **nǒn**\n\n**สนุก** → sà + **nùk** (tot → tief, nicht hoch)\n\n**ฉลาด** → chà + **làat** (tot → tief, nicht fallend)\n\nDie Regel hat einzelne Ausnahmen, z. B. **ขโมย** (kà-moi, Dieb) – solche Wörter muss man einzeln lernen.',
      },
      {
        type: 'example',
        words: [w('ขนม', 'kà-nǒm', 'Süßigkeit')],
        de: 'Süßigkeit, Snack',
        note: 'ข ist Hochklasse und gibt seine Klasse an นม weiter → steigender Ton auf der zweiten Silbe.',
      },
      {
        type: 'table',
        head: ['Wort', 'Lesung', 'Regel'],
        rows: [
          ['คน', 'kon', 'unsichtbares o'],
          ['สบาย', 'sà-baai', 'unsichtbares a'],
          ['ขนม', 'kà-nǒm', 'a + o, geliehene Hochklasse'],
          ['ถนน', 'tà-nǒn', 'a + o, geliehene Hochklasse'],
          ['ตลาด', 'dtà-làat', 'a, geliehene Mittelklasse'],
          ['สนุก', 'sà-nùk', 'a, geliehene Hochklasse'],
        ],
      },
      {
        type: 'text',
        md: '**Das ร am Ende:** Als Auslaut klingt ร wie **n**: **อาหาร** (aa-hǎan, Essen), **ละคร** (lá-kon, Theaterstück).\n\n**Doppeltes รร (ร หัน):** Ohne weiteren Endkonsonanten liest man **an**, mit Endkonsonant nur **a**:\n\n**กรรไกร** = gan-grai (Schere)\n\n**ธรรมดา** = tam-má-daa (normal) – hier ist ม der Endkonsonant',
      },
      {
        type: 'tip',
        md: '**Wo ist die Silbengrenze?** Suche zuerst alle **sichtbaren Vokale** – jeder gehört zu einer Silbe. Übrig gebliebene Konsonanten bekommen ein unsichtbares **o** (zwischen zwei Konsonanten) oder **a** (allein vor der nächsten Silbe).',
      },
      {
        type: 'quiz',
        question: 'Wie liest man ถนน (Straße)?',
        options: ['tà-non', 'tà-nǒn', 'ta-nón', 'tǒn-nà'],
        answer: 1,
        explain: 'ถ + unsichtbares a = tà. นน = n-o-n, und ถ (Hochklasse) gibt seine Klasse weiter → steigend: tà-nǒn.',
      },
      {
        type: 'quiz',
        question: 'Wie liest man ฉลาด (klug)?',
        options: ['chà-lâat', 'chǎ-laat', 'chà-làat', 'cha-láat'],
        answer: 2,
        explain: 'ฉ + a = chà (Hochklasse, tot → tief). ลาด übernimmt die Hochklasse → tot → tief: làat.',
      },
      {
        type: 'quiz',
        question: 'Wie klingt ร am Ende von อาหาร?',
        options: ['r', 'n', 'l', 'stumm'],
        answer: 1,
        explain: 'Am Silbenende wird ร zu n: aa-hǎan.',
      },
    ],
  },
  // ==================================================================
  {
    id: 'g-read-finals',
    title: 'Auslaute: nur sechs Endlaute',
    icon: '🔚',
    summary: 'Über 30 Konsonanten können am Silbenende stehen – sie klingen aber nur wie k, t, p, n, m oder ng.',
    sections: [
      {
        type: 'text',
        md: 'Am **Ende einer Silbe** gibt es im Thai nur sechs Konsonantenlaute: **k, t, p** (tot) und **n, m, ng** (lebend). Dazu kommen ย und ว als Teil von Diphthongen (-i, -o).\n\nViele Buchstaben, die am Anfang ganz verschieden klingen, werden am Ende **gleich** gesprochen. So klingt ส am Anfang wie s, am Ende aber wie **t**.',
      },
      {
        type: 'table',
        head: ['Endlaut', 'Buchstaben', 'Beispiel'],
        rows: [
          ['k', 'ก ข ค ฆ', 'เลข lêk'],
          ['t', 'ด ต ถ ท ธ ฎ ฏ ฐ ฑ ฒ จ ช ซ ศ ษ ส', 'ขวด kùat, พืช pûuet, พิเศษ pí-sèt'],
          ['p', 'บ ป พ ฟ ภ', 'ภาพ pâap'],
          ['n', 'น ณ ญ ร ล ฬ', 'เชิญ chern, วาฬ waan, อาหาร aa-hǎan'],
          ['m', 'ม', 'นม nom'],
          ['ng', 'ง', 'แข็ง kǎeng'],
        ],
      },
      {
        type: 'tip',
        md: '**k, t, p am Ende werden nicht „ausgesprochen“:** Der Mund schließt sich, aber es kommt kein Luftstoß. ขวด klingt wie „kùa(t)“ mit einem kurzen Stopp, nicht wie das deutsche „Kuat“ mit hörbarem t.',
      },
      {
        type: 'example',
        words: [w('ฟุตบอล', 'fút-bon', 'Fußball')],
        de: 'Fußball',
        note: 'ต am Ende = t, ล am Ende = n. Darum „bon“ und nicht „bol“.',
      },
      {
        type: 'example',
        words: [w('ประเทศ', 'bprà-têt', 'Land'), w('อังกฤษ', 'ang-grìt', 'England')],
        de: 'ศ und ษ am Ende = t',
        note: 'Auch die s-Laute ศ ษ ส werden am Silbenende zu t.',
      },
      {
        type: 'example',
        words: [w('คุณ', 'kun', 'du, Sie'), w('ฟุตบอล', 'fút-bon', 'Fußball'), w('อาหาร', 'aa-hǎan', 'Essen')],
        de: 'ณ, ล und ร am Ende = n',
      },
      {
        type: 'text',
        md: '**Warum ist das wichtig für den Ton?** Ob eine Silbe **lebend** oder **tot** ist, entscheidet der **Endlaut**, nicht der Buchstabe. พืช endet auf ช – das klingt als **t**, also ist die Silbe tot (Tiefklasse, lang → fallend: pûuet).',
      },
      {
        type: 'quiz',
        question: 'Wie klingt ญ in เชิญ (bitte, einladen)?',
        options: ['y', 'n', 'ng', 'stumm'],
        answer: 1,
        explain: 'ญ ist am Anfang y, am Ende aber n: chern.',
      },
      {
        type: 'quiz',
        question: 'Ist ภาพ (Bild) eine lebende oder tote Silbe?',
        options: ['lebend', 'tot'],
        answer: 1,
        explain: 'พ am Ende klingt als p – ein Verschlusslaut → tot. Tiefklasse, langer Vokal → fallend: pâap.',
      },
      {
        type: 'quiz',
        question: 'Welcher Endlaut gehört zu ล?',
        options: ['l', 'n', 't', 'k'],
        answer: 1,
        explain: 'Ein l am Silbenende gibt es im Thai nicht – ล, ร, ฬ, ณ und ญ werden dort zu n.',
      },
    ],
  },
  // ==================================================================
  {
    id: 'g-read-leading',
    title: 'Führendes ห und อ',
    icon: '🦮',
    summary: 'Ein stummes ห oder อ vor einem Tiefklasse-Konsonanten verändert dessen Klasse – und damit den Ton.',
    sections: [
      {
        type: 'text',
        md: 'Die Tiefklasse kann allein **keinen steigenden und keinen tiefen Ton** erzeugen. Für Wörter wie „Hund“ (mǎa) gibt es deshalb einen Trick: ein **stummes ห** davor.\n\n**ห นำ (hǒr nam, „führendes ห“):** Steht ห vor einem der Tiefklasse-Sonoranten **ง ญ น ม ย ร ล ว**, wird es **nicht gesprochen**. Die Silbe gilt aber als **Hochklasse**.',
      },
      {
        type: 'example',
        words: [w('มา', 'maa', 'kommen'), w('หมา', 'mǎa', 'Hund')],
        de: 'kommen – Hund',
        note: 'มา: Tiefklasse, lebend → mittel. หมา: Hochklasse durch ห, lebend → steigend.',
      },
      {
        type: 'table',
        head: ['Wort', 'Lesung', 'warum'],
        rows: [
          ['หนู', 'nǒo', 'Hochklasse, lebend → steigend'],
          ['หลาย', 'lǎai', 'Hochklasse, lebend → steigend'],
          ['หวาน', 'wǎan', 'Hochklasse, lebend → steigend'],
          ['หญิง', 'yǐng', 'Hochklasse, lebend → steigend'],
          ['หยุด', 'yùt', 'Hochklasse, tot → tief'],
          ['หน้า', 'nâa', 'Hochklasse + ้ → fallend'],
          ['หน่อย', 'nòi', 'Hochklasse + ่ → tief'],
        ],
      },
      {
        type: 'tip',
        md: '**Das Tonzeichen** steht bei ห นำ über dem **zweiten** Buchstaben: ห**น้**า, ห**น่**อย. Es zählt trotzdem nach der Hochklasse.\n\n**Achtung:** Vor anderen Buchstaben ist ห ein ganz normales **h**: **เห็น** (hěn), **หัว** (hǔa), **ห้า** (hâa).',
      },
      {
        type: 'text',
        md: '**อ นำ (or nam, „führendes อ“):** Das gibt es nur in **vier Wörtern** – alle mit ย. Das อ ist stumm, und die Silbe wird **Mittelklasse**:\n\n**อย่า** (yàa) – nicht! (Verbot)\n\n**อยู่** (yòo) – sein, sich befinden\n\n**อย่าง** (yàang) – Art, wie\n\n**อยาก** (yàak) – wollen\n\nMerksatz: อย่าอยู่อย่างอยาก – „Lebe nicht voller Begierden.“',
      },
      {
        type: 'example',
        words: [w('อย่า', 'yàa', 'nicht!', 'NEG'), w('ไป', 'bpai', 'gehen', 'V')],
        de: 'Geh nicht!',
        note: 'อ macht ย zur Mittelklasse: Mittelklasse + ่ → tief. Ohne อ wäre ย่า (yâa, Großmutter väterlicherseits) fallend.',
      },
      {
        type: 'build',
        prompt: 'Bilde: „Die Maus hält an.“',
        words: [w('หนู', 'nǒo', 'Maus', 'S'), w('หยุด', 'yùt', 'anhalten', 'V')],
        de: 'Die Maus hält an.',
      },
      {
        type: 'quiz',
        question: 'Wie liest man หลาย (viele)?',
        options: ['hà-laai', 'laai', 'lǎai', 'lâai'],
        answer: 2,
        explain: 'ห ist stumm und macht ล zur Hochklasse. Lebende Silbe → steigend: lǎai.',
      },
      {
        type: 'quiz',
        question: 'Welchen Ton hat อย่าง?',
        options: ['tief', 'fallend', 'steigend', 'mittel'],
        answer: 0,
        explain: 'อ นำ → Mittelklasse. Mittelklasse + mái èk = tief: yàang.',
      },
    ],
  },
  // ==================================================================
  {
    id: 'g-read-clusters',
    title: 'Konsonantenverbindungen',
    icon: '🔗',
    summary: 'Echte Cluster sprechen beide Konsonanten, falsche Cluster verwandeln oder verschlucken den zweiten.',
    sections: [
      {
        type: 'text',
        md: 'Thai kennt **echte Konsonantenverbindungen** (Cluster) am Silbenanfang. Der zweite Konsonant ist immer **ร, ล oder ว**:\n\n**กร กล กว · ขร ขล ขว · คร คล คว · ปร ปล · พร พล · ตร**\n\nBeide Laute werden **direkt hintereinander** gesprochen, ohne Vokal dazwischen: **ปลา** = bplaa (nicht bpà-laa).',
      },
      {
        type: 'text',
        md: '**Ton:** Er richtet sich nach dem **ersten** Konsonanten. Das Tonzeichen steht aber über dem **zweiten**:\n\n**กว้าง** – ก Mittelklasse + ้ → fallend: **gwâang**\n\n**ขวา** – ข Hochklasse, lebend → steigend: **kwǎa**\n\n**เพลง** – พ Tiefklasse, lebend → mittel: **pleng**',
      },
      {
        type: 'example',
        words: [w('พริก', 'prík', 'Chili'), w('กลอง', 'glorng', 'Trommel')],
        de: 'Chili, Trommel',
        note: 'พร und กล sind echte Cluster. พริก: Tiefklasse, kurz, tot → hoch.',
      },
      {
        type: 'tip',
        md: '**Im Alltag** werden r und l in Clustern oft verschluckt: ปลา klingt dann wie „bpaa“, ครับ wie „káp“. Zum Lesen lernst du aber die volle Form.',
      },
      {
        type: 'text',
        md: '**Falsche Cluster** sehen aus wie Cluster, klingen aber anders:\n\n**ทร → s** (wie ซ): **ทราย** (saai, Sand), **ทราบ** (sâap, wissen)\n\n**จร → j** (ร stumm): **จริง** (jing, wahr)\n\n**สร → s** (ร stumm): **สร้าง** (sâang, bauen), **เสร็จ** (sèt, fertig)\n\n**ศร → s** (ร stumm): **เศร้า** (sâo, traurig), **ศรี** (sěe, Glanz, Ehre)\n\nDer Ton richtet sich auch hier nach dem **ersten** Buchstaben: ท ist Tiefklasse (ทราย → mittel), ส und ศ sind Hochklasse.',
      },
      {
        type: 'table',
        head: ['Schreibung', 'klingt wie', 'Beispiel'],
        rows: [
          ['ทร', 's', 'ทราย saai'],
          ['จร', 'j', 'จริง jing'],
          ['สร', 's', 'สร้าง sâang'],
          ['ศร', 's', 'เศร้า sâo'],
        ],
      },
      {
        type: 'example',
        words: [w('จริง', 'jing', 'wirklich'), w('หรือ', 'rǔue', 'oder (Frage)', 'Q')],
        de: 'Wirklich?',
        note: 'Im Alltag meist zu จริงเหรอ (jing rěr) verkürzt.',
      },
      {
        type: 'quiz',
        question: 'Wie liest man ทราบ (wissen)?',
        options: ['tráap', 'sâap', 'tá-râap', 'sàap'],
        answer: 1,
        explain: 'ทร ist ein falsches Cluster = s. ท ist Tiefklasse, langer Vokal, tot → fallend: sâap.',
      },
      {
        type: 'quiz',
        question: 'Nach welchem Konsonanten richtet sich der Ton in กว้าง?',
        options: ['nach ก (erster Konsonant)', 'nach ว (zweiter Konsonant)', 'nach ง (Auslaut)'],
        answer: 0,
        explain: 'Bei Clustern zählt der erste Konsonant: ก ist Mittelklasse, mit ้ → fallend: gwâang.',
      },
    ],
  },
  // ==================================================================
  {
    id: 'g-read-silent',
    title: 'Stumme Zeichen: ์ und ็',
    icon: '🤫',
    summary: 'Das Zeichen ์ macht Buchstaben stumm, ็ macht Vokale kurz.',
    sections: [
      {
        type: 'text',
        md: '**การันต์ (gaa-ran) – ์:** Dieses kleine Zeichen über einem Konsonanten sagt: **„Diesen Buchstaben nicht sprechen!“** Es kommt vor allem in **Lehnwörtern** aus dem Sanskrit und Englischen vor.\n\n**เบียร์** = bia (Bier) – ร stumm\n\n**อาจารย์** = aa-jaan (Lehrer) – ย stumm\n\n**สัปดาห์** = sàp-daa (Woche) – ห stumm',
      },
      {
        type: 'text',
        md: 'Manchmal macht ์ sogar **zwei Buchstaben** stumm – den markierten und den davor:\n\n**จันทร์** = jan (Montag, Mond) – ทร stumm\n\n**ศุกร์** = sùk (Freitag) – nur ร stumm, ก ist Auslaut',
      },
      {
        type: 'example',
        words: [w('โทรศัพท์', 'toh-rá-sàp', 'Telefon')],
        de: 'Telefon',
        note: 'ท์ ist stumm, also endet ศัพ auf p: sàp. In โทร wird ร zusätzlich als Silbe rá gelesen.',
      },
      {
        type: 'tip',
        md: 'Der stumme Buchstabe hat **keinen Einfluss auf den Ton**. Lies das Wort einfach so, als stünde er gar nicht da: การ์ตูน → การ ตูน → gaa-dtoon.',
      },
      {
        type: 'text',
        md: '**ไม้ไต่คู้ (mái dtài-kúu) – ็:** Dieses Zeichen **kürzt den Vokal**. Es steht vor allem bei **เ-** und **แ-** in geschlossenen Silben:\n\n**เ-็** = kurzes e: **เด็ก** (dèk, Kind), **เป็น** (bpen, sein), **เล็ก** (lék, klein)\n\n**แ-็** = kurzes ae: **แข็ง** (kǎeng, hart)\n\nOhne ็ wären es lange Vokale.',
      },
      {
        type: 'example',
        words: [w('เห็น', 'hěn', 'sehen'), w('เด็ก', 'dèk', 'Kind')],
        de: '(jemand) sieht das Kind',
        note: 'เห็น: Auslaut น → lebend, Hochklasse → steigend. เด็ก: Auslaut ก → tot, Mittelklasse → tief.',
      },
      {
        type: 'text',
        md: '**Achtung bei der Tiefklasse:** Weil ็ den Vokal kürzt, ändert es bei toten Silben auch den Ton – kurz → **hoch**: **เล็ก** (lék). Mit langem Vokal wäre es fallend.\n\n**Sonderfall ก็** (auch): Hier steht ็ allein über dem Konsonanten. Gesprochen wird es **gôr** – mit fallendem Ton (siehe nächste Lektion).',
      },
      {
        type: 'quiz',
        question: 'Wie liest man อาจารย์ (Lehrer)?',
        options: ['aa-jaan-yor', 'aa-jaan', 'aa-jaa-rai', 'aa-jan'],
        answer: 1,
        explain: 'Das ์ macht ย stumm. ร am Ende klingt wie n: aa-jaan.',
      },
      {
        type: 'quiz',
        question: 'Was bewirkt ็ in เย็น (kühl)?',
        options: ['Es macht den Vokal kurz', 'Es macht น stumm', 'Es ist ein Tonzeichen'],
        answer: 0,
        explain: 'ไม้ไต่คู้ kürzt เ- zu einem kurzen e: yen.',
      },
    ],
  },
  // ==================================================================
  {
    id: 'g-read-special',
    title: 'Sonderschreibungen & Ausnahmen',
    icon: '🧩',
    summary: 'Einige Vokalzeichen sind Abkürzungen – und manche häufigen Wörter klingen anders, als sie geschrieben werden.',
    sections: [
      {
        type: 'text',
        md: '**-ำ = am:** Ein eigenes Zeichen für kurzes a + m. Die Silbe gilt als **lebend**: **คำ** (kam, Wort), **ทำ** (tam, machen), **ดำ** (dam, schwarz).\n\n**ไ- und ใ- = ai:** Beide klingen **genau gleich**. ใ- (mái múan) kommt nur in **etwa 20 Wörtern** vor, z. B. **ใจ** (Herz), **ใช่** (ja), **ใคร** (wer), **ใหม่** (neu), **ใหญ่** (groß), **ให้** (geben), **ใน** (in). Alle anderen ai-Wörter schreibt man mit ไ- (mái má-laai): **ไฟ**, **ไป**, **ไม่**.\n\n**เ-า = ao:** **เท้า** (táo, Fuß), **เรา** (rao, wir).',
      },
      {
        type: 'text',
        md: '**ฤ** ist ein Sanskrit-Zeichen und wird meist **rue** gelesen, manchmal auch **ri** oder **rer**:\n\n**ฤดู** (rúe-doo) – Jahreszeit\n\n**อังกฤษ** (ang-grìt) – England, Englisch',
      },
      {
        type: 'text',
        md: '**Häufige Wörter, die anders klingen als geschrieben:** Gerade die wichtigsten Alltagswörter weichen ab. Die Umschrift in dieser App zeigt immer die **gesprochene** Form.',
      },
      {
        type: 'table',
        head: ['Wort', 'nach Regel', 'gesprochen', 'Besonderheit'],
        rows: [
          ['ก็ (auch)', 'gòr', 'gôr', 'fallender Ton, langes o'],
          ['น้ำ (Wasser)', 'nám', 'náam', 'langer Vokal'],
          ['ไม้ (Holz)', 'mái', 'máai', 'langer Vokal'],
          ['เท่าไร (wie viel)', 'tâo-rai', 'tâo-rài', 'tiefer statt mittlerer Ton'],
          ['เขา (er/sie)', 'kǎo', 'kǎo / káo', 'umgangssprachlich oft hoch'],
          ['ฉัน (ich)', 'chǎn', 'chǎn / chán', 'umgangssprachlich oft hoch'],
          ['ไหม (Frage)', 'mǎi', 'mǎi / mái', 'umgangssprachlich oft hoch'],
          ['หรือ (oder)', 'rǔue', 'rǔue / rúe', 'umgangssprachlich oft kurz und hoch'],
          ['ครับ (höflich)', 'kráp', 'kráp / káp', 'r wird oft verschluckt'],
        ],
      },
      {
        type: 'example',
        words: [w('ผม', 'pǒm', 'ich', 'S'), w('ก็', 'gôr', 'auch', 'ADV'), w('ไป', 'bpai', 'gehen', 'V'), w('ครับ', 'kráp', '(höflich, Mann)', 'PART')],
        de: 'Ich gehe auch.',
        note: 'ก็ steht vor dem Verb und heißt „auch“ oder „dann“.',
      },
      {
        type: 'example',
        words: [w('กาแฟ', 'gaa-fae', 'Kaffee'), w('หรือ', 'rǔue', 'oder'), w('ชา', 'chaa', 'Tee')],
        de: 'Kaffee oder Tee?',
      },
      {
        type: 'tip',
        md: '**Lerne Ausnahmen als ganze Wörter.** Sie sind wenige, aber sehr häufig. Wenn du ก็, น้ำ, ไม้ und เท่าไร einmal richtig gehört hast, stolperst du beim Lesen nicht mehr darüber.',
      },
      {
        type: 'build',
        prompt: 'Bilde: „Der Fuß ist groß.“ (Fuß – groß)',
        words: [w('เท้า', 'táo', 'Fuß', 'S'), w('ใหญ่', 'yài', 'groß', 'ADJ')],
        de: 'Der Fuß ist groß.',
      },
      {
        type: 'quiz',
        question: 'Wie wird ก็ (auch) gesprochen?',
        options: ['gòr', 'gôr', 'gor', 'gó'],
        answer: 1,
        explain: 'ก็ ist eine Ausnahme: gesprochen mit fallendem Ton und langem o – gôr.',
      },
      {
        type: 'quiz',
        question: 'Welche Aussage stimmt?',
        options: ['ใ- und ไ- klingen gleich', 'ใ- klingt wie „oi“', 'ไ- ist ein kurzes a'],
        answer: 0,
        explain: 'Beide sind ai. ใ- steht nur in etwa 20 Wörtern – die muss man auswendig kennen.',
      },
    ],
  },
  // ==================================================================
  {
    id: 'g-read-practice',
    title: 'Lesen üben: Schritt für Schritt',
    icon: '🔍',
    summary: 'Mit fünf Schritten liest du auch lange, unbekannte Wörter richtig vor.',
    sections: [
      {
        type: 'text',
        md: 'Jetzt kombinierst du alle Regeln. Bei einem unbekannten Wort gehst du so vor:\n\n1. **Vokale finden** – jeder sichtbare Vokal ist eine Silbe. Übrige Konsonanten: unsichtbares **o** oder **a**?\n\n2. **Anlaut** jeder Silbe: Cluster? Falsches Cluster? Stummes ห/อ? Geliehene Klasse?\n\n3. **Auslaut** bestimmen: k, t, p, n, m, ng? Stumme Buchstaben (์) ignorieren.\n\n4. **Lebend oder tot?**\n\n5. **Ton** aus Klasse + Silbenart + Tonzeichen ableiten.',
      },
      {
        type: 'example',
        words: [w('ห้อง', 'hôrng', 'Raum'), w('สมุด', 'sà-mùt', 'Heft')],
        de: 'Bibliothek (ห้องสมุด, wörtlich „Heftraum“)',
        note: 'ห้อง: ห ist hier normales h (vor อ), Hochklasse + ้ → fallend. สมุด: ส + a = sà, มุด übernimmt die Hochklasse → tot → tief.',
      },
      {
        type: 'text',
        md: '**Neu: die Verbindungssilbe.** In Wörtern aus dem Pali/Sanskrit wird ein Auslaut oft **noch einmal** als Silbe mit kurzem a gelesen:\n\n**ผลไม้** = ผล + (ล)ะ + ไม้ → **pǒn-lá-máai** (Obst)\n\n**ศิลปะ** = ศิล + (ล)ะ + ปะ → **sǐn-lá-bpà** (Kunst)\n\n**จักรยาน** = จัก + (กร)ะ + ยาน → **jàk-grà-yaan** (Fahrrad)\n\n**มหาวิทยาลัย** = ม(ะ) + หา + วิท + (ท)ะ + ยา + ลัย → **má-hǎa-wít-tá-yaa-lai**\n\nDiese Silbe ist kurz und offen (tot): Tiefklasse → hoch (lá, tá), Mittelklasse → tief (grà).',
      },
      {
        type: 'example',
        words: [w('ผลไม้', 'pǒn-lá-máai', 'Obst')],
        de: 'Obst',
        note: 'ผล: ล als Auslaut = n, Hochklasse ผ, lebend → steigend. Dann lá (Tiefklasse ล, kurz → hoch). ไม้ wird lang gesprochen.',
      },
      {
        type: 'tip',
        md: 'Ob ein Wort eine Verbindungssilbe hat, kann man der Schrift **nicht immer ansehen** – das muss man pro Wort lernen. Typisch ist sie bei gelehrten Wörtern (Universität, Kunst, Geschichte).',
      },
      {
        type: 'quiz',
        question: 'Wie liest man ประตู (Tür)?',
        options: ['bpà-rá-dtoo', 'bprà-dtoo', 'bprǎ-dtoo', 'bprá-dtôo'],
        answer: 1,
        explain: 'ปร ist ein echtes Cluster mit unsichtbarem a: bprà (Mittelklasse, kurz → tief). ตู: lebend → mittel.',
      },
      {
        type: 'quiz',
        question: 'Wie liest man เสร็จ (fertig)?',
        options: ['sà-rèt', 'srèt', 'sèt', 'sět'],
        answer: 2,
        explain: 'สร = falsches Cluster (s), ็ kürzt den Vokal, จ am Ende = t → tot, Hochklasse → tief: sèt.',
      },
      {
        type: 'quiz',
        question: 'Welche Silbe von ขนมปัง (Brot) hat einen steigenden Ton?',
        options: ['ขะ (kà)', 'หนม (nǒm)', 'ปัง (bpang)'],
        answer: 1,
        explain: 'ข (Hochklasse) gibt seine Klasse an นม weiter: lebend → steigend: kà-nǒm-bpang.',
      },
    ],
  },
]

export const readingChapter: Chapter = {
  id: 'k1r',
  title: 'Lesen lernen',
  subtitle: 'Leseregeln: Töne, unsichtbare Vokale, Cluster und Ausnahmen',
  icon: '📖',
  color: '#00a8a8',
  lessons: [
    {
      id: 'k1r-l1',
      title: 'Lebend & tot',
      subtitle: 'Ton ohne Tonzeichen',
      icon: '💓',
      type: 'vocab',
      focus: 'reading',
      grammar: 'g-read-live-dead',
      items: ['r-live-kaa', 'r-live-hin', 'r-live-yaao', 'r-dead-jap', 'r-dead-piik', 'r-dead-khap', 'r-dead-phak', 'r-dead-miit'],
    },
    {
      id: 'k1r-l2',
      title: 'Tonzeichen',
      subtitle: '่ ้ ๊ ๋ in Aktion',
      icon: '🎚️',
      type: 'vocab',
      focus: 'reading',
      grammar: 'g-read-tone-marks',
      items: ['r-mark-jaai', 'r-mark-tuu', 'r-mark-buai', 'r-mark-kuaytiao', 'r-mark-thaai', 'r-mark-thuai', 'r-mark-rom', 'r-mark-lin'],
    },
    {
      id: 'k1r-l3',
      title: 'Unsichtbare Vokale',
      subtitle: 'o, a und ร am Ende',
      icon: '👻',
      type: 'vocab',
      focus: 'reading',
      grammar: 'g-read-hidden-vowels',
      items: ['r-hid-nom', 'r-hid-mot', 'r-hid-thanon', 'r-hid-khanom', 'r-hid-sanuk', 'r-hid-chalaat', 'r-hid-aahaan', 'r-hid-kankrai'],
    },
    {
      id: 'k1r-l4',
      title: 'Auslaute',
      subtitle: 'k, t, p, n, m, ng',
      icon: '🔚',
      type: 'vocab',
      focus: 'reading',
      grammar: 'g-read-finals',
      items: ['r-fin-khuat', 'r-fin-phuuet', 'r-fin-phiset', 'r-fin-mongkon', 'r-fin-choen', 'r-fin-waan', 'r-fin-phaap', 'r-fin-lek'],
    },
    {
      id: 'k1r-l5',
      title: 'Führendes ห und อ',
      subtitle: 'Stumme Helfer für den Ton',
      icon: '🦮',
      type: 'vocab',
      focus: 'reading',
      grammar: 'g-read-leading',
      items: ['r-lead-nuu', 'r-lead-laai', 'r-lead-ying', 'r-lead-yut', 'r-lead-mon', 'r-lead-wai', 'r-lead-muak', 'r-lead-yaang'],
    },
    {
      id: 'k1r-l6',
      title: 'Cluster',
      subtitle: 'Echte und falsche Verbindungen',
      icon: '🔗',
      type: 'vocab',
      focus: 'reading',
      grammar: 'g-read-clusters',
      items: ['r-cl-prik', 'r-cl-pleng', 'r-cl-klong', 'r-cl-kwaang', 'r-cl-saang', 'r-cl-saap', 'r-cl-jing', 'r-cl-sao'],
    },
    {
      id: 'k1r-l7',
      title: 'Stumme Zeichen',
      subtitle: '์ und ็',
      icon: '🤫',
      type: 'vocab',
      focus: 'reading',
      grammar: 'g-read-silent',
      items: ['r-sil-aajaan', 'r-sil-yak', 'r-sil-thorasap', 'r-sil-kaatuun', 'r-sil-dek', 'r-sil-hen', 'r-sil-khaeng', 'r-sil-yen'],
    },
    {
      id: 'k1r-l8',
      title: 'Sonderfälle',
      subtitle: '-ำ, ใ-/ไ-, เ-า, ฤ und Ausnahmen',
      icon: '🧩',
      type: 'vocab',
      focus: 'reading',
      grammar: 'g-read-special',
      items: ['r-sp-kam', 'r-sp-jai', 'r-sp-fai', 'r-sp-thao', 'r-sp-ruedoo', 'r-sp-kor', 'r-sp-rue', 'r-sp-taorai'],
    },
    {
      id: 'k1r-l9',
      title: 'Lesen üben',
      subtitle: 'Alle Regeln gemischt',
      icon: '🔍',
      type: 'vocab',
      focus: 'reading',
      grammar: 'g-read-practice',
      items: ['r-mix-khanompang', 'r-mix-university', 'r-mix-library', 'r-mix-fruit', 'r-mix-door', 'r-mix-bicycle', 'r-mix-set', 'r-mix-art'],
    },
  ],
}
