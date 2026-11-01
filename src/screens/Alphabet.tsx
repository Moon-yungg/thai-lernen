import { useState } from 'react'
import { items } from '../data'
import { speak } from '../lib/audio'
import { useProgress } from '../lib/store'
import { TopBar } from '../components/ui'

export function Alphabet({ onBack }: { onBack: () => void }) {
  const p = useProgress()
  const [tab, setTab] = useState<'c' | 'v'>('c')
  const [sel, setSel] = useState<string | null>(null)
  const list = items.filter((i) => (tab === 'c' ? i.kind === 'consonant' : i.kind === 'vowel'))
  const s = items.find((i) => i.id === sel)
  return (
    <>
      <TopBar title="Alphabet" onBack={onBack} />
      <div className="scroll">
        <div className="grid2" style={{ padding: '0 16px 12px' }}>
          <button className={`opt ${tab === 'c' ? 'sel' : ''}`} onClick={() => setTab('c')}>Konsonanten</button>
          <button className={`opt ${tab === 'v' ? 'sel' : ''}`} onClick={() => setTab('v')}>Vokale</button>
        </div>
        {tab === 'c' && (
          <div className="hint" style={{ marginBottom: 10 }}>
            <span style={{ color: '#1fb6ff' }}>■ Mittel</span> · <span style={{ color: '#ff4b5c' }}>■ Hoch</span> · <span style={{ color: '#2bc46d' }}>■ Tief</span>
          </div>
        )}
        {s && (
          <div className="card" style={{ margin: '0 16px 12px', display: 'flex', gap: 14, alignItems: 'center' }}>
            <div className="th" style={{ fontSize: 56, fontWeight: 600 }}>{s.th}</div>
            <div>
              <b className="th" style={{ fontSize: 20 }}>{s.name || s.form}</b>
              <div className="muted" style={{ fontWeight: 800 }}>{s.kind === 'consonant' ? `${s.nameRom} · ${s.nameDe} · Anlaut ${s.initial}, Auslaut ${s.final}` : `${s.rom} · ${s.length === 'long' ? 'lang' : 'kurz'}`}</div>
              {s.note && <div style={{ fontSize: 13, marginTop: 4 }}>{s.note}</div>}
            </div>
          </div>
        )}
        <div className="alpha">
          {list.map((i) => (
            <button
              key={i.id}
              className={i.cls ? 'cls-' + i.cls : ''}
              style={{ outline: p.items[i.id] ? '2px solid var(--ok)' : undefined }}
              onClick={() => {
                setSel(i.id)
                speak(i.say || i.th)
              }}
            >
              <span className="th">{i.th}</span>
              <small>{i.kind === 'consonant' ? i.initial : i.rom}</small>
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
