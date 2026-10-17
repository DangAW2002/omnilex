---
label: Phishing
aliases:
  - credential phishing
loanwords: []
plain_descriptions:
  - deceptive messages that trick people into revealing passwords or credit card numbers
  - fraudulent emails pretending to come from trustworthy organizations to steal credentials
summary: A social engineering attack where malicious actors impersonate legitimate organizations to trick victims into disclosing sensitive information or downloading malware.
confusable_notes: {}
follow_up_questions:
  - How does spear phishing differ from broad, automated phishing campaigns?
  - Why are FIDO2 hardware security keys immune to credential-harvesting reverse proxy phishing?
translation: native
---

## Easy explanation
Think of a fake postal worker knocking on your front door with an official-looking clipboard, asking you to write down your bank PIN to confirm delivery of an unexpected package.

## Details
Phishing exploits human trust and urgency rather than software bugs. Attackers deliver fraudulent lures via email, SMS (smishing), messaging apps, or phone calls (vishing). These lures typically spoof trusted brands—such as financial institutions, cloud storage services, or corporate IT helpdesks—directing victims to replica login portals designed to capture credentials and multi-factor authentication codes. Advanced campaigns employ reverse proxies (like Evilginx) to intercept session cookies in real time. Organizations defend against phishing through security awareness simulations, DMARC email authentication, and phishing-resistant authentication methods.

## Technical definition
A digital social engineering technique that employs spoofed communications and deceptive pretexts to entice users into executing malicious payloads or divulging confidential security credentials.

## Examples
An employee receives an urgent email claiming their company email inbox is full, clicking a link that leads to a counterfeit login page where typing their credentials transmits them directly to attackers.
