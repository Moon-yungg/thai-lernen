import { chapterOfItem, getItem, items as allItems, toneSetOf, type Item } from '../data'
import { readingDistractors, syllables, toneOf } from './tones'
import { getProgress } from './store'
import { canRecognize } from './speech'
import { serverAvailable } from './server'

export interface ChoiceOpt {
  id: string
  th?: string // Thai-Text (groß)
  text?: string // deutscher Text / Laut
  sub?: string
  emoji?: string
  speak?: string // beim Antippen vorlesen
}

export interface Prompt {
  title: string
  th?: string
  sub?: string
  text?: string
  emoji?: string
  audio?: string // Text der automatisch vorgelesen wird
  bigTh?: boolean
}

export type Ex = { key: string; item: Item; retry?: boolean } & (
  | { t: 'intro' }
  | { t: 'flash'; claim: string; claimEmoji?: string; truth: boolean } // Swipe-Karte: Aussage stimmt / stimmt nicht
  | { t: 'choice'; prompt: Prompt; options: ChoiceOpt[]; answer: string; grid?: boolean; kind: string }
  | { t: 'match'; pairs: Item[] }
  | { t: 'build'; mode: 'translate' | 'listen'; extra: string[] }
  | { t: 'cloze'; gap: number; options: string[] }
  | { t: 'type'; mode: 'de' | 'th' }
  | { t: 'speak' }
  | { t: 'draw'; trace: boolean }
  | { t: 'tone'; syl: number } // Ton-Hörtraining: Ton einer Silbe bestimmen
)

let keyN = 0
const k = () => 'e' + keyN++

export const shuffle = <T,>(a: T[]): T[] => {
  const r = [...a]
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[r[i], r[j]] = [r[j], r[i]]
  }
  return r
}
const pick = <T,>(a: T[]): T => a[Math.floor(Math.random() * a.length)]

export const sayText = (i: Item) => i.say || i.th
const isLetter = (i: Item) => i.kind === 'consonant' || i.kind === 'vowel' || i.kind === 'tone'
const isSentence = (i: Item) => (i.kind === 'sentence' || i.kind === 'phrase') && (i.tokens?.length ?? 0) >= 2
const family = (i: Item) => (isLetter(i) ? i.kind : isSentence(i) ? 'sentence' : 'word')

export const letterLabel = (i: Item) =>
  i.kind === 'consonant' ? `${i.initial} · ${i.nameDe}` : i.kind === 'vowel' ? `${i.rom} · ${i.length === 'long' ? 'lang' : 'kurz'}` : i.de

// Ablenker wählen: zuerst aus dem aktuellen Kontext, dann aus dem Kapitel, dann global
function distractors(item: Item, n: number, ctx: Item[], key: (i: Item) => string | undefined): Item[] {
  const fam = family(item)
  const used = new Set([key(item), item.th, item.de])
  const out: Item[] = []
  const ch = chapterOfItem.get(item.id)
  const tiers = [
    shuffle(ctx),
    shuffle(allItems.filter((i) => chapterOfItem.get(i.id) === ch)),
    shuffle(allItems),
  ]
  for (const tier of tiers)
    for (const c of tier) {
      if (out.length >= n) return out
      const kv = key(c)
      if (c.id === item.id || family(c) !== fam || !kv || used.has(kv) || used.has(c.th) || used.has(c.de)) continue
      used.add(kv)
      used.add(c.th)
      used.add(c.de)
      out.push(c)
    }
  return out
}

