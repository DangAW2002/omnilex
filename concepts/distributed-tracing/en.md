---
label: Distributed tracing
aliases:
  - Request tracing
  - APM tracing
loanwords: []
plain_descriptions:
  - following a single user request as it travels across dozens of microservices to pinpoint where delays occur
  - a map showing the exact path and timing of an operation through connected servers
summary: >-
  A monitoring method that tracks the lifecycle of an execution request as it travels across multiple networked services
  and processes.
confusable_notes: {}
follow_up_questions:
  - How does context propagation using W3C Trace Context headers link spans across network calls?
  - What sampling strategies ensure tracing captures edge-case latency without overloading storage?
translation: native
---

## Easy explanation
Think of a registered courier parcel tracking number: as the box passes through local couriers, sorting hubs, and customs, each facility scans it and logs the exact timestamp and location.

## Details
When an incoming request reaches an API gateway, tracing libraries attach a unique trace ID and span ID via HTTP headers. As downstream microservices, databases, and message queues process the request, each service reports its local span timing. Tracing visualization tools assemble these spans into a directed call graph (waterfall view), revealing exact bottlenecks.

## Technical definition
An end-to-end telemetry workflow that correlates causal request timing across distributed process boundaries using contextual metadata propagation.

## Examples
A trace showing that a user checkout request took 1,200 ms total, with 950 ms spent waiting for an external payment gateway REST call inside the billing service.
