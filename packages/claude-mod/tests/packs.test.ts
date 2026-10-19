import { expect, test } from 'claude-code/testing'

// T-P7: the mod resolves the project's packs from the session's cwd (D11) over
// a fake file system: /work/.omnilex/config.yaml points at /work/dist.

const LOCALES = ['vi', 'en'] as const

const CONCEPTS: Record<string, Record<(typeof LOCALES)[number], any>> = {
  'compound-interest': {
    vi: {
      label: 'Lãi kép', summary: 'Tiền lãi được cộng vào gốc.', aliases: ['lãi nhập gốc'], loanwords: ['compound interest'],
      plain_descriptions: ['tiền lãi lại sinh ra lãi'], content: '## Giải thích dễ hiểu\nLãi sinh lãi.',
    },
    en: {
      label: 'Compound Interest', summary: 'Interest earns more interest.', aliases: ['interest on interest'], loanwords: [],
      plain_descriptions: ['money snowballing because earnings get added back to the pile'], content: '## Easy explanation\nInterest earns interest.',
    },
  },
  cookie: {
    vi: {
      label: 'Cookie', summary: 'Tệp nhỏ trình duyệt lưu lại.', aliases: [], loanwords: ['cookie'],
      plain_descriptions: ['mẩu dữ liệu trang web gửi về trình duyệt'], content: '## Giải thích dễ hiểu\nCookie ghi nhớ phiên.',
    },
    en: {
      label: 'Cookie', summary: 'A small file the browser keeps.', aliases: [], loanwords: [],
      plain_descriptions: ['a crumb of data a site leaves in the browser'], content: '## Easy explanation\nCookies remember sessions.',
    },
  },
}

const PACKS = [
  { id: 'finance.personal-finance', concept: 'compound-interest', domain: 'finance/personal-finance/saving' },
  { id: 'it.web', concept: 'cookie', domain: 'it/web/frontend' },
]

function card(id: string, locale: (typeof LOCALES)[number], domain: string) {
  const { content, ...entry } = CONCEPTS[id][locale]
  return { id, qualifier: undefined, ...entry, domains: [domain], alsoIn: [], level: 1, status: 'reviewed' }
}

function buildFiles(): Record<string, string> {
  const files: Record<string, string> = {
    '/work/.omnilex/config.yaml': "root: true\npacks: ['dev:./dist']\n",
  }
  const manifestPacks = []
  for (const pack of PACKS) {
    const base = `/work/dist/packs/${pack.id}`
    const tierFiles: Record<string, any> = {}
    for (const tier of ['terms', 'cards', 'explanations']) tierFiles[tier] = { bytes: 100, files: { vi: { bytes: 50, sha256: '' }, en: { bytes: 50, sha256: '' } } }
    files[`${base}/pack.json`] = JSON.stringify({
      id: pack.id, version: '0.1.0', formatVersion: 1, kind: 'content', title: { en: pack.id }, domains: [pack.domain],
      locales: ['en', 'vi'], requires: {}, concepts: 1, status: { reviewed: 1 }, tiers: tierFiles, license: 'CC-BY-4.0',
    })
    for (const locale of LOCALES) {
      const c = card(pack.concept, locale, pack.domain)
      files[`${base}/${locale}/cards.json`] = JSON.stringify([c])
      files[`${base}/${locale}/terms.json`] = JSON.stringify([
        { key: c.label, match: 'any-case', autolink: true, conceptId: pack.concept },
        ...c.aliases.map((alias: string) => ({ key: alias, match: 'any-case', autolink: true, conceptId: pack.concept })),
      ])
      files[`/work/dist/${locale}/concepts/${pack.concept}.json`] = JSON.stringify({
        id: pack.concept, locale, content_locale: locale,
        metadata: { id: pack.concept, domains: [pack.domain], level: 1, status: 'reviewed' },
        entry: { locale, frontmatter: { label: c.label, summary: c.summary }, content: CONCEPTS[pack.concept][locale].content },
      })
    }
    manifestPacks.push({ id: pack.id, kind: 'content', version: '0.1.0', path: `packs/${pack.id}/pack.json`, sha256: `${pack.id}-sha`, concepts: 1 })
  }
  files['/work/dist/manifest.json'] = JSON.stringify({ formatVersion: 1, searchConfigHash: 'test', locales: ['en', 'vi'], packs: manifestPacks })
  return files
}

// The engine hands hooks absolute native paths (D:\work\... on Windows).
const norm = (value: string) => value.replace(/\\/g, '/').replace(/^[A-Za-z]:/, '')

