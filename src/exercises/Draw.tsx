import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { drawPool } from '../data'
import type { Ex } from '../lib/session'
import { sayText } from '../lib/session'
import { ensureFont, glyph, recognize, type DrawResult, type Stroke } from '../lib/handwriting'
import { getProgress } from '../lib/store'
import { Speaker } from '../components/ui'
import type { ExProps } from './common'

type E = Extract<Ex, { t: 'draw' }>

export function Draw({ ex, onSubmit, locked }: ExProps<E>) {
  const it = ex.item
  const target = it.draw!
  const wrap = useRef<HTMLDivElement>(null)
  const guide = useRef<HTMLCanvasElement>(null)
  const ink = useRef<HTMLCanvasElement>(null)
  const strokes = useRef<Stroke[]>([])
  const [count, setCount] = useState(0)
  const [hint, setHint] = useState(ex.trace)
  const [res, setRes] = useState<DrawResult | null>(null)
  const [fontReady, setFontReady] = useState(false)

  useEffect(() => {
    ensureFont().then(() => setFontReady(true))
  }, [])

  // Hilfslinien + (optionale) Vorlage zeichnen
  useEffect(() => {
    const c = guide.current
    if (!c || !fontReady) return
    const W = c.offsetWidth
    const dpr = devicePixelRatio
    c.width = c.height = W * dpr
    const g = c.getContext('2d')!
    g.scale(dpr, dpr)
    g.clearRect(0, 0, W, W)
    const dark = matchMedia('(prefers-color-scheme: dark)').matches
    g.strokeStyle = dark ? '#3a3149' : '#efe6dd'
    g.lineWidth = 2
    g.setLineDash([8, 8])
    for (const f of [0.25, 0.5, 0.75]) {
      g.beginPath(); g.moveTo(0, W * f); g.lineTo(W, W * f); g.stroke()
    }
    g.beginPath(); g.moveTo(W / 2, 0); g.lineTo(W / 2, W); g.stroke()
    g.setLineDash([])
    if (hint || res) {
      // Glyphe so skalieren, dass sie ~70% des Feldes füllt (Box stammt aus dem 256er-Render)
      const gl = glyph(target)
      const s = (0.7 * W) / Math.max(gl.box.w, gl.box.h * 0.8)
      const ox = W / 2 - (gl.box.x + gl.box.w / 2) * s
      const oy = W / 2 - (gl.box.y + gl.box.h / 2) * s
      g.font = `400 ${150 * s}px "Sarabun", Tahoma, sans-serif`
      g.textAlign = 'center'
      g.textBaseline = 'middle'
      g.fillStyle = res ? (res.ok ? 'rgba(43,196,109,0.28)' : 'rgba(255,75,92,0.22)') : dark ? 'rgba(255,255,255,0.13)' : 'rgba(43,35,64,0.12)'
      g.fillText(target, ox + 128 * s, oy + 128 * s)
      if (gl.head) {
        const hx = ox + (gl.box.x + gl.head.x * gl.box.w) * s
        const hy = oy + (gl.box.y + gl.head.y * gl.box.h) * s
        g.fillStyle = '#ff6b4a'
        g.beginPath(); g.arc(hx, hy, 9, 0, Math.PI * 2); g.fill()
        g.fillStyle = '#fff'
        g.font = '900 11px Nunito, sans-serif'
        g.textAlign = 'center'
        g.fillText('1', hx, hy + 1)
      }
    }
  }, [hint, res, fontReady, target])

  useEffect(() => {
    const c = ink.current!
    const W = c.offsetWidth
    c.width = c.height = W * devicePixelRatio
  }, [])

  const redraw = () => {
    const c = ink.current!
    const g = c.getContext('2d')!
    const dpr = devicePixelRatio
    g.setTransform(dpr, 0, 0, dpr, 0, 0)
    g.clearRect(0, 0, c.width, c.height)
    g.lineCap = g.lineJoin = 'round'
    const W = c.offsetWidth
    g.lineWidth = Math.max(10, W * 0.045) // große, gut sichtbare Striche
    strokes.current.forEach((s, si) => {
      g.strokeStyle = si === 0 ? '#ff6b4a' : '#7c5cff'
      g.beginPath()
      s.forEach((p, i) => (i ? g.lineTo(p.x, p.y) : g.moveTo(p.x, p.y)))
      if (s.length === 1) g.lineTo(s[0].x + 0.1, s[0].y)
      g.stroke()
    })
  }

  const pos = (e: React.PointerEvent) => {
    const r = ink.current!.getBoundingClientRect()
    return { x: e.clientX - r.left, y: e.clientY - r.top }
  }
  const down = (e: React.PointerEvent) => {
    if (locked || res) return
    ;(e.target as Element).setPointerCapture(e.pointerId)
    strokes.current.push([pos(e)])
    redraw()
  }
  const move = (e: React.PointerEvent) => {
    if (!e.buttons && e.pointerType === 'mouse') return
    const s = strokes.current[strokes.current.length - 1]
    if (!s || !(e.target as Element).hasPointerCapture(e.pointerId)) return
    const p = pos(e)
    const l = s[s.length - 1]
    if (Math.hypot(p.x - l.x, p.y - l.y) > 2) {
      s.push(p)
      redraw()
    }
  }
  const up = () => setCount(strokes.current.length)

  const clear = () => {
    strokes.current = []
    setCount(0)
    redraw()
  }
  const undo = () => {
    strokes.current.pop()
    setCount(strokes.current.length)
    redraw()
  }

  const check = () => {
    const r = recognize(strokes.current, target, drawPool, ex.trace ? 0.2 : 0.5)
    setRes(r)
    const startNote =
      r.startOk === false ? <div style={{ fontSize: 14 }}>🖊️ Tipp: Thai-Buchstaben beginnt man am Kringel (Punkt ①).</div> : r.startOk ? <div style={{ fontSize: 14 }}>🖊️ Richtig am Kringel begonnen!</div> : null
    onSubmit(
      r.ok,
      <div>
        <div>
          Übereinstimmung: <b>{Math.round(r.score * 100)}%</b>
          {!r.ok && r.lookalike && (
            <>
              {' '}
              – sieht eher aus wie <span className="th" style={{ fontSize: 22 }}>{r.lookalike}</span>
            </>
          )}
        </div>
        {startNote}
      </div>,
    )
  }

  const rom = getProgress().settings.showRom
  return (
    <>
      <div className="ex" style={{ gap: 12 }}>
        <div className="ex-title">{ex.trace ? 'Zeichne nach' : 'Schreibe das Zeichen'}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Speaker text={sayText(it)} auto />
          <div>
            <div style={{ fontWeight: 900, fontSize: 19 }}>
              {it.kind === 'consonant' ? `${rom ? it.nameRom : ''} · ${it.nameDe}` : `${it.rom} (${it.form})`}
            </div>
            <div className="muted" style={{ fontWeight: 700, fontSize: 13 }}>{it.kind === 'consonant' ? `Anlaut ${it.initial}` : 'Vokal'} · großzügig zeichnen, Kringel zuerst</div>
          </div>
        </div>
        <motion.div className="draw-wrap" ref={wrap} initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <canvas ref={guide} />
          <canvas ref={ink} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} />
        </motion.div>
        <div className="draw-tools">
          <button className="btn ghost small" onClick={undo} disabled={!count || !!res}>↶ Zurück</button>
          <button className="btn ghost small" onClick={clear} disabled={!count || !!res}>✕ Löschen</button>
          {!ex.trace && (
            <button className="btn ghost small" onClick={() => setHint((h) => !h)} disabled={!!res}>
              💡 {hint ? 'Ausblenden' : 'Hinweis'}
            </button>
          )}
        </div>
      </div>
      <div className="ex-foot">
        <button className="btn" disabled={!count || locked} onClick={check}>Prüfen</button>
      </div>
    </>
  )
}
