// Export and import for people outside the repository (Plan 3.6): CSV for
// spreadsheets, TBX-Basic (ISO 30042) for CAT tools, JSONL for ML/RAG pipelines.
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import type { PackCard, PackExplanation } from './pack-format.js';

export interface ExchangeRow {
  id: string;
  locale: string;
  label: string;
  qualifier?: string;
  aliases: string[];
  loanwords: string[];
  plain_descriptions: string[];
  summary: string;
  domains: string[];
  level: number;
  body: string;
  // remaining locale frontmatter (label_evidence, translation, autolink, …)
  locale_extra: Record<string, any>;
  // remaining concept metadata (relations, sources, replaced_by)
  concept_extra: Record<string, any>;
}

const LOCALE_MAIN = ['label', 'qualifier', 'aliases', 'loanwords', 'plain_descriptions', 'summary'];
const CONCEPT_MAIN = ['id', 'domains', 'level', 'status', 'provenance'];
export const CSV_COLUMNS = [
  'id', 'locale', 'label', 'qualifier', 'aliases', 'loanwords', 'plain_descriptions',
  'summary', 'domains', 'level', 'body', 'locale_extra', 'concept_extra',
] as const;
const LIST_SEPARATOR = ' | ';

function omit(value: Record<string, any> | undefined, keys: string[]): Record<string, any> {
  const result: Record<string, any> = {};
  for (const [key, item] of Object.entries(value || {})) if (!keys.includes(key) && item !== undefined) result[key] = item;
  return result;
}

function sortedJson(value: unknown): string {
  return JSON.stringify(value, (_key, item) => (item && typeof item === 'object' && !Array.isArray(item)
    ? Object.fromEntries(Object.keys(item).sort().map((key) => [key, item[key]]))
    : item));
}

// One row per concept and locale that has its own content (no pivot fallbacks).
export function rowFromExplanation(card: PackCard, record: PackExplanation, locale: string): ExchangeRow | null {
  if (record.content_locale && record.content_locale !== locale) return null;
  const fm = record.entry?.frontmatter || {};
  return {
    id: card.id,
    locale,
    label: fm.label ?? card.label,
    qualifier: fm.qualifier ?? card.qualifier,
    aliases: fm.aliases ?? card.aliases,
    loanwords: fm.loanwords ?? card.loanwords,
    plain_descriptions: fm.plain_descriptions ?? card.plain_descriptions,
    summary: fm.summary ?? card.summary,
    domains: record.metadata?.domains ?? card.domains,
    level: record.metadata?.level ?? card.level,
    body: record.entry?.content ?? '',
    locale_extra: omit(fm, LOCALE_MAIN),
    concept_extra: omit(record.metadata, CONCEPT_MAIN),
  };
}

// --- CSV (RFC 4180) ---

function csvField(value: string): string {
  return /[",\r\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

export function toCsv(rows: ExchangeRow[]): string {
  const lines = [CSV_COLUMNS.join(',')];
  for (const row of rows) {
    lines.push([
      row.id, row.locale, row.label, row.qualifier || '',
      row.aliases.join(LIST_SEPARATOR), row.loanwords.join(LIST_SEPARATOR), row.plain_descriptions.join(LIST_SEPARATOR),
      row.summary, row.domains.join(LIST_SEPARATOR), String(row.level), row.body,
      Object.keys(row.locale_extra).length ? sortedJson(row.locale_extra) : '',
      Object.keys(row.concept_extra).length ? sortedJson(row.concept_extra) : '',
    ].map(csvField).join(','));
  }
  return `${lines.join('\r\n')}\r\n`;
}

function parseCsvRecords(text: string): string[][] {
  const records: string[][] = [];
  let field = '';
  let record: string[] = [];
  let quoted = false;
  const input = text.replace(/^\uFEFF/, '');
  for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    if (quoted) {
      if (ch === '"' && input[i + 1] === '"') { field += '"'; i++; }
      else if (ch === '"') quoted = false;
      else field += ch;
    } else if (ch === '"' && field === '') quoted = true;
    else if (ch === ',') { record.push(field); field = ''; }
    else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && input[i + 1] === '\n') i++;
      record.push(field);
      if (record.some((item) => item !== '')) records.push(record);
      record = [];
      field = '';
    } else field += ch;
  }
  if (field !== '' || record.length) {
    record.push(field);
    if (record.some((item) => item !== '')) records.push(record);
  }
  return records;
}

