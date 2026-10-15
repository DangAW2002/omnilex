// Layered configuration (Plan 3.3). Pure: callers read the files and hand the
// parsed layers over, lowest first.
export function isSourceOp(op) {
    return op.op === 'dev' || op.op === 'local';
}
export const DEFAULT_CONFIG = {
    locale: 'vi',
    fallbackLocales: ['en'],
    profile: 'standard',
    tiers: { vectors: 'auto' },
    autoInstall: 'prompt',
};
const KNOWN_KEYS = new Set([
    'root', 'locale', 'fallbackLocales', 'profile', 'packs', 'packsReset',
    'tiers', 'limits', 'autoInstall', 'registries', 'overrides',
]);
const PROFILES = ['lite', 'standard', 'semantic'];
const TIER_MODES = ['eager', 'lazy', 'remote', 'off'];
// Keeps the keys we understand, with the right types; everything else is a warning.
export function normalizeConfig(raw, source) {
    const warnings = [];
    const config = {};
    if (raw === null || raw === undefined)
        return { config, warnings };
    if (typeof raw !== 'object' || Array.isArray(raw)) {
        return { config, warnings: [`${source}: cấu hình phải là một object / config must be a mapping`] };
    }
    const value = raw;
    const bad = (key) => warnings.push(`${source}: giá trị "${key}" không hợp lệ, bỏ qua / invalid "${key}", ignored`);
    for (const key of Object.keys(value)) {
        if (!KNOWN_KEYS.has(key))
            warnings.push(`${source}: khóa lạ "${key}" / unknown key "${key}"`);
    }
    if (value.root !== undefined)
        typeof value.root === 'boolean' ? (config.root = value.root) : bad('root');
    if (value.locale !== undefined)
        typeof value.locale === 'string' ? (config.locale = value.locale) : bad('locale');
    if (value.fallbackLocales !== undefined) {
        Array.isArray(value.fallbackLocales) && value.fallbackLocales.every((item) => typeof item === 'string')
            ? (config.fallbackLocales = value.fallbackLocales)
            : bad('fallbackLocales');
    }
    if (value.profile !== undefined)
        PROFILES.includes(value.profile) ? (config.profile = value.profile) : bad('profile');
    if (value.packs !== undefined) {
        Array.isArray(value.packs) && value.packs.every((item) => typeof item === 'string')
            ? (config.packs = value.packs.map((item) => item.trim()).filter(Boolean))
            : bad('packs');
    }
    if (value.packsReset !== undefined)
        typeof value.packsReset === 'boolean' ? (config.packsReset = value.packsReset) : bad('packsReset');
    if (value.tiers !== undefined) {
        const tiers = {};
        if (value.tiers?.explanations !== undefined) {
            TIER_MODES.includes(value.tiers.explanations) ? (tiers.explanations = value.tiers.explanations) : bad('tiers.explanations');
        }
        if (value.tiers?.vectors !== undefined) {
            ['auto', 'on', 'off'].includes(value.tiers.vectors) ? (tiers.vectors = value.tiers.vectors) : bad('tiers.vectors');
        }
        config.tiers = tiers;
    }
    if (value.limits !== undefined) {
        const limits = {};
        for (const key of ['memoryMB', 'diskMB']) {
            const limit = value.limits?.[key];
            if (limit === undefined)
                continue;
            typeof limit === 'number' && limit > 0 ? (limits[key] = limit) : bad(`limits.${key}`);
        }
        config.limits = limits;
    }
    if (value.autoInstall !== undefined) {
        ['never', 'prompt', 'always'].includes(value.autoInstall) ? (config.autoInstall = value.autoInstall) : bad('autoInstall');
    }
    if (value.registries !== undefined) {
        Array.isArray(value.registries) ? (config.registries = value.registries.map(String)) : bad('registries');
    }
    if (value.overrides !== undefined)
        typeof value.overrides === 'string' ? (config.overrides = value.overrides) : bad('overrides');
    return { config, warnings };
}
// "+it.ai-ml@^0.1", "-finance", "tech", "dev:./dist", "local:./glossary"
export function parsePackItem(item, layer) {
    const source = layer.source;
    for (const kind of ['dev', 'local']) {
        if (item.startsWith(`${kind}:`))
            return { op: kind, path: item.slice(kind.length + 1), dir: layer.dir, source };
    }
    const op = item.startsWith('-') ? 'remove' : 'add';
    const body = item.replace(/^[+-]/, '');
    const at = body.indexOf('@', 1);
    return at > 0
        ? { op, id: body.slice(0, at), range: body.slice(at + 1), source }
        : { op, id: body, source };
}
export function mergeConfigLayers(layers) {
    const all = [{ kind: 'default', source: 'default', config: DEFAULT_CONFIG }, ...layers];
    const effective = {
        locale: 'vi',
        fallbackLocales: [],
        profile: 'standard',
        tiers: { vectors: 'auto' },
        limits: {},
        autoInstall: 'prompt',
        registries: [],
        packOps: [],
        packsConfigured: false,
        origins: {},
        warnings: [],
    };
    const set = (key, value, source, assign) => {
        if (value === undefined)
            return;
        assign();
        effective.origins[key] = source;
    };
    for (const layer of all) {
        const c = layer.config;
        set('locale', c.locale, layer.source, () => (effective.locale = c.locale));
        set('fallbackLocales', c.fallbackLocales, layer.source, () => (effective.fallbackLocales = [...c.fallbackLocales]));
        set('profile', c.profile, layer.source, () => (effective.profile = c.profile));
        set('autoInstall', c.autoInstall, layer.source, () => (effective.autoInstall = c.autoInstall));
        set('registries', c.registries, layer.source, () => (effective.registries = [...c.registries]));
        set('overrides', c.overrides, layer.source, () => (effective.overrides = c.overrides));
        set('tiers.explanations', c.tiers?.explanations, layer.source, () => (effective.tiers.explanations = c.tiers.explanations));
        set('tiers.vectors', c.tiers?.vectors, layer.source, () => (effective.tiers.vectors = c.tiers.vectors));
        for (const key of ['memoryMB', 'diskMB']) {
            const limit = c.limits?.[key];
            const current = effective.limits[key];
            // A layer can only tighten a limit set below it.
            if (limit !== undefined && (current === undefined || limit < current)) {
                effective.limits[key] = limit;
                effective.origins[`limits.${key}`] = layer.source;
            }
        }
        if (c.packsReset) {
            effective.packOps.push({ op: 'reset', source: layer.source });
            effective.packsConfigured = true;
        }
        for (const item of c.packs || []) {
            effective.packOps.push(parsePackItem(item, layer));
            effective.packsConfigured = true;
        }
    }
    return effective;
}
function show(value) {
    return Array.isArray(value) ? `[${value.join(', ')}]` : String(value);
}
// Like `git config --show-origin`: one line per effective value.
export function explainConfig(effective) {
    const lines = [];
    const add = (key, value) => {
        if (value === undefined)
            return;
        lines.push(`${key} = ${show(value)}  # ${effective.origins[key] || 'default'}`);
    };
    add('locale', effective.locale);
    add('fallbackLocales', effective.fallbackLocales);
    add('profile', effective.profile);
    add('tiers.explanations', effective.tiers.explanations);
    add('tiers.vectors', effective.tiers.vectors);
    add('limits.memoryMB', effective.limits.memoryMB);
    add('limits.diskMB', effective.limits.diskMB);
    add('autoInstall', effective.autoInstall);
    add('registries', effective.registries.length ? effective.registries : undefined);
    add('overrides', effective.overrides);
    for (const op of effective.packOps) {
        let text;
        if (op.op === 'reset')
            text = 'packsReset';
        else if (isSourceOp(op))
            text = `${op.op}:${op.path}`;
        else
            text = `${op.op === 'remove' ? '-' : '+'}${op.id}${op.range ? `@${op.range}` : ''}`;
        lines.push(`packs ${text}  # ${op.source}`);
    }
    return lines;
}
