---
label: Observability
aliases:
  - o11y
loanwords: []
plain_descriptions:
  - understanding what is happening inside a complex system just by looking at its outputs and data
  - the ability to diagnose unknown software problems using telemetry data
summary: >-
  The extent to which the internal states and execution paths of complex software systems can be inferred solely from
  their external telemetry outputs.
confusable_notes: {}
follow_up_questions:
  - How does observability differ fundamentally from traditional threshold-based monitoring?
  - Why are high-cardinality telemetry attributes essential for diagnosing intermittent microservice bugs?
translation: native
---

## Easy explanation
Think of a modern car dashboard combined with an onboard diagnostic computer: a skilled mechanic does not have to disassemble the engine to know which spark plug is misfiring.

## Details
Observability relies on three foundational telemetry signals: metrics (aggregated numerical measurements), logs (timestamped discrete event records), and distributed traces (end-to-end request journeys across services). Together, these signals allow engineers to ask novel, unexpected questions during production outages without redeploying code.

## Technical definition
A property of software architectures indicating how accurately internal operational behavior can be reconstructed via metrics, traces, and structured log events.

## Examples
Using OpenTelemetry collectors to correlate a spike in database query latency with specific user shopping cart requests passing through three microservices.
