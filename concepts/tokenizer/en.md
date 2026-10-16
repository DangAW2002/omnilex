---
label: Tokenizer
aliases: []
loanwords: []
plain_descriptions:
  - the part that chops text into pieces the AI can read
  - what decides how many tokens a sentence costs
summary: The component that splits input such as text into tokens from a fixed vocabulary and turns them into numeric ids for the model.
confusable_notes: {}
follow_up_questions:
  - Why does the same text give different token counts on different models?
  - Why can Vietnamese need more tokens than English?
translation: native
---

## Easy explanation
Like cutting a sentence into puzzle pieces from a fixed set of shapes before feeding them into the machine.

## Details
Most LLM tokenizers use subword methods such as byte-pair encoding: a frequent word becomes one token, a rare word several. Every model has its own vocabulary, so the same text yields different token counts on different models, and Vietnamese with its diacritics often needs more tokens than English for the same meaning. Multimodal models tokenize images or audio as well.

## Technical definition
The algorithm that maps raw input, such as text, to the units (tokens) and integer ids a model works with.

## Examples
The word “unbelievable” may become “un”, “believ” and “able”; a 1,000-word Vietnamese article can use noticeably more tokens than its English translation.