function setup(on: any, reads: string[] = [], onPrompt?: (value: string) => void, extra: Record<string, string> = {}) {
  const files = { ...buildFiles(), ...extra }
  const dirs = new Set<string>()
  for (const file of Object.keys(files)) {
    let dir = file.slice(0, file.lastIndexOf('/'))
    while (dir) {
      dirs.add(dir)
      dir = dir.slice(0, dir.lastIndexOf('/'))
    }
  }
  on('fs.read', (_: any, e: any) => {
    const file = norm(e.path)
    reads.push(file)
    if (!(file in files)) throw new Error(`ENOENT: ${file}`)
    return { value: files[file] }
  })
  on('fs.exists', (_: any, e: any) => ({ value: norm(e.path) in files || dirs.has(norm(e.path)) }))
  on('fs.list', () => ({ value: [] }))
  on('fs.stat', () => ({ value: { kind: 'file', size: 1, mtimeMs: 1, isLink: false } }))
  on('env.get', (_: any, e: any) => ({ value: e.name === 'OMNILEX_HOME' ? '/home/u/.omnilex' : undefined }))
  on('command.register', () => ({ value: undefined }))
  on('ui.open', () => ({ value: { isPlaced: true } }))
  on('prompt.fill', (_: any, e: any) => {
    onPrompt?.(e.text)
    return { isFilled: true }
  })
  on('session.start', () => ({ cwd: '/work/app' }))
  on('ui.render', () => ({ type: 'Text', props: {}, children: ['original reply'] }))
  return files
}

const PANE_PROPS = {
  title: 'OmniLex', isFocused: true, bodyColumns: 60, placement: 'inline',
  scroll: { offset: 0, bodyRows: 10 }, view: {},
}

test('T-P7: finds the project from the session cwd and reads its packs', async ($, on) => {
  setup(on)
  await $.session.start({ surface: 'terminal', isInteractive: true, cwd: '/work/app' })
  const status = await $.command.run({ command: 'omnilex', args: 'status' })
  expect(status.text).toContain('project /work')
  expect(status.text).toContain('finance.personal-finance@0.1.0 (dev)')
  expect(status.text).toContain('it.web@0.1.0 (dev)')
  expect(status.text).toContain('search=lazy')

  const ui = await $.ui.mount({
    plugin: 'omnilex', surface: 'terminal', component: 'AssistantMessage', requestId: 'reply-pack',
    viewport: { columns: 100, rows: 30 },
    props: { text: 'Lãi kép và Cookie là hai khái niệm.', isFirstOfReply: true },
  })
  expect(await ui.find({ type: 'Text', text: 'Tiền lãi được cộng vào gốc.' })).toBeDefined()
  expect(await ui.find({ type: 'Text', text: 'Tệp nhỏ trình duyệt lưu lại.' })).toBeDefined()
  await ui.unmount()
})

test('T-P7: /omnilex packs narrows the selection for the session, and all restores it', async ($, on) => {
  setup(on)
  await $.session.start({ surface: 'terminal', isInteractive: true, cwd: '/work/app' })
  const narrowed = await $.command.run({ command: 'omnilex', args: 'packs it.web' })
  expect(narrowed.text).toContain('it.web@0.1.0')
  expect(narrowed.text).not.toContain('finance.personal-finance')

  const reply = await $.ui.mount({
    plugin: 'omnilex', surface: 'terminal', component: 'AssistantMessage', requestId: 'reply-narrow',
    viewport: { columns: 100, rows: 30 },
    props: { text: 'Lãi kép và Cookie.', isFirstOfReply: true },
  })
  expect(await reply.find({ type: 'Text', text: 'Tệp nhỏ trình duyệt lưu lại.' })).toBeDefined()
  expect(await reply.find({ type: 'Text', text: 'Tiền lãi được cộng vào gốc.' })).toBeUndefined()
  await reply.unmount()

  const restored = await $.command.run({ command: 'omnilex', args: 'packs all' })
  expect(restored.text).toContain('finance.personal-finance@0.1.0')
})

test('T-P7: /omnilex profile lite turns search and explanations off', async ($, on) => {
  setup(on)
  await $.session.start({ surface: 'terminal', isInteractive: true, cwd: '/work/app' })
  const lite = await $.command.run({ command: 'omnilex', args: 'profile lite' })
  expect(lite.text).toContain('profile lite')
  expect(lite.text).toContain('search=off explanations=off')
  const wrong = await $.command.run({ command: 'omnilex', args: 'profile huge' })
  expect(wrong.text).toContain('lite, standard, semantic')
})

