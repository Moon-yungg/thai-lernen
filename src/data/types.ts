// Gemeinsames Datenschema für alle Lerninhalte.
// Umschrift (rom): Paiboon-Stil mit Tonzeichen:
//   mittel: ohne Zeichen (gin), tief: à (gài), fallend: â (kâo), hoch: á (cháy), steigend: ǎ (kǎo)
//   Silben eines Wortes mit "-" verbinden (sà-wàt-dee), Wörter mit Leerzeichen trennen.

export type Kind = 'consonant' | 'vowel' | 'tone' | 'number' | 'word' | 'phrase' | 'sentence'

export interface Item {
  id: string // global eindeutig, z.B. "c-ko-kai", "food-rice", "s-greet-1"
  th: string // Thai-Schrift
  rom: string // Umschrift
  de: string // deutsche Hauptbedeutung (kurz!)
  alt?: string[] // weitere akzeptierte deutsche Antworten (Freitext)
  kind: Kind
  emoji?: string // Bild für Bild-Übungen (nur bei gut darstellbaren Begriffen)
  img?: string // optionaler Bildpfad (überschreibt emoji)
  tokens?: string[] // Wort-Segmentierung (phrase/sentence), tokens.join('') === th
  say?: string // Text für Sprachausgabe falls abweichend von th
  note?: string // kurze Erklärung / Eselsbrücke (deutsch)
  // nur Buchstaben:
  name?: string // Thai-Name, z.B. "กอ ไก่"
  nameRom?: string // "gor gài"
  nameDe?: string // "Huhn"
  cls?: 'mid' | 'high' | 'low' // Konsonantenklasse
  initial?: string // Anlaut, z.B. "g"
  final?: string // Auslaut, z.B. "k" ("–" = kommt nicht als Auslaut vor)
  form?: string // Vokal mit Platzhalter, z.B. "เ–ะ"
  length?: 'short' | 'long'
  draw?: string // zu zeichnende Glyphe (für Schreibübung), wenn gesetzt => Schreibübung möglich
}

export type LessonType = 'letters' | 'vocab' | 'sentences'

export interface Lesson {
  id: string
  title: string
  subtitle?: string
  icon: string // Emoji
  type: LessonType
  items: string[] // Item-IDs in Lernreihenfolge (5–9 pro Lektion ideal)
  grammar?: string // ID eines Grammatik-Themas, das vor der Lektion empfohlen wird
  dialogue?: string // ID eines Dialogs, der als Abschluss-Rollenspiel angeboten wird
}

export interface Chapter {
  id: string
  title: string
  subtitle: string
  icon: string
  color: string // Hex, z.B. "#ff6b4a"
  lessons: Lesson[]
}

// ---------- Dialoge ----------
export interface DialogueOption {
  th: string
  rom: string
  de: string
  correct: boolean
  feedback?: string // deutsch: warum falsch/richtig
}

export interface DialogueTurn {
  speaker: 'npc' | 'me'
  th: string // bei 'me': die ideale Antwort
  rom: string
  de: string
  options?: DialogueOption[] // nur bei 'me': 3 Optionen, genau eine correct (= th/rom/de)
}

export interface Dialogue {
  id: string
  title: string
  scene: string // kurze Szenenbeschreibung (deutsch)
  icon: string
  npcName: string
  npcEmoji: string
  npcGender: 'f' | 'm'
  meGender: 'm' // Lernender ist männlich -> ครับ / ผม
  turns: DialogueTurn[]
}

// ---------- Grammatik ----------
export type Role = 'S' | 'V' | 'O' | 'ADJ' | 'ADV' | 'Q' | 'NEG' | 'PART' | 'TIME' | 'CLF' | 'NUM' | 'PREP' | 'N' | 'ASP'

export interface GlossWord {
  th: string
  rom: string
  de: string // wörtliche Glosse
  role?: Role
}

export type GrammarSection =
  | { type: 'text'; md: string } // **fett** erlaubt, Absätze mit \n\n
  | { type: 'tip'; md: string }
  | { type: 'example'; words: GlossWord[]; de: string; note?: string }
  | { type: 'compare'; title: string; de: string[]; th: GlossWord[] } // deutsche vs. thailändische Wortfolge
  | { type: 'quiz'; question: string; options: string[]; answer: number; explain: string }
  | { type: 'build'; prompt: string; words: GlossWord[]; de: string } // words in korrekter Reihenfolge, wird gemischt
  | { type: 'table'; head: string[]; rows: string[][] }
  | { type: 'widget'; widget: 'tone-calculator' | 'consonant-classes' }

export interface GrammarTopic {
  id: string
  title: string
  icon: string
  summary: string // ein Satz
  sections: GrammarSection[]
}
