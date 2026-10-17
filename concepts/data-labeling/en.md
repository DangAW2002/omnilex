---
label: Data labeling
aliases: []
loanwords: []
plain_descriptions:
  - the process of tagging raw data like images or text with informative labels so algorithms can learn from them
  - adding ground-truth tags and annotations to training samples for supervised machine learning
summary: >-
  The operational process of identifying, annotating, and tagging raw data samples with informative target labels to produce ground-truth training datasets for supervised machine learning.
confusable_notes: {}
follow_up_questions:
  - How does inter-annotator agreement scoring measure labeling consistency across distributed teams?
  - What active learning workflows prioritize annotating only the most uncertain model predictions?
translation: native
---

## Easy explanation
Think of preparing flashcards for schoolchildren: you take hundreds of unlabelled animal photos and carefully write dog, cat, or horse under each picture so the students can learn their names.

## Details
Data labeling constitutes the foundation of supervised machine learning workflows. Annotation modalities vary by data format, encompassing bounding box drawing and polygon segmentation for computer vision, entity tagging and sentiment scoring for text, and phoneme boundary alignment for audio. Modern workflows combine human-in-the-loop validation with active learning and model-assisted labeling to increase throughput and maintain rigorous quality control.

## Technical definition
The systematic annotation of raw feature observations with categorical, numerical, or structural ground-truth metadata to construct supervisory training targets.

## Examples
An autonomous driving team annotates 10,000 dashcam images, drawing bounding boxes around 45,000 pedestrians and 80,000 vehicles to prepare a detector training corpus.
