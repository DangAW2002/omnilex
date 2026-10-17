---
label: Publish-subscribe (pub/sub)
aliases:
  - pub/sub
  - pub-sub
loanwords: []
autolink:
  aliases:
    pub/sub: always
plain_descriptions:
  - a messaging style where senders broadcast updates without knowing who the receivers are
  - a communication design where interested apps sign up to get specific topic alerts automatically
summary: An asynchronous architectural messaging pattern where message senders categorize broadcasts without directing them to specific individual subscribers.
confusable_notes: {}
follow_up_questions:
  - How does pub/sub decoupling improve system resilience during downstream service outages?
  - What are the architectural differences between fan-out pub/sub and point-to-point queues?
translation: native
---

## Easy explanation
Like subscribing to a specialized magazine: the editorial staff publishes articles on a topic without knowing who bought individual copies, and subscribers receive issues because they signed up for that topic.

## Details
In pub/sub topologies, publishers generate payloads marked with topic identifiers and push them to a broker intermediary. Subscribers register interest in matching topics or filter criteria. The broker replicates and routes incoming messages to all active subscriptions simultaneously, completely decoupling the life cycle, location, and network protocol of producers from consumers.

## Technical definition
An asynchronous messaging pattern where message producers (publishers) do not programmatically address consumers (subscribers); messages are distributed based on logical topics or content predicates.

## Examples
A payment gateway publishes a payment_completed event once, which automatically notifies the shipping service, email invoicing service, and customer loyalty rewards worker.
