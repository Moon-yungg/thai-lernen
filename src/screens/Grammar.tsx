import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { grammar, grammarById, items, type GlossWord, type GrammarSection } from '../data'
import { speak, sfx } from '../lib/audio'
import { shuffle } from '../lib/session'
import { update, useProgress } from '../lib/store'
import { Md, Speaker, TopBar } from '../components/ui'

const roleName: Record<string, string> = {
  S: 'Subjekt', V: 'Verb', O: 'Objekt', ADJ: 'Adjektiv', ADV: 'Adverb', Q: 'Frage', NEG: 'Verneinung', PART: 'Partikel',
  TIME: 'Zeit', CLF: 'Klassifikator', NUM: 'Zahl', PREP: 'Präposition', N: 'Nomen', ASP: 'Aspekt',
}

export function GrammarList({ onOpen }: { onOpen: (id: string) => void }) {
  const p = useProgress()
  return (
    <>
      <div className="topbar">
        <h1>Grammatik</h1>
      </div>
      <div className="scroll">
        <p className="muted" style={{ padding: '0 16px', fontWeight: 700, marginTop: 0 }}>
          Thai hat keine Konjugation, keine Artikel und keine Fälle – dafür Töne, Partikel und eine feste Wortstellung. Hier lernst du das Wichtigste interaktiv.
        </p>
        <div className="tiles">
          {grammar.map((g, i) => (
            <motion.button key={g.id} className="tile" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} onClick={() => onOpen(g.id)}>
              <span className="ti" style={{ background: 'var(--bg2)' }}>{g.icon}</span>
              <span>
                <b>{g.title}</b>
                <small>{g.summary}</small>
              </span>
              {p.grammar[g.id] && <span className="cnt" style={{ color: 'var(--ok)' }}>✓</span>}
            </motion.button>
          ))}
        </div>
      </div>
    </>
  )
}

function Gloss({ words }: { words: GlossWord[] }) {
  const p = useProgress()
  return (
    <div className="gloss">
      {words.map((w, i) => (
        <motion.button key={i} className={`gw ${w.role ? 'role-' + w.role : ''}`} whileTap={{ scale: 0.92 }} onClick={() => speak(w.th)} title={w.role ? roleName[w.role] : ''}>
          <span className="th">{w.th}</span>
          {p.settings.showRom && <span className="r">{w.rom}</span>}
          <span className="d">{w.de}</span>
        </motion.button>
      ))}
    </div>
  )
}

function Example({ s }: { s: Extract<GrammarSection, { type: 'example' }> }) {
  const full = s.words.map((w) => w.th).join('')
  return (
    <div className="card">
      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <Speaker text={full} size="small" />
        <div style={{ flex: 1 }}>
          <Gloss words={s.words} />
          <div style={{ fontWeight: 800, marginTop: 8 }}>„{s.de}“</div>
          {s.note && <div className="muted" style={{ fontSize: 14, fontWeight: 700 }}>{s.note}</div>}
        </div>
      </div>
    </div>
  )
}

