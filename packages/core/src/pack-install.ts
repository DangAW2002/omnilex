// Node side of the pack store (Plan 3.4): installing into
// $TERMBRIDGE_HOME/store, lockfiles, the project registry and pruning.
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import yaml from 'js-yaml';
import { PACK_TIER_FILES, PACK_TIERS, type PackJson, type PackManifest } from './pack-format.js';
import type { IndexCache, PackIO } from './pack-reader.js';
import {
  parseLock,
  parseStoreDirName,
  storeDirName,
  toPosix,
  type LockEntry,
  type Lockfile,
  type ProjectFS,
} from './project.js';
import { maxSatisfying } from './semver.js';

export function termbridgeHome(env: NodeJS.ProcessEnv = process.env): string {
  if (env.OMNILEX_HOME) return toPosix(env.OMNILEX_HOME);
  if (env.TERMBRIDGE_HOME) return toPosix(env.TERMBRIDGE_HOME);
  const omnilexPath = path.join(os.homedir(), '.omnilex');
  const termbridgePath = path.join(os.homedir(), '.termbridge');
  if (fs.existsSync(omnilexPath)) return toPosix(omnilexPath);
  if (fs.existsSync(termbridgePath)) return toPosix(termbridgePath);
  return toPosix(omnilexPath);
}
export const omnilexHome = termbridgeHome;

export const nodeProjectFS: ProjectFS = {
  async read(file) {
    try {
      return fs.readFileSync(file, 'utf-8');
    } catch {
      return null;
    }
  },
  async exists(file) {
    return fs.existsSync(file);
  },
  async list(dir) {
    try {
      return fs.readdirSync(dir, { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name);
    } catch {
      return [];
    }
  },
  async mtime(file) {
    try {
      return fs.statSync(file).mtimeMs;
    } catch {
      return null;
    }
  },
};

export const nodePackIO: PackIO = {
  readText(file) {
    try {
      return fs.readFileSync(file, 'utf-8');
    } catch {
      return null;
    }
  },
};

export function fileIndexCache(dir: string): IndexCache {
  return {
    read(key) {
      try {
        return fs.readFileSync(path.join(dir, `${key}.json`), 'utf-8');
      } catch {
        return null;
      }
    },
    write(key, text) {
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, `${key}.json`), text, 'utf-8');
    },
  };
}

function sha256(content: Buffer | string): string {
  return crypto.createHash('sha256').update(content).digest('hex');
}

function readJson<T>(file: string): T | null {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf-8'));
  } catch {
    return null;
  }
}

export class PackInstallError extends Error {}

// Every tier file of a pack directory against the hashes in its pack.json.
export function verifyPackDir(dir: string): { pack: PackJson; packSha: string; problems: string[] } {
  const packFile = path.join(dir, 'pack.json');
  if (!fs.existsSync(packFile)) throw new PackInstallError(`Thiếu pack.json / missing pack.json: ${toPosix(dir)}`);
  const packText = fs.readFileSync(packFile);
  const pack = JSON.parse(packText.toString('utf-8')) as PackJson;
  const problems: string[] = [];
  for (const tier of PACK_TIERS) {
    for (const [locale, info] of Object.entries(pack.tiers?.[tier]?.files || {})) {
      const file = path.join(dir, locale, PACK_TIER_FILES[tier]);
      if (!fs.existsSync(file)) {
        problems.push(`${pack.id}: thiếu / missing ${locale}/${PACK_TIER_FILES[tier]}`);
        continue;
      }
      const content = fs.readFileSync(file);
      if (sha256(content) !== info.sha256 || content.length !== info.bytes) {
        problems.push(`${pack.id}: sai sha256 / sha256 mismatch ${locale}/${PACK_TIER_FILES[tier]}`);
      }
    }
  }
  return { pack, packSha: sha256(packText), problems };
}

export interface SourcePack {
  id: string;
  version: string;
  kind: 'content' | 'meta';
  dir: string;
  requires: Record<string, string>;
}

// The packs a built dist/ offers (manifest + pack.json files).
export function listSourcePacks(distDir: string): SourcePack[] {
  const manifest = readJson<PackManifest>(path.join(distDir, 'manifest.json'));
  if (!manifest) return [];
  return manifest.packs.map((entry) => {
    const dir = path.join(distDir, path.dirname(entry.path));
    const pack = readJson<PackJson>(path.join(dir, 'pack.json'));
    return { id: entry.id, version: entry.version, kind: entry.kind, dir, requires: pack?.requires || {} };
  });
}

