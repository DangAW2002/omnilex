---
label: Replication
qualifier: (Database)
aliases:
  - database replication
  - read replica
loanwords: []
autolink:
  label: never
plain_descriptions:
  - copying database records automatically to backup servers so the system survives hardware failures
  - syncing data across multiple database copies so heavy user reads don't slow down writes
summary: The continuous electronic copying of data from one database server to one or more replica servers to ensure high availability and read scalability.
confusable_notes:
  sharding: Replication duplicates the same data across multiple servers to improve availability and read speed, whereas sharding partitions different rows across distinct nodes to scale storage and writes.
follow_up_questions:
  - How does replication lag in asynchronous setups lead to stale reads for web clients?
  - What automated mechanisms handle primary failover and replica promotion during an outage?
translation: native
---

## Easy explanation
Like having a carbon copy receipt book where whatever you write on the top sheet automatically duplicates onto the pages underneath, ensuring you have backup copies if the original gets lost.

## Details
In typical primary-replica configurations, all write transactions hit a primary node, which streams transaction logs (wal logs or binlogs) to read replicas either synchronously or asynchronously. If the primary fails, a replica can be promoted to prevent downtime.

## Technical definition
A distributed system synchronization process that replicates data transactions from a source database to target databases to maintain state equivalence.

## Examples
Setting up two read replicas in PostgreSQL to handle analytical reporting queries while the primary instance handles live transaction inserts.
