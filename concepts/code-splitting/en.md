---
label: "Code splitting"
aliases:
  - "bundle splitting"
loanwords: []
autolink:
  label: auto
plain_descriptions:
  - "splitting a large web app into smaller chunks that load only when needed"
  - "breaking up big JavaScript files so users do not download unnecessary code up front"
summary: "A technique of splitting a single application bundle into multiple smaller chunks that can be loaded on demand or in parallel."
confusable_notes:
  lazy-loading: "Code splitting is the architectural act of dividing the bundle into chunks, whereas lazy loading is the runtime strategy of deferring their download until requested."
follow_up_questions:
  - "How does dynamic import() syntax instruct bundlers to create new chunk boundaries?"
  - "What criteria should determine route-based versus component-based code splitting?"
translation: native
---

## Easy explanation
Code splitting is like dividing an entire encyclopedia into separate topic booklets: you only hand the reader the volume they asked for today rather than hauling all 24 heavy books at once.

## Details
Instead of forcing visitors to download a massive monolithic JavaScript bundle containing every screen of an application, code splitting breaks the code into distinct chunks. Route-level splitting separates admin dashboards from public landing pages, while component-level splitting separates complex modals or rich text editors. Bundlers automatically generate isolated files triggered by asynchronous dynamic import() calls.

## Technical definition
An optimization strategy that partitions an application dependency graph into separate discrete bundles loaded asynchronously at runtime.

## Examples
Splitting an administration dashboard chunk of 400KB away from the landing page ensures ordinary visitors download only the 60KB home page bundle.
