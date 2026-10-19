# Báo cáo Wave 2: Lô DevOps (35 khái niệm)

Trạng thái: **hoàn thành soạn thảo và vượt qua toàn bộ cổng kiểm thử** (2026-10-16).
Tất cả 35 khái niệm đều ở `status: draft`, `provenance: { drafted_by: ai }`.

## Danh sách khái niệm
| id | Nhãn en | Nhãn vi | Level | Nguồn A/B (definition) | Bằng chứng nhãn vi |
|---|---|---|---|---|---|
| `ci-cd` | CI/CD | CI/CD | 1 | aws-docs (B) | từ mượn |
| `ci-pipeline` | Pipeline (CI/CD) | Pipeline (CI/CD) | 2 | aws-docs (B) | từ mượn |
| `software-container` | Container (Software) | Container (Phần mềm) | 1 | k8s-glossary (A) | từ mượn |
| `container-image` | Image (Container) | Image (Container) | 2 | k8s-glossary (A) | từ mượn |
| `docker` | Docker | Docker | 1 | docker-docs (B) | từ mượn |
| `kubernetes` | Kubernetes | Kubernetes | 2 | k8s-glossary (A) | từ mượn |
| `kubernetes-pod` | Pod (Kubernetes) | Pod (Kubernetes) | 2 | k8s-glossary (A) | từ mượn |
| `software-deployment` | Deployment (Software) | Deployment (Phần mềm) | 2 | k8s-glossary (A) | từ mượn |
| `rollback` | Rollback | Rollback | 2 | k8s-glossary (A) | từ mượn |
| `blue-green-deployment` | Blue-green deployment | Blue-green deployment | 2 | aws-docs (B) | từ mượn |
| `canary-release` | Canary release | Canary release | 2 | aws-docs (B) | từ mượn |
| `infrastructure-as-code` | Infrastructure as code (IaC) | Infrastructure as code (IaC) | 2 | microsoft-learn (B) | từ mượn |
| `observability` | Observability | Observability | 2 | opentelemetry-docs (A) | từ mượn |
| `log` | Log (Software) | Log (Phần mềm) | 1 | opentelemetry-docs (A) | từ mượn |
| `metric-monitoring` | Metric (Monitoring) | Metric (Giám sát) | 2 | opentelemetry-docs (A) | từ mượn |
| `distributed-tracing` | Distributed tracing | Distributed tracing | 3 | opentelemetry-docs (A) | từ mượn |
| `slo` | Service Level Objective (SLO) | Service Level Objective (SLO) | 2 | google-sre-book (B) | từ mượn |
| `sla` | Service Level Agreement (SLA) | Service Level Agreement (SLA) | 2 | google-sre-book (B) | từ mượn |
| `sli` | Service Level Indicator (SLI) | Service Level Indicator (SLI) | 2 | google-sre-book (B) | từ mượn |
| `incident` | Incident (IT) | Incident (CNTT) | 1 | google-sre-book (B) | từ mượn |
| `on-call` | On-call | On-call | 2 | google-sre-book (B) | từ mượn |
| `postmortem` | Postmortem (IT) | Postmortem (CNTT) | 2 | google-sre-book (B) | từ mượn |
| `load-balancer` | Load balancer | Load balancer | 2 | aws-docs (B) | từ mượn |
| `cdn` | Content Delivery Network (CDN) | Content Delivery Network (CDN) | 2 | aws-docs (B) | từ mượn |
| `dns` | Domain Name System (DNS) | Domain Name System (DNS) | 1 | ietf (A) | từ mượn |
| `serverless` | Serverless | Serverless | 2 | aws-docs (B) | từ mượn |
| `virtual-machine` | Virtual machine (VM) | Máy ảo | 1 | microsoft-learn (B) | wikipedia-vi |
| `autoscaling` | Autoscaling | Autoscaling | 2 | aws-docs (B) | từ mượn |
| `environment-variable` | Environment variable | Biến môi trường | 1 | microsoft-learn (B) | wikipedia-vi |
| `secret-config` | Secret (Software) | Secret (Phần mềm) | 2 | k8s-glossary (A) | từ mượn |
| `staging-environment` | Staging environment | Staging environment | 2 | microsoft-learn (B) | từ mượn |
| `uptime` | Uptime | Uptime | 1 | google-sre-book (B) | từ mượn |
| `latency` | Latency (Network) | Latency (Mạng) | 2 | google-sre-book (B) | từ mượn |
| `throughput` | Throughput | Throughput | 2 | microsoft-learn (B) | từ mượn |
| `rate-limiting` | Rate limiting | Rate limiting | 2 | microsoft-learn (B) | từ mượn |

