---
label: "Technical debt"
aliases:
  []
loanwords: []
plain_descriptions:
  - "the future cost of choosing a quick and dirty coding shortcut today"
  - "implied rework created when speedy software delivery sacrifices clean architecture"
summary: "The accumulated implied cost of additional future rework caused by choosing an expedited, suboptimal technical solution instead of a well-architected approach."
confusable_notes:
  {}
follow_up_questions:
  - "How do teams balance delivering quick feature prototypes against accumulating technical debt?"
  - "What metrics or symptoms reveal that interest payments on technical debt are slowing feature development?"
translation: native
---

## Easy explanation
Taking out a financial loan: borrowing time today to launch a product faster lets you meet a deadline, but you must pay continuous interest in slower progress until you repay the principal by rewriting the code.

## Details
Ward Cunningham coined the metaphor to explain why software slows down over time. Shortcuts like hard-coded parameters, skipping unit tests, or delaying component modularization allow early releases. However, each subsequent modification takes longer because developers must navigate convoluted workarounds, accumulating interest in the form of friction and defect fixes.

## Technical definition
The latent structural deficit within a software codebase resulting from expedience-driven compromises, incurring escalating recurring maintenance overhead until remediated through refactoring.

## Examples
A startup hardcodes payment gateway logic to launch before Black Friday; months later, adding a new payment vendor requires weeks of untangling instead of hours of configuration.
