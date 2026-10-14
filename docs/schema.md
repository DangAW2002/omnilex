# Termbridge Data Schema Reference

This document describes the schema specifications for all canonical files in the Termbridge repository.

## 1. Concept Definition (`concepts/<id>/concept.yaml`)

Each concept is stored in a flat directory under `concepts/` using its immutable kebab-case identifier.

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | string | Yes | Unique identifier matching regex `^[a-z0-9]+(?:-[a-z0-9]+)*$`, max 48 characters, strictly matching directory name. |
| `domains` | string[] | Yes | 1 to 4 hierarchical taxonomy paths (e.g. `finance/personal-finance/saving`). The first element is the primary domain. |
| `level` | integer (1, 2, 3) | Yes | Difficulty: 1 (basic), 2 (intermediate), 3 (advanced). |
| `relations.prerequisites` | string[] | No | Concept IDs that must be understood prior to this concept. Must form a DAG (no cycles). |
| `relations.broader` | string[] | No | Broader parent concepts. |
| `relations.narrower` | string[] | No | Narrower child concepts. |
| `relations.confusable` | string[] | No | Confusable concepts (symmetric relationship recommended). |
| `relations.related` | string[] | No | Other related concepts. |
| `status` | enum | Yes | `draft` \| `reviewed` \| `verified` \| `deprecated`. |
| `provenance` | object | Yes | Audit metadata: `drafted_by`; `reviewed_by` and `reviewed_at` are required for `reviewed` or `verified`. Reviewers must be listed for every domain in `config/reviewers.yaml`. |
| `sources` | (string \| object)[] | Yes | Structured evidence entries referencing `config/sources.yaml` (`ref`, `locator`, `title`, `language`, `accessed`, `supports`, `quote`, `archive`). String URLs are supported for backward compatibility and can be migrated using `tb sources migrate`. |
| `replaced_by` | string | No | Concept ID pointing to replacement when deprecated. |

## 2. Localized Content (`concepts/<id>/<locale>.md`)

Frontmatter:
| Field | Type | Required | Purpose |
|---|---|---|---|
| `label` | string | Yes | Standard terminology in locale. |
| `qualifier` | string | Conditional | Disambiguation note when labels collide across concepts (e.g. `(AI)`). |
| `aliases` | string[] | No | Synonyms, acronyms. |
| `loanwords` | string[] | No | Foreign terms commonly retained in spoken language. |
| `plain_descriptions` | string[] | Yes | Everyday phrasing used for reverse lookups (at least 2 recommended). |
| `summary` | string | Yes | Single-sentence explanation. |
| `confusable_notes` | map[string, string] | No | Explaining distinctions against confusable concept IDs. |
| `follow_up_questions` | string[] | No | High-value prompt queries for AI assistants. |
| `translation` | enum | No | `native` \| `translated` \| `machine`. |
| `translated_from` | string | Conditional | Source language code (mandatory when `translation: translated`). |
| `translated_by` | string | Conditional | Translator identifier (mandatory when `translation: translated`). |
| `translated_at` | string | No | Date of translation (YYYY-MM-DD). |
| `autolink` | object | No | Explicit linking decisions: `label: always \| never \| auto`, `aliases: { [alias]: always \| never \| auto }`. |
| `label_evidence` | object[] | Conditional | Citations supporting non-loanword Vietnamese labels differing from English (`ref`, `locator`, `accessed`, `note`). |
| `sources` | (string \| object)[] | No | Locale-specific sources. |

Body Sections:
- `## Giải thích dễ hiểu` / `## Easy explanation`
- `## Chi tiết` / `## Details`
- `## Định nghĩa chuyên ngành` / `## Technical definition`
- `## Ví dụ` / `## Examples`

## 3. The 18 Integrity Rules

1. Schema validation passes for all `concept.yaml`, `taxonomy/*.yaml`, `config/*.yaml`, and `<locale>.md`.
2. Concept `id` must be kebab-case, at most 48 characters, matching the folder name.
3. Every declared domain path must exist in the taxonomy.
4. Prerequisite, broader, narrower, and confusable references must point to existing concept IDs.
5. Prerequisites must form a Directed Acyclic Graph (DAG) with no circular dependencies.
6. Concept must provide content in at least one primary locale.
7. Status `reviewed` requires an authorized human reviewer listed in `config/reviewers.yaml`.
8. Committed generated files (`indexes/`, `llms.txt`) must strictly match source data.
9. Homonyms (identical labels in the same locale) must declare a distinctive `qualifier`.
10. Confusable relationships must be reciprocal (symmetric).
11. `reviewed` concepts should have at least 2 `plain_descriptions`.
12. Concepts should provide translations in all primary locales.
13. Concepts should define at least one relationship (no orphan concepts).
14. Every `sources[].ref` must exist in `config/sources.yaml` with `locator`, `accessed`, and `language`.
15. Non-loanword Vietnamese labels differing from English must provide `label_evidence`.
16. `quote` in sources must not exceed 30 words, and cannot be used with `reuse: cite-only` sources.
17. Source tier requirements by status: `draft` ≥ 1 source, `reviewed` ≥ 1 tier A/B source supporting definition, `verified` ≥ 2 independent sources with at least one tier A source.
18. Entries with `translation: translated` must declare `translated_from` and `translated_by`.
