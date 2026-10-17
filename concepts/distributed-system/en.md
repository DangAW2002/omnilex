---
label: Distributed system
aliases:
  - Distributed architecture
loanwords: []
plain_descriptions:
  - collection of independent computers working together appearing as a single system
  - software spread across multiple networked machines communicating to accomplish a task
summary: A system whose hardware and software components communicate and coordinate their actions over a network, presenting themselves to end users as a unified cohesive computing facility.
confusable_notes: {}
follow_up_questions:
  - How does the CAP theorem dictate tradeoffs between consistency, availability, and partition tolerance?
  - What consensus algorithms ensure replicated state consistency across unreliable network partitions?
translation: native
---

## Easy explanation
Like a team of rowers in an Olympic rowing boat: each rower pulls their own oar independently, but by listening to the coxswain rhythm, the entire boat glides smoothly forward as one single craft.

## Details
A distributed system consists of autonomous computing nodes connected over a local or wide-area network that coordinate actions using message passing. By combining resources, distributed systems deliver horizontal scalability, high fault tolerance, and geographical proximity to end users. However, they introduce profound engineering challenges characterized by the Fallacies of Distributed Computing: network unreliability, variable latency, partial failures, asynchronous clocks, and partition nets governed by the CAP theorem.

## Technical definition
An assembly of autonomous computing entities possessing separate memory spaces and unsynchronized physical clocks that collaborate via network messaging to achieve common operational goals.

## Examples
A global search engine coordinating 2,000 servers across 4 continents to index billions of web documents, returning ranked query results within 40 milliseconds.
