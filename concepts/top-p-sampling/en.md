---
label: Top-p sampling
aliases:
  - Nucleus sampling
loanwords: []
plain_descriptions:
  - picking next AI words only from the most probable group that adds up to p
  - an AI text sampling rule that cuts off unlikely, bizarre words dynamically
summary: A text generation decoding strategy that selects from the smallest subset of candidate tokens whose cumulative probability reaches a threshold p.
confusable_notes:
  temperature-llm: Top-p dynamically cuts off low-probability tail tokens by cumulative mass, while temperature scales the relative distribution weights across all candidates without truncation.
follow_up_questions:
  - Why is top-p sampling also referred to as nucleus sampling in NLP literature?
  - How does dynamically sizing the candidate pool prevent gibberish while maintaining variety?
translation: native
---

## Easy explanation
Imagine a restaurant menu where the waiter only allows you to choose from popular dishes whose combined orders make up 90% of all diner requests, completely ignoring obscure dishes that almost nobody likes.

## Details
Also termed nucleus sampling, top-p pools tokens in descending order of probability until their cumulative sum reaches threshold p (e.g., 0.90 or 0.95). Any tokens outside this cumulative nucleus are filtered out before the final random selection occurs. When a model is highly confident (e.g., following "The capital of France is"), the candidate set shrinks automatically to one or two tokens; when many words fit naturally, the pool expands.

## Technical definition
A stochastic decoding truncation strategy that dynamically restricts the sampling vocabulary to the minimal set of top-ranked tokens whose cumulative probability mass exceeds parameter p.

## Examples
Configuring top-p to 0.90 during essay generation, ensuring the model chooses only among the most sensible next words while cutting off bizarre, low-probability tail tokens.
