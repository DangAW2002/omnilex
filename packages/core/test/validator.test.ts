import { describe, it, expect } from 'vitest';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadAll } from '../src/loader.js';
import { validateRepository, detectPrerequisiteCycles } from '../src/validator.js';
import type { ConceptRecord } from '../src/types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../../../');

describe('Validator Rules Engine', () => {
  it('should successfully validate canonical repository concepts without errors', () => {
    const repoData = loadAll(rootDir);
    const report = validateRepository(repoData);

    expect(report.valid).toBe(true);
    expect(report.errors).toHaveLength(0);
  });

  it('should detect circular dependencies in prerequisites (Rule 5)', () => {
    const mockConcepts = new Map<string, ConceptRecord>();
    mockConcepts.set('concept-a', {
      id: 'concept-a',
      dirPath: '/mock/concept-a',
      metadata: {
        id: 'concept-a',
        domains: ['finance/investing'],
        level: 1,
        status: 'draft',
        provenance: { drafted_by: 'ai' },
        relations: { prerequisites: ['concept-b'] },
      },
      locales: {},
    });
    mockConcepts.set('concept-b', {
      id: 'concept-b',
      dirPath: '/mock/concept-b',
      metadata: {
        id: 'concept-b',
        domains: ['finance/investing'],
        level: 1,
        status: 'draft',
        provenance: { drafted_by: 'ai' },
        relations: { prerequisites: ['concept-a'] },
      },
      locales: {},
    });

    const cycles = detectPrerequisiteCycles(mockConcepts);
    expect(cycles.length).toBeGreaterThan(0);
    expect(cycles[0]).toEqual(['concept-a', 'concept-b', 'concept-a']);
  });

  it('should flag concept with mismatched directory name (Rule 2)', () => {
    const repoData = loadAll(rootDir);
    // Introduce intentional mismatch
    const badRecord = {
      ...repoData.concepts.get('compound-interest')!,
      id: 'different-id',
    };
    repoData.concepts.set('compound-interest', badRecord);

    const report = validateRepository(repoData);
    const idIssue = report.errors.find((e) => e.ruleId === 2);
    expect(idIssue).toBeDefined();
    expect(idIssue?.message).toContain('does not match directory name');
  });
});
