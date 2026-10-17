---
label: API gateway
aliases:
  - Gateway routing
loanwords: []
plain_descriptions:
  - single front entrance that directs client requests to appropriate backend services
  - entry server handling auth, throttling, and routing for microservices
summary: An intermediary server pattern that acts as a single point of entry for external clients, routing requests to internal microservices while handling cross-cutting concerns.
confusable_notes:
  reverse-proxy: An API gateway is a specialized reverse proxy tailored for application APIs with request composition, authentication, and transformation, whereas a generic reverse proxy focuses primarily on raw network forwarding and caching.
follow_up_questions:
  - How does the Backend-for-Frontend (BFF) pattern evolve from a standard API gateway?
  - What strategies mitigate the risk of an API gateway becoming a performance bottleneck?
translation: native
---

## Easy explanation
Like a receptionist in a sprawling corporate headquarters who checks visitors badges, answers basic inquiries, and directs each visitor to the correct department elevator.

## Details
An API gateway sits between client devices (mobile apps, web browsers, external partners) and downstream microservices. Instead of clients maintaining dozens of independent remote endpoints, they call a unified gateway domain. The gateway intercepts calls to enforce JSON Web Token authentication, rate limiting, request validation, payload transformation, and circuit breaking. It can also aggregate multiple downstream responses into one unified JSON payload, reducing client radio power consumption on mobile networks.

## Technical definition
An architectural component providing centralized edge routing, protocol translation, authorization enforcement, and telemetry aggregation across microservice topologies.

## Examples
A financial platform gateway receiving 12,000 inbound requests per second, verifying customer authentication tokens, and fanning out parallel calls to account balances and transaction histories.
