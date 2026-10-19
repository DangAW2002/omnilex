#!/usr/bin/env node
import readline from 'node:readline';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import {
  loadAll,
  findConcepts,
  showConcept,
  lookupConcepts,
  PackStore,
  domainMatches,
  openProject,
  nodeProjectFS,
  nodePackIO,
  fileIndexCache,
  termbridgeHome,
  ensureLocalPacks,
  searchConfigHash,
  type PackIO,
  type RepositoryData,
} from '@omnilex/core';

function findRepoRoot(startDir: string): string | null {
  let curr = path.resolve(startDir);
  while (curr !== path.dirname(curr)) {
    if (fs.existsSync(path.join(curr, 'concepts')) && fs.existsSync(path.join(curr, 'taxonomy'))) {
      return curr;
    }
    curr = path.dirname(curr);
  }
  return null;
}

function resolveRootDir(): string {
  if (process.env.TERMBRIDGE_ROOT && fs.existsSync(process.env.TERMBRIDGE_ROOT)) {
    return process.env.TERMBRIDGE_ROOT;
  }
  const fromCwd = findRepoRoot(process.cwd());
  if (fromCwd) return fromCwd;

  const scriptDir = path.dirname(fileURLToPath(import.meta.url));
  const fromScript = findRepoRoot(scriptDir);
  if (fromScript) return fromScript;

  return process.cwd();
}


const TOOLS = [
  {
    name: 'find_term',
    description: 'Reverse terminology lookup: find matching concepts from colloquial/everyday descriptions',
    inputSchema: {
      type: 'object',
      properties: {
        description: { type: 'string', description: 'Colloquial description or concept idea in plain words' },
        locale: { type: 'string', description: 'Target locale code (e.g., vi, en)', default: 'vi' },
        domain: { type: 'string', description: 'Optional domain filter (e.g., finance, it, media)' }
      },
      required: ['description']
    }
  },
  {
    name: 'explain_term',
    description: 'Forward lookup: retrieve layered definitions, analogies, and confusable distinctions for a concept',
    inputSchema: {
      type: 'object',
      properties: {
        term: { type: 'string', description: 'Concept ID or exact label' },
        locale: { type: 'string', description: 'Target locale code (e.g., vi, en)', default: 'vi' }
      },
      required: ['term']
    }
  },
  {
    name: 'browse_domain',
    description: 'Browse taxonomy subtree and list concepts indexed under a specific domain path',
    inputSchema: {
      type: 'object',
      properties: {
        domain_path: { type: 'string', description: 'Domain hierarchy path (e.g., finance/personal-finance)' },
        locale: { type: 'string', description: 'Target locale code (e.g., vi, en)', default: 'vi' }
      },
      required: ['domain_path']
    }
  }
];

export interface ToolHandlerOptions {
  // project directory (Plan 3.8): TERMBRIDGE_PROJECT, else the process cwd
  cwd?: string;
  home?: string;
  io?: PackIO;
  // mtime of dist/manifest.json, or null when packs should not be used
  manifestStamp?: () => number | null;
}

