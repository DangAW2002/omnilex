---
label: "Hash table"
aliases:
  - "Hash map"
loanwords: []
plain_descriptions:
  - "associative data structure that pairs keys with values for ultra-fast lookups"
  - "dictionary-style storage layout using a mathematical hash function to locate items in constant average time"
summary: "A data structure that implements an associative array abstract data type, mapping keys to values using a hashing function."
confusable_notes:
  array: "A hash table maps arbitrary keys to values using a mathematical hashing function, whereas an array stores elements sequentially at fixed numerical indices."
follow_up_questions:
  - "How do separate chaining and open addressing resolve collisions when multiple keys hash to identical bucket indices?"
  - "Why does a deteriorating load factor trigger rehashing and resizing into a larger backing array?"
translation: native
---

## Easy explanation
Think of a coat check counter at a concert hall. Handing over an overcoat yields a numbered brass token; when returning later, presenting that unique token lets the attendant retrieve the exact coat immediately from the matching numbered hook without scanning through 500 coats.

## Details
A hash table stores key-value pairs inside an underlying array of buckets. When a key is inserted or queried, an internal hash function transforms the key into an integer hash code, which is mapped via modulo arithmetic to an array index. Under healthy conditions, lookups, insertions, and deletions execute in $O(1)$ constant average time. When distinct keys produce identical bucket indices, collision resolution strategies (such as linked lists via separate chaining, or probing sequences via open addressing) resolve conflicts. When the ratio of stored items to array capacity (load factor) crosses a threshold, the table allocates a larger array and rehashes all elements.

## Technical definition
An associative data structure that computes an index into an array of buckets via a hashing algorithm, enabling direct constant-time expected access to mapped value records.

## Examples
A caching layer stores user sessions: querying the string key `"sess_982"` computes bucket index 42, retrieving the associated profile object in 0.05 milliseconds.
