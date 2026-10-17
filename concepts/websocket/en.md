---
label: WebSocket
aliases:
  - WebSocket protocol
loanwords: []
plain_descriptions:
  - continuous two-way connection allowing real-time communication between browser and server
  - persistent bidirectional network socket initiated via an HTTP handshake
summary: A computer communications protocol providing full-duplex, bidirectional communication channels over a single persistent TCP connection initiated via an HTTP upgrade handshake.
confusable_notes:
  server-sent-events: WebSocket enables full-duplex two-way communication between client and server over a dedicated TCP connection, whereas Server-Sent Events is a unidirectional stream pushing updates from server to client over standard HTTP.
follow_up_questions:
  - How does the initial HTTP 101 Switching Protocols handshake establish a WebSocket session?
  - How should connection heartbeats (ping/pong frames) be configured to detect broken connections behind load balancers?
translation: native
---

## Easy explanation
Like a direct telephone call: once the call connects, both you and the person on the other end can speak and listen simultaneously without having to hang up and redial for each sentence.

## Details
Standard HTTP request-response requires clients to initiate every exchange, forcing real-time web applications to use inefficient short-polling or long-polling. The WebSocket protocol starts over standard HTTP/1.1 or HTTP/2 ports with an Upgrade header request. Upon receiving an HTTP 101 Switching Protocols response, the underlying TCP connection switches to a persistent framing protocol. Both client and server can transmit binary and UTF-8 message frames arbitrarily with minimal 2-to-10-byte overhead per frame, eliminating HTTP header bloat.

## Technical definition
A standardized bidirectional transport protocol establishing persistent full-duplex framing channels over a single underlying TCP socket via protocol negotiation.

## Examples
A collaborative document editor establishing a WebSocket session where 5 concurrent authors exchange cursor positions and keystrokes in real time with sub-10-millisecond latency.
