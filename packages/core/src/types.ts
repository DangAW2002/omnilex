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

export interface ConceptSource {
  ref: string;
  locator: string;
  title?: string;
  language?: string;
  accessed: string;
  retrieved_by?: 'ai' | 'human';
  supports?: Array<'definition' | 'summary' | 'example'>;
  quote?: string;
  archive?: string;
}

export interface LabelEvidence {
  ref: string;
  locator: string;
  accessed?: string;
  note?: string;
}

export interface AutolinkConfig {
  label?: 'always' | 'never' | 'auto';
  aliases?: Record<string, 'always' | 'never' | 'auto'>;
}

export interface ConceptMetadata {
  id: string;
  domains: string[];
  level: 1 | 2 | 3;
  relations?: ConceptRelations;
  status: ConceptStatus;
  provenance: ConceptProvenance;
  sources?: Array<string | ConceptSource>;
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
  translated_from?: string;
  translated_by?: string;
  translated_at?: string;
  coined?: boolean;
  autolink?: AutolinkConfig;
  label_evidence?: LabelEvidence[];
  sources?: Array<string | ConceptSource>;
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
  packing?: 'root' | 'branch';
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

export interface SourceCatalogEntry {
  title: string;
  publisher?: string;
  url: string;
  type: 'standard' | 'spec' | 'glossary' | 'docs' | 'textbook' | 'paper' | 'encyclopedia' | 'law' | 'community';
  tier: 'A' | 'B' | 'C' | 'D';
  languages: string[];
  license: string;
  reuse: 'adapt' | 'paraphrase-only' | 'cite-only';
  domains: string[];
  verified_license_at?: string;
  license_evidence?: string;
  license_verified_by?: string;
}

export type SourcesConfig = Record<string, SourceCatalogEntry>;

export interface RepositoryData {
  rootDir: string;
  concepts: Map<string, ConceptRecord>;
  taxonomy: Map<string, TaxonomyNode>;
  validDomainPaths: Set<string>;
  localesConfig: LocalesConfig;
  domainsConfig: DomainsConfig;
  reviewersConfig: ReviewersConfig;
  sourcesConfig?: SourcesConfig;
  commonWords?: Record<string, Set<string>>;
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