// Packs are read through one PackStore per manifest version, so every
// (locale, pack) index is loaded once until `tb build` rewrites the manifest.
export function createToolHandler(rootDir: string, options: ToolHandlerOptions = {}) {
  const distDir = path.join(rootDir, 'dist');
  const io: PackIO = options.io || {
    readText(relPath) {
      try {
        return fs.readFileSync(path.join(distDir, ...relPath.split('/')), 'utf8');
      } catch {
        return null;
      }
    },
  };
  const manifestStamp = options.manifestStamp || (() => {
    try {
      const manifest = fs.statSync(path.join(distDir, 'manifest.json')).mtimeMs;
      const concepts = fs.existsSync(path.join(rootDir, 'concepts')) ? fs.statSync(path.join(rootDir, 'concepts')).mtimeMs : 0;
      return concepts > manifest ? null : manifest;
    } catch {
      return null;
    }
  });

  let store: PackStore | null = null;
  let storeStamp: number | null = null;
  let repoData: RepositoryData | null = null;
  const packs = (): PackStore | null => {
    const stamp = manifestStamp();
    if (stamp === null) return null;
    if (!store || stamp !== storeStamp) {
      storeStamp = stamp;
      store = new PackStore(io, (message) => console.error(message));
    }
    return store.available ? store : null;
  };
  const repo = () => (repoData ||= loadAll(rootDir));

  // The project's own selection (config layers, store, lockfile) comes first;
  // it is opened again when any file it was read from changes.
  let project: { store: PackStore | null; stale: boolean; watch: string[]; signature: string } | null = null;
  const signature = (files: string[]) => files.map((file) => {
    try {
      return fs.statSync(file).mtimeMs;
    } catch {
      return -1;
    }
  }).join(',');
  const projectStore = async (): Promise<{ store: PackStore | null; stale: boolean }> => {
    if (project && signature(project.watch) === project.signature) return project;
    const open = () => openProject(nodeProjectFS, {
      cwd: options.cwd || process.env.TERMBRIDGE_PROJECT || process.cwd(),
      home: options.home || termbridgeHome(),
      surface: 'mcp',
      configHash: searchConfigHash(),
    });
    let ctx = await open();
    if (ctx.effective.packOps.some((op) => op.op === 'local') && ensureLocalPacks(ctx).changed) ctx = await open();
    for (const notice of ctx.notices) console.error(notice);
    const usable = ctx.plan.packs.length > 0 && !ctx.stale;
    const store = usable
      ? new PackStore(nodePackIO, (message) => console.error(message), {
          manifest: ctx.manifest,
          disabled: ctx.disabled,
          overlay: ctx.overlay,
          cache: fileIndexCache(ctx.projectDir ? path.join(ctx.projectDir, '.termbridge', '.cache') : path.join(ctx.home, 'cache')),
        })
      : null;
    project = { store: store?.available ? store : null, stale: ctx.stale, watch: ctx.watch, signature: signature(ctx.watch) };
    return project;
  };

  return async function handleToolCall(name: string, args: any): Promise<any> {
    const locale = args.locale || 'vi';
    const fromProject = await projectStore();
    const packStore = fromProject.store || (fromProject.stale ? null : packs());

    if (packStore) {
      if (name === 'find_term') {
        return { candidates: packStore.find(args.description, { locale, domain: args.domain }).map(candidate) };
      }
      if (name === 'explain_term') {
        const matches = packStore.lookup(args.term, { locale });
        if (matches.length > 1) return { ambiguous: true, candidates: matches.map(candidate) };
        const record = matches[0] ? packStore.explanation(matches[0].id, locale) : null;
        if (!record) return { error: `Concept not found: "${args.term}"` };
        const fm = record.entry.frontmatter || {};
        return {
          id: record.id,
          label: fm.label,
          qualifier: fm.qualifier,
          summary: fm.summary,
          domains: record.metadata.domains,
          level: record.metadata.level,
          status: record.metadata.status,
          prerequisites: record.metadata.relations?.prerequisites || [],
          confusable_notes: fm.confusable_notes || {},
          follow_up_questions: fm.follow_up_questions || [],
          explanation_body: record.entry.content,
        };
      }
      if (name === 'browse_domain') {
        const concepts = packStore.browse(args.domain_path, { locale }).map(candidate);
        return { domain: args.domain_path, total: concepts.length, concepts };
      }
      throw new Error(`Unknown tool: ${name}`);
    }

    const repoData = repo();

    if (name === 'find_term') {
      const results = findConcepts(repoData, args.description, {
        locale: args.locale || 'vi',
        domain: args.domain
      });
      return {
        candidates: results.slice(0, 5).map((r) => ({
          id: r.id,
          label: r.label,
          qualifier: r.qualifier,
          summary: r.summary,
          domains: r.domains
        }))
      };
    }

    if (name === 'explain_term') {
      const matches = lookupConcepts(repoData, args.term, { locale: args.locale || 'vi' });
      if (matches.length > 1) {
        return {
          ambiguous: true,
          candidates: matches.map(({ record, localeEntry }) => ({
            id: record.id,
            label: localeEntry?.frontmatter.label,
            qualifier: localeEntry?.frontmatter.qualifier,
            summary: localeEntry?.frontmatter.summary,
            domains: record.metadata.domains
          }))
        };
      }
      const res = showConcept(repoData, args.term, { locale: args.locale || 'vi' });
      if (!res) {
        return { error: `Concept not found: "${args.term}"` };
      }
      const { record, localeEntry } = res;
      return {
        id: record.id,
        label: localeEntry?.frontmatter.label,
        qualifier: localeEntry?.frontmatter.qualifier,
        summary: localeEntry?.frontmatter.summary,
        domains: record.metadata.domains,
        level: record.metadata.level,
        status: record.metadata.status,
        prerequisites: record.metadata.relations?.prerequisites || [],
        confusable_notes: localeEntry?.frontmatter.confusable_notes || {},
        follow_up_questions: localeEntry?.frontmatter.follow_up_questions || [],
        explanation_body: localeEntry?.content
      };
    }

    if (name === 'browse_domain') {
      const locale = args.locale || 'vi';
      const pathPrefix = args.domain_path;
      const matched = Array.from(repoData.concepts.values()).filter((c) =>
        c.metadata.domains.some((d) => domainMatches(d, pathPrefix))
      );

      return {
        domain: pathPrefix,
        total: matched.length,
        concepts: matched.map((m) => {
          const e = m.locales[locale] || m.locales[repoData.localesConfig.pivot];
          return {
            id: m.id,
            label: e?.frontmatter.label || m.id,
            qualifier: e?.frontmatter.qualifier,
            summary: e?.frontmatter.summary,
            domains: m.metadata.domains
          };
        })
      };
    }

    throw new Error(`Unknown tool: ${name}`);
  };
}

