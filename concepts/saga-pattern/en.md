---
label: Saga pattern
aliases:
  - Saga distributed transaction
loanwords: []
plain_descriptions:
  - coordinating distributed transactions across services through a series of local steps
  - transaction workflow using compensating actions to undo steps when an error occurs
summary: A design pattern that manages distributed transactions across multiple microservices using a sequence of local transactions and compensating actions to handle failures.
confusable_notes: {}
follow_up_questions:
  - What are the architectural tradeoffs between choreography-based and orchestration-based sagas?
  - How do compensating transactions handle side effects that cannot be cleanly undone, such as external email dispatches?
translation: native
---

## Easy explanation
Like booking a vacation package: you book the flight, then reserve the hotel, then rent a car; if the car rental agency is fully booked at the last step, you cancel the hotel and cancel the flight to get your money back.

## Details
Distributed microservices cannot rely on traditional two-phase commit (2PC) transactions without introducing severe latency, blocking locks, and availability bottlenecks. The Saga pattern breaks a long-running business transaction into a sequence of isolated local transactions executed by individual services. Each step updates its own local database and emits an event or message. If an intermediate step fails, the saga executes compensating transactions in reverse order to revert previous changes, ensuring eventual consistency.

## Technical definition
An architectural pattern ensuring eventual data consistency across distributed boundaries by sequencing localized database transactions paired with explicit compensating rollbacks.

## Examples
An order saga executing payment charging, inventory reservation, and parcel dispatch; when inventory reservation fails due to a stockout, a compensating refund transaction triggers immediately to refund the customer credit card.
