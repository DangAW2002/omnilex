---
label: "Garbage collection"
aliases: []
loanwords: []
plain_descriptions:
  - "automatic memory management system that finds and recycles memory occupied by abandoned objects"
  - "runtime engine feature that automatically frees heap space that a program can no longer reach"
summary: "An automatic memory management mechanism in a runtime environment that detects and reclaims heap memory occupied by unreachable objects."
confusable_notes:
  memory-leak: "Garbage collection is the automated engine subsystem that discovers and recycles abandoned heap memory, whereas a memory leak is an application bug preventing objects from becoming eligible for collection."
follow_up_questions:
  - "How does generational garbage collection exploit the observation that most objects have extremely short lifespans?"
  - "What causes stop-the-world pauses during mark-and-sweep phases in low-latency systems?"
translation: native
---

## Easy explanation
Picture an attentive janitorial crew in an active convention center. As attendees finish cups of coffee and leave empty cardboard cups behind on tables, the crew moves through the halls, collects the abandoned cups, and discards them into recycling bins to keep tables clear for new guests.

## Details
Garbage collectors relieve developers from manually freeing dynamic heap allocations. Most modern runtimes use tracing algorithms like mark-and-sweep: starting from root references (stack variables, CPU registers, static fields), the engine traverses all accessible pointers, marking live objects and sweeping away unmarked objects to reclaim their storage. Advanced implementations categorize objects into generations (generation 0, 1, and 2), inspecting short-lived temporary objects frequently while auditing long-lived objects less often to minimize latency overhead and stop-the-world pauses.

## Technical definition
An automated runtime memory management service that identifies unreachable memory allocations through graph traversal or reference tracking and recycles the physical memory space.

## Examples
A loop allocates 10,000 temporary calculation objects; once the loop terminates and local pointers leave scope, the garbage collector runs a generation 0 pass and reclaims all 10,000 blocks in 4 milliseconds.
