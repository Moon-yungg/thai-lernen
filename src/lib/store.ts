import { useSyncExternalStore } from 'react'

export interface ItemStat {
  ease: number
  interval: number // Tage
  due: number // Zeitstempel ms
  reps: number
  lapses: number
  correct: number
  wrong: number
  last: number
}

export interface Settings {
  sound: boolean
  rate: number // Sprechgeschwindigkeit
  unlockAll: boolean
  showRom: boolean
  romInOptions: boolean // Umschrift auch unter Thai-Antwortmöglichkeiten (macht Hör-Aufgaben leichter)
  voiceURI?: string
  serverUrl?: string // Adresse des Analyse-Servers (leer = Standard)
  speakExercises: boolean
  drawExercises: boolean
}

export interface Progress {
  items: Record<string, ItemStat>
  lessons: Record<string, { done: number; best: number }>
  tests: Record<string, number> // Kapiteltest: beste Prozent
  dialogues: Record<string, number>
  stories: Record<string, number> // Lesetexte: bestes Ergebnis in %
  grammar: Record<string, boolean>
  xp: number
  daily: Record<string, number> // yyyy-mm-dd -> xp
  streak: number
  lastDay: string
  dailyGoal: number
  settings: Settings
}

const KEY = 'thai-lernen-v1'

const defaults = (): Progress => ({
  items: {},
  lessons: {},
  tests: {},
  dialogues: {},
  stories: {},
  grammar: {},
  xp: 0,
  daily: {},
  streak: 0,
  lastDay: '',
  dailyGoal: 50,
  settings: { sound: true, rate: 0.85, unlockAll: false, showRom: true, romInOptions: false, speakExercises: true, drawExercises: true },
})

function load(): Progress {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      const p = JSON.parse(raw)
      const d = defaults()
      return { ...d, ...p, settings: { ...d.settings, ...p.settings } }
    }
  } catch {}
  return defaults()
}

let state: Progress = load()
const listeners = new Set<() => void>()

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {}
}

export function getProgress() {
  return state
}

export function update(fn: (p: Progress) => void) {
  const next: Progress = structuredClone(state)
  fn(next)
  state = next
  save()
  listeners.forEach((l) => l())
}

// Für Hintergrund-Dienste (Cloud-Sync): bei jeder Änderung benachrichtigen
export function subscribe(fn: () => void) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

// Ganzen Stand ersetzen (z.B. nach dem Zusammenführen mit der Cloud), Einstellungen bleiben lokal
export function replaceProgress(p: Progress) {
  state = { ...defaults(), ...p, settings: state.settings }
  save()
  listeners.forEach((l) => l())
}

export function useProgress(): Progress {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    () => state,
  )
}

export const today = (d = new Date()) => d.toISOString().slice(0, 10)

export function addXp(n: number) {
  update((p) => {
    const t = today()
    p.xp += n
    p.daily[t] = (p.daily[t] || 0) + n
    if (p.lastDay !== t) {
      const y = today(new Date(Date.now() - 864e5))
      p.streak = p.lastDay === y ? p.streak + 1 : 1
      p.lastDay = t
    }
  })
}

// ---------- Spaced Repetition (vereinfachtes SM-2) ----------
const DAY = 864e5

export function gradeItems(results: Record<string, { ok: number; bad: number }>) {
  const now = Date.now()
  update((p) => {
    for (const [id, r] of Object.entries(results)) {
      const s: ItemStat = p.items[id] || { ease: 2.5, interval: 0, due: now, reps: 0, lapses: 0, correct: 0, wrong: 0, last: 0 }
      s.correct += r.ok
      s.wrong += r.bad
      s.last = now
      if (r.bad === 0) {
        s.reps += 1
        s.interval = s.reps === 1 ? 1 : s.reps === 2 ? 3 : Math.round(s.interval * s.ease)
        s.ease = Math.min(3, s.ease + 0.1)
        s.due = now + s.interval * DAY
      } else {
        if (s.reps > 0) s.lapses += 1
        s.reps = 0
        s.interval = 0
        s.ease = Math.max(1.3, s.ease - 0.2)
        s.due = now + 10 * 60 * 1000 // in 10 Minuten wieder fällig
      }
      p.items[id] = s
    }
  })
}

export function resetProgress() {
  const s = state.settings
  state = defaults()
  state.settings = s
  save()
  listeners.forEach((l) => l())
}

export function exportProgress() {
  return JSON.stringify(state)
}

export function importProgress(json: string) {
  const p = JSON.parse(json)
  if (!p || typeof p !== 'object' || !p.items) throw new Error('Ungültige Datei')
  state = { ...defaults(), ...p }
  save()
  listeners.forEach((l) => l())
}

// Fehlerquote eines Items (für Schwächen-Training)
export function weakness(s?: ItemStat) {
  if (!s) return 0
  const total = s.correct + s.wrong
  if (!total) return 0
  return (s.wrong + 1.5 * s.lapses) / (total + 2)
}
