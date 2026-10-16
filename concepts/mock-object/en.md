---
label: "Mock"
qualifier: "(Testing)"
aliases:
  - "Mock object"
loanwords: []
autolink:
  label: never
plain_descriptions:
  - "a simulated software stand-in used to test code without calling real external services"
  - "a fake object that checks whether expected functions were called with correct parameters"
summary: "A simulated object that mimics the behavior of a real component in controlled ways, allowing developers to verify interactions and method invocations in isolation."
confusable_notes:
  {}
follow_up_questions:
  - "What is the architectural difference between a mock and a stub in test-driven development?"
  - "Why should developers avoid over-mocking internal implementation details?"
translation: native
---

## Easy explanation
A crash-test dummy in automotive safety testing: it stands in for a real person to safely measure impact forces without endangering human life.

## Details
In unit testing, mock objects replace real collaborators like network clients, payment providers, or email dispatchers. Mocks are pre-programmed with expectations about which calls they should receive, what arguments should be passed, and what mock responses they should return. During test execution, the mock records calls and asserts that expected interactions occurred.

## Technical definition
A test double configured with pre-programmed behavioral expectations that verifies interactions between the system under test and its external collaborators.

## Examples
In testing an order checkout service, replacing the real VNPay credit card gateway with a mock that returns a simulated payment success token without charging a real card.
