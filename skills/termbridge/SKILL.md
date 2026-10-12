---
name: termbridge
description: Bidirectional cross-domain terminology lookup skill for human-to-AI reverse lookup and AI-to-human forward explanation.
---

# Termbridge Lookup Skill

Use this skill to navigate the Termbridge terminology knowledge base with minimal token consumption.

## Lookup Workflows

### 1. Reverse Lookup (Human → AI)
**Scenario:** The user describes an idea in colloquial words ("tiền lãi lại sinh ra lãi") and needs the precise terminology to query AI systems effectively.

1. **Identify domain and target locale:** Determine candidate domain (`finance`, `media`, `it`) and target language (e.g. `vi`, `en`).
2. **Scan the index:** Read `indexes/<locale>/<domain>.md` or `indexes/<locale>/_all.md`.
3. **Select 1 to 3 matching candidates:** Match colloquial descriptors in the index to user's phrasing.
4. **Open localized concept file:** Read `concepts/<id>/<locale>.md`.
5. **Output response structure:**
   - **Term:** Localized label and qualifier (if any).
   - **One-sentence summary:** Plain definition.
   - **Confusable terms:** Note any easily confused concepts.
   - **Prompt recommendation:** Formulate a suggested prompt the user can submit to AI models.
   - **Provenance note:** Indicate the review status (`draft`, `reviewed`, `verified`).

### 2. Forward Lookup (AI → Human)
**Scenario:** A technical term is encountered and the user needs an accessible, progressive explanation.

1. **Check index for homonyms:** Consult `indexes/<locale>/_homonyms.md` to detect if the label has multiple meanings across domains.
2. **Read concept:** Read `concepts/<id>/<locale>.md`.
3. **Progressive disclosure:** Start with `## Giải thích dễ hiểu` (plain analogy). Provide technical definitions and examples only when requested.
4. **Prerequisites & Confusables:** Mention prerequisite concepts if foundational context is missing.

### 3. Graceful Fallbacks
- If a term is missing in Termbridge: State clearly that it is not yet registered. Offer an informal definition without fabricating official citations.