Mọi khái niệm:
- `status: draft`, `provenance.drafted_by: ai`.
- `en` viết từ nguồn (`translation: native`). `vi` dịch từ `en` (`translation: translated`, `translated_from: en`, `translated_by: ai`, `translated_at: '2026-10-16'`).
- Mỗi locale có ít nhất 2 `plain_descriptions` độc nhất, không trùng lặp và đầy đủ 4 phần thân bài (`## Easy explanation` / `## Giải thích dễ hiểu`, `## Details` / `## Chi tiết`, `## Technical definition` / `## Định nghĩa chuyên ngành`, `## Examples` / `## Ví dụ`).
- Quan hệ `confusable` đối xứng hai chiều và có `confusable_notes` ở cả hai locale:
  - `blue-green-deployment` ↔ `canary-release`
  - `slo` ↔ `sla` ↔ `sli` (tam giác đối xứng đầy đủ)
  - `latency` ↔ `throughput`
  - `software-container` ↔ `virtual-machine`
  - `container-image` ↔ `software-container`
- Đồ thị quan hệ `prerequisites` tạo thành DAG không có chu trình.
- Quyết định `autolink`:
  - Từ ngữ thông dụng (generic words) đặt `autolink: { label: never }`: `Pipeline`, `Container`, `Image`, `Deployment`, `Log`, `Metric`, `Incident`, `Secret`.
  - Từ viết tắt (acronyms): `autolink: { label: always }` cho `CI/CD`; `autolink: { aliases: { <ACR>: always } }` cho `IaC`, `K8s`, `SLO`, `SLA`, `SLI`, `CDN`, `DNS`, `VM`.

## Mục mới trong `config/sources.yaml`
Tất cả các nguồn mới được thêm ở cuối file dưới chú thích `# wave2 devops`, tuân thủ `reuse: paraphrase-only`:
| ref | Bậc | Loại | Giấy phép | Ghi chú |
|---|---|---|---|---|
| `docker-docs` | B | docs | Apache-2.0 | Tài liệu chính thức của Docker Inc. |
| `opentelemetry-docs` | A | docs | Apache-2.0 | Đặc tả và tài liệu chính thức từ CNCF |
| `google-sre-book` | B | docs | CC-BY-NC-ND-4.0 | Bộ sách kinh điển về SRE của Google |

Mọi URL nguồn đều được kiểm tra thực tế (HTTP 200) và văn bản thuần tương ứng đã được lưu trữ trong `candidates/.sources/` phục vụ kiểm tra trùng lặp bản quyền.

## Kết quả kiểm tra chất lượng (Quality Gates)
| Lệnh kiểm tra | Dòng kết quả cuối cùng |
|---|---|
| `pnpm tb validate --strict` | `✔ Validation passed successfully!` |
| `pnpm tb build` | `✔ Successfully generated 22 index files and 373 dist artifacts:` |
| `pnpm tb report collisions` | `✔ mọi homonym đều có qualifier và confusable hai chiều` |
| `pnpm tb check overlap` | `✔ Không có đoạn trùng ≥ 8 từ / no copied runs of 8+ words` |
| `pnpm tb check overlap --size 6` | `✔ Không có đoạn trùng ≥ 6 từ / no copied runs of 6+ words` |
| `pnpm test` | `Tests  155 passed (155)` |
| `pnpm check:deterministic` | `✔ Build is 100% deterministic! All 380 artifacts have identical sha256 hashes across builds.` |

## Các điểm tồn đọng / Không hoàn thành
- Không có: tất cả 35 khái niệm thuộc gói `candidates/wave2/devops.yaml` đều đã được soạn thảo đầy đủ, đáp ứng 100% các tiêu chuẩn schema, integrity rules, và vượt qua tất cả các cổng kiểm thử với 0 lỗi, 0 cảnh báo.
