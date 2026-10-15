// Plain data and pure helpers shared by the builder and every reader. No Node
// APIs, so the mod runtime can load this file as is.
export const PACK_FORMAT_VERSION = 1;
export const PACK_TIERS = ['terms', 'cards', 'search', 'explanations'];
export const PACK_TIER_FILES = {
    terms: 'terms.json',
    cards: 'cards.json',
    search: 'search-index.json',
    explanations: 'explanations.jsonl',
};
export const PACK_SPLIT_WARNING = 2000;
// D6: the starter pack ships terms, cards and search only, at most 1 MB.
export const STARTER_PACK_ID = 'starter';
export const STARTER_TIERS = ['terms', 'cards', 'search'];
export const STARTER_MAX_CONCEPTS = 300;
export const STARTER_MAX_BYTES = 1024 * 1024;
// "it/ai-ml/llm-agents" -> "it.ai-ml"; a root packed whole -> "iot";
// a concept tagged at the root of a split domain -> "it.core".
export function packIdForDomain(domain, packingOf) {
    const [root, branch] = domain.split('/');
    if (packingOf(root) === 'root')
        return root;
    return `${root}.${branch || 'core'}`;
}
export function termConceptFromCard(card) {
    return {
        id: card.id,
        label: card.label,
        qualifier: card.qualifier,
        summary: card.summary,
        domains: card.domains,
    };
}
export function cardToSearchDoc(card) {
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
export function mergeTerms(terms, conceptFor) {
    const grouped = new Map();
    for (const term of terms) {
        const concept = conceptFor(term.conceptId);
        if (!concept)
            continue;
        const key = term.key.trim().toLowerCase();
        const existing = grouped.get(key);
        if (existing) {
            if (!existing.concepts.some((item) => item.id === concept.id))
                existing.concepts.push(concept);
            if (term.match === 'exact-case')
                existing.match = 'exact-case';
            if (term.autolinkConfig === 'always')
                existing.autolinkConfig = 'always';
            if (term.autolinkConfig === 'never')
                existing.autolinkConfig = 'never';
            existing.autolink = existing.autolink && term.autolink;
        }
        else {
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
export function expandPackSelection(manifest, wanted, requiresOf, onMissing = () => { }) {
    const byId = new Map(manifest.packs.map((pack) => [pack.id, pack]));
    if (!wanted || wanted.length === 0) {
        // The starter repeats concepts of the other packs: it counts only when alone.
        const content = manifest.packs.filter((pack) => pack.kind === 'content');
        const full = content.filter((pack) => pack.role !== 'starter');
        return (full.length ? full : content).map((pack) => pack.id);
    }
    const result = [];
    const seen = new Set();
    const visit = (id) => {
        if (seen.has(id))
            return;
        seen.add(id);
        const pack = byId.get(id);
        if (!pack) {
            onMissing(id);
            return;
        }
        if (pack.kind === 'content')
            result.push(id);
        else
            for (const child of requiresOf(id))
                visit(child);
    };
    for (const id of wanted)
        visit(id);
    return result;
}
