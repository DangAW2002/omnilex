---
label: Sharding
aliases:
  - database sharding
  - horizontal partitioning
loanwords: []
plain_descriptions:
  - splitting a massive database table across multiple separate computers so it can handle huge traffic
  - dividing customer records across server A, B, and C based on user ID regions
summary: A database architecture pattern that horizontally partitions a single logical dataset across multiple independent physical database instances.
confusable_notes:
  database-replication: Sharding splits distinct subsets of data horizontally across separate nodes, whereas replication copies the identical dataset to multiple replica nodes.
follow_up_questions:
  - How does picking an improper shard key lead to hot-spotting bottlenecks in distributed clusters?
  - How do cross-shard joins and distributed transactions impact query latency?
translation: native
---

## Easy explanation
Instead of storing millions of paper documents inside one giant filing cabinet that is bursting at the seams, you buy ten smaller cabinets and put surnames A-C in cabinet 1, D-F in cabinet 2, and so forth.

## Details
Sharding distributes rows according to a sharding key (such as tenant ID, region, or hash range). Each independent database shard contains a unique partition of the overall dataset, enabling systems to scale write operations and storage capacity linearly beyond single-machine limits.

## Technical definition
A horizontal data partitioning strategy wherein subsets of a schema's rows reside across autonomous server nodes sharing neither memory nor persistent storage.

## Examples
Storing users with IDs 1 to 1,000,000 on Database Shard 1 and users 1,000,001 to 2,000,000 on Database Shard 2.
