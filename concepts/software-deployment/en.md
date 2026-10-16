---
label: Deployment
qualifier: (Software)
aliases:
  - Application deployment
loanwords: []
plain_descriptions:
  - the process of installing and activating a new version of software on live servers
  - rolling out updated application packages to make them accessible to users
summary: >-
  The operational process of releasing, installing, configuring, and activating a software version in a target hosting environment.
confusable_notes: {}
follow_up_questions:
  - What mechanisms allow rolling deployments to update instances without causing downtime?
  - How do health check probes prevent broken deployments from serving live user requests?
translation: native
autolink:
  label: never
---

## Easy explanation
Imagine replacing city buses with new models during active service: fresh buses enter the route one by one as older buses return to the depot, so commuters never experience delays.

## Details
A deployment encapsulates moving an artifact (binaries, packages, or container images) into an execution environment. Advanced deployment strategies like rolling updates replace active instances progressively, validating health check responses before terminating previous versions. In Kubernetes, a Deployment object automates replica scaling and rollout state management.

## Technical definition
A higher-order operational workflow or declarative controller managing replica counts, update progression, and rollback states of running workloads.

## Examples
Updating an online payment API from version 2.1 to 2.2 across six server replicas two at a time, ensuring continuous 100% service uptime during the release.
