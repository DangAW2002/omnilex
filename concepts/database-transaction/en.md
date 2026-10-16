---
label: Transaction
qualifier: (Database)
aliases:
  - database transaction
  - DB transaction
loanwords: []
autolink:
  label: never
plain_descriptions:
  - an all-or-nothing group of database operations that either completely succeeds or leaves data untouched
  - a safe execution wrapper ensuring money transfers debit one account and credit another atomically
summary: A sequence of database operations executed as a single, atomic unit of work satisfying ACID properties.
confusable_notes: {}
follow_up_questions:
  - What concurrency anomalies appear at read committed isolation compared to serializable?
  - How does a two-phase commit protocol achieve distributed transaction atomicity across microservices?
translation: native
---

## Easy explanation
Like buying an item at a flea market where you hand over the cash at the exact moment the seller hands over the item: if either party lets go, both walk away with what they started with.

## Details
Transactions ensure ACID reliability: Atomicity (all steps finish or none do), Consistency (preserves integrity rules), Isolation (concurrent operations do not interfere), and Durability (committed writes persist through crashes). If an error occurs before completion, the engine issues a rollback.

## Technical definition
A logical unit of database processing that includes one or more database access operations treated as an indivisible whole.

## Examples
Moving $50 between two accounts by wrapping `UPDATE balance - 50` and `UPDATE balance + 50` in a single `BEGIN ... COMMIT` block.
