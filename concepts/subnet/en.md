---
label: Subnet
aliases: []
loanwords: []
plain_descriptions:
  - smaller segmented portion of a larger IP network range
  - dividing a big network into isolated zones for security and organization
summary: A logical subdivision of an IP network designed to segment broadcast domains, improve routing efficiency, and enforce security boundaries.
confusable_notes: {}
follow_up_questions:
  - How does a subnet mask calculate the network prefix and host capacity of an IPv4 range?
  - What distinguishes a public subnet with an attached internet gateway from a private subnet?
translation: native
---

## Easy explanation
Like dividing a single large office building into distinct departments on different floors: sales occupies floor 2, engineering floor 3, and accounting floor 4 behind locked doors.

## Details
Subnetting uses subnet masks (or CIDR notation such as /24) to divide contiguous network address spaces into smaller segments. In cloud architectures, subnets are typically tied to a specific Availability Zone and classified as public (routing directly to an internet gateway) or private (requiring a NAT gateway for outbound updates and blocking inbound unsolicited requests).

## Technical definition
A segmented sub-network of an IP address space demarcated by a bitmask that separates the routing prefix from individual host identifiers, optimizing broadcast isolation and network access control.

## Examples
An administrator allocates 10.0.1.0/24 as a public subnet for external load balancers and 10.0.2.0/24 as a private subnet for backend worker instances that require no public IP addresses.
