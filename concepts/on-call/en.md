---
label: On-call
aliases:
  - On-call rotation
  - On-call duty
loanwords: []
plain_descriptions:
  - being available outside normal hours to respond immediately if production software breaks
  - the scheduled shift where an engineer carries the alert pager and fixes critical outages
summary: >-
  An operational duty rotation where designated engineers remain available to receive alerts and remediate critical production incidents outside or during standard working hours.
confusable_notes: {}
follow_up_questions:
  - How do sustainable on-call shifts cap paging volume to prevent engineering burnout?
  - What secondary escalation paths guarantee response if a primary on-call engineer sleeps through a page?
translation: native
---

## Easy explanation
Like emergency room doctors or firefighters on a scheduled night shift: they may be resting, but the moment the alarm sounds, they must suit up and act immediately.

## Details
Engineering organizations establish on-call rotations to maintain high availability around the clock. Automated alert systems (like PagerDuty or Opsgenie) route high-priority alerts to the primary on-call engineer via phone call or SMS. SRE best practices mandate actionable alerts with runbooks, time compensation, and a clear escalation chain to secondary engineers.

## Technical definition
A scheduled operational standby rotation responsible for initial triage, escalation, and technical mitigation of automated paging alerts for live services.

## Examples
An SRE receives an automated phone alert at 2:00 AM because database replication lagged over 60 seconds, triaging and resolving the lock contention within ten minutes.
