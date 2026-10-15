// Concept skeletons for `tb new` and `tb new --from candidates/<file>.yaml`.
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import type { ConceptSource } from './types.js';

export interface ScaffoldOptions {
  id: string;
  domain: string;
  locales: string[];
  draftedBy: string;
  // per-locale label (default: the id)
  labels?: Record<string, string>;
  // prefilled structured sources (from tb ingest)
  sources?: ConceptSource[];
}

export function scaffoldConcept(rootDir: string, options: ScaffoldOptions): string {
  const conceptDir = path.join(rootDir, 'concepts', options.id);
  if (fs.existsSync(conceptDir)) throw new Error(`Concept directory already exists at concepts/${options.id}`);
  fs.mkdirSync(conceptDir, { recursive: true });

  const sources = options.sources?.length
    ? `sources:\n${yaml.dump(options.sources, { lineWidth: 120 }).replace(/^/gm, '  ').replace(/\s+$/, '')}\n`
    : 'sources: []\n';
  const conceptYaml = `id: ${options.id}
domains:
  - ${options.domain}
level: 1
relations:
  prerequisites: []
  confusable: []
  related: []
status: draft
provenance:
  drafted_by: ${options.draftedBy}
${sources}`;
  fs.writeFileSync(path.join(conceptDir, 'concept.yaml'), conceptYaml, 'utf-8');

  for (const loc of options.locales) {
    const isVi = loc === 'vi';
    const label = options.labels?.[loc] ? yaml.dump(options.labels[loc]).trim() : options.id;
    const mdContent = `---
label: ${label}
aliases: []
loanwords: []
plain_descriptions:
  - ${isVi ? 'mô tả đời thường thứ nhất' : 'first plain description'}
  - ${isVi ? 'mô tả đời thường thứ hai' : 'second plain description'}
summary: ${isVi ? 'Tóm tắt ngắn gọn một câu.' : 'One sentence summary.'}
confusable_notes: {}
follow_up_questions: []
translation: native
---

## ${isVi ? 'Giải thích dễ hiểu' : 'Easy explanation'}
${isVi ? 'Hình ảnh so sánh đời sống thực tế.' : 'Intuitive real world analogy.'}

## ${isVi ? 'Chi tiết' : 'Details'}
${isVi ? 'Cơ chế vận hành và các thành phần chính.' : 'Operational details and mechanics.'}

## ${isVi ? 'Định nghĩa chuyên ngành' : 'Technical definition'}
${isVi ? 'Định nghĩa chuẩn mực chuyên sâu.' : 'Authoritative industry definition.'}

## ${isVi ? 'Ví dụ' : 'Examples'}
${isVi ? 'Ví dụ thực tiễn hoặc số liệu cụ thể.' : 'Practical examples or numerical scenarios.'}
`;
    fs.writeFileSync(path.join(conceptDir, `${loc}.md`), mdContent, 'utf-8');
  }
  return conceptDir;
}

// YAML helpers for the CLI, which has no YAML dependency of its own.
export function parseYaml(text: string): unknown {
  return yaml.load(text);
}

export function dumpYaml(value: unknown): string {
  return yaml.dump(value, { lineWidth: 120 });
}
