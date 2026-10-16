---
label: Image classification
aliases: []
loanwords: []
plain_descriptions:
  - an AI vision task that assigns a single overall label to an entire picture
  - identifying what main object or category is shown in a photo
summary: A computer vision task in which an algorithm analyzes an entire image and assigns it one or more discrete categorical labels from a predefined taxonomy.
confusable_notes:
  object-detection: Image classification assigns categorical labels to an entire image without locating boundaries, whereas object detection identifies and draws bounding boxes around individual objects.
follow_up_questions:
  - How do convolutional networks and Vision Transformers differ in their approach to image classification?
  - What separates single-label multi-class classification from multi-label classification?
translation: native
---

## Easy explanation
Image classification is like sorting photos into labeled shoeboxes: you look at a photograph of a dog running on grass, decide its overall subject is "dog," and drop it into the dog box without caring exactly where its paws or ears are placed.

## Details
In image classification, an algorithm takes an entire image tensor as input and computes probability scores across candidate classes. Classical approaches relied on convolutional neural networks (CNNs) using convolution, pooling, and dense layers; modern state-of-the-art models often deploy Vision Transformers (ViT) that split images into sequential patches. Architectures output a softmax distribution for mutually exclusive classes or a sigmoid vector for multi-label tagging.

## Technical definition
A computer vision mapping that evaluates an input tensor of pixel values and estimates conditional probability distributions across a closed discrete set of categorical classes.

## Examples
An automated agricultural sorting system categorizing photographed fruit conveyer items into "grade-A apple," "grade-B apple," or "defective."
