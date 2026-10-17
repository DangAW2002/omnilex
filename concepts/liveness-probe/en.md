---
label: Liveness probe
aliases: []
loanwords: []
plain_descriptions:
  - container check that triggers an automatic restart whenever an application freezes or enters an unrecoverable deadlock
  - watchdog mechanism in orchestrators like Kubernetes that detects crashed processes and reboots the container
summary: >-
  A diagnostic probe configured in container orchestrators to detect when a containerized process is deadlocked or broken, triggering an automatic restart.
confusable_notes:
  readiness-probe: >-
    A liveness probe determines whether a container is alive and restarts it if it fails, whereas a readiness probe determines whether a container is ready to accept network traffic without restarting it.
follow_up_questions:
  - "Why can an overly aggressive liveness probe cause cascading restart loops during high system load?"
  - "How do HTTP probes, TCP socket checks, and exec command probes differ in container diagnostics?"
translation: native
---

## Easy explanation
Like a pulse monitor on an astronaut: if the monitor detects the heart has completely stopped, an automated defibrillator shocks them immediately to restore life.

## Details
In Kubernetes and container architectures, a liveness probe is an automated check executed by the kubelet agent to know when to restart a container. Applications can sometimes enter a state where the main process is technically running, but internal deadlocks, memory leaks, or corrupted state prevent it from making progress. By defining an HTTP probe, TCP socket check, or shell command, operators configure the platform to test container responsiveness. If the liveness probe fails consecutively past the configured failureThreshold, the orchestrator terminates the broken container and restarts a fresh instance according to its restartPolicy.

## Technical definition
A container lifecycle diagnostic probe managed by the orchestrator that initiates container termination and replacement upon consecutive check failures.

## Examples
A backend container deadlocks its main worker thread; after three consecutive failed HTTP checks to /healthz over thirty seconds, Kubernetes kills the container and spins up a new pod.
