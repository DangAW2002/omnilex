---
label: "Recursion"
aliases: []
loanwords: []
plain_descriptions:
  - "problem-solving method where a function solves smaller chunks of a task by calling itself"
  - "programming technique of repeating operations through self-invoking function calls until hitting a base case"
summary: "A computational technique where a function solves a problem by invoking smaller instances of itself until reaching a terminating base condition."
confusable_notes: {}
follow_up_questions:
  - "What prevents a recursive algorithm from exhausting available stack memory and crashing?"
  - "How does tail call optimization transform recursive functions into iterative execution loops?"
translation: native
---

## Easy explanation
Think of a set of traditional Russian nesting dolls. Opening the large outer doll reveals an identical, slightly smaller wooden doll inside; continuing to open doll after doll eventually reveals a tiny solid figurine at the center that cannot be opened further.

## Details
A recursive function breaks a broad problem down into simpler sub-problems of the identical type. It relies on two fundamental components: a base case, which returns a direct answer to halt the cycle, and a recursive step, which shrinks the problem toward that base case. Every recursive call pushes an activation frame onto the call stack, preserving local variables and return addresses. If a routine recurses too deeply without satisfying the base condition, the allocated stack space overflows, triggering a runtime error.

## Technical definition
An algorithmic technique wherein a procedure invokes itself directly or indirectly, establishing a succession of activation records that unwind once a terminal base predicate is evaluated as true.

## Examples
Computing the factorial of 4 evaluates as 4 multiplied by `factorial(3)`, unwinding progressively down to `factorial(1) = 1` to yield 24.
