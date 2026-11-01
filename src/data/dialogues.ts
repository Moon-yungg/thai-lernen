import type { Dialogue, DialogueOption, DialogueTurn } from './types'

// Hilfsfunktionen: halten die richtige Option automatisch identisch mit dem Turn.
type Wrong = [th: string, rom: string, de: string, feedback: string]

const npc = (th: string, rom: string, de: string): DialogueTurn => ({ speaker: 'npc', th, rom, de })

/** pos = Position der richtigen Antwort (0–2), damit sie nicht immer oben steht. */
const me = (th: string, rom: string, de: string, wrong: [Wrong, Wrong], pos: 0 | 1 | 2, ok?: string): DialogueTurn => {
  const options: DialogueOption[] = wrong.map(([wth, wrom, wde, feedback]) => ({
    th: wth,
    rom: wrom,
    de: wde,
    correct: false,
    feedback,
  }))
  options.splice(pos, 0, { th, rom, de, correct: true, feedback: ok ?? 'Richtig!' })
  return { speaker: 'me', th, rom, de, options }
}

export const dialogues: Dialogue[] = [
  // ------------------------------------------------------------------
  {
    id: 'd-greet',
    title: 'Begrüßung mit einer Nachbarin',
    scene: 'Du triffst morgens deine ältere Nachbarin Noi vor dem Haus. Du willst gerade zum Markt.',
    icon: '👋',
    npcName: 'Noi',
    npcEmoji: '👩🏻',
    npcGender: 'f',
    meGender: 'm',
    turns: [
      npc('สวัสดีค่ะ', 'sà-wàt-dee kâ', 'Hallo!'),
      me('สวัสดีครับ', 'sà-wàt-dee kráp', 'Hallo!', [
        ['สวัสดีค่ะ', 'sà-wàt-dee kâ', 'Hallo! (weiblich)', 'ค่ะ benutzen nur Frauen. Als Mann sagst du immer ครับ.'],
        ['ขอบคุณครับ', 'kòp-kun kráp', 'Danke!', 'ขอบคุณ heißt „danke“ – du willst aber grüßen.'],
      ], 1, 'Richtig! Als Mann endest du mit ครับ.'),
      npc('สบายดีไหมคะ', 'sà-baai-dee mǎi ká', 'Wie geht es dir?'),
      me('สบายดีครับ แล้วคุณล่ะครับ', 'sà-baai-dee kráp. láew kun lâ kráp', 'Gut. Und dir?', [
        ['ไม่สบายครับ', 'mâi sà-baai kráp', 'Mir geht es nicht gut / ich bin krank.', 'ไม่สบาย heißt „krank sein“ – das wolltest du wohl nicht sagen.'],
        ['สบายดีค่ะ แล้วคุณล่ะคะ', 'sà-baai-dee kâ. láew kun lâ ká', 'Gut. Und dir? (weiblich)', 'Das sind die Frauen-Partikeln ค่ะ/คะ. Du brauchst ครับ.'],
      ], 0),
      npc('สบายดีค่ะ จะไปไหนคะ', 'sà-baai-dee kâ. jà bpai nǎi ká', 'Gut. Wohin gehst du?'),
      me('ไปตลาดครับ', 'bpai dtà-làat kráp', 'Zum Markt.', [
        ['ตลาดไปครับ', 'dtà-làat bpai kráp', 'Markt geht.', 'Falsche Reihenfolge: Das Verb ไป kommt vor das Ziel.'],
        ['ไปตลาดค่ะ', 'bpai dtà-làat kâ', 'Zum Markt. (weiblich)', 'ค่ะ ist die weibliche Partikel – richtig wäre ครับ.'],
      ], 2, 'Richtig! Das Pronomen „ich“ lässt man hier einfach weg.'),
      npc('ซื้ออะไรคะ', 'súe à-rai ká', 'Was kaufst du?'),
      me('ซื้อผลไม้ครับ', 'súe pǒn-lá-mái kráp', 'Obst.', [
        ['อะไรซื้อครับ', 'à-rai súe kráp', 'Was kauft?', 'Falsche Reihenfolge – und es ist eine Frage statt einer Antwort.'],
        ['กินข้าวแล้วครับ', 'gin kâao láew kráp', 'Ich habe schon gegessen.', 'Das passt nicht zur Frage „Was kaufst du?“.'],
      ], 0),
      npc('แล้วเจอกันนะคะ', 'láew jer gan ná ká', 'Bis später!'),
      me('แล้วเจอกันครับ', 'láew jer gan kráp', 'Bis dann!', [
        ['ลาก่อนครับ', 'laa gòrn kráp', 'Lebewohl!', 'ลาก่อน klingt nach Abschied für lange Zeit – zu dramatisch für die Nachbarin.'],
        ['เจอกันแล้วครับ', 'jer gan láew kráp', 'Wir haben uns schon getroffen.', 'แล้ว am Ende bedeutet „schon“ – die Reihenfolge ändert den Sinn.'],
      ], 1),
    ],
  },
  // ------------------------------------------------------------------
  {
    id: 'd-smalltalk',
    title: 'Kennenlernen: Name, Herkunft, Beruf',
    scene: 'Auf einer Feier spricht dich Somchai an. Du heißt Ben, kommst aus Deutschland, bist Ingenieur und lebst seit einem Jahr in Thailand.',
    icon: '🤝',
    npcName: 'Somchai',
    npcEmoji: '👨🏻',
    npcGender: 'm',
    meGender: 'm',
    turns: [
      npc('สวัสดีครับ ผมชื่อสมชาย คุณชื่ออะไรครับ', 'sà-wàt-dee kráp. pǒm chûe sǒm-chaai. kun chûe à-rai kráp', 'Hallo, ich heiße Somchai. Wie heißt du?'),
      me('ผมชื่อเบนครับ', 'pǒm chûe ben kráp', 'Ich heiße Ben.', [
        ['ชื่อผมอะไรครับ', 'chûe pǒm à-rai kráp', 'Wie ist mein Name?', 'Das ist eine Frage – und zwar nach deinem eigenen Namen.'],
        ['ฉันชื่อเบนค่ะ', 'chǎn chûe ben kâ', 'Ich heiße Ben. (weiblich)', 'ฉัน und ค่ะ benutzen Frauen. Als Mann: ผม … ครับ.'],
      ], 2),
      npc('ยินดีที่ได้รู้จักครับ', 'yin-dee têe dâai rúu-jàk kráp', 'Freut mich, dich kennenzulernen.'),
      me('ยินดีที่ได้รู้จักเหมือนกันครับ', 'yin-dee têe dâai rúu-jàk mǔean-gan kráp', 'Freut mich ebenfalls.', [
        ['ไม่เป็นไรครับ', 'mâi bpen rai kráp', 'Macht nichts.', 'ไม่เป็นไร antwortet auf eine Entschuldigung oder einen Dank – nicht hier.'],
        ['ยินดีต้อนรับครับ', 'yin-dee dtôrn-ráp kráp', 'Willkommen!', 'ยินดีต้อนรับ sagt der Gastgeber zur Begrüßung von Gästen.'],
      ], 0, 'Richtig! เหมือนกัน = „ebenfalls, gleichfalls“.'),
      npc('คุณมาจากประเทศอะไรครับ', 'kun maa jàak bprà-têt à-rai kráp', 'Aus welchem Land kommst du?'),
      me('ผมมาจากเยอรมันครับ', 'pǒm maa jàak yer-rá-man kráp', 'Ich komme aus Deutschland.', [
        ['ผมไปเยอรมันครับ', 'pǒm bpai yer-rá-man kráp', 'Ich gehe nach Deutschland.', 'ไป = „gehen/fahren“. Herkunft: มาจาก = „kommen aus“.'],
        ['เยอรมันมาจากผมครับ', 'yer-rá-man maa jàak pǒm kráp', 'Deutschland kommt von mir.', 'Subjekt und Ort sind vertauscht: ผม steht vorne.'],
      ], 0),
      npc('ทำงานอะไรครับ', 'tam-ngaan à-rai kráp', 'Was arbeitest du?'),
      me('ผมเป็นวิศวกรครับ', 'pǒm bpen wít-sà-wá-gorn kráp', 'Ich bin Ingenieur.', [
        ['ผมวิศวกรเป็นครับ', 'pǒm wít-sà-wá-gorn bpen kráp', 'Ich Ingenieur bin.', 'Kein Verb am Ende wie im deutschen Nebensatz: ผม เป็น วิศวกร.'],
        ['ผมเป็นวิศวกรค่ะ', 'pǒm bpen wít-sà-wá-gorn kâ', 'Ich bin Ingenieur. (weiblich)', 'ผม passt, aber ค่ะ ist weiblich – richtig: ครับ.'],
      ], 1, 'Richtig! Bei Berufen benutzt man เป็น („sein“).'),
      npc('อยู่เมืองไทยกี่ปีแล้วครับ', 'yùu mueang tai gèe bpee láew kráp', 'Wie viele Jahre bist du schon in Thailand?'),
      me('หนึ่งปีแล้วครับ', 'nùeng bpee láew kráp', 'Schon ein Jahr.', [
        ['พรุ่งนี้ครับ', 'prûng-née kráp', 'Morgen.', 'พรุ่งนี้ = „morgen“ – passt nicht zur Frage „wie viele Jahre“.'],
        ['หนึ่งคนแล้วครับ', 'nùeng kon láew kráp', 'Schon eine Person.', 'คน ist der Klassifikator für Menschen. Für Jahre: ปี.'],
      ], 0),
      npc('พูดภาษาไทยเก่งนะครับ', 'pûut paa-sǎa tai gèng ná kráp', 'Du sprichst aber gut Thai!'),
      me('ขอบคุณครับ ยังไม่เก่งครับ', 'kòp-kun kráp. yang mâi gèng kráp', 'Danke, noch nicht so gut.', [
        ['ครับ ผมเก่งมากครับ', 'kráp. pǒm gèng mâak kráp', 'Ja, ich bin sehr gut.', 'Grammatisch ok, aber unbescheiden. Thais schätzen Bescheidenheit.'],
        ['ขอโทษครับ', 'kǒr-tôt kráp', 'Entschuldigung.', 'Für ein Kompliment bedankt man sich – keine Entschuldigung nötig.'],
      ], 2, 'Richtig! Bescheiden auf ein Kompliment reagieren kommt gut an.'),
    ],
  },
  // ------------------------------------------------------------------
  {
    id: 'd-restaurant',
    title: 'Essen bestellen, nicht scharf, zahlen',
    scene: 'Du gehst allein in ein kleines Restaurant. Du möchtest gebratenen Reis mit Garnelen – bitte nicht scharf – und eine Flasche Wasser.',
    icon: '🍛',
    npcName: 'Fon',
    npcEmoji: '👩🏻‍🍳',
    npcGender: 'f',
    meGender: 'm',
    turns: [
      npc('สวัสดีค่ะ กี่ท่านคะ', 'sà-wàt-dee kâ. gèe tâan ká', 'Hallo! Wie viele Personen?'),
      me('คนเดียวครับ', 'kon diao kráp', 'Nur ich allein.', [
        ['เดียวคนครับ', 'diao kon kráp', '(allein Person)', 'Falsche Reihenfolge: เดียว („einzig“) steht nach คน.'],
        ['คนเดียวค่ะ', 'kon diao kâ', 'Nur ich allein. (weiblich)', 'ค่ะ ist weiblich – richtig: ครับ.'],
      ], 0),
      npc('รับอะไรดีคะ', 'ráp à-rai dee ká', 'Was darf es sein?'),
      me('ขอข้าวผัดกุ้งหนึ่งจานครับ', 'kǒr kâao-pàt gûng nùeng jaan kráp', 'Einen gebratenen Reis mit Garnelen, bitte.', [
        ['ขอหนึ่งจานข้าวผัดกุ้งครับ', 'kǒr nùeng jaan kâao-pàt gûng kráp', 'Einen Teller gebratenen Reis mit Garnelen, bitte.', 'Im Thai gilt: Nomen + Zahl + Klassifikator – also ข้าวผัดกุ้ง หนึ่ง จาน.'],
        ['ขอข้าวผัดกุ้งหนึ่งแก้วครับ', 'kǒr kâao-pàt gûng nùeng gâew kráp', 'Ein Glas gebratenen Reis, bitte.', 'แก้ว ist der Klassifikator für Gläser. Für Teller: จาน.'],
      ], 1),
      npc('เผ็ดได้ไหมคะ', 'pèt dâai mǎi ká', 'Kannst du scharf essen?'),
      me('ไม่เผ็ดนะครับ', 'mâi pèt ná kráp', 'Bitte nicht scharf.', [
        ['เผ็ดมากๆ ครับ', 'pèt mâak-mâak kráp', 'Sehr, sehr scharf.', 'Das Gegenteil von dem, was du willst!'],
        ['ไม่เผ็ดนะคะ', 'mâi pèt ná ká', 'Bitte nicht scharf. (weiblich)', 'นะคะ ist die weibliche Form. Als Mann: นะครับ.'],
      ], 0, 'Richtig! นะ macht die Bitte weicher.'),
      npc('รับน้ำอะไรดีคะ', 'ráp náam à-rai dee ká', 'Was möchtest du trinken?'),
      me('ขอน้ำเปล่าหนึ่งขวดครับ', 'kǒr náam-bplào nùeng kùat kráp', 'Eine Flasche Wasser, bitte.', [
        ['ขอน้ำเปล่าหนึ่งคนครับ', 'kǒr náam-bplào nùeng kon kráp', 'Eine Person Wasser, bitte.', 'คน zählt Menschen. Für Flaschen: ขวด.'],
        ['เอาน้ำเปล่าไหมครับ', 'ao náam-bplào mǎi kráp', 'Möchtest du Wasser?', 'Das ist eine Frage an die Kellnerin – du willst aber bestellen.'],
      ], 2),
      npc('อร่อยไหมคะ', 'à-ròi mǎi ká', 'Schmeckt es?'),
      me('อร่อยมากครับ', 'à-ròi mâak kráp', 'Sehr lecker!', [
        ['มากอร่อยครับ', 'mâak à-ròi kráp', '(sehr lecker – falsche Reihenfolge)', 'มาก („sehr“) steht nach dem Adjektiv: อร่อย มาก.'],
        ['ไม่อร่อยครับ', 'mâi à-ròi kráp', 'Schmeckt nicht.', 'Ehrlich, aber unhöflich – und der Reis war doch lecker!'],
      ], 1),
      npc('รับอะไรเพิ่มไหมคะ', 'ráp à-rai pêrm mǎi ká', 'Möchtest du noch etwas?'),
      me('ไม่ครับ เช็คบิลด้วยครับ', 'mâi kráp. chék bin dûai kráp', 'Nein danke. Die Rechnung, bitte.', [
        ['ไม่ค่ะ เช็คบิลด้วยค่ะ', 'mâi kâ. chék bin dûai kâ', 'Nein danke. Die Rechnung, bitte. (weiblich)', 'Weibliche Partikel ค่ะ – du brauchst ครับ.'],
        ['ไม่ครับ ขอเมนูด้วยครับ', 'mâi kráp. kǒr me-nuu dûai kráp', 'Nein. Die Speisekarte, bitte.', 'Du willst zahlen, nicht nochmal bestellen.'],
      ], 0, 'Richtig! เช็คบิล ist das übliche Wort für „zahlen“.'),
    ],
  },
  // ------------------------------------------------------------------
  {
    id: 'd-market',
    title: 'Obst kaufen, handeln',
    scene: 'Auf dem Markt willst du Mangos kaufen und ein bisschen handeln.',
    icon: '🥭',
    npcName: 'Lek',
    npcEmoji: '👩🏽‍🌾',
    npcGender: 'f',
    meGender: 'm',
    turns: [
      npc('เชิญค่ะ จะเอาอะไรคะ', 'chern kâ. jà ao à-rai ká', 'Bitte schön! Was möchtest du?'),
      me('มะม่วงกิโลละเท่าไรครับ', 'má-mûang gì-lo lá tâo-rài kráp', 'Wie viel kostet ein Kilo Mangos?', [
        ['มะม่วงกิโลละเท่าไรคะ', 'má-mûang gì-lo lá tâo-rài ká', 'Wie viel kostet ein Kilo Mangos? (weiblich)', 'คะ ist die weibliche Fragepartikel – du brauchst ครับ.'],
        ['มะม่วงอร่อยไหมครับ', 'má-mûang à-ròi mǎi kráp', 'Sind die Mangos lecker?', 'Nette Frage, aber du wolltest den Preis wissen.'],
      ], 0, 'Richtig! ละ = „pro“: กิโลละ … = „pro Kilo …“.'),
      npc('กิโลละแปดสิบบาทค่ะ', 'gì-lo lá bpàet-sìp bàat kâ', '80 Baht pro Kilo.'),
      me('แพงจัง ลดได้ไหมครับ', 'paeng jang. lót dâai mǎi kráp', 'Ganz schön teuer! Geht es günstiger?', [
        ['ถูกจัง ลดได้ไหมครับ', 'tùuk jang. lót dâai mǎi kráp', 'Ganz schön billig! Geht es günstiger?', 'ถูก = „billig“ – dann ergibt Handeln keinen Sinn.'],
        ['แพงจัง ลดได้ไหมคะ', 'paeng jang. lót dâai mǎi ká', 'Ganz schön teuer! Geht es günstiger? (weiblich)', 'คะ ist weiblich – richtig: ครับ.'],
      ], 0),
      npc('เจ็ดสิบบาทได้ค่ะ', 'jèt-sìp bàat dâai kâ', '70 Baht geht.'),
      me('หกสิบบาทได้ไหมครับ', 'hòk-sìp bàat dâai mǎi kráp', 'Geht auch 60 Baht?', [
        ['สิบหกบาทได้ไหมครับ', 'sìp-hòk bàat dâai mǎi kráp', 'Geht auch 16 Baht?', 'สิบหก = 16, หกสิบ = 60. Etwas zu frech gehandelt!'],
        ['ได้ไหมหกสิบบาทครับ', 'dâai mǎi hòk-sìp bàat kráp', '(Geht? 60 Baht)', 'ได้ไหม gehört ans Satzende.'],
      ], 2),
      npc('ไม่ได้ค่ะ เจ็ดสิบบาทนะคะ', 'mâi dâai kâ. jèt-sìp bàat ná ká', 'Geht nicht. 70 Baht, ja?'),
      me('โอเค เอาสองกิโลครับ', 'o-ke. ao sǒrng gì-lo kráp', 'Okay, ich nehme zwei Kilo.', [
        ['โอเค เอากิโลสองครับ', 'o-ke. ao gì-lo sǒrng kráp', '(Okay, nehme Kilo zwei)', 'Die Zahl steht vor der Einheit: สอง กิโล.'],
        ['โอเค เอาสองคนครับ', 'o-ke. ao sǒrng kon kráp', 'Okay, ich nehme zwei Personen.', 'คน zählt Menschen – du willst Kilo.'],
      ], 1, 'Richtig! เอา = „nehmen“ – so bestellt man beim Einkaufen.'),
      npc('ทั้งหมดร้อยสี่สิบบาทค่ะ', 'táng-mòt rói-sèe-sìp bàat kâ', 'Zusammen 140 Baht.'),
      me('นี่ครับ ขอบคุณครับ', 'nêe kráp. kòp-kun kráp', 'Hier, bitte. Danke!', [
        ['นี่ค่ะ ขอบคุณค่ะ', 'nêe kâ. kòp-kun kâ', 'Hier, bitte. Danke! (weiblich)', 'ค่ะ ist weiblich – richtig: ครับ.'],
        ['ไม่เป็นไรครับ', 'mâi bpen rai kráp', 'Macht nichts.', 'Passt nicht – du bezahlst gerade.'],
      ], 0),
      npc('ขอบคุณค่ะ', 'kòp-kun kâ', 'Danke!'),
    ],
  },
  // ------------------------------------------------------------------
  {
    id: 'd-taxi',
    title: 'Taxi zum Hotel',
    scene: 'Du hältst ein Taxi an und willst zum Siam Hotel. Weg: geradeaus, dann links, an der Ampel rechts.',
    icon: '🚕',
    npcName: 'Prasert',
    npcEmoji: '👨🏽‍✈️',
    npcGender: 'm',
    meGender: 'm',
    turns: [
      me('ไปโรงแรมสยามไหมครับ', 'bpai rong-raem sà-yǎam mǎi kráp', 'Fahren Sie zum Siam Hotel?', [
        ['ไปโรงแรมสยามไหมคะ', 'bpai rong-raem sà-yǎam mǎi ká', 'Fahren Sie zum Siam Hotel? (weiblich)', 'คะ ist weiblich – richtig: ครับ.'],
        ['มาโรงแรมสยามไหมครับ', 'maa rong-raem sà-yǎam mǎi kráp', 'Kommen Sie zum Siam Hotel?', 'มา = „kommen (hierher)“. Wegfahren heißt ไป.'],
      ], 1, 'Richtig! „ไป … ไหม“ ist die typische Frage an Taxifahrer.'),
      npc('ไปครับ ขึ้นมาเลยครับ', 'bpai kráp. kûen maa loei kráp', 'Ja, steig ein!'),
      me('เปิดมิเตอร์ด้วยครับ', 'bpèrt mí-dter dûai kráp', 'Bitte das Taxameter einschalten.', [
        ['ปิดมิเตอร์ด้วยครับ', 'bpìt mí-dter dûai kráp', 'Bitte das Taxameter ausschalten.', 'ปิด = „ausschalten/schließen“, เปิด = „einschalten/öffnen“.'],
        ['เปิดมิเตอร์ด้วยค่ะ', 'bpèrt mí-dter dûai kâ', 'Bitte das Taxameter einschalten. (weiblich)', 'ค่ะ ist weiblich – richtig: ครับ.'],
      ], 0),
      npc('ได้ครับ ไปทางไหนครับ', 'dâai kráp. bpai taang nǎi kráp', 'In Ordnung. Welchen Weg?'),
      me('ตรงไปแล้วเลี้ยวซ้ายครับ', 'dtrong bpai láew líao sáai kráp', 'Geradeaus und dann links.', [
        ['ตรงไปแล้วเลี้ยวขวาครับ', 'dtrong bpai láew líao kwǎa kráp', 'Geradeaus und dann rechts.', 'ขวา = rechts. Zuerst musst du aber links abbiegen (ซ้าย).'],
        ['ไปตรงแล้วซ้ายเลี้ยวครับ', 'bpai dtrong láew sáai líao kráp', '(gehen gerade, dann links abbiegen)', 'Falsche Reihenfolge: ตรงไป und เลี้ยว ซ้าย.'],
      ], 2),
      npc('เลี้ยวซ้ายตรงนี้ใช่ไหมครับ', 'líao sáai dtrong-née châi mǎi kráp', 'Hier links, richtig?'),
      me('ใช่ครับ แล้วเลี้ยวขวาที่ไฟแดงครับ', 'châi kráp. láew líao kwǎa têe fai-daeng kráp', 'Ja. Dann an der Ampel rechts.', [
        ['ใช่ครับ แล้วเลี้ยวซ้ายที่ไฟแดงครับ', 'châi kráp. láew líao sáai têe fai-daeng kráp', 'Ja. Dann an der Ampel links.', 'An der Ampel geht es nach rechts (ขวา), nicht links.'],
        ['ใช่ค่ะ แล้วเลี้ยวขวาที่ไฟแดงค่ะ', 'châi kâ. láew líao kwǎa têe fai-daeng kâ', 'Ja. Dann an der Ampel rechts. (weiblich)', 'ค่ะ ist weiblich – richtig: ครับ.'],
      ], 0, 'Richtig! ไฟแดง („rotes Licht“) = Ampel.'),
      npc('ถึงแล้วครับ', 'tǔeng láew kráp', 'Wir sind da.'),
      me('จอดตรงนี้ครับ เท่าไรครับ', 'jòrt dtrong-née kráp. tâo-rài kráp', 'Halten Sie bitte hier. Wie viel kostet es?', [
        ['จอดตรงนั้นครับ เท่าไรครับ', 'jòrt dtrong-nán kráp. tâo-rài kráp', 'Halten Sie bitte dort drüben. Wie viel kostet es?', 'ตรงนั้น = „dort drüben“. Du willst aber hier (ตรงนี้) aussteigen.'],
        ['จอดตรงนี้ค่ะ เท่าไรคะ', 'jòrt dtrong-née kâ. tâo-rài ká', 'Halten Sie bitte hier. Wie viel kostet es? (weiblich)', 'ค่ะ/คะ sind weiblich – richtig: ครับ.'],
      ], 1),
      npc('หนึ่งร้อยยี่สิบบาทครับ', 'nùeng-rói-yêe-sìp bàat kráp', '120 Baht.'),
      me('นี่ครับ ไม่ต้องทอนครับ', 'nêe kráp. mâi dtôrng torn kráp', 'Hier, bitte. Stimmt so.', [
        ['นี่ครับ ต้องทอนไม่ครับ', 'nêe kráp. dtôrng torn mâi kráp', '(Hier. Muss wechseln nicht.)', 'ไม่ steht direkt vor dem Verb: ไม่ ต้อง ทอน.'],
        ['นี่ค่ะ ไม่ต้องทอนค่ะ', 'nêe kâ. mâi dtôrng torn kâ', 'Hier, bitte. Stimmt so. (weiblich)', 'ค่ะ ist weiblich – richtig: ครับ.'],
      ], 2, 'Richtig! ไม่ต้องทอน = „kein Wechselgeld nötig“.'),
    ],
  },
  // ------------------------------------------------------------------
  {
    id: 'd-hotel',
    title: 'Check-in im Hotel',
    scene: 'Du kommst im Hotel an. Du hast ein Zimmer auf den Namen Ben reserviert.',
    icon: '🏨',
    npcName: 'Ploy',
    npcEmoji: '💁🏻‍♀️',
    npcGender: 'f',
    meGender: 'm',
    turns: [
      npc('สวัสดีค่ะ ยินดีต้อนรับค่ะ', 'sà-wàt-dee kâ. yin-dee dtôrn-ráp kâ', 'Guten Tag, herzlich willkommen!'),
      me('สวัสดีครับ ผมจองห้องไว้ครับ', 'sà-wàt-dee kráp. pǒm jorng hôrng wái kráp', 'Guten Tag. Ich habe ein Zimmer reserviert.', [
        ['สวัสดีครับ ผมห้องจองไว้ครับ', 'sà-wàt-dee kráp. pǒm hôrng jorng wái kráp', '(Guten Tag. Ich Zimmer reserviert.)', 'Verb vor Objekt: ผม จอง ห้อง.'],
        ['สวัสดีครับ ผมจะจองห้องครับ', 'sà-wàt-dee kráp. pǒm jà jorng hôrng kráp', 'Guten Tag. Ich werde ein Zimmer reservieren.', 'จะ zeigt Zukunft – du hast aber schon reserviert (… ไว้).'],
      ], 0, 'Richtig! ไว้ nach dem Verb = „im Voraus, für später“.'),
      npc('ขอชื่อด้วยค่ะ', 'kǒr chûe dûai kâ', 'Ihren Namen, bitte.'),
      me('ชื่อเบนครับ', 'chûe ben kráp', 'Ben.', [
        ['ชื่ออะไรครับ', 'chûe à-rai kráp', 'Wie heißen Sie?', 'Das ist eine Gegenfrage – sie will deinen Namen.'],
        ['ชื่อเบนค่ะ', 'chûe ben kâ', 'Ben. (weiblich)', 'ค่ะ ist weiblich – richtig: ครับ.'],
      ], 0),
      npc('ขอดูหนังสือเดินทางหน่อยค่ะ', 'kǒr duu nǎng-sǔe-dern-taang nòi kâ', 'Darf ich bitte Ihren Reisepass sehen?'),
      me('นี่ครับ', 'nêe kráp', 'Hier, bitte.', [
        ['นี่ค่ะ', 'nêe kâ', 'Hier, bitte. (weiblich)', 'ค่ะ ist weiblich – richtig: ครับ.'],
        ['ไม่มีครับ', 'mâi mee kráp', 'Habe ich nicht.', 'Ohne Pass klappt der Check-in nicht!'],
      ], 2),
      npc('ห้องสามศูนย์ห้าค่ะ นี่กุญแจค่ะ', 'hôrng sǎam-sǔun-hâa kâ. nêe gun-jae kâ', 'Zimmer 305. Hier ist der Schlüssel.'),
      me('อาหารเช้ากี่โมงครับ', 'aa-hǎan cháo gèe mong kráp', 'Um wie viel Uhr ist das Frühstück?', [
        ['อาหารเช้าเท่าไรครับ', 'aa-hǎan cháo tâo-rài kráp', 'Wie viel kostet das Frühstück?', 'เท่าไร fragt nach dem Preis. Uhrzeit: กี่โมง.'],
        ['อาหารเช้ากี่โมงคะ', 'aa-hǎan cháo gèe mong ká', 'Um wie viel Uhr ist das Frühstück? (weiblich)', 'คะ ist weiblich – richtig: ครับ.'],
      ], 1),
      npc('หกโมงเช้าถึงสิบโมงค่ะ', 'hòk mong cháo tǔeng sìp mong kâ', 'Von 6 bis 10 Uhr morgens.'),
      me('มีไวไฟไหมครับ', 'mee wai-fai mǎi kráp', 'Gibt es WLAN?', [
        ['มีไวไฟครับ', 'mee wai-fai kráp', 'Es gibt WLAN.', 'Ohne ไหม ist es eine Aussage, keine Frage.'],
        ['มีไวไฟไหมคะ', 'mee wai-fai mǎi ká', 'Gibt es WLAN? (weiblich)', 'คะ ist weiblich – richtig: ครับ.'],
      ], 0),
      npc('มีค่ะ รหัสอยู่ในห้องค่ะ', 'mee kâ. rá-hàt yùu nai hôrng kâ', 'Ja. Das Passwort liegt im Zimmer.'),
      me('ขอบคุณมากครับ', 'kòp-kun mâak kráp', 'Vielen Dank!', [
        ['ขอบคุณมากค่ะ', 'kòp-kun mâak kâ', 'Vielen Dank! (weiblich)', 'ค่ะ ist weiblich – richtig: ครับ.'],
        ['ขอโทษมากครับ', 'kǒr-tôt mâak kráp', 'Entschuldigung sehr.', 'ขอโทษ = „Entschuldigung“. Bedanken: ขอบคุณ.'],
      ], 2),
    ],
  },
  // ------------------------------------------------------------------
  {
    id: 'd-date',
    title: 'Erstes Date',
    scene: 'Du triffst Nok zum ersten Date in einem Café. Mach ihr ein Kompliment, schlag Essen vor und verabrede dich für morgen ins Kino.',
    icon: '💕',
    npcName: 'Nok',
    npcEmoji: '👩🏻',
    npcGender: 'f',
    meGender: 'm',
    turns: [
      me('สวัสดีครับคุณนก วันนี้สวยมากครับ', 'sà-wàt-dee kráp kun nók. wan-née sǔai mâak kráp', 'Hallo Nok! Du siehst heute sehr hübsch aus.', [
        ['สวัสดีครับคุณนก วันนี้หล่อมากครับ', 'sà-wàt-dee kráp kun nók. wan-née lòr mâak kráp', 'Hallo Nok! Du siehst heute sehr gutaussehend aus.', 'หล่อ sagt man zu Männern. Für Frauen: สวย („hübsch“) oder น่ารัก („süß“).'],
        ['สวัสดีค่ะคุณนก วันนี้สวยมากค่ะ', 'sà-wàt-dee kâ kun nók. wan-née sǔai mâak kâ', 'Hallo Nok! Du siehst heute sehr hübsch aus. (weiblich)', 'ค่ะ ist weiblich – richtig: ครับ.'],
      ], 2, 'Richtig! Kein „bist/siehst aus“ nötig – das Adjektiv ist selbst das Verb.'),
      npc('ขอบคุณค่ะ คุณก็หล่อนะคะ', 'kòp-kun kâ. kun gôr lòr ná ká', 'Danke! Du siehst auch gut aus.'),
      me('หิวไหมครับ ไปกินข้าวกันไหมครับ', 'hǐu mǎi kráp. bpai gin kâao gan mǎi kráp', 'Hast du Hunger? Wollen wir zusammen essen gehen?', [
        ['หิวไหมครับ กินข้าวไปกันไหมครับ', 'hǐu mǎi kráp. gin kâao bpai gan mǎi kráp', '(Hunger? Essen gehen zusammen?)', 'Bei Verbserien gilt die Reihenfolge der Handlung: erst ไป, dann กิน.'],
        ['หิวไหมคะ ไปกินข้าวกันไหมคะ', 'hǐu mǎi ká. bpai gin kâao gan mǎi ká', 'Hast du Hunger? Wollen wir essen gehen? (weiblich)', 'คะ ist weiblich – richtig: ครับ.'],
      ], 0),
      npc('ไปค่ะ อยากกินอาหารญี่ปุ่นค่ะ', 'bpai kâ. yàak gin aa-hǎan yêe-bpùn kâ', 'Gern! Ich möchte japanisch essen.'),
      me('ได้ครับ ผมก็ชอบอาหารญี่ปุ่นครับ', 'dâai kráp. pǒm gôr chôp aa-hǎan yêe-bpùn kráp', 'Gern! Ich mag japanisches Essen auch.', [
        ['ได้ครับ อาหารญี่ปุ่นชอบผมครับ', 'dâai kráp. aa-hǎan yêe-bpùn chôp pǒm kráp', 'Gern! Japanisches Essen mag mich.', 'Subjekt und Objekt vertauscht – jetzt mag das Essen dich!'],
        ['ไม่ชอบครับ', 'mâi chôp kráp', 'Mag ich nicht.', 'Sehr direkt und auf einem Date eher unhöflich.'],
      ], 1, 'Richtig! ก็ = „auch“ steht vor dem Verb.'),
      npc('คุณอยู่เมืองไทยนานไหมคะ', 'kun yùu mueang tai naan mǎi ká', 'Bleibst du lange in Thailand?'),
      me('อยู่อีกหนึ่งเดือนครับ', 'yùu èek nùeng duean kráp', 'Noch einen Monat.', [
        ['หนึ่งเดือนอีกอยู่ครับ', 'nùeng duean èek yùu kráp', '(einen Monat noch bleibe)', 'Reihenfolge: Verb + อีก + Zeitraum: อยู่ อีก หนึ่ง เดือน.'],
        ['อยู่อีกหนึ่งเดือนค่ะ', 'yùu èek nùeng duean kâ', 'Noch einen Monat. (weiblich)', 'ค่ะ ist weiblich – richtig: ครับ.'],
      ], 0),
      npc('คุณพูดภาษาไทยน่ารักจังค่ะ', 'kun pûut paa-sǎa tai nâa-rák jang kâ', 'Dein Thai klingt so süß!'),
      me('ขอบคุณครับ ขอเบอร์โทรได้ไหมครับ', 'kòp-kun kráp. kǒr ber-to dâai mǎi kráp', 'Danke! Darf ich deine Telefonnummer haben?', [
        ['ขอบคุณครับ ขอเงินได้ไหมครับ', 'kòp-kun kráp. kǒr ngern dâai mǎi kráp', 'Danke! Darf ich Geld haben?', 'เงิน = Geld. Das wäre ein sehr kurzes Date …'],
        ['ขอบคุณค่ะ ขอเบอร์โทรได้ไหมคะ', 'kòp-kun kâ. kǒr ber-to dâai mǎi ká', 'Danke! Darf ich deine Telefonnummer haben? (weiblich)', 'ค่ะ/คะ sind weiblich – richtig: ครับ.'],
      ], 1),
      npc('ได้ค่ะ แอดไลน์นะคะ', 'dâai kâ. àet lai ná ká', 'Klar, füg mich auf LINE hinzu.'),
      me('พรุ่งนี้ว่างไหมครับ ไปดูหนังกันไหมครับ', 'prûng-née wâang mǎi kráp. bpai duu nǎng gan mǎi kráp', 'Hast du morgen Zeit? Wollen wir ins Kino gehen?', [
        ['เมื่อวานว่างไหมครับ ไปดูหนังกันไหมครับ', 'mûea-waan wâang mǎi kráp. bpai duu nǎng gan mǎi kráp', 'Hattest du gestern Zeit? Wollen wir ins Kino gehen?', 'เมื่อวาน = gestern. Morgen heißt พรุ่งนี้.'],
        ['พรุ่งนี้ว่างไหมคะ ไปดูหนังกันไหมคะ', 'prûng-née wâang mǎi ká. bpai duu nǎng gan mǎi ká', 'Hast du morgen Zeit? Wollen wir ins Kino gehen? (weiblich)', 'คะ ist weiblich – richtig: ครับ.'],
      ], 0, 'Richtig! ดูหนัง („Film schauen“) = ins Kino gehen.'),
      npc('ว่างค่ะ เจอกันหกโมงเย็นนะคะ', 'wâang kâ. jer gan hòk mong yen ná ká', 'Ja, hab ich! Wir treffen uns um 18 Uhr, okay?'),
    ],
  },
  // ------------------------------------------------------------------
  {
    id: 'd-family',
    title: 'Die Familie der Freundin kennenlernen',
    scene: 'Nok stellt dich ihrer Mutter vor. Begrüße sie respektvoll mit einem Wai und frag nach Noks Geschwistern. Ältere sprechen Jüngere oft mit จ้ะ/จ๊ะ an.',
    icon: '👨‍👩‍👧‍👦',
    npcName: 'Noks Mutter',
    npcEmoji: '👵🏻',
    npcGender: 'f',
    meGender: 'm',
    turns: [
      me('สวัสดีครับคุณแม่', 'sà-wàt-dee kráp kun mâe', 'Guten Tag! (zur Mutter, mit Wai)', [
        ['สวัสดีค่ะคุณแม่', 'sà-wàt-dee kâ kun mâe', 'Guten Tag! (weiblich)', 'ค่ะ ist weiblich – richtig: ครับ.'],
        ['หวัดดีแม่', 'wàt-dee mâe', 'Hi, Mama.', 'Viel zu locker und ohne ครับ – bei den Eltern der Freundin unhöflich.'],
      ], 1, 'Richtig! Die Eltern der Partnerin nennt man respektvoll คุณแม่ / คุณพ่อ.'),
      npc('สวัสดีจ้ะ ชื่ออะไรจ๊ะ', 'sà-wàt-dee jâ. chûe à-rai já', 'Hallo, mein Lieber. Wie heißt du?'),
      me('ผมชื่อเบนครับ เป็นแฟนของนกครับ', 'pǒm chûe ben kráp. bpen faen kǒrng nók kráp', 'Ich heiße Ben. Ich bin Noks Freund.', [
        ['ผมชื่อเบนครับ เป็นพ่อของนกครับ', 'pǒm chûe ben kráp. bpen pôr kǒrng nók kráp', 'Ich heiße Ben. Ich bin Noks Vater.', 'พ่อ = Vater. Freund/Freundin heißt แฟน.'],
        ['ผมชื่อเบนครับ เป็นนกของแฟนครับ', 'pǒm chûe ben kráp. bpen nók kǒrng faen kráp', 'Ich heiße Ben. Ich bin der Nok des Freundes.', 'Besitz: Sache + ของ + Besitzer → แฟน ของ นก.'],
      ], 0),
      npc('ยินดีต้อนรับจ้ะ นั่งก่อนจ้ะ', 'yin-dee dtôrn-ráp jâ. nâng gòrn jâ', 'Willkommen! Setz dich erst mal.'),
      me('ขอบคุณครับ นี่ผลไม้สำหรับคุณแม่ครับ', 'kòp-kun kráp. nêe pǒn-lá-mái sǎm-ràp kun mâe kráp', 'Danke. Hier ist etwas Obst für Sie.', [
        ['ขอบคุณครับ นี่ผลไม้สำหรับผมครับ', 'kòp-kun kráp. nêe pǒn-lá-mái sǎm-ràp pǒm kráp', 'Danke. Hier ist Obst für mich.', 'สำหรับ ผม = „für mich“ – das Geschenk ist aber für die Mutter.'],
        ['ขอบคุณค่ะ นี่ผลไม้สำหรับคุณแม่ค่ะ', 'kòp-kun kâ. nêe pǒn-lá-mái sǎm-ràp kun mâe kâ', 'Danke. Hier ist Obst für Sie. (weiblich)', 'ค่ะ ist weiblich – richtig: ครับ.'],
      ], 2, 'Richtig! Man spricht die Mutter mit คุณแม่ statt mit คุณ an.'),
      npc('น่ารักจังเลย นกมีพี่สาวหนึ่งคนกับน้องชายหนึ่งคนนะ', 'nâa-rák jang loei. nók mee pêe-sǎao nùeng kon gàp nórng-chaai nùeng kon ná', 'Wie lieb! Nok hat eine ältere Schwester und einen jüngeren Bruder.'),
      me('พี่สาวชื่ออะไรครับ', 'pêe-sǎao chûe à-rai kráp', 'Wie heißt die ältere Schwester?', [
        ['น้องสาวชื่ออะไรครับ', 'nórng-sǎao chûe à-rai kráp', 'Wie heißt die jüngere Schwester?', 'น้องสาว = jüngere Schwester. Nok hat eine ältere: พี่สาว.'],
        ['อะไรชื่อพี่สาวครับ', 'à-rai chûe pêe-sǎao kráp', '(Was heißt ältere Schwester?)', 'Fragewörter wie อะไร bleiben am Satzende.'],
      ], 0),
      npc('ชื่อแพรจ้ะ ทำงานที่ธนาคาร', 'chûe prae jâ. tam-ngaan têe tá-naa-kaan', 'Sie heißt Prae. Sie arbeitet bei einer Bank.'),
      me('น้องชายอายุเท่าไรครับ', 'nórng-chaai aa-yú tâo-rài kráp', 'Wie alt ist der jüngere Bruder?', [
        ['พี่ชายอายุเท่าไรครับ', 'pêe-chaai aa-yú tâo-rài kráp', 'Wie alt ist der ältere Bruder?', 'พี่ชาย = älterer Bruder. Nok hat einen jüngeren: น้องชาย.'],
        ['น้องชายกี่คนครับ', 'nórng-chaai gèe kon kráp', 'Wie viele jüngere Brüder?', 'Das hat die Mutter schon gesagt: einen. Du wolltest das Alter wissen.'],
      ], 1),
      npc('สิบเก้าปีจ้ะ ยังเรียนอยู่', 'sìp-gâo bpee jâ. yang rian yùu', '19 Jahre. Er studiert noch.'),
      me('ครอบครัวน่ารักมากครับ', 'krôrp-krua nâa-rák mâak kráp', 'Eine sehr liebe Familie!', [
        ['ครอบครัวมากน่ารักครับ', 'krôrp-krua mâak nâa-rák kráp', '(Familie sehr lieb – falsche Reihenfolge)', 'มาก steht nach dem Adjektiv: น่ารัก มาก.'],
        ['ครอบครัวน่ารักมากค่ะ', 'krôrp-krua nâa-rák mâak kâ', 'Eine sehr liebe Familie! (weiblich)', 'ค่ะ ist weiblich – richtig: ครับ.'],
      ], 0),
      npc('ขอบใจจ้ะ มากินข้าวด้วยกันนะ', 'kòp-jai jâ. maa gin kâao dûai-gan ná', 'Danke, mein Lieber. Komm, iss mit uns!'),
    ],
  },
]
