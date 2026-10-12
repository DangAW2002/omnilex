export interface TermConcept {
  id: string;
  label: string;
  qualifier?: string;
  summary: string;
  domains: string[];
}

export interface TermEntry {
  key: string;
  match: 'exact-case' | 'any-case';
  concepts: TermConcept[];
  autolink: boolean;
}

export interface ClaudeRenderContext {
  ui: {
    open: (component: any) => void;
    toast: (message: string) => void;
  };
}
