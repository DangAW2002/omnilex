---
label: "Regression testing"
aliases:
  []
loanwords: []
plain_descriptions:
  - "re-running existing tests to make sure new code changes haven't broken old features"
  - "verifying that fixing one software bug didn't accidentally introduce new problems"
summary: "The practice of re-executing test suites against an updated application to ensure that recent code modifications or bug fixes have not disrupted previously working functionality."
confusable_notes:
  {}
follow_up_questions:
  - "How do continuous integration pipelines help automate regression testing on every pull request?"
  - "What criteria determine which tests should be included in a fast smoke-test regression suite versus a nightly full suite?"
translation: native
---

## Easy explanation
Inspecting all the rooms in a renovated house to confirm that fixing the bathroom plumbing did not accidentally cut off the water supply to the kitchen.

## Details
Whenever code is updated, refactored, or upgraded with third-party dependencies, there is a risk of introducing unintended side effects (regressions). Regression testing mitigates this by running previously passing automated unit, integration, and UI tests. In modern DevOps pipelines, automated regression suites run on pull requests to catch regressions before deployment.

## Technical definition
A software verification process involving the selective or comprehensive re-execution of test suites to prove that recent code increments preserve the integrity of existing baseline capabilities.

## Examples
After a patch is applied to optimize database queries on a product catalog, running the checkout regression suite proves customers can still complete purchases without error.
