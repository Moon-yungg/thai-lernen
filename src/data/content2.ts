// Inhalte Kapitel 6–9: Essen & Trinken, Unterwegs & Einkaufen, Beziehung & Gefühle, Natur/Tiere/Wetter
import type { Item, Chapter } from './types'

export const items2: Item[] = [
  // =====================================================================
  // K6 – Essen & Trinken
  // =====================================================================
  // L1 Gerichte
  { id: 'k6-rice', th: 'ข้าว', rom: 'kâo', de: 'Reis', alt: ['der Reis', 'Essen'], kind: 'word', emoji: '🍚', note: 'ข้าว steht auch allgemein für „Essen“: กินข้าว = essen (gehen).' },
  { id: 'k6-padthai', th: 'ผัดไทย', rom: 'pàt-tai', de: 'Pad Thai', alt: ['Phad Thai', 'gebratene Nudeln'], kind: 'word', emoji: '🍜', note: 'ผัด = braten, ไทย = thailändisch.' },
  { id: 'k6-tomyam', th: 'ต้มยำกุ้ง', rom: 'tôm-yam-gûng', de: 'Tom Yam Gung', alt: ['Tom Yum Goong', 'scharf-saure Garnelensuppe', 'Garnelensuppe'], kind: 'word', emoji: '🍲' },
  { id: 'k6-somtam', th: 'ส้มตำ', rom: 'sôm-tam', de: 'Papayasalat', alt: ['Som Tam', 'Som Tum', 'der Papayasalat'], kind: 'word', emoji: '🥗' },
  { id: 'k6-friedrice', th: 'ข้าวผัด', rom: 'kâo-pàt', de: 'gebratener Reis', alt: ['Khao Pad', 'Bratreis'], kind: 'word', emoji: '🍛' },
  { id: 'k6-chicken', th: 'ไก่', rom: 'gài', de: 'Huhn', alt: ['Hähnchen', 'Hühnchen', 'das Huhn', 'Hühnerfleisch'], kind: 'word', emoji: '🍗' },
  { id: 'k6-pork', th: 'หมู', rom: 'mǔ', de: 'Schwein', alt: ['Schweinefleisch', 'das Schwein'], kind: 'word', emoji: '🐷' },
  { id: 'k6-shrimp', th: 'กุ้ง', rom: 'gûng', de: 'Garnele', alt: ['Garnelen', 'Shrimp', 'Shrimps', 'die Garnele', 'Krabbe'], kind: 'word', emoji: '🦐' },

  // L2 Obst & Getränke
  { id: 'k6-water', th: 'น้ำ', rom: 'nám', de: 'Wasser', alt: ['das Wasser', 'Getränk'], kind: 'word', emoji: '💧', note: 'น้ำ steht vor vielen Getränken: น้ำส้ม = Orangensaft.' },
  { id: 'k6-coffee', th: 'กาแฟ', rom: 'ga-fae', de: 'Kaffee', alt: ['der Kaffee'], kind: 'word', emoji: '☕' },
  { id: 'k6-beer', th: 'เบียร์', rom: 'bia', de: 'Bier', alt: ['das Bier'], kind: 'word', emoji: '🍺' },
  { id: 'k6-mango', th: 'มะม่วง', rom: 'má-mûang', de: 'Mango', alt: ['die Mango'], kind: 'word', emoji: '🥭' },
  { id: 'k6-banana', th: 'กล้วย', rom: 'glûay', de: 'Banane', alt: ['die Banane'], kind: 'word', emoji: '🍌' },
  { id: 'k6-durian', th: 'ทุเรียน', rom: 'tú-rian', de: 'Durian', alt: ['die Durian', 'Stinkfrucht'], kind: 'word', note: 'Die „Königin der Früchte“ – in vielen Hotels wegen des Geruchs verboten.' },
  { id: 'k6-coconut', th: 'มะพร้าว', rom: 'má-práo', de: 'Kokosnuss', alt: ['die Kokosnuss', 'Kokos'], kind: 'word', emoji: '🥥' },
  { id: 'k6-watermelon', th: 'แตงโม', rom: 'taeng-mo', de: 'Wassermelone', alt: ['die Wassermelone', 'Melone'], kind: 'word', emoji: '🍉' },

  // L3 Geschmack
  { id: 'k6-spicy', th: 'เผ็ด', rom: 'pèt', de: 'scharf', alt: ['würzig scharf'], kind: 'word', emoji: '🌶️' },
  { id: 'k6-sweet', th: 'หวาน', rom: 'wǎn', de: 'süß', kind: 'word', emoji: '🍬' },
  { id: 'k6-sour', th: 'เปรี้ยว', rom: 'prîao', de: 'sauer', kind: 'word', emoji: '🍋' },
  { id: 'k6-salty', th: 'เค็ม', rom: 'kem', de: 'salzig', kind: 'word', emoji: '🧂' },
  { id: 'k6-delicious', th: 'อร่อย', rom: 'à-rôy', de: 'lecker', alt: ['köstlich', 'schmeckt gut'], kind: 'word', emoji: '😋' },
  { id: 'k6-bitter', th: 'ขม', rom: 'kǒm', de: 'bitter', kind: 'word' },
  { id: 'k6-bland', th: 'จืด', rom: 'jùet', de: 'fade', alt: ['geschmacklos', 'ungewürzt'], kind: 'word' },
  { id: 'k6-full', th: 'อิ่ม', rom: 'ìm', de: 'satt', kind: 'word' },

  // L4 Im Restaurant
  { id: 'k6-menu', th: 'เมนู', rom: 'me-nu', de: 'Speisekarte', alt: ['Menü', 'die Speisekarte', 'Karte'], kind: 'word', emoji: '📋' },
  { id: 'k6-ask', th: 'ขอ', rom: 'kǒr', de: 'bitten um', alt: ['ich hätte gern', 'erbitten', 'um etwas bitten'], kind: 'word', note: 'ขอ + Sache = „Ich hätte gern …“ – die höfliche Art zu bestellen.' },
  { id: 'k6-checkbill', th: 'เช็คบิลด้วยครับ', rom: 'chék-bin dûay kráp', de: 'Die Rechnung, bitte.', alt: ['Rechnung bitte', 'Zahlen bitte', 'Bitte zahlen', 'Die Rechnung bitte'], kind: 'phrase', tokens: ['เช็คบิล', 'ด้วย', 'ครับ'], note: 'Aus dem Englischen „check bill“. Alternativ: เก็บเงินด้วยครับ.' },
  { id: 'k6-notspicy', th: 'ไม่เผ็ด', rom: 'mâi pèt', de: 'nicht scharf', alt: ['bitte nicht scharf', 'ohne Schärfe'], kind: 'phrase', tokens: ['ไม่', 'เผ็ด'], emoji: '🚫' },
  { id: 'k6-littlespicy', th: 'เผ็ดนิดหน่อย', rom: 'pèt nít-nòy', de: 'ein bisschen scharf', alt: ['etwas scharf', 'leicht scharf'], kind: 'phrase', tokens: ['เผ็ด', 'นิดหน่อย'] },
  { id: 'k6-verytasty', th: 'อร่อยมาก', rom: 'à-rôy mâk', de: 'sehr lecker', alt: ['sehr köstlich', 'super lecker'], kind: 'phrase', tokens: ['อร่อย', 'มาก'] },
  { id: 'k6-onemore', th: 'เอาอีกหนึ่งครับ', rom: 'ao èek nùeng kráp', de: 'Noch eins, bitte.', alt: ['Noch eins bitte', 'Noch eins', 'Noch einen bitte'], kind: 'phrase', tokens: ['เอา', 'อีก', 'หนึ่ง', 'ครับ'], note: 'เอา = nehmen/wollen, อีก = noch (mehr).' },

  // L5 Bestellen (Sätze)
  { id: 'k6-s-want-padthai', th: 'ผมอยากกินผัดไทย', rom: 'pǒm yàk gin pàt-tai', de: 'Ich möchte Pad Thai essen.', alt: ['Ich will Pad Thai essen', 'Ich möchte Pad Thai essen'], kind: 'sentence', tokens: ['ผม', 'อยาก', 'กิน', 'ผัดไทย'] },
  { id: 'k6-s-like-somtam', th: 'ผมชอบส้มตำ', rom: 'pǒm chôp sôm-tam', de: 'Ich mag Papayasalat.', alt: ['Ich mag Som Tam', 'Ich esse gern Papayasalat'], kind: 'sentence', tokens: ['ผม', 'ชอบ', 'ส้มตำ'] },
  { id: 'k6-s-order-rice', th: 'ขอข้าวผัดไก่หนึ่งจานครับ', rom: 'kǒr kâo-pàt gài nùeng jan kráp', de: 'Einmal Bratreis mit Huhn, bitte.', alt: ['Einen gebratenen Reis mit Huhn bitte', 'Einen Teller gebratenen Reis mit Huhn bitte'], kind: 'sentence', tokens: ['ขอ', 'ข้าวผัด', 'ไก่', 'หนึ่ง', 'จาน', 'ครับ'], note: 'จาน = Teller – Zählwort für Gerichte.' },
  { id: 'k6-s-no-spicy', th: 'ผมไม่กินเผ็ด', rom: 'pǒm mâi gin pèt', de: 'Ich esse nicht scharf.', alt: ['Ich esse nichts Scharfes', 'Ich esse kein scharfes Essen'], kind: 'sentence', tokens: ['ผม', 'ไม่', 'กิน', 'เผ็ด'] },
  { id: 'k6-s-tomyam-tasty', th: 'ต้มยำกุ้งอร่อยมาก', rom: 'tôm-yam-gûng à-rôy mâk', de: 'Tom Yam Gung ist sehr lecker.', alt: ['Die Tom Yam Gung ist sehr lecker', 'Die Garnelensuppe ist sehr lecker'], kind: 'sentence', tokens: ['ต้มยำกุ้ง', 'อร่อย', 'มาก'], note: 'Adjektive brauchen kein „ist“ – sie wirken selbst wie Verben.' },
  { id: 'k6-s-menu-please', th: 'ขอเมนูหน่อยครับ', rom: 'kǒr me-nu nòy kráp', de: 'Die Speisekarte, bitte.', alt: ['Die Speisekarte bitte', 'Kann ich die Speisekarte haben'], kind: 'sentence', tokens: ['ขอ', 'เมนู', 'หน่อย', 'ครับ'], note: 'หน่อย macht eine Bitte weicher („mal kurz“).' },
  { id: 'k6-s-want-beer', th: 'ผมอยากดื่มเบียร์', rom: 'pǒm yàk dùem bia', de: 'Ich möchte Bier trinken.', alt: ['Ich will Bier trinken', 'Ich möchte ein Bier trinken'], kind: 'sentence', tokens: ['ผม', 'อยาก', 'ดื่ม', 'เบียร์'] },

  // L6 Auf dem Markt (Sätze)
  { id: 'k6-s-like-mango', th: 'ผมชอบมะม่วงมาก', rom: 'pǒm chôp má-mûang mâk', de: 'Ich mag Mangos sehr.', alt: ['Ich mag Mango sehr', 'Ich liebe Mangos'], kind: 'sentence', tokens: ['ผม', 'ชอบ', 'มะม่วง', 'มาก'] },
  { id: 'k6-s-somtam-spicy', th: 'ส้มตำเผ็ดไหมครับ', rom: 'sôm-tam pèt mǎi kráp', de: 'Ist der Papayasalat scharf?', alt: ['Ist Som Tam scharf', 'Ist der Som Tam scharf'], kind: 'sentence', tokens: ['ส้มตำ', 'เผ็ด', 'ไหม', 'ครับ'] },
  { id: 'k6-s-iced-coffee', th: 'ขอกาแฟเย็นหนึ่งแก้วครับ', rom: 'kǒr ga-fae yen nùeng gâew kráp', de: 'Einen Eiskaffee, bitte.', alt: ['Einen Eiskaffee bitte', 'Ein Glas Eiskaffee bitte'], kind: 'sentence', tokens: ['ขอ', 'กาแฟ', 'เย็น', 'หนึ่ง', 'แก้ว', 'ครับ'], note: 'เย็น = kalt, แก้ว = Glas (Zählwort für Getränke).' },
  { id: 'k6-s-hungry', th: 'ผมหิวมาก', rom: 'pǒm hǐw mâk', de: 'Ich habe großen Hunger.', alt: ['Ich bin sehr hungrig', 'Ich habe sehr Hunger'], kind: 'sentence', tokens: ['ผม', 'หิว', 'มาก'] },
  { id: 'k6-s-full', th: 'ผมอิ่มแล้ว', rom: 'pǒm ìm láew', de: 'Ich bin satt.', alt: ['Ich bin schon satt'], kind: 'sentence', tokens: ['ผม', 'อิ่ม', 'แล้ว'], note: 'แล้ว am Satzende = „schon / bereits“ (Zustand erreicht).' },
  { id: 'k6-s-coconut-water', th: 'น้ำมะพร้าวอร่อย', rom: 'nám-má-práo à-rôy', de: 'Kokoswasser ist lecker.', alt: ['Das Kokoswasser ist lecker', 'Kokosnusswasser ist lecker'], kind: 'sentence', tokens: ['น้ำ', 'มะพร้าว', 'อร่อย'] },
  { id: 'k6-s-durian-sweet', th: 'ทุเรียนหวานมาก', rom: 'tú-rian wǎn mâk', de: 'Durian ist sehr süß.', alt: ['Die Durian ist sehr süß'], kind: 'sentence', tokens: ['ทุเรียน', 'หวาน', 'มาก'] },

  // =====================================================================
  // K7 – Unterwegs & Einkaufen
  // =====================================================================
  // L1 Verkehrsmittel
  { id: 'k7-taxi', th: 'แท็กซี่', rom: 'táek-sêe', de: 'Taxi', alt: ['das Taxi'], kind: 'word', emoji: '🚕' },
  { id: 'k7-bus', th: 'รถเมล์', rom: 'rót-me', de: 'Bus', alt: ['der Bus', 'Stadtbus'], kind: 'word', emoji: '🚌' },
  { id: 'k7-train', th: 'รถไฟ', rom: 'rót-fai', de: 'Zug', alt: ['der Zug', 'Bahn', 'Eisenbahn'], kind: 'word', emoji: '🚆', note: 'Wörtlich „Feuer-Wagen“: รถ = Fahrzeug, ไฟ = Feuer.' },
  { id: 'k7-tuktuk', th: 'ตุ๊กตุ๊ก', rom: 'túk-túk', de: 'Tuk-Tuk', alt: ['Tuktuk', 'das Tuk-Tuk'], kind: 'word', emoji: '🛺' },
  { id: 'k7-car', th: 'รถ', rom: 'rót', de: 'Auto', alt: ['das Auto', 'Fahrzeug', 'Wagen'], kind: 'word', emoji: '🚗' },
  { id: 'k7-plane', th: 'เครื่องบิน', rom: 'krûeang-bin', de: 'Flugzeug', alt: ['das Flugzeug'], kind: 'word', emoji: '✈️', note: 'เครื่อง = Maschine, บิน = fliegen.' },
  { id: 'k7-airport', th: 'สนามบิน', rom: 'sà-nǎm-bin', de: 'Flughafen', alt: ['der Flughafen'], kind: 'word', emoji: '🛫' },
  { id: 'k7-motorbike', th: 'มอเตอร์ไซค์', rom: 'mor-toe-sai', de: 'Motorrad', alt: ['das Motorrad', 'Moped', 'Motorradtaxi', 'Roller'], kind: 'word', emoji: '🏍️' },

  // L2 Wegbeschreibung
  { id: 'k7-left', th: 'ซ้าย', rom: 'sái', de: 'links', kind: 'word', emoji: '⬅️' },
  { id: 'k7-right', th: 'ขวา', rom: 'kwǎ', de: 'rechts', kind: 'word', emoji: '➡️' },
  { id: 'k7-straight', th: 'ตรงไป', rom: 'trong pai', de: 'geradeaus', alt: ['geradeaus fahren', 'geradeaus gehen'], kind: 'phrase', tokens: ['ตรง', 'ไป'], emoji: '⬆️' },
  { id: 'k7-turn', th: 'เลี้ยว', rom: 'líao', de: 'abbiegen', kind: 'word', emoji: '↪️' },
  { id: 'k7-here', th: 'ที่นี่', rom: 'têe-nêe', de: 'hier', kind: 'word', emoji: '📍' },
  { id: 'k7-there', th: 'ที่นั่น', rom: 'têe-nân', de: 'dort', alt: ['da', 'dort drüben'], kind: 'word' },
  { id: 'k7-near', th: 'ใกล้', rom: 'glâi', de: 'nah', alt: ['in der Nähe', 'nahe'], kind: 'word', note: 'Achtung: ใกล้ (glâi, fallend) = nah, ไกล (glai, mittel) = weit!' },
  { id: 'k7-far', th: 'ไกล', rom: 'glai', de: 'weit', alt: ['weit weg', 'fern'], kind: 'word' },

  // L3 Mit dem Taxi (Sätze)
  { id: 'k7-s-to-airport', th: 'ไปสนามบินครับ', rom: 'pai sà-nǎm-bin kráp', de: 'Zum Flughafen, bitte.', alt: ['Zum Flughafen bitte', 'Bitte zum Flughafen'], kind: 'sentence', tokens: ['ไป', 'สนามบิน', 'ครับ'] },
  { id: 'k7-s-turn-left', th: 'เลี้ยวซ้ายครับ', rom: 'líao sái kráp', de: 'Bitte links abbiegen.', alt: ['Links abbiegen bitte', 'Biegen Sie links ab'], kind: 'sentence', tokens: ['เลี้ยว', 'ซ้าย', 'ครับ'] },
  { id: 'k7-s-straight-right', th: 'ตรงไปแล้วเลี้ยวขวา', rom: 'trong pai láew líao kwǎ', de: 'Geradeaus, dann rechts abbiegen.', alt: ['Geradeaus und dann rechts abbiegen', 'Geradeaus dann rechts'], kind: 'sentence', tokens: ['ตรง', 'ไป', 'แล้ว', 'เลี้ยว', 'ขวา'], note: 'แล้ว zwischen zwei Handlungen = „und dann“.' },
  { id: 'k7-s-stop-here', th: 'จอดที่นี่ครับ', rom: 'jòt têe-nêe kráp', de: 'Bitte hier anhalten.', alt: ['Halten Sie hier', 'Hier anhalten bitte', 'Hier halten bitte'], kind: 'sentence', tokens: ['จอด', 'ที่นี่', 'ครับ'], note: 'จอด = (an)halten, parken.' },
  { id: 'k7-s-airport-far', th: 'สนามบินไกลไหมครับ', rom: 'sà-nǎm-bin glai mǎi kráp', de: 'Ist der Flughafen weit?', alt: ['Ist der Flughafen weit weg', 'Ist es weit zum Flughafen'], kind: 'sentence', tokens: ['สนามบิน', 'ไกล', 'ไหม', 'ครับ'] },
  { id: 'k7-s-where-market', th: 'ตลาดอยู่ที่ไหนครับ', rom: 'tà-làt yù têe-nǎi kráp', de: 'Wo ist der Markt?', alt: ['Wo ist der Markt bitte', 'Wo liegt der Markt'], kind: 'sentence', tokens: ['ตลาด', 'อยู่', 'ที่ไหน', 'ครับ'], note: 'ตลาด = Markt. อยู่ที่ไหน = „befindet sich wo?“' },
  { id: 'k7-s-train-chiangmai', th: 'ผมนั่งรถไฟไปเชียงใหม่', rom: 'pǒm nâng rót-fai pai chiang-mài', de: 'Ich fahre mit dem Zug nach Chiang Mai.', alt: ['Ich nehme den Zug nach Chiang Mai'], kind: 'sentence', tokens: ['ผม', 'นั่ง', 'รถไฟ', 'ไป', 'เชียงใหม่'], note: 'Mit Verkehrsmitteln „fährt“ man mit นั่ง (= sitzen).' },

  // L4 Einkaufen & Geld
  { id: 'k7-howmuch', th: 'เท่าไหร่', rom: 'tâo-rài', de: 'wie viel?', alt: ['wie viel', 'wieviel', 'was kostet'], kind: 'word', emoji: '❓' },
  { id: 'k7-baht', th: 'บาท', rom: 'bàt', de: 'Baht', alt: ['der Baht', 'Baht (Währung)'], kind: 'word', note: 'Thailändische Währung. Steht nach der Zahl: ร้อยบาท = 100 Baht.' },
  { id: 'k7-money', th: 'เงิน', rom: 'ngoen', de: 'Geld', alt: ['das Geld', 'Silber'], kind: 'word', emoji: '💰' },
  { id: 'k7-expensive', th: 'แพง', rom: 'paeng', de: 'teuer', kind: 'word', emoji: '💸' },
  { id: 'k7-cheap', th: 'ถูก', rom: 'tùk', de: 'billig', alt: ['günstig', 'preiswert'], kind: 'word', note: 'ถูก heißt auch „richtig“.' },
  { id: 'k7-discount', th: 'ลดราคา', rom: 'lót-ra-ka', de: 'Rabatt', alt: ['den Preis senken', 'Preisnachlass', 'reduziert', 'Sale'], kind: 'word', emoji: '🏷️', note: 'ลด = senken, ราคา = Preis.' },
  { id: 'k7-size', th: 'ไซส์', rom: 'sai', de: 'Größe', alt: ['die Größe', 'Kleidergröße'], kind: 'word', emoji: '📏', note: 'Aus dem Englischen „size“; formell: ขนาด.' },
  { id: 'k7-buy', th: 'ซื้อ', rom: 'súe', de: 'kaufen', alt: ['einkaufen'], kind: 'word', emoji: '🛍️' },

  // L5 Farben
  { id: 'k7-color', th: 'สี', rom: 'sěe', de: 'Farbe', alt: ['die Farbe'], kind: 'word', emoji: '🎨', note: 'Farben stehen meist mit สี davor: สีแดง = rot.' },
  { id: 'k7-red', th: 'สีแดง', rom: 'sěe-daeng', de: 'rot', alt: ['Rot'], kind: 'word', emoji: '🔴' },
  { id: 'k7-green', th: 'สีเขียว', rom: 'sěe-kǐao', de: 'grün', alt: ['Grün'], kind: 'word', emoji: '🟢' },
  { id: 'k7-blue', th: 'สีน้ำเงิน', rom: 'sěe-nám-ngoen', de: 'blau', alt: ['Blau', 'dunkelblau'], kind: 'word', emoji: '🔵', note: 'Wörtlich „Farbe Silberwasser“. Hellblau = สีฟ้า (Himmelsfarbe).' },
  { id: 'k7-yellow', th: 'สีเหลือง', rom: 'sěe-lǔeang', de: 'gelb', alt: ['Gelb'], kind: 'word', emoji: '🟡' },
  { id: 'k7-black', th: 'สีดำ', rom: 'sěe-dam', de: 'schwarz', alt: ['Schwarz'], kind: 'word', emoji: '⚫' },
  { id: 'k7-white', th: 'สีขาว', rom: 'sěe-kǎo', de: 'weiß', alt: ['Weiß'], kind: 'word', emoji: '⚪' },
  { id: 'k7-pink', th: 'สีชมพู', rom: 'sěe-chom-pu', de: 'rosa', alt: ['pink', 'Rosa'], kind: 'word', emoji: '🩷' },

  // L6 Im Hotel
  { id: 'k7-hotel', th: 'โรงแรม', rom: 'rong-raem', de: 'Hotel', alt: ['das Hotel'], kind: 'word', emoji: '🏨' },
  { id: 'k7-room', th: 'ห้อง', rom: 'hông', de: 'Zimmer', alt: ['das Zimmer', 'Raum'], kind: 'word', emoji: '🛏️' },
  { id: 'k7-book', th: 'จอง', rom: 'jong', de: 'reservieren', alt: ['buchen'], kind: 'word', emoji: '📅' },
  { id: 'k7-night', th: 'คืน', rom: 'kuen', de: 'Nacht', alt: ['die Nacht'], kind: 'word', emoji: '🌙', note: 'Auch Zählwort für Übernachtungen: สองคืน = zwei Nächte.' },
  { id: 'k7-key', th: 'กุญแจ', rom: 'gun-jae', de: 'Schlüssel', alt: ['der Schlüssel'], kind: 'word', emoji: '🔑' },
  { id: 'k7-aircon', th: 'แอร์', rom: 'ae', de: 'Klimaanlage', alt: ['die Klimaanlage', 'Air Condition'], kind: 'word', emoji: '❄️' },
  { id: 'k7-checkin', th: 'เช็คอิน', rom: 'chék-in', de: 'einchecken', alt: ['Check-in', 'Check in'], kind: 'word' },
  { id: 'k7-bathroom', th: 'ห้องน้ำ', rom: 'hông-nám', de: 'Toilette', alt: ['Bad', 'Badezimmer', 'die Toilette', 'WC'], kind: 'word', emoji: '🚽', note: 'Wörtlich „Wasser-Zimmer“ – Bad und Toilette zugleich.' },

  // L7 Einkaufen & Hotel (Sätze)
  { id: 'k7-s-howmuch', th: 'อันนี้เท่าไหร่ครับ', rom: 'an-née tâo-rài kráp', de: 'Wie viel kostet das?', alt: ['Was kostet das', 'Wie viel kostet das hier', 'Was kostet das hier'], kind: 'sentence', tokens: ['อัน', 'นี้', 'เท่าไหร่', 'ครับ'], note: 'อันนี้ = „dieses Ding hier“.' },
  { id: 'k7-s-discount', th: 'ลดราคาได้ไหมครับ', rom: 'lót-ra-ka dâi mǎi kráp', de: 'Geht es etwas billiger?', alt: ['Können Sie den Preis senken', 'Gibt es Rabatt', 'Geht es billiger'], kind: 'sentence', tokens: ['ลด', 'ราคา', 'ได้', 'ไหม', 'ครับ'], note: 'Handeln ist auf Märkten normal – immer freundlich lächeln!' },
  { id: 'k7-s-cheaper', th: 'อันนี้ถูกกว่า', rom: 'an-née tùk gwà', de: 'Das hier ist billiger.', alt: ['Dieses ist billiger', 'Das ist billiger', 'Das hier ist günstiger'], kind: 'sentence', tokens: ['อัน', 'นี้', 'ถูก', 'กว่า'] },
  { id: 'k7-s-black', th: 'มีสีดำไหมครับ', rom: 'mee sěe-dam mǎi kráp', de: 'Gibt es das in Schwarz?', alt: ['Haben Sie das in Schwarz', 'Haben Sie es in Schwarz', 'Gibt es Schwarz'], kind: 'sentence', tokens: ['มี', 'สีดำ', 'ไหม', 'ครับ'] },
  { id: 'k7-s-train-faster', th: 'รถไฟเร็วกว่ารถเมล์', rom: 'rót-fai reo gwà rót-me', de: 'Der Zug ist schneller als der Bus.', alt: ['Zug ist schneller als Bus', 'Der Zug ist schneller als der Bus'], kind: 'sentence', tokens: ['รถไฟ', 'เร็ว', 'กว่า', 'รถเมล์'], note: 'Adjektiv + กว่า + Vergleich = „…er als …“.' },
  { id: 'k7-s-best-hotel', th: 'โรงแรมนี้ดีที่สุด', rom: 'rong-raem née dee têe-sùt', de: 'Dieses Hotel ist das beste.', alt: ['Das Hotel ist das beste', 'Dieses Hotel ist am besten'], kind: 'sentence', tokens: ['โรงแรม', 'นี้', 'ดี', 'ที่สุด'], note: 'Adjektiv + ที่สุด = „am …sten“.' },
  { id: 'k7-s-booked', th: 'ผมจองห้องไว้สองคืน', rom: 'pǒm jong hông wái sǒng kuen', de: 'Ich habe ein Zimmer für zwei Nächte reserviert.', alt: ['Ich habe ein Zimmer für zwei Nächte gebucht'], kind: 'sentence', tokens: ['ผม', 'จอง', 'ห้อง', 'ไว้', 'สอง', 'คืน'], note: 'ไว้ nach dem Verb = „im Voraus / für später“.' },

  // =====================================================================
  // K8 – Beziehung & Gefühle
  // =====================================================================
  // L1 Familie
  { id: 'k8-family', th: 'ครอบครัว', rom: 'krôp-krua', de: 'Familie', alt: ['die Familie'], kind: 'word', emoji: '👨‍👩‍👧' },
  { id: 'k8-mother', th: 'แม่', rom: 'mâe', de: 'Mutter', alt: ['die Mutter', 'Mama'], kind: 'word', emoji: '👩' },
  { id: 'k8-father', th: 'พ่อ', rom: 'pôr', de: 'Vater', alt: ['der Vater', 'Papa'], kind: 'word', emoji: '👨' },
  { id: 'k8-older-brother', th: 'พี่ชาย', rom: 'pêe-chai', de: 'älterer Bruder', alt: ['großer Bruder', 'der ältere Bruder'], kind: 'word', note: 'พี่ = älteres Geschwister (auch Anrede für Ältere), ชาย = männlich.' },
  { id: 'k8-older-sister', th: 'พี่สาว', rom: 'pêe-sǎo', de: 'ältere Schwester', alt: ['große Schwester', 'die ältere Schwester'], kind: 'word', note: 'สาว = weiblich/junge Frau.' },
  { id: 'k8-younger-brother', th: 'น้องชาย', rom: 'nóng-chai', de: 'jüngerer Bruder', alt: ['kleiner Bruder', 'der jüngere Bruder'], kind: 'word', note: 'น้อง = jüngeres Geschwister. Thai unterscheidet immer älter/jünger!' },
  { id: 'k8-younger-sister', th: 'น้องสาว', rom: 'nóng-sǎo', de: 'jüngere Schwester', alt: ['kleine Schwester', 'die jüngere Schwester'], kind: 'word' },
  { id: 'k8-child', th: 'ลูก', rom: 'lûk', de: 'Kind', alt: ['eigenes Kind', 'Sohn oder Tochter', 'das Kind'], kind: 'word', emoji: '👶', note: 'ลูก = das eigene Kind. Ein Kind allgemein: เด็ก.' },

  // L2 Liebe & Partner
  { id: 'k8-partner', th: 'แฟน', rom: 'faen', de: 'Freund/Freundin', alt: ['Freundin', 'Freund', 'Partner', 'Partnerin', 'fester Freund', 'feste Freundin'], kind: 'word', emoji: '💑', note: 'แฟน = fester Partner, geschlechtsneutral (auch Ehepartner). Ein Kumpel ist เพื่อน.' },
  { id: 'k8-love', th: 'รัก', rom: 'rák', de: 'lieben', alt: ['Liebe'], kind: 'word', emoji: '❤️' },
  { id: 'k8-miss', th: 'คิดถึง', rom: 'kít-tǔeng', de: 'vermissen', alt: ['denken an', 'Sehnsucht haben'], kind: 'word', emoji: '💭', note: 'Wörtlich „denken bis zu“ – an jemanden denken.' },
  { id: 'k8-marry', th: 'แต่งงาน', rom: 'tàeng-ngan', de: 'heiraten', alt: ['Hochzeit', 'verheiratet sein'], kind: 'word', emoji: '💍' },
  { id: 'k8-pretty', th: 'สวย', rom: 'sǔay', de: 'hübsch', alt: ['schön', 'wunderschön'], kind: 'word', emoji: '🌺' },
  { id: 'k8-handsome', th: 'หล่อ', rom: 'lòr', de: 'gutaussehend', alt: ['hübsch (Mann)', 'attraktiv', 'gut aussehend'], kind: 'word', note: 'Nur für Männer. Für Frauen: สวย.' },
  { id: 'k8-date', th: 'เดท', rom: 'dèt', de: 'Date', alt: ['Verabredung', 'das Date', 'Rendezvous'], kind: 'word', emoji: '🌹', note: 'Aus dem Englischen. ไปเดท = auf ein Date gehen. Auch: นัด (Verabredung).' },
  { id: 'k8-darling', th: 'ที่รัก', rom: 'têe-rák', de: 'Schatz', alt: ['Liebling', 'mein Schatz', 'Darling'], kind: 'word', emoji: '🥰' },

  // L3 Gefühle
  { id: 'k8-glad', th: 'ดีใจ', rom: 'dee-jai', de: 'froh', alt: ['erfreut', 'glücklich', 'sich freuen'], kind: 'word', emoji: '😊', note: 'Wörtlich „gutes Herz“. Viele Gefühle werden mit ใจ (Herz) gebildet.' },
  { id: 'k8-happy', th: 'มีความสุข', rom: 'mee kwam-sùk', de: 'glücklich', alt: ['glücklich sein', 'Glück haben'], kind: 'phrase', tokens: ['มี', 'ความสุข'], emoji: '🥳', note: 'Wörtlich „Glück haben“ – ein dauerhafter, tiefer Zustand.' },
  { id: 'k8-sad', th: 'เสียใจ', rom: 'sǐa-jai', de: 'traurig', alt: ['es tut mir leid', 'betrübt'], kind: 'word', emoji: '😢', note: 'Auch: „Es tut mir leid“ (Bedauern).' },
  { id: 'k8-tired', th: 'เหนื่อย', rom: 'nùeay', de: 'müde', alt: ['erschöpft', 'kaputt'], kind: 'word', emoji: '😩', note: 'Erschöpft nach Anstrengung. Schläfrig = ง่วง.' },
  { id: 'k8-sleepy', th: 'ง่วง', rom: 'ngûang', de: 'schläfrig', alt: ['müde', 'verschlafen'], kind: 'word', emoji: '😴' },
  { id: 'k8-angry', th: 'โกรธ', rom: 'gròt', de: 'wütend', alt: ['böse', 'sauer', 'verärgert'], kind: 'word', emoji: '😠' },
  { id: 'k8-fall-in-love', th: 'ตกหลุมรัก', rom: 'tòk-lǔm-rák', de: 'sich verlieben', alt: ['verliebt', 'verliebt sein', 'verlieben'], kind: 'word', emoji: '😍', note: 'Wörtlich „in die Liebesgrube fallen“.' },
  { id: 'k8-shy', th: 'เขิน', rom: 'kǒen', de: 'verlegen', alt: ['schüchtern', 'peinlich berührt'], kind: 'word', emoji: '😳' },

  // L4 Liebe (Sätze)
  { id: 'k8-s-love', th: 'ผมรักคุณ', rom: 'pǒm rák kun', de: 'Ich liebe dich.', alt: ['Ich liebe Sie', 'Ich liebe dich'], kind: 'sentence', tokens: ['ผม', 'รัก', 'คุณ'] },
  { id: 'k8-s-miss', th: 'ผมคิดถึงคุณ', rom: 'pǒm kít-tǔeng kun', de: 'Ich vermisse dich.', alt: ['Ich denke an dich', 'Ich vermisse Sie'], kind: 'sentence', tokens: ['ผม', 'คิดถึง', 'คุณ'] },
  { id: 'k8-s-pretty', th: 'คุณสวยมาก', rom: 'kun sǔay mâk', de: 'Du bist sehr hübsch.', alt: ['Du bist sehr schön', 'Sie sind sehr hübsch', 'Du bist wunderschön'], kind: 'sentence', tokens: ['คุณ', 'สวย', 'มาก'] },
  { id: 'k8-s-eat-together', th: 'ไปกินข้าวด้วยกันไหมครับ', rom: 'pai gin kâo dûay-gan mǎi kráp', de: 'Wollen wir zusammen essen gehen?', alt: ['Gehen wir zusammen essen', 'Gehst du mit mir essen'], kind: 'sentence', tokens: ['ไป', 'กิน', 'ข้าว', 'ด้วยกัน', 'ไหม', 'ครับ'], note: 'Typische Date-Einladung. ด้วยกัน = zusammen.' },
  { id: 'k8-s-pick-up', th: 'ผมไปรับคุณนะครับ', rom: 'pǒm pai ráp kun ná kráp', de: 'Ich hole dich ab.', alt: ['Ich hole dich ab, okay', 'Ich hole Sie ab'], kind: 'sentence', tokens: ['ผม', 'ไป', 'รับ', 'คุณ', 'นะ', 'ครับ'], note: 'ไปรับ = „gehen + empfangen“ = abholen.' },
  { id: 'k8-s-have-partner', th: 'คุณมีแฟนไหมครับ', rom: 'kun mee faen mǎi kráp', de: 'Hast du einen Partner?', alt: ['Hast du einen Freund', 'Hast du eine Freundin', 'Hast du einen festen Freund', 'Haben Sie einen Partner'], kind: 'sentence', tokens: ['คุณ', 'มี', 'แฟน', 'ไหม', 'ครับ'] },
  { id: 'k8-s-fell-in-love', th: 'ผมตกหลุมรักคุณ', rom: 'pǒm tòk-lǔm-rák kun', de: 'Ich habe mich in dich verliebt.', alt: ['Ich bin in dich verliebt', 'Ich verliebe mich in dich'], kind: 'sentence', tokens: ['ผม', 'ตกหลุมรัก', 'คุณ'] },

  // L5 Familie (Sätze)
  { id: 'k8-s-older-sister', th: 'ผมมีพี่สาวหนึ่งคน', rom: 'pǒm mee pêe-sǎo nùeng kon', de: 'Ich habe eine ältere Schwester.', alt: ['Ich habe eine große Schwester'], kind: 'sentence', tokens: ['ผม', 'มี', 'พี่สาว', 'หนึ่ง', 'คน'], note: 'คน = Zählwort für Menschen.' },
  { id: 'k8-s-mother-kind', th: 'แม่ของผมใจดี', rom: 'mâe kǒng pǒm jai-dee', de: 'Meine Mutter ist nett.', alt: ['Meine Mutter ist freundlich', 'Meine Mutter ist gutherzig'], kind: 'sentence', tokens: ['แม่', 'ของ', 'ผม', 'ใจดี'], note: 'ของ = von (Besitz). ใจดี = gutherzig, nett.' },
  { id: 'k8-s-parents-well', th: 'พ่อแม่สบายดีไหมครับ', rom: 'pôr-mâe sà-bai-dee mǎi kráp', de: 'Geht es deinen Eltern gut?', alt: ['Geht es den Eltern gut', 'Wie geht es deinen Eltern'], kind: 'sentence', tokens: ['พ่อ', 'แม่', 'สบายดี', 'ไหม', 'ครับ'], note: 'พ่อแม่ = Eltern.' },
  { id: 'k8-s-brother-age', th: 'น้องชายผมอายุยี่สิบปี', rom: 'nóng-chai pǒm a-yú yêe-sìp pee', de: 'Mein jüngerer Bruder ist 20.', alt: ['Mein kleiner Bruder ist 20 Jahre alt', 'Mein jüngerer Bruder ist zwanzig Jahre alt', 'Mein kleiner Bruder ist 20'], kind: 'sentence', tokens: ['น้องชาย', 'ผม', 'อายุ', 'ยี่สิบ', 'ปี'], note: 'ของ darf im Alltag wegfallen: น้องชายผม = mein jüngerer Bruder.' },
  { id: 'k8-s-not-married', th: 'ผมยังไม่แต่งงาน', rom: 'pǒm yang mâi tàeng-ngan', de: 'Ich bin noch nicht verheiratet.', alt: ['Ich habe noch nicht geheiratet'], kind: 'sentence', tokens: ['ผม', 'ยัง', 'ไม่', 'แต่งงาน'] },
  { id: 'k8-s-family-where', th: 'ครอบครัวของคุณอยู่ที่ไหนครับ', rom: 'krôp-krua kǒng kun yù têe-nǎi kráp', de: 'Wo lebt deine Familie?', alt: ['Wo wohnt deine Familie', 'Wo ist deine Familie', 'Wo lebt Ihre Familie'], kind: 'sentence', tokens: ['ครอบครัว', 'ของ', 'คุณ', 'อยู่', 'ที่ไหน', 'ครับ'] },

  // L6 Gefühle (Sätze)
  { id: 'k8-s-tired', th: 'ผมเหนื่อยมาก', rom: 'pǒm nùeay mâk', de: 'Ich bin sehr müde.', alt: ['Ich bin total kaputt', 'Ich bin sehr erschöpft'], kind: 'sentence', tokens: ['ผม', 'เหนื่อย', 'มาก'] },
  { id: 'k8-s-glad-today', th: 'วันนี้ผมดีใจมาก', rom: 'wan-née pǒm dee-jai mâk', de: 'Heute bin ich sehr froh.', alt: ['Ich bin heute sehr froh', 'Heute freue ich mich sehr'], kind: 'sentence', tokens: ['วันนี้', 'ผม', 'ดีใจ', 'มาก'] },
  { id: 'k8-s-dont-be-sad', th: 'อย่าเสียใจนะ', rom: 'yà sǐa-jai ná', de: 'Sei nicht traurig.', alt: ['Sei nicht traurig!', 'Nicht traurig sein'], kind: 'sentence', tokens: ['อย่า', 'เสียใจ', 'นะ'], note: 'อย่า + Verb = „Tu nicht …!“' },
  { id: 'k8-s-sleepy', th: 'ผมง่วงแล้ว', rom: 'pǒm ngûang láew', de: 'Ich bin schon müde.', alt: ['Ich bin schläfrig', 'Ich bin jetzt müde'], kind: 'sentence', tokens: ['ผม', 'ง่วง', 'แล้ว'] },
  { id: 'k8-s-happy-with-you', th: 'อยู่กับคุณผมมีความสุข', rom: 'yù gàp kun pǒm mee kwam-sùk', de: 'Mit dir bin ich glücklich.', alt: ['Bei dir bin ich glücklich', 'Mit dir bin ich glücklich'], kind: 'sentence', tokens: ['อยู่', 'กับ', 'คุณ', 'ผม', 'มี', 'ความสุข'] },
  { id: 'k8-s-marry-you', th: 'ผมอยากแต่งงานกับคุณ', rom: 'pǒm yàk tàeng-ngan gàp kun', de: 'Ich möchte dich heiraten.', alt: ['Ich will dich heiraten', 'Ich möchte Sie heiraten'], kind: 'sentence', tokens: ['ผม', 'อยาก', 'แต่งงาน', 'กับ', 'คุณ'], note: 'Thai: „heiraten mit dir“ (กับ = mit).' },
  { id: 'k8-s-sweet-dreams', th: 'ฝันดีนะครับ', rom: 'fǎn dee ná kráp', de: 'Träum süß.', alt: ['Schlaf gut', 'Süße Träume', 'Träum was Schönes'], kind: 'sentence', tokens: ['ฝัน', 'ดี', 'นะ', 'ครับ'], emoji: '🌙' },

  // =====================================================================
  // K9 – Natur, Tiere & Wetter
  // =====================================================================
  // L1 Tiere
  { id: 'k9-dog', th: 'หมา', rom: 'mǎ', de: 'Hund', alt: ['der Hund'], kind: 'word', emoji: '🐶', note: 'Umgangssprachlich. Höflicher: สุนัข (sù-nák).' },
  { id: 'k9-cat', th: 'แมว', rom: 'maew', de: 'Katze', alt: ['die Katze'], kind: 'word', emoji: '🐱', note: 'Lautmalerisch – klingt wie „miau“.' },
  { id: 'k9-elephant', th: 'ช้าง', rom: 'cháng', de: 'Elefant', alt: ['der Elefant'], kind: 'word', emoji: '🐘', note: 'Nationaltier Thailands.' },
  { id: 'k9-bird', th: 'นก', rom: 'nók', de: 'Vogel', alt: ['der Vogel'], kind: 'word', emoji: '🐦' },
  { id: 'k9-fish', th: 'ปลา', rom: 'pla', de: 'Fisch', alt: ['der Fisch'], kind: 'word', emoji: '🐟' },
  { id: 'k9-monkey', th: 'ลิง', rom: 'ling', de: 'Affe', alt: ['der Affe'], kind: 'word', emoji: '🐒' },
  { id: 'k9-snake', th: 'งู', rom: 'ngu', de: 'Schlange', alt: ['die Schlange'], kind: 'word', emoji: '🐍' },
  { id: 'k9-animal', th: 'สัตว์', rom: 'sàt', de: 'Tier', alt: ['das Tier', 'Tiere'], kind: 'word', emoji: '🐾' },

  // L2 Wetter
  { id: 'k9-weather', th: 'อากาศ', rom: 'a-kàt', de: 'Wetter', alt: ['das Wetter', 'Luft'], kind: 'word', emoji: '🌤️' },
  { id: 'k9-hot', th: 'ร้อน', rom: 'rón', de: 'heiß', alt: ['warm'], kind: 'word', emoji: '🥵' },
  { id: 'k9-cold', th: 'หนาว', rom: 'nǎo', de: 'kalt', alt: ['frieren'], kind: 'word', emoji: '🥶', note: 'Kalt (Wetter, frieren). Kalte Getränke: เย็น.' },
  { id: 'k9-rain', th: 'ฝนตก', rom: 'fǒn-tòk', de: 'es regnet', alt: ['Regen', 'regnen', 'es regnet'], kind: 'phrase', tokens: ['ฝน', 'ตก'], emoji: '🌧️', note: 'Wörtlich „Regen fällt“.' },
  { id: 'k9-sun', th: 'ดวงอาทิตย์', rom: 'duang-a-tít', de: 'Sonne', alt: ['die Sonne'], kind: 'word', emoji: '☀️' },
  { id: 'k9-wind', th: 'ลม', rom: 'lom', de: 'Wind', alt: ['der Wind'], kind: 'word', emoji: '🌬️' },
  { id: 'k9-cloud', th: 'เมฆ', rom: 'mêk', de: 'Wolke', alt: ['die Wolke', 'Wolken'], kind: 'word', emoji: '☁️' },
  { id: 'k9-snow', th: 'หิมะ', rom: 'hì-má', de: 'Schnee', alt: ['der Schnee'], kind: 'word', emoji: '❄️' },

  // L3 Natur
  { id: 'k9-sea', th: 'ทะเล', rom: 'tá-le', de: 'Meer', alt: ['das Meer', 'See', 'die See', 'Ozean'], kind: 'word', emoji: '🌊' },
  { id: 'k9-beach', th: 'ชายหาด', rom: 'chai-hàt', de: 'Strand', alt: ['der Strand'], kind: 'word', emoji: '🏖️' },
  { id: 'k9-mountain', th: 'ภูเขา', rom: 'pu-kǎo', de: 'Berg', alt: ['der Berg', 'Gebirge'], kind: 'word', emoji: '⛰️' },
  { id: 'k9-tree', th: 'ต้นไม้', rom: 'tôn-mái', de: 'Baum', alt: ['der Baum', 'Pflanze'], kind: 'word', emoji: '🌳' },
  { id: 'k9-flower', th: 'ดอกไม้', rom: 'dòk-mái', de: 'Blume', alt: ['die Blume', 'Blumen'], kind: 'word', emoji: '🌸' },
  { id: 'k9-river', th: 'แม่น้ำ', rom: 'mâe-nám', de: 'Fluss', alt: ['der Fluss'], kind: 'word', emoji: '🏞️', note: 'Wörtlich „Mutter des Wassers“.' },
  { id: 'k9-island', th: 'เกาะ', rom: 'gòr', de: 'Insel', alt: ['die Insel'], kind: 'word', emoji: '🏝️', note: 'Wie in Ko Samui / Koh Phangan.' },
  { id: 'k9-waterfall', th: 'น้ำตก', rom: 'nám-tòk', de: 'Wasserfall', alt: ['der Wasserfall'], kind: 'word', note: 'Wörtlich „Wasser fällt“.' },

  // L4 Wetter & Natur (Sätze)
  { id: 'k9-s-hot-today', th: 'วันนี้ร้อนมาก', rom: 'wan-née rón mâk', de: 'Heute ist es sehr heiß.', alt: ['Es ist heute sehr heiß', 'Heute ist es heiß'], kind: 'sentence', tokens: ['วันนี้', 'ร้อน', 'มาก'], note: 'Kein „es“ nötig – Thai lässt das Subjekt weg.' },
  { id: 'k9-s-heavy-rain', th: 'ฝนตกหนัก', rom: 'fǒn tòk nàk', de: 'Es regnet stark.', alt: ['Es regnet sehr stark', 'Es regnet heftig'], kind: 'sentence', tokens: ['ฝน', 'ตก', 'หนัก'], note: 'หนัก = schwer.' },
  { id: 'k9-s-nice-weather', th: 'วันนี้อากาศดี', rom: 'wan-née a-kàt dee', de: 'Heute ist schönes Wetter.', alt: ['Das Wetter ist heute schön', 'Heute ist das Wetter gut'], kind: 'sentence', tokens: ['วันนี้', 'อากาศ', 'ดี'] },
  { id: 'k9-s-like-sea', th: 'ผมชอบไปทะเล', rom: 'pǒm chôp pai tá-le', de: 'Ich fahre gern ans Meer.', alt: ['Ich gehe gern ans Meer', 'Ich mag es, ans Meer zu fahren'], kind: 'sentence', tokens: ['ผม', 'ชอบ', 'ไป', 'ทะเล'] },
  { id: 'k9-s-afraid-dogs', th: 'ผมกลัวหมา', rom: 'pǒm glua mǎ', de: 'Ich habe Angst vor Hunden.', alt: ['Ich fürchte mich vor Hunden', 'Ich habe Angst vor dem Hund'], kind: 'sentence', tokens: ['ผม', 'กลัว', 'หมา'], note: 'กลัว = Angst haben (vor).' },
  { id: 'k9-s-cute-cat', th: 'แมวของผมน่ารักมาก', rom: 'maew kǒng pǒm nâ-rák mâk', de: 'Meine Katze ist sehr süß.', alt: ['Meine Katze ist sehr niedlich'], kind: 'sentence', tokens: ['แมว', 'ของ', 'ผม', 'น่ารัก', 'มาก'], note: 'น่ารัก = süß, niedlich (wörtlich „liebenswert“).' },
  { id: 'k9-s-mountain-cold', th: 'ที่ภูเขาหนาว', rom: 'têe pu-kǎo nǎo', de: 'In den Bergen ist es kalt.', alt: ['Auf dem Berg ist es kalt', 'Im Gebirge ist es kalt'], kind: 'sentence', tokens: ['ที่', 'ภูเขา', 'หนาว'], note: 'ที่ = an/in (Ort).' },

  // L5 Körper
  { id: 'k9-head', th: 'หัว', rom: 'hǔa', de: 'Kopf', alt: ['der Kopf'], kind: 'word', note: 'Der Kopf gilt als heilig – berühre niemandem den Kopf!' },
  { id: 'k9-eye', th: 'ตา', rom: 'ta', de: 'Auge', alt: ['das Auge', 'Augen'], kind: 'word', emoji: '👁️', note: 'ตา heißt auch „Großvater (mütterlicherseits)“.' },
  { id: 'k9-ear', th: 'หู', rom: 'hǔ', de: 'Ohr', alt: ['das Ohr', 'Ohren'], kind: 'word', emoji: '👂' },
  { id: 'k9-nose', th: 'จมูก', rom: 'jà-mùk', de: 'Nase', alt: ['die Nase'], kind: 'word', emoji: '👃' },
  { id: 'k9-mouth', th: 'ปาก', rom: 'pàk', de: 'Mund', alt: ['der Mund'], kind: 'word', emoji: '👄' },
  { id: 'k9-tooth', th: 'ฟัน', rom: 'fan', de: 'Zahn', alt: ['der Zahn', 'Zähne'], kind: 'word', emoji: '🦷' },
  { id: 'k9-hand', th: 'มือ', rom: 'mue', de: 'Hand', alt: ['die Hand', 'Hände'], kind: 'word', emoji: '✋' },
  { id: 'k9-belly', th: 'ท้อง', rom: 'tóng', de: 'Bauch', alt: ['der Bauch', 'Magen'], kind: 'word' },

  // L6 Krank sein
  { id: 'k9-sick', th: 'ป่วย', rom: 'pùay', de: 'krank', alt: ['krank sein'], kind: 'word', emoji: '🤒' },
  { id: 'k9-hurt', th: 'เจ็บ', rom: 'jèp', de: 'wehtun', alt: ['weh tun', 'Schmerzen haben', 'verletzt'], kind: 'word', emoji: '🤕' },
  { id: 'k9-headache', th: 'ปวดหัว', rom: 'pùat-hǔa', de: 'Kopfschmerzen', alt: ['Kopfweh', 'Kopfschmerzen haben'], kind: 'phrase', tokens: ['ปวด', 'หัว'], note: 'ปวด = (innerer, dumpfer) Schmerz. เจ็บ = Schmerz durch Verletzung.' },
  { id: 'k9-stomachache', th: 'ปวดท้อง', rom: 'pùat-tóng', de: 'Bauchschmerzen', alt: ['Bauchweh', 'Bauchschmerzen haben', 'Magenschmerzen'], kind: 'phrase', tokens: ['ปวด', 'ท้อง'] },
  { id: 'k9-fever', th: 'เป็นไข้', rom: 'pen kâi', de: 'Fieber haben', alt: ['Fieber'], kind: 'phrase', tokens: ['เป็น', 'ไข้'], emoji: '🌡️' },
  { id: 'k9-doctor', th: 'หมอ', rom: 'mǒr', de: 'Arzt', alt: ['der Arzt', 'Doktor', 'Ärztin'], kind: 'word', emoji: '🧑‍⚕️' },
  { id: 'k9-hospital', th: 'โรงพยาบาล', rom: 'rong-pá-ya-ban', de: 'Krankenhaus', alt: ['das Krankenhaus', 'Klinik', 'Spital'], kind: 'word', emoji: '🏥' },
  { id: 'k9-medicine', th: 'ยา', rom: 'ya', de: 'Medizin', alt: ['Medikament', 'Tablette', 'die Medizin'], kind: 'word', emoji: '💊' },

  // L7 Beim Arzt (Sätze)
  { id: 'k9-s-not-well', th: 'ผมไม่สบาย', rom: 'pǒm mâi sà-bai', de: 'Mir geht es nicht gut.', alt: ['Ich bin krank', 'Ich fühle mich nicht gut', 'Mir geht es nicht gut'], kind: 'sentence', tokens: ['ผม', 'ไม่', 'สบาย'], note: 'Die übliche, höfliche Art zu sagen, dass man krank ist.' },
  { id: 'k9-s-headache', th: 'ผมปวดหัวมาก', rom: 'pǒm pùat-hǔa mâk', de: 'Ich habe starke Kopfschmerzen.', alt: ['Ich habe sehr Kopfweh', 'Mein Kopf tut sehr weh'], kind: 'sentence', tokens: ['ผม', 'ปวด', 'หัว', 'มาก'] },
  { id: 'k9-s-hurts-here', th: 'เจ็บตรงนี้ครับ', rom: 'jèp trong-née kráp', de: 'Es tut hier weh.', alt: ['Hier tut es weh', 'Das tut hier weh'], kind: 'sentence', tokens: ['เจ็บ', 'ตรงนี้', 'ครับ'], note: 'ตรงนี้ = genau hier (an dieser Stelle).' },
  { id: 'k9-s-fever', th: 'ผมเป็นไข้', rom: 'pǒm pen kâi', de: 'Ich habe Fieber.', kind: 'sentence', tokens: ['ผม', 'เป็น', 'ไข้'] },
  { id: 'k9-s-where-hospital', th: 'โรงพยาบาลอยู่ที่ไหนครับ', rom: 'rong-pá-ya-ban yù têe-nǎi kráp', de: 'Wo ist das Krankenhaus?', alt: ['Wo ist ein Krankenhaus', 'Wo ist das nächste Krankenhaus'], kind: 'sentence', tokens: ['โรงพยาบาล', 'อยู่', 'ที่ไหน', 'ครับ'] },
  { id: 'k9-s-see-doctor', th: 'ผมต้องไปหาหมอ', rom: 'pǒm tông pai hǎ mǒr', de: 'Ich muss zum Arzt.', alt: ['Ich muss zum Arzt gehen', 'Ich muss einen Arzt aufsuchen'], kind: 'sentence', tokens: ['ผม', 'ต้อง', 'ไป', 'หา', 'หมอ'], note: 'ต้อง = müssen. ไปหา = jemanden aufsuchen.' },
  { id: 'k9-s-medicine-3x', th: 'กินยาวันละสามครั้ง', rom: 'gin ya wan lá sǎm kráng', de: 'Dreimal täglich Medizin nehmen.', alt: ['Dreimal am Tag Medizin nehmen', 'Nimm die Medizin dreimal am Tag', 'Dreimal täglich die Medizin einnehmen'], kind: 'sentence', tokens: ['กิน', 'ยา', 'วัน', 'ละ', 'สาม', 'ครั้ง'], note: 'Medizin wird „gegessen“ (กินยา). ละ = pro, ครั้ง = Mal.' },
]

