// Ausspracheanalyse über die Spracherkennung des Browsers (Chrome/Android: Google-Spracherkennung, th-TH).
// Vorgehen wie bei vielen Sprach-Apps: Erkennung → Text → Vergleich mit dem Zieltext.
// Ein falscher Ton erzeugt oft ein anderes Wort mit anderem Tonzeichen – das werten wir als Ton-Hinweis aus.

const SR: any = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

export const canRecognize = () => !!SR

export interface SpeechResult {
  heard: string[] // Alternativen
  best: string
  score: number // 0..1
  toneIssue: boolean // Grundlaute stimmen, Tonzeichen/Vokallänge nicht
  verdict: 'perfect' | 'good' | 'close' | 'wrong'
}

const TONE_MARKS = /[่-๋]/g
const norm = (s: string) => s.replace(/[\s.,!?ๆ"'’]/g, '').replace(/ฯ/g, '')

export function levenshtein(a: string, b: string) {
  const A = [...a]
  const B = [...b]
  const dp = Array.from({ length: A.length + 1 }, (_, i) => [i, ...Array(B.length).fill(0)])
  for (let j = 1; j <= B.length; j++) dp[0][j] = j
  for (let i = 1; i <= A.length; i++)
    for (let j = 1; j <= B.length; j++)
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (A[i - 1] === B[j - 1] ? 0 : 1))
  return dp[A.length][B.length]
}

export function similarity(a: string, b: string) {
  const x = norm(a)
  const y = norm(b)
  if (!x.length && !y.length) return 1
  return 1 - levenshtein(x, y) / Math.max([...x].length, [...y].length)
}

export function analyze(target: string, heard: string[]): SpeechResult {
  // Bei Buchstabennamen (z.B. "กอ ไก่") reicht auch das Schlüsselwort
  const targets = [target, ...target.split(/\s+/).filter((t) => t.length > 1)]
  let best = heard[0] || ''
  let score = 0
  for (const h of heard)
    for (const t of targets) {
      const s = similarity(t, h) * (t === target ? 1 : 0.92)
      if (s > score) {
        score = s
        best = h
      }
    }
  const toneIssue = score < 0.95 && similarity(target.replace(TONE_MARKS, ''), best.replace(TONE_MARKS, '')) >= 0.95
  const verdict = score >= 0.95 ? 'perfect' : score >= 0.75 ? 'good' : score >= 0.5 || toneIssue ? 'close' : 'wrong'
  return { heard, best, score, toneIssue, verdict }
}

export function listen(onLevel?: (v: number) => void): { promise: Promise<string[]>; stop: () => void } {
  if (!SR) return { promise: Promise.reject(new Error('Spracherkennung wird von diesem Browser nicht unterstützt')), stop: () => {} }
  const rec = new SR()
  rec.lang = 'th-TH'
  rec.interimResults = false
  rec.maxAlternatives = 5
  rec.continuous = false
  let stream: MediaStream | null = null
  let raf = 0
  // Pegelanzeige (optional, nur zur Visualisierung)
  if (onLevel && navigator.mediaDevices) {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((s) => {
        stream = s
        const ctx = new AudioContext()
        const an = ctx.createAnalyser()
        an.fftSize = 256
        ctx.createMediaStreamSource(s).connect(an)
        const data = new Uint8Array(an.frequencyBinCount)
        const tick = () => {
          an.getByteFrequencyData(data)
          onLevel(data.reduce((a, b) => a + b, 0) / data.length / 128)
          raf = requestAnimationFrame(tick)
        }
        tick()
      })
      .catch(() => {})
  }
  const cleanup = () => {
    cancelAnimationFrame(raf)
    stream?.getTracks().forEach((t) => t.stop())
  }
  const promise = new Promise<string[]>((resolve, reject) => {
    let got: string[] = []
    rec.onresult = (e: any) => {
      const r = e.results[0]
      got = Array.from({ length: r.length }, (_, i) => r[i].transcript as string)
    }
    rec.onerror = (e: any) => {
      cleanup()
      if (e.error === 'no-speech') resolve([])
      else reject(new Error(e.error === 'not-allowed' ? 'Mikrofon-Zugriff verweigert' : 'Spracherkennung: ' + e.error))
    }
    rec.onend = () => {
      cleanup()
      resolve(got)
    }
    rec.start()
  })
  return { promise, stop: () => rec.stop() }
}
