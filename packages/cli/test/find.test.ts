import { describe, it, expect, vi } from 'vitest';
import { findAction } from '../src/index.js';

describe('T-S3: tb find does not call loadAll() when dist is fresh', () => {
  const fakeDocs = [
    {
      id: 'compound-interest',
      label: 'Lãi kép',
      summary: 'Tiền lãi được cộng vào gốc.',
      domains: ['finance/personal-finance/saving'],
    },
  ];

  it('uses prebuilt dist/vi/search.json directly and never calls loadAll when dist is fresh', () => {
    const mockLoadAll = vi.fn();
    const mockFindConcepts = vi.fn();
    const mockFindConceptsFromDocs = vi.fn().mockReturnValue([
      { id: 'compound-interest', label: 'Lãi kép', score: 1.0 },
    ]);

    const mockFs = {
      existsSync: vi.fn((p: string) => true),
      statSync: vi.fn((p: string) => {
        if (p.includes('search.json')) {
          return { mtimeMs: 2000 } as any; // dist mới hơn
        }
        return { mtimeMs: 1000 } as any; // concepts cũ hơn
      }),
      readFileSync: vi.fn().mockReturnValue(JSON.stringify(fakeDocs)),
    } as any;

    const { results, usedPrebuilt } = findAction(
      '/mock/root',
      'lãi kép',
      { locale: 'vi' },
      {
        loadAll: mockLoadAll as any,
        findConcepts: mockFindConcepts as any,
        findConceptsFromDocs: mockFindConceptsFromDocs as any,
        fs: mockFs,
      }
    );

    expect(usedPrebuilt).toBe(true);
    expect(mockLoadAll).not.toHaveBeenCalled();
    expect(mockFindConceptsFromDocs).toHaveBeenCalledWith(
      fakeDocs,
      'lãi kép',
      expect.objectContaining({ cacheKey: 'cli-dist:vi' })
    );
    expect(results).toHaveLength(1);
    expect(results[0].id).toBe('compound-interest');
  });

  it('falls back to loadAll() with warning when dist is stale (concepts newer than dist)', () => {
    const mockLoadAll = vi.fn().mockReturnValue({ concepts: new Map() });
    const mockFindConcepts = vi.fn().mockReturnValue([
      { id: 'compound-interest', label: 'Lãi kép', score: 1.0 },
    ]);
    const mockFindConceptsFromDocs = vi.fn();

    const mockFs = {
      existsSync: vi.fn((p: string) => true),
      statSync: vi.fn((p: string) => {
        if (p.includes('search.json')) {
          return { mtimeMs: 1000 } as any; // dist cũ hơn
        }
        return { mtimeMs: 2000 } as any; // concepts mới hơn
      }),
      readFileSync: vi.fn(),
    } as any;

    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const { results, usedPrebuilt } = findAction(
      '/mock/root',
      'lãi kép',
      { locale: 'vi' },
      {
        loadAll: mockLoadAll as any,
        findConcepts: mockFindConcepts as any,
        findConceptsFromDocs: mockFindConceptsFromDocs as any,
        fs: mockFs,
      }
    );

    expect(usedPrebuilt).toBe(false);
    expect(warnSpy).toHaveBeenCalled();
    expect(mockLoadAll).toHaveBeenCalledWith('/mock/root');
    expect(mockFindConcepts).toHaveBeenCalled();
    expect(mockFindConceptsFromDocs).not.toHaveBeenCalled();
    expect(results).toHaveLength(1);

    warnSpy.mockRestore();
  });
});
