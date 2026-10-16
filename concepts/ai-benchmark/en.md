---
label: Benchmark
qualifier: (AI)
aliases: []
loanwords: []
plain_descriptions:
  - standardized test suites used to measure AI model accuracy and hardware speed
  - common evaluation exams allowing different AI systems to be fairly compared
summary: A standardized test suite and measurement protocol used to evaluate and compare the accuracy, throughput, latency, or energy efficiency of models and hardware.
confusable_notes:
  llm-eval: A benchmark provides fixed standardized suites across the entire industry (like MLPerf or MMLU), whereas an eval refers to any specific automated or human test pipeline an organization runs to assess model behaviors.
follow_up_questions:
  - Why does benchmark saturation lead to contamination and misleading progress claims?
  - What separates computational throughput benchmarks from cognitive capability benchmarks?
translation: native
---

## Easy explanation
Just as standardized tests like the SAT or IELTS provide a uniform ruler to compare students from different schools, an AI benchmark gives all models the exact same exam questions under identical testing conditions.

## Details
Benchmarks establish reproducible performance baselines across algorithms and hardware platforms. In computational engineering, suites like MLPerf measure operational metrics including inference latency, tokens-per-second throughput, and power draw under defined service-level agreements. In model capabilities, benchmarks assess specific domains such as mathematical reasoning, coding proficiency, multi-turn dialogue, or multimodal perception using fixed test partitions and scoring rules.

## Technical definition
A standardized reference workload, test dataset, and measurement methodology designed to quantitatively assess and compare algorithmic capabilities or computing system efficiency.

## Examples
An engineering team evaluating two cloud server architectures by executing the standardized MLPerf Inference suite to compare token throughput per dollar.
