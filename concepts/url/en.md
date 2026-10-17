---
label: "URL"
aliases:
  - "Uniform Resource Locator"
  - "web address"
loanwords: []
autolink:
  label: always
plain_descriptions:
  - "the complete address you type into a browser to visit a webpage"
  - "the standardized reference string locating internet documents and resources"
summary: "A structured reference syntax identifying network location coordinates and retrieval protocols for internet resources."
confusable_notes: {}
follow_up_questions:
  - "What is the structural difference between a URL and a URI?"
  - "How do query parameters and fragment identifiers alter resource resolution?"
translation: native
---

## Easy explanation
A URL is like a full postal mailing address: it states the delivery method (protocol), the building name (domain), the apartment number (path), and the specific room or recipient (parameters).

## Details
A URL consists of several structured components: scheme (e.g., https), host domain or IP address, optional port number, hierarchical file path, query string prefixed by a question mark for filtering parameters, and an optional fragment anchor prefixed by a hash sign for intra-page navigation. Browsers parse these segments to resolve IP addresses via DNS, establish appropriate protocol handshakes, and fetch targeted assets.

## Technical definition
A specific type of Uniform Resource Identifier (URI) that specifies both the primary access mechanism and the location of a resource on a computer network.

## Examples
In the address https://example.com:8080/products/search?category=books#reviews, https specifies the scheme, example.com the host, 8080 the port, /products/search the path, category=books the query, and reviews the fragment anchor.
