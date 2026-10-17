---
label: Telemetry
aliases: []
loanwords:
  - "telemetry"
plain_descriptions:
  - automated collection and remote transmission of sensor measurements to a monitoring station
  - continuous stream of operational readings emitted by field hardware across a network
summary: The automated process of collecting operational metrics and status measurements from remote points and transmitting them across communications channels for monitoring and analysis.
confusable_notes: {}
follow_up_questions:
  - How do time-series databases scale to store high-frequency telemetry streams from distributed hardware fleets?
  - What data serialization formats (e.g., Protocol Buffers, CBOR) minimize network payload overhead for telemetry?
translation: native
---

## Easy explanation
Telemetry is like a real-time health tracker for remote machinery: instead of sending an engineer with a clipboard to read gauges in the desert or atop a wind turbine, the equipment automatically transmits its vitals across the network every few seconds.

## Details
Telemetry architectures involve data sampling at the edge, local timestamping, numerical quantization, and serialization over protocols like MQTT, CoAP, or HTTP. In high-density fleets, continuous transmission creates substantial bandwidth costs, motivating edge filtering techniques such as deadband compression (only publishing when a value shifts beyond a threshold) and batching. Receiving cloud pipelines ingest telemetry through streaming event brokers into distributed time-series databases for real-time alerting and historical trending.

## Technical definition
The highly automated transmission of empirical operational measurements and status data from remote or inaccessible sources to receiving equipment for recording and diagnostic evaluation.

## Examples
An electric vehicle transmitting battery cell temperatures, instantaneous motor current, and state of charge every two seconds over cellular telemetry pipelines to fleet management servers.
