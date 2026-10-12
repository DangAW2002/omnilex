---
label: Token
qualifier: (Authentication)
aliases: [access token, bearer token]
loanwords: []
plain_descriptions:
  - digital access pass sent with web requests
  - encoded string proving you are logged in
summary: A cryptographically signed string presented to servers to prove identity and authorization permissions.
confusable_notes:
  token-llm: LLM tokens represent text chunks consumed by AI models, having no security role.
  token-crypto: Crypto tokens are digital assets on decentralized ledgers.
follow_up_questions:
  - What are the tradeoffs between stateful session IDs and stateless JWT bearer tokens?
translation: native
---

## Easy explanation
Like an all-day wristband at a festival: you show it at every stage entrance without re-checking your passport each time.

## Details
Issued by an authentication server after validating credentials, commonly formatted as a JSON Web Token (JWT) bearing cryptographic signatures and expiration timestamps.

## Technical definition
A compact, verifiable claim container passed in request headers (e.g., HTTP `Authorization: Bearer <token>`) providing stateless authorization.

## Examples
An OAuth 2.0 bearer token attached to API requests to access private user profile resources.
