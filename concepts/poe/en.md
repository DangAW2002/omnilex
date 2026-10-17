---
label: "Power over Ethernet (PoE)"
aliases:
  - "PoE"
loanwords:
  - "poe"
autolink:
  aliases:
    PoE: always
plain_descriptions:
  - "technology passing electrical power along with network data through standard twisted-pair ethernet cables"
  - "cabling standard that powers surveillance cameras and access points directly through ethernet ports"
summary: "A networking technology that transmits electrical DC power alongside digital data over standard twisted-pair Ethernet cables."
confusable_notes:
  mesh-network: "PoE is a physical cabling method that delivers direct DC electrical power alongside data over copper Ethernet lines, whereas a mesh network is a logical wireless network topology relaying packets across multiple radio nodes."
follow_up_questions:
  - "How does IEEE 802.3bt Type 4 deliver up to 90 watts of DC power using all four twisted copper pairs?"
  - "How does the PoE hardware classification handshake prevent damaging non-PoE network cards?"
translation: native
---

## Easy explanation
Like a USB charging cable for commercial buildings, enabling a ceiling-mounted security camera or Wi-Fi router to receive both high-speed internet and operating electricity through a single network wire without needing an electrical outlet nearby.

## Details
Standardized under IEEE 802.3af (15.4 W), 802.3at (PoE+, 30 W), and 802.3bt (4PPoE, up to 90 W), Power over Ethernet injects DC voltage between 44 and 57 volts onto twisted-pair Ethernet cables (Cat5e or better). Power Sourcing Equipment (PSE), such as a PoE network switch, performs a low-voltage signature detection handshake to measure the resistance of the connected Powered Device (PD). If verified, the PSE safely energizes the cable pairs, eliminating the necessity for dedicated AC mains wiring and external power adapters at remote hardware mounting locations.

## Technical definition
The standardized method defined by IEEE 802.3 for delivering direct-current electrical power simultaneously with data signals over twisted-pair copper Ethernet cabling.

## Examples
An airport terminal deploys two hundred IP surveillance cameras and access points powered exclusively by multi-port PoE switches, avoiding the installation of separate electrical power sockets near high ceiling rafters.
