---
label: Multi-cloud
aliases: []
loanwords: []
plain_descriptions:
  - using more than one public cloud provider at the same time
  - spreading workloads across multiple vendors to avoid depending on just one
summary: An architectural strategy utilizing cloud services from multiple independent public cloud vendors within a single organization.
confusable_notes:
  hybrid-cloud: Multi-cloud utilizes services across multiple public cloud vendors, whereas hybrid cloud links a private on-premises center to a public cloud.
follow_up_questions:
  - How do cross-cloud egress data transfer fees impact multi-cloud cost models?
  - Which abstraction tooling helps teams manage multi-cloud infrastructure consistently?
translation: native
---

## Easy explanation
Like opening accounts at two different retail banks: if one bank experiences an ATM outage or changes its transaction policies, you can immediately execute transfers through the other bank.

## Details
Organizations adopt multi-cloud strategies to mitigate vendor lock-in, meet regional data sovereignty rules, and leverage specialized competitive services from different providers. Successful implementations rely on open standards such as Kubernetes, Terraform, and containerized deployments to avoid relying on proprietary proprietary platform primitives.

## Technical definition
The deployment pattern of utilizing cloud compute, storage, and application services across two or more public cloud service providers to optimize resilience, geographical presence, and capability alignment.

## Examples
An enterprise hosts its primary customer web applications on AWS while processing large-scale machine learning analytics jobs on Google Cloud, synchronizing models using container registries.
