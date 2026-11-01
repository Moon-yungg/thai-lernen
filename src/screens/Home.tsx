import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { chapters, dialogueById, grammarById, lessonList, storyById, type LessonRef } from '../data'
import { sfx } from '../lib/audio'
import { chapterUnlocked, dueIds, lessonUnlocked, type Route } from '../lib/nav'
import { lessonSession, reviewSession } from '../lib/session'
import { today, useProgress } from '../lib/store'

export function Home({ go }: { go: (r: Route) => void }) {
  const p = useProgress()
  const [open, setOpen] = useState<LessonRef | null>(null)
  const [testOpen, setTestOpen] = useState<string | null>(null)
  const currentRef = useRef<HTMLDivElement>(null)
  const current = lessonList.find((r) => lessonUnlocked(p, r) && !p.lessons[r.lesson.id]?.done)
  const due = dueIds(p).length
  const todayXp = p.daily[today()] || 0

  useEffect(() => {
    currentRef.current?.scrollIntoView({ block: 'center' })
  }, [])

  const start = (r: LessonRef) => {
    const first = !p.lessons[r.lesson.id]?.done
    go({ name: 'session', cfg: { title: r.lesson.title, exercises: lessonSession(r.lesson.items, first, r.lesson.focus), mode: 'lesson', lessonId: r.lesson.id, color: r.chapter.color } })
    setOpen(null)
  }

  const startTest = (cid: string) => {
    const c = chapters.find((x) => x.id === cid)!
    const ids = c.lessons.flatMap((l) => l.items).sort(() => Math.random() - 0.5)
    go({ name: 'session', cfg: { title: `Kapiteltest: ${c.title}`, exercises: reviewSession(ids, { max: 20, stage: 'mix' }), mode: 'test', testId: cid, color: c.color } })
    setTestOpen(null)
  }

  return (
    <>
      <div className="topbar">
        <h1>
          <span className="th" style={{ color: 'var(--brand)' }}>ภาษาไทย</span>
        </h1>
        <span className="pill" title="Serie">🔥 {p.streak}</span>
        <span className="pill" title="XP heute">⚡ {todayXp}/{p.dailyGoal}</span>
      </div>
      <div className="scroll">
        {due > 0 && (
          <motion.button
            className="tile"
            style={{ margin: '4px 16px 0', width: 'calc(100% - 32px)', background: 'linear-gradient(135deg,#7c5cff,#1fb6ff)', color: '#fff' }}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            onClick={() => go({ name: 'session', cfg: { title: 'Wiederholung', exercises: reviewSession(dueIds(p)), mode: 'review' } })}
          >
            <span className="ti" style={{ background: 'rgba(255,255,255,.2)' }}>🧠</span>
            <span>
              <b>{due} Wörter zum Wiederholen</b>
              <small style={{ color: '#fff', opacity: 0.85 }}>Spaced Repetition – jetzt ist der beste Moment</small>
            </span>
          </motion.button>
        )}
        {chapters.map((c) => {
          const unlocked = chapterUnlocked(p, c)
          const doneCount = c.lessons.filter((l) => p.lessons[l.id]?.done).length
          return (
            <div key={c.id}>
              <div className="chapter-head" style={{ background: unlocked ? `linear-gradient(135deg, ${c.color}, ${c.color}cc)` : '#b9b0c4' }}>
                <div className="ci">{c.icon}</div>
                <div style={{ flex: 1 }}>
                  <h2>{c.title}</h2>
                  <p>{c.subtitle}</p>
                  <div className="bar" style={{ marginTop: 8, background: 'rgba(255,255,255,.3)' }}>
                    <div style={{ width: `${(doneCount / c.lessons.length) * 100}%`, background: '#fff' }} />
                  </div>
                </div>
                {!unlocked && <div style={{ fontSize: 24 }}>🔒</div>}
              </div>
              <div className="path">
                {c.lessons.map((l, i) => {
                  const ref = lessonList.find((r) => r.lesson.id === l.id)!
                  const ok = lessonUnlocked(p, ref)
                  const done = p.lessons[l.id]?.done || 0
                  const isCur = current?.lesson.id === l.id
                  const offset = Math.sin(i * 1.1) * 70
                  return (
                    <div key={l.id} ref={isCur ? currentRef : undefined} style={{ transform: `translateX(${offset}px)`, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      {isCur && (
                        <motion.div className="pill" style={{ marginBottom: 8, color: c.color }} animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 1.4 }}>
                          START
                        </motion.div>
                      )}
                      <motion.button
                        className="node"
                        style={{
                          background: ok ? c.color : 'var(--line)',
                          boxShadow: `0 7px 0 ${ok ? c.color + '99' : 'var(--line)'}`,
                          filter: ok ? 'none' : 'grayscale(1)',
                          opacity: ok ? 1 : 0.7,
                        }}
                        whileTap={{ scale: 0.92 }}
                        onClick={() => {
                          sfx.tap()
                          setOpen(ref)
                        }}
                      >
                        {isCur && <motion.span className="ring" style={{ border: `4px solid ${c.color}` }} animate={{ scale: [1, 1.18], opacity: [0.8, 0] }} transition={{ repeat: Infinity, duration: 1.6 }} />}
                        <span style={{ fontSize: l.icon.length <= 2 ? 30 : 22 }}>{ok ? l.icon : '🔒'}</span>
                        {done > 0 && <span className="crown">👑{done > 1 ? done : ''}</span>}
                      </motion.button>
                      <div className="node-label">{l.title}</div>
                    </div>
                  )
                })}
                <motion.button
                  className="node"
                  style={{ background: (p.tests[c.id] || 0) >= 80 ? 'var(--gold)' : 'var(--card)', boxShadow: '0 7px 0 var(--line)', border: '3px solid var(--gold)' }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setTestOpen(c.id)}
                >
                  🏆
                </motion.button>
                <div className="node-label">Kapiteltest{p.tests[c.id] ? ` · ${p.tests[c.id]}%` : ''}</div>
              </div>
            </div>
          )
        })}
        <div style={{ height: 40 }} />
      </div>

      <AnimatePresence>
        {(open || testOpen) && <motion.div className="backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => (setOpen(null), setTestOpen(null))} />}
        {open && (
          <motion.div key="pop" className="popover" style={{ background: open.chapter.color }} initial={{ y: 300 }} animate={{ y: 0 }} exit={{ y: 400 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
              <div style={{ fontSize: 40 }}>{open.lesson.icon}</div>
              <div>
                <div style={{ fontWeight: 900, fontSize: 20 }}>{open.lesson.title}</div>
                <div className="th" style={{ fontWeight: 700, opacity: 0.92 }}>{open.lesson.subtitle}</div>
                <div style={{ fontWeight: 800, fontSize: 13, opacity: 0.85 }}>
                  {open.lesson.items.length} {open.lesson.type === 'letters' ? 'Zeichen' : open.lesson.type === 'sentences' ? 'Sätze' : 'Wörter'}
                  {p.lessons[open.lesson.id] ? ` · bestes Ergebnis ${p.lessons[open.lesson.id].best}%` : ''}
                </div>
              </div>
            </div>
            <div className="list">
              {lessonUnlocked(p, open) ? (
                <button className="btn" onClick={() => start(open)}>{p.lessons[open.lesson.id]?.done ? 'Wiederholen' : 'Los geht’s'}</button>
              ) : (
                <button className="btn" disabled>🔒 Erst vorherige Lektion abschließen</button>
              )}
              {open.lesson.grammar && grammarById.get(open.lesson.grammar) && (
                <button className="btn ghost" onClick={() => (go({ name: 'grammar', id: open.lesson.grammar! }), setOpen(null))}>
                  📘 Grammatik: {grammarById.get(open.lesson.grammar)!.title}
                </button>
              )}
              {open.lesson.story && storyById.get(open.lesson.story) && (
                <button className="btn ghost" onClick={() => (go({ name: 'story', id: open.lesson.story! }), setOpen(null))}>
                  📖 Lesetext: {storyById.get(open.lesson.story)!.title}
                </button>
              )}
              {open.lesson.dialogue && dialogueById.get(open.lesson.dialogue) && (
                <button className="btn ghost" onClick={() => (go({ name: 'dialogue', id: open.lesson.dialogue! }), setOpen(null))}>
                  💬 Rollenspiel: {dialogueById.get(open.lesson.dialogue)!.title}
                </button>
              )}
            </div>
          </motion.div>
        )}
        {testOpen && (
          <motion.div key="test" className="popover" style={{ background: 'linear-gradient(135deg,#ffb400,#ff6b4a)' }} initial={{ y: 300 }} animate={{ y: 0 }} exit={{ y: 400 }}>
            <div style={{ fontWeight: 900, fontSize: 20 }}>🏆 Lernstandstest</div>
            <p style={{ fontWeight: 700 }}>
              20 gemischte Aufgaben aus „{chapters.find((c) => c.id === testOpen)!.title}“ – ohne Hilfe und ohne Wiederholung. Ab 80% bestanden. Ein bestandener Test schaltet auch das nächste Kapitel frei.
            </p>
            <button className="btn" onClick={() => startTest(testOpen)}>Test starten</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
