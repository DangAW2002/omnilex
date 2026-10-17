---
label: Virtual Private Cloud (VPC)
aliases:
  - VPC
autolink:
  aliases:
    VPC: always
loanwords: []
plain_descriptions:
  - isolated private network section inside a public cloud provider
  - virtual boundary that protects your cloud servers from public internet access
summary: A logically isolated virtual network dedicated to a cloud account, providing complete control over IP address ranges, subnets, and routing tables.
confusable_notes:
  vpn: A VPC is a private virtual network boundary in the cloud, while a VPN is an encrypted tunnel used to connect external computers to that network.
follow_up_questions:
  - How do route tables and internet gateways control external traffic ingress into a VPC?
  - What architecture patterns govern secure VPC peering between different organizational accounts?
translation: native
---

## Easy explanation
Like a fenced, gated compound within a large public park: the park belongs to the city, but inside your walled perimeter, only authorized visitors entering through your gate are admitted.

## Details
A Virtual Private Cloud allows system architects to define their own IPv4 or IPv6 Classless Inter-Domain Routing (CIDR) blocks, create public and private subnets, configure network access control lists (NACLs), and establish route tables. Resources launched inside a private VPC cannot be accessed by external internet users unless explicitly permitted through internet gateways or load balancers.

## Technical definition
A logically partitioned, software-defined network provisioned on shared public cloud infrastructure that simulates a traditional on-premises network topology with customizable addressing and routing policies.

## Examples
An infrastructure team provisions a VPC with CIDR block 10.0.0.0/16, placing web servers in a public subnet with internet access and database servers in a private subnet reachable only from internal application servers.
