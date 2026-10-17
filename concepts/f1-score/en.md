---
label: F1 score
aliases:
  - F1-score
loanwords: []
plain_descriptions:
  - a single combined score balancing precision and recall into a harmonic average
  - a reliable accuracy metric especially useful when dataset classes are heavily imbalanced
summary: >-
  A statistical evaluation metric that calculates the harmonic mean of precision and recall to provide a balanced measure of a classifier’s accuracy.
confusable_notes: {}
follow_up_questions:
  - Why does the harmonic mean punish extreme disparities between precision and recall more severely than an arithmetic mean?
  - When should an engineer employ an F-beta metric with beta unequal to one?
translation: native
---

## Easy explanation
Think of scoring a decathlon athlete: rather than taking a simple average where being terrible in one sport is masked by another, the score severely penalizes you if you fail either half of the challenge.

## Details
The F1 score harmonic mean formulation—expressed as 2 * (Precision * Recall) / (Precision + Recall)—ensures that if either precision or recall approaches zero, the overall F1 score collapses accordingly. This property makes F1 substantially more reliable than raw accuracy for evaluating binary and multi-class classifiers on skewed datasets, where naive majority-class guessing yields misleadingly high accuracy percentages.

## Technical definition
The harmonic mean of precision and sensitivity, representing a balanced scalar criterion across positive predictive value and true positive rate.

## Examples
A classifier exhibiting 80% precision and 60% recall achieves an F1 score of 68.57%, calculated via 2 * (0.80 * 0.60) / (0.80 + 0.60).
