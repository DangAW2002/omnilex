---
label: "Monorepo"
aliases:
  []
loanwords: []
plain_descriptions:
  - "storing multiple distinct projects, apps, and shared libraries inside one single repository"
  - "a unified code repository holding all the different services of an organization"
summary: "A software development approach and repository architecture where multiple separate projects, applications, and shared libraries reside within a single version control repository."
confusable_notes:
  {}
follow_up_questions:
  - "What tooling (such as build caching and task pipelines) is necessary to keep monorepos fast as codebases grow?"
  - "How do code access controls and deployment pipelines differ between monorepos and polyrepo multi-repository setups?"
translation: native
---

## Easy explanation
Keeping all documents, guides, and manuals for every department of a company organized in one giant central binder rather than distributing them across dozens of loose folders.

## Details
In a monorepo, code sharing across projects is straightforward because dependencies can be referenced directly through workspace links without publishing intermediate packages to external registries. Monorepos facilitate atomic cross-boundary refactoring and unified tooling. However, scaling a monorepo requires advanced build orchestration tools (like Turborepo, Nx, or Bazel) that employ computational caching.

## Technical definition
A source code organizational topology in which distinct software systems, microservices, and internal libraries are collocated within a singular revision control tree.

## Examples
An organization houses its iOS app, Android app, web dashboard, and shared TypeScript validation schemas inside a single Git repository managed by Nx.
