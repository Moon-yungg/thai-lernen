import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useRef, useState, type ReactNode } from 'react'
import type { Item } from '../data'
import { sfx } from '../lib/audio'
import { retryOf, type Ex } from '../lib/session'
import { addXp, gradeItems, update } from '../lib/store'
import { Confetti, Progress } from '../components/ui'
import { Build, Choice, Cloze, Flash, Intro, Match, Type } from '../exercises/Basic'
import { Speak } from '../exercises/Speak'
import { Draw } from '../exercises/Draw'

export interface SessionConfig {
  title: string
  exercises: Ex[]
  mode: 'lesson' | 'review' | 'test'
  lessonId?: string
  testId?: string // Kapitel-ID beim Kapiteltest
  color?: string
}

const praise = ['Richtig!', 'Super!', 'Klasse!', 'Genau!', 'Stark!', 'Perfekt!', 'เก่งมาก! (Sehr gut!)', 'ถูกต้อง! (Korrekt!)']

export function Session({ cfg, onExit }: { cfg: SessionConfig; onExit: () => void }) {
  const [queue, setQueue] = useState<Ex[]>(cfg.exercises)
  const [idx, setIdx] = useState(0)
  const [fb, setFb] = useState<{ ok: boolean; sol?: ReactNode; msg: string } | null>(null)
  const [combo, setCombo] = useState(0)
  const [maxCombo, setMaxCombo] = useState(0)
  const [finished, setFinished] = useState(false)
  const [confirmExit, setConfirmExit] = useState(false)
  const results = useRef<Record<string, { ok: number; bad: number }>>({})
  const retries = useRef<Record<string, number>>({})
  const stats = useRef({ ok: 0, bad: 0, start: Date.now() })
  const ctx = useMemo<Item[]>(() => [...new Map(cfg.exercises.map((e) => [e.item.id, e.item])).values()], [cfg])

  const ex = queue[idx]
  const graded = queue.filter((e) => e.t !== 'intro').length
  const progress = idx / queue.length

  const record = (id: string, ok: boolean) => {
    const r = (results.current[id] ||= { ok: 0, bad: 0 })
    ok ? r.ok++ : r.bad++
  }

  const onSubmit = (ok: boolean | null, sol?: ReactNode, perItem?: Record<string, boolean>) => {
    if (ok === null) return next()
    if (perItem) Object.entries(perItem).forEach(([id, v]) => record(id, v))
    else record(ex.item.id, ok)
    ok ? stats.current.ok++ : stats.current.bad++
    if (ok) {
      const c = combo + 1
      setCombo(c)
      setMaxCombo((m) => Math.max(m, c))
      c > 0 && c % 5 === 0 ? sfx.combo() : sfx.correct()
      navigator.vibrate?.(15)
    } else {
      setCombo(0)
      sfx.wrong()
      navigator.vibrate?.([30, 40, 30])
      // Fehler-Wiederholung: falsch beantwortete Aufgabe kommt später erneut
      const n = retries.current[ex.item.id] || 0
      if (cfg.mode !== 'test' && n < 2 && ex.t !== 'match') {
        retries.current[ex.item.id] = n + 1
        setQueue((q) => [...q, retryOf(ex, ctx)])
      }
    }
    setFb({ ok, sol, msg: ok ? praise[Math.floor(Math.random() * praise.length)] : 'Leider falsch' })
  }

  const next = () => {
    setFb(null)
    if (idx + 1 >= queue.length) finish()
    else setIdx(idx + 1)
  }

  const finish = () => {
    const total = stats.current.ok + stats.current.bad
    const pct = total ? stats.current.ok / total : 1
    gradeItems(results.current)
    const xp = 5 + stats.current.ok * 2 + Math.floor(maxCombo / 5) * 3
    addXp(xp)
    update((p) => {
      if (cfg.lessonId) {
        const l = (p.lessons[cfg.lessonId] ||= { done: 0, best: 0 })
        l.done++
        l.best = Math.max(l.best, Math.round(pct * 100))
      }
      if (cfg.testId) p.tests[cfg.testId] = Math.max(p.tests[cfg.testId] || 0, Math.round(pct * 100))
    })
    sfx.complete()
    setFinished(true)
  }

  if (finished) {
    const total = stats.current.ok + stats.current.bad
    const pct = total ? Math.round((stats.current.ok / total) * 100) : 100
    const mins = Math.max(1, Math.round((Date.now() - stats.current.start) / 60000))
    const passed = cfg.mode !== 'test' || pct >= 80
    return (
      <div className="screen" style={{ justifyContent: 'center' }}>
        {passed && <Confetti />}
        <div className="ex" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <motion.div initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 180, damping: 10 }} style={{ fontSize: 110 }}>
            {cfg.mode === 'test' ? (passed ? '🏆' : '📚') : pct >= 90 ? '🌟' : pct >= 70 ? '🎉' : '💪'}
          </motion.div>
          <h2 style={{ fontSize: 28, fontWeight: 900, margin: 0 }}>
            {cfg.mode === 'test' ? (passed ? 'Test bestanden!' : 'Noch nicht ganz') : 'Lektion geschafft!'}
          </h2>
          <div className="muted" style={{ fontWeight: 800 }}>{cfg.title}</div>
          <div className="stat-grid" style={{ width: '100%', padding: 0, marginTop: 16 }}>
            {[
              ['⚡', `+${5 + stats.current.ok * 2 + Math.floor(maxCombo / 5) * 3}`, 'XP'],
              ['🎯', `${pct}%`, 'Genauigkeit'],
              ['🔥', maxCombo, 'Beste Serie'],
            ].map(([i, v, l], k) => (
              <motion.div key={k} className="stat" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 + k * 0.12 }}>
                <div style={{ fontSize: 22 }}>{i}</div>
                <b>{v}</b>
                <small>{l}</small>
              </motion.div>
            ))}
          </div>
          <div className="hint" style={{ marginTop: 12 }}>{mins} Min. · {graded} Aufgaben{cfg.mode === 'test' && !passed ? ' · 80% zum Bestehen nötig' : ''}</div>
        </div>
        <div className="ex-foot">
          <button className="btn" onClick={onExit}>Weiter</button>
        </div>
      </div>
    )
  }

  if (!ex)
    return (
      <div className="screen" style={{ justifyContent: 'center', alignItems: 'center', padding: 24, textAlign: 'center' }}>
        <div style={{ fontSize: 64 }}>🌴</div>
        <h2>Nichts zu tun!</h2>
        <p className="muted">Hier gibt es gerade keine Aufgaben. Lerne zuerst ein paar Lektionen.</p>
        <button className="btn" onClick={onExit}>Zurück</button>
      </div>
    )

  const props = { locked: !!fb, onSubmit }
  return (
    <div className="screen">
      <div className="session-top">
        <button className="iconbtn" onClick={() => setConfirmExit(true)} aria-label="Beenden">✕</button>
        <Progress value={progress} />
        <AnimatePresence>
          {combo >= 2 && (
            <motion.div className="combo" key={combo} initial={{ scale: 1.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}>
              🔥{combo}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {ex.retry && <div className="hint" style={{ color: 'var(--brand)', visibility: fb ? 'hidden' : 'visible' }}>↻ Fehler-Wiederholung</div>}
      <AnimatePresence mode="wait">
        <motion.div
          key={ex.key}
          style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -60, opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          {ex.t === 'intro' && <Intro ex={ex} {...props} />}
          {ex.t === 'flash' && <Flash ex={ex} {...props} />}
          {ex.t === 'choice' && <Choice ex={ex} {...props} />}
          {ex.t === 'match' && <Match ex={ex} {...props} />}
          {ex.t === 'build' && <Build ex={ex} {...props} />}
          {ex.t === 'cloze' && <Cloze ex={ex} {...props} />}
          {ex.t === 'type' && <Type ex={ex} {...props} />}
          {ex.t === 'speak' && <Speak ex={ex} {...props} />}
          {ex.t === 'draw' && <Draw ex={ex} {...props} />}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {fb && (
          <motion.div className={`sheet ${fb.ok ? 'ok' : 'bad'}`} initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
            <h3>
              <motion.span initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 12 }}>
                {fb.ok ? '✅' : '❌'}
              </motion.span>
              {fb.msg}
            </h3>
            {fb.sol && <div className="sol">{!fb.ok && ex.t !== 'draw' && <div style={{ fontSize: 13, fontWeight: 900, color: 'inherit' }}>Richtige Lösung:</div>}{fb.sol}</div>}
            <button className={`btn ${fb.ok ? 'ok' : 'bad'}`} onClick={next} ref={(b) => b?.focus({ preventScroll: true })}>
              Weiter
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {confirmExit && (
          <>
            <motion.div className="backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setConfirmExit(false)} />
            <motion.div className="popover" style={{ background: 'var(--card)', color: 'var(--text)' }} initial={{ y: 200 }} animate={{ y: 0 }} exit={{ y: 300 }}>
              <h3 style={{ marginTop: 0 }}>Wirklich aufhören?</h3>
              <p className="muted" style={{ fontWeight: 700 }}>Dein Fortschritt in dieser Lektion geht verloren.</p>
              <div className="list">
                <button className="btn" onClick={() => setConfirmExit(false)}>Weiterlernen</button>
                <button className="btn ghost" style={{ color: 'var(--bad)' }} onClick={onExit}>Beenden</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
