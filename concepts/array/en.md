---
label: "Array"
qualifier: "(Programming)"
aliases: []
loanwords: []
autolink:
  label: never
plain_descriptions:
  - "ordered collection of elements stored at contiguous memory locations accessed by zero-based indices"
  - "basic sequence list where each item is identified by its numerical position"
summary: "A linear data structure consisting of a collection of elements identified by index or key, stored in contiguous memory locations."
confusable_notes:
  hash-table: "An array positions elements sequentially in contiguous memory indexed by integers, whereas a hash table associates values with arbitrary keys using a hashing function."
follow_up_questions:
  - "Why does spatial locality make sequential array traversals exceptionally fast on modern CPU caches?"
  - "How do dynamic arrays maintain amortized O(1) append times during geometric buffer growth?"
translation: native
---

## Easy explanation
Think of an egg carton with a row of molded cups numbered from 0 to 11. Storing an egg in cup 4 allows someone to reach directly into that exact fourth slot instantly without touching or inspecting the eggs resting in cups 0, 1, 2, or 3.

## Details
In traditional low-level systems, an array holds homogeneous data types in an unbroken, contiguous block of RAM. Because element sizes are uniform, calculating the physical address of element $i$ requires a trivial arithmetic offset: $\text{address} = \text{base} + i \times \text{element\_size}$, enabling instantaneous $O(1)$ random access. However, inserting or removing elements at intermediate positions requires shifting subsequent elements, incurring $O(n)$ time complexity. Dynamic arrays (like `std::vector` in C++ or `ArrayList` in Java) wrap fixed arrays, geometrically doubling their capacity when filled to preserve amortized $O(1)$ appends.

## Technical definition
A contiguous, indexed allocation of memory containing a homogeneous or heterogenous sequence of values addressable by integer offsets relative to an initial base pointer.

## Examples
An array of temperatures `[28, 31, 29, 32]` stores four readings; accessing index 2 returns 29 degrees Celsius immediately in one memory read.
