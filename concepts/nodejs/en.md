---
label: "Node.js"
aliases:
  - "Node"
loanwords: []
autolink:
  label: auto
  aliases:
    Node: never
plain_descriptions:
  - "a system that lets programmers run JavaScript on servers instead of inside browsers"
  - "a fast backend JavaScript environment designed for real-time web services"
summary: "A standalone server runtime that compiles and executes JavaScript code outside browser sandboxes via Google V8 engine."
confusable_notes: {}
follow_up_questions:
  - "How does Node.js leverage libuv to handle asynchronous non-blocking I/O?"
  - "When should CPU-intensive workloads avoid standard single-threaded Node.js worker loops?"
translation: native
---

## Easy explanation
Node.js took JavaScript out of the browser playground and put it into the server engine room, letting developers use one single language across their whole software stack.

## Details
Built on Google Chrome’s V8 JavaScript engine and the libuv asynchronous I/O abstraction library, Node.js uses an event-driven, non-blocking I/O model. It executes code on a single thread while offloading disk operations, database lookups, and network sockets to background system worker threads. This architecture provides high throughput and efficient resource utilization for data-intensive real-time applications.

## Technical definition
An asynchronous, event-driven JavaScript execution runtime built on the V8 engine, executing outside the browser sandbox with direct operating system access.

## Examples
A lightweight HTTP API server created with const http = require("http"); http.createServer((req, res) => res.end("Hello World")).listen(3000); serving hundreds of concurrent requests.
