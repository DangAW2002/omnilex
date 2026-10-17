---
label: Eventual consistency
aliases:
  - optimistic consistency
loanwords: []
plain_descriptions:
  - a promise that all database copies will match eventually if no new edits are made
  - a design where your friend might see your social post a few seconds after you hit publish
summary: A consistency model used in distributed computing where all replicas of a data item will eventually converge to the same value given sufficient time without new updates.
confusable_notes:
  acid: Eventual consistency trades away immediate ACID read consistency to achieve high availability and low write latency across distributed clusters.
follow_up_questions:
  - How do conflict-free replicated data types (CRDTs) resolve conflicting concurrent updates in eventually consistent stores?
  - Why is eventual consistency acceptable for social media like counts but inappropriate for banking account ledgers?
translation: native
---

## Easy explanation
Like rumors spreading through a town: not everyone hears the news at the exact same minute, but given a few hours without new gossip, everybody in town eventually knows the exact same story.

## Details
Eventual consistency is a relaxed consistency model widely used in distributed AP databases (such as DynamoDB and Cassandra). When an update is accepted by one replica node, it asynchronously propagates updates to peer nodes in the background. While temporary read discrepancies exist during synchronization windows, the cluster guarantees that all replicas converge to an identical state once message replication finishes.

## Technical definition
A theoretical consistency model ensuring that, in the absence of new write operations, all distributed replica nodes will eventually synchronize and return the latest committed value.

## Examples
A video streaming site updates a video view counter using an eventually consistent model; viewers in different countries see slightly different view counts for two seconds until background replication syncs the total.
