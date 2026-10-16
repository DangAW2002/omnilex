---
label: "Definition of Done (DoD)"
aliases:
  - "DoD"
loanwords:
  - "definition of done"
  - "dod"
autolink:
  aliases:
    DoD: always
plain_descriptions:
  - "shared quality checklist that every piece of work must meet before being considered finished"
  - "formal agreement covering code reviews, automated tests, documentation, and deployment steps"
summary: "A formal commitment detailing the technical and quality standards that every product increment must satisfy to be release-ready."
confusable_notes:
  acceptance-criteria: "Definition of Done applies universally across all items in a product backlog, while acceptance criteria apply strictly to an individual user story."
follow_up_questions:
  - "What happens to backlog items that fail to satisfy the Definition of Done by sprint end?"
  - "How does evolving the Definition of Done raise software engineering quality over time?"
translation: native
---

## Easy explanation
Think of the Definition of Done as the rigorous quality inspection at an automobile assembly plant: every vehicle must pass brake tests, paint checks, and emissions standards before leaving the factory, regardless of whether it is a sedan or an SUV.

## Details
The Definition of Done provides transparency by ensuring all team members share an identical understanding of what completion means. A typical DoD specifies mandatory technical gates: peer code reviews completed, automated unit test coverage passing above a target percentage, security scanning cleared, documentation updated, and deployment to staging verified. If an item misses any requirement on this checklist, it cannot be showcased in sprint review or released to end users.

## Technical definition
A formal commitment providing a shared standard of quality criteria that an increment must satisfy to be considered complete and viable for deployment.

## Examples
A fintech squad's DoD dictates: all code reviewed by two peers, 85% test coverage maintained, zero high-severity vulnerability alerts, and staging smoke tests passing.
