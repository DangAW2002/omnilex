---
label: User Datagram Protocol (UDP)
aliases:
  - UDP
autolink:
  aliases:
    UDP: always
loanwords: []
plain_descriptions:
  - fast lightweight network protocol that sends data without checking if it arrived
  - connectionless protocol used for real-time gaming, video streaming, and DNS
summary: A connectionless transport layer protocol that transmits data packets without prior connection handshakes or delivery guarantees, prioritizing speed over reliability.
confusable_notes:
  tcp: UDP sends datagrams immediately with minimal latency and no retry guarantees, whereas TCP requires a three-way handshake and guarantees in-order delivery.
follow_up_questions:
  - Why do real-time voice calls (VoIP) and online multiplayer games prefer UDP over TCP?
  - How does QUIC build reliable stream multiplexing on top of raw UDP datagrams?
translation: native
---

## Easy explanation
Like sending postcards by standard mail or broadcasting over a radio station: the announcer talks continuously without knowing if any specific listener tuned in at that exact second.

## Details
UDP offers minimal protocol overhead with an 8-byte header containing only source port, destination port, length, and checksum. Because it maintains no connection state, sequence tracking, or retransmission queues, packets may arrive out of order, duplicated, or not at all. This lack of overhead makes UDP ideal for latency-sensitive applications where late packets are worthless.

## Technical definition
A lightweight, connectionless transport protocol defined in RFC 768 that provides transaction-oriented datagram delivery with checksum verification but without connection setup, ordering guarantees, or congestion management.

## Examples
A live video conferencing application transmits real-time audio samples using UDP; if a network spike drops 2 packets, the audio stream continues smoothly with a microscopic glitch rather than freezing to wait for retransmissions.
