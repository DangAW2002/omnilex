---
label: OpenID Connect (OIDC)
aliases:
  - OIDC
loanwords: []
autolink:
  aliases:
    OIDC: always
plain_descriptions:
  - an identity layer on top of OAuth that lets apps verify user identity
  - signing into websites using an existing Google or Apple account
summary: An identity protocol built on OAuth 2.0 that allows clients to verify user identity and obtain profile information via JSON Web Tokens.
confusable_notes:
  saml: OpenID Connect is a lightweight JSON/REST identity layer built on OAuth 2.0; SAML relies on heavier XML assertions and SOAP envelopes common in enterprise SSO.
follow_up_questions:
  - What information is carried inside the ID Token issued during an OIDC flow?
  - How does the UserInfo endpoint complement the data received in the ID Token?
translation: native
---

## Easy explanation
Think of a digital driver's license shown at an online checkout: OAuth 2.0 grants permission to move your items, while OpenID Connect provides the laminated card proving your full name and date of birth in a universally readable format.

## Details
OpenID Connect (OIDC) expands upon OAuth 2.0 by providing a standardized identity layer. While vanilla OAuth focuses on delegating access permissions, OIDC delivers a cryptographically signed identity assertion known as an ID Token. The client application decodes and validates this token to confirm identity, retrieve core profile claims (such as email and subject identifier), and locate discovery endpoints (`/.well-known/openid-configuration`) for key rotation.

## Technical definition
An identity authentication profile and protocol layer implemented over OAuth 2.0 that provides client applications with cryptographically verifiable identity claims via JSON Web Tokens.

## Examples
A mobile fitness application displays a "Sign in with Google" button, using OIDC to authenticate the athlete and retrieve their verified email address without storing passwords.
