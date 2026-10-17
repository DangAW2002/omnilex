---
label: "Exception"
qualifier: "(Programming)"
aliases: []
loanwords: []
autolink:
  label: never
plain_descriptions:
  - "unexpected event or runtime failure that interrupts the normal sequence of instructions"
  - "error signaling mechanism that transfers control up the call stack to a recovery block"
summary: "An abnormal condition or error event encountered during execution that disrupts normal instruction flow and triggers specialized handling logic."
confusable_notes: {}
follow_up_questions:
  - "How does the runtime unwind activation frames on the call stack when searching for an enclosing catch block?"
  - "Why should production software avoid using exceptions for ordinary conditional flow control?"
translation: native
---

## Easy explanation
Think of an emergency pull-cord on a commuter train. If an unexpected hazard appears on the tracks, pulling the cord halts normal travel and alerts conductors immediately, activating emergency safety protocols to protect passengers.

## Details
When a program encounters an invalid state (such as division by zero, attempting to read a missing file, or dereferencing a null pointer), it instantiates and throws an exception object. The runtime intercepts this event and begins unwinding the call stack, checking each active function frame in reverse order for an appropriate handler block (`catch`). If an enclosing handler catches the exception, execution recovers gracefully; if the stack unwinds completely without finding a handler, the process terminates abnormally with an unhandled exception error.

## Technical definition
A runtime object encapsulating error telemetry, thrown by execution engines or user logic to divert control flow away from standard execution paths toward structured recovery routines.

## Examples
An application attempts to read `config.json`: if the file is missing from disk, the system raises a `FileNotFoundException`, which a `try...catch` block intercepts to supply fallback default values.
