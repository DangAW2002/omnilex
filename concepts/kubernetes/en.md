---
label: Kubernetes
aliases:
  - K8s
loanwords: []
plain_descriptions:
  - an orchestration platform that automatically deploys, scales, and heals containers across clusters of machines
  - the industry standard control system for managing container fleets in production
summary: >-
  An open-source container orchestration system for automating deployment, scaling, management, and self-healing of
  containerized applications.
confusable_notes:
  docker-compose: Kubernetes orchestrates container fleets across clusters of distributed physical nodes in production, whereas Docker Compose manages multi-container stacks on a single local host.
follow_up_questions:
  - What role does the control plane etcd database play in maintaining cluster state?
  - How does Kubernetes detect and replace failed application pods automatically?
translation: native
autolink:
  aliases:
    K8s: always
---

## Easy explanation
Picture the conductor of a massive symphony orchestra: rather than playing every instrument, the conductor directs hundreds of musicians, cueing entrances and keeping perfect tempo.

## Details
Kubernetes groups physical or virtual servers into a unified cluster managed by a control plane. Engineers declare desired state using YAML manifests. Controllers continuously reconcile the cluster state: if a node crashes or a process fails, Kubernetes schedules replacement pods onto healthy worker machines automatically without human intervention.

## Technical definition
A distributed control plane architecture maintaining declared desired state across containerized workloads via continuous reconciliation loops and declarative APIs.

## Examples
An e-commerce company runs 300 instances of its search service across 20 cluster nodes, scaling up to 800 instances during holiday sales surges automatically.
