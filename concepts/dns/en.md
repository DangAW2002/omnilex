---
label: Domain Name System (DNS)
aliases:
  - DNS
loanwords: []
plain_descriptions:
  - the internet phonebook that translates human-friendly website names like example.com into computer IP addresses
  - the directory service connecting domain names to web server numbers
summary: >-
  The hierarchical, decentralized naming system that translates human-readable domain names into numerical IP addresses
  for network routing.
confusable_notes: {}
follow_up_questions:
  - How does recursive DNS resolution work from root servers down to authoritative name servers?
  - Why does DNS propagation take time when updating A or CNAME records with high TTL values?
translation: native
autolink:
  aliases:
    DNS: always
---

## Easy explanation
Think of the contacts app on your smartphone: you search for your friend’s name rather than memorizing their 10-digit telephone number every time you call.

## Details
DNS organizes the global namespace hierarchically (root zone, top-level domains like `.com` or `.vn`, and second-level domains). When querying an address, a recursive resolver queries root servers, TLD servers, and finally authoritative name servers, caching records (A for IPv4, AAAA for IPv6, CNAME for aliases) locally according to their Time-To-Live.

## Technical definition
A distributed hierarchical database and application-layer protocol mapping alphanumeric domain labels to network address identifiers.

## Examples
Typing `omnilex.org` into a browser causes the DNS resolver to look up the authoritative nameserver and return the IPv4 address `198.51.100.45`.
