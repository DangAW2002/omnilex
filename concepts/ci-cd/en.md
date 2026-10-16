---
label: CI/CD
aliases:
  - Continuous Integration and Continuous Delivery
loanwords: []
plain_descriptions:
  - automatically building, testing, and shipping code changes whenever engineers push work
  - the automated pipeline that moves software from development to live production servers
summary: >-
  A modern engineering methodology uniting frequent source integration with automated regression testing and reliable
  application deployment.
confusable_notes: {}
follow_up_questions:
  - What distinguishes continuous delivery from fully automated continuous deployment?
  - How do fast automated test suites prevent breaking changes in a CI/CD workflow?
translation: native
autolink:
  label: always
---

## Easy explanation
Picture a modern automobile factory: whenever a mechanic installs a newly designed component, robotic testers verify fitment instantly and prep the vehicle for delivery without manual bottlenecks.

## Details
Continuous integration encourages developers to merge their feature branches into a shared main branch frequently. Every push triggers an automated build runner that executes linters and test suites. Continuous delivery subsequently packages verified artifacts for staged environments, while continuous deployment automates the final release to production systems without human gatekeeping.

## Technical definition
An automated operational framework that couples version control events to sequential build, automated test, containerization, and rollout procedures.

## Examples
A backend developer commits a bugfix to Git; within four minutes, automated integration tests pass, creating a container artifact that deploys to the staging cluster immediately.
