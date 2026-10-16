---
label: Message queue
aliases:
  - task queue
  - message broker
loanwords: []
plain_descriptions:
  - a digital waiting line where servers leave jobs for worker programs to process one by one
  - a buffer holding background tasks so web servers stay responsive during heavy traffic
summary: An asynchronous communication component that stores messages in sequence until receiving consumer services retrieve and process them.
confusable_notes: {}
follow_up_questions:
  - How do dead-letter queues prevent poison messages from blocking a pipeline?
  - What are the tradeoffs between point-to-point queues and publish-subscribe topics?
translation: native
---

## Easy explanation
Like an order carousel in a busy restaurant: waiters hang tickets up as orders arrive, and cooks pull tickets down one by one at their own steady pace without getting overwhelmed.

## Details
In a message queue architecture, producer services publish task payloads without waiting for immediate execution. Messages persist in FIFO (First-In, First-Out) buffers until consumer workers claim, process, and acknowledge them, decoupling system components and absorbing traffic spikes.

## Technical definition
An inter-process messaging intermediary providing asynchronous message buffering, decoupling, and durable point-to-point delivery between distributed system components.

## Examples
Queuing video transcoding jobs in RabbitMQ or Amazon SQS so an upload service returns an immediate success response to the mobile client.
