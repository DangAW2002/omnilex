---
label: Recovery Time Objective (RTO)
aliases:
  - RTO
loanwords: []
autolink:
  aliases:
    RTO: always
plain_descriptions:
  - maximum acceptable duration a system can be down following a disaster
  - target time limit within which business services must be fully restored
summary: The maximum acceptable length of time that a system, application, or service can remain offline following a disaster or disruption before intolerable business damage occurs.
confusable_notes:
  rpo: RTO measures the duration of downtime acceptable before systems are restored, whereas RPO measures the span of time before a disaster during which lost transactional data is tolerated.
follow_up_questions:
  - How does aiming for near-zero RTO drive the technical requirement for active-active multi-region architectures?
  - What business impact analysis metrics dictate the RTO tiers for different software services?
translation: native
---

## Easy explanation
Like a restaurant generator timer: if the kitchen freezer loses power, the manager has at most 2 hours to get cooling back online before the frozen meat spoils and must be thrown away.

## Details
Recovery Time Objective (RTO) represents the clock duration calculated between the declaration of a disaster and the full restoration of normal service. Defined during business impact analysis, RTO guides engineering architecture: an RTO of 24 hours can be satisfied by restoring nightly tape backups onto fresh cloud servers, whereas an RTO of under 60 seconds mandates redundant standby clusters with automated DNS failover. Breaching RTO targets exposes organizations to steep regulatory fines, contractual SLA penalties, and customer churn.

## Technical definition
A target service metric specifying the permissible duration of elapsed time between operational interruption and the verified resumption of service availability.

## Examples
A payment platform establishing a strict RTO of 15 minutes, requiring automated health checks to redirect card transactions to a warm standby data center within a quarter of an hour of any major regional failure.
