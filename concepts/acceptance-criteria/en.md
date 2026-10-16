---
label: "Acceptance criteria"
aliases:
  - "AC"
loanwords:
  - "acceptance criteria"
  - "ac"
autolink:
  aliases:
    AC: always
plain_descriptions:
  - "specific checklist of conditions that a user story must satisfy before being marked complete"
  - "unambiguous rules showing developers and testers exactly how a feature should behave"
summary: "A predefined set of conditions, behaviors, and boundary checks that a specific user story must satisfy to be accepted."
confusable_notes:
  definition-of-done: "Acceptance criteria define specific behavioral requirements unique to an individual story, while Definition of Done establishes overarching engineering standards for all items."
follow_up_questions:
  - "How does structuring criteria in Given-When-Then format aid automated testing?"
  - "Who participates in verifying acceptance criteria during sprint execution?"
translation: native
---

## Easy explanation
Think of acceptance criteria as an inspection checklist before buying a house: the front door lock must work, hot water must run within five seconds, and windows must latch tightly; if any item fails, the key is not handed over.

## Details
Acceptance criteria remove guesswork by setting explicit boundaries for what is in and out of scope for a given work item. They are established collaboratively during backlog grooming or sprint planning before code is drafted. Teams frequently adopt scenario-based formulations such as "Given [context], When [action], Then [expected result]" to clarify user journeys. Quality assurance engineers directly transform these criteria into functional test suites.

## Technical definition
The formal stipulations and functional preconditions that a software deliverable must verify to satisfy the business requirements of the product owner.

## Examples
For a password reset feature: "Given a registered email, when the user requests a reset, then a single-use token valid for 15 minutes is dispatched via email."
