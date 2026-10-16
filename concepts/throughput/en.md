---
label: Throughput
aliases:
  - System throughput
  - Network throughput
  - Requests per second
loanwords: []
plain_descriptions:
  - the total amount of work or data a computer system can process in one second
  - the volume of web requests or megabytes moving through a service over time
summary: >-
  The rate at which a computer system, communication channel, or application successfully processes and delivers data or
  transactions per unit of time.
confusable_notes:
  latency: >-
    Throughput indicates how much work the system processes per second, whereas latency indicates how long any
    individual transaction takes from start to finish.
follow_up_questions:
  - How does Little’s Law mathematically link concurrency, latency, and throughput in queuing theory?
  - At what point does exceeding maximum throughput cause latency to degrade exponentially due to queuing?
translation: native
---

## Easy explanation
Picture water streaming through a wide plumbing pipe: throughput reflects the gross volume of liquid exiting the spout each minute, regardless of how quickly individual droplets travel.

## Details
Throughput measures capacity and velocity in distributed systems. It is commonly quantified as requests per second (RPS), transactions per second (TPS), or megabits per second (Mbps). While latency tells you how fast an individual operation is, throughput reveals the total load the system can sustain before processing buffers saturate.

## Technical definition
A quantitative rate metric defining the volume of successful processing operations, messages, or bytes transferred over a specified time interval.

## Examples
A distributed message broker achieving a sustained throughput of 250,000 published messages per second under peak streaming load.
