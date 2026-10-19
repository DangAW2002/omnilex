# Termbridge

Termbridge is an open-source, multilingual, cross-domain terminology repository designed to help non-specialists and AI systems communicate with precision.

Priority languages: **Vietnamese (`vi`)** and **English (`en`)**.  
Priority domains: **Finance (`finance`)**, **Media (`media`)**, and **IT (`it`)**.

## Two-Way Terminology Navigation

Termbridge serves two core bidirectional workflows on a single underlying knowledge base:

1. **Human → AI (Reverse Lookup):** You understand the concept in everyday words ("money earned generates its own interest") but lack the exact term. Termbridge resolves it to the authoritative concept ("compound interest" / "lãi kép") so you can prompt AI systems with precision.
2. **AI → Human (Forward Lookup):** An AI model responds with unfamiliar industry jargon. Termbridge breaks it down across progressive disclosure layers (plain explanation, technical definition, prerequisites, confusable distinctions, and follow-up prompts).

## Core Principles

- **Concepts over words:** The primary entity is a concept (`id`), not a word. One concept has localized labels across languages and can belong to multiple domains.
- **Language-neutral data separated from locale text:** Metadata, relationships, domains, and difficulty live in `concept.yaml`. Explanations live in language files (`vi.md`, `en.md`).
- **Plain text in Git is the single source of truth:** YAML and Markdown files are human-readable without specialized tooling.
- **Single source, two outputs:** AI agents consume structured markdown indexes (`indexes/`) and skills; humans use the web app (`packages/site`).
- **Visible provenance & credibility:** Every concept is explicitly tagged with verification status (`draft`, `reviewed`, `verified`, `deprecated`).
- **Deterministic tooling:** The `tb` CLI runs strictly without runtime AI calls; drafting is performed via AI agent skills.

## Quick Start

### Installation

Requires Node.js >= 20 and pnpm 11.22.0:

```bash
pnpm install
```

### CLI Commands

```bash
# Validate data rules
pnpm tb validate

# Run validation with strict mode (warnings treated as errors)
pnpm tb validate --strict

# Build indexes, graph, and web distribution artifacts
pnpm tb build

# Reverse lookup (plain words -> concept)
pnpm tb find "tiền lãi lại sinh ra lãi" --locale vi

# Search only some packs (pack ids are listed in dist/manifest.json)
pnpm tb find "token" --locale en --pack it.ai-ml,finance

# Forward lookup (explain a concept)
pnpm tb show compound-interest --locale vi

# Ambiguous term: list meanings, then choose an exact ID
pnpm tb show Token --locale vi
pnpm tb show id:token-llm --locale vi

# Reporting
pnpm tb report locales
pnpm tb report review
```

### Packs and project configuration

`tb build` splits the data into packs, one per level-2 domain (`it.ai-ml`, `finance.investing`, …), plus meta-packs such as `it`, `finance` and `tech`. Each machine, workspace or project picks the packs it needs:

```yaml
# .termbridge/config.yaml (commit it; personal tweaks go in .termbridge/config.local.yaml)
root: true            # stop looking further up, like .editorconfig
locale: vi
profile: standard     # lite: terms and cards only | standard: + search, lazy explanations
packs: [+tech, -it.security]
limits: { memoryMB: 64 }
```

Layers, lowest first: built-in defaults, `~/.termbridge/config.yaml` (or `$TERMBRIDGE_HOME`), every `.termbridge/config.yaml` from the top down to the current directory, `.termbridge/config.local.yaml`, then the session (`--pack`, `TERMBRIDGE_PACKS`, `/termbridge packs`). Single values from a higher layer win, `packs` adds and removes in order (`packsReset: true` starts over), and `limits` keeps the smallest value.

```bash
pnpm tb config explain                      # effective values and where each one comes from
pnpm tb pack add finance --from ./dist      # install into ~/.termbridge/store and record .termbridge/lock.json
pnpm tb pack list                           # what this project loads
pnpm tb pack status                         # tiers, size and load time per pack
pnpm tb pack remove finance.economics
pnpm tb pack install --frozen               # CI: fail unless the store matches lock.json
pnpm tb pack prune                          # delete store copies no project uses
```

Installed packs live once per machine in `~/.termbridge/store/` and are shared by every project. Inside this repository, `.termbridge/config.yaml` reads `dev:./dist` straight from `pnpm tb build`.

### Sharing, importing and project glossaries

```bash
pnpm tb pack export it.ai-ml -o ai-ml.tbpack                       # one pack as a .tbpack (zip)
pnpm tb pack export --domain it/ai-ml --locales vi,en --tiers terms,cards,search -o ai-ml-lite.tbpack
pnpm tb pack export --effective -o team.tbpack                     # exactly what this project loads, overlay included
pnpm tb pack add ./team.tbpack                                     # or https://…/x.tbpack; every file is checked
pnpm tb registry build ./out --base-url https://example.org/packs  # .tbpack files plus registry.json
pnpm tb export --format csv -o terms.csv                           # also tbx (TBX-Basic) and jsonl
pnpm tb import --from csv terms.csv --into concepts/               # always status: draft, drafted_by: import
pnpm tb import --from tbx glossary.tbx --into .termbridge/glossary/
```

- **Registries**: list them under `registries:` in a config file (URL, `file:` URL or path). `tb pack add <id>@<range>` installs from them when no dist provides the pack; packs from a registry that does not declare `official: true` are unofficial.
- **Project glossary**: concepts in `.termbridge/glossary/<id>/` (same format as `concepts/`) plus `packs: [local:./.termbridge/glossary]` become the pack `local.glossary`, rebuilt whenever the files change.
- **Overlay** `.termbridge/overrides.yaml` changes recognition and display for one project, never explanations:

```yaml
concepts:
  model: { autolink: never }
  token-llm: { aliases: { vi: ["+token AI"] } }
exclude: [cookie]
prefer:
  token: token-llm
```

`tb overlay propose` drafts the matching `concepts/` changes to contribute upstream. The Claude Code mod ships only the `starter` pack (about 300 basic concepts, ≤ 1 MB) for use before any pack is installed.

## Repository Structure

- `concepts/`: Authority concepts and localized explanations.
- `taxonomy/`: Hierarchical domain trees (`finance.yaml`, `media.yaml`, `it.yaml`).
- `config/`: Locale and domain configuration.
- `schema/`: JSON Schemas for validation.
- `indexes/`: Fast-lookup markdown indexes consumed by AI agents.
- `skills/`: Agent skills for querying and authoring terms.
- `packages/core`: Core parser, validation rules, index builder, and query engine.
- `packages/cli`: `tb` CLI implementation.
- `packages/site`: Astro web application.
- `packages/mcp`: Model Context Protocol server.
- `packages/claude-mod`: Claude Code terminal UI adapter.

To browse the terminology locally, run `pnpm build`, then `pnpm site` and open `http://localhost:4321/` (leave the search box empty and pick a domain to list every concept). In Claude Code, `/termbridge browse` opens the same domain browser in a pane.

To use the Claude Code mod, see [its setup guide](packages/claude-mod/README.md).

## License

- Code: [MIT](LICENSE)
- Content: [Creative Commons Attribution 4.0 International (CC BY 4.0)](LICENSE-CONTENT)
