# Contributing to Termbridge

Thank you for contributing to Termbridge! We welcome contributions from both human domain specialists and AI agent workflows.

## Workflow for Adding Concepts

1. **Check for duplicates:**
   Review existing entries in `indexes/vi/_all.md` and `indexes/en/_all.md`.
2. **Scaffold a new concept:**
   Use the `tb` CLI to generate the template:
   ```bash
   pnpm tb new <concept-id> --domain <domain/path> --locales vi,en
   ```
3. **Fill in concept metadata & content:**
   - Edit `concepts/<concept-id>/concept.yaml`.
   - Write localized explanations in `vi.md` and `en.md` following [docs/style-guide.vi.md](docs/style-guide.vi.md) and [docs/style-guide.en.md](docs/style-guide.en.md).
   - Provide at least 2 `plain_descriptions` in each language.
4. **Validate and build:**
   ```bash
   pnpm tb validate --strict
   pnpm tb build
   pnpm tb report collisions   # homonyms need qualifiers and two-way confusable links
   pnpm tb check overlap       # no 8+ word runs copied from paraphrase-only sources
   ```
   Spreadsheet authors can also send a CSV: `pnpm tb import --from csv terms.csv --into concepts/` creates drafts (`drafted_by: import`) to review like any other.
5. **Open a Pull Request:**
   Submit a PR keeping each batch under ~20 concepts to facilitate thorough review.

## Review Stages

| Status | Meaning | Conditions |
|---|---|---|
| `draft` | Initial draft, not yet peer reviewed | Must pass `tb validate` |
| `reviewed` | Verified by a domain contributor | At least 2 `plain_descriptions`, accurate examples, correct confusable links |
| `verified` | Confirmed by verified domain specialist | Must list citations in `sources`, reviewed by registered reviewer |
| `deprecated` | Merged or retired concept | Must provide `replaced_by` if merged |

All PRs run `tb validate` in GitHub Actions.
