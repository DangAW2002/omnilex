---
label: "Breaking change"
aliases:
  []
loanwords: []
plain_descriptions:
  - "a modification in software or an API that breaks existing programs depending on it"
  - "an update that requires downstream developers to rewrite parts of their code to keep working"
summary: "A modification in a software interface, dependency, or system component that breaks backward compatibility and necessitates code adjustments in dependent systems."
confusable_notes:
  deprecation: "A breaking change breaks compatibility and forces consumer updates; deprecation is the advance warning phase that alerts developers prior to breaking modifications."
follow_up_questions:
  - "What strategies allow platform teams to introduce new capabilities without introducing breaking changes to existing endpoints?"
  - "How does Semantic Versioning govern when breaking changes may be introduced in a release cycle?"
translation: native
---

## Easy explanation
Changing the shape of wall electrical sockets from flat pins to round pins, meaning existing plug cords cannot plug in without buying a new adapter.

## Details
Breaking changes occur when function parameters are removed, endpoint URL routes change, serialization payloads alter, or behavioral expectations shift. When a library publishes a breaking change, downstream applications cannot upgrade without modifying their code or failing compilation. In SemVer, breaking changes mandate an increment of the MAJOR version number.

## Technical definition
A modification to a programmatic interface or operational contract that invalidates assumptions of existing consumers, resulting in compilation failures or runtime anomalies.

## Examples
Renaming the public method `getUserData()` to `fetchUserProfile()` without a backward-compatible alias causes compile errors for all calling applications.
