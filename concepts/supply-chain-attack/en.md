---
label: Supply chain attack
qualifier: (Software)
aliases:
  - third-party software compromise
loanwords: []
plain_descriptions:
  - compromising an upstream software vendor or code library to infect downstream customers
  - sneaking malicious code into a trusted software update or package repository
summary: A cyberattack that targets less secure third-party vendors, libraries, or build pipelines to infiltrate the target organization's systems.
confusable_notes: {}
follow_up_questions:
  - How do Software Bills of Materials (SBOM) help engineering teams mitigate supply chain risks?
  - What measures protect continuous integration runners against dependency hijacking and typosquatting?
translation: native
---

## Easy explanation
Think of water poisoning at the municipal reservoir: rather than sneaking into individual homes to taint the drinking glasses, the saboteur contaminates the central filtration plant so contaminated water flows automatically to every house in the city.

## Details
In a software supply chain attack, adversaries compromise an upstream link in the software development lifecycle rather than attacking the primary target directly. Vectors include hijacking open-source dependencies on registries (like npm or PyPI), compromising build server pipelines, stealing signing keys, or inserting backdoors into vendor proprietary updates (such as the SolarWinds incident). Because organizations trust updates signed by their established vendors, the malicious payload bypasses boundary defenses effortlessly. Mitigations include cryptographic package verification, hermetic build environments, dependency pinning, and continuous vulnerability scanning.

## Technical definition
An attack that infiltrates an organization's systems through the exploitation of vulnerabilities or backdoors injected into external suppliers, dependencies, or third-party service providers.

## Examples
Hackers inject a backdoor into a popular open-source JavaScript logging library, causing thousands of downstream enterprise web applications to execute the malicious payload upon running their automated CI/CD builds.
