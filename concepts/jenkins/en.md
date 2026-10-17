---
label: Jenkins
aliases: []
loanwords: []
plain_descriptions:
  - self-hosted automation server widely used for orchestrating build, test, and deployment jobs
  - open-source continuous integration tool configured with pipeline scripts and community plugins
summary: >-
  An open-source automation server that provides hundreds of plugins to support building, deploying, and automating software projects.
confusable_notes:
  github-actions: >-
    Jenkins is a standalone self-hosted automation server with extensive community plugins, whereas GitHub Actions is a managed workflow engine hosted on GitHub.
follow_up_questions:
  - "What are the security trade-offs of maintaining a self-hosted Jenkins controller versus using cloud-hosted pipelines?"
  - "How does a declarative Jenkinsfile improve pipeline versioning compared to classic Freestyle jobs?"
translation: native
---

## Easy explanation
Think of an industrial workshop supervisor running on your own company premises, who receives blueprinted tasks, delegates work to worker machines, and reports the results.

## Details
Jenkins is a Java-based open-source automation server originally created as the Hudson project. It operates on a controller-agent architecture where the controller manages the web interface, schedules builds, and dispatches workloads to distributed agent nodes. Teams configure workflows using scripted or declarative pipelines written in Groovy inside a file named Jenkinsfile committed to source control. Jenkins boasts thousands of community plugins enabling integrations with nearly every version control system, container engine, cloud provider, and test framework, though it requires dedicated administrative maintenance for upgrades and security patches.

## Technical definition
A Java-based extensible open-source continuous integration and continuous delivery automation server orchestrating distributed agent execution via pipeline scripts.

## Examples
A financial institution hosts a private Jenkins cluster behind its corporate firewall to compile core banking services on isolated bare-metal servers without exposing code to external clouds.
