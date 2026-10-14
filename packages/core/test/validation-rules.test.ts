import { describe, it, expect } from 'vitest';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadAll } from '../src/loader.js';
import { validateRepository } from '../src/validator.js';
import type { RepositoryData } from '../src/types.js';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../');

function check(mutator: (repo: RepositoryData) => void, ruleId: number, severity: 'error' | 'warning' = 'error') {
  const repo = loadAll(rootDir);
  mutator(repo);
  const report = validateRepository(repo, { checkIndexDrift: ruleId === 8 });
  expect(report[severity === 'error' ? 'errors' : 'warnings'].some((issue) => issue.ruleId === ruleId)).toBe(true);
}

describe('all 13 validation rules', () => {
  it('1 rejects schema violations', () => check((repo) => { repo.concepts.get('principal')!.metadata.level = 4 as any; }, 1));
  it('1 rejects invalid locale configuration', () => check((repo) => { repo.localesConfig.locales[0].status = 'unknown' as any; }, 1));
  it('1 rejects invalid taxonomy', () => check((repo) => { repo.taxonomy.get('finance')!.id = 'Invalid ID'; }, 1));
  it('2 rejects invalid concept IDs', () => check((repo) => { repo.concepts.get('principal')!.id = '../invalid'; }, 2));
  it('3 rejects unknown taxonomy paths', () => check((repo) => { repo.concepts.get('principal')!.metadata.domains = ['finance/unknown']; }, 3));
  it('4 rejects unknown references', () => check((repo) => { repo.concepts.get('principal')!.metadata.relations = { related: ['missing-id'] }; }, 4));
  it('5 rejects prerequisite cycles', () => check((repo) => { repo.concepts.get('principal')!.metadata.relations = { prerequisites: ['compound-interest'] }; }, 5));
  it('6 requires a primary language', () => check((repo) => { repo.concepts.get('principal')!.locales = {}; }, 6));
  it('7 requires sources and reviewers for verified concepts', () => check((repo) => { const meta = repo.concepts.get('principal')!.metadata; meta.status = 'verified'; meta.sources = []; meta.provenance.reviewed_by = []; }, 7));
  it('7 requires a registered reviewer for reviewed concepts', () => check((repo) => { repo.concepts.get('principal')!.metadata.provenance.reviewed_by = ['@unknown']; }, 7));
  it('8 detects generated index drift', () => check((repo) => { repo.concepts.get('principal')!.locales.vi.frontmatter.summary += ' changed'; }, 8));
  it('9 requires qualifiers for identical labels', () => check((repo) => { repo.concepts.get('principal')!.locales.vi.frontmatter.label = 'Lãi kép'; }, 9));
  it('10 warns on one-way confusable references', () => check((repo) => { repo.concepts.get('roi')!.metadata.relations = { confusable: ['compound-interest'] }; }, 10, 'warning'));
  it('11 warns when reviewed content has one plain description', () => check((repo) => { repo.concepts.get('principal')!.locales.vi.frontmatter.plain_descriptions = ['one']; }, 11, 'warning'));
  it('12 warns when a primary language is missing', () => check((repo) => { delete repo.concepts.get('principal')!.locales.en; }, 12, 'warning'));
  it('13 warns on orphan concepts', () => check((repo) => { repo.concepts.get('principal')!.metadata.relations = {}; }, 13, 'warning'));
});
