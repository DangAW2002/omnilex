---
label: "localStorage"
aliases:
  - "Web Storage"
loanwords: []
autolink:
  label: auto
plain_descriptions:
  - "a storage compartment in your browser where websites save preferences permanently"
  - "key-value web storage that keeps information even after closing browser tabs"
summary: "A Web Storage API mechanism that allows web applications to store persistent key-value pairs locally within the user’s browser."
confusable_notes:
  browser-cache: "localStorage stores application strings explicitly via JavaScript, while browser cache caches HTTP asset files automatically via server headers."
follow_up_questions:
  - "How does localStorage differ from sessionStorage and HTTP cookies regarding expiration and size?"
  - "Why should developers never store sensitive authentication tokens in localStorage?"
translation: native
---

## Easy explanation
localStorage is like a personal drawer reserved for a website inside your browser: it keeps your preferred dark theme and settings tucked away safely until your next visit.

## Details
Part of the Web Storage specification, localStorage provides synchronous key-value storage scoped per origin (protocol, domain, and port). Data stored in localStorage persists indefinitely until explicitly cleared via script or user intervention, surviving browser restarts. Most browsers allocate approximately 5MB of storage per origin. Stored values must be strings, frequently requiring JSON.stringify and JSON.parse serialization.

## Technical definition
A synchronous, persistent client-side key-value storage interface scoped to an origin with a typical 5MB capacity limit.

## Examples
Saving a chosen user preference with localStorage.setItem("theme", "dark") ensures that the website opens in dark mode on future browser visits.
