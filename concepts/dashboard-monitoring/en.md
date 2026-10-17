---
label: Dashboard
qualifier: (Monitoring)
aliases: []
loanwords: []
autolink:
  label: never
plain_descriptions:
  - single visual screen combining real-time gauges, graphs, and indicators about system health
  - centralized console displaying operational metrics so engineers can assess infrastructure status at a glance
summary: >-
  A visual interface that consolidates and presents real-time telemetry metrics and system statuses on a single screen for rapid operational evaluation.
confusable_notes: {}
follow_up_questions:
  - "What are the core visual signals that should always appear above the fold on an operations dashboard?"
  - "Why does dashboard clutter impair an engineer ability to diagnose critical outages quickly?"
translation: native
---

## Easy explanation
Like the master flight control screen in an airport terminal showing arriving flights, gate statuses, and weather warnings all on one giant board.

## Details
An operations dashboard is a web-based visual interface designed to summarize the health and performance of distributed software infrastructure. Dashboards assemble disparate metrics—such as latency percentiles, error rates, request throughput, and hardware saturation—into graphs, tables, gauges, and status lights. Best practices emphasize displaying the four golden signals (latency, traffic, errors, and saturation) prominently at the top. Well-designed dashboards allow on-call engineers to visually correlate sudden traffic spikes with rising database latency during incidents, accelerating triage and root cause discovery.

## Technical definition
A consolidated visual user interface aggregating real-time telemetry feeds into structured graphical panels for system health appraisal.

## Examples
A primary operations dashboard displays request throughput, p99 latency graphs, active container counts, and server error rates for an online banking portal.
