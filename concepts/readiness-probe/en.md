---
label: Readiness probe
aliases: []
loanwords: []
plain_descriptions:
  - container check that tells the load balancer whether an app has finished booting and is ready for customer requests
  - gateway guard that temporarily pauses incoming traffic to a container while it warms up its cache or migrations
summary: >-
  A diagnostic probe that determines whether a containerized application is prepared to accept network traffic, removing it from load balancer targets until ready.
confusable_notes:
  liveness-probe: >-
    A readiness probe signals whether a container can safely receive user traffic without restarting the container, whereas a liveness probe triggers a full container reboot when it fails.
follow_up_questions:
  - "How does a readiness probe prevent zero-downtime rolling updates from sending traffic to uninitialized pods?"
  - "Under what circumstances should an application temporarily mark itself unready without restarting?"
translation: native
---

## Easy explanation
Like a restaurant hostess standing at the door: she checks if the kitchen has finished preparing before seating guests; if the kitchen is still prepping, guests wait outside rather than sitting at empty tables.

## Details
A readiness probe is a container lifecycle check used by orchestrators to determine whether a container is ready to accept incoming network traffic. During application startup, a service may need several seconds to parse configuration files, warm memory caches, establish database connection pools, or run schema migrations. Until the readiness probe returns success, the pod is not added to the service endpoint list and receives no traffic from the load balancer. Crucially, a failing readiness probe does not kill or reboot the container; it merely isolates it from traffic until it reports ready.

## Technical definition
A lifecycle probe that controls whether a containerized endpoint is included in network service routing tables based on its readiness state.

## Examples
A Java microservice takes twenty seconds to warm its caches upon boot; during this window its readiness probe returns 503, ensuring Kubernetes routes user requests only after cache warming completes.
