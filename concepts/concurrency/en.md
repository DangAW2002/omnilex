---
label: "Concurrency"
aliases: []
loanwords: []
plain_descriptions:
  - "ability of a system to manage multiple tasks by making progress on them during overlapping time periods"
  - "software structure that interleaves or coordinates several computations without requiring them to run at the exact same physical instant"
summary: "The composition and coordination of multiple computational tasks executing over overlapping time intervals."
confusable_notes:
  parallelism: "Concurrency is about dealing with lots of things at once through system structure, whereas parallelism is about doing lots of things at the exact same instant using multiple physical cores."
follow_up_questions:
  - "How can a single-core CPU achieve responsive concurrency without executing instructions in parallel?"
  - "What coordination mechanisms prevent race conditions and starvation in highly concurrent web servers?"
translation: native
---

## Easy explanation
Picture a single barista juggling coffee orders at a morning stand. The barista grinds beans for customer A, turns around to steam milk for customer B while the espresso drips, and hands a cup to customer C, progressing three orders across the same five-minute window despite having only one pair of hands.

## Details
Concurrency is an architectural property that structures a system into discrete, logically independent execution flows. These tasks make interleaved progress over an overlapping time frame. Concurrency can be achieved on a single CPU core via rapid time-slicing and context switching, or through non-blocking asynchronous event loops. While concurrent systems may leverage parallel hardware when available, the core concept focuses on structuring programs so that waiting on slow operations (like disk I/O or network requests) does not stall independent operations.

## Technical definition
The architectural decomposition of a program into independently executing computational threads or coroutines whose lifetimes overlap, regardless of physical hardware parallelism.

## Examples
A chat server handles 500 connected clients simultaneously; while waiting for client 12 to send a message over the network, it reads and routes incoming packets from client 89.
