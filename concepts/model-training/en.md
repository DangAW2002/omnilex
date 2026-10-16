---
label: Training
qualifier: (AI)
aliases: []
loanwords: []
autolink:
  label: never
plain_descriptions:
  - the computational process of teaching an AI model using data
  - feeding examples into an algorithm so it can adjust its internal weights
summary: The iterative computational process of calculating errors and adjusting model weights against training data to minimize loss.
confusable_notes:
  inference: Training adjusts internal weights through heavy compute and backpropagation, whereas inference evaluates fixed weights to generate live predictions.
follow_up_questions:
  - What resources make training frontier models computationally demanding?
  - How do practitioners recognize when training should be stopped early?
translation: native
---

## Easy explanation
Training resembles practicing archery with a coach: you shoot arrows, measure how far you missed the bullseye, adjust your stance and arm angle, and repeat until shots land consistently close to the center.

## Details
During training, input batches pass through the model architecture to compute predictions. The loss function compares outputs against ground-truth targets, measuring overall error. Backpropagation derives partial gradients for each parameter, and optimizers modify weights in the direction that lowers prediction discrepancies. The cycle iterates across multiple epochs until validation performance converges.

## Technical definition
Iterative algorithmic procedure that minimizes an objective risk functional across empirical samples by numerically optimizing internal architecture parameters via gradient-based updates.

## Examples
A deep learning cluster running for two weeks across hundreds of server accelerators to tune several billion weights on petabytes of multilingual text.
