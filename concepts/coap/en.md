---
label: Constrained Application Protocol (CoAP)
aliases:
  - "CoAP"
loanwords:
  - "constrained application protocol"
autolink:
  aliases:
    CoAP: always
plain_descriptions:
  - web transfer protocol tailored for constrained nodes and low bandwidth networks using udp
  - lightweight http alternative designed to run restful requests on tiny microcontrollers
summary: A specialized RESTful web transfer protocol designed by the IETF for resource-constrained microcontrollers and low-power wireless networks using UDP.
confusable_notes:
  mqtt: CoAP is a client-server REST protocol over UDP providing GET, POST, and PUT verbs, whereas MQTT is a broker-centric publish/subscribe stream protocol running over TCP.
follow_up_questions:
  - How does CoAP implement reliable messaging without the overhead of TCP handshakes?
  - How does Datagram Transport Layer Security (DTLS) secure CoAP communications?
translation: native
---

## Easy explanation
CoAP is essentially a stripped-down, ultra-compact version of HTTP designed for tiny microchips: it lets small devices use familiar commands like GET and POST to request or send data over short UDP radio packets instead of heavy TCP streams.

## Details
Specified in RFC 7252, CoAP translates the familiar REST architectural model (GET, POST, PUT, DELETE) into a binary-encoded protocol riding on UDP rather than TCP. It incorporates a compact four-byte fixed header and uses message identifiers to handle packet duplication and reordering. Reliability is provided at the application layer through confirmable (CON) messages requiring acknowledgment, or non-confirmable (NON) fire-and-forget packets. CoAP also supports native resource observation (RFC 7641) and blockwise transfers (RFC 7959) for larger payloads, secured natively by DTLS.

## Technical definition
An IETF standard application-layer web transfer protocol based on the REST model, optimized for constrained nodes and lossy networks through binary header encoding over UDP.

## Examples
A battery-powered parking space occupancy sensor transmitting a CoAP PUT request containing spot vacancy status to a municipal traffic server.
