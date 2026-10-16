---
label: "Dependency"
qualifier: "(Software)"
aliases:
  - "Software dependency"
loanwords: []
autolink:
  label: never
plain_descriptions:
  - "an external package or library that your application relies on to function"
  - "a third-party software component required to run or compile your project"
summary: "An external library, module, package, or service that a software program requires in order to compile, execute, or deliver its intended functionality."
confusable_notes:
  {}
follow_up_questions:
  - "How do transitive dependencies increase the security attack surface of an application?"
  - "What role do lockfiles play in ensuring deterministic dependency resolution across development environments?"
translation: native
---

## Easy explanation
Pre-manufactured parts in car assembly: an automaker does not build tires or headlights from scratch, but instead relies on specialized suppliers for those critical components.

## Details
Modern software development relies on package managers like npm, pip, or NuGet to fetch dependencies declared in manifests. Dependencies can be direct (explicitly declared) or transitive (dependencies of dependencies). Managing dependencies involves tracking compatibility, security vulnerabilities, license terms, and semantic version increments.

## Technical definition
A structural coupling relationship wherein an autonomous software component depends on the interface contract, compiled binaries, or runtime behavior of an external subsystem.

## Examples
A Node.js web server declaring the Express framework and Axios HTTP client as project dependencies in its package.json file.
