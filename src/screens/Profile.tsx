import { useEffect, useState } from 'react'
import { chapters } from '../data'
import { getThaiVoices, speak } from '../lib/audio'
import { chapterAccuracy, dueIds, learnedIds } from '../lib/nav'
import { canRecognize } from '../lib/speech'
import { apiBase, checkServer, serverAvailable } from '../lib/server'
import { connect, disconnect, syncNow, useSync } from '../lib/sync'
import { exportProgress, importProgress, resetProgress, today, update, useProgress } from '../lib/store'
import { Toggle } from '../components/ui'

export function Profile() {
  const p = useProgress()
  const s = p.settings
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  useEffect(() => {
    setVoices(getThaiVoices())
    const t = setTimeout(() => setVoices(getThaiVoices()), 800)
    return () => clearTimeout(t)
  }, [])
  const set = (fn: (st: typeof s) => void) => update((pp) => fn(pp.settings))
  const learned = learnedIds(p)
  const mastered = learned.filter((id) => p.items[id].interval >= 21).length
  const days = Array.from({ length: 7 }, (_, i) => today(new Date(Date.now() - (6 - i) * 864e5)))
  const maxXp = Math.max(p.dailyGoal, ...days.map((d) => p.daily[d] || 0))

  const doExport = () => {
    const blob = new Blob([exportProgress()], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `thai-fortschritt-${today()}.json`
    a.click()
  }
  const doImport = () => {
    const inp = document.createElement('input')
    inp.type = 'file'
    inp.accept = 'application/json'
    inp.onchange = async () => {
      try {
        importProgress(await inp.files![0].text())
        alert('Fortschritt importiert.')
      } catch (e: any) {
        alert(e.message)
      }
    }
    inp.click()
  }

  return (
    <>
      <div className="topbar">
        <h1>Profil</h1>
      </div>
      <div className="scroll">
        <div className="stat-grid">
          <div className="stat"><div>🔥</div><b>{p.streak}</b><small>Tage Serie</small></div>
          <div className="stat"><div>⚡</div><b>{p.xp}</b><small>XP gesamt</small></div>
          <div className="stat"><div>📚</div><b>{learned.length}</b><small>gelernt</small></div>
          <div className="stat"><div>💎</div><b>{mastered}</b><small>gefestigt</small></div>
          <div className="stat"><div>🧠</div><b>{dueIds(p).length}</b><small>fällig</small></div>
          <div className="stat"><div>✅</div><b>{Object.values(p.lessons).filter((l) => l.done).length}</b><small>Lektionen</small></div>
        </div>

        <div className="section-title">Diese Woche</div>
        <div className="card" style={{ margin: '0 16px', display: 'flex', alignItems: 'flex-end', gap: 8, height: 140 }}>
          {days.map((d) => {
            const v = p.daily[d] || 0
            return (
              <div key={d} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, height: '100%', justifyContent: 'flex-end' }}>
                <small style={{ fontSize: 10, fontWeight: 800 }} className="muted">{v || ''}</small>
                <div style={{ width: '100%', height: `${(v / maxXp) * 80}%`, minHeight: 4, borderRadius: 8, background: v >= p.dailyGoal ? 'var(--ok)' : 'var(--brand)' }} />
                <small style={{ fontSize: 11, fontWeight: 800 }}>{new Date(d).toLocaleDateString('de', { weekday: 'short' })}</small>
              </div>
            )
          })}
        </div>

        <div className="section-title">Kapitel</div>
        <div className="card" style={{ margin: '0 16px' }}>
          {chapters.map((c) => {
            const done = c.lessons.filter((l) => p.lessons[l.id]?.done).length
            const acc = chapterAccuracy(p, c)
            return (
              <div key={c.id} className="row">
                <span className="th" style={{ flex: 'none', width: 30, fontSize: 20 }}>{c.icon}</span>
                <span>
                  {c.title}
                  <div className="bar" style={{ marginTop: 4 }}>
                    <div style={{ width: `${(done / c.lessons.length) * 100}%`, background: c.color }} />
                  </div>
                </span>
                <small className="muted" style={{ fontWeight: 800, width: 70, textAlign: 'right' }}>
                  {done}/{c.lessons.length}
                  {acc ? ` · ${Math.round(acc.acc * 100)}%` : ''}
                </small>
              </div>
            )
          })}
        </div>

        <div className="section-title">Einstellungen</div>
        <div className="card" style={{ margin: '0 16px' }}>
          <div className="row"><span>Soundeffekte</span><Toggle on={s.sound} onChange={(v) => set((x) => void (x.sound = v))} /></div>
          <div className="row"><span>Umschrift anzeigen</span><Toggle on={s.showRom} onChange={(v) => set((x) => void (x.showRom = v))} /></div>
          <div className="row">
            <span>
              Umschrift unter Antworten
              <div className="muted" style={{ fontSize: 12 }}>Erleichtert „Welches Zeichen hörst du?“ & Co. stark</div>
            </span>
            <Toggle on={s.romInOptions} onChange={(v) => set((x) => void (x.romInOptions = v))} />
          </div>
          <div className="row"><span>Sprech-Übungen {canRecognize() ? '' : '(nur Aufnahme)'}</span><Toggle on={s.speakExercises} onChange={(v) => set((x) => void (x.speakExercises = v))} /></div>
          <div className="row"><span>Schreib-Übungen</span><Toggle on={s.drawExercises} onChange={(v) => set((x) => void (x.drawExercises = v))} /></div>
          <div className="row"><span>Alle Lektionen freischalten</span><Toggle on={s.unlockAll} onChange={(v) => set((x) => void (x.unlockAll = v))} /></div>
          <div className="row">
            <span>Tagesziel</span>
            <select value={p.dailyGoal} onChange={(e) => update((pp) => void (pp.dailyGoal = +e.target.value))} style={{ fontSize: 16, padding: 6, borderRadius: 10 }}>
              {[20, 50, 100, 150].map((g) => <option key={g} value={g}>{g} XP</option>)}
            </select>
          </div>
          <div className="row" style={{ flexWrap: 'wrap' }}>
            <span>Sprechtempo</span>
            <input type="range" min={0.5} max={1.2} step={0.05} value={s.rate} onChange={(e) => set((x) => void (x.rate = +e.target.value))} style={{ width: 140 }} />
            <button className="btn small blue" onClick={() => speak('สวัสดีครับ ยินดีที่ได้รู้จัก')}>▶</button>
          </div>
          <div className="row" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
            <span>Thai-Stimme</span>
            {voices.length ? (
              <select value={s.voiceURI || ''} onChange={(e) => set((x) => void (x.voiceURI = e.target.value || undefined))} style={{ fontSize: 15, padding: 8, borderRadius: 10 }}>
                <option value="">Automatisch</option>
                {voices.map((v) => <option key={v.voiceURI} value={v.voiceURI}>{v.name}</option>)}
              </select>
            ) : (
              <div className="g-tip" style={{ fontSize: 13 }}>
                Keine Thai-Stimme gefunden. Android: Einstellungen → System → Sprache → Text-in-Sprache → Google → Sprachdaten installieren → Thai.
              </div>
            )}
          </div>
        </div>

        <CloudSync />

        <ServerSettings />

        <div className="section-title">Daten</div>
        <div className="tiles">
          <div className="grid2">
            <button className="btn ghost small" onClick={doExport}>⬇ Export</button>
            <button className="btn ghost small" onClick={doImport}>⬆ Import</button>
          </div>
          <button className="btn ghost small" style={{ color: 'var(--bad)' }} onClick={() => confirm('Wirklich den gesamten Fortschritt löschen?') && resetProgress()}>
            Fortschritt zurücksetzen
          </button>
        </div>
      </div>
    </>
  )
}

