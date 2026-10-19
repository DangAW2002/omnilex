// bench/run.ts: Performance benchmark runner and budget checker (Table 1.7)
import { generateMockDataset, type MockDataset } from './generate.js';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, sep } from 'node:path';
import { pathToFileURL } from 'node:url';

interface BenchmarkResult {
  size: number;
  modLoadMs: number;
  modDeferredMs: number;
  modFirstScanMs: number;
  modSubsequentScanMs: number;
  cliFindMs: number;
  cliProcessMs: number;
  mcpFindMs: number;
  mcpTypicalMs: number;
  dataSizeMB: number;
  dataSizeBudgetMB: number | null;
  matcherType: 'trie' | 'regex';
  passed: boolean;
  failures: string[];
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function cleanTranscript(text: string) {
  return text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`\n]+`/g, ' ')
    .replace(/https?:\/\/\S+/g, ' ')
    .replace(/\]\([^)]*\)/g, ' ');
}

// Writes the mock dataset as a built dist/ (manifest + packs) with the real
// pack builder, so cold CLI and MCP measurements read the same files as users.
function createBenchRoot(dataset: MockDataset, core: any): string {
  const tempRoot = mkdtempSync(join(tmpdir(), 'omnilex-bench-'));
  mkdirSync(join(tempRoot, 'concepts'), { recursive: true });
  mkdirSync(join(tempRoot, 'taxonomy'), { recursive: true });

  const perLocale: Record<string, any[]> = {};
  const locales = { vi: [dataset.conceptsVi, dataset.termsVi], en: [dataset.conceptsEn, dataset.termsEn] } as const;
  for (const [locale, [concepts, terms]] of Object.entries(locales)) {
    const termsByConcept = new Map<string, any[]>();
    for (const term of terms) {
      for (const concept of term.concepts) {
        const list = termsByConcept.get(concept.id) || [];
        list.push({ key: term.key, match: term.match, autolink: term.autolink, conceptId: concept.id });
        termsByConcept.set(concept.id, list);
      }
    }
    perLocale[locale] = concepts.map((concept) => ({
      card: {
        id: concept.id,
        label: concept.label,
        qualifier: concept.qualifier,
        summary: concept.summary,
        plain_descriptions: concept.plain_descriptions,
        aliases: concept.aliases,
        loanwords: concept.loanwords,
        domains: concept.domains,
        alsoIn: [],
        level: 1,
        status: concept.status,
      },
      terms: termsByConcept.get(concept.id) || [],
      explanation: {
        id: concept.id,
        locale,
        content_locale: locale,
        metadata: { id: concept.id, domains: concept.domains, level: 1, status: concept.status },
        entry: { locale, frontmatter: { label: concept.label, summary: concept.summary }, content: concept.summary },
      },
    }));
  }

  const domainsConfig = core.loadDomainsConfig(resolve('.'));
  const grouped = core.groupPacks(perLocale, domainsConfig, new Map());
  const rendered = core.renderPacks({ version: '0.0.0', locales: Object.keys(locales), content: grouped.content, meta: grouped.meta });
  core.writePackFiles(join(tempRoot, 'dist'), rendered.files);
  return tempRoot;
}

function measureCliProcessStartup(tempRoot: string, home: string): number {
  const cliPath = resolve('packages/cli/dist/index.js');
  const samples: number[] = [];
  for (let i = 0; i < 3; i++) {
    const started = performance.now();
    execFileSync(process.execPath, [cliPath, 'find', 'lợi nhuận'], {
      cwd: tempRoot,
      stdio: 'ignore',
      env: { ...process.env, OMNILEX_HOME: home },
    });
    samples.push(performance.now() - started);
  }
  samples.sort((a, b) => a - b);
  return samples[Math.floor(samples.length / 2)];
}

async function measureColdCliFind(tempRoot: string, home: string, core: any): Promise<number> {
  const wasVitest = process.env.VITEST;
  process.env.VITEST = '1';
  let findAction: (root: string, query: string, options: { locale: string }, deps?: any) => Promise<unknown>;
  try {
    ({ findAction } = await import(pathToFileURL(resolve('packages/cli/dist/index.js')).href));
  } finally {
    if (wasVitest === undefined) delete process.env.VITEST;
    else process.env.VITEST = wasVitest;
  }

  const samples: number[] = [];
  for (let i = 0; i < 3; i++) {
    core.clearSearchIndexCache();
    const started = performance.now();
    await findAction(tempRoot, 'lợi nhuận', { locale: 'vi' }, { cwd: tempRoot, home });
    samples.push(performance.now() - started);
  }
  samples.sort((a, b) => a - b);
  return samples[Math.floor(samples.length / 2)];
}

