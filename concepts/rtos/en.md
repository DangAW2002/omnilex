---
label: Real-time operating system (RTOS)
aliases:
  - "RTOS"
loanwords: []
autolink:
  aliases:
    RTOS: always
plain_descriptions:
  - operating system engineered to process events within guaranteed timing constraints
  - lightweight system that schedules tasks with deterministic latency for embedded hardware
summary: An operating system designed to execute processes with deterministic timing guarantees and minimal scheduling latency for mission-critical embedded devices.
confusable_notes: {}
follow_up_questions:
  - What is the fundamental difference between hard and soft real-time constraints?
  - How does preemptive priority-based scheduling function inside FreeRTOS or Zephyr?
translation: native
---

## Easy explanation
Unlike a smartphone operating system that might momentarily stutter when a notification arrives, an RTOS guarantees that urgent tasks run within an exact, predictable deadline, ensuring safety-critical jobs are never delayed.

## Details
An RTOS uses a deterministic task scheduler, minimal interrupt latency, and inter-task synchronization primitives (semaphores, mutexes, message queues) to ensure predictable deadlines. Systems are classified as hard real-time (where missing a timing constraint represents catastrophic total failure, such as automotive airbag deployment) or soft real-time (where occasional missed deadlines merely degrade quality of service). Prominent embedded implementations include FreeRTOS, Zephyr, and VxWorks.

## Technical definition
An operating system whose architectural priority is the deterministic, bounded execution of concurrent tasks and guaranteed response times to asynchronous hardware interrupts.

## Examples
FreeRTOS managing separate concurrent threads for motor control, wireless telemetry reporting, and user display updates on an automated medical infusion pump.
