---
label: Vertical scaling
aliases:
  - Scale up
  - Scaling up
loanwords: []
plain_descriptions:
  - upgrading an existing server with more CPU, memory, or storage power
  - boosting capacity by replacing a machine with a larger hardware specification
summary: The practice of increasing system capacity by provisioning more compute resources, such as CPU cores, RAM, or storage speed, to a single server instance.
confusable_notes:
  horizontal-scaling: Vertical scaling increases the physical power of a single server, whereas horizontal scaling adds multiple separate servers to distribute the overall computational workload.
follow_up_questions:
  - What physical hardware limits and cost curves make vertical scaling unsustainable at massive scale?
  - Why does vertical scaling frequently entail scheduled maintenance downtime compared to horizontal additions?
translation: native
---

## Easy explanation
Like upgrading your family car: replacing a small 4-cylinder engine with a powerful V8 engine to haul heavier trailers without buying a second automobile.

## Details
Vertical scaling (scaling up) augments the capacity of an individual system by replacing its host machine or instance profile with a larger tier (for example, moving from a 4-core, 16 GB RAM instance to a 16-core, 64 GB RAM instance). It requires no modifications to application code or clustering logic, making it ideal for monolithic systems or stateful relational databases that cannot easily be partitioned. However, hardware has strict physical upper bounds, high-end instance pricing grows exponentially, and resizing virtual machines often necessitates a reboot.

## Technical definition
The expansion of single-node throughput and processing capability through the physical or virtual augmentation of compute, memory, and I/O resources.

## Examples
A database administrator scaling up an analytics server from 8 CPU cores and 32 GB RAM to 32 CPU cores and 128 GB RAM to process monthly financial reconciliation reports.
