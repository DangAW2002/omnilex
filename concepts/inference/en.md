---
label: Inference
qualifier: (AI)
aliases: []
loanwords: []
plain_descriptions:
  - running a trained AI model to get live answers or classifications
  - using an existing model on new inputs without changing its weights
summary: The operational stage where a trained model processes live inputs to generate predictions, decisions, or outputs without updating its parameters.
confusable_notes:
  model-training: Model training actively adjusts weights via loss gradients, while inference strictly executes a forward pass using frozen weights.
follow_up_questions:
  - Why is minimizing latency critical for production inference systems?
  - What optimization techniques help accelerate inference on consumer devices?
translation: native
---

## Easy explanation
If training is attending medical school and passing tough board examinations, inference is a certified doctor diagnosing a patient who walks into the clinic today.

## Details
Inference takes novel data, applies identical preprocessing transformations as used in training, and runs forward passes across model layers. No backpropagation or weight modification occurs. Production inference focuses on latency, throughput, concurrency, and compute costs. Techniques like quantization, caching, and batching are standard to ensure real-time user experiences under high traffic.

## Technical definition
The runtime execution phase in which static, parameterized functions map unlabelled evaluation inputs to deterministic or sampled outputs through forward-pass computation.

## Examples
An e-commerce mobile application calling an object detection API to identify a sneaker photographed by a customer in under fifty milliseconds.
