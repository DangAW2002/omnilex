---
label: "React"
qualifier: "(Library)"
aliases:
  - "React.js"
  - "ReactJS"
loanwords: []
autolink:
  label: never
plain_descriptions:
  - "a popular JavaScript tool for building user interfaces with reusable Lego-like components"
  - "a declarative frontend library for constructing reactive interactive web apps"
summary: "A free and open-source front-end JavaScript library for building user interfaces based on components."
confusable_notes: {}
follow_up_questions:
  - "How does the React reconciliation engine use the Virtual DOM to optimize view updates?"
  - "What advantages do React Server Components offer over traditional client components?"
translation: native
---

## Easy explanation
React lets you build websites out of reusable Lego bricks called components: you design each button or card once, and React updates them automatically whenever underlying data changes.

## Details
Maintained by Meta and the open-source community, React models UI as pure declarative functions of state. Developers write components using JSX syntax combining HTML tags and JavaScript logic. When state updates occur, React generates an in-memory Virtual DOM representation, diffs it against the current tree, and calculates minimal real DOM patches. Its unidirectional data flow and hook-based primitives simplify application state lifecycle management.

## Technical definition
A declarative, component-based user interface library utilizing a virtual DOM reconciliation algorithm and unidirectional data flow.

## Examples
A reusable function Component like function UserBadge({ name }) { return <span className="badge">{name}</span>; } rendered dynamically across multiple views.
