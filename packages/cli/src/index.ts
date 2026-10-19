#!/usr/bin/env node
import { Command } from 'commander';
import path from 'node:path';
import fs from 'node:fs';
import pc from 'picocolors';
import { openCliStore, registerPackCommands } from './packs.js';
import { registerContentCommands } from './content.js';

const program = new Command();

function resolveRootDir(): string {
  let curr = process.cwd();
  while (curr !== path.dirname(curr)) {
    if (fs.existsSync(path.join(curr, 'concepts')) && fs.existsSync(path.join(curr, 'taxonomy'))) {
      return curr;
    }
    curr = path.dirname(curr);
  }
  return process.cwd();
}

program
  .name('ol')
  .description('OmniLex CLI — terminology management and verification engine')
  .version('0.1.0');

// ol new <id> --domain <path> --locales <locales>
program
  .command('new [id]')
  .description('Create a new concept directory from template (or many: --from candidates/<file>.yaml)')
  .option('-d, --domain <path>', 'Primary taxonomy domain path (e.g., finance/investing/stocks)')
  .option('-l, --locales <locales>', 'Comma-separated locale codes', 'vi,en')
  .option('--drafted-by <author>', 'Draft author: human or ai', 'human')
  .option('--from <file>', 'Scaffold every candidate that has an id and a domain')
  .action(async (id: string | undefined, options: { domain?: string; locales: string; draftedBy: string; from?: string }) => {
    const rootDir = resolveRootDir();
    const { loadAll, scaffoldConcept, parseYaml } = await import('@omnilex/core');
    const repoData = loadAll(rootDir);
    const locales = options.locales.split(',').map((s) => s.trim());
    const allowedLocales = new Set(repoData.localesConfig.locales.map((locale) => locale.code));
    if (locales.length === 0 || locales.some((locale) => !allowedLocales.has(locale)) || new Set(locales).size !== locales.length) {
      console.error(pc.red('Error: --locales must contain unique locale codes from config/locales.yaml.'));
      process.exit(1);
    }
    if (!locales.some((locale) => repoData.localesConfig.locales.some((configured) => configured.code === locale && configured.status === 'primary'))) {
      console.error(pc.red('Error: Include at least one primary locale.'));
      process.exit(1);
    }
    if (!['ai', 'human'].includes(options.draftedBy)) {
      console.error(pc.red('Error: --drafted-by must be ai or human.'));
      process.exit(1);
    }

    const jobs: Array<{ id: string; domain: string; labels?: Record<string, string>; sources?: any[] }> = [];
    if (options.from) {
      const doc = parseYaml(fs.readFileSync(options.from, 'utf-8')) as any;
      for (const candidate of doc?.candidates || []) {
        if (!candidate?.id || !candidate?.domain || candidate.skip) continue;
        jobs.push({
          id: String(candidate.id),
          domain: String(candidate.domain),
          labels: candidate.term ? { en: String(candidate.term) } : undefined,
          sources: candidate.source ? [candidate.source] : undefined,
        });
      }
      if (jobs.length === 0) console.log(pc.yellow(`⚠ ${options.from}: không có ứng viên nào có id và domain / no candidate with an id and a domain`));
    } else {
      if (!id || !options.domain) {
        console.error(pc.red('Error: pass <id> and --domain, or --from <candidates.yaml>.'));
        process.exit(1);
      }
      jobs.push({ id, domain: options.domain });
    }

    let failed = 0;
    for (const job of jobs) {
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(job.id) || job.id.length > 48) {
        console.error(pc.red(`Error: ${job.id}: id must be kebab-case, at most 48 characters.`));
        failed++;
        continue;
      }
      if (!repoData.validDomainPaths.has(job.domain)) {
        console.error(pc.red(`Error: ${job.id}: Unknown taxonomy path '${job.domain}'.`));
        failed++;
        continue;
      }
      try {
        scaffoldConcept(rootDir, { ...job, locales, draftedBy: options.draftedBy });
      } catch (error: any) {
        console.error(pc.red(`Error: ${error.message}`));
        failed++;
        continue;
      }
      console.log(pc.green(`✔ Created concept ${pc.bold(job.id)} in concepts/${job.id}`));
      console.log(pc.cyan(`  - concept.yaml`));
      for (const loc of locales) {
        console.log(pc.cyan(`  - ${loc}.md`));
      }
    }
    if (failed) process.exit(1);
  });

