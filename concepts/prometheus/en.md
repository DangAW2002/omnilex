---
label: Prometheus
qualifier: (Monitoring)
aliases: []
loanwords: []
plain_descriptions:
  - open-source tool that periodically scrapes and stores performance numbers from servers as time-stamped data
  - monitoring engine that collects metrics using a pull model and lets engineers query them with PromQL
summary: >-
  A telemetry storage platform that collects numeric time-series observations from network endpoints and enables real-time diagnostic querying.
confusable_notes:
  grafana: >-
    Prometheus is a time-series database and metrics scraper with alerting capabilities, whereas Grafana is a visualization front-end that renders dashboards from Prometheus and other data sources.
follow_up_questions:
  - "How does the pull-based scraping model of Prometheus differ from push-based telemetry architectures?"
  - "Why are metric label dimensions powerful for aggregation in PromQL queries?"
translation: native
---

## Easy explanation
Like a meter reader who visits every house on the street at scheduled intervals, writes down the electricity numbers in a ledger, and raises an alarm if a meter spins out of control.

## Details
Prometheus is a graduated Cloud Native Computing Foundation project widely considered the de facto standard for Kubernetes monitoring. It actively discovers target instances and scrapes metric endpoints over HTTP at regular scrape intervals. Data points are recorded with timestamps, metric names, and key-value label pairs in an efficient local time-series database. Users query this data using PromQL (Prometheus Query Language) to calculate rates, percentiles, and aggregations across dimensions. Prometheus includes an alert evaluation engine that dispatches triggered alerts to Alertmanager for routing and notification.

## Technical definition
A multi-dimensional time-series monitoring system and pull-based metrics collector featuring a specialized functional query language named PromQL.

## Examples
Prometheus scrapes metrics from fifty container pods every fifteen seconds, storing CPU usage and request counts with labels identifying service name, region, and environment.
