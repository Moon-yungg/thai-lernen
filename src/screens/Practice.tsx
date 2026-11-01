import { motion } from 'framer-motion'
import { dialogues, getItem, items } from '../data'
import { chapterAccuracy, dueIds, learnedIds, mistakeIds, weakIds, type Route } from '../lib/nav'
import { kindSession, reviewSession, shuffle } from '../lib/session'
import { useProgress } from '../lib/store'
import { canRecognize } from '../lib/speech'
import { serverAvailable } from '../lib/server'
import { chapters } from '../data'

export function Practice({ go }: { go: (r: Route) => void }) {
  const p = useProgress()
  const learned = learnedIds(p)
  const due = dueIds(p)
  const mistakes = mistakeIds(p)
  const weak = weakIds(p)
  const letters = learned.filter((id) => getItem(id).draw)
  const sentences = learned.filter((id) => (getItem(id).tokens?.length ?? 0) >= 2)
  const words = learned.filter((id) => ['word', 'number', 'phrase'].includes(getItem(id).kind))
  const pics = learned.filter((id) => getItem(id).emoji && !getItem(id).draw)

  const run = (title: string, ids: string[], make: (ids: string[]) => ReturnType<typeof reviewSession>) =>
    go({ name: 'session', cfg: { title, exercises: make(ids), mode: 'review' } })

  const weakChapters = chapters
    .map((c) => ({ c, a: chapterAccuracy(p, c) }))
    .filter((x) => x.a && x.a.n >= 5)
    .sort((a, b) => a.a!.acc - b.a!.acc)
    .slice(0, 3)

  const tiles: { icon: string; color: string; title: string; sub: string; count?: number; ids: string[]; make: (ids: string[]) => any; fallback?: string[] }[] = [
    { icon: '🧠', color: '#7c5cff', title: 'Wiederholen', sub: 'Spaced Repetition – fällige Wörter', count: due.length, ids: due, make: (ids) => reviewSession(ids) },
    { icon: '🩹', color: '#ff4b5c', title: 'Fehler wiederholen', sub: 'Zuletzt falsch beantwortet', count: mistakes.length, ids: mistakes, make: (ids) => reviewSession(ids, { stage: 0 }) },
    { icon: '🎯', color: '#ff6b4a', title: 'Schwächen-Training', sub: 'Deine schwierigsten Wörter', count: weak.length, ids: weak, make: (ids) => reviewSession(ids, { max: 12 }) },
    { icon: '🎲', color: '#1fb6ff', title: 'Zufallsquiz', sub: '15 zufällige gelernte Inhalte', ids: learned, make: (ids) => reviewSession(shuffle(ids), { stage: 'mix' }) },
    { icon: '🃏', color: '#ff4fa3', title: 'Swipe-Karten', sub: 'Stimmt das? Nach links oder rechts wischen', ids: words.length ? words : learned, make: (ids) => kindSession(ids, 'flash', 20) },
    { icon: '✍️', color: '#13c296', title: 'Schreiben', sub: 'Zeichen auf dem Handy zeichnen', ids: letters, fallback: items.filter((i) => i.kind === 'consonant').slice(0, 10).map((i) => i.id), make: (ids) => kindSession(ids, 'draw', 10) },
    { icon: '🗣️', color: '#f7b500', title: 'Aussprache', sub: serverAvailable() ? 'Laut- & Tonanalyse auf deinem PC' : canRecognize() ? 'Nachsprechen mit Analyse' : 'Aufnehmen & vergleichen', ids: words.length ? words : learned, make: (ids) => kindSession(ids, 'speak', 10) },
    { icon: '👂', color: '#0b94d6', title: 'Hörverständnis', sub: 'Hören und verstehen', ids: learned, make: (ids) => shuffle([...kindSession(ids, 'listen-th', 6), ...kindSession(ids, 'listen-de', 6)]) },
    { icon: '🖼️', color: '#2fbf71', title: 'Bilder', sub: 'Bild ↔ Wort ↔ Audio', ids: pics, make: (ids) => shuffle([...kindSession(ids, 'pic-th', 4), ...kindSession(ids, 'th-pic', 4), ...kindSession(ids, 'audio-pic', 4)]) },
    { icon: '🧩', color: '#ff8a3d', title: 'Satzbau', sub: 'Sätze aus Bausteinen bauen', ids: sentences, make: (ids) => shuffle([...kindSession(ids, 'build', 5), ...kindSession(ids, 'listen-build', 3), ...kindSession(ids, 'cloze', 4)]) },
  ]

  return (
    <>
      <div className="topbar">
        <h1>Üben</h1>
        <span className="pill">📚 {learned.length} gelernt</span>
      </div>
      <div className="scroll">
        <div className="tiles">
          {tiles.map((t, i) => {
            const ids = t.ids.length ? t.ids : t.fallback || []
            const disabled = !ids.length
            return (
              <motion.button
                key={t.title}
                className="tile"
                style={{ opacity: disabled ? 0.5 : 1 }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: disabled ? 0.5 : 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => !disabled && run(t.title, ids, t.make)}
              >
                <span className="ti" style={{ background: t.color + '22' }}>{t.icon}</span>
                <span>
                  <b>{t.title}</b>
                  <small>{disabled ? 'Lerne zuerst ein paar Lektionen' : t.sub}</small>
                </span>
                {t.count !== undefined && t.count > 0 && <span className="cnt">{t.count}</span>}
              </motion.button>
            )
          })}
        </div>

        {weakChapters.length > 0 && (
          <>
            <div className="section-title">Problematische Themen</div>
            <div className="tiles">
              {weakChapters.map(({ c, a }) => (
                <button
                  key={c.id}
                  className="tile"
                  onClick={() => {
                    const ids = c.lessons.flatMap((l) => l.items).filter((id) => p.items[id])
                    run(`Training: ${c.title}`, ids.sort((x, y) => (p.items[y].wrong - p.items[y].correct * 0.3) - (p.items[x].wrong - p.items[x].correct * 0.3)), (ids) => reviewSession(ids, { max: 12 }))
                  }}
                >
                  <span className="ti th" style={{ background: c.color + '22' }}>{c.icon}</span>
                  <span style={{ flex: 1 }}>
                    <b>{c.title}</b>
                    <div className="bar" style={{ marginTop: 6 }}>
                      <div style={{ width: `${a!.acc * 100}%`, background: a!.acc > 0.8 ? 'var(--ok)' : a!.acc > 0.6 ? 'var(--gold)' : 'var(--bad)' }} />
                    </div>
                  </span>
                  <span className="cnt">{Math.round(a!.acc * 100)}%</span>
                </button>
              ))}
            </div>
          </>
        )}

        <div className="section-title">Rollenspiele</div>
        <div className="tiles">
          {dialogues.map((d) => (
            <button key={d.id} className="tile" onClick={() => go({ name: 'dialogue', id: d.id })}>
              <span className="ti" style={{ background: 'var(--bg2)' }}>{d.icon}</span>
              <span>
                <b>{d.title}</b>
                <small>{d.npcEmoji} {d.npcName}</small>
              </span>
              {p.dialogues[d.id] !== undefined && <span className="cnt">{p.dialogues[d.id]}%</span>}
            </button>
          ))}
        </div>

        <div className="section-title">Nachschlagen</div>
        <div className="tiles">
          <button className="tile" onClick={() => go({ name: 'alphabet' })}>
            <span className="ti th" style={{ background: '#ff6b4a22' }}>กข</span>
            <span>
              <b>Alphabet-Tabelle</b>
              <small>Alle Konsonanten & Vokale zum Antippen</small>
            </span>
          </button>
        </div>
      </div>
    </>
  )
}
