---
label: "Process"
qualifier: "(Operating system)"
aliases: []
loanwords: []
autolink:
  label: never
plain_descriptions:
  - "running instance of a computer program with its own dedicated memory space"
  - "isolated execution environment managed by the operating system containing code, resources, and threads"
summary: "An executing instance of a computer program allocated its own isolated memory address space and operating system resources."
confusable_notes:
  thread-programming: "A process owns an isolated virtual memory space and operating system handles, whereas a thread is a lightweight execution stream residing within and sharing the memory of a process."
follow_up_questions:
  - "How does virtual memory isolation prevent a malfunctioning process from accessing or corrupting another process’s state?"
  - "What mechanisms, such as pipes and shared memory segments, enable inter-process communication across isolated boundaries?"
translation: native
---

## Easy explanation
Think of distinct standalone office suites in a corporate building. Each company occupies its own locked suite with private desks, filing cabinets, and security badges; employees inside cannot access the neighbouring company’s documents without formal delivery letters.

## Details
When an operating system launches an executable program, it instantiates a process. The kernel assigns the process a unique process identifier (PID), allocates a private virtual memory address space, and attaches system resource handles such as security tokens, network sockets, and file descriptors. Because memory is strongly partitioned by hardware memory management units (MMUs), one crashing process cannot directly corrupt or crash another. Communicating across process boundaries requires formal inter-process communication (IPC) channels like Unix domain sockets, pipes, or shared memory segments.

## Technical definition
An operating system abstraction representing an active execution environment containing a dedicated virtual address space, security credentials, resource handles, and at least one execution thread.

## Examples
A modern web browser launches each browser tab as an independent process; if a heavy script crashes tab 4, the remaining tabs continue running without losing user data.
