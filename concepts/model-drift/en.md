---
label: Model drift
aliases: []
loanwords: []
plain_descriptions:
  - the gradual decline in a deployed AI model’s accuracy as real-world conditions change over time
  - when real-world customer habits shift so much that an existing machine learning model becomes outdated
summary: >-
  The operational degradation of a deployed machine learning model’s predictive accuracy over time caused by evolving real-world statistical environments and shifting feature distributions.
confusable_notes: {}
follow_up_questions:
  - How do monitoring systems distinguish concept drift from covariat/data drift in production telemetry?
  - What statistical divergence tests automatically trigger retraining pipelines when drift is flagged?
translation: native
---

## Easy explanation
Imagine using a city street map printed ten years ago: as new bridges and one-way streets are built, the map gradually misleads you even though the paper itself has not changed.

## Details
Model drift encompasses two distinct statistical phenomena in production MLOps: data drift (covariate shift), where the input distribution P(X) changes while the relationship to targets remains static, and concept drift, where the underlying relationship P(Y|X) between inputs and target outcomes shifts. Engineers deploy monitoring systems that track statistical divergence metrics—such as Population Stability Index (PSI) and Wasserstein distance—triggering automated retraining pipelines when performance thresholds degrade.

## Technical definition
The statistical divergence between the data distribution observed during model training and the empirical distribution encountered during live inference, resulting in loss of generalization.

## Examples
A retail demand forecasting model calibrated before sudden supply disruptions sees its mean absolute percentage error increase from 5% to 22%, requiring a retraining trigger.
