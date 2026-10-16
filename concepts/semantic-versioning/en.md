---
label: "Semantic versioning"
aliases:
  - "SemVer"
loanwords: []
plain_descriptions:
  - "a three-part version numbering system showing whether updates contain fixes, new features, or breaking changes"
  - "a standard release labeling scheme formatted as MAJOR.MINOR.PATCH to signal compatibility"
summary: "A formal versioning specification utilizing a three-part numbering format (MAJOR.MINOR.PATCH) to communicate the compatibility nature of software changes."
confusable_notes:
  {}
follow_up_questions:
  - "How do package managers like npm or Cargo interpret caret (^) and tilde (~) version range constraints based on SemVer?"
  - "Why does Semantic Versioning treat any 0.y.z version as initial development with no stability guarantees?"
translation: native
---

## Easy explanation
Labeling car models where changing the chassis generation means major changes, adding heated seats is a minor upgrade, and replacing an oil filter is a routine patch.

## Details
Semantic Versioning (commonly known as SemVer) structures release strings into X.Y.Z: MAJOR version increments introduce incompatible API breaking changes, MINOR increments add backward-compatible functionality, and PATCH increments incorporate backward-compatible bug fixes. This transparency allows automated dependency managers to safely update libraries without breaking applications.

## Technical definition
A formal specification for software artifact identification that encodes contract compatibility guarantees into a three-segment integer tuple governed by relational precedence rules.

## Examples
Bumping an open-source library from version 2.4.1 to 3.0.0 warns downstream consumers that public API signatures were altered or removed.
