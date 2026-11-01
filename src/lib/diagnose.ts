// Regelbasierte Fehlerdiagnose im Browser (Gegenstück zu server/explain.py) für den Handy-Modus ohne Analyse-Server.
// Vergleicht Zieltext und erkannten Text Zeichen für Zeichen und ordnet Unterschiede phonetisch ein.
import { items } from '../data'
import type { Issue } from './server'

const CONS: Record<string, [string, string, string]> = {}
for (const [chars, group, kind, sound] of [
  ['ก', 'k', 'unasp', 'g/k (ohne Hauch)'],
  ['ขฃคฅฆ', 'k', 'asp', 'kh (mit Hauch)'],
  ['จ', 'ch', 'unasp', 'dj/tsch (ohne Hauch)'],
  ['ฉชฌ', 'ch', 'asp', 'tsch (mit Hauch)'],
  ['ดฎ', 't', 'voiced', 'd (stimmhaft)'],
  ['ตฏ', 't', 'unasp', 'dt (ohne Hauch)'],
  ['ถฐทธฑฒ', 't', 'asp', 'th (mit Hauch)'],
  ['บ', 'p', 'voiced', 'b (stimmhaft)'],
  ['ป', 'p', 'unasp', 'bp (ohne Hauch)'],
  ['ผพภ', 'p', 'asp', 'ph (mit Hauch)'],
  ['ฝฟ', 'f', 'fric', 'f'],
  ['ซศษส', 's', 'fric', 's'],
  ['หฮ', 'h', 'fric', 'h'],
  ['ง', 'ng', 'nasal', 'ng'],
  ['นณ', 'n', 'nasal', 'n'],
  ['ม', 'm', 'nasal', 'm'],
  ['ญย', 'y', 'approx', 'j'],
  ['ร', 'r', 'liquid', 'r'],
  ['ลฬ', 'l', 'liquid', 'l'],
  ['ว', 'w', 'approx', 'w'],
  ['อ', 'glottal', 'glottal', 'stummer Träger'],
] as const)
  for (const c of chars) CONS[c] = [group, kind, sound]

// Buchstabennamen aus den Lerninhalten (z.B. ก → "กอ ไก่")
const NAMES: Record<string, string> = Object.fromEntries(items.filter((i) => i.kind === 'consonant').map((i) => [i.th, i.name!]))

const VOWEL_NAME: Record<string, string> = {
  'ะ': 'kurzes a', 'า': 'langes aa', 'ั': 'kurzes a', 'ิ': 'kurzes i', 'ี': 'langes ii', 'ึ': 'kurzes ue', 'ื': 'langes ue', 'ุ': 'kurzes u', 'ู': 'langes uu',
}
const LENGTH_PAIRS = [['ะ', 'า'], ['ิ', 'ี'], ['ึ', 'ื'], ['ุ', 'ู'], ['ั', 'า']]
const TONE_MARKS = '่้๊๋'

type Op = ['equal' | 'replace' | 'delete' | 'insert', number, number, number, number]

// Levenshtein mit Rückverfolgung → Operationen wie difflib.get_opcodes()
function opcodes(a: string[], b: string[]): Op[] {
  const n = a.length
  const m = b.length
  const d = Array.from({ length: n + 1 }, (_, i) => Array.from({ length: m + 1 }, (_, j) => (i ? (j ? 0 : i) : j)))
  for (let i = 1; i <= n; i++) for (let j = 1; j <= m; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1))
  const steps: [Op[0], number, number][] = []
  let i = n
  let j = m
  while (i || j) {
    if (i && j && a[i - 1] === b[j - 1] && d[i][j] === d[i - 1][j - 1]) steps.push(['equal', --i, --j])
    else if (i && j && d[i][j] === d[i - 1][j - 1] + 1) steps.push(['replace', --i, --j])
    else if (i && d[i][j] === d[i - 1][j] + 1) steps.push(['delete', --i, j])
    else steps.push(['insert', i, --j])
  }
  steps.reverse()
  const ops: Op[] = []
  for (const [t, ii, jj] of steps) {
    const last = ops[ops.length - 1]
    const di = t === 'insert' ? 0 : 1
    const dj = t === 'delete' ? 0 : 1
    if (last && last[0] === t) {
      last[2] += di
      last[4] += dj
    } else ops.push([t, ii, ii + di, jj, jj + dj])
  }
  // Benachbarte Änderungen zu einem „replace“ zusammenfassen (wie difflib), z.B. ี → ือ
  const merged: Op[] = []
  for (const o of ops) {
    const last = merged[merged.length - 1]
    if (last && last[0] !== 'equal' && o[0] !== 'equal') merged[merged.length - 1] = ['replace', last[1], o[2], last[3], o[4]]
    else merged.push([...o] as Op)
  }
  return merged
}

