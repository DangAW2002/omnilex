---
label: Transmission Control Protocol (TCP)
aliases:
  - TCP
autolink:
  aliases:
    TCP: always
loanwords: []
plain_descriptions:
  - reliable networking protocol that guarantees all data arrives completely and in order
  - connection-oriented rulebook ensuring web pages and files download without missing parts
summary: A connection-oriented transport layer protocol that provides reliable, ordered, and error-checked delivery of a stream of data packets.
confusable_notes:
  udp: TCP establishes connections and guarantees reliable in-order packet delivery with retries, whereas UDP sends packets without handshakes or delivery guarantees.
follow_up_questions:
  - How does the three-way handshake (SYN, SYN-ACK, ACK) establish a synchronized TCP session?
  - What congestion control mechanisms (like slow start and window scaling) prevent network saturation?
translation: native
---

## Easy explanation
Like a registered mail service with return receipts: the sender waits for the courier to return a signed confirmation before marking each package delivered; if an item is lost, it is re-sent.

## Details
TCP operates at layer 4 of the OSI model. Before data transmission begins, client and server execute a three-way handshake (SYN, SYN-ACK, ACK) to negotiate sequence numbers. During transit, TCP tracks byte sequences, automatically sends acknowledgments (ACK), retransmits dropped packets, and dynamically adjusts transmission windows to prevent buffer overruns on receiving hosts.

## Technical definition
A core transport protocol specified in RFC 793 and RFC 9293 providing stateful, bi-directional, stream-oriented data communication with built-in checksum verification, flow control, and adaptive retransmission.

## Examples
When downloading a 50 MB firmware update or loading a banking website over HTTPS, TCP verifies every packet arrival and re-requests lost packets so the file is never corrupted.
