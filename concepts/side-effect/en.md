---
label: "Side effect"
qualifier: "(Programming)"
aliases:
  []
loanwords: []
plain_descriptions:
  - "any change a function makes outside of simply returning a value"
  - "modifying global variables, writing files, or updating databases as a result of executing code"
summary: "Any observable change in program state or interaction with the outside world produced by a function or expression beyond returning its computed value."
confusable_notes:
  {}
follow_up_questions:
  - "Why does functional programming encourage pure functions that eliminate observable side effects?"
  - "How can side effects make multithreaded concurrent code prone to race conditions and bugs?"
translation: native
---

## Easy explanation
Asking a calculator to add two numbers, but while calculating, it also automatically orders a pizza and sends an email without your explicit instruction.

## Details
In computer programming, a function has a side effect if it alters a global state, mutates mutable reference arguments, performs I/O operations (such as writing to a file, disk, or network socket), or triggers external hardware events. Pure functions, by contrast, possess no side effects: their output depends solely on their input arguments, making them easier to test, reason about, and parallelize.

## Technical definition
A state mutation or external I/O action executed during the evaluation of a computational expression that alters runtime environments beyond producing the primary evaluation value.

## Examples
A function named `calculateTotal()` that secretly increments an external database transaction counter while computing an order price has a side effect.
