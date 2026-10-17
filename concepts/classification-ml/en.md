---
label: Classification
qualifier: (ML)
aliases: []
loanwords: []
autolink:
  label: never
plain_descriptions:
  - assigning data items into distinct categories such as determining if an email is spam or normal
  - machine learning tasks where the predicted outcome is a separate class label
summary: >-
  A supervised machine learning task where an algorithm predicts discrete qualitative class labels or category assignments for given input observations.
confusable_notes:
  regression-ml: Classification predicts discrete categorical class labels; regression predicts continuous numerical values.
follow_up_questions:
  - How does class imbalance impact the choice of evaluation metrics in classification tasks?
  - What decision boundaries distinguish binary from multiclass classification architectures?
translation: native
---

## Easy explanation
Think of an automated post office sorting machine that reads the address on each envelope and drops it into distinct sorting bins designated for each province.

## Details
Classification algorithms partition feature spaces using decision boundaries to assign inputs into predefined categories. Formulations include binary classification (two mutually exclusive classes), multiclass classification (one selection among multiple classes), and multilabel classification (multiple simultaneous tags). Prominent models include logistic regression, support vector machines (SVM), random forests, and deep neural networks terminating in softmax activation layers.

## Technical definition
A supervised mapping function that projects an arbitrary feature vector into a discrete set of categorical label spaces by evaluating posterior probability distributions.

## Examples
A banking fraud detector evaluates 100,000 credit card swipes, classifying 99,850 as legitimate transactions and 150 as potential fraudulent events for manual audit.
