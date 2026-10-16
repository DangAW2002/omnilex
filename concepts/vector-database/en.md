---
label: Vector database
aliases: []
loanwords: []
plain_descriptions:
  - a database that finds things by similar meaning
  - storage that searches by how close lists of numbers are
summary: A database built to store embedding vectors and quickly return the ones most similar to a query vector.
confusable_notes: {}
follow_up_questions:
  - What does approximate nearest-neighbour search give up for speed?
  - Do I need a dedicated vector database for RAG?
translation: native
---

## Easy explanation
Like a librarian who shelves books by how close their topics are rather than by title, so asking for one book brings its neighbours too.

## Details
Each record holds a vector plus metadata. Instead of exact matching, a query asks for the nearest neighbours by cosine or Euclidean distance. Approximate nearest-neighbour indexes such as HNSW or IVF keep this fast over millions of vectors by giving up a little accuracy. Many general-purpose databases now offer vector search beside their usual queries.

## Technical definition
A data store specialised in indexing and querying high-dimensional vectors by similarity, typically with approximate nearest-neighbour search.

## Examples
An online shop stores an embedding for every product photo; a shopper uploads a picture and gets the ten most similar items.
