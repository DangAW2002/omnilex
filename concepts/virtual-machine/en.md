---
label: Virtual machine (VM)
aliases:
  - VM
loanwords: []
plain_descriptions:
  - a software simulation of an entire physical computer running its own complete operating system
  - a virtual computer created inside a powerful server that behaves just like a physical machine
summary: >-
  A software emulation of a physical computer system that executes applications within a dedicated, isolated guest
  operating system managed by a hypervisor.
confusable_notes:
  software-container: >-
    A virtual machine emulates entire hardware stacks and boots a dedicated guest OS kernel, whereas a container
    packages application dependencies while sharing the host kernel.
follow_up_questions:
  - How does a Type-1 bare-metal hypervisor differ in performance from a Type-2 hosted hypervisor?
  - Why do virtual machines offer stronger security isolation boundaries than containers?
translation: native
autolink:
  aliases:
    VM: always
---

## Easy explanation
Think of an apartment building: the physical structure is the host server, but each apartment is a self-contained home with its own front door, kitchen, and climate control, completely isolated from neighbors.

## Details
A virtual machine runs on top of a hypervisor (such as KVM, ESXi, or Hyper-V) that partitions physical CPU, RAM, disk, and network interfaces. Because each VM runs its own independent operating system kernel, it provides strong security boundaries and can host legacy software requiring specific OS builds, albeit with higher memory overhead and slower boot times than containers.

## Technical definition
A hardware-level virtualization construct emulating an independent computing architecture executing an autonomous guest operating system.

## Examples
An Ubuntu 24.04 virtual machine provisioned on an enterprise cloud host with 4 virtual CPUs and 16 GB of dedicated RAM.
