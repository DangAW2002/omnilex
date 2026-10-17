---
label: "Hypertext Transfer Protocol (HTTP)"
aliases:
  - "HTTP"
loanwords: []
autolink:
  aliases:
    HTTP: always
plain_descriptions:
  - "the communication rules that browsers and servers use to exchange web pages"
  - "the protocol delivering requests and responses across the World Wide Web"
summary: "A foundational client-server networking specification governing how web browsers fetch and submit hypermedia assets."
confusable_notes:
  https: "HTTP sends plain text without encryption, whereas HTTPS wraps HTTP inside TLS for security."
follow_up_questions:
  - "How does HTTP/2 differ from HTTP/1.1 in request multiplexing?"
  - "Why does standard HTTP leave data vulnerable on public networks?"
translation: native
---

## Easy explanation
Think of HTTP like sending postcards through the postal service: the sender writes the request on the card, and the recipient writes the reply back, completely readable to anyone along the delivery route.

## Details
HTTP operates on a classic client-server model over TCP/IP connections. A client, such as a web browser, sends an HTTP request containing a method (GET, POST, PUT, DELETE), a target URL, headers, and an optional body. The server processes the instruction and returns an HTTP status code alongside the requested data. Modern revisions like HTTP/2 and HTTP/3 introduce binary framing and multiplexed streams to overcome head-of-line blocking while keeping the core semantic vocabulary identical.

## Technical definition
A stateless, application-level request-response protocol designed for collaborative, distributed hypermedia information systems.

## Examples
A browser requests GET /index.html with standard headers, and the web server replies with status code 200 OK along with 45 kilobytes of HTML markup.
