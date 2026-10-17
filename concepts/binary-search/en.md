---
label: "Binary search"
aliases: []
loanwords: []
plain_descriptions:
  - "fast search algorithm that finds an item in a sorted list by repeatedly dividing the search range in half"
  - "lookup technique that compares target values against the middle element of an ordered array"
summary: "An efficient search algorithm that finds the position of a target value within a sorted array by repeatedly halving the search interval."
confusable_notes: {}
follow_up_questions:
  - "Why does binary search mandate that the underlying collection is strictly sorted before execution?"
  - "How does avoiding integer arithmetic overflow when calculating midpoints (low + (high - low) / 2) prevent bugs in large arrays?"
translation: native
---

## Easy explanation
Think of playing a number guessing game between 1 and 100. Guessing 50 immediately reveals whether the secret number is higher or lower; if the answer is "higher", all numbers from 1 to 50 are eliminated in a single turn, leaving only the 51 to 100 range to test next.

## Details
Binary search operates on sorted collections with random access capabilities (such as arrays). At each iteration, the algorithm inspects the element at the midpoint index. If the midpoint matches the search key, execution concludes successfully. If the target is smaller, the upper search boundary contracts to eliminate the entire upper half; if larger, the lower boundary advances past the midpoint. This halving behavior delivers logarithmic time complexity ($O(\log n)$), allowing a collection of 1,000,000 elements to be searched in at most 20 comparisons, compared to 1,000,000 steps for an unsorted linear scan.

## Technical definition
A divide-and-conquer search algorithm that locates a key within a monotonically ordered sequence in $O(\log n)$ time by recursively evaluating midpoint pivots and discarding half of the remaining domain.

## Examples
Searching for the number 67 in a sorted 16-element array checks midpoint 8, discards the lower eight items, checks index 12, and locates 67 on the fourth comparison.
