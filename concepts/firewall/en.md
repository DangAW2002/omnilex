---
label: Firewall
aliases: []
loanwords: []
plain_descriptions:
  - security barrier that blocks unauthorized network traffic into a computer
  - digital security guard inspecting incoming and outgoing data packets
summary: A network security system that monitors and filters incoming and outgoing network traffic based on predetermined security rules.
confusable_notes: {}
follow_up_questions:
  - What is the difference between a stateless packet filter and a stateful inspection firewall?
  - How do Web Application Firewalls (WAF) inspect layer-7 HTTP payloads compared to network firewalls?
translation: native
---

## Easy explanation
Like a security checkpoint at an airport entrance: officers inspect every visitor’s boarding pass and ID against an approved manifest before permitting entry into the departure lounge.

## Details
Firewalls inspect packet headers—including source IP, destination IP, transport protocol, and destination port—to enforce allow or deny rules. Modern stateful firewalls track ongoing connection states to permit return traffic automatically, while next-generation firewalls inspect application payloads for malware signatures, SQL injection, and unauthorized data exfiltration.

## Technical definition
A hardware appliance or software service establishing an administrative barrier between trusted internal networks and untrusted external networks, enforcing access control policies by inspecting packet headers and connection metadata.

## Examples
A cloud security group acts as a virtual firewall, configured to allow incoming TCP traffic on port 443 for web traffic while rejecting incoming connections on port 22 from all IP addresses except the corporate office network.
