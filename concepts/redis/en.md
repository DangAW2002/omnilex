---
label: Redis
aliases: []
loanwords: []
plain_descriptions:
  - an ultra-fast in-memory data store used to cache pages and speed up web applications
  - a RAM-based software system that remembers answers and counters in fractions of a millisecond
summary: An open-source, in-memory data structure store used as a high-speed database, cache, message broker, and streaming engine.
confusable_notes: {}
follow_up_questions:
  - How does single-threaded event-loop execution in Redis eliminate lock contention while serving sub-millisecond queries?
  - What persistence options (RDB snapshots vs. AOF append-only files) does Redis provide to guard against RAM loss?
translation: native
---

## Easy explanation
Like keeping your car keys and wallet right on the entryway table next to your front door, so you can grab them instantly on your way out without searching bedroom drawers upstairs.

## Details
Redis holds its entire dataset in system memory (RAM), delivering read and write operations with sub-millisecond latencies. Beyond simple key-value strings, Redis provides rich native data structures: lists, sets, sorted sets (for leaderboards), hashes, bitmaps, and streams. It supports background asynchronous disk persistence (RDB snapshots and AOF logs) and clustering for distributed scalability.

## Technical definition
An open-source, in-memory key-value data structure server that executes operations within a single-threaded non-blocking I/O event loop with sub-millisecond response guarantees.

## Examples
An online gaming platform uses Redis Sorted Sets to maintain a live top-100 player leaderboard, calculating rank updates for 50,000 players in under 2 milliseconds.
