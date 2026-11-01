// Cloud-Sync über ein privates GitHub Gist – kostenlos, ohne eigenen Server.
// Der Token (nur Berechtigung „gist“) bleibt ausschließlich auf diesem Gerät (eigener localStorage-Schlüssel,
// nicht im Export und nicht im Gist). Beim Start und beim Zurückkehren in die App wird geholt und zusammengeführt,
// nach Änderungen kurz verzögert hochgeladen.
import { useSyncExternalStore } from 'react'
import { getProgress, replaceProgress, subscribe, type ItemStat, type Progress } from './store'

const KEY = 'thai-lernen-sync'
const FILE = 'thai-lernen-fortschritt.json'
const DESC = 'Thai lernen – Fortschritt (automatisch synchronisiert)'
const API = 'https://api.github.com'

interface SyncConf {
  token?: string
  gistId?: string
  last?: number // Zeit der letzten erfolgreichen Synchronisierung
  error?: string
  busy?: boolean
}

let conf: SyncConf = (() => {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}')
  } catch {
    return {}
  }
})()
const listeners = new Set<() => void>()
function setConf(c: Partial<SyncConf>) {
  conf = { ...conf, ...c }
  try {
    const { busy, ...persist } = conf
    localStorage.setItem(KEY, JSON.stringify(persist))
  } catch {}
  listeners.forEach((l) => l())
}

export function useSync(): SyncConf {
  return useSyncExternalStore(
    (l) => (listeners.add(l), () => listeners.delete(l)),
    () => conf,
  )
}

async function gh(path: string, init: RequestInit = {}) {
  const r = await fetch(API + path, {
    ...init,
    headers: { Authorization: `Bearer ${conf.token}`, Accept: 'application/vnd.github+json', 'Content-Type': 'application/json', ...(init.headers || {}) },
  })
  if (r.status === 401) throw new Error('Token ungültig oder abgelaufen')
  if (r.status === 404) throw new Error('Gist nicht gefunden (Token braucht die Berechtigung „gist“)')
  if (!r.ok) throw new Error(`GitHub-Fehler ${r.status}`)
  return r.json()
}

// ---------- Zusammenführen: pro Eintrag gewinnt der neuere bzw. bessere Stand ----------
export function merge(a: Progress, b: Progress): Progress {
  const items: Record<string, ItemStat> = { ...a.items }
  for (const [id, s] of Object.entries(b.items || {})) if (!items[id] || s.last > items[id].last) items[id] = s
  const lessons = { ...a.lessons }
  for (const [id, l] of Object.entries(b.lessons || {}))
    lessons[id] = lessons[id] ? { done: Math.max(lessons[id].done, l.done), best: Math.max(lessons[id].best, l.best) } : l
  const maxMap = (x: Record<string, number> = {}, y: Record<string, number> = {}) => {
    const out = { ...x }
    for (const [k, v] of Object.entries(y)) out[k] = Math.max(out[k] ?? -Infinity, v)
    return out
  }
  const grammar = { ...a.grammar, ...b.grammar }
  const newer = (b.lastDay || '') > (a.lastDay || '') ? b : a
  const daily = maxMap(a.daily, b.daily)
  return {
    ...a,
    items,
    lessons,
    grammar,
    tests: maxMap(a.tests, b.tests),
    dialogues: maxMap(a.dialogues, b.dialogues),
    daily,
    xp: Math.max(a.xp, b.xp, Object.values(daily).reduce((s, v) => s + v, 0)),
    streak: newer.lastDay === a.lastDay && a.lastDay === b.lastDay ? Math.max(a.streak, b.streak) : newer.streak,
    lastDay: newer.lastDay,
    dailyGoal: a.dailyGoal,
    settings: a.settings,
  }
}

const payload = (p: Progress) => {
  const { settings, ...rest } = p // Einstellungen sind gerätespezifisch
  return JSON.stringify({ version: 1, savedAt: new Date().toISOString(), progress: rest })
}

let pushTimer: ReturnType<typeof setTimeout> | null = null
let applying = false

export async function syncNow(): Promise<void> {
  if (!conf.token || conf.busy) return
  setConf({ busy: true, error: undefined })
  try {
    // Gist finden oder anlegen
    if (!conf.gistId) {
      const list: any[] = await gh('/gists?per_page=100')
      const found = list.find((g) => g.description === DESC || g.files?.[FILE])
      if (found) setConf({ gistId: found.id })
    }
    let remote: Progress | null = null
    if (conf.gistId) {
      const g = await gh(`/gists/${conf.gistId}`)
      const f = g.files?.[FILE]
      const text = f?.truncated ? await fetch(f.raw_url).then((r) => r.text()) : f?.content
      if (text) remote = JSON.parse(text).progress
    }
    const local = getProgress()
    const merged = remote ? merge(local, { ...local, ...remote, settings: local.settings }) : local
    applying = true
    replaceProgress(merged)
    applying = false
    const body = JSON.stringify({ description: DESC, files: { [FILE]: { content: payload(merged) } } })
    if (conf.gistId) await gh(`/gists/${conf.gistId}`, { method: 'PATCH', body })
    else {
      const g = await gh('/gists', { method: 'POST', body: JSON.stringify({ description: DESC, public: false, files: { [FILE]: { content: payload(merged) } } }) })
      setConf({ gistId: g.id })
    }
    setConf({ last: Date.now(), busy: false })
  } catch (e: any) {
    applying = false
    setConf({ busy: false, error: e.message || 'Synchronisierung fehlgeschlagen' })
  }
}

export async function connect(token: string) {
  setConf({ token: token.trim(), gistId: undefined, error: undefined })
  await syncNow()
}

export function disconnect() {
  conf = {}
  try {
    localStorage.removeItem(KEY)
  } catch {}
  listeners.forEach((l) => l())
}

// Automatik: beim Start, beim Zurückkehren in die App und kurz nach Änderungen
if (conf.token) setTimeout(syncNow, 1500)
document.addEventListener('visibilitychange', () => {
  if (!conf.token) return
  if (document.visibilityState === 'visible') syncNow()
  else if (pushTimer) {
    clearTimeout(pushTimer)
    pushTimer = null
    syncNow() // beim Verlassen der App sofort sichern
  }
})
subscribe(() => {
  if (!conf.token || applying) return
  if (pushTimer) clearTimeout(pushTimer)
  pushTimer = setTimeout(() => {
    pushTimer = null
    syncNow()
  }, 8000)
})
