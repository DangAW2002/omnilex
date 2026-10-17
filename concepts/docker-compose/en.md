---
label: Docker Compose
aliases: []
loanwords: []
plain_descriptions:
  - coordinating interconnected microservice containers from a single project file
  - easy way to spin up a web app, database, and cache together using docker-compose.yml
summary: An orchestration utility that launches and connects groups of containerized application services using centralized declarative YAML specifications.
confusable_notes:
  kubernetes: Docker Compose coordinates multi-container stacks on a single developer host using a YAML file, whereas Kubernetes orchestrates container clusters across hundreds of distributed servers in production.
follow_up_questions:
  - How does Docker Compose establish isolated network bridges and service discovery across defined services?
  - When should teams transition from local Docker Compose environments to production Kubernetes or managed container services?
translation: native
---

## Easy explanation
Like an orchestra conductor’s musical score: it outlines exactly when the violin, trumpet, and drums play together in harmony, so a single cue starts the whole ensemble at once.

## Details
Docker Compose simplifies local development by allowing engineers to define interconnected services (like an application server, Redis cache, and PostgreSQL database), shared storage volumes, and environment variables in a single `docker-compose.yml` file. Running `docker compose up` builds required images, creates dedicated networks, and starts all containers in the correct dependency order.

## Technical definition
A multi-container orchestration utility that parses declarative Compose file specifications to manage the lifecycle, networking, environment parameters, and shared storage volumes of container groups on a container engine.

## Examples
A full-stack engineer runs `docker compose up -d` in a project directory to launch a Node.js frontend, Python API, and PostgreSQL database locally with automatic container networking configured.
