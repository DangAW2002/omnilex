import { expect, test } from 'claude-code/testing'

const concept = {
  id: 'compound-interest', label: 'Lãi kép', qualifier: undefined,
  summary: 'Tiền lãi được cộng vào gốc.', domains: ['finance/saving'], status: 'reviewed',
  aliases: ['lãi nhập gốc'], loanwords: ['compound interest'],
  plain_descriptions: ['tiền lãi lại sinh ra lãi'],
}
const englishConcept = {
  ...concept, label: 'Compound Interest',
  summary: 'Interest earns more interest.',
  aliases: ['interest on interest'], loanwords: [],
  plain_descriptions: ['money snowballing because earnings get added back to the pile'],
}
const term = { key: 'Lãi kép', match: 'any-case', autolink: true, concepts: [concept] }
const englishTerm = { key: 'Compound interest', match: 'any-case', autolink: true, concepts: [englishConcept] }

function setup(on: any, onPrompt?: (value: string) => void) {
  on('fs.read', ($: any, e: any) => ({ value: JSON.stringify(
    e.path.endsWith('terms-vi.json') ? [term] :
    e.path.endsWith('terms-en.json') ? [englishTerm] :
    e.path.endsWith('concepts-vi.json') ? [{ id: concept.id, content: '## Giải thích dễ hiểu\nLãi sinh lãi.' }] :
    e.path.endsWith('concepts-en.json') ? [{ id: concept.id, content: '## Easy explanation\nInterest earns interest.' }] :
    e.path.endsWith('search-en.json') ? [englishConcept] :
    e.path.endsWith('taxonomy.json') ? [{ id: 'finance', labels: { vi: 'Tài chính', en: 'Finance' },
      children: [{ id: 'saving', labels: { vi: 'Tiết kiệm', en: 'Saving' } }] }] :
    [concept]
  ) }))
  on('command.register', () => ({ value: undefined }))
  on('ui.open', () => ({ value: { isPlaced: true } }))
  on('prompt.fill', ($: any, e: any) => {
    onPrompt?.(e.text)
    return { isFilled: true }
  })
  on('session.start', () => ({ cwd: '/work' }))
  on('ui.render', () => ({ type: 'Text', props: {}, children: ['original reply'] }))
}

test('forward lookup puts a hover target on the term in a short plain reply', async ($, on) => {
  setup(on)
  await $.session.start({ surface: 'terminal', isInteractive: true, cwd: '/work' })
  const ui = await $.ui.mount({
    plugin: 'omnilex', surface: 'terminal', component: 'AssistantMessage', requestId: 'reply-1',
    viewport: { columns: 100, rows: 30 },
    props: { text: 'Compound interest means Lãi kép.', isFirstOfReply: true },
  })
  expect(await ui.find({ key: 'inline-tb-reply-1-0-0-0' })).toBeDefined()
  expect(await ui.find({ key: 'inline-tb-reply-1-0-0-2' })).toBeDefined()
  expect(await ui.find({ type: 'Text', text: 'Tiền lãi được cộng vào gốc.' })).toBeDefined()
  await ui.press({ key: 'inline-tb-reply-1-0-0-0' })
  await ui.unmount()
})

