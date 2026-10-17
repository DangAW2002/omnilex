---
label: "Thread"
qualifier: "(Programming)"
aliases: []
loanwords: []
autolink:
  label: never
plain_descriptions:
  - "smallest sequence of programmed instructions that an operating system scheduler can manage independently"
  - "lightweight execution line running inside a process that shares memory with sibling threads"
summary: "The smallest unit of execution within an operating system process, sharing its parent memory space and resources with other threads."
confusable_notes:
  thread-iot: "Thread (Programming) is a unit of execution inside a process, whereas Thread (IoT) is an IPv6 wireless mesh networking protocol for low-power devices."
  os-process: "A process owns an independent, isolated memory space and dedicated system resources, whereas a thread lives inside a process and shares its address space with sibling threads."
follow_up_questions:
  - "How do mutex locks and semaphores prevent race conditions between concurrent threads sharing memory?"
  - "What performance overhead occurs during kernel-level thread context switches on multi-core processors?"
translation: native
---

## Easy explanation
Picture several chefs working side by side inside a shared restaurant kitchen. Every chef follows their own cooking task, but they all share access to the same pantry, spice racks, and refrigeration units to prepare dinner simultaneously.

## Details
A thread represents an independent instruction stream scheduled inside an active process environment. Every thread hosted by that process accesses the shared heap memory, open file descriptors, and global state, but each thread retains its own private call stack, program counter, and processor register set. This shared memory model enables rapid inter-thread communication without inter-process communication overhead. However, concurrent unsynchronized mutations of shared data can introduce severe race conditions and deadlocks, necessitating synchronization primitives like locks, monitors, or atomic variables.

## Technical definition
A dispatchable unit of execution managed by an operating system scheduler, consisting of a stack, register state, and program counter within an enclosing process's virtual address space.

## Examples
A photo editor uses one thread to accept user clicks on toolbars while spinning up two background worker threads to apply color corrections across 50 megapixels of raw image data.
