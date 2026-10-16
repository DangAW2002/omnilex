---
label: OAuth
aliases:
  - OAuth 2.0
  - OAuth framework
loanwords: []
plain_descriptions:
  - the security system that lets you log in with Google without giving your password to third-party apps
  - a delegation protocol granting limited permissions to an app on your behalf
summary: An open standard authorization framework that enables third-party applications to obtain limited access to protected user resources without sharing user passwords.
confusable_notes: {}
follow_up_questions:
  - Why does the Authorization Code flow with PKCE replace the legacy Implicit Grant flow for single-page applications?
  - What distinguishes authentication in OpenID Connect from authorization in pure OAuth 2.0?
translation: native
---

## Easy explanation
Like a valet parking key: it grants the driver enough access to park and start your car, but prevents them from opening your locked glovebox or trunk.

## Details
OAuth 2.0 introduces four roles: resource owner, resource server, client application, and authorization server. Instead of storing user credentials, the client redirects the user to the authorization server, receives an authorization code, and exchanges it for an access token with scoped permissions.

## Technical definition
A delegated authorization protocol specified in RFC 6749 that issues scoped access tokens to third-party clients via consent-driven authorization flows.

## Examples
Authorizing a photo printing app to access your Google Photos albums by approving a login prompt without revealing your Google password.
