import fs from 'node:fs';
import path from 'node:path';
import type { ConceptRecord, RepositoryData } from './types.js';

export interface BuildOutputs {
  indexesGenerated: string[];
  distGenerated: string[];
}

export function buildArtifacts(repoData: RepositoryData): BuildOutputs {
  const { concepts, domainsConfig, localesConfig, rootDir } = repoData;

  const indexesGenerated: string[] = [];
  const distGenerated: string[] = [];

  const primaryLocales = localesConfig.locales.map((l) => l.code);
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
    const labelGroups = new Map<string, Array<{ record: ConceptRecord; label: string; qualifier?: string; summary: string }>>();

    // Group concepts by domain
    const domainMap = new Map<string, ConceptRecord[]>();
    for (const domain of domainsConfig.domains) {
      domainMap.set(domain.id, []);
    }

    const allConceptsInLocale: Array<{ record: ConceptRecord; label: string; summary: string }> = [];
    const searchEntries: any[] = [];
    const termsEntries: any[] = [];

    for (const record of concepts.values()) {
      const entry = record.locales[locale];
      const fallbackEntry = record.locales[localesConfig.pivot] || Object.values(record.locales)[0];
      const activeEntry = entry || fallbackEntry;

      if (!activeEntry) continue;

      const fm = activeEntry.frontmatter;
      const label = fm.label || record.id;
      const summary = fm.summary || '';
      const qualifier = fm.qualifier;

      // Group homonyms
      const normLabel = label.trim().toLowerCase();
      if (!labelGroups.has(normLabel)) {
        labelGroups.set(normLabel, []);
      }
      labelGroups.get(normLabel)!.push({
        record,
        label,
        qualifier,
        summary,
      });

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

      // Build terms.json entry
      const termConcept = {
        id: record.id,
        label,
        qualifier,
        summary,
        domains: record.metadata.domains,
      };

      // Add main label
      termsEntries.push({
        key: label,
        match: label.length <= 4 && label === label.toUpperCase() ? 'exact-case' : 'any-case',
        concepts: [termConcept],
        autolink: label.length > 3,
      });

      // Add aliases
      if (fm.aliases) {
        for (const alias of fm.aliases) {
          termsEntries.push({
            key: alias,
            match: alias.length <= 4 && alias === alias.toUpperCase() ? 'exact-case' : 'any-case',
            concepts: [termConcept],
            autolink: alias.length > 3,
          });
        }
      }

      // Generate dist/<locale>/concepts/<id>.json
      const conceptDistPath = path.join(localeConceptsDistDir, `${record.id}.json`);
      fs.writeFileSync(
        conceptDistPath,
        JSON.stringify(
          {
            id: record.id,
            metadata: record.metadata,
            locale,
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
          mdContent += `- [**${l}${q}**](${rec.id}): ${plains ? `*${plains}* — ` : ''}${s}\n`;
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
      allMdContent += `- [**${item.label}${q}**](${rec.id}) [${rec.metadata.domains.join(', ')}]: ${plains ? `*${plains}* — ` : ''}${item.summary}\n`;
    }
    const allIndexPath = path.join(localeIndexDir, '_all.md');
    fs.writeFileSync(allIndexPath, allMdContent, 'utf-8');
    indexesGenerated.push(allIndexPath);

    // Write indexes/<locale>/_homonyms.md
    let homonymsMd = `# Homonyms Index (${locale})\n\nTerms sharing identical labels distinguished by qualifiers and context:\n\n`;
    let hasHomonym = false;
    for (const [key, group] of labelGroups.entries()) {
      if (group.length > 1) {
        hasHomonym = true;
        homonymsMd += `## ${group[0].label}\n`;
        for (const g of group) {
          const q = g.qualifier ? ` ${g.qualifier}` : '';
          homonymsMd += `- [**${g.label}${q}**](${g.record.id}) [${g.record.metadata.domains.join(', ')}]: ${g.summary}\n`;
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

    // Write dist/<locale>/terms.json
    const termsDistPath = path.join(localeDistDir, 'terms.json');
    fs.writeFileSync(termsDistPath, JSON.stringify(termsEntries, null, 2), 'utf-8');
    distGenerated.push(termsDistPath);

    // If locale is primary or Vietnamese/English, copy terms.json into packages/claude-mod/data/
    const claudeModDataDir = path.join(rootDir, 'packages', 'claude-mod', 'data');
    if (fs.existsSync(claudeModDataDir) && locale === 'vi') {
      fs.writeFileSync(path.join(claudeModDataDir, 'terms.json'), JSON.stringify(termsEntries, null, 2), 'utf-8');
    }
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
  };
}
