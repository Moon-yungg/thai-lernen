import type { Chapter, Item, Lesson } from './types'
import { letterChapters, letterItems } from './letters'
import { chapters1, items1 } from './content1'
import { chapters2, items2 } from './content2'
import { chapters3, items3 } from './content3'
import { chapters4, items4 } from './content4'
import { dialogues } from './dialogues'
import { grammar as baseGrammar } from './grammar'
import { readingChapter, readingItems, readingTopics } from './reading'
import { toneChapter, toneItems, toneSets } from './tones'
import { stories } from './stories'

export * from './types'
export { dialogues, stories, toneSets }
export const grammar = [...baseGrammar, ...readingTopics]

// Reihenfolge: Schrift → Töne hören → Lesen lernen → Themen A1 → Themen A2
export const chapters: Chapter[] = [...letterChapters, toneChapter, readingChapter, ...chapters1, ...chapters2, ...chapters3, ...chapters4]
export const items: Item[] = [...letterItems, ...toneItems, ...readingItems, ...items1, ...items2, ...items3, ...items4]
export const itemById = new Map(items.map((i) => [i.id, i]))
export const getItem = (id: string) => itemById.get(id)!

export const dialogueById = new Map(dialogues.map((d) => [d.id, d]))
export const storyById = new Map(stories.map((s) => [s.id, s]))
// Ton-Minimalpaare: Item-ID → Gruppe
export const toneSetOf = new Map(toneSets.flatMap((set) => set.words.map((w) => [w.id, set] as const)))
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
