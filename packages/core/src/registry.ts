// Pack registries (Plan 3.9): registry.json lists every version of every pack
// with the URL and sha256 of its .tbpack. Only `tb pack add|install|update`
// reach the network (D-7); file: URLs and plain paths work offline.
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { PACK_FORMAT_VERSION, type PackJson, type PackManifest } from './pack-format.js';
import { PackInstallError, type InstalledPack } from './pack-install.js';
import { compareVersions, maxSatisfying, parseVersion } from './semver.js';
import { importTbpack, packDirToTbpack } from './tbpack.js';

export interface RegistryVersion {
  url: string;
  sha256: string;
  bytes: number;
  formatVersion: number;
}

export interface Registry {
  registryVersion: 1;
  name?: string;
  // only a registry that says so is official; everything else is labelled unofficial
  official?: boolean;
  packs: Record<string, { versions: Record<string, RegistryVersion> }>;
}

function isRemote(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

function resolveUrl(url: string, base?: string): string {
  if (isRemote(url) || url.startsWith('file:')) return url;
  if (base && (isRemote(base) || base.startsWith('file:'))) return new URL(url, base).toString();
  return path.resolve(base ? path.dirname(base) : '.', url);
}

export async function fetchBytes(url: string, base?: string): Promise<Buffer> {
  const target = resolveUrl(url, base);
  if (isRemote(target)) {
    const response = await fetch(target);
    if (!response.ok) throw new PackInstallError(`Tải ${target} lỗi HTTP ${response.status} / download failed`);
    return Buffer.from(await response.arrayBuffer());
  }
  const file = target.startsWith('file:') ? fileURLToPath(target) : target;
  return fs.readFileSync(file);
}

export async function loadRegistry(url: string): Promise<Registry> {
  const registry = JSON.parse((await fetchBytes(url)).toString('utf-8'));
  if (registry?.registryVersion !== 1 || typeof registry.packs !== 'object') {
    throw new PackInstallError(`${url}: không phải registry.json hợp lệ / not a valid registry.json`);
  }
  return registry;
}

// The newest version in range across registries; the first registry wins ties.
export async function findInRegistries(urls: string[], id: string, range = '*') {
  let best: { registry: string; official: boolean; version: string; entry: RegistryVersion } | null = null;
  for (const url of urls) {
    let registry: Registry;
    try {
      registry = await loadRegistry(url);
    } catch {
      continue;
    }
    const versions = Object.entries(registry.packs[id]?.versions || {})
      .filter(([, entry]) => entry.formatVersion <= PACK_FORMAT_VERSION)
      .map(([version]) => version);
    const version = maxSatisfying(versions, range);
    if (!version) continue;
    if (!best || compareVersions(parseVersion(version)!, parseVersion(best.version)!) > 0) {
      best = { registry: url, official: registry.official === true, version, entry: registry.packs[id].versions[version] };
    }
  }
  return best;
}

export interface RegistryInstall extends InstalledPack {
  origin: string;
  official: boolean;
}

// Installs id@range (and, for a meta-pack, what it requires) from registries.
export async function installFromRegistries(options: {
  home: string;
  registries: string[];
  id: string;
  range?: string;
  diskMB?: number;
}): Promise<RegistryInstall[]> {
  const installed: RegistryInstall[] = [];
  const visit = async (id: string, range: string | undefined, stack: string[]) => {
    if (stack.includes(id)) throw new PackInstallError(`Vòng phụ thuộc / dependency cycle: ${[...stack, id].join(' → ')}`);
    const found = await findInRegistries(options.registries, id, range);
    if (!found) {
      throw new PackInstallError(`Không có ${id}${range ? `@${range}` : ''} trong registry / not found in registries: ${options.registries.join(', ') || '(none)'}`);
    }
    const bytes = await fetchBytes(found.entry.url, found.registry);
    const pack = importTbpack(bytes, { home: options.home, expectedSha: found.entry.sha256, diskMB: options.diskMB });
    installed.push({ ...pack, origin: found.registry, official: found.official });
    const json = JSON.parse(fs.readFileSync(path.join(options.home, 'store', pack.store, 'pack.json'), 'utf-8')) as PackJson;
    for (const [child, childRange] of Object.entries(json.requires || {})) await visit(child, childRange, [...stack, id]);
  };
  await visit(options.id, options.range, []);
  return installed;
}

// Writes <id>-<version>.tbpack for every pack of a built dist plus registry.json.
export function buildRegistry(options: { distDir: string; outDir: string; baseUrl?: string; name?: string; official?: boolean }): Registry {
  const manifest = JSON.parse(fs.readFileSync(path.join(options.distDir, 'manifest.json'), 'utf-8')) as PackManifest;
  fs.mkdirSync(options.outDir, { recursive: true });
  const registry: Registry = { registryVersion: 1, name: options.name, official: options.official, packs: {} };
  for (const entry of [...manifest.packs].sort((a, b) => (a.id < b.id ? -1 : 1))) {
    const dir = path.join(options.distDir, path.dirname(entry.path));
    const bytes = packDirToTbpack(dir);
    const file = `${entry.id}-${entry.version}.tbpack`;
    fs.writeFileSync(path.join(options.outDir, file), bytes);
    const url = options.baseUrl ? `${options.baseUrl.replace(/\/+$/, '')}/${file}` : file;
    registry.packs[entry.id] ??= { versions: {} };
    registry.packs[entry.id].versions[entry.version] = {
      url,
      sha256: crypto.createHash('sha256').update(bytes).digest('hex'),
      bytes: bytes.length,
      formatVersion: manifest.formatVersion,
    };
  }
  if (registry.name === undefined) delete registry.name;
  if (registry.official === undefined) delete registry.official;
  fs.writeFileSync(path.join(options.outDir, 'registry.json'), `${JSON.stringify(registry, null, 2)}\n`, 'utf-8');
  return registry;
}

export function registryUrlForPath(file: string): string {
  return pathToFileURL(path.resolve(file)).toString();
}
