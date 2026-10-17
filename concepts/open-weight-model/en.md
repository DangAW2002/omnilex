---
label: Open-weight model
aliases: []
loanwords: []
plain_descriptions:
  - an AI model whose trained parameter weights are freely downloadable to run on your own computers
  - a machine learning system where the public can inspect and self-host the learned mathematical weights
summary: >-
  An artificial intelligence model whose learned numerical parameters (weights) are published openly for local deployment, inspection, and fine-tuning, distinguishing it from closed proprietary cloud APIs.
confusable_notes: {}
follow_up_questions:
  - What governance distinctions separate open-weight models from fully open-source software releases?
  - How does local execution of open-weight models satisfy strict enterprise data sovereignty mandates?
translation: native
---

## Easy explanation
Imagine buying a musical synthesizer where the manufacturer gives you the complete memory cartridge containing every sound setting, allowing you to play and modify it offline forever.

## Details
Open-weight models allow researchers and enterprises to download serialized weight tensors and execution graphs for local execution on private infrastructure. Unlike closed-access proprietary APIs that offer only text completion endpoints, open weights permit full white-box examination, weight quantization, fine-tuning, and offline inference. However, open weights do not necessarily imply full open-source status if the underlying training code, data recipes, and licensing terms remain proprietary.

## Technical definition
An artificial intelligence distribution model where trained parameter tensor arrays are made accessible for non-exclusive download and local execution.

## Examples
An engineering team downloads an 8-billion-parameter open-weight model to an on-premise server cluster, ensuring that proprietary corporate documents never leave their internal firewall.
