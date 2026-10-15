import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import type { DomainsConfig, TaxonomyNode } from './types.js';
import {
  PACK_FORMAT_VERSION,
  PACK_TIER_FILES,
  PACK_TIERS,
  cardToSearchDoc,
  packIdForDomain,
  type ManifestPackEntry,
  type ManifestSearch,
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
}

export interface ContentPackInput {
  id: string;
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
      version: pack.version,
      path: relPath,
      sha256: sha256(content),
      concepts: pack.concepts,
    });
  };

  for (const pack of [...input.content].sort(byId)) {
    const tiers = Object.fromEntries(PACK_TIERS.map((tier) => [tier, { bytes: 0, files: {} }])) as Record<PackTier, any>;
    tiers.search.configHash = configHash;
    const status: Record<string, number> = Object.fromEntries(STATUSES.map((name) => [name, 0]));
    let conceptCount = 0;

    for (const locale of locales) {
      const concepts = [...(pack.locales[locale] || [])].sort((a, b) => byId(a.card, b.card));
      if (locale === locales[0]) {
        conceptCount = concepts.length;
        for (const { card } of concepts) status[card.status] = (status[card.status] || 0) + 1;
      }
      const cards = concepts.map((concept) => concept.card);
      const contents: Record<PackTier, string> = {
        terms: JSON.stringify(concepts.flatMap((concept) => concept.terms)),
        cards: JSON.stringify(cards),
        search: searchIndexToJSON(createSearchIndex(cards.map(cardToSearchDoc))),
        explanations: concepts.map((concept) => `${JSON.stringify(concept.explanation)}\n`).join(''),
      };
      for (const tier of PACK_TIERS) {
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

    addPackJson({
      id: pack.id,
      version: input.version,
      formatVersion: PACK_FORMAT_VERSION,
      kind: 'content',
      title: pack.title,
      domains: pack.domains,
      locales,
      requires: {},
      concepts: conceptCount,
      status,
      tiers,
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

  const contentIds = [...input.content].sort(byId).map((pack) => pack.id);
  const search: ManifestSearch = { packs: contentIds, files: {} };
  for (const locale of locales) {
    const cards = input.content
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
