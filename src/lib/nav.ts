import { chapters, items, type Chapter, type LessonRef } from '../data'
import type { Progress } from './store'
import { weakness } from './store'

export type Route =
  | { name: 'session'; cfg: import('../screens/Session').SessionConfig }
  | { name: 'grammar'; id: string }
  | { name: 'dialogue'; id: string }
  | { name: 'alphabet' }

export function chapterDone(p: Progress, c: Chapter) {
  return c.lessons.every((l) => p.lessons[l.id]?.done)
}

export function chapterUnlocked(p: Progress, c: Chapter) {
  if (p.settings.unlockAll) return true
  const i = chapters.indexOf(c)
  if (i === 0 || c.id === 'k2') return true // Schrift und Alltag können parallel begonnen werden
  const prev = chapters[i - 1]
  return chapterDone(p, prev) || (p.tests[prev.id] || 0) >= 80 || (p.tests[c.id] || 0) >= 80
}

export function lessonUnlocked(p: Progress, r: LessonRef) {
  if (p.settings.unlockAll) return true
  if (!chapterUnlocked(p, r.chapter)) return false
  if (r.index === 0 || (p.tests[r.chapter.id] || 0) >= 80) return true
  return !!p.lessons[r.chapter.lessons[r.index - 1].id]?.done
}

export const learnedIds = (p: Progress) => Object.keys(p.items).filter((id) => items.some((i) => i.id === id))
export const dueIds = (p: Progress, now = Date.now()) =>
  learnedIds(p)
    .filter((id) => p.items[id].due <= now)
    .sort((a, b) => p.items[a].due - p.items[b].due)
export const mistakeIds = (p: Progress) => learnedIds(p).filter((id) => p.items[id].reps === 0 && p.items[id].wrong > 0)
export const weakIds = (p: Progress) =>
  learnedIds(p)
    .filter((id) => weakness(p.items[id]) > 0.12)
    .sort((a, b) => weakness(p.items[b]) - weakness(p.items[a]))

export function chapterAccuracy(p: Progress, c: Chapter) {
  let ok = 0
  let bad = 0
  for (const l of c.lessons)
    for (const id of l.items) {
      const s = p.items[id]
      if (s) {
        ok += s.correct
        bad += s.wrong
      }
    }
  return ok + bad ? { acc: ok / (ok + bad), n: ok + bad } : null
}
