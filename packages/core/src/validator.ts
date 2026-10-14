import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import Ajv from 'ajv';
import { buildArtifacts } from './builder.js';
import type {
  ConceptRecord,
  RepositoryData,
  ValidationIssue,
  ValidationReport,
} from './types.js';

export interface ValidationOptions {
  checkIndexDrift?: boolean;
}

export function detectPrerequisiteCycles(concepts: Map<string, ConceptRecord>): string[][] {
  const visited = new Set<string>();
  const recursionStack = new Set<string>();
  const cycles: string[][] = [];

  function dfs(currentId: string, path: string[]) {
    visited.add(currentId);
    recursionStack.add(currentId);
    path.push(currentId);

    const record = concepts.get(currentId);
    const prereqs = record?.metadata?.relations?.prerequisites || [];

    for (const prereqId of prereqs) {
      if (!concepts.has(prereqId)) continue;
      if (!visited.has(prereqId)) {
        dfs(prereqId, [...path]);
      } else if (recursionStack.has(prereqId)) {
        const cycleStartIndex = path.indexOf(prereqId);
        const cyclePath = path.slice(cycleStartIndex).concat(prereqId);
        cycles.push(cyclePath);
      }
    }

    recursionStack.delete(currentId);
  }

  for (const id of concepts.keys()) {
    if (!visited.has(id)) {
      dfs(id, []);
    }
  }

  return cycles;
}