function Quiz({ s }: { s: Extract<GrammarSection, { type: 'quiz' }> }) {
  const [pick, setPick] = useState<number | null>(null)
  return (
    <div className="card">
      <div style={{ fontWeight: 900, marginBottom: 10 }}>❓ <Md text={s.question} /></div>
      <div className="list">
        {s.options.map((o, i) => (
          <button
            key={i}
            className={`opt ${pick !== null ? (i === s.answer ? 'right' : i === pick ? 'wrong' : 'dim') : ''}`}
            onClick={() => {
              if (pick !== null) return
              setPick(i)
              i === s.answer ? sfx.correct() : sfx.wrong()
            }}
          >
            <span className="th" style={{ fontSize: 18 }}>{o}</span>
          </button>
        ))}
      </div>
      {pick !== null && (
        <motion.div className="g-tip" style={{ marginTop: 10 }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Md text={s.explain} />
        </motion.div>
      )}
    </div>
  )
}

function BuildSec({ s }: { s: Extract<GrammarSection, { type: 'build' }> }) {
  const bank = useMemo(() => {
    let b = shuffle(s.words.map((w, i) => ({ ...w, i })))
    if (b.every((w, i) => w.i === i) && b.length > 1) b = [...b.slice(1), b[0]]
    return b
  }, [s])
  const [line, setLine] = useState<number[]>([])
  const [res, setRes] = useState<boolean | null>(null)
  const check = () => {
    const ok = line.map((i) => s.words[i].th).join('') === s.words.map((w) => w.th).join('')
    setRes(ok)
    ok ? (sfx.correct(), speak(s.words.map((w) => w.th).join(''))) : sfx.wrong()
  }
  return (
    <div className="card">
      <div style={{ fontWeight: 900 }}>🧩 {s.prompt}</div>
      <div className="muted" style={{ fontWeight: 800, margin: '4px 0 8px' }}>„{s.de}“</div>
      <div className="answer-line" style={{ minHeight: 64, background: 'none' }}>
        {line.map((i) => (
          <motion.button layoutId={'g' + i + s.de} key={i} className="tok" onClick={() => (setRes(null), setLine(line.filter((x) => x !== i)))}>
            {s.words[i].th}
          </motion.button>
        ))}
      </div>
      <div className="bank">
        {bank.map((w) =>
          line.includes(w.i) ? (
            <span key={w.i} className="tok used">{w.th}</span>
          ) : (
            <motion.button layoutId={'g' + w.i + s.de} key={w.i} className="tok" onClick={() => (speak(w.th), setRes(null), setLine([...line, w.i]))}>
              {w.th}
              <div style={{ fontSize: 11, fontFamily: 'Nunito', color: 'var(--muted)' }}>{w.de}</div>
            </motion.button>
          ),
        )}
      </div>
      {res === null ? (
        <button className="btn small blue" style={{ width: '100%' }} disabled={line.length !== s.words.length} onClick={check}>Prüfen</button>
      ) : (
        <motion.div className={`g-tip`} style={{ borderColor: res ? 'var(--ok)' : 'var(--bad)' }} initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
          {res ? '✅ Richtig!' : '❌ Noch nicht – richtig wäre:'}
          {!res && <Gloss words={s.words} />}
        </motion.div>
      )}
    </div>
  )
}

const CLASS_INFO = {
  mid: { name: 'Mittelklasse', color: '#1fb6ff', live: 'mittel', deadShort: 'tief', deadLong: 'tief', ek: 'tief', tho: 'fallend', tri: 'hoch', jat: 'steigend' },
  high: { name: 'Hohe Klasse', color: '#ff4b5c', live: 'steigend', deadShort: 'tief', deadLong: 'tief', ek: 'tief', tho: 'fallend', tri: '–', jat: '–' },
  low: { name: 'Tiefe Klasse', color: '#2bc46d', live: 'mittel', deadShort: 'hoch', deadLong: 'fallend', ek: 'fallend', tho: 'hoch', tri: '–', jat: '–' },
} as const

const TONE_SHAPES: Record<string, string> = { mittel: 'M 0 20 L 60 20', tief: 'M 0 26 L 60 32', fallend: 'M 0 14 Q 25 4 60 36', hoch: 'M 0 14 Q 35 14 60 4', steigend: 'M 0 26 Q 30 40 60 4' }
const TONE_EX: Record<string, [string, string]> = { mittel: ['มา', 'maa – kommen'], tief: ['ไก่', 'gài – Huhn'], fallend: ['ไม่', 'mâi – nicht'], hoch: ['ม้า', 'máa – Pferd'], steigend: ['หมา', 'mǎa – Hund'] }

function ToneCalc() {
  const [cls, setCls] = useState<'mid' | 'high' | 'low'>('mid')
  const [mark, setMark] = useState<'none' | 'ek' | 'tho' | 'tri' | 'jat'>('none')
  const [syl, setSyl] = useState<'live' | 'deadShort' | 'deadLong'>('live')
  const info = CLASS_INFO[cls]
  const tone = mark === 'none' ? info[syl] : info[mark]
  return (
    <div className="card">
      <div style={{ fontWeight: 900, marginBottom: 8 }}>🎛️ Ton-Rechner</div>
      <div className="muted" style={{ fontSize: 13, fontWeight: 800 }}>1. Konsonantenklasse</div>
      <div style={{ display: 'flex', gap: 6, margin: '6px 0 10px' }}>
        {(['mid', 'high', 'low'] as const).map((c) => (
          <button key={c} className={`opt ${cls === c ? 'sel' : ''}`} style={{ flex: 1, fontSize: 13, minHeight: 44, padding: 6 }} onClick={() => setCls(c)}>{CLASS_INFO[c].name}</button>
        ))}
      </div>
      <div className="muted" style={{ fontSize: 13, fontWeight: 800 }}>2. Tonzeichen</div>
      <div style={{ display: 'flex', gap: 6, margin: '6px 0 10px' }}>
        {([['none', '–'], ['ek', '่'], ['tho', '้'], ['tri', '๊'], ['jat', '๋']] as const).map(([m, s]) => (
          <button key={m} className={`opt ${mark === m ? 'sel' : ''}`} style={{ flex: 1, minHeight: 44, padding: 6 }} onClick={() => setMark(m)}>
            <span className="th" style={{ fontSize: 22 }}>{m === 'none' ? 'ohne' : 'อ' + s}</span>
          </button>
        ))}
      </div>
      {mark === 'none' && (
        <>
          <div className="muted" style={{ fontSize: 13, fontWeight: 800 }}>3. Silbe</div>
          <div style={{ display: 'flex', gap: 6, margin: '6px 0 10px' }}>
            {([['live', 'lebend', 'langer Vokal oder m/n/ng/y/w am Ende'], ['deadShort', 'tot, kurz', 'kurzer Vokal oder k/p/t am Ende'], ['deadLong', 'tot, lang', 'langer Vokal + k/p/t']] as const).map(([v, l, d]) => (
              <button key={v} className={`opt ${syl === v ? 'sel' : ''}`} style={{ flex: 1, fontSize: 13, minHeight: 54, padding: 6 }} onClick={() => setSyl(v)}>
                {l}
                <span className="sub" style={{ fontSize: 9 }}>{d}</span>
              </button>
            ))}
          </div>
        </>
      )}
      <motion.div key={tone} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ display: 'flex', alignItems: 'center', gap: 14, background: info.color + '22', borderRadius: 14, padding: 12 }}>
        {tone !== '–' ? (
          <>
            <svg width="70" height="44" viewBox="-5 0 70 44">
              <path d={TONE_SHAPES[tone]} stroke={info.color} strokeWidth="5" fill="none" strokeLinecap="round" />
            </svg>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 900, fontSize: 20 }}>Ton: {tone}</div>
              <div style={{ fontSize: 14 }}>z.B. <span className="th" style={{ fontSize: 20 }}>{TONE_EX[tone][0]}</span> {TONE_EX[tone][1]}</div>
            </div>
            <Speaker text={TONE_EX[tone][0]} size="small" />
          </>
        ) : (
          <div style={{ fontWeight: 800 }}>Dieses Tonzeichen kommt nur mit Mittelklasse-Konsonanten vor.</div>
        )}
      </motion.div>
    </div>
  )
}

