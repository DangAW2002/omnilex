---
label: Cookie
aliases: [HTTP cookie, browser cookie]
loanwords: []
plain_descriptions:
  - small browser file websites save to remember your login
  - web tracker banner you click accept on
summary: A small piece of data stored on the user's browser by websites to retain state and track browsing activity.
confusable_notes: {}
follow_up_questions:
  - What are the operational differences between first-party and third-party tracking cookies?
translation: native
---

## Easy explanation
Like a coat-check ticket handed to you at a club: when you return to the counter, handing back the ticket proves which coat is yours.

## Details
Managed via HTTP headers (`Set-Cookie` and `Cookie`), cookies maintain persistent sessions, store preferences, and enable cross-site tracking when not restricted by SameSite flags.

## Technical definition
A localized data packet conforming to RFC 6265 exchanged between a web server and client browser to enable state management over stateless HTTP.

## Examples
Preserving items inside an e-commerce shopping cart across page reloads.
