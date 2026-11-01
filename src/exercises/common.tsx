import type { ReactNode } from 'react'
import type { Item } from '../data'
import { getProgress } from '../lib/store'
import { levenshtein } from '../lib/speech'

export interface ExProps<E> {
  ex: E
  locked: boolean
  onSubmit: (ok: boolean | null, solution?: ReactNode, perItem?: Record<string, boolean>) => void
}

export function Solution({ item, extra }: { item: Item; extra?: ReactNode }) {
  const rom = getProgress().settings.showRom
  return (
    <div>
      <span className="th">{item.th}</span>
      {rom && <span className="muted"> · {item.rom}</span>}
      <div>{item.kind === 'consonant' ? `${item.name} – ${item.initial} (${item.nameDe})` : item.de}</div>
      {extra}
    </div>
  )
}

const stripDe = (s: string) =>
  s
    .toLowerCase()
    .replace(/\(.*?\)/g, ' ')
    .replace(/[.,!?;:"„“'’…\-–]/g, ' ')
    .replace(/\b(der|die|das|den|dem|ein|eine|einen|ich|du|zu)\b/g, ' ')
    .replace(/ß/g, 'ss')
    .replace(/\s+/g, ' ')
    .trim()

export function checkGerman(input: string, item: Item) {
  const a = stripDe(input)
  if (!a) return false
  const answers = [item.de, ...(item.alt || [])].flatMap((x) => [x, ...x.split(/[\/,;]| oder /)]).map(stripDe).filter(Boolean)
  return answers.some((b) => a === b || levenshtein(a, b) <= Math.max(1, Math.floor(b.length * 0.18)))
}

const stripRom = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z]/g, '')

export function checkThai(input: string, item: Item) {
  const t = input.replace(/\s/g, '')
  if (/[฀-๿]/.test(t)) {
    const target = item.th.replace(/\s/g, '')
    return t === target || levenshtein(t, target) <= (target.length > 6 ? 1 : 0)
  }
  const a = stripRom(input)
  const b = stripRom(item.rom)
  return !!a && (a === b || levenshtein(a, b) <= Math.max(1, Math.floor(b.length * 0.15)))
}
