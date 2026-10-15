import type MiniSearch from 'minisearch';
import { normalizeSearchTerm } from './matcher.js';
import {
  PACK_FORMAT_VERSION,
  PACK_TIER_FILES,
  cardToSearchDoc,
  expandPackSelection,
  type PackCard,
  type PackExplanation,
  type PackJson,
  type PackManifest,
  type PackTerm,
  type PackTier,
} from './pack-format.js';
import {
  SEARCH_RESULT_LIMIT,
  createSearchIndex,
  domainMatches,
  loadSearchIndex,
  searchConfigHash,
  searchIndexToJSON,
  searchIndexes,
  type SearchHit,
} from './search-config.js';

// All I/O goes through this adapter (D-3). Paths are the manifest's own: relative
// to dist/ for a built dist, absolute for a manifest composed by the resolver.
export interface PackIO {
  readText(relPath: string): string | null | undefined;
}

// Optional on-disk cache for indexes built at load time (subset selections).
export interface IndexCache {
  read(key: string): string | null | undefined;
  write(key: string, text: string): void;
}

export interface PackQueryOptions {
  locale: string;
  packs?: string[];
}

export interface PackStoreOptions {
  // a manifest composed by the resolver; otherwise manifest.json is read
  manifest?: PackManifest;
  cache?: IndexCache;
  // tiers the load plan turned off, per pack
  disabled?: Record<string, PackTier[]>;
}

function parseJson(text: string | null | undefined): any {
  if (typeof text !== 'string') return undefined;
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
}

function fingerprint(value: string): string {
  let first = 0x811c9dc5;
  let second = 0x9e3779b9;
  for (let i = 0; i < value.length; i++) {
    const code = value.charCodeAt(i);
    first = Math.imul(first ^ code, 0x01000193);
    second = Math.imul(second ^ (code + i), 0x85ebca6b);
  }
  return `${(first >>> 0).toString(16).padStart(8, '0')}${(second >>> 0).toString(16).padStart(8, '0')}`;
}

// Reads packs (formatVersion 1). Each notice is reported once per store;
// missing or newer data degrades to "not available" instead of throwing.
export class PackStore {
  readonly manifest: PackManifest | null = null;
  readonly formatVersion: number = 0;

  private notices = new Set<string>();
  private packs = new Map<string, PackJson | null>();
  private cardCache = new Map<string, PackCard[]>();
  private termCache = new Map<string, PackTerm[]>();
  private indexCache = new Map<string, MiniSearch>();
  private lookupCache = new Map<string, { byKey: Map<string, PackCard[]>; byId: Map<string, PackCard>; packOf: Map<string, string> }>();
  private readonly configHash = searchConfigHash();
  private readonly cache?: IndexCache;
  private readonly disabled: Record<string, PackTier[]>;

  constructor(private io: PackIO, private onNotice: (message: string) => void = () => {}, options: PackStoreOptions = {}) {
    this.cache = options.cache;
    this.disabled = options.disabled || {};
    let manifest: any = options.manifest;
    if (!manifest) {
      const raw = io.readText('manifest.json');
      // No manifest at all: the legacy flat layout (formatVersion 0), not an error.
      if (raw === null || raw === undefined) return;
      manifest = parseJson(raw);
    }
    if (!manifest || typeof manifest.formatVersion !== 'number' || !Array.isArray(manifest.packs)) {
      this.notice('Termbridge: dist/manifest.json không hợp lệ, dùng dữ liệu cũ / invalid dist/manifest.json, using legacy data');
      return;
    }
    this.formatVersion = manifest.formatVersion;
    if (manifest.formatVersion > PACK_FORMAT_VERSION) {
      this.notice(`Termbridge: dữ liệu dùng formatVersion ${manifest.formatVersion}, cần cập nhật Termbridge / data uses formatVersion ${manifest.formatVersion}, please update Termbridge`);
      return;
    }
    this.manifest = manifest;
  }

  get available(): boolean {
    return this.manifest !== null && this.formatVersion === PACK_FORMAT_VERSION;
  }

  private notice(message: string): void {
    if (this.notices.has(message)) return;
    this.notices.add(message);
    this.onNotice(message);
  }

  private base(packId: string): string | null {
    const entry = this.manifest?.packs.find((item) => item.id === packId);
    return entry ? entry.path.replace(/\/?pack\.json$/, '') : null;
  }

  private tierPath(packId: string, locale: string, tier: PackTier): string {
    return `${this.base(packId)}/${locale}/${PACK_TIER_FILES[tier]}`;
  }

  private tierOff(packId: string, tier: PackTier): boolean {
    return this.disabled[packId]?.includes(tier) ?? false;
  }

