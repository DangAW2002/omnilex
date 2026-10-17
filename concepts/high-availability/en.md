---
label: High availability (HA)
aliases:
  - HA
loanwords: []
autolink:
  aliases:
    HA: always
plain_descriptions:
  - building systems that stay online and accessible almost all the time without downtime
  - continuous service uptime achieved through redundant components and auto-recovery
summary: A system design characteristic ensuring operational performance and accessibility over extended periods by minimizing unplanned downtime through redundancy and fault tolerance.
confusable_notes:
  disaster-recovery: High availability focuses on eliminating single points of failure to withstand routine local hardware faults with minimal interruption, whereas disaster recovery focuses on restoring operations after catastrophic regional disruptions.
follow_up_questions:
  - What mathematical availability target does "four nines" (99.99%) uptime translate to annually?
  - How do active-active deployments differ from active-passive setups in achieving high availability?
translation: native
---

## Easy explanation
Like a twin-engine passenger airplane: if one engine experiences a sudden mechanical failure mid-flight, the second engine automatically carries the flight safely to its destination.

## Details
High Availability (HA) measures the percentage of time a system remains operational and accessible under agreed service levels. Achieving high availability requires eliminating single points of failure across every infrastructure tier, deploying redundant instances across independent physical availability zones, configuring health probes, and orchestrating automated failover. Availability is often expressed in nines: 99.9% (three nines) permits roughly 8.76 hours of yearly downtime, whereas 99.99% (four nines) allows only 52.6 minutes.

## Technical definition
An engineering standard and system attribute guaranteeing continuous operational uptime through redundant topologies, fault isolation boundaries, and rapid automated failover.

## Examples
A digital banking portal distributed across 3 distinct cloud availability zones with multi-master database replication, delivering 99.99% uptime throughout the year.
