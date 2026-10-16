---
label: Transformer
qualifier: (AI)
aliases: []
loanwords: []
plain_descriptions:
  - the neural network design that powers modern large language models
  - an architecture that connects words across entire passages at once using self-attention
summary: A neural network architecture relying on self-attention mechanisms to process sequence elements in parallel without recurrent connections.
confusable_notes: {}
follow_up_questions:
  - Why does parallel sequence processing make Transformers easier to scale than RNNs?
  - What are the differences between encoder-only, decoder-only, and encoder-decoder variants?
translation: native
---

## Easy explanation
Older translation tools read sentences word by word from left to right like someone scanning a sentence with a finger; a Transformer takes in the whole paragraph in one glance, instantly grasping how distant words relate to each other.

## Details
Introduced in 2017, the Transformer replaced sequential recurrence with stacked self-attention and position-wise feedforward modules. Positional encodings provide sequence order awareness. Multi-head attention projects inputs into distinct subspaces, computing attention weights across all tokens simultaneously. This parallel structure allows training across billions of tokens on high-performance accelerators, establishing the backbone of modern LLMs, multimodal systems, and code generators.

## Technical definition
A feedforward sequence transduction architecture based on multi-head self-attention and positional embeddings, dispensing with recurrent and convolutional recurrences.

## Examples
Decoder-based Transformer architectures generating fluent essays by predicting subsequent token probability distributions conditioned on prompt histories.