// Analyse-Server (Laut- und Tonanalyse): Adresse, Status, Test
function ServerSettings() {
  const p = useProgress()
  const [url, setUrl] = useState(p.settings.serverUrl || '')
  const [state, setState] = useState<'checking' | 'ok' | 'off'>(serverAvailable() ? 'ok' : 'checking')
  const test = async () => {
    setState('checking')
    setState((await checkServer(true)) ? 'ok' : 'off')
  }
  useEffect(() => {
    checkServer().then((ok) => setState(ok ? 'ok' : 'off'))
  }, [])
  return (
    <>
      <div className="section-title">Ausspracheanalyse-Server</div>
      <div className="card" style={{ margin: '0 16px' }}>
        <div className="row" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 8 }}>
          <span>
            Status:{' '}
            {state === 'ok' ? '🟢 verbunden' : state === 'checking' ? '⏳ prüfe … (ein schlafender Server braucht ~1 Min.)' : '🔴 nicht erreichbar – Handy-Spracherkennung wird genutzt'}
          </span>
          <div className="muted" style={{ fontSize: 12, fontWeight: 700, wordBreak: 'break-all' }}>Aktuell: {apiBase() || 'gleicher Server wie die App'}</div>
          <input
            className="type-input"
            style={{ padding: 10, fontSize: 14 }}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Eigene Adresse, z.B. https://192.168.178.23:8443 (leer = Standard)"
            autoCapitalize="off"
            autoCorrect="off"
          />
          <div className="grid2">
            <button className="btn ghost small" onClick={() => (update((pp) => void (pp.settings.serverUrl = url.trim() || undefined)), test())}>Speichern & testen</button>
            <button className="btn ghost small" onClick={() => (setUrl(''), update((pp) => void (pp.settings.serverUrl = undefined)), test())}>Standard</button>
          </div>
        </div>
      </div>
    </>
  )
}

