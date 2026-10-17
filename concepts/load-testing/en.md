---
label: Load testing
aliases:
  - Performance load testing
loanwords: []
plain_descriptions:
  - testing software by simulating heavy user traffic to verify performance and limits
  - generating artificial requests to measure system responsiveness and breaking points
summary: A non-functional software testing technique that subjects an application or system to simulated concurrent usage to evaluate its throughput, latency, and operational stability.
confusable_notes: {}
follow_up_questions:
  - What is the difference between peak load testing, stress testing, and soak testing?
  - How should test data generation avoid unrealistic cache hits during load simulations?
translation: native
---

## Easy explanation
Like placing heavy concrete blocks onto a new suspension bridge before opening day: engineers drive dozens of loaded cement trucks onto the deck to prove the cables support the weight without cracking.

## Details
Load testing verifies that an application satisfies performance criteria under anticipated operational workloads. Distributed test runners (such as k6, Apache JMeter, or Locust) generate synthetic HTTP requests simulating thousands of concurrent user journeys. Metrics collected include request throughput (requests per second), response time percentiles (p95 and p99 latency), error rates, CPU/memory saturation, and database connection pool contention. It exposes memory leaks, deadlocks, and unindexed database queries before production release.

## Technical definition
A performance verification discipline evaluating software behavior, responsiveness, and resource consumption under predetermined synthetic operational volume thresholds.

## Examples
A retail platform executing a load test generating 15,000 synthetic shopping checkout sessions over 30 minutes, confirming that p99 response times stay below 250 milliseconds with zero server errors.
