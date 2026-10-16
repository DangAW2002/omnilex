---
label: Cache
qualifier: (Software)
aliases:
  - software cache
  - memory cache
loanwords: []
autolink:
  label: never
plain_descriptions:
  - a fast temporary storage area saving frequent answers so the computer skips slow re-calculations
  - keeping copies of popular web pages in memory so users don't wait for slow database queries
summary: A high-speed data storage layer that stores a subset of transient data so future requests are served faster than accessing primary storage.
confusable_notes: {}
follow_up_questions:
  - What strategies exist for cache invalidation when underlying records change?
  - How does a cache stampede happen and how can mutex locks prevent it?
translation: native
---

## Easy explanation
Keeping a cheat sheet of frequently dialed phone numbers right on your desk instead of looking them up in the heavy telephone directory every time.

## Details
Caches operate close to consuming components in memory (such as RAM or Redis). When a request arrives, the system checks for a cache hit; if absent (a cache miss), it fetches the canonical record from persistent disks, delivers it, and stores a copy with an expiration time-to-live (TTL).

## Technical definition
An intermediate, low-latency computational storage tier holding replicated copies of primary data to optimize read throughput and minimize access latency.

## Examples
Storing product catalog listings in an in-memory Redis key-value store to handle flash-sale traffic spikes without crashing the main SQL database.
