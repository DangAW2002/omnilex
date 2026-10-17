---
label: Proxy server
aliases: []
loanwords: []
plain_descriptions:
  - middleman server that makes requests on behalf of other computers
  - intermediary computer that filters web traffic or caches responses
summary: An intermediary server application that acts as an agent for clients seeking resources from other destination servers.
confusable_notes: {}
follow_up_questions:
  - How does a forward proxy differ operationally and architecturally from a reverse proxy?
  - What caching and content acceleration benefits do forward proxies offer to enterprise networks?
translation: native
---

## Easy explanation
Like sending a personal assistant to a busy marketplace with a shopping list: the vendor only sees and interacts with your assistant, never knowing who the goods were bought for.

## Details
A forward proxy receives client requests, strips or alters identifying headers, evaluates caching and content filtering policies, and forwards the request to the upstream target server on behalf of the client. In contrast, a reverse proxy sits in front of backend web servers, handling SSL termination, load balancing, and DDoS mitigation for inbound internet users.

## Technical definition
A network entity functioning at the application or transport layer that intercepts client-originated requests, evaluates compliance policies, fetches content from upstream origins, and delivers sanitized or cached responses back to the client.

## Examples
A corporate office routes all employee web browsing through a forward proxy server that blocks malicious phishing websites and caches repeated software downloads to save internet bandwidth.
