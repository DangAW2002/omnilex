---
label: Stream processing
aliases:
  - streaming computation
loanwords: []
plain_descriptions:
  - analyzing and calculating data on the fly as individual pieces arrive
  - computing live business statistics continuously without stopping to bundle files
summary: The continuous ingestion and real-time computation of data records directly as they are generated.
confusable_notes:
  batch-processing: Stream processing computes records continuously one by one or in micro-batches with millisecond latency, whereas batch processing computes large historic datasets periodically in scheduled jobs.
follow_up_questions:
  - What is the difference between tumbling windows and sliding windows in streaming analytics?
  - How do streaming frameworks enforce exactly-once processing semantics during worker crashes?
translation: native
---

## Easy explanation
Like filtering and testing water directly from a flowing river pipe continuously, rather than scooping bucketfuls once every morning to inspect them in a lab.

## Details
Stream processing engines maintain in-memory state to execute aggregations, filtering, joining, and pattern matching across unbounded event data. They manage stateful checkpoints and watermarks to account for network delays and out-of-order records, delivering calculated metric outputs to downstream databases within fractions of a second.

## Technical definition
A computing paradigm designed to perform stateful or stateless operations on continuous, unbounded event data streams under strict low-latency requirements.

## Examples
A telecom company analyzes mobile cell tower connection logs on the fly to detect drop-call spikes within three seconds of tower outages.
