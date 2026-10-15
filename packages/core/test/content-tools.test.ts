import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadAll } from '../src/loader.js';
import { validateRepository } from '../src/validator.js';
import { assistantTexts, countCandidates, knownTerms, transcriptTexts } from '../src/candidates.js';
import { INGEST_ADAPTERS, ingestEntries, mayAdapt, writeIngestCandidates } from '../src/ingest.js';
import { scaffoldConcept, parseYaml } from '../src/scaffold.js';
import { collisionsReport, coverageReport, overlapReport } from '../src/reports.js';
import type { SourceCatalogEntry } from '../src/types.js';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../');
let temp: string;

beforeAll(() => {
  temp = fs.mkdtempSync(path.join(os.tmpdir(), 'tb-content-'));
});

afterAll(() => {
  fs.rmSync(temp, { recursive: true, force: true });
});

function repoCopy(name: string, withConcepts = false): string {
  const dir = path.join(temp, name);
  for (const sub of ['config', 'schema', 'taxonomy', ...(withConcepts ? ['concepts'] : [])]) {
    fs.cpSync(path.join(repoRoot, sub), path.join(dir, sub), { recursive: true });
  }
  fs.mkdirSync(path.join(dir, 'concepts'), { recursive: true });
  return dir;
}

describe('candidate mining (D4)', () => {
  const lines = [
    JSON.stringify({ type: 'user', message: { role: 'user', content: 'My secret project codename is Bluebird. Explain RAG please.' } }),
    JSON.stringify({ type: 'assistant', message: { role: 'assistant', content: [
      { type: 'text', text: 'Retrieval augmented generation (RAG) grounds the model. The context window limits the prompt. RAG needs a vector database.' },
      { type: 'tool_use', name: 'Bash', input: { command: 'cat /home/me/secret.txt' } },
    ] } }),
    JSON.stringify({ type: 'assistant', message: { role: 'assistant', content: [
      { type: 'text', text: 'A bigger context window helps. Use RAG with a vector database.\n```js\nconst contextWindow = 8\n```' },
    ] } }),
    JSON.stringify({ type: 'assistant', message: { role: 'assistant', content: [{ type: 'text', text: 'The vector database stores embeddings; the context window and RAG again.' }] } }),
    'not json at all',
  ];

  it('reads only assistant text blocks', () => {
    expect(assistantTexts(lines[0])).toEqual([]);
    expect(assistantTexts(lines[1])).toHaveLength(1);
    expect(assistantTexts(lines[4])).toEqual([]);
  });

  it('outputs term names and counts only, without known terms or any sentence', () => {
    const dir = path.join(temp, 'transcripts', 'project');
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'session.jsonl'), lines.join('\n'));
    const repo = loadAll(repoRoot);
    const candidates = countCandidates(transcriptTexts(path.join(temp, 'transcripts')), { known: knownTerms(repo), minCount: 3 });
    const terms = candidates.map((item) => item.term);
    expect(terms).toContain('RAG');
    expect(terms).toContain('context window');
    expect(terms).toContain('vector database');
    expect(candidates.find((item) => item.term === 'RAG')).toEqual({ term: 'RAG', count: 4, acronym: true });
    // Never: user text, tool input, code, or anything sentence-sized.
    const text = JSON.stringify(candidates);
    for (const leak of ['Bluebird', 'secret', 'contextWindow', 'cat /home']) expect(text).not.toContain(leak);
    expect(candidates.every((item) => item.term.split(' ').length <= 3)).toBe(true);
    expect(Object.keys(candidates[0]).every((key) => ['term', 'count', 'acronym', 'generic'].includes(key))).toBe(true);
    // Terms the repository already has are left out.
    expect(countCandidates(['Lãi kép, lãi kép, lãi kép.'], { known: knownTerms(repo), minCount: 1 }).map((item) => item.term)).not.toContain('lãi kép');
  });
});

