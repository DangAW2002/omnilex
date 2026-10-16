---
label: REST
aliases:
  - RESTful API
loanwords: []
autolink:
  label: always
plain_descriptions:
  - standard rules for how websites and apps exchange data over the web
  - the way modern apps talk to servers using standard web addresses
summary: An architectural style for network applications that uses standard HTTP methods to manipulate resources identified by URIs.
confusable_notes: {}
follow_up_questions:
  - How does REST differ from RPC-style API architectures?
  - Why are stateless interactions central to REST scalability?
translation: native
---

## Easy explanation
Think of a restaurant menu: each dish has a clear code, and whether you order, inspect, or cancel an item, you use a standard ticket format that the kitchen understands instantly.

## Details
Systems built around REST communicate statelessly over HTTP, representing distinct entities as uniform resource identifiers (URIs). Clients perform state transitions using standard request verbs like GET, POST, PUT, and DELETE, usually receiving payloads formatted in JSON.

## Technical definition
Representational State Transfer (REST) is a distributed software design paradigm emphasizing stateless interactions, cacheable responses, standardized resource addresses, and layered client-server boundaries.

## Examples
A smartphone banking app fetching your recent account balance by issuing a GET request to `/accounts/123/balance`.
