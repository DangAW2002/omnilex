---
label: Chaos engineering
aliases: []
loanwords: []
plain_descriptions:
  - intentionally breaking parts of a live system to uncover weaknesses before outages happen
  - controlled experiments in production to test whether software survives unexpected hardware or network failures
summary: >-
  The systematic practice of injecting controlled turbulence into a software environment to assess its resilience under stress.
confusable_notes: {}
follow_up_questions:
  - "How do teams define a safe blast radius when conducting chaos experiments on live systems?"
  - "What role does an established steady state metric play in measuring experiment impact?"
translation: native
---

## Easy explanation
Like a fire drill in a skyscraper: rather than waiting for a real emergency to see if the stairs work, officials trigger alarms under controlled supervision to fix evacuation bottlenecks.

## Details
Chaos engineering originated at Netflix with tools like Chaos Monkey to ensure distributed microservices remain resilient when underlying infrastructure fails. Practitioners start by defining a measurable steady state representing normal business operations, such as completed checkout transactions per minute. They then formulate hypotheses about how the architecture will withstand injected turbulence, such as sudden network latency, database master failover, or packet drops. Experiments are introduced with bounded blast radii and automated abort switches. By exposing brittle dependencies and hidden bugs during business hours, organizations prevent major customer-facing downtime.

## Technical definition
An empirical discipline of injecting controlled faults into distributed software environments to validate architectural resiliency and hypothesis-driven fault tolerance.

## Examples
An ecommerce company runs a scheduled chaos drill simulating the loss of an entire cloud availability zone during off-peak hours to confirm traffic reroutes without dropping checkout sessions.
