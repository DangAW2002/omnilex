import MiniSearch from './minisearch.js';
import { normalizeSearchTerm } from './matcher.js';
// Shared by build, CLI, MCP, site and mod. Bump the version when ranking
// behaviour changes in a way the option fingerprint below cannot see.
export const SEARCH_CONFIG_VERSION = 1;
export const SEARCH_RESULT_LIMIT = 5;
export const SEARCH_SCORE_RATIO = 0.35;
export const SEARCH_INDEX_OPTIONS = {
    fields: ['id', 'label', 'aliases', 'loanwords', 'plain_descriptions', 'summary'],
    storeFields: ['id', 'label', 'qualifier', 'summary', 'domains', 'plain_descriptions', 'status'],
    processTerm: normalizeSearchTerm,
    searchOptions: {
        boost: { id: 3, plain_descriptions: 3, label: 3, aliases: 2, summary: 1 },
        combineWith: 'AND',
        fuzzy: 0.15,
        prefix: true,
    },
};
// Probes the normalizer by behaviour so the hash is the same whichever
// compiler emitted the function.
const NORMALIZE_PROBES = ['Lãi Kép', 'ĐẦU TƯ', 'Tiền gốc', 'API Gateway', 'Ångström ﬁ'];
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
export function searchConfigHash() {
    const { processTerm, ...options } = SEARCH_INDEX_OPTIONS;
    return fingerprint(JSON.stringify({
        version: SEARCH_CONFIG_VERSION,
        options,
        normalize: NORMALIZE_PROBES.map((probe) => processTerm(probe)),
    }));
}
export function createSearchIndex(docs) {
    const miniSearch = new MiniSearch(SEARCH_INDEX_OPTIONS);
    miniSearch.addAll(docs);
    return miniSearch;
}
export function searchIndexToJSON(index) {
    return JSON.stringify(index.toJSON());
}
export function loadSearchIndex(json) {
    if (typeof json === 'string') {
        return MiniSearch.loadJSON(json, SEARCH_INDEX_OPTIONS);
    }
    return MiniSearch.loadJS(json, SEARCH_INDEX_OPTIONS);
}
// Taxonomy-path prefix on segment boundaries: "it" matches "it/web" but not "iot".
export function domainMatches(domain, prefix) {
    const trimmed = prefix.replace(/\/+$/, '');
    return domain === trimmed || domain.startsWith(`${trimmed}/`);
}
function rank(hits, domain, limit) {
    hits.sort((a, b) => b.score - a.score);
    const bestScore = hits[0]?.score || 0;
    let filtered = hits.filter((hit) => hit.score >= bestScore * SEARCH_SCORE_RATIO);
    if (domain) {
        filtered = filtered.filter((hit) => Array.isArray(hit.domains) && hit.domains.some((d) => domainMatches(d, domain)));
    }
    return filtered.slice(0, limit).map((hit) => ({
        id: hit.id,
        label: hit.label,
        qualifier: hit.qualifier,
        summary: hit.summary,
        domains: hit.domains,
        status: hit.status,
        score: hit.score,
    }));
}
// Exact and prefix matches first; fuzzy matching (typo tolerance) only runs
// when they find nothing, because fuzzy expansion dominates query time on a
// large vocabulary (50-60 ms for a long description at 10k concepts).
export function searchIndexes(indexes, query, options = {}) {
    const limit = options.limit ?? SEARCH_RESULT_LIMIT;
    const run = (fuzzy) => {
        const hits = [];
        for (const index of indexes) {
            for (const hit of index.search(query, fuzzy ? undefined : { fuzzy: false }))
                hits.push(hit);
        }
        return rank(hits, options.domain, limit);
    };
    const exact = run(false);
    return exact.length > 0 ? exact : run(true);
}
