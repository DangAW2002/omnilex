---
label: Chain-of-thought prompting
aliases:
  - chain-of-thought
  - CoT
loanwords: []
autolink:
  aliases:
    CoT: never
plain_descriptions:
  - asking the AI to think step by step
  - making the AI show its working before the answer
summary: A prompting technique that asks a model to reason through intermediate steps before it gives the final answer.
confusable_notes: {}
follow_up_questions:
  - Does the written reasoning show how the model really decided?
  - Which kinds of questions benefit most from step-by-step reasoning?
translation: native
---

## Easy explanation
Like a maths teacher who insists on seeing the working: writing out the steps catches mistakes a quick guess would make.

## Details
Asking for reasoning step by step, or giving examples that include reasoning, often improves accuracy on arithmetic, logic and multi-step questions. The visible steps also let people check the result. The method spends more output tokens, and the written explanation is not guaranteed to be the path the model actually took.

## Technical definition
A prompt engineering technique that elicits explicit intermediate reasoning steps from a large language model before its final answer.

## Examples
“A phone costs 8 million đồng with 15% off, then 10% VAT. What is the final price? Think step by step.” The model works out 6.8 million, then 7.48 million.
