---
label: Clustering
aliases: []
loanwords: []
plain_descriptions:
  - grouping similar data points together based on shared characteristics without pre-made tags
  - unsupervised partitioning of items into subsets that share close geometrical distances
summary: >-
  An unsupervised machine learning task that groups unlabelled observations into subsets whose member data points share higher similarity to one another than to points in other groups.
confusable_notes: {}
follow_up_questions:
  - How does centroid initialization sensitivity influence k-means convergence quality?
  - Why do density-based clustering techniques outperform centroid approaches on non-convex manifolds?
translation: native
---

## Easy explanation
Think of looking at stars in the night sky and noticing that certain stars naturally group together into distinct clusters without anyone drawing borders around them.

## Details
Clustering partitions unstructured datasets according to proximity metrics such as Euclidean distance, cosine similarity, or density connectivity. Common algorithmic approaches include centroid-based clustering (such as k-means, which minimizes within-cluster variance), hierarchical clustering (constructing tree-structured dendrograms through agglomerative or divisive merges), and density-based spatial clustering (like DBSCAN, capable of isolating noise and discovering non-spherical clusters).

## Technical definition
The unsupervised algorithmic partition of an unindexed feature space into subsets such that intra-cluster distances are minimized while inter-cluster separation is maximized.

## Examples
A music streaming service clusters 10,000 song tracks into 6 acoustic clusters based on tempo, pitch variance, and acoustic density without manual genre tags.
