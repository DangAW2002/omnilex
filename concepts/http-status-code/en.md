---
label: HTTP status code
aliases:
  - HTTP response code
  - status code
loanwords: []
plain_descriptions:
  - three-digit numbers that explain whether a web request succeeded or what went wrong
  - the server’s quick status signal like 404 not found or 200 ok
summary: A standardized three-digit integer returned by a server indicating the outcome of a client’s HTTP request.
confusable_notes: {}
follow_up_questions:
  - What is the practical difference between a 401 Unauthorized and a 403 Forbidden code?
  - Why should APIs return 503 instead of 500 during scheduled maintenance?
translation: native
---

## Easy explanation
Like standardized hand signals used by airport tarmac marshals to tell airplane pilots whether to proceed, hold in place, or turn around.

## Details
Status codes are divided into five classes based on their initial digit: 1xx for informational notices, 2xx for successful processing, 3xx for URL redirections, 4xx for client-side mistakes like missing resources, and 5xx for internal server crashes.

## Technical definition
Standardized numerical indicators defined by IETF specifications in response headers that signal whether an HTTP transmission completed successfully or encountered an error condition.

## Examples
Seeing a `404 Not Found` response when navigating to an old deleted blog post link, or receiving `200 OK` when loading a homepage.
