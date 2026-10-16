---
label: "Type checking"
aliases:
  []
loanwords: []
plain_descriptions:
  - "verifying that variables and function arguments hold the expected kinds of data"
  - "catching mismatched data types before or during program execution"
summary: "The verification process that evaluates whether data values assigned to variables or passed to functions comply with the rules of a programming language type system."
confusable_notes:
  {}
follow_up_questions:
  - "What are the performance and maintainability trade-offs between static and dynamic type checking?"
  - "How does gradual typing allow codebases to adopt type annotations incrementally?"
translation: native
---

## Easy explanation
Having a mechanical coin sorter that only accepts 25-cent coins into a specific slot, immediately rejecting any coin that has the wrong shape or thickness.

## Details
Type checking guarantees that operations are performed only on valid data types, avoiding runtime crashes such as calling a nonexistent method on undefined. Static type checking occurs during compilation or linting (as seen in TypeScript, Go, or Rust), highlighting defects directly in the code editor. Dynamic type checking validates types at runtime when instructions execute (common in Python, Ruby, or JavaScript).

## Technical definition
A formal static or dynamic analysis procedure in programming language semantics verifying that expressions and operators adhere to predefined type constraints and structural contracts.

## Examples
The TypeScript compiler flags an error when passing a string parameter into a mathematical function expecting a number.