function candidate(item: { id: string; label: string; qualifier?: string; summary: string; domains: string[] }) {
  return { id: item.id, label: item.label, qualifier: item.qualifier, summary: item.summary, domains: item.domains };
}

let defaultHandler: ((name: string, args: any) => Promise<any>) | null = null;

export function handleToolCall(name: string, args: any): Promise<any> {
  defaultHandler ||= createToolHandler(resolveRootDir());
  return defaultHandler(name, args);
}

if (!process.env.VITEST) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });

  rl.on('line', async (line) => {
  if (!line.trim()) return;
  try {
    const msg = JSON.parse(line);
    if (msg.method === 'tools/list') {
      const resp = { jsonrpc: '2.0', id: msg.id, result: { tools: TOOLS } };
      console.log(JSON.stringify(resp));
    } else if (msg.method === 'tools/call') {
      try {
        const toolResult = await handleToolCall(msg.params.name, msg.params.arguments || {});
        const resp = {
          jsonrpc: '2.0',
          id: msg.id,
          result: { content: [{ type: 'text', text: JSON.stringify(toolResult, null, 2) }] }
        };
        console.log(JSON.stringify(resp));
      } catch (err: any) {
        const resp = {
          jsonrpc: '2.0',
          id: msg.id,
          error: { code: -32603, message: err.message }
        };
        console.log(JSON.stringify(resp));
      }
    } else if (msg.method === 'initialize') {
      const resp = {
        jsonrpc: '2.0',
        id: msg.id,
        result: {
          protocolVersion: '2024-11-05',
          serverInfo: { name: 'termbridge-mcp', version: '0.1.0' },
          capabilities: { tools: {} }
        }
      };
      console.log(JSON.stringify(resp));
    }
  } catch (err) {
    // Ignore malformed input
  }
});
}
