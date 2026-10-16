---
label: JSON Web Token (JWT)
aliases:
  - JWT
loanwords: []
autolink:
  aliases:
    JWT: always
plain_descriptions:
  - a compact digitally signed text token used to prove your identity across web requests
  - a three-part encrypted-looking string that carries user login claims inside an http header
summary: A self-contained web token format conveying verifiable identity assertions through encoded header, payload, and digital signature segments.
confusable_notes: {}
follow_up_questions:
  - Why should sensitive personal data never be placed in unencrypted standard JWT payloads?
  - How can API backends revoke a compromised stateless JWT before its expiration timestamp expires?
translation: native
---

## Easy explanation
Like a festival wristband with an official holographic stamp: security guards verify the stamp at each gate to confirm your access privileges without radioing back to headquarters every time.

## Details
A JWT consists of three base64url-encoded parts separated by periods: Header (algorithm metadata), Payload (user claims and expiry timestamps), and Signature. Because the signature validates that the payload hasn't been altered, servers can verify tokens statelessly without querying a central session database.

## Technical definition
An open, industry-standard RFC 7519 security token format representing verifiable JSON claims signed by symmetric keys (HMAC) or asymmetric key pairs (RSA/ECDSA).

## Examples
Sending `Authorization: Bearer eyJhbGci...` in API request headers to authenticate a user across microservices.
