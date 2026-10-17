---
label: "Immutability"
aliases: []
loanwords: []
plain_descriptions:
  - "characteristic of an object or data structure whose state cannot be changed after creation"
  - "programming design rule where modifications always yield fresh copies rather than updating existing memory"
summary: "The property of an object or data structure that prevents its state from being altered after it has been created."
confusable_notes: {}
follow_up_questions:
  - "How do persistent data structures and structural sharing mitigate memory duplication costs with immutable records?"
  - "Why does immutability eliminate data race conditions in high-throughput concurrent architectures?"
translation: native
---

## Easy explanation
Think of a historical birth certificate printed on parchment paper. Once stamped by the government registry, the document cannot be erased, rewritten, or scribbled over; if a citizen changes their legal name later, the registrar issues a brand new certificate rather than altering the original record.

## Details
An immutable object retains its exact field values throughout its operational lifetime. Any operation intended to update an immutable structure creates and returns a new object reflecting the changes, leaving the original intact. Immutability eliminates entire classes of software defects: it guarantees thread safety without synchronization locks, ensures objects cannot be corrupted via accidental reference sharing, and simplifies state management in complex reactive interfaces. High-performance runtimes use structural sharing to share common sub-branches across versions, minimizing allocation overhead.

## Technical definition
The architectural guarantee that a data structure’s internal state representations and memory buffers cannot undergo mutation following the completion of its instantiation.

## Examples
Strings in Java, C#, and Python are immutable: evaluating `text = "hello"; text.toUpperCase();` produces a brand new string `"HELLO"`, leaving the original string `"hello"` completely unaltered in memory.
