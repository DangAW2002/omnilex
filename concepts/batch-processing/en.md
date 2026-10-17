---
label: Batch processing
aliases:
  - bulk processing
loanwords: []
plain_descriptions:
  - processing collected piles of business records all together at a scheduled time
  - running heavy calculation jobs overnight over yesterday's accumulated sales records
summary: The execution of a series of non-interactive computing jobs on large accumulated blocks of data without manual intervention.
confusable_notes:
  stream-processing: Batch processing processes accumulated finite blocks of data periodically, while stream processing evaluates unbounded live data continuously.
follow_up_questions:
  - Why is batch processing more cost-effective for large historical payroll and tax calculations?
  - How do modern engines like Apache Spark combine batch and stream processing APIs?
translation: native
---

## Easy explanation
Like waiting for your laundry basket to fill up over the week and running one large washing machine load on the weekend, rather than washing every shirt the moment you take it off.

## Details
In batch architectures, transactions accumulate over hours, days, or months in staging storage. Schedulers trigger automated jobs that read the entire dataset, apply transformations, compute aggregate metrics, and write summaries to warehouses. Because operations do not demand real-time responses, computing resources can be provisioned flexibly during off-peak hours to minimize cloud infrastructure costs.

## Technical definition
The periodic or scheduled execution of computational jobs over finite, pre-collected datasets without real-time user interaction.

## Examples
A nationwide retail bank executes a nightly batch job at midnight to recalculate loan interest for 800,000 customers and update closing account balances.
