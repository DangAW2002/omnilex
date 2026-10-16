---
label: JSON
aliases:
  - JavaScript Object Notation
loanwords: []
autolink:
  label: always
plain_descriptions:
  - a universal text format used to send data between websites and servers
  - human-readable curly-brace text organizing names and values in software
summary: A lightweight, text-based data interchange format built on key-value pairs and ordered lists that is easy for humans to read and machines to parse.
confusable_notes: {}
follow_up_questions:
  - Why does JSON lack native support for binary data or date objects?
  - How does JSON compare against binary serialization formats like Protocol Buffers?
translation: native
---

## Easy explanation
Like an international shipping label written in plain text with clear headings such as Name, Address, and Weight that any customs officer anywhere can decipher.

## Details
JSON represents data using two primary structures: collections of name-value pairs (objects bounded by curly brackets) and ordered sequences of values (arrays bounded by square brackets). Primitive data types include strings, numbers, booleans, and null values.

## Technical definition
A standardized, language-agnostic text serialization format derived from JavaScript object syntax used for transmitting structured objects across web protocols.

## Examples
Representing user profile details as `{"id": 42, "username": "alex", "active": true}` inside an HTTP response payload.