  pack(id: string): PackJson | null {
    if (this.packs.has(id)) return this.packs.get(id)!;
    const entry = this.manifest?.packs.find((item) => item.id === id);
    const pack: PackJson | undefined = entry ? parseJson(this.io.readText(entry.path)) : undefined;
    let result: PackJson | null = pack || null;
    if (pack && pack.formatVersion > PACK_FORMAT_VERSION) {
      this.notice(`Termbridge: gói ${id} cần Termbridge mới hơn, bỏ qua / pack ${id} needs a newer Termbridge, skipped`);
      result = null;
    } else if (!pack && entry) {
      this.notice(`Termbridge: không đọc được gói ${id} / cannot read pack ${id}`);
    }
    this.packs.set(id, result);
    return result;
  }

  contentPacks(selection?: string[]): string[] {
    if (!this.manifest) return [];
    return expandPackSelection(
      this.manifest,
      selection,
      (id) => Object.keys(this.pack(id)?.requires || {}),
      (id) => this.notice(`Termbridge: không có gói ${id} / pack ${id} not found`)
    ).filter((id) => this.pack(id) !== null);
  }

  cards(packId: string, locale: string): PackCard[] {
    const key = `${packId}\u0000${locale}`;
    let cards = this.cardCache.get(key);
    if (!cards) {
      const pack = this.pack(packId);
      cards = pack ? parseJson(this.io.readText(this.tierPath(packId, locale, 'cards'))) || [] : [];
      this.cardCache.set(key, cards!);
    }
    return cards!;
  }

  terms(packId: string, locale: string): PackTerm[] {
    const key = `${packId}\u0000${locale}`;
    let terms = this.termCache.get(key);
    if (!terms) {
      const pack = this.pack(packId);
      terms = pack ? parseJson(this.io.readText(this.tierPath(packId, locale, 'terms'))) || [] : [];
      this.termCache.set(key, terms!);
    }
    return terms!;
  }

  index(packId: string, locale: string): MiniSearch | null {
    const key = `${packId}\u0000${locale}`;
    const cached = this.indexCache.get(key);
    if (cached) return cached;
    const pack = this.pack(packId);
    if (!pack) return null;

    let index: MiniSearch | null = null;
    if (this.tierOff(packId, 'search')) {
      index = null;
    } else if (pack.tiers?.search?.configHash === this.configHash) {
      const raw = this.io.readText(this.tierPath(packId, locale, 'search'));
      if (typeof raw === 'string') {
        try {
          index = loadSearchIndex(raw);
        } catch {
          index = null;
        }
      }
    } else {
      this.notice(`Termbridge: chỉ mục của gói ${packId} dựng bằng cấu hình tìm kiếm khác, đang dựng lại / search index of pack ${packId} was built with a different search config, rebuilding`);
    }
    if (!index) index = createSearchIndex(this.cards(packId, locale).map(cardToSearchDoc));
    this.indexCache.set(key, index);
    return index;
  }

  // Index over every content pack of one build; null for any other selection.
  private combinedIndex(packIds: string[], locale: string): MiniSearch | null {
    const search = this.manifest?.search;
    if (!search || search.packs.length !== packIds.length || !search.packs.every((id, i) => id === packIds[i])) return null;
    const key = `*\u0000${locale}`;
    const cached = this.indexCache.get(key);
    if (cached) return cached;

    let index: MiniSearch | null = null;
    const file = search.files[locale];
    if (this.manifest!.searchConfigHash !== this.configHash) {
      this.notice('Termbridge: chỉ mục tìm kiếm dựng bằng cấu hình khác, đang dựng lại / search index was built with a different search config, rebuilding');
    } else if (file) {
      const raw = this.io.readText(file.path);
      if (typeof raw === 'string') {
        try {
          index = loadSearchIndex(raw);
        } catch {
          index = null;
        }
      }
    }
    if (!index) {
      const docs = packIds.flatMap((id) => this.cards(id, locale)).map(cardToSearchDoc);
      index = createSearchIndex(docs);
    }
    this.indexCache.set(key, index);
    return index;
  }

  // Several packs but not a whole build: one index over exactly those cards, so
  // BM25 statistics (and ranking) match a single corpus. Cached when possible.
  private subsetIndex(packIds: string[], locale: string): MiniSearch {
    const shas = packIds.map((id) => `${id}:${this.manifest!.packs.find((item) => item.id === id)?.sha256 || ''}`);
    const key = `subset-${locale}-${fingerprint(`${this.configHash}|${shas.join('|')}`)}`;
    const cached = this.indexCache.get(key);
    if (cached) return cached;

    let index: MiniSearch | null = null;
    const raw = this.cache?.read(key);
    if (typeof raw === 'string') {
      try {
        index = loadSearchIndex(raw);
      } catch {
        index = null;
      }
    }
    if (!index) {
      index = createSearchIndex(packIds.flatMap((id) => this.cards(id, locale)).map(cardToSearchDoc));
      try {
        this.cache?.write(key, searchIndexToJSON(index));
      } catch {
        // A cache that cannot be written only costs a rebuild next time.
      }
    }
    this.indexCache.set(key, index);
    return index;
  }

