import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import type { ConceptSource, SourcesConfig } from './types.js';
import { loadSourcesConfig } from './loader.js';

export function resolveSourceRef(url: string, sourcesConfig: SourcesConfig): string {
  const lower = url.toLowerCase();

  // Known specific hostnames / path patterns
  if (lower.includes('csrc.nist.gov')) return 'nist-csrc';
  if (lower.includes('investor.gov')) return 'investor-gov';
  if (lower.includes('sec.gov')) return 'sec-gov';
  if (lower.includes('kubernetes.io')) return 'k8s-glossary';
  if (lower.includes('rfc-editor.org') || lower.includes('ietf.org')) return 'ietf';
  if (lower.includes('w3.org')) return 'w3c';
  if (lower.includes('iso.org')) return 'iso-iec';
  if (lower.includes('scrumguides.org')) return 'scrum-guide';
  if (lower.includes('learn.microsoft.com')) return 'microsoft-learn';
  if (lower.includes('cloud.google.com')) return 'google-cloud-docs';
  if (lower.includes('docs.aws.amazon.com')) return 'aws-docs';
  if (lower.includes('developer.mozilla.org')) return 'mdn';
  if (lower.includes('owasp.org')) return 'owasp';
  if (lower.includes('cwe.mitre.org')) return 'mitre-cwe';
  if (lower.includes('en.wikipedia.org')) return 'wikipedia-en';
  if (lower.includes('vi.wikipedia.org')) return 'wikipedia-vi';
  if (lower.includes('vi.wiktionary.org')) return 'wiktionary-vi';
  if (lower.includes('viblo.asia')) return 'viblo';
  if (lower.includes('thuvienphapluat.vn')) return 'vn-law-cyber';

  // Generic hostname matching against sourcesConfig
  try {
    const targetHost = new URL(url).hostname.replace(/^www\./, '');
    for (const [ref, entry] of Object.entries(sourcesConfig)) {
      try {
        const entryHost = new URL(entry.url).hostname.replace(/^www\./, '');
        if (targetHost === entryHost || targetHost.endsWith('.' + entryHost)) {
          return ref;
        }
      } catch {}
    }
  } catch {}

  return 'unknown';
}

export interface ConceptMigrationResult {
  modified: boolean;
  migratedCount: number;
  warnings: string[];
}

export function migrateConceptSources(
  conceptYamlPath: string,
  sourcesConfig: SourcesConfig
): ConceptMigrationResult {
  if (!fs.existsSync(conceptYamlPath)) {
    return { modified: false, migratedCount: 0, warnings: [] };
  }

  const raw = fs.readFileSync(conceptYamlPath, 'utf-8');
  const data = yaml.load(raw) as any;
  if (!data || !Array.isArray(data.sources) || data.sources.length === 0) {
    return { modified: false, migratedCount: 0, warnings: [] };
  }

  let modified = false;
  let migratedCount = 0;
  const warnings: string[] = [];

  const newSources: Array<string | ConceptSource> = [];
  for (const item of data.sources) {
    if (typeof item === 'string') {
      const ref = resolveSourceRef(item, sourcesConfig);
      if (ref === 'unknown') {
        warnings.push(`URL '${item}' does not match any known source in config/sources.yaml; migrated to ref: unknown`);
      }
      const catalog = sourcesConfig[ref];
      const structured: ConceptSource = {
        ref,
        locator: item,
        title: catalog?.title || 'External Reference',
        language: catalog?.languages?.[0] || 'en',
        accessed: '2026-10-14',
        retrieved_by: 'ai',
        supports: ['definition', 'summary'],
      };
      newSources.push(structured);
      modified = true;
      migratedCount++;
    } else {
      newSources.push(item);
    }
  }

  if (modified) {
    data.sources = newSources;
    fs.writeFileSync(conceptYamlPath, yaml.dump(data, { lineWidth: -1 }), 'utf-8');
  }

  return { modified, migratedCount, warnings };
}

export interface BatchMigrationResult {
  totalConcepts: number;
  migratedConcepts: number;
  migratedSourcesCount: number;
  warnings: string[];
}

export function migrateAllSources(rootDir: string): BatchMigrationResult {
  const sourcesConfig = loadSourcesConfig(rootDir);
  const conceptsDir = path.join(rootDir, 'concepts');
  const result: BatchMigrationResult = {
    totalConcepts: 0,
    migratedConcepts: 0,
    migratedSourcesCount: 0,
    warnings: [],
  };

  if (!fs.existsSync(conceptsDir)) return result;

  const entries = fs.readdirSync(conceptsDir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    result.totalConcepts++;
    const conceptYamlPath = path.join(conceptsDir, entry.name, 'concept.yaml');
    const res = migrateConceptSources(conceptYamlPath, sourcesConfig);
    if (res.modified) {
      result.migratedConcepts++;
      result.migratedSourcesCount += res.migratedCount;
    }
    for (const w of res.warnings) {
      result.warnings.push(`[${entry.name}] ${w}`);
    }
  }

  return result;
}
