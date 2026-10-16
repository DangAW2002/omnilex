---
label: Cross-Origin Resource Sharing (CORS)
aliases:
  - CORS
loanwords: []
autolink:
  aliases:
    CORS: always
plain_descriptions:
  - a browser security check deciding if one website can fetch data from another domain
  - the rules preventing malicious websites from secretly querying your banking API
summary: A browser security protocol using special HTTP headers that lets an API grant specific foreign websites permission to fetch its content.
confusable_notes: {}
follow_up_questions:
  - What conditions trigger an automatic HTTP preflight OPTIONS request?
  - Why does a wildcard origin header fail when credentials mode is enabled?
translation: native
---

## Easy explanation
Like an embassy visa check: when visitors from country A want to enter country B, border officials inspect country B's declared entry rules before stamping their passports.

## Details
By default, browsers enforce the same-origin policy, blocking scripts from requesting resources from a different domain, protocol, or port. CORS relaxes this policy securely by utilizing HTTP response headers such as `Access-Control-Allow-Origin` and preflight `OPTIONS` requests to approve cross-domain transfers.

## Technical definition
A browser enforcement protocol using dedicated HTTP request and response headers to grant cross-origin access permissions beyond the same-origin security boundary.

## Examples
A frontend hosted at `https://shop.example.com` reading inventory figures from an API hosted at `https://api.example.com` after verifying the returned origin permission header.
