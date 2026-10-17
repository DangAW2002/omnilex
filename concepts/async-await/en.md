---
label: "Async/await"
aliases: []
loanwords: []
plain_descriptions:
  - "syntax that lets developers write asynchronous, non-blocking code that reads like normal sequential instructions"
  - "language keywords used to pause execution until a background operation finishes without freezing the thread"
summary: "A syntactic abstraction that allows asynchronous, promise-based operations to be written and structured in a readable sequential style."
confusable_notes: {}
follow_up_questions:
  - "How does the underlying runtime event loop handle execution resumption when an awaited promise resolves?"
  - "Why should developers avoid sequentially awaiting independent tasks that could execute concurrently via combinators?"
translation: native
---

## Easy explanation
Imagine ordering custom furniture at a workshop. Instead of standing motionless at the counter for two weeks waiting for the carpenter to finish, the customer takes a claim receipt, goes home to continue daily life, and returns smoothly to collect the table once notified of completion.

## Details
The `async` keyword designates a function that invariably wraps its eventual return value inside a promise. Within that marked function body, the `await` keyword pauses the progression of subsequent lines until the evaluated promise resolves or rejects. Crucially, this pause yields execution control back to the surrounding runtime thread or event loop, allowing unrelated events, user interactions, or network packets to be serviced concurrently. Error handling uses standard `try...catch` blocks, dramatically simplifying asynchronous control flow.

## Technical definition
A syntactic language feature operating over promise abstractions that pauses coroutine execution at suspension points without blocking the underlying OS thread, resuming upon resolution.

## Examples
An application fetches user data: writing `const user = await fetchUser(42);` pauses that specific routine until the network returns, while allowing the user interface to stay responsive.
