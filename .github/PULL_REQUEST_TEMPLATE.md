## Summary of Changes

- **Target Domain:** 
- **Concepts Added/Modified:**
- **Validation Status:** `tb validate --strict` passed cleanly

## Checklist
- [ ] Conforms to schema specifications (`schema/*.json`)
- [ ] Follows style guidelines (`docs/style-guide.*.md`)
- [ ] At least 2 `plain_descriptions` provided per concept
- [ ] No circular dependencies in `relations.prerequisites`
- [ ] Bidirectional links added for any `confusable` relationships
- [ ] Ran `pnpm tb build` to ensure `indexes/` and `llms.txt` are up-to-date
