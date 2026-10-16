---
label: Context window
aliases: []
loanwords: []
plain_descriptions:
  - how much text the AI can keep in mind at once
  - the AI’s working memory limit
summary: >-
  The maximum amount of text, counted in tokens, that a model considers in one request, covering the prompt, the conversation so far and its
  reply.
confusable_notes: {}
follow_up_questions:
  - What happens when a conversation grows past the context window?
  - Why do larger context windows cost more?
translation: native
---

## Easy explanation
Picture a desk of fixed size: the documents, the conversation and the answer being written must all fit on it, and when it is full something has to come off.

## Details
The window is counted in tokens, not words. Everything shares it: the system prompt, the history, attached files, tool results and the generated answer. Larger windows let the model use more material but take longer and cost more. When a chat outgrows the window, older parts have to be dropped or summarised.

## Technical definition
The token budget of one request: the largest combined amount of input and generated output that a model can handle at once.

## Examples
A window of 200,000 tokens holds a few hundred pages of text: enough for a long contract and questions about it, but not for a codebase of millions of lines.
