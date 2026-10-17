---
label: Transport Layer Security (TLS)
aliases:
  - TLS
loanwords: []
autolink:
  aliases:
    TLS: always
plain_descriptions:
  - the security protocol that powers the padlock icon and https in your browser address bar
  - an encrypted communications tunnel protecting internet traffic from eavesdropping and tampering
summary: A cryptographic communication protocol that provides privacy, data integrity, and authentication for communications over computer networks.
confusable_notes:
  dtls: "TLS provides cryptographic security over connection-oriented, reliable TCP byte streams, whereas DTLS adapts TLS to secure connectionless, packet-based datagram transport protocols such as UDP."
follow_up_questions:
  - How does TLS 1.3 reduce handshake latency to a single round-trip time (1-RTT) compared to TLS 1.2?
  - Why is forward secrecy essential to prevent retroactively decrypting recorded network traffic?
translation: native
---

## Easy explanation
Like dispatching financial documents inside a reinforced armored vehicle that drives directly between bank branches, preventing anyone on the street from peeking inside or swapping the cargo.

## Details
TLS (the modern successor to SSL) operates between the transport layer and the application layer. During the initial TLS handshake, the client verifies the server's digital certificate (issued by a trusted Certificate Authority), negotiates cipher suites, and establishes ephemeral symmetric encryption keys.

## Technical definition
A cryptographic security protocol specified by the IETF (RFC 8446) providing end-to-end encryption, endpoint authentication, and message integrity across IP networks.

## Examples
Securing an online banking session over HTTPS so internet service providers and coffee shop Wi-Fi snoops cannot capture submitted passwords.
