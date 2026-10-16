---
label: Docker
aliases:
  - Docker Engine
loanwords: []
plain_descriptions:
  - the most popular software tool for building, running, and managing containers
  - the platform that popularised container packaging for modern software development
summary: >-
  An open commercial platform providing tooling to build, share, package, and execute application containers using host
  operating system virtualization.
confusable_notes: {}
follow_up_questions:
  - How does the Docker daemon interact with containerd and runc during runtime?
  - What advantages does Docker Compose provide for managing multi-service local environments?
translation: native
---

## Easy explanation
Think of Docker as a standardized shipping port authority: it provides the standard cranes, packing boxes, and forklifts so anyone can box up cargo and ship it without custom tools.

## Details
Docker popularized container technology by providing an accessible CLI, a standardized declarative format (Dockerfile), and a central registry (Docker Hub). Behind the scenes, the Docker Engine interfaces with low-level runtimes like containerd and runc to configure Linux kernel primitives, creating isolated containers smoothly.

## Technical definition
A container management ecosystem comprising a client CLI, a background daemon service, image-building engines, and standardized runtime specifications.

## Examples
Running `docker run -d -p 8080:80 nginx` starts an isolated Nginx web server bound to port 8080 on the local computer in less than two seconds.
