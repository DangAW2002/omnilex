---
label: Infrastructure as a Service (IaaS)
aliases:
  - IaaS
loanwords: []
autolink:
  aliases:
    IaaS: always
plain_descriptions:
  - renting raw virtual servers and storage over the internet
  - paying for computing hardware by the hour instead of buying physical boxes
summary: A cloud computing model where vendors deliver on-demand fundamental compute, network, and storage resources over the internet.
confusable_notes:
  paas: IaaS supplies bare computing resources where you manage the OS and software stack, whereas PaaS delivers ready-to-use application runtimes.
  saas: IaaS provides infrastructure building blocks, while SaaS provides finished end-user applications ready for immediate use.
follow_up_questions:
  - When should an engineering team choose IaaS instead of managed PaaS?
  - What responsibilities remain with the customer under the IaaS shared responsibility model?
translation: native
---

## Easy explanation
Renting an empty apartment: the landlord maintains the building structure, plumbing, and electricity, but you decide what furniture to put in each room and keep the space secure.

## Details
In the IaaS model, cloud providers host hardware in global data centers and expose virtualized resources such as virtual machines, raw block volumes, object buckets, and software-defined networks. Customers configure operating systems, install software runtimes, manage database engines, and orchestrate patching. This model transfers physical data center capital expenditures into flexible operating costs billed on usage.

## Technical definition
A cloud delivery paradigm where consumers provision fundamental computing capabilities—including processing power, disk capacity, and network interconnects—to deploy and execute arbitrary arbitrary operating environments and application stacks without administering the underlying physical infrastructure.

## Examples
A startup provisions two virtual instances with attached 100 GB block storage volumes and a private subnet to host a web service, paying only for running hours rather than purchasing physical rack-mounted servers.
