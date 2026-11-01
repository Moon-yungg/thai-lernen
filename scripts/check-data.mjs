// Konsistenzprüfung aller Lerninhalte: IDs, Verweise, Tokens, Umschrift-Schema
import { createServer } from 'vite'

const vite = await createServer({ configFile: false, server: { middlewareMode: true, hmr: false }, appType: 'custom', logLevel: 'error', optimizeDeps: { noDiscovery: true, include: [] } })
const d = await vite.ssrLoadModule('/src/data/index.ts')
await vite.close()

const problems = []
const warn = []
const ids = new Map()
for (const i of d.items) {
  if (ids.has(i.id)) problems.push(`doppelte ID ${i.id}`)
  ids.set(i.id, i)
  if (i.tokens && i.tokens.join('') !== i.th) problems.push(`tokens ≠ th: ${i.id}`)
  if ((i.kind === 'sentence' || i.kind === 'phrase') && !i.tokens) problems.push(`ohne tokens: ${i.id}`)
}
const byTh = new Map()
for (const i of d.items) if (!['consonant', 'vowel', 'tone'].includes(i.kind)) byTh.set(i.th, [...(byTh.get(i.th) || []), i.id])
for (const [th, l] of byTh) if (l.length > 1) warn.push(`gleiches Thai mehrfach: ${th} (${l.join(', ')})`)
const used = new Set()
for (const c of d.chapters)
  for (const l of c.lessons) {
    for (const id of l.items) {
      if (!ids.has(id)) problems.push(`Lektion ${l.id}: unbekanntes Item ${id}`)
      used.add(id)
    }
    if (l.grammar && !d.grammarById.has(l.grammar)) problems.push(`Lektion ${l.id}: unbekannte Grammatik ${l.grammar}`)
    if (l.dialogue && !d.dialogueById.has(l.dialogue)) problems.push(`Lektion ${l.id}: unbekannter Dialog ${l.dialogue}`)
    if (l.story && !d.storyById.has(l.story)) problems.push(`Lektion ${l.id}: unbekannter Lesetext ${l.story}`)
  }
for (const i of d.items) if (!used.has(i.id)) warn.push(`nicht in Lektion: ${i.id}`)
for (const s of d.toneSets) for (const w of s.words) if (!ids.has(w.id)) problems.push(`Tonset ${s.id}: Item ${w.id} fehlt`)

// Umschrift: Muster, die das Schema nicht vorsieht
const BAD = [
  [/ii/, 'ii statt ee'], [/(?<![u])uu(?!e)/, 'uu statt oo'], [/ew\b/, 'ew statt eo'], [/[ëöü]/, 'Umlaut'], [/[^\s\-a-zàâáǎèêéěìîíǐòôóǒùûúǔ̀̂́̌̀-ͯ]/i, 'fremdes Zeichen'],
]
const marks = /[̀́̂̌]/g
const checkRom = (where, rom) => {
  for (const [re, msg] of BAD) if (re.test(rom.normalize('NFC'))) warn.push(`Umschrift (${msg}): ${where}: ${rom}`)
  for (const syl of rom.split(/[\s-]+/)) if ((syl.normalize('NFD').match(marks) || []).length > 1) problems.push(`mehrere Tonzeichen in Silbe: ${where}: ${rom}`)
}
for (const i of d.items) if (!['consonant', 'vowel'].includes(i.kind)) checkRom(i.id, i.rom)

console.log(`${d.items.length} Items · ${d.chapters.length} Kapitel · ${d.chapters.reduce((s, c) => s + c.lessons.length, 0)} Lektionen · ${d.grammar.length} Grammatik · ${d.dialogues.length} Dialoge · ${d.stories.length} Lesetexte · ${d.toneSets.length} Tonsets`)
console.log(`FEHLER (${problems.length}):`)
problems.forEach((p) => console.log('  ' + p))
console.log(`HINWEISE (${warn.length}):`)
warn.forEach((p) => console.log('  ' + p))
process.exit(problems.length ? 1 : 0)
