---
label: Temperature
qualifier: (AI)
aliases: []
loanwords: []
autolink:
  label: never
plain_descriptions:
  - an AI setting that controls how creative or predictable generated text will be
  - a dial adjusting randomness in model answers from strictly factual to imaginative
summary: A sampling hyperparameter that scales logits before softmax to regulate the randomness and diversity of a language model's output tokens.
confusable_notes:
  top-p-sampling: Temperature scales the overall sharpness or flatness of the entire probability distribution, whereas top-p sampling truncates the distribution by discarding candidates outside a cumulative probability threshold.
follow_up_questions:
  - Why is temperature usually set close to zero for factual code generation and extraction tasks?
  - What happens mathematically to the probability distribution as temperature approaches zero versus infinity?
translation: native
---

## Easy explanation
Think of temperature like the heat dial on a popcorn popper: at low heat, only the most ready kernels pop in a steady, predictable order; crank the heat up, and kernels fly wildly and unexpectedly in all directions.

## Details
Before a language model outputs its next token, it calculates raw unnormalized numerical scores called logits. Temperature divides these logits prior to the softmax normalization step. A low temperature (e.g., 0.1 to 0.2) steepens probability peaks, causing the model to reliably select the highest-scoring words—ideal for coding, mathematics, and data extraction. A high temperature (e.g., 0.8 to 1.2) flattens the distribution, giving lower-ranked candidate tokens greater odds of selection for brainstorming and storytelling.

## Technical definition
A scaling divisor applied to logit vectors prior to softmax normalization that modulates the entropy of the categorical predictive probability distribution.

## Examples
Setting temperature to 0.0 when querying a financial model for exact quarterly balance sheet metrics, ensuring consistent, repeatable numerical answers.
