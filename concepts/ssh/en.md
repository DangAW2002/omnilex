---
label: Secure Shell (SSH)
aliases:
  - SSH
autolink:
  aliases:
    SSH: always
loanwords: []
plain_descriptions:
  - secure encrypted tool for logging into and running commands on remote servers
  - encrypted remote terminal terminal connection replacing insecure Telnet
summary: A cryptographic network protocol for operating network services securely over an unsecured network, most commonly used for remote command-line login.
confusable_notes: {}
follow_up_questions:
  - How does asymmetric public-private key pair authentication replace vulnerable password logins in SSH?
  - How does SSH local and remote port forwarding establish secure encrypted tunnels for internal services?
translation: native
---

## Easy explanation
Like an armored, bulletproof private courier vehicle that drives between your laptop and a remote server through public streets, shielding all conversations inside from eavesdroppers.

## Details
SSH replaces insecure legacy protocols like Telnet and rlogin by encrypting all traffic, including credentials and terminal keystrokes, using strong ciphers such as AES or ChaCha20. It runs over TCP port 22 by default and supports public key cryptography (such as Ed25519 and RSA) for machine-to-machine authentication without transmitting plaintext secrets.

## Technical definition
A suite of secure communication protocols specified in RFC 4251-4254 providing encrypted transport, public-key server and client authentication, and multiplexed logical channels for interactive shell sessions, file transfers, and port forwarding.

## Examples
A cloud engineer executes `ssh -i deploy_key.pem ubuntu@203.0.113.10` from their laptop terminal to open an interactive bash shell on a cloud virtual server and configure a web service securely.
