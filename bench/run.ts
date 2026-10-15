// bench/run.ts: Performance benchmark runner and budget checker (Table 1.7)
import { generateMockDataset, type MockDataset } from './generate.js';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, sep } from 'node:path';
import { pathToFileURL } from 'node:url';

interface BenchmarkResult {
  size: number;
  modLoadMs: number;
  modFirstScanMs: number;
  modSubsequentScanMs: number;
  cliFindMs: number;
  cliProcessMs: number;
  mcpFindMs: number;
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

function createBenchRoot(serializedSearchDocs: string): string {
  const tempRoot = mkdtempSync(join(tmpdir(), 'termbridge-bench-'));
  const conceptsDir = join(tempRoot, 'concepts');
  const taxonomyDir = join(tempRoot, 'taxonomy');
  const searchDir = join(tempRoot, 'dist', 'vi');
  mkdirSync(conceptsDir, { recursive: true });
  mkdirSync(taxonomyDir, { recursive: true });
  mkdirSync(searchDir, { recursive: true });
  writeFileSync(join(searchDir, 'search.json'), serializedSearchDocs, 'utf8');
  return tempRoot;
}

function measureCliProcessStartup(tempRoot: string): number {
  const cliPath = resolve('packages/cli/dist/index.js');
  const samples: number[] = [];
  for (let i = 0; i < 3; i++) {
    const started = performance.now();
    execFileSync(process.execPath, [cliPath, 'find', 'lợi nhuận'], {
      cwd: tempRoot,
      stdio: 'ignore',
    });
    samples.push(performance.now() - started);
  }
  samples.sort((a, b) => a - b);
  return samples[Math.floor(samples.length / 2)];
}

async function measureColdCliFind(tempRoot: string, core: any): Promise<number> {
  const wasVitest = process.env.VITEST;
  process.env.VITEST = '1';
  let findAction: (root: string, query: string, options: { locale: string }) => Promise<unknown>;
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
    await findAction(tempRoot, 'lợi nhuận', { locale: 'vi' });
    samples.push(performance.now() - started);
  }
  samples.sort((a, b) => a - b);
  return samples[Math.floor(samples.length / 2)];
}

