import { animate, AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import type { Ex } from '../lib/session'
import { shuffle, sayText } from '../lib/session'
import { speak, sfx } from '../lib/audio'
import { getProgress } from '../lib/store'
import { Speaker, SpeakerPair } from '../components/ui'
import { checkGerman, checkThai, Solution, type ExProps } from './common'
import { syllables, toneOf } from '../lib/tones'
import { TONE_NAME } from '../lib/server'
import { ToneCurve } from './Tone'

type E<T extends Ex['t']> = Extract<Ex, { t: T }>

const clsName = { mid: 'Mittelklasse', high: 'Hohe Klasse', low: 'Tiefe Klasse' }
const clsColor = { mid: '#1fb6ff', high: '#ff4b5c', low: '#2bc46d' }

// ---------- Neues Wort / Zeichen ----------
export function Intro({ ex, onSubmit }: ExProps<E<'intro'>>) {
  const it = ex.item
  const rom = getProgress().settings.showRom
  const letter = it.kind === 'consonant' || it.kind === 'vowel' || it.kind === 'tone'
  return (
    <>
      <div className="ex">
        <div className="ex-title">{letter ? 'Neues Zeichen' : 'Neu für dich'} ✨</div>
        <motion.div className="card" initial={{ scale: 0.85, rotate: -3 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 200, damping: 14 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: 22 }}>
          {it.emoji && !letter && <div style={{ fontSize: 64 }}>{it.emoji}</div>}
          <div className="th" style={{ fontSize: letter ? 110 : it.th.length > 12 ? 30 : 52, fontWeight: 600, lineHeight: 1.25, textAlign: 'center' }}>
            {it.th}
          </div>
          {rom && <div className="muted" style={{ fontWeight: 800, fontSize: 18 }}>{it.kind === 'consonant' ? it.nameRom : it.rom}</div>}
          {it.kind === 'consonant' ? (
            <>
              <div style={{ fontSize: 20, fontWeight: 900 }}>
                <span className="th">{it.name}</span> · {it.nameDe} {it.emoji}
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
                <span className="pill" style={{ background: clsColor[it.cls!], color: '#fff' }}>{clsName[it.cls!]}</span>
                <span className="pill">Anlaut: {it.initial}</span>
                <span className="pill">Auslaut: {it.final}</span>
              </div>
            </>
          ) : (
            <div style={{ fontSize: 22, fontWeight: 900, textAlign: 'center' }}>{it.de}</div>
          )}
          {it.tokens && it.tokens.length > 1 && (
            <div className="gloss" style={{ justifyContent: 'center' }}>
              {it.tokens.map((t, i) => (
                <button key={i} className="gw" onClick={() => speak(t)}>
                  <span className="th">{t}</span>
                </button>
              ))}
            </div>
          )}
          {!letter && rom && syllables(it.rom).length <= 6 && (
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
              {syllables(it.rom).map((x, i) => (
                <span key={i} className="pill" style={{ boxShadow: 'none', border: '2px solid var(--line)', gap: 4 }}>
                  <ToneCurve t={toneOf(x)} w={22} h={14} /> {x} <span className="muted" style={{ fontSize: 11 }}>{TONE_NAME[toneOf(x)]}</span>
                </span>
              ))}
            </div>
          )}
          {it.rule && <div className="g-tip" style={{ fontSize: 14, width: '100%', borderColor: 'var(--blue)' }}>📖 {it.rule}</div>}
          {it.note && <div className="g-tip" style={{ fontSize: 14, width: '100%' }}>💡 {it.note}</div>}
          <SpeakerPair text={sayText(it)} />
        </motion.div>
      </div>
      <div className="ex-foot">
        <button className="btn" onClick={() => onSubmit(null)}>
          Verstanden
        </button>
      </div>
    </>
  )
}

// ---------- Swipe-Karte: stimmt die Aussage? (rechts = stimmt, links = stimmt nicht) ----------
export function Flash({ ex, onSubmit, locked }: ExProps<E<'flash'>>) {
  const it = ex.item
  const rom = getProgress().settings.showRom
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-220, 220], [-16, 16])
  const yes = useTransform(x, [20, 110], [0, 1])
  const no = useTransform(x, [-110, -20], [1, 0])
  const tint = useTransform(x, [-150, 0, 150], ['rgba(255,75,92,0.18)', 'rgba(0,0,0,0)', 'rgba(43,196,109,0.18)'])
  const [gone, setGone] = useState(false)
  const letter = it.kind === 'consonant' || it.kind === 'vowel' || it.kind === 'tone'

  const decide = (says: boolean) => {
    if (locked || gone) return
    setGone(true)
    animate(x, says ? 520 : -520, { duration: 0.28, ease: 'easeIn' })
    const ok = says === ex.truth
    onSubmit(
      ok,
      ok ? undefined : (
        <Solution item={it} extra={<div style={{ fontSize: 13 }}>Die Aussage „{ex.claim}“ war {ex.truth ? 'richtig' : 'falsch'}.</div>} />
      ),
    )
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => (e.key === 'ArrowRight' ? decide(true) : e.key === 'ArrowLeft' ? decide(false) : null)
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  })

  return (
    <>
      <div className="ex">
        <div className="ex-title">Stimmt das?</div>
        <div className="hint">👈 stimmt nicht · wischen · stimmt 👉</div>
        <div className="swipe-stack">
          <div className="swipe-card under" />
          <motion.div
            className="swipe-card"
            style={{ x, rotate }}
            drag={locked || gone ? false : 'x'}
            dragSnapToOrigin
            dragElastic={0.9}
            onDragEnd={(_, info) => {
              if (info.offset.x > 110 || info.velocity.x > 600) decide(true)
              else if (info.offset.x < -110 || info.velocity.x < -600) decide(false)
            }}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            whileTap={{ cursor: 'grabbing' }}
          >
            <motion.div style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', background: tint, pointerEvents: 'none' }} />
            <motion.div className="swipe-stamp yes" style={{ opacity: yes }}>STIMMT</motion.div>
            <motion.div className="swipe-stamp no" style={{ opacity: no }}>FALSCH</motion.div>
            <Speaker text={sayText(it)} auto size="small" />
            <div className="th" style={{ fontSize: letter ? 96 : it.th.length > 10 ? 34 : 60, fontWeight: 600, textAlign: 'center', lineHeight: 1.3 }}>{it.th}</div>
            {rom && !letter && <div className="muted" style={{ fontWeight: 800 }}>{it.rom}</div>}
            <div className="swipe-eq">=</div>
            {ex.claimEmoji && <div style={{ fontSize: 48 }}>{ex.claimEmoji}</div>}
            <div style={{ fontSize: 24, fontWeight: 900, textAlign: 'center' }}>{ex.claim}</div>
          </motion.div>
        </div>
      </div>
      <div className="ex-foot">
        <div className="grid2">
          <button className="btn bad" disabled={locked || gone} onClick={() => decide(false)}>✕ Falsch</button>
          <button className="btn ok" disabled={locked || gone} onClick={() => decide(true)}>✓ Stimmt</button>
        </div>
      </div>
    </>
  )
}

