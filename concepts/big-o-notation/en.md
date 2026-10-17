---
label: "Big O notation"
aliases:
  - "Big O"
loanwords: []
plain_descriptions:
  - "mathematical shorthand describing how an algorithm’s runtime or memory demand grows as input size gets huge"
  - "metric that classifies algorithm efficiency by focusing on worst-case scaling behavior while ignoring hardware differences"
summary: "A mathematical notation used to describe the asymptotic upper bound of an algorithm’s time or memory requirements as the input size approaches infinity."
confusable_notes: {}
follow_up_questions:
  - "Why do asymptotic Big O analyses ignore constant multipliers and lower-order polynomial terms?"
  - "How does Big O (upper bound) differ mathematically from Big Omega (lower bound) and Big Theta (tight bound)?"
translation: native
---

## Easy explanation
Think of planning travel time. Walking to the corner grocery takes five minutes for one block and ten minutes for two blocks (linear growth), but looking through a phonebook of 1,000 pages takes only a few flips if you split pages in half each time (logarithmic growth). Big O measures this growth curve rather than the speed of your shoes.

## Details
Big O notation characterizes the limiting behavior of a function by establishing an asymptotic upper bound. In software engineering, it quantifies how execution steps (time complexity) or auxiliary RAM blocks (space complexity) scale relative to input size $n$. By stripping away constant coefficients and lower-order terms, Big O focuses strictly on long-term scalability. Common classes include constant $O(1)$, logarithmic $O(\log n)$, linear $O(n)$, quasilinear $O(n \log n)$, quadratic $O(n^2)$, and exponential $O(2^n)$.

## Technical definition
A theoretical mathematical convention expressing that a function $f(n)$ is bounded from above by a constant multiple of another function $g(n)$ for all sufficiently large input values $n$.

## Examples
Searching for a contact in an unsorted list of 1,000 items requires inspecting every item in the worst case ($O(n)$), whereas binary search on a sorted list finds the item in at most 10 comparisons ($O(\log n)$).
