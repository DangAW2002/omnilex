---
label: "Promise"
qualifier: "(Programming)"
aliases: []
loanwords: []
autolink:
  label: never
plain_descriptions:
  - "stand-in token that holds the pending outcome of an ongoing background calculation"
  - "proxy for a future value that may succeed with data or fail with an error reason"
summary: "A stateful container representing a deferred computational outcome that will eventually yield a value or encounter failure."
confusable_notes: {}
follow_up_questions:
  - "How does promise chaining prevent the nested pyramid structure known as callback hell?"
  - "What differentiates the settling behaviors of Promise.all versus Promise.allSettled when one operation fails?"
translation: native
---

## Easy explanation
Picture a vibrating buzzer handed to a customer at a busy burger restaurant. The buzzer is not the meal itself, but it guarantees that once the kitchen finishes grilling the patty, the device will alert the holder to pick up the food or receive an apology if ingredients ran out.

## Details
A promise exists in one of three mutually exclusive states: pending, fulfilled, or rejected. It begins in the pending state while the asynchronous task executes. Once the task concludes, the promise transitions irreversibly into either fulfilled with a resultant value or rejected with an error reason. Consumers attach reaction callbacks via `.then()`, `.catch()`, and `.finally()` handlers. Because these methods return fresh promises, developers can chain dependent asynchronous steps smoothly rather than nesting callback functions deeply.

## Technical definition
A state-machine abstraction representing an asynchronous deferred computation that undergoes a single, irreversible state transition from pending to fulfilled or rejected.

## Examples
Initiating an HTTP request returns a pending promise; three seconds later it transitions to fulfilled, passing an HTTP 200 response payload of 1,024 bytes to its attached listener.
