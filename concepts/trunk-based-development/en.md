---
label: Trunk-based development
aliases: []
loanwords: []
plain_descriptions:
  - branching practice where all developers merge small changes frequently into a single central branch
  - workflow that eliminates long-lived feature branches by integrating code directly to main every day
summary: >-
  A version control management practice where developers merge frequent, small code updates into a core branch called the trunk.
confusable_notes: {}
follow_up_questions:
  - "How do feature flags make trunk-based development safe for uncompleted features?"
  - "Why does avoiding long-lived feature branches reduce painful merge conflicts?"
translation: native
---

## Easy explanation
Instead of separate construction crews working in private corners for months and struggling to join their walls at the end, every worker lays a few bricks on the main structure each day.

## Details
Trunk-based development is a source control strategy favored by high-performing engineering teams. Rather than creating isolated branches that live for weeks or months, developers create short-lived branches lasting only a few hours to a day, or commit directly to the shared trunk (often called main or master). Comprehensive automated test suites validate each merge request rapidly. To deploy unfinished or experimental capabilities without exposing them to users, teams leverage feature flags and branch-by-abstraction patterns. This practice significantly reduces integration pain, shortens cycle times, and keeps the team aligned on current system behavior.

## Technical definition
A source code branching strategy where engineers integrate small, frequent increments into a single central branch, supported by automated testing and feature toggles.

## Examples
A team of eight engineers merges five pull requests per person daily into the main branch, using automated CI pipelines running under five minutes to keep production deployable at any moment.