function dirSizeBytes(dir: string): number {
  if (!fs.existsSync(dir)) return 0;
  let total = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    total += entry.isDirectory() ? dirSizeBytes(full) : fs.statSync(full).size;
  }
  return total;
}

export interface InstalledPack {
  id: string;
  version: string;
  store: string;
  entry: LockEntry;
  reused: boolean;
}

// Copies one pack (and, for a meta-pack, what it requires) from a built dist
// into the store. Files are verified before the copy is renamed into place,
// so a bad source never leaves a half-written store entry.
export function installPack(options: {
  home: string;
  sources: string[];
  id: string;
  range?: string;
  diskMB?: number;
  exactSha?: string;
}): InstalledPack[] {
  const storeDir = path.join(options.home, 'store');
  const offered = options.sources.flatMap((source) => listSourcePacks(source));
  const installed: InstalledPack[] = [];
  const visit = (id: string, range: string | undefined, stack: string[]) => {
    if (stack.includes(id)) throw new PackInstallError(`Vòng phụ thuộc / dependency cycle: ${[...stack, id].join(' → ')}`);
    const matching = offered.filter((pack) => pack.id === id);
    const version = maxSatisfying(matching.map((pack) => pack.version), range || '*');
    const source = matching.find((pack) => pack.version === version);
    if (!source) {
      throw new PackInstallError(`Không tìm thấy gói ${id}${range ? `@${range}` : ''} trong nguồn / pack ${id}${range ? `@${range}` : ''} not found in sources: ${options.sources.map(toPosix).join(', ') || '(none)'}`);
    }
    const { pack, packSha, problems } = verifyPackDir(source.dir);
    if (problems.length) throw new PackInstallError(problems.join('\n'));
    if (options.exactSha && stack.length === 0 && packSha !== options.exactSha) {
      throw new PackInstallError(`${id}@${pack.version}: sha256 khác lockfile / sha256 differs from the lockfile`);
    }
    const name = storeDirName(pack.id, pack.version, packSha);
    const target = path.join(storeDir, name);
    let reused = fs.existsSync(target);
    if (reused) {
      const check = verifyPackDir(target);
      if (check.problems.length || check.packSha !== packSha) {
        fs.rmSync(target, { recursive: true, force: true });
        reused = false;
      }
    }
    if (!reused) {
      const incoming = dirSizeBytes(source.dir);
      if (options.diskMB !== undefined && (dirSizeBytes(storeDir) + incoming) / (1024 * 1024) > options.diskMB) {
        throw new PackInstallError(`Vượt limits.diskMB=${options.diskMB} khi cài ${id} / installing ${id} exceeds limits.diskMB=${options.diskMB}`);
      }
      const temp = path.join(storeDir, `.tmp-${name}-${process.pid}`);
      fs.rmSync(temp, { recursive: true, force: true });
      fs.mkdirSync(temp, { recursive: true });
      fs.copyFileSync(path.join(source.dir, 'pack.json'), path.join(temp, 'pack.json'));
      for (const tier of PACK_TIERS) {
        for (const locale of Object.keys(pack.tiers?.[tier]?.files || {})) {
          fs.mkdirSync(path.join(temp, locale), { recursive: true });
          fs.copyFileSync(path.join(source.dir, locale, PACK_TIER_FILES[tier]), path.join(temp, locale, PACK_TIER_FILES[tier]));
        }
      }
      const check = verifyPackDir(temp);
      if (check.problems.length) {
        fs.rmSync(temp, { recursive: true, force: true });
        throw new PackInstallError(check.problems.join('\n'));
      }
      fs.renameSync(temp, target);
    }
    const tiers: LockEntry['tiers'] = {};
    for (const tier of PACK_TIERS) {
      const files = pack.tiers?.[tier]?.files;
      if (files) tiers[tier] = Object.fromEntries(Object.entries(files).map(([locale, info]) => [locale, info.sha256]));
    }
    installed.push({ id: pack.id, version: pack.version, store: name, reused, entry: { version: pack.version, sha256: packSha, store: name, tiers } });
    for (const [child, childRange] of Object.entries(pack.requires || {})) visit(child, childRange, [...stack, id]);
  };
  visit(options.id, options.range, []);
  return installed;
}

export function readLockFile(file: string): Lockfile {
  return parseLock(fs.existsSync(file) ? fs.readFileSync(file, 'utf-8') : null) || { lockfileVersion: 1, packs: {} };
}

