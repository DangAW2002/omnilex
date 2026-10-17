---
label: "Variable"
qualifier: "(Programming)"
aliases: []
loanwords: []
autolink:
  label: never
plain_descriptions:
  - "named container that holds data in memory while a program runs"
  - "symbolic label pointing to a value that can be read or modified"
summary: "A named storage location in memory paired with an identifier that holds data a program can manipulate."
confusable_notes: {}
follow_up_questions:
  - "How does variable scoping affect memory allocation and lifetime?"
  - "What distinguishes mutable variables from immutable bindings in modern compilers?"
translation: native
---

## Easy explanation
Picture a labeled storage box in a workshop. Stenciling "spare bolts" on the outside lets workers look inside to inspect the count, pull items out, or replace them with newer ones without altering the physical structure of the shelf.

## Details
A variable associates an identifier with a memory address containing a typed value. Depending on the language semantics, variables are declared with specific data types statically or determine their types dynamically at runtime. The scope of a variable limits where its identifier can be resolved, spanning global execution, file modules, function bodies, or localized block statements. Variable values are allocated on either the call stack for local primitives or the managed heap for referenced complex structures.

## Technical definition
A symbolic abstraction representing a storage location in addressable memory, bound to an identifier and evaluated within an execution context to retrieve or mutate state.

## Examples
Declaring `let retryCount = 0;` allocates space for an integer tracker; each failed network attempt increments the stored figure by one until reaching three.
