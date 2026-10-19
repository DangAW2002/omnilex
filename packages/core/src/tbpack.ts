// .tbpack export and import (Plan 3.6, D-9). A .tbpack is a zip holding one
// pack directory: pack.json at the root, attributions.json, and the tier files
// under <locale>/. Imports land in the store only after every check passed.
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import Ajv from 'ajv';
import {
  PACK_FORMAT_VERSION,
  PACK_TIER_FILES,
  PACK_TIERS,
  type PackAttribution,
  type PackCard,
  type PackExplanation,
  type PackJson,
  type PackTerm,
  type PackTier,
} from './pack-format.js';
import { PACK_SCHEMA } from './pack-schema.js';
import { renderPacks, type PackConceptData } from './packs.js';
import { storeDirName, type LockEntry } from './project.js';
import type { SourcesConfig } from './types.js';
import { DEFAULT_ZIP_LIMITS, readZip, writeZip, type ZipLimits } from './zip.js';
import { PackInstallError, type InstalledPack } from './pack-install.js';

const LOCALE = '[a-z]{2,3}(?:-[A-Za-z0-9]+)?';
const TIER_FILE_NAMES = Object.values(PACK_TIER_FILES).map((name) => name.replace('.', '\\.')).join('|');
export const TBPACK_ENTRY = new RegExp(`^(?:pack\\.json|attributions\\.json|${LOCALE}/(?:${TIER_FILE_NAMES}))$`);

function sha256(data: Buffer | string): string {
  return crypto.createHash('sha256').update(data).digest('hex');
}

function readText(file: string): string | null {
  try {
    return fs.readFileSync(file, 'utf-8');
  } catch {
    return null;
  }
}

// A built pack directory, as is.
export function packDirToTbpack(dir: string): Buffer {
  const pack = JSON.parse(fs.readFileSync(path.join(dir, 'pack.json'), 'utf-8')) as PackJson;
  const entries = [{ name: 'pack.json', data: fs.readFileSync(path.join(dir, 'pack.json')) }];
  if (pack.attributions) entries.push({ name: 'attributions.json', data: fs.readFileSync(path.join(dir, 'attributions.json')) });
  for (const tier of PACK_TIERS) {
    for (const locale of Object.keys(pack.tiers?.[tier]?.files || {})) {
      entries.push({ name: `${locale}/${PACK_TIER_FILES[tier]}`, data: fs.readFileSync(path.join(dir, locale, PACK_TIER_FILES[tier])) });
    }
  }
  return writeZip(entries);
}

export interface DeriveOptions {
  id: string;
  title: Record<string, string>;
  version: string;
  // keep a concept when this returns true (all by default)
  filter?: (card: PackCard) => boolean;
  tiers?: PackTier[];
  locales?: string[];
  // last chance to change a locale's concepts (overlay for --effective)
  transform?: (locale: string, concepts: PackConceptData[]) => PackConceptData[];
}

