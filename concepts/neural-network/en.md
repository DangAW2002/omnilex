---
label: Neural network
aliases:
  - Artificial neural network
loanwords: []
plain_descriptions:
  - an AI computing structure inspired by interconnected biological brain cells
  - layered mathematical nodes passing signals forward to identify complex patterns
summary: A computational architecture comprising interconnected layers of artificial nodes that pass weighted signals through non-linear activation functions.
confusable_notes: {}
follow_up_questions:
  - Why are non-linear activation functions necessary in multi-layer neural networks?
  - What distinguishes feedforward networks from recurrent or attention-based architectures?
translation: native
---

## Easy explanation
Imagine an assembly line of inspectors passing parts along: the first row detects rough edges, the second identifies specific shapes, and the final row combines those clues to declare whether the product is intact.

## Details
An artificial neural network organizes units into input, hidden, and output layers. Each neuron calculates a weighted sum of its inputs, adds a bias term, and feeds the scalar through an activation function like ReLU or GELU to introduce non-linearity. Stacking layers enables hierarchical feature representation, moving from basic edges or characters up to semantic concepts. Parameters are optimized globally using gradient backpropagation.

## Technical definition
A directed layered graph of artificial processing units performing parameterized affine transformations modulated by non-linear activations to approximate complex multivariate functions.

## Examples
A convolutional network processing raw pixel grids across several hidden stages to identify handwritten digits on banking deposit slips.