export function fromCsv(text: string): ExchangeRow[] {
  const [header, ...records] = parseCsvRecords(text);
  if (!header) return [];
  const index = Object.fromEntries(header.map((name, i) => [name.trim(), i]));
  for (const column of ['id', 'locale', 'label', 'summary', 'domains']) {
    if (index[column] === undefined) throw new Error(`CSV thiếu cột "${column}" / CSV is missing the "${column}" column`);
  }
  const cell = (record: string[], name: string) => (index[name] === undefined ? '' : record[index[name]] ?? '');
  const list = (value: string) => value.split('|').map((item) => item.trim()).filter(Boolean);
  const json = (value: string, where: string) => {
    if (!value.trim()) return {};
    try {
      return JSON.parse(value);
    } catch {
      throw new Error(`${where}: JSON không hợp lệ / invalid JSON`);
    }
  };
  return records.map((record, i) => {
    const where = `CSV dòng ${i + 2} / row ${i + 2}`;
    const level = Number(cell(record, 'level') || 1);
    return {
      id: cell(record, 'id').trim(),
      locale: cell(record, 'locale').trim(),
      label: cell(record, 'label'),
      qualifier: cell(record, 'qualifier') || undefined,
      aliases: list(cell(record, 'aliases')),
      loanwords: list(cell(record, 'loanwords')),
      plain_descriptions: list(cell(record, 'plain_descriptions')),
      summary: cell(record, 'summary'),
      domains: list(cell(record, 'domains')),
      level: Number.isFinite(level) ? level : 1,
      body: cell(record, 'body'),
      locale_extra: json(cell(record, 'locale_extra'), `${where} locale_extra`),
      concept_extra: json(cell(record, 'concept_extra'), `${where} concept_extra`),
    };
  });
}

// --- JSONL ---

export function toJsonl(rows: ExchangeRow[]): string {
  return rows.map((row) => `${sortedJson(row)}\n`).join('');
}

// --- TBX-Basic ---

function xmlEscape(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function toTbx(rows: ExchangeRow[], sourceLanguage = 'en'): string {
  const byId = new Map<string, ExchangeRow[]>();
  for (const row of rows) byId.set(row.id, [...(byId.get(row.id) || []), row]);
  const out: string[] = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<?xml-model href="https://raw.githubusercontent.com/LTAC-Global/TBX-Basic_dialect/master/DCA/TBXcoreStructV03_TBX-Basic_integrated.rng" type="application/xml" schematypens="http://relaxng.org/ns/structure/1.0"?>',
    `<tbx style="dca" type="TBX-Basic" xml:lang="${xmlEscape(sourceLanguage)}" xmlns="urn:iso:std:iso:30042:ed-2">`,
    '  <tbxHeader>',
    '    <fileDesc>',
    '      <sourceDesc><p>OmniLex export</p></sourceDesc>',
    '    </fileDesc>',
    '  </tbxHeader>',
    '  <text>',
    '    <body>',
  ];
  for (const [id, entries] of [...byId].sort(([a], [b]) => (a < b ? -1 : 1))) {
    out.push(`      <conceptEntry id="${xmlEscape(id)}">`);
    for (const domain of entries[0].domains) out.push(`        <descrip type="subjectField">${xmlEscape(domain)}</descrip>`);
    for (const row of [...entries].sort((a, b) => (a.locale < b.locale ? -1 : 1))) {
      out.push(`        <langSec xml:lang="${xmlEscape(row.locale)}">`);
      if (row.summary) out.push(`          <descrip type="definition">${xmlEscape(row.summary)}</descrip>`);
      const term = (value: string, status: string, note?: string) => {
        out.push('          <termSec>');
        out.push(`            <term>${xmlEscape(value)}</term>`);
        out.push(`            <termNote type="administrativeStatus">${status}</termNote>`);
        if (note) out.push(`            <note>${note}</note>`);
        out.push('          </termSec>');
      };
      term(row.label, 'preferredTerm-admn-sts');
      for (const alias of row.aliases) term(alias, 'admittedTerm-admn-sts');
      for (const loanword of row.loanwords) term(loanword, 'admittedTerm-admn-sts', 'loanword');
      out.push('        </langSec>');
    }
    out.push('      </conceptEntry>');
  }
  out.push('    </body>', '  </text>', '</tbx>', '');
  return out.join('\n');
}