// A new pack made from the cards, terms and explanations of existing pack
// directories: `tb pack export --domain`, `--locales`, `--tiers`, `--effective`.
export function derivePack(packDirs: string[], options: DeriveOptions): { dir: Map<string, string>; pack: PackJson } {
  const packs = packDirs.map((dir) => ({ dir, json: JSON.parse(fs.readFileSync(path.join(dir, 'pack.json'), 'utf-8')) as PackJson }));
  const available = [...new Set(packs.flatMap((pack) => pack.json.locales))].sort();
  const locales = (options.locales || available).filter((locale) => available.includes(locale));
  const hasExplanations = packs.every((pack) => pack.json.tiers?.explanations);
  const tiers = (options.tiers || [...PACK_TIERS]).filter((tier) => tier !== 'explanations' || hasExplanations);

  const sources: SourcesConfig = {};
  for (const pack of packs) {
    const attributions: PackAttribution[] = JSON.parse(readText(path.join(pack.dir, 'attributions.json')) || '[]');
    for (const item of attributions) {
      sources[item.ref] ??= {
        title: item.title, publisher: item.publisher, url: item.url, type: 'docs', tier: 'B', languages: [],
        license: item.license, license_evidence: item.license_evidence, reuse: 'adapt', domains: [],
      };
    }
  }

  const perLocale: Record<string, PackConceptData[]> = {};
  for (const locale of locales) {
    const seen = new Set<string>();
    const concepts: PackConceptData[] = [];
    for (const pack of packs) {
      const base = path.join(pack.dir, locale);
      const cards: PackCard[] = JSON.parse(readText(path.join(base, PACK_TIER_FILES.cards)) || '[]');
      const terms: PackTerm[] = JSON.parse(readText(path.join(base, PACK_TIER_FILES.terms)) || '[]');
      const explanations = new Map<string, PackExplanation>();
      for (const line of (readText(path.join(base, PACK_TIER_FILES.explanations)) || '').split('\n')) {
        if (!line.trim()) continue;
        const record = JSON.parse(line) as PackExplanation;
        explanations.set(record.id, record);
      }
      for (const card of cards) {
        if (seen.has(card.id) || (options.filter && !options.filter(card))) continue;
        seen.add(card.id);
        const explanation = explanations.get(card.id) || {
          id: card.id, locale, content_locale: locale,
          metadata: { id: card.id, domains: card.domains, level: card.level, status: card.status },
          entry: { locale, frontmatter: {}, content: '' },
        };
        const refs = [...(explanation.metadata?.sources || []), ...(explanation.entry?.frontmatter?.sources || [])]
          .flatMap((source: any) => (source && typeof source === 'object' && source.ref ? [source.ref] : []));
        concepts.push({ card, terms: terms.filter((term) => term.conceptId === card.id), explanation, sourceRefs: refs });
      }
    }
    perLocale[locale] = options.transform ? options.transform(locale, concepts) : concepts;
  }

  const domains = [...new Set(Object.values(perLocale).flat().map((concept) => concept.card.domains[0]).filter(Boolean))].sort();
  const rendered = renderPacks({
    version: options.version,
    locales,
    sources,
    content: [{ id: options.id, title: options.title, domains, locales: perLocale, tiers }],
    meta: [],
  });
  const prefix = `packs/${options.id}/`;
  const dir = new Map(rendered.files.filter((file) => file.path.startsWith(prefix)).map((file) => [file.path.slice(prefix.length), file.content]));
  return { dir, pack: JSON.parse(dir.get('pack.json')!) };
}

export function filesToTbpack(files: Map<string, string>): Buffer {
  return writeZip([...files].map(([name, content]) => ({ name, data: Buffer.from(content, 'utf-8') })));
}

let validatePackJson: ((value: unknown) => boolean) & { errors?: any } | null = null;
function schemaCheck(pack: unknown): string | null {
  if (!validatePackJson) {
    const AjvClass: any = (Ajv as any).default || Ajv;
    validatePackJson = new AjvClass({ allErrors: true }).compile(PACK_SCHEMA);
  }
  if (validatePackJson!(pack)) return null;
  return (validatePackJson!.errors || []).map((error: any) => `${error.instancePath || '/'} ${error.message}`).join('; ');
}

