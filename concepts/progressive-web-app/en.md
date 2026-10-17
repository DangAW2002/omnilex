---
label: "Progressive web app (PWA)"
aliases:
  - "PWA"
loanwords: []
autolink:
  aliases:
    PWA: always
plain_descriptions:
  - "a website that works offline and can be installed like a phone app"
  - "web applications combining modern browser capabilities with native app features"
summary: "A web application built using web technologies that delivers app-like experiences, offline capabilities, and device installation."
confusable_notes: {}
follow_up_questions:
  - "What criteria must a web app fulfill to trigger an install prompt in modern browsers?"
  - "How do Service Workers enable background sync and push notifications in PWAs?"
translation: native
---

## Easy explanation
A PWA is a website that masquerades as an app: you can install its icon onto your phone screen, open it without a browser address bar, and read articles even in airplane mode.

## Details
PWAs leverage progressive enhancement principles backed by modern browser APIs. Key pillars include a Web App Manifest JSON file defining display icons and themes, HTTPS enforcement, and a Service Worker providing background caching and offline fallbacks. Advanced capabilities allow PWAs to receive web push notifications, synchronize transactions in the background, and access local hardware features.

## Technical definition
A standards-based web application leveraging Service Workers, HTTPS, and Web App Manifests to deliver offline-capable, installable user experiences.

## Examples
A news website that caches today’s top 20 stories so users can read full articles seamlessly on the subway without mobile network connectivity.
