---
label: Failover
aliases:
  - Automated failover
loanwords: []
plain_descriptions:
  - automatically switching to a backup server when the main server crashes
  - seamless transfer of traffic to redundant resources upon primary failure
summary: An operational procedure that automatically or manually redirects processing tasks and network traffic to a redundant standby system upon failure of the primary component.
confusable_notes: {}
follow_up_questions:
  - How do split-brain scenarios occur during automated failovers, and how does quorum prevent them?
  - What is the difference between warm standby and hot standby failover mechanisms?
translation: native
---

## Easy explanation
Like a hospital emergency electrical generator: the split second the municipal power grid goes dark, an automatic transfer switch fires up the diesel backup generator to keep surgical lights on.

## Details
Failover ensures operational continuity by migrating active workloads to secondary standby resources when the primary host becomes unresponsive. In a database cluster, health monitoring agents issue periodic heartbeats; when consecutive heartbeats fail, a consensus algorithm promotes a read-only replica to become the new read-write primary. Automated DNS routing or virtual IP reallocation updates traffic paths within seconds. Engineers must guard against split-brain scenarios where both nodes believe they are the primary by utilizing distributed consensus quorums.

## Technical definition
A fault-recovery protocol that transitions operational execution and connection endpoints from an active component to a standby system upon verified health degradation.

## Examples
A primary relational database server suffering a sudden kernel panic, prompting the consensus cluster to promote a hot standby replica to master within 15 seconds without data loss.
