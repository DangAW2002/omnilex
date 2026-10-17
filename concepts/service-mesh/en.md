---
label: Service mesh
aliases:
  - Sidecar proxy mesh
loanwords: []
plain_descriptions:
  - dedicated infrastructure layer managing network communication between microservices
  - network of sidecar proxies securing and observing service-to-service calls
summary: A dedicated infrastructure layer of networked sidecar proxies that manages, secures, and observes service-to-service communications without modifying application code.
confusable_notes: {}
follow_up_questions:
  - What is the operational distinction between the control plane and data plane in a service mesh?
  - When does the latency overhead of a sidecar proxy outweigh the security benefits of mTLS?
translation: native
---

## Easy explanation
Picture a secure courier assigned to walk alongside every government diplomat, handling all diplomatic mail, verifying visitor credentials, and recording delivery logs without burdening the diplomat.

## Details
As microservice environments scale to hundreds of components, managing mutual TLS certificates, circuit breakers, service discovery, and tracing inside individual application codebases becomes unmaintainable. A service mesh delegates these networking responsibilities to lightweight sidecar proxies (like Envoy) running in the same pod or container namespace as the service. A centralized control plane distributes routing rules and cryptographic identities to the proxies, which manage data-plane communications autonomously.

## Technical definition
A configurable, low-latency infrastructure layer designed to handle high volumes of inter-process communications through transparent proxy injection and centralized policy orchestration.

## Examples
A cluster of 150 Kubernetes services where sidecar proxies automatically enforce mutual TLS encryption and collect distributed latency traces across 45,000 internal RPC calls per minute.
