---
label: "Algorithm"
aliases: []
loanwords: []
plain_descriptions:
  - "unambiguous, step-by-step recipe of instructions designed to solve a specific problem"
  - "computational formula that processes input data and produces a deterministic output"
summary: "A well-defined, finite sequence of unambiguous instructions designed to perform a specific computational computation or solve a problem."
confusable_notes: {}
follow_up_questions:
  - "How do engineers analyze the algorithmic tradeoffs between worst-case time complexity and auxiliary space usage?"
  - "What distinguishes deterministic algorithms from probabilistic or randomized algorithms in distributed systems?"
translation: native
---

## Easy explanation
Think of a foolproof culinary recipe for baking bread. It specifies exact ingredient quantities, precise sequence steps (mix flour, knead ten minutes, ferment for one hour, bake at 200 degrees), guaranteeing that anyone following the steps produces a fresh loaf every time.

## Details
An algorithm represents an abstract, language-independent procedure for transforming inputs into expected outputs. Key attributes include finiteness (must terminate after a discrete count of operations), definiteness (every operational instruction is completely unambiguous), input/output boundaries, and effectiveness (each calculation step is practically executable). Computer scientists evaluate algorithms based on asymptotic time complexity (execution duration relative to input volume) and space complexity (auxiliary memory consumed during computation), often classified via Big O notation.

## Technical definition
A finite, strictly ordered sequence of deterministic computational rules and instructions that maps an initial input domain to a well-defined output range.

## Examples
Euclid’s algorithm calculates the greatest common divisor of 252 and 105 by repeatedly replacing the larger number with the remainder of their division, arriving at 21 in four steps.
