---
label: "Lazy loading"
aliases:
  - "deferred loading"
  - "on-demand loading"
loanwords: []
autolink:
  label: auto
plain_descriptions:
  - "waiting to load images and content until the user actually scrolls to them"
  - "delaying resource downloads until they are needed on screen"
summary: "A performance optimization pattern that defers the loading of non-critical resources until they are needed by the user."
confusable_notes:
  code-splitting: "Code splitting divides code into discrete downloadable bundles, while lazy loading is the trigger logic that fetches those bundles or images when required."
follow_up_questions:
  - "How does the browser Intersection Observer API enable efficient image lazy loading?"
  - "Why should above-the-fold hero images never be configured with lazy loading?"
translation: native
---

## Easy explanation
Lazy loading is like reading a restaurant menu: the kitchen does not start cooking desserts the moment you sit down; they only prepare dessert when you finish dinner and order it.

## Details
Lazy loading prevents bandwidth and memory exhaustion by postponing asset downloads. For images and iframes, native loading="lazy" attributes instruct modern browser engines to defer requests until elements approach the viewport. For JavaScript components, frameworks combine lazy loading with code splitting using dynamic imports, fetching view code only when user navigation triggers an intersection or route change.

## Technical definition
A design pattern that delays the initialization and network retrieval of assets until an intersection event or user interaction demands their presentation.

## Examples
Setting <img src="chart.png" loading="lazy" alt="Annual statistics"> ensures the 2MB image is not fetched until the visitor scrolls down to footer sections.
