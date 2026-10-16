---
label: Rollback
aliases:
  - Deployment rollback
  - Release reversion
loanwords: []
plain_descriptions:
  - quickly switching back to the previous working version of software when a new release has critical bugs
  - reverting a deployment to restore system stability after an update causes failures
summary: >-
  The operational action of reverting an application, configuration, or database deployment to a previously verified
  stable release.
confusable_notes: {}
follow_up_questions:
  - How do backward-incompatible database schema migrations complicate rollback operations?
  - What automated metric thresholds should trigger an automated emergency rollback?
translation: native
---

## Easy explanation
Think of taking one step backward onto firm ground when you test a rickety wooden bridge and hear a crack.

## Details
When a new release introduces unexpected regressions, high latency, or crashes in production, teams initiate a rollback. This redirects user traffic back to existing stable replicas or deploys the previous release revision from version control. Modern platforms retain revision histories to execute rollbacks in seconds without rebuilding code.

## Technical definition
A remediation procedure reinstating a prior deployment revision, configuration state, or artifact baseline to recover operational availability.

## Examples
After a mobile app backend release spikes 500 error rates to 15%, automated monitoring triggers a rollback to the previous image tag within 90 seconds.
