#!/usr/bin/env node
import { Command } from 'commander';
import path from 'node:path';
import fs from 'node:fs';
import pc from 'picocolors';
import {
  loadAll,
  validateRepository,
  buildArtifacts,
  findConcepts,
  showConcept,
  generateLocaleReport,
  generateReviewReport,
} from '@termbridge/core';

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
  .action((id: string, options: { domain: string; locales: string }) => {
    const rootDir = resolveRootDir();
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
  drafted_by: human
sources: []
`;
    fs.writeFileSync(path.join(conceptDir, 'concept.yaml'), conceptYaml, 'utf-8');

    // 2. Write locale files
    const locales = options.locales.split(',').map((s) => s.trim());
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
  .action((options: { strict: boolean }) => {
    const rootDir = resolveRootDir();
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
  .action(() => {
    const rootDir = resolveRootDir();
    const repoData = loadAll(rootDir);
    const outputs = buildArtifacts(repoData);

    console.log(pc.green(`✔ Successfully generated ${outputs.indexesGenerated.length} index files and ${outputs.distGenerated.length} dist artifacts:`));
    console.log(`  - llms.txt`);
    console.log(`  - indexes/ (master, domain, homonyms)`);
    console.log(`  - dist/ (search.json, terms.json, graph.json, concepts/)`);
  });

// tb find "<query>" [--locale vi] [--domain finance]
program
  .command('find <query>')
  .description('Reverse lookup: search concepts by plain words or colloquial descriptions')
  .option('-l, --locale <locale>', 'Target locale', 'vi')
  .option('-d, --domain <domain>', 'Filter by domain prefix')
  .action((query: string, options: { locale: string; domain?: string }) => {
    const rootDir = resolveRootDir();
    const repoData = loadAll(rootDir);
    const results = findConcepts(repoData, query, { locale: options.locale, domain: options.domain });

    if (results.length === 0) {
      console.log(pc.yellow(`No concepts matched: "${query}"`));
      return;
    }

    console.log(pc.bold(`\nSearch Results for "${pc.cyan(query)}" (${options.locale}):\n`));
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
  .action((target: string, options: { locale: string }) => {
    const rootDir = resolveRootDir();
    const repoData = loadAll(rootDir);
    const res = showConcept(repoData, target, { locale: options.locale });

    if (!res) {
      console.error(pc.red(`Concept not found: "${target}"`));
      process.exit(1);
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
  .action(() => {
    const rootDir = resolveRootDir();
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
  .action(() => {
    const rootDir = resolveRootDir();
    const repoData = loadAll(rootDir);
    const rows = generateReviewReport(repoData);

    console.log(pc.bold(`\nPending Draft Concepts Needing Review (${rows.length}):\n`));
    if (rows.length === 0) {
      console.log(pc.green('All concepts have been reviewed! Zero pending drafts.'));
      return;
    }
    console.table(rows);
  });

program.parse(process.argv);