describe('tb ingest', () => {
  const adapt: SourceCatalogEntry = {
    title: 'K8s', url: 'https://kubernetes.io', type: 'glossary', tier: 'A', languages: ['en'],
    license: 'CC-BY-4.0', reuse: 'adapt', domains: ['it/devops'],
  };

  function kubernetesFixture(): string {
    const dir = path.join(temp, 'k8s-glossary');
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'pod.md'), '---\ntitle: Pod\nid: pod\nfull_link: /docs/concepts/workloads/pods/\nshort_description: >\n  The smallest and simplest Kubernetes object.\n---\nbody\n');
    fs.writeFileSync(path.join(dir, 'kubectl.md'), '---\ntitle: Kubectl\nid: kubectl\nshort_description: >\n  Command line tool for {{< glossary_tooltip text="clusters" term_id="cluster" >}}.\n---\n');
    fs.writeFileSync(path.join(dir, '_index.md'), '---\ntitle: Glossary\n---\n');
    return dir;
  }

  it('parses the Kubernetes glossary and keeps definitions only for a verified adapt source (D12)', () => {
    const entries = INGEST_ADAPTERS.kubernetes.fromPath(kubernetesFixture());
    expect(entries.map((entry) => entry.term)).toEqual(['Kubectl', 'Pod']);
    expect(entries[0].definition).toBe('Command line tool for .');
    expect(entries[1].locator).toBe('https://kubernetes.io/docs/reference/glossary/?all=true#term-pod');

    expect(mayAdapt(adapt)).toBe(false);
    expect(ingestEntries('k8s-glossary', adapt, entries).entries.every((entry) => entry.definition === undefined)).toBe(true);
    const verified = { ...adapt, license_verified_by: '@dang', license_evidence: 'https://example.org/license', verified_license_at: '2026-10-15' };
    expect(ingestEntries('k8s-glossary', verified, entries).entries[1].definition).toBe('The smallest and simplest Kubernetes object.');
    expect(ingestEntries('k8s-glossary', { ...verified, reuse: 'paraphrase-only' }, entries).definitionsIncluded).toBe(false);
  });

  it('writes candidates with source metadata ready for tb new --from', () => {
    const dir = repoCopy('repo-ingest');
    const file = writeIngestCandidates(dir, ingestEntries('k8s-glossary', adapt, INGEST_ADAPTERS.kubernetes.fromPath(kubernetesFixture())), '2026-10-15');
    const doc = parseYaml(fs.readFileSync(file, 'utf-8')) as any;
    expect(doc.definitions).toMatch(/omitted/);
    expect(doc.candidates[1]).toEqual({
      term: 'Pod', id: null, domain: null,
      source: { ref: 'k8s-glossary', locator: 'https://kubernetes.io/docs/reference/glossary/?all=true#term-pod', language: 'en', accessed: '2026-10-15', retrieved_by: 'ai', supports: ['definition'] },
    });
  });

  it('reads a CSV glossary', () => {
    const file = path.join(temp, 'glossary.csv');
    fs.writeFileSync(file, 'term,url,definition\n"Zero trust",https://example.org/zt,"Never trust, always verify"\nMFA,https://example.org/mfa,\n');
    expect(INGEST_ADAPTERS.csv.fromPath(file)).toEqual([
      { term: 'Zero trust', locator: 'https://example.org/zt', definition: 'Never trust, always verify' },
      { term: 'MFA', locator: 'https://example.org/mfa', definition: undefined },
    ]);
  });
});

describe('scaffold', () => {
  it('writes the same skeleton as before, with labels and sources when given', () => {
    const dir = repoCopy('repo-scaffold');
    scaffoldConcept(dir, { id: 'context-window', domain: 'it/ai-ml/llm-agents', locales: ['vi', 'en'], draftedBy: 'ai' });
    const yamlText = fs.readFileSync(path.join(dir, 'concepts', 'context-window', 'concept.yaml'), 'utf-8');
    expect(yamlText).toBe('id: context-window\ndomains:\n  - it/ai-ml/llm-agents\nlevel: 1\nrelations:\n  prerequisites: []\n  confusable: []\n  related: []\nstatus: draft\nprovenance:\n  drafted_by: ai\nsources: []\n');
    expect(fs.readFileSync(path.join(dir, 'concepts', 'context-window', 'vi.md'), 'utf-8')).toContain('label: context-window\n');

    const source = { ref: 'k8s-glossary', locator: 'https://kubernetes.io/x', language: 'en', accessed: '2026-10-15', retrieved_by: 'ai' as const, supports: ['definition' as const] };
    scaffoldConcept(dir, { id: 'pod', domain: 'it/devops', locales: ['en'], draftedBy: 'ai', labels: { en: 'Pod: unit' }, sources: [source] });
    const concept = parseYaml(fs.readFileSync(path.join(dir, 'concepts', 'pod', 'concept.yaml'), 'utf-8')) as any;
    expect(concept.sources).toEqual([source]);
    expect(fs.readFileSync(path.join(dir, 'concepts', 'pod', 'en.md'), 'utf-8')).toContain("label: 'Pod: unit'\n");
    expect(() => scaffoldConcept(dir, { id: 'pod', domain: 'it/devops', locales: ['en'], draftedBy: 'ai' })).toThrow(/already exists/);
  });
});

