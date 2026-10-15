// Project glossaries (Plan 3.7): .termbridge/glossary/<id>/concept.yaml and
// <locale>.md, the same format as concepts/, built into a pack `local.<name>`
// under .termbridge/.cache/local/<name>/ whenever the sources change.
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { loadConceptsFrom } from './loader.js';
import { conceptPackData, renderPacks, writePackFiles, type PackConceptData } from './packs.js';
import { localPackCacheDir, localPackId, toPosix, type ProjectContext } from './project.js';

function fingerprint(dir: string): string {
  const parts: string[] = [];
  const walk = (current: string) => {
    for (const entry of fs.readdirSync(current, { withFileTypes: true }).sort((a, b) => (a.name < b.name ? -1 : 1))) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.isFile()) {
        const stat = fs.statSync(full);
        parts.push(`${toPosix(path.relative(dir, full))}:${stat.size}:${Math.round(stat.mtimeMs)}`);
      }
    }
  };
  walk(dir);
  return crypto.createHash('sha256').update(parts.join('\n')).digest('hex');
}

export interface LocalBuild {
  id: string;
  dir: string;
  rebuilt: boolean;
  concepts: number;
  notices: string[];
}

export function buildLocalPack(glossaryDir: string, cacheDir: string, options: { knownIds?: Set<string>; force?: boolean } = {}): LocalBuild {
  const id = localPackId(glossaryDir);
  const notices: string[] = [];
  if (!fs.existsSync(glossaryDir)) {
    return { id, dir: cacheDir, rebuilt: false, concepts: 0, notices: [`Termbridge: không có glossary ${toPosix(glossaryDir)} / glossary not found`] };
  }
  const print = fingerprint(glossaryDir);
  const stampFile = path.join(cacheDir, 'source.json');
  const previous = fs.existsSync(stampFile) ? JSON.parse(fs.readFileSync(stampFile, 'utf-8')) : null;
  if (!options.force && previous?.fingerprint === print && fs.existsSync(path.join(cacheDir, 'manifest.json'))) {
    return { id, dir: cacheDir, rebuilt: false, concepts: previous.concepts ?? 0, notices };
  }

  const records = loadConceptsFrom(glossaryDir);
  const locales = [...new Set([...records.values()].flatMap((record) => Object.keys(record.locales)))].sort();
  const pivot = locales.includes('en') ? 'en' : locales[0] || 'en';
  const perLocale: Record<string, PackConceptData[]> = {};
  for (const locale of locales) {
    perLocale[locale] = [...records.values()]
      .filter((record) => Object.keys(record.locales).length > 0 && Array.isArray(record.metadata.domains))
      .map((record) => conceptPackData(record, locale, pivot, { domains: [] }));
  }
  for (const record of records.values()) {
    if (options.knownIds?.has(record.id)) {
      notices.push(`Termbridge: khái niệm ${record.id} trong ${id} trùng id với một gói đã cài / ${record.id} in ${id} has the same id as an installed pack`);
    }
  }
  const name = path.basename(glossaryDir);
  const rendered = renderPacks({
    version: '0.0.0',
    locales,
    content: [{ id, title: { vi: name, en: name }, domains: [], locales: perLocale }],
    meta: [],
  });
  fs.rmSync(cacheDir, { recursive: true, force: true });
  writePackFiles(cacheDir, rendered.files);
  const concepts = perLocale[locales[0]]?.length || 0;
  fs.writeFileSync(stampFile, `${JSON.stringify({ fingerprint: print, concepts }, null, 2)}\n`, 'utf-8');
  return { id, dir: cacheDir, rebuilt: true, concepts, notices };
}

// Builds every local: glossary of a resolved project; true when one changed,
// so the caller opens the project again.
export function ensureLocalPacks(ctx: ProjectContext): { changed: boolean; notices: string[] } {
  const notices: string[] = [];
  let changed = false;
  const knownIds = new Set<string>();
  for (const pack of ctx.resolved.packs) {
    if (!pack.id.startsWith('local.')) knownIds.add(pack.id);
  }
  for (const op of ctx.effective.packOps) {
    if (op.op !== 'local') continue;
    const glossary = path.resolve(op.dir || ctx.cwd, op.path);
    const result = buildLocalPack(glossary, localPackCacheDir(ctx.projectDir || ctx.cwd, toPosix(glossary)), { knownIds });
    notices.push(...result.notices);
    changed ||= result.rebuilt;
  }
  return { changed, notices };
}
