import { motion } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { speak, sfx } from '../lib/audio'

export function Speaker({ text, size, auto, slow }: { text: string; size?: 'big' | 'small'; auto?: boolean; slow?: boolean }) {
  const [playing, setPlaying] = useState(false)
  const play = (s = slow) => {
    setPlaying(true)
    speak(text, { slow: s }).then(() => setPlaying(false))
  }
  useEffect(() => {
    if (auto) {
      const t = setTimeout(() => play(), 250)
      return () => clearTimeout(t)
    }
  }, [text])
  return (
    <motion.button
      className={`speaker ${size || ''} ${slow ? 'turtle' : ''}`}
      onClick={(e) => {
        e.stopPropagation()
        play()
      }}
      animate={playing ? { scale: [1, 1.08, 1] } : { scale: 1 }}
      transition={playing ? { repeat: Infinity, duration: 0.6 } : {}}
      aria-label="Vorlesen"
    >
      {slow ? '🐢' : '🔊'}
    </motion.button>
  )
}

export function SpeakerPair({ text, auto = true }: { text: string; auto?: boolean }) {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', justifyContent: 'center' }}>
      <Speaker text={text} size="big" auto={auto} />
      <Speaker text={text} slow />
    </div>
  )
}

export function Progress({ value }: { value: number }) {
  return (
    <div className="progress">
      <motion.div initial={false} animate={{ width: `${Math.max(4, value * 100)}%` }} transition={{ type: 'spring', stiffness: 120, damping: 18 }} />
    </div>
  )
}

export function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return <button className={`toggle ${on ? 'on' : ''}`} onClick={() => (sfx.tap(), onChange(!on))} aria-pressed={on} />
}

export function Confetti({ run = true }: { run?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (!run) return
    const c = ref.current!
    const g = c.getContext('2d')!
    const W = (c.width = c.offsetWidth * devicePixelRatio)
    const H = (c.height = c.offsetHeight * devicePixelRatio)
    const colors = ['#ff6b4a', '#ffb400', '#2bc46d', '#1fb6ff', '#7c5cff', '#ff4fa3']
    const parts = Array.from({ length: 140 }, () => ({
      x: W / 2 + (Math.random() - 0.5) * W * 0.3,
      y: H * 0.35,
      vx: (Math.random() - 0.5) * 22,
      vy: -Math.random() * 26 - 8,
      r: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      s: (6 + Math.random() * 8) * devicePixelRatio,
      c: colors[Math.floor(Math.random() * colors.length)],
    }))
    let raf = 0
    let t = 0
    const tick = () => {
      t++
      g.clearRect(0, 0, W, H)
      for (const p of parts) {
        p.vy += 0.7
        p.vx *= 0.985
        p.x += p.vx
        p.y += p.vy
        p.r += p.vr
        g.save()
        g.translate(p.x, p.y)
        g.rotate(p.r)
        g.fillStyle = p.c
        g.globalAlpha = Math.max(0, 1 - t / 160)
        g.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2)
        g.restore()
      }
      if (t < 160) raf = requestAnimationFrame(tick)
    }
    tick()
    return () => cancelAnimationFrame(raf)
  }, [run])
  return <canvas ref={ref} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 40 }} />
}

export function Md({ text }: { text: string }) {
  // Minimal-Markdown: Absätze, **fett**, Zeilenumbrüche, Aufzählungen mit "- "
  return (
    <>
      {text.split(/\n\n+/).map((para, i) => (
        <p key={i}>
          {para.split('\n').map((line, j) => (
            <span key={j}>
              {j > 0 && <br />}
              {line
                .replace(/^- /, '• ')
                .split(/(\*\*[^*]+\*\*|\*[^*\s][^*]*\*)/)
                .map((s, k) =>
                  s.startsWith('**') ? <b key={k}>{s.slice(2, -2)}</b> : s.length > 2 && s.startsWith('*') && s.endsWith('*') ? <i key={k}>{s.slice(1, -1)}</i> : <Thaiify key={k} s={s} />,
                )}
            </span>
          ))}
        </p>
      ))}
    </>
  )
}

// Thai-Textstellen in Fließtext mit Thai-Schrift darstellen
function Thaiify({ s }: { s: string }) {
  return (
    <>
      {s.split(/([฀-๿]+)/).map((p, i) =>
        /[฀-๿]/.test(p) ? (
          <span key={i} className="th" style={{ fontSize: '1.15em', fontWeight: 600 }}>
            {p}
          </span>
        ) : (
          p
        ),
      )}
    </>
  )
}

export function Screen({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={`screen ${className || ''}`}
      initial={{ x: '30%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '-20%', opacity: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 30 }}
    >
      {children}
    </motion.div>
  )
}

export function TopBar({ title, onBack, right }: { title: ReactNode; onBack?: () => void; right?: ReactNode }) {
  return (
    <div className="topbar">
      {onBack && (
        <button className="iconbtn" onClick={onBack} aria-label="Zurück">
          ←
        </button>
      )}
      <h1>{title}</h1>
      {right}
    </div>
  )
}
