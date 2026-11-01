// Töne aus der Umschrift lesen (verbindliches Schema: Tonzeichen auf dem ersten Vokal jeder Silbe)
// und Lese-Ablenker erzeugen (falscher Ton / falsche Vokallänge).
import type { Tone } from './server'

const MARK: Record<string, Tone> = { '̀': 'l', '̂': 'f', '́': 'h', '̌': 'r' }
const ADD: Record<Tone, string> = { m: '', l: '̀', f: '̂', h: '́', r: '̌' }

export const syllables = (rom: string) => rom.trim().split(/[\s-]+/).filter(Boolean)

export function toneOf(syl: string): Tone {
  for (const ch of syl.normalize('NFD')) if (MARK[ch]) return MARK[ch]
  return 'm'
}

export const stripTone = (syl: string) => syl.normalize('NFD').replace(/[̀́̂̌]/g, '').normalize('NFC')

// Ton einer Silbe ersetzen: Zeichen kommt auf den ersten Vokalbuchstaben
export function withTone(syl: string, t: Tone): string {
  const base = stripTone(syl)
  const i = base.search(/[aeiou]/i)
  if (i < 0) return base
  return (base.slice(0, i + 1) + ADD[t] + base.slice(i + 1)).normalize('NFC')
}

// Silben einer Umschrift mit ihren Trennzeichen (um sie wieder zusammenzusetzen)
function parts(rom: string): string[] {
  return rom.split(/([\s-]+)/)
}

export const TONES: Tone[] = ['m', 'l', 'f', 'h', 'r']

// Ablenker für „Wie liest man das?“: gleiche Laute mit anderem Ton, oder andere Vokallänge
export function readingDistractors(rom: string, n = 3): string[] {
  const ps = parts(rom)
  const sylIdx = ps.map((p, i) => (/[\s-]/.test(p) || !p ? -1 : i)).filter((i) => i >= 0)
  const out = new Set<string>()
  const tries: (() => string)[] = []
  for (const i of sylIdx) {
    for (const t of TONES)
      tries.push(() => {
        const c = [...ps]
        c[i] = withTone(c[i], t)
        return c.join('')
      })
    tries.push(() => {
      const c = [...ps]
      const s = stripTone(c[i])
      // Vokallänge vertauschen: lang → kurz bzw. kurzes a → langes aa
      const swapped = /aa|ee|oo|uue/.test(s) ? s.replace('aa', 'a').replace('ee', 'i').replace('oo', 'u').replace('uue', 'ue') : s.replace(/a(?![aieo])/, 'aa')
      c[i] = withTone(swapped, toneOf(c[i]))
      return c.join('')
    })
  }
  // zufällige Reihenfolge, Duplikate und das Original vermeiden
  for (const f of tries.sort(() => Math.random() - 0.5)) {
    const v = f()
    if (v !== rom && stripTone(v) !== '' && !out.has(v)) out.add(v)
    if (out.size >= n) break
  }
  return [...out]
}
