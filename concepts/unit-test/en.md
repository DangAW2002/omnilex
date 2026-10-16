---
label: "Unit test"
aliases:
  []
loanwords: []
plain_descriptions:
  - "an automated check testing the smallest single piece of code in isolation"
  - "verifying that an individual function returns the correct answer for given inputs"
summary: "An automated test that isolates and verifies the behavioral correctness of the smallest testable component or function of an application."
confusable_notes:
  integration-test: "A unit test isolates and tests an individual function or class with mock dependencies; an integration test verifies that multiple real components or subsystems work together."
follow_up_questions:
  - "Why should unit tests run independently without accessing external databases or network services?"
  - "What is the difference between code coverage and test assertion quality in unit testing?"
translation: native
---

## Easy explanation
Inspecting each individual brick for cracks and standard measurements before assembling them into a brick wall.

## Details
Unit tests typically follow the Arrange-Act-Assert (AAA) pattern. They exercise small computational units like pure functions, methods, or classes. To ensure fast execution and reliable isolation, all external dependencies like file systems, databases, and network APIs are substituted with mocks or stubs.

## Technical definition
A fine-grained automated validation procedure executed against isolated modular software primitives to assert programmatic correctness under deterministic preconditions.

## Examples
Testing an e-commerce discount calculator function to ensure that supplying an input of 1,000,000 VND and a 10% coupon code yields an output of exactly 900,000 VND.
