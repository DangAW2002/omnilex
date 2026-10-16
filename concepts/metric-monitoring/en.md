---
label: Metric
qualifier: (Monitoring)
aliases:
  - System metric
  - Telemetry metric
loanwords: []
plain_descriptions:
  - a numerical measurement tracked over time to see how busy or healthy a computer system is
  - aggregated statistics like CPU percentage, memory usage, or requests per second
summary: >-
  A quantifiable, aggregated numerical measurement recorded at regular time intervals to evaluate system performance and
  health.
confusable_notes: {}
follow_up_questions:
  - What are the core differences between counter, gauge, and histogram metric types?
  - How does metric aggregation reduce long-term storage requirements compared to raw logs?
translation: native
autolink:
  label: never
---

## Easy explanation
Think of a car speedometer and fuel gauge: numbers updating constantly to show your exact speed and remaining fuel without detailing every tire rotation.

## Details
Metrics compress continuous runtime operations into numerical time-series data. Standard metric primitives include counters (values that only increase, like total request counts), gauges (instantaneous values that fluctuate, like memory usage), and histograms (statistical groupings to calculate percentiles for response times).

## Technical definition
A time-series numeric telemetry signal capturing aggregated quantitative properties of a computing system alongside descriptive label dimensions.

## Examples
Tracking `http_requests_total{status="200"}` at 15-second intervals, showing a steady throughput of 4,200 successful requests per minute.
