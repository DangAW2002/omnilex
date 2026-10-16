---
label: Service Level Objective (SLO)
aliases:
  - SLO
loanwords: []
plain_descriptions:
  - an internal reliability goal that engineering teams aim to achieve for their service
  - the agreed target percentage of uptime or speed that keeps users satisfied
summary: >-
  A precise, target reliability threshold specified by engineering teams to determine acceptable service quality over an
  extended duration.
confusable_notes:
  sla: >-
    An SLO is an internal reliability target set by engineering to guide operations, whereas an SLA is an external
    commercial contract with legal or financial penalties for downtime.
  sli: >-
    An SLO is the target objective to achieve (e.g. 99.9% success), whereas an SLI is the quantifiable metric that
    measures actual performance over time.
follow_up_questions:
  - How does an error budget derived from an SLO help balance feature velocity with stability?
  - Why should SLO targets rarely be set to 100% availability in real-world systems?
translation: native
autolink:
  aliases:
    SLO: always
---

## Easy explanation
Think of an airline aiming for 90% of flights to land on time: this internal target gives flight crews a clear operational standard without guaranteeing travelers a refund on every small weather delay.

## Details
Service Level Objectives translate business needs into concrete technical targets over rolling evaluation windows (such as 30 days). The inverse of the SLO defines the error budget: if an SLO targets 99.9% availability, the system has a 0.1% budget for failures. Exhausting the error budget prompts teams to pause feature releases and prioritize stability work.

## Technical definition
A formal quantitative reliability target bounded by a percentage threshold and measured by one or more Service Level Indicators over a rolling evaluation interval.

## Examples
An authentication service sets an SLO that 99.9% of all valid login API requests must complete in under 200 ms measured over any rolling 28-day window.
