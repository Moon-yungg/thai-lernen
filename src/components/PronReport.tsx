import { motion } from 'framer-motion'
import { useState } from 'react'
import { TONE_NAME, TONE_TPL, type Analysis, type Issue, type SyllableResult } from '../lib/server'
import { speak } from '../lib/audio'

const ISSUE_ICON: Record<string, string> = { aspiration: '💨', voicing: '🎙️', length: '⏱️', quality: '👄', rl: '👅', ng: '👃', final: '🔚', tone: '🎵', missing: '❔', extra: '➕', sound: '🔤' }

// Abspielknöpfe „richtig“ vs. „so klang es“ – damit man den Unterschied hört
function Compare({ c }: { c: NonNullable<Issue['compare']> }) {
  const [playing, setPlaying] = useState<number | null>(null)
  const play = (k: number, text: string, slow = false) => {
    setPlaying(k)
    speak(text, { slow }).then(() => setPlaying(null))
  }
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
      {c.map((x, k) => (
        <motion.button
          key={k}
          className="pill"
          style={{ border: `2px solid ${x.ok ? 'var(--ok)' : 'var(--bad)'}`, boxShadow: 'none', gap: 6 }}
          animate={playing === k ? { scale: [1, 1.06, 1] } : { scale: 1 }}
          transition={playing === k ? { repeat: Infinity, duration: 0.6 } : {}}
          onClick={() => play(k, x.text)}
          onContextMenu={(e) => (e.preventDefault(), play(k, x.text, true))}
        >
          {x.ok ? '✅' : '❌'} 🔊 <span className="th" style={{ fontSize: 18 }}>{x.text}</span>
          <span className="muted" style={{ fontSize: 11 }}>{x.label}</span>
        </motion.button>
      ))}
    </div>
  )
}

function Issues({ a }: { a: Analysis }) {
  if (!a.issues?.length) return null
  return (
    <div className="list" style={{ gap: 8 }}>
      {a.issues.map((i, k) => (
        <motion.div key={k} className="g-tip" style={{ fontSize: 14, padding: '10px 12px' }} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + k * 0.1 }}>
          <b>{ISSUE_ICON[i.type] || '•'} {i.title}</b>
          <div>{i.detail}</div>
          <div style={{ marginTop: 4 }}>👉 {i.tip}</div>
          {i.compare && <Compare c={i.compare} />}
        </motion.div>
      ))}
    </div>
  )
}

const col = (v: number) => (v >= 0.7 ? 'var(--ok)' : v >= 0.4 ? 'var(--gold)' : 'var(--bad)')

function path(vals: number[], w: number, h: number, lo = -6, hi = 6) {
  return vals
    .map((v, i) => {
      const x = (i / (vals.length - 1)) * w
      const y = h - ((Math.max(lo, Math.min(hi, v)) - lo) / (hi - lo)) * h
      return `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`
    })
    .join(' ')
}

function ToneChart({ s }: { s: SyllableResult }) {
  const W = 64
  const H = 40
  const ok = s.sim !== null ? s.sim >= 0.6 : s.expected && s.detected ? s.expected === s.detected : null
  // Nutzerkurve auf die Lage der Schablone verschieben, damit die Form vergleichbar ist
  let user = s.contour
  if (user && s.expected && !s.ref) {
    const tpl = TONE_TPL[s.expected]
    const shift = tpl.reduce((a, b) => a + b, 0) / tpl.length - user.reduce((a, b) => a + b, 0) / user.length
    user = user.map((v) => v + shift * 0.5)
  }
  return (
    <svg width={W} height={H} viewBox={`-2 -2 ${W + 4} ${H + 4}`} style={{ background: 'var(--bg2)', borderRadius: 8 }}>
      {s.ref && <path d={path(s.ref, W, H)} stroke="var(--muted)" strokeWidth="3" strokeDasharray="4 4" fill="none" strokeLinecap="round" />}
      {!s.ref && s.expected && <path d={path(TONE_TPL[s.expected], W, H)} stroke="var(--muted)" strokeWidth="3" strokeDasharray="4 4" fill="none" strokeLinecap="round" />}
      {user && (
        <motion.path
          d={path(user, W, H)}
          stroke={ok === null ? 'var(--blue)' : ok ? 'var(--ok)' : 'var(--bad)'}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6 }}
        />
      )}
    </svg>
  )
}

