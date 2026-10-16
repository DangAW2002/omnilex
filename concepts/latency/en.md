---
label: Latency
qualifier: (Network)
aliases:
  - Network latency
  - Round-trip time
loanwords: []
plain_descriptions:
  - the time delay between sending a request and receiving the answer back over a network
  - how long you wait for a website or server to respond after clicking
summary: The time delay incurred for data to travel across a network from its source to its destination and return.
confusable_notes:
  throughput: >-
    Latency measures the time elapsed for a single request to travel and complete, whereas throughput measures the total volume of requests or data handled per unit of time.
follow_up_questions:
  - Why do percentile metrics (like p95 and p99) give a far more accurate latency picture than simple averages?
  - How does geographical distance and physical speed of light impose a hard physical limit on internet latency?
translation: native
---

## Easy explanation
Like the delay when speaking on a long-distance telephone call: you finish saying "hello", and there is a noticeable split-second pause before your friend hears you and replies.

## Details
Latency encompasses packet transmission time, network routing delays, queuing time in network buffers, and server processing duration. In distributed architectures, latency is measured at different percentiles (such as median p50, 95th percentile p95, and 99th percentile p99) to capture tail latencies experienced by the slowest user requests.

## Technical definition
The duration of time elapsed between the transmission of a network packet or request and the receipt of its corresponding acknowledgment or payload.

## Examples
A database query resolving with a p99 latency of 14 milliseconds, meaning 99 out of every 100 queries return in 14 ms or less.
