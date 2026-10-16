---
label: "Feature flag"
aliases:
  - "Feature toggle"
loanwords: []
plain_descriptions:
  - "a software switch that turns a feature on or off without deploying new code"
  - "a configuration toggle allowing gradual rollout of features to specific users"
summary: "A software engineering technique that enables or disables functionality remotely at runtime through configuration without altering and redeploying source code."
confusable_notes:
  {}
follow_up_questions:
  - "What governance strategies prevent temporary feature flags from turning into lingering technical debt?"
  - "How do release toggles differ from permission toggles or experimentation toggles in production?"
translation: native
---

## Easy explanation
A light switch on the wall: the electrical wiring is already installed inside the wall, but you can turn the light on or off whenever you choose.

## Details
Feature flags (also called feature toggles) decouple code deployment from feature release. Engineers merge unfinished or risky code behind a conditional flag, enabling canary releases, A/B testing, and instant kill switches if problems emerge. Flag values can be adjusted via central configuration dashboards without requiring application restarts or build pipelines.

## Technical definition
A dynamic control mechanism in software architecture implementing conditional branches evaluated against runtime context to alter program capabilities dynamically.

## Examples
An e-commerce platform enables a new checkout layout for only 5% of incoming traffic to evaluate conversion metrics before rolling it out universally.
