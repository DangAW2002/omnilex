---
label: Hyperparameter
aliases: []
loanwords: []
plain_descriptions:
  - configuration settings chosen by engineers before starting AI training
  - the external dials and knobs controlling how an algorithm learns
summary: An external configuration setting specified prior to training that governs how the model architecture is structured and optimized.
confusable_notes:
  model-parameter: Hyperparameters are manually configured externally before training (like learning rate), whereas parameters are learned internally by the model (like weights).
follow_up_questions:
  - What automated strategies exist for searching large hyperparameter spaces?
  - How does the learning rate hyperparameter interact with optimizer momentum?
translation: native
---

## Easy explanation
When baking bread, internal parameters are the heat and chemical reactions happening inside the loaf, while hyperparameters are the oven temperature and timer you set on the dial before baking starts.

## Details
Unlike model weights which update automatically through backpropagation, hyperparameters are configured prior to running the training pipeline. Examples include the learning rate, mini-batch size, total training epochs, dropout percentage, network layer depth, and weight decay constants. Engineers optimize these configurations through grid search, random search, or Bayesian optimization to maximize validation set generalization.

## Technical definition
A predetermined configuration variable external to the model whose value is fixed prior to the learning phase and governs the behavior of the training procedure.

## Examples
An engineer setting the learning rate to 0.0003 and batch size to 64 before launching an overnight deep learning run on cloud servers.
