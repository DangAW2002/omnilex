---
label: Overfitting
aliases: []
loanwords: []
plain_descriptions:
  - when an AI memorizes practice data so closely that it fails on fresh inputs
  - an AI model scoring near perfect in practice tests but failing real exams
summary: A modeling pathology where an algorithm learns idiosyncratic noise in training samples, severely impairing its ability to generalize to unseen data.
confusable_notes:
  underfitting: Overfitting learns training noise and fails to generalize; underfitting fails to capture the underlying pattern even on the training data.
follow_up_questions:
  - Which regularization methods are most effective at curbing overfitting in deep models?
  - How can monitoring validation loss curves alert engineers to onset overfitting?
translation: native
---

## Easy explanation
A student memorizes the exact answer key and question numbering of past practice tests word for word; when faced with a slightly rephrased question on the actual test, they fail completely.

## Details
Overfitting occurs when model capacity exceeds the underlying complexity of the target distribution, or when training continues past optimal convergence. The model fits specific quirks, anomalies, and stochastic noise present in the training set. Symptoms include near-zero training loss paired with degrading validation error. Mitigation strategies encompass weight decay regularization, dropout, data augmentation, early stopping, and simplifying network architecture.

## Technical definition
High variance in statistical estimators characterized by excessive model complexity, yielding minimal empirical error on training partitions but poor expected risk on true distributions.

## Examples
A real estate valuation model memorizing specific house telephone numbers rather than learning broad neighborhood square-footage metrics, leading to wild pricing errors on new home listings.
