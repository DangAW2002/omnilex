import { describe, it, expect } from 'vitest';
import { loadAll, validateRepository } from '../src/index.js';
import type { ConceptRecord } from '../src/types.js';

describe('Taxonomy Expansion (T-V5)', () => {
  it('loads iot and product taxonomies into validDomainPaths', () => {
    const repo = loadAll(process.cwd());

    // Domain paths in iot
    expect(repo.validDomainPaths.has('iot')).toBe(true);
    expect(repo.validDomainPaths.has('iot/devices-sensors')).toBe(true);
    expect(repo.validDomainPaths.has('iot/connectivity-protocols')).toBe(true);
    expect(repo.validDomainPaths.has('iot/edge-cloud')).toBe(true);
    expect(repo.validDomainPaths.has('iot/industrial')).toBe(true);

    // Domain paths in product
    expect(repo.validDomainPaths.has('product')).toBe(true);
    expect(repo.validDomainPaths.has('product/product-management')).toBe(true);
    expect(repo.validDomainPaths.has('product/agile-scrum')).toBe(true);
    expect(repo.validDomainPaths.has('product/delivery-planning')).toBe(true);
    expect(repo.validDomainPaths.has('product/metrics')).toBe(true);

    // Domain paths in expanded it
    expect(repo.validDomainPaths.has('it/devops/ci-cd')).toBe(true);
    expect(repo.validDomainPaths.has('it/devops/containers')).toBe(true);
    expect(repo.validDomainPaths.has('it/software-engineering/version-control')).toBe(true);
    expect(repo.validDomainPaths.has('it/software-engineering/practices')).toBe(true);
    expect(repo.validDomainPaths.has('it/ai-ml/mlops')).toBe(true);
    expect(repo.validDomainPaths.has('it/ai-ml/ai-safety-governance')).toBe(true);
  });

  it('declares reviewers for iot and product in config/reviewers.yaml', () => {
    const repo = loadAll(process.cwd());

    expect(repo.reviewersConfig.reviewers.iot).toBeDefined();
    expect(repo.reviewersConfig.reviewers.iot.length).toBeGreaterThanOrEqual(1);

    expect(repo.reviewersConfig.reviewers.product).toBeDefined();
    expect(repo.reviewersConfig.reviewers.product.length).toBeGreaterThanOrEqual(1);
  });

  it('validates a concept using new iot and product domain paths cleanly', () => {
    const repo = loadAll(process.cwd());

    const iotConcept: ConceptRecord = {
      id: 'mqtt-protocol',
      dirPath: '/concepts/mqtt-protocol',
      metadata: {
        id: 'mqtt-protocol',
        domains: ['iot/connectivity-protocols'],
        level: 1,
        status: 'draft',
        provenance: { drafted_by: 'ai' },
        sources: [
          {
            ref: 'nist-csrc',
            locator: 'https://csrc.nist.gov',
            accessed: '2026-10-14',
            language: 'en',
          },
        ],
        relations: { related: ['cookie'] },
      },
      locales: {
        en: {
          locale: 'en',
          frontmatter: {
            label: 'Fixture IoT protocol',
            plain_descriptions: ['lightweight publish subscribe messaging protocol'],
            summary: 'A lightweight messaging protocol for sensors.',
            autolink: { label: 'always' },
          },
          content: 'MQTT explanation',
          filePath: '/concepts/mqtt-protocol/en.md',
        },
        vi: {
          locale: 'vi',
          frontmatter: {
            label: 'Fixture IoT protocol',
            plain_descriptions: ['giao thức truyền thông điệp nhẹ cho cảm biến'],
            summary: 'Giao thức truyền thông điệp nhẹ dành cho thiết bị IoT.',
            loanwords: [],
          },
          content: 'Giải thích MQTT',
          filePath: '/concepts/mqtt-protocol/vi.md',
        },
      },
    };

    // Fixture label must not collide with real concepts (the repo has its own `mqtt`).
    repo.concepts.set('mqtt-protocol', iotConcept);
    const report = validateRepository(repo, { checkIndexDrift: false });

    // Should NOT have domain errors (Rule 3) or reviewer errors (Rule 7) for this concept
    const conceptIssues = report.errors.filter((e) => e.conceptId === 'mqtt-protocol');
    expect(conceptIssues).toHaveLength(0);
  });
});
