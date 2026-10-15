// Finds the configuration layers of a project, builds the pack catalog and
// resolves what to load. One implementation for CLI, MCP and the mod (D-2):
// the file system is an async adapter, paths are absolute and '/'-separated.
import { load as parseYaml } from 'js-yaml';
import { EMPTY_OVERLAY, parseOverlay, type Overlay } from './overlay.js';
import {
  isSourceOp,
  mergeConfigLayers,
  normalizeConfig,
  type ConfigLayer,
  type EffectiveConfig,
  type PackOp,
  type TermbridgeConfig,
} from './config.js';
import {
  PACK_FORMAT_VERSION,
  type PackJson,
  type PackManifest,
  type PackTier,
} from './pack-format.js';
import {
  planLoad,
  resolvePacks,
  type Catalog,
  type CatalogPack,
  type CatalogSource,
  type LoadPlan,
  type LoadSurface,
  type ResolveResult,
} from './resolver.js';

export interface ProjectFS {
  read(path: string): Promise<string | null>;
  exists(path: string): Promise<boolean>;
  // names of the sub-directories
  list(path: string): Promise<string[]>;
  mtime?(path: string): Promise<number | null>;
}

export const STARTER_PACK = 'starter';
export const D3_PROMPT_THRESHOLD = 2000;

export function toPosix(value: string): string {
  return value.replace(/\\/g, '/');
}

function isRoot(path: string): boolean {
  return path === '/' || /^[A-Za-z]:\/?$/.test(path);
}

export function parentDir(path: string): string {
  const p = toPosix(path);
  if (isRoot(p)) return p;
  const trimmed = p.replace(/\/+$/, '');
  const i = trimmed.lastIndexOf('/');
  if (i < 0) return trimmed;
  if (i === 0) return '/';
  const head = trimmed.slice(0, i);
  return /^[A-Za-z]:$/.test(head) ? `${head}/` : head;
}

export function joinPath(base: string, ...parts: string[]): string {
  let result = toPosix(base);
  for (const part of parts) {
    result = `${result.replace(/\/+$/, '')}/${toPosix(part).replace(/^\/+/, '')}`;
  }
  return result;
}

export function resolvePath(base: string, relative: string): string {
  const rel = toPosix(relative);
  const absolute = rel.startsWith('/') || /^[A-Za-z]:\//.test(rel);
  const start = absolute ? rel : joinPath(base, rel);
  const drive = /^[A-Za-z]:/.exec(start)?.[0] || '';
  const segments: string[] = [];
  for (const segment of start.slice(drive.length).split('/')) {
    if (!segment || segment === '.') continue;
    if (segment === '..') segments.pop();
    else segments.push(segment);
  }
  return `${drive}/${segments.join('/')}`;
}

export interface LockEntry {
  version: string;
  sha256: string;
  store: string;
  // where it was installed from: a registry URL or a .tbpack path/URL
  origin?: string;
  tiers: Record<string, Record<string, string>>;
}

export interface Lockfile {
  lockfileVersion: 1;
  packs: Record<string, LockEntry>;
}

export function parseLock(text: string | null): Lockfile | null {
  if (!text) return null;
  try {
    const lock = JSON.parse(text);
    return lock && lock.lockfileVersion === 1 && typeof lock.packs === 'object' ? lock : null;
  } catch {
    return null;
  }
}

// Where a project's local glossary is built (gitignored cache).
export function localPackId(glossaryDir: string): string {
  const name = toPosix(glossaryDir).replace(/\/+$/, '').split('/').pop() || 'glossary';
  return `local.${name.toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, '') || 'glossary'}`;
}

export function localPackCacheDir(projectDir: string, glossaryDir: string): string {
  return joinPath(projectDir, '.termbridge', '.cache', 'local', localPackId(glossaryDir).slice('local.'.length));
}

export function storeDirName(id: string, version: string, sha256: string): string {
  return `${id}@${version}-${sha256.slice(0, 8)}`;
}

export function parseStoreDirName(name: string): { id: string; version: string; sha8: string } | null {
  const match = /^(.+)@([^@]+)-([0-9a-f]{8})$/.exec(name);
  return match ? { id: match[1], version: match[2], sha8: match[3] } : null;
}

export interface DiscoveredLayers {
  layers: ConfigLayer[];
  // nearest directory holding a .termbridge/ folder
  projectDir?: string;
  files: string[];
  warnings: string[];
}

