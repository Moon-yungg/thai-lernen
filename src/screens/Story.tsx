import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { storyById } from '../data'
import { sfx, speak } from '../lib/audio'
import { addXp, update, useProgress } from '../lib/store'
import { Confetti, Progress, Speaker, TopBar } from '../components/ui'

// Lesetext: Satz für Satz lesen (Wörter antippen = vorlesen), danach Verständnisfragen
export function StoryScreen({ id, onBack }: { id: string; onBack: () => void }) {
  const st = storyById.get(id)!
  const p = useProgress()
  const [shown, setShown] = useState(1)
  const [reveal, setReveal] = useState<Record<number, boolean>>({})
  const [phase, setPhase] = useState<'read' | 'quiz' | 'done'>('read')
  const [qi, setQi] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const end = useRef<HTMLDivElement>(null)

  useEffect(() => {
    end.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [shown, phase])

  const total = st.sentences.length + st.questions.length
  const progress = phase === 'read' ? shown / total : (st.sentences.length + qi) / total

  const answer = (k: number) => {
    if (picked !== null) return
    setPicked(k)
    const ok = k === st.questions[qi].answer
    ok ? sfx.correct() : sfx.wrong()
    if (ok) setScore((s) => s + 1)
  }
  const nextQ = () => {
    if (qi + 1 < st.questions.length) {
      setQi(qi + 1)
      setPicked(null)
    } else {
      const pct = Math.round((score / st.questions.length) * 100)
      update((pp) => void (pp.stories[id] = Math.max(pp.stories?.[id] || 0, pct)))
      addXp(10 + score * 3)
      sfx.complete()
      setPhase('done')
    }
  }

  return (
    <>
      {phase === 'done' && score === st.questions.length && <Confetti />}
      <TopBar title={<>{st.icon} {st.title}</>} onBack={onBack} />
      <div style={{ padding: '0 16px 6px' }}>
        <Progress value={phase === 'done' ? 1 : progress} />
      </div>
      <div className="scroll" style={{ padding: '0 16px' }}>
        <div className="list" style={{ gap: 12, paddingTop: 8 }}>
          <AnimatePresence>
            {st.sentences.slice(0, shown).map((s, i) => (
              <motion.div key={i} className="card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ padding: 12 }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <Speaker text={s.tokens.join('')} size="small" auto={i === shown - 1 && phase === 'read'} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                      {s.tokens.map((t, k) => (
                        <button key={k} className="th" onClick={() => speak(t)} style={{ fontSize: 22, fontWeight: 600, padding: '0 2px', borderRadius: 6, lineHeight: 1.5 }}>
                          {t}
                        </button>
                      ))}
                    </div>
                    {p.settings.showRom && <div className="muted" style={{ fontSize: 13, fontWeight: 700 }}>{s.rom}</div>}
                    {reveal[i] ? (
                      <div style={{ fontWeight: 800, fontSize: 14, marginTop: 4 }}>{s.de}</div>
                    ) : (
                      <button className="hint" style={{ textAlign: 'left', marginTop: 4 }} onClick={() => setReveal({ ...reveal, [i]: true })}>
                        👁 Übersetzung zeigen
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {phase === 'quiz' && (
            <motion.div className="card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} key={qi}>
              <div className="muted" style={{ fontSize: 12, fontWeight: 900 }}>FRAGE {qi + 1}/{st.questions.length}</div>
              <div style={{ fontWeight: 900, fontSize: 17, margin: '6px 0 10px' }}>{st.questions[qi].q}</div>
              <div className="list">
                {st.questions[qi].options.map((o, k) => (
                  <button key={k} className={`opt ${picked !== null ? (k === st.questions[qi].answer ? 'right' : k === picked ? 'wrong' : 'dim') : ''}`} onClick={() => answer(k)}>
                    {o}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {phase === 'done' && (
            <motion.div className="card center" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
              <div style={{ fontSize: 56 }}>{score === st.questions.length ? '🏆' : '📖'}</div>
              <h3 style={{ margin: 4 }}>{score} von {st.questions.length} richtig</h3>
              <div className="muted" style={{ fontWeight: 700 }}>Tipp: Lies den Text morgen nochmal laut mit – das trainiert Lesen und Aussprache zugleich.</div>
            </motion.div>
          )}
          <div ref={end} style={{ height: 8 }} />
        </div>
      </div>
      <div className="ex-foot">
        {phase === 'read' && (
          <button className="btn" onClick={() => (shown < st.sentences.length ? setShown(shown + 1) : setPhase('quiz'))}>
            {shown < st.sentences.length ? 'Nächster Satz' : 'Zu den Fragen'}
          </button>
        )}
        {phase === 'quiz' && (
          <button className="btn" disabled={picked === null} onClick={nextQ}>
            {qi + 1 < st.questions.length ? 'Nächste Frage' : 'Auswerten'}
          </button>
        )}
        {phase === 'done' && (
          <button className="btn" onClick={onBack}>
            Fertig
          </button>
        )}
      </div>
    </>
  )
}
