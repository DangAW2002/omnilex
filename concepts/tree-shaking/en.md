---
label: "Tree shaking"
aliases:
  - "dead code elimination"
loanwords: []
autolink:
  label: auto
plain_descriptions:
  - "removing unused pieces of code from final program files to save download size"
  - "an optimization step that strips away unreferenced functions and variables"
summary: "A dead-code elimination technique commonly used in modern JavaScript bundlers to remove unused exports from final production bundles."
confusable_notes: {}
follow_up_questions:
  - "Why does tree shaking rely specifically on static ES Module syntax (import/export)?"
  - "How does declaring \"sideEffects: false\" in package.json assist bundler optimizations?"
translation: native
---

## Easy explanation
Picture shaking an apple tree in autumn: the dead, loose leaves fall to the ground while the healthy fruit and strong branches stay firmly attached.

## Details
Tree shaking relies on the static structure of ES2015 module syntax (import and export), where dependencies can be analyzed deterministically without evaluating code. During bundling, tools like Rollup or Webpack traverse the export graph and detect functions or classes that are never referenced by application logic. These uncalled declarations are excluded from the output bundle, drastically cutting download times.

## Technical definition
An automated dead-code elimination process that performs static reachability analysis on module dependency graphs to discard unreachable code.

## Examples
Importing only { format } from an extensive utility library containing 150 functions ensures the remaining 149 unused utilities are stripped from the bundle.
