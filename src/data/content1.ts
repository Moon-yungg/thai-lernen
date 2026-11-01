// Kapitel 2–5: Begrüßung, Vorstellen, Zahlen & Zeit, Alltag
// Umschrift: Paiboon-Stil mit Tonzeichen (siehe types.ts).
import type { Item, Chapter, Kind } from './types'

type Extra = Partial<Omit<Item, 'id' | 'th' | 'rom' | 'de' | 'kind' | 'tokens'>>

/** Einzelwort / Zahl */
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
const n = (id: string, th: string, rom: string, de: string, extra: Extra = {}) => w(id, th, rom, de, extra, 'number')

export const items1: Item[] = [
  // ======================= Kapitel 2: Begrüßung & Höflichkeit =======================
  // L1
  w('k2-hello', 'สวัสดี', 'sà-wàt-dee', 'Hallo', {
    alt: ['Guten Tag', 'Hi', 'Tschüss', 'Auf Wiedersehen', 'Grüß Gott', 'Servus'],
    emoji: '👋',
    note: 'Für Begrüßung und Abschied – zu jeder Tageszeit.',
  }),
  w('k2-krap', 'ครับ', 'kráp', 'höflich (Mann)', {
    alt: ['ja', 'Höflichkeitswort', 'Höflichkeitspartikel'],
    note: 'Männer hängen ครับ an fast jeden Satz. Allein heißt es auch „ja, verstanden“.',
  }),
  w('k2-ka', 'ค่ะ', 'kâ', 'höflich (Frau)', {
    alt: ['ja', 'Höflichkeitswort', 'Höflichkeitspartikel'],
    note: 'Frauen sagen ค่ะ, in Fragen คะ (ká). Du als Mann sagst ครับ.',
  }),
  w('k2-thanks', 'ขอบคุณ', 'kòp-kun', 'danke', {
    alt: ['Danke', 'Dankeschön', 'vielen Dank'],
    emoji: '🙏',
  }),
  w('k2-sorry', 'ขอโทษ', 'kǒr-tôht', 'Entschuldigung', {
    alt: ['Verzeihung', 'Sorry', 'Entschuldigen Sie', 'Tut mir leid'],
    emoji: '🙇',
    note: 'Auch um jemanden anzusprechen, z.B. eine Bedienung.',
  }),
  p('k2-maipenrai', 'ไม่|เป็น|ไร', 'mâi bpen rai', 'macht nichts', {
    alt: ['kein Problem', 'gern geschehen', 'bitte', 'schon gut', 'keine Ursache'],
    note: 'Thailands Lebensmotto: Antwort auf „Danke“ UND auf „Entschuldigung“.',
  }),
  w('k2-yes', 'ใช่', 'châi', 'ja', {
    alt: ['stimmt', 'richtig', 'genau'],
    emoji: '✅',
    note: 'Bestätigt eine Aussage („richtig“). Oft reicht einfach ครับ.',
  }),
  p('k2-no', 'ไม่|ใช่', 'mâi châi', 'nein', {
    alt: ['stimmt nicht', 'falsch', 'nicht richtig'],
    emoji: '❌',
    note: 'Wörtlich „nicht richtig“.',
  }),
  // L2
  s('k2-s-hello', 'สวัสดี|ครับ', 'sà-wàt-dee kráp', 'Hallo!', { alt: ['Guten Tag!', 'Hallo', 'Guten Tag'] }),
  s('k2-s-thanks', 'ขอบคุณ|ครับ', 'kòp-kun kráp', 'Danke!', { alt: ['Danke', 'Dankeschön'] }),
  s('k2-s-sorry', 'ขอโทษ|ครับ', 'kǒr-tôht kráp', 'Entschuldigung!', {
    alt: ['Entschuldigung', 'Verzeihung', 'Tut mir leid'],
  }),
  s('k2-s-maipenrai', 'ไม่|เป็น|ไร|ครับ', 'mâi bpen rai kráp', 'Macht nichts!', {
    alt: ['Kein Problem', 'Gern geschehen', 'Schon gut', 'Macht nichts'],
  }),
  s('k2-s-yes', 'ใช่|ครับ', 'châi kráp', 'Ja, stimmt.', { alt: ['Ja', 'Stimmt', 'Ja, richtig', 'Genau'] }),
  s('k2-s-no', 'ไม่|ใช่|ครับ', 'mâi châi kráp', 'Nein.', { alt: ['Nein', 'Stimmt nicht', 'Nein, stimmt nicht'] }),
  // L3
  w('k2-kun', 'คุณ', 'kun', 'Sie / du', {
    alt: ['Sie', 'du', 'Ihnen', 'dich', 'dir'],
    note: 'Höfliches „du/Sie“ für alle. Auch vor Vornamen: คุณเบน = Herr Ben.',
  }),
  w('k2-sabai', 'สบาย', 'sà-baai', 'wohl, bequem', {
    alt: ['wohl', 'bequem', 'gemütlich', 'entspannt'],
    note: 'Thai-Lebensgefühl: สบายๆ = locker, entspannt.',
  }),
  w('k2-dee', 'ดี', 'dee', 'gut', { alt: ['schön', 'fein'], emoji: '👍' }),
  p('k2-sabaidee', 'สบาย|ดี', 'sà-baai dee', 'mir geht’s gut', {
    alt: ['gut', 'Es geht mir gut', 'Mir geht es gut', 'wohlauf'],
  }),
  w('k2-mai', 'ไหม', 'mǎi', 'Fragewort (ja/nein)', {
    alt: ['Frage', 'Fragepartikel', '?'],
    note: 'Steht am Satzende und macht aus einer Aussage eine Ja/Nein-Frage.',
  }),
  w('k2-maak', 'มาก', 'mâak', 'sehr', { alt: ['viel', 'viele'] }),
  w('k2-na', 'นะ', 'ná', 'Weichmacher (ja/doch)', {
    alt: ['ja', 'doch', 'mal', 'Partikel'],
    note: 'Macht Sätze freundlicher und weicher, wie dt. „ja“, „mal“, „doch“.',
  }),
  w('k2-muean', 'เหมือนกัน', 'měuan gan', 'ebenfalls', {
    alt: ['gleichfalls', 'auch', 'genauso', 'gleich'],
  }),
  // L4
  s('k2-s-howareyou', 'สบาย|ดี|ไหม|ครับ', 'sà-baai dee mǎi kráp', 'Wie geht’s?', {
    alt: ['Wie geht es Ihnen?', 'Wie geht es dir?', 'Geht es dir gut?', 'Geht es Ihnen gut?', 'Wie gehts?'],
  }),
  s('k2-s-fine', 'สบาย|ดี|ครับ', 'sà-baai dee kráp', 'Mir geht’s gut.', {
    alt: ['Gut.', 'Es geht mir gut.', 'Mir geht es gut.', 'Gut'],
  }),
  s('k2-s-andyou', 'แล้ว|คุณ|ล่ะ|ครับ', 'láew kun lâ kráp', 'Und Ihnen?', {
    alt: ['Und dir?', 'Und du?', 'Und Sie?'],
    note: 'แล้ว…ล่ะ = „und was ist mit …?“',
  }),
  s('k2-s-verygood', 'ดี|มาก|ครับ', 'dee mâak kráp', 'Sehr gut.', { alt: ['Sehr gut!', 'Sehr gut'] }),
  s('k2-s-thanksmuch', 'ขอบคุณ|มาก|ครับ', 'kòp-kun mâak kráp', 'Vielen Dank!', {
    alt: ['Danke sehr', 'Dankeschön', 'Vielen Dank', 'Danke vielmals'],
  }),
  s('k2-s-maipenraina', 'ไม่|เป็น|ไร|นะ|ครับ', 'mâi bpen rai ná kráp', 'Macht doch nichts.', {
    alt: ['Macht nichts', 'Kein Problem', 'Schon gut', 'Ist doch kein Problem'],
  }),
  // L5
  w('k2-yindee', 'ยินดี', 'yin-dee', 'erfreut', {
    alt: ['froh', 'gern', 'gerne'],
    note: 'ยินดี allein heißt auch „gern geschehen“.',
  }),
  w('k2-roojak', 'รู้จัก', 'róo-jàk', 'kennen', { alt: ['kennenlernen', 'bekannt'] }),
  p('k2-nicetomeet', 'ยินดี|ที่|ได้|รู้จัก', 'yin-dee têe dâai róo-jàk', 'Freut mich', {
    alt: ['Freut mich, Sie kennenzulernen', 'Schön, dich kennenzulernen', 'Angenehm', 'Sehr erfreut'],
    emoji: '🤝',
    note: 'Wörtlich: „erfreut, dass ich (Sie) kennenlernen durfte“.',
  }),
  p('k2-bye', 'ลา|ก่อน', 'laa gòrn', 'Lebewohl', {
    alt: ['Auf Wiedersehen', 'Tschüss', 'Leb wohl'],
    note: 'Klingt eher endgültig – im Alltag sagt man meist สวัสดี oder ไปก่อนนะ.',
  }),
  p('k2-seeyou', 'แล้ว|พบ|กัน|ใหม่', 'láew póp gan mài', 'Bis bald', {
    alt: ['Auf Wiedersehen', 'Bis zum nächsten Mal', 'Wir sehen uns', 'Bis dann'],
    note: 'Wörtlich: „dann treffen wir uns wieder“.',
  }),
  w('k2-goodluck', 'โชคดี', 'chôhk dee', 'Viel Glück', {
    alt: ['Alles Gute', 'Glück', 'Mach’s gut', 'Machs gut'],
    emoji: '🍀',
    note: 'Beliebter Abschiedsgruß.',
  }),
  w('k2-goodnight', 'ฝันดี', 'fǎn dee', 'Gute Nacht', {
    alt: ['Träum süß', 'Schlaf gut', 'Süße Träume'],
    emoji: '🌙',
    note: 'Wörtlich: „träum gut“.',
  }),
  p('k2-gofirst', 'ไป|ก่อน|นะ', 'bpai gòrn ná', 'Ich geh dann mal', {
    alt: ['Ich gehe jetzt', 'Ich muss los', 'Tschüss', 'Ich gehe dann'],
    note: 'Wörtlich: „(ich) gehe zuerst“ – sehr natürlicher Abschied.',
  }),
  // L6
  s('k2-s-nicetomeet', 'ยินดี|ที่|ได้|รู้จัก|ครับ', 'yin-dee têe dâai róo-jàk kráp', 'Freut mich, Sie kennenzulernen.', {
    alt: ['Freut mich', 'Schön, dich kennenzulernen', 'Freut mich, dich kennenzulernen', 'Angenehm'],
  }),
  s('k2-s-metoo', 'ยินดี|ที่|ได้|รู้จัก|เหมือนกัน|ครับ', 'yin-dee têe dâai róo-jàk měuan gan kráp', 'Freut mich ebenfalls.', {
    alt: ['Mich auch', 'Ebenfalls', 'Freut mich auch', 'Gleichfalls'],
  }),
  s('k2-s-bye', 'ลา|ก่อน|ครับ', 'laa gòrn kráp', 'Auf Wiedersehen!', { alt: ['Lebewohl', 'Tschüss', 'Auf Wiedersehen'] }),
  s('k2-s-seeyou', 'แล้ว|พบ|กัน|ใหม่|นะ|ครับ', 'láew póp gan mài ná kráp', 'Bis bald!', {
    alt: ['Bis bald', 'Wir sehen uns!', 'Bis zum nächsten Mal', 'Bis dann'],
  }),
  s('k2-s-goodluck', 'โชคดี|นะ|ครับ', 'chôhk dee ná kráp', 'Viel Glück!', {
    alt: ['Alles Gute!', 'Mach’s gut!', 'Viel Glück', 'Alles Gute'],
  }),
  s('k2-s-gofirst', 'ไป|ก่อน|นะ|ครับ', 'bpai gòrn ná kráp', 'Ich geh dann mal!', {
    alt: ['Ich gehe jetzt', 'Ich muss los', 'Ich gehe dann mal'],
  }),
  s('k2-s-sorryna', 'ขอโทษ|นะ|ครับ', 'kǒr-tôht ná kráp', 'Entschuldigen Sie bitte.', {
    alt: ['Entschuldigung', 'Verzeihung', 'Entschuldige bitte', 'Tut mir leid'],
  }),

  // ======================= Kapitel 3: Ich & Du – Vorstellen =======================
  // L1
  w('k3-phom', 'ผม', 'pǒm', 'ich (Mann)', {
    alt: ['ich', 'mich', 'mir'],
    note: 'Männer sagen ผม. Gleiches Wort bedeutet auch „Haar“.',
  }),
  w('k3-chan', 'ฉัน', 'chǎn', 'ich (Frau)', {
    alt: ['ich', 'mich', 'mir'],
    note: 'Wird im Alltag fast nur von Frauen benutzt.',
  }),
  w('k3-kao', 'เขา', 'kǎo', 'er / sie', {
    alt: ['er', 'sie', 'ihn', 'ihm'],
    note: 'Steigender Ton! Mit fallendem Ton (เข้า kâo) heißt es „hineingehen“.',
  }),
  w('k3-ter', 'เธอ', 'ter', 'sie / du', {
    alt: ['sie', 'du', 'ihr'],
    note: 'Für Frauen („sie“) oder vertrautes „du“.',
  }),
  w('k3-rao', 'เรา', 'rao', 'wir', { alt: ['uns'] }),
  w('k3-puakkao', 'พวกเขา', 'pûak kǎo', 'sie (Plural)', {
    alt: ['sie', 'die', 'ihnen'],
    note: 'พวก macht den Plural: พวกเขา = „die da“, พวกเรา = „wir alle“.',
  }),
  // L2
  w('k3-chue', 'ชื่อ', 'chêu', 'Name / heißen', { alt: ['Name', 'heißen', 'heiße'] }),
  w('k3-arai', 'อะไร', 'à-rai', 'was', { alt: ['Was?', 'welche'], note: 'Fragewörter stehen meist am Satzende.' }),
  p('k3-maajak', 'มา|จาก', 'maa jàak', 'kommen aus', { alt: ['aus', 'stammen aus', 'kommt aus'] }),
  w('k3-nai', 'ไหน', 'nǎi', 'wo / welche', {
    alt: ['wo', 'welche', 'welcher', 'welches', 'woher'],
    note: 'ที่ไหน = wo, มาจากไหน = woher.',
  }),
  w('k3-kon', 'คน', 'kon', 'Mensch', { alt: ['Person', 'Leute', 'Menschen'], emoji: '🧍' }),
  w('k3-bpen', 'เป็น', 'bpen', 'sein', {
    alt: ['ist', 'bin', 'sind', 'bist'],
    note: 'Verbindet mit Beruf oder Nationalität: ผมเป็นครู = Ich bin Lehrer.',
  }),
  w('k3-thai', 'ไทย', 'tai', 'thailändisch', { alt: ['Thai', 'Thailand', 'thailändisch'] }),
  // L3
  s('k3-s-myname', 'ผม|ชื่อ|เบน|ครับ', 'pǒm chêu ben kráp', 'Ich heiße Ben.', {
    alt: ['Mein Name ist Ben.', 'Ich heiße Ben', 'Ich bin Ben.'],
    note: 'Setze einfach deinen eigenen Namen ein.',
  }),
  s('k3-s-yourname', 'คุณ|ชื่อ|อะไร|ครับ', 'kun chêu à-rai kráp', 'Wie heißen Sie?', {
    alt: ['Wie heißt du?', 'Wie ist Ihr Name?', 'Wie ist dein Name?'],
    note: 'Wörtlich: „Sie heißen was?“ – das Fragewort bleibt an der Stelle der Antwort.',
  }),
  s('k3-s-hisname', 'เขา|ชื่อ|อะไร|ครับ', 'kǎo chêu à-rai kráp', 'Wie heißt er?', {
    alt: ['Wie heißt sie?', 'Wie ist sein Name?', 'Wie ist ihr Name?'],
  }),
  s('k3-s-fromwhere', 'คุณ|มา|จาก|ไหน|ครับ', 'kun maa jàak nǎi kráp', 'Woher kommen Sie?', {
    alt: ['Woher kommst du?', 'Woher sind Sie?', 'Wo kommen Sie her?'],
  }),
  s('k3-s-hethai', 'เขา|เป็น|คน|ไทย', 'kǎo bpen kon tai', 'Er ist Thai.', {
    alt: ['Sie ist Thai.', 'Er ist Thailänder.', 'Sie ist Thailänderin.'],
  }),
  s('k3-s-youthai', 'คุณ|เป็น|คน|ไทย|ไหม|ครับ', 'kun bpen kon tai mǎi kráp', 'Sind Sie Thai?', {
    alt: ['Bist du Thai?', 'Sind Sie Thailänder?', 'Bist du Thailänder?', 'Sind Sie Thailänderin?'],
  }),
  // L4
  w('k3-germany', 'ประเทศเยอรมนี', 'bprà-têt yer-rá-má-nee', 'Deutschland', {
    emoji: '🇩🇪',
    note: 'ประเทศ = Land. Im Alltag sagt man oft einfach เยอรมัน.',
  }),
  w('k3-thailand', 'ประเทศไทย', 'bprà-têt tai', 'Thailand', { emoji: '🇹🇭' }),
  w('k3-german', 'เยอรมัน', 'yer-rá-man', 'deutsch', { alt: ['Deutsch', 'Deutscher', 'Deutschland'] }),
  w('k3-england', 'อังกฤษ', 'ang-grìt', 'englisch / England', {
    alt: ['Englisch', 'England', 'englisch'],
    emoji: '🇬🇧',
  }),
  w('k3-paasaa', 'ภาษา', 'paa-sǎa', 'Sprache', { note: 'ภาษาไทย = Thai, ภาษาเยอรมัน = Deutsch (Sprache).' }),
  w('k3-poot', 'พูด', 'pôot', 'sprechen', { alt: ['reden', 'sagen'], emoji: '🗣️' }),
  w('k3-dai', 'ได้', 'dâai', 'können', {
    alt: ['kann', 'dürfen', 'darf', 'okay'],
    note: 'Steht HINTER dem Verb: พูดได้ = kann sprechen. ได้ครับ allein = „geht klar“.',
  }),
  w('k3-nitnoi', 'นิดหน่อย', 'nít-nòi', 'ein bisschen', {
    alt: ['ein wenig', 'etwas', 'bisschen', 'wenig'],
    emoji: '🤏',
  }),
  w('k3-kaojai', 'เข้าใจ', 'kâo-jai', 'verstehen', {
    alt: ['versteht', 'kapieren', 'verstanden'],
    emoji: '💡',
    note: 'Wörtlich: „ins Herz gehen“.',
  }),
  // L5
  s('k3-s-german', 'ผม|เป็น|คน|เยอรมัน|ครับ', 'pǒm bpen kon yer-rá-man kráp', 'Ich bin Deutscher.', {
    alt: ['Ich bin Deutscher', 'Ich komme aus Deutschland.'],
  }),
  s('k3-s-fromgermany', 'ผม|มา|จาก|ประเทศ|เยอรมนี|ครับ', 'pǒm maa jàak bprà-têt yer-rá-má-nee kráp', 'Ich komme aus Deutschland.', {
    alt: ['Ich bin aus Deutschland.', 'Ich stamme aus Deutschland.'],
  }),
  s('k3-s-littlethai', 'ผม|พูด|ภาษา|ไทย|ได้|นิดหน่อย|ครับ', 'pǒm pôot paa-sǎa tai dâai nít-nòi kráp', 'Ich spreche ein bisschen Thai.', {
    alt: ['Ich kann ein bisschen Thai sprechen.', 'Ich spreche ein wenig Thai.', 'Ich kann ein wenig Thai.'],
  }),
  s('k3-s-english', 'คุณ|พูด|ภาษา|อังกฤษ|ได้|ไหม|ครับ', 'kun pôot paa-sǎa ang-grìt dâai mǎi kráp', 'Sprechen Sie Englisch?', {
    alt: ['Können Sie Englisch sprechen?', 'Sprichst du Englisch?', 'Kannst du Englisch?'],
  }),
  s('k3-s-dontunderstand', 'ผม|ไม่|เข้าใจ|ครับ', 'pǒm mâi kâo-jai kráp', 'Ich verstehe nicht.', {
    alt: ['Ich verstehe das nicht.', 'Ich verstehe nicht', 'Verstehe ich nicht.'],
  }),
  s('k3-s-slowly', 'พูด|ช้าๆ|หน่อย|ได้|ไหม|ครับ', 'pôot cháa-cháa nòi dâai mǎi kráp', 'Können Sie bitte langsamer sprechen?', {
    alt: ['Bitte langsamer sprechen.', 'Sprich bitte langsamer.', 'Können Sie langsam sprechen?'],
    note: 'ๆ wiederholt das Wort davor: ช้าๆ = schön langsam. หน่อย macht die Bitte höflich.',
  }),
  // L6
  w('k3-work', 'ทำงาน', 'tam-ngaan', 'arbeiten', { alt: ['Arbeit', 'arbeitet'], emoji: '💼', note: 'ทำ = machen, งาน = Arbeit.' }),
  w('k3-teacher', 'ครู', 'kroo', 'Lehrer', { alt: ['Lehrerin'], emoji: '🧑‍🏫' }),
  w('k3-doctor', 'หมอ', 'mǒr', 'Arzt', { alt: ['Ärztin', 'Doktor'], emoji: '🧑‍⚕️' }),
  w('k3-student', 'นักเรียน', 'nák-rian', 'Schüler', {
    alt: ['Schülerin', 'Student', 'Studentin'],
    emoji: '🧑‍🎓',
    note: 'นัก = „-er“ (Person, die etwas tut) + เรียน = lernen.',
  }),
  w('k3-engineer', 'วิศวกร', 'wít-sà-wá-gorn', 'Ingenieur', { alt: ['Ingenieurin'], emoji: '👷' }),
  w('k3-employee', 'พนักงานบริษัท', 'pá-nák-ngaan bor-rí-sàt', 'Angestellter', {
    alt: ['Büroangestellter', 'Firmenangestellter', 'Angestellte'],
    emoji: '🧑‍💼',
    note: 'พนักงาน = Angestellter, บริษัท = Firma.',
  }),
  w('k3-police', 'ตำรวจ', 'dtam-rùat', 'Polizist', { alt: ['Polizei', 'Polizistin'], emoji: '👮' }),
  w('k3-cook', 'พ่อครัว', 'pôr-krua', 'Koch', { emoji: '🧑‍🍳', note: 'Wörtlich „Küchenvater“. Köchin: แม่ครัว (mâe-krua).' }),
  // L7
  s('k3-s-yourjob', 'คุณ|ทำงาน|อะไร|ครับ', 'kun tam-ngaan à-rai kráp', 'Was arbeiten Sie?', {
    alt: ['Was machst du beruflich?', 'Was sind Sie von Beruf?', 'Was arbeitest du?', 'Was machen Sie beruflich?'],
  }),
  s('k3-s-engineer', 'ผม|เป็น|วิศวกร|ครับ', 'pǒm bpen wít-sà-wá-gorn kráp', 'Ich bin Ingenieur.', { alt: ['Ich bin Ingenieur'] }),
  s('k3-s-teacher', 'เขา|เป็น|ครู', 'kǎo bpen kroo', 'Er ist Lehrer.', { alt: ['Sie ist Lehrerin.', 'Er ist Lehrer'] }),
  s('k3-s-doctor', 'เธอ|เป็น|หมอ', 'ter bpen mǒr', 'Sie ist Ärztin.', { alt: ['Du bist Arzt.', 'Sie ist Ärztin'] }),
  s('k3-s-police', 'พวกเขา|เป็น|ตำรวจ', 'pûak kǎo bpen dtam-rùat', 'Sie sind Polizisten.', {
    alt: ['Sie sind Polizisten', 'Das sind Polizisten.'],
  }),
  s('k3-s-employee', 'ผม|เป็น|พนักงาน|บริษัท|ครับ', 'pǒm bpen pá-nák-ngaan bor-rí-sàt kráp', 'Ich bin Angestellter.', {
    alt: ['Ich bin Firmenangestellter.', 'Ich bin Büroangestellter.'],
  }),
  s('k3-s-wegerman', 'เรา|เป็น|คน|เยอรมัน', 'rao bpen kon yer-rá-man', 'Wir sind Deutsche.', {
    alt: ['Wir sind Deutsche', 'Wir kommen aus Deutschland.'],
  }),

  // ======================= Kapitel 4: Zahlen & Zeit =======================
  // L1
  n('k4-0', 'ศูนย์', 'sǒon', 'null', { alt: ['0'], emoji: '0️⃣', note: 'Thai-Ziffer: ๐' }),
  n('k4-1', 'หนึ่ง', 'nèung', 'eins', { alt: ['1', 'ein', 'eine'], emoji: '1️⃣', note: 'Thai-Ziffer: ๑' }),
  n('k4-2', 'สอง', 'sǒrng', 'zwei', { alt: ['2'], emoji: '2️⃣', note: 'Thai-Ziffer: ๒' }),
  n('k4-3', 'สาม', 'sǎam', 'drei', { alt: ['3'], emoji: '3️⃣', note: 'Thai-Ziffer: ๓' }),
  n('k4-4', 'สี่', 'sèe', 'vier', { alt: ['4'], emoji: '4️⃣', note: 'Thai-Ziffer: ๔' }),
  n('k4-5', 'ห้า', 'hâa', 'fünf', {
    alt: ['5'],
    emoji: '5️⃣',
    note: 'Thai-Ziffer: ๕. Im Chat bedeutet 555 „hahaha“!',
  }),
  // L2
  n('k4-6', 'หก', 'hòk', 'sechs', { alt: ['6'], emoji: '6️⃣', note: 'Thai-Ziffer: ๖' }),
  n('k4-7', 'เจ็ด', 'jèt', 'sieben', { alt: ['7'], emoji: '7️⃣', note: 'Thai-Ziffer: ๗' }),
  n('k4-8', 'แปด', 'bpàet', 'acht', { alt: ['8'], emoji: '8️⃣', note: 'Thai-Ziffer: ๘' }),
  n('k4-9', 'เก้า', 'gâo', 'neun', { alt: ['9'], emoji: '9️⃣', note: 'Thai-Ziffer: ๙. Glückszahl in Thailand.' }),
  n('k4-10', 'สิบ', 'sìp', 'zehn', {
    alt: ['10'],
    emoji: '🔟',
    note: 'Thai-Ziffer: ๑๐. 11 = สิบเอ็ด (sìp-èt), 12 = สิบสอง.',
  }),
  n('k4-20', 'ยี่สิบ', 'yêe-sìp', 'zwanzig', {
    alt: ['20'],
    note: 'Thai-Ziffer: ๒๐. Ausnahme: nicht „สองสิบ“! 21 = ยี่สิบเอ็ด.',
  }),
  n('k4-100', 'ร้อย', 'rói', 'hundert', {
    alt: ['100', 'einhundert'],
    emoji: '💯',
    note: 'Thai-Ziffer: ๑๐๐. Meist sagt man หนึ่งร้อย (nèung rói).',
  }),
  n('k4-1000', 'พัน', 'pan', 'tausend', {
    alt: ['1000', 'eintausend'],
    note: 'Thai-Ziffer: ๑๐๐๐. 2000 = สองพัน.',
  }),
  // L3
  w('k4-age', 'อายุ', 'aa-yú', 'Alter', { alt: ['alt', 'Lebensalter'], note: 'อายุ + Zahl + ปี = … Jahre alt.' }),
  w('k4-year', 'ปี', 'bpee', 'Jahr', { alt: ['Jahre'], emoji: '📅' }),
  w('k4-gee', 'กี่', 'gèe', 'wie viele', { alt: ['wieviele', 'wie viel'], note: 'Immer mit Zählwort: กี่คน = wie viele Personen?' }),
  w('k4-taorai', 'เท่าไหร่', 'tâo-rài', 'wie viel', {
    alt: ['wieviel', 'was kostet', 'wie viel kostet'],
    note: 'Fragt nach Preis oder Menge, steht am Satzende.',
  }),
  w('k4-baht', 'บาท', 'bàat', 'Baht', { alt: ['Baht (Währung)'], emoji: '💵', note: 'Thailändische Währung, Zeichen ฿.' }),
  w('k4-an', 'อัน', 'an', 'Stück (Zählwort)', {
    alt: ['Stück', 'Ding', 'Teil'],
    note: 'Allzweck-Zählwort für Dinge, wenn man das richtige nicht weiß.',
  }),
  w('k4-dtua', 'ตัว', 'dtua', 'Zählwort Tiere/Kleidung', {
    alt: ['Stück', 'Tier', 'Körper'],
    note: 'Für Tiere, Kleidung, Möbel: หมาสองตัว = zwei Hunde.',
  }),
  // L4
  s('k4-s-age30', 'ผม|อายุ|สามสิบ|ปี|ครับ', 'pǒm aa-yú sǎam-sìp bpee kráp', 'Ich bin 30 Jahre alt.', {
    alt: ['Ich bin dreißig Jahre alt.', 'Ich bin dreißig.', 'Ich bin 30.'],
  }),
  s('k4-s-howold', 'คุณ|อายุ|เท่าไหร่|ครับ', 'kun aa-yú tâo-rài kráp', 'Wie alt sind Sie?', { alt: ['Wie alt bist du?'] }),
  s('k4-s-howmuch', 'อัน|นี้|เท่าไหร่|ครับ', 'an née tâo-rài kráp', 'Was kostet das?', {
    alt: ['Wie viel kostet das?', 'Wie viel kostet das hier?', 'Was kostet das hier?'],
    note: 'นี้ = dieses. Die wichtigste Frage auf dem Markt!',
  }),
  s('k4-s-50baht', 'ห้าสิบ|บาท|ครับ', 'hâa-sìp bàat kráp', '50 Baht.', { alt: ['Fünfzig Baht.', '50 Baht', 'Fünfzig Baht'] }),
  s('k4-s-twopieces', 'ขอ|สอง|อัน|ครับ', 'kǒr sǒrng an kráp', 'Zwei Stück, bitte.', {
    alt: ['Ich nehme zwei.', 'Zwei bitte.', 'Ich hätte gern zwei.'],
    note: 'ขอ + Menge + Zählwort = „Ich hätte gern …“. Zählwort steht HINTER der Zahl.',
  }),
  s('k4-s-howmanypeople', 'กี่|คน|ครับ', 'gèe kon kráp', 'Wie viele Personen?', {
    alt: ['Für wie viele Personen?', 'Wie viele Leute?', 'Wie viele?'],
    note: 'Hört man im Restaurant ständig.',
  }),
  s('k4-s-twopeople', 'สอง|คน|ครับ', 'sǒrng kon kráp', 'Zwei Personen.', { alt: ['Für zwei.', 'Zwei Leute.', 'Zu zweit.'] }),
  // L5
  w('k4-day', 'วัน', 'wan', 'Tag', { alt: ['Tage'] }),
  w('k4-mon', 'วันจันทร์', 'wan jan', 'Montag', { note: 'จันทร์ = Mond – wie im Deutschen! Tagesfarbe: Gelb.' }),
  w('k4-tue', 'วันอังคาร', 'wan ang-kaan', 'Dienstag', { note: 'อังคาร = Mars. Tagesfarbe: Rosa.' }),
  w('k4-wed', 'วันพุธ', 'wan pút', 'Mittwoch', { note: 'พุธ = Merkur. Tagesfarbe: Grün.' }),
  w('k4-thu', 'วันพฤหัสบดี', 'wan pá-réu-hàt-sà-bor-dee', 'Donnerstag', {
    note: 'Im Alltag kurz: วันพฤหัส (wan pá-réu-hàt). พฤหัส = Jupiter.',
  }),
  w('k4-fri', 'วันศุกร์', 'wan sùk', 'Freitag', { note: 'ศุกร์ = Venus. Tagesfarbe: Hellblau.' }),
  w('k4-sat', 'วันเสาร์', 'wan sǎo', 'Samstag', { alt: ['Sonnabend'], note: 'เสาร์ = Saturn. Tagesfarbe: Lila.' }),
  w('k4-sun', 'วันอาทิตย์', 'wan aa-tít', 'Sonntag', { note: 'อาทิตย์ = Sonne – auch das Wort für „Woche“.' }),
  // L6
  w('k4-today', 'วันนี้', 'wan-née', 'heute', { note: 'วัน = Tag, นี้ = dieser.' }),
  w('k4-tomorrow', 'พรุ่งนี้', 'prûng-née', 'morgen', { alt: ['Morgen'] }),
  w('k4-yesterday', 'เมื่อวาน', 'mêua-waan', 'gestern', { alt: ['Gestern'] }),
  w('k4-now', 'ตอนนี้', 'dtorn-née', 'jetzt', { alt: ['gerade', 'nun', 'im Moment'] }),
  w('k4-morning', 'ตอนเช้า', 'dtorn-cháo', 'morgens', { alt: ['am Morgen', 'vormittags', 'Morgen'], emoji: '🌅' }),
  w('k4-evening', 'ตอนเย็น', 'dtorn-yen', 'abends', { alt: ['am Abend', 'Abend'], emoji: '🌆' }),
  w('k4-hour', 'ชั่วโมง', 'chûa-mohng', 'Stunde', { alt: ['Stunden'], emoji: '⏳' }),
  w('k4-mohng', 'โมง', 'mohng', 'Uhr (Uhrzeit)', {
    alt: ['Uhr'],
    emoji: '🕘',
    note: 'Thai zählen die Stunden je Tagesabschnitt: เก้าโมงเช้า = 9 Uhr morgens.',
  }),
  // L7
  s('k4-s-whatday', 'วันนี้|วัน|อะไร|ครับ', 'wan-née wan à-rai kráp', 'Welcher Tag ist heute?', {
    alt: ['Was ist heute für ein Tag?', 'Welcher Wochentag ist heute?'],
  }),
  s('k4-s-monday', 'วันนี้|วันจันทร์|ครับ', 'wan-née wan jan kráp', 'Heute ist Montag.', { alt: ['Heute ist Montag'] }),
  s('k4-s-tomorrowsat', 'พรุ่งนี้|วันเสาร์', 'prûng-née wan sǎo', 'Morgen ist Samstag.', {
    alt: ['Morgen ist Samstag', 'Morgen ist Sonnabend.'],
  }),
  s('k4-s-yesterdayfri', 'เมื่อวาน|วันศุกร์', 'mêua-waan wan sùk', 'Gestern war Freitag.', {
    alt: ['Gestern war Freitag', 'Gestern ist Freitag.'],
    note: 'Keine Zeitform nötig – das Zeitwort เมื่อวาน reicht.',
  }),
  s('k4-s-whattime', 'ตอนนี้|กี่|โมง|แล้ว|ครับ', 'dtorn-née gèe mohng láew kráp', 'Wie spät ist es jetzt?', {
    alt: ['Wie spät ist es?', 'Wie viel Uhr ist es?', 'Wie viel Uhr ist es jetzt?'],
  }),
  s('k4-s-nine', 'ตอนนี้|เก้า|โมง|เช้า|ครับ', 'dtorn-née gâo mohng cháo kráp', 'Jetzt ist es 9 Uhr morgens.', {
    alt: ['Es ist neun Uhr morgens.', 'Es ist 9 Uhr.', 'Jetzt ist es neun Uhr morgens.'],
  }),
  s('k4-s-seeyoutomorrow', 'แล้ว|พบ|กัน|พรุ่งนี้|นะ|ครับ', 'láew póp gan prûng-née ná kráp', 'Bis morgen!', {
    alt: ['Wir sehen uns morgen.', 'Bis morgen', 'Bis morgen dann!'],
  }),

  // ======================= Kapitel 5: Alltag =======================
  // L1
  w('k5-eat', 'กิน', 'gin', 'essen', { alt: ['isst', 'fressen'], emoji: '🍽️', note: 'กินข้าว = essen (wörtl. „Reis essen“).' }),
  w('k5-drink', 'ดื่ม', 'dèum', 'trinken', { alt: ['trinkt'], emoji: '🥤', note: 'Umgangssprachlich auch einfach กิน.' }),
  w('k5-go', 'ไป', 'bpai', 'gehen', { alt: ['fahren', 'hingehen', 'geht'], emoji: '🚶' }),
  w('k5-come', 'มา', 'maa', 'kommen', { alt: ['herkommen', 'kommt'], note: 'ไป = weg vom Sprecher, มา = zum Sprecher hin.' }),
  w('k5-sleep', 'นอน', 'norn', 'schlafen', { alt: ['liegen', 'schläft'], emoji: '😴' }),
  w('k5-learn', 'เรียน', 'rian', 'lernen', { alt: ['studieren', 'lernt'], emoji: '📚' }),
  w('k5-buy', 'ซื้อ', 'séu', 'kaufen', { alt: ['einkaufen', 'kauft'], emoji: '🛒' }),
  w('k5-see', 'ดู', 'doo', 'sehen', {
    alt: ['schauen', 'anschauen', 'ansehen', 'gucken'],
    emoji: '👀',
    note: 'ดู = bewusst anschauen (ดูทีวี). เห็น (hěn) = etwas sehen/bemerken.',
  }),
  // L2
  w('k5-like', 'ชอบ', 'chôrp', 'mögen', { alt: ['gern haben', 'mag', 'gefallen'], emoji: '❤️' }),
  w('k5-want', 'อยาก', 'yàak', 'wollen', {
    alt: ['möchten', 'Lust haben', 'will', 'möchte'],
    note: 'อยาก + Verb: อยากกิน = will essen.',
  }),
  w('k5-have', 'มี', 'mee', 'haben', { alt: ['es gibt', 'hat', 'habe'], note: 'มี heißt auch „es gibt“.' }),
  w('k5-khue', 'คือ', 'keu', 'sein (= ist gleich)', {
    alt: ['ist', 'sein', 'nämlich', 'das heißt'],
    note: 'Für Definitionen: นี่คือ… = Das ist… Für Beruf/Nationalität: เป็น, für Orte: อยู่.',
  }),
  w('k5-yoo', 'อยู่', 'yòo', 'sein (an einem Ort)', {
    alt: ['sich befinden', 'wohnen', 'sein', 'ist'],
    emoji: '📍',
    note: 'Für Orte: ผมอยู่ที่บ้าน = Ich bin zu Hause.',
  }),
  w('k5-not', 'ไม่', 'mâi', 'nicht', { alt: ['nein', 'kein', 'keine'], emoji: '🚫', note: 'Steht direkt VOR dem Verb oder Adjektiv.' }),
  w('k5-water', 'น้ำ', 'náam', 'Wasser', { alt: ['Getränk', 'Flüssigkeit'], emoji: '💧' }),
  w('k5-rice', 'ข้าว', 'kâao', 'Reis', { alt: ['Essen', 'Mahlzeit'], emoji: '🍚' }),
  // L3
  s('k5-s-eatrice', 'ผม|กิน|ข้าว|ครับ', 'pǒm gin kâao kráp', 'Ich esse.', { alt: ['Ich esse Reis.', 'Ich esse gerade.', 'Ich esse'] }),
  s('k5-s-wantwater', 'ผม|อยาก|ดื่ม|น้ำ|ครับ', 'pǒm yàak dèum náam kráp', 'Ich möchte Wasser trinken.', {
    alt: ['Ich will Wasser trinken.', 'Ich möchte Wasser.'],
  }),
  s('k5-s-havewater', 'คุณ|มี|น้ำ|ไหม|ครับ', 'kun mee náam mǎi kráp', 'Haben Sie Wasser?', {
    alt: ['Hast du Wasser?', 'Gibt es Wasser?'],
  }),
  s('k5-s-donthave', 'ไม่|มี|ครับ', 'mâi mee kráp', 'Haben wir nicht.', {
    alt: ['Gibt es nicht.', 'Habe ich nicht.', 'Nein, haben wir nicht.', 'Gibt es nicht'],
    note: 'Auf Ja/Nein-Fragen antwortet man mit dem Verb: มี / ไม่มี.',
  }),
  s('k5-s-dontwantgo', 'ผม|ไม่|อยาก|ไป|ครับ', 'pǒm mâi yàak bpai kráp', 'Ich will nicht gehen.', {
    alt: ['Ich möchte nicht gehen.', 'Ich will nicht hin.', 'Ich möchte nicht hingehen.'],
  }),
  s('k5-s-likethailand', 'ผม|ชอบ|ประเทศ|ไทย|ครับ', 'pǒm chôrp bprà-têt tai kráp', 'Ich mag Thailand.', {
    alt: ['Mir gefällt Thailand.', 'Ich liebe Thailand.'],
  }),
  s('k5-s-learnthai', 'ผม|เรียน|ภาษา|ไทย|ครับ', 'pǒm rian paa-sǎa tai kráp', 'Ich lerne Thai.', { alt: ['Ich lerne Thailändisch.'] }),
  // L4
  w('k5-house', 'บ้าน', 'bâan', 'Haus', { alt: ['Zuhause', 'zu Hause', 'Heim', 'das Haus'], emoji: '🏠' }),
  w('k5-toilet', 'ห้องน้ำ', 'hôrng-náam', 'Toilette', {
    alt: ['Bad', 'Badezimmer', 'WC', 'Klo', 'die Toilette'],
    emoji: '🚻',
    note: 'Wörtlich „Wasserzimmer“ (ห้อง = Zimmer).',
  }),
  w('k5-shop', 'ร้าน', 'ráan', 'Laden', {
    alt: ['Geschäft', 'Shop', 'der Laden'],
    emoji: '🏪',
    note: 'ร้านอาหาร = Restaurant, ร้านกาแฟ = Café.',
  }),
  w('k5-hospital', 'โรงพยาบาล', 'rohng-pá-yaa-baan', 'Krankenhaus', { alt: ['Klinik', 'Spital', 'das Krankenhaus'], emoji: '🏥' }),
  w('k5-hotel', 'โรงแรม', 'rohng-raem', 'Hotel', { alt: ['das Hotel'], emoji: '🏨' }),
  w('k5-where', 'ที่ไหน', 'têe-nǎi', 'wo', { alt: ['Wo?', 'wohin'], note: 'Fragewörter stehen am Satzende: ห้องน้ำอยู่ที่ไหน?' }),
  w('k5-who', 'ใคร', 'krai', 'wer', { alt: ['Wer?', 'wen', 'wem'] }),
  w('k5-why', 'ทำไม', 'tam-mai', 'warum', { alt: ['wieso', 'weshalb', 'Warum?'], note: 'Ausnahme: ทำไม steht meist am Satzanfang.' }),
  w('k5-when', 'เมื่อไหร่', 'mêua-rài', 'wann', { alt: ['Wann?'] }),
  // L5
  s('k5-s-wheretoilet', 'ห้องน้ำ|อยู่|ที่ไหน|ครับ', 'hôrng-náam yòo têe-nǎi kráp', 'Wo ist die Toilette?', {
    alt: ['Wo ist das Klo?', 'Wo ist das WC?', 'Wo ist die Toilette'],
  }),
  s('k5-s-athotel', 'ผม|อยู่|ที่|โรงแรม|ครับ', 'pǒm yòo têe rohng-raem kráp', 'Ich bin im Hotel.', {
    alt: ['Ich wohne im Hotel.', 'Ich bin gerade im Hotel.'],
    note: 'ที่ = in/an (Ort).',
  }),
  s('k5-s-nothome', 'เขา|ไม่|อยู่|บ้าน', 'kǎo mâi yòo bâan', 'Er ist nicht zu Hause.', {
    alt: ['Sie ist nicht zu Hause.', 'Er ist nicht daheim.'],
  }),
  s('k5-s-whohome', 'ใคร|อยู่|บ้าน|ครับ', 'krai yòo bâan kráp', 'Wer ist zu Hause?', { alt: ['Wer ist daheim?'] }),
  s('k5-s-whynot', 'ทำไม|คุณ|ไม่|มา|ครับ', 'tam-mai kun mâi maa kráp', 'Warum kommen Sie nicht?', {
    alt: ['Warum kommst du nicht?', 'Warum sind Sie nicht gekommen?', 'Warum bist du nicht gekommen?'],
  }),
  s('k5-s-when', 'คุณ|ไป|เมื่อไหร่|ครับ', 'kun bpai mêua-rài kráp', 'Wann gehen Sie?', {
    alt: ['Wann fahren Sie?', 'Wann gehst du?', 'Wann fährst du?'],
  }),
  s('k5-s-hospital', 'ผม|อยาก|ไป|โรงพยาบาล|ครับ', 'pǒm yàak bpai rohng-pá-yaa-baan kráp', 'Ich möchte ins Krankenhaus.', {
    alt: ['Ich will ins Krankenhaus.', 'Ich möchte ins Krankenhaus gehen.'],
  }),
  // L6
  w('k5-beautiful', 'สวย', 'sǔay', 'schön', { alt: ['hübsch'], emoji: '🌸' }),
  w('k5-expensive', 'แพง', 'paeng', 'teuer', { emoji: '💸' }),
  w('k5-cheap', 'ถูก', 'tòok', 'billig', { alt: ['günstig', 'preiswert'], note: 'Bedeutet auch „richtig“ (ถูกต้อง).' }),
  w('k5-hot', 'ร้อน', 'rórn', 'heiß', { alt: ['warm'], emoji: '🔥' }),
  w('k5-cold', 'หนาว', 'nǎao', 'kalt', {
    alt: ['frieren', 'frierend'],
    emoji: '🥶',
    note: 'Für Wetter und Frieren. Kalte Getränke sind เย็น (yen).',
  }),
  w('k5-big', 'ใหญ่', 'yài', 'groß', { emoji: '🐘' }),
  w('k5-small', 'เล็ก', 'lék', 'klein', { emoji: '🐜' }),
  w('k5-delicious', 'อร่อย', 'à-ròi', 'lecker', { alt: ['köstlich', 'schmeckt gut'], emoji: '😋' }),
  // L7
  s('k5-s-delicious', 'อร่อย|มาก|ครับ', 'à-ròi mâak kráp', 'Sehr lecker!', {
    alt: ['Das ist sehr lecker!', 'Sehr köstlich!', 'Sehr lecker'],
    note: 'Adjektive brauchen kein „sein“: อร่อย = (es) ist lecker.',
  }),
  s('k5-s-expensive', 'อัน|นี้|แพง|ไหม|ครับ', 'an née paeng mǎi kráp', 'Ist das teuer?', { alt: ['Ist das hier teuer?'] }),
  s('k5-s-notexpensive', 'ไม่|แพง|ครับ', 'mâi paeng kráp', 'Nicht teuer.', {
    alt: ['Es ist nicht teuer.', 'Das ist nicht teuer.', 'Nicht teuer'],
  }),
  s('k5-s-hottoday', 'วันนี้|ร้อน|มาก', 'wan-née rórn mâak', 'Heute ist es sehr heiß.', {
    alt: ['Heute ist es sehr heiß', 'Heute ist sehr heiß.'],
  }),
  s('k5-s-beautifulhouse', 'บ้าน|คุณ|สวย|มาก|ครับ', 'bâan kun sǔay mâak kráp', 'Ihr Haus ist sehr schön.', {
    alt: ['Dein Haus ist sehr schön.', 'Ihr Haus ist wunderschön.'],
    note: 'Besitz: Ding + Besitzer – บ้านคุณ = Ihr Haus.',
  }),
  s('k5-s-cheapgood', 'ร้าน|นี้|ถูก|และ|อร่อย', 'ráan née tòok láe à-ròi', 'Dieser Laden ist billig und lecker.', {
    alt: ['Das Restaurant ist billig und lecker.', 'Dieser Laden ist günstig und lecker.'],
    note: 'และ = und.',
  }),
  s('k5-s-coldgermany', 'ที่|เยอรมนี|หนาว|มาก|ครับ', 'têe yer-rá-má-nee nǎao mâak kráp', 'In Deutschland ist es sehr kalt.', {
    alt: ['In Deutschland ist es sehr kalt', 'Deutschland ist sehr kalt.'],
  }),
]

