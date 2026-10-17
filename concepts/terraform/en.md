---
label: Terraform
aliases: []
loanwords: []
plain_descriptions:
  - tool for creating and managing cloud servers using readable code files
  - infrastructure as code software that provisions resources on multiple clouds
summary: An open-source infrastructure as code software tool that enables operators to provision and version multi-cloud data center resources using declarative configuration files.
confusable_notes:
  ansible: Terraform is primarily an infrastructure provisioning tool that creates servers and networks declaratively, whereas Ansible focuses on configuration management and software installation inside existing servers.
follow_up_questions:
  - How does Terraform state management track real-world infrastructure resources and prevent drift?
  - What execution sequence occurs when running `terraform plan` followed by `terraform apply`?
translation: native
---

## Easy explanation
Like an architect’s master digital building blueprint: you hand the blueprint to automated construction machines, and they build identical walls, windows, and foundations every time without manual bricklaying.

## Details
Terraform uses HashiCorp Configuration Language (HCL) to define resources declaratively. When operators run `terraform plan`, the engine compares declared files with a state file recording existing cloud resources, calculating an execution graph to create, update, or destroy infrastructure across providers (like AWS, Azure, or GCP) through provider plugins.

## Technical definition
A declarative infrastructure-as-code engine that reconciles desired-state configurations written in HCL with actual infrastructure state across cloud, platform, and SaaS APIs using state graph reconciliation.

## Examples
A DevOps engineer commits a `main.tf` file declaring a VPC, two subnets, and an EC2 instance; running `terraform apply` provisions the entire cloud environment automatically in under three minutes.
