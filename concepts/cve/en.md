---
label: Common Vulnerabilities and Exposures (CVE)
aliases:
  - CVE
loanwords: []
autolink:
  aliases:
    CVE: always
plain_descriptions:
  - the standardized global dictionary of publicly recognized cybersecurity flaws and software bugs
  - an official tracking code like CVE-2021-44228 identifying a specific security flaw
summary: A publicly available list of standardized identifiers for cybersecurity vulnerabilities and exposures.
confusable_notes: {}
follow_up_questions:
  - How do Common Vulnerability Scoring System (CVSS) metrics determine a CVE entry's severity?
  - What criteria must a software security defect satisfy before MITRE or a CNA assigns an official CVE ID?
translation: native
---

## Easy explanation
Like an international disease naming registry: instead of doctors calling the same illness by five different local names, they use one agreed code so medical teams worldwide know exactly what to treat.

## Details
CVE provides a unified naming convention managed by MITRE and the National Vulnerability Database (NVD). Each assigned identifier follows the format `CVE-YYYY-NNNN`, accompanied by severity scores (CVSS), affected software versions, and public patch bulletins.

## Technical definition
A system of standardized, publicly registered reference identifiers that provides a common taxonomy for known information security vulnerabilities and exposures.

## Examples
Referencing `CVE-2021-44228` when discussing and patching the infamous Log4j remote code execution vulnerability across enterprise clusters.
