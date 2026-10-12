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
  TaxonomyNode,
} from './types.js';

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

  const files = fs.readdirSync(taxonomyDir).filter((f) => f.endsWith('.yaml') || f.endsWith('.yml'));
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
  const conceptsDir = path.join(rootDir, 'concepts');
  const concepts = new Map<string, ConceptRecord>();

  if (!fs.existsSync(conceptsDir)) {
    return concepts;
  }

  const entries = fs.readdirSync(conceptsDir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const dirPath = path.join(conceptsDir, entry.name);
    const conceptYamlPath = path.join(dirPath, 'concept.yaml');

    if (!fs.existsSync(conceptYamlPath)) continue;

    try {
      const rawYaml = fs.readFileSync(conceptYamlPath, 'utf-8');
      const metadata = yaml.load(rawYaml) as ConceptMetadata;

      const locales: Record<string, LocaleEntry> = {};
      const dirFiles = fs.readdirSync(dirPath);
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

  return {
    rootDir,
    concepts,
    taxonomy: trees,
    validDomainPaths,
    localesConfig,
    domainsConfig,
    reviewersConfig,
  };
}
