// Tolerante Handschrift-Erkennung für einzelne Thai-Zeichen.
// Idee: Glyphe der Schriftart (Sarabun, mit Kringeln) wird gerastert und normalisiert,
// die Nutzer-Striche ebenso. Vergleich über Überdeckung mit Toleranz (Precision/Recall → F-Score).
// Zusätzlich Vergleich gegen alle anderen Zeichen → „sieht eher aus wie …“.
// Strichfolge: Thai-Buchstaben beginnt man fast immer am Kringel („Kopf“). Der Kopf wird als
// kleinstes geschlossenes Loch der Glyphe erkannt und mit dem Startpunkt des ersten Strichs verglichen.

export type Pt = { x: number; y: number }
export type Stroke = Pt[]

const N = 64 // Rastergröße
const FONT = '"Sarabun", "Noto Sans Thai Looped", Tahoma, sans-serif'

interface Glyph {
  mask: Uint8Array
  dil: Uint8Array
  count: number
  head: Pt | null // normalisiert 0..1 in der Glyphen-Box
  box: { x: number; y: number; w: number; h: number } // Box im 256er Render (für Anzeige)
}

const cache = new Map<string, Glyph>()

function dilate(m: Uint8Array, r: number) {
  const out = new Uint8Array(N * N)
  for (let y = 0; y < N; y++)
    for (let x = 0; x < N; x++) {
      if (!m[y * N + x]) continue
      for (let dy = -r; dy <= r; dy++)
        for (let dx = -r; dx <= r; dx++) {
          if (dx * dx + dy * dy > r * r + 1) continue
          const xx = x + dx
          const yy = y + dy
          if (xx >= 0 && yy >= 0 && xx < N && yy < N) out[yy * N + xx] = 1
        }
    }
  return out
}

function fitTransform(b: { x: number; y: number; w: number; h: number }) {
  const pad = 6
  const s = (N - 2 * pad) / Math.max(b.w, b.h, 1)
  const ox = pad + (N - 2 * pad - b.w * s) / 2
  const oy = pad + (N - 2 * pad - b.h * s) / 2
  return (p: Pt): Pt => ({ x: ox + (p.x - b.x) * s, y: oy + (p.y - b.y) * s })
}

function inkBox(data: Uint8ClampedArray, W: number, H: number) {
  let x0 = W, y0 = H, x1 = -1, y1 = -1
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++)
      if (data[(y * W + x) * 4 + 3] > 100) {
        if (x < x0) x0 = x
        if (x > x1) x1 = x
        if (y < y0) y0 = y
        if (y > y1) y1 = y
      }
  if (x1 < 0) return null
  return { x: x0, y: y0, w: x1 - x0 + 1, h: y1 - y0 + 1 }
}

function findHead(data: Uint8ClampedArray, W: number, H: number, box: { x: number; y: number; w: number; h: number }): Pt | null {
  // Hintergrund-Flutfüllung vom Rand; übrig bleibende Hintergrundregionen = Löcher
  const ink = (i: number) => data[i * 4 + 3] > 60
  const seen = new Uint8Array(W * H)
  const stack: number[] = []
  for (let x = 0; x < W; x++) stack.push(x, (H - 1) * W + x)
  for (let y = 0; y < H; y++) stack.push(y * W, y * W + W - 1)
  while (stack.length) {
    const i = stack.pop()!
    if (seen[i] || ink(i)) continue
    seen[i] = 1
    const x = i % W
    const y = (i / W) | 0
    if (x > 0) stack.push(i - 1)
    if (x < W - 1) stack.push(i + 1)
    if (y > 0) stack.push(i - W)
    if (y < H - 1) stack.push(i + W)
  }
  const holes: { n: number; sx: number; sy: number }[] = []
  for (let i = 0; i < W * H; i++) {
    if (seen[i] || ink(i)) continue
    let n = 0, sx = 0, sy = 0
    stack.push(i)
    while (stack.length) {
      const j = stack.pop()!
      if (seen[j] || ink(j)) continue
      seen[j] = 1
      const x = j % W
      const y = (j / W) | 0
      n++
      sx += x
      sy += y
      stack.push(j - 1, j + 1, j - W, j + W)
    }
    if (n > 6) holes.push({ n, sx, sy })
  }
  if (!holes.length) return null
  const area = box.w * box.h
  const small = holes.filter((h) => h.n < area * 0.08)
  if (!small.length) return null
  small.sort((a, b) => a.n - b.n)
  const h = small[0]
  return { x: (h.sx / h.n - box.x) / box.w, y: (h.sy / h.n - box.y) / box.h }
}

export async function ensureFont() {
  try {
    await document.fonts.load('150px Sarabun', 'กขค')
  } catch {}
}

