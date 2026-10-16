---
label: Pod
qualifier: (Kubernetes)
aliases:
  - K8s pod
loanwords: []
plain_descriptions:
  - the smallest deployable unit in Kubernetes, containing one or more tightly linked containers
  - a shared wrapper that gives grouped containers the same IP address and storage volumes
summary: >-
  The smallest deployable computing unit in Kubernetes, encapsulating one or more tightly coupled containers sharing
  network and storage resources.
confusable_notes: {}
follow_up_questions:
  - When is it appropriate to place multiple containers into a single pod using the sidecar pattern?
  - Why are Kubernetes pods treated as ephemeral, disposable entities rather than permanent servers?
translation: native
autolink:
  label: never
---

## Easy explanation
Think of a pea pod: several peas live together inside a single protective outer pod, sharing the exact same shell and moisture.

## Details
In Kubernetes, containers are never scheduled individually onto worker nodes; they are always wrapped inside a pod. Containers in the same pod share a network namespace (including IP address and ports) and can communicate via `localhost`. They can also mount common storage volumes to exchange files or cache data.

## Technical definition
An atomic workload abstraction managing co-located container groups that share an IPC namespace, a network namespace, and storage volumes on a single host node.

## Examples
A pod running a primary web application container alongside a lightweight logging sidecar container that streams access logs to a central monitoring system.
