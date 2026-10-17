---
label: Helm
aliases: []
qualifier: (Kubernetes)
loanwords: []
plain_descriptions:
  - package manager for Kubernetes that bundles complex apps into reusable charts
  - tool for installing and upgrading containerized applications on Kubernetes with one command
summary: The dedicated package manager for Kubernetes that streamlines defining, installing, and upgrading complex container applications using parameterized charts.
confusable_notes: {}
follow_up_questions:
  - How do Helm charts separate template definitions from deployment environment variables using values.yaml?
  - How does Helm release tracking support automated rollbacks when an application deployment fails?
translation: native
---

## Easy explanation
Like an app store installer on your phone or apt/brew on your laptop: instead of manually assembling fifty configuration files, you run one install command to deploy a complete application with all its dependencies.

## Details
Kubernetes applications often require dozens of YAML manifests (Deployments, Services, ConfigMaps, Ingresses, Secrets). Helm bundles these manifests into packages called Helm Charts. By parameterizing values in a values.yaml file, operators can deploy identical charts across development, staging, and production environments with customized replica counts, domain names, and resource limits.

## Technical definition
A package management client for Kubernetes that renders Go template manifests against parameter values files, communicating directly with the Kubernetes API server to manage application lifecycle releases.

## Examples
A developer deploys a complete monitoring stack to a Kubernetes cluster with a single command: `helm install prometheus prometheus-community/kube-prometheus-stack -f my-values.yaml`.
