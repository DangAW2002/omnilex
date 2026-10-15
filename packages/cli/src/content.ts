// Content tooling (Plan 2.3, 2.6, 2.8f): candidate mining, tb ingest,
// coverage and collision reports, and the verbatim-overlap check (T-C5).
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import pc from 'picocolors';
import type { Command } from 'commander';

function fail(message: string): never {
  console.error(pc.red(`✖ ${message}`));
  process.exit(1);
}

export function registerContentCommands(program: Command, reportCmd: Command, resolveRootDir: () => string): void {
  const candidatesCmd = program.command('candidates').description('Candidate terms for new concepts');
  candidatesCmd
    .command('mine')
    .description('Count term candidates in local Claude Code transcripts (term + count only, never sentences)')
    .option('--opt-in', 'Required: confirm reading your local transcripts (D4)')
    .option('--dir <dir>', 'Transcript directory', path.join(os.homedir(), '.claude', 'projects'))
    .option('--min <n>', 'Minimum count', '3')
    .option('--top <n>', 'Keep the most frequent N', '500')
    .option('-o, --out <file>', 'Output file', 'candidates/mined.yaml')
    .action(async (options: { optIn?: boolean; dir: string; min: string; top: string; out: string }) => {
      if (!options.optIn) {
        fail('Cần --opt-in: lệnh này đọc transcript Claude Code trên máy bạn và chỉ ghi tên thuật ngữ cùng số lần xuất hiện / pass --opt-in: this reads your local Claude Code transcripts and writes only term names and counts');
      }
      const core = await import('@termbridge/core');
      const rootDir = resolveRootDir();
      const repo = core.loadAll(rootDir);
      const common = new Set<string>([...Object.values(repo.commonWords || {})].flatMap((set: any) => [...set]));
      const candidates = core.countCandidates(core.transcriptTexts(options.dir), {
        known: core.knownTerms(repo),
        common,
        minCount: Number(options.min),
        top: Number(options.top),
      });
      const out = path.resolve(rootDir, options.out);
      fs.mkdirSync(path.dirname(out), { recursive: true });
      fs.writeFileSync(out, core.dumpYaml({
        generated_by: 'tb candidates mine --opt-in',
        note: 'Term names and counts only; no transcript text. Fill id and domain, then: tb new --from <this file>',
        candidates: candidates.map((item: any) => ({ ...item, id: null, domain: null })),
      }), 'utf-8');
      console.log(pc.green(`\n✔ ${candidates.length} ứng viên / candidates → ${path.relative(rootDir, out)}\n`));
    });

  program
    .command('ingest <source>')
    .description('Read a source glossary into candidates/<source>.yaml (terms and links; definitions only for verified adapt sources)')
    .option('--file <path>', 'Local file or directory instead of the network')
    .option('--adapter <name>', 'Adapter: kubernetes | csv (default: by source id)')
    .action(async (sourceId: string, options: { file?: string; adapter?: string }) => {
      const core = await import('@termbridge/core');
      const rootDir = resolveRootDir();
      const sources = core.loadSourcesConfig(rootDir);
      const source = sources[sourceId];
      if (!source) fail(`Không có nguồn ${sourceId} trong config/sources.yaml / unknown source`);
      const adapter = core.adapterFor(sourceId, options.adapter);
      if (!adapter) fail(`Chưa có adapter cho ${sourceId}; dùng --adapter csv --file <csv> / no adapter for ${sourceId}; use --adapter csv --file <csv>`);
      let entries;
      try {
        entries = options.file ? adapter.fromPath(path.resolve(options.file)) : adapter.fromNetwork ? await adapter.fromNetwork() : fail('Adapter này cần --file / this adapter needs --file');
      } catch (error: any) {
        fail(error.message);
      }
      const result = core.ingestEntries(sourceId, source, entries!);
      const file = core.writeIngestCandidates(rootDir, result, new Date().toISOString().slice(0, 10), source.languages?.[0] || 'en');
      console.log(pc.green(`\n✔ ${result.entries.length} thuật ngữ / terms → ${path.relative(rootDir, file)}`));
      console.log(pc.dim(result.definitionsIncluded
        ? '  có kèm định nghĩa gốc (reuse: adapt, giấy phép đã xác minh) / original definitions included'
        : `  chỉ tên và liên kết (reuse: ${source.reuse}${source.reuse === 'adapt' ? ', chưa có license_verified_by' : ''}) / names and links only`));
      console.log('');
    });

  reportCmd
    .command('coverage')
    .description('Concepts per level-2 branch, locale coverage and status')
    .option('-d, --domain <path>', 'Taxonomy prefix (e.g., it)')
    .action(async (options: { domain?: string }) => {
      const core = await import('@termbridge/core');
      const repo = core.loadAll(resolveRootDir());
      const rows = core.coverageReport(repo, options.domain);
      console.log(pc.bold(`\nTermbridge coverage${options.domain ? ` (${options.domain})` : ''}:\n`));
      for (const row of rows) {
        const locales = Object.entries(row.locales).map(([code, count]) => `${code} ${Math.round((count / row.concepts) * 100)}%`).join('  ');
        const status = Object.entries(row.status).map(([name, count]) => `${name} ${count}`).join(', ');
        console.log(`  ${pc.cyan(row.branch.padEnd(36))} ${String(row.concepts).padStart(4)}  ${locales}  ${pc.dim(status)}`);
      }
      console.log(pc.dim(`\n  Tổng / total: ${rows.reduce((sum, row) => sum + row.concepts, 0)}\n`));
    });

  reportCmd
    .command('collisions')
    .description('Keys shared by several concepts, and the qualifiers or confusable links they lack')
    .action(async () => {
      const core = await import('@termbridge/core');
      const rows = core.collisionsReport(core.loadAll(resolveRootDir()));
      console.log(pc.bold(`\nTermbridge collisions (${rows.length}):\n`));
      for (const row of rows) {
        console.log(`  [${row.locale}] ${pc.bold(row.key)} → ${row.concepts.join(', ')}`);
        for (const problem of row.problems) console.log(`      ${pc.yellow(problem)}`);
      }
      const open = rows.filter((row) => row.problems.length).length;
      console.log(open ? pc.yellow(`\n  ${open} nhóm còn thiếu / groups need work\n`) : pc.green('\n  ✔ mọi homonym đều có qualifier và confusable hai chiều\n'));
      if (open) process.exitCode = 1;
    });

  const checkCmd = program.command('check').description('Content checks for authoring batches');
  checkCmd
    .command('overlap')
    .description('T-C5: no run of 8+ words copied from a quote or a fetched paraphrase-only source text')
    .option('--sources <dir>', 'Fetched source texts: <dir>/<source-ref>/*.txt', 'candidates/.sources')
    .option('--size <n>', 'Run length in words', '8')
    .option('--concepts <ids>', 'Only these concept ids')
    .action(async (options: { sources: string; size: string; concepts?: string }) => {
      const core = await import('@termbridge/core');
      const rootDir = resolveRootDir();
      const matches = core.overlapReport(core.loadAll(rootDir), {
        sourcesDir: path.resolve(rootDir, options.sources),
        size: Number(options.size),
        conceptIds: options.concepts?.split(',').map((item) => item.trim()).filter(Boolean),
      });
      if (matches.length === 0) {
        console.log(pc.green(`\n✔ Không có đoạn trùng ≥ ${options.size} từ / no copied runs of ${options.size}+ words\n`));
        return;
      }
      console.log(pc.red(`\n✖ ${matches.length} đoạn trùng nguyên văn / verbatim runs:\n`));
      for (const match of matches) console.log(`  ${match.concept} (${match.locale}) ↔ ${match.against}: "${match.words}"`);
      console.log('');
      process.exitCode = 1;
    });
}
