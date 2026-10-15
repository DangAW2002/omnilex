// Pack resolution and load planning (Plan 3.3-3.5). Pure: the catalog is built
// by whoever can read the disk (project.ts) and handed in.
import type { EffectiveConfig, PackOp, ProfileName, TierMode } from './config.js';
import type { ManifestSearch, PackKind, PackTier, PackTierInfo } from './pack-format.js';
import { maxSatisfying } from './semver.js';

export interface CatalogSource {
  id: string;
  kind: 'dev' | 'store';
  // absolute directory, '/'-separated
  dir: string;
  // dev sources: content packs of that build, and its combined index
  contentIds?: string[];
  search?: ManifestSearch;
  searchConfigHash?: string;
  stale?: boolean;
}

export interface CatalogPack {
  id: string;
  version: string;
  kind: PackKind;
  role?: 'starter';
  requires: Record<string, string>;
  concepts: number;
  tiers?: Partial<Record<PackTier, PackTierInfo>>;
  // full sha256 of pack.json, or its first 8 hex digits for an unlocked store copy
  sha256: string;
  sourceId: string;
  // absolute path of pack.json, '/'-separated
  path: string;
}

export interface Catalog {
  sources: CatalogSource[];
  packs: CatalogPack[];
  // id -> version pinned by the lockfile
  pins?: Record<string, string>;
}

export interface ResolveResult {
  // content packs, highest priority first
  packs: CatalogPack[];
  // meta-packs expanded on the way (lockfiles record them too)
  metas: CatalogPack[];
  missing: string[];
  errors: string[];
}

function candidates(catalog: Catalog, id: string, range: string | undefined): CatalogPack | null {
  const all = catalog.packs.filter((pack) => pack.id === id);
  if (all.length === 0) return null;
  // A dev build is what the developer is editing; it wins over the store.
  for (const source of catalog.sources) {
    if (source.kind !== 'dev') continue;
    const dev = all.find((pack) => pack.sourceId === source.id);
    if (dev) return dev;
  }
  const pinned = catalog.pins?.[id];
  const versions = all.map((pack) => pack.version);
  const chosen = pinned && versions.includes(pinned) && (!range || maxSatisfying([pinned], range))
    ? pinned
    : maxSatisfying(versions, range || '*');
  return chosen ? all.find((pack) => pack.version === chosen) || null : null;
}

export function resolvePacks(
  ops: PackOp[],
  catalog: Catalog,
  options: { packsConfigured: boolean } = { packsConfigured: true }
): ResolveResult {
  const selected = new Map<string, CatalogPack>();
  const metas = new Map<string, CatalogPack>();
  const missing = new Set<string>();
  const errors: string[] = [];

  const expand = (id: string, range: string | undefined, stack: string[], sink: (pack: CatalogPack) => void, report: boolean) => {
    if (stack.includes(id)) {
      const message = `Vòng phụ thuộc giữa các gói / dependency cycle: ${[...stack, id].join(' → ')}`;
      if (report && !errors.includes(message)) errors.push(message);
      return;
    }
    const pack = candidates(catalog, id, range);
    if (!pack) {
      if (report) missing.add(range ? `${id}@${range}` : id);
      return;
    }
    if (pack.kind === 'content') {
      sink(pack);
      return;
    }
    if (report) metas.set(pack.id, pack);
    for (const [child, childRange] of Object.entries(pack.requires)) {
      expand(child, childRange, [...stack, id], sink, report);
    }
  };

  const add = (pack: CatalogPack) => {
    if (!selected.has(pack.id)) selected.set(pack.id, pack);
  };

  if (!options.packsConfigured) {
    // D3: nothing configured means every installed or built content pack; the
    // starter repeats concepts of the others, so it counts only when alone.
    const content = catalog.packs.filter((pack) => pack.kind === 'content');
    const full = content.filter((pack) => pack.role !== 'starter');
    for (const pack of full.length ? full : content) expand(pack.id, undefined, [], add, false);
  }

  for (const op of ops) {
    if (op.op === 'reset') {
      selected.clear();
    } else if (op.op === 'dev') {
      const source = catalog.sources.find((item) => item.kind === 'dev' && item.dir === op.path);
      // A build holding only a starter (the one the mod ships) selects it.
      const ids = source?.contentIds?.length
        ? source.contentIds
        : catalog.packs.filter((item) => item.sourceId === source?.id && item.kind === 'content').map((item) => item.id);
      for (const id of ids) {
        const pack = catalog.packs.find((item) => item.id === id && item.sourceId === source!.id);
        if (pack) add(pack);
      }
    } else if (op.op === 'add') {
      expand(op.id, op.range, [], add, true);
    } else if (op.op === 'remove') {
      expand(op.id, op.range, [], (pack) => selected.delete(pack.id), false);
    }
  }

  return { packs: Array.from(selected.values()), metas: Array.from(metas.values()), missing: Array.from(missing).sort(), errors };
}

