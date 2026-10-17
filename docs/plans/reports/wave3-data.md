# Báo cáo WP8, wave 3: Khái niệm Dữ liệu & Cơ sở dữ liệu (37 khái niệm)

Trạng thái: **đã soạn xong và vượt qua toàn bộ các cổng kiểm định** (2026-10-17).
Tất cả khái niệm giữ nguyên `status: draft`, `provenance.drafted_by: ai`.

## Danh sách khái niệm
| id | Nhãn en | Nhãn vi | Level | Nguồn A/B (definition) | Bằng chứng nhãn vi |
|---|---|---|---|---|---|
| `apache-kafka` | Apache Kafka | Apache Kafka | 2 | apache-org (A) | từ mượn |
| `event-streaming` | Event streaming | Event streaming | 2 | aws-docs (B) | từ mượn |
| `publish-subscribe` | Publish-subscribe (pub/sub) | Publish-subscribe (pub/sub) | 2 | aws-docs (B) | từ mượn |
| `rabbitmq` | RabbitMQ | RabbitMQ | 2 | rabbitmq-docs (A) | từ mượn |
| `change-data-capture` | Change data capture (CDC) | Change data capture (CDC) | 2 | microsoft-learn (B) | từ mượn |
| `stream-processing` | Stream processing | Stream processing | 2 | aws-docs (B) | từ mượn |
| `batch-processing` | Batch processing | Batch processing | 2 | aws-docs (B) | từ mượn |
| `apache-spark` | Apache Spark | Apache Spark | 2 | apache-org (A) | từ mượn |
| `apache-flink` | Apache Flink | Apache Flink | 2 | apache-org (A) | từ mượn |
| `apache-airflow` | Apache Airflow | Apache Airflow | 2 | apache-org (A) | từ mượn |
| `data-lakehouse` | Data lakehouse | Data lakehouse | 2 | aws-docs (B) | từ mượn |
| `data-governance` | Data governance | Quản trị dữ liệu | 2 | aws-docs (B) | wikipedia-vi (C) |
| `data-lineage` | Data lineage | Data lineage | 2 | microsoft-learn (B) | từ mượn |
| `data-quality` | Data quality | Chất lượng dữ liệu | 2 | microsoft-learn (B) | wikipedia-vi (C) |
| `olap` | Online Analytical Processing (OLAP) | Online Analytical Processing (OLAP) | 2 | aws-docs (B) | từ mượn |
| `oltp` | Online Transaction Processing (OLTP) | Online Transaction Processing (OLTP) | 2 | aws-docs (B) | từ mượn |
| `columnar-storage` | Columnar storage | Lưu trữ theo cột | 2 | aws-docs (B) | viblo (D) |
| `relational-database` | Relational database | Cơ sở dữ liệu quan hệ | 1 | google-cloud-docs (B) | wikipedia-vi (C) |
| `nosql` | NoSQL | NoSQL | 1 | aws-docs (B) | từ mượn |
| `primary-key` | Primary key | Khóa chính | 1 | microsoft-learn (B) | wikipedia-vi (C) |
| `foreign-key` | Foreign key | Khóa ngoại | 1 | microsoft-learn (B) | wikipedia-vi (C) |
| `database-normalization` | Normalization (Database) | Chuẩn hóa dữ liệu (Cơ sở dữ liệu) | 2 | microsoft-learn (B) | wikipedia-vi (C) |
| `acid` | ACID (Database) | ACID (Cơ sở dữ liệu) | 2 | google-cloud-docs (B) | từ mượn |
| `cap-theorem` | CAP theorem | Định lý CAP | 2 | cmu-db (B) | wikipedia-vi (C) |
| `eventual-consistency` | Eventual consistency | Eventual consistency | 2 | aws-docs (B) | từ mượn |
| `deadlock` | Deadlock | Deadlock | 2 | microsoft-learn (B) | từ mượn |
| `connection-pool` | Connection pool | Connection pool | 2 | microsoft-learn (B) | từ mượn |
| `key-value-store` | Key-value store | Key-value store | 2 | aws-docs (B) | từ mượn |
| `document-database` | Document database | Document database | 2 | aws-docs (B) | từ mượn |
| `graph-database` | Graph database | Graph database | 2 | aws-docs (B) | từ mượn |
| `time-series-database` | Time-series database | Time-series database | 2 | influxdata-docs (B) | từ mượn |
| `postgresql` | PostgreSQL | PostgreSQL | 2 | postgresql-docs (A) | từ mượn |
| `mongodb` | MongoDB | MongoDB | 2 | mongodb-docs (B) | từ mượn |
| `redis` | Redis | Redis | 2 | redis-docs (B) | từ mượn |
| `elasticsearch` | Elasticsearch | Elasticsearch | 2 | elasticsearch-docs (B) | từ mượn |
| `full-text-search` | Full-text search | Tìm kiếm toàn văn | 2 | microsoft-learn (B) | viblo (D) |
| `materialized-view` | Materialized view | Materialized view | 2 | microsoft-learn (B) | từ mượn |

