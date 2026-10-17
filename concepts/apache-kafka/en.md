---
label: Apache Kafka
aliases:
  - Kafka
loanwords: []
autolink:
  aliases:
    Kafka: always
plain_descriptions:
  - a distributed software platform that records continuous streams of records across multiple servers
  - an enterprise real-time message bus that stores event history reliably and replays events on demand
summary: A distributed event streaming platform used for high-throughput data pipelines, streaming analytics, and system integration.
confusable_notes: {}
follow_up_questions:
  - How does Kafka achieve high sequential write throughput using an append-only commit log on disk?
  - What is the difference between consumer groups and individual partitions in Kafka scaling?
translation: native
---

## Easy explanation
Think of a central delivery dispatch board where drivers write down every parcel dispatched in chronological order. Multiple branch offices can read from this shared board at their own speed without erasing past notes.

## Details
Kafka organizes event records into topics partitioned across broker clusters for fault tolerance and parallelism. Producers append immutable records with timestamped offsets to specific partitions. Consumers track their progress independently by updating partition offset markers, enabling parallel consumption and historical replay without loading message payloads into broker RAM.

## Technical definition
A horizontally scalable, distributed publish-subscribe messaging log architecture that persists ordered byte records to partitioned disks with configurable replication and retention policies.

## Examples
An e-commerce marketplace uses Kafka to ingest 15,000 checkout notifications per second, allowing inventory services and analytics pipelines to process each transaction independently.
