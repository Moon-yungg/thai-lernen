import type { Chapter, Item, Lesson } from './types'
import { letterChapters, letterItems } from './letters'
import { chapters1, items1 } from './content1'
import { chapters2, items2 } from './content2'
import { dialogues } from './dialogues'
import { grammar } from './grammar'

export * from './types'
export { dialogues, grammar }

export const chapters: Chapter[] = [...letterChapters, ...chapters1, ...chapters2]
export const items: Item[] = [...letterItems, ...items1, ...items2]
export const itemById = new Map(items.map((i) => [i.id, i]))
export const getItem = (id: string) => itemById.get(id)!

export const dialogueById = new Map(dialogues.map((d) => [d.id, d]))
export const grammarById = new Map(grammar.map((g) => [g.id, g]))

export interface LessonRef {
  chapter: Chapter
  lesson: Lesson
  index: number // Index innerhalb des Kapitels
}
export const lessonList: LessonRef[] = chapters.flatMap((chapter) => chapter.lessons.map((lesson, index) => ({ chapter, lesson, index })))
export const lessonById = new Map(lessonList.map((l) => [l.lesson.id, l]))

// Kapitel, in dem ein Item zuerst vorkommt
export const chapterOfItem = new Map<string, Chapter>()
for (const c of chapters) for (const l of c.lessons) for (const id of l.items) if (!chapterOfItem.has(id)) chapterOfItem.set(id, c)

// Pool aller zeichenbaren Glyphen (für die Handschrift-Erkennung)
export const drawPool = [...new Set(items.filter((i) => i.draw).map((i) => i.draw!))]

if (import.meta.env.DEV) {
  const ids = new Set<string>()
  for (const i of items) {
    if (ids.has(i.id)) console.warn('Doppelte Item-ID', i.id)
    ids.add(i.id)
    if (i.tokens && i.tokens.join('') !== i.th) console.warn('tokens passen nicht zu th', i.id)
  }
  for (const l of lessonList) for (const id of l.lesson.items) if (!itemById.has(id)) console.warn('Unbekanntes Item', id, 'in', l.lesson.id)
}
