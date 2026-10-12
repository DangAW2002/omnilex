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

Requires Node.js >= 20 and pnpm >= 9:

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

# Forward lookup (explain a concept)
pnpm tb show compound-interest --locale vi

# Reporting
pnpm tb report locales
pnpm tb report review
```

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

## License

- Code: [MIT](LICENSE)
- Content: [Creative Commons Attribution 4.0 International (CC BY 4.0)](LICENSE-CONTENT)
