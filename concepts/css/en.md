---
label: "CSS"
aliases:
  - "Cascading Style Sheets"
loanwords: []
autolink:
  label: always
plain_descriptions:
  - "the code rules that control colors, fonts, and layouts on a website"
  - "the styling stylesheet language that makes web pages visually appealing"
summary: "A declarative styling language for rendering visual layout, typographic formatting, and color palettes on markup documents."
confusable_notes: {}
follow_up_questions:
  - "How does CSS specificity dictate which styling rule overrides another?"
  - "What are the layout differences between CSS Flexbox and CSS Grid?"
translation: native
---

## Easy explanation
If HTML is the bare skeleton of a house, CSS represents the interior decor: the wall paint, ceramic flooring, window curtains, and lighting aesthetics.

## Details
CSS operates through selector-declaration pairs that match elements in the DOM tree and apply property values such as typography, margins, background colors, and positioning coordinates. The cascade algorithm resolves competing declarations by evaluating origin, inline specificity, and declaration order. Modern CSS encompasses flexible layout engines like Flexbox and CSS Grid, transitions, animations, media queries, and custom properties (CSS variables).

## Technical definition
A declarative rule-based styling language specifying layout, rendering properties, and typographic styling across media targets according to a cascading specificity algorithm.

## Examples
A rule like button.primary { background-color: #0066cc; border-radius: 4px; padding: 10px 16px; } styles all matching action buttons with uniform blue theme styling.
