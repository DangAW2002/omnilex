---
label: Underfitting
aliases: []
loanwords: []
plain_descriptions:
  - when a machine learning model is too simplistic to capture the basic trends in its training data
  - a model performing poorly on both its training examples and new unseen test data
summary: >-
  A modeling pathology where a machine learning algorithm is overly simplistic, failing to capture the underlying structure of the data and exhibiting high loss on both training and test sets.
confusable_notes:
  overfitting: Underfitting fails to capture the underlying pattern even on training data; overfitting memorizes training noise and fails to generalize.
follow_up_questions:
  - How does increasing model parameter capacity mitigate persistent underfitting?
  - Why does severe underfitting correspond to the high-bias regime in the bias-variance tradeoff?
translation: native
---

## Easy explanation
Imagine trying to predict complex seasonal weather changes using a single straight line; the rule is so overly basic that it cannot even explain past recorded temperatures.

## Details
Underfitting arises when model capacity is insufficient to represent the underlying data-generating distribution, or when optimization concludes prematurely. Hallmarks include high training error alongside equally elevated validation error (high bias). Common remediation tactics include switching to more expressive neural or non-linear architectures, engineering additional informative features, reducing aggressive regularization penalties, and allowing extended gradient training steps.

## Technical definition
A state of high statistical bias wherein an estimator lacks adequate hypothesis space capacity to approximate the true conditional expectation of the target distribution.

## Examples
Attempting to fit a straight linear regression line through a U-shaped parabolic curve yields poor fit, with training accuracy stalled at only 52% and test accuracy at 50%.
