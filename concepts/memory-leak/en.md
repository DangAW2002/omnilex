---
label: "Memory leak"
aliases: []
loanwords: []
plain_descriptions:
  - "software defect where heap storage remains allocated despite being abandoned by the application"
  - "gradual consumption of available RAM over time caused by abandoned references that cannot be cleaned up"
summary: "A resource defect occurring when a program fails to release allocated memory that is no longer required, degrading system performance over time."
confusable_notes:
  garbage-collection: "Garbage collection is the automated engine mechanism that reclaims unused memory, whereas a memory leak is a software defect where forgotten references prevent that reclamation."
follow_up_questions:
  - "How do heap profilers identify uncollected retainers and detached DOM nodes in long-running services?"
  - "Why do global event listeners and forgotten interval timers frequently cause memory leaks in client applications?"
translation: native
---

## Easy explanation
Think of renting library books and never returning them to the shelves. Over months, the study desk fills with forgotten, unread volumes until there is no open surface left to do any actual homework.

## Details
In manual memory systems (like C or C++), a memory leak happens when heap blocks allocated via `malloc` or `new` lose their pointer addresses without an accompanying `free` or `delete` call. In garbage-collected runtimes (like Java, C#, or JavaScript), leaks occur when obsolete objects remain reachable through lingering references, such as forgotten event listeners, unbounded caches, uncancelled background timers, or static collections. As accumulated memory grows, system paging increases, execution stutters, and the process eventually crashes with an out-of-memory error.

## Technical definition
A condition wherein dynamically allocated memory blocks remain allocated in an address space because reachable references prevent automated or manual reclamation, resulting in steady resource depletion.

## Examples
A backend service fails to clean up cached session tokens; memory usage creeps upward by 50 MB every hour until the container crashes at 4 GB capacity.
