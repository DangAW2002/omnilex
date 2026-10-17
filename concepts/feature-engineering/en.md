---
label: Feature engineering
aliases: []
loanwords: []
plain_descriptions:
  - transforming raw collected data into informative numerical inputs that machine learning models understand
  - crafting domain-specific predictive variables to boost the accuracy of an algorithm
summary: >-
  The machine learning practice of selecting, manipulating, and transforming raw dataset attributes into optimized feature representations to maximize algorithm performance.
confusable_notes: {}
follow_up_questions:
  - How does target encoding introduce data leakage risks during feature cross-validation?
  - What automated feature synthesis frameworks help streamline tabular data preparation?
translation: native
---

## Easy explanation
Think of preparing raw ingredients for a chef: instead of handing over whole unwashed vegetables, you wash, peel, chop, and measure them into exact bowls so cooking is fast and foolproof.

## Details
Feature engineering leverages domain expertise and statistical transformations to expose underlying predictive signals to learning algorithms. Core methodologies encompass missing value imputation, categorical one-hot encoding, logarithmic scaling of skewed distributions, polynomial feature crosses, and date decomposition (extracting day-of-week and hour from timestamps). High-quality feature pipelines reduce model training complexity and enhance interpretability across tabular datasets.

## Technical definition
The deterministic mathematical and algorithmic transformation of primary data measurements into structured input vectors that maximize mutual information with target variables.

## Examples
An airline ticket forecasting model transforms raw departure dates into two new engineered features—days until flight and holiday indicator—increasing price prediction accuracy by 12%.
