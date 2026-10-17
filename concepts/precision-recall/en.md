---
label: Precision and recall
aliases: []
loanwords: []
plain_descriptions:
  - two companion metrics tracking how accurate positive predictions are versus how many true positives were captured
  - evaluation measurements balancing false alarm rates against missed detection rates in classifiers
summary: >-
  Dual evaluation metrics for classification systems, where precision measures the fraction of positive predictions that are correct, and recall measures the fraction of actual positive instances correctly retrieved.
confusable_notes: {}
follow_up_questions:
  - How does altering a classification decision threshold shift the balance between precision and recall?
  - Why does a high precision score fail to guarantee reliable performance when recall is near zero?
translation: native
---

## Easy explanation
Imagine a detective searching for stolen gems: precision is making sure every stone they seize is genuinely a gem, while recall is making sure they do not leave any real gems behind in the vault.

## Details
Precision is computed as True Positives divided by the sum of True Positives and False Positives, penalizing unwarranted false alarms. Recall (sensitivity) is computed as True Positives divided by the sum of True Positives and False Negatives, penalizing missed targets. Because lowering decision thresholds captures more candidates at the expense of false positives, engineering teams calibrate operating thresholds along the precision-recall curve to match domain risk tolerance.

## Technical definition
Dual statistical metrics quantifying positive predictive value (precision) and sensitivity (recall) in binary and multiclass hypothesis testing.

## Examples
A medical diagnostic model screening 100 actual cancer patients flags 90 cases correctly while raising 10 false alarms among healthy patients, yielding 90% recall and 90% precision.