// tb validate [--strict]
program
  .command('validate')
  .description('Run all 13 integrity validation rules')
  .option('-s, --strict', 'Treat warnings as errors', false)
  .action(async (options: { strict: boolean }) => {
    const rootDir = resolveRootDir();
    const { loadAll, validateRepository } = await import('@omnilex/core');
    const repoData = loadAll(rootDir);
    const report = validateRepository(repoData);

    console.log(pc.bold(`\nOmniLex Validation Report (${repoData.concepts.size} concepts loaded):\n`));

    if (report.errors.length > 0) {
      console.log(pc.red(pc.bold(`Errors (${report.errors.length}):`)));
      for (const err of report.errors) {
        console.log(`  ${pc.red('✖')} [Rule ${err.ruleId}] ${err.conceptId ? `${pc.bold(err.conceptId)}: ` : ''}${err.message}`);
      }
    }

    if (report.warnings.length > 0) {
      console.log(pc.yellow(pc.bold(`\nWarnings (${report.warnings.length}):`)));
      for (const warn of report.warnings) {
        console.log(`  ${pc.yellow('⚠')} [Rule ${warn.ruleId}] ${warn.conceptId ? `${pc.bold(warn.conceptId)}: ` : ''}${warn.message}`);
      }
    }

    if (report.valid && (!options.strict || report.warnings.length === 0)) {
      console.log(pc.green(`\n✔ Validation passed successfully! ${report.warnings.length ? `(${report.warnings.length} warnings)` : ''}\n`));
      process.exit(0);
    } else {
      console.error(pc.red(`\n✖ Validation failed! Please resolve errors above.\n`));
      process.exit(1);
    }
  });

// tb build
program
  .command('build')
  .description('Generate indexes/, llms.txt, and dist/ artifacts')
  .action(async () => {
    const rootDir = resolveRootDir();
    const { loadAll, buildArtifacts } = await import('@omnilex/core');
    const repoData = loadAll(rootDir);
    const outputs = buildArtifacts(repoData);

    console.log(pc.green(`✔ Successfully generated ${outputs.indexesGenerated.length} index files and ${outputs.distGenerated.length} dist artifacts:`));
    console.log(`  - llms.txt`);
    console.log(`  - indexes/ (master, domain, homonyms)`);
    console.log(`  - dist/ (search.json, terms.json, graph.json, concepts/)`);
  });

function freshArtifact(filesystem: any, artifact: string, conceptsDir: string): boolean | null {
  if (!filesystem.existsSync(artifact)) return null;
  try {
    const stale = filesystem.existsSync(conceptsDir)
      && filesystem.statSync(conceptsDir).mtimeMs > filesystem.statSync(artifact).mtimeMs;
    return !stale;
  } catch {
    return null;
  }
}

function parsePackList(value?: string): string[] | undefined {
  const packs = (value || '').split(',').map((item) => item.trim()).filter(Boolean);
  return packs.length > 0 ? packs : undefined;
}

// Opens dist/manifest.json when it is newer than concepts/; null means "use
// the legacy layout or the repository".
export async function openPackStore(rootDir: string, deps: any = {}): Promise<any | null> {
  const filesystem = deps.fs || fs;
  const distDir = path.join(rootDir, 'dist');
  if (freshArtifact(filesystem, path.join(distDir, 'manifest.json'), path.join(rootDir, 'concepts')) !== true) return null;
  const { PackStore } = deps.PackStore ? deps : await import('@omnilex/core/dist/pack-reader.js');
  const store = new PackStore(
    {
      readText(relPath: string) {
        try {
          return filesystem.readFileSync(path.join(distDir, ...relPath.split('/')), 'utf8');
        } catch {
          return null;
        }
      },
    },
    (message: string) => console.warn(pc.yellow(`⚠ ${message}`))
  );
  return store.available ? store : null;
}

