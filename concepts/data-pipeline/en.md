---
label: Data pipeline
aliases: []
loanwords: []
plain_descriptions:
  - an automated series of steps moving information from where it is created to where it is used
  - software plumbing that pumps live data from user clicks into analytics systems
summary: An automated sequence of processes that ingests, processes, and transfers raw data from source systems to destination storage.
confusable_notes: {}
follow_up_questions:
  - How does stream processing in data pipelines differ fundamentally from batch processing?
  - What orchestrator tools are commonly used to manage directed acyclic graph dependencies in data pipelines?
translation: native
---

## Easy explanation
Like an automated municipal water system that draws water from a reservoir, passes it through purification and filtration plants, and pumps it reliably to kitchen taps.

## Details
Data pipelines can run in batch mode or real-time streaming mode using streaming brokers like Kafka. They handle schema validation, rate limiting, retry logic, and monitoring to ensure data flows reliably across disparate architectural components without human intervention.

## Technical definition
An end-to-end automated computational workflow encompassing the extraction, streaming or batch transport, transformation, and storage of digital data assets.

## Examples
Streaming user clickstream events through Apache Kafka, transforming them with Apache Flink, and writing the enriched records to Amazon S3.
