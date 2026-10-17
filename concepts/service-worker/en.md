---
label: "Service worker"
aliases:
  - "service workers"
loanwords: []
autolink:
  label: auto
plain_descriptions:
  - "a background background script that acts as an invisible network proxy for web apps"
  - "the technical engine that enables web apps to work offline and receive push notifications"
summary: "An event-driven background worker script that intercepts network requests, manages caching strategies, and powers push notifications."
confusable_notes: {}
follow_up_questions:
  - "How does the service worker lifecycle manage installation, activation, and update replacement?"
  - "What are the differences between Cache-First and Network-First caching strategies?"
translation: native
---

## Easy explanation
A service worker is like a personal butler stationed between your browser and the internet: when you ask for a page, the butler checks your local pantry first, and only goes to the store if something is missing.

## Details
A Service Worker is a specialized Web Worker running in a separate thread independent of web pages, meaning it cannot access the DOM directly. It acts as an in-browser programmable proxy intercepting outgoing HTTP requests via fetch events. Developers can implement sophisticated caching strategies using the Cache Storage API, enabling instant page loads and offline experiences. It also handles push messages and background synchronization tasks.

## Technical definition
An event-driven network proxy worker executed off the main thread, providing programmable request interception, cache storage control, and background event handling.

## Examples
A service worker intercepts an image request; finding a cached copy in local storage, it returns the response immediately without making an outbound network request.
