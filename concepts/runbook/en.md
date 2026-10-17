---
label: Runbook
aliases: []
loanwords: []
plain_descriptions:
  - step-by-step checklist telling engineers how to troubleshoot and resolve a specific system alert
  - operational guide documenting routine maintenance tasks and emergency recovery procedures
summary: >-
  A documented set of routine procedures and emergency instructions used by operators to handle system maintenance and incident responses.
confusable_notes: {}
follow_up_questions:
  - "Why should monitoring alerts link directly to a dedicated and up-to-date runbook?"
  - "How can operational teams transition static Markdown runbooks into automated remediation scripts?"
translation: native
---

## Easy explanation
Like the emergency checklist in an airplane cockpit: when a warning light turns red, the crew does not guess; they open the manual to that exact page and follow step-by-step instructions.

## Details
A runbook documents the standard operating procedures required to diagnose, mitigate, and resolve specific operational problems. In modern SRE teams, every paging alert is expected to include a direct hyperlink to its corresponding runbook. The guide typically lists the symptoms of the failure, verification steps to confirm the root cause, immediate mitigation commands to restore customer service, escalation pathways, and rollback procedures. Well-maintained runbooks lower the cognitive load on tired on-call engineers waking up at night and serve as the blueprint for automating repetitive manual steps with scripts.

## Technical definition
A standardized operational document outlining prescriptive diagnostic, escalation, and remediation steps for specific system maintenance tasks or service alerts.

## Examples
An alert for database connection pool exhaustion includes a runbook link instructing the on-call engineer how to identify idle zombie connections and safely kill them via a management CLI.
