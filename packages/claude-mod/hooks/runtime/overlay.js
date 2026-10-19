// Project overlay (.omnilex/overrides.yaml, Plan 3.7): changes how concepts
// are recognised and shown in one project, never their explanations. Pure, so
// CLI, MCP and the mod apply it the same way.
import { normalizeSearchTerm } from './matcher.js';
export const EMPTY_OVERLAY = { concepts: {}, exclude: [], prefer: {} };
export function parseOverlay(raw, source) {
    const warnings = [];
    const overlay = { concepts: {}, exclude: [], prefer: {} };
    if (raw === null || raw === undefined)
        return { overlay, warnings };
    if (typeof raw !== 'object' || Array.isArray(raw)) {
        return { overlay, warnings: [`${source}: overlay phải là một object / overlay must be a mapping`] };
    }
    const value = raw;
    for (const key of Object.keys(value)) {
        if (!['concepts', 'exclude', 'prefer'].includes(key))
            warnings.push(`${source}: khóa lạ "${key}" / unknown key "${key}"`);
    }
    for (const [id, entry] of Object.entries(value.concepts || {})) {
        const item = {};
        const e = entry;
        if (e?.autolink !== undefined) {
            ['always', 'never', 'auto'].includes(e.autolink) ? (item.autolink = e.autolink) : warnings.push(`${source}: concepts.${id}.autolink không hợp lệ / invalid`);
        }
        if (e?.aliases !== undefined) {
            const aliases = {};
            for (const [locale, list] of Object.entries(e.aliases || {})) {
                if (Array.isArray(list) && list.every((alias) => typeof alias === 'string'))
                    aliases[locale] = list;
                else
                    warnings.push(`${source}: concepts.${id}.aliases.${locale} phải là danh sách / must be a list`);
            }
            item.aliases = aliases;
        }
        overlay.concepts[id] = item;
    }
    if (value.exclude !== undefined) {
        Array.isArray(value.exclude) ? (overlay.exclude = value.exclude.map(String)) : warnings.push(`${source}: exclude phải là danh sách / must be a list`);
    }
    for (const [key, id] of Object.entries(value.prefer || {}))
        overlay.prefer[key.trim().toLowerCase()] = String(id);
    return { overlay, warnings };
}
function aliasEdits(overlay, id, locale) {
    const list = overlay.concepts[id]?.aliases?.[locale] || [];
    return {
        add: list.filter((alias) => !alias.startsWith('-')).map((alias) => alias.replace(/^\+/, '').trim()).filter(Boolean),
        remove: new Set(list.filter((alias) => alias.startsWith('-')).map((alias) => alias.slice(1).trim().toLowerCase())),
    };
}
export function overlayCards(overlay, cards, locale) {
    const excluded = new Set(overlay.exclude);
    return cards.filter((card) => !excluded.has(card.id)).map((card) => {
        const { add, remove } = aliasEdits(overlay, card.id, locale);
        if (add.length === 0 && remove.size === 0)
            return card;
        const aliases = card.aliases.filter((alias) => !remove.has(alias.toLowerCase()));
        for (const alias of add)
            if (!aliases.some((item) => item.toLowerCase() === alias.toLowerCase()))
                aliases.push(alias);
        return { ...card, aliases };
    });
}
// Same rules the builder uses for a key's match mode and default autolink.
function termFor(key, conceptId, autolinkConfig) {
    const autolink = autolinkConfig === 'always' ? true : autolinkConfig === 'never' ? false : key.length > 3;
    return {
        key,
        match: key.length <= 4 && key === key.toUpperCase() ? 'exact-case' : 'any-case',
        autolink,
        ...(autolinkConfig ? { autolinkConfig } : {}),
        conceptId,
    };
}
export function overlayTerms(overlay, terms, locale) {
    const excluded = new Set(overlay.exclude);
    const result = [];
    const seen = new Set();
    for (const term of terms) {
        if (excluded.has(term.conceptId))
            continue;
        const key = term.key.trim().toLowerCase();
        const preferred = overlay.prefer[key];
        if (preferred && preferred !== term.conceptId)
            continue;
        if (aliasEdits(overlay, term.conceptId, locale).remove.has(key))
            continue;
        const mode = overlay.concepts[term.conceptId]?.autolink;
        result.push(mode ? { ...term, autolink: mode === 'always' ? true : mode === 'never' ? false : term.autolink, autolinkConfig: mode } : term);
        seen.add(`${term.conceptId}\u0000${key}`);
    }
    for (const id of Object.keys(overlay.concepts)) {
        if (excluded.has(id))
            continue;
        for (const alias of aliasEdits(overlay, id, locale).add) {
            const key = alias.toLowerCase();
            const preferred = overlay.prefer[key];
            if (seen.has(`${id}\u0000${key}`) || (preferred && preferred !== id))
                continue;
            // Only concepts the packs actually contain get the new key.
            if (!terms.some((term) => term.conceptId === id))
                continue;
            result.push(termFor(alias, id, overlay.concepts[id]?.autolink));
            seen.add(`${id}\u0000${key}`);
        }
    }
    return result;
}
// Tier-0 lookup within a project: `prefer` settles a homonym.
export function overlayLookup(overlay, query, matches) {
    const preferred = overlay.prefer[query.trim().toLowerCase()] ?? overlay.prefer[normalizeSearchTerm(query.trim())];
    if (!preferred)
        return matches;
    const chosen = matches.filter((card) => card.id === preferred);
    return chosen.length ? chosen : matches;
}
export function isEmptyOverlay(overlay) {
    return Object.keys(overlay.concepts).length === 0 && overlay.exclude.length === 0 && Object.keys(overlay.prefer).length === 0;
}
// For derived packs (tb pack export --effective): cards and terms per concept.
export function overlayConcepts(overlay, locale, concepts) {
    const cards = new Map(overlayCards(overlay, concepts.map((concept) => concept.card), locale).map((card) => [card.id, card]));
    return concepts
        .filter((concept) => cards.has(concept.card.id))
        .map((concept) => ({ ...concept, card: cards.get(concept.card.id), terms: overlayTerms(overlay, concept.terms, locale) }));
}
