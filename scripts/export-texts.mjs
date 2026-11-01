// Sammelt alle vorzulesenden Thai-Texte für scripts/gen_audio.py (lädt die TS-Daten über Vite)
import { writeFileSync } from 'node:fs'
import { createServer } from 'vite'

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' })
const { items, dialogues, grammar } = await vite.ssrLoadModule('/src/data/index.ts')
await vite.close()

const texts = new Set()
const add = (s) => s && texts.add(s.replace(/[–\-]/g, ''))
for (const i of items) {
  add(i.say || i.th)
  i.tokens?.forEach(add)
}
for (const d of dialogues)
  for (const t of d.turns) {
    add(t.th)
    t.options?.forEach((o) => add(o.th))
  }
for (const g of grammar)
  for (const s of g.sections) {
    const words = s.words || (s.type === 'compare' ? s.th : null)
    if (words) {
      words.forEach((w) => add(w.th))
      add(words.map((w) => w.th).join(''))
    }
  }
add('สวัสดีครับ ยินดีที่ได้รู้จัก')
for (const t of ['มา', 'ไก่', 'ไม่', 'ม้า', 'หมา']) add(t)
writeFileSync(new URL('./texts.json', import.meta.url), JSON.stringify([...texts], null, 1))
console.log(texts.size, 'Texte exportiert')
