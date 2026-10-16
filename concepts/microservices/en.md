---
label: "Microservices"
aliases:
  - "Microservice architecture"
loanwords: []
plain_descriptions:
  - "building software as a suite of small, independent services that communicate over a network"
  - "an architectural style where each business capability runs in its own deployable process"
summary: "An architectural style that structures an application as a collection of small, independently deployable, and loosely coupled services communicating via lightweight protocols."
confusable_notes:
  {}
follow_up_questions:
  - "What operational complexities, such as distributed tracing and eventual consistency, emerge when moving from a monolith to microservices?"
  - "How does Domain-Driven Design (DDD) help teams define bounded contexts for individual microservices?"
translation: native
---

## Easy explanation
Running a shopping mall made of independent specialty boutiques (bakery, bookstore, pharmacy) with their own staff and registers, rather than one giant department store where everything runs through a single cash register.

## Details
In a microservices architecture, each service is centered around a specific business capability, maintains its own dedicated database, and can be developed, tested, and scaled independently using different technology stacks. Communication occurs over lightweight network mechanisms such as REST APIs, gRPC, or message queues. While providing team autonomy, it introduces distributed systems challenges.

## Technical definition
A distributed architectural pattern decomposing an enterprise system into autonomous, bounded-context services communicating asynchronously or synchronously via protocol endpoints.

## Examples
A streaming platform deploys separate microservices for user authentication, video recommendations, billing, and media playback streaming.
