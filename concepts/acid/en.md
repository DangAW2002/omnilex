---
label: ACID
qualifier: (Database)
aliases:
  - ACID properties
loanwords: []
autolink:
  label: never
plain_descriptions:
  - four safety rules guaranteeing that database transactions finish completely without corruption
  - the core database promise that financial transactions either succeed 100% or leave no trace
summary: A set of four fundamental properties (Atomicity, Consistency, Isolation, Durability) that guarantee database transactions are processed reliably.
confusable_notes:
  eventual-consistency: ACID transactions guarantee immediate consistency and strict isolation, whereas eventual consistency allows distributed replicas to temporarily diverge before converging.
follow_up_questions:
  - How do write-ahead logs (WAL) ensure durability even during sudden server power cuts?
  - What are the concurrency performance tradeoffs of different ACID isolation levels like read committed versus serializable?
translation: native
---

## Easy explanation
Like an automated cash deposit machine: when you deposit 2,000,000 VND, the machine either accepts the bills, updates your account balance, and prints a receipt, or spits your exact bills back out safely if an electrical flicker occurs midway.

## Details
ACID stands for four vital guarantees: Atomicity (all operations in a transaction succeed together or all rollback), Consistency (data always satisfies schema constraints and validation rules), Isolation (concurrent transactions execute without interfering with one another's intermediate states), and Durability (committed modifications are safely recorded to non-volatile disk and survive hardware crashes).

## Technical definition
A set of four formal guarantees (Atomicity, Consistency, Isolation, Durability) that govern database transaction processing to ensure reliable, valid state transitions.

## Examples
A banking transfer moves 5,000,000 VND transferring 5,000,000 VND between checking account Alpha and savings account Beta; if the network crashes after debiting account A, the database automatically rolls back account A's balance to avoid lost funds.