export function PronReport({ a }: { a: Analysis }) {
  return (
    <motion.div className="card" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ position: 'relative', width: 64, height: 64, flex: 'none' }}>
          <svg width="64" height="64" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="27" stroke="var(--line)" strokeWidth="7" fill="none" />
            <motion.circle
              cx="32" cy="32" r="27" stroke={col(a.score)} strokeWidth="7" fill="none" strokeLinecap="round"
              transform="rotate(-90 32 32)" strokeDasharray={2 * Math.PI * 27}
              initial={{ strokeDashoffset: 2 * Math.PI * 27 }} animate={{ strokeDashoffset: 2 * Math.PI * 27 * (1 - a.score) }} transition={{ duration: 0.8 }}
            />
          </svg>
          <b style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', fontSize: 17 }}>{Math.round(a.score * 100)}</b>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 900, color: col(a.score) }}>{a.score >= 0.85 ? 'Ausgezeichnet! 🎉' : a.score >= 0.6 ? 'Gut gemacht 👍' : a.score >= 0.4 ? 'Fast – nochmal üben 👂' : 'Das klang noch anders 🤔'}</div>
          <div style={{ fontSize: 13, fontWeight: 800 }} className="muted">
            Laute {Math.round(a.sounds * 100)}%{a.tones !== null && <> · Töne {Math.round(a.tones * 100)}%</>}
          </div>
          <div style={{ fontSize: 14 }}>
            Gehört: <span className="th" style={{ fontSize: 19, fontWeight: 600 }}>{a.recognized || '–'}</span>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {a.syllables.map((s, i) => (
          <motion.div key={i} initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: i * 0.08 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: 6, borderRadius: 12, border: `2px solid ${col(s.pron)}` }}>
            <span className="th" style={{ fontSize: 22, fontWeight: 600, color: col(s.pron), lineHeight: 1.2 }}>{s.text}</span>
            <ToneChart s={s} />
            <span style={{ fontSize: 10, fontWeight: 800, textAlign: 'center', lineHeight: 1.2 }}>
              {s.expected ? TONE_NAME[s.expected] : '–'}
              {s.sim !== null && <div style={{ color: s.sim >= 0.6 ? 'var(--ok)' : 'var(--bad)' }}>{s.sim >= 0.6 ? '≈ wie Vorbild' : 'evtl. anders'}</div>}
              {s.detected && s.expected && s.detected !== s.expected && <div style={{ color: 'var(--bad)' }}>gehört: {TONE_NAME[s.detected]}</div>}
              {s.detected && s.expected && s.detected === s.expected && <div style={{ color: 'var(--ok)' }}>✓</div>}
            </span>
          </motion.div>
        ))}
      </div>
      <div className="hint" style={{ textAlign: 'left', fontSize: 12 }}>
        Farbe = Lautqualität je Silbe · durchgezogen = deine Tonhöhe · gestrichelt ={' '}
        {a.toneMode === 'reference' ? 'Vorbild-Aufnahme' : 'typischer Verlauf des erwarteten Tons'}.
        {' '}Die Tonbewertung ist eine Schätzung (bei Einzelwörtern etwa 60 % zuverlässig) – vergleiche die Kurven und hör dir das Vorbild an.
        {a.toneMode === null && ' Für Töne in Sätzen wird eine Vorbild-Aufnahme benötigt.'}
      </div>
      <Issues a={a} />
    </motion.div>
  )
}
