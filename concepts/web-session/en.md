---
label: Session
qualifier: (Web)
aliases:
  - web session
  - user session
loanwords: []
autolink:
  label: never
plain_descriptions:
  - the server-side record remembering who you are while you click around a website
  - the active conversation state linking multiple web page clicks to one logged-in user
summary: A server-side state mechanism that tracks an individual user’s interactions and identity across multiple stateless HTTP requests.
confusable_notes: {}
follow_up_questions:
  - How does session fixation work and how do frameworks guard against it?
  - What architectural challenges arise when scaling stateful sessions across server clusters?
translation: native
---

## Easy explanation
Like keeping an open tab at a coffee shop: you show your order number each time you walk up to the counter, and the barista instantly knows which drinks belong to your bill.

## Details
Because HTTP is stateless, the server creates a session record upon login, assigns a unique cryptographically random identifier (SID), and transmits this key inside an HTTP-only browser cookie. On subsequent requests, the server matches the SID against its memory cache or database to restore user context.

## Technical definition
A stateful server-side persistence context identified by an opaque session key exchanged over HTTP to preserve client authentication state across discrete network interactions.

## Examples
Keeping a user logged in across checkout, product browsing, and profile viewing pages via a session ID stored in Redis.
