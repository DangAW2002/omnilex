---
label: Circuit breaker
qualifier: (Software)
aliases:
  - Circuit breaker pattern
loanwords: []
plain_descriptions:
  - automatic switch stopping calls to failing services to prevent system crashes
  - safety mechanism tripping requests when remote dependencies become unresponsive
summary: A design pattern that prevents an application from repeatedly attempting an operation likely to fail, tripping to fail fast and recovering automatically when healthy.
confusable_notes: {}
follow_up_questions:
  - How does the half-open state determine when a downstream dependency has recovered?
  - What metrics should trigger an immediate trip of the circuit breaker?
translation: native
---

## Easy explanation
Just like an electrical fuse box in your home: when a circuit overheats or shorts, the switch trips immediately to cut the current and prevent an electrical fire in the walls.

## Details
When remote services fail or experience high latency, calling threads accumulate waiting for timeouts, exhausting thread pools and triggering cascading system-wide crashes. A circuit breaker tracks failures within a sliding time window. In the Closed state, calls pass normally. When failure rates cross a configured threshold (such as 50% errors), it transitions to Open, immediately failing future calls with fallback responses. After a reset timeout, it enters Half-Open, allowing a trial batch of requests through to verify recovery.

## Technical definition
A fault-tolerance state machine wrapping remote operations to monitor failure frequencies, enforce rapid shedding of unhealthy dependencies, and facilitate graceful degradation.

## Examples
A checkout service encountering a 60% timeout rate on a third-party shipping quotation API trips its circuit breaker to open, immediately displaying cached flat rates to 800 waiting shoppers.
