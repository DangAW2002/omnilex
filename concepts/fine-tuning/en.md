---
label: Fine-tuning
aliases:
  - fine-tune
loanwords: []
plain_descriptions:
  - training an existing AI a bit more on your own examples
  - teaching a ready-made model a specialised job
summary: Further training of a pre-trained model on a smaller task-specific dataset so it performs better on that task or style.
confusable_notes:
  rag: >-
    RAG gives the model facts in the prompt when a question arrives and leaves it unchanged; fine-tuning changes the model itself through
    training.
follow_up_questions:
  - When is fine-tuning worth it compared with better prompts?
  - How does LoRA make fine-tuning cheaper?
translation: native
---

## Easy explanation
Like hiring an experienced chef and spending a week teaching them your restaurant’s recipes, instead of training a cook from nothing.

## Details
The model’s weights are updated on labelled examples, either all of them or, with parameter-efficient methods such as LoRA, only a small added part. It suits consistent formats, tone or narrow skills, and is a poor way to add facts that change often, where RAG is cheaper. It needs good data and evaluation so that general abilities do not degrade.

## Technical definition
Additional training of an already pre-trained model on a narrower dataset, adjusting its parameters for a particular task or domain.

## Examples
A clinic fine-tunes a model on 2,000 anonymised visit notes so that it writes summaries in the clinic’s own template.
