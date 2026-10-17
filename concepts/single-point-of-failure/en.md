---
label: Single point of failure (SPOF)
aliases:
  - SPOF
loanwords: []
autolink:
  aliases:
    SPOF: always
plain_descriptions:
  - single part of a system whose failure stops the entire system from working
  - un-replicated component that can cause total system outage if it breaks
summary: A potential risk in system architecture where a single component failure will trigger the cessation of the entire system because no redundancy exists.
confusable_notes: {}
follow_up_questions:
  - How do architectural fault tree analyses and chaos engineering experiments identify hidden SPOFs?
  - Why do shared databases and DNS resolvers frequently become unacknowledged single points of failure?
translation: native
---

## Easy explanation
Like a chain of old-fashioned holiday tree lights wired in series: if one tiny glass bulb burns out, the entire string of 100 lights instantly goes completely dark.

## Details
A Single Point of Failure (SPOF) exists whenever a software or hardware architecture relies on an individual component that lacks an operational duplicate or backup. Common SPOFs include a non-replicated database instance, an un-clustered load balancer, a shared network switch, or a third-party payment gateway without an alternative fallback. Systems engineering seeks to identify and eliminate SPOFs through redundancy, component decoupling, multi-path networking, and automated failover.

## Technical definition
A structural vulnerability within an operational topology where the failure of one unique element triggers an unmitigated cessation of the entire encompassing system.

## Examples
An infrastructure topology running 10 redundant web servers but routing all database queries into a single shared database instance with no replica, making that solitary database node a critical SPOF.
