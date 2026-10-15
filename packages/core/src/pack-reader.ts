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
} from './pack-format.js';
import {
  SEARCH_RESULT_LIMIT,
  createSearchIndex,
  domainMatches,
  loadSearchIndex,
  searchConfigHash,
  searchIndexes,
  type SearchHit,
} from './search-config.js';

// All I/O goes through this adapter (D-3); paths are relative to dist/ and use '/'.
export interface PackIO {
  readText(relPath: string): string | null | undefined;
}

export interface PackQueryOptions {
  locale: string;
  packs?: string[];
}

function parseJson(text: string | null | undefined): any {
  if (typeof text !== 'string') return undefined;
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
}

// Reads a built dist/ (formatVersion 1). Each notice is reported once per
// store; missing or newer data degrades to "not available" instead of throwing.
export class PackStore {
  readonly manifest: PackManifest | null = null;
  readonly formatVersion: number = 0;

  private notices = new Set<string>();
  private packs = new Map<string, PackJson | null>();
  private cardCache = new Map<string, PackCard[]>();
  private indexCache = new Map<string, MiniSearch>();
  private lookupCache = new Map<string, { byKey: Map<string, PackCard[]>; byId: Map<string, PackCard>; packOf: Map<string, string> }>();
  private readonly configHash = searchConfigHash();

  constructor(private io: PackIO, private onNotice: (message: string) => void = () => {}) {
    const raw = io.readText('manifest.json');
    if (raw === null || raw === undefined) return;
    const manifest = parseJson(raw);
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
      cards = pack ? parseJson(this.io.readText(`packs/${packId}/${locale}/${PACK_TIER_FILES.cards}`)) || [] : [];
      this.cardCache.set(key, cards!);
    }
    return cards!;
  }

  index(packId: string, locale: string): MiniSearch | null {
    const key = `${packId}\u0000${locale}`;
    const cached = this.indexCache.get(key);
    if (cached) return cached;
    const pack = this.pack(packId);
    if (!pack) return null;

    let index: MiniSearch | null = null;
    if (pack.tiers?.search?.configHash === this.configHash) {
      const raw = this.io.readText(`packs/${packId}/${locale}/${PACK_TIER_FILES.search}`);
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

  // Index over every content pack; null when the selection is a subset.
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

  find(query: string, options: PackQueryOptions & { domain?: string; limit?: number }): SearchHit[] {
    if (!this.available) return [];
    const packIds = this.contentPacks(options.packs);
    const combined = this.combinedIndex([...packIds].sort(), options.locale);
    const indexes = combined
      ? [combined]
      : packIds
          .map((id) => this.index(id, options.locale))
          .filter((index): index is MiniSearch => index !== null);
    return searchIndexes(indexes, query, { domain: options.domain, limit: options.limit ?? SEARCH_RESULT_LIMIT });
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

  browse(domainPrefix: string, options: PackQueryOptions): PackCard[] {
    if (!this.available) return [];
    return this.contentPacks(options.packs)
      .flatMap((packId) => this.cards(packId, options.locale))
      .filter((card) => card.domains.some((domain) => domainMatches(domain, domainPrefix)));
  }

  explanation(id: string, locale: string): PackExplanation | null {
    if (!this.available) return null;
    const single = parseJson(this.io.readText(`${locale}/concepts/${id}.json`));
    if (single && single.id === id) return single;
    const packId = this.lookupMaps({ locale }).packOf.get(id);
    if (!packId) return null;
    const raw = this.io.readText(`packs/${packId}/${locale}/${PACK_TIER_FILES.explanations}`);
    for (const line of (raw || '').split('\n')) {
      const record = parseJson(line);
      if (record?.id === id) return record;
    }
    return null;
  }
}
