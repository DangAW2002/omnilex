---
label: Epoch
qualifier: (AI)
aliases: []
loanwords: []
plain_descriptions:
  - one complete pass of an entire training dataset through an AI model
  - a full cycle of training where every single example has been seen once
summary: One complete training cycle during which the learning algorithm processes every sample in the training dataset exactly once.
confusable_notes: {}
follow_up_questions:
  - How do engineers choose the total number of epochs for a training run?
  - What indicates that a model has trained for too many epochs?
translation: native
---

## Easy explanation
An epoch is like reading a textbook completely from cover to cover once; if a student studies the material for five epochs, they have re-read the entire textbook five separate times.

## Details
Because datasets are split into mini-batches, one epoch consists of multiple optimization iterations until all batches have undergone forward and backward passes. Deep models commonly train for tens or hundreds of epochs. Training through too few epochs risks underfitting, while training across excessive epochs risks memorizing the data (overfitting). Validation loss tracked at each epoch boundary provides early-stopping indicators.

## Technical definition
A discrete training phase corresponding to one full iteration over all partitioned mini-batches comprising the empirical training dataset.

## Examples
A computer vision model completing forty epochs over an image collection of one hundred thousand photos, evaluating validation accuracy at the conclusion of each full pass.
