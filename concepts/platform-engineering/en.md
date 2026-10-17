---
label: Platform engineering
aliases: []
loanwords: []
plain_descriptions:
  - building internal self-service developer portals and tools so software engineers can deploy code without filing tickets
  - designing an internal cloud platform as a product to reduce cognitive burden on application development teams
summary: >-
  The practice of designing and building internal developer platforms that provide self-service capabilities and standardized workflows to accelerate software delivery.
confusable_notes: {}
follow_up_questions:
  - "How does treating an Internal Developer Platform as a product with user feedback improve engineering adoption?"
  - "Why does platform engineering alleviate the cognitive overload placed on developers by modern cloud tools?"
translation: native
---

## Easy explanation
Like a municipal utility providing clean running water and electricity through standard wall sockets, so homeowners do not need to dig their own wells or build personal generators.

## Details
Platform engineering is an operational discipline focused on building and maintaining Internal Developer Platforms (IDPs). As cloud-native technology stacks grew increasingly complex, software developers suffered from severe cognitive overload trying to configure Kubernetes, IAM roles, network meshes, and databases. Dedicated platform teams bridge this gap by curating approved infrastructure primitives, automated security guardrails, and self-service portals. Developers can spin up pre-configured environments, provision databases, and ship code via golden paths without needing specialized infrastructure knowledge or submitting manual support tickets.

## Technical definition
The discipline of designing, constructing, and maintaining internal developer platforms that deliver automated infrastructure abstractions and self-service workflows.

## Examples
A central platform team deploys an internal developer portal powered by Backstage, allowing application engineers to provision a secure database and CI pipeline with three clicks.
