---
label: Attention mechanism
aliases:
  - Self-attention
loanwords: []
plain_descriptions:
  - an AI technique that weighs which input words matter most at each step
  - the computational method letting models focus dynamically on relevant context
summary: A mathematical algorithm allowing neural models to calculate dynamic relevance weights between all tokens within an input sequence.
confusable_notes: {}
follow_up_questions:
  - How do query, key, and value matrices interact in scaled dot-product attention?
  - Why does standard attention exhibit quadratic computational complexity with sequence length?
translation: native
---

## Easy explanation
When reading a legal contract and seeing the word "it," your attention immediately jumps back to the specific company name mentioned earlier so you comprehend what "it" refers to.

## Details
Attention computes relevance scores across tokens using Query, Key, and Value representations. The dot product between a query vector and all key vectors measures pairwise affinity, scaled to prevent saturation, and normalized through softmax into a probability distribution. The final output is a weighted sum over value vectors. Self-attention enables tokens within the same passage to contextualize each other regardless of distance.

## Technical definition
A dynamic pooling function that computes a weighted sum of value vectors according to similarity coefficients derived from query and key vector dot products.

## Examples
A translation network processing the pronoun "she" in a medical narrative and focusing attention weight heavily on "the surgeon" established in a prior sentence.
