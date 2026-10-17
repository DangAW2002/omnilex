---
label: Virtual Private Network (VPN)
aliases:
  - VPN
autolink:
  aliases:
    VPN: always
loanwords: []
plain_descriptions:
  - encrypted connection tunnel between your computer and a remote private network
  - secure way for employees to access internal company systems from home
summary: An encrypted communication channel constructed over a public network infrastructure to provide secure remote access and private site-to-site connectivity.
confusable_notes:
  vpc: A VPN is an encrypted communication tunnel over public networks, whereas a VPC is an isolated virtual private network perimeter hosted within a cloud provider.
follow_up_questions:
  - How does IPsec differ from TLS/SSL VPNs (like OpenVPN or WireGuard) in protocol overhead and client deployment?
  - What split-tunneling trade-offs exist between corporate traffic visibility and client internet performance?
translation: native
---

## Easy explanation
Like driving through an underground underwater vehicle tunnel beneath a choppy harbor: outside water cannot touch your car, and no one from the surface can see what you are transporting inside.

## Details
A Virtual Private Network encapsulates and encrypts payload packets using cryptographic protocols such as IPsec, WireGuard, or OpenSSL/TLS. It allows remote teleworkers or branch offices to send traffic across the public internet as though their machines were physically plugged into the corporate local area network (LAN), preserving confidentiality and data integrity.

## Technical definition
A logical network overlay defined across intermediate public transit networks that utilizes encryption, authentication, and tunneling protocols to deliver private, tamper-proof communications between distributed hosts.

## Examples
A remote software engineer connects to their company’s internal WireGuard VPN gateway, allowing them to access private staging database instances (at IP 10.200.4.15) from a coffee shop without exposing the database to the internet.
