---
label: Reverse proxy
aliases:
  - Reverse proxy server
loanwords: []
plain_descriptions:
  - server intercepting client traffic to shield and distribute load to origin servers
  - front-facing proxy that retrieves resources from internal servers on behalf of clients
summary: A server sitting in front of web servers that intercepts incoming client requests and routes them to internal targets, providing anonymity, load distribution, and TLS termination.
confusable_notes:
  api-gateway: A reverse proxy handles generic protocol-level routing, TLS termination, and caching, whereas an API gateway handles application-specific logic like token verification, request composition, and API throttling.
follow_up_questions:
  - How does a reverse proxy differ fundamentally from a forward proxy?
  - What caching header configurations maximize reverse proxy offloading efficiency?
translation: native
---

## Easy explanation
Like a front counter clerk at a bank branch: customers only talk to the clerk at the window, who turns around to fetch folders from vaults in the back without letting customers inside the secure vault room.

## Details
A forward proxy sits in front of clients to regulate their outbound internet access, whereas a reverse proxy sits in front of origin servers to protect them from direct public exposure. Clients connect directly to the reverse proxy IP. The reverse proxy terminates TLS cryptographic sessions, compresses static assets with Gzip or Brotli, caches frequent HTTP responses in local memory, and forwards requests across a pool of backend application instances using round-robin or least-connection algorithms.

## Technical definition
An intermediate server deployed at network perimeters that intercepts incoming inbound connections and transparently proxies them to private backend origin pools.

## Examples
An Nginx server fielding 25,000 public HTTPS connections on port 443, offloading TLS cryptography, and forwarding plain HTTP traffic across 6 internal Python application workers.
