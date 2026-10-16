---
label: Pipeline
qualifier: (CI/CD)
aliases:
  - CI/CD pipeline
  - build pipeline
loanwords: []
plain_descriptions:
  - the step-by-step automated workflow that builds, tests, and packages code changes
  - the scripted sequence that takes software from a commit to a deployable artifact
summary: A defined sequential series of automated execution steps that compiles, tests, and packages application updates.
confusable_notes: {}
follow_up_questions:
  - Why should slow integration tests be separated into later stages of a pipeline?
  - How do pipeline caching mechanisms accelerate continuous integration builds?
translation: native
autolink:
  label: never
---

## Easy explanation
Think of an airport baggage handling system: luggage moves down a conveyor through x-ray scanning, weight inspection, sorting, and aircraft loading in strict linear order.

## Details
A CI pipeline organizes engineering tasks into structured phases such as build, unit test, security scan, and artifact publishing. Tasks within a phase can run in parallel across distributed workers to shorten feedback loops. If any job encounters a failure or test regression, execution stops immediately, notifying the author.

## Technical definition
A directed execution graph declaring sequential stages and dependencies to validate source code and generate verified deployment artifacts.

## Examples
A GitHub Actions workflow where step one lints TypeScript code, step two executes parallel unit tests in 45 seconds, and step three uploads a production bundle.
