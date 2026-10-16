---
label: Image
qualifier: (Container)
aliases:
  - Container image
  - Docker image
loanwords: []
plain_descriptions:
  - the static template or blueprint used to create and run containers
  - a frozen snapshot of software files, system libraries, and startup commands
summary: >-
  An immutable, read-only package containing application binaries, libraries, configuration files, and metadata required
  to launch a container.
confusable_notes:
  software-container: >-
    A container image is a static, immutable filesystem snapshot and execution template, whereas a container is a live
    process executed from that template.
follow_up_questions:
  - How do layered filesystem architectures save disk space and network bandwidth in container images?
  - Why is it best practice to use minimal base images for production deployments?
translation: native
autolink:
  label: never
---

## Easy explanation
Think of a recipe in a cookbook or a master rubber stamp: the recipe itself never changes, but you can use it to bake dozens of identical cakes whenever you wish.

## Details
Container images consist of stacked, immutable filesystem layers created by build instructions (such as lines in a Dockerfile). Each layer captures file modifications or installed binaries. Because layers are content-addressed and shared across images on disk, pulling updated images requires downloading only newly altered layers.

## Technical definition
A standardized, serialized filesystem bundle combining content-addressed read-only layers with configuration JSON defining entrypoints and environment defaults.

## Examples
An image tagged `node:20-alpine` that packages a minimalist Linux root filesystem alongside the Node.js runtime, weighing approximately 50 MB.
