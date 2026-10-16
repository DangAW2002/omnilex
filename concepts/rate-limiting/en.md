---
label: Rate limiting
aliases:
  - API throttling
  - Traffic shaping
  - Request rate limiting
loanwords: []
plain_descriptions:
  - restricting how many times a user or app can call an API within a minute or hour to stop abuse
  - a traffic cap preventing servers from crashing when too many requests arrive at once
summary: >-
  A defensive network control mechanism that caps the number of requests a client can submit to an API or service within
  a specified time window.
confusable_notes: {}
follow_up_questions:
  - How does the Token Bucket algorithm differ from the Sliding Window Counter algorithm for rate limiting?
  - Why should rate-limited responses return HTTP 429 Too Many Requests alongside a Retry-After header?
translation: native
---

## Easy explanation
Like a security guard at an amusement park ride letting only ten people enter the platform every five minutes so the boarding area never gets dangerously overcrowded.

## Details
Rate limiting protects server capacity from denial-of-service spikes, brute-force attacks, and abusive web scrapers. Common implementation algorithms include Token Bucket, Leaky Bucket, and Fixed or Sliding Window counters. When a client exceeds their allotted quota, the server rejects requests with HTTP status code 429 (Too Many Requests).

## Technical definition
A traffic management policy that meters inbound requests per client identity or IP address, enforcing rejection or queuing upon exceeding quota boundaries.

## Examples
An API gateway limits free tier accounts to 60 requests per minute, returning HTTP 429 and `Retry-After: 30` when an automated script fires 100 requests in 10 seconds.
