---
label: Instance
aliases: []
qualifier: (Cloud)
autolink:
  label: never
loanwords: []
plain_descriptions:
  - virtual server running in the cloud with assigned CPU and memory
  - rented cloud computer instance that you can start or stop on demand
summary: A virtual compute environment provisioned on cloud infrastructure with dedicated allocations of vCPUs, memory, and network capabilities.
confusable_notes:
  spot-instance: A standard on-demand instance runs continuously until terminated by the user, while a spot instance uses spare cloud capacity at steep discounts but can be reclaimed by the vendor with short notice.
follow_up_questions:
  - How do instance types (general purpose, compute optimized, memory optimized) align with different application workloads?
  - What pricing trade-offs distinguish on-demand instances from reserved instances and savings plans?
translation: native
---

## Easy explanation
Like renting a car from a rental agency: you pick the size you need (sedan, SUV, or truck), pay for the hours you drive it, and return it when you are finished.

## Details
Cloud instances abstract physical blade servers into virtual machines managed by hypervisors like KVM or Nitro. Users choose instance types balancing compute cores, RAM, storage throughput, and network bandwidth. Instances run full guest operating systems (such as Ubuntu, Red Hat, or Windows Server) and can be stopped, resized, or cloned across availability zones.

## Technical definition
A virtual server running on partitioned physical hardware within a cloud provider’s infrastructure, provisioned from a machine image with defined allocations of virtual processing units, memory, and networking.

## Examples
A backend engineering team launches an m6i.xlarge instance with 4 vCPUs and 16 GB RAM to host their production web application behind an application load balancer.
