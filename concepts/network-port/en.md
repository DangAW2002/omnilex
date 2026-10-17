---
label: Port
aliases: []
qualifier: (Networking)
autolink:
  label: never
loanwords: []
plain_descriptions:
  - numerical channel number directing network data to a specific software program
  - software communication door that differentiates web, email, or database traffic on one computer
summary: A 16-bit unsigned number in transport layer headers that identifies a specific application service or communication endpoint on a host.
confusable_notes: {}
follow_up_questions:
  - What distinguishes well-known system ports (0-1023) from registered (1024-49151) and ephemeral dynamic ports (49152-65535)?
  - Why does a transport socket require both an IP address and a port number to achieve unambiguous communication?
translation: native
---

## Easy explanation
Like internal apartment numbers inside a large high-rise tower: the street address delivers mail to the building, but the apartment number ensures letters land in the correct resident’s mailbox.

## Details
Network ports range from 0 to 65535 and are embedded in TCP and UDP headers. Ports 0 to 1023 are well-known ports reserved for standardized services such as HTTP (80), HTTPS (443), SSH (22), and DNS (53). When packets arrive at an operating system, the networking stack checks the destination port to deliver payloads directly to the listening socket of the corresponding application.

## Technical definition
A transport layer addressing construct defined by RFC 6335 and RFC 793, represented as a 16-bit integer used by operating systems to multiplex multiple concurrent networking applications across a shared IP interface.

## Examples
A Linux server runs a web server listening on TCP port 443 and an SSH daemon listening on TCP port 22 on the same physical server and IP address.
