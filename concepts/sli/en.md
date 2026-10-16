---
label: Service Level Indicator (SLI)
aliases:
  - SLI
loanwords: []
plain_descriptions:
  - the exact number measuring how well a service is actually performing right now
  - the measured metric used to check if an engineering team is meeting its reliability targets
summary: A carefully chosen quantitative metric that measures the actual level of service delivered to users over time.
confusable_notes:
  slo: >-
    An SLI is the measured metric of current performance (e.g. 99.95% successful requests), whereas an SLO is the target
    threshold that the team aims to satisfy.
  sla: >-
    An SLI is an operational measurement of service behavior, whereas an SLA is a customer-facing contract defining
    consequences if service degrades.
follow_up_questions:
  - Why are ratio-based indicators (good requests divided by total valid requests) preferred as SLIs?
  - How should SLIs filter out client-side errors (like 4xx HTTP responses) to reflect genuine server health?
translation: native
autolink:
  aliases:
    SLI: always
---

## Easy explanation
Think of the thermometer reading when you feel sick: the thermometer gives the actual measured temperature (the SLI), which you compare to normal 37°C body temperature (the SLO).

## Details
A Service Level Indicator evaluates user experience directly by calculating the ratio of successful operations to total valid operations. Typical SLIs measure request availability (successful HTTP responses divided by total requests) or latency compliance (requests resolved under a designated millisecond boundary).

## Technical definition
A formal quantitative ratio representing real-time or historical operational performance evaluated against predefined criteria.

## Examples
Measuring the proportion of successful HTTP requests as `good_requests / total_requests = 99.94%` over a seven-day rolling window.
