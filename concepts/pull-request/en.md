---
label: "Pull request (PR)"
aliases:
  - "PR"
  - "Pull request"
loanwords: []
autolink:
  aliases:
    PR: always
plain_descriptions:
  - "a formal request asking teammates to review and merge your branch into the main codebase"
  - "a shared discussion page displaying proposed code changes in version control"
summary: "A mechanism in distributed version control platforms that allows a developer to propose changes from a feature branch and request peer review before merging."
confusable_notes:
  {}
follow_up_questions:
  - "What merge strategies (squash and merge, rebase and merge, or merge commit) best suit different team workflows?"
  - "How do continuous integration status checks guard a pull request against broken builds?"
translation: native
---

## Easy explanation
Submitting a completed homework project to your study group leader so they can inspect your work before adding it to the final team presentation.

## Details
Pull requests (often called merge requests in platforms like GitLab) aggregate commits, diffs, code comments, and automated build status in a unified interface. Reviewers can discuss specific lines, suggest automated edits, and approve or request revisions. Once required approvals and CI pipeline checks succeed, the branch is merged into the target branch.

## Technical definition
A source code collaboration pattern in Git hosting services facilitating peer review, automated validation, and controlled merging of commits from a source branch into a target baseline.

## Examples
An engineer opens a pull request on GitHub to merge their shopping cart implementation branch into the primary development branch.