export function glyph(ch: string): Glyph {
  const hit = cache.get(ch)
  if (hit) return hit
  const W = 256
  const c = document.createElement('canvas')
  c.width = c.height = W
  const g = c.getContext('2d', { willReadFrequently: true })!
  g.font = `400 150px ${FONT}`
  g.textAlign = 'center'
  g.textBaseline = 'middle'
  g.fillStyle = '#000'
  g.fillText(ch, W / 2, W / 2)
  const data = g.getImageData(0, 0, W, W).data
  const box = inkBox(data, W, W) || { x: 0, y: 0, w: W, h: W }
  const head = findHead(data, W, W, box)
  // auf N×N herunterskalieren
  const tf = fitTransform(box)
  const mask = new Uint8Array(N * N)
  for (let y = box.y; y < box.y + box.h; y++)
    for (let x = box.x; x < box.x + box.w; x++)
      if (data[(y * W + x) * 4 + 3] > 100) {
        const p = tf({ x, y })
        const xi = Math.min(N - 1, Math.round(p.x))
        const yi = Math.min(N - 1, Math.round(p.y))
        mask[yi * N + xi] = 1
      }
  const gl: Glyph = { mask, dil: dilate(mask, 4), count: mask.reduce((a, b) => a + b, 0), head, box }
  cache.set(ch, gl)
  return gl
}

function strokeBox(strokes: Stroke[]) {
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity
  for (const s of strokes)
    for (const p of s) {
      x0 = Math.min(x0, p.x); y0 = Math.min(y0, p.y); x1 = Math.max(x1, p.x); y1 = Math.max(y1, p.y)
    }
  return { x: x0, y: y0, w: Math.max(1, x1 - x0), h: Math.max(1, y1 - y0) }
}

function rasterize(strokes: Stroke[]) {
  const box = strokeBox(strokes)
  const tf = fitTransform(box)
  const c = document.createElement('canvas')
  c.width = c.height = N
  const g = c.getContext('2d', { willReadFrequently: true })!
  g.lineCap = g.lineJoin = 'round'
  g.lineWidth = 3.5
  g.strokeStyle = '#000'
  for (const s of strokes) {
    g.beginPath()
    s.forEach((p, i) => {
      const q = tf(p)
      i ? g.lineTo(q.x, q.y) : g.moveTo(q.x, q.y)
    })
    if (s.length === 1) {
      const q = tf(s[0])
      g.lineTo(q.x + 0.1, q.y)
    }
    g.stroke()
  }
  const d = g.getImageData(0, 0, N, N).data
  const mask = new Uint8Array(N * N)
  for (let i = 0; i < N * N; i++) mask[i] = d[i * 4 + 3] > 80 ? 1 : 0
  return { mask, box }
}

function fscore(u: Uint8Array, uDil: Uint8Array, uCount: number, gl: Glyph) {
  let p = 0, r = 0
  for (let i = 0; i < N * N; i++) {
    if (u[i] && gl.dil[i]) p++
    if (gl.mask[i] && uDil[i]) r++
  }
  const P = p / Math.max(1, uCount)
  const R = r / Math.max(1, gl.count)
  return P + R ? (2 * P * R) / (P + R) : 0
}

export interface DrawResult {
  score: number // 0..1
  ok: boolean
  rank: number
  lookalike?: string
  startOk: boolean | null // null = kein Kopf erkennbar
  head: Pt | null
}

export function recognize(strokes: Stroke[], target: string, pool: string[], strictness = 0.5): DrawResult {
  const pts = strokes.reduce((a, s) => a + s.length, 0)
  if (pts < 3) return { score: 0, ok: false, rank: 99, startOk: null, head: null }
  const { mask, box } = rasterize(strokes)
  const uCount = mask.reduce((a, b) => a + b, 0)
  const uDil = dilate(mask, 4)
  const tg = glyph(target)
  const score = fscore(mask, uDil, uCount, tg)
  const others = pool
    .filter((c) => c !== target)
    .map((c) => ({ c, s: fscore(mask, uDil, uCount, glyph(c)) }))
    .sort((a, b) => b.s - a.s)
  const rank = others.filter((o) => o.s > score).length + 1
  const threshold = 0.42 + strictness * 0.2 // „nicht zu streng“: Standard ≈ 0.52
  const ok = score >= threshold && (rank <= 3 || score >= others[0].s - 0.04)
  const lookalike = others[0] && others[0].s > score + 0.06 ? others[0].c : undefined
  let startOk: boolean | null = null
  if (tg.head) {
    const s0 = strokes[0][0]
    const nx = (s0.x - box.x) / box.w
    const ny = (s0.y - box.y) / box.h
    startOk = Math.hypot(nx - tg.head.x, ny - tg.head.y) < 0.3
  }
  return { score, ok, rank, lookalike, startOk, head: tg.head }
}
