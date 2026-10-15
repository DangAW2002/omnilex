import { createMatcher, createReverseMatcher } from './runtime/matcher.js'
import { createLookupIndex } from './runtime/lookup.js'
import { openProject } from './runtime/project.js'
import { PackStore, PrefetchIO } from './runtime/pack-reader.js'
import { mergeTerms } from './runtime/pack-format.js'
import { searchConfigHash } from './runtime/search-config.js'

const PANE_ID = 'termbridge-lookup'
const MAX_BADGES = 4
const PROFILES = ['lite', 'standard', 'semantic']

let terms = []
let concepts = []
let conceptsById = new Map()
let explanations = new Map()
let query = ''
let selectedId = null
let trieMatcher = null
let reverseMatcher = null
// Concepts the reverse matcher is still to be built from (see ensureReverse).
let reverseSource = null
const scanCache = new Map()
let repoRoot = ''
let localized = {}
let lookupIndex = null
// Packs resolved for the session's project (Plan 3.3, D11); null means the
// data bundled with the plugin is in use.
let packs = null
let sessionCwd = ''
let sessionPacks = null
let sessionProfile = null
let notices = []
let paneResults = { key: '', results: [] }
let selectFirstResult = false
const explanationCache = new Map()

const MODES = ['hover', 'links', 'badges']
const LOCALES = ['vi', 'en']
const MAX_INLINE_TERMS = 30
const MAX_SCAN_CACHE_ENTRIES = 256
let mode = 'hover'
let locale = 'vi'
const UI_TEXT = {
  vi: {
    searchTitle: 'Tra ngược: mô tả bằng lời thường',
    description: 'Mô tả',
    placeholder: 'Ví dụ: tiền lãi lại sinh ra lãi',
    insert: 'Chèn thuật ngữ vào prompt',
    choose: 'Chọn một thuật ngữ để xem giải thích.',
    hint: 'Hover thuật ngữ trong câu trả lời để xem tóm tắt.',
  },
  en: {
    searchTitle: 'Reverse lookup: describe the idea in plain words',
    description: 'Description',
    placeholder: 'Example: interest on interest',
    insert: 'Insert term into prompt',
    choose: 'Select a term to read its explanation.',
    hint: 'Hover a term in the reply to see its summary.',
  },
}

function cleanTranscript(text) {
  return text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`\n]+`/g, ' ')
    .replace(/https?:\/\/\S+/g, ' ')
    .replace(/\]\([^)]*\)/g, ' ')
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function buildMatchers() {
  const localizedTerms = terms.map((term) => ({
    ...term,
    concepts: term.concepts.map((c) => conceptsById.get(c.id) || c),
  }))
  trieMatcher = createMatcher(localizedTerms)
  reverseMatcher = null
  reverseSource = concepts
  // With packs the pane searches the pack indexes, loaded on first use.
  lookupIndex = packs ? null : createLookupIndex(concepts)
  scanCache.clear()
}

function selectLocale(value) {
  const data = localized[value]
  if (!data) return false
  locale = value
  concepts = data.concepts
  conceptsById = new Map(concepts.map((item) => [item.id, item]))
  explanations = data.explanations || new Map()
  buildMatchers()
  return true
}

function matchedConcepts(text, requestId) {
  if (!trieMatcher) return []
  if (requestId) {
    const key = String(requestId)
    const signature = transcriptSignature(text)
    const cached = scanCache.get(key)
    if (cached?.signature === signature) {
      scanCache.delete(key)
      scanCache.set(key, cached)
      return cached.concepts
    }
    const res = trieMatcher.matchedConcepts(text, MAX_BADGES)
    scanCache.delete(key)
    scanCache.set(key, { signature, concepts: res })
    while (scanCache.size > MAX_SCAN_CACHE_ENTRIES) {
      scanCache.delete(scanCache.keys().next().value)
    }
    return res
  }
  return trieMatcher.matchedConcepts(text, MAX_BADGES)
}

function transcriptSignature(text) {
  let first = 0x811c9dc5
  let second = 0x9e3779b9
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i)
    first = Math.imul(first ^ code, 0x01000193)
    second = Math.imul(second ^ (code + i), 0x85ebca6b)
  }
  return `${text.length}:${first >>> 0}:${second >>> 0}`
}

// Hits of every term in `text`, longest key first, none inside `blocked` ranges.
function termHits(text, blocked = []) {
  if (!trieMatcher) return []
  return trieMatcher.termHits(text, blocked)
}

