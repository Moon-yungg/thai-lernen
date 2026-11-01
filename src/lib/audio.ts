import { getProgress } from './store'
import { sayUrl, serverAvailable } from './server'

// ---------- Sprachausgabe ----------
// 1. Vorgenerierte Audiodateien (public/audio/manifest.json: { "<thai text>": "datei.mp3" })
// 2. Lokaler Server erzeugt beliebigen Text per edge-tts (z.B. „so klang es“-Beispiele)
// 3. Fallback: Web Speech API mit thailändischer Stimme (Android: Google TTS, Windows: Microsoft Premwadee/Niwat)

let manifest: Record<string, string> | null = null
fetch('audio/manifest.json')
  .then((r) => (r.ok ? r.json() : null))
  .then((m) => (manifest = m))
  .catch(() => {})

let thaiVoices: SpeechSynthesisVoice[] = []
function loadVoices() {
  if (!('speechSynthesis' in window)) return
  thaiVoices = speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().replace('_', '-').startsWith('th'))
}
if ('speechSynthesis' in window) {
  loadVoices()
  speechSynthesis.addEventListener?.('voiceschanged', loadVoices)
}

export function getThaiVoices() {
  loadVoices()
  return thaiVoices
}

export function hasThaiVoice() {
  return getThaiVoices().length > 0 || !!manifest
}

let current: HTMLAudioElement | null = null

export function speak(text: string, opts: { slow?: boolean } = {}): Promise<void> {
  const clean = text.replace(/[–\-]/g, '')
  current?.pause()
  const file = manifest?.[clean]
  if (file) return playUrl('audio/' + file, opts.slow)
  if (serverAvailable()) return playUrl(sayUrl(clean), opts.slow, () => speakDevice(clean, opts))
  return speakDevice(clean, opts)
}

function playUrl(url: string, slow?: boolean, onFail?: () => Promise<void>): Promise<void> {
  return new Promise((res) => {
    const a = new Audio(url)
    a.playbackRate = slow ? 0.7 : 1
    current = a
    const fail = () => (onFail ? onFail().then(res) : res())
    a.onended = () => res()
    a.onerror = fail
    a.play().catch(fail)
  })
}

function speakDevice(clean: string, opts: { slow?: boolean }): Promise<void> {
  const { settings } = getProgress()
  if (!('speechSynthesis' in window)) return Promise.resolve()
  return new Promise((res) => {
    speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(clean)
    u.lang = 'th-TH'
    const voices = getThaiVoices()
    const v = voices.find((x) => x.voiceURI === settings.voiceURI) || voices.find((x) => /premwadee|niwat|google/i.test(x.name)) || voices[0]
    if (v) u.voice = v
    u.rate = (opts.slow ? 0.55 : 1) * settings.rate
    u.onend = () => res()
    u.onerror = () => res()
    speechSynthesis.speak(u)
    // Manche Browser feuern onend nicht zuverlässig
    setTimeout(res, 2500 + clean.length * 250)
  })
}

// ---------- Soundeffekte (synthetisch über WebAudio) ----------
let ctx: AudioContext | null = null
function ac() {
  if (!ctx) ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

function tone(freq: number, start: number, dur: number, type: OscillatorType = 'sine', vol = 0.18) {
  const c = ac()
  const o = c.createOscillator()
  const g = c.createGain()
  o.type = type
  o.frequency.value = freq
  const t = c.currentTime + start
  g.gain.setValueAtTime(0, t)
  g.gain.linearRampToValueAtTime(vol, t + 0.012)
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  o.connect(g).connect(c.destination)
  o.start(t)
  o.stop(t + dur + 0.05)
}

export const sfx = {
  correct() {
    if (!getProgress().settings.sound) return
    tone(880, 0, 0.18, 'triangle')
    tone(1318.5, 0.09, 0.32, 'triangle')
  },
  combo() {
    if (!getProgress().settings.sound) return
    tone(1046.5, 0, 0.12, 'triangle')
    tone(1318.5, 0.07, 0.12, 'triangle')
    tone(1568, 0.14, 0.3, 'triangle')
  },
  wrong() {
    if (!getProgress().settings.sound) return
    tone(220, 0, 0.22, 'sawtooth', 0.07)
    tone(174, 0.12, 0.3, 'sawtooth', 0.07)
  },
  tap() {
    if (!getProgress().settings.sound) return
    tone(660, 0, 0.05, 'sine', 0.08)
  },
  complete() {
    if (!getProgress().settings.sound) return
    ;[523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((f, i) => tone(f, i * 0.09, 0.4, 'triangle', 0.14))
  },
  flip() {
    if (!getProgress().settings.sound) return
    tone(440, 0, 0.06, 'sine', 0.06)
    tone(560, 0.04, 0.06, 'sine', 0.06)
  },
}
