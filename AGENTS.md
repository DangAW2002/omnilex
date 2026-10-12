# AGENTS.md — Rules for AI Agents Working with Termbridge

This file defines the strict operational contract for all autonomous and pair-programming AI agents interacting with the Termbridge repository.

## 1. Context Consumption Protocol (Progressive Disclosure)

- **Always read indexes first:** When answering questions or doing lookups, inspect `indexes/<locale>/<domain>.md` or `indexes/<locale>/_all.md` first.
- **Do not open raw concept files blindly:** Only read a specific concept folder (`concepts/<id>/`) after identifying the target ID from the index.
- **Check for homonyms:** For terms with multiple meanings, consult `indexes/<locale>/_homonyms.md` before resolving the concept.

## 2. Contribution & Authoring Rules

- **Use the skill workflow:** When adding new terms, follow `skills/termbridge-author/SKILL.md`.
- **Status constraint:** Concepts drafted by AI agents MUST ALWAYS have:
  ```yaml
  status: draft
  provenance:
    drafted_by: ai
  ```
- **NO SELF-PROMOTION OF STATUS:** Agents MUST NEVER set or upgrade `status` to `reviewed` or `verified`. Only human domain reviewers specified in `config/reviewers.yaml` may approve and promote status.
- **Immutability of Concept IDs:** Once a concept `id` is published, it MUST NEVER be renamed or modified. If labels change, update the `label` in language files.
- **No deletion:** Concepts must never be deleted from `concepts/`. If a concept is merged or retired, set `status: deprecated` and provide `replaced_by: <new-id>`.
- **Qualifier requirement:** If multiple concepts share the same `label` within a locale, each must declare a distinctive `qualifier` (e.g., `qualifier: (AI)`).

## 3. Tooling & Build Integrity

- **Never edit generated files by hand:** Do NOT edit files under `indexes/`, `dist/`, or `llms.txt` directly. Run `pnpm tb build` to regenerate them deterministically from `concepts/`, `taxonomy/`, and `config/`.
- **Always validate before finishing:** Run `pnpm tb validate` (or `pnpm tb validate --strict`) to ensure all 13 integrity rules pass cleanly.
