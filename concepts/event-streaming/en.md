---
label: Event streaming
aliases:
  - data streaming
loanwords: []
plain_descriptions:
  - continuously capturing and processing digital records the moment an action happens
  - flowing operational updates across software applications without waiting for night-time file exports
summary: The practice of capturing, storing, and analyzing continuous flows of data records in real time as events occur.
confusable_notes: {}
follow_up_questions:
  - Why is event streaming better suited for fraud detection than traditional scheduled batch jobs?
  - How do out-of-order events affect windowing calculations in an event stream?
translation: native
---

## Easy explanation
Like watching live television broadcasts directly as incidents occur, instead of waiting for tomorrow morning's printed newspaper delivery.

## Details
Event streaming treats incoming data as an infinite sequence of immutable events ordered by time. Sources publish state changes (such as card swipes or sensor pings) immediately to durable streaming infrastructure. Stream engines evaluate calculations, detect operational anomalies, or trigger immediate business workflows within milliseconds rather than queuing records for delayed consolidation.

## Technical definition
The continuous, unbounded ingestion, persistence, and low-latency stateful manipulation of timestamped event logs emitted from asynchronous data producers.

## Examples
A ride-hailing company continuously streams driver GPS telemetry every two seconds to calculate nearby passenger pickup estimates in real time.
