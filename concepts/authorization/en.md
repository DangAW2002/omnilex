---
label: Authorization
qualifier: (Security)
aliases:
  - AuthZ
loanwords: []
autolink:
  aliases:
    AuthZ: always
plain_descriptions:
  - deciding what actions an identified user is allowed to perform
  - granting specific permissions to access protected resources
summary: The security process that determines whether an authenticated entity has permission to perform a requested operation or access a resource.
confusable_notes:
  authentication: Authorization decides what permissions and resources an identity is allowed to access; authentication verifies the identity of the user or system beforehand.
follow_up_questions:
  - How does attribute-based access control differ from role-based access control?
  - Why is authorization checked on the server side rather than trusting client-side claims?
translation: native
---

## Easy explanation
Think of entering an office building: after showing your employee ID badge at the reception desk to prove who you are, the badge only opens doors to specific floors and storage rooms according to your job responsibilities.

## Details
Authorization occurs after identity is confirmed. The system compares the requester's identity attributes, roles, and contextual conditions (such as IP address or time of day) against defined security policies. Access control mechanisms evaluate these rules to permit, deny, or limit interactions with data, endpoints, or administrative interfaces. Modern architectures frequently implement decentralized authorization through policy engines and standardized token claims.

## Technical definition
The verification of an authenticated principal's privileges against access policies to permit or restrict specific operations on system objects.

## Examples
An e-commerce platform permits customer service representatives to view customer order history but denies them permission to refund transactions exceeding $500 without managerial approval.
