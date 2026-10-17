---
label: "Function"
qualifier: "(Programming)"
aliases: []
loanwords: []
autolink:
  label: never
plain_descriptions:
  - "reusable block of code designed to perform a dedicated computation"
  - "packaged sequence of instructions that takes inputs and produces an output"
summary: "A self-contained block of instructions that accepts parameters, executes a computational routine, and optionally returns a result."
confusable_notes: {}
follow_up_questions:
  - "How does the call stack manage execution contexts and return pointers during nested function calls?"
  - "What criteria distinguish pure functions from routines producing observable side effects?"
translation: native
---

## Easy explanation
Think of a kitchen blender with a push button. Pouring fruit and milk through the lid acts as inputs; pressing the button executes the blending procedure, yielding a fresh smoothie through the spout every time.

## Details
A function encapsulates an operational sequence behind an invocation interface. It receives zero or more input parameters and maps them to an output value via a return statement, or simply carries out programmatic actions. Modern paradigms treat functions as first-class citizens, meaning they can be assigned to variables, passed into other routines as arguments, or generated dynamically. Functions also establish isolated lexical scopes for their local variables, guarding internal computational logic from global interference.

## Technical definition
A callable unit of software composition with a discrete signature, binding input arguments into a localized activation frame that executes statements sequentially and yields an evaluated outcome.

## Examples
A function named `calculateTax(subtotal, rate)` multiplies an invoice figure of 500 dollars by an 0.08 rate to return 40 dollars in computed sales levy.
