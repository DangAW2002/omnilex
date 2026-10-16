---
label: Content Delivery Network (CDN)
aliases:
  - CDN
loanwords: []
plain_descriptions:
  - a worldwide network of caching servers that delivers web pages and images quickly from locations near the user
  - a distributed cache that speeds up websites by serving files from nearby edge servers
summary: >-
  A geographically distributed network of proxy servers that caches and delivers web content to users with low latency
  and high availability.
confusable_notes: {}
follow_up_questions:
  - How do cache-control headers and Time-To-Live (TTL) settings dictate CDN cache invalidation?
  - In what ways do CDNs defend origin servers against distributed denial-of-service (DDoS) attacks?
translation: native
autolink:
  aliases:
    CDN: always
---

## Easy explanation
Like a chain of local convenience stores: instead of ordering milk directly from a dairy farm 500 miles away every morning, you pick up a carton delivered in advance to the store around the corner.

## Details
CDNs deploy edge servers (points of presence, or PoPs) globally. When a user requests assets (such as images, video clips, CSS, or JavaScript), DNS routes them to the nearest edge location. If cached, the asset returns in milliseconds; if not, the CDN fetches it from the origin server, caches it locally, and serves the user.

## Technical definition
A globally distributed overlay network of caching edge nodes optimizing asset delivery via geo-DNS routing, TLS termination, and origin shielding.

## Examples
A news website hosted on servers in Singapore caches high-resolution breaking news photographs on CDN edge locations in Hanoi, Tokyo, and London.
