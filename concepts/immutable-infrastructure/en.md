---
label: Immutable infrastructure
aliases: []
loanwords: []
plain_descriptions:
  - infrastructure practice where servers are never modified in place; instead, they are completely replaced with fresh images
  - treating servers like disposable components that are rebuilt from scratch for every deployment
summary: >-
  An infrastructure paradigm where servers, containers, or virtual machines are never modified in place after deployment, but replaced entirely with new versions.
confusable_notes:
  configuration-management: >-
    Immutable infrastructure discards and replaces running servers whenever updates or patches occur, whereas traditional configuration management applies mutations to live running instances.
follow_up_questions:
  - "Why does the cattle versus pets analogy illustrate the mindset shift toward immutable infrastructure?"
  - "How does baking pre-configured golden images simplify disaster recovery and autoscaling speed?"
translation: native
---

## Easy explanation
Like drinking from paper cups rather than washing and repairing delicate ceramic mugs: every time you want a drink, you take a clean, identical cup, and toss the old one away when finished.

## Details
Immutable infrastructure is a design pattern where deployed components—such as virtual machines, machine images, or container images—are treated as read-only artifacts. If an application update, security patch, or configuration tweak is required, engineers do not log into live machines to apply changes. Instead, automated build pipelines create a brand-new image from version-controlled blueprints, spin up new replacement instances, verify their functionality, and gracefully terminate the outdated instances. This approach eliminates configuration drift, guarantees reproducibility across testing and production, and turns rollbacks into trivial redirects to previous images.

## Technical definition
An architectural pattern where infrastructure components are never updated in-place post-deployment, requiring replacement by newly built and versioned instances.

## Examples
When releasing version 3.0 of a cloud service, the deployment system provisions twenty fresh virtual machine instances running a newly baked image, routes user traffic to them, and deletes the old version 2.9 servers.
