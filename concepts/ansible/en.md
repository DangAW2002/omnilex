---
label: Ansible
aliases: []
loanwords: []
plain_descriptions:
  - agentless tool for configuring servers and automating software setups via SSH
  - automation engine using YAML playbooks to install and manage software across machines
summary: An open-source automation engine that automates cloud provisioning, configuration management, and application deployment without installing agents on managed nodes.
confusable_notes:
  terraform: Ansible focuses on server configuration management and installing software via SSH playbooks, whereas Terraform focuses on declarative cloud infrastructure provisioning.
follow_up_questions:
  - Why does Ansible’s agentless architecture simplify security compliance on managed servers?
  - How does idempotency ensure that executing an Ansible playbook repeatedly causes no unwanted side effects?
translation: native
---

## Easy explanation
Like a master chef sending recipe cards to line cooks across multiple restaurant branches: cooks follow the instructions step by step, and if an ingredient is already prepped, they skip to the next step.

## Details
Ansible communicates with managed servers over standard OpenSSH (or WinRM for Windows), eliminating the need to install or update background daemons on client machines. Automation workflows are defined in human-readable YAML files called playbooks. Modules execute tasks idempotently, ensuring that running a playbook multiple times only applies changes when the target state does not match.

## Technical definition
An open-source IT automation system executing idempotent state modules over SSH transport, orchestrated via YAML-defined playbooks without client-side daemon dependencies.

## Examples
A system administrator executes `ansible-playbook -i hosts site.yml` to automatically install NGINX, copy SSL certificates, and restart web services across a cluster of 50 Linux servers simultaneously.
