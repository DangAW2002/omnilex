---
label: Ransomware
aliases:
  - extortion malware
loanwords: []
plain_descriptions:
  - malicious software that locks files and demands ransom money to decrypt them
  - cyber extortion software that encrypts business databases and holds operations hostage
summary: A form of malicious software that encrypts a victim's files or locks system access, demanding payment in exchange for decryption keys.
confusable_notes: {}
follow_up_questions:
  - How do double and triple extortion schemes pressure victim organizations beyond basic data encryption?
  - What architectural safeguards make immutable offline backups resilient against ransomware propagation?
translation: native
---

## Easy explanation
Think of a burglar breaking into your office, putting heavy bicycle padlocks on every filing cabinet, and leaving a note demanding cash in an unmarked envelope before they give you the combination.

## Details
Ransomware operators gain initial access via phishing emails, exposed Remote Desktop Protocol (RDP) ports, or unpatched software vulnerabilities. Once inside a network, the malware establishes persistence, maps network shares, discovers shadow copies, and disables backup services. Attackers often exfiltrate sensitive files first (double extortion) before executing high-speed symmetric encryption across local disks and network drives. Victims find ransom notes detailing instructions for paying via untraceable cryptocurrency. Defenses center on automated endpoint isolation, least privilege network segmentation, and air-gapped immutable backups.

## Technical definition
A class of malware designed to deny access to computing resources or encrypt storage assets, conditioning system recovery upon the delivery of an extortion demand to the attacker.

## Examples
A regional healthcare system suffers a ransomware infection that encrypts patient admission records and surgical schedules across 40 hospital servers, forcing doctors onto paper charts.
