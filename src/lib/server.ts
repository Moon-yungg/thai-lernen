import { getProgress } from './store'
// Verbindung zum optionalen lokalen Server (server/app.py) – gleiche Herkunft, wenn die App von dort geladen wird.

export interface SyllableResult {
  text: string
  pron: number // 0..1 Lautqualität
  expected: Tone | null
  detected: Tone | null
  conf: number
  contour: number[] | null // Halbtöne relativ zur Sprechermitte
  ref: number[] | null // Tonverlauf der Vorbild-Aufnahme (falls vorhanden)
  sim: number | null // Ähnlichkeit zum Vorbild 0..1
  start: number | null
  end: number | null
}
export type Tone = 'm' | 'l' | 'f' | 'h' | 'r'

export interface Issue {
  type: string
  syllable: string | null
  title: string
  detail: string
  tip: string
  compare?: { label: string; text: string; ok: boolean }[] // zum Anhören: richtig vs. gehört
}

export interface Analysis {
  target: string
  recognized: string
  cer: number
  sounds: number
  tones: number | null
  toneMode: 'reference' | 'template' | null
  score: number
  syllables: SyllableResult[]
  chars: { ch: string; score: number }[]
  issues: Issue[]
  duration: number
  ms: number
  error?: string
}

export const TONE_NAME: Record<Tone, string> = { m: 'mittel', l: 'tief', f: 'fallend', h: 'hoch', r: 'steigend' }
// Schablonen (wie im Server) für die Anzeige
export const TONE_TPL: Record<Tone, number[]> = {
  m: [0.3, 0.1, -0.2, -0.5, -0.8],
  l: [-0.8, -1.8, -2.6, -3.2, -3.6],
  f: [1.2, 2.2, 1.8, 0.0, -2.8],
  h: [0.4, 0.6, 1.2, 2.2, 3.2],
  r: [-1.0, -2.4, -2.4, -0.8, 2.2],
}

// Server-Adresse: in den Einstellungen gesetzt > beim Build vorgegeben (VITE_API_BASE, z.B. Hugging Face Space) > gleiche Herkunft
export function apiBase() {
  const custom = getProgress().settings.serverUrl?.trim()
  return (custom || import.meta.env.VITE_API_BASE || '').replace(/\/+$/, '')
}
const api = (path: string) => (apiBase() ? `${apiBase()}/api/${path}` : `api/${path}`)

let status: Promise<boolean> | null = null
let available = false
let retry: ReturnType<typeof setTimeout> | null = null

export function checkServer(force = false): Promise<boolean> {
  if (!status || force) {
    const ctrl = new AbortController()
    const t = setTimeout(() => ctrl.abort(), 8000)
    status = fetch(api('health'), { cache: 'no-store', signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => (available = !!j?.ok))
      .catch(() => (available = false))
      .finally(() => clearTimeout(t))
    // Ein schlafender Hugging-Face-Space braucht ~1 Minute zum Aufwachen → noch ein paar Mal nachfragen
    status.then((ok) => {
      if (!ok && apiBase() && !retry) {
        let n = 0
        const again = () => {
          retry = setTimeout(async () => {
            if (!(await checkServer(true)) && ++n < 6) again()
            else retry = null
          }, 20000)
        }
        again()
      }
    })
  }
  return status
}
checkServer()

export const serverAvailable = () => available
export async function analyzeRemote(wav: Blob, text: string): Promise<Analysis> {
  const fd = new FormData()
  fd.append('audio', wav, 'rec.wav')
  fd.append('text', text)
  const r = await fetch(api('analyze'), { method: 'POST', body: fd })
  const j = await r.json()
  if (!r.ok || j.error) throw new Error(j.error || 'Analyse fehlgeschlagen')
  return j
}

// Beliebigen Thai-Text vom Server sprechen lassen (edge-tts, serverseitig zwischengespeichert)
export const sayUrl = (text: string) => api('say') + '?text=' + encodeURIComponent(text)
