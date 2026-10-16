---
label: "Rebase"
aliases:
  []
loanwords: []
plain_descriptions:
  - "moving your branch commits so they sit on top of the newest commit of another branch"
  - "rewriting Git history to produce a neat, linear sequence of project changes"
summary: "A Git command that moves or reapplies a sequence of commits from one branch on top of a new base tip, creating a linear history."
confusable_notes:
  {}
follow_up_questions:
  - "What risks arise if a developer rebases commits that have already been pushed and shared with teammates?"
  - "How does interactive rebase (`git rebase -i`) assist engineers in cleaning up commit history before opening a PR?"
translation: native
---

## Easy explanation
Detaching a stack of sticky notes from an older page and pasting them at the very bottom of the newest page so they read sequentially.

## Details
Rebasing works by temporarily setting aside the commits unique to your branch, fast-forwarding your branch pointer to match the upstream branch, and then replaying each stored commit one by one. If differences occur, Git pauses for conflict resolution before resuming. Rebasing yields a clean, linear project history without superfluous merge commits, but it alters commit hashes.

## Technical definition
The process of replaying a series of commit patches onto an updated upstream base reference, rewriting commit DAG ancestry to achieve linear continuity.

## Examples
Executing `git rebase main` while on branch `feature/checkout` reapplies local commits on top of the latest modifications from `main`.
