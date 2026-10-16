---
label: Load balancer
aliases:
  - Application load balancer
  - Network load balancer
  - Traffic distributor
loanwords: []
plain_descriptions:
  - a traffic cop that distributes incoming website visitors evenly across multiple backend servers
  - a device or service preventing any single server from becoming overwhelmed by web requests
summary: >-
  A networking component that distributes incoming application or network traffic across a pool of backend destination
  servers.
confusable_notes: {}
follow_up_questions:
  - What are the performance differences between Layer 4 (TCP/UDP) and Layer 7 (HTTP/HTTPS) load balancing?
  - How does consistent hashing ensure predictable backend routing for stateful client sessions?
translation: native
---

## Easy explanation
Think of a bank teller queue manager: instead of customers crowding a single teller desk, the manager directs each person in line to whichever teller becomes free next.

## Details
Load balancers operate at Layer 4 (transport layer, routing by IP and port) or Layer 7 (application layer, routing by HTTP URL, headers, or cookies). They perform continuous health checks on backend instances, automatically bypassing unresponsive nodes. Standard balancing algorithms include round-robin, least connections, and weighted response time.

## Technical definition
A network component, often a reverse proxy at Layer 7, that spreads client connection requests across redundant compute targets while maintaining availability via health probing.

## Examples
An AWS Application Load Balancer receiving 50,000 HTTP requests per second and splitting traffic across thirty EC2 instances using the round-robin algorithm.
