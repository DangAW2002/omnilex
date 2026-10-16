---
label: Log
qualifier: (Software)
aliases:
  - Log record
  - Log message
  - Application log
loanwords: []
plain_descriptions:
  - a timestamped text record written by software to explain what it just did
  - the running diary of events, errors, and actions that an application keeps
summary: A timestamped, discrete record of an event or state change emitted by a running computer program or system service.
confusable_notes: {}
follow_up_questions:
  - Why is structured JSON logging preferred over unstructured raw text in modern cloud systems?
  - What log retention and sampling policies balance storage costs against compliance needs?
translation: native
autolink:
  label: never
---

## Easy explanation
Think of a ship captain’s logbook: every time the ship changes course, encounters rough seas, or drops anchor, the captain writes the exact time and event on a new line.

## Details
Applications emit logs across various severity levels (DEBUG, INFO, WARN, ERROR, FATAL). Modern distributed systems capture structured logs (typically in JSON format) containing context attributes such as user IDs, request IDs, and service names, which central log aggregators index for fast searching and alerting.

## Technical definition
An immutable, chronologically ordered event record containing a timestamp, message payload, severity level, and contextual key-value metadata.

## Examples
An authentication service emits `{"level":"WARN","timestamp":"2026-10-16T14:30:00Z","msg":"Failed login attempt","ip":"192.0.2.1"}` after three wrong passwords.
