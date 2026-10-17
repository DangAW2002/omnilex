---
label: Horizontal scaling
aliases:
  - Scale out
  - Scaling out
loanwords: []
plain_descriptions:
  - adding more machines or server instances to share workload
  - expanding capacity by running multiple copies of an application across a cluster
summary: The practice of increasing system capacity and handling greater load by adding more independent compute nodes or instances to a resource pool.
confusable_notes:
  vertical-scaling: Horizontal scaling adds more machines of similar size to distribute traffic across a cluster, whereas vertical scaling upgrades an existing single machine with more CPU, RAM, or disk capacity.
follow_up_questions:
  - What architectural prerequisites must an application satisfy to support stateless horizontal scaling?
  - How do distributed state stores and shared caches enable seamless horizontal scaling?
translation: native
---

## Easy explanation
Instead of hiring one giant superhuman worker to lift heavy boxes, a warehouse hires 10 regular workers who work side by side to carry the boxes together.

## Details
Horizontal scaling (scaling out) increases throughput and concurrency by deploying additional identical compute instances behind a load balancer. When request rates surge, an autoscaling controller launches new virtual machines or container replicas across availability zones. Because each server handles a fraction of the incoming traffic, no individual machine is pushed past its capacity. However, horizontal scaling requires applications to be designed as stateless services that offload session state and persistent files to external caches and databases.

## Technical definition
The architectural expansion of system capacity by introducing additional discrete computational nodes operating concurrently within a coordinated distributed cluster.

## Examples
A ticketing web application automatically expanding its fleet from 5 web server containers to 30 containers when concert ticket sales go live, handling 60,000 requests per minute smoothly.
