import type { TermConcept, TermEntry } from './matcher.js';
import type { SearchDoc } from './search-config.js';

// Plain data and pure helpers shared by the builder and every reader. No Node
// APIs, so the mod runtime can load this file as is.
export const PACK_FORMAT_VERSION = 1;
export const PACK_TIERS = ['terms', 'cards', 'search', 'explanations'] as const;
export const PACK_TIER_FILES: Record<PackTier, string> = {
  terms: 'terms.json',
  cards: 'cards.json',
  search: 'search-index.json',
  explanations: 'explanations.jsonl',
};
export const PACK_SPLIT_WARNING = 2000;
// D6: the starter pack ships terms, cards and search only, at most 1 MB.
export const STARTER_PACK_ID = 'starter';
export const STARTER_TIERS: PackTier[] = ['terms', 'cards', 'search'];
export const STARTER_MAX_CONCEPTS = 300;
export const STARTER_MAX_BYTES = 1024 * 1024;

export type PackTier = typeof PACK_TIERS[number];
export type PackKind = 'content' | 'meta';
export type PackingMode = 'root' | 'branch';

export interface PackFileInfo {
  bytes: number;
  sha256: string;
}

export interface PackTierInfo {
  bytes: number;
  files: Record<string, PackFileInfo>;
  configHash?: string;
}

// One reused source (reuse: adapt) and the concepts that draw on it (2.8a).
export interface PackAttribution {
  ref: string;
  title: string;
  publisher?: string;
  url: string;
  license: string;
  license_evidence?: string;
  concepts: string[];
}

export interface PackJson {
  id: string;
  version: string;
  formatVersion: number;
  kind: PackKind;
  role?: 'starter';
  title: Record<string, string>;
  domains: string[];
  locales: string[];
  requires: Record<string, string>;
  concepts: number;
  status: Record<string, number>;
  tiers?: Partial<Record<PackTier, PackTierInfo>>;
  attributions?: PackFileInfo & { path: string };
  license: string;
}

export interface ManifestPackEntry {
  id: string;
  kind: PackKind;
  role?: 'starter';
  version: string;
  path: string;
  sha256: string;
  concepts: number;
}

// One index over every content pack, so the default "all packs" selection
// ranks exactly like a single corpus (BM25 statistics are per index).
export interface ManifestSearch {
  packs: string[];
  files: Record<string, PackFileInfo & { path: string }>;
}

export interface PackManifest {
  formatVersion: number;
  searchConfigHash: string;
  locales: string[];
  packs: ManifestPackEntry[];
  search?: ManifestSearch;
}

export interface PackCard {
  id: string;
  label: string;
  qualifier?: string;
  summary: string;
  plain_descriptions: string[];
  aliases: string[];
  loanwords: string[];
  domains: string[];
  alsoIn: string[];
  level: number;
  status: string;
}

export interface PackTerm {
  key: string;
  match: 'exact-case' | 'any-case';
  autolink: boolean;
  autolinkConfig?: 'always' | 'never' | 'auto';
  conceptId: string;
}

export interface PackExplanation {
  id: string;
  locale: string;
  content_locale?: string;
  metadata: any;
  entry: { locale: string; frontmatter: any; content: string };
}

// "it/ai-ml/llm-agents" -> "it.ai-ml"; a root packed whole -> "iot";
// a concept tagged at the root of a split domain -> "it.core".
export function packIdForDomain(domain: string, packingOf: (root: string) => PackingMode): string {
  const [root, branch] = domain.split('/');
  if (packingOf(root) === 'root') return root;
  return `${root}.${branch || 'core'}`;
}

export function termConceptFromCard(card: PackCard): TermConcept {
  return {
    id: card.id,
    label: card.label,
    qualifier: card.qualifier,
    summary: card.summary,
    domains: card.domains,
  };
}

export function cardToSearchDoc(card: PackCard): SearchDoc {
  return {
    id: card.id,
    label: card.label,
    qualifier: card.qualifier,
    aliases: card.aliases.join(' '),
    loanwords: card.loanwords.join(' '),
    plain_descriptions: card.plain_descriptions.join(' '),
    summary: card.summary,
    domains: card.domains,
    level: card.level,
    status: card.status,
  };
}

// Keys shared by several concepts, possibly from different packs, are merged
// here at load time; a key that points to more than one concept never
// autolinks.
export function mergeTerms(terms: PackTerm[], conceptFor: (id: string) => TermConcept | undefined): TermEntry[] {
  const grouped = new Map<string, any>();
  for (const term of terms) {
    const concept = conceptFor(term.conceptId);
    if (!concept) continue;
    const key = term.key.trim().toLowerCase();
    const existing = grouped.get(key);
    if (existing) {
      if (!existing.concepts.some((item: { id: string }) => item.id === concept.id)) existing.concepts.push(concept);
      if (term.match === 'exact-case') existing.match = 'exact-case';
      if (term.autolinkConfig === 'always') existing.autolinkConfig = 'always';
      if (term.autolinkConfig === 'never') existing.autolinkConfig = 'never';
      existing.autolink = existing.autolink && term.autolink;
    } else {
      grouped.set(key, {
        key: term.key,
        match: term.match,
        concepts: [concept],
        autolink: term.autolink,
        autolinkConfig: term.autolinkConfig,
      });
    }
  }

  return Array.from(grouped.values()).map((term) => {
    const explicitAlways = term.autolinkConfig === 'always';
    const explicitNever = term.autolinkConfig === 'never';
    const shouldAutolink = explicitNever
      ? false
      : explicitAlways
      ? term.concepts.length === 1
      : term.autolink && term.concepts.length === 1 && !/^(margin|token)$/i.test(term.key);

    const { autolinkConfig, ...rest } = term;
    return { ...rest, autolink: shouldAutolink };
  });
}

// Expands meta-packs into the content packs they require. Unknown ids are
// reported through `onMissing` and skipped.
export function expandPackSelection(
  manifest: PackManifest,
  wanted: string[] | undefined,
  requiresOf: (id: string) => string[],
  onMissing: (id: string) => void = () => {}
): string[] {
  const byId = new Map(manifest.packs.map((pack) => [pack.id, pack]));
  if (!wanted || wanted.length === 0) {
    // The starter repeats concepts of the other packs: it counts only when alone.
    const content = manifest.packs.filter((pack) => pack.kind === 'content');
    const full = content.filter((pack) => pack.role !== 'starter');
    return (full.length ? full : content).map((pack) => pack.id);
  }

  const result: string[] = [];
  const seen = new Set<string>();
  const visit = (id: string) => {
    if (seen.has(id)) return;
    seen.add(id);
    const pack = byId.get(id);
    if (!pack) {
      onMissing(id);
      return;
    }
    if (pack.kind === 'content') result.push(id);
    else for (const child of requiresOf(id)) visit(child);
  };
  for (const id of wanted) visit(id);
  return result;
}
