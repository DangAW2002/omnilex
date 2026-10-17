---
label: Convolutional neural network (CNN)
aliases:
  - CNN
loanwords: []
autolink:
  aliases:
    CNN: never
plain_descriptions:
  - a deep neural network specialized in analyzing visual grids such as photos and video frames
  - machine learning architectures using sliding filter kernels to recognize visual patterns
summary: >-
  A deep learning architecture that utilizes convolutional layers with weight sharing and pooling mechanisms to extract spatial feature hierarchies from grid-structured data like images.
confusable_notes:
  rnn: CNNs use spatial convolutions best suited for images and grid data; RNNs use recurrent feedback loops designed for sequential or temporal sequences.
follow_up_questions:
  - How does parameter sharing across convolutional kernels provide translational invariance?
  - Why have vision transformers increasingly challenged CNN dominance in visual benchmarks?
translation: native
---

## Easy explanation
Imagine sliding a small magnifying glass step-by-step across a mosaic tile floor; at each tile, you record simple edges, then combine those notes into shapes, and finally identify the whole picture.

## Details
CNN architectures process inputs through alternating convolutional, activation, and spatial pooling layers. Convolutional filters slide across input channels to compute dot products, producing 2D activation feature maps. Earlier layers capture primitive patterns like oriented edges and color gradients, while deeper layers assemble these into complex textures and semantic objects. Key architectural milestones include AlexNet, VGG, ResNet (introducing residual skip connections), and EfficientNet.

## Technical definition
A class of feedforward artificial neural networks characterized by shift-invariant convolutional operators and local receptive fields over multi-dimensional grid topologies.

## Examples
A ResNet CNN model processes a 224x224 RGB image through 50 convolutional layers, classifying the picture as a golden retriever with 96% confidence.