export const chapters1: Chapter[] = [
  {
    id: 'k2',
    title: 'Begrüßung & Höflichkeit',
    subtitle: 'Hallo, danke, sorry – und immer schön ครับ',
    icon: '🙏',
    color: '#ff8a3d',
    lessons: [
      {
        id: 'k2-l1',
        title: 'Erste Wörter',
        subtitle: 'Hallo, danke, ja, nein',
        icon: '👋',
        type: 'vocab',
        grammar: 'g-polite',
        items: ['k2-hello', 'k2-krap', 'k2-ka', 'k2-thanks', 'k2-sorry', 'k2-maipenrai', 'k2-yes', 'k2-no'],
      },
      {
        id: 'k2-l2',
        title: 'Höflich sein',
        subtitle: 'Mit ครับ am Satzende',
        icon: '🙇',
        type: 'sentences',
        items: ['k2-s-hello', 'k2-s-thanks', 'k2-s-sorry', 'k2-s-maipenrai', 'k2-s-yes', 'k2-s-no'],
      },
      {
        id: 'k2-l3',
        title: 'Wie geht’s?',
        subtitle: 'Gut, sehr, auch',
        icon: '😊',
        type: 'vocab',
        items: ['k2-kun', 'k2-sabai', 'k2-dee', 'k2-sabaidee', 'k2-mai', 'k2-maak', 'k2-na', 'k2-muean'],
      },
      {
        id: 'k2-l4',
        title: 'Smalltalk-Start',
        subtitle: 'Nach dem Befinden fragen',
        icon: '💬',
        type: 'sentences',
        items: ['k2-s-howareyou', 'k2-s-fine', 'k2-s-andyou', 'k2-s-verygood', 'k2-s-thanksmuch', 'k2-s-maipenraina'],
      },
      {
        id: 'k2-l5',
        title: 'Kennenlernen & Abschied',
        subtitle: 'Freut mich, bis bald',
        icon: '🤝',
        type: 'vocab',
        items: [
          'k2-yindee',
          'k2-roojak',
          'k2-nicetomeet',
          'k2-bye',
          'k2-seeyou',
          'k2-goodluck',
          'k2-goodnight',
          'k2-gofirst',
        ],
      },
      {
        id: 'k2-l6',
        title: 'Hallo & Tschüss',
        subtitle: 'Ganze Sätze zum Begrüßen',
        icon: '🎭',
        type: 'sentences',
        dialogue: 'd-greet',
        items: [
          'k2-s-nicetomeet',
          'k2-s-metoo',
          'k2-s-bye',
          'k2-s-seeyou',
          'k2-s-goodluck',
          'k2-s-gofirst',
          'k2-s-sorryna',
        ],
      },
    ],
  },
  {
    id: 'k3',
    title: 'Ich & Du – Vorstellen',
    subtitle: 'Name, Herkunft, Sprachen, Beruf',
    icon: '🧑',
    color: '#7c5cff',
    lessons: [
      {
        id: 'k3-l1',
        title: 'Ich, du, er',
        subtitle: 'Persönliche Fürwörter',
        icon: '👥',
        type: 'vocab',
        grammar: 'g-pronouns',
        items: ['k3-phom', 'k3-chan', 'k3-kao', 'k3-ter', 'k3-rao', 'k3-puakkao'],
      },
      {
        id: 'k3-l2',
        title: 'Name & Herkunft',
        subtitle: 'Wer bist du, woher kommst du?',
        icon: '🪪',
        type: 'vocab',
        items: ['k3-chue', 'k3-arai', 'k3-maajak', 'k3-nai', 'k3-kon', 'k3-bpen', 'k3-thai'],
      },
      {
        id: 'k3-l3',
        title: 'Sich vorstellen',
        subtitle: 'Ich heiße …',
        icon: '🙋',
        type: 'sentences',
        grammar: 'g-word-order',
        items: ['k3-s-myname', 'k3-s-yourname', 'k3-s-hisname', 'k3-s-fromwhere', 'k3-s-hethai', 'k3-s-youthai'],
      },
      {
        id: 'k3-l4',
        title: 'Länder & Sprachen',
        subtitle: 'Deutsch, Thai, Englisch',
        icon: '🌍',
        type: 'vocab',
        items: [
          'k3-germany',
          'k3-thailand',
          'k3-german',
          'k3-england',
          'k3-paasaa',
          'k3-poot',
          'k3-dai',
          'k3-nitnoi',
          'k3-kaojai',
        ],
      },
      {
        id: 'k3-l5',
        title: 'Ich spreche ein bisschen Thai',
        subtitle: 'Herkunft & Verständigung',
        icon: '🗣️',
        type: 'sentences',
        items: [
          'k3-s-german',
          'k3-s-fromgermany',
          'k3-s-littlethai',
          'k3-s-english',
          'k3-s-dontunderstand',
          'k3-s-slowly',
        ],
      },
      {
        id: 'k3-l6',
        title: 'Berufe',
        subtitle: 'Was machst du?',
        icon: '💼',
        type: 'vocab',
        items: [
          'k3-work',
          'k3-teacher',
          'k3-doctor',
          'k3-student',
          'k3-engineer',
          'k3-employee',
          'k3-police',
          'k3-cook',
        ],
      },
      {
        id: 'k3-l7',
        title: 'Smalltalk',
        subtitle: 'Über Beruf & Herkunft reden',
        icon: '☕',
        type: 'sentences',
        dialogue: 'd-smalltalk',
        items: [
          'k3-s-yourjob',
          'k3-s-engineer',
          'k3-s-teacher',
          'k3-s-doctor',
          'k3-s-police',
          'k3-s-employee',
          'k3-s-wegerman',
        ],
      },
    ],
  },
  {
    id: 'k4',
    title: 'Zahlen & Zeit',
    subtitle: 'Zählen, Preise, Wochentage, Uhrzeit',
    icon: '🔢',
    color: '#1fb6ff',
    lessons: [
      {
        id: 'k4-l1',
        title: 'Zahlen 0–5',
        subtitle: 'ศูนย์ bis ห้า',
        icon: '✋',
        type: 'vocab',
        items: ['k4-0', 'k4-1', 'k4-2', 'k4-3', 'k4-4', 'k4-5'],
      },
      {
        id: 'k4-l2',
        title: 'Zahlen 6–1000',
        subtitle: 'Bis tausend zählen',
        icon: '💯',
        type: 'vocab',
        items: ['k4-6', 'k4-7', 'k4-8', 'k4-9', 'k4-10', 'k4-20', 'k4-100', 'k4-1000'],
      },
      {
        id: 'k4-l3',
        title: 'Wie viel? Wie alt?',
        subtitle: 'Alter, Preis, Zählwörter',
        icon: '🏷️',
        type: 'vocab',
        grammar: 'g-classifiers',
        items: ['k4-age', 'k4-year', 'k4-gee', 'k4-taorai', 'k4-baht', 'k4-an', 'k4-dtua'],
      },
      {
        id: 'k4-l4',
        title: 'Auf dem Markt',
        subtitle: 'Preise & Mengen',
        icon: '🛍️',
        type: 'sentences',
        items: [
          'k4-s-age30',
          'k4-s-howold',
          'k4-s-howmuch',
          'k4-s-50baht',
          'k4-s-twopieces',
          'k4-s-howmanypeople',
          'k4-s-twopeople',
        ],
      },
      {
        id: 'k4-l5',
        title: 'Wochentage',
        subtitle: 'Montag bis Sonntag',
        icon: '📅',
        type: 'vocab',
        items: ['k4-day', 'k4-mon', 'k4-tue', 'k4-wed', 'k4-thu', 'k4-fri', 'k4-sat', 'k4-sun'],
      },
      {
        id: 'k4-l6',
        title: 'Heute, morgen, jetzt',
        subtitle: 'Zeitwörter',
        icon: '⏰',
        type: 'vocab',
        grammar: 'g-time',
        items: [
          'k4-today',
          'k4-tomorrow',
          'k4-yesterday',
          'k4-now',
          'k4-morning',
          'k4-evening',
          'k4-hour',
          'k4-mohng',
        ],
      },
      {
        id: 'k4-l7',
        title: 'Wann und wie spät?',
        subtitle: 'Tage & Uhrzeit in Sätzen',
        icon: '🕘',
        type: 'sentences',
        items: [
          'k4-s-whatday',
          'k4-s-monday',
          'k4-s-tomorrowsat',
          'k4-s-yesterdayfri',
          'k4-s-whattime',
          'k4-s-nine',
          'k4-s-seeyoutomorrow',
        ],
      },
    ],
  },
  {
    id: 'k5',
    title: 'Alltag',
    subtitle: 'Verben, Orte, Eigenschaften, Fragen',
    icon: '🏙️',
    color: '#13c296',
    lessons: [
      {
        id: 'k5-l1',
        title: 'Tun-Wörter',
        subtitle: 'Essen, schlafen, kaufen',
        icon: '🏃',
        type: 'vocab',
        items: ['k5-eat', 'k5-drink', 'k5-go', 'k5-come', 'k5-sleep', 'k5-learn', 'k5-buy', 'k5-see'],
      },
      {
        id: 'k5-l2',
        title: 'Haben, sein, wollen',
        subtitle: 'Und das kleine Wort „nicht“',
        icon: '🚫',
        type: 'vocab',
        grammar: 'g-negation',
        items: ['k5-like', 'k5-want', 'k5-have', 'k5-khue', 'k5-yoo', 'k5-not', 'k5-water', 'k5-rice'],
      },
      {
        id: 'k5-l3',
        title: 'Was ich will',
        subtitle: 'Wünsche & Verneinung',
        icon: '🍚',
        type: 'sentences',
        items: [
          'k5-s-eatrice',
          'k5-s-wantwater',
          'k5-s-havewater',
          'k5-s-donthave',
          'k5-s-dontwantgo',
          'k5-s-likethailand',
          'k5-s-learnthai',
        ],
      },
      {
        id: 'k5-l4',
        title: 'Orte & Fragewörter',
        subtitle: 'Wo? Wer? Warum? Wann?',
        icon: '🏠',
        type: 'vocab',
        grammar: 'g-questions',
        items: [
          'k5-house',
          'k5-toilet',
          'k5-shop',
          'k5-hospital',
          'k5-hotel',
          'k5-where',
          'k5-who',
          'k5-why',
          'k5-when',
        ],
      },
      {
        id: 'k5-l5',
        title: 'Wo ist die Toilette?',
        subtitle: 'Fragen stellen',
        icon: '❓',
        type: 'sentences',
        items: [
          'k5-s-wheretoilet',
          'k5-s-athotel',
          'k5-s-nothome',
          'k5-s-whohome',
          'k5-s-whynot',
          'k5-s-when',
          'k5-s-hospital',
        ],
      },
      {
        id: 'k5-l6',
        title: 'Eigenschaften',
        subtitle: 'Groß, klein, teuer, lecker',
        icon: '🌶️',
        type: 'vocab',
        grammar: 'g-adjectives',
        items: [
          'k5-beautiful',
          'k5-expensive',
          'k5-cheap',
          'k5-hot',
          'k5-cold',
          'k5-big',
          'k5-small',
          'k5-delicious',
        ],
      },
      {
        id: 'k5-l7',
        title: 'Lecker und billig!',
        subtitle: 'Beschreiben & bewerten',
        icon: '😋',
        type: 'sentences',
        items: [
          'k5-s-delicious',
          'k5-s-expensive',
          'k5-s-notexpensive',
          'k5-s-hottoday',
          'k5-s-beautifulhouse',
          'k5-s-cheapgood',
          'k5-s-coldgermany',
        ],
      },
    ],
  },
]
