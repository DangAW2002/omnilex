---
label: Error budget
aliases: []
loanwords: []
plain_descriptions:
  - allowed amount of downtime or failed requests a service can have before engineers must freeze new releases
  - the mathematical cushion between 100% perfection and an agreed reliability objective
summary: >-
  The maximum acceptable amount of service unreliability or downtime permitted by a Service Level Objective during a given time window.
confusable_notes: {}
follow_up_questions:
  - "What governance policies should take effect when a team completely exhausts its error budget for the month?"
  - "Why does striving for 100% uptime create counter-productive business costs compared to adopting an error budget?"
translation: native
---

## Easy explanation
Like spending money from an allowance: you are given a specific amount of budget to spend on fun risks; if you spend it all early in the month, you cannot buy anything new until next month.

## Details
Introduced in Google Site Reliability Engineering, an error budget is simply 100% minus the agreed Service Level Objective (SLO) over a measurement window like thirty days. For example, a service targeting a 99.9% availability SLO has a 0.1% error budget, which equals approximately 43 minutes of permissible downtime per month. Product and operations teams treat this budget as a shared currency: unused budget allows fast feature releases and architectural changes. However, if major outages exhaust the budget, deployment freezes are enacted so engineering effort shifts entirely toward reliability hardening and automation.

## Technical definition
The quantified allowance of unreliability mathematically derived as one minus the Service Level Objective over a rolling evaluation interval.

## Examples
With a 99.9% monthly SLO, a team has 43 minutes of allowed failure; when an outage consumes 40 minutes in week one, developers halt risky feature releases to protect the remaining 3 minutes.
