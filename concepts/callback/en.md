---
label: "Callback"
qualifier: "(Programming)"
aliases: []
loanwords: []
plain_descriptions:
  - "executable subroutine supplied as an input parameter to be triggered upon task conclusion"
  - "packaged piece of code passed to a recipient procedure to execute when a specific event happens"
summary: "A subroutine delivered as a parameter to another procedure to be called back upon the occurrence of a predefined trigger."
confusable_notes: {}
follow_up_questions:
  - "What distinguishes a synchronous callback executed immediately from an asynchronous event-driven callback?"
  - "How did uncontrolled callback nesting lead to error handling vulnerabilities in early Node.js architectures?"
translation: native
---

## Easy explanation
Imagine hiring a courier to deliver a package and handing them a contact phone number. The courier takes the delivery instructions and calls that exact phone number the moment the recipient signs the receipt.

## Details
In systems supporting higher-order functions, callbacks allow callers to customize or respond to a routine’s execution. Callbacks can be synchronous, executing immediately within the caller’s stack frame (like in an array filtering pass), or asynchronous, queued into an event loop to run once an I/O operation, user click, or timer elapses. While versatile, relying on deep hierarchies of nested asynchronous callbacks can produce rigid code structures commonly known as callback hell, which modern codebases mitigate using promises and async/await syntax.

## Technical definition
A reference to executable code passed as an argument to a recipient procedure, establishing an inverted control contract where the recipient invokes the reference upon a specified condition.

## Examples
An application registers a callback to save form inputs: when the user clicks the submit button, the framework executes the registered `onSave()` function, processing the entered text.
