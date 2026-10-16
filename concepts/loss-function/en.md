---
label: Loss function
aliases:
  - Cost function
  - Objective function
loanwords: []
plain_descriptions:
  - the mathematical scoring system that measures how wrong an AI model's answers are
  - a formula calculating the penalty when predictions deviate from true outcomes
summary: A mathematical function quantifying the discrepancy between a model's predicted outputs and true ground-truth targets.
confusable_notes: {}
follow_up_questions:
  - Why is cross-entropy loss standard for classification while mean squared error suits regression?
  - How can adding regularization penalties directly into the loss function curb overfitting?
translation: native
---

## Easy explanation
A loss function acts like a referee grading a test: the further your answers stray from reality, the harsher the penalty score it assigns, giving you a clear metric to improve upon next time.

## Details
The choice of loss function establishes the learning objective for optimization. Common formulations include mean squared error (MSE) for continuous numeric regression and cross-entropy loss for categorical probability distributions. Penalties can incorporate L1 or L2 regularization terms to discourage extreme parameter weights. During backpropagation, calculating the gradient of the loss function provides the directional signals required to update model parameters.

## Technical definition
A differentiable real-valued function that evaluates the error between predicted distributions and true targets, serving as the optimization criterion for parameter estimation.

## Examples
A loan risk evaluation model utilizing binary cross-entropy loss to penalize confident yet incorrect predictions of debtor default probabilities.
