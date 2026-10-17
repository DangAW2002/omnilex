---
label: Spot instance
aliases: []
loanwords: []
plain_descriptions:
  - deeply discounted cloud virtual server that can be interrupted with short notice
  - spare cloud computing capacity rented cheaply for non-urgent computations and resilient workloads
summary: An unused cloud computing instance available at steep discounts compared to on-demand rates, subject to reclamation when the provider needs capacity.
confusable_notes:
  cloud-instance: A spot instance uses surplus cloud capacity at discounts up to 90% but can be interrupted at any time, whereas a standard cloud instance guarantees uninterrupted runtime.
follow_up_questions:
  - How do automation frameworks handle the two-minute termination notice before a spot instance is reclaimed?
  - Why are stateless worker pools and distributed machine learning training jobs ideal for spot instances?
translation: native
---

## Easy explanation
Like buying a standby airline ticket at the airport counter: you get a luxury seat at an 80% discount, but if a full-paying passenger arrives before departure, you must give up the seat and catch the next flight.

## Details
Cloud vendors maintain spare compute pools that fluctuate based on demand. To monetize idle servers, they offer spot instances at discounts reaching 70% to 90%. However, if on-demand demand surges or market capacity tightens, the cloud provider issues a two-minute warning signal before stopping or terminating the instance. Workloads using spot instances must be stateless, containerized, or checkpointed.

## Technical definition
An ephemeral virtual compute resource provisioned from surplus cloud capacity at dynamic market-driven discounts, subject to immediate interruption upon provider reclaim notifications.

## Examples
A genomics research institute processes 10,000 DNA sequencing batch jobs using a fleet of 100 spot instances, cutting compute bills by 75% because failed jobs simply resume from automated checkpoints.