function ClassesWidget() {
  return (
    <div className="card">
      <div style={{ fontWeight: 900, marginBottom: 8 }}>🔤 Die drei Konsonantenklassen (antippen zum Hören)</div>
      {(['mid', 'high', 'low'] as const).map((c) => (
        <div key={c} style={{ marginBottom: 10 }}>
          <div style={{ fontWeight: 900, color: CLASS_INFO[c].color, fontSize: 14 }}>{CLASS_INFO[c].name}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {items
              .filter((i) => i.cls === c)
              .map((i) => (
                <button key={i.id} className="th" onClick={() => speak(i.say || i.th)} style={{ fontSize: 26, width: 40, height: 44, borderRadius: 10, background: CLASS_INFO[c].color + '22', fontWeight: 600 }}>
                  {i.th}
                </button>
              ))}
          </div>
        </div>
      ))}
      <div className="g-tip" style={{ fontSize: 14 }}>
        Merksatz Mittelklasse (9): <span className="th">ไก่จิกเด็กตายบนปากโอ่ง</span> – „Das Huhn pickte das Kind tot am Rand des Kruges.“
      </div>
    </div>
  )
}

export function GrammarTopic({ id, onBack }: { id: string; onBack: () => void }) {
  const g = grammarById.get(id)!
  return (
    <>
      <TopBar title={<>{g.icon} {g.title}</>} onBack={onBack} />
      <div className="scroll" style={{ padding: '0 16px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {g.sections.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35 }}>
            {s.type === 'text' && (
              <div className="g-text">
                <Md text={s.md} />
              </div>
            )}
            {s.type === 'tip' && (
              <div className="g-tip">
                <Md text={'💡 ' + s.md} />
              </div>
            )}
            {s.type === 'example' && <Example s={s} />}
            {s.type === 'compare' && (
              <div className="card">
                <div style={{ fontWeight: 900, marginBottom: 8 }}>🔀 {s.title}</div>
                <div className="muted" style={{ fontSize: 12, fontWeight: 900 }}>DEUTSCH</div>
                <div className="gloss" style={{ margin: '4px 0 10px' }}>
                  {s.de.map((w, j) => (
                    <span key={j} className="gw" style={{ fontWeight: 800 }}>{w}</span>
                  ))}
                </div>
                <div className="muted" style={{ fontSize: 12, fontWeight: 900 }}>THAI</div>
                <Gloss words={s.th} />
              </div>
            )}
            {s.type === 'quiz' && <Quiz s={s} />}
            {s.type === 'build' && <BuildSec s={s} />}
            {s.type === 'table' && (
              <div className="card" style={{ overflowX: 'auto' }}>
                <table className="g">
                  <thead>
                    <tr>{s.head.map((h, j) => <th key={j}>{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {s.rows.map((r, j) => (
                      <tr key={j}>{r.map((c, k) => <td key={k}><Md text={c} /></td>)}</tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {s.type === 'widget' && (s.widget === 'tone-calculator' ? <ToneCalc /> : <ClassesWidget />)}
          </motion.div>
        ))}
        <div className="g-tip" style={{ fontSize: 13 }}>
          Legende: {Object.entries(roleName).slice(0, 8).map(([k, v]) => (
            <span key={k} className={`gw role-${k}`} style={{ display: 'inline-block', margin: 2, padding: '2px 6px', fontSize: 11 }}>{v}</span>
          ))}
        </div>
        <button className="btn ok" onClick={() => (update((p) => void (p.grammar[id] = true)), sfx.complete(), onBack())}>Verstanden ✓</button>
      </div>
    </>
  )
}
