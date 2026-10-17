---
label: Supervised learning
aliases: []
loanwords: []
plain_descriptions:
  - training a computer model using examples that already have the correct answers attached
  - machine learning where the algorithm learns from paired input features and target labels
summary: >-
  A machine learning approach where an algorithm learns a mapping function from input features to target outputs using training data composed of verified input-label pairs.
confusable_notes:
  unsupervised-learning: Supervised learning relies on explicit target labels for training; unsupervised learning uncovers patterns from unlabeled data without ground-truth answers.
follow_up_questions:
  - How does label noise impact the generalization performance of supervised models?
  - What strategies reduce the high human cost of creating supervised training datasets?
translation: native
---

## Easy explanation
Think of studying for an examination using a collection of flashcards with questions printed on the front and verified correct answers written on the back.

## Details
Supervised learning optimizes model parameters by minimizing a loss metric calculated between predicted outputs and ground-truth target values. During training iterations, gradient optimization updates weights to minimize empirical risk across the labeled dataset. Common task formulations fall into classification (predicting discrete class identifiers) or regression (predicting continuous numerical quantities). Success requires representative, accurately labeled datasets to prevent bias and ensure out-of-sample generalization.

## Technical definition
A machine learning paradigm in which an estimator parameterizes a functional mapping from feature space to output space guided by an explicit supervisory signal of paired samples.

## Examples
An email classification system trains on 50,000 emails, each verified as spam or legitimate, learning to score incoming messages with 98% accuracy.
