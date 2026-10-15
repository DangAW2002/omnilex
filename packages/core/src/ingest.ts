// tb ingest (Plan 2.8f): turns a source's glossary into candidates/<source>.yaml
// with source metadata filled in. Term names come from every source; original
// definitions only from a reuse: adapt source whose licence a reviewer verified
// (D12). Everything else keeps term names and links only.
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import type { SourceCatalogEntry } from './types.js';

export interface IngestEntry {
  term: string;
  locator: string;
  // only when the source may be adapted (D12)
  definition?: string;
}

export interface IngestResult {
  source: string;
  reuse: SourceCatalogEntry['reuse'];
  license: string;
  definitionsIncluded: boolean;
  entries: IngestEntry[];
}

export interface IngestAdapter {
  sources: string[];
  description: string;
  // a local file or directory to read instead of the network
  fromPath(target: string): Array<IngestEntry & { definition?: string }>;
  fromNetwork?(): Promise<Array<IngestEntry & { definition?: string }>>;
}

function frontMatter(text: string): Record<string, any> {
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text);
  if (!match) return {};
  try {
    return (yaml.load(match[1]) as Record<string, any>) || {};
  } catch {
    return {};
  }
}

// kubernetes/website: content/en/docs/reference/glossary/<id>.md with
// title, id, full_link and short_description in the front matter.
function kubernetesEntry(file: string, text: string): IngestEntry | null {
  const fm = frontMatter(text);
  if (!fm.title) return null;
  const id = fm.id || path.basename(file, '.md');
  return {
    term: String(fm.title).trim(),
    locator: `https://kubernetes.io/docs/reference/glossary/?all=true#term-${id}`,
    definition: typeof fm.short_description === 'string' ? fm.short_description.replace(/\{\{<[^>]*>\}\}/g, '').replace(/\s+/g, ' ').trim() : undefined,
  };
}

const KUBERNETES_API = 'https://api.github.com/repos/kubernetes/website/contents/content/en/docs/reference/glossary';

function parseCsvLine(line: string): string[] {
  const out: string[] = [];
  let field = '';
  let quoted = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (quoted) {
      if (ch === '"' && line[i + 1] === '"') { field += '"'; i++; }
      else if (ch === '"') quoted = false;
      else field += ch;
    } else if (ch === '"' && field === '') quoted = true;
    else if (ch === ',') { out.push(field); field = ''; }
    else field += ch;
  }
  out.push(field);
  return out;
}

export const INGEST_ADAPTERS: Record<string, IngestAdapter> = {
  kubernetes: {
    sources: ['k8s-glossary'],
    description: 'Kubernetes glossary (kubernetes/website content/en/docs/reference/glossary/*.md)',
    fromPath(target) {
      const files = fs.statSync(target).isDirectory()
        ? fs.readdirSync(target).filter((name) => name.endsWith('.md') && !name.startsWith('_')).sort().map((name) => path.join(target, name))
        : [target];
      return files.map((file) => kubernetesEntry(file, fs.readFileSync(file, 'utf-8'))).filter((entry): entry is IngestEntry => entry !== null);
    },
    async fromNetwork() {
      const list = await (await fetch(KUBERNETES_API, { headers: { Accept: 'application/vnd.github+json' } })).json();
      if (!Array.isArray(list)) throw new Error('GitHub API: không đọc được danh sách glossary / cannot list the glossary');
      const entries: IngestEntry[] = [];
      for (const item of list.filter((file: any) => file.name.endsWith('.md') && !file.name.startsWith('_'))) {
        const text = await (await fetch(item.download_url)).text();
        const entry = kubernetesEntry(item.name, text);
        if (entry) entries.push(entry);
      }
      return entries.sort((a, b) => a.term.localeCompare(b.term));
    },
  },
  csv: {
    sources: [],
    description: 'Any glossary as CSV with the columns term,url[,definition]',
    fromPath(target) {
      const [header, ...lines] = fs.readFileSync(target, 'utf-8').split(/\r?\n/).filter((line) => line.trim());
      const columns = parseCsvLine(header).map((name) => name.trim().toLowerCase());
      const at = (name: string) => columns.indexOf(name);
      if (at('term') < 0 || at('url') < 0) throw new Error('CSV cần cột term và url / CSV needs term and url columns');
      return lines.map((line) => {
        const cells = parseCsvLine(line);
        return {
          term: cells[at('term')]?.trim() || '',
          locator: cells[at('url')]?.trim() || '',
          definition: at('definition') >= 0 ? cells[at('definition')]?.trim() || undefined : undefined,
        };
      }).filter((entry) => entry.term && entry.locator);
    },
  },
};

export function adapterFor(sourceId: string, explicit?: string): IngestAdapter | null {
  if (explicit) return INGEST_ADAPTERS[explicit] || null;
  return Object.values(INGEST_ADAPTERS).find((adapter) => adapter.sources.includes(sourceId)) || null;
}

// D12: original text only for adapt sources with a reviewer-verified licence.
export function mayAdapt(source: SourceCatalogEntry): boolean {
  return source.reuse === 'adapt' && !!source.license_verified_by && !!source.license_evidence && !!source.verified_license_at;
}

export function ingestEntries(sourceId: string, source: SourceCatalogEntry, entries: IngestEntry[]): IngestResult {
  const definitionsIncluded = mayAdapt(source);
  const seen = new Set<string>();
  return {
    source: sourceId,
    reuse: source.reuse,
    license: source.license,
    definitionsIncluded,
    entries: entries
      .filter((entry) => {
        const key = entry.term.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .map((entry) => ({ term: entry.term, locator: entry.locator, ...(definitionsIncluded && entry.definition ? { definition: entry.definition } : {}) })),
  };
}

// candidates/<source>.yaml: one entry per term, ready for `tb new --from` once
// an id and a domain are filled in.
export function writeIngestCandidates(rootDir: string, result: IngestResult, accessed: string, language = 'en'): string {
  const file = path.join(rootDir, 'candidates', `${result.source}.yaml`);
  const doc = {
    generated_by: `tb ingest ${result.source}`,
    source: result.source,
    reuse: result.reuse,
    license: result.license,
    definitions: result.definitionsIncluded ? 'included (reuse: adapt, licence verified)' : 'omitted (term names and links only)',
    candidates: result.entries.map((entry) => ({
      term: entry.term,
      id: null,
      domain: null,
      source: { ref: result.source, locator: entry.locator, language, accessed, retrieved_by: 'ai', supports: ['definition'] },
      ...(entry.definition ? { definition: entry.definition } : {}),
    })),
  };
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, yaml.dump(doc, { lineWidth: 120 }), 'utf-8');
  return file;
}
