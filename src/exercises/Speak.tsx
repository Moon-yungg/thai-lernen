import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import type { Ex } from '../lib/session'
import { sayText } from '../lib/session'
import { analyze, canRecognize, listen, type SpeechResult } from '../lib/speech'
import { analyzeRemote, serverAvailable, type Analysis } from '../lib/server'
import { record } from '../lib/recorder'
import { getProgress } from '../lib/store'
import { SpeakerPair } from '../components/ui'
import { Issues, PronReport } from '../components/PronReport'
import { diagnose } from '../lib/diagnose'
import type { ExProps } from './common'

type E = Extract<Ex, { t: 'speak' }>

const verdictText = {
  perfect: ['Perfekt ausgesprochen! 🎉', 'var(--ok)'],
  good: ['Gut verständlich! 👍', 'var(--ok)'],
  close: ['Fast – nochmal genau hinhören 👂', 'var(--gold)'],
  wrong: ['Das wurde nicht erkannt 🤔', 'var(--bad)'],
} as const

// Modi: 'server' = lokale Analyse (Laute + Töne), 'browser' = Spracherkennung des Browsers, 'self' = Aufnahme + Selbstbewertung
const mode = () => (serverAvailable() ? 'server' : canRecognize() ? 'browser' : 'self')

export function Speak({ ex, onSubmit, locked }: ExProps<E>) {
  const it = ex.item
  const target = sayText(it)
  const [rec, setRec] = useState(false)
  const [busy, setBusy] = useState(false)
  const [level, setLevel] = useState(0)
  const [res, setRes] = useState<SpeechResult | null>(null)
  const [ana, setAna] = useState<Analysis | null>(null)
  const [err, setErr] = useState('')
  const [tries, setTries] = useState(0)
  const [clip, setClip] = useState<string | null>(null)
  const stopRef = useRef<() => void>(() => {})
  const m = mode()

  const start = async () => {
    setErr('')
    setRes(null)
    setAna(null)
    if (m === 'browser') {
      setRec(true)
      const l = listen()
      stopRef.current = l.stop
      try {
        const heard = await l.promise
        setTries((t) => t + 1)
        if (!heard.length) setErr('Nichts gehört – tippe aufs Mikrofon und sprich deutlich.')
        else setRes(analyze(target, heard))
      } catch (e: any) {
        setErr(e.message)
      }
      setRec(false)
      return
    }
    // Aufnahme (Server-Analyse oder Selbstbewertung)
    setRec(true)
    const r = record({ onLevel: setLevel })
    stopRef.current = r.stop
    try {
      const recording = await r.promise
      setRec(false)
      setLevel(0)
      setClip(recording.url)
      setTries((t) => t + 1)
      if (m === 'server') {
        setBusy(true)
        setAna(await analyzeRemote(recording.wav, target))
      }
    } catch (e: any) {
      setErr(e.message)
    }
    setRec(false)
    setBusy(false)
  }

  const toggle = () => {
    if (locked || busy) return
    rec ? stopRef.current() : start()
  }

  const accept = () => {
    const ok = ana ? ana.score >= 0.6 : res ? res.score >= 0.6 || res.toneIssue : false
    onSubmit(ok, ok ? undefined : <div><span className="th">{it.th}</span> · {it.rom}</div>)
  }

  const rom = getProgress().settings.showRom
  const hasResult = !!(res || ana)
  return (
    <>
      <div className="ex">
        <div className="ex-title">Sprich nach</div>
        <div className="card" style={{ textAlign: 'center' }}>
          <div className="th" style={{ fontSize: it.th.length > 10 ? 30 : 50, fontWeight: 600 }}>{it.kind === 'consonant' ? it.name : it.th}</div>
          {rom && <div className="muted" style={{ fontWeight: 800 }}>{it.kind === 'consonant' ? it.nameRom : it.rom}</div>}
          <div style={{ fontWeight: 800 }}>{it.kind === 'consonant' ? it.nameDe : it.de}</div>
        </div>
        <SpeakerPair text={target} />
        <div style={{ position: 'relative', marginTop: 8 }}>
          <motion.button className={`mic ${rec ? 'rec' : ''}`} onClick={toggle} whileTap={{ scale: 0.92 }} animate={rec ? { scale: 1 + level * 0.15 } : { scale: 1 }}>
            {rec && <motion.span className="mic-wave" animate={{ scale: [1, 1.5], opacity: [0.8, 0] }} transition={{ repeat: Infinity, duration: 1.1 }} />}
            {busy ? '⏳' : rec ? '⏹' : '🎤'}
          </motion.button>
        </div>
        <div className="hint">
          {busy ? 'Analysiere Laute und Töne …' : rec ? 'Ich höre zu … (stoppt automatisch)' : m === 'server' ? 'Tippen und sprechen – Analyse auf deinem PC 🖥️' : m === 'browser' ? 'Tippen und auf Thai sprechen' : 'Aufnehmen, anhören und mit dem Vorbild vergleichen'}
        </div>
        {err && <div className="hint" style={{ color: 'var(--bad)' }}>{err}</div>}
        {ana && <PronReport a={ana} />}
        {res && (
          <motion.div className="card" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <div style={{ fontWeight: 900, color: verdictText[res.verdict][1], fontSize: 18 }}>{verdictText[res.verdict][0]}</div>
            <div className="bar" style={{ margin: '8px 0' }}>
              <motion.div initial={{ width: 0 }} animate={{ width: `${Math.round(res.score * 100)}%` }} style={{ background: verdictText[res.verdict][1] }} />
            </div>
            <div style={{ fontSize: 14 }}>
              Erkannt: <span className="th" style={{ fontSize: 20, fontWeight: 600 }}>{res.best || '–'}</span> <span className="muted">({Math.round(res.score * 100)}%)</span>
            </div>
            {res.toneIssue && <div className="g-tip" style={{ marginTop: 8, fontSize: 14 }}>🎵 Die Laute stimmen, aber der <b>Ton</b> war vermutlich anders. Hör dir das Vorbild nochmal langsam an (🐢).</div>}
          </motion.div>
        )}
        {res && res.verdict !== 'perfect' && res.best && <Issues issues={diagnose(target, res.best, it.tokens ?? target.split(/\s+/))} />}
        {clip && !rec && (
          <div className="card center" style={{ padding: 10 }}>
            <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 6 }}>Deine Aufnahme</div>
            <audio src={clip} controls style={{ width: '100%', height: 36 }} />
          </div>
        )}
      </div>
      <div className="ex-foot" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {hasResult ? (
          <div className="grid2">
            <button className="btn ghost" disabled={locked || busy} onClick={start}>Nochmal</button>
            <button className="btn" disabled={locked} onClick={accept}>Weiter</button>
          </div>
        ) : clip && m === 'self' ? (
          <div className="grid2">
            <button className="btn bad" disabled={locked} onClick={() => onSubmit(false)}>Klang anders</button>
            <button className="btn ok" disabled={locked} onClick={() => onSubmit(true)}>Klang gleich</button>
          </div>
        ) : (
          <button className="btn ghost" disabled={locked || busy} onClick={() => onSubmit(null)}>
            {tries ? 'Überspringen' : 'Kann gerade nicht sprechen'}
          </button>
        )}
      </div>
    </>
  )
}
