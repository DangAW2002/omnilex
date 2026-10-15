import { normalizeSearchTerm } from './matcher.js';
import { PACK_FORMAT_VERSION, PACK_TIER_FILES, cardToSearchDoc, expandPackSelection, } from './pack-format.js';
import { SEARCH_RESULT_LIMIT, createSearchIndex, domainMatches, loadSearchIndex, searchConfigHash, searchIndexToJSON, searchIndexes, } from './search-config.js';
function parseJson(text) {
    if (typeof text !== 'string')
        return undefined;
    try {
        return JSON.parse(text);
    }
    catch {
        return undefined;
    }
}
function fingerprint(value) {
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
    io;
    onNotice;
    manifest = null;
    formatVersion = 0;
    notices = new Set();
    packs = new Map();
    cardCache = new Map();
    termCache = new Map();
    indexCache = new Map();
    lookupCache = new Map();
    configHash = searchConfigHash();
    cache;
    disabled;
    constructor(io, onNotice = () => { }, options = {}) {
        this.io = io;
        this.onNotice = onNotice;
        this.cache = options.cache;
        this.disabled = options.disabled || {};
        let manifest = options.manifest;
        if (!manifest) {
            const raw = io.readText('manifest.json');
            // No manifest at all: the legacy flat layout (formatVersion 0), not an error.
            if (raw === null || raw === undefined)
                return;
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
    get available() {
        return this.manifest !== null && this.formatVersion === PACK_FORMAT_VERSION;
    }
    notice(message) {
        if (this.notices.has(message))
            return;
        this.notices.add(message);
        this.onNotice(message);
    }
    base(packId) {
        const entry = this.manifest?.packs.find((item) => item.id === packId);
        return entry ? entry.path.replace(/\/?pack\.json$/, '') : null;
    }
    tierPath(packId, locale, tier) {
        return `${this.base(packId)}/${locale}/${PACK_TIER_FILES[tier]}`;
    }
    tierOff(packId, tier) {
        return this.disabled[packId]?.includes(tier) ?? false;
    }
    pack(id) {
        if (this.packs.has(id))
            return this.packs.get(id);
        const entry = this.manifest?.packs.find((item) => item.id === id);
        const pack = entry ? parseJson(this.io.readText(entry.path)) : undefined;
        let result = pack || null;
        if (pack && pack.formatVersion > PACK_FORMAT_VERSION) {
            this.notice(`Termbridge: gói ${id} cần Termbridge mới hơn, bỏ qua / pack ${id} needs a newer Termbridge, skipped`);
            result = null;
        }
        else if (!pack && entry) {
            this.notice(`Termbridge: không đọc được gói ${id} / cannot read pack ${id}`);
        }
        this.packs.set(id, result);
        return result;
    }
    contentPacks(selection) {
        if (!this.manifest)
            return [];
        return expandPackSelection(this.manifest, selection, (id) => Object.keys(this.pack(id)?.requires || {}), (id) => this.notice(`Termbridge: không có gói ${id} / pack ${id} not found`)).filter((id) => this.pack(id) !== null);
    }
    cards(packId, locale) {
        const key = `${packId}\u0000${locale}`;
        let cards = this.cardCache.get(key);
        if (!cards) {
            const pack = this.pack(packId);
            cards = pack ? parseJson(this.io.readText(this.tierPath(packId, locale, 'cards'))) || [] : [];
            this.cardCache.set(key, cards);
        }
        return cards;
    }
    terms(packId, locale) {
        const key = `${packId}\u0000${locale}`;
        let terms = this.termCache.get(key);
        if (!terms) {
            const pack = this.pack(packId);
            terms = pack ? parseJson(this.io.readText(this.tierPath(packId, locale, 'terms'))) || [] : [];
            this.termCache.set(key, terms);
        }
        return terms;
    }
    index(packId, locale) {
        const key = `${packId}\u0000${locale}`;
        const cached = this.indexCache.get(key);
        if (cached)
            return cached;
        const pack = this.pack(packId);
        if (!pack)
            return null;
        let index = null;
        if (this.tierOff(packId, 'search')) {
            index = null;
        }
        else if (pack.tiers?.search?.configHash === this.configHash) {
            const raw = this.io.readText(this.tierPath(packId, locale, 'search'));
            if (typeof raw === 'string') {
                try {
                    index = loadSearchIndex(raw);
                }
                catch {
                    index = null;
                }
            }
        }
        else {
            this.notice(`Termbridge: chỉ mục của gói ${packId} dựng bằng cấu hình tìm kiếm khác, đang dựng lại / search index of pack ${packId} was built with a different search config, rebuilding`);
        }
        if (!index)
            index = createSearchIndex(this.cards(packId, locale).map(cardToSearchDoc));
        this.indexCache.set(key, index);
        return index;
    }
    // Index over every content pack of one build; null for any other selection.
    combinedIndex(packIds, locale) {
        const search = this.manifest?.search;
        if (!search || search.packs.length !== packIds.length || !search.packs.every((id, i) => id === packIds[i]))
            return null;
        const key = `*\u0000${locale}`;
        const cached = this.indexCache.get(key);
        if (cached)
            return cached;
        let index = null;
        const file = search.files[locale];
        if (this.manifest.searchConfigHash !== this.configHash) {
            this.notice('Termbridge: chỉ mục tìm kiếm dựng bằng cấu hình khác, đang dựng lại / search index was built with a different search config, rebuilding');
        }
        else if (file) {
            const raw = this.io.readText(file.path);
            if (typeof raw === 'string') {
                try {
                    index = loadSearchIndex(raw);
                }
                catch {
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
    subsetIndex(packIds, locale) {
        const shas = packIds.map((id) => `${id}:${this.manifest.packs.find((item) => item.id === id)?.sha256 || ''}`);
        const key = `subset-${locale}-${fingerprint(`${this.configHash}|${shas.join('|')}`)}`;
        const cached = this.indexCache.get(key);
        if (cached)
            return cached;
        let index = null;
        const raw = this.cache?.read(key);
        if (typeof raw === 'string') {
            try {
                index = loadSearchIndex(raw);
            }
            catch {
                index = null;
            }
        }
        if (!index) {
            index = createSearchIndex(packIds.flatMap((id) => this.cards(id, locale)).map(cardToSearchDoc));
            try {
                this.cache?.write(key, searchIndexToJSON(index));
            }
            catch {
                // A cache that cannot be written only costs a rebuild next time.
            }
        }
        this.indexCache.set(key, index);
        return index;
    }
    find(query, options) {
        if (!this.available)
            return [];
        const packIds = [...this.contentPacks(options.packs)].sort();
        if (packIds.length === 0)
            return [];
        const index = this.combinedIndex(packIds, options.locale)
            || (packIds.length === 1 ? this.index(packIds[0], options.locale) : this.subsetIndex(packIds, options.locale));
        if (!index)
            return [];
        return searchIndexes([index], query, { domain: options.domain, limit: options.limit ?? SEARCH_RESULT_LIMIT });
    }
    lookupMaps(options) {
        const packIds = this.contentPacks(options.packs);
        const key = `${options.locale}\u0000${packIds.join(',')}`;
        let maps = this.lookupCache.get(key);
        if (!maps) {
            const byKey = new Map();
            const byId = new Map();
            const packOf = new Map();
            const add = (value, card) => {
                const normalized = normalizeSearchTerm(value);
                const list = byKey.get(normalized);
                if (!list)
                    byKey.set(normalized, [card]);
                else if (!list.includes(card))
                    list.push(card);
            };
            for (const packId of packIds) {
                for (const card of this.cards(packId, options.locale)) {
                    byId.set(card.id, card);
                    packOf.set(card.id, packId);
                    add(card.label, card);
                    for (const alias of card.aliases)
                        add(alias, card);
                    for (const loanword of card.loanwords)
                        add(loanword, card);
                }
            }
            maps = { byKey, byId, packOf };
            this.lookupCache.set(key, maps);
        }
        return maps;
    }
    // Tier 0: exact id, label, alias or loanword (accent-insensitive).
    lookup(idOrLabel, options) {
        if (!this.available)
            return [];
        const { byKey, byId } = this.lookupMaps(options);
        if (idOrLabel.startsWith('id:')) {
            const card = byId.get(idOrLabel.slice(3));
            return card ? [card] : [];
        }
        const matches = byKey.get(normalizeSearchTerm(idOrLabel.trim())) || [];
        if (matches.length > 0)
            return [...matches];
        const direct = byId.get(idOrLabel);
        return direct ? [direct] : [];
    }
    card(id, options) {
        return this.available ? this.lookupMaps(options).byId.get(id) : undefined;
    }
    browse(domainPrefix, options) {
        if (!this.available)
            return [];
        return this.contentPacks(options.packs)
            .flatMap((packId) => this.cards(packId, options.locale))
            .filter((card) => card.domains.some((domain) => domainMatches(domain, domainPrefix)));
    }
    explanation(id, locale) {
        if (!this.available)
            return null;
        const packId = this.lookupMaps({ locale }).packOf.get(id);
        if (!packId || this.tierOff(packId, 'explanations'))
            return null;
        // A built dist also has one small file per concept next to its packs.
        const root = /^(?:(.*)\/)?packs\/[^/]+$/.exec(this.base(packId) || '');
        if (root) {
            const single = parseJson(this.io.readText(`${root[1] ? `${root[1]}/` : ''}${locale}/concepts/${id}.json`));
            if (single && single.id === id)
                return single;
        }
        const raw = this.io.readText(this.tierPath(packId, locale, 'explanations'));
        for (const line of (raw || '').split('\n')) {
            const record = parseJson(line);
            if (record?.id === id)
                return record;
        }
        return null;
    }
}
// Lets an async file system (the mod's $.fs) drive the synchronous PackStore:
// a read that is not fetched yet throws, `run` fetches it and retries.
export class PendingRead extends Error {
    path;
    constructor(path) {
        super(`pending read: ${path}`);
        this.path = path;
    }
}
export class PrefetchIO {
    fetch;
    files = new Map();
    constructor(fetch) {
        this.fetch = fetch;
    }
    readText(path) {
        if (!this.files.has(path))
            throw new PendingRead(path);
        return this.files.get(path);
    }
    has(path) {
        return this.files.has(path);
    }
    async prefetch(paths) {
        const wanted = [...new Set(paths)].filter((path) => !this.files.has(path));
        const texts = await Promise.all(wanted.map((path) => this.fetch(path).catch(() => null)));
        wanted.forEach((path, i) => this.files.set(path, texts[i] ?? null));
    }
    async run(fn, maxRounds = 256) {
        for (let round = 0; round < maxRounds; round++) {
            try {
                return fn();
            }
            catch (error) {
                if (!(error instanceof PendingRead))
                    throw error;
                await this.prefetch([error.path]);
            }
        }
        throw new Error('PrefetchIO: too many rounds');
    }
}