export function diagnose(target: string, heard: string, words: string[]): Issue[] {
  const clean = [...target.replace(/[\s?!.,ๆฯ]/g, '')]
  const got = [...heard.replace(/[\s?!.,ๆฯ]/g, '')]
  // Wort (Token) zu jeder Zeichenposition – für die Hörbeispiele „richtig / so klang es“
  const wordAt: { w: string; start: number }[] = []
  let pos = 0
  for (const w of words.length ? words : [clean.join('')]) {
    for (let k = 0; k < [...w].length; k++) wordAt[pos + k] = { w, start: pos }
    pos += [...w].length
  }
  const issues: (Issue & { weight: number })[] = []
  const add = (type: string, word: string | null, title: string, detail: string, tip: string, weight: number, compare?: Issue['compare']) =>
    issues.push({ type, syllable: word, title, detail, tip, weight, compare })

  const variant = (idx: number, len: number, repl: string): [string, string] | null => {
    const at = wordAt[idx]
    if (!at) return null
    const chars = [...at.w]
    const k = idx - at.start
    return [at.w, [...chars.slice(0, k), repl, ...chars.slice(k + len)].join('')]
  }
  const cmp = (v: [string, string] | null, extra: Issue['compare'] = []): Issue['compare'] => {
    const out: NonNullable<Issue['compare']> = []
    if (v) {
      out.push({ label: 'richtig', text: v[0], ok: true })
      if (v[1] && v[1] !== v[0]) out.push({ label: 'so klang es', text: v[1], ok: false })
    }
    return [...out, ...(extra || [])].length ? [...out, ...(extra || [])] : undefined
  }

  for (const [op, i1, i2, j1, j2] of opcodes(clean, got)) {
    if (op === 'equal') continue
    const tgt = clean.slice(i1, i2).join('')
    const g = got.slice(j1, j2).join('')
    const word = wordAt[i1]?.w ?? null
    if (op === 'replace' && i2 - i1 === j2 - j1) {
      for (let k = 0; k < i2 - i1; k++) pair(clean[i1 + k], got[j1 + k], wordAt[i1 + k]?.w ?? null, variant(i1 + k, 1, got[j1 + k]))
    } else if (op === 'replace' && i2 - i1 === 1 && [...g].some((c) => 'ึืิีุู'.includes(c)) && 'ึืิีุู'.includes(tgt)) {
      // Vokal durch Vokal mit Trägerzeichen ersetzt (z.B. ี → ือ): als Vokalqualität werten
      pair(tgt, [...g].find((c) => 'ึืิีุู'.includes(c))!, word, variant(i1, 1, g))
    } else if (op === 'replace') {
      add('sound', word, `„${tgt}“ klang wie „${g}“`, `In „${word}“ wurde statt „${tgt}“ eher „${g}“ gehört.`, 'Hör dir das Vorbild langsam (🐢) an und sprich Silbe für Silbe nach.', 0.6, cmp(variant(i1, i2 - i1, g)))
    } else if (op === 'delete') {
      if ([...tgt].every((c) => TONE_MARKS.includes(c))) continue // Tonzeichen fehlen in der Erkennung oft
      if ([...tgt].every((c) => CONS[c]) && word && wordAt[i2 - 1]?.w === word && i2 === (wordAt[i1]?.start ?? 0) + [...word].length)
        add('final', word, `Auslaut in „${word}“ verschluckt`, `Der Endkonsonant „${tgt}“ war nicht zu hören.`,
          'Thai-Auslaute (k, t, p) werden nicht gelöst, aber Zunge/Lippen schließen trotzdem: Mund am Ende kurz schließen, ohne Luft auszustoßen.', 0.5, cmp(variant(i1, i2 - i1, '')))
      else add('missing', word, `„${tgt}“ fehlte`, `In „${word}“ fehlte der Laut „${tgt}“.`, 'Sprich etwas langsamer und deutlicher.', 0.5, cmp(variant(i1, i2 - i1, '')))
    } else if (op === 'insert' && ![...g].every((c) => TONE_MARKS.includes(c))) {
      add('extra', word, `Zusätzlicher Laut „${g}“`, `Bei „${word ?? target}“ wurde zusätzlich „${g}“ gehört.`, 'Achte darauf, keine Laute anzuhängen (z.B. kein „e“ nach Endkonsonanten).', 0.3)
    }
  }

  function pair(t: string, g: string, word: string | null, v: [string, string] | null) {
    const names: Issue['compare'] = NAMES[t] && NAMES[g] ? [{ label: `Buchstabe ${t}`, text: NAMES[t], ok: true }, { label: `Buchstabe ${g}`, text: NAMES[g], ok: false }] : []
    const c = cmp(v, names)
    if (CONS[t] && CONS[g]) {
      const [tg, tk, ts] = CONS[t]
      const [gg, gk, gs] = CONS[g]
      const stops = ['asp', 'unasp', 'voiced']
      if (tg === gg && stops.includes(tk) && stops.includes(gk)) {
        if ((tk === 'asp') !== (gk === 'asp')) {
          const more = gk === 'asp'
          add('aspiration', word, `„${t}“ ${more ? 'zu stark' : 'zu schwach'} behaucht`, `Ziel ist ${ts}, gehört wurde ${gs} („${g}“).`,
            more ? 'Hand vor den Mund: Bei unbehauchten Lauten (ก ต ป จ) spürst du KEINEN Luftstoß, bei behauchten (ค ท พ ช) einen deutlichen.'
              : 'Bei behauchten Lauten (ค ท พ ช) kommt nach dem Laut ein kräftiger Luftstoß – wie im deutschen „Kater“.', 0.7, c)
        } else
          add('voicing', word, `„${t}“ klang wie „${g}“`, `Ziel ist ${ts}, gehört wurde ${gs}.`,
            'ด/บ sind stimmhaft (Stimmbänder schwingen schon während des Verschlusses), ต/ป sind stimmlos und unbehaucht.', 0.6, c)
        return
      }
      if ((tg === 'r' && gg === 'l') || (tg === 'l' && gg === 'r'))
        return add('rl', word, `„${t}“ und „${g}“ verwechselt`, `Ziel ist ${ts}, gehört wurde ${gs}.`,
          'ร ist ein gerolltes/getipptes Zungenspitzen-r. Im Alltag sagen viele Thais l – deutlich ist r aber besser.', 0.4, c)
      if (t === 'ง')
        return add('ng', word, 'ng-Laut nicht getroffen', `Ziel ist ng („ง“), gehört wurde ${gs}.`,
          'ng wie in „singen“ – aber am Silbenanfang: sag „singen“, halte das ng und beginne daraus die Silbe.', 0.6, c)
      return add('sound', word, `„${t}“ klang wie „${g}“`, `Ziel ist ${ts}, gehört wurde ${gs}.`, 'Vergleiche langsam mit dem Vorbild (🐢).', 0.5, c)
    }
    for (const [short, long] of LENGTH_PAIRS)
      if ((t === short && g === long) || (t === long && g === short))
        return add('length', word, `Vokal in „${word}“ zu ${g === long ? 'lang' : 'kurz'}`, `Ziel ist ${VOWEL_NAME[t] ?? t}, gehört wurde ${VOWEL_NAME[g] ?? g}.`,
          'Vokallänge verändert im Thai die Bedeutung! Kurze Vokale abrupt beenden, lange bewusst dehnen.', 0.7, c)
    if ('ิี'.includes(t) !== 'ิี'.includes(g) && 'ิีึื'.includes(t) && 'ิีึื'.includes(g))
      return add('quality', word, `i/ue in „${word}“ verwechselt`, `Ziel ist ${VOWEL_NAME[t]}, gehört wurde ${VOWEL_NAME[g]}.`,
        'ิี'.includes(t) ? 'Für i liegt die Zunge VORNE – wie im deutschen „Biene“.' : 'Für ue Lippen breit wie beim „i“, aber die Zunge nach HINTEN ziehen – nicht runden.', 0.6, c)
    if ('ึืุู'.includes(t) && 'ึืุู'.includes(g))
      return add('quality', word, `ue/u in „${word}“ verwechselt`, `Ziel ist ${VOWEL_NAME[t]}, gehört wurde ${VOWEL_NAME[g]}.`,
        'Für ue (ึ ื) Lippen breit lassen, Zunge nach hinten. Für u (ุ ู) die Lippen runden.', 0.6, c)
    if (TONE_MARKS.includes(t) || TONE_MARKS.includes(g))
      return add('tone', word, `Ton bei „${word}“ evtl. anders`, `Erkannt wurde ein Wort mit anderem Tonzeichen („${g}“ statt „${t}“).`,
        'Hör dir das Vorbild langsam an und achte auf die Tonhöhe.', 0.5, c)
    add('sound', word, `„${t}“ klang wie „${g}“`, `In „${word}“ wurde statt „${t}“ eher „${g}“ gehört.`, 'Vergleiche langsam mit dem Vorbild (🐢).', 0.4, c)
  }

  return issues.sort((a, b) => b.weight - a.weight).slice(0, 5)
}
