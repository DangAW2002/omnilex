---
label: "Library"
qualifier: "(Software)"
aliases:
  - "Software library"
loanwords: []
autolink:
  label: never
plain_descriptions:
  - "a collection of reusable code routines that your program calls when needed"
  - "a package of pre-written functions you import to perform specific tasks"
summary: "A packaged collection of pre-written functions, classes, and subroutines that developers import and call directly to accomplish specific programmatic tasks."
confusable_notes:
  software-framework: "A library provides functions that your code calls; a framework calls your code and defines the overall application flow (inversion of control)."
follow_up_questions:
  - "How does inversion of control distinguish a software library from a software framework?"
  - "What are the advantages of using small, single-purpose utility libraries?"
translation: native
---

## Easy explanation
Borrowing a specialized tool from a physical workshop: you pick up a wrench when you need to tighten a bolt, use it, and you remain in complete charge of building the project.

## Details
A library provides targeted utility functions or domain logic without dictating your application architectural skeleton. Your application code remains in control of execution, choosing when and how to invoke library methods. Examples range from math and cryptography helpers to data parsing and graphics rendering.

## Technical definition
A reusable compilation of callable routines, classes, and types that offer discrete programmatic capabilities invoked explicitly by host software.

## Examples
Importing a math library like NumPy to perform linear algebra operations, where your Python script controls the flow of execution and calls matrix multiplication functions on demand.