export function writeLockFile(file: string, lock: Lockfile): void {
  const packs = Object.fromEntries(Object.entries(lock.packs).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)));
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify({ lockfileVersion: 1, packs }, null, 2)}\n`, 'utf-8');
}

// Checks the store copies a lockfile names; returns one line per problem.
export function verifyLock(home: string, lock: Lockfile): string[] {
  const problems: string[] = [];
  for (const [id, entry] of Object.entries(lock.packs)) {
    const dir = path.join(home, 'store', entry.store);
    if (!fs.existsSync(dir)) {
      problems.push(`${id}: chưa có trong kho / not in the store (${entry.store})`);
      continue;
    }
    const check = verifyPackDir(dir);
    problems.push(...check.problems);
    if (check.packSha !== entry.sha256) problems.push(`${id}: sha256 của pack.json khác lockfile / pack.json sha256 differs from the lockfile`);
    for (const [tier, files] of Object.entries(entry.tiers)) {
      for (const [locale, sha] of Object.entries(files)) {
        if (check.pack.tiers?.[tier as keyof typeof check.pack.tiers]?.files[locale]?.sha256 !== sha) {
          problems.push(`${id}: ${tier}/${locale} khác lockfile / differs from the lockfile`);
        }
      }
    }
  }
  return problems;
}

// `tb pack install --frozen`: the lock must already describe the store packs the
// configuration resolves to, and every copy must match it byte for byte.
export function frozenInstall(options: { home: string; lock: Lockfile; sources: string[]; wanted: string[] }): string[] {
  const problems: string[] = [];
  const locked = Object.keys(options.lock.packs).sort();
  const wanted = [...new Set(options.wanted)].sort();
  if (locked.join(',') !== wanted.join(',')) {
    problems.push(`lock.json không khớp cấu hình / lock.json does not match the configuration: lock [${locked.join(', ')}], config [${wanted.join(', ')}]`);
    return problems;
  }
  for (const [id, entry] of Object.entries(options.lock.packs)) {
    if (!fs.existsSync(path.join(options.home, 'store', entry.store))) {
      try {
        installPack({ home: options.home, sources: options.sources, id, range: entry.version, exactSha: entry.sha256 });
      } catch (error: any) {
        problems.push(error.message);
      }
    }
  }
  return problems.length ? problems : verifyLock(options.home, options.lock);
}

export function registerProject(home: string, projectDir: string): void {
  const file = path.join(home, 'projects.json');
  const current = readJson<{ projects: string[] }>(file)?.projects || [];
  const dir = toPosix(path.resolve(projectDir));
  if (current.includes(dir)) return;
  fs.mkdirSync(home, { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify({ projects: [...current, dir].sort() }, null, 2)}\n`, 'utf-8');
}

// Removes store entries no registered project (nor the user lock) references,
// and forgets projects whose directory is gone.
export function pruneStore(home: string): { removed: string[]; kept: string[]; forgotten: string[] } {
  const file = path.join(home, 'projects.json');
  const projects = readJson<{ projects: string[] }>(file)?.projects || [];
  const alive = projects.filter((dir) => fs.existsSync(dir));
  const forgotten = projects.filter((dir) => !alive.includes(dir));
  if (forgotten.length) fs.writeFileSync(file, `${JSON.stringify({ projects: alive }, null, 2)}\n`, 'utf-8');

  const referenced = new Set<string>();
  for (const lockFile of [path.join(home, 'lock.json'), ...alive.map((dir) => path.join(dir, '.termbridge', 'lock.json'))]) {
    for (const entry of Object.values(readLockFile(lockFile).packs)) referenced.add(entry.store);
  }
  const storeDir = path.join(home, 'store');
  const removed: string[] = [];
  const kept: string[] = [];
  for (const name of fs.existsSync(storeDir) ? fs.readdirSync(storeDir).sort() : []) {
    if (!parseStoreDirName(name)) continue;
    if (referenced.has(name)) kept.push(name);
    else {
      fs.rmSync(path.join(storeDir, name), { recursive: true, force: true });
      removed.push(name);
    }
  }
  return { removed, kept, forgotten };
}

// Adds or removes a pack id in a config file's `packs` list (comments are not kept).
export function editConfigPacks(file: string, edit: (packs: string[]) => string[]): string[] {
  const current = fs.existsSync(file) ? ((yaml.load(fs.readFileSync(file, 'utf-8')) as Record<string, any>) || {}) : {};
  const packs = edit(Array.isArray(current.packs) ? current.packs.map(String) : []);
  const next = { ...current, packs };
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, yaml.dump(next, { lineWidth: 120 }), 'utf-8');
  return packs;
}