// ---------- Multiple Choice (alle Varianten) ----------
export function Choice({ ex, onSubmit, locked }: ExProps<E<'choice'>>) {
  const [picked, setPicked] = useState<string | null>(null)
  const p = ex.prompt
  const choose = (id: string, sp?: string) => {
    if (locked || picked) return
    if (sp) speak(sp)
    setPicked(id)
    const ok = id === ex.answer
    onSubmit(ok, ok ? undefined : <Solution item={ex.item} />)
  }
  const audioOnly = p.audio && !p.th && !p.text && !p.emoji
  return (
    <div className="ex">
      <div className="ex-title">{p.title}</div>
      <div className="prompt">
        {p.emoji && (
          <motion.div className="emoji" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 220, damping: 12 }}>
            {p.emoji}
          </motion.div>
        )}
        {audioOnly && p.audio && <SpeakerPair text={p.audio} />}
        {p.th && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {p.audio && <Speaker text={p.audio} auto />}
            <div className={p.bigTh && p.th.length < 6 ? 'big-th' : 'mid-th'}>{p.th}</div>
          </div>
        )}
        {p.sub && <div className="rom">{p.sub}</div>}
        {p.text && <div className="de">{p.text}</div>}
      </div>
      <div className={ex.grid ? 'grid2' : 'list'}>
        {ex.options.map((o, i) => {
          const state = picked ? (o.id === ex.answer ? 'right' : o.id === picked ? 'wrong' : 'dim') : ''
          return (
            <motion.button
              key={o.id}
              className={`opt ${state}`}
              initial={{ opacity: 0, y: 14 }}
              animate={state === 'wrong' ? { x: [0, -10, 10, -6, 6, 0], opacity: 1, y: 0 } : state === 'right' ? { scale: [1, 1.06, 1], opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ delay: picked ? 0 : i * 0.05 }}
              onClick={() => choose(o.id, o.speak)}
            >
              {o.emoji && <span className="emoji">{o.emoji}</span>}
              {o.th && <span className="th">{o.th}</span>}
              {o.text && <span>{o.text}</span>}
              {o.sub && <span className="sub">{o.sub}</span>}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

// ---------- Zuordnen (zwei Spalten) ----------
export function Match({ ex, onSubmit }: ExProps<E<'match'>>) {
  const left = useMemo(() => shuffle(ex.pairs), [ex.key])
  const right = useMemo(() => shuffle(ex.pairs), [ex.key])
  const [selL, setSelL] = useState<string | null>(null)
  const [selR, setSelR] = useState<string | null>(null)
  const [done, setDone] = useState<string[]>([])
  const [wrong, setWrong] = useState<string[]>([])
  const [bad, setBad] = useState<Record<string, boolean>>({})
  const letter = ex.pairs[0].kind === 'consonant' || ex.pairs[0].kind === 'vowel'
  const label = (i: (typeof ex.pairs)[0]) => (i.kind === 'consonant' ? `${i.initial} · ${i.nameDe}` : i.kind === 'vowel' ? i.rom : i.de)

  useEffect(() => {
    if (selL && selR) {
      if (selL === selR) {
        sfx.correct()
        const nd = [...done, selL]
        setDone(nd)
        if (nd.length === ex.pairs.length) {
          const per: Record<string, boolean> = {}
          ex.pairs.forEach((p) => (per[p.id] = !bad[p.id]))
          setTimeout(() => onSubmit(!Object.keys(bad).length, undefined, per), 300)
        }
      } else {
        sfx.wrong()
        setWrong([selL, selR])
        setBad((b) => ({ ...b, [selL]: true, [selR]: true }))
        setTimeout(() => setWrong([]), 450)
      }
      setSelL(null)
      setSelR(null)
    }
  }, [selL, selR])

  const cls = (id: string, sel: string | null) =>
    `opt ${done.includes(id) ? 'right dim' : wrong.includes(id) ? 'wrong' : sel === id ? 'sel' : ''}`

  return (
    <div className="ex">
      <div className="ex-title">Finde die Paare</div>
      {/* Ein gemeinsames Raster: linke und rechte Kachel einer Zeile sind immer gleich hoch */}
      <div className="match">
        {left.map((p, i) => {
          const r = right[i]
          return [
            <motion.button
              key={p.id}
              className={cls(p.id, selL)}
              animate={wrong.includes(p.id) && selL === null ? { x: [0, -8, 8, 0] } : {}}
              onClick={() => {
                if (done.includes(p.id)) return
                speak(p.say || p.th)
                setSelL(p.id)
              }}
            >
              <span className="th" style={{ fontSize: letter ? 34 : p.th.length > 8 ? 18 : 24 }}>{p.th}</span>
            </motion.button>,
            <motion.button key={'r' + r.id} className={cls(r.id, selR)} onClick={() => !done.includes(r.id) && (sfx.tap(), setSelR(r.id))}>
              <span style={{ fontSize: 15 }}>{label(r)}</span>
            </motion.button>,
          ]
        })}
      </div>
    </div>
  )
}

// ---------- Satzbau (Übersetzen / Hören) ----------
export function Build({ ex, onSubmit, locked }: ExProps<E<'build'>>) {
  const toks = ex.item.tokens!
  const bank = useMemo(() => shuffle([...toks, ...ex.extra].map((t, i) => ({ t, i }))), [ex.key])
  const [line, setLine] = useState<number[]>([])
  const rom = getProgress().settings.showRom
  const check = () => {
    const ans = line.map((i) => bank.find((b) => b.i === i)!.t).join('')
    const ok = ans === ex.item.th
    if (ok) speak(sayText(ex.item))
    onSubmit(ok, ok ? <div className="muted">{rom && ex.item.rom}</div> : <Solution item={ex.item} />)
  }
  return (
    <>
      <div className="ex">
        <div className="ex-title">{ex.mode === 'listen' ? 'Hör zu und baue den Satz' : 'Übersetze diesen Satz'}</div>
        {ex.mode === 'listen' ? (
          <SpeakerPair text={sayText(ex.item)} />
        ) : (
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ fontSize: 46 }}>🧑‍🏫</div>
            <div className="card" style={{ fontWeight: 800, fontSize: 18, flex: 1 }}>{ex.item.de}</div>
          </div>
        )}
        <div className="answer-line">
          <AnimatePresence>
            {line.map((i) => {
              const b = bank.find((x) => x.i === i)!
              return (
                <motion.button layoutId={'t' + ex.key + i} key={i} className="tok" onClick={() => !locked && (sfx.tap(), setLine(line.filter((x) => x !== i)))}>
                  {b.t}
                </motion.button>
              )
            })}
          </AnimatePresence>
        </div>
        <div className="bank">
          {bank.map((b) =>
            line.includes(b.i) ? (
              <span key={b.i} className="tok used">{b.t}</span>
            ) : (
              <motion.button
                layoutId={'t' + ex.key + b.i}
                key={b.i}
                className="tok"
                onClick={() => {
                  if (locked) return
                  speak(b.t)
                  setLine([...line, b.i])
                }}
              >
                {b.t}
              </motion.button>
            ),
          )}
        </div>
      </div>
      <div className="ex-foot">
        <button className="btn" disabled={!line.length || locked} onClick={check}>Prüfen</button>
      </div>
    </>
  )
}

// ---------- Lückentext ----------
export function Cloze({ ex, onSubmit, locked }: ExProps<E<'cloze'>>) {
  const [picked, setPicked] = useState<string | null>(null)
  const toks = ex.item.tokens!
  const answer = toks[ex.gap]
  return (
    <div className="ex">
      <div className="ex-title">Fülle die Lücke</div>
      <div className="card">
        <div className="th" style={{ fontSize: 26, fontWeight: 600, display: 'flex', flexWrap: 'wrap', gap: 4, alignItems: 'center' }}>
          {toks.map((t, i) =>
            i === ex.gap ? (
              <motion.span
                key={i}
                style={{ minWidth: 60, borderBottom: '3px solid var(--blue)', textAlign: 'center', color: picked ? (picked === answer ? 'var(--ok)' : 'var(--bad)') : 'transparent' }}
                animate={picked ? { scale: [1, 1.15, 1] } : {}}
              >
                {picked || '＿'}
              </motion.span>
            ) : (
              <span key={i}>{t}</span>
            ),
          )}
        </div>
        <div className="muted" style={{ fontWeight: 800, marginTop: 8 }}>{ex.item.de}</div>
      </div>
      <div className="grid2">
        {ex.options.map((o) => (
          <button
            key={o}
            className={`opt ${picked ? (o === answer ? 'right' : o === picked ? 'wrong' : 'dim') : ''}`}
            onClick={() => {
              if (locked || picked) return
              setPicked(o)
              const ok = o === answer
              if (ok) speak(sayText(ex.item))
              onSubmit(ok, ok ? undefined : <Solution item={ex.item} />)
            }}
          >
            <span className="th">{o}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

// ---------- Freitext ----------
export function Type({ ex, onSubmit, locked }: ExProps<E<'type'>>) {
  const [v, setV] = useState('')
  const it = ex.item
  const rom = getProgress().settings.showRom
  const submit = () => {
    if (!v.trim() || locked) return
    const ok = ex.mode === 'de' ? checkGerman(v, it) : checkThai(v, it)
    if (ok) speak(sayText(it))
    onSubmit(ok, <Solution item={it} />)
  }
  return (
    <>
      <div className="ex">
        <div className="ex-title">{ex.mode === 'de' ? 'Schreibe auf Deutsch' : 'Schreibe auf Thai'}</div>
        <div className="prompt">
          {ex.mode === 'de' ? (
            <>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <Speaker text={sayText(it)} auto />
                <div className={it.th.length < 8 ? 'big-th' : 'mid-th'} style={{ fontSize: it.th.length < 8 ? 52 : undefined }}>{it.th}</div>
              </div>
              {rom && <div className="rom">{it.rom}</div>}
            </>
          ) : (
            <>
              {it.emoji && <div style={{ fontSize: 60 }}>{it.emoji}</div>}
              <div className="de">{it.de}</div>
              <div className="hint">Thai-Tastatur oder Umschrift (ohne Tonzeichen) – beides zählt.</div>
            </>
          )}
        </div>
        <textarea
          className="type-input"
          rows={2}
          value={v}
          onChange={(e) => setV(e.target.value)}
          placeholder={ex.mode === 'de' ? 'Übersetzung…' : 'z.B. ' + (it.kind === 'sentence' ? 'สวัสดี / sawatdee' : 'ภาษาไทย / phasa thai')}
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), submit())}
          readOnly={locked}
        />
      </div>
      <div className="ex-foot">
        <button className="btn" disabled={!v.trim() || locked} onClick={submit}>Prüfen</button>
      </div>
    </>
  )
}
