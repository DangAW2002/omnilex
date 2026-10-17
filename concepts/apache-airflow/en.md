---
label: Apache Airflow
aliases:
  - Airflow
loanwords: []
autolink:
  aliases:
    Airflow: always
plain_descriptions:
  - a tool that schedules and monitors multi-step data pipelines using Python code
  - an automated task manager that runs database extraction and report scripts in orderly sequence
summary: An open-source platform used to programmatically author, schedule, and monitor complex data engineering workflows.
confusable_notes: {}
follow_up_questions:
  - How do Directed Acyclic Graphs (DAGs) in Airflow prevent circular dependencies in data pipelines?
  - What are the operational differences between Airflow CeleryExecutor and KubernetesExecutor?
translation: native
---

## Easy explanation
Like an automated digital airport flight controller: it ensures passenger buses, baggage carts, and fueling trucks finish their work in strict sequence before signaling the airplane to take off.

## Details
Airflow models pipelines as Directed Acyclic Graphs (DAGs) defined entirely in standard Python code. Its scheduler evaluates execution intervals, resolves task dependencies, and passes tasks to worker executors. Rich web interfaces provide real-time visual inspection of execution states, historical runtime metrics, error logs, and automatic task retries on upstream infrastructure failure.

## Technical definition
A programmatic workflow orchestration platform that schedules, directs, and monitors multi-step task execution graphs defined as Python Directed Acyclic Graphs (DAGs).

## Examples
A data engineering team schedules an Airflow DAG to extract marketing campaign data at 02:00, transform records with Spark, and populate executive dashboard tables by 04:00.
