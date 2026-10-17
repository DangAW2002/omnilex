---
label: Configuration management
aliases: []
loanwords: []
plain_descriptions:
  - automating the setup, software packages, and system settings across a fleet of servers
  - keeping track of system configs using code so environments remain consistent and drift-free
summary: >-
  The automated discipline and toolset used to establish, track, and maintain consistency of system settings and software across infrastructure assets.
confusable_notes:
  immutable-infrastructure: >-
    Configuration management modifies and maintains mutable state on existing servers over time, whereas immutable infrastructure replaces entire machines or images with new versions rather than changing them in place.
follow_up_questions:
  - "How does idempotency in configuration management playbooks prevent unintended state modifications?"
  - "Why does configuration drift occur when engineers make unrecorded manual changes on live servers?"
translation: native
---

## Easy explanation
Like a master blueprint for building identical hotel rooms: instead of individual carpenters decorating rooms differently, every room is furnished according to an exact checklist so they all look identical.

## Details
Configuration management encompasses the systems, tools, and processes used to automate server provisioning and software configuration. Tools such as Ansible, Puppet, Chef, and SaltStack use declarative manifests to define the desired state of packages, system users, network configurations, and services on target hosts. Rather than manually SSHing into servers, engineers run automated playbooks that idempotently converge target machines toward the declared state. The practice establishes consistency across development, staging, and production environments, enhances compliance auditing, and eliminates snowflake servers whose unique configurations make them difficult to recreate.

## Technical definition
A disciplined engineering process for establishing and maintaining consistency of a product performance, functional, and physical attributes with its requirements throughout its lifecycle.

## Examples
An Ansible playbook is run across two hundred Linux servers to update OpenSSH configurations, install security patches, and restart the daemon without requiring manual intervention.
