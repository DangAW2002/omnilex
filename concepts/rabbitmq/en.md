---
label: RabbitMQ
aliases: []
loanwords: []
plain_descriptions:
  - open-source message broker software that routes background tasks reliably between programs
  - an intermediary postal worker that accepts, stores, and hands out job tickets to waiting workers
summary: An open-source message broker that routes messages between distributed applications using protocols like AMQP.
confusable_notes: {}
follow_up_questions:
  - How do RabbitMQ direct, topic, and fanout exchanges differ in routing logic?
  - Under what system conditions should teams choose RabbitMQ over Apache Kafka?
translation: native
---

## Easy explanation
Think of a central post office where incoming letters get placed into sorted cubbies, and postal delivery workers pick up letters one by one as soon as their hands are free.

## Details
RabbitMQ is built on the Erlang OTP runtime, providing robust concurrency and delivery guarantees. Producers send messages to exchanges, which inspect routing keys and binding rules to deliver payloads into durable FIFO queues. Consumers pull tasks from queues, acknowledge successful execution, or trigger automatic retries and dead-letter handling on failure.

## Technical definition
A distributed message-queuing broker implementing the Advanced Message Queuing Protocol (AMQP) standard, offering versatile routing exchanges, message acknowledgments, and flexible delivery semantics.

## Examples
A photo editing website deposits raw video encoding requests into a RabbitMQ queue so four worker servers can process videos without dropping user requests under load.
