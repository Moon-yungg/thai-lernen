import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { dialogueById, type DialogueOption } from '../data'
import { speak, sfx } from '../lib/audio'
import { shuffle } from '../lib/session'
import { analyze, canRecognize, listen, similarity } from '../lib/speech'
import { analyzeRemote, serverAvailable } from '../lib/server'
import { record } from '../lib/recorder'
import { addXp, update, useProgress } from '../lib/store'
import { Confetti, Progress, TopBar } from '../components/ui'

interface TurnResult {
  ok: boolean
  wrongPicks: DialogueOption[]
  speech?: number // Aussprache-Score 0..1
}

export function DialogueScreen({ id, onBack }: { id: string; onBack: () => void }) {
  const d = dialogueById.get(id)!
  const p = useProgress()
  const [step, setStep] = useState(0)
  const [shown, setShown] = useState<number[]>([])
  const [reveal, setReveal] = useState<Record<number, boolean>>({})
  const [results, setResults] = useState<Record<number, TurnResult>>({})
  const [wrongNow, setWrongNow] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [rec, setRec] = useState(false)
  const [done, setDone] = useState(false)
  const end = useRef<HTMLDivElement>(null)
  const turn = d.turns[step]
  const opts = useMemo(() => (turn?.options ? shuffle(turn.options) : []), [step])

  // NPC-Zeilen automatisch abspielen und weiter
  useEffect(() => {
    if (!turn || done) return
    if (turn.speaker === 'npc') {
      const t = setTimeout(() => {
        setShown((s) => [...s, step])
        speak(turn.th).then(() => setTimeout(() => advance(), 500))
      }, 700)
      return () => clearTimeout(t)
    }
  }, [step])

  useEffect(() => {
    end.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [shown, step, feedback])

  const advance = () => {
    if (step + 1 >= d.turns.length) finish()
    else setStep((s) => s + 1)
  }

  const finish = () => {
    const meTurns = d.turns.filter((t) => t.speaker === 'me').length
    setTimeout(() => {
      setDone(true)
      sfx.complete()
    }, 600)
    setResults((r) => {
      const ok = Object.values(r).filter((x) => x.ok).length
      const pct = Math.round((ok / Math.max(1, meTurns)) * 100)
      update((pp) => void (pp.dialogues[id] = Math.max(pp.dialogues[id] || 0, pct)))
      addXp(10 + ok * 2)
      return r
    })
  }

  const answer = (o: DialogueOption, speechScore?: number) => {
    const r: TurnResult = results[step] || { ok: true, wrongPicks: [] }
    if (!o.correct) {
      sfx.wrong()
      setWrongNow(o.th)
      setFeedback(o.feedback || 'Das passt hier nicht.')
      setResults({ ...results, [step]: { ...r, ok: false, wrongPicks: [...r.wrongPicks, o] } })
      setTimeout(() => setWrongNow(null), 600)
      return
    }
    sfx.correct()
    setFeedback(null)
    setResults({ ...results, [step]: { ...r, speech: speechScore ?? r.speech } })
    setShown((s) => [...s, step])
    speak(o.th).then(() => setTimeout(advance, 300))
  }

  const speakAnswer = async () => {
    if (rec) return
    setRec(true)
    setFeedback(null)
    try {
      if (serverAvailable()) {
        // Lokale Analyse: gegen die richtige Antwort ausrichten, Erkanntes mit allen Optionen vergleichen
        const correct = turn.options!.find((o) => o.correct)!
        const r = await record().promise
        const a = await analyzeRemote(r.wav, correct.th)
        setRec(false)
        const scored = turn.options!.map((o) => ({ o, s: similarity(o.th, a.recognized) })).sort((x, y) => y.s - x.s)
        if (scored[0].s < 0.35 && a.sounds < 0.5) return setFeedback(`Nicht verstanden („${a.recognized || '…'}“). Versuch es nochmal oder tippe eine Antwort.`)
        const said = a.sounds >= 0.6 ? correct : scored[0].o
        return answer(said, said.correct ? a.score : undefined)
      }
      const heard = await listen().promise
      setRec(false)
      if (!heard.length) return setFeedback('Nichts gehört – bitte nochmal.')
      // Welche Option wurde gesagt?
      const scored = turn.options!.map((o) => ({ o, s: Math.max(...heard.map((h) => similarity(o.th, h))) })).sort((a, b) => b.s - a.s)
      const best = scored[0]
      if (best.s < 0.45) return setFeedback(`Nicht verstanden („${heard[0]}“). Versuch es nochmal oder tippe eine Antwort.`)
      const a = analyze(best.o.th, heard)
      if (best.o.correct) setFeedback(null)
      answer(best.o, a.score)
    } catch (e: any) {
      setRec(false)
      setFeedback(e.message)
    }
  }

  const meTurns = d.turns.map((t, i) => [t, i] as const).filter(([t]) => t.speaker === 'me')
  const okCount = meTurns.filter(([, i]) => results[i]?.ok).length
  const speechScores = Object.values(results).map((r) => r.speech).filter((x): x is number => x !== undefined)

  if (done)
    return (
      <>
        <Confetti />
        <TopBar title="Auswertung" onBack={onBack} />
        <div className="scroll" style={{ padding: '0 16px' }}>
          <div className="center" style={{ fontSize: 80 }}>{okCount === meTurns.length ? '🏆' : '💬'}</div>
          <h2 className="center" style={{ margin: 0 }}>{d.title}</h2>
          <div className="stat-grid" style={{ padding: 0, margin: '16px 0' }}>
            <div className="stat"><b>{okCount}/{meTurns.length}</b><small>auf Anhieb richtig</small></div>
            <div className="stat"><b>{speechScores.length ? Math.round((speechScores.reduce((a, b) => a + b, 0) / speechScores.length) * 100) + '%' : '–'}</b><small>Aussprache Ø</small></div>
            <div className="stat"><b>{d.turns.length}</b><small>Gesprächszüge</small></div>
          </div>
          <div className="section-title" style={{ margin: '10px 0' }}>Analyse</div>
          <div className="list">
            {meTurns.map(([t, i]) => {
              const r = results[i]
              return (
                <div key={i} className="card" style={{ borderLeft: `5px solid ${r?.ok ? 'var(--ok)' : 'var(--bad)'}` }}>
                  <div className="th" style={{ fontSize: 20, fontWeight: 600 }}>{t.th}</div>
                  <div className="muted" style={{ fontWeight: 800, fontSize: 13 }}>{t.rom} · {t.de}</div>
                  {r?.speech !== undefined && <div style={{ fontSize: 13, fontWeight: 800 }}>🗣️ Aussprache: {Math.round(r.speech * 100)}%</div>}
                  {r?.wrongPicks.map((w, j) => (
                    <div key={j} style={{ fontSize: 13, marginTop: 4 }}>
                      ❌ <span className="th">{w.th}</span> – {w.feedback}
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
          <div style={{ display: 'flex', gap: 10, margin: '16px 0' }}>
            <button className="btn ghost" onClick={() => (setStep(0), setShown([]), setResults({}), setDone(false))}>Nochmal</button>
            <button className="btn" onClick={onBack}>Fertig</button>
          </div>
        </div>
      </>
    )

  return (
    <>
      <TopBar title={<>{d.icon} {d.title}</>} onBack={onBack} />
      <div style={{ padding: '0 16px 6px' }}>
        <Progress value={step / d.turns.length} />
      </div>
      <div className="scroll">
        <div className="card" style={{ margin: '8px 16px', fontSize: 14, fontWeight: 700 }}>
          🎬 {d.scene}
        </div>
        <div className="chat">
          <AnimatePresence>
            {shown.map((i) => {
              const t = d.turns[i]
              const npc = t.speaker === 'npc'
              return (
                <motion.div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-end', flexDirection: npc ? 'row' : 'row-reverse' }} initial={{ opacity: 0, y: 16, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}>
                  <div style={{ fontSize: 30 }}>{npc ? d.npcEmoji : '🧑'}</div>
                  <button className={`bubble ${t.speaker}`} onClick={() => (speak(t.th), setReveal({ ...reveal, [i]: !reveal[i] }))} style={{ textAlign: 'left' }}>
                    <div className="th">{t.th}</div>
                    {p.settings.showRom && <small>{t.rom}</small>}
                    {(reveal[i] || !npc) && <small style={{ fontStyle: 'italic' }}>{t.de}</small>}
                  </button>
                </motion.div>
              )
            })}
          </AnimatePresence>
          {turn?.speaker === 'npc' && !shown.includes(step) && (
            <motion.div className="bubble npc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', gap: 4 }}>
              {[0, 1, 2].map((k) => (
                <motion.span key={k} style={{ width: 8, height: 8, borderRadius: 9, background: 'var(--muted)', display: 'inline-block' }} animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: k * 0.15 }} />
              ))}
            </motion.div>
          )}
          <div className="hint">Tippe auf eine Nachricht für die Übersetzung</div>
          <div ref={end} />
        </div>
      </div>
      {turn?.speaker === 'me' && !shown.includes(step) && (
        <motion.div className="ex-foot" style={{ background: 'var(--card)', borderRadius: '22px 22px 0 0', boxShadow: 'var(--shadow)' }} initial={{ y: 200 }} animate={{ y: 0 }}>
          <div style={{ fontWeight: 900, marginBottom: 8 }}>Deine Antwort: <span className="muted">„{turn.de}“?</span></div>
          {feedback && <div className="g-tip" style={{ fontSize: 14, marginBottom: 8, borderColor: 'var(--bad)' }}>{feedback}</div>}
          <div className="list">
            {opts.map((o) => (
              <motion.button key={o.th} className={`opt ${wrongNow === o.th ? 'wrong' : ''}`} animate={wrongNow === o.th ? { x: [0, -8, 8, 0] } : {}} onClick={() => answer(o)} style={{ alignItems: 'flex-start', textAlign: 'left' }}>
                <span className="th" style={{ fontSize: 19 }}>{o.th}</span>
                {p.settings.romInOptions && <span className="sub">{o.rom}</span>}
              </motion.button>
            ))}
          </div>
          {(canRecognize() || serverAvailable()) && (
            <button className="btn blue" style={{ marginTop: 12 }} onClick={speakAnswer}>
              {rec ? '🎙️ Ich höre zu …' : '🎤 Antwort sprechen'}
            </button>
          )}
        </motion.div>
      )}
    </>
  )
}
