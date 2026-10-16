---
label: Gradient descent
aliases: []
loanwords: []
plain_descriptions:
  - the core optimization math that guides AI models toward lower error
  - taking small steps down a mathematical slope to find the best model weights
summary: An iterative optimization algorithm that updates model parameters in the opposite direction of the loss function gradient to minimize prediction error.
confusable_notes: {}
follow_up_questions:
  - How does learning rate selection influence convergence during gradient descent?
  - What advantages does mini-batch stochastic gradient descent provide over full-batch descent?
translation: native
---

## Easy explanation
Imagine standing on a foggy hill where you cannot see the bottom: you feel the slope of the ground under your shoes and take cautious steps in the steepest downhill direction until you reach the lowest point.

## Details
Gradient descent calculates the vector of partial derivatives of the loss function with respect to every trainable parameter. Because the gradient points in the direction of steepest increase, parameters are updated iteratively in the opposite direction, scaled by a learning rate hyperparameter. Practical implementations use mini-batch stochastic gradient descent (SGD) paired with momentum, Adam, or AdamW optimizers to traverse complex non-convex loss surfaces efficiently without stalling in shallow plateaus.

## Technical definition
A first-order iterative numerical optimization method that computes parameter adjustments proportional to the negative gradient of an objective cost functional.

## Examples
An image classifier updating millions of convolutional weights after each mini-batch by stepping downward along the error surface to reduce incorrect label predictions.
