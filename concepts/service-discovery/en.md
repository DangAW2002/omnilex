---
label: Service discovery
aliases: []
loanwords: []
plain_descriptions:
  - automatic mechanism for microservices to find each other on dynamic cloud networks
  - automated network phonebook that tracks changing server IP addresses in real time
summary: The automatic detection and location resolution of microservices, instances, and endpoints on a network through a centralized or distributed registry.
confusable_notes: {}
follow_up_questions:
  - How does client-side service discovery compare to server-side service discovery using a load balancer?
  - How does DNS-based service discovery in Kubernetes dynamically route traffic to healthy pod endpoints?
translation: native
---

## Easy explanation
Like an automated rideshare map app: passengers do not need to memorize a specific taxi driver’s personal phone number; the app automatically finds nearby available drivers and matches you in seconds.

## Details
In modern dynamic environments with autoscaling containers and ephemeral cloud instances, IP addresses change constantly as pods crash or scale. Service discovery uses an internal registry (such as Kubernetes CoreDNS, HashiCorp Consul, or AWS Cloud Map) where services register on startup. Other services query the registry using logical service names (e.g., `payment-service.internal`) rather than hardcoded IP addresses.

## Technical definition
A distributed directory architecture that maintains real-time records of active network endpoints, coupling health check monitoring with dynamic DNS or API registries to route traffic across volatile service topologies.

## Examples
In a Kubernetes cluster, a frontend container connects to a database by resolving the hostname `postgres-db.default.svc.cluster.local`, which CoreDNS resolves to the active IP address of the database service.
