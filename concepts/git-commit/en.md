---
label: "Commit"
qualifier: "(Git)"
autolink:
  label: never
aliases:
  []
loanwords: []
plain_descriptions:
  - "a saved snapshot recording the exact state of project files with an explanatory note"
  - "a permanent record in the repository history describing what was changed and who changed it"
summary: "An immutable snapshot of staged changes recorded into Git repository history, associated with author metadata, timestamp, parent hashes, and a descriptive log message."
confusable_notes:
  {}
follow_up_questions:
  - "Why is it important to write informative, imperative commit messages in software development?"
  - "How does Git identify commit objects uniquely using cryptographic SHA hashes?"
translation: native
---

## Easy explanation
Saving a permanent milestone save point in a video game with a short note explaining your progress before entering a difficult dungeon.

## Details
A Git commit records a complete tree snapshot of the project staging area. Each commit object stores references to its parent commits, author and committer names, email addresses, timestamps, and an explanatory commit message. Because commits form an append-only directed acyclic graph (DAG), earlier states can always be inspected, compared, or restored.

## Technical definition
An immutable object within the Git object store encapsulating a directory tree pointer, parent lineage identifiers, author provenance, and change metadata.

## Examples
Running `git commit -m "Fix calculation bug in invoice discount percentage"` stores the staged modifications as a permanent history record.
