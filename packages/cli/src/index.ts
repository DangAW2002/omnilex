#!/usr/bin/env node
import { Command } from 'commander';
import path from 'node:path';
import fs from 'node:fs';
import pc from 'picocolors';

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
  .name('tb')
  .description('Termbridge CLI — terminology management and verification engine')
  .version('0.1.0');

// tb new <id> --domain <path> --locales <locales>
program
  .command('new <id>')
  .description('Create a new concept directory from template')
  .requiredOption('-d, --domain <path>', 'Primary taxonomy domain path (e.g., finance/investing/stocks)')
  .option('-l, --locales <locales>', 'Comma-separated locale codes', 'vi,en')
  .option('--drafted-by <author>', 'Draft author: human or ai', 'human')
  .action(async (id: string, options: { domain: string; locales: string; draftedBy: string }) => {
    const rootDir = resolveRootDir();
    const { loadAll } = await import('@termbridge/core');
    const repoData = loadAll(rootDir);
    const locales = options.locales.split(',').map((s) => s.trim());
    const allowedLocales = new Set(repoData.localesConfig.locales.map((locale) => locale.code));
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id) || id.length > 48) {
      console.error(pc.red('Error: id must be kebab-case, at most 48 characters.'));
      process.exit(1);
    }
    if (!repoData.validDomainPaths.has(options.domain)) {
      console.error(pc.red(`Error: Unknown taxonomy path '${options.domain}'.`));
      process.exit(1);
    }
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
    const conceptDir = path.join(rootDir, 'concepts', id);

    if (fs.existsSync(conceptDir)) {
      console.error(pc.red(`Error: Concept directory already exists at concepts/${id}`));
      process.exit(1);
    }

    fs.mkdirSync(conceptDir, { recursive: true });

    // 1. Write concept.yaml
    const conceptYaml = `id: ${id}
domains:
  - ${options.domain}
level: 1
relations:
  prerequisites: []
  confusable: []
  related: []
status: draft
provenance:
  drafted_by: ${options.draftedBy}
sources: []
`;
    fs.writeFileSync(path.join(conceptDir, 'concept.yaml'), conceptYaml, 'utf-8');

    // 2. Write locale files
    for (const loc of locales) {
      const isVi = loc === 'vi';
      const mdContent = `---
label: ${id}
aliases: []
loanwords: []
plain_descriptions:
  - ${isVi ? 'mô tả đời thường thứ nhất' : 'first plain description'}
  - ${isVi ? 'mô tả đời thường thứ hai' : 'second plain description'}
summary: ${isVi ? 'Tóm tắt ngắn gọn một câu.' : 'One sentence summary.'}
confusable_notes: {}
follow_up_questions: []
translation: native
---

## ${isVi ? 'Giải thích dễ hiểu' : 'Easy explanation'}
${isVi ? 'Hình ảnh so sánh đời sống thực tế.' : 'Intuitive real world analogy.'}

## ${isVi ? 'Chi tiết' : 'Details'}
${isVi ? 'Cơ chế vận hành và các thành phần chính.' : 'Operational details and mechanics.'}

## ${isVi ? 'Định nghĩa chuyên ngành' : 'Technical definition'}
${isVi ? 'Định nghĩa chuẩn mực chuyên sâu.' : 'Authoritative industry definition.'}

## ${isVi ? 'Ví dụ' : 'Examples'}
${isVi ? 'Ví dụ thực tiễn hoặc số liệu cụ thể.' : 'Practical examples or numerical scenarios.'}
`;
      fs.writeFileSync(path.join(conceptDir, `${loc}.md`), mdContent, 'utf-8');
    }

    console.log(pc.green(`✔ Created concept ${pc.bold(id)} in concepts/${id}`));
    console.log(pc.cyan(`  - concept.yaml`));
    for (const loc of locales) {
      console.log(pc.cyan(`  - ${loc}.md`));
    }
  });