interface XmlNode {
  name: string;
  attrs: Record<string, string>;
  children: XmlNode[];
  text: string;
}

function decodeEntities(value: string): string {
  return value.replace(/&(#x[0-9a-fA-F]+|#\d+|amp|lt|gt|quot|apos);/g, (_match, code: string) => {
    if (code[0] === '#') return String.fromCodePoint(code[1] === 'x' ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10));
    return ({ amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" } as Record<string, string>)[code];
  });
}

// A small non-validating XML reader: elements, attributes, text, CDATA and
// entities. Enough for TBX; DTDs and external entities are ignored, never fetched.
export function parseXml(text: string): XmlNode {
  const root: XmlNode = { name: '#root', attrs: {}, children: [], text: '' };
  const stack = [root];
  const pattern = /<!--[\s\S]*?-->|<!\[CDATA\[([\s\S]*?)\]\]>|<\?[\s\S]*?\?>|<!DOCTYPE[\s\S]*?>|<\/([^\s>]+)\s*>|<([^\s/>]+)((?:\s+[^\s=>/]+\s*=\s*(?:"[^"]*"|'[^']*'))*)\s*(\/?)>|([^<]+)/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text))) {
    const top = stack[stack.length - 1];
    if (match[1] !== undefined) top.text += match[1];
    else if (match[2]) {
      if (top.name !== match[2]) throw new Error(`XML: thẻ đóng </${match[2]}> không khớp <${top.name}> / mismatched closing tag`);
      stack.pop();
    } else if (match[3]) {
      const attrs: Record<string, string> = {};
      for (const attr of match[4].matchAll(/([^\s=]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)) attrs[attr[1]] = decodeEntities(attr[2] ?? attr[3]);
      const node: XmlNode = { name: match[3], attrs, children: [], text: '' };
      top.children.push(node);
      if (!match[5]) stack.push(node);
    } else if (match[6] !== undefined) top.text += decodeEntities(match[6]);
  }
  if (stack.length !== 1) throw new Error(`XML: thiếu thẻ đóng </${stack[stack.length - 1].name}> / unclosed element`);
  return root;
}

function find(node: XmlNode, name: string): XmlNode[] {
  const local = (value: string) => value.split(':').pop();
  return node.children.flatMap((child) => (local(child.name) === name ? [child] : find(child, name)));
}

export function fromTbx(text: string): ExchangeRow[] {
  const root = parseXml(text);
  const rows: ExchangeRow[] = [];
  for (const entry of find(root, 'conceptEntry')) {
    const id = entry.attrs.id || '';
    const domains = entry.children.filter((child) => child.name === 'descrip' && child.attrs.type === 'subjectField').map((child) => child.text.trim());
    for (const lang of entry.children.filter((child) => child.name === 'langSec')) {
      const locale = lang.attrs['xml:lang'] || '';
      const definition = lang.children.find((child) => child.name === 'descrip' && child.attrs.type === 'definition')?.text.trim() || '';
      const row: ExchangeRow = {
        id, locale, label: '', aliases: [], loanwords: [], plain_descriptions: [], summary: definition,
        domains, level: 1, body: '', locale_extra: {}, concept_extra: {},
      };
      for (const termSec of lang.children.filter((child) => child.name === 'termSec')) {
        const term = termSec.children.find((child) => child.name === 'term')?.text.trim() || '';
        const status = termSec.children.find((child) => child.name === 'termNote' && child.attrs.type === 'administrativeStatus')?.text.trim();
        const loanword = termSec.children.some((child) => child.name === 'note' && child.text.trim() === 'loanword');
        if (!term) continue;
        if (!row.label && (status === 'preferredTerm-admn-sts' || status === undefined)) row.label = term;
        else if (loanword) row.loanwords.push(term);
        else row.aliases.push(term);
      }
      if (id && locale && row.label) rows.push(row);
    }
  }
  return rows;
}

// --- Writing concepts ---

export interface ImportResult {
  written: string[];
  skipped: string[];
  errors: string[];
}

// Writes rows as concept directories. Into concepts/ every concept becomes a
// draft drafted_by: import (AGENTS.md); review data never travels with it.
export function writeConcepts(rows: ExchangeRow[], targetDir: string, options: { mode: 'repository' | 'glossary'; overwrite?: boolean }): ImportResult {
  const result: ImportResult = { written: [], skipped: [], errors: [] };
  const byId = new Map<string, ExchangeRow[]>();
  for (const row of rows) byId.set(row.id, [...(byId.get(row.id) || []), row]);
  for (const [id, entries] of [...byId].sort(([a], [b]) => (a < b ? -1 : 1))) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id) || id.length > 48) {
      result.errors.push(`${id || '(trống)'}: id phải là kebab-case ≤ 48 ký tự / id must be kebab-case, at most 48 characters`);
      continue;
    }
    const first = entries[0];
    const sources = first.concept_extra.sources || [];
    if (options.mode === 'repository' && (!Array.isArray(sources) || sources.length === 0)) {
      result.errors.push(`${id}: thiếu nguồn (concept_extra.sources), rule 17 cần ≥ 1 / no sources; rule 17 needs at least one`);
      continue;
    }
    const missing = entries.filter((row) => !row.label || !row.summary || row.plain_descriptions.length === 0);
    if (options.mode === 'repository' && missing.length) {
      result.errors.push(`${id}: ${missing.map((row) => row.locale).join(', ')} thiếu label, summary hoặc plain_descriptions / missing label, summary or plain_descriptions`);
      continue;
    }
    const dir = path.join(targetDir, id);
    if (fs.existsSync(dir) && !options.overwrite) {
      result.skipped.push(`${id}: đã có, bỏ qua / already exists, skipped`);
      continue;
    }
    const { relations, sources: _sources, replaced_by, ...restConcept } = first.concept_extra;
    const concept: Record<string, any> = {
      id,
      domains: first.domains,
      level: first.level,
      ...(relations ? { relations } : {}),
      status: 'draft',
      provenance: { drafted_by: 'import' },
      ...(Array.isArray(sources) && sources.length ? { sources } : {}),
      ...(replaced_by ? { replaced_by } : {}),
      ...restConcept,
    };
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'concept.yaml'), yaml.dump(concept, { lineWidth: 120 }), 'utf-8');
    for (const row of entries) {
      const frontmatter: Record<string, any> = {
        label: row.label,
        ...(row.qualifier ? { qualifier: row.qualifier } : {}),
        ...(row.aliases.length ? { aliases: row.aliases } : {}),
        ...(row.loanwords.length ? { loanwords: row.loanwords } : {}),
        plain_descriptions: row.plain_descriptions,
        summary: row.summary,
        ...row.locale_extra,
      };
      const body = row.body.startsWith('\n') ? row.body : `\n${row.body}`;
      fs.writeFileSync(path.join(dir, `${row.locale}.md`), `---\n${yaml.dump(frontmatter, { lineWidth: 120 })}---\n${body}`, 'utf-8');
    }
    result.written.push(id);
  }
  return result;
}
