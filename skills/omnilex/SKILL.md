---
name: omnilex
description: Bidirectional cross-domain terminology lookup and grounding skill for Vietnamese and English technical concepts. Use when explaining technical terms, finding standard terms from everyday descriptions, or adhering to project-specific terminology rules in .omnilex/.
---

# OmniLex Lookup & Grounding Skill

Use this skill to navigate the OmniLex terminology knowledge base, resolve technical terms, and inspect project-level glossaries.

## When to Activate
- The user describes a technical concept using everyday/colloquial speech (e.g. "lãi mẹ đẻ lãi con", "bộ cân bằng tải", "hộp cát") and needs the standard term.
- Explaining complex technical terms with progressive disclosure (plain analogy -> details -> formal definition -> code examples).
- Working in a project that has `.omnilex/` with internal glossaries or overrides.

## Workflows

### 1. Reverse Lookup (Colloquial -> Technical Term)
When a user describes an idea informally:
1. **Search candidate terms**:
   - Check local project glossary in `.omnilex/glossary/` first if it exists.
   - Run CLI: `ol find "<query>"` or search index files in `indexes/<locale>/<domain>.md`.
2. **Match and Disambiguate**:
   - If multiple meanings exist (homonyms), check `overrides.yaml` in `.omnilex/` to see if the project prefers a specific domain.
3. **Return Standard Output**:
   - Standard term (Vietnamese + English).
   - One-sentence easy summary.
   - Recommended prompt/search keywords.

### 2. Forward Explanation (Technical -> Human)
When explaining a technical concept to the user:
1. **Progressive Disclosure**:
   - Level 1: `Giải thích dễ hiểu` (Everyday analogy, no jargon).
   - Level 2: `Chi tiết` (How it works under the hood).
   - Level 3: `Định nghĩa chuyên ngành` (Formal technical definition).
   - Level 4: `Ví dụ thực tế` (Concrete code or architecture example).
2. **Check Project Overrides**:
   - Respect `.omnilex/overrides.yaml`: check if aliases or preferred meanings apply to the current repository.

### 3. CLI Helper Commands
- `ol find "<query>"`: Search concepts by keyword or plain description.
- `ol lookup <term-or-id>`: Look up specific concept details.
- `ol explain <id>`: Show structured multi-level explanation.