export const chapters2: Chapter[] = [
  {
    id: 'k6',
    title: 'Essen & Trinken',
    subtitle: 'Gerichte, Obst, Geschmack und bestellen',
    icon: '🍜',
    color: '#ff5d73',
    lessons: [
      { id: 'k6-l1', title: 'Gerichte', subtitle: 'Thai-Klassiker', icon: '🍛', type: 'vocab', items: ['k6-rice', 'k6-padthai', 'k6-tomyam', 'k6-somtam', 'k6-friedrice', 'k6-chicken', 'k6-pork', 'k6-shrimp'] },
      { id: 'k6-l2', title: 'Obst & Getränke', subtitle: 'Vom Markt und aus dem Glas', icon: '🥭', type: 'vocab', items: ['k6-water', 'k6-coffee', 'k6-beer', 'k6-mango', 'k6-banana', 'k6-durian', 'k6-coconut', 'k6-watermelon'] },
      { id: 'k6-l3', title: 'Geschmack', subtitle: 'Scharf, süß, sauer, salzig', icon: '🌶️', type: 'vocab', items: ['k6-spicy', 'k6-sweet', 'k6-sour', 'k6-salty', 'k6-delicious', 'k6-bitter', 'k6-bland', 'k6-full'] },
      { id: 'k6-l4', title: 'Im Restaurant', subtitle: 'Wichtige Ausdrücke', icon: '🍽️', type: 'vocab', items: ['k6-menu', 'k6-ask', 'k6-notspicy', 'k6-littlespicy', 'k6-verytasty', 'k6-onemore', 'k6-checkbill'] },
      { id: 'k6-l5', title: 'Bestellen', subtitle: 'Wünsche äußern', icon: '🧑‍🍳', type: 'sentences', items: ['k6-s-menu-please', 'k6-s-want-padthai', 'k6-s-like-somtam', 'k6-s-order-rice', 'k6-s-no-spicy', 'k6-s-want-beer', 'k6-s-tomyam-tasty'], grammar: 'g-want-like', dialogue: 'd-restaurant' },
      { id: 'k6-l6', title: 'Auf dem Markt', subtitle: 'Hunger, Obst und Eiskaffee', icon: '🛒', type: 'sentences', items: ['k6-s-hungry', 'k6-s-like-mango', 'k6-s-durian-sweet', 'k6-s-somtam-spicy', 'k6-s-iced-coffee', 'k6-s-coconut-water', 'k6-s-full'], dialogue: 'd-market' },
    ],
  },
  {
    id: 'k7',
    title: 'Unterwegs & Einkaufen',
    subtitle: 'Verkehr, Wege, Preise, Farben und Hotel',
    icon: '🛺',
    color: '#f7b500',
    lessons: [
      { id: 'k7-l1', title: 'Verkehrsmittel', subtitle: 'Taxi, Bus und Tuk-Tuk', icon: '🚕', type: 'vocab', items: ['k7-taxi', 'k7-bus', 'k7-train', 'k7-tuktuk', 'k7-car', 'k7-motorbike', 'k7-plane', 'k7-airport'] },
      { id: 'k7-l2', title: 'Wegbeschreibung', subtitle: 'Links, rechts, geradeaus', icon: '🧭', type: 'vocab', items: ['k7-left', 'k7-right', 'k7-straight', 'k7-turn', 'k7-here', 'k7-there', 'k7-near', 'k7-far'] },
      { id: 'k7-l3', title: 'Mit dem Taxi', subtitle: 'Dem Fahrer den Weg sagen', icon: '🚖', type: 'sentences', items: ['k7-s-to-airport', 'k7-s-airport-far', 'k7-s-straight-right', 'k7-s-turn-left', 'k7-s-stop-here', 'k7-s-where-market', 'k7-s-train-chiangmai'], dialogue: 'd-taxi' },
      { id: 'k7-l4', title: 'Einkaufen & Geld', subtitle: 'Preise und Handeln', icon: '💰', type: 'vocab', items: ['k7-howmuch', 'k7-baht', 'k7-money', 'k7-buy', 'k7-expensive', 'k7-cheap', 'k7-discount', 'k7-size'] },
      { id: 'k7-l5', title: 'Farben', subtitle: 'Rot, grün, blau …', icon: '🎨', type: 'vocab', items: ['k7-color', 'k7-red', 'k7-green', 'k7-blue', 'k7-yellow', 'k7-black', 'k7-white', 'k7-pink'] },
      { id: 'k7-l6', title: 'Im Hotel', subtitle: 'Zimmer, Schlüssel, Klimaanlage', icon: '🏨', type: 'vocab', items: ['k7-hotel', 'k7-room', 'k7-book', 'k7-night', 'k7-checkin', 'k7-key', 'k7-aircon', 'k7-bathroom'] },
      { id: 'k7-l7', title: 'Handeln & Vergleichen', subtitle: 'Billiger, schneller, am besten', icon: '⚖️', type: 'sentences', items: ['k7-s-howmuch', 'k7-s-discount', 'k7-s-cheaper', 'k7-s-black', 'k7-s-train-faster', 'k7-s-best-hotel', 'k7-s-booked'], grammar: 'g-comparison', dialogue: 'd-hotel' },
    ],
  },
  {
    id: 'k8',
    title: 'Beziehung & Gefühle',
    subtitle: 'Familie, Liebe und Emotionen',
    icon: '💕',
    color: '#ff4fa3',
    lessons: [
      { id: 'k8-l1', title: 'Familie', subtitle: 'Älter oder jünger?', icon: '👨‍👩‍👧', type: 'vocab', items: ['k8-family', 'k8-mother', 'k8-father', 'k8-older-brother', 'k8-older-sister', 'k8-younger-brother', 'k8-younger-sister', 'k8-child'] },
      { id: 'k8-l2', title: 'Liebe & Partner', subtitle: 'Vom Date bis zur Hochzeit', icon: '💑', type: 'vocab', items: ['k8-partner', 'k8-love', 'k8-miss', 'k8-pretty', 'k8-handsome', 'k8-date', 'k8-darling', 'k8-marry'] },
      { id: 'k8-l3', title: 'Gefühle', subtitle: 'Froh, traurig, müde', icon: '😊', type: 'vocab', items: ['k8-glad', 'k8-happy', 'k8-sad', 'k8-tired', 'k8-sleepy', 'k8-angry', 'k8-shy', 'k8-fall-in-love'] },
      { id: 'k8-l4', title: 'Liebe', subtitle: 'Komplimente und Einladungen', icon: '❤️', type: 'sentences', items: ['k8-s-pretty', 'k8-s-have-partner', 'k8-s-eat-together', 'k8-s-pick-up', 'k8-s-miss', 'k8-s-fell-in-love', 'k8-s-love'], grammar: 'g-verbs-serial', dialogue: 'd-date' },
      { id: 'k8-l5', title: 'Über die Familie', subtitle: 'Geschwister und Eltern', icon: '🏡', type: 'sentences', items: ['k8-s-older-sister', 'k8-s-brother-age', 'k8-s-mother-kind', 'k8-s-parents-well', 'k8-s-family-where', 'k8-s-not-married'], dialogue: 'd-family' },
      { id: 'k8-l6', title: 'Gefühle zeigen', subtitle: 'Sagen, wie es dir geht', icon: '💬', type: 'sentences', items: ['k8-s-glad-today', 'k8-s-tired', 'k8-s-sleepy', 'k8-s-dont-be-sad', 'k8-s-happy-with-you', 'k8-s-marry-you', 'k8-s-sweet-dreams'] },
    ],
  },
  {
    id: 'k9',
    title: 'Natur, Tiere & Wetter',
    subtitle: 'Tiere, Wetter, Natur und Körper',
    icon: '🐘',
    color: '#2fbf71',
    lessons: [
      { id: 'k9-l1', title: 'Tiere', subtitle: 'Vom Hund bis zum Elefanten', icon: '🐒', type: 'vocab', items: ['k9-animal', 'k9-dog', 'k9-cat', 'k9-elephant', 'k9-bird', 'k9-fish', 'k9-monkey', 'k9-snake'] },
      { id: 'k9-l2', title: 'Wetter', subtitle: 'Heiß, kalt, Regen', icon: '🌦️', type: 'vocab', items: ['k9-weather', 'k9-hot', 'k9-cold', 'k9-rain', 'k9-sun', 'k9-wind', 'k9-cloud', 'k9-snow'] },
      { id: 'k9-l3', title: 'Natur', subtitle: 'Meer, Strand und Berge', icon: '🏝️', type: 'vocab', items: ['k9-sea', 'k9-beach', 'k9-island', 'k9-mountain', 'k9-river', 'k9-waterfall', 'k9-tree', 'k9-flower'] },
      { id: 'k9-l4', title: 'Draußen', subtitle: 'Über Wetter und Tiere reden', icon: '🌴', type: 'sentences', items: ['k9-s-hot-today', 'k9-s-nice-weather', 'k9-s-heavy-rain', 'k9-s-like-sea', 'k9-s-mountain-cold', 'k9-s-afraid-dogs', 'k9-s-cute-cat'] },
      { id: 'k9-l5', title: 'Der Körper', subtitle: 'Kopf, Hand, Auge …', icon: '✋', type: 'vocab', items: ['k9-head', 'k9-eye', 'k9-ear', 'k9-nose', 'k9-mouth', 'k9-tooth', 'k9-hand', 'k9-belly'] },
      { id: 'k9-l6', title: 'Krank sein', subtitle: 'Schmerzen, Fieber, Arzt', icon: '🤒', type: 'vocab', items: ['k9-sick', 'k9-hurt', 'k9-headache', 'k9-stomachache', 'k9-fever', 'k9-doctor', 'k9-hospital', 'k9-medicine'] },
      { id: 'k9-l7', title: 'Beim Arzt', subtitle: 'Sagen, was weh tut', icon: '🏥', type: 'sentences', items: ['k9-s-not-well', 'k9-s-headache', 'k9-s-hurts-here', 'k9-s-fever', 'k9-s-see-doctor', 'k9-s-where-hospital', 'k9-s-medicine-3x'] },
    ],
  },
]