test('hover mode lays out prose with terms and leaves code and tables to Markdown', async ($, on) => {
  setup(on)
  await $.session.start({ surface: 'terminal', isInteractive: true, cwd: '/work' })
  await $.command.run({ command: 'termbridge', args: 'mode hover' })
  const ui = await $.ui.mount({
    plugin: 'omnilex', surface: 'terminal', component: 'AssistantMessage', requestId: 'reply-md',
    viewport: { columns: 40, rows: 30 },
    props: {
      text: [
        '**Lãi kép** là cách tính lãi mà tiền lãi được nhập vào gốc mỗi kỳ.',
        '',
        '```js',
        'const laiKep = "Lãi kép"',
        '```',
        '',
        '| Loại | Ghi chú |',
        '|---|---|',
        '| Lãi kép | nhanh |',
        '',
        '- Khác với lãi đơn: Lãi kép tăng nhanh hơn.',
      ].join('\n'),
      isFirstOfReply: true,
    },
  })
  expect(await ui.find({ key: 'inline-tb-reply-md-0-0-0' })).toBeDefined()
  expect(await ui.find({ key: 'inline-tb-reply-md-2-0-1' })).toBeDefined()
  expect(await ui.findAll({ type: 'Button' })).toHaveLength(2)
  const term = await ui.find({ type: 'Text', text: 'Lãi kép' })
  expect(term?.props).toMatchObject({ bold: true, underline: true, color: 'suggestion' })
  expect(await ui.find({ type: 'Markdown', text: /```js[\s\S]*\| Lãi kép \| nhanh \|/ })).toBeDefined()
  await ui.unmount()
})

test('links mode keeps one Markdown block and opens the pane from a term link', async ($, on) => {
  setup(on)
  await $.session.start({ surface: 'terminal', isInteractive: true, cwd: '/work' })
  await $.command.run({ command: 'termbridge', args: 'mode links' })
  const ui = await $.ui.mount({
    plugin: 'omnilex', surface: 'terminal', component: 'AssistantMessage', requestId: 'reply-links',
    viewport: { columns: 100, rows: 30 },
    props: { text: '## Lãi kép\n\nLãi kép khác `Lãi kép` trong code.', isFirstOfReply: true },
  })
  const markdown = await ui.find({ key: 'links-reply-links' })
  expect(markdown).toBeDefined()
  const drawn = JSON.stringify(await ui.drawn())
  expect(drawn.match(/\]\(file:/g)).toHaveLength(1)
  expect(drawn).toContain('`Lãi kép`')
  const href = drawn.match(/\((file:[^)]+)\)/)![1]
  await ui.press({ key: 'links-reply-links', link: { href } })
  await ui.unmount()
})

test('a Markdown reply keeps its native drawing and gets a lookup badge', async ($, on) => {
  setup(on)
  await $.session.start({ surface: 'terminal', isInteractive: true, cwd: '/work' })
  await $.command.run({ command: 'termbridge', args: 'mode badges' })
  const ui = await $.ui.mount({
    plugin: 'omnilex', surface: 'terminal', component: 'AssistantMessage', requestId: 'reply-markdown',
    viewport: { columns: 100, rows: 30 },
    props: { text: '**Lãi kép** tạo thêm lãi.', isFirstOfReply: true },
  })
  expect(await ui.find({ type: 'Text', text: 'original reply' })).toBeDefined()
  expect(await ui.find({ key: 'open-reply-markdown-0' })).toBeDefined()
  await ui.unmount()
})

test('reverse lookup resolves a plain description in the pane', async ($, on) => {
  let filled = ''
  setup(on, (value) => { filled = value })
  await $.session.start({ surface: 'terminal', isInteractive: true, cwd: '/work' })
  await $.command.run({ command: 'termbridge', args: '' })
  const ui = await $.ui.mount({
    plugin: 'omnilex', surface: 'terminal', component: 'Pane', requestId: 'termbridge-lookup',
    viewport: { columns: 100, rows: 30 },
    props: {
      title: 'Termbridge', isFocused: true, bodyColumns: 60, placement: 'inline',
      scroll: { offset: 0, bodyRows: 10 }, view: {},
    },
  })
  await ui.input({ key: 'termbridge-query', text: 'tiền lãi lại sinh ra lãi' })
  expect(await ui.find({ type: 'Text', text: 'Tiền lãi được cộng vào gốc.' })).toBeDefined()
  expect(await ui.find({ key: 'insert-term' })).toBeDefined()
  await ui.press({ key: 'insert-term' })
  expect(filled).toBe('Lãi kép')
  await ui.unmount()
})

test('language command changes hover summaries and reverse lookup to English', async ($, on) => {
  let filled = ''
  setup(on, (value) => { filled = value })
  await $.session.start({ surface: 'terminal', isInteractive: true, cwd: '/work' })
  await $.command.run({ command: 'termbridge', args: 'lang en' })
  const reply = await $.ui.mount({
    plugin: 'omnilex', surface: 'terminal', component: 'AssistantMessage', requestId: 'reply-en',
    viewport: { columns: 100, rows: 30 },
    props: { text: 'Lãi kép', isFirstOfReply: true },
  })
  expect(await reply.find({ type: 'Text', text: 'Interest earns more interest.' })).toBeDefined()
  await reply.unmount()

  await $.command.run({ command: 'termbridge', args: 'mode links' })
  const linked = await $.ui.mount({
    plugin: 'omnilex', surface: 'terminal', component: 'AssistantMessage', requestId: 'reply-en-link',
    viewport: { columns: 100, rows: 30 },
    props: { text: 'Lãi kép', isFirstOfReply: true },
  })
  expect(JSON.stringify(await linked.drawn())).toContain('/en.md')
  await linked.unmount()

  await $.command.run({ command: 'termbridge', args: '' })
  const pane = await $.ui.mount({
    plugin: 'omnilex', surface: 'terminal', component: 'Pane', requestId: 'termbridge-lookup',
    viewport: { columns: 100, rows: 30 },
    props: {
      title: 'Termbridge', isFocused: true, bodyColumns: 60, placement: 'inline',
      scroll: { offset: 0, bodyRows: 10 }, view: {},
    },
  })
  expect(await pane.find({ type: 'Text', text: 'Reverse lookup: describe the idea in plain words' })).toBeDefined()
  await pane.input({ key: 'termbridge-query', text: 'money snowballing because earnings get added back to the pile' })
  expect(await pane.find({ type: 'Text', text: 'Interest earns more interest.' })).toBeDefined()
  await pane.press({ key: 'insert-term' })
  expect(filled).toBe('Compound Interest')
  await pane.unmount()
})

test('a short colloquial user message has a direct hover target', async ($, on) => {
  setup(on)
  await $.session.start({ surface: 'terminal', isInteractive: true, cwd: '/work' })
  const ui = await $.ui.mount({
    plugin: 'omnilex', surface: 'terminal', component: 'UserMessage', requestId: 'prompt-1',
    viewport: { columns: 100, rows: 30 },
    props: { text: 'Tôi muốn hiểu tiền lãi lại sinh ra lãi.', origin: { kind: 'composer' }, isExpanded: true },
  })
  expect(await ui.find({ key: 'inline-prompt-1-0' })).toBeDefined()
  expect(await ui.find({ type: 'Text', text: 'Lãi kép: Tiền lãi được cộng vào gốc.' })).toBeDefined()
  await ui.unmount()
})

test('browse view lists concepts by domain and opens one', async ($, on) => {
  setup(on)
  await $.session.start({ surface: 'terminal', isInteractive: true, cwd: '/work' })
  await $.command.run({ command: 'termbridge', args: 'browse finance/saving' })
  const pane = await $.ui.mount({
    plugin: 'omnilex', surface: 'terminal', component: 'Pane', requestId: 'termbridge-lookup',
    viewport: { columns: 100, rows: 30 },
    props: {
      title: 'Termbridge', isFocused: true, bodyColumns: 60, placement: 'inline',
      scroll: { offset: 0, bodyRows: 10 }, view: {},
    },
  })
  const drawn = JSON.stringify(await pane.drawn())
  expect(drawn).toContain('Tài chính (1)')
  expect(drawn).toContain('Trang 1/1 · 1 khái niệm')
  await pane.select({ key: 'browse-domain', value: '' })
  await pane.press({ key: 'select-0' })
  expect(await pane.find({ key: 'browse-back' })).toBeDefined()
  expect(await pane.find({ type: 'Text', text: 'Tiền lãi được cộng vào gốc.' })).toBeDefined()
  await pane.press({ key: 'browse-back' })
  await pane.press({ key: 'tab-search' })
  expect(await pane.find({ key: 'termbridge-query' })).toBeDefined()
  await pane.unmount()
})
