---
label: "Merge conflict"
aliases:
  []
loanwords: []
plain_descriptions:
  - "a dispute where two branches edited the same lines of a file and Git cannot choose automatically"
  - "a clash in version control that requires manual human intervention to reconcile differing changes"
summary: "A state in version control that arises when competing changes are made to the same lines of code or when one branch modifies a file that another branch deletes, preventing automatic merging."
confusable_notes:
  {}
follow_up_questions:
  - "What practices help software teams minimize the frequency and severity of merge conflicts?"
  - "How do 3-way merge tools help developers inspect common ancestors when resolving conflicts?"
translation: native
---

## Easy explanation
Two authors simultaneously editing the very same sentence in a printed book using different pen colors, requiring both authors to sit down and agree on the final sentence.

## Details
Git performs automatic merges when changes occur in separate files or distinct sections of the same file. However, if two branches modify overlapping lines since their common ancestor, Git suspends the merge and inserts conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`). The developer must manually edit the file to preserve the correct logic, remove the markers, and complete the merge commit.

## Technical definition
A difference between overlapping hunks that cannot be reconciled automatically encountered during a three-way merge operation across divergent commit histories.

## Examples
Developer A changes the server timeout to 30 seconds on line 15, while Developer B changes that same line to 60 seconds, resulting in a merge conflict.
