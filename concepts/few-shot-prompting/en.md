---
label: Few-shot prompting
aliases:
  - few-shot
loanwords: []
plain_descriptions:
  - showing the AI a few examples before asking
  - teaching by examples inside the question
summary: A prompting technique that includes a few worked examples of the task so the model follows the same pattern.
confusable_notes: {}
follow_up_questions:
  - How many examples are usually enough?
  - What is the difference between zero-shot and few-shot prompting?
translation: native
---

## Easy explanation
Like showing a new colleague two forms that are already filled in before handing them a blank one.

## Details
Examples show the format, tone and decision rules better than a description alone. Zero-shot means no example, one-shot a single one, few-shot several. Examples should be varied and correct, because the model copies their quirks too, and every example takes room in the context window.

## Technical definition
A prompt containing more than one example of the desired input and output, used to steer a model without changing its weights.

## Examples
The prompt “Hà Nội → North; Cần Thơ → Mekong Delta; Huế →” leads the model to answer “Central”.
