---
label: "Regular expression (regex)"
aliases:
  - "Regex"
  - "regex"
loanwords: []
autolink:
  aliases:
    Regex: always
    regex: always
plain_descriptions:
  - "compact pattern used to search, match, and extract specific character sequences from text"
  - "formal string template describing text rules for validating inputs like emails or phone numbers"
summary: "A sequence of characters defining a search pattern used by string-searching algorithms for matching, validation, and text transformation."
confusable_notes: {}
follow_up_questions:
  - "How can catastrophic backtracking in non-deterministic finite automaton (NFA) regex engines lead to ReDoS vulnerabilities?"
  - "What performance tradeoffs exist between compiling regular expressions ahead of time versus evaluating ad-hoc patterns?"
translation: native
---

## Easy explanation
Picture a metal sorting template with specific shaped cutouts for coins. As thousands of unsorted coins roll down the chute, only circular pieces with a 24-millimeter diameter drop cleanly through the matching slot while square or oversized tokens bounce past.

## Details
A regular expression compiles into a finite-state machine (deterministic or non-deterministic) that evaluates strings against concise grammar rules. Special meta-characters denote anchors (`^`, `$`), character classes (`\d`, `[a-z]`), quantifiers (`+`, `*`, `{2,5}`), alternations (`|`), and capture groups (`(...)`). Common applications include validating input formats (like phone numbers or email addresses), extracting structured parameters from raw log files, and executing batch search-and-replace text modifications. Poorly constructed expressions with nested quantifiers can trigger catastrophic backtracking, creating denial-of-service vulnerabilities.

## Technical definition
A formal algebraic notation defining a regular language accepted by a finite-state automaton, utilized within string processing systems for pattern recognition and lexical scanning.

## Examples
The pattern `^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$` validates that user input follows standard email syntax before submitting a signup form.
