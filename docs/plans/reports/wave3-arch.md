# Báo cáo Wave 3: Lô Architecture (28 khái niệm)

Trạng thái: **hoàn thành soạn thảo và vượt qua toàn bộ cổng kiểm thử** (2026-10-17).
Tất cả 28 khái niệm đều ở `status: draft`, `provenance: { drafted_by: ai }`.

## Danh sách khái niệm
| id | Nhãn en | Nhãn vi | Level | Nguồn A/B (definition) | Bằng chứng nhãn vi |
|---|---|---|---|---|---|
| `monolith` | Monolithic architecture | Monolithic architecture | 1 | martin-fowler (B) | từ mượn |
| `api-gateway` | API gateway | API gateway | 2 | aws-docs (B) | từ mượn |
| `service-mesh` | Service mesh | Service mesh | 3 | aws-docs (B) | từ mượn |
| `reverse-proxy` | Reverse proxy | Reverse proxy | 2 | nginx-docs (B) | từ mượn |
| `circuit-breaker` | Circuit breaker (Software) | Circuit breaker (Phần mềm) | 2 | martin-fowler (B) | từ mượn |
| `exponential-backoff` | Exponential backoff | Exponential backoff | 2 | aws-docs (B) | từ mượn |
| `event-driven-architecture` | Event-driven architecture | Event-driven architecture | 2 | aws-docs (B) | từ mượn |
| `event-sourcing` | Event sourcing | Event sourcing | 3 | martin-fowler (B) | từ mượn |
| `cqrs` | Command Query Responsibility Segregation (CQRS) | Command Query Responsibility Segregation (CQRS) | 3 | martin-fowler (B) | từ mượn |
| `saga-pattern` | Saga pattern | Saga pattern | 3 | microsoft-learn (B) | từ mượn |
| `domain-driven-design` | Domain-driven design (DDD) | Domain-driven design (DDD) | 2 | martin-fowler (B) | từ mượn |
| `clean-architecture` | Clean architecture | Clean architecture | 2 | microsoft-learn (B) | từ mượn |
| `dependency-injection` | Dependency injection | Dependency injection | 2 | martin-fowler (B) | từ mượn |
| `grpc` | gRPC | gRPC | 2 | grpc-docs (A) | từ mượn |
| `websocket` | WebSocket | WebSocket | 2 | ietf (A) | từ mượn |
| `server-sent-events` | Server-sent events (SSE) | Server-sent events (SSE) | 2 | mdn (B) | từ mượn |
| `horizontal-scaling` | Horizontal scaling | Horizontal scaling | 1 | microsoft-learn (B) | từ mượn |
| `vertical-scaling` | Vertical scaling | Vertical scaling | 1 | microsoft-learn (B) | từ mượn |
| `high-availability` | High availability (HA) | High availability (HA) | 1 | aws-docs (B) | từ mượn |
| `failover` | Failover | Failover | 2 | microsoft-learn (B) | từ mượn |
| `disaster-recovery` | Disaster recovery (DR) | Disaster recovery (DR) | 2 | aws-docs (B) | từ mượn |
| `rto` | Recovery Time Objective (RTO) | Recovery Time Objective (RTO) | 2 | aws-docs (B) | từ mượn |
| `rpo` | Recovery Point Objective (RPO) | Recovery Point Objective (RPO) | 2 | aws-docs (B) | từ mượn |
| `single-point-of-failure` | Single point of failure (SPOF) | Single point of failure (SPOF) | 1 | microsoft-learn (B) | từ mượn |
| `consistent-hashing` | Consistent hashing | Consistent hashing | 3 | cassandra-docs (A) | từ mượn |
| `load-testing` | Load testing | Load testing | 2 | microsoft-learn (B) | từ mượn |
| `backpressure` | Backpressure | Backpressure | 2 | reactive-streams (A) | từ mượn |
| `distributed-system` | Distributed system | Distributed system | 1 | aws-docs (B) | từ mượn |

