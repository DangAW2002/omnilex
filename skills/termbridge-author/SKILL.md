---
name: termbridge-author
description: Guidelines and workflow for AI agents authoring new terminology concepts in Termbridge.
---

# Termbridge Authoring Skill

Follow this standardized procedure when creating new terminology entries in Termbridge.

## Authoring Procedure

### 1. Scope & De-duplication Check
1. Read `indexes/<locale>/_all.md` to ensure the concept does not already exist under another synonym or alias.
2. If the label already exists with another meaning in the same locale, designate a new unique ID with a distinguishing suffix (e.g. `token-auth`, `token-llm`) and provide distinctive `qualifier` strings (e.g. `(AI)`, `(Bảo mật)`).

### 2. Scaffold New Concept
Run the CLI generator:
```bash
pnpm tb new <kebab-case-id> --domain <domain/subdomain/leaf> --locales vi,en
```

### 3. Complete Concept Metadata (`concepts/<id>/concept.yaml`)
- Assign appropriate difficulty `level` (1, 2, or 3).
- Connect existing concept IDs in `relations.prerequisites`, `relations.confusable`, and `relations.related`.
- Ensure confusable relations are bidirectional.
- Ensure prerequisite references form an acyclic graph (no cycles).
- Set provenance:
  ```yaml
  status: draft
  provenance:
    drafted_by: ai
  ```
  *(Agents must NEVER set status to reviewed or verified).*

### 4. Author Localized Content (`vi.md`, `en.md`)
- Provide at least 2 distinct `plain_descriptions`.
- Adhere to the layered section hierarchy:
  - `## Giải thích dễ hiểu`
  - `## Chi tiết`
  - `## Định nghĩa chuyên ngành`
  - `## Ví dụ`

### 5. Validate & Build
```bash
pnpm tb validate --strict
pnpm tb build
```
Verify zero errors before opening a pull request.
