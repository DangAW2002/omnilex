---
name: omnilex-author
description: Guidelines and procedure for AI agents to author and manage internal project terminology in .omnilex/glossary/ or contribute new concepts to OmniLex.
---

# OmniLex Authoring Skill

Use this skill when the user asks to add an internal company/project term, define a new technical concept, or update project overrides.

## 1. Adding Internal Project Terms (`.omnilex/glossary/`)

When asked to document an internal term for the current project/repository:

1. **Create Directory**:
   ```text
   .omnilex/glossary/<concept-id>/
   ├── concept.yaml
   └── vi.md (and optionally en.md)
   ```

2. **Author `concept.yaml`**:
   ```yaml
   id: <kebab-case-id>
   domain: <domain/subdomain>
   level: 1 # 1 (basic), 2 (intermediate), 3 (advanced)
   labels:
     vi: <Tên tiếng Việt>
     en: <English Name>
   aliases:
     vi: ["<viết tắt>", "<từ lóng nội bộ>"]
     en: ["<abbreviation>"]
   status: draft
   provenance:
     drafted_by: ai
   ```

3. **Author Content (`vi.md` / `en.md`)**:
   Include standard sections:
   - `## Giải thích dễ hiểu`: Plain analogy for team onboarding.
   - `## Chi tiết`: Architecture, flow, and components.
   - `## Định nghĩa chuyên ngành`: Rigorous definition.
   - `## Ví dụ`: Concrete usage in this codebase.

4. **Add to Project Config (`.omnilex/config.yaml`)**:
   Ensure `packs` includes `"local:./glossary"`:
   ```yaml
   packs:
     - "local:./glossary"
   ```

## 2. Configuring Project Overrides (`.omnilex/overrides.yaml`)

Use overrides to tailor recognition for the current project:
- **`exclude`**: Hide global terms that conflict with project naming.
- **`prefer`**: Pin homonyms to the project's domain (e.g. `cookie: it/web/cookie`).
- **`aliases`**: Map team-specific slang/abbreviations to standard concepts.