## Nguồn mới trong `config/sources.yaml`
Tất cả đều thiết lập `reuse: paraphrase-only`, `retrieved_by: ai`, ngày truy cập `2026-10-17`:
| ref | Tiêu đề | Bậc | Giấy phép | Ghi chú |
|---|---|---|---|---|
| `apache-org` | Apache Software Foundation Official Documentation | A | Apache-2.0 | Tài liệu chính thức Apache Kafka, Spark, Flink, Airflow |
| `rabbitmq-docs` | RabbitMQ Official Documentation and Tutorials | A | MPL-2.0 | Tài liệu chính thức Broadcom / RabbitMQ |
| `postgresql-docs` | PostgreSQL Documentation | A | PostgreSQL | Tài liệu chính thức PostgreSQL Global Development Group |
| `mongodb-docs` | MongoDB Manual and Documentation | B | proprietary-docs | Tài liệu sản phẩm chính hãng MongoDB Inc. |
| `redis-docs` | Redis Documentation | B | RSALv2 | Tài liệu sản phẩm chính hãng Redis Ltd. |
| `elasticsearch-docs` | Elasticsearch Reference Documentation | B | proprietary-docs | Tài liệu sản phẩm chính hãng Elastic B.V. |
| `influxdata-docs` | InfluxData Official Documentation | B | MIT | Tài liệu sản phẩm InfluxData Inc. |
| `cmu-db` | CMU Database Group Lecture Readings and Papers | B | all-rights-reserved | Bài báo nghiên cứu khoa học Định lý CAP (Brewer, Gilbert, Lynch) |

## Kết quả kiểm tra các cổng (Gates)
1. `pnpm tb validate --strict`
   - Kết quả: `✔ Validation passed successfully! (362 concepts loaded, 0 errors, 0 warnings)`
2. `pnpm tb build`
   - Kết quả: `✔ Successfully generated 22 index files and 1416 dist artifacts`
3. `pnpm tb report collisions`
   - Kết quả: `✔ mọi homonym đều có qualifier và confusable hai chiều`
4. `pnpm tb check overlap`
   - Kết quả: `✔ Không có đoạn trùng ≥ 8 từ / no copied runs of 8+ words`
5. `pnpm tb check overlap --size 6`
   - Kết quả trên lô `data`: `✔ 0 đoạn trùng trên các khái niệm lô data` (2 đoạn trùng hiển thị thuộc về khái niệm cũ `balance-sheet` và `moscow-method`)
6. `pnpm test`
   - Kết quả: `✔ Test Files 22 passed (22), Tests 155 passed (155)`

## Vấn đề và khái niệm chưa hoàn thành
- Không có: 37/37 khái niệm đã được hoàn thành đầy đủ, chính xác theo toàn bộ đặc tả và vượt qua tất cả cổng kiểm định chất lượng.
