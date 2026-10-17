---
label: "Nginx"
aliases:
  - "NGINX"
loanwords: []
autolink:
  label: auto
  aliases:
    NGINX: always
plain_descriptions:
  - "a high-performance web server software popular for handling heavy internet traffic"
  - "a fast open-source program that serves websites, load-balances traffic, and routes proxies"
summary: "A high-performance HTTP web server, reverse proxy, and load balancer designed for maximum concurrency and low memory usage."
confusable_notes:
  web-server: "Web server describes the broad category of HTTP-serving software, while Nginx is a specific high-efficiency open-source server program."
follow_up_questions:
  - "How does the Nginx asynchronous master-worker event loop handle the C10k problem?"
  - "What configuration directives enable Nginx to function as an SSL-terminating reverse proxy?"
translation: native
---

## Easy explanation
Nginx is like a skilled traffic controller at a busy airport terminal: it directs thousands of arriving travelers to the right gates and baggage carousels without creating a bottleneck.

## Details
Created by Igor Sysoev to solve the C10k problem (handling 10,000 concurrent connections on single machines), Nginx employs an asynchronous, event-driven, non-blocking architecture. A single master process coordinates lightweight worker processes that handle thousands of connections simultaneously with predictable memory footprints. It is widely deployed to serve static files, terminate TLS certificates, load-balance across upstream clusters, and cache application responses.

## Technical definition
An event-driven, asynchronous HTTP daemon providing reverse proxy, load balancing, mail proxying, and HTTP caching capabilities.

## Examples
An Nginx reverse proxy configuration listening on port 443 that terminates TLS encryption and load-balances incoming web traffic across three Node.js backend processes.