  find(query: string, options: PackQueryOptions & { domain?: string; limit?: number }): SearchHit[] {
    if (!this.available) return [];
    const packIds = [...this.contentPacks(options.packs)].sort();
    if (packIds.length === 0) return [];
    const index = this.combinedIndex(packIds, options.locale)
      || (packIds.length === 1 ? this.index(packIds[0], options.locale) : this.subsetIndex(packIds, options.locale));
    if (!index) return [];
    return searchIndexes([index], query, { domain: options.domain, limit: options.limit ?? SEARCH_RESULT_LIMIT });
  }

  private lookupMaps(options: PackQueryOptions) {
    const packIds = this.contentPacks(options.packs);
    const key = `${options.locale}\u0000${packIds.join(',')}`;
    let maps = this.lookupCache.get(key);
    if (!maps) {
      const byKey = new Map<string, PackCard[]>();
      const byId = new Map<string, PackCard>();
      const packOf = new Map<string, string>();
      const add = (value: string, card: PackCard) => {
        const normalized = normalizeSearchTerm(value);
        const list = byKey.get(normalized);
        if (!list) byKey.set(normalized, [card]);
        else if (!list.includes(card)) list.push(card);
      };
      for (const packId of packIds) {
        for (const card of this.cards(packId, options.locale)) {
          byId.set(card.id, card);
          packOf.set(card.id, packId);
          add(card.label, card);
          for (const alias of card.aliases) add(alias, card);
          for (const loanword of card.loanwords) add(loanword, card);
        }
      }
      maps = { byKey, byId, packOf };
      this.lookupCache.set(key, maps);
    }
    return maps;
  }

  // Tier 0: exact id, label, alias or loanword (accent-insensitive).
  lookup(idOrLabel: string, options: PackQueryOptions): PackCard[] {
    if (!this.available) return [];
    const { byKey, byId } = this.lookupMaps(options);
    if (idOrLabel.startsWith('id:')) {
      const card = byId.get(idOrLabel.slice(3));
      return card ? [card] : [];
    }
    const matches = byKey.get(normalizeSearchTerm(idOrLabel.trim())) || [];
    if (matches.length > 0) return [...matches];
    const direct = byId.get(idOrLabel);
    return direct ? [direct] : [];
  }

  card(id: string, options: PackQueryOptions): PackCard | undefined {
    return this.available ? this.lookupMaps(options).byId.get(id) : undefined;
  }

  browse(domainPrefix: string, options: PackQueryOptions): PackCard[] {
    if (!this.available) return [];
    return this.contentPacks(options.packs)
      .flatMap((packId) => this.cards(packId, options.locale))
      .filter((card) => card.domains.some((domain) => domainMatches(domain, domainPrefix)));
  }

  explanation(id: string, locale: string): PackExplanation | null {
    if (!this.available) return null;
    const packId = this.lookupMaps({ locale }).packOf.get(id);
    if (!packId || this.tierOff(packId, 'explanations')) return null;
    // A built dist also has one small file per concept next to its packs.
    const root = /^(?:(.*)\/)?packs\/[^/]+$/.exec(this.base(packId) || '');
    if (root) {
      const single = parseJson(this.io.readText(`${root[1] ? `${root[1]}/` : ''}${locale}/concepts/${id}.json`));
      if (single && single.id === id) return single;
    }
    const raw = this.io.readText(this.tierPath(packId, locale, 'explanations'));
    for (const line of (raw || '').split('\n')) {
      const record = parseJson(line);
      if (record?.id === id) return record;
    }
    return null;
  }
}

// Lets an async file system (the mod's $.fs) drive the synchronous PackStore:
// a read that is not fetched yet throws, `run` fetches it and retries.
export class PendingRead extends Error {
  constructor(readonly path: string) {
    super(`pending read: ${path}`);
  }
}

export class PrefetchIO implements PackIO {
  private files = new Map<string, string | null>();

  constructor(private fetch: (path: string) => Promise<string | null>) {}

  readText(path: string): string | null {
    if (!this.files.has(path)) throw new PendingRead(path);
    return this.files.get(path)!;
  }

  has(path: string): boolean {
    return this.files.has(path);
  }

  async prefetch(paths: string[]): Promise<void> {
    const wanted = [...new Set(paths)].filter((path) => !this.files.has(path));
    const texts = await Promise.all(wanted.map((path) => this.fetch(path).catch(() => null)));
    wanted.forEach((path, i) => this.files.set(path, texts[i] ?? null));
  }

  async run<T>(fn: () => T, maxRounds = 256): Promise<T> {
    for (let round = 0; round < maxRounds; round++) {
      try {
        return fn();
      } catch (error) {
        if (!(error instanceof PendingRead)) throw error;
        await this.prefetch([error.path]);
      }
    }
    throw new Error('PrefetchIO: too many rounds');
  }
}
