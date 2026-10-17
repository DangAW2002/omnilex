---
label: "Static site generation (SSG)"
aliases:
  - "SSG"
loanwords: []
autolink:
  aliases:
    SSG: always
plain_descriptions:
  - "pre-building every page of a website into ready files before visitors arrive"
  - "generating fixed HTML pages during development for ultra-fast CDN delivery"
summary: "A build method that pre-renders full HTML pages at compile time rather than on demand for each user request."
confusable_notes:
  server-side-rendering: "SSG builds static HTML files once during compilation, while SSR dynamically renders HTML on the server for each incoming visitor request."
follow_up_questions:
  - "How do incremental builds address build-time bottlenecks in large SSG deployments?"
  - "Why does SSG offer superior security and infrastructure cost profiles compared to dynamic servers?"
translation: native
---

## Easy explanation
SSG is like pre-printing a daily newspaper: all copies are printed in advance overnight so readers can pick them up instantly without waiting for a printing press.

## Details
During the build phase, an SSG tool traverses content files (such as Markdown or headless CMS records) and generates static HTML, CSS, and asset bundles for every route. These assets are deployed directly to Content Delivery Networks (CDNs), where they are served with sub-second response times without requiring dynamic application servers or database queries at request time.

## Technical definition
A build-time compilation strategy generating immutable HTML documents and assets prior to deployment, eliminating runtime server evaluation.

## Examples
A technical documentation site compiling 500 markdown guides into standalone HTML files in 40 seconds, then serving them globally from edge CDN storage.
