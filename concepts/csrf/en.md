---
label: Cross-site request forgery (CSRF)
aliases:
  - CSRF
loanwords: []
autolink:
  aliases:
    CSRF: always
plain_descriptions:
  - an attack that tricks your browser into making unwanted money transfers on sites where you are logged in
  - clicking a trap link on an external page that secretly submits a form to change your account email
summary: An attack that tricks an authenticated web browser into sending unauthorized commands to a vulnerable web application without the user’s consent.
confusable_notes:
  xss: CSRF exploits the ambient authority and cookies of a user's browser to execute unwanted actions, whereas XSS injects executable code directly into the web application's origin.
follow_up_questions:
  - How does the SameSite cookie attribute (Strict/Lax) provide defense-in-depth against CSRF?
  - Why are anti-CSRF synchronizer tokens necessary for state-changing POST and PUT requests?
translation: native
---

## Easy explanation
Like an imposter slipping an unsigned withdrawal slip into your personal bank folder right as you hand the folder to a bank teller; the teller processes the slip believing it came from you.

## Details
Browsers automatically include authentication cookies with cross-site requests. If an application relies solely on ambient credentials without anti-CSRF tokens or `SameSite` cookie flags, visiting an attacker's website can trigger background POST requests that perform privileged actions on the victim's behalf.

## Technical definition
A web application vulnerability where a malicious origin exploits browser credential-forwarding behavior to submit forged HTTP requests under an authenticated user's credentials.

## Examples
Visiting a rogue web page containing a hidden form that submits a fund transfer request to `https://bank.com/transfer` using the victim's active session cookie.
