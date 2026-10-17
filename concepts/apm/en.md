---
label: Application performance monitoring (APM)
aliases:
  - APM
loanwords:
  - application performance monitoring
  - apm
autolink:
  aliases:
    APM: always
plain_descriptions:
  - software that watches web applications from the inside to detect slow database queries and code bottlenecks
  - end-to-end monitoring tool that measures user transaction speeds, error rates, and system dependencies
summary: >-
  The practice and tooling dedicated to observing the availability, software errors, and transaction performance of complex software applications.
confusable_notes: {}
follow_up_questions:
  - "How does automatic bytecode instrumentation enable APM tools to profile functions without code changes?"
  - "What criteria distinguish deep APM tracing from basic infrastructure server monitoring?"
translation: native
---

## Easy explanation
Like an internal health tracker worn by an athlete that measures heart rate, muscle fatigue, and hydration during a marathon to detect exhaustion before they collapse.

## Details
Application Performance Monitoring (APM) refers to software agents and platforms that inspect the internal runtime behavior of web applications. Unlike basic server monitoring which only measures external resource consumption like CPU or RAM, APM tools hook directly into the application runtime (such as the JVM, CLR, or Node.js runtime). They track every HTTP request, measure the execution duration of individual database queries, profile thread allocations, capture unhandled exceptions with full stack traces, and map microservice dependency graphs in real time. Popular APM solutions include Datadog, New Relic, Dynatrace, and Azure Application Insights.

## Technical definition
A systems monitoring discipline focused on real-time tracking of software application transaction performance, runtime exceptions, latency distribution, and dependency graphs.

## Examples
An APM agent embedded in a payment service flags a specific SQL query that takes four seconds to execute due to a missing table index, pinpointing the exact line in repository code.
