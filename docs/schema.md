# Termbridge Data Schema Reference

This document describes the schema specifications for all canonical files in the Termbridge repository.

## 1. Concept Definition (`concepts/<id>/concept.yaml`)

Each concept is stored in a flat directory under `concepts/` using its immutable kebab-case identifier.

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | string | Yes | Unique identifier matching regex `^[a-z0-9-]+$`, max 48 characters, strictly matching directory name. |
| `domains` | string[] | Yes | 1 to 4 hierarchical taxonomy paths (e.g. `finance/personal-finance/saving`). The first element is the primary domain. |
| `level` | integer (1, 2, 3) | Yes | Difficulty: 1 (basic), 2 (intermediate), 3 (advanced). |
| `relations.prerequisites` | string[] | No | Concept IDs that must be understood prior to this concept. Must form a DAG (no cycles). |
| `relations.broader` | string[] | No | Broader parent concepts. |
| `relations.narrower` | string[] | No | Narrower child concepts. |
| `relations.confusable` | string[] | No | Confusable concepts (symmetric relationship recommended). |
| `relations.related` | string[] | No | Other related concepts. |
| `status` | enum | Yes | `draft` \| `reviewed` \| `verified` \| `deprecated`. |
| `provenance` | object | Yes | Audit metadata: `drafted_by`, optional `reviewed_by`, `reviewed_at`. |
| `sources` | string[] | Conditional | Mandatory when `status` is `verified`. |
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

Body Sections:
- `## Giải thích dễ hiểu` / `## Easy explanation`
- `## Chi tiết` / `## Details`
- `## Định nghĩa chuyên ngành` / `## Technical definition`
- `## Ví dụ` / `## Examples`
