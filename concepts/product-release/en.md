---
label: "Release"
qualifier: "(Product)"
aliases: []
loanwords:
  - "release"
autolink:
  label: never
plain_descriptions:
  - "formal deployment and launch of a finished software version to end users"
  - "milestone package combining tested features, bug fixes, and documentation into production"
summary: "The formal deployment and distribution of a production-ready software version to customers alongside associated release notes and assets."
confusable_notes: {}
follow_up_questions:
  - "How do feature flags decouple code deployment from user-facing feature release?"
  - "What operational checks guarantee a zero-downtime production software release?"
translation: native
---

## Easy explanation
Think of a product release like the grand opening night of a theatrical play: scripts have been rehearsed, sets tested, costumes inspected, and tickets sold; the doors officially swing open for audiences to experience the performance.

## Details
A software release represents the culmination of engineering work where tested increments migrate into live customer hands. Releases are uniquely tagged with semantic versions (e.g., v2.4.0) alongside binary artifacts, database migration scripts, and release notes detailing changes. Modern DevOps practices frequently separate technical code deployment from marketing release via feature flags, allowing teams to verify software stability before exposing capabilities to the broader public.

## Technical definition
A discrete milestone in the software life cycle signifying the packaging, validation, and deployment of a stable application build to production environments for customer utilization.

## Examples
A mobile banking team publishes release v4.2 to app stores, providing customers with an updated biometric transfer flow and resolving camera scanner latency bugs.