// tb validate [--strict]
program
  .command('validate')
  .description('Run all 13 integrity validation rules')
  .option('-s, --strict', 'Treat warnings as errors', false)
  .action(async (options: { strict: boolean }) => {
    const rootDir = resolveRootDir();
    const { loadAll, validateRepository } = await import('@termbridge/core');
    const repoData = loadAll(rootDir);
    const report = validateRepository(repoData);

    console.log(pc.bold(`\nTermbridge Validation Report (${repoData.concepts.size} concepts loaded):\n`));

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
    const { loadAll, buildArtifacts } = await import('@termbridge/core');
    const repoData = loadAll(rootDir);
    const outputs = buildArtifacts(repoData);

    console.log(pc.green(`✔ Successfully generated ${outputs.indexesGenerated.length} index files and ${outputs.distGenerated.length} dist artifacts:`));
    console.log(`  - llms.txt`);
    console.log(`  - indexes/ (master, domain, homonyms)`);
    console.log(`  - dist/ (search.json, terms.json, graph.json, concepts/)`);
  });

export async function findAction(
  rootDir: string,
  query: string,
  options: { locale: string; domain?: string },
  deps: any = {}
): Promise<{ results: any[]; usedPrebuilt: boolean }> {
  const filesystem = deps.fs || fs;
  const targetLocale = options.locale || 'vi';
  const prebuiltPath = path.join(rootDir, 'dist', targetLocale, 'search.json');
  const conceptsDir = path.join(rootDir, 'concepts');

  let usePrebuilt = false;
  if (filesystem.existsSync(prebuiltPath)) {
    try {
      const distStat = filesystem.statSync(prebuiltPath);
      let isStale = false;
      if (filesystem.existsSync(conceptsDir)) {
        const conceptsStat = filesystem.statSync(conceptsDir);
        if (conceptsStat.mtimeMs > distStat.mtimeMs) {
          isStale = true;
        }
      }
      if (isStale) {
        console.warn(pc.yellow(`⚠ dist/${targetLocale}/search.json cũ hơn concepts/. Đang quay về quét concepts/ trực tiếp.`));
      } else {
        usePrebuilt = true;
      }
    } catch {
      usePrebuilt = false;
    }
  }

  if (usePrebuilt) {
    try {
      const raw = filesystem.readFileSync(prebuiltPath, 'utf8');
      const docs = JSON.parse(raw);
      const { findConceptsFromDocs } = deps.findConceptsFromDocs
        ? deps
        : await import('@termbridge/core/dist/query.js');
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
    : await import('@termbridge/core/dist/loader.js');
  const { findConcepts } = deps.findConcepts
    ? deps
    : await import('@termbridge/core/dist/query.js');
  const repoData = loadAll(rootDir);
  const results = findConcepts(repoData, query, { locale: options.locale, domain: options.domain });
  return { results, usedPrebuilt: false };
}

// tb find "<query>" [--locale vi] [--domain finance]
program
  .command('find <query>')
  .description('Reverse lookup: search concepts by plain words or colloquial descriptions')
  .option('-l, --locale <locale>', 'Target locale', 'vi')
  .option('-d, --domain <domain>', 'Filter by domain prefix')
  .action(async (query: string, options: { locale: string; domain?: string }) => {
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

// tb show <id-or-label> [--locale vi]
program
  .command('show <target>')
  .description('Forward lookup: display layered explanations for a concept')
  .option('-l, --locale <locale>', 'Target locale', 'vi')
  .action(async (target: string, options: { locale: string }) => {
    const rootDir = resolveRootDir();
    const { loadAll, findConcepts, lookupConcepts } = await import('@termbridge/core');
    const repoData = loadAll(rootDir);
    const matches = lookupConcepts(repoData, target, { locale: options.locale });
    if (matches.length > 1) {
      console.log(pc.yellow(`\n"${target}" có nhiều nghĩa. Hãy chọn một ID:\n`));
      for (const { record, localeEntry } of matches) {
        console.log(`  pnpm tb show id:${record.id} --locale ${options.locale} — ${localeEntry?.frontmatter.label} ${localeEntry?.frontmatter.qualifier || ''}`);
        console.log(`    ${localeEntry?.frontmatter.summary || ''}`);
      }
      return;
    }
    const res = matches[0] || null;

    if (!res) {
      console.log(pc.yellow(`\n⚠ Khái niệm "${pc.bold(target)}" chưa có trong Termbridge.\n`));

      // Attempt fuzzy/keyword fallback to suggest related concepts
      const suggestions = findConcepts(repoData, target, { locale: options.locale });
      if (suggestions.length > 0) {
        console.log(pc.bold(pc.cyan(`Gợi ý các khái niệm liên quan:`)));
        for (const s of suggestions.slice(0, 3)) {
          const q = s.qualifier ? ` ${pc.dim(s.qualifier)}` : '';
          console.log(`  • ${pc.bold(pc.green(s.label))}${q} (id: ${pc.cyan(s.id)})`);
          console.log(`    ${pc.dim(s.summary)}`);
        }
        console.log(pc.dim(`\nXem chi tiết gợi ý:`));
        console.log(pc.dim(`  pnpm tb show ${suggestions[0].id} --locale ${options.locale}\n`));
      } else {
        console.log(pc.dim(`Gợi ý tiếp theo:`));
        console.log(pc.dim(`  - Tra cứu mô tả: pnpm tb find "<mô tả ý định>"`));
        console.log(pc.dim(`  - Xem danh mục có sẵn: indexes/${options.locale}/_all.md`));
        const kebabCandidate = target.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'new-term';
        console.log(pc.dim(`  - Thêm khái niệm này: pnpm tb new ${kebabCandidate} --domain <taxonomy-path>\n`));
      }
      return;
    }

    const { record, localeEntry } = res;
    const fm = localeEntry?.frontmatter;

    console.log(pc.bold(pc.green(`\n=== ${fm?.label || record.id} ${fm?.qualifier ? pc.dim(fm.qualifier) : ''} ===`)));
    console.log(`ID: ${pc.cyan(record.id)} | Level: ${record.metadata.level} | Status: ${record.metadata.status}`);
    console.log(`Domains: ${record.metadata.domains.join(', ')}`);
    if (record.metadata.relations?.prerequisites?.length) {
      console.log(`Prerequisites: ${record.metadata.relations.prerequisites.join(', ')}`);
    }
    if (record.metadata.relations?.confusable?.length) {
      console.log(`Confusable with: ${record.metadata.relations.confusable.join(', ')}`);
    }
    console.log(`\nSummary: ${fm?.summary || ''}\n`);
    if (localeEntry?.content) {
      console.log(localeEntry.content.trim());
    }
    console.log('');
  });

// tb report <type>
const reportCmd = program.command('report').description('Generate diagnostic and progress reports');

reportCmd
  .command('locales')
  .description('Report terminology coverage across locales and domains')
  .action(async () => {
    const rootDir = resolveRootDir();
    const { loadAll, generateLocaleReport } = await import('@termbridge/core');
    const repoData = loadAll(rootDir);
    const rows = generateLocaleReport(repoData);

    console.log(pc.bold(`\nTermbridge Locale Coverage Report:\n`));
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
    const { loadAll, generateReviewReport } = await import('@termbridge/core');
    const repoData = loadAll(rootDir);
    const rows = generateReviewReport(repoData);

    console.log(pc.bold(`\nPending Draft Concepts Needing Review (${rows.length}):\n`));
    if (rows.length === 0) {
      console.log(pc.green('All concepts have been reviewed! Zero pending drafts.'));
      return;
    }
    console.table(rows);
  });

// tb sources <subcommand>
const sourcesCmd = program.command('sources').description('Manage and inspect external evidence sources');

sourcesCmd
  .command('list')
  .description('List all registered sources from config/sources.yaml')
  .action(async () => {
    const rootDir = resolveRootDir();
    const { loadSourcesConfig } = await import('@termbridge/core');
    const sourcesConfig = loadSourcesConfig(rootDir);
    const entries = Object.entries(sourcesConfig);

    console.log(pc.bold(`\nTermbridge Registered Sources (${entries.length}):\n`));
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
    const { migrateAllSources } = await import('@termbridge/core');
    const result = migrateAllSources(rootDir);

    console.log(pc.bold(`\nTermbridge Sources Migration:\n`));
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
  program.parse(process.argv);
}
