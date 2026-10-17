---
label: "Parallelism"
qualifier: "(Computing)"
aliases: []
loanwords: []
plain_descriptions:
  - "executing multiple computational tasks at the exact same physical moment across separate processor cores"
  - "splitting a heavy calculation across multiple hardware processing units to finish work faster"
summary: "The simultaneous physical execution of multiple computations at the exact same instant across distinct hardware processing units."
confusable_notes:
  concurrency: "Parallelism requires multiple physical processor cores executing instructions simultaneously, whereas concurrency is a design structure that manages multiple tasks over overlapping time."
follow_up_questions:
  - "How does Amdahl’s Law define the theoretical speedup limit when adding more cores to a parallel workload?"
  - "What architectural differences separate data parallelism from task parallelism in modern computing?"
translation: native
---

## Easy explanation
Think of a highway expanding from a single lane into four separate lanes. Four cars drive side by side at the identical instant, quadrupling the volume of traffic moving past a checkpoint without any car needing to swerve or take turns.

## Details
Parallelism physically executes independent instruction streams at the identical clock tick across multiple processor cores, graphical processing units (GPUs), or distributed cluster nodes. It divides into data parallelism, where identical operations apply simultaneously across distinct chunks of a dataset (such as matrix multiplication), and task parallelism, where completely distinct procedures execute in parallel. Parallel execution provides pure computational speedup for CPU-bound tasks, but introduces architectural challenges like memory bus saturation, cache coherence overhead, and synchronization locks.

## Technical definition
The simultaneous execution of multiple discrete computations at the exact same instant in time, fundamentally requiring multi-core, multi-processor, or distributed hardware architectures.

## Examples
Rendering a 3D animation assigns 16 individual video frames to 16 separate CPU cores, rendering all 16 frames simultaneously in 2 seconds instead of taking 32 seconds sequentially.
