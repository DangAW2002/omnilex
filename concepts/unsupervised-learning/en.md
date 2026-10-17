---
label: Unsupervised learning
aliases: []
loanwords: []
plain_descriptions:
  - machine learning that finds hidden patterns in data without pre-assigned labels or answers
  - algorithms grouping raw data points based on natural similarities without human guidance
summary: >-
  A category of machine learning where algorithms analyze and group unlabeled data to uncover underlying geometric clusters, manifold distributions, and intrinsic structures.
confusable_notes:
  supervised-learning: Unsupervised learning discovers intrinsic patterns without target labels; supervised learning relies on explicit input-output training pairs.
follow_up_questions:
  - How do dimensionality reduction methods preserve spatial geometry in unsupervised learning?
  - What objective functions guide clustering when no objective ground truth exists?
translation: native
---

## Easy explanation
Picture handing someone a large bin of miscellaneous foreign coins with no labels; without instruction, they naturally sort them into separate piles based on color, weight, and metal size.

## Details
Unsupervised learning operates without external supervisory labels, inferring properties of the underlying probability density directly from feature distributions. Primary technical formulations include clustering (partitioning observations into coherent groupings), dimensionality reduction (projecting high-dimensional spaces onto lower-dimensional manifolds), and density estimation. Key algorithms include k-means, hierarchical agglomeration, principal component analysis (PCA), and autoencoders, providing foundational preprocessing for downstream predictive systems.

## Technical definition
A machine learning methodology wherein an algorithm identifies structural properties, latent representations, or density estimates from feature vectors without reference to explicit supervisory targets.

## Examples
An e-commerce analytics system evaluates 200,000 customer transaction histories with no prior tags, segmenting them into 4 behavioral personas based on buying frequency and cart size.
