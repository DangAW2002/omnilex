#!/usr/bin/env node
import readline from 'node:readline';
import path from 'node:path';
import fs from 'node:fs';
import { loadAll, findConcepts, showConcept, lookupConcepts } from '@termbridge/core';

function resolveRootDir(): string {
  let curr = process.cwd();
  while (curr !== path.dirname(curr)) {
    if (fs.existsSync(path.join(curr, 'concepts')) && fs.existsSync(path.join(curr, 'taxonomy'))) {
      return curr;
    }
    curr = path.dirname(curr);
  }
  return process.cwd();
}

const rootDir = resolveRootDir();
const repoData = loadAll(rootDir);

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

export function handleToolCall(name: string, args: any) {
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
      c.metadata.domains.some((d) => d.startsWith(pathPrefix))
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
}

if (!process.env.VITEST) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });

  rl.on('line', (line) => {
  if (!line.trim()) return;
  try {
    const msg = JSON.parse(line);
    if (msg.method === 'tools/list') {
      const resp = { jsonrpc: '2.0', id: msg.id, result: { tools: TOOLS } };
      console.log(JSON.stringify(resp));
    } else if (msg.method === 'tools/call') {
      try {
        const toolResult = handleToolCall(msg.params.name, msg.params.arguments || {});
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
