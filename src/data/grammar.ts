import type { GlossWord, GrammarTopic, Role } from './types'

// Kurzschreibweise für Glossen
const w = (th: string, rom: string, de: string, role?: Role): GlossWord => (role ? { th, rom, de, role } : { th, rom, de })

const KRAP = w('ครับ', 'kráp', '(höflich, Mann)', 'PART')

export const grammar: GrammarTopic[] = [
  // ==================================================================
  {
    id: 'g-word-order',
    title: 'Satzbau: Subjekt – Verb – Objekt',
    icon: '🧱',
    summary: 'Thai-Sätze folgen fast immer dem Muster Subjekt – Verb – Objekt, ohne Artikel, Fälle oder Konjugation.',
    sections: [
      {
        type: 'text',
        md: 'Gute Nachricht: Der thailändische Grundsatz ist sehr einfach. Er folgt dem Muster **Subjekt – Verb – Objekt** (SVO), wie im Englischen.\n\nUnd es fällt viel weg, was im Deutschen schwer ist: **keine Artikel** (der/die/das), **keine Fälle** (dem/den), **keine Konjugation** (ich esse / du isst) und **kein Plural**.',
      },
      {
        type: 'example',
        words: [w('ผม', 'pǒm', 'ich', 'S'), w('กิน', 'gin', 'essen', 'V'), w('ข้าว', 'kâao', 'Reis', 'O')],
        de: 'Ich esse Reis.',
      },
      {
        type: 'example',
        words: [w('เขา', 'kǎo', 'er/sie', 'S'), w('ดื่ม', 'dùuem', 'trinken', 'V'), w('กาแฟ', 'gaa-fae', 'Kaffee', 'O')],
        de: 'Er trinkt Kaffee. / Sie trinkt Kaffee.',
        note: 'Das Verb ดื่ม bleibt immer gleich – egal wer trinkt. เขา heißt „er“ und „sie“.',
      },
      {
        type: 'compare',
        title: 'Zeitangabe vorne: Im Deutschen springt das Verb, im Thai nicht',
        de: ['Morgen', 'esse', 'ich', 'Reis'],
        th: [w('พรุ่งนี้', 'prûng-née', 'morgen', 'TIME'), w('ผม', 'pǒm', 'ich', 'S'), w('กิน', 'gin', 'essen', 'V'), w('ข้าว', 'kâao', 'Reis', 'O')],
      },
      {
        type: 'text',
        md: 'Im Deutschen muss das Verb an **Position 2** stehen („Morgen *esse* ich …“). Im Thai bleibt die Reihenfolge **S – V – O** immer gleich. Zeitangaben stehen einfach am **Anfang** oder am **Ende** des Satzes.',
      },
      {
        type: 'example',
        words: [w('ผม', 'pǒm', 'ich', 'S'), w('ไป', 'bpai', 'gehen', 'V'), w('ตลาด', 'dtà-làat', 'Markt', 'O')],
        de: 'Ich gehe zum Markt.',
        note: 'Nach ไป („gehen/fahren“) braucht man kein „zu“ oder „nach“.',
      },
      {
        type: 'tip',
        md: '**Beschreibendes kommt nach hinten:** Im Thai steht das Wichtige zuerst, Details folgen. „Mein Haus“ ist wörtlich „Haus ich“: **บ้านผม** (bâan pǒm). Ausführlicher: บ้าน**ของ**ผม („Haus von mir“).',
      },
      {
        type: 'example',
        words: [w('บ้าน', 'bâan', 'Haus', 'N'), w('ผม', 'pǒm', 'ich (= mein)', 'N')],
        de: 'mein Haus',
      },
      {
        type: 'build',
        prompt: 'Bilde den Satz: „Ich trinke Wasser.“',
        words: [w('ผม', 'pǒm', 'ich', 'S'), w('ดื่ม', 'dùuem', 'trinken', 'V'), w('น้ำ', 'náam', 'Wasser', 'O'), KRAP],
        de: 'Ich trinke Wasser.',
      },
      {
        type: 'quiz',
        question: 'Welche Reihenfolge ist richtig für „Sie isst Reis“?',
        options: ['ข้าว เขา กิน', 'เขา กิน ข้าว', 'กิน เขา ข้าว'],
        answer: 1,
        explain: 'Subjekt (เขา) – Verb (กิน) – Objekt (ข้าว). Genau wie im Englischen: She eats rice.',
      },
    ],
  },
  // ==================================================================
  {
    id: 'g-polite',
    title: 'Höflichkeitspartikel ครับ / ค่ะ / คะ / นะ',
    icon: '🙏',
    summary: 'Kleine Wörter am Satzende machen deine Sätze höflich – und hängen vom Geschlecht des Sprechers ab.',
    sections: [
      {
        type: 'text',
        md: 'Thais hängen an fast jeden Satz eine kleine **Höflichkeitspartikel**. Ohne sie klingst du schnell schroff.\n\nWichtig: Die Partikel richtet sich nach **deinem eigenen Geschlecht**, nicht nach dem der anderen Person. Als Mann sagst du also **immer ครับ** (kráp) – auch wenn du mit einer Frau sprichst.',
      },
      {
        type: 'table',
        head: ['Partikel', 'Umschrift', 'Wer?', 'Wann?'],
        rows: [
          ['ครับ', 'kráp', 'Männer', 'in Aussagen und Fragen'],
          ['ค่ะ', 'kâ', 'Frauen', 'in Aussagen, Antworten'],
          ['คะ', 'ká', 'Frauen', 'in Fragen und beim Anreden'],
          ['นะ', 'ná', 'alle', 'macht weicher: „…, ja?“, „bitte“'],
          ['จ้ะ / จ๊ะ', 'jâ / já', 'alle', 'vertraut, z. B. Ältere zu Jüngeren'],
        ],
      },
      {
        type: 'example',
        words: [w('สวัสดี', 'sà-wàt-dee', 'Hallo'), KRAP],
        de: 'Hallo! (als Mann)',
      },
      {
        type: 'example',
        words: [w('ขอบคุณ', 'kòrp-kun', 'danken', 'V'), w('มาก', 'mâak', 'sehr', 'ADV'), w('ค่ะ', 'kâ', '(höflich, Frau)', 'PART')],
        de: 'Vielen Dank! (als Frau)',
      },
      {
        type: 'compare',
        title: 'Eine Bitte: „bitte“ steckt im นะ am Ende',
        de: ['Bitte', 'nicht', 'scharf!'],
        th: [w('ไม่', 'mâi', 'nicht', 'NEG'), w('เผ็ด', 'pèt', 'scharf', 'ADJ'), w('นะ', 'ná', '(weich, bitte)', 'PART'), KRAP],
      },
      {
        type: 'example',
        words: [w('ไป', 'bpai', 'gehen', 'V'), w('ก่อน', 'gòrn', 'zuerst', 'ADV'), w('นะ', 'ná', '(weich)', 'PART'), KRAP],
        de: 'Ich geh dann mal!',
        note: 'นะครับ klingt freundlich und persönlich – typisch beim Verabschieden.',
      },
      {
        type: 'tip',
        md: '**ครับ allein** heißt auch „Ja“ oder „Verstanden“. Wenn jemand dir etwas erklärt, nickst du einfach und sagst **ครับ**. Im schnellen Sprechen klingt es oft wie „káp“ (ohne r) – das ist normal.',
      },
      {
        type: 'build',
        prompt: 'Bedanke dich herzlich (als Mann).',
        words: [w('ขอบคุณ', 'kòrp-kun', 'danken', 'V'), w('มาก', 'mâak', 'sehr', 'ADV'), KRAP],
        de: 'Vielen Dank!',
      },
      {
        type: 'quiz',
        question: 'Du bist ein Mann und fragst eine Verkäuferin nach dem Preis. Womit endet dein Satz?',
        options: ['… ค่ะ', '… คะ', '… ครับ'],
        answer: 2,
        explain: 'Die Partikel hängt von deinem Geschlecht ab. Männer sagen immer ครับ – in Fragen und Aussagen.',
      },
      {
        type: 'quiz',
        question: 'Eine Frau stellt eine Frage. Welche Partikel benutzt sie?',
        options: ['ค่ะ (kâ)', 'คะ (ká)', 'ครับ (kráp)'],
        answer: 1,
        explain: 'Frauen nehmen in Fragen คะ mit hohem Ton, in Aussagen ค่ะ mit fallendem Ton.',
      },
    ],
  },
  // ==================================================================
  {
    id: 'g-pronouns',
    title: 'Pronomen – und wann man sie weglässt',
    icon: '👥',
    summary: 'Thai hat viele Wörter für „ich“ und „du“, lässt sie oft ganz weg und benutzt gern Verwandtschaftswörter.',
    sections: [
      {
        type: 'text',
        md: 'Im Deutschen gibt es ein „ich“. Im Thai hängt die Wahl davon ab, **wer spricht** und **mit wem**. Für dich als Mann ist **ผม** (pǒm) das normale, höfliche „ich“.\n\nUnd: Pronomen sind im Thai **oft gar nicht nötig**. Wenn klar ist, wer gemeint ist, lässt man sie einfach weg.',
      },
      {
        type: 'table',
        head: ['Thai', 'Umschrift', 'Bedeutung', 'Hinweis'],
        rows: [
          ['ผม', 'pǒm', 'ich', 'Männer, höflich-neutral'],
          ['ฉัน', 'chǎn', 'ich', 'v. a. Frauen, alltäglich'],
          ['ดิฉัน', 'dì-chǎn', 'ich', 'Frauen, sehr formell'],
          ['คุณ', 'kun', 'du / Sie', 'höflich, für beide Geschlechter'],
          ['เขา', 'kǎo', 'er / sie', 'für Männer und Frauen'],
          ['เรา', 'rao', 'wir', 'auch locker für „ich“'],
          ['พวกเขา', 'pûak-kǎo', 'sie (Plural)', ''],
          ['มัน', 'man', 'es', 'Tiere, Dinge – für Menschen unhöflich!'],
        ],
      },
      {
        type: 'example',
        words: [w('กิน', 'gin', 'essen', 'V'), w('ข้าว', 'kâao', 'Reis', 'O'), w('หรือ', 'rǔue', 'oder', 'Q'), w('ยัง', 'yang', 'noch nicht', 'Q'), KRAP],
        de: 'Hast du schon gegessen?',
        note: 'Kein „du“ im Satz – trotzdem ist klar, wer gemeint ist. Eine typische Begrüßung!',
      },
      {
        type: 'text',
        md: 'Sehr typisch: **Verwandtschaftswörter als Pronomen.** Thais sprechen auch Fremde wie Familienmitglieder an – je nach Alter.\n\n**พี่** (pêe, „älteres Geschwister“) für Ältere, **น้อง** (nórng, „jüngeres Geschwister“) für Jüngere. Diese Wörter können „du“ **und** „ich“ bedeuten!',
      },
      {
        type: 'table',
        head: ['Wort', 'Umschrift', 'wörtlich', 'benutzt für'],
        rows: [
          ['พี่', 'pêe', 'älteres Geschwister', 'etwas ältere Menschen'],
          ['น้อง', 'nórng', 'jüngeres Geschwister', 'Jüngere, auch Kellner/Personal'],
          ['ป้า', 'bpâa', 'Tante (ältere)', 'ältere Frauen, z. B. Marktfrau'],
          ['ลุง', 'lung', 'Onkel (älterer)', 'ältere Männer'],
          ['คุณแม่ / คุณพ่อ', 'kun mâe / kun pôr', 'Mutter / Vater', 'Eltern der Partnerin'],
        ],
      },
      {
        type: 'example',
        words: [w('พี่', 'pêe', 'älteres Geschwister (= du)', 'S'), w('ไป', 'bpai', 'gehen', 'V'), w('ไหน', 'nǎi', 'wohin', 'Q'), KRAP],
        de: 'Wohin gehst du? (zu jemandem, der etwas älter ist)',
      },
      {
        type: 'example',
        words: [w('นก', 'nók', 'Nok (= ich)', 'S'), w('หิว', 'hǐu', 'hungrig', 'ADJ'), w('แล้ว', 'láeo', 'schon/jetzt', 'ASP'), w('ค่ะ', 'kâ', '(höflich, Frau)', 'PART')],
        de: 'Ich habe jetzt Hunger. (Nok spricht über sich)',
        note: 'Viele Thai-Frauen nennen sich selbst beim Spitznamen statt „ich“ zu sagen. Das klingt freundlich und süß.',
      },
      {
        type: 'compare',
        title: 'Das „ich“ fällt weg, wenn es klar ist',
        de: ['Ich', 'gehe', 'zum', 'Markt'],
        th: [w('ไป', 'bpai', 'gehen', 'V'), w('ตลาด', 'dtà-làat', 'Markt', 'O'), KRAP],
      },
      {
        type: 'tip',
        md: 'Ist deine Freundin jünger, nennt sie dich oft **พี่** – und sich selbst **น้อง** oder beim Spitznamen. Den Kellner rufst du freundlich mit **น้องครับ!**',
      },
      {
        type: 'build',
        prompt: 'Frag einen etwas älteren Bekannten: „Wohin gehst du?“',
        words: [w('พี่', 'pêe', 'älteres Geschwister (= du)', 'S'), w('ไป', 'bpai', 'gehen', 'V'), w('ไหน', 'nǎi', 'wohin', 'Q'), KRAP],
        de: 'Wohin gehst du?',
      },
      {
        type: 'quiz',
        question: 'Du sprichst eine ältere Marktfrau (ca. 60) an. Welche Anrede passt?',
        options: ['น้อง', 'ป้า', 'มัน'],
        answer: 1,
        explain: 'ป้า („Tante“) ist eine freundliche, respektvolle Anrede für ältere Frauen. มัน wäre sehr beleidigend.',
      },
    ],
  },
  // ==================================================================
  {
    id: 'g-adjectives',
    title: 'Adjektive',
    icon: '🎨',
    summary: 'Adjektive stehen nach dem Nomen und funktionieren wie Verben – ganz ohne „sein“.',
    sections: [
      {
        type: 'text',
        md: 'Zwei große Unterschiede zum Deutschen:\n\n1. Das Adjektiv steht **nach dem Nomen**: „Haus groß“ statt „großes Haus“.\n\n2. Adjektive sind selbst schon **Verben**. „Das Essen *ist* lecker“ heißt einfach „Essen lecker“ – **ohne „sein“**.',
      },
      {
        type: 'compare',
        title: 'Das Adjektiv wandert hinter das Nomen',
        de: ['großes', 'Haus'],
        th: [w('บ้าน', 'bâan', 'Haus', 'N'), w('ใหญ่', 'yài', 'groß', 'ADJ')],
      },
      {
        type: 'example',
        words: [w('อาหาร', 'aa-hǎan', 'Essen', 'S'), w('อร่อย', 'à-ròi', 'lecker', 'ADJ')],
        de: 'Das Essen ist lecker.',
        note: 'Kein Wort für „ist“ – das Adjektiv reicht.',
      },
      {
        type: 'example',
        words: [w('วันนี้', 'wan-née', 'heute', 'TIME'), w('ร้อน', 'rórn', 'heiß', 'ADJ'), w('มาก', 'mâak', 'sehr', 'ADV')],
        de: 'Heute ist es sehr heiß.',
        note: '„sehr“ (มาก) steht nach dem Adjektiv – und auch „es“ fällt weg.',
      },
      {
        type: 'tip',
        md: 'Häufiger Anfängerfehler: ✗ อาหาร**เป็น**อร่อย. **เป็น** („sein“) benutzt man nur mit **Nomen**: ผม**เป็น**ครู – „Ich bin Lehrer“.',
      },
      {
        type: 'example',
        words: [w('ร้าน', 'ráan', 'Laden/Restaurant', 'S'), w('นี้', 'née', 'dieser', 'ADJ'), w('อร่อย', 'à-ròi', 'lecker', 'ADJ'), w('มาก', 'mâak', 'sehr', 'ADV')],
        de: 'Dieses Restaurant ist sehr lecker.',
        note: 'Auch „dieser“ (นี้) steht nach dem Nomen.',
      },
      {
        type: 'text',
        md: '**Verdopplung:** Das Zeichen **ๆ** (máai yá-mók) wiederholt das Wort davor. Bei Adjektiven macht das den Ausdruck **lebendiger** – je nach Situation verstärkend („richtig schön“) oder weicher und umgangssprachlicher („schön langsam“).',
      },
      {
        type: 'example',
        words: [w('พูด', 'pôot', 'sprechen', 'V'), w('ช้าๆ', 'cháa-cháa', 'langsam-langsam', 'ADV'), w('หน่อย', 'nòi', 'ein bisschen', 'PART'), KRAP],
        de: 'Sprich bitte etwas langsamer.',
        note: 'Ein sehr nützlicher Satz für Anfänger!',
      },
      {
        type: 'table',
        head: ['Thai', 'Umschrift', 'Deutsch'],
        rows: [
          ['ดี', 'dee', 'gut'],
          ['ใหญ่', 'yài', 'groß'],
          ['เล็ก', 'lék', 'klein'],
          ['ร้อน', 'rórn', 'heiß'],
          ['หนาว', 'nǎao', 'kalt (Wetter)'],
          ['แพง', 'paeng', 'teuer'],
          ['ถูก', 'tòok', 'billig'],
          ['สวย', 'sǔai', 'schön, hübsch'],
          ['อร่อย', 'à-ròi', 'lecker'],
          ['เผ็ด', 'pèt', 'scharf'],
        ],
      },
      {
        type: 'build',
        prompt: 'Sag: „Das Zimmer ist sehr groß.“',
        words: [w('ห้อง', 'hôrng', 'Zimmer', 'S'), w('ใหญ่', 'yài', 'groß', 'ADJ'), w('มาก', 'mâak', 'sehr', 'ADV'), KRAP],
        de: 'Das Zimmer ist sehr groß.',
      },
      {
        type: 'quiz',
        question: 'Wie sagt man „Das Wetter ist heiß“?',
        options: ['อากาศ เป็น ร้อน', 'อากาศ ร้อน', 'ร้อน อากาศ เป็น'],
        answer: 1,
        explain: 'Adjektive brauchen kein เป็น. Einfach: Nomen + Adjektiv → อากาศ ร้อน (aa-gàat rórn).',
      },
    ],
  },
  // ==================================================================
  {
    id: 'g-negation',
    title: 'Verneinung: ไม่, ไม่ใช่, ไม่ได้',
    icon: '🚫',
    summary: 'ไม่ steht direkt vor dem Verb oder Adjektiv – dazu gibt es ไม่ใช่ für Nomen und ไม่ได้ für „nicht getan“ oder „nicht können“.',
    sections: [
      {
        type: 'text',
        md: 'Das wichtigste Verneinungswort ist **ไม่** (mâi). Es steht **direkt vor** dem Verb oder Adjektiv.\n\nIm Deutschen wandert „nicht“ oft ans Ende („Ich esse das *nicht*“). Im Thai nie: **ไม่ + Verb**.',
      },
      {
        type: 'compare',
        title: '„nicht/kein“ steht direkt vor dem Verb',
        de: ['Ich', 'esse', 'kein', 'Fleisch'],
        th: [w('ผม', 'pǒm', 'ich', 'S'), w('ไม่', 'mâi', 'nicht', 'NEG'), w('กิน', 'gin', 'essen', 'V'), w('เนื้อ', 'núea', 'Fleisch', 'O')],
      },
      {
        type: 'example',
        words: [w('อาหาร', 'aa-hǎan', 'Essen', 'S'), w('นี้', 'née', 'dieses', 'ADJ'), w('ไม่', 'mâi', 'nicht', 'NEG'), w('แพง', 'paeng', 'teuer', 'ADJ')],
        de: 'Dieses Essen ist nicht teuer.',
      },
      {
        type: 'text',
        md: '**ไม่ใช่** (mâi châi) heißt „nicht sein / kein“ bei **Nomen**. Es ersetzt **เป็น**: „Ich *bin* Lehrer“ = ผม**เป็น**ครู, „Ich bin *kein* Lehrer“ = ผม**ไม่ใช่**ครู.\n\nAllein heißt ไม่ใช่ auch: „Nein, stimmt nicht.“',
      },
      {
        type: 'example',
        words: [w('ผม', 'pǒm', 'ich', 'S'), w('ไม่ใช่', 'mâi châi', 'nicht sein', 'NEG'), w('คน', 'kon', 'Mensch', 'N'), w('อเมริกัน', 'à-me-rí-gan', 'amerikanisch', 'ADJ'), KRAP],
        de: 'Ich bin kein Amerikaner.',
      },
      {
        type: 'text',
        md: '**ไม่ได้** (mâi dâi) hat zwei Bedeutungen – je nach Position:\n\n**Vor dem Verb:** „habe nicht (getan)“ – oft für die Vergangenheit oder um etwas richtigzustellen.\n\n**Nach dem Verb:** „kann nicht / darf nicht“.',
      },
      {
        type: 'example',
        words: [w('ผม', 'pǒm', 'ich', 'S'), w('ไม่ได้', 'mâi dâi', 'nicht (getan)', 'NEG'), w('ไป', 'bpai', 'gehen', 'V'), KRAP],
        de: 'Ich bin nicht hingegangen.',
      },
      {
        type: 'example',
        words: [w('ผม', 'pǒm', 'ich', 'S'), w('กิน', 'gin', 'essen', 'V'), w('เผ็ด', 'pèt', 'scharf', 'ADJ'), w('ไม่ได้', 'mâi dâi', 'nicht können', 'NEG'), KRAP],
        de: 'Ich kann nicht scharf essen.',
        note: 'Diesen Satz wirst du in Thailand oft brauchen!',
      },
      {
        type: 'table',
        head: ['Form', 'Bedeutung', 'Beispiel'],
        rows: [
          ['ไม่ + Verb/Adjektiv', 'nicht', 'ไม่ร้อน – nicht heiß'],
          ['ไม่ใช่ + Nomen', 'nicht sein, kein', 'ไม่ใช่ผม – nicht ich'],
          ['ไม่ได้ + Verb', 'habe nicht (getan)', 'ไม่ได้ไป – bin nicht gegangen'],
          ['Verb + ไม่ได้', 'kann/darf nicht', 'ไปไม่ได้ – kann nicht gehen'],
          ['ยังไม่ + Verb', 'noch nicht', 'ยังไม่กิน – habe noch nicht gegessen'],
        ],
      },
      {
        type: 'tip',
        md: '**ไม่เป็นไร** (mâi bpen rai) – „macht nichts / kein Problem / gern geschehen“. Vielleicht der wichtigste Ausdruck in Thailand!',
      },
      {
        type: 'build',
        prompt: 'Sag: „Ich habe keinen Hunger.“',
        words: [w('ผม', 'pǒm', 'ich', 'S'), w('ไม่', 'mâi', 'nicht', 'NEG'), w('หิว', 'hǐu', 'hungrig', 'ADJ'), KRAP],
        de: 'Ich habe keinen Hunger.',
      },
      {
        type: 'quiz',
        question: 'Was heißt „Ich bin kein Lehrer“?',
        options: ['ผม ไม่ ครู', 'ผม ไม่ใช่ ครู', 'ผม ครู ไม่'],
        answer: 1,
        explain: 'Bei Nomen (ครู = Lehrer) verneint man mit ไม่ใช่.',
      },
    ],
  },
  // ==================================================================
  {
    id: 'g-questions',
    title: 'Fragen stellen',
    icon: '❓',
    summary: 'Im Thai wird nichts umgestellt: Ja/Nein-Fragen enden mit ไหม, Fragewörter stehen meist am Satzende.',
    sections: [
      {
        type: 'text',
        md: 'Im Deutschen stellt man für Fragen um („Du isst“ → „*Isst du*?“). Im Thai **bleibt alles, wie es ist**.\n\nDas Fragewort steht genau dort, wo später die **Antwort** steht – meistens am **Satzende**.',
      },
      {
        type: 'compare',
        title: 'Das Fragewort steht dort, wo die Antwort hinkommt',
        de: ['Was', 'isst', 'du?'],
        th: [w('คุณ', 'kun', 'du', 'S'), w('กิน', 'gin', 'essen', 'V'), w('อะไร', 'à-rai', 'was', 'Q'), KRAP],
      },
      {
        type: 'text',
        md: '**Ja/Nein-Fragen:** einfach **ไหม** (mǎi) ans Ende. Im Alltag klingt es oft wie „mái“ (hoher Ton) und wird manchmal **มั้ย** geschrieben.\n\nThais antworten **nicht mit „ja“ oder „nein“**, sondern **wiederholen das Verb**: ไป („gehe“) / ไม่ไป („gehe nicht“).',
      },
      {
        type: 'example',
        words: [w('เผ็ด', 'pèt', 'scharf', 'ADJ'), w('ไหม', 'mǎi', '(Frage)', 'Q'), KRAP],
        de: 'Ist es scharf?',
        note: 'Antwort: เผ็ด (ja) oder ไม่เผ็ด (nein).',
      },
      {
        type: 'text',
        md: 'Weitere Fragen am Satzende:\n\n**หรือเปล่า** (rǔue bplào) – „… oder nicht?“, neutral und sehr häufig.\n\n**ใช่ไหม** (châi mǎi) – „…, stimmt’s?“\n\n**หรือยัง** (rǔue yang) – „schon oder noch nicht?“',
      },
      {
        type: 'example',
        words: [w('คุณ', 'kun', 'du', 'S'), w('มี', 'mee', 'haben', 'V'), w('แฟน', 'faen', 'Freund/in', 'O'), w('หรือเปล่า', 'rǔue bplào', 'oder nicht', 'Q'), KRAP],
        de: 'Hast du einen Freund / eine Freundin?',
      },
      {
        type: 'table',
        head: ['Fragewort', 'Umschrift', 'Bedeutung'],
        rows: [
          ['อะไร', 'à-rai', 'was'],
          ['ที่ไหน', 'têe-nǎi', 'wo'],
          ['ใคร', 'krai', 'wer'],
          ['เมื่อไร', 'mûea-rài', 'wann'],
          ['ทำไม', 'tam-mai', 'warum (meist am Satzanfang!)'],
          ['เท่าไร', 'tâo-rài', 'wie viel'],
          ['อย่างไร / ยังไง', 'yàang-rai / yang-ngai', 'wie (ยังไง = Alltag)'],
        ],
      },
      {
        type: 'example',
        words: [w('อัน', 'an', 'Stück', 'CLF'), w('นี้', 'née', 'dieses', 'ADJ'), w('เท่าไร', 'tâo-rài', 'wie viel', 'Q'), KRAP],
        de: 'Wie viel kostet das hier?',
        note: 'เท่าไร wird wie เท่าไหร่ ausgesprochen (tiefer Ton auf der 2. Silbe) und oft auch so geschrieben.',
      },
      {
        type: 'example',
        words: [w('ทำไม', 'tam-mai', 'warum', 'Q'), w('ไม่', 'mâi', 'nicht', 'NEG'), w('มา', 'maa', 'kommen', 'V'), KRAP],
        de: 'Warum bist du nicht gekommen?',
        note: 'Ausnahme: ทำไม steht meistens am Satzanfang.',
      },
      {
        type: 'build',
        prompt: 'Frag: „Wo ist die Toilette?“',
        words: [w('ห้องน้ำ', 'hôrng-náam', 'Toilette', 'S'), w('อยู่', 'yòo', 'sich befinden', 'V'), w('ที่ไหน', 'têe-nǎi', 'wo', 'Q'), KRAP],
        de: 'Wo ist die Toilette?',
      },
      {
        type: 'quiz',
        question: 'Jemand fragt „ไปไหม?“ (Kommst du mit?). Wie sagst du „Ja“?',
        options: ['ไหม', 'ไป', 'ไม่ไป'],
        answer: 1,
        explain: 'Man antwortet mit dem Verb: ไป = „(ich) gehe“ = ja. ไม่ไป wäre „nein“.',
      },
      {
        type: 'quiz',
        question: 'Wie fragt man „Wo wohnst du?“',
        options: ['ที่ไหน คุณ อยู่', 'คุณ อยู่ ที่ไหน', 'คุณ ที่ไหน อยู่'],
        answer: 1,
        explain: 'Satzbau bleibt S – V, das Fragewort ที่ไหน kommt ans Ende.',
      },
    ],
  },
  // ==================================================================
  {
    id: 'g-time',
    title: 'Zeiten ohne Konjugation',
    icon: '⏰',
    summary: 'Thai-Verben ändern sich nie – Zeit zeigt man mit Zeitangaben und kleinen Wörtern wie แล้ว, จะ, กำลัง und เคย.',
    sections: [
      {
        type: 'text',
        md: 'Kein „aß, habe gegessen, werde essen“: Das Verb **กิน** bleibt immer **กิน**. Es gibt **keine Konjugation** und **keine Zeitformen**.\n\nDie Zeit ergibt sich aus dem **Zusammenhang**, aus **Zeitangaben** (gestern, morgen) oder aus kleinen **Zeitmarkern**.',
      },
      {
        type: 'example',
        words: [w('เมื่อวาน', 'mûea-waan', 'gestern', 'TIME'), w('ผม', 'pǒm', 'ich', 'S'), w('กิน', 'gin', 'essen', 'V'), w('ข้าวผัด', 'kâao-pàt', 'Bratreis', 'O')],
        de: 'Gestern habe ich gebratenen Reis gegessen.',
        note: 'Die Vergangenheit steckt nur in เมื่อวาน – กิน bleibt gleich.',
      },
      {
        type: 'table',
        head: ['Marker', 'Umschrift', 'Stellung', 'Bedeutung'],
        rows: [
          ['แล้ว', 'láeo', 'nach Verb / Satzende', 'schon, erledigt'],
          ['จะ', 'jà', 'vor dem Verb', 'Zukunft, Absicht: „werde“'],
          ['กำลัง', 'gam-lang', 'vor dem Verb', 'gerade dabei'],
          ['อยู่', 'yòo', 'nach Verb / Satzende', 'gerade (Dauer)'],
          ['เคย', 'koei', 'vor dem Verb', 'schon einmal (Erfahrung)'],
          ['ยังไม่', 'yang mâi', 'vor dem Verb', 'noch nicht'],
        ],
      },
      {
        type: 'compare',
        title: '„schon“ (แล้ว) steht am Ende',
        de: ['Ich', 'habe', 'schon', 'gegessen'],
        th: [w('ผม', 'pǒm', 'ich', 'S'), w('กิน', 'gin', 'essen', 'V'), w('ข้าว', 'kâao', 'Reis', 'O'), w('แล้ว', 'láeo', 'schon', 'ASP')],
      },
      {
        type: 'example',
        words: [w('พรุ่งนี้', 'prûng-née', 'morgen', 'TIME'), w('ผม', 'pǒm', 'ich', 'S'), w('จะ', 'jà', 'werden', 'ASP'), w('ไป', 'bpai', 'fahren', 'V'), w('ภูเก็ต', 'poo-gèt', 'Phuket', 'O')],
        de: 'Morgen fahre ich nach Phuket.',
      },
      {
        type: 'example',
        words: [w('ผม', 'pǒm', 'ich', 'S'), w('กำลัง', 'gam-lang', 'gerade', 'ASP'), w('กิน', 'gin', 'essen', 'V'), w('ข้าว', 'kâao', 'Reis', 'O'), w('อยู่', 'yòo', '(gerade)', 'ASP')],
        de: 'Ich esse gerade.',
        note: 'กำลัง … อยู่ wird oft zusammen benutzt – eins davon reicht aber auch.',
      },
      {
        type: 'example',
        words: [w('คุณ', 'kun', 'du', 'S'), w('เคย', 'koei', 'schon mal', 'ASP'), w('ไป', 'bpai', 'gehen', 'V'), w('เชียงใหม่', 'chiang-mài', 'Chiang Mai', 'O'), w('ไหม', 'mǎi', '(Frage)', 'Q'), KRAP],
        de: 'Warst du schon mal in Chiang Mai?',
      },
      {
        type: 'tip',
        md: 'Auf **กินข้าวหรือยัง?** („Schon gegessen?“) antwortest du mit **กินแล้วครับ** („schon gegessen“) oder **ยังครับ** („noch nicht“).',
      },
      {
        type: 'table',
        head: ['Zeitangabe', 'Umschrift', 'Deutsch'],
        rows: [
          ['เมื่อวาน', 'mûea-waan', 'gestern'],
          ['วันนี้', 'wan-née', 'heute'],
          ['พรุ่งนี้', 'prûng-née', 'morgen'],
          ['ตอนนี้', 'dtorn-née', 'jetzt'],
          ['เมื่อกี้', 'mûea-gêe', 'gerade eben'],
          ['ปีหน้า', 'bpee nâa', 'nächstes Jahr'],
        ],
      },
      {
        type: 'build',
        prompt: 'Sag: „Morgen werde ich zum Markt gehen.“',
        words: [w('พรุ่งนี้', 'prûng-née', 'morgen', 'TIME'), w('ผม', 'pǒm', 'ich', 'S'), w('จะ', 'jà', 'werden', 'ASP'), w('ไป', 'bpai', 'gehen', 'V'), w('ตลาด', 'dtà-làat', 'Markt', 'O')],
        de: 'Morgen werde ich zum Markt gehen.',
      },
      {
        type: 'quiz',
        question: 'Was bedeutet ผมเคยกินทุเรียน?',
        options: ['Ich esse gerade Durian.', 'Ich habe schon mal Durian gegessen.', 'Ich werde Durian essen.'],
        answer: 1,
        explain: 'เคย vor dem Verb = „schon einmal (erlebt)“.',
      },
    ],
  },
  // ==================================================================
  {
    id: 'g-classifiers',
    title: 'Klassifikatoren (ลักษณนาม)',
    icon: '🔢',
    summary: 'Beim Zählen braucht jedes Nomen ein Zählwort: Nomen + Zahl + Klassifikator.',
    sections: [
      {
        type: 'text',
        md: 'Im Deutschen sagt man „zwei *Flaschen* Bier“ oder „ein *Stück* Kuchen“. Im Thai macht man das **bei allem**, was man zählt: Jedes Nomen hat sein **Zählwort**, den **Klassifikator** (ลักษณนาม, lák-sà-nà-naam).\n\nDie Reihenfolge ist: **Nomen + Zahl + Klassifikator**.',
      },
      {
        type: 'compare',
        title: 'Die Zahl kommt nach dem Nomen',
        de: ['zwei', 'Flaschen', 'Bier'],
        th: [w('เบียร์', 'bia', 'Bier', 'N'), w('สอง', 'sǒrng', 'zwei', 'NUM'), w('ขวด', 'kùat', 'Flasche', 'CLF')],
      },
      {
        type: 'table',
        head: ['Klassifikator', 'Umschrift', 'für', 'Beispiel'],
        rows: [
          ['คน', 'kon', 'Menschen', 'เพื่อน 2 คน – 2 Freunde'],
          ['ตัว', 'dtua', 'Tiere, Kleidung, Tische, Stühle', 'หมา 2 ตัว – 2 Hunde'],
          ['อัน', 'an', 'kleine Dinge, allgemein', 'อันนี้ – dieses Ding'],
          ['ใบ', 'bai', 'Taschen, Tickets, Blätter, Geschirr', 'ตั๋ว 2 ใบ – 2 Tickets'],
          ['ขวด', 'kùat', 'Flaschen', 'น้ำ 2 ขวด – 2 Flaschen Wasser'],
          ['จาน', 'jaan', 'Teller (Portionen)', 'ข้าวผัด 2 จาน – 2 Bratreis'],
          ['แก้ว', 'gâeo', 'Gläser (Getränke)', 'กาแฟ 2 แก้ว – 2 Kaffee'],
        ],
      },
      {
        type: 'example',
        words: [w('เพื่อน', 'pûean', 'Freund', 'N'), w('สาม', 'sǎam', 'drei', 'NUM'), w('คน', 'kon', '(Menschen)', 'CLF')],
        de: 'drei Freunde',
      },
      {
        type: 'example',
        words: [w('ข้าวผัด', 'kâao-pàt', 'Bratreis', 'N'), w('สอง', 'sǒrng', 'zwei', 'NUM'), w('จาน', 'jaan', 'Teller', 'CLF')],
        de: 'zweimal gebratener Reis',
      },
      {
        type: 'example',
        words: [w('กาแฟ', 'gaa-fae', 'Kaffee', 'N'), w('เย็น', 'yen', 'kalt', 'ADJ'), w('หนึ่ง', 'nùeng', 'eins', 'NUM'), w('แก้ว', 'gâeo', 'Glas', 'CLF')],
        de: 'ein Eiskaffee',
      },
      {
        type: 'text',
        md: 'Auch bei **„dieser/jener“** braucht man den Klassifikator: **Nomen + Klassifikator + นี้/นั้น**.',
      },
      {
        type: 'example',
        words: [w('แมว', 'maeo', 'Katze', 'N'), w('ตัว', 'dtua', '(Tier)', 'CLF'), w('นี้', 'née', 'dieser', 'ADJ'), w('น่ารัก', 'nâa-rák', 'süß', 'ADJ')],
        de: 'Diese Katze ist süß.',
      },
      {
        type: 'tip',
        md: 'Klassifikator vergessen? **อัน** ist die Notlösung für Dinge – man versteht dich trotzdem. Und **หนึ่ง** darf auch hinter dem Klassifikator stehen: เบียร์ขวด**หนึ่ง** = „eine Flasche Bier“.',
      },
      {
        type: 'build',
        prompt: 'Bestelle: „Zwei Gläser Wasser, bitte.“',
        words: [w('ขอ', 'kǒr', 'bitten um', 'V'), w('น้ำ', 'náam', 'Wasser', 'O'), w('สอง', 'sǒrng', 'zwei', 'NUM'), w('แก้ว', 'gâeo', 'Glas', 'CLF'), KRAP],
        de: 'Zwei Gläser Wasser, bitte.',
      },
      {
        type: 'quiz',
        question: 'Wie sagt man „drei Hunde“?',
        options: ['สาม หมา ตัว', 'หมา สาม ตัว', 'หมา สาม คน'],
        answer: 1,
        explain: 'Nomen + Zahl + Klassifikator. Tiere zählt man mit ตัว, nicht mit คน (Menschen).',
      },
      {
        type: 'quiz',
        question: 'Welcher Klassifikator passt zu einer Flasche Bier?',
        options: ['ขวด', 'จาน', 'คน'],
        answer: 0,
        explain: 'ขวด = Flasche: เบียร์ หนึ่ง ขวด.',
      },
    ],
  },
  // ==================================================================
  {
    id: 'g-tones',
    title: 'Die fünf Töne',
    icon: '🎵',
    summary: 'Thai hat fünf Töne – welcher Ton gilt, ergibt sich aus Konsonantenklasse, Silbenart und Tonzeichen.',
    sections: [
      {
        type: 'text',
        md: 'Im Deutschen ändert die Satzmelodie höchstens die Stimmung. Im Thai ändert der **Ton** die **Bedeutung**:\n\n**มา** (maa) = kommen, **ม้า** (máa) = Pferd, **หมา** (mǎa) = Hund.\n\nThai hat **fünf Töne**: mittel, tief, fallend, hoch und steigend.',
      },
      {
        type: 'table',
        head: ['Ton', 'Umschrift', 'Beispiel', 'Bedeutung'],
        rows: [
          ['mittel', 'ohne Zeichen: maa', 'มา', 'kommen'],
          ['tief', 'à: gài', 'ไก่', 'Huhn'],
          ['fallend', 'â: kâao', 'ข้าว', 'Reis'],
          ['hoch', 'á: máa', 'ม้า', 'Pferd'],
          ['steigend', 'ǎ: mǎa', 'หมา', 'Hund'],
        ],
      },
      {
        type: 'example',
        words: [w('ม้า', 'máa', 'Pferd', 'S'), w('มา', 'maa', 'kommen', 'V'), w('หา', 'hǎa', 'besuchen', 'V'), w('หมา', 'mǎa', 'Hund', 'O')],
        de: 'Das Pferd kommt den Hund besuchen.',
        note: 'Gleiche Laute, verschiedene Töne – verschiedene Wörter!',
      },
      {
        type: 'compare',
        title: 'Fragen: Im Deutschen hebt sich die Stimme, im Thai bleiben die Töne fest',
        de: ['Kommt', 'der', 'Hund?'],
        th: [w('หมา', 'mǎa', 'Hund', 'S'), w('มา', 'maa', 'kommen', 'V'), w('ไหม', 'mǎi', '(Frage)', 'Q')],
      },
      {
        type: 'text',
        md: 'Den Ton kann man aus der Schrift **berechnen**. Dafür brauchst du vier Dinge:\n\n1. die **Klasse** des Anfangskonsonanten (Mittel-, Hoch- oder Tiefklasse)\n\n2. ob die Silbe **lebend** oder **tot** ist\n\n3. bei toten Silben mit Tiefklasse: ob der Vokal **kurz** oder **lang** ist\n\n4. ob ein **Tonzeichen** über dem Konsonanten steht\n\n**Stummes ห vorne:** Steht ห vor einem klingenden Tiefklasse-Konsonanten (ง ญ น ม ย ร ล ว), gilt die Silbe als **Hochklasse**: **หมา** (mǎa), **หนาว** (nǎao). Ebenso macht ein stummes **อ** vor ย die Silbe zur Mittelklasse – das gibt es nur in vier Wörtern: **อยาก** (yàak), **อยู่** (yòo), **อย่า** (yàa), **อย่าง** (yàang).\n\n**Lebende Silbe** (คำเป็น): endet auf einen **langen Vokal** oder auf **m, n, ng, y, w** (ม น ง ย ว). Auch ำ, ใ, ไ und เ–า zählen als lebend.\n\n**Tote Silbe** (คำตาย): endet auf einen **kurzen Vokal** oder auf **k, p, t** (z. B. ก บ ด).',
      },
      { type: 'widget', widget: 'consonant-classes' },
      {
        type: 'table',
        head: ['Klasse', 'lebend', 'tot, kurz', 'tot, lang'],
        rows: [
          ['Mittelklasse', 'mittel', 'tief', 'tief'],
          ['Hochklasse', 'steigend', 'tief', 'tief'],
          ['Tiefklasse', 'mittel', 'hoch', 'fallend'],
        ],
      },
      {
        type: 'table',
        head: ['Klasse', '่ (máai èk)', '้ (máai toh)', '๊ (máai dtree)', '๋ (máai jàt-dtà-waa)'],
        rows: [
          ['Mittelklasse', 'tief', 'fallend', 'hoch', 'steigend'],
          ['Hochklasse', 'tief', 'fallend', '–', '–'],
          ['Tiefklasse', 'fallend', 'hoch', '–', '–'],
        ],
      },
      {
        type: 'example',
        words: [w('ค่ะ', 'kâ', '(Frau, Aussage)', 'PART'), w('คะ', 'ká', '(Frau, Frage)', 'PART')],
        de: 'Zwei Partikeln, zwei Töne',
        note: 'ค = Tiefklasse. คะ ist eine tote, kurze Silbe → hoch. ค่ะ hat máai èk → bei Tiefklasse fallend.',
      },
      { type: 'widget', widget: 'tone-calculator' },
      {
        type: 'build',
        prompt: 'Der berühmte Zungenbrecher: „Brennt neues Holz nicht?“',
        words: [w('ไม้', 'máai', 'Holz', 'S'), w('ใหม่', 'mài', 'neu', 'ADJ'), w('ไม่', 'mâi', 'nicht', 'NEG'), w('ไหม้', 'mâi', 'brennen', 'V'), w('ไหม', 'mǎi', '(Frage)', 'Q')],
        de: 'Brennt neues Holz nicht?',
      },
      {
        type: 'quiz',
        question: 'Welchen Ton hat ไก่? (ก = Mittelklasse, Tonzeichen máai èk)',
        options: ['mittel', 'tief', 'fallend', 'hoch'],
        answer: 1,
        explain: 'Mittelklasse + máai èk (่) = tiefer Ton: gài.',
      },
    ],
  },
  // ==================================================================
  {
    id: 'g-verbs-serial',
    title: 'Verbserien',
    icon: '🔗',
    summary: 'Thai reiht Verben einfach hintereinander – in der Reihenfolge, in der die Handlungen passieren.',
    sections: [
      {
        type: 'text',
        md: 'Im Deutschen braucht man „und“, „zu“ oder „um … zu“, oder das zweite Verb wandert ans Ende („Ich gehe Reis *kaufen*“).\n\nIm Thai stellt man Verben einfach **hintereinander** – in der **Reihenfolge der Handlung**: erst gehen, dann essen → **ไปกินข้าว**.',
      },
      {
        type: 'compare',
        title: 'Erst gehen, dann kaufen – genau in dieser Reihenfolge',
        de: ['Ich', 'gehe', 'Reis', 'kaufen'],
        th: [w('ผม', 'pǒm', 'ich', 'S'), w('ไป', 'bpai', 'gehen', 'V'), w('ซื้อ', 'súue', 'kaufen', 'V'), w('ข้าว', 'kâao', 'Reis', 'O')],
      },
      {
        type: 'example',
        words: [w('ไป', 'bpai', 'gehen', 'V'), w('กิน', 'gin', 'essen', 'V'), w('ข้าว', 'kâao', 'Reis', 'O'), w('กัน', 'gan', 'zusammen', 'ADV')],
        de: 'Lass uns essen gehen!',
        note: 'กัน am Ende = „zusammen, miteinander“.',
      },
      {
        type: 'text',
        md: '**ไป** und **มา** zeigen auch die **Richtung**: ไป = vom Sprecher **weg**, มา = zum Sprecher **hin**.\n\n**ไป … มา** heißt: hingehen **und zurückkommen**. ไปตลาดมา = „war (gerade) auf dem Markt“.',
      },
      {
        type: 'example',
        words: [w('ผม', 'pǒm', 'ich', 'S'), w('ไป', 'bpai', 'gehen', 'V'), w('ตลาด', 'dtà-làat', 'Markt', 'O'), w('มา', 'maa', 'kommen', 'V'), KRAP],
        de: 'Ich war gerade auf dem Markt.',
      },
      {
        type: 'example',
        words: [w('ไป', 'bpai', 'gehen', 'V'), w('ไหน', 'nǎi', 'wohin', 'Q'), w('มา', 'maa', 'kommen', 'V'), KRAP],
        de: 'Wo warst du?',
        note: 'Ein sehr häufiger, freundlicher Gruß – keine neugierige Kontrolle.',
      },
      {
        type: 'text',
        md: '**เอา … มา** = etwas **herbringen** (nehmen + kommen).\n\n**เอา … ไป** = etwas **mitnehmen / wegbringen** (nehmen + gehen).',
      },
      {
        type: 'example',
        words: [w('เอา', 'ao', 'nehmen', 'V'), w('น้ำ', 'náam', 'Wasser', 'O'), w('มา', 'maa', 'kommen', 'V'), w('หน่อย', 'nòi', 'ein bisschen', 'PART'), KRAP],
        de: 'Bring bitte etwas Wasser.',
      },
      {
        type: 'example',
        words: [w('เอา', 'ao', 'nehmen', 'V'), w('ร่ม', 'rôm', 'Schirm', 'O'), w('ไป', 'bpai', 'gehen', 'V'), w('ด้วย', 'dûai', 'auch, mit', 'ADV'), w('นะ', 'ná', '(weich)', 'PART')],
        de: 'Nimm den Schirm mit!',
      },
      {
        type: 'table',
        head: ['Verbserie', 'Umschrift', 'wörtlich', 'Bedeutung'],
        rows: [
          ['ไปกินข้าว', 'bpai gin kâao', 'gehen essen Reis', 'essen gehen'],
          ['ไปเที่ยว', 'bpai tîao', 'gehen bummeln', 'ausgehen, verreisen'],
          ['เดินไป', 'dern bpai', 'laufen gehen', 'zu Fuß gehen'],
          ['ขับรถไป', 'kàp rót bpai', 'fahren Auto gehen', 'mit dem Auto fahren'],
          ['เอา … มา', 'ao … maa', 'nehmen … kommen', 'herbringen'],
          ['เอา … ไป', 'ao … bpai', 'nehmen … gehen', 'mitnehmen'],
        ],
      },
      {
        type: 'build',
        prompt: 'Sag: „Wir gehen zusammen Kaffee trinken.“',
        words: [w('เรา', 'rao', 'wir', 'S'), w('ไป', 'bpai', 'gehen', 'V'), w('ดื่ม', 'dùuem', 'trinken', 'V'), w('กาแฟ', 'gaa-fae', 'Kaffee', 'O'), w('กัน', 'gan', 'zusammen', 'ADV')],
        de: 'Wir gehen zusammen Kaffee trinken.',
      },
      {
        type: 'quiz',
        question: 'Was heißt ไปตลาดมา?',
        options: ['Ich gehe gleich zum Markt.', 'Ich war auf dem Markt (und bin zurück).', 'Der Markt kommt.'],
        answer: 1,
        explain: 'ไป … มา = hin und wieder zurück. Die Handlung ist schon passiert.',
      },
    ],
  },
  // ==================================================================
  {
    id: 'g-want-like',
    title: 'Wollen, mögen, bestellen',
    icon: '💭',
    summary: 'อยาก + Verb = etwas tun wollen, ชอบ = mögen, ต้องการ = benötigen (formell), เอา = nehmen beim Bestellen.',
    sections: [
      {
        type: 'text',
        md: '**อยาก** (yàak) heißt „möchten, Lust haben“ – und steht **vor einem Verb**: อยาก**กิน** = „essen wollen“.\n\nAchtung: อยาก steht nicht direkt vor einem Nomen. „Ich möchte ein Auto“ heißt **อยากได้รถ** – wörtlich „möchte bekommen Auto“.',
      },
      {
        type: 'compare',
        title: 'Das zweite Verb wandert nicht ans Ende',
        de: ['Ich', 'möchte', 'Thai', 'lernen'],
        th: [w('ผม', 'pǒm', 'ich', 'S'), w('อยาก', 'yàak', 'möchten', 'V'), w('เรียน', 'rian', 'lernen', 'V'), w('ภาษาไทย', 'paa-sǎa tai', 'Thai-Sprache', 'O')],
      },
      {
        type: 'example',
        words: [w('ผม', 'pǒm', 'ich', 'S'), w('อยาก', 'yàak', 'möchten', 'V'), w('กิน', 'gin', 'essen', 'V'), w('ส้มตำ', 'sôm-dtam', 'Papayasalat', 'O')],
        de: 'Ich möchte Som Tam essen.',
      },
      {
        type: 'example',
        words: [w('ผม', 'pǒm', 'ich', 'S'), w('อยาก', 'yàak', 'möchten', 'V'), w('ได้', 'dâi', 'bekommen', 'V'), w('เสื้อ', 'sûea', 'Hemd', 'O'), w('ตัว', 'dtua', '(Kleidung)', 'CLF'), w('นี้', 'née', 'dieses', 'ADJ')],
        de: 'Ich möchte dieses Hemd haben.',
      },
      {
        type: 'text',
        md: '**ชอบ** (chôrp) heißt „mögen“ – mit **Nomen** oder mit **Verb** („gern tun“).\n\n**ต้องการ** (dtôrng-gaan) heißt „benötigen, wünschen“. Es klingt **formell** – typisch im Hotel oder in Formularen, aber steif an der Garküche.\n\nBeim **Bestellen und Einkaufen** sagt man **เอา** (ao, „nehmen“) oder **ขอ** (kǒr, „bitten um“). ขอ klingt etwas höflicher.',
      },
      {
        type: 'example',
        words: [w('ผม', 'pǒm', 'ich', 'S'), w('ชอบ', 'chôrp', 'mögen', 'V'), w('อาหาร', 'aa-hǎan', 'Essen', 'O'), w('ไทย', 'tai', 'thailändisch', 'ADJ')],
        de: 'Ich mag thailändisches Essen.',
      },
      {
        type: 'example',
        words: [w('ผม', 'pǒm', 'ich', 'S'), w('ชอบ', 'chôrp', 'mögen', 'V'), w('ว่ายน้ำ', 'wâai-náam', 'schwimmen', 'V')],
        de: 'Ich schwimme gern.',
      },
      {
        type: 'example',
        words: [w('เอา', 'ao', 'nehmen', 'V'), w('ข้าวผัด', 'kâao-pàt', 'Bratreis', 'O'), w('หนึ่ง', 'nùeng', 'eins', 'NUM'), w('จาน', 'jaan', 'Teller', 'CLF'), KRAP],
        de: 'Ich nehme einen gebratenen Reis.',
      },
      {
        type: 'table',
        head: ['Wort', 'Umschrift', 'danach', 'Bedeutung'],
        rows: [
          ['อยาก', 'yàak', 'Verb', 'möchten, Lust haben'],
          ['อยากได้', 'yàak dâi', 'Nomen', 'haben wollen'],
          ['ชอบ', 'chôrp', 'Nomen oder Verb', 'mögen, gern tun'],
          ['ต้องการ', 'dtôrng-gaan', 'Nomen oder Verb', 'benötigen (formell)'],
          ['เอา', 'ao', 'Nomen', 'nehmen (bestellen, kaufen)'],
          ['ขอ', 'kǒr', 'Nomen', 'bitte geben Sie mir …'],
        ],
      },
      {
        type: 'tip',
        md: '**ไม่เอาครับ** = „Nein danke, will ich nicht.“ Praktisch, wenn man dir an der Kasse eine Tüte anbietet: **ไม่เอาถุงครับ** (mâi ao tǔng kráp).',
      },
      {
        type: 'build',
        prompt: 'Sag: „Ich möchte Kaffee trinken.“',
        words: [w('ผม', 'pǒm', 'ich', 'S'), w('อยาก', 'yàak', 'möchten', 'V'), w('ดื่ม', 'dùuem', 'trinken', 'V'), w('กาแฟ', 'gaa-fae', 'Kaffee', 'O'), KRAP],
        de: 'Ich möchte Kaffee trinken.',
      },
      {
        type: 'quiz',
        question: 'Wie sagt man „Ich möchte ein Handy (haben)“?',
        options: ['ผม อยาก โทรศัพท์', 'ผม อยาก ได้ โทรศัพท์', 'ผม ได้ อยาก โทรศัพท์'],
        answer: 1,
        explain: 'Vor einem Nomen braucht อยาก das Verb ได้ („bekommen“): อยากได้ + Nomen.',
      },
    ],
  },
  // ==================================================================
  {
    id: 'g-comparison',
    title: 'Vergleiche',
    icon: '⚖️',
    summary: 'Adjektiv + กว่า = „-er als“, Adjektiv + ที่สุด = „am -sten“, dazu เหมือน und เท่ากัน für Gleichheit.',
    sections: [
      {
        type: 'text',
        md: 'Im Deutschen ändert sich das Adjektiv: groß → größ**er** → am größ**ten**. Im Thai bleibt es **unverändert**, man hängt nur ein Wort an:\n\n**Adjektiv + กว่า** (gwàa) = „-er (als)“\n\n**Adjektiv + ที่สุด** (têe-sùt) = „am -sten“',
      },
      {
        type: 'compare',
        title: 'Kein „ist“, und „als“ steckt in กว่า',
        de: ['Bangkok', 'ist', 'größer', 'als', 'Chiang Mai'],
        th: [w('กรุงเทพฯ', 'grung-têp', 'Bangkok', 'S'), w('ใหญ่', 'yài', 'groß', 'ADJ'), w('กว่า', 'gwàa', 'mehr als', 'ADV'), w('เชียงใหม่', 'chiang-mài', 'Chiang Mai', 'O')],
      },
      {
        type: 'example',
        words: [w('วันนี้', 'wan-née', 'heute', 'TIME'), w('ร้อน', 'rórn', 'heiß', 'ADJ'), w('กว่า', 'gwàa', 'mehr als', 'ADV'), w('เมื่อวาน', 'mûea-waan', 'gestern', 'TIME')],
        de: 'Heute ist es heißer als gestern.',
      },
      {
        type: 'example',
        words: [w('อัน', 'an', 'Stück', 'CLF'), w('นี้', 'née', 'dieses', 'ADJ'), w('ถูก', 'tòok', 'billig', 'ADJ'), w('กว่า', 'gwàa', 'mehr', 'ADV')],
        de: 'Dieses hier ist billiger.',
        note: 'Das „als …“ kann man weglassen, wenn klar ist, womit verglichen wird.',
      },
      {
        type: 'example',
        words: [w('ร้าน', 'ráan', 'Restaurant', 'S'), w('นี้', 'née', 'dieses', 'ADJ'), w('อร่อย', 'à-ròi', 'lecker', 'ADJ'), w('ที่สุด', 'têe-sùt', 'am meisten', 'ADV')],
        de: 'Dieses Restaurant ist am leckersten.',
      },
      {
        type: 'text',
        md: '**Gleichheit:**\n\n**เท่ากับ** (tâo-gàp) = „genauso … wie“ (gleich viel, gleich groß)\n\n**เท่ากัน** (tâo-gan) = „gleich (viel)“ – ohne zweites Vergleichsobjekt\n\n**เหมือน** (mǔean) = „wie, ähnlich wie“; **เหมือนกัน** = „gleich, ebenfalls“',
      },
      {
        type: 'example',
        words: [w('ผม', 'pǒm', 'ich', 'S'), w('สูง', 'sǒong', 'groß (Körper)', 'ADJ'), w('เท่ากับ', 'tâo-gàp', 'genauso wie', 'PREP'), w('พี่ชาย', 'pêe-chaai', 'älterer Bruder', 'O')],
        de: 'Ich bin genauso groß wie mein älterer Bruder.',
      },
      {
        type: 'example',
        words: [w('เขา', 'kǎo', 'sie', 'S'), w('เหมือน', 'mǔean', 'ähneln, wie', 'V'), w('แม่', 'mâe', 'Mutter', 'O')],
        de: 'Sie sieht aus wie ihre Mutter.',
      },
      {
        type: 'example',
        words: [w('ราคา', 'raa-kaa', 'Preis', 'S'), w('เท่ากัน', 'tâo-gan', 'gleich', 'ADV')],
        de: 'Der Preis ist gleich.',
      },
      {
        type: 'tip',
        md: '**มากกว่า** (mâak-gwàa) = „mehr (als)“, **น้อยกว่า** (nói-gwàa) = „weniger (als)“. „Lieber mögen“ heißt **ชอบ … มากกว่า**: ผมชอบชามากกว่ากาแฟ – „Ich mag Tee lieber als Kaffee.“',
      },
      {
        type: 'build',
        prompt: 'Sag: „Ich mag Tee lieber als Kaffee.“',
        words: [w('ผม', 'pǒm', 'ich', 'S'), w('ชอบ', 'chôrp', 'mögen', 'V'), w('ชา', 'chaa', 'Tee', 'O'), w('มากกว่า', 'mâak-gwàa', 'mehr als', 'ADV'), w('กาแฟ', 'gaa-fae', 'Kaffee', 'O')],
        de: 'Ich mag Tee lieber als Kaffee.',
      },
      {
        type: 'quiz',
        question: 'Was heißt „am teuersten“?',
        options: ['แพง กว่า', 'แพง ที่สุด', 'แพง เท่ากัน'],
        answer: 1,
        explain: 'ที่สุด nach dem Adjektiv = Superlativ: แพงที่สุด.',
      },
    ],
  },
]
