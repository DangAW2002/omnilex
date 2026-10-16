---
label: Webhook
aliases:
  - HTTP callback
loanwords: []
plain_descriptions:
  - an automatic notification sent between servers as soon as something happens
  - a reverse phone call where a payment provider rings your app to say money arrived
summary: An automated HTTP POST callback triggered by an origin system to deliver real-time event payloads to external receiver endpoints.
confusable_notes: {}
follow_up_questions:
  - How do servers verify HMAC signatures on incoming webhook requests?
  - Why are retry policies and idempotency keys critical for webhook consumers?
translation: native
---

## Easy explanation
Instead of repeatedly checking your mailbox every five minutes to see if a package arrived, the delivery driver rings your doorbell the instant it drops onto your porch.

## Details
Webhooks reverse the traditional polling workflow. When an event takes place in a third-party service (such as a successful checkout or code push), that service immediately crafts an HTTP request containing a JSON payload and transmits it directly to a pre-registered callback URL.

## Technical definition
A user-defined HTTP callback mechanism enabling asynchronous event-driven system notifications without client-side polling loops.

## Examples
A payment gateway firing an HTTP POST notification to an e-commerce platform the moment a customer completes a QR code transfer.
