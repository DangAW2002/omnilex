---
label: "Server-side rendering (SSR)"
aliases:
  - "SSR"
loanwords: []
autolink:
  aliases:
    SSR: always
plain_descriptions:
  - "creating the complete HTML web page on the server before sending it to the user"
  - "server-generated web pages that display fast and help search engines index content"
summary: "The process of rendering web components into complete HTML strings on the server in response to user requests."
confusable_notes:
  single-page-application: "SSR generates ready-to-view HTML on the server for each request, whereas client-side SPAs assemble views inside the browser via JavaScript."
  static-site-generation: "SSR renders HTML dynamically on each incoming request, whereas SSG generates HTML files ahead of time at build time."
follow_up_questions:
  - "What is the performance tradeoff between Time to First Byte (TTFB) and First Contentful Paint (FCP) in SSR?"
  - "How does hydration link client-side interactivity to server-rendered HTML?"
translation: native
---

## Easy explanation
SSR is like ordering a fully assembled meal at a restaurant: it arrives at your table ready to eat, rather than bringing you raw ingredients to cook yourself.

## Details
When a browser requests an SSR-enabled URL, the backend node server runs component rendering code against database records to construct a complete HTML string. The browser receives pre-populated markup and displays content immediately, ensuring rapid First Contentful Paint and flawless discoverability for search engine crawlers. Interactivity is attached subsequently through client-side hydration.

## Technical definition
A rendering paradigm where application views and component trees are evaluated on the web server to emit populated HTML per incoming HTTP request.

## Examples
An e-commerce product page where the server queries inventory, injects the price and description into template HTML, and serves the rendered page in 120 milliseconds.
