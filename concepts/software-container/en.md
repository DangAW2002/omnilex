---
label: Container
qualifier: (Software)
aliases:
  - Application container
loanwords: []
plain_descriptions:
  - a lightweight sandbox containing an app and its dependencies to run anywhere reliably
  - an isolated environment running software using shared operating system resources
summary: >-
  A standard unit of software packaging code and all runtime dependencies to execute reliably in isolation on a shared
  OS kernel.
confusable_notes:
  virtual-machine: >-
    A software container shares the host operating system kernel and isolates processes in user space, whereas a virtual
    machine runs a complete guest operating system on top of a hypervisor.
  container-image: >-
    A container is an active running instance with mutable runtime state, whereas a container image is an inert,
    read-only package of files used to instantiate containers.
follow_up_questions:
  - How do Linux namespaces and cgroups provide isolation for containers?
  - Why do containers start significantly faster than traditional virtual machines?
translation: native
autolink:
  label: never
---

## Easy explanation
Think of standard cargo containers on freight ships: each modular steel box holds goods independently, stacking efficiently on any vessel without modifying the ship deck.

## Details
Software containers achieve lightweight process segregation by leveraging host operating system features rather than simulating physical hardware. On Linux, namespaces isolate process IDs, network interfaces, mount points, and user permissions, while control groups (cgroups) meter and restrict CPU, memory, and disk bandwidth consumption.

## Technical definition
An operating-system-level virtualization mechanism that encapsulates an execution environment, filesystem layers, and process tree over a shared kernel.

## Examples
A Python Flask application bundled with its exact packages, running inside a lightweight Alpine container that consumes under 40 MB of host memory.
