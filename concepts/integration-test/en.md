---
label: "Integration test"
aliases:
  []
loanwords: []
plain_descriptions:
  - "checking whether different software parts work properly when joined together"
  - "testing real interactions between code, databases, and connected services"
summary: "An automated test that verifies whether multiple software components, modules, or external systems cooperate and exchange data correctly."
confusable_notes:
  unit-test: "An integration test verifies interactions across components, databases, or services, whereas a unit test evaluates a single unit of logic in strict isolation."
follow_up_questions:
  - "How do developers maintain test execution speed when running tests with real database instances?"
  - "What strategies help prevent test flakiness in integration test pipelines?"
translation: native
---

## Easy explanation
After checking that the engine, transmission, and steering wheel each work separately, you connect them together to verify that turning the wheel actually directs the wheels on the axle.

## Details
Integration tests assess the seams between modular boundaries. Unlike unit tests, they interact with real infrastructure—such as relational databases, message queues, memory caches, and external web services. They uncover schema mismatches, serialization errors, network connection handling, and transactional rollbacks.

## Technical definition
An automated verification phase that validates interface contracts, data marshaling, and behavioral choreography across interconnected subsystems and infrastructure tiers.

## Examples
Testing an API route that receives an order, saves records to a PostgreSQL database, writes an audit event to a Redis stream, and returns a 201 Created status.
