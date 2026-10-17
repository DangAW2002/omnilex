---
label: Intrusion detection system (IDS)
aliases:
  - IDS
loanwords: []
autolink:
  aliases:
    IDS: always
plain_descriptions:
  - a network security alarm system that listens for suspicious activity and alerts defenders
  - monitoring software that detects unauthorized access attempts across systems
summary: A hardware appliance or software application that monitors network or system activities for malicious behaviors or policy violations and produces alert reports.
confusable_notes: {}
follow_up_questions:
  - What is the operational distinction between passive intrusion detection (IDS) and inline intrusion prevention (IPS)?
  - How do anomaly-based detection engines establish baseline behavioral models on high-throughput networks?
translation: native
---

## Easy explanation
Think of a burglar alarm system equipped with motion sensors inside a warehouse: it does not actively lock the doors or tackle intruders, but the moment unauthorized motion is detected after hours, it immediately sounds a loud siren and notifies local security guards.

## Details
An Intrusion Detection System (IDS) operates as a passive observer. It generally falls into two architectures: Network-based IDS (NIDS), which analyzes promiscuous network traffic on switch span ports (such as Snort or Suricata), and Host-based IDS (HIDS), which monitors operating system system calls, file integrity, and kernel audit logs (such as OSSEC or Wazuh). Analysis engines combine signature matching against known threat indicators with anomaly-based heuristics that detect statistically unexpected traffic spikes or unauthorized lateral port scans.

## Technical definition
An automated system that inspects network packet flows or system audit trails to identify indicators of malicious activity or security policy violations, generating diagnostic notifications for incident responders.

## Examples
A network IDS deployed across an enterprise server subnet detects repeated abnormal SMB scan requests originating from a compromised developer laptop, dispatching an immediate high-priority alert to the security operations team.