function choice(item: Item, ctx: Item[], kind: string): Ex | null {
  const opt = (i: Item, f: 'th' | 'de' | 'emoji' | 'letter'): ChoiceOpt =>
    f === 'th'
      ? { id: i.id, th: i.th, speak: sayText(i), sub: getProgress().settings.romInOptions ? i.rom : undefined }
      : f === 'de'
        ? { id: i.id, text: i.de }
        : f === 'emoji'
          ? { id: i.id, emoji: i.emoji }
          : { id: i.id, text: letterLabel(i) }
  const build = (prompt: Prompt, f: 'th' | 'de' | 'emoji' | 'letter', key: (i: Item) => string | undefined, n = 3): Ex | null => {
    const ds = distractors(item, n, ctx, key)
    if (ds.length < 2) return null
    return { key: k(), item, t: 'choice', kind, prompt, options: shuffle([item, ...ds]).map((i) => opt(i, f)), answer: item.id, grid: f === 'emoji' || (f === 'th' && isLetter(item)) }
  }
  const rom = getProgress().settings.showRom
  switch (kind) {
    case 'listen-th':
      return build({ title: isLetter(item) ? 'Welches Zeichen hörst du?' : 'Was hörst du?', audio: sayText(item) }, 'th', (i) => i.th)
    case 'th-de':
      return build({ title: 'Was bedeutet das?', th: item.th, sub: rom ? item.rom : undefined, audio: sayText(item), bigTh: true }, 'de', (i) => i.de)
    case 'de-th':
      return build({ title: 'Wie sagt man das auf Thai?', text: item.de }, 'th', (i) => i.th)
    case 'listen-de':
      return build({ title: 'Hörverständnis: Was wurde gesagt?', audio: sayText(item) }, 'de', (i) => i.de)
    case 'pic-th':
      return item.emoji ? build({ title: 'Was ist auf dem Bild?', emoji: item.emoji }, 'th', (i) => (i.emoji ? i.th : undefined)) : null
    case 'th-pic':
      return item.emoji ? build({ title: 'Welches Bild passt?', th: item.th, sub: rom ? item.rom : undefined, audio: sayText(item), bigTh: true }, 'emoji', (i) => i.emoji) : null
    case 'audio-pic':
      return item.emoji ? build({ title: 'Hör zu und wähle das Bild', audio: sayText(item) }, 'emoji', (i) => i.emoji) : null
    case 'letter-sound':
      return build({ title: item.kind === 'tone' ? 'Welches Tonzeichen ist das?' : 'Welcher Laut ist das?', th: item.th, bigTh: true }, 'letter', (i) => letterLabel(i))
    case 'sound-letter':
      return build({ title: 'Finde das Zeichen', text: letterLabel(item), sub: item.kind === 'consonant' ? item.nameRom : undefined }, 'th', (i) => i.th)
    case 'tone-pair': {
      // Minimalpaar: welches Wort der Ton-Gruppe war das?
      const set = toneSetOf.get(item.id)
      if (!set || set.words.length < 2) return null
      return {
        key: k(), item, t: 'choice', kind,
        prompt: { title: 'Welches Wort hörst du? Achte auf den Ton!', audio: sayText(item) },
        options: shuffle(set.words).map((w) => ({ id: w.id, th: w.th, sub: w.de, speak: w.th })),
        answer: item.id, grid: set.words.length > 2,
      }
    }
    case 'read-rom': {
      // Lesen: richtige Aussprache (Ton, Vokallänge) zum Thai-Wort wählen
      if (!/[aeiou]/.test(item.rom) || isLetter(item)) return null
      const ds = readingDistractors(item.rom, 3)
      if (ds.length < 2) return null
      return {
        key: k(), item, t: 'choice', kind,
        prompt: { title: 'Wie liest man das?', th: item.th, bigTh: true },
        options: shuffle([item.rom, ...ds]).map((r) => ({ id: r, text: r, speak: sayText(item) })),
        answer: item.rom,
      }
    }
    case 'class': {
      const classes = [
        { id: 'mid', text: 'Mittelklasse', sub: 'กลาง' },
        { id: 'high', text: 'Hohe Klasse', sub: 'สูง' },
        { id: 'low', text: 'Tiefe Klasse', sub: 'ต่ำ' },
      ]
      return { key: k(), item, t: 'choice', kind, prompt: { title: 'Zu welcher Klasse gehört der Konsonant?', th: item.th, bigTh: true, audio: sayText(item) }, options: classes, answer: item.cls! }
    }
  }
  return null
}

// Swipe-Karte: zur Hälfte stimmt die gezeigte Bedeutung, sonst stammt sie von einem ähnlichen Item
function swipe(item: Item, ctx: Item[]): Ex {
  const label = (i: Item) => (isLetter(i) ? letterLabel(i) : i.de)
  const other = Math.random() < 0.5 ? distractors(item, 1, ctx, label)[0] : undefined
  const src = other || item
  return { key: k(), item, t: 'flash', claim: label(src), claimEmoji: isLetter(src) ? undefined : src.emoji, truth: !other }
}

