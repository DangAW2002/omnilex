---
label: SAML
aliases:
  - Security Assertion Markup Language
loanwords: []
autolink:
  label: always
  aliases:
    Security Assertion Markup Language: auto
plain_descriptions:
  - an XML-based standard for passing login data between identity systems and websites
  - enterprise single sign-on protocol using signed security assertions
summary: An open XML-based standard for exchanging authentication and authorization data between an identity provider and a service provider.
confusable_notes:
  openid-connect: SAML is an XML-based federated authentication standard widely used in legacy and enterprise environments; OpenID Connect uses JSON/REST on top of OAuth 2.0 and is standard for modern mobile and cloud applications.
follow_up_questions:
  - How does SAML handle identity provider-initiated versus service provider-initiated flows?
  - What security measures prevent XML signature wrapping attacks in SAML assertions?
translation: native
---

## Easy explanation
Think of a notarized corporate authorization letter: when an employee visits a business partner, they present a sealed, stamped document from their home company verifying their identity and credentials so the partner can trust them immediately without calling headquarters.

## Details
SAML (predominantly version 2.0) defines three key roles: the principal (user), the Identity Provider (IdP), and the Service Provider (SP). The protocol exchanges XML messages containing assertions about user authentication, attributes, and access authorizations. Assertions are cryptographically signed using public-key cryptography to prevent tampering and forged identities. Because of its maturity and comprehensive attribute support, SAML remains standard across government and enterprise single sign-on infrastructures.

## Technical definition
An XML framework designed for federated identity management that defines protocols, bindings, and profiles to transmit security assertions between autonomous administrative domains.

## Examples
A university student accesses an external academic journal website, which redirects to the university login portal to verify student enrollment via a SAML assertion before granting full text access.
