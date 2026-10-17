---
label: "Browser cache"
aliases:
  - "web cache"
  - "HTTP cache"
loanwords: []
autolink:
  label: auto
plain_descriptions:
  - "a temporary storage folder where your browser saves images and files to reload sites faster"
  - "local memory holding downloaded web assets to avoid requesting them repeatedly"
summary: "A temporary storage mechanism within a web browser that retains previously fetched HTTP resources to speed up future requests."
confusable_notes:
  local-storage: "Browser cache stores HTTP responses (images, CSS, JS) governed by headers, whereas localStorage stores explicit application key-value strings via JavaScript."
follow_up_questions:
  - "How do Cache-Control directives like \"no-cache\" and \"max-age\" dictate freshness validation?"
  - "What role do ETags and If-None-Match headers play in conditional 304 Not Modified responses?"
translation: native
---

## Easy explanation
The browser cache is like keeping copies of your favorite takeout menus in your desk drawer: you don’t need to walk over to the restaurant just to read the menu every evening.

## Details
When a browser retrieves resources, it checks response headers such as Cache-Control, ETag, and Last-Modified. If a resource is fresh, the browser serves it directly from disk or memory cache without generating network traffic. If stale, the browser issues a conditional HTTP request with validators; if unchanged, the server returns a lightweight 304 Not Modified status code.

## Technical definition
A client-side storage architecture that retains HTTP representations according to standard HTTP caching specifications to minimize network latency and bandwidth.

## Examples
A website’s logo image with Cache-Control: max-age=31536000 loads in 2 milliseconds directly from disk cache on repeat visits.