export async function findAction(
  rootDir: string,
  query: string,
  options: { locale: string; domain?: string; pack?: string },
  deps: any = {}
): Promise<{ results: any[]; usedPrebuilt: boolean }> {
  const filesystem = deps.fs || fs;
  const targetLocale = options.locale || 'vi';
  const packs = parsePackList(options.pack);

  // The project's configuration first (Plan 3.3), then the repository's dist/.
  const project = await openCliStore({ cwd: deps.cwd, home: deps.home, locale: targetLocale, pack: options.pack });
  if (project.store) {
    return { results: project.store.find(query, { locale: targetLocale, domain: options.domain }), usedPrebuilt: true };
  }
  const store = project.ctx.stale ? null : await openPackStore(rootDir, deps);
  if (store) {
    return { results: store.find(query, { locale: targetLocale, packs, domain: options.domain }), usedPrebuilt: true };
  }
  if (packs) console.warn(pc.yellow('⚠ --pack cần dist/manifest.json mới; chạy pnpm tb build. Đang tìm trên mọi khái niệm.'));

  const prebuiltPath = path.join(rootDir, 'dist', targetLocale, 'search.json');
  const fresh = project.ctx.stale ? false : freshArtifact(filesystem, prebuiltPath, path.join(rootDir, 'concepts'));
  if (fresh === false) {
    console.warn(pc.yellow(`⚠ dist/${targetLocale}/search.json cũ hơn concepts/. Đang quay về quét concepts/ trực tiếp.`));
  }

  if (fresh) {
    try {
      const raw = filesystem.readFileSync(prebuiltPath, 'utf8');
      const docs = JSON.parse(raw);
      const { findConceptsFromDocs } = deps.findConceptsFromDocs
        ? deps
        : await import('@omnilex/core/dist/query.js');
      const results = findConceptsFromDocs(docs, query, {
        domain: options.domain,
        cacheKey: `cli-dist:${targetLocale}`,
      });
      return { results, usedPrebuilt: true };
    } catch {
      // Fallback nếu parse JSON lỗi
    }
  }

  const { loadAll } = deps.loadAll
    ? deps
    : await import('@omnilex/core/dist/loader.js');
  const { findConcepts } = deps.findConcepts
    ? deps
    : await import('@omnilex/core/dist/query.js');
  const repoData = loadAll(rootDir);
  const results = findConcepts(repoData, query, { locale: options.locale, domain: options.domain });
  return { results, usedPrebuilt: false };
}

// tb find "<query>" [--locale vi] [--domain finance] [--pack it.ai-ml,finance]
program
  .command('find <query>')
  .description('Reverse lookup: search concepts by plain words or colloquial descriptions')
  .option('-l, --locale <locale>', 'Target locale', 'vi')
  .option('-d, --domain <domain>', 'Filter by domain prefix')
  .option('-p, --pack <ids>', 'Comma-separated pack ids to search (e.g., it.ai-ml,finance)')
  .action(async (query: string, options: { locale: string; domain?: string; pack?: string }) => {
    const rootDir = resolveRootDir();
    const { results } = await findAction(rootDir, query, options);

    if (results.length === 0) {
      console.log(pc.yellow(`\n⚠ Không tìm thấy khái niệm nào khớp với: "${pc.bold(query)}" (${options.locale})`));
      console.log(pc.dim(`\nGợi ý:`));
      console.log(pc.dim(`  - Dùng mô tả đời thường ngắn gọn hơn (ví dụ: "lãi nhập gốc", "mẩu từ AI").`));
      console.log(pc.dim(`  - Tra cứu toàn bộ mục từ tại: indexes/${options.locale}/_all.md`));
      console.log(pc.dim(`  - Đề xuất tạo mới bằng lệnh: pnpm tb new <id> --domain <lĩnh-vực>\n`));
      return;
    }

    console.log(pc.bold(`\nKết quả tra cứu cho "${pc.cyan(query)}" (${options.locale}):\n`));
    for (const r of results) {
      const q = r.qualifier ? ` ${pc.dim(r.qualifier)}` : '';
      console.log(`- ${pc.bold(pc.green(r.label))}${q} (${pc.cyan(r.id)}) [${r.domains.join(', ')}]`);
      console.log(`  ${pc.dim(r.summary)}\n`);
    }
  });