async function runBenchmarkForSize(size: number, seed = 42): Promise<BenchmarkResult> {
  const dataset: MockDataset = generateMockDataset(size, seed);

  const coreModulePath = resolve('packages/core/dist/index.js');
  const core = await import(pathToFileURL(coreModulePath).href);
  const benchRoot = createBenchRoot(dataset, core);
  const benchHome = join(benchRoot, 'home');
  const distDir = join(benchRoot, 'dist');

  // 1. Mod load, as the mod does it at session.start with profile standard and
  // every pack: parse pack.json, terms of both locales and the active cards,
  // merge the keys and build the trie. The reverse matcher is built right after
  // session.start (measured apart as deferred); search indexes and explanations
  // are lazy. Files are read first, so disk I/O is excluded.
  const runtimeDir = resolve('packages/claude-mod/hooks/runtime');
  const hasTrie = existsSync(join(runtimeDir, 'pack-reader.js')) && existsSync(join(runtimeDir, 'matcher.js'));
  const manifest = JSON.parse(readFileSync(join(distDir, 'manifest.json'), 'utf8'));
  const contentPacks = manifest.packs.filter((pack: any) => pack.kind === 'content');
  const files = new Map<string, string>();
  for (const pack of contentPacks) {
    const base = pack.path.replace(/\/pack\.json$/, '');
    for (const rel of [pack.path, `${base}/vi/terms.json`, `${base}/en/terms.json`, `${base}/vi/cards.json`]) {
      files.set(rel, readFileSync(join(distDir, ...rel.split('/')), 'utf8'));
    }
  }
  const dataSizeMB = [...files.values()].reduce((sum, text) => sum + Buffer.byteLength(text, 'utf8'), 0) / (1024 * 1024);

  let matcherType: 'trie' | 'regex' = 'regex';
  let matcherFn: (text: string) => number = () => 0;
  let firstTermKeys: string[] = [];
  let deferredBuild: () => unknown = () => undefined;

  const tLoad0 = performance.now();
  if (hasTrie) {
    const [{ PackStore }, { mergeTerms }, { createMatcher, createReverseMatcher }] = await Promise.all([
      import(pathToFileURL(join(runtimeDir, 'pack-reader.js')).href),
      import(pathToFileURL(join(runtimeDir, 'pack-format.js')).href),
      import(pathToFileURL(join(runtimeDir, 'matcher.js')).href),
    ]);
    const store = new PackStore({ readText: (rel: string) => files.get(rel) ?? null }, () => {}, { manifest });
    const ids: string[] = store.contentPacks();
    const termList = ['vi', 'en'].flatMap((locale) => ids.flatMap((id) => store.terms(id, locale)));
    const cards = ids.flatMap((id) => store.cards(id, 'vi'));
    const byId = new Map(cards.map((card: any) => [card.id, card]));
    const merged = mergeTerms(termList, (id: string) => byId.get(id))
      .sort((a: any, b: any) => b.key.length - a.key.length);
    const localizedTerms = merged.map((term: any) => ({
      ...term,
      concepts: term.concepts.map((concept: any) => byId.get(concept.id) || concept),
    }));
    const matcher = createMatcher(localizedTerms);
    deferredBuild = () => createReverseMatcher(cards);
    matcherFn = (text: string) => matcher.matchedConcepts(text, 4).length;
    firstTermKeys = termList.slice(0, 2).map((term: any) => term.key);
    matcherType = 'trie';
  } else {
    const terms = dataset.termsVi.filter((term) => term.autolink);
    const matchers = terms.map((term) => ({
      regex: new RegExp(
        `(?<![\\p{L}\\p{N}])${escapeRegex(term.key)}(?![\\p{L}\\p{N}])`,
        term.match === 'exact-case' ? 'gu' : 'giu'
      ),
    }));
    matcherFn = (text: string) => {
      const visible = cleanTranscript(text);
      let count = 0;
      for (const { regex } of matchers) {
        if (visible.search(regex) !== -1) {
          count++;
          if (count >= 4) break;
        }
      }
      return count;
    };
    firstTermKeys = dataset.termsVi.slice(0, 2).map((term) => term.key);
  }
  const tLoad1 = performance.now();
  const modLoadMs = tLoad1 - tLoad0;
  const tDeferred0 = performance.now();
  deferredBuild();
  const modDeferredMs = performance.now() - tDeferred0;

  // 2. Mod first scan on unmatched text
  const unmatchedText = 'Hệ thống cơ sở dữ liệu phân tán sử dụng thuật toán Paxos để đồng thuận giữa các nút mạng mà không cần điều phối viên.';
  const tFirst0 = performance.now();
  matcherFn(unmatchedText);
  const tFirst1 = performance.now();
  const modFirstScanMs = tFirst1 - tFirst0;

  // 3. Mod subsequent scan (warm run)
  const matchedText = `Trong hệ thống, ${firstTermKeys[0] || 'thuật ngữ'} được sử dụng để tối ưu hóa quy trình cùng với ${firstTermKeys[1] || 'khái niệm'}.`;
  const warmRuns: number[] = [];
  for (let i = 0; i < 5; i++) {
    const tSub0 = performance.now();
    matcherFn(matchedText);
    const tSub1 = performance.now();
    warmRuns.push(tSub1 - tSub0);
  }
  const modSubsequentScanMs = warmRuns.reduce((a, b) => a + b, 0) / warmRuns.length;

  // 4. Cold CLI find, including process startup, JSON read, index build and query.
  let cliFindMs: number;
  let cliProcessMs: number;
  let mcpFindMs: number;
  let mcpTypicalMs: number;
  try {
    cliFindMs = await measureColdCliFind(benchRoot, benchHome, core);
    cliProcessMs = measureCliProcessStartup(benchRoot, benchHome);

    // 5. MCP warm search: one PackStore per manifest, as the MCP server keeps it.
    const store = new core.PackStore({
      readText: (relPath: string) => readFileSync(join(distDir, ...relPath.split('/')), 'utf8'),
    });
    store.find('hệ thống', { locale: 'vi' });
    const mcpWarmRuns: number[] = [];
    for (let i = 0; i < 10; i++) {
      const tMcp0 = performance.now();
      store.find('hệ thống', { locale: 'vi' });
      const tMcp1 = performance.now();
      mcpWarmRuns.push(tMcp1 - tMcp0);
    }
    mcpFindMs = mcpWarmRuns.reduce((a, b) => a + b, 0) / mcpWarmRuns.length;

    // Informational: queries like real ones, a label or a plain description,
    // next to the gate's worst case where every concept matches.
    const typical = [
      ...dataset.conceptsVi.slice(0, 5).map((concept) => concept.label),
      ...dataset.conceptsVi.slice(5, 10).map((concept) => concept.plain_descriptions[0]).filter(Boolean),
    ];
    for (const query of typical) store.find(query, { locale: 'vi' });
    const tTypical0 = performance.now();
    for (const query of typical) store.find(query, { locale: 'vi' });
    mcpTypicalMs = (performance.now() - tTypical0) / typical.length;
  } finally {
    const tempBase = resolve(tmpdir()) + sep;
    const target = resolve(benchRoot);
    if (target.startsWith(tempBase)) rmSync(target, { recursive: true, force: true });
  }

  // Ngân sách theo bảng 1.7 (quy đổi tuyến tính cho 1k)
  const isScale1k = size <= 1000;
  const budgetLoadMs = 300;
  const budgetFirstScanMs = matcherType === 'trie' ? (isScale1k ? 10 : 20) : (isScale1k ? 3000 : 15000);
  const budgetSubsequentScanMs = matcherType === 'trie' ? 2 : (isScale1k ? 500 : 2000);
  const budgetCliFindMs = isScale1k ? 100 : 200;
  const budgetMcpFindMs = isScale1k ? 5 : 10;
  // Data the mod reads at start: terms of both locales and the active cards.
  // The 5 MB target is for one lite pack; this run loads every pack, so its 10k
  // size is informative only.
  const budgetDataSizeMB = isScale1k ? 2 : null;

  const failures: string[] = [];
  if (modLoadMs > budgetLoadMs) failures.push(`Mod load time: ${modLoadMs.toFixed(1)}ms > budget ${budgetLoadMs}ms`);
  if (modFirstScanMs > budgetFirstScanMs) failures.push(`Mod first scan: ${modFirstScanMs.toFixed(1)}ms > budget ${budgetFirstScanMs}ms`);
  if (modSubsequentScanMs > budgetSubsequentScanMs) failures.push(`Mod subsequent scan: ${modSubsequentScanMs.toFixed(1)}ms > budget ${budgetSubsequentScanMs}ms`);
  if (cliFindMs > budgetCliFindMs) failures.push(`CLI find cold: ${cliFindMs.toFixed(1)}ms > budget ${budgetCliFindMs}ms`);
  if (mcpFindMs > budgetMcpFindMs) failures.push(`MCP find warm: ${mcpFindMs.toFixed(1)}ms > budget ${budgetMcpFindMs}ms`);
  if (budgetDataSizeMB !== null && dataSizeMB > budgetDataSizeMB) failures.push(`Data size: ${dataSizeMB.toFixed(2)}MB > budget ${budgetDataSizeMB}MB`);

  const passed = failures.length === 0;

  return {
    size,
    modLoadMs,
    modDeferredMs,
    modFirstScanMs,
    modSubsequentScanMs,
    cliFindMs,
    cliProcessMs,
    mcpFindMs,
    mcpTypicalMs,
    dataSizeMB,
    dataSizeBudgetMB: budgetDataSizeMB,
    matcherType,
    passed,
    failures
  };
}

