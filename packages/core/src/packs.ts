import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import type { DomainsConfig, SourcesConfig, TaxonomyNode } from './types.js';
import {
  PACK_FORMAT_VERSION,
  PACK_TIER_FILES,
  PACK_TIERS,
  STARTER_PACK_ID,
  STARTER_TIERS,
  cardToSearchDoc,
  packIdForDomain,
  type ManifestPackEntry,
  type ManifestSearch,
  type PackAttribution,
  type PackCard,
  type PackExplanation,
  type PackJson,
  type PackManifest,
  type PackTerm,
  type PackTier,
  type PackingMode,
} from './pack-format.js';
import { createSearchIndex, searchConfigHash, searchIndexToJSON } from './search-config.js';

export interface PackConceptData {
  card: PackCard;
  terms: PackTerm[];
  explanation: PackExplanation;
  // source refs this locale's content draws on (concept and locale sources)
  sourceRefs?: string[];
}

export interface ContentPackInput {
  id: string;
  role?: 'starter';
  title: Record<string, string>;
  domains: string[];
  // locale -> concepts of this pack, any order
  locales: Record<string, PackConceptData[]>;
}

export interface MetaPackInput {
  id: string;
  title: Record<string, string>;
  domains: string[];
  requires: string[];
}

export interface PackRenderInput {
  version: string;
  locales: string[];
  // config/sources.yaml, for attributions.json (2.8a)
  sources?: SourcesConfig;
  content: ContentPackInput[];
  meta: MetaPackInput[];
}

export interface RenderedFile {
  path: string;
  content: string;
}

const TECH_META = { id: 'tech', title: { vi: 'Công nghệ', en: 'Technology' }, roots: ['it', 'iot', 'product'] };
const STATUSES = ['draft', 'reviewed', 'verified', 'deprecated'];

const byId = (a: { id: string }, b: { id: string }) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0);

function sha256(content: string): string {
  return crypto.createHash('sha256').update(content, 'utf8').digest('hex');
}

export function packingResolver(domainsConfig: DomainsConfig): (root: string) => PackingMode {
  const modes = new Map(domainsConfig.domains.map((domain) => [domain.id, domain.packing || 'branch']));
  return (root) => modes.get(root) || 'branch';
}

export function packTitle(
  packId: string,
  domainsConfig: DomainsConfig,
  taxonomy: Map<string, TaxonomyNode>
): Record<string, string> {
  const [root, branch] = packId.split('.');
  const rootTitle = domainsConfig.domains.find((domain) => domain.id === root)?.name
    || taxonomy.get(root)?.labels
    || { en: root };
  if (!branch || branch === 'core') return { ...rootTitle };
  const node = taxonomy.get(root)?.children?.find((child) => child.id === branch);
  return node ? { ...node.labels } : { en: branch };
}

// Groups per-locale concept data into content packs by primary domain, then
// adds one meta-pack per split root plus `tech`.
export function groupPacks(
  perLocale: Record<string, PackConceptData[]>,
  domainsConfig: DomainsConfig,
  taxonomy: Map<string, TaxonomyNode>
): { content: ContentPackInput[]; meta: MetaPackInput[] } {
  const packingOf = packingResolver(domainsConfig);
  const packs = new Map<string, ContentPackInput>();

  for (const [locale, concepts] of Object.entries(perLocale)) {
    for (const concept of concepts) {
      const primary = concept.card.domains[0];
      if (!primary) continue;
      const packId = packIdForDomain(primary, packingOf);
      let pack = packs.get(packId);
      if (!pack) {
        const [root, branch] = packId.split('.');
        pack = {
          id: packId,
          title: packTitle(packId, domainsConfig, taxonomy),
          domains: [branch && branch !== 'core' ? `${root}/${branch}` : root],
          locales: {},
        };
        packs.set(packId, pack);
      }
      (pack.locales[locale] ||= []).push(concept);
    }
  }

  const content = Array.from(packs.values()).sort(byId);
  const meta: MetaPackInput[] = [];
  const roots = Array.from(new Set(content.map((pack) => pack.id.split('.')[0]))).sort();
  for (const root of roots) {
    if (packingOf(root) === 'root') continue;
    meta.push({
      id: root,
      title: packTitle(root, domainsConfig, taxonomy),
      domains: [root],
      requires: content.filter((pack) => pack.id.startsWith(`${root}.`)).map((pack) => pack.id),
    });
  }

  const known = new Set([...content.map((pack) => pack.id), ...meta.map((pack) => pack.id)]);
  const techRequires = TECH_META.roots.filter((root) => known.has(root));
  if (techRequires.length > 0) {
    meta.push({ id: TECH_META.id, title: TECH_META.title, domains: TECH_META.roots.filter((root) => known.has(root)), requires: techRequires });
  }

  return { content, meta: meta.sort(byId) };
}

