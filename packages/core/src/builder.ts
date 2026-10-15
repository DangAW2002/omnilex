import fs from 'node:fs';
import path from 'node:path';
import type { ConceptRecord, RepositoryData } from './types.js';
import { mergeTerms, termConceptFromCard, type PackCard, type PackTerm } from './pack-format.js';
import { alsoInPacks, groupPacks, renderPacks, writePackFiles, type PackConceptData } from './packs.js';

export interface BuildOutputs {
  indexesGenerated: string[];
  distGenerated: string[];
  warnings: string[];
}

const RUNTIME_MODULES = [
  'matcher', 'lookup', 'search-config', 'pack-format', 'pack-reader', 'semver', 'config', 'resolver', 'project',
];

function repoVersion(rootDir: string): string {
  try {
    return JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf-8')).version || '0.0.0';
  } catch {
    return '0.0.0';
  }
}

export function buildArtifacts(repoData: RepositoryData): BuildOutputs {
  const { concepts, domainsConfig, localesConfig, rootDir } = repoData;

  const indexesGenerated: string[] = [];
  const distGenerated: string[] = [];
  const conceptLink = (record: ConceptRecord, locale: string) =>
    `../../concepts/${record.id}/${record.locales[locale] ? locale : localesConfig.pivot}.md`;

  const primaryLocales = localesConfig.locales.map((l) => l.code);
  const packConcepts: Record<string, PackConceptData[]> = {};
  const indexesDir = path.join(rootDir, 'indexes');
  const distDir = path.join(rootDir, 'dist');

  // Ensure directories exist
  fs.mkdirSync(indexesDir, { recursive: true });
  fs.mkdirSync(distDir, { recursive: true });

  // 1. Generate indexes per locale
  for (const locale of primaryLocales) {
    const localeIndexDir = path.join(indexesDir, locale);
    const localeDistDir = path.join(distDir, locale);
    const localeConceptsDistDir = path.join(localeDistDir, 'concepts');

    fs.mkdirSync(localeIndexDir, { recursive: true });
    fs.mkdirSync(localeConceptsDistDir, { recursive: true });

    // Track homonyms in this locale
    const labelGroups = new Map<string, { term: string; entries: Array<{ record: ConceptRecord; label: string; qualifier?: string; summary: string }> }>();

    // Group concepts by domain
    const domainMap = new Map<string, ConceptRecord[]>();
    for (const domain of domainsConfig.domains) {
      domainMap.set(domain.id, []);
    }

    const allConceptsInLocale: Array<{ record: ConceptRecord; label: string; summary: string }> = [];
    const searchEntries: any[] = [];
    const termsEntries: PackTerm[] = [];
    const modConcepts: any[] = [];
    const cardsById = new Map<string, PackCard>();
    const localePackConcepts: PackConceptData[] = [];
    packConcepts[locale] = localePackConcepts;

    for (const record of concepts.values()) {
      const entry = record.locales[locale];
      const fallbackEntry = record.locales[localesConfig.pivot] || Object.values(record.locales)[0];
      const activeEntry = entry || fallbackEntry;

      if (!activeEntry) continue;

      const fm = activeEntry.frontmatter;
      const label = fm.label || record.id;
      const summary = fm.summary || '';
      const qualifier = fm.qualifier;

      // Labels and aliases can both identify an ambiguous term.
      for (const term of new Set([label, ...(fm.aliases || [])])) {
        const key = term.trim().toLowerCase();
        if (!labelGroups.has(key)) labelGroups.set(key, { term, entries: [] });
        const group = labelGroups.get(key)!;
        if (!group.entries.some((item) => item.record.id === record.id)) {
          group.entries.push({ record, label, qualifier, summary });
        }
      }

      // Domain assignment
      for (const d of record.metadata.domains) {
        const rootDomainId = d.split('/')[0];
        if (domainMap.has(rootDomainId)) {
          domainMap.get(rootDomainId)!.push(record);
        }
      }

      allConceptsInLocale.push({ record, label, summary });

      // Build search.json entry
      searchEntries.push({
        id: record.id,
        label,
        qualifier,
        aliases: fm.aliases || [],
        loanwords: fm.loanwords || [],
        plain_descriptions: fm.plain_descriptions || [],
        summary,
        domains: record.metadata.domains,
        level: record.metadata.level,
        status: record.metadata.status,
      });

      if (locale === 'vi' || locale === 'en') {
        modConcepts.push({ id: record.id, content: activeEntry.content });
      }

      const card: PackCard = {
        id: record.id,
        label,
        qualifier,
        summary,
        plain_descriptions: fm.plain_descriptions || [],
        aliases: fm.aliases || [],
        loanwords: fm.loanwords || [],
        domains: record.metadata.domains,
        alsoIn: alsoInPacks(record.metadata.domains, domainsConfig),
        level: record.metadata.level,
        status: record.metadata.status,
      };
      cardsById.set(record.id, card);
      const conceptTerms: PackTerm[] = [];

      // Add main label
      const labelAutolinkConfig = fm.autolink?.label;
      const labelAutolink = labelAutolinkConfig === 'always'
        ? true
        : labelAutolinkConfig === 'never'
        ? false
        : label.length > 3;

      conceptTerms.push({
        key: label,
        match: label.length <= 4 && label === label.toUpperCase() ? 'exact-case' : 'any-case',
        autolink: labelAutolink,
        autolinkConfig: labelAutolinkConfig,
        conceptId: record.id,
      });

      // Add aliases
      if (fm.aliases) {
        for (const alias of fm.aliases) {
          const aliasAutolinkConfig = fm.autolink?.aliases?.[alias];
          const aliasAutolink = aliasAutolinkConfig === 'always'
            ? true
            : aliasAutolinkConfig === 'never'
            ? false
            : alias.length > 3;

          conceptTerms.push({
            key: alias,
            match: alias.length <= 4 && alias === alias.toUpperCase() ? 'exact-case' : 'any-case',
            autolink: aliasAutolink,
            autolinkConfig: aliasAutolinkConfig,
            conceptId: record.id,
          });
        }
      }

      termsEntries.push(...conceptTerms);

      const contentLocale = entry ? locale : (record.locales[localesConfig.pivot] ? localesConfig.pivot : fallbackEntry?.locale);
      localePackConcepts.push({
        card,
        terms: conceptTerms,
        explanation: {
          id: record.id,
          locale,
          content_locale: contentLocale,
          metadata: record.metadata,
          entry: { locale: activeEntry.locale, frontmatter: activeEntry.frontmatter, content: activeEntry.content },
        },
      });

      // Generate dist/<locale>/concepts/<id>.json
      const conceptDistPath = path.join(localeConceptsDistDir, `${record.id}.json`);
      fs.writeFileSync(
        conceptDistPath,
        JSON.stringify(
          {
            id: record.id,
            metadata: record.metadata,
            locale,
            content_locale: contentLocale,
            entry: activeEntry,
          },
          null,
          2
        ),
        'utf-8'
      );
      distGenerated.push(conceptDistPath);
    }

    // Write indexes/<locale>/<domain>.md
    for (const domain of domainsConfig.domains) {
      const records = domainMap.get(domain.id) || [];
      const domainTitle = domain.name[locale] || domain.name.en || domain.id;
      let mdContent = `# Termbridge Index: ${domainTitle} (${locale})\n\n`;

      if (records.length === 0) {
        mdContent += `*No concepts currently indexed in this domain.*\n`;
      } else {
        for (const rec of records) {
          const e = rec.locales[locale] || rec.locales[localesConfig.pivot];
          const l = e?.frontmatter.label || rec.id;
          const q = e?.frontmatter.qualifier ? ` ${e.frontmatter.qualifier}` : '';
          const plains = (e?.frontmatter.plain_descriptions || []).join('; ');
          const s = e?.frontmatter.summary || '';
          mdContent += `- [**${l}${q}**](${conceptLink(rec, locale)}): ${plains ? `*${plains}* — ` : ''}${s}\n`;
        }
      }

      const domainIndexPath = path.join(localeIndexDir, `${domain.id}.md`);
      fs.writeFileSync(domainIndexPath, mdContent, 'utf-8');
      indexesGenerated.push(domainIndexPath);
    }

    // Write indexes/<locale>/_all.md
    let allMdContent = `# Termbridge Master Index (${locale})\n\n`;
    for (const item of allConceptsInLocale) {
      const rec = item.record;
      const e = rec.locales[locale] || rec.locales[localesConfig.pivot];
      const q = e?.frontmatter.qualifier ? ` ${e.frontmatter.qualifier}` : '';
      const plains = (e?.frontmatter.plain_descriptions || []).join(', ');
      allMdContent += `- [**${item.label}${q}**](${conceptLink(rec, locale)}) [${rec.metadata.domains.join(', ')}]: ${plains ? `*${plains}* — ` : ''}${item.summary}\n`;
    }
    const allIndexPath = path.join(localeIndexDir, '_all.md');
    fs.writeFileSync(allIndexPath, allMdContent, 'utf-8');
    indexesGenerated.push(allIndexPath);

    // Write indexes/<locale>/_homonyms.md
    let homonymsMd = `# Homonyms Index (${locale})\n\nTerms sharing a label or alias, distinguished by context:\n\n`;
    let hasHomonym = false;
    for (const group of labelGroups.values()) {
      if (group.entries.length > 1) {
        hasHomonym = true;
        homonymsMd += `## ${group.term}\n`;
        for (const g of group.entries) {
          const q = g.qualifier ? ` ${g.qualifier}` : '';
          homonymsMd += `- [**${g.label}${q}**](${conceptLink(g.record, locale)}) [${g.record.metadata.domains.join(', ')}]: ${g.summary}\n`;
        }
        homonymsMd += `\n`;
      }
    }
    if (!hasHomonym) {
      homonymsMd += `*No homonyms currently recorded in this locale.*\n`;
    }
    const homonymIndexPath = path.join(localeIndexDir, '_homonyms.md');
    fs.writeFileSync(homonymIndexPath, homonymsMd, 'utf-8');
    indexesGenerated.push(homonymIndexPath);

    // Write dist/<locale>/search.json
    const searchDistPath = path.join(localeDistDir, 'search.json');
    fs.writeFileSync(searchDistPath, JSON.stringify(searchEntries, null, 2), 'utf-8');
    distGenerated.push(searchDistPath);

    // Never auto-link a term that points to multiple concepts.
    const uniqueTerms = mergeTerms(termsEntries, (id) => {
      const card = cardsById.get(id);
      return card ? termConceptFromCard(card) : undefined;
    });

    // Write dist/<locale>/terms.json
    const termsDistPath = path.join(localeDistDir, 'terms.json');
    fs.writeFileSync(termsDistPath, JSON.stringify(uniqueTerms, null, 2), 'utf-8');
    distGenerated.push(termsDistPath);

    // Bundle lookup data so the mod also works outside this repository.
    const claudeModDataDir = path.join(rootDir, 'packages', 'claude-mod', 'data');
    if (fs.existsSync(claudeModDataDir) && (locale === 'vi' || locale === 'en')) {
      fs.writeFileSync(path.join(claudeModDataDir, `terms-${locale}.json`), JSON.stringify(uniqueTerms, null, 2), 'utf-8');
      fs.writeFileSync(path.join(claudeModDataDir, `search-${locale}.json`), JSON.stringify(searchEntries, null, 2), 'utf-8');
      fs.writeFileSync(path.join(claudeModDataDir, `concepts-${locale}.json`), JSON.stringify(modConcepts, null, 2), 'utf-8');
      if (locale === 'vi') {
        fs.writeFileSync(path.join(claudeModDataDir, 'terms.json'), JSON.stringify(uniqueTerms, null, 2), 'utf-8');
      }
    }
  }

  // Packs (Plan 3.2, D5): dist/manifest.json and dist/packs/<id>/...
  const grouped = groupPacks(packConcepts, domainsConfig, repoData.taxonomy);
  const rendered = renderPacks({
    version: repoVersion(rootDir),
    locales: primaryLocales,
    content: grouped.content,
    meta: grouped.meta,
  });
  distGenerated.push(...writePackFiles(distDir, rendered.files));

  // Generate packages/claude-mod/hooks/runtime/: the core modules the mod
  // imports, plus self-contained ESM builds of their two dependencies. Bare
  // imports become relative ones, since the mod has no module resolution.
  const claudeModHooksDir = path.join(rootDir, 'packages', 'claude-mod', 'hooks');
  const claudeModRuntimeDir = path.join(claudeModHooksDir, 'runtime');
  if (fs.existsSync(claudeModHooksDir)) {
    fs.mkdirSync(claudeModRuntimeDir, { recursive: true });
    const coreDir = path.join(rootDir, 'packages', 'core');
    const runtimeFiles: Array<[string, string]> = [
      ...RUNTIME_MODULES.map((name): [string, string] => [path.join(coreDir, 'dist', `${name}.js`), `${name}.js`]),
      [path.join(coreDir, 'node_modules', 'minisearch', 'dist', 'es', 'index.js'), 'minisearch.js'],
      [path.join(coreDir, 'node_modules', 'js-yaml', 'dist', 'js-yaml.mjs'), 'js-yaml.js'],
    ];
    for (const [source, name] of runtimeFiles) {
      if (!fs.existsSync(source)) continue;
      const code = fs.readFileSync(source, 'utf-8')
        .replace(/\r\n/g, '\n')
        .replace(/^\/\/# sourceMappingURL=.*$/gm, '')
        .replace(/from '(minisearch|js-yaml)'/g, (_match, dep) => `from './${dep}.js'`);
      const target = path.join(claudeModRuntimeDir, name);
      fs.writeFileSync(target, code, 'utf-8');
      distGenerated.push(target);
    }
  }

  const expectedIndexes = new Set(indexesGenerated.map((file) => path.resolve(file)));
  for (const localeDir of fs.readdirSync(indexesDir, { withFileTypes: true })) {
    if (!localeDir.isDirectory()) continue;
    const localePath = path.join(indexesDir, localeDir.name);
    for (const entry of fs.readdirSync(localePath, { withFileTypes: true })) {
      const filePath = path.join(localePath, entry.name);
      if (entry.isFile() && !expectedIndexes.has(path.resolve(filePath))) fs.unlinkSync(filePath);
    }
    if (fs.readdirSync(localePath).length === 0) fs.rmdirSync(localePath);
  }

  // 2. Generate dist/graph.json
  const graphNodes: any[] = [];
  const graphEdges: any[] = [];

  for (const record of concepts.values()) {
    graphNodes.push({
      id: record.id,
      label: record.locales.en?.frontmatter.label || record.locales.vi?.frontmatter.label || record.id,
      domains: record.metadata.domains,
      level: record.metadata.level,
      status: record.metadata.status,
    });

    const relations = record.metadata.relations || {};
    if (relations.prerequisites) {
      for (const prereq of relations.prerequisites) {
        graphEdges.push({ source: prereq, target: record.id, type: 'prerequisite' });
      }
    }
    if (relations.broader) {
      for (const b of relations.broader) {
        graphEdges.push({ source: b, target: record.id, type: 'broader' });
      }
    }
    if (relations.confusable) {
      for (const c of relations.confusable) {
        graphEdges.push({ source: record.id, target: c, type: 'confusable' });
      }
    }
  }

  const graphPath = path.join(distDir, 'graph.json');
  fs.writeFileSync(graphPath, JSON.stringify({ nodes: graphNodes, edges: graphEdges }, null, 2), 'utf-8');
  distGenerated.push(graphPath);

  // 3. Generate llms.txt at root
  const llmsTxtContent = `# Termbridge Knowledge Repository Map for LLMs

> Termbridge is an open-source multilingual, multi-domain terminology repository.
> Source of truth: YAML/Markdown files in Git.
> Standard workflow: Read index files first, then open targeted concepts.

## Primary Locales
- Vietnamese (vi): [indexes/vi/_all.md](indexes/vi/_all.md)
- English (en): [indexes/en/_all.md](indexes/en/_all.md)

## Domain Indexes
- Finance (vi): [indexes/vi/finance.md](indexes/vi/finance.md) | (en): [indexes/en/finance.md](indexes/en/finance.md)
- Media (vi): [indexes/vi/media.md](indexes/vi/media.md) | (en): [indexes/en/media.md](indexes/en/media.md)
- Information Technology (vi): [indexes/vi/it.md](indexes/vi/it.md) | (en): [indexes/en/it.md](indexes/en/it.md)

## Disambiguation
- Homonyms Index (vi): [indexes/vi/_homonyms.md](indexes/vi/_homonyms.md)
- Homonyms Index (en): [indexes/en/_homonyms.md](indexes/en/_homonyms.md)

## Concept Directories
Each concept lives under \`concepts/<concept-id>/\` containing:
- \`concept.yaml\`: Language-neutral metadata, domain tags, relations.
- \`vi.md\`: Vietnamese layered explanations and plain descriptors.
- \`en.md\`: English layered explanations and plain descriptors.
`;

  const llmsTxtPath = path.join(rootDir, 'llms.txt');
  fs.writeFileSync(llmsTxtPath, llmsTxtContent, 'utf-8');
  indexesGenerated.push(llmsTxtPath);

  return {
    indexesGenerated,
    distGenerated,
    warnings: rendered.warnings,
  };
}
