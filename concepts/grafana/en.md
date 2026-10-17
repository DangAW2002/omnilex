---
label: Grafana
aliases: []
loanwords: []
plain_descriptions:
  - web interface with charts and graphs showing how busy and healthy your servers are in real time
  - visualization platform that turns database metrics and logs into interactive dashboards
summary: >-
  An open-source analytics and interactive visualization web application that displays metrics, logs, and traces through unified dashboards.
confusable_notes:
  prometheus: >-
    Grafana is an analytics and visualization platform that connects to multiple data sources, whereas Prometheus is the underlying metrics storage and scraping backend.
follow_up_questions:
  - "How does connecting multiple heterogeneous data sources into one Grafana panel assist root cause analysis?"
  - "What advantages do templated dashboard variables provide for monitoring multi-tenant infrastructure?"
translation: native
---

## Easy explanation
Like the high-tech instrument panel in a car dashboard: it does not generate the engine speed or fuel level, but it displays clear dials and graphs so the driver can see everything at a glance.

## Details
Grafana is a leading open-source visualization and dashboarding platform. It connects to dozens of diverse data backends including Prometheus, InfluxDB, Elasticsearch, PostgreSQL, and cloud monitoring services without requiring users to migrate data into a proprietary repository. Users build panels featuring time-series graphs, heatmaps, gauges, bar charts, and geo maps arranged into interactive dashboards. Grafana supports dynamic variables that let operators filter views by cluster, region, or customer ID. Additionally, Grafana includes alert evaluation features that send notifications when graph lines breach designated visual thresholds.

## Technical definition
A multi-source data visualization, exploration, and operational dashboarding platform supporting interactive analytics across distributed telemetry engines.

## Examples
An operations room displays a large Grafana dashboard combining live CPU graphs from Prometheus with real-time error logs streamed from Elasticsearch on a single screen.