test('T-P7: explanations load lazily, only when a concept is opened', async ($, on) => {
  const reads: string[] = []
  let filled = ''
  setup(on, reads, (value) => { filled = value })
  await $.session.start({ surface: 'terminal', isInteractive: true, cwd: '/work/app' })
  expect(reads.some((file) => file.includes('/concepts/') || file.endsWith('explanations.jsonl'))).toBe(false)

  await $.command.run({ command: 'omnilex', args: '' })
  const pane = await $.ui.mount({ plugin: 'omnilex', surface: 'terminal', component: 'Pane', requestId: 'omnilex-lookup', viewport: { columns: 100, rows: 30 }, props: PANE_PROPS })
  // Typing searches but opens nothing: no explanation is read yet.
  await pane.input({ key: 'omnilex-query', text: 'tiền lãi lại sinh ra lãi', kind: 'change' })
  expect(await pane.find({ key: 'select-0' })).toBeDefined()
  expect(reads.some((file) => file.includes('/concepts/'))).toBe(false)
  // Enter opens the first result, and only then is its explanation read.
  await pane.input({ key: 'omnilex-query', text: 'tiền lãi lại sinh ra lãi' })
  expect(await pane.find({ type: 'Text', text: 'Tiền lãi được cộng vào gốc.' })).toBeDefined()
  await pane.press({ key: 'insert-term' })
  expect(filled).toBe('Lãi kép')
  expect(reads).toContain('/work/dist/vi/concepts/compound-interest.json')
  expect(JSON.stringify(await pane.drawn())).toContain('Lãi sinh lãi.')
  await pane.unmount()
})

test('T-P7: switching locale reloads cards and keeps reverse lookup working', async ($, on) => {
  let filled = ''
  setup(on, [], (value) => { filled = value })
  await $.session.start({ surface: 'terminal', isInteractive: true, cwd: '/work/app' })
  await $.command.run({ command: 'omnilex', args: 'lang en' })
  const reply = await $.ui.mount({
    plugin: 'omnilex', surface: 'terminal', component: 'AssistantMessage', requestId: 'reply-en',
    viewport: { columns: 100, rows: 30 },
    props: { text: 'Lãi kép', isFirstOfReply: true },
  })
  expect(await reply.find({ type: 'Text', text: 'Interest earns more interest.' })).toBeDefined()
  await reply.unmount()

  await $.command.run({ command: 'omnilex', args: '' })
  const pane = await $.ui.mount({ plugin: 'omnilex', surface: 'terminal', component: 'Pane', requestId: 'omnilex-lookup', viewport: { columns: 100, rows: 30 }, props: PANE_PROPS })
  await pane.input({ key: 'omnilex-query', text: 'money snowballing because earnings get added back to the pile' })
  expect(await pane.find({ type: 'Text', text: 'Interest earns more interest.' })).toBeDefined()
  await pane.press({ key: 'insert-term' })
  expect(filled).toBe('Compound Interest')
  await pane.unmount()
})

test('T-P7: without a project or store the bundled data is used', async ($, on) => {
  on('fs.read', (_: any, e: any) => ({ value: JSON.stringify(e.path.endsWith('terms-vi.json') || e.path.endsWith('terms-en.json') ? [] : []) }))
  on('fs.exists', () => ({ value: false }))
  on('env.get', () => ({ value: undefined }))
  on('command.register', () => ({ value: undefined }))
  on('session.start', () => ({ cwd: '/elsewhere' }))
  await $.session.start({ surface: 'terminal', isInteractive: true, cwd: '/elsewhere' })
  const status = await $.command.run({ command: 'omnilex', args: 'status' })
  expect(status.text).toContain('bundled plugin data')
})

test('T-I4: the project overlay hides excluded concepts and adds aliases in the mod', async ($, on) => {
  setup(on, [], undefined, {
    '/work/.omnilex/overrides.yaml': [
      'exclude: [cookie]',
      'concepts:',
      "  compound-interest: { aliases: { vi: ['+lãi mẹ đẻ lãi con'] } }",
      '',
    ].join('\n'),
  })
  await $.session.start({ surface: 'terminal', isInteractive: true, cwd: '/work/app' })
  const ui = await $.ui.mount({
    plugin: 'omnilex', surface: 'terminal', component: 'AssistantMessage', requestId: 'reply-overlay',
    viewport: { columns: 100, rows: 30 },
    props: { text: 'Cookie khác với lãi mẹ đẻ lãi con.', isFirstOfReply: true },
  })
  expect(await ui.find({ type: 'Text', text: 'Tệp nhỏ trình duyệt lưu lại.' })).toBeUndefined()
  expect(await ui.find({ type: 'Text', text: 'Tiền lãi được cộng vào gốc.' })).toBeDefined()
  await ui.unmount()
})