export function validateRepository(
  repoData: RepositoryData,
  options: ValidationOptions = {}
): ValidationReport {
  const { concepts, validDomainPaths, localesConfig, reviewersConfig, rootDir } = repoData;
  const issues: ValidationIssue[] = [];

  // Setup Ajv schemas
  const AjvClass: any = (Ajv as any).default || Ajv;
  const ajv = new AjvClass({ allErrors: true });
  const compileSchema = (name: string): any => {
    const schemaPath = path.join(rootDir, 'schema', `${name}.schema.json`);
    if (!fs.existsSync(schemaPath)) {
      issues.push({ ruleId: 1, severity: 'error', file: schemaPath, message: `Missing schema ${name}.schema.json` });
      return null;
    }
    return ajv.compile(JSON.parse(fs.readFileSync(schemaPath, 'utf-8')));
  };
  const validateConceptSchema = compileSchema('concept');
  const validateLocaleSchema = compileSchema('locale-entry');
  const validateLocalesSchema = compileSchema('locales');
  const validateDomainsSchema = compileSchema('domains');
  const validateTaxonomySchema = compileSchema('taxonomy');

  const checkSchema = (validate: any, value: unknown, file: string) => {
    if (validate && !validate(value)) {
      for (const error of validate.errors || []) {
        issues.push({ ruleId: 1, severity: 'error', file,
          message: `${file} schema error at ${error.instancePath || 'root'}: ${error.message}` });
      }
    }
  };
  checkSchema(validateLocalesSchema, localesConfig, path.join(rootDir, 'config', 'locales.yaml'));
  checkSchema(validateDomainsSchema, repoData.domainsConfig, path.join(rootDir, 'config', 'domains.yaml'));
  for (const domain of repoData.domainsConfig?.domains || []) {
    const taxonomyFile = path.join(rootDir, domain.file);
    const tree = repoData.taxonomy.get(domain.id);
    if (!fs.existsSync(taxonomyFile) || !tree) {
      issues.push({ ruleId: 1, severity: 'error', file: taxonomyFile,
        message: `Missing taxonomy for domain '${domain.id}'` });
    } else {
      checkSchema(validateTaxonomySchema, tree, taxonomyFile);
    }
  }
  if (issues.length > 0) return { valid: false, errors: issues, warnings: [] };

  const primaryLocales = localesConfig.locales
    .filter((l) => l.status === 'primary')
    .map((l) => l.code);

  // Map to track label collisions across locales for Rule 9
  // locale -> label (lowercase normalized) -> array of conceptIds without qualifier
  const labelMap = new Map<string, Map<string, Array<{ conceptId: string; qualifier?: string }>>>();

  // Rule 5: Cycle detection in prerequisites
  const prereqCycles = detectPrerequisiteCycles(concepts);
  for (const cycle of prereqCycles) {
    issues.push({
      ruleId: 5,
      severity: 'error',
      message: `Circular dependency detected in prerequisites: ${cycle.join(' -> ')}`,
    });
  }

  for (const [dirName, record] of concepts.entries()) {
    const { id, metadata, locales } = record;

    // Rule 1: Schema validation for concept.yaml
    if (validateConceptSchema) {
      const valid = validateConceptSchema(metadata);
      if (!valid && validateConceptSchema.errors) {
        for (const err of validateConceptSchema.errors) {
          issues.push({
            ruleId: 1,
            severity: 'error',
            conceptId: id,
            message: `concept.yaml schema error at ${err.instancePath || 'root'}: ${err.message}`,
            file: path.join(record.dirPath, 'concept.yaml'),
          });
        }
      }
    }

    // Rule 2: ID format and directory match
    const idRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!id || !idRegex.test(id) || id.length > 48) {
      issues.push({
        ruleId: 2,
        severity: 'error',
        conceptId: id,
        message: `Concept id '${id}' must be kebab-case, max 48 characters`,
      });
    }
    if (id !== dirName) {
      issues.push({
        ruleId: 2,
        severity: 'error',
        conceptId: id,
        message: `Concept id '${id}' does not match directory name '${dirName}'`,
      });
    }

    // Rule 3: Domains exist in taxonomy
    if (metadata.domains && Array.isArray(metadata.domains)) {
      for (const domainPath of metadata.domains) {
        if (!validDomainPaths.has(domainPath)) {
          issues.push({
            ruleId: 3,
            severity: 'error',
            conceptId: id,
            message: `Domain path '${domainPath}' does not exist in taxonomy`,
          });
        }
      }
    } else {
      issues.push({
        ruleId: 3,
        severity: 'error',
        conceptId: id,
        message: `Concept must declare at least one valid domain`,
      });
    }

    // Rule 4: Relations exist and no self-reference
    const relations = metadata.relations || {};
    const relationKeys = ['prerequisites', 'broader', 'narrower', 'confusable', 'related'] as const;
    for (const key of relationKeys) {
      const list = relations[key];
      if (list && Array.isArray(list)) {
        for (const targetId of list) {
          if (targetId === id) {
            issues.push({
              ruleId: 4,
              severity: 'error',
              conceptId: id,
              message: `Concept cannot reference itself in relations.${key}`,
            });
          }
          if (!concepts.has(targetId)) {
            issues.push({
              ruleId: 4,
              severity: 'error',
              conceptId: id,
              message: `Referenced concept '${targetId}' in relations.${key} does not exist`,
            });
          }
        }
      }
    }

    // Rule 6: At least one file in primary locale
    const availableLocales = Object.keys(locales);
    const hasPrimaryLocale = primaryLocales.some((l) => availableLocales.includes(l));
    if (!hasPrimaryLocale) {
      issues.push({
        ruleId: 6,
        severity: 'error',
        conceptId: id,
        message: `Concept lacks any file in primary locales (${primaryLocales.join(', ')})`,
      });
    }

    // Rule 7: reviewed and verified statuses need accountable human reviewers.
    if (metadata.status === 'reviewed' || metadata.status === 'verified') {
      const reviewers = metadata.provenance?.reviewed_by || [];
      const sources = metadata.sources || [];
      if (reviewers.length === 0 || !metadata.provenance?.reviewed_at) {
        issues.push({
          ruleId: 7,
          severity: 'error',
          conceptId: id,
          message: `Reviewed or verified concept must declare provenance.reviewed_by and provenance.reviewed_at`,
        });
      }
      for (const domain of new Set((metadata.domains || []).map((domainPath) => domainPath.split('/')[0]))) {
        const allowed = reviewersConfig.reviewers[domain] || [];
        if (!reviewers.some((handle) => allowed.some((reviewer) => reviewer.handle === handle))) {
          issues.push({ ruleId: 7, severity: 'error', conceptId: id,
            message: `No reviewer for domain '${domain}' is listed in config/reviewers.yaml` });
        }
      }
      if (metadata.status === 'verified' && (new Set(reviewers).size < 2 || sources.length === 0)) {
        issues.push({ ruleId: 7, severity: 'error', conceptId: id,
          message: `Verified concept requires two distinct reviewers and at least one source` });
      }
    }

    // Rule 10: Confusable declared one-way (Warning)
    const confusableList = relations.confusable || [];
    for (const targetId of confusableList) {
      const targetRecord = concepts.get(targetId);
      if (targetRecord) {
        const targetConfusables = targetRecord.metadata?.relations?.confusable || [];
        if (!targetConfusables.includes(id)) {
          issues.push({
            ruleId: 10,
            severity: 'warning',
            conceptId: id,
            message: `Confusable relation is one-way: '${id}' references '${targetId}', but '${targetId}' does not list '${id}'`,
          });
        }
      }
    }

    // Rule 12: Missing another primary locale (Warning)
    for (const primary of primaryLocales) {
      if (!availableLocales.includes(primary)) {
        issues.push({
          ruleId: 12,
          severity: 'warning',
          conceptId: id,
          message: `Missing translation in primary locale '${primary}'`,
        });
      }
    }

    // Rule 13: Concept has no relations (orphan) (Warning)
    const totalRelations = relationKeys.reduce((acc, key) => acc + (relations[key]?.length || 0), 0);
    if (totalRelations === 0) {
      issues.push({
        ruleId: 13,
        severity: 'warning',
        conceptId: id,
        message: `Concept has no defined relationships in relations (orphan)`,
      });
    }

    // Inspect individual locale files
    for (const [localeCode, localeEntry] of Object.entries(locales)) {
      const fm = localeEntry.frontmatter;

      // Rule 1: Schema validation for locale frontmatter
      if (validateLocaleSchema) {
        const valid = validateLocaleSchema(fm);
        if (!valid && validateLocaleSchema.errors) {
          for (const err of validateLocaleSchema.errors) {
            issues.push({
              ruleId: 1,
              severity: 'error',
              conceptId: id,
              locale: localeCode,
              message: `${localeCode}.md schema error at ${err.instancePath || 'root'}: ${err.message}`,
              file: localeEntry.filePath,
            });
          }
        }
      }

      // Rule 11: Reviewed concept has fewer than 2 plain_descriptions (Warning)
      if (metadata.status === 'reviewed') {
        const descriptions = fm?.plain_descriptions || [];
        if (descriptions.length < 2) {
          issues.push({
            ruleId: 11,
            severity: 'warning',
            conceptId: id,
            locale: localeCode,
            message: `Reviewed concept in '${localeCode}' has fewer than 2 plain_descriptions (found ${descriptions.length})`,
          });
        }
      }

      // Collect labels for Rule 9
      if (fm?.label) {
        const normLabel = fm.label.trim().toLowerCase();
        if (!labelMap.has(localeCode)) {
          labelMap.set(localeCode, new Map());
        }
        const currentLocaleLabels = labelMap.get(localeCode)!;
        if (!currentLocaleLabels.has(normLabel)) {
          currentLocaleLabels.set(normLabel, []);
        }
        currentLocaleLabels.get(normLabel)!.push({
          conceptId: id,
          qualifier: fm.qualifier?.trim(),
        });
      }
    }
  }

  // Rule 9: Two concepts with same label in the same locale must have qualifier (Error)
  for (const [localeCode, map] of labelMap.entries()) {
    for (const [label, entries] of map.entries()) {
      if (entries.length > 1) {
        const missingQualifier = entries.filter((e) => !e.qualifier);
        if (missingQualifier.length > 0) {
          for (const entry of missingQualifier) {
            issues.push({
              ruleId: 9,
              severity: 'error',
              conceptId: entry.conceptId,
              locale: localeCode,
              message: `Duplicate label '${label}' in locale '${localeCode}' requires a distinctive qualifier`,
            });
          }
        }
      }
    }
  }

  // Rule 8: committed discovery files must match a fresh build from source data.
  if (options.checkIndexDrift !== false && !issues.some((issue) => issue.severity === 'error')) {
    const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'termbridge-validate-'));
    try {
      const generated = buildArtifacts({ ...repoData, rootDir: tempRoot });
      const expectedPaths = new Set(
        [...generated.indexesGenerated, path.join(tempRoot, 'llms.txt')]
          .map((file) => path.relative(tempRoot, file).replaceAll('\\', '/'))
      );

      for (const relativePath of expectedPaths) {
        const expected = fs.readFileSync(path.join(tempRoot, relativePath), 'utf-8').replace(/\r\n/g, '\n');
        const actualPath = path.join(rootDir, relativePath);
        if (!fs.existsSync(actualPath) || fs.readFileSync(actualPath, 'utf-8').replace(/\r\n/g, '\n') !== expected) {
          issues.push({ ruleId: 8, severity: 'error', file: actualPath,
            message: `Generated file '${relativePath}' is missing or out of date; run pnpm tb build` });
        }
      }

      const actualIndexes = path.join(rootDir, 'indexes');
      if (fs.existsSync(actualIndexes)) {
        for (const localeDir of fs.readdirSync(actualIndexes, { withFileTypes: true })) {
          if (!localeDir.isDirectory()) continue;
          const localePath = path.join(actualIndexes, localeDir.name);
          for (const indexFile of fs.readdirSync(localePath, { withFileTypes: true })) {
            if (!indexFile.isFile()) continue;
            const relativePath = `indexes/${localeDir.name}/${indexFile.name}`;
            if (!expectedPaths.has(relativePath)) {
              issues.push({ ruleId: 8, severity: 'error', file: path.join(rootDir, relativePath),
                message: `Stale generated file '${relativePath}'; run pnpm tb build` });
            }
          }
        }
      }
    } finally {
      if (path.dirname(path.resolve(tempRoot)) === path.resolve(os.tmpdir()) && path.basename(tempRoot).startsWith('termbridge-validate-')) {
        fs.rmSync(tempRoot, { recursive: true, force: true });
      }
    }
  }

  const errors = issues.filter((i) => i.severity === 'error');
  const warnings = issues.filter((i) => i.severity === 'warning');

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}
