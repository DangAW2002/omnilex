---
label: Alerting
aliases: []
loanwords: []
plain_descriptions:
  - mechanism that pages or notifies engineers when system metrics cross danger thresholds
  - automated notification system turning telemetry data into urgent action items for on-call teams
summary: >-
  The automated process of evaluating metrics and logs against rules to notify human operators when unexpected conditions occur.
confusable_notes: {}
follow_up_questions:
  - "Why should alerting focus on symptom-based customer impact rather than noisy internal component causes?"
  - "How does alert deduplication and grouping prevent on-call notification fatigue during major incidents?"
translation: native
---

## Easy explanation
Like a home security system that detects broken glass or smoke and rings the alarm bell while dialing the monitoring station, instead of waiting for someone to smell the smoke.

## Details
Alerting systems continuously scan incoming metric time-series and log entries against predefined mathematical expressions and thresholds. When an expression evaluates to true for a required duration (for example, error rate exceeding 1% for over three consecutive minutes), the system generates an alert. Modern alerting engines like Prometheus Alertmanager group similar alerts, silence alerts during planned maintenance, and route urgent pages to on-call engineers via platforms such as PagerDuty or Slack. Effective alerting emphasizes actionable events that directly impair end-user experience while suppressing non-critical informational noise.

## Technical definition
An automated telemetry evaluation subsystem that fires structured notifications when monitored metrics violate specified condition boundaries over sustained time windows.

## Examples
An alerting rule fires when HTTP 500 server error responses exceed five percent of total traffic over a five-minute window, immediately paging the primary on-call engineer.
