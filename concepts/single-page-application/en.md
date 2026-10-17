---
label: "Single-page application (SPA)"
aliases:
  - "SPA"
loanwords: []
autolink:
  aliases:
    SPA: always
plain_descriptions:
  - "a website that updates content seamlessly without reloading the entire page"
  - "a web app loading a single HTML shell and switching views with JavaScript"
summary: "A web application that interacts with the user by dynamically rewriting the current web page rather than loading entire new pages from a server."
confusable_notes:
  server-side-rendering: "An SPA renders pages client-side using JavaScript in the browser, whereas SSR pre-generates complete HTML on the server for each request."
follow_up_questions:
  - "What challenges do SPAs face with initial load performance and search engine crawlers?"
  - "How does client-side routing emulate multi-page navigation using the History API?"
translation: native
---

## Easy explanation
An SPA is like a desktop application running in your browser: when you click on a menu item, the content inside changes smoothly without the whole window flashing white or reloading.

## Details
In an SPA architecture, the server delivers a single minimal HTML document alongside bundled JavaScript and CSS. When users click navigation links, client-side routing intercepts the event, fetches necessary JSON data from backend APIs asynchronously via fetch or XHR, and updates the DOM in place. This provides fluid, app-like responsiveness, though it requires careful asset optimization to avoid sluggish initial page loads.

## Technical definition
A client-side architecture where routing, state management, and view composition occur entirely in the browser runtime over dynamic API payloads.

## Examples
A webmail dashboard where selecting an email from the inbox list fetches and displays the message body instantly without triggering a browser page refresh.
