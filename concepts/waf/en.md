---
label: Web application firewall (WAF)
aliases:
  - WAF
loanwords: []
autolink:
  aliases:
    WAF: always
plain_descriptions:
  - a protective shield that filters out malicious web traffic before it reaches your web server
  - an application-level firewall that blocks SQL injection, cross-site scripting, and bot spam
summary: A specialized security appliance or cloud filter that monitors, inspects, and blocks malicious HTTP and HTTPS traffic targeting web applications.
confusable_notes: {}
follow_up_questions:
  - How do positive security models (allowlists) differ from negative security models (blocklists) in WAF rule configurations?
  - Why is regular tuning required to prevent WAFs from generating false positives during API payload updates?
translation: native
---

## Easy explanation
Think of a nightclub bouncer inspecting every guest's bag at the front entrance: they confiscate concealed weapons, spray paint cans, and fake IDs before anyone is allowed onto the dance floor, protecting everyone inside.

## Details
Unlike network firewalls operating at Layers 3 and 4 (which filter only IP addresses and port numbers), a Web Application Firewall operates at Layer 7. It inspects complete HTTP/HTTPS request payloads, including request headers, cookies, URL parameters, and POST request bodies. WAFs apply rule sets—such as the OWASP Core Rule Set (CRS)—to identify and immediately drop traffic matching signature patterns of SQL injection, cross-site scripting vulnerabilities, remote code execution, and parameter tampering. Modern cloud WAFs also leverage machine learning behavioral analysis to mitigate scraping bots and credential stuffing.

## Technical definition
An application-layer intermediary device or service that inspects bidirectional HTTP/HTTPS traffic against policy sets to protect web applications against known exploits and unauthorized manipulation.

## Examples
A cloud WAF deployed in front of an e-commerce website intercepts an incoming POST request containing SQL escape syntax in the search bar, returning an HTTP 403 Forbidden response before the database server executes the command.