async function runBenchmarkForSize(size: number, seed = 42): Promise<BenchmarkResult> {
  const dataset: MockDataset = generateMockDataset(size, seed);

  // The mod reads both locales at startup and builds the active locale indexes.
  const serializedTermsVi = JSON.stringify(dataset.termsVi);
  const serializedTermsEn = JSON.stringify(dataset.termsEn);
  const serializedConceptsVi = JSON.stringify(dataset.conceptsVi);
  const serializedConceptsEn = JSON.stringify(dataset.conceptsEn);

  // 1. Mod load simulation: JSON parse plus active-locale index construction.
  const tLoad0 = performance.now();
  const parsedTermsVi = JSON.parse(serializedTermsVi);
  const parsedTermsEn = JSON.parse(serializedTermsEn);
  const parsedConceptsVi = JSON.parse(serializedConceptsVi);
  JSON.parse(serializedConceptsEn);

  const runtimeTriePath = resolve('packages/claude-mod/hooks/runtime/matcher.js');
  const runtimeLookupPath = resolve('packages/claude-mod/hooks/runtime/lookup.js');
  const hasTrie = existsSync(runtimeTriePath) && existsSync(runtimeLookupPath);

  let matcherType: 'trie' | 'regex' = 'regex';
  let matcherFn: (text: string) => number = () => 0;

  if (hasTrie) {
    try {
      const [{ createMatcher, createReverseMatcher }, { createLookupIndex }] = await Promise.all([
        import(pathToFileURL(runtimeTriePath).href),
        import(pathToFileURL(runtimeLookupPath).href),
      ]);
      const conceptsById = new Map(parsedConceptsVi.map((concept: any) => [concept.id, concept]));
      const grouped = new Map<string, any>();
      for (const term of [...parsedTermsVi, ...parsedTermsEn]) {
        const key = term.key.normalize('NFC').toLowerCase();
        const current = grouped.get(key);
        if (!current) grouped.set(key, { ...term, concepts: [...term.concepts] });
        else {
          current.autolink &&= term.autolink;
          if (term.match === 'exact-case') current.match = 'exact-case';
          for (const concept of term.concepts) {
            if (!current.concepts.some((item: any) => item.id === concept.id)) current.concepts.push(concept);
          }
        }
      }
      const localizedTerms = [...grouped.values()].map((term) => ({
        ...term,
        concepts: term.concepts.map((concept: any) => conceptsById.get(concept.id) || concept),
      }));
      const matcher = createMatcher(localizedTerms);
      createReverseMatcher(parsedConceptsVi);
      createLookupIndex(parsedConceptsVi);
      matcherFn = (text: string) => matcher.matchedConcepts(text, 4).length;
      matcherType = 'trie';
    } catch {
      matcherType = 'regex';
    }
  }

  if (matcherType === 'regex') {
    const matchers = parsedTermsVi
      .filter((term: any) => term.autolink)
      .map((term: any) => ({
        regex: new RegExp(
          `(?<![\\p{L}\\p{N}])${escapeRegex(term.key)}(?![\\p{L}\\p{N}])`,
          term.match === 'exact-case' ? 'gu' : 'giu'
        ),
        concept: term.concepts[0]
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
  }

  const tLoad1 = performance.now();
  const modLoadMs = tLoad1 - tLoad0;

  // 2. Mod first scan on unmatched text
  const unmatchedText = 'Hệ thống cơ sở dữ liệu phân tán sử dụng thuật toán Paxos để đồng thuận giữa các nút mạng mà không cần điều phối viên.';
  const tFirst0 = performance.now();
  matcherFn(unmatchedText);
  const tFirst1 = performance.now();
  const modFirstScanMs = tFirst1 - tFirst0;

  // 3. Mod subsequent scan (warm run)
  const matchedText = `Trong hệ thống, ${parsedTermsVi[0]?.key || 'thuật ngữ'} được sử dụng để tối ưu hóa quy trình cùng với ${parsedTermsVi[1]?.key || 'khái niệm'}.`;
  const warmRuns: number[] = [];
  for (let i = 0; i < 5; i++) {
    const tSub0 = performance.now();
    matcherFn(matchedText);
    const tSub1 = performance.now();
    warmRuns.push(tSub1 - tSub0);
  }
  const modSubsequentScanMs = warmRuns.reduce((a, b) => a + b, 0) / warmRuns.length;

  // 4. Cold CLI find, including process startup, JSON read, index build and query.
  const coreModulePath = resolve('packages/core/dist/index.js');
  const core = await import(pathToFileURL(coreModulePath).href);
  const benchRoot = createBenchRoot(serializedConceptsVi);
  let cliFindMs: number;
  let cliProcessMs: number;
  try {
    cliFindMs = await measureColdCliFind(benchRoot, core);
    cliProcessMs = measureCliProcessStartup(benchRoot);
  } finally {
    const tempBase = resolve(tmpdir()) + sep;
    const target = resolve(benchRoot);
    if (target.startsWith(tempBase)) rmSync(target, { recursive: true, force: true });
  }

  // 5. MCP warm search through the shared core cache and search options.
  core.clearSearchIndexCache();
  core.findConceptsFromDocs(parsedConceptsVi, 'hệ thống', { cacheKey: 'bench:vi' });
  const mcpWarmRuns: number[] = [];
  for (let i = 0; i < 10; i++) {
    const tMcp0 = performance.now();
    core.findConceptsFromDocs(parsedConceptsVi, 'hệ thống', { cacheKey: 'bench:vi' });
    const tMcp1 = performance.now();
    mcpWarmRuns.push(tMcp1 - tMcp0);
  }
  const mcpFindMs = mcpWarmRuns.reduce((a, b) => a + b, 0) / mcpWarmRuns.length;

  // 6. Data size in MB
  const dataSizeMB = (
    Buffer.byteLength(serializedTermsVi, 'utf8')
    + Buffer.byteLength(serializedTermsEn, 'utf8')
    + Buffer.byteLength(serializedConceptsVi, 'utf8')
    + Buffer.byteLength(serializedConceptsEn, 'utf8')
  ) / (1024 * 1024);

  // Ngân sách theo bảng 1.7 (quy đổi tuyến tính cho 1k)
  const isScale1k = size <= 1000;
  const budgetLoadMs = 300;
  const budgetFirstScanMs = matcherType === 'trie' ? (isScale1k ? 10 : 20) : (isScale1k ? 3000 : 15000);
  const budgetSubsequentScanMs = matcherType === 'trie' ? 2 : (isScale1k ? 500 : 2000);
  const budgetCliFindMs = isScale1k ? 100 : 200;
  const budgetMcpFindMs = isScale1k ? 5 : 10;
  // The 5 MB target is for one lite pack; this synthetic run includes every
  // concept in both locales, so its 10k data size is informative only.
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
    modFirstScanMs,
    modSubsequentScanMs,
    cliFindMs,
    cliProcessMs,
    mcpFindMs,
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
  console.log(` Termbridge Benchmark Runner (Table 1.7 Scale Budget) `);
  console.log(` Sizes: ${sizes.join(', ')} | Seed: ${seed} | Check: ${check ? 'ON' : 'OFF'}`);
  console.log(`======================================================\n`);

  let allPassed = true;

  for (const size of sizes) {
    console.log(`▶ Running benchmark at scale ${size} concepts...`);
    const result = await runBenchmarkForSize(size, seed);

    console.log(`\nKết quả đo đạc (${size} concepts, matcher: ${result.matcherType}):`);
    console.log(`  - Mod load simulation:       ${result.modLoadMs.toFixed(2)} ms (JSON + active locale indexes; excludes disk I/O)`);
    console.log(`  - Mod first scan (unmatched): ${result.modFirstScanMs.toFixed(2)} ms`);
    console.log(`  - Mod subsequent scan:        ${result.modSubsequentScanMs.toFixed(2)} ms`);
    console.log(`  - CLI find cold path (read+index+query): ${result.cliFindMs.toFixed(2)} ms`);
    console.log(`  - CLI process cold (informational): ${result.cliProcessMs.toFixed(2)} ms`);
    console.log(`  - MCP find (warm core cache): ${result.mcpFindMs.toFixed(2)} ms`);
    console.log(`  - Lookup data (both locales): ${result.dataSizeMB.toFixed(2)} MB${result.dataSizeBudgetMB === null ? ' (no profile-matched 10k budget)' : ` (budget ≤ ${result.dataSizeBudgetMB} MB)`}`);

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
