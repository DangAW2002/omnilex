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

## 4. Build Packs (`dist/manifest.json`, `dist/packs/<pack-id>/`)

`tb build` splits the built data into packs (Plan 3.2, decision D5). Packs are generated artifacts: never edit them by hand. JSON schemas: `schema/manifest.schema.json`, `schema/pack.schema.json`.

**Pack ids.** A concept belongs to exactly one content pack, chosen by its primary domain (`domains[0]`):

| Primary domain | Pack id | Rule |
|---|---|---|
| `it/ai-ml/llm-agents` | `it.ai-ml` | Level-2 branch (default `packing: branch`) |
| `it` | `it.core` | Concept tagged at the root of a split domain |
| `iot/edge-cloud/gateways` | `iot` | Root kept whole (`packing: root` in `config/domains.yaml`) |

Secondary domains that fall in other packs are listed in each card's `alsoIn`. Meta-packs carry only `requires`: one per split root (`it`, `finance`, …) and `tech` (= `it` + `iot` + `product`). Only packs with at least one concept are emitted; a pack above 2,000 concepts produces a build warning.

**Layout.**

```
dist/manifest.json                       # formatVersion, searchConfigHash, locales, packs[], search
dist/<locale>/search-index.json          # MiniSearch index over every content pack
dist/packs/<pack-id>/pack.json           # descriptor; meta-packs have only this file
dist/packs/<pack-id>/<locale>/terms.json        # tier "terms": one entry per concept key, not merged
dist/packs/<pack-id>/<locale>/cards.json        # tier "cards": label, qualifier, summary, plain_descriptions, aliases, loanwords, domains, alsoIn, level, status
dist/packs/<pack-id>/<locale>/search-index.json # tier "search": MiniSearch.toJSON() for this pack
dist/packs/<pack-id>/<locale>/explanations.jsonl # tier "explanations": one concept per line, no local file paths
```

**`pack.json` fields.** `id`, `version` (repository version), `formatVersion`, `kind` (`content` | `meta`), `title` (per locale), `domains`, `locales`, `requires` (pack id → semver range), `concepts`, `status` (count per status), `tiers` (content packs only: per tier `bytes`, `files.<locale>.{bytes, sha256}`, and `configHash` for `search`), `license`.

**Readers.** CLI, MCP and site read packs through `PackStore` (`packages/core/src/pack-reader.ts`), which takes an I/O adapter and uses no Node APIs:

- Search uses the combined `dist/<locale>/search-index.json` when every content pack is selected, so ranking matches a single corpus; a subset (`tb find --pack …`) searches the shards of those packs.
- Key merging across packs (`mergeTerms`) and the "no autolink for a key with several concepts" rule run at load time.
- `formatVersion` 1 is read; a missing manifest means the legacy flat layout (`dist/<locale>/search.json`, version 0); a newer version is skipped with one notice.
- A search index whose `configHash` differs from the current search configuration is rebuilt from `cards.json`, with one notice.

## 5. Project Configuration (`.termbridge/`)

Layered configuration, lockfile and shared store (Plan 3.3-3.4). Readers resolve it through `openProject` (`packages/core/src/project.ts`), the same code for CLI, MCP and the Claude Code mod.

| File | Committed | Purpose |
|---|---|---|
| `.termbridge/config.yaml` | Yes | Project layer. `root: true` stops the upward search. |
| `.termbridge/config.local.yaml` | No | Personal layer on top of the project. |
| `.termbridge/lock.json` | Yes | Exact store copies: `version`, `sha256` of `pack.json`, `store` directory, and the sha256 of every tier file per locale. |
| `.termbridge/.cache/` | No | Search indexes built for a subset of packs. |
| `$TERMBRIDGE_HOME/config.yaml` | – | User layer (default `~/.termbridge`). |
| `$TERMBRIDGE_HOME/store/<id>@<version>-<sha8>/` | – | Installed packs, read-only, shared by all projects. |
| `$TERMBRIDGE_HOME/projects.json` | – | Projects whose locks `tb pack prune` keeps. |

