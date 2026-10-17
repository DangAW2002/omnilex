---
label: Network Address Translation (NAT)
aliases:
  - NAT
autolink:
  aliases:
    NAT: always
loanwords: []
plain_descriptions:
  - sharing one public internet address among many private home or office devices
  - remapping internal private IP addresses to an external internet address
summary: A networking method that remaps an IP address space into another by modifying network address information in the IP header of packets in transit.
confusable_notes: {}
follow_up_questions:
  - How does Port Address Translation (PAT) multiplex thousands of internal connections over a single public IPv4 address?
  - Why does end-to-end peer-to-peer communication often require STUN or TURN traversal protocols across NAT boundaries?
translation: native
---

## Easy explanation
Like a corporate mailroom: the outside world sends letters to the main company street address, and the mailroom clerk attaches internal office cubicle numbers before delivering them.

## Details
NAT operates at the boundary router or gateway connecting a local area network to the internet. When internal hosts with private addresses (such as RFC 1918 blocks) send outbound packets, the NAT gateway substitutes the private source IP and port with its own public IP and an ephemeral port, recording the translation in a state table to route return traffic back to the original client.

## Technical definition
A routing technique specified in RFC 3022 that translates source or destination IP addresses and transport protocol port numbers within IP packet headers, mitigating IPv4 address exhaustion and cloaking internal topologies.

## Examples
A cloud NAT gateway enables backend worker servers in a private subnet (10.0.1.50) to download software security updates from the internet while preventing external hosts from initiating connections directly to those internal instances.
