---
label: "Race condition"
aliases:
  []
loanwords: []
plain_descriptions:
  - "a bug where program behavior changes unpredictably depending on which task finishes first"
  - "a timing flaw occurring when multiple threads try to modify the same shared data at once"
summary: "An undesirable condition in concurrent programming where system behavior or output depends unpredictably on the relative execution order or timing of uncontrollable events."
confusable_notes:
  {}
follow_up_questions:
  - "How do mutexes, semaphores, and database row locks prevent race conditions on shared state?"
  - "What makes race conditions notoriously difficult to reproduce in local debugging environments?"
translation: native
---

## Easy explanation
Two people with debit cards simultaneously trying to withdraw the last 500,000 VND from the same bank account at different ATMs at the exact same split-second.

## Details
Race conditions occur when two or more concurrent threads or asynchronous processes read and write to shared mutable state without proper synchronization. A classic example is the check-then-act hazard, where one thread alters data after another thread has checked it but before it completes its write operation. Prevention techniques include locks, atomic operations, and immutable data structures.

## Technical definition
A concurrency hazard wherein the deterministic outcome of executing interdependent operations is compromised by non-synchronized timing and scheduling variations among concurrent execution contexts.

## Examples
Two shoppers clicking Buy at the same instant on an e-commerce platform for the single remaining product in inventory, leading to an oversell if inventory verification lacks atomic transactions.
