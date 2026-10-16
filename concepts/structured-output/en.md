---
label: Structured output
aliases:
  - structured outputs
loanwords: []
plain_descriptions:
  - making the AI reply in an exact data format
  - getting JSON back instead of free text
summary: Model output constrained to follow a given format, usually a JSON schema, so that software can read it reliably.
confusable_notes: {}
follow_up_questions:
  - How is structured output different from just asking for JSON in the prompt?
  - When should I use function calling instead?
translation: native
---

## Easy explanation
Like asking for the answer on a printed form with fixed boxes instead of in a free-form letter.

## Details
Applications often need fields, not prose. A schema lists the required keys and their types; in a structured-output mode the provider constrains generation so the response always matches it, rather than relying on instructions alone. It pairs naturally with function calling, whose arguments are structured too.

## Technical definition
Generation constrained by a schema supplied by the caller, so that the output is syntactically valid and conforms to that schema, for example JSON.

## Examples
A shop extracts name, phone number and address from customer messages; every reply is valid JSON that goes straight into the order system.
