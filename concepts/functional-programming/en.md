---
label: "Functional programming"
aliases: []
loanwords: []
plain_descriptions:
  - "coding style centered on evaluating mathematical functions without changing shared data"
  - "paradigm emphasizing pure functions, immutable values, and declarative transformations"
summary: "A declarative programming paradigm that treats computation as the evaluation of pure mathematical functions while avoiding mutable state."
confusable_notes:
  object-oriented-programming: "Functional programming emphasizes immutable data transformed through pure mathematical functions, whereas object-oriented programming bundles mutable state with behavior inside objects."
follow_up_questions:
  - "How does referential transparency simplify concurrent programming and automated testing?"
  - "What advantages do higher-order functions like map, filter, and reduce offer over imperative loops?"
translation: native
---

## Easy explanation
Picture an arithmetic calculator solving equations on a display. Inputting 7 plus 5 yields 12 reliably; doing so never alters numbers saved in other memories, and pressing the equals button ten times produces the same output without wearing down hidden levers.

## Details
Functional programming views software as a pipeline of mathematical transformations. Its foundational principle is the pure function: given the exact same input arguments, it consistently returns the identical output while causing zero observable side effects on global memory or I/O channels. State is treated as immutable, meaning updates produce fresh data structures rather than modifying existing buffers. Techniques such as function composition, currying, pattern matching, and recursion replace traditional mutable state loops, making concurrent execution intrinsically thread-safe.

## Technical definition
A declarative programming paradigm wherein software construction relies on the application and composition of pure functions, strictly isolating side effects and enforcing referential transparency.

## Examples
Filtering an array of prices `[10, 25, 40]` to retain items above 20 and doubling the results yields a brand new array `[50, 80]`, leaving the original collection untouched.
