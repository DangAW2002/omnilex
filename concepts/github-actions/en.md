---
label: GitHub Actions
aliases: []
loanwords: []
plain_descriptions:
  - automation tool built into GitHub to run tests and deploy code on every push
  - workflow platform that executes custom pipelines inside virtual environments when repository events occur
summary: >-
  An automation engine built into GitHub repositories that runs build, verification, and deployment workflows triggered by repository activity.
confusable_notes:
  jenkins: >-
    GitHub Actions is a managed workflow engine hosted on GitHub infrastructure, whereas Jenkins is a self-hosted open-source automation server.
follow_up_questions:
  - "When should an organization choose self-hosted runners instead of GitHub-hosted runners?"
  - "How do reusable actions and composite steps improve workflow maintenance across repositories?"
translation: native
---

## Easy explanation
Like an automated conveyor belt right next to your code filing cabinet that wakes up whenever someone deposits a file, tests it for defects, and stamps it ready for shipping.

## Details
GitHub Actions allows engineering teams to define workflows using YAML files placed inside the .github/workflows directory of a repository. Workflows trigger on specified platform events such as pull requests, code pushes, issue creations, or cron schedules. Each workflow consists of one or more jobs executing on cloud-hosted or self-hosted runners running Linux, Windows, or macOS. Tasks within jobs can run arbitrary shell scripts or community-maintained composite actions fetched from the GitHub Marketplace. Secrets management and matrix builds allow testing across multiple language versions simultaneously.

## Technical definition
An event-driven workflow automation and CI/CD platform integrated with GitHub that schedules containerized or virtualized runner jobs responding to repository lifecycle triggers.

## Examples
A backend repository runs a GitHub Actions workflow on every pull request to execute unit tests and lint checks across Node.js versions 20 and 22 before allowing merges.
