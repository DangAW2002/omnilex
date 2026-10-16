---
label: Graphics Processing Unit (GPU)
aliases:
  - GPU
loanwords: []
autolink:
  aliases:
    GPU: always
plain_descriptions:
  - high-performance computer chips designed to handle massive parallel math for AI
  - the dedicated hardware processors that accelerate neural network training and inference
summary: A specialized electronic processor optimized for high-throughput parallel execution of mathematical matrix operations essential for deep learning.
confusable_notes: {}
follow_up_questions:
  - Why is memory bandwidth often a bigger bottleneck than compute FLOPS during LLM inference?
  - How do specialized tensor cores inside modern GPUs accelerate mixed-precision matrix multiplication?
translation: native
---

## Easy explanation
A standard CPU is like a brilliant master chef who can cook any complex recipe flawlessly one dish at a time; a GPU is like a kitchen brigade of two thousand cooks simultaneously chopping vegetables and frying eggs in parallel.

## Details
While general-purpose central processing units (CPUs) excel at sequential logic and branch prediction across a few powerful cores, graphics processing units (GPUs) feature thousands of smaller, energy-efficient cores designed for data parallelism. Deep neural networks consist fundamentally of large matrix multiplications and tensor additions, operations that map naturally onto GPU SIMD/SIMT architectures. Modern enterprise GPUs integrate dedicated tensor cores, high-bandwidth memory (HBM), and high-speed interconnects (like NVLink) to cluster thousands of processors for frontier model training.

## Technical definition
A massively parallel microprocessor architecture characterized by high memory bandwidth and thousands of arithmetic logic units engineered for high-throughput matrix and tensor algebra.

## Examples
An AI research lab clustering five hundred server GPUs interconnected over high-speed optical fabrics to train a multimodal foundational model.