function charWidth(cp) {
  if ((cp >= 0x300 && cp <= 0x36f) || cp === 0x200d || (cp >= 0xfe00 && cp <= 0xfe0f)) return 0
  if ((cp >= 0x1100 && cp <= 0x115f) || (cp >= 0x2e80 && cp <= 0xa4cf) || (cp >= 0xac00 && cp <= 0xd7a3)
    || (cp >= 0xf900 && cp <= 0xfaff) || (cp >= 0xfe30 && cp <= 0xfe4f) || (cp >= 0xff00 && cp <= 0xff60)
    || (cp >= 0xffe0 && cp <= 0xffe6) || (cp >= 0x1f300 && cp <= 0x1faff) || (cp >= 0x20000 && cp <= 0x3fffd)) return 2
  return 1
}

function textWidth(text) {
  let width = 0
  for (const char of text) width += charWidth(char.codePointAt(0))
  return width
}

// One unit per source line, a fence (closed or still streaming) kept whole.
function parseUnits(text) {
  const lines = text.split('\n')
  const units = []
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const fence = line.match(/^\s*(```|~~~)/)
    if (fence) {
      const start = i
      for (i++; i < lines.length && !lines[i].trimStart().startsWith(fence[1]); i++);
      units.push({ kind: 'raw', raw: lines.slice(start, i + 1) })
      continue
    }
    if (!line.trim()) { units.push({ kind: 'blank' }); continue }
    const heading = line.match(/^#{1,6}\s+(.*)$/)
    if (heading) { units.push({ kind: 'heading', text: heading[1], raw: [line] }); continue }
    const item = line.match(/^(\s*)([-*+]|\d+[.)])\s+(.*)$/)
    if (item && !/^\s*([-*_])(\s*\1){2,}\s*$/.test(line)) {
      units.push({ kind: 'item', indent: item[1].length, marker: item[2], text: item[3], raw: [line] })
      continue
    }
    if (/^\s*(\||>)/.test(line) || /^\s*([-*_])(\s*\1){2,}\s*$/.test(line) || /^ {4,}\S/.test(line)) {
      units.push({ kind: 'raw', raw: [line] })
      continue
    }
    units.push({ kind: 'para', text: line, raw: [line] })
  }
  return units
}

const INLINE = /(\*\*|__)(?=\S)(.+?)(?<=\S)\1|`([^`\n]+)`|\[([^\]\n]+)\]\(([^)\s]+)\)|(?<![\p{L}\p{N}*_\\])([*_])(?=[^\s*_])([^*_\n]+?)(?<=[^\s*_])\6(?![\p{L}\p{N}])/gu

function inlineSegments(source) {
  const segments = []
  let last = 0
  for (const match of source.matchAll(INLINE)) {
    if (match.index > last) segments.push({ text: source.slice(last, match.index) })
    if (match[1]) segments.push({ text: match[2], bold: true })
    else if (match[3] !== undefined) segments.push({ text: match[3], code: true })
    else if (match[4]) segments.push({ text: match[4], link: match[5] })
    else segments.push({ text: match[7], italic: true })
    last = match.index + match[0].length
  }
  if (last < source.length) segments.push({ text: source.slice(last) })
  return segments
}

// Splits styled segments at term hits; a hit across two segments is dropped.
function termRuns(segments) {
  let offset = 0
  const placed = segments.map((segment) => {
    const item = { ...segment, start: offset, end: offset + segment.text.length }
    offset = item.end
    return item
  })
  const plain = placed.map((segment) => segment.text).join('')
  const blocked = placed.filter((segment) => segment.code || segment.link)
  const hits = termHits(plain, blocked).filter((hit) =>
    placed.some((segment) => hit.start >= segment.start && hit.end <= segment.end))
  const runs = []
  for (const segment of placed) {
    const style = { bold: segment.bold, italic: segment.italic, code: segment.code, link: segment.link }
    let cursor = segment.start
    for (const hit of hits.filter((item) => item.start >= segment.start && item.end <= segment.end)) {
      if (hit.start > cursor) runs.push({ text: plain.slice(cursor, hit.start), style })
      runs.push({ text: plain.slice(hit.start, hit.end), style, concept: hit.concept })
      cursor = hit.end
    }
    if (cursor < segment.end) runs.push({ text: plain.slice(cursor, segment.end), style })
  }
  return { runs, hitCount: hits.length }
}

// Greedy word wrap; a term stays whole so its hover box never splits.
function wrapRuns(runs, width) {
  const atoms = []
  for (const run of runs) {
    if (run.concept || run.style?.link) { atoms.push({ ...run, width: textWidth(run.text) }); continue }
    for (const part of run.text.split(/(\s+)/)) {
      if (part) atoms.push({ text: part, style: run.style, space: /^\s/.test(part), width: textWidth(part) })
    }
  }
  const lines = [[]]
  let used = 0
  const breakLine = () => {
    const line = lines.at(-1)
    while (line.length && line.at(-1).space) line.pop()
    lines.push([])
    used = 0
  }
  for (const atom of atoms) {
    if (atom.space) {
      if (used === 0) continue
      if (used + atom.width > width) { breakLine(); continue }
    } else if (used > 0 && used + atom.width > width) breakLine()
    if (!atom.concept && atom.width > width) {
      let chunk = ''
      for (const char of atom.text) {
        if (used + textWidth(chunk + char) > width) {
          lines.at(-1).push({ ...atom, text: chunk, col: used })
          breakLine()
          chunk = ''
        }
        chunk += char
      }
      atom.text = chunk
      atom.width = textWidth(chunk)
    }
    lines.at(-1).push({ ...atom, col: used })
    used += atom.width
  }
  return lines.filter((line, index) => line.length || index === 0)
}

function wrappedRowCount(text, width) {
  return wrapRuns([{ text, style: {} }], width).length
}

function textStyle(style) {
  return {
    ...(style.bold ? { bold: true } : {}),
    ...(style.italic ? { italic: true } : {}),
    ...(style.code ? { color: 'permission' } : {}),
  }
}

// A term reads as a link at rest and lights up while its box is hovered.
const TERM_STYLE = { color: 'suggestion', underline: true, hover: { bold: true, inverse: true } }

function hoverCard(elements, concept, col, width) {
  const { Box, Text } = elements
  const hint = concept.summary
  const cardWidth = Math.max(12, Math.min(60, width, textWidth(hint) + 4))
  const rows = wrappedRowCount(hint, cardWidth - 4) + 2
  return Box({
    position: 'absolute', top: -rows, left: Math.min(0, width - col - cardWidth),
    width: cardWidth, display: 'none', hover: { display: 'flex' },
    borderStyle: 'round', paddingX: 1,
    children: [Text({ children: [hint] })],
  })
}

function unitRows(elements, unit, width, keyBase, open) {
  const { Box, Text, Button, Markdown } = elements
  const prefix = unit.kind === 'item'
    ? `${' '.repeat(unit.indent)}${/\d/.test(unit.marker) ? unit.marker : '-'} `
    : ''
  const contentWidth = Math.max(10, width - textWidth(prefix))
  const segments = inlineSegments(unit.text)
    .map((segment) => unit.kind === 'heading' ? { ...segment, bold: true } : segment)
  const { runs } = termRuns(segments)
  return wrapRuns(runs, contentWidth).map((line, lineIndex) => {
    const pieces = []
    for (const atom of line) {
      const previous = pieces.at(-1)
      if (!atom.concept && previous && !previous.concept
        && JSON.stringify(previous.style) === JSON.stringify(atom.style)) previous.text += atom.text
      else pieces.push({ ...atom })
    }
    const children = pieces.map((piece, index) => {
      if (!piece.concept) {
        if (piece.style?.link) {
          const label = piece.text.replace(/([\\[\]])/g, '\\$1')
          const href = piece.style.link.replace(/[()\\]/g, '\\$&')
          return Markdown({ text: `[${label}](${href})` })
        }
        return Text({ ...textStyle(piece.style), children: [piece.text] })
      }
      const key = `${keyBase}-${lineIndex}-${index}`
      return Box({
        key, position: 'relative',
        children: [
          Button({
            key: `inline-${key}`, plain: true,
            onPress: () => open(piece.concept.id),
            children: [Text({ ...textStyle(piece.style), ...TERM_STYLE, children: [piece.text] })],
          }),
          hoverCard(elements, piece.concept, piece.col, contentWidth),
        ],
      })
    })
    return Box({
      flexDirection: 'row',
      children: [Text({ children: [lineIndex === 0 ? prefix : ' '.repeat(textWidth(prefix))] }), ...children],
    })
  })
}

// Prose lines holding a term are laid out here; every other line stays one
// native Markdown block, so code, tables and plain paragraphs draw as before.
function hoverTree(elements, e, open) {
  const { Box, Text, Markdown } = elements
  const width = Math.max(20, (e.viewport?.columns || 80) - 2)
  const items = []
  let gap = false
  let inlineTerms = 0
  for (const unit of parseUnits(e.props.text)) {
    if (unit.kind === 'blank') { gap = items.length > 0; continue }
    let own = false
    if (unit.kind !== 'raw' && inlineTerms < MAX_INLINE_TERMS) {
      const { hitCount } = termRuns(inlineSegments(unit.text))
      if (hitCount) { own = true; inlineTerms += hitCount }
    }
    const last = items.at(-1)
    if (own) items.push({ unit, gap })
    else if (last && last.lines) last.lines.push(...(gap ? [''] : []), ...unit.raw)
    else items.push({ lines: [...unit.raw], gap })
    gap = false
  }
  if (!items.some((item) => item.unit)) return null
  const blocks = items.map((item, index) => Box({
    flexDirection: 'column', marginTop: item.gap ? 1 : 0,
    children: item.unit
      ? unitRows(elements, item.unit, width, `tb-${e.requestId}-${index}`, open)
      : [Markdown({ text: item.lines.join('\n') })],
  }))
  return Box({
    flexDirection: 'row',
    children: [
      Text({ children: [e.props.isFirstOfReply ? '● ' : '  '] }),
      Box({ flexDirection: 'column', width, children: blocks }),
    ],
  })
}

function conceptHref(id) {
  return `file:///${repoRoot.replace(/^\/+/, '')}/concepts/${id}/${locale}.md`
}

function conceptFromHref(href) {
  return href.match(/\/concepts\/([^/]+)\/(?:vi|en)\.md$/)?.[1]
}

// Turns the first mention of each concept into a link, outside code and links.
function linkify(text) {
  const seen = new Set()
  const hrefs = []
  let fence = null
  const lines = text.split('\n').map((line) => {
    const opener = line.match(/^\s*(```|~~~)/)
    if (fence) { if (line.trimStart().startsWith(fence)) fence = null; return line }
    if (opener) { fence = opener[1]; return line }
    const blocked = [...line.matchAll(/`[^`\n]+`|\[[^\]\n]*\]\([^)\n]*\)|https?:\/\/\S+/g)]
      .map((match) => ({ start: match.index, end: match.index + match[0].length }))
    let result = line
    const hits = termHits(line, blocked).filter((hit) => {
      if (seen.has(hit.concept.id)) return false
      seen.add(hit.concept.id)
      return true
    })
    for (const hit of hits.reverse()) {
      const href = conceptHref(hit.concept.id)
      hrefs.push(href)
      result = `${result.slice(0, hit.start)}[${result.slice(hit.start, hit.end)}](${href})${result.slice(hit.end)}`
    }
    return result
  })
  return { text: lines.join('\n'), hrefs }
}

function canRenderInline(text, columns) {
  const available = Math.min(90, (columns || 80) - 12)
  return available > 0 && text.length <= available && !/[\r\n\t`*_#\[\]<>|]/.test(text)
    && !/https?:\/\//i.test(text)
}

function forwardSpans(text) {
  if (!trieMatcher) return []
  return trieMatcher.forwardSpans(text, MAX_BADGES)
}

function reverseSpans(text, hints) {
  if (!ensureReverse()) return []
  return reverseMatcher.reverseSpans(text, hints, MAX_BADGES)
}

function inlineTree(elements, text, spans, requestId, prefix, hintFor, openConcept) {
  const { Box, Text, Button } = elements
  const row = [Text({ children: [prefix] })]
  let cursor = 0
  for (const [index, span] of spans.entries()) {
    if (span.start > cursor) row.push(Text({ children: [text.slice(cursor, span.start)] }))
    const scope = `tb-${String(requestId).slice(-36)}-${index}`
    row.push(Box({
      key: scope, position: 'relative', hover: { scope },
      children: [
        Button({
          key: `inline-${requestId}-${index}`,
          label: text.slice(span.start, span.end), plain: true,
          onPress: () => openConcept(span.concept.id),
        }),
        Box({
          position: 'absolute', top: -3, left: 0,
          display: 'none', hover: { scope, display: 'flex' },
          borderStyle: 'round', paddingX: 1,
          children: [Text({ children: [hintFor(span.concept)] })],
        }),
      ],
    }))
    cursor = span.end
  }
  if (cursor < text.length) row.push(Text({ children: [text.slice(cursor)] }))
  return Box({ flexDirection: 'row', children: row })
}

// Pane search: the pack indexes (standard), exact lookup (lite), or the
// bundled trigram index. Results are cached for the current query.
async function paneSearch(input) {
  const text = input.trim()
  const key = `${locale}|${text}`
  if (paneResults.key === key) return paneResults.results
  let results = []
  if (!text) results = []
  else if (!packs) results = lookupIndex?.search(text, 5) || []
  else {
    try {
      const lite = packs.ctx.plan.profile === 'lite'
      const hits = await packs.io.run(() => lite
        ? packs.store.lookup(text, { locale })
        : packs.store.find(text, { locale, limit: 5 }))
      results = hits.map((hit) => conceptsById.get(hit.id) || hit)
    } catch {
      results = []
    }
  }
  paneResults = { key, results }
  return results
}

// The reverse matcher is the slowest index to build, and only a reply needs
// it: it is built right after session.start, or by the first reply before that.
function ensureReverse() {
  if (!reverseMatcher && reverseSource) {
    reverseMatcher = createReverseMatcher(reverseSource)
    reverseSource = null
  }
  return reverseMatcher
}

function warmReverse($) {
  try {
    $.clock.after(0, () => ensureReverse())
  } catch {
    // Without a clock the first reply builds it.
  }
}

function statusText() {
  if (!packs) {
    return [
      'Termbridge: dữ liệu đóng kèm plugin (data/*.json) / bundled plugin data',
      ...notices.map((notice) => `  ⚠ ${notice}`),
    ].join('\n')
  }
  const { ctx } = packs
  const total = ctx.plan.packs.reduce((sum, item) => sum + item.pack.concepts, 0)
  const lines = [
    `Termbridge: project ${ctx.projectDir || '(none)'} · profile ${ctx.plan.profile} · ${ctx.plan.packs.length} gói / packs · ${total} khái niệm / concepts · ~${ctx.plan.estimateMB.toFixed(1)} MB${ctx.plan.limitMB ? ` / ${ctx.plan.limitMB} MB` : ''}`,
    ...ctx.plan.packs.map(({ pack, tiers }) =>
      `  ${pack.id}@${pack.version} (${pack.sourceId === 'store' ? 'store' : 'dev'}) terms=${tiers.terms} cards=${tiers.cards} search=${tiers.search} explanations=${tiers.explanations}`),
    ...ctx.plan.dropped.map((pack) => `  ${pack.id}: bỏ do giới hạn / dropped by limits`),
    ...notices.map((notice) => `  ⚠ ${notice}`),
  ]
  return lines.join('\n')
}

function reverseHints(text) {
  if (!ensureReverse()) return []
  return reverseMatcher.reverseHints(text, MAX_BADGES)
}

// Explanations load when a concept is opened, never before (lazy tier).
async function explanationFor($, id) {
  if (!packs) {
    await ensureExplanations($, locale)
    return explanations.get(id)
  }
  const key = `${locale}|${id}`
  if (!explanationCache.has(key)) {
    try {
      const record = await packs.io.run(() => packs.store.explanation(id, locale))
      explanationCache.set(key, record?.entry?.content || '')
    } catch {
      explanationCache.set(key, '')
    }
  }
  return explanationCache.get(key)
}

async function ensureExplanations($, loc) {
  if (localized[loc] && localized[loc].explanations) {
    explanations = localized[loc].explanations
    return
  }
  try {
    const raw = await $.fs.read(`${$.plugin.root}/data/concepts-${loc}.json`)
    const parsed = JSON.parse(raw)
    const map = new Map(parsed.map((item) => [item.id, item.content]))
    if (localized[loc]) localized[loc].explanations = map
    if (locale === loc) explanations = map
  } catch {
    if (localized[loc]) localized[loc].explanations = new Map()
    if (locale === loc) explanations = new Map()
  }
}

async function homeDir($) {
  const read = async (get) => { try { return await get() } catch { return undefined } }
  const explicit = await read(() => $.env.get('TERMBRIDGE_HOME'))
  if (explicit) return explicit.replace(/\\/g, '/')
  const home = (await read(() => $.env.get('HOME'))) || (await read(() => $.env.get('USERPROFILE'))) || ''
  return `${home.replace(/\\/g, '/').replace(/\/+$/, '')}/.termbridge`
}

function projectFs($) {
  return {
    async read(path) {
      try {
        const text = await $.fs.read(path)
        return typeof text === 'string' ? text : null
      } catch {
        return null
      }
    },
    async exists(path) {
      try { return (await $.fs.exists(path)) === true } catch { return false }
    },
    async list(path) {
      try {
        const entries = await $.fs.list(path)
        return Array.isArray(entries) ? entries.filter((entry) => entry.kind === 'dir').map((entry) => entry.name) : []
      } catch {
        return []
      }
    },
    async mtime(path) {
      try { return (await $.fs.stat(path)).mtimeMs } catch { return null }
    },
  }
}

async function loadPackLocale(loc) {
  if (localized[loc]) return true
  if (!packs) return false
  const seen = new Set()
  // A concept in several packs (the starter repeats others): first pack wins.
  const cards = (await packs.io.run(() => packs.ids.flatMap((id) => packs.store.cards(id, loc))))
    .filter((card) => !seen.has(card.id) && seen.add(card.id))
  localized[loc] = { concepts: cards, explanations: null }
  return true
}

// Resolves the project's packs (config layers from the session's cwd, the
// store, dev builds) and loads terms of both locales plus the active cards.
async function loadPacks($) {
  const fsAdapter = projectFs($)
  const sessionConfig = {}
  if (sessionPacks) Object.assign(sessionConfig, { packsReset: true, packs: sessionPacks })
  if (sessionProfile) sessionConfig.profile = sessionProfile
  const home = await homeDir($)
  const open = (session) => openProject(fsAdapter, {
    cwd: sessionCwd,
    home,
    surface: 'mod',
    locale,
    session,
    configHash: searchConfigHash(),
  })
  let ctx = await open(Object.keys(sessionConfig).length ? { source: '/termbridge', config: sessionConfig } : undefined)
  notices = ctx.notices
  if (ctx.plan.packs.length === 0) {
    // No project or store packs: the starter pack the plugin ships (3.9).
    const bundled = `${String($.plugin.root).replace(/\\/g, '/').replace(/\/+$/, '')}/data/starter`
    ctx = await open({ source: 'plugin', config: { ...sessionConfig, packsReset: true, packs: [`dev:${bundled}`] } })
    notices = [...notices, ...ctx.notices.filter((notice) => !notices.includes(notice))]
  }
  if (ctx.plan.packs.length === 0) return false
  const io = new PrefetchIO((path) => fsAdapter.read(path))
  const store = new PackStore(io, (message) => { if (!notices.includes(message)) notices.push(message) }, {
    manifest: ctx.manifest,
    disabled: ctx.disabled,
    overlay: ctx.overlay,
  })
  const ids = ctx.plan.packs.map((item) => item.pack.id)
  const bases = ctx.plan.packs.map((item) => item.pack.path.replace(/\/pack\.json$/, ''))
  await io.prefetch([
    ...ctx.plan.packs.map((item) => item.pack.path),
    ...bases.flatMap((base) => [...LOCALES.map((loc) => `${base}/${loc}/terms.json`), `${base}/${locale}/cards.json`]),
  ])
  packs = { ctx, store, io, ids }
  localized = {}
  explanationCache.clear()
  paneResults = { key: '', results: [] }
  const termList = await io.run(() => LOCALES.flatMap((loc) => ids.flatMap((id) => store.terms(id, loc))))
  await loadPackLocale(locale)
  const byId = new Map(localized[locale].concepts.map((card) => [card.id, card]))
  terms = mergeTerms(termList, (id) => byId.get(id))
    .sort((a, b) => b.key.length - a.key.length)
  selectLocale(locale)
  for (const notice of notices) $.ui.log(notice)
  return true
}

async function loadData($) {
  packs = null
  try {
    if (await loadPacks($)) return warmReverse($)
  } catch (error) {
    packs = null
    $.ui.log(`Termbridge: không đọc được gói, dùng dữ liệu đóng kèm / cannot read packs, using bundled data (${error?.message || error})`)
  }
  await loadBundled($)
  warmReverse($)
}

async function loadBundled($) {
  try {
    const [viTerms, enTerms, viConcepts, enConcepts] = await Promise.all([
      $.fs.read(`${$.plugin.root}/data/terms-vi.json`),
      $.fs.read(`${$.plugin.root}/data/terms-en.json`),
      $.fs.read(`${$.plugin.root}/data/search-vi.json`),
      $.fs.read(`${$.plugin.root}/data/search-en.json`),
    ])
    localized = {
      vi: {
        concepts: JSON.parse(viConcepts),
        explanations: null,
      },
      en: {
        concepts: JSON.parse(enConcepts),
        explanations: null,
      },
    }
    const grouped = new Map()
    for (const term of [...JSON.parse(viTerms), ...JSON.parse(enTerms)]) {
      const key = term.key.normalize('NFC').toLowerCase()
      if (!grouped.has(key)) grouped.set(key, { ...term, concepts: [...term.concepts] })
      else {
        const current = grouped.get(key)
        current.autolink &&= term.autolink
        if (term.match === 'exact-case') current.match = 'exact-case'
        for (const concept of term.concepts) {
          if (!current.concepts.some((item) => item.id === concept.id)) current.concepts.push(concept)
        }
      }
    }
    terms = [...grouped.values()].sort((a, b) => b.key.length - a.key.length)
    selectLocale(locale)
  } catch {
    terms = []
    concepts = []
    lookupIndex = null
    explanations = new Map()
    localized = {}
    $.ui.log('Termbridge: run pnpm tb build to generate mod lookup data')
  }
}

export function register(on) {
  on('session.start', async ($, e, next) => {
    mode = 'hover'
    locale = 'vi'
    // D11: the project is the directory the session was started in.
    sessionCwd = String(e.cwd || '').replace(/\\/g, '/')
    sessionPacks = null
    sessionProfile = null
    try {
      const saved = await $.store.get('locale')
      if (LOCALES.includes(saved)) locale = saved
    } catch {}
    await loadData($)
    repoRoot = String($.plugin.root).replace(/\\/g, '/').replace(/\/+$/, '').replace(/\/packages\/claude-mod$/, '')
    try {
      const saved = await $.store.get('mode')
      if (MODES.includes(saved)) mode = saved
    } catch {}
    if (!selectLocale(locale)) selectLocale('vi')
    await $.command.register({
      name: 'termbridge',
      description: 'Tra thuật ngữ; /termbridge lang vi|en; mode hover|links|badges; packs <id,...>|all; profile lite|standard|semantic; status',
    })
    return next(e)
  })

  on('command.run', { command: 'termbridge' }, async ($, e) => {
    const [verb, value] = e.args.trim().split(/\s+/)
    if (verb === 'status') return { text: statusText() }
    if (verb === 'packs') {
      if (!value) return { text: statusText() }
      sessionPacks = value === 'all' ? null : value.split(',').map((item) => item.trim()).filter(Boolean)
      await loadData($)
      selectedId = null
      query = ''
      $.ui.invalidate('ui.render')
      return { text: statusText() }
    }
    if (verb === 'profile') {
      if (!PROFILES.includes(value)) return { text: `Termbridge: profile hiện tại là ${packs?.ctx.plan.profile || 'standard'} (lite, standard, semantic)` }
      sessionProfile = value
      await loadData($)
      $.ui.invalidate('ui.render')
      return { text: statusText() }
    }
    if (verb === 'lang' || verb === 'language') {
      if (!LOCALES.includes(value)) return { text: `Termbridge: ngôn ngữ hiện tại là ${locale} (vi, en)` }
      try { await loadPackLocale(value) } catch {}
      if (!selectLocale(value)) return { text: 'Termbridge: thiếu dữ liệu ngôn ngữ; chạy pnpm build rồi nạp lại mod.' }
      selectedId = null
      query = ''
      try { await $.store.set('locale', locale) } catch {}
      $.ui.invalidate('ui.render')
      return { text: locale === 'vi' ? 'Termbridge: đã chuyển sang tiếng Việt' : 'Termbridge: switched to English' }
    }
    if (verb === 'mode') {
      if (!MODES.includes(value)) return { text: `Termbridge: chế độ hiện tại là ${mode} (hover, links, badges)` }
      mode = value
      try { await $.store.set('mode', mode) } catch {}
      $.ui.invalidate('ui.render')
      return { text: `Termbridge: chuyển sang chế độ ${mode}` }
    }
    selectedId = null
    query = ''
    await $.ui.open({ id: PANE_ID, title: 'Termbridge', focus: true, closeOnEscape: true })
    return {}
  })

  on('ui.render', { component: 'AssistantMessage' }, async ($, e, next) => {
    if (e.props.isSummary) return next(e)
    const matches = matchedConcepts(e.props.text, e.requestId)
    if (matches.length === 0) return next(e)
    const openConcept = async (id) => {
      selectedId = id
      query = ''
      await $.ui.open({ id: PANE_ID, title: 'Termbridge', focus: true, closeOnEscape: true })
      $.ui.invalidate('ui.render')
    }
    if (mode === 'hover') {
      const tree = hoverTree($.ui.resolve(e), e, openConcept)
      if (tree) return tree
    }
    if (mode === 'links') {
      const { Box, Text, Markdown } = $.ui.resolve(e)
      const { text, hrefs } = linkify(e.props.text)
      if (hrefs.length) {
        return Box({
          flexDirection: 'row',
          children: [
            Text({ children: [e.props.isFirstOfReply ? '● ' : '  '] }),
            Box({
              flexDirection: 'column', width: Math.max(20, (e.viewport?.columns || 80) - 2),
              children: [Markdown({
                key: `links-${e.requestId}`, text, pressableLinks: hrefs,
                onLinkPress: (link) => {
                  const id = conceptFromHref(link.href)
                  if (id) openConcept(id)
                },
              })],
            }),
          ],
        })
      }
    }
    if (mode === 'badges' && canRenderInline(e.props.text, e.viewport?.columns)) {
      const spans = forwardSpans(e.props.text)
      if (spans.length) {
        const elements = $.ui.resolve(e)
        return inlineTree(
          elements, e.props.text, spans, e.requestId,
          e.props.isFirstOfReply ? '● ' : '  ',
          (concept) => concept.summary,
          async (id) => {
            selectedId = id
            query = ''
            await $.ui.open({ id: PANE_ID, title: 'Termbridge', focus: true, closeOnEscape: true })
            $.ui.invalidate('ui.render')
          },
        )
      }
    }
    const original = await next(e)
    const { Box, Text, Button } = $.ui.resolve(e)
    const badges = matches.map((concept, index) =>
      Box({
        key: `term-${e.requestId}-${index}`,
        position: 'relative',
        children: [
          Button({
            key: `open-${e.requestId}-${index}`,
            label: concept.label,
            plain: true,
            onPress: async () => {
              selectedId = concept.id
              query = ''
              await $.ui.open({ id: PANE_ID, title: 'Termbridge', focus: true, closeOnEscape: true })
              $.ui.invalidate('ui.render')
            },
          }),
          Box({
            position: 'absolute', top: -3, left: 0, display: 'none',
            hover: { display: 'flex' }, borderStyle: 'round', paddingX: 1,
            children: [Text({ children: [concept.summary] })],
          }),
        ],
      })
    )
    return Box({
      flexDirection: 'column',
      children: [original, Box({ flexDirection: 'row', columnGap: 2, children: badges })],
    })
  })

  on('ui.render', { component: 'UserMessage' }, async ($, e, next) => {
    if (e.props.origin.kind !== 'composer') return next(e)
    const hints = reverseHints(e.props.text)
    if (hints.length === 0) return next(e)
    if (e.props.isExpanded && canRenderInline(e.props.text, e.viewport?.columns)) {
      const spans = reverseSpans(e.props.text, hints)
      if (spans.length) {
        const elements = $.ui.resolve(e)
        return inlineTree(
          elements, e.props.text, spans, e.requestId,
          '> ',
          (concept) => `${concept.label}: ${concept.summary}`,
          async (id) => {
            selectedId = id
            query = ''
            await $.ui.open({ id: PANE_ID, title: 'Termbridge', focus: true, closeOnEscape: true })
            $.ui.invalidate('ui.render')
          },
        )
      }
    }
    const original = await next(e)
    const { Box, Text, Button } = $.ui.resolve(e)
    return Box({
      flexDirection: 'column',
      children: [
        original,
        Box({
          flexDirection: 'row', columnGap: 2,
          children: hints.map((concept, index) => Box({
            key: `reverse-${e.requestId}-${index}`, position: 'relative',
            children: [
              Button({
                key: `reverse-open-${e.requestId}-${index}`,
                label: `→ ${concept.label}`, plain: true,
                onPress: async () => {
                  selectedId = concept.id
                  query = ''
                  await $.ui.open({ id: PANE_ID, title: 'Termbridge', focus: true, closeOnEscape: true })
                  $.ui.invalidate('ui.render')
                },
              }),
              Box({
                position: 'absolute', top: -3, left: 0, display: 'none',
                hover: { display: 'flex' }, borderStyle: 'round', paddingX: 1,
                children: [Text({ children: [concept.summary] })],
              }),
            ],
          })),
        }),
      ],
    })
  })

  on('ui.render', { component: 'Pane' }, async ($, e, next) => {
    if (e.requestId !== PANE_ID) return next(e)
    const { Box, Text, Button, Input, Markdown } = $.ui.resolve(e)
    const strings = UI_TEXT[locale]
    const results = await paneSearch(query)
    if (selectFirstResult) {
      selectedId = results[0]?.id || null
      selectFirstResult = false
    }
    const selected = conceptsById.get(selectedId)
    const explanation = selected ? await explanationFor($, selected.id) : ''
    const redraw = () => $.ui.invalidate('ui.render')
    const resultRows = results.map((concept, index) =>
      Box({
        key: `result-${index}`,
        position: 'relative',
        children: [
          Button({
            key: `select-${index}`,
            label: `${concept.label}${concept.qualifier ? ` ${concept.qualifier}` : ''}`,
            plain: true,
            onPress: () => { selectedId = concept.id; redraw() },
          }),
          Box({
            position: 'absolute', top: -3, left: 0, display: 'none',
            hover: { display: 'flex' }, borderStyle: 'round', paddingX: 1,
            children: [Text({ children: [concept.summary] })],
          }),
        ],
      })
    )
    return Box({
      flexDirection: 'column',
      children: [
        Text({ bold: true, children: [strings.searchTitle] }),
        Input({
          key: 'termbridge-query', label: strings.description, value: query,
          placeholder: strings.placeholder,
          onInput: (value) => { query = value; selectedId = null; redraw() },
          onSubmit: (value) => { query = value; selectedId = null; selectFirstResult = true; redraw() },
        }),
        ...resultRows,
        selected
          ? Box({ flexDirection: 'column', children: [
              Text({ children: [' '] }),
              Text({ bold: true, children: [`${selected.label}${selected.qualifier ? ` ${selected.qualifier}` : ''}`] }),
              Text({ children: [selected.summary] }),
              Text({ dimColor: true, children: [`${selected.domains.join(', ')} · ${selected.status || 'draft'}`] }),
              Button({
                key: 'insert-term', label: strings.insert,
                onPress: async () => { await $.prompt.fill({ text: selected.label, mode: 'insert' }) },
              }),
              ...(explanation
                ? [Markdown({ text: explanation.slice(0, 10000) })]
                : []),
            ] })
          : Text({ dimColor: true, children: [query ? strings.choose : strings.hint] }),
      ],
    })
  })
}