const TIER_RANK: Record<string, number> = { A: 0, B: 1, C: 2, D: 3 };

// D6: level-1 concepts, best-sourced first, capped by count and by the size of
// the starter's tiers. Without usage data (2.3) the rank is level, then the
// best source tier, then id.
export function selectStarter(
  perLocale: Record<string, PackConceptData[]>,
  sources: SourcesConfig | undefined,
  limits: { maxConcepts: number; maxBytes: number }
): ContentPackInput | null {
  const locales = Object.keys(perLocale).sort();
  if (locales.length === 0) return null;
  const best = (concept: PackConceptData) => Math.min(
    4,
    ...(concept.sourceRefs || []).map((ref) => TIER_RANK[sources?.[ref]?.tier || ''] ?? 4)
  );
  let ranked = perLocale[locales[0]]
    .filter((concept) => concept.card.level === 1)
    .sort((a, b) => best(a) - best(b) || byId(a.card, b.card))
    .slice(0, limits.maxConcepts)
    .map((concept) => concept.card.id);

  const build = (ids: string[]): ContentPackInput => {
    const wanted = new Set(ids);
    return {
      id: STARTER_PACK_ID,
      role: 'starter',
      title: { vi: 'Khởi đầu', en: 'Starter' },
      domains: [],
      locales: Object.fromEntries(locales.map((locale) => [locale, perLocale[locale].filter((concept) => wanted.has(concept.card.id))])),
    };
  };
  const size = (pack: ContentPackInput) => locales.reduce((sum, locale) => {
    const concepts = pack.locales[locale];
    const cards = concepts.map((concept) => concept.card);
    return sum
      + Buffer.byteLength(JSON.stringify(concepts.flatMap((concept) => concept.terms)), 'utf8')
      + Buffer.byteLength(JSON.stringify(cards), 'utf8')
      + Buffer.byteLength(searchIndexToJSON(createSearchIndex(cards.map(cardToSearchDoc))), 'utf8');
  }, 0);

  let pack = build(ranked);
  while (ranked.length > 0 && size(pack) > limits.maxBytes) {
    ranked = ranked.slice(0, Math.floor(ranked.length * 0.9));
    pack = build(ranked);
  }
  return ranked.length > 0 ? pack : null;
}

export function alsoInPacks(domains: string[], domainsConfig: DomainsConfig): string[] {
  const packingOf = packingResolver(domainsConfig);
  const own = domains[0] ? packIdForDomain(domains[0], packingOf) : '';
  const result: string[] = [];
  for (const domain of domains.slice(1)) {
    const packId = packIdForDomain(domain, packingOf);
    if (packId !== own && !result.includes(packId)) result.push(packId);
  }
  return result;
}

