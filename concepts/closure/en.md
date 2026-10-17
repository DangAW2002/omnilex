---
label: "Closure"
qualifier: "(Programming)"
aliases: []
loanwords: []
plain_descriptions:
  - "function bundled together with references to its surrounding lexical environment"
  - "inner function that remembers and accesses variables from its enclosing scope even after that parent function has returned"
summary: "A function packaged with references to its surrounding lexical scope, enabling it to access enclosing variables even after the outer function finishes executing."
confusable_notes: {}
follow_up_questions:
  - "How do closures enable robust data privacy and encapsulation without formal class declarations?"
  - "In what circumstances can unintended closures cause persistent memory leaks?"
translation: native
---

## Easy explanation
Imagine a young graduate leaving home for university, carrying a family photo album in their luggage. Even though the graduate now lives miles away in a dormitory, opening that album still grants immediate access to childhood memories and guidance from home.

## Details
In languages with first-class functions, creating an inner function within an enclosing routine creates a closure. The closure preserves visibility into enclosing local variables and arguments, storing them in a persistent environment record rather than discarding them when the outer function completes. This mechanism underpins common software patterns including function factories, currying, private state emulation, and asynchronous callbacks. Because captured variables remain referenced, the garbage collector preserves them until the closure itself is reclaimed.

## Technical definition
The combination of a function object and a lexical environment record containing bindings for all free variables captured during its instantiation.

## Examples
A factory function creates a counter initialized at 10; invoking the returned inner function increments the hidden internal count to 11 and 12 across subsequent calls.
