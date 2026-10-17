---
label: Time-series database
aliases:
  - TSDB
autolink:
  aliases:
    TSDB: always
loanwords: []
plain_descriptions:
  - a database designed specifically to track measurements changing over seconds, hours, and days
  - specialized software built for continuous sensor readings, stock ticks, and computer CPU graphs
summary: A database optimized for storing, querying, and analyzing sequences of data points indexed in chronological order.
confusable_notes: {}
follow_up_questions:
  - How do specialized time-series compression algorithms like Gorilla delta-of-delta compress timestamps efficiently?
  - What are data retention policies and downsampling rollups in long-term metric storage?
translation: native
---

## Easy explanation
Like a continuous paper roll inside an earthquake seismograph or a doctor's heart monitor: constantly recording new measurements second by second on a moving chronological timeline.

## Details
Time-series databases (TSDBs) are optimized for workloads characterized by continuous write-heavy append streams, timestamp-based indexes, and queries requesting range aggregations over time windows. They utilize specialized compression algorithms (such as delta-of-delta timestamp encoding and XOR floating-point compression) and automatic downsampling policies to compact historical data into lower resolutions as it ages.

## Technical definition
A database system optimized for the high-frequency ingestion, time-indexed partition storage, downsampling retention, and sliding-window aggregation of timestamped telemetry data.

## Examples
An IoT solar energy company uses a time-series database to ingest voltage and temperature readings from 200,000 solar panels every five seconds, graphing production trends instantly.
