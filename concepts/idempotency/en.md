---
label: "Idempotency"
aliases:
  []
loanwords: []
plain_descriptions:
  - "the property where executing an action multiple times produces the exact same result as doing it once"
  - "safely retrying an operation without causing duplicate charges or unintended side effects"
summary: "A property of an operation whereby running it again with identical inputs leaves the system in the same state as running it once."
confusable_notes:
  {}
follow_up_questions:
  - "How do unique idempotency keys in HTTP request headers prevent duplicate payments on network retries?"
  - "Why are HTTP GET, PUT, and DELETE methods considered idempotent while POST is not?"
translation: native
---

## Easy explanation
An elevator call button: pressing the button once lights it up to summon the elevator; pressing the button ten more times leaves the elevator doing the exact same thing without sending ten separate elevators.

## Details
In distributed systems and web APIs, network connections can time out before the client receives a server response. If the operation is idempotent, the client can safely retry the request without worrying about creating duplicate records or side effects. Implementations often use unique idempotency keys stored in an atomic datastore to recognize and return cached results for repeated requests.

## Technical definition
An algebraic and systems property guaranteeing that repeated applications of an operation on a target state yield identical state transitions without accumulating collateral side effects.

## Examples
A payment API using an Idempotency-Key header so that if network drops during checkout, retrying the exact request charges the customer credit card only once.
