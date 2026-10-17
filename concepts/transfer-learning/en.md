---
label: Transfer learning
aliases: []
loanwords: []
plain_descriptions:
  - taking a model trained on a huge general dataset and repurposing it for a specific new task
  - reusing learned weights and feature representations to train a new AI model with far less data
summary: >-
  A machine learning method where representations and weights learned from a broad primary task are adapted to solve a related target task with substantially reduced training data and computational overhead.
confusable_notes: {}
follow_up_questions:
  - How does layer freezing prevent catastrophic forgetting during transfer learning fine-tuning?
  - What indicators signal negative transfer when the source and target domains diverge?
translation: native
---

## Easy explanation
Think of someone who already knows how to ride a bicycle: when learning to ride a motorcycle, they do not start from scratch; they reuse their existing sense of balance and steering.

## Details
Transfer learning exploits the reality that lower-level neural representations (such as edge detectors in vision or word syntax in language) are shared across domains. Instead of initializing model weights randomly, practitioners begin with a pretrained foundation model trained on massive corpus datasets. By freezing initial feature extraction layers and training only final adaptation heads—or applying parameter-efficient fine-tuning (PEFT)—target models converge rapidly even with limited labeled samples.

## Technical definition
A machine learning framework that transfers statistical knowledge from a source domain and learning task to improve generalization within a different but related target domain.

## Examples
A medical startup adapts a vision model pretrained on 14 million general images, fine-tuning it with only 500 labeled chest X-rays to detect pneumonia with 94% accuracy.
