---
label: Event-driven architecture
aliases:
  - EDA
loanwords: []
autolink:
  aliases:
    EDA: always
plain_descriptions:
  - system architecture where decoupled services communicate by publishing and consuming events
  - software design reacting to state changes instead of making synchronous direct calls
summary: A software architecture paradigm where decoupled components communicate asynchronously by generating, detecting, and reacting to significant state changes known as events.
confusable_notes: {}
follow_up_questions:
  - How do choreography and orchestration models compare in event-driven workflows?
  - How does idempotency protect event consumers from duplicate message deliveries?
translation: native
---

## Easy explanation
Like a radio broadcast station: the tower transmits music and weather alerts over the airwaves; any radio receiver tuned to that frequency hears the broadcast and reacts, without the DJ knowing who is listening.

## Details
In request-driven architectures, clients invoke remote HTTP or RPC endpoints synchronously, creating temporal and spatial coupling. In an event-driven architecture (EDA), producers emit immutable event records (such as OrderPlaced or SensorThresholdExceeded) into an event broker like Apache Kafka or AWS SNS. Consumers subscribe to relevant topics independently. Producers require no knowledge of consumer identities, numbers, or processing speeds, allowing high throughput, resilience against consumer downtime, and effortless addition of new analytical subscribers.

## Technical definition
An asynchronous architectural pattern wherein state change notifications are captured as structured, decoupled records and ingested by autonomous subscribers through message routers.

## Examples
An e-commerce checkout emitting an OrderCreated event consumed simultaneously by payment verification, warehouse packaging, and marketing email engines across 3 different microservices.