export function renderPacks(input: PackRenderInput): { files: RenderedFile[]; manifest: PackManifest; warnings: string[] } {
  const files: RenderedFile[] = [];
  const entries: ManifestPackEntry[] = [];
  const warnings: string[] = [];
  const locales = [...input.locales].sort();
  const configHash = searchConfigHash();

  const addPackJson = (pack: PackJson) => {
    const relPath = `packs/${pack.id}/pack.json`;
    const content = `${JSON.stringify(pack, null, 2)}\n`;
    files.push({ path: relPath, content });
    entries.push({
      id: pack.id,
      kind: pack.kind,
      ...(pack.role ? { role: pack.role } : {}),
      version: pack.version,
      path: relPath,
      sha256: sha256(content),
      concepts: pack.concepts,
    });
  };

  for (const pack of [...input.content].sort(byId)) {
    const packTiers = pack.role === 'starter' ? STARTER_TIERS : PACK_TIERS;
    const tiers = Object.fromEntries(packTiers.map((tier) => [tier, { bytes: 0, files: {} }])) as Record<PackTier, any>;
    const used = new Map<string, Set<string>>();
    tiers.search.configHash = configHash;
    const status: Record<string, number> = Object.fromEntries(STATUSES.map((name) => [name, 0]));
    let conceptCount = 0;

    for (const locale of locales) {
      const concepts = [...(pack.locales[locale] || [])].sort((a, b) => byId(a.card, b.card));
      if (locale === locales[0]) {
        conceptCount = concepts.length;
        for (const { card } of concepts) status[card.status] = (status[card.status] || 0) + 1;
      }
      for (const concept of concepts) {
        for (const ref of concept.sourceRefs || []) {
          if (input.sources?.[ref]?.reuse !== 'adapt') continue;
          if (!used.has(ref)) used.set(ref, new Set());
          used.get(ref)!.add(concept.card.id);
        }
      }
      const cards = concepts.map((concept) => concept.card);
      const contents: Record<PackTier, string> = {
        terms: JSON.stringify(concepts.flatMap((concept) => concept.terms)),
        cards: JSON.stringify(cards),
        search: searchIndexToJSON(createSearchIndex(cards.map(cardToSearchDoc))),
        explanations: concepts.map((concept) => `${JSON.stringify(concept.explanation)}\n`).join(''),
      };
      for (const tier of packTiers) {
        const content = contents[tier];
        const bytes = Buffer.byteLength(content, 'utf8');
        files.push({ path: `packs/${pack.id}/${locale}/${PACK_TIER_FILES[tier]}`, content });
        tiers[tier].files[locale] = { bytes, sha256: sha256(content) };
        tiers[tier].bytes += bytes;
      }
    }

    if (conceptCount > 2000) {
      warnings.push(`Pack ${pack.id} has ${conceptCount} concepts; split it below level 2 (D5)`);
    }

    const attributions: PackAttribution[] = [...used.keys()].sort().map((ref) => {
      const source = input.sources![ref];
      return {
        ref,
        title: source.title,
        publisher: source.publisher,
        url: source.url,
        license: source.license,
        license_evidence: source.license_evidence,
        concepts: [...used.get(ref)!].sort(),
      };
    });
    const attributionsText = `${JSON.stringify(attributions, null, 2)}
`;
    files.push({ path: `packs/${pack.id}/attributions.json`, content: attributionsText });

    addPackJson({
      id: pack.id,
      version: input.version,
      formatVersion: PACK_FORMAT_VERSION,
      kind: 'content',
      ...(pack.role ? { role: pack.role } : {}),
      title: pack.title,
      domains: pack.domains,
      locales,
      requires: {},
      concepts: conceptCount,
      status,
      tiers,
      attributions: { path: 'attributions.json', bytes: Buffer.byteLength(attributionsText, 'utf8'), sha256: sha256(attributionsText) },
      license: 'CC-BY-4.0',
    });
  }

  for (const pack of [...input.meta].sort(byId)) {
    addPackJson({
      id: pack.id,
      version: input.version,
      formatVersion: PACK_FORMAT_VERSION,
      kind: 'meta',
      title: pack.title,
      domains: pack.domains,
      locales,
      requires: Object.fromEntries([...pack.requires].sort().map((id) => [id, `^${input.version}`])),
      concepts: 0,
      status: Object.fromEntries(STATUSES.map((name) => [name, 0])),
      license: 'CC-BY-4.0',
    });
  }

  // The starter repeats concepts of other packs, so it stays out of the combined index.
  const indexed = input.content.filter((pack) => pack.role !== 'starter');
  const contentIds = [...indexed].sort(byId).map((pack) => pack.id);
  const search: ManifestSearch = { packs: contentIds, files: {} };
  for (const locale of locales) {
    const cards = indexed
      .flatMap((pack) => (pack.locales[locale] || []).map((concept) => concept.card))
      .sort(byId);
    const content = searchIndexToJSON(createSearchIndex(cards.map(cardToSearchDoc)));
    const relPath = `${locale}/search-index.json`;
    files.push({ path: relPath, content });
    search.files[locale] = { path: relPath, bytes: Buffer.byteLength(content, 'utf8'), sha256: sha256(content) };
  }

  entries.sort(byId);
  const manifest: PackManifest = {
    formatVersion: PACK_FORMAT_VERSION,
    searchConfigHash: configHash,
    locales,
    packs: entries,
    search,
  };
  files.push({ path: 'manifest.json', content: `${JSON.stringify(manifest, null, 2)}\n` });
  return { files, manifest, warnings };
}

// Replaces dist/packs wholesale so packs that no longer exist do not linger.
export function writePackFiles(distDir: string, files: RenderedFile[]): string[] {
  fs.rmSync(path.join(distDir, 'packs'), { recursive: true, force: true });
  const written: string[] = [];
  for (const file of files) {
    const target = path.join(distDir, ...file.path.split('/'));
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, file.content, 'utf-8');
    written.push(target);
  }
  return written;
}
