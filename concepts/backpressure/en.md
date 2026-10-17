---
label: Backpressure
aliases:
  - Flow control
  - Back-pressure
loanwords: []
plain_descriptions:
  - signaling a fast sender to slow down so a slower receiver does not crash
  - mechanism where downstream consumers tell producers how much data they can accept
summary: A flow-control mechanism in asynchronous software pipelines where downstream consumers signal their capacity upstream to prevent producers from overwhelming them with data.
confusable_notes: {}
follow_up_questions:
  - How does credit-based flow control differ from buffer-dropping strategies under sustained backpressure?
  - How do reactive streams specifications formalize subscriber demand signaling through request calls?
translation: native
---

## Easy explanation
Like a kitchen sink drain: if you turn the water faucet on at maximum blast and the pipe below drains slowly, the basin overflows onto the floor unless you turn down the faucet handle to match the drain rate.

## Details
In asynchronous processing pipelines, fast data producers (such as high-speed network sockets) can easily outpace downstream consumers (such as slow disk writes or database inserts). Uncontrolled buffering leads to OutOfMemory crashes or massive latency queues. Backpressure introduces a feedback loop: downstream consumers signal their capacity upstream using credit tokens, pull-based requests, or rate throttling. If consumer buffers fill, upstream publishers pause or drop low-priority records until downstream capacity recovers.

## Technical definition
A feedback flow-control protocol in asynchronous communication topologies that prevents memory exhaustion by coupling consumer capacity to producer emission rates.

## Examples
A video encoding pipeline where a downstream transcoding worker requests batches of 5 raw frames at a time from a camera ingest stream, ensuring memory buffers never overflow during compute-heavy frames.
