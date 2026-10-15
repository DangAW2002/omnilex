import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import matter from 'gray-matter';
import type {
  ConceptMetadata,
  ConceptRecord,
  DomainsConfig,
  LocaleEntry,
  LocaleEntryFrontmatter,
  LocalesConfig,
  RepositoryData,
  ReviewersConfig,
  SourcesConfig,
  TaxonomyNode,
} from './types.js';

export function loadSourcesConfig(rootDir: string): SourcesConfig {
  const filePath = path.join(rootDir, 'config', 'sources.yaml');
  if (!fs.existsSync(filePath)) {
    return {};
  }
  const content = fs.readFileSync(filePath, 'utf-8');
  return (yaml.load(content) as SourcesConfig) || {};
}

export function loadCommonWords(rootDir: string): Record<string, Set<string>> {
  const configDir = path.join(rootDir, 'config');
  const result: Record<string, Set<string>> = {};
  if (!fs.existsSync(configDir)) return result;

  for (const file of fs.readdirSync(configDir)) {
    const match = file.match(/^common-words\.([a-z0-9_-]+)\.txt$/i);
    if (match) {
      const locale = match[1];
      const filePath = path.join(configDir, file);
      const lines = fs.readFileSync(filePath, 'utf-8')
        .split('\n')
        .map((l) => l.trim().toLowerCase())
        .filter((l) => l.length > 0 && !l.startsWith('#'));
      result[locale] = new Set(lines);
    }
  }
  return result;
}

export function loadLocalesConfig(rootDir: string): LocalesConfig {
  const filePath = path.join(rootDir, 'config', 'locales.yaml');
  const content = fs.readFileSync(filePath, 'utf-8');
  return yaml.load(content) as LocalesConfig;
}

export function loadDomainsConfig(rootDir: string): DomainsConfig {
  const filePath = path.join(rootDir, 'config', 'domains.yaml');
  const content = fs.readFileSync(filePath, 'utf-8');
  return yaml.load(content) as DomainsConfig;
}

export function loadReviewersConfig(rootDir: string): ReviewersConfig {
  const filePath = path.join(rootDir, 'config', 'reviewers.yaml');
  if (!fs.existsSync(filePath)) {
    return { reviewers: {} };
  }
  const content = fs.readFileSync(filePath, 'utf-8');
  return yaml.load(content) as ReviewersConfig;
}

export function extractTaxonomyPaths(node: TaxonomyNode, prefix = ''): string[] {
  const currentPath = prefix ? `${prefix}/${node.id}` : node.id;
  const paths: string[] = [currentPath];
  if (node.children && Array.isArray(node.children)) {
    for (const child of node.children) {
      paths.push(...extractTaxonomyPaths(child, currentPath));
    }
  }
  return paths;
}

export function loadTaxonomy(rootDir: string): {
  trees: Map<string, TaxonomyNode>;
  validDomainPaths: Set<string>;
} {
  const taxonomyDir = path.join(rootDir, 'taxonomy');
  const trees = new Map<string, TaxonomyNode>();
  const validDomainPaths = new Set<string>();

  if (!fs.existsSync(taxonomyDir)) {
    return { trees, validDomainPaths };
  }

  const files = fs.readdirSync(taxonomyDir).filter((f) => f.endsWith('.yaml') || f.endsWith('.yml')).sort();
  for (const file of files) {
    const filePath = path.join(taxonomyDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const tree = yaml.load(content) as TaxonomyNode;
    if (tree && tree.id) {
      trees.set(tree.id, tree);
      const paths = extractTaxonomyPaths(tree);
      for (const p of paths) {
        validDomainPaths.add(p);
      }
    }
  }

  return { trees, validDomainPaths };
}

export function loadConcepts(rootDir: string): Map<string, ConceptRecord> {
  return loadConceptsFrom(path.join(rootDir, 'concepts'));
}

// Concept directories under any folder (the repository's concepts/, a project glossary).
export function loadConceptsFrom(conceptsDir: string): Map<string, ConceptRecord> {
  const concepts = new Map<string, ConceptRecord>();

  if (!fs.existsSync(conceptsDir)) {
    return concepts;
  }

  const entries = fs.readdirSync(conceptsDir, { withFileTypes: true }).sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const dirPath = path.join(conceptsDir, entry.name);
    const conceptYamlPath = path.join(dirPath, 'concept.yaml');

    if (!fs.existsSync(conceptYamlPath)) {
      concepts.set(entry.name, { id: entry.name, dirPath, metadata: { id: entry.name } as any, locales: {} });
      continue;
    }

    try {
      const rawYaml = fs.readFileSync(conceptYamlPath, 'utf-8');
      const metadata = yaml.load(rawYaml) as ConceptMetadata;

      const locales: Record<string, LocaleEntry> = {};
      const dirFiles = fs.readdirSync(dirPath).sort();
      for (const file of dirFiles) {
        if (file.endsWith('.md')) {
          const locale = path.basename(file, '.md');
          const mdPath = path.join(dirPath, file);
          const rawMd = fs.readFileSync(mdPath, 'utf-8');
          const parsed = matter(rawMd);
          locales[locale] = {
            locale,
            frontmatter: parsed.data as LocaleEntryFrontmatter,
            content: parsed.content,
            filePath: mdPath,
          };
        }
      }

      concepts.set(entry.name, {
        id: metadata?.id || entry.name,
        dirPath,
        metadata,
        locales,
      });
    } catch (err) {
      // In case of syntax error in concept.yaml, register placeholder for validator to flag
      concepts.set(entry.name, {
        id: entry.name,
        dirPath,
        metadata: { id: entry.name } as any,
        locales: {},
      });
    }
  }

  return concepts;
}

export function loadAll(rootDir: string): RepositoryData {
  const localesConfig = loadLocalesConfig(rootDir);
  const domainsConfig = loadDomainsConfig(rootDir);
  const reviewersConfig = loadReviewersConfig(rootDir);
  const { trees, validDomainPaths } = loadTaxonomy(rootDir);
  const concepts = loadConcepts(rootDir);
  const sourcesConfig = loadSourcesConfig(rootDir);
  const commonWords = loadCommonWords(rootDir);

  return {
    rootDir,
    concepts,
    taxonomy: trees,
    validDomainPaths,
    localesConfig,
    domainsConfig,
    reviewersConfig,
    sourcesConfig,
    commonWords,
  };
}