describe('reports', () => {
  it('coverage counts concepts per level-2 branch with locale and status', () => {
    const rows = coverageReport(loadAll(repoRoot), 'finance');
    expect(rows.every((row) => row.branch.startsWith('finance/'))).toBe(true);
    const personal = rows.find((row) => row.branch === 'finance/personal-finance')!;
    expect(personal.concepts).toBe(3);
    expect(personal.locales).toEqual({ vi: 3, en: 3 });
    expect(coverageReport(loadAll(repoRoot)).reduce((sum, row) => sum + row.concepts, 0)).toBe(loadAll(repoRoot).concepts.size);
  });

  it('collisions lists shared keys and what each homonym lacks (T-C2)', () => {
    const rows = collisionsReport(loadAll(repoRoot));
    const token = rows.find((row) => row.locale === 'en' && row.key === 'token')!;
    expect(token.concepts).toEqual(['token-auth', 'token-crypto', 'token-llm']);
    expect(token.problems).toEqual([]);

    const dir = repoCopy('repo-collide', true);
    const file = path.join(dir, 'concepts', 'token-auth', 'en.md');
    fs.writeFileSync(file, fs.readFileSync(file, 'utf-8').replace(/^qualifier: .*\n/m, ''));
    const broken = collisionsReport(loadAll(dir)).find((row) => row.locale === 'en' && row.key === 'token')!;
    expect(broken.problems).toContain('token-auth: thiếu qualifier (en) / no qualifier');
  });

  it('overlap finds 8-word runs copied from quotes or fetched paraphrase-only texts (T-C5)', () => {
    expect(overlapReport(loadAll(repoRoot), { sourcesDir: path.join(temp, 'none') })).toEqual([]);
    const dir = repoCopy('repo-overlap', true);
    const sources = path.join(dir, 'candidates', '.sources', 'wikipedia-en');
    fs.mkdirSync(sources, { recursive: true });
    const md = path.join(dir, 'concepts', 'cookie', 'en.md');
    const copied = 'a small piece of data that a website asks your browser to store';
    fs.writeFileSync(path.join(sources, 'cookie.txt'), `From the article: ${copied} on your computer.`);
    expect(overlapReport(loadAll(dir), { sourcesDir: path.join(dir, 'candidates', '.sources') })).toEqual([]);
    fs.appendFileSync(md, `\n${copied}.\n`);
    const matches = overlapReport(loadAll(dir), { sourcesDir: path.join(dir, 'candidates', '.sources') });
    expect(matches).toHaveLength(1);
    expect(matches[0]).toMatchObject({ concept: 'cookie', locale: 'en', against: 'wikipedia-en/cookie.txt' });
    // A source the project may adapt is not held to it.
    fs.renameSync(sources, path.join(dir, 'candidates', '.sources', 'nist-csrc'));
    expect(overlapReport(loadAll(dir), { sourcesDir: path.join(dir, 'candidates', '.sources') })).toEqual([]);
  });
});

describe('validator: Plan 2.6 warnings', () => {
  it('warns on acronyms without an autolink decision and on plain descriptions shared by two concepts', () => {
    const dir = repoCopy('repo-warn', true);
    const roi = path.join(dir, 'concepts', 'roi', 'en.md');
    fs.writeFileSync(roi, fs.readFileSync(roi, 'utf-8').replace('autolink:\n  aliases:\n    ROI: always\n', ''));
    const cookie = path.join(dir, 'concepts', 'cookie', 'en.md');
    const shared = 'how much money you make back compared to what you spent';
    fs.writeFileSync(cookie, fs.readFileSync(cookie, 'utf-8').replace('plain_descriptions:\n', `plain_descriptions:\n  - ${shared}\n`));
    const warnings = validateRepository(loadAll(dir)).warnings.map((issue) => `${issue.ruleId} ${issue.conceptId} ${issue.message}`);
    expect(warnings).toContain("14 roi Alias 'ROI' looks like an acronym; declare explicit 'autolink.aliases.ROI: always | never'");
    expect(warnings.some((line) => line.startsWith('11 ') && line.includes(shared))).toBe(true);
  });
});
