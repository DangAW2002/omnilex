---
label: "DTLS"
aliases:
  - "Datagram Transport Layer Security"
loanwords:
  - "dtls"
autolink:
  label: always
plain_descriptions:
  - "security protocol providing encrypted communications over datagram networks like udp"
  - "cryptographic wrapper protecting datagram transfers against packet tampering and eavesdropping"
summary: "A cryptographic security protocol based on TLS that provides confidentiality, message integrity, and authentication for datagram-based network communications."
confusable_notes:
  tls: "TLS relies on reliable, ordered byte streams guaranteed by TCP, whereas DTLS introduces sequence numbering, packet retransmission timers, and replay protection to secure packet streams over unreliable UDP."
follow_up_questions:
  - "How does DTLS handle out-of-order packet delivery during cryptographic handshake exchanges?"
  - "What performance advantages does DTLS offer to real-time audio streaming and battery-powered IoT devices compared to TCP TLS?"
translation: native
---

## Easy explanation
Like taking the encrypted envelope protection used by web banking and adapting it to handle postcards that might arrive out of order, get lost in the mail, or get resent without halting delivery.

## Details
Standardized by the IETF in RFC 9147 (DTLS 1.3), Datagram Transport Layer Security adapts the security guarantees of TLS for packet-based transport layers like UDP. Because UDP does not guarantee packet delivery or ordering, DTLS implements explicit handshake message sequencing, fragment reassembly, and timeout-based retransmission timers. To protect endpoints against denial-of-service and packet injection attacks, DTLS includes a stateless cookie exchange during handshakes and maintains an anti-replay sliding window.

## Technical definition
A transport-layer cryptographic protocol engineered to deliver confidentiality, data integrity, and mutual endpoint authentication over connectionless, unreliable datagram network protocols.

## Examples
A smart parking sensor utilizes DTLS over UDP to encrypt vehicle occupancy status reports transmitted via CoAP to municipal traffic management gateways.
