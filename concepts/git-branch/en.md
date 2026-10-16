---
label: "Branch"
qualifier: "(Git)"
aliases:
  []
loanwords: []
autolink:
  label: never
plain_descriptions:
  - "an independent line of work in a repository allowing safe experimentation"
  - "a movable pointer pointing to the latest commit in an isolated development path"
summary: "A lightweight movable reference pointing to a specific commit within a Git repository that represents an independent timeline of development."
confusable_notes:
  {}
follow_up_questions:
  - "Why are Git branches significantly lighter and faster to create than branches in older version control systems?"
  - "How does trunk-based development compare to GitFlow in terms of branch lifespan?"
translation: native
---

## Easy explanation
Sketching a new kitchen layout on an acetate tracing paper laid over your house floor plans without altering the permanent architectural drawings.

## Details
In Git, branches are simply small files containing the 40-character commit hash of the branch tip. Creating a branch is instantaneous because it does not copy files or folders. As commits are added to an active branch, its reference moves forward automatically. This allows developers to isolate bug fixes, experiments, and feature implementations without disturbing the main production codebase.

## Technical definition
A mutable named reference that tracks the head commit of a lineage within the directed acyclic graph of a Git object database.

## Examples
Executing `git branch feature/user-profile` establishes a new reference line where profile enhancements can be developed without affecting the master branch.
