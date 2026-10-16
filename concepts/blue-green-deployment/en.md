---
label: Blue-green deployment
aliases:
  - Red-black deployment
loanwords: []
plain_descriptions:
  - running two identical environments side by side and switching user traffic instantly to the new one
  - a release technique that eliminates downtime by preparing updates in a cloned backup environment
summary: >-
  A deployment strategy that provisions two identical production environments (Blue and Green), shifting all traffic
  from the active to the idle environment upon validation.
confusable_notes:
  canary-release: >-
    Blue-green deployment cuts over all production traffic at once to a fully cloned identical environment, whereas a
    canary release gradually routes a small percentage of user traffic to the new version before complete rollout.
follow_up_questions:
  - How does blue-green deployment facilitate near-instantaneous rollbacks if defects arise?
  - What strategies handle database synchronization when running parallel Blue and Green environments?
translation: native
---

## Easy explanation
Picture a theater with two identical stages next to each other: while the actors perform on Stage Blue, the crew sets up Stage Green behind the curtain. At intermission, the spotlight swings instantly to Stage Green.

## Details
In a blue-green strategy, one environment (e.g., Blue) serves live user traffic while the duplicate environment (Green) hosts the newly deployed version. Engineers execute smoke tests and verification against Green in isolation. Once approved, the router or load balancer switches incoming traffic from Blue to Green simultaneously, providing instant cutover and an immediate fallback path if needed.

## Technical definition
A deployment pattern maintaining parallel identical infrastructure stacks, transitioning active routing target bindings atomically between environments.

## Examples
A banking portal runs on the Blue cluster while version 3.0 is deployed and tested on Green; the load balancer routes all new incoming connections to Green at midnight.
