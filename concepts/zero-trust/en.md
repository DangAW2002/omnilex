---
label: Zero trust
aliases:
  - zero trust architecture
loanwords: []
plain_descriptions:
  - a security model that never assumes any user or device is safe, even inside the office network
  - the principle of verifying identity and device health for every single digital request
summary: A cybersecurity framework requiring continuous verification of every user, device, and network transaction, operating under the assumption that breaches are already present.
confusable_notes: {}
follow_up_questions:
  - How does micro-segmentation limit lateral movement by attackers inside internal networks?
  - What role do policy decision points (PDP) and policy enforcement points (PEP) play in Zero Trust architectures?
translation: native
---

## Easy explanation
Like an airport security terminal where passengers must display their boarding pass and passport at the entrance, at security scanners, and again at the boarding gate.

## Details
Traditional perimeter security trusted anyone inside the corporate VPN or office Wi-Fi. Zero Trust eliminates implicit trust zones: every access request undergoes strict authentication, device posture checks, risk-based authorization, and continuous end-to-end encryption regardless of physical location.

## Technical definition
A comprehensive enterprise security architecture based on the tenet "never trust, always verify," enforcing dynamic context-aware policy checks across all network communications.

## Examples
Requiring employees on office Wi-Fi to pass biometric MFA and device health checks before accessing an internal company repository.
