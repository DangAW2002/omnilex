---
label: Recurrent neural network (RNN)
aliases:
  - RNN
loanwords: []
autolink:
  aliases:
    RNN: always
plain_descriptions:
  - a neural network with memory loops designed to process sequential data like sentences or time series
  - deep learning architecture that carries information from past steps into current calculations
summary: >-
  A class of neural networks containing internal cyclical connections that maintain a hidden memory state, enabling the sequential processing of ordered temporal or linguistic data.
confusable_notes:
  cnn: RNNs process sequential data with memory loops over time; CNNs apply spatial convolutional filters over local neighborhoods like images.
follow_up_questions:
  - How do gating mechanisms in LSTMs and GRUs prevent the vanishing gradient problem during backpropagation through time?
  - Why does the sequential nature of RNN execution limit parallelization on modern GPU hardware?
translation: native
---

## Easy explanation
Think of reading a novel: as you read the tenth word in a sentence, your brain remembers the first nine words so you understand the sentence as a unified thought rather than isolated terms.

## Details
Unlike feedforward networks that assume independent inputs, RNNs process sequential tokens iteratively. At each step, the network updates its internal hidden state vector based on the current input token and the previous hidden state. Standard RNNs suffer from vanishing and exploding gradients over long contexts, prompting the development of Long Short-Term Memory (LSTM) units and Gated Recurrent Units (GRU) with additive memory cells.

## Technical definition
A family of neural network models whose computational graph contains directed cycles, updating a recurrent latent state across discrete temporal sequence steps.

## Examples
An LSTM recurrent network analyzes 30 consecutive hourly stock trade volumes, predicting the expected volume for the 31st hour within an error margin of 3%.
