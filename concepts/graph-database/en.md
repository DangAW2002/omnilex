---
label: Graph database
aliases:
  - graph store
loanwords: []
plain_descriptions:
  - a specialized database that stores connections and friendships as first-class relationships
  - a database engine built to find paths and links between people, roads, or fraud rings quickly
summary: A database that uses graph structures with nodes, edges, and properties to represent and store interconnected data.
confusable_notes: {}
follow_up_questions:
  - Why does index-free adjacency enable constant-time traversal regardless of overall graph size?
  - When does a graph query language like Cypher outperform recursive SQL common table expressions?
translation: native
---

## Easy explanation
Like a social map drawn on a whiteboard: people are drawn as circles (nodes) and lines connecting them show friendships or family ties (edges), making it effortless to trace who knows whom.

## Details
In graph databases, data entities are represented as nodes, and the relationships between them are stored as explicit edges with direction and attributes. Unlike relational databases that must compute multi-hop joins across join tables at query time, graph engines implement index-free adjacency, where nodes maintain direct memory pointers to adjacent edges, enabling lightning-fast traversal across deeply interconnected networks.

## Technical definition
A NoSQL database that utilizes mathematical graph theory structures comprising vertices (nodes), edges (relationships), and properties to persist and traverse densely interconnected entities.

## Examples
A social media platform uses a graph database to power its "People You May Know" feature by traversing friend-of-a-friend relationships three hops away in under 15 milliseconds.
