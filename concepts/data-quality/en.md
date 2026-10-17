---
label: Data quality
aliases:
  - dataset quality
loanwords: []
plain_descriptions:
  - how reliable, clean, and complete a collection of records is for business use
  - checking that information is accurate, up to date, and free from duplicate entries
summary: The measurement of how well a dataset satisfies requirements for accuracy, completeness, consistency, validity, and timeliness.
confusable_notes: {}
follow_up_questions:
  - What are the core dimensions used to measure data quality across enterprise data lakes?
  - How can automated assertion frameworks catch dirty data before it enters production analytics?
translation: native
---

## Easy explanation
Like inspecting fresh vegetables before cooking: checking that they are clean, not spoiled, undamaged, and actually the right ingredients for your dinner recipe.

## Details
Data quality assesses information fitness across standardized dimensions: accuracy (matching real-world truth), completeness (no missing required values), consistency (matching across databases), timeliness (freshness of updates), and uniqueness (absence of duplicate customer profiles). Automated testing frameworks execute validation assertions within ingestion pipelines, rejecting malformed payloads before they corrupt business decisions.

## Technical definition
The degree to which data assets meet defined organizational criteria of accuracy, completeness, consistency, validity, and timeliness for their intended analytical purposes.

## Examples
An insurance system checks data quality upon form submission, flagging applications that leave customer birthdates blank or enter negative policy coverage values.