function single(item: Item, kind: string, ctx: Item[]): Ex | null {
  switch (kind) {
    case 'flash':
      return swipe(item, ctx)
    case 'type-de':
      return { key: k(), item, t: 'type', mode: 'de' }
    case 'type-th':
      return { key: k(), item, t: 'type', mode: 'th' }
    case 'speak':
      return { key: k(), item, t: 'speak' }
    case 'tone': {
      const syl = syllables(item.rom)
      if (isLetter(item) || !syl.length || syl.length > 4) return null
      // bevorzugt eine Silbe mit nicht-mittlerem Ton, sonst zufällig
      const idx = syl.map((x, i) => [x, i] as const).filter(([x]) => toneOf(x) !== 'm')
      return { key: k(), item, t: 'tone', syl: (idx.length && Math.random() < 0.7 ? pick(idx) : [syl[0], Math.floor(Math.random() * syl.length)] as const)[1] }
    }
    case 'draw':
      return { key: k(), item, t: 'draw', trace: false }
    case 'trace':
      return { key: k(), item, t: 'draw', trace: true }
    case 'build':
    case 'listen-build': {
      const extra = shuffle(
        ctx.concat(allItems.filter((i) => isSentence(i) && chapterOfItem.get(i.id) === chapterOfItem.get(item.id)))
          .flatMap((i) => i.tokens || [])
          .filter((t) => !item.tokens!.includes(t)),
      )
      return { key: k(), item, t: 'build', mode: kind === 'build' ? 'translate' : 'listen', extra: [...new Set(extra)].slice(0, Math.min(4, Math.max(2, 7 - item.tokens!.length))) }
    }
    case 'cloze': {
      const toks = item.tokens!
      const cand = toks.map((t, i) => [t, i] as const).filter(([t]) => !/^(ครับ|ค่ะ|คะ|นะ)$/.test(t))
      const [word, gap] = pick(cand.length ? cand : toks.map((t, i) => [t, i] as const))
      const others = [...new Set(ctx.concat(allItems).flatMap((i) => (isSentence(i) ? i.tokens! : i.kind === 'word' ? [i.th] : [])))].filter((t) => t !== word && !toks.includes(t))
      const opts = shuffle([word, ...shuffle(others.slice(0, 60)).slice(0, 3)])
      return { key: k(), item, t: 'cloze', gap, options: opts }
    }
  }
  return choice(item, ctx, kind)
}

// Mögliche Übungstypen je Item und Phase (0 = Erkennen, 1 = Produzieren)
function kindsFor(item: Item, stage: 0 | 1): string[] {
  const s = getProgress().settings
  const speakOk = s.speakExercises && (canRecognize() || serverAvailable())
  const drawOk = s.drawExercises && !!item.draw
  if (item.kind === 'consonant') return stage === 0 ? ['listen-th', 'letter-sound'] : ['sound-letter', 'listen-th', 'class', ...(drawOk ? ['draw', 'draw'] : []), ...(speakOk ? ['speak'] : [])]
  if (item.kind === 'vowel') return stage === 0 ? ['listen-th', 'letter-sound'] : ['sound-letter', 'listen-th', ...(drawOk ? ['draw', 'draw'] : []), ...(speakOk ? ['speak'] : [])]
  if (item.kind === 'tone') return stage === 0 ? ['letter-sound', 'listen-th'] : ['sound-letter', 'listen-th']
  if (isSentence(item)) {
    const len = item.tokens!.length
    return stage === 0 ? ['th-de', 'cloze', 'listen-de', 'build'] : ['build', 'listen-build', 'cloze', 'listen-de', ...(len <= 5 ? ['type-de'] : []), ...(speakOk ? ['speak'] : [])]
  }
  const pic = item.emoji ? ['pic-th', 'th-pic', 'audio-pic'] : []
  const tone = toneSetOf.has(item.id) ? ['tone-pair', 'tone'] : ['tone']
  return stage === 0
    ? ['th-de', 'listen-th', ...pic, 'flash', 'read-rom']
    : ['de-th', 'listen-th', 'type-de', 'type-th', 'listen-de', ...pic, ...tone, 'read-rom', ...(speakOk ? ['speak', 'speak'] : [])]
}

