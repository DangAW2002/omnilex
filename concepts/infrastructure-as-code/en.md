---
label: Infrastructure as code (IaC)
aliases:
  - IaC
  - Programmable infrastructure
loanwords: []
plain_descriptions:
  - setting up servers, databases, and networks using code files rather than clicking around in cloud consoles
  - managing computer infrastructure through version-controlled text files that can be reviewed and tested
summary: >-
  The practice of managing, provisioning, and configuring IT infrastructure through machine-readable definition files
  rather than manual procedures.
confusable_notes: {}
follow_up_questions:
  - What are the operational differences between declarative and imperative IaC approaches?
  - How does configuration drift occur and how do IaC tools reconcile it?
translation: native
autolink:
  aliases:
    IaC: always
---

## Easy explanation
Think of architectural blueprints fed directly into an automated 3D printer: instead of builders laying bricks by hand, the machine reads the digital file and builds the exact house identically every time.

## Details
Infrastructure as Code allows teams to define virtual networks, load balancers, database clusters, and permissions in declarative files (such as Terraform HCL, OpenTofu, or Bicep). These configurations live in Git repositories, enabling version history, peer code review, automated testing, and repeatable deployments across staging and production.

## Technical definition
A system administration methodology that treats compute, network, and storage topologies as version-controlled, auditable, and automated software artifacts.

## Examples
A Terraform file declaring an AWS VPC with two private subnets and a managed PostgreSQL database, executed via `terraform apply` to reproduce identical staging environments.