interface ShowItem {
  id: string;
  label?: string;
  qualifier?: string;
  summary?: string;
}

function printAmbiguous(target: string, locale: string, items: ShowItem[]): void {
  console.log(pc.yellow(`\n"${target}" có nhiều nghĩa. Hãy chọn một ID:\n`));
  for (const item of items) {
    console.log(`  pnpm ol show id:${item.id} --locale ${locale} — ${item.label} ${item.qualifier || ''}`);
    console.log(`    ${item.summary || ''}`);
  }
}

function printNotFound(target: string, locale: string, suggestions: ShowItem[]): void {
  console.log(pc.yellow(`\n⚠ Khái niệm "${pc.bold(target)}" chưa có trong OmniLex.\n`));

  // Attempt fuzzy/keyword fallback to suggest related concepts
  if (suggestions.length > 0) {
    console.log(pc.bold(pc.cyan(`Gợi ý các khái niệm liên quan:`)));
    for (const s of suggestions.slice(0, 3)) {
      const q = s.qualifier ? ` ${pc.dim(s.qualifier)}` : '';
      console.log(`  • ${pc.bold(pc.green(s.label || s.id))}${q} (id: ${pc.cyan(s.id)})`);
      console.log(`    ${pc.dim(s.summary || '')}`);
    }
    console.log(pc.dim(`\nXem chi tiết gợi ý:`));
    console.log(pc.dim(`  pnpm tb show ${suggestions[0].id} --locale ${locale}\n`));
  } else {
    console.log(pc.dim(`Gợi ý tiếp theo:`));
    console.log(pc.dim(`  - Tra cứu mô tả: pnpm tb find "<mô tả ý định>"`));
    console.log(pc.dim(`  - Xem danh mục có sẵn: indexes/${locale}/_all.md`));
    const kebabCandidate = target.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'new-term';
    console.log(pc.dim(`  - Thêm khái niệm này: pnpm tb new ${kebabCandidate} --domain <taxonomy-path>\n`));
  }
}

function printConcept(id: string, metadata: any, fm: any, content?: string): void {
  console.log(pc.bold(pc.green(`\n=== ${fm?.label || id} ${fm?.qualifier ? pc.dim(fm.qualifier) : ''} ===`)));
  console.log(`ID: ${pc.cyan(id)} | Level: ${metadata.level} | Status: ${metadata.status}`);
  console.log(`Domains: ${metadata.domains.join(', ')}`);
  if (metadata.relations?.prerequisites?.length) {
    console.log(`Prerequisites: ${metadata.relations.prerequisites.join(', ')}`);
  }
  if (metadata.relations?.confusable?.length) {
    console.log(`Confusable with: ${metadata.relations.confusable.join(', ')}`);
  }
  console.log(`\nSummary: ${fm?.summary || ''}\n`);
  if (content) {
    console.log(content.trim());
  }
  console.log('');
}

// tb show <id-or-label> [--locale vi] [--pack it.ai-ml]
program
  .command('show <target>')
  .description('Forward lookup: display layered explanations for a concept')
  .option('-l, --locale <locale>', 'Target locale', 'vi')
  .option('-p, --pack <ids>', 'Comma-separated pack ids to look in')
  .action(async (target: string, options: { locale: string; pack?: string }) => {
    const rootDir = resolveRootDir();
    const project = await openCliStore({ locale: options.locale, pack: options.pack });
    const store = project.store || (project.ctx.stale ? null : await openPackStore(rootDir));
    if (store) {
      const query = { locale: options.locale, packs: project.store ? undefined : parsePackList(options.pack) };
      const matches = store.lookup(target, query);
      if (matches.length > 1) return printAmbiguous(target, options.locale, matches);
      if (matches.length === 0) return printNotFound(target, options.locale, store.find(target, query));
      const record = store.explanation(matches[0].id, options.locale);
      if (record) return printConcept(record.id, record.metadata, record.entry.frontmatter, record.entry.content);
    }

    const { loadAll, findConcepts, lookupConcepts } = await import('@omnilex/core');
    const repoData = loadAll(rootDir);
    const matches = lookupConcepts(repoData, target, { locale: options.locale });
    if (matches.length > 1) {
      return printAmbiguous(target, options.locale, matches.map(({ record, localeEntry }) => ({
        id: record.id,
        label: localeEntry?.frontmatter.label,
        qualifier: localeEntry?.frontmatter.qualifier,
        summary: localeEntry?.frontmatter.summary,
      })));
    }
    const res = matches[0] || null;
    if (!res) return printNotFound(target, options.locale, findConcepts(repoData, target, { locale: options.locale }));

    const { record, localeEntry } = res;
    printConcept(record.id, record.metadata, localeEntry?.frontmatter, localeEntry?.content);
  });

