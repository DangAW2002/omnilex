---
label: Confusion matrix
aliases: []
loanwords: []
plain_descriptions:
  - a grid table showing exactly where a classification model made correct predictions and where it got confused
  - a matrix comparing true actual labels against predicted model labels across all classes
summary: >-
  A specialized contingency table layout that visually summarizes classification model performance by cross-tabulating actual ground-truth labels against predicted outcomes.
confusable_notes: {}
follow_up_questions:
  - How does inspecting off-diagonal cells highlight systemic class confusion patterns?
  - How are multi-class confusion matrices aggregated to compute macro and micro evaluation averages?
translation: native
---

## Easy explanation
Think of a teacher grading a multiple-choice test who creates a chart showing not just total scores, but how many students mistook option B for option D.

## Details
A confusion matrix categorizes test predictions into four fundamental counts for binary tasks: True Positives (TP), False Positives (FP), True Negatives (TN), and False Negatives (FN). In multi-class scenarios, rows typically represent actual target classes while columns denote predicted assignments (or vice versa). By inspecting off-diagonal elements, machine learning practitioners isolate exact error modes, detect label ambiguities, and derive accuracy, precision, recall, and specificity.

## Technical definition
A square contingency matrix of dimension N x N mapping ground-truth classifications along one axis and predicted assignments along the orthogonal axis.

## Examples
A 2x2 test matrix on 1,000 security logs reveals 950 True Negatives, 30 True Positives, 15 False Positives, and 5 False Negatives.