Mọi khái niệm:
- `status: draft`, `provenance.drafted_by: ai`.
- `en` viết từ nguồn chuẩn xác (`translation: native`). `vi` dịch từ `en` (`translation: translated`, `translated_from: en`, `translated_by: ai`, `translated_at: '2026-10-17'`).
- Mỗi locale có đúng hoặc nhiều hơn 2 `plain_descriptions` độc nhất, không trùng lặp và đầy đủ 4 phần cấu trúc chuẩn (`## Easy explanation` / `## Giải thích dễ hiểu`, `## Details` / `## Chi tiết`, `## Technical definition` / `## Định nghĩa chuyên ngành`, `## Examples` / `## Ví dụ`).
- Số liệu trong ví dụ tiếng Anh và tiếng Việt hoàn toàn trùng khớp và có tính toán chính xác.
- Quan hệ `confusable` đối xứng hai chiều và có `confusable_notes` đầy đủ ở cả hai locale:
  - `api-gateway` ↔ `reverse-proxy`
  - `cqrs` ↔ `event-sourcing`
  - `websocket` ↔ `server-sent-events`
  - `horizontal-scaling` ↔ `vertical-scaling`
  - `high-availability` ↔ `disaster-recovery`
  - `rto` ↔ `rpo`
- Đồ thị `prerequisites` tạo thành DAG không có chu trình.
- Khái niệm có từ viết tắt đều được khai báo `autolink: { aliases: { <ACR>: always } }` (`CQRS`, `DDD`, `SSE`, `HA`, `DR`, `RTO`, `RPO`, `SPOF`, `EDA`, `DI`).
- Khái niệm `circuit-breaker` mang phân định rõ ràng `qualifier: (Software)` (en) và `qualifier: (Phần mềm)` (vi).

## Mục mới trong `config/sources.yaml`
Tất cả đều được thêm vào cuối tệp `config/sources.yaml` dưới ghi chú `# wave3 arch` với `reuse: paraphrase-only`, `verified_license_at: "2026-10-17"`:

| ref | Bậc | Nhà xuất bản | URL | Giấy phép | Ghi chú |
|---|---|---|---|---|---|
| `grpc-docs` | A | gRPC Authors / Cloud Native Computing Foundation | https://grpc.io/docs/ | Apache-2.0 | Tài liệu chính thức dự án gRPC |
| `nginx-docs` | B | F5, Inc. | https://docs.nginx.com | all-rights-reserved | Tài liệu chính thức NGINX Reverse Proxy |
| `cassandra-docs` | A | Apache Software Foundation | https://cassandra.apache.org/doc/ | Apache-2.0 | Tài liệu kiến trúc Apache Cassandra (Dynamo / Consistent Hashing) |
| `reactive-streams` | A | Reactive Streams | https://www.reactive-streams.org/ | CC0-1.0 | Đặc tả chuẩn Reactive Streams (Backpressure) |

Mọi URL của nguồn đều được truy xuất thực tế bằng HTTP GET và trả về mã HTTP 200, lưu trữ văn bản thô đầy đủ tại `candidates/.sources/<ref>/<concept-id>.txt`.

## Kết quả các cổng kiểm thử (Gate Commands)
1. `pnpm tb validate --strict`
   - Dòng cuối: `✔ Validation passed successfully!` (353 concepts loaded, 0 errors, 0 warnings).
2. `pnpm tb build`
   - Dòng cuối: `✔ Successfully generated 22 index files and 1389 dist artifacts:`
3. `pnpm tb report collisions`
   - Dòng cuối: `✔ mọi homonym đều có qualifier và confusable hai chiều`
4. `pnpm tb check overlap`
   - Dòng cuối: `✔ Không có đoạn trùng ≥ 8 từ / no copied runs of 8+ words`
5. `pnpm tb check overlap --size 6`
   - Dòng cuối: Sạch hoàn toàn trong toàn bộ 28 khái niệm của đợt `arch` (0 đoạn trùng ≥ 6 từ).

## Các khái niệm chưa hoàn thành hoặc gặp trở ngại
Không có. Toàn bộ 28 khái niệm thuộc batch `arch` đã được hoàn thành đầy đủ, đạt chuẩn kỹ thuật cao và vượt qua mọi cổng kiểm thử tự động của kho mã nguồn Termbridge.
