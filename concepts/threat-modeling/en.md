---
label: Threat modeling
aliases:
  - security threat modeling
loanwords: []
plain_descriptions:
  - analyzing a software design to brainstorm how an attacker might exploit it
  - a structured exercise to identify security risks and design mitigations early
summary: A structured engineering practice for identifying, categorizing, and prioritizing potential security threats to an application or system architecture.
confusable_notes: {}
follow_up_questions:
  - How does the STRIDE framework categorize potential architectural threats?
  - When in the software development lifecycle should engineering teams conduct threat modeling sessions?
translation: native
---

## Easy explanation
Think of an architect and a homeowner studying house floorplans before construction: they ask, "If someone tried to climb this balcony or pry open the basement window, how would they do it, and what locks or reinforced glass should we install now?"

## Details
Threat modeling is a proactive engineering discipline applied during the design and architecture phases of system development. Common frameworks include STRIDE (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege) and PASTA (Process for Attack Simulation and Threat Analysis). Teams map out data flow diagrams (DFDs), identify trust boundaries where data crosses privilege zones, enumerate adversary motives and attack paths, and assign risk ratings using models like DREAD. By identifying architectural flaws before code is written, teams avoid costly structural refactoring later.

## Technical definition
A structured engineering methodology that analyzes system architectures to discover security weaknesses and specify concrete defensive controls before deployment.

## Examples
During the design phase of a new microservices payment gateway, engineers perform a STRIDE threat modeling workshop, discovering that an internal inter-service gRPC channel lacks mutual TLS authentication across a Kubernetes cluster boundary.
