---
label: Consistent hashing
aliases:
  - Hash ring
  - Ring hashing
loanwords: []
plain_descriptions:
  - hashing technique that minimizes data movement when servers are added or removed
  - distributed algorithm mapping keys and nodes onto a circular ring to prevent mass rebalancing
summary: A distributed hashing algorithm where resizing the bucket array requires only K/N keys to be remapped on average, mapping nodes and data keys onto a circular ring space.
confusable_notes: {}
follow_up_questions:
  - How do virtual nodes (vnodes) address hot spots and uneven hash ring distribution across physical machines?
  - How does bounded-load consistent hashing prevent cascading overloads on neighbor nodes during failures?
translation: native
---

## Easy explanation
Like placing numbered mailboxes around a circular running track: when a letter arrives with a number, you walk forward clockwise until you reach the nearest mailbox; adding a new mailbox only takes mail from its immediate neighbor.

## Details
Traditional hashing calculates node assignment using modulo arithmetic (hash(key) % N). When the node count N changes, nearly 100% of keys remap to new locations, obliterating cache hit ratios and triggering database stampedes. Consistent hashing maps both storage nodes and data keys onto a circular identifier ring (typically 0 to 2^32-1) using consistent hash functions like SHA-1. A key is stored on the first node encountered clockwise. When a node joins or leaves, only K/N keys move on average. Virtual nodes assign multiple random points to each physical server, ensuring smooth load balancing.

## Technical definition
A distributed partitioning scheme where keys and target nodes map onto a uniform circular identifier space, bounding data migration to a fraction of total items upon topological changes.

## Examples
A distributed caching cluster of 8 Memcached servers using consistent hashing where adding a 9th server causes only 11% of cached keys to be reallocated, leaving 89% of cache entries intact.
