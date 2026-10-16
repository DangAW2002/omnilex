---
label: Large Language Model
aliases:
  - LLM
loanwords: []
autolink:
  aliases:
    LLM: always
plain_descriptions:
  - an AI that writes text by guessing the next word
  - the kind of chatbot brain behind ChatGPT, Gemini or Claude
summary: A very large neural network trained on huge amounts of text that reads and writes language by predicting the next token.
confusable_notes: {}
follow_up_questions:
  - Why does a large language model sometimes state wrong facts confidently?
  - How does a context window limit what an LLM can use?
translation: native
---

## Easy explanation
Think of the word suggestions on a phone keyboard, but trained on a large share of the internet: give it the start of a text and it keeps adding a sensible next piece until a whole answer appears.

## Details
An LLM is usually a Transformer with billions of parameters. It is first pre-trained to predict the next token across a broad text collection, then usually tuned on instructions and human feedback so that it follows requests. It reads text as tokens, can only use what fits in its context window, and may assert false things fluently, which is called hallucination.

## Technical definition
A language model with a very large number of parameters; in practice, a Transformer-based model trained on large text corpora to predict and generate sequences of tokens.

## Examples
A developer pastes an error log and asks for a fix, and the LLM proposes a patch. A support team lets an LLM draft replies that an agent reads before sending.