Config keys: `root`, `locale`, `fallbackLocales`, `profile` (`lite` \| `standard` \| `semantic`), `packs` (`+id[@range]`, `-id`, `id`, `dev:<dist dir>`; `local:<dir>` is reserved for WP7), `packsReset`, `tiers.explanations` (`eager` \| `lazy` \| `remote` \| `off`), `tiers.vectors`, `limits.memoryMB`, `limits.diskMB`, `autoInstall`, `registries`, `overrides`. Unknown keys and invalid values are warnings.

Resolution: meta-packs expand through `requires` (semver `^`, `~`, comparators, `x`/`*`); a dev build wins over the store; lockfile pins win inside the range; a dependency cycle is an error; missing packs are listed once and the rest load. With no `packs` anywhere, every installed or built content pack is used (D3); the mod then asks before loading 2,000 concepts or more.

Load plan per profile: `lite` loads terms and cards; `standard` adds the search index (eager for CLI/MCP, on first search in the mod) and lazy explanations. Over `limits.memoryMB` (estimated from `pack.json` byte counts: terms and cards ×3, search ×2, explanations ×1.5) the plan degrades in order: explanations lazy, search on first use, then the lowest-priority packs are dropped; every step is reported.

## 6. Exchange Formats

**`.tbpack`** is a zip of one pack directory: `pack.json` at the root, `attributions.json`, and `<locale>/{terms.json,cards.json,search-index.json,explanations.jsonl}`. Importing refuses anything else: names outside that list, `..`, absolute or drive paths, backslashes, symlink and directory entries, encrypted or ZIP64 entries, entries over 64 MB or packages over 256 MB, sizes that differ from the headers (zip bombs), a `pack.json` that fails `schema/pack.schema.json`, files not declared in `pack.json`, wrong sha256 or byte counts, malformed JSON, and a file sha256 that differs from the registry or lockfile. Files are unpacked into a temporary store directory and renamed into place only after every check.

**`attributions.json`** (in every content pack, hashed in `pack.json`): one entry per `reuse: adapt` source the pack's concepts draw on: `ref`, `title`, `publisher`, `url`, `license`, `license_evidence`, `concepts`.

**`registry.json`**: `{ registryVersion: 1, name?, official?, packs: { <id>: { versions: { <version>: { url, sha256, bytes, formatVersion } } } } }`; `url` may be relative to the registry. Lockfile entries installed from a registry or a `.tbpack` record it as `origin`.

**CSV** (one row per concept and locale with its own content): `id, locale, label, qualifier, aliases, loanwords, plain_descriptions, summary, domains, level, body, locale_extra, concept_extra`. Lists are separated by ` | `; `locale_extra` and `concept_extra` hold the remaining frontmatter and concept metadata as JSON so a round trip loses nothing. Importing into `concepts/` writes `status: draft` and `provenance: { drafted_by: import }` and refuses concepts without sources (rule 17) or without label, summary and plain descriptions.

**TBX-Basic** (ISO 30042, `urn:iso:std:iso:30042:ed-2`): `conceptEntry` (id) with `descrip type="subjectField"` per domain; `langSec` per locale with `descrip type="definition"` (summary) and `termSec` per term: the label as `preferredTerm-admn-sts`, aliases and loanwords as `admittedTerm-admn-sts` (loanwords with `<note>loanword</note>`). Those fields round-trip.

**JSONL**: one JSON object per CSV row, for ML/RAG pipelines.

**Overlay** (`.termbridge/overrides.yaml`, or the `overrides` config key): `concepts.<id>.autolink` (`always` | `never` | `auto`), `concepts.<id>.aliases.<locale>` (`+alias` adds, `-alias` removes), `exclude` (ids hidden in the project), `prefer` (key → id for homonyms). Applied when packs load; explanations never change.

**Local glossary**: `packs: [local:<dir>]` builds `<dir>` (concept folders as in `concepts/`) into `.termbridge/.cache/local/<name>/` as pack `local.<name>`, again whenever a file in `<dir>` changes. The mod reads the built copy only.
