---
label: Regularization
qualifier: (ML)
aliases: []
loanwords: []
plain_descriptions:
  - techniques that discourage machine learning models from becoming overly complex or memorizing noise
  - adding mathematical penalties to prevent weights from growing excessively large during training
summary: >-
  A set of statistical techniques that penalize model complexity during training to prevent overfitting and improve generalization on unseen test data.
confusable_notes: {}
follow_up_questions:
  - How does L1 regularization enforce parameter sparsity compared to L2 weight decay?
  - Why does dropout serve as an implicit ensemble technique during deep neural network training?
translation: native
---

## Easy explanation
Think of putting speed bumps on a racetrack: it prevents a driver from recklessly taking extreme shortcuts that only work on that one specific track, forcing them to learn smoother, reliable driving.

## Details
Regularization modifies the objective loss function by appending an explicit penalty term proportional to model parameter magnitude or structural complexity. Classic formulations include L1 regularization (Lasso), which adds the sum of absolute weight values and drives non-essential weights to zero, and L2 regularization (Ridge / weight decay), which penalizes squared parameter norms to prevent individual weights from dominating. In deep architectures, architectural regularization also encompasses dropout, batch normalization, and early stopping.

## Technical definition
The introduction of prior structural constraints or penalty terms into an empirical risk minimization objective to bound the complexity of the hypothesis space.

## Examples
Adding an L2 penalty weight factor of 0.01 to a regression loss shrinks 50 regression coefficients, reducing validation error by 18% compared to the unregularized model.
