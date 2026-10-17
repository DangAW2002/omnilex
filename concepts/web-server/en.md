---
label: "Web server"
aliases:
  - "HTTP server"
loanwords: []
autolink:
  label: auto
plain_descriptions:
  - "a computer and software program that delivers web pages to visitors over the internet"
  - "the system that listens for web requests and sends back HTML, images, and data"
summary: "A computer system or software application that processes incoming network requests over HTTP and serves web content to clients."
confusable_notes:
  nginx: "A web server is the general category of software or hardware serving HTTP, while Nginx is a specific popular open-source web server software program."
follow_up_questions:
  - "What is the functional difference between a static web server and a dynamic application server?"
  - "How do web servers handle concurrency using multi-process or event-driven worker architectures?"
translation: native
---

## Easy explanation
A web server is like a library clerk: when a visitor approaches the counter with a book call number (a URL), the clerk fetches the exact volume from the shelf and hands it to the reader.

## Details
A web server refers both to the hardware machine connected to the internet and the server software (such as Apache, Nginx, or Caddy) running on it. On the software side, an HTTP server listens on specific TCP sockets (conventionally port 80 for unsecured traffic and port 443 for encrypted connections). When requests arrive, it parses headers, checks file systems for static assets or proxies requests to application runtimes, and transmits status codes and response bodies back to clients.

## Technical definition
A system combining hardware infrastructure and daemon software implementing HTTP specifications to process network requests and deliver resource representations.

## Examples
A server program listening on port 80 receives GET /contact and streams the contact.html file to the requesting browser in 25 milliseconds.
