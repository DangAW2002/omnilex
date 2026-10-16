---
label: "Software Development Kit (SDK)"
aliases:
  - "SDK"
loanwords: []
autolink:
  aliases:
    SDK: always
plain_descriptions:
  - "an all-in-one toolbox for building software for a specific platform"
  - "a prepackaged set of tools and code libraries provided to developers"
summary: "A comprehensive collection of development tools, client libraries, documentation, and code samples designed for creating applications on a specific platform or service."
confusable_notes:
  api: "An SDK provides ready-to-use client libraries, compilers, and debugging utilities, while an API only defines the contract and rules for communication."
follow_up_questions:
  - "When should a developer use an SDK instead of calling an API directly via HTTP?"
  - "How do vendors ensure their client SDKs stay in sync with API updates?"
translation: native
---

## Easy explanation
If an API is an electric wall outlet, the SDK is the complete appliance with the power cord, plug, adapter, and instructions ready to use out of the box.

## Details
An SDK typically includes pre-compiled client libraries, language bindings, compilers, test harnesses, and command-line utilities. It abstracts raw network requests, handling authentication, serialization, retries, and error parsing into idiomatic programming language constructs.

## Technical definition
An integrated package of programming tools, runtime libraries, platform-specific APIs, and documentation facilitating application engineering for a target operating environment or cloud framework.

## Examples
Installing the AWS SDK for Node.js lets an engineer upload files to Amazon S3 with a simple method call rather than hand-crafting HTTP authorization signatures.
