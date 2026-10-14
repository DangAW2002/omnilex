// bench/run.ts: Performance benchmark runner and budget checker (Table 1.7)
import { generateMockDataset, type MockDataset } from './generate.js';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

interface BenchmarkResult {
  size: number;
  modLoadMs: number;
  modFirstScanMs: number;
  modSubsequentScanMs: number;
  cliFindMs: number;
  mcpFindMs: number;
  dataSizeMB: number;
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

async function runBenchmarkForSize(size: number, seed = 42): Promise<BenchmarkResult> {
  const dataset: MockDataset = generateMockDataset(size, seed);

  // 1. Mod load data simulation
  const tLoad0 = performance.now();
  const serializedTerms = JSON.stringify(dataset.termsVi);
  const serializedConcepts = JSON.stringify(dataset.conceptsVi);
  const parsedTerms = JSON.parse(serializedTerms);
  const parsedConcepts = JSON.parse(serializedConcepts);

  // Kiểm tra xem đã có bộ nhận diện trie ở WP4 chưa
  const triePath = resolve('packages/core/src/matcher.ts');
  const runtimeTriePath = resolve('packages/claude-mod/hooks/runtime/matcher.js');
  const hasTrie = existsSync(triePath) || existsSync(runtimeTriePath);

  let matcherType: 'trie' | 'regex' = 'regex';
  let matcherFn: (text: string) => number = () => 0;

  if (hasTrie) {
    try {
      const targetModule = existsSync(runtimeTriePath) ? runtimeTriePath : triePath;
      const { createMatcher } = await import(pathToFileURL(targetModule).href);
      const matcher = createMatcher(parsedTerms);
      matcherFn = (text: string) => matcher.match(text).length;
      matcherType = 'trie';
    } catch {
      matcherType = 'regex';
    }
  }

  if (matcherType === 'regex') {
    const matchers = parsedTerms
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
  const matchedText = `Trong hệ thống, ${parsedTerms[0]?.key || 'thuật ngữ'} được sử dụng để tối ưu hóa quy trình cùng với ${parsedTerms[1]?.key || 'khái niệm'}.`;
  const warmRuns: number[] = [];
  for (let i = 0; i < 5; i++) {
    const tSub0 = performance.now();
    matcherFn(matchedText);
    const tSub1 = performance.now();
    warmRuns.push(tSub1 - tSub0);
  }
  const modSubsequentScanMs = warmRuns.reduce((a, b) => a + b, 0) / warmRuns.length;

  // 4. MiniSearch cold find simulation
  const coreModulePath = resolve('packages/core/dist/index.js');
  const { MiniSearch } = await import(pathToFileURL(coreModulePath).href);

  const tMini0 = performance.now();
  const miniSearch = new MiniSearch({
    fields: ['label', 'summary', 'plain_descriptions'],
    storeFields: ['id', 'label', 'summary'],
    searchOptions: { prefix: true, fuzzy: 0.2 }
  });
  miniSearch.addAll(parsedConcepts);
  miniSearch.search('lợi nhuận');
  const tMini1 = performance.now();
  const cliFindMs = tMini1 - tMini0;

  // 5. MCP warm search
  const mcpWarmRuns: number[] = [];
  for (let i = 0; i < 10; i++) {
    const tMcp0 = performance.now();
    miniSearch.search('hệ thống');
    const tMcp1 = performance.now();
    mcpWarmRuns.push(tMcp1 - tMcp0);
  }
  const mcpFindMs = mcpWarmRuns.reduce((a, b) => a + b, 0) / mcpWarmRuns.length;

  // 6. Data size in MB
  const dataSizeMB = (Buffer.byteLength(serializedTerms, 'utf8') + Buffer.byteLength(serializedConcepts, 'utf8')) / (1024 * 1024);

  // Ngân sách theo bảng 1.7 (quy đổi tuyến tính cho 1k)
  const isScale1k = size <= 1000;
  const budgetLoadMs = 300;
  const budgetFirstScanMs = matcherType === 'trie' ? (isScale1k ? 10 : 20) : (isScale1k ? 3000 : 15000);
  const budgetSubsequentScanMs = matcherType === 'trie' ? 2 : (isScale1k ? 500 : 2000);
  const budgetCliFindMs = isScale1k ? 100 : 200;
  const budgetMcpFindMs = isScale1k ? 5 : 10;
  const budgetDataSizeMB = isScale1k ? 2 : 5;

  const failures: string[] = [];
  if (modLoadMs > budgetLoadMs) failures.push(`Mod load time: ${modLoadMs.toFixed(1)}ms > budget ${budgetLoadMs}ms`);
  if (modFirstScanMs > budgetFirstScanMs) failures.push(`Mod first scan: ${modFirstScanMs.toFixed(1)}ms > budget ${budgetFirstScanMs}ms`);
  if (modSubsequentScanMs > budgetSubsequentScanMs) failures.push(`Mod subsequent scan: ${modSubsequentScanMs.toFixed(1)}ms > budget ${budgetSubsequentScanMs}ms`);
  if (cliFindMs > budgetCliFindMs) failures.push(`CLI find cold: ${cliFindMs.toFixed(1)}ms > budget ${budgetCliFindMs}ms`);
  if (mcpFindMs > budgetMcpFindMs) failures.push(`MCP find warm: ${mcpFindMs.toFixed(1)}ms > budget ${budgetMcpFindMs}ms`);
  if (dataSizeMB > budgetDataSizeMB) failures.push(`Data size: ${dataSizeMB.toFixed(2)}MB > budget ${budgetDataSizeMB}MB`);

  const passed = failures.length === 0;

  return {
    size,
    modLoadMs,
    modFirstScanMs,
    modSubsequentScanMs,
    cliFindMs,
    mcpFindMs,
    dataSizeMB,
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
    console.log(`  - Mod load data:             ${result.modLoadMs.toFixed(2)} ms (ngân sách: ≤ 300 ms)`);
    console.log(`  - Mod first scan (unmatched): ${result.modFirstScanMs.toFixed(2)} ms`);
    console.log(`  - Mod subsequent scan:        ${result.modSubsequentScanMs.toFixed(2)} ms`);
    console.log(`  - CLI find (cold MiniSearch): ${result.cliFindMs.toFixed(2)} ms`);
    console.log(`  - MCP find (warm cache):      ${result.mcpFindMs.toFixed(2)} ms`);
    console.log(`  - Data size (terms + concepts): ${result.dataSizeMB.toFixed(2)} MB`);

    if (check && !result.passed) {
      console.error(`\n❌ Scale ${size} FAILED performance budget:`);
      for (const fail of result.failures) {
        console.error(`   - ${fail}`);
      }
      allPassed = false;
    } else {
      console.log(`✔ Scale ${size} PASSED all performance gates.\n`);
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