// Cloud-Sync über ein privates GitHub Gist
function CloudSync() {
  const sync = useSync()
  const [token, setToken] = useState('')
  const since = sync.last ? new Date(sync.last).toLocaleString('de', { dateStyle: 'short', timeStyle: 'short' }) : null
  return (
    <>
      <div className="section-title">Cloud-Sync</div>
      <div className="card" style={{ margin: '0 16px' }}>
        {sync.token ? (
          <div className="list">
            <div style={{ fontWeight: 800 }}>
              {sync.busy ? '⏳ synchronisiere …' : sync.error ? `🔴 ${sync.error}` : '🟢 verbunden mit GitHub'}
            </div>
            <div className="muted" style={{ fontSize: 13, fontWeight: 700 }}>
              Dein Fortschritt wird automatisch in einem privaten Gist gesichert und auf allen verbundenen Geräten zusammengeführt.
              {since && <> Zuletzt: {since}.</>}
            </div>
            <div className="grid2">
              <button className="btn ghost small" disabled={sync.busy} onClick={() => syncNow()}>Jetzt synchronisieren</button>
              <button className="btn ghost small" style={{ color: 'var(--bad)' }} onClick={() => confirm('Sync auf diesem Gerät trennen? Der Fortschritt bleibt erhalten.') && disconnect()}>Trennen</button>
            </div>
          </div>
        ) : (
          <div className="list">
            <div className="muted" style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.5 }}>
              Kostenlos sichern und zwischen Geräten abgleichen – über ein <b>privates GitHub Gist</b>. Dafür brauchst du einen Token, der nur Gists
              lesen/schreiben darf:
              <br />
              1.{' '}
              <a href="https://github.com/settings/tokens/new?scopes=gist&description=Thai%20lernen%20Sync" target="_blank" rel="noreferrer" style={{ color: 'var(--blue)' }}>
                Token erstellen
              </a>{' '}
              (Häkchen bei „gist“ ist schon gesetzt, Ablauf z.B. „No expiration“)
              <br />
              2. Token hier einfügen. Er bleibt nur auf diesem Gerät gespeichert.
            </div>
            <input className="type-input" style={{ padding: 10, fontSize: 14 }} type="password" value={token} onChange={(e) => setToken(e.target.value)} placeholder="ghp_…" autoComplete="off" />
            {sync.error && <div className="hint" style={{ color: 'var(--bad)' }}>{sync.error}</div>}
            <button className="btn small blue" style={{ width: '100%' }} disabled={!token.trim() || sync.busy} onClick={() => connect(token).then(() => setToken(''))}>
              {sync.busy ? 'Verbinde …' : 'Verbinden'}
            </button>
          </div>
        )}
      </div>
    </>
  )
}
