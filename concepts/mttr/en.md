---
label: Mean time to recovery (MTTR)
aliases:
  - MTTR
loanwords:
  - mean time to recovery
  - mttr
autolink:
  aliases:
    MTTR: always
plain_descriptions:
  - average amount of time it takes a team to fix a broken system and restore service
  - key operations metric showing how quickly production outages are detected and repaired
summary: >-
  A core operations metric representing the average time required to troubleshoot, fix, and restore a failed system to full functionality.
confusable_notes: {}
follow_up_questions:
  - "Why do automated rollbacks and feature flags lower MTTR more effectively than debugging in production?"
  - "How does tracking MTTR over time reflect the maturity of an organization incident response process?"
translation: native
---

## Easy explanation
Like tracking how many minutes an auto repair shop takes on average from the moment a flat tire arrives until the car rolls safely back out on the road.

## Details
Mean time to recovery (frequently called mean time to restore or MTTR) measures the speed and efficacy of an organization incident response lifecycle. The clock begins when an unexpected outage or performance degradation begins and ends when full service functionality is restored to users. MTTR spans four key operational phases: detection, triage, mitigation, and verification. While achieving zero failures in distributed cloud architectures is practically impossible, elite engineering teams prioritize driving MTTR down through automated alerts, canary rollbacks, comprehensive runbooks, and self-healing infrastructure.

## Technical definition
An operational reliability metric calculating the arithmetic mean duration between the occurrence of a service failure and the complete restoration of acceptable service operation.

## Examples
Over three production outages lasting twelve, eighteen, and thirty minutes in a quarter, the engineering team recorded an average MTTR of twenty minutes.
