---
label: Postmortem
qualifier: (IT)
aliases:
  - Incident retrospective
  - Post-incident review
loanwords: []
plain_descriptions:
  - a written report created after a major outage to understand what happened and prevent it from recurring
  - a blameless analysis of a system failure explaining the timeline, causes, and action items
summary: >-
  A structured, blameless written analysis document reviewing a production incident to identify root causes and assign
  preventative action items.
confusable_notes: {}
follow_up_questions:
  - Why is psychological safety and a blameless culture critical for honest postmortems?
  - How do engineering managers ensure that action items from postmortems actually get implemented?
translation: native
---

## Easy explanation
Think of an aviation accident investigation report: the team analyzes the flight recorder not to punish the pilot, but to redesign cockpit controls so no pilot makes that mistake again.

## Details
A postmortem document details the incident timeline, user impact (downtime duration, lost transactions), underlying root causes, resolution steps, and what went well or poorly during triage. A cornerstone of modern DevOps is "blameless" culture: failures are viewed as learning opportunities caused by systemic and tooling deficiencies rather than human incompetence.

## Technical definition
A formal post-incident inquiry artifact documenting chronological event telemetry, systemic contributing factors, and prioritized remediation backlog items.

## Examples
After a 45-minute search outage, the team publishes a postmortem revealing a missing database index, creating tasks to add automated query performance linters.