async function readConfigFile(fs: ProjectFS, file: string, warnings: string[]): Promise<TermbridgeConfig | null> {
  const text = await fs.read(file);
  if (text === null) return null;
  try {
    const { config, warnings: found } = normalizeConfig(parseYaml(text), file);
    warnings.push(...found);
    return config;
  } catch (error: any) {
    warnings.push(`${file}: YAML không đọc được / unreadable YAML (${error?.message || error})`);
    return null;
  }
}

export async function discoverLayers(
  fs: ProjectFS,
  options: { cwd: string; home: string; session?: { source: string; config: TermbridgeConfig } }
): Promise<DiscoveredLayers> {
  const home = toPosix(options.home).replace(/\/+$/, '');
  const warnings: string[] = [];
  const files: string[] = [];
  const layers: ConfigLayer[] = [];

  const userFile = joinPath(home, 'config.yaml');
  files.push(userFile);
  const user = await readConfigFile(fs, userFile, warnings);
  if (user) layers.push({ kind: 'user', source: userFile, dir: parentDir(home), config: user });

  // Walk up from cwd; the home folder is never a project.
  const projectLayers: ConfigLayer[] = [];
  let projectDir: string | undefined;
  let dir = toPosix(options.cwd);
  for (;;) {
    const marker = joinPath(dir, '.termbridge');
    if (marker.replace(/\/+$/, '') !== home && await fs.exists(marker)) {
      projectDir ??= dir;
      const file = joinPath(marker, 'config.yaml');
      files.push(file);
      const config = await readConfigFile(fs, file, warnings);
      if (config) {
        projectLayers.unshift({ kind: 'project', source: file, dir, config });
        if (config.root) break;
      }
    }
    const up = parentDir(dir);
    if (up === dir) break;
    dir = up;
  }
  layers.push(...projectLayers);

  if (projectDir) {
    const file = joinPath(projectDir, '.termbridge', 'config.local.yaml');
    files.push(file);
    const local = await readConfigFile(fs, file, warnings);
    if (local) layers.push({ kind: 'local', source: file, dir: projectDir, config: local });
  }
  if (options.session) layers.push({ kind: 'session', source: options.session.source, dir: toPosix(options.cwd), config: options.session.config });
  return { layers, projectDir, files, warnings };
}

// dev:/local: paths become absolute so sources can be compared.
export function normalizeOps(ops: PackOp[]): PackOp[] {
  return ops.map((op) => (isSourceOp(op) ? { ...op, path: resolvePath(op.dir || '/', op.path) } : op));
}

export interface CatalogResult {
  catalog: Catalog;
  notices: string[];
  watch: string[];
}

