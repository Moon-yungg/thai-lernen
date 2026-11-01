import { motion } from 'framer-motion'
import { useState } from 'react'
import type { Ex } from '../lib/session'
import { sayText } from '../lib/session'
import { speak } from '../lib/audio'
import { stripTone, syllables, toneOf, TONES } from '../lib/tones'
import { TONE_NAME, TONE_TPL, type Tone } from '../lib/server'
import { SpeakerPair } from '../components/ui'
import type { ExProps } from './common'

type E = Extract<Ex, { t: 'tone' }>

const TONE_COLOR: Record<Tone, string> = { m: '#1fb6ff', l: '#7c5cff', f: '#ff6b4a', h: '#2bc46d', r: '#f7b500' }
const TONE_HINT: Record<Tone, string> = {
  m: 'gleichbleibend, normale Lage',
  l: 'tief, leicht fallend',
  f: 'hoch → stark fallend',
  h: 'hoch, am Ende steigend',
  r: 'erst tief, dann steigend',
}

export function ToneCurve({ t, w = 56, h = 30, color }: { t: Tone; w?: number; h?: number; color?: string }) {
  const v = TONE_TPL[t]
  const d = v.map((y, i) => `${i ? 'L' : 'M'}${((i / (v.length - 1)) * w).toFixed(1)} ${(h - ((y + 4) / 8) * h).toFixed(1)}`).join(' ')
  return (
    <svg width={w} height={h} viewBox={`-3 -3 ${w + 6} ${h + 6}`}>
      <path d={d} stroke={color || TONE_COLOR[t]} strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>
  )
}

// Ton-Hörtraining: Wort hören, Ton der markierten Silbe wählen
export function ToneEx({ ex, onSubmit, locked }: ExProps<E>) {
  const it = ex.item
  const syl = syllables(it.rom)
  const answer = toneOf(syl[ex.syl])
  const [picked, setPicked] = useState<Tone | null>(null)
  const choose = (t: Tone) => {
    if (locked || picked) return
    setPicked(t)
    speak(sayText(it))
    onSubmit(
      t === answer,
      t === answer ? undefined : (
        <div>
          <span className="th">{it.th}</span> · {it.rom}
          <div>
            „{stripTone(syl[ex.syl])}“ hat den <b>{TONE_NAME[answer]}en</b> Ton ({TONE_HINT[answer]}).
          </div>
        </div>
      ),
    )
  }
  return (
    <div className="ex">
      <div className="ex-title">Welchen Ton hörst du{syl.length > 1 ? ' bei der markierten Silbe' : ''}?</div>
      <SpeakerPair text={sayText(it)} />
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, flexWrap: 'wrap', fontSize: 24, fontWeight: 900 }}>
        {syl.map((x, i) => (
          <span
            key={i}
            style={{
              padding: '4px 10px',
              borderRadius: 10,
              background: i === ex.syl ? 'color-mix(in srgb, var(--blue) 18%, var(--card))' : 'transparent',
              border: i === ex.syl ? '2px solid var(--blue)' : '2px solid transparent',
              color: i === ex.syl ? 'var(--text)' : 'var(--muted)',
            }}
          >
            {picked ? x : stripTone(x)}
          </span>
        ))}
      </div>
      {/* Bedeutung erst nach der Antwort – sonst verrät ein bekanntes Wort den Ton */}
      <div className="hint">{picked ? <><span className="th" style={{ fontSize: 22 }}>{it.th}</span> · {it.de}</> : 'Hör genau hin – 🐢 spielt langsamer ab'}</div>
      <div className="list" style={{ gap: 8 }}>
        {TONES.map((t, i) => {
          const state = picked ? (t === answer ? 'right' : t === picked ? 'wrong' : 'dim') : ''
          return (
            <motion.button
              key={t}
              className={`opt ${state}`}
              style={{ flexDirection: 'row', justifyContent: 'flex-start', gap: 14, minHeight: 52, padding: '8px 14px' }}
              initial={{ opacity: 0, x: -12 }}
              animate={state === 'wrong' ? { x: [0, -8, 8, 0], opacity: 1 } : { opacity: 1, x: 0 }}
              transition={{ delay: picked ? 0 : i * 0.04 }}
              onClick={() => choose(t)}
            >
              <ToneCurve t={t} />
              <span style={{ textAlign: 'left' }}>
                {TONE_NAME[t]}
                <span className="sub" style={{ display: 'block' }}>{TONE_HINT[t]}</span>
              </span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
