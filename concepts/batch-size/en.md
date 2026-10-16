---
label: Batch size
aliases: []
loanwords: []
plain_descriptions:
  - the number of training examples processed together in one forward and backward step
  - how many data samples an AI looks at before updating its internal weights
summary: The number of training samples processed simultaneously in a single iteration before the model parameters are updated.
confusable_notes: {}
follow_up_questions:
  - How does larger batch size impact GPU VRAM utilization and training throughput?
  - What trade-offs arise between small stochastic batches and large batch stability?
translation: native
---

## Easy explanation
Instead of adjusting your recipe after tasting a single spoonful or waiting until an entire banquet is served, you taste a bowl of four spoonfuls combined and adjust your seasoning based on that average.

## Details
Batch size directly balances hardware utilization against gradient noise. Full-batch gradient descent processes all records at once, requiring vast memory. Stochastic gradient descent computes gradients per single sample, introducing severe noise. Modern practice utilizes mini-batches (e.g., 32, 64, 256) loaded into accelerator memory, achieving parallel matrix multiplication throughput while maintaining sufficient stochastic regularization for generalization.

## Technical definition
The cardinality of the subset of training instances evaluated concurrently to compute an average empirical loss gradient for a single parameter update step.

## Examples
Setting the batch size to 128 images during vision training so that activations consume 14 GB of GPU memory without exceeding hardware capacity.
