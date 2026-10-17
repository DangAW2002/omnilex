---
label: Recovery Point Objective (RPO)
aliases:
  - RPO
loanwords: []
autolink:
  aliases:
    RPO: always
plain_descriptions:
  - maximum amount of transactional data measured in time that a business can tolerate losing
  - age of the most recent usable backup required after recovering from a disaster
summary: The maximum acceptable age of data files or transactions that must be recovered from backup storage for normal operations to resume if a computer system crashes.
confusable_notes:
  rto: RPO specifies the maximum duration of lost transactional data that can be tolerated, whereas RTO specifies how long it takes to restore operational systems back online.
follow_up_questions:
  - How does synchronous database replication achieve an RPO of zero compared to periodic asynchronous snapshots?
  - What network latency constraints limit zero-RPO data replication across geographically distant regions?
translation: native
---

## Easy explanation
Like saving progress while writing a novel: if your computer battery dies unexpectedly, an RPO of 10 minutes means auto-save ran frequently enough that you lose at most the last 10 minutes of typing.

## Details
Recovery Point Objective (RPO) dictates the maximum tolerable data loss measured backwards in time from a disruption event to the most recent recoverable data checkpoint. If a database is backed up once every 4 hours, the operational RPO is 4 hours, meaning any records committed between the last backup and the crash are permanently destroyed. Achieving a low RPO (such as near-zero) requires transaction-log shipping, write-ahead log replication, or multi-region synchronous database writes.

## Technical definition
A disaster-recovery parameter specifying the maximum allowable age of valid persisted state that can be restored from secondary storage following a system failure.

## Examples
A stock brokerage establishing an RPO of 5 seconds, using continuous synchronous log replication so that in the event of an unplanned primary database failure, no more than 5 seconds of trade executions could ever be lost.
