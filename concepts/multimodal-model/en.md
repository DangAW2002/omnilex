---
label: Multimodal model
aliases: []
loanwords: []
plain_descriptions:
  - an AI system that can understand and combine multiple types of information like text, images, and audio
  - a unified model accepting photos and questions together to produce verbal answers
summary: >-
  An artificial intelligence architecture capable of processing, synthesizing, and relating information across multiple sensory data modalities such as text, images, video, and audio.
confusable_notes: {}
follow_up_questions:
  - How do cross-attention layers align disparate vector projections from vision and text encoders?
  - What tokenization strategies allow continuous audio waveforms and discrete text tokens to coexist in one model?
translation: native
---

## Easy explanation
Think of a smart assistant that can simultaneously look at a chart on your desk, listen to your verbal question about it, and point out the exact number you are asking for.

## Details
Multimodal models accept and produce diverse data formats by mapping disparate inputs into a shared latent embedding space. Early architectures utilized separate pre-trained encoders connected by adapter projection layers. Modern native multimodal transformers integrate visual patch tokens, discrete audio representations, and textual subwords into a single unified backbone, enabling joint reasoning tasks such as visual question answering, document understanding, and image generation from speech.

## Technical definition
A deep neural network architecture characterized by joint representation learning and cross-attention mechanisms across heterogeneous input and output data modalities.

## Examples
An insurance appraisal assistant receives a photograph of car bumper damage alongside an audio explanation from the driver, estimating the repair cost at $1,200 in one analysis pass.
