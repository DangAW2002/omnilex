---
label: Embedding
aliases:
  - embedding vector
  - vector embedding
loanwords: []
plain_descriptions:
  - turning words into a list of numbers so a computer can compare meanings
  - numbers that place similar ideas close together
summary: A list of numbers learned by a model to represent an item such as a word or a document, so that similar items end up close together.
confusable_notes: {}
follow_up_questions:
  - How is the similarity of two embeddings measured?
  - Why can embedding search find a word that never appears in the query?
translation: native
---

## Easy explanation
Think of coordinates on a map of meaning: “cat” and “kitten” sit close together, far away from “invoice”.

## Details
An embedding model maps text, images or other data to vectors with hundreds or thousands of dimensions. Distance or cosine similarity between vectors approximates similarity of meaning, which powers semantic search, recommendations, clustering and the retrieval step of RAG. Single dimensions rarely mean anything a person could name.

## Technical definition
A dense vector of floating-point values, learned during training, that represents an input in a space where geometric closeness reflects similarity.

## Examples
A search for “máy tính xách tay” also finds documents that only say “laptop”, because their embeddings lie close together.
