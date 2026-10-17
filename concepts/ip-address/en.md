---
label: IP address
aliases: []
loanwords: []
plain_descriptions:
  - unique numerical label assigned to every device connected to a computer network
  - digital phone number or postal address identifying a computer on the internet
summary: A unique numerical identifier assigned to each device connected to a computer network utilizing the Internet Protocol for communication.
confusable_notes: {}
follow_up_questions:
  - What structural differences exist between 32-bit IPv4 addresses and 128-bit IPv6 addresses?
  - How do static IP allocations differ operationally from dynamic assignments issued via DHCP?
translation: native
---

## Easy explanation
Like a home postal street address: delivery trucks need your exact street number, street name, and postal code to drop packages at your front door.

## Details
IP addresses serve two principal functions: host network interface identification and location addressing. Under IPv4, an address is expressed as four decimal octets (such as 192.0.2.1), while IPv6 uses eight groups of four hexadecimal digits (such as 2001:db8::1) to provide a virtually inexhaustible address pool. Routers parse IP addresses to forward packets across interconnected networks.

## Technical definition
A standardized numeric label defined by RFC 791 (IPv4) and RFC 8200 (IPv6) bound to a network interface controller, facilitating packet delivery across routed internetworks.

## Examples
A web browser queries DNS for a domain name and receives the IPv4 address 93.184.216.34, directing its TCP handshake packets directly to that destination server.
