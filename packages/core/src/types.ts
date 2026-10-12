export type ConceptStatus = 'draft' | 'reviewed' | 'verified' | 'deprecated';

export interface ConceptRelations {
  prerequisites?: string[];
  broader?: string[];
  narrower?: string[];
  confusable?: string[];
  related?: string[];
}

export interface ConceptProvenance {
  drafted_by: string;
  reviewed_by?: string[];
  reviewed_at?: string;
}

export interface ConceptMetadata {
  id: string;
  domains: string[];
  level: 1 | 2 | 3;
  relations?: ConceptRelations;
  status: ConceptStatus;
  provenance: ConceptProvenance;
  sources?: string[];
  replaced_by?: string;
}

export interface LocaleEntryFrontmatter {
  label: string;
  qualifier?: string;
  aliases?: string[];
  loanwords?: string[];
  plain_descriptions: string[];
  summary: string;
  confusable_notes?: Record<string, string>;
  follow_up_questions?: string[];
  translation?: 'native' | 'translated' | 'machine';
}

export interface LocaleEntry {
  locale: string;
  frontmatter: LocaleEntryFrontmatter;
  content: string;
  filePath: string;
}

export interface ConceptRecord {
  id: string;
  dirPath: string;
  metadata: ConceptMetadata;
  locales: Record<string, LocaleEntry>;
}

export interface TaxonomyNode {
  id: string;
  labels: Record<string, string>;
  children?: TaxonomyNode[];
}

export interface LocalesConfig {
  pivot: string;
  locales: Array<{
    code: string;
    name: string;
    status: 'primary' | 'beta' | 'planned';
  }>;
  fallback: Record<string, string[]>;
}

export interface DomainItem {
  id: string;
  name: Record<string, string>;
  priority: number;
  file: string;
}

export interface DomainsConfig {
  domains: DomainItem[];
}

export interface ReviewersConfig {
  reviewers: Record<string, Array<{
    handle: string;
    name: string;
    email?: string;
    role?: string;
  }>>;
}

export interface RepositoryData {
  rootDir: string;
  concepts: Map<string, ConceptRecord>;
  taxonomy: Map<string, TaxonomyNode>;
  validDomainPaths: Set<string>;
  localesConfig: LocalesConfig;
  domainsConfig: DomainsConfig;
  reviewersConfig: ReviewersConfig;
}

export type ValidationSeverity = 'error' | 'warning';

export interface ValidationIssue {
  ruleId: number;
  severity: ValidationSeverity;
  conceptId?: string;
  locale?: string;
  message: string;
  file?: string;
}

export interface ValidationReport {
  valid: boolean;
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
}
