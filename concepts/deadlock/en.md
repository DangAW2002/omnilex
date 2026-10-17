---
label: Deadlock
aliases:
  - mutual blocking
loanwords: []
plain_descriptions:
  - a freeze where two programs each wait forever for the resource held by the other
  - a traffic gridlock in database memory where transactions cannot move forward or release locks
summary: A permanent state of mutual blocking where two or more concurrent processes each hold a resource while waiting for another resource held by the other.
confusable_notes: {}
follow_up_questions:
  - How do database deadlock detection algorithms use wait-for graphs and cycle detection?
  - What coding conventions, like consistent lock acquisition ordering, prevent deadlocks proactively?
translation: native
---

## Easy explanation
Like two drivers arriving at a narrow one-lane bridge from opposite directions at the exact same moment: neither driver is willing to back up, so both cars stay stuck indefinitely.

## Details
In relational databases, deadlocks occur when transaction T1 holds exclusive lock L1 and requests lock L2, while concurrent transaction T2 holds lock L2 and requests lock L1. Because neither transaction can proceed or release its held lock without completing, the database engine runs a background deadlock detector that analyzes wait-for graphs, identifies closed dependency loops, and terminates one transaction (the deadlock victim) to rollback its locks.

## Technical definition
A permanent mutual blocking condition in concurrent execution where two or more threads or transactions are trapped in cyclic dependencies over unshareable locked resources.

## Examples
Transaction A updates row 1 and requests a lock on row 2, while Transaction B updates row 2 and requests row 1, causing the SQL engine to abort Transaction B with a deadlock error code.