// tb report <type>
const reportCmd = program.command('report').description('Generate diagnostic and progress reports');

reportCmd
  .command('locales')
  .description('Report terminology coverage across locales and domains')
  .action(async () => {
    const rootDir = resolveRootDir();
    const { loadAll, generateLocaleReport } = await import('@omnilex/core');
    const repoData = loadAll(rootDir);
    const rows = generateLocaleReport(repoData);

    console.log(pc.bold(`\nOmniLex Locale Coverage Report:\n`));
    console.table(
      rows.map((r) => {
        const item: any = { Domain: r.domain, 'Total Concepts': r.totalConcepts };
        for (const [loc, stat] of Object.entries(r.coverageByLocale)) {
          item[`${loc} Covered`] = `${stat.count} (${stat.percentage}%)`;
        }
        return item;
      })
    );
  });

reportCmd
  .command('review')
  .description('List all draft concepts needing review, grouped by domain')
  .action(async () => {
    const rootDir = resolveRootDir();
    const { loadAll, generateReviewReport } = await import('@omnilex/core');
    const repoData = loadAll(rootDir);
    const rows = generateReviewReport(repoData);

    console.log(pc.bold(`\nPending Draft Concepts Needing Review (${rows.length}):\n`));
    if (rows.length === 0) {
      console.log(pc.green('All concepts have been reviewed! Zero pending drafts.'));
      return;
    }
    console.table(rows);
  });

// ol sources <subcommand>
const sourcesCmd = program.command('sources').description('Manage and inspect external evidence sources');

sourcesCmd
  .command('list')
  .description('List all registered sources from config/sources.yaml')
  .action(async () => {
    const rootDir = resolveRootDir();
    const { loadSourcesConfig } = await import('@omnilex/core');
    const sourcesConfig = loadSourcesConfig(rootDir);
    const entries = Object.entries(sourcesConfig);

    console.log(pc.bold(`\nOmniLex Registered Sources (${entries.length}):\n`));
    console.table(
      entries.map(([ref, entry]) => ({
        Ref: ref,
        Title: entry.title,
        Tier: entry.tier,
        Type: entry.type,
        Reuse: entry.reuse,
        License: entry.license,
        Languages: entry.languages.join(', '),
      }))
    );
  });

sourcesCmd
  .command('migrate')
  .description('Migrate string URL sources in concept.yaml files to structured source objects')
  .action(async () => {
    const rootDir = resolveRootDir();
    const { migrateAllSources } = await import('@omnilex/core');
    const result = migrateAllSources(rootDir);

    console.log(pc.bold(`\nOmniLex Sources Migration:\n`));
    console.log(`- Total concepts inspected: ${result.totalConcepts}`);
    console.log(`- Concepts modified: ${result.migratedConcepts}`);
    console.log(`- Source URLs migrated: ${result.migratedSourcesCount}`);

    if (result.warnings.length > 0) {
      console.log(pc.yellow(`\nWarnings (${result.warnings.length}):`));
      for (const w of result.warnings) {
        console.log(`  ${pc.yellow('⚠')} ${w}`);
      }
    }

    console.log(pc.green(`\n✔ Migration complete!\n`));
  });

if (!process.env.VITEST) {
  registerPackCommands(program);
  registerContentCommands(program, reportCmd, resolveRootDir);
  program.parse(process.argv);
}
