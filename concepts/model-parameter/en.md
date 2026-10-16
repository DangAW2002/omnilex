---
label: Parameter
qualifier: (AI)
aliases: []
loanwords: []
autolink:
  label: never
plain_descriptions:
  - the internal numerical values that an AI adjusts as it learns
  - the weights and biases inside a model that define how it responds
summary: An internal numerical variable within a model, such as a weight or bias, whose value is learned and updated directly from training data.
confusable_notes:
  hyperparameter: Parameters are learned internally from data during training (weights and biases), whereas hyperparameters are external configurations set beforehand by engineers (like learning rate).
follow_up_questions:
  - How does total parameter count correlate with model reasoning capabilities and memory requirements?
  - What distinguishes weights from bias terms inside an artificial neuron?
translation: native
---

## Easy explanation
Think of a parameter as a tiny volume knob inside a sound mixer: as the model practices, it tweaks millions or billions of these knobs until the overall music sounds clean and harmonious.

## Details
In neural networks, parameters primarily consist of weights (which scale the strength of connections between nodes) and biases (which shift activation thresholds). During training, these values are initialized randomly or from a checkpoint, then updated via backpropagation. Model capacity is often cited by parameter count—such as 7B, 70B, or 405B—which directly dictates VRAM storage requirements during inference and compute needed for training.

## Technical definition
Internal variable coefficients within a parameterized function that are optimized through empirical risk minimization during training to encode structural patterns.

## Examples
A 7-billion parameter language model storing floating-point weights across several gigabytes of GPU memory to compute token probabilities.