async function main() {
  const args = process.argv.slice(2);
  let sizes = [1000];
  let check = false;
  let seed = 42;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--sizes' && args[i + 1]) {
      sizes = args[i + 1].split(',').map((s) => parseInt(s.trim(), 10)).filter(Boolean);
      i++;
    } else if (args[i] === '--check') {
      check = true;
    } else if (args[i] === '--seed' && args[i + 1]) {
      seed = parseInt(args[i + 1], 10);
      i++;
    }
  }

  console.log(`\n======================================================`);
  console.log(` OmniLex Benchmark Runner (Table 1.7 Scale Budget) `);
  console.log(` Sizes: ${sizes.join(', ')} | Seed: ${seed} | Check: ${check ? 'ON' : 'OFF'}`);
  console.log(`======================================================\n`);

  let allPassed = true;

  for (const size of sizes) {
    console.log(`▶ Running benchmark at scale ${size} concepts...`);
    const result = await runBenchmarkForSize(size, seed);

    console.log(`\nKết quả đo đạc (${size} concepts, matcher: ${result.matcherType}):`);
    console.log(`  - Mod load simulation:       ${result.modLoadMs.toFixed(2)} ms (packs: terms vi+en, cards, trie; excludes disk I/O)`);
    console.log(`  - Mod deferred after start (informational): ${result.modDeferredMs.toFixed(2)} ms (reverse matcher)`);
    console.log(`  - Mod first scan (unmatched): ${result.modFirstScanMs.toFixed(2)} ms`);
    console.log(`  - Mod subsequent scan:        ${result.modSubsequentScanMs.toFixed(2)} ms`);
    console.log(`  - CLI find cold path (read+index+query): ${result.cliFindMs.toFixed(2)} ms`);
    console.log(`  - CLI process cold (informational): ${result.cliProcessMs.toFixed(2)} ms`);
    console.log(`  - MCP find (warm core cache): ${result.mcpFindMs.toFixed(2)} ms (worst case: every concept matches)`);
    console.log(`  - MCP find, typical queries (informational): ${result.mcpTypicalMs.toFixed(2)} ms`);
    console.log(`  - Mod data at start: ${result.dataSizeMB.toFixed(2)} MB${result.dataSizeBudgetMB === null ? ' (no profile-matched 10k budget)' : ` (budget ≤ ${result.dataSizeBudgetMB} MB)`}`);

    if (check && !result.passed) {
      console.error(`\n❌ Scale ${size} FAILED performance budget:`);
      for (const fail of result.failures) {
        console.error(`   - ${fail}`);
      }
      allPassed = false;
    } else if (check) {
      console.log(`✔ Scale ${size} PASSED all performance gates.\n`);
    } else {
      console.log('ℹ Measurements recorded; budgets were not checked. Re-run with --check to evaluate this scale.\n');
    }
  }

  if (check && !allPassed) {
    console.error(`\n❌ Benchmark failed budget check. Exiting with code 1.\n`);
    process.exit(1);
  }

  console.log(`✔ Benchmark completed successfully.\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
