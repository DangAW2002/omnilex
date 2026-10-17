---
label: Artifact
qualifier: (Build)
aliases: []
loanwords: []
autolink:
  label: never
plain_descriptions:
  - compiled files, binaries, or packages produced by a build pipeline for deployment or storage
  - tangible output file generated during compilation that can be tested, shared, or installed
summary: >-
  A file or collection of files produced by a build process that can be archived, distributed, or deployed to target environments.
confusable_notes: {}
follow_up_questions:
  - "Why should build artifacts be immutable and versioned with unique identifiers?"
  - "How does an artifact repository differ from a traditional source code repository?"
translation: native
---

## Easy explanation
Like a freshly baked loaf of bread wrapped and stamped with a batch number: the flour and recipe are the source code, but the loaf itself is what gets delivered to customers.

## Details
In software development, an artifact is the concrete output resulting from compiling, bundling, or packaging source code. Examples include Java JAR and WAR archives, compiled Go binaries, Node.js distribution tarballs, Debian packages, and mobile application packages like APK or IPA files. Build pipelines generate artifacts, execute automated integration tests against them, and upload them to centralized artifact registries like Nexus, Artifactory, or cloud registries. Storing immutable artifacts ensures that the exact binary verified during staging is the one released to production, eliminating discrepancies caused by re-compiling code in different environments.

## Technical definition
A deployable, versioned binary or packaged asset produced by a continuous integration build step and stored in a repository for staging and release verification.

## Examples
A continuous delivery pipeline compiles a Go backend into a single executable binary, signs it cryptographically, and uploads it to an internal repository with the release tag v2.4.1.
