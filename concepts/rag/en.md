---
label: Retrieval-Augmented Generation
aliases:
  - RAG
loanwords: []
autolink:
  aliases:
    RAG: always
plain_descriptions:
  - letting the AI look things up in your documents before it answers
  - a chatbot that answers from a company’s own files
summary: A technique that retrieves relevant documents when a question arrives and adds them to the prompt so the model answers from them.
confusable_notes:
  fine-tuning: Fine-tuning changes the model’s weights through extra training; RAG leaves the model unchanged and supplies facts in the prompt.
follow_up_questions:
  - When is RAG a better choice than fine-tuning?
  - Why does the quality of retrieval limit a RAG system?
translation: native
---

## Easy explanation
It is an open-book exam: instead of answering from memory, the model is first handed the right pages and answers from them.

## Details
A RAG system splits documents into chunks, turns each chunk into an embedding and stores them, often in a vector database. For every question it finds the most similar chunks, places them in the prompt and asks the model to answer from that material, ideally citing it. Answers stay current without retraining and hallucinations drop, but the system can only be as good as what it retrieves.

## Technical definition
A grounding technique in which a model’s output is conditioned on information retrieved from an external knowledge source at inference time.

## Examples
An HR assistant answers “How many days of annual leave do I have?” by first retrieving the matching clause from the company handbook and quoting it.
