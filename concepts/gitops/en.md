---
label: GitOps
aliases: []
loanwords: []
plain_descriptions:
  - maintaining Git repositories as the authoritative definition of desired cloud infrastructure
  - automated reconciliation between declarative version control files and live cluster resources
summary: >-
  An operational paradigm that treats version-controlled Git repositories as the authoritative blueprint for declaring and managing infrastructure state.
confusable_notes: {}
follow_up_questions:
  - "How does pull-based GitOps differ from traditional push-based CI/CD pipelines?"
  - "Why does reconciling state from Git repositories simplify auditability and rollback?"
translation: native
---

## Easy explanation
Imagine ordering furniture from a catalog where the warehouse continuously checks your order list; if any item in your living room does not match the list, a worker immediately swaps it to match.

## Details
In a GitOps workflow, the desired state of your infrastructure and applications is described declaratively in Git repositories. An automated agent running inside the cluster regularly pulls this repository, compares the declared manifests with live resources, and reconciles any discrepancies automatically. Developers trigger deployments by opening pull requests, running code reviews, and merging commits rather than executing manual deployment scripts. If configuration drift occurs on a live cluster, the reconciling agent either overwrites the rogue modifications or alerts the team.

## Technical definition
A cloud-native operating model where declarative infrastructure configurations are stored in version control systems and automatically synchronized to runtime environments via software reconciliation agents.

## Examples
A platform team commits a Kubernetes deployment manifest specifying three replicas of an authentication service into their production repository; the in-cluster Argo CD operator detects the commit and spins up the third pod within thirty seconds.
