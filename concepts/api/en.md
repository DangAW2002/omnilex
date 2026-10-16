---
label: "Application Programming Interface (API)"
aliases:
  - "API"
loanwords: []
autolink:
  aliases:
    API: always
plain_descriptions:
  - "a defined bridge that allows two software systems to talk to each other"
  - "a digital waiter taking requests from one application to another"
summary: "A set of defined rules, protocols, and endpoints enabling different software applications to communicate and exchange data."
confusable_notes:
  sdk: "An API is the specification or communication protocol defining endpoints and formats; an SDK is a downloadable software development kit containing client libraries, tools, and documentation implementing that API."
follow_up_questions:
  - "How does a REST API differ from an RPC or GraphQL interface?"
  - "Why is backward compatibility crucial when versioning a public API?"
translation: native
---

## Easy explanation
Think of a waiter in a restaurant: you review the menu, give your order to the waiter, the kitchen prepares it, and the waiter brings the meal back without you ever having to enter the kitchen.

## Details
An API exposes specific endpoints that accept requests formatted in standard protocols such as HTTP, WebSockets, or gRPC. It hides the underlying internal business logic, database schemas, and implementation complexities while enforcing security, rate limiting, and authentication tokens.

## Technical definition
A formally specified interface contract establishing data structures, operation signatures, and protocol constraints through which independent software entities interact programmatically.

## Examples
A ride-hailing app sends GPS coordinates to Google Maps via an HTTP REST endpoint to display an interactive map route.
