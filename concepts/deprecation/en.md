---
label: "Deprecation"
qualifier: "(Software)"
aliases:
  []
loanwords: []
plain_descriptions:
  - "officially warning developers that a feature will be removed in a future update"
  - "marking old code as discouraged from use while keeping it working for now"
summary: "The practice of marking a software feature, API, or package as obsolete and discouraged from use, signaling that it will be removed in a future release."
confusable_notes:
  breaking-change: "Deprecation alerts developers that a feature is scheduled for retirement while keeping it functional; a breaking change is the eventual alteration or removal that forces downstream code changes."
follow_up_questions:
  - "How do compiler warnings and HTTP Sunset headers help developers prepare for API deprecation?"
  - "What is the difference between a feature being deprecated versus being obsolete or completely removed?"
translation: native
---

## Easy explanation
A bridge authority posting warning signs months in advance that an old wooden bridge will close next year, giving drivers plenty of time to adapt to the new highway route before the bridge is demolished.

## Details
Deprecation gives software consumers advance notice to migrate away from outdated or insecure functionality before it disappears. During the deprecation window, the feature remains functional for backward compatibility, but tooling (compilers, linters, HTTP headers) emits prominent warnings guiding developers to replacement APIs.

## Technical definition
A formal lifecycle designation signaling the intended retirement of a software interface or runtime feature, preserving backward compatibility during a transition window prior to deletion.

## Examples
Tagging a method with @deprecated in TypeScript or Obsolete attribute in C#, which triggers build warnings suggesting the modern replacement method.
