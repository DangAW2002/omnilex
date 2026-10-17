---
label: CAP theorem
aliases:
  - Brewer's theorem
loanwords: []
plain_descriptions:
  - a fundamental rule stating distributed systems can only provide two out of consistency, availability, and partition tolerance
  - the reality that when cloud networks get cut, a database must choose between giving fresh answers or staying online
summary: A fundamental principle of distributed computing stating that a distributed data store can simultaneously provide at most two out of three guarantees, Consistency, Availability, and Partition tolerance.
confusable_notes: {}
follow_up_questions:
  - Why is partition tolerance mandatory for any distributed system operating over real physical networks?
  - How does the PACELC theorem extend CAP by modeling latency and consistency tradeoffs during normal operation?
translation: native
---

## Easy explanation
Think of three friends sharing a synchronized calendar over cellphones. If cell towers go down (network partition), they can either refuse to make appointments to avoid double-booking (Consistency), or keep writing appointments independently risking calendar conflicts later (Availability).

## Details
Formulated by Eric Brewer, the theorem defines three attributes: Consistency (every read receives the most recent write or an error), Availability (every non-failing node returns a non-error response), and Partition Tolerance (the system functions despite arbitrary network message drops). Because physical network disconnections are inevitable in distributed environments, architects must decide whether to favor CP (strict consistency) or AP (high availability) during partitions.

## Technical definition
A distributed computing theorem stating that in the presence of a network partition, a distributed data store must trade off either strong linearizable consistency or high availability.

## Examples
During a cross-datacenter fiber optic cut, a CP database rejects user writes to prevent split-brain conflicts, while an AP system accepts writes locally and reconciles records after reconnecting.
