---
label: Secret
qualifier: (Software)
aliases:
  - Application secret
  - Secret configuration
  - API secret
loanwords: []
plain_descriptions:
  - sensitive data like passwords, API keys, and encryption certificates that must never be saved in public code
  - secure configuration credentials that grant software access to databases and external services
summary: >-
  A sensitive configuration asset, such as an authentication token, password, private key, or certificate, requiring
  strict encryption and access control.
confusable_notes: {}
follow_up_questions:
  - Why should application secrets never be committed directly to Git version control repositories?
  - How do secret management vaults automate dynamic credential generation and rotation?
translation: native
autolink:
  label: never
---

## Easy explanation
Think of the combination code to a bank vault or house key: you never write it on a postcard and mail it out in the open; you lock it in a secure safe box and share it only with trusted staff.

## Details
Secrets include database passwords, third-party API tokens, and TLS private keys. Best practices forbid hardcoding secrets in source repositories or baking them into container images. Instead, specialized secret managers (like HashiCorp Vault, AWS Secrets Manager, or Kubernetes Secrets) encrypt them at rest, audit access logs, and inject them into containers at runtime as memory-only mounts.

## Technical definition
A cryptographically secured operational asset representing authorization material, requiring access-controlled injection, encryption in transit and at rest, and audit logging.

## Examples
Storing a Stripe live API secret key in an encrypted vault, injecting it into backend pods as an ephemeral in-memory volume at container boot time.