export function practice(item: Item, stage: 0 | 1, ctx: Item[], avoid?: string): Ex {
  const kinds = shuffle(kindsFor(item, stage)).filter((x) => x !== avoid)
  for (const kd of kinds) {
    const ex = single(item, kd, ctx)
    if (ex) return ex
  }
  return swipe(item, ctx)
}

function matchEx(its: Item[]): Ex | null {
  const uniq: Item[] = []
  for (const i of shuffle(its)) if (!uniq.some((u) => u.th === i.th || u.de === i.de) && !isSentence(i)) uniq.push(i)
  if (uniq.length < 3) return null
  const pairs = uniq.slice(0, 5)
  return { key: k(), item: pairs[0], t: 'match', pairs }
}

// ---------- Session-Bauer ----------
function focusKinds(focus: 'tones' | 'reading', stage: 0 | 1): string[] {
  if (focus === 'tones') return stage === 0 ? ['tone-pair', 'tone-pair', 'listen-th'] : ['tone-pair', 'tone', 'tone']
  return stage === 0 ? ['read-rom', 'read-rom', 'listen-th'] : ['read-rom', 'tone', 'th-de', 'listen-th']
}

function focusPractice(it: Item, focus: 'tones' | 'reading', stage: 0 | 1, ctx: Item[]): Ex {
  for (const kd of shuffle(focusKinds(focus, stage))) {
    const ex = single(it, kd, ctx)
    if (ex) return ex
  }
  return practice(it, stage, ctx)
}

export function lessonSession(ids: string[], firstTime: boolean, focus?: 'tones' | 'reading'): Ex[] {
  const its = ids.map(getItem)
  const q: Ex[] = []
  if (focus) {
    if (firstTime) its.forEach((it) => q.push({ key: k(), item: it, t: 'intro' }, focusPractice(it, focus, 0, its)))
    else shuffle(its).forEach((it) => q.push(focusPractice(it, focus, 0, its)))
    shuffle(its).forEach((it) => q.push(focusPractice(it, focus, 1, its)))
    shuffle(its).forEach((it) => q.push(focusPractice(it, focus, 1, its)))
    return q
  }
  if (firstTime) {
    its.forEach((it, i) => {
      q.push({ key: k(), item: it, t: 'intro' })
      if (it.draw && getProgress().settings.drawExercises && i % 2 === 0) q.push(single(it, 'trace', its)!)
      q.push(practice(it, 0, its))
      if (i >= 1) q.push(practice(its[Math.floor(Math.random() * i)], 0, its))
    })
    const m = matchEx(its)
    if (m) q.push(m)
    shuffle(its).forEach((it) => q.push(practice(it, 1, its)))
  } else {
    shuffle(its).forEach((it) => q.push(practice(it, 0, its)))
    const m = matchEx(its)
    if (m) q.splice(Math.floor(q.length / 2), 0, m)
    shuffle(its).forEach((it) => q.push(practice(it, 1, its)))
  }
  return q
}

export function reviewSession(ids: string[], opts: { max?: number; stage?: 0 | 1 | 'mix'; match?: boolean } = {}): Ex[] {
  const its = ids.slice(0, opts.max ?? 15).map(getItem)
  const q: Ex[] = its.map((it) => practice(it, opts.stage === 'mix' || opts.stage === undefined ? (Math.random() < 0.5 ? 0 : 1) : opts.stage, its))
  if (opts.match !== false) {
    const m = matchEx(its)
    if (m) q.splice(Math.min(3, q.length), 0, m)
  }
  return shuffle(q)
}

export function kindSession(ids: string[], kind: string, max = 12): Ex[] {
  const its = shuffle(ids.map(getItem)).slice(0, max)
  return its.map((it) => single(it, kind, its) || practice(it, 1, its))
}

export function retryOf(ex: Ex, ctx: Item[]): Ex {
  const kind = ex.t === 'choice' ? ex.kind : ex.t
  const n = practice(ex.item, Math.random() < 0.5 ? 0 : 1, ctx, kind)
  return { ...n, retry: true }
}
