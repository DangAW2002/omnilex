---
label: "HTTPS"
aliases:
  - "Hypertext Transfer Protocol Secure"
loanwords: []
autolink:
  label: always
plain_descriptions:
  - "encrypted web browsing that protects information from snooping"
  - "the secure version of HTTP marked by the padlock in browsers"
summary: "An extension of HTTP that encrypts bidirectional communication using Transport Layer Security (TLS)."
confusable_notes:
  http: "HTTP transmits messages in cleartext, while HTTPS encrypts traffic to ensure privacy, integrity, and server authentication."
follow_up_questions:
  - "How does TLS certificate verification prevent man-in-the-middle attacks?"
  - "Does HTTPS protect against server-side database breaches?"
translation: native
---

## Easy explanation
If standard HTTP is like sending an open postcard, HTTPS puts that postcard inside a locked steel safe that only the intended recipient possesses the key to unlock.

## Details
HTTPS functions by establishing an encrypted TLS tunnel before any HTTP application data is transmitted. During the initial cryptographic handshake, the server presents a digital certificate signed by a trusted Certificate Authority to authenticate its identity. The client and server then negotiate cipher suites and derive symmetric session keys. Once established, all URLs, headers, cookies, and body payloads are protected against eavesdropping and tampering.

## Technical definition
The application of Transport Layer Security (TLS) encryption to standard HTTP traffic, operating over TCP port 443 by default.

## Examples
When submitting credentials on a banking portal, HTTPS encrypts the password payload so that eavesdroppers on the same Wi-Fi network see only randomized cryptographic ciphertext.