// Checks a .tbpack without writing anything; returns the parsed entries.
export function inspectTbpack(
  buffer: Buffer,
  options: { expectedSha?: string; limits?: ZipLimits } = {}
): { pack: PackJson; packSha: string; entries: Map<string, Buffer> } {
  const fail = (message: string): never => {
    throw new PackInstallError(`.tbpack bị từ chối / rejected: ${message}`);
  };
  if (options.expectedSha && sha256(buffer) !== options.expectedSha) fail('sha256 của file khác registry/lock / file sha256 differs from the registry or lock');

  let raw;
  try {
    raw = readZip(buffer, options.limits || DEFAULT_ZIP_LIMITS);
  } catch (error: any) {
    fail(error.message);
  }
  const entries = new Map<string, Buffer>();
  for (const entry of raw!) {
    const name = entry.name;
    if (name.includes('\\') || name.startsWith('/') || /^[A-Za-z]:/.test(name) || name.split('/').includes('..')) {
      fail(`đường dẫn không an toàn / unsafe path "${name}"`);
    }
    if (!TBPACK_ENTRY.test(name)) fail(`tên file không được phép / file name not allowed "${name}"`);
    if (entries.has(name)) fail(`trùng tên file / duplicate entry "${name}"`);
    entries.set(name, entry.data);
  }

  const packData = entries.get('pack.json');
  if (!packData) fail('thiếu pack.json / missing pack.json');
  let pack: PackJson;
  try {
    pack = JSON.parse(packData!.toString('utf-8'));
  } catch {
    fail('pack.json không phải JSON / pack.json is not JSON');
  }
  const schemaError = schemaCheck(pack!);
  if (schemaError) fail(`pack.json sai schema / pack.json fails the schema: ${schemaError}`);
  if (pack!.formatVersion > PACK_FORMAT_VERSION) fail(`formatVersion ${pack!.formatVersion} mới hơn bản đang chạy / is newer than this OmniLex`);

  const declared = new Map<string, { bytes: number; sha256: string }>();
  for (const tier of PACK_TIERS) {
    for (const [locale, info] of Object.entries(pack!.tiers?.[tier]?.files || {})) {
      declared.set(`${locale}/${PACK_TIER_FILES[tier]}`, info);
    }
  }
  if (pack!.attributions) declared.set('attributions.json', pack!.attributions);
  for (const name of entries.keys()) {
    if (name !== 'pack.json' && !declared.has(name)) fail(`file không được khai báo trong pack.json / file not declared in pack.json "${name}"`);
  }
  for (const [name, info] of declared) {
    const data = entries.get(name);
    if (!data) fail(`thiếu file đã khai báo / missing declared file "${name}"`);
    if (data!.length !== info.bytes || sha256(data!) !== info.sha256) fail(`sai sha256 / sha256 mismatch "${name}"`);
    const text = data!.toString('utf-8');
    try {
      if (name.endsWith('.jsonl')) {
        for (const line of text.split('\n')) {
          if (line.trim()) JSON.parse(line);
        }
      } else {
        JSON.parse(text);
      }
    } catch {
      fail(`JSON hỏng / malformed JSON "${name}"`);
    }
  }
  return { pack: pack!, packSha: sha256(packData!), entries };
}

// Unpacks a checked .tbpack into the store (temp dir first, then rename).
export function importTbpack(
  buffer: Buffer,
  options: { home: string; expectedSha?: string; limits?: ZipLimits; diskMB?: number }
): InstalledPack {
  const { pack, packSha, entries } = inspectTbpack(buffer, options);
  const storeDir = path.join(options.home, 'store');
  const name = storeDirName(pack.id, pack.version, packSha);
  const target = path.join(storeDir, name);
  const tiers: LockEntry['tiers'] = {};
  for (const tier of PACK_TIERS) {
    const files = pack.tiers?.[tier]?.files;
    if (files) tiers[tier] = Object.fromEntries(Object.entries(files).map(([locale, info]) => [locale, info.sha256]));
  }
  const entry: LockEntry = { version: pack.version, sha256: packSha, store: name, tiers };
  if (fs.existsSync(path.join(target, 'pack.json'))) return { id: pack.id, version: pack.version, store: name, entry, reused: true };

  const incoming = [...entries.values()].reduce((sum, data) => sum + data.length, 0);
  if (options.diskMB !== undefined) {
    const used = fs.existsSync(storeDir) ? dirBytes(storeDir) : 0;
    if ((used + incoming) / (1024 * 1024) > options.diskMB) {
      throw new PackInstallError(`Vượt limits.diskMB=${options.diskMB} khi cài ${pack.id} / installing ${pack.id} exceeds limits.diskMB=${options.diskMB}`);
    }
  }
  const temp = path.join(storeDir, `.tmp-${name}-${process.pid}`);
  fs.rmSync(temp, { recursive: true, force: true });
  try {
    for (const [file, data] of entries) {
      const out = path.join(temp, ...file.split('/'));
      // Defence in depth: the resolved path must stay inside the temp dir.
      if (!path.resolve(out).startsWith(path.resolve(temp) + path.sep)) throw new PackInstallError(`đường dẫn không an toàn / unsafe path "${file}"`);
      fs.mkdirSync(path.dirname(out), { recursive: true });
      fs.writeFileSync(out, data);
    }
    fs.renameSync(temp, target);
  } catch (error) {
    fs.rmSync(temp, { recursive: true, force: true });
    throw error;
  }
  return { id: pack.id, version: pack.version, store: name, entry, reused: false };
}

function dirBytes(dir: string): number {
  let total = 0;
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    total += item.isDirectory() ? dirBytes(full) : fs.statSync(full).size;
  }
  return total;
}