export async function buildCatalog(
  fs: ProjectFS,
  options: { ops: PackOp[]; home: string; lock?: Lockfile | null; projectDir?: string; cwd?: string }
): Promise<CatalogResult> {
  const sources: CatalogSource[] = [];
  const packs: CatalogPack[] = [];
  const notices: string[] = [];
  const watch: string[] = [];

  // dev: builds are read in place; local: glossaries from their built cache.
  const devDirs: Array<{ dir: string; spec?: string; local: boolean }> = [];
  for (const op of options.ops) {
    if (op.op === 'dev' && !devDirs.some((item) => item.dir === op.path)) devDirs.push({ dir: op.path, local: false });
    if (op.op === 'local' && !devDirs.some((item) => item.spec === op.path)) {
      devDirs.push({ dir: localPackCacheDir(options.projectDir || options.cwd || parentDir(op.path), op.path), spec: op.path, local: true });
    }
  }
  for (const [index, { dir, spec, local }] of devDirs.entries()) {
    const manifestPath = joinPath(dir, 'manifest.json');
    watch.push(manifestPath);
    const text = await fs.read(manifestPath);
    let parsed: PackManifest | undefined;
    try {
      parsed = text ? JSON.parse(text) : undefined;
    } catch {
      parsed = undefined;
    }
    if (!parsed || typeof parsed.formatVersion !== 'number' || !Array.isArray(parsed.packs)) {
      notices.push(local
        ? `Termbridge: glossary ${spec} chưa được dựng; chạy tb pack status ở project / glossary ${spec} is not built yet; run tb pack status in the project`
        : `Termbridge: ${dir} chưa có manifest.json, hãy chạy pnpm tb build / ${dir} has no manifest.json, run pnpm tb build`);
      continue;
    }
    if (parsed.formatVersion > PACK_FORMAT_VERSION) {
      notices.push(`Termbridge: ${dir} dùng formatVersion ${parsed.formatVersion}, cần cập nhật Termbridge / ${dir} uses formatVersion ${parsed.formatVersion}, please update Termbridge`);
      continue;
    }
    let stale = false;
    if (fs.mtime && !local) {
      const [built, concepts] = await Promise.all([fs.mtime(manifestPath), fs.mtime(joinPath(parentDir(dir), 'concepts'))]);
      stale = built !== null && concepts !== null && concepts > built;
    }
    const sourceId = local ? `local${index}` : `dev${index}`;
    const search = parsed.search
      ? {
          packs: parsed.search.packs,
          files: Object.fromEntries(Object.entries(parsed.search.files).map(([locale, file]) => [locale, { ...file, path: joinPath(dir, file.path) }])),
        }
      : undefined;
    sources.push({
      id: sourceId,
      kind: 'dev',
      dir,
      spec,
      contentIds: parsed.packs.filter((pack) => pack.kind === 'content' && pack.role !== 'starter').map((pack) => pack.id),
      search,
      stale,
      searchConfigHash: parsed.searchConfigHash,
    });
    const entries = await Promise.all(parsed.packs.map(async (entry) => {
      const path = joinPath(dir, entry.path);
      const raw = await fs.read(path);
      let json: PackJson | undefined;
      try {
        json = raw ? JSON.parse(raw) : undefined;
      } catch {
        json = undefined;
      }
      return { entry, path, json };
    }));
    for (const { entry, path, json } of entries) {
      if (!json) continue;
      packs.push({
        id: entry.id,
        version: entry.version,
        kind: entry.kind,
        role: entry.role,
        requires: json.requires || {},
        concepts: entry.concepts,
        tiers: json.tiers,
        sha256: entry.sha256,
        sourceId,
        path,
      });
    }
  }

  const storeDir = joinPath(options.home, 'store');
  watch.push(storeDir);
  if (await fs.exists(storeDir)) {
    sources.push({ id: 'store', kind: 'store', dir: storeDir });
    const names = (await fs.list(storeDir)).sort();
    const loaded = await Promise.all(names.map(async (name) => {
      const parsedName = parseStoreDirName(name);
      if (!parsedName) return null;
      const path = joinPath(storeDir, name, 'pack.json');
      const raw = await fs.read(path);
      try {
        return raw ? { name, path, json: JSON.parse(raw) as PackJson, sha8: parsedName.sha8 } : null;
      } catch {
        return null;
      }
    }));
    for (const item of loaded) {
      if (!item || item.json.formatVersion > PACK_FORMAT_VERSION) continue;
      packs.push({
        id: item.json.id,
        version: item.json.version,
        kind: item.json.kind,
        role: item.json.role,
        requires: item.json.requires || {},
        concepts: item.json.concepts,
        tiers: item.json.tiers,
        sha256: options.lock?.packs[item.json.id]?.store === item.name ? options.lock.packs[item.json.id].sha256 : item.sha8,
        sourceId: 'store',
        path: item.path,
      });
    }
  }

  const pins = options.lock
    ? Object.fromEntries(Object.entries(options.lock.packs).map(([id, entry]) => [id, entry.version]))
    : undefined;
  return { catalog: { sources, packs, pins }, notices, watch };
}

// A manifest for PackStore over the resolved packs, wherever they live. The
// combined index of a dev build is kept only when exactly its packs are loaded.
export function composeManifest(packs: CatalogPack[], catalog: Catalog, configHash: string): PackManifest {
  const ids = packs.map((pack) => pack.id).sort();
  let search: PackManifest['search'];
  let searchConfigHash = configHash;
  for (const source of catalog.sources) {
    if (source.kind !== 'dev' || !source.search) continue;
    const fromSource = packs.every((pack) => pack.sourceId === source.id);
    const all = [...(source.contentIds || [])].sort();
    if (fromSource && all.length === ids.length && all.every((id, i) => id === ids[i])) {
      search = source.search;
      searchConfigHash = source.searchConfigHash || configHash;
    }
  }
  return {
    formatVersion: PACK_FORMAT_VERSION,
    searchConfigHash,
    locales: [],
    packs: packs.map((pack) => ({
      id: pack.id,
      kind: pack.kind,
      ...(pack.role ? { role: pack.role } : {}),
      version: pack.version,
      path: pack.path,
      sha256: pack.sha256,
      concepts: pack.concepts,
    })),
    search,
  };
}