export type LoadSurface = 'cli' | 'mcp' | 'mod';

export interface PackLoadPlan {
  pack: CatalogPack;
  tiers: Record<PackTier | 'vectors', TierMode>;
}

export interface LoadPlan {
  profile: ProfileName;
  packs: PackLoadPlan[];
  dropped: CatalogPack[];
  estimateMB: number;
  limitMB?: number;
  // one line per degradation step, in order
  steps: string[];
}

// JSON bytes -> rough in-memory size (Q4 of the WP6 note).
export const MEMORY_FACTORS: Record<PackTier, number> = { terms: 3, cards: 3, search: 2, explanations: 1.5 };

function tierBytes(pack: CatalogPack, tier: PackTier, locales: string[]): number {
  const files = pack.tiers?.[tier]?.files || {};
  return locales.reduce((sum, locale) => sum + (files[locale]?.bytes || 0), 0);
}

export function estimateMemoryMB(plans: PackLoadPlan[], locale: string, surface: LoadSurface): number {
  let bytes = 0;
  for (const { pack, tiers } of plans) {
    for (const tier of Object.keys(MEMORY_FACTORS) as PackTier[]) {
      if (tiers[tier] !== 'eager') continue;
      // The mod matches terms of both primary locales at once.
      const locales = tier === 'terms' && surface === 'mod' ? Object.keys(pack.tiers?.terms?.files || {}) : [locale];
      bytes += tierBytes(pack, tier, locales) * MEMORY_FACTORS[tier];
    }
  }
  return bytes / (1024 * 1024);
}

export function planLoad(
  packs: CatalogPack[],
  effective: Pick<EffectiveConfig, 'profile' | 'tiers' | 'limits'>,
  options: { surface: LoadSurface; locale: string; notice?: (message: string) => void }
): LoadPlan {
  const notice = options.notice || (() => {});
  let profile = effective.profile;
  if (profile === 'semantic') {
    notice('Termbridge: chưa có vectors cho profile semantic, dùng standard / no vectors for the semantic profile yet, using standard');
    profile = 'standard';
  }
  if (effective.tiers.vectors === 'on') {
    notice('Termbridge: tier vectors chưa được hỗ trợ, bỏ qua / the vectors tier is not supported yet, ignored');
  }

  const search: TierMode = profile === 'lite' ? 'off' : options.surface === 'mod' ? 'lazy' : 'eager';
  const explanations: TierMode = effective.tiers.explanations || (profile === 'lite' ? 'off' : 'lazy');
  const plans: PackLoadPlan[] = packs.map((pack) => ({
    pack,
    tiers: { terms: 'eager', cards: 'eager', search, explanations, vectors: 'off' },
  }));

  const limitMB = effective.limits.memoryMB;
  const steps: string[] = [];
  const dropped: CatalogPack[] = [];
  const estimate = () => estimateMemoryMB(plans, options.locale, options.surface);
  const over = () => limitMB !== undefined && estimate() > limitMB;
  const step = (message: string) => {
    steps.push(message);
    notice(message);
  };

  if (over()) {
    // 1. vectors are never loaded yet, so there is nothing to turn off.
    // 2. explanations eager -> lazy (lazy and remote cost nothing at load).
    if (plans.some((plan) => plan.tiers.explanations === 'eager')) {
      for (const plan of plans) if (plan.tiers.explanations === 'eager') plan.tiers.explanations = 'lazy';
      step(`Termbridge: vượt ${limitMB} MB, chuyển bài giải thích sang lazy / over ${limitMB} MB, explanations now lazy`);
    }
  }
  if (over() && plans.some((plan) => plan.tiers.search === 'eager')) {
    // 3. search index only on the first search.
    for (const plan of plans) if (plan.tiers.search === 'eager') plan.tiers.search = 'lazy';
    step(`Termbridge: vượt ${limitMB} MB, chỉ nạp chỉ mục tìm kiếm khi tìm lần đầu / over ${limitMB} MB, search index loads on first search`);
  }
  // 4. drop the lowest-priority packs, last in the list first.
  while (over() && plans.length > 0) {
    const removed = plans.pop()!;
    dropped.push(removed.pack);
    step(`Termbridge: vượt ${limitMB} MB, bỏ gói ${removed.pack.id} / over ${limitMB} MB, dropped pack ${removed.pack.id}`);
  }

  return { profile, packs: plans, dropped, estimateMB: estimate(), limitMB, steps };
}
