---
label: Container registry
aliases: []
loanwords: []
plain_descriptions:
  - storage repository for publishing, sharing, and downloading container images
  - app store library where Docker images are stored and pulled by servers
summary: A centralized storage and content delivery system for storing, managing, and distributing container images across development and production environments.
confusable_notes: {}
follow_up_questions:
  - How does layer deduplication and content-addressable storage optimize storage efficiency in a container registry?
  - What vulnerability scanning mechanisms do modern registries enforce during image push events?
translation: native
---

## Easy explanation
Like a centralized photographic negative library or software app repository: developers deposit master image blueprints, and servers worldwide download copies whenever they need to start a container.

## Details
A container registry conforms to the Open Container Initiative (OCI) distribution specification. It manages repositories containing versioned image tags and manifests. Registries implement access control policies, integration with continuous deployment pipelines, automated vulnerability scanning for embedded packages, and cryptographic signing to verify container provenance before runtime execution.

## Technical definition
An OCI-compliant HTTP service providing cataloging, layer blob storage, and manifest indexing for container images and OCI artifacts, handling push and pull operations via authenticated token exchanges.

## Examples
A continuous integration build pipeline builds a Docker image for a microservice, tags it as `v1.4.2`, and runs `docker push registry.company.com/auth-service:v1.4.2` so Kubernetes clusters can pull it during deployment.