export interface ProjectContext {
  cwd: string;
  home: string;
  projectDir?: string;
  layers: ConfigLayer[];
  effective: EffectiveConfig;
  catalog: Catalog;
  resolved: ResolveResult;
  plan: LoadPlan;
  manifest: PackManifest;
  // tiers the plan turned off, for PackStore
  disabled: Record<string, PackTier[]>;
  // .termbridge/overrides.yaml (or the `overrides` key), empty when absent
  overlay: Overlay;
  overlayPath?: string;
  // a dev build older than its concepts/
  stale: boolean;
  lockPath: string;
  notices: string[];
  // files whose change means the context should be opened again
  watch: string[];
}

export async function openProject(
  fs: ProjectFS,
  options: {
    cwd: string;
    home: string;
    surface: LoadSurface;
    locale?: string;
    session?: { source: string; config: TermbridgeConfig };
    configHash: string;
  }
): Promise<ProjectContext> {
  const home = toPosix(options.home).replace(/\/+$/, '');
  const discovered = await discoverLayers(fs, { cwd: options.cwd, home, session: options.session });
  const effective = mergeConfigLayers(discovered.layers);
  const notices: string[] = [...discovered.warnings];
  const ops = normalizeOps(effective.packOps);

  const lockPath = discovered.projectDir
    ? joinPath(discovered.projectDir, '.termbridge', 'lock.json')
    : joinPath(home, 'lock.json');
  const lock = parseLock(await fs.read(lockPath));
  const { catalog, notices: catalogNotices, watch } = await buildCatalog(fs, { ops, home, lock, projectDir: discovered.projectDir, cwd: toPosix(options.cwd) });
  notices.push(...catalogNotices);

  const resolved = resolvePacks(ops, catalog, { packsConfigured: effective.packsConfigured });
  notices.push(...resolved.errors);
  if (resolved.missing.length > 0) {
    notices.push(`Termbridge: thiếu gói ${resolved.missing.join(', ')}; chạy: tb pack install / missing packs ${resolved.missing.join(', ')}; run: tb pack install`);
  }

  // D3: with nothing configured, the mod asks before loading a large set.
  let packs = resolved.packs;
  if (options.surface === 'mod' && !effective.packsConfigured) {
    const total = packs.reduce((sum, pack) => sum + pack.concepts, 0);
    if (total >= D3_PROMPT_THRESHOLD) {
      notices.push(`Termbridge: đã cài ${total} khái niệm; chọn gói bằng /termbridge packs <id,...>. Tạm thời chỉ nạp ${STARTER_PACK} / ${total} concepts installed; choose packs with /termbridge packs <id,...>. Loading only ${STARTER_PACK} for now`);
      packs = catalog.packs.filter((pack) => pack.kind === 'content' && pack.role === 'starter').slice(0, 1);
    }
  }

  const locale = options.locale || effective.locale;
  const plan = planLoad(packs, effective, { surface: options.surface, locale, notice: (message) => notices.push(message) });
  const loaded = plan.packs.map((item) => item.pack);
  const disabled: Record<string, PackTier[]> = {};
  for (const item of plan.packs) {
    const off = (Object.entries(item.tiers) as Array<[PackTier | 'vectors', string]>)
      .filter(([tier, mode]) => tier !== 'vectors' && mode === 'off')
      .map(([tier]) => tier as PackTier);
    if (off.length) disabled[item.pack.id] = off;
  }
  const stale = loaded.some((pack) => catalog.sources.find((source) => source.id === pack.sourceId)?.stale);

  // Overlay: the `overrides` path (relative to the project), else the default file.
  const base = discovered.projectDir || toPosix(options.cwd);
  const overlayPath = effective.overrides
    ? resolvePath(base, effective.overrides)
    : discovered.projectDir ? joinPath(discovered.projectDir, '.termbridge', 'overrides.yaml') : undefined;
  let overlay: Overlay = EMPTY_OVERLAY;
  if (overlayPath) {
    const text = await fs.read(overlayPath);
    if (text !== null) {
      try {
        const parsed = parseOverlay(parseYaml(text), overlayPath);
        overlay = parsed.overlay;
        notices.push(...parsed.warnings);
      } catch (error: any) {
        notices.push(`${overlayPath}: YAML không đọc được / unreadable YAML (${error?.message || error})`);
      }
    }
  }

  return {
    cwd: toPosix(options.cwd),
    home,
    projectDir: discovered.projectDir,
    layers: discovered.layers,
    effective,
    catalog,
    resolved,
    plan,
    manifest: composeManifest(loaded, catalog, options.configHash),
    disabled,
    overlay,
    overlayPath,
    stale,
    lockPath,
    notices,
    watch: [...discovered.files, lockPath, ...(overlayPath ? [overlayPath] : []), ...watch],
  };
}
