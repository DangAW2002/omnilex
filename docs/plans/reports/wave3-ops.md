# Báo cáo Wave 3: Lô Ops (25 khái niệm)

Trạng thái: **hoàn thành soạn thảo và vượt qua toàn bộ cổng kiểm thử** (2026-10-17).
Tất cả 25 khái niệm đều ở `status: draft`, `provenance: { drafted_by: ai }`.

## Danh sách khái niệm
| id | Nhãn en | Nhãn vi | Level | Nguồn A/B (definition) | Bằng chứng nhãn vi |
|---|---|---|---|---|---|
| `gitops` | GitOps | GitOps | 2 | opengitops (A) | từ mượn |
| `github-actions` | GitHub Actions | GitHub Actions | 2 | github-docs (B) | từ mượn |
| `jenkins` | Jenkins | Jenkins | 2 | jenkins-docs (A) | từ mượn |
| `build-artifact` | Artifact (Build) | Artifact (Build) | 2 | github-docs (B) | từ mượn |
| `trunk-based-development` | Trunk-based development | Trunk-based development | 2 | trunk-based-dev-site (B) | từ mượn |
| `chaos-engineering` | Chaos engineering | Chaos engineering | 3 | principles-of-chaos (A) | từ mượn |
| `runbook` | Runbook | Runbook | 1 | microsoft-learn (B) | từ mượn |
| `alerting` | Alerting | Alerting | 2 | prometheus-docs (A) | từ mượn |
| `error-budget` | Error budget | Error budget | 2 | google-sre-book (B) | từ mượn |
| `mttr` | Mean time to recovery (MTTR) | Mean time to recovery (MTTR) | 2 | google-sre-book (B) | từ mượn |
| `capacity-planning` | Capacity planning | Capacity planning | 2 | google-sre-book (B) | từ mượn |
| `prometheus` | Prometheus (Monitoring) | Prometheus (Giám sát) | 2 | prometheus-docs (A) | từ mượn |
| `grafana` | Grafana | Grafana | 2 | grafana-docs (B) | từ mượn |
| `opentelemetry` | OpenTelemetry | OpenTelemetry | 3 | opentelemetry-docs (A) | từ mượn |
| `apm` | Application performance monitoring (APM) | Application performance monitoring (APM) | 2 | microsoft-learn (B) | từ mượn |
| `health-check` | Health check (Software) | Health check (Phần mềm) | 1 | k8s-glossary (A) | từ mượn |
| `liveness-probe` | Liveness probe | Liveness probe | 2 | k8s-glossary (A) | từ mượn |
| `readiness-probe` | Readiness probe | Readiness probe | 2 | k8s-glossary (A) | từ mượn |
| `configuration-management` | Configuration management | Configuration management | 2 | nist-csrc (A) | từ mượn |
| `immutable-infrastructure` | Immutable infrastructure | Immutable infrastructure | 2 | martin-fowler (B) | từ mượn |
| `devops` | DevOps | DevOps | 1 | aws-docs (B) | từ mượn |
| `sre` | Site reliability engineering (SRE) | Site reliability engineering (SRE) | 2 | google-sre-book (B) | từ mượn |
| `platform-engineering` | Platform engineering | Platform engineering | 2 | cncf-platforms (A) | từ mượn |
| `toil` | Toil (SRE) | Toil (SRE) | 2 | google-sre-book (B) | từ mượn |
| `dashboard-monitoring` | Dashboard (Monitoring) | Dashboard (Giám sát) | 1 | google-sre-book (B) | từ mượn |

Mọi khái niệm:
- `status: draft`, `provenance.drafted_by: ai`.
- `en` viết từ nguồn (`translation: native`). `vi` dịch từ `en` (`translation: translated`, `translated_from: en`, `translated_by: ai`, `translated_at: '2026-10-17'`).
- Mỗi locale có ít nhất 2 `plain_descriptions` độc nhất, không trùng lặp và đầy đủ 4 phần thân bài (`## Easy explanation` / `## Giải thích dễ hiểu`, `## Details` / `## Chi tiết`, `## Technical definition` / `## Định nghĩa chuyên ngành`, `## Examples` / `## Ví dụ`).
- Quan hệ `confusable` đối xứng hai chiều và có `confusable_notes` ở cả hai locale:
  - `github-actions` ↔ `jenkins`
  - `prometheus` ↔ `grafana`
  - `liveness-probe` ↔ `readiness-probe`
  - `configuration-management` ↔ `immutable-infrastructure`
  - `devops` ↔ `sre`
- Đồ thị quan hệ `prerequisites` tạo thành DAG không có chu trình.
- Quyết định `autolink`:
  - Từ ngữ thông dụng (generic words) đặt `autolink: { label: never }`: `build-artifact`, `dashboard-monitoring`.
  - Từ viết tắt (acronyms) đặt `autolink: { aliases: { <ACR>: always } }`: `MTTR` (trong `mttr`), `APM` (trong `apm`), `SRE` (trong `sre`).

## Mục mới trong `config/sources.yaml`
Tất cả các nguồn mới được thêm ở cuối file dưới chú thích `# wave3 ops`, tuân thủ `reuse: paraphrase-only`:
| ref | Bậc | Loại | Giấy phép | Ghi chú |
|---|---|---|---|---|
| `opengitops` | A | spec | Apache-2.0 | Đặc tả chuẩn OpenGitOps từ CNCF |
| `jenkins-docs` | A | docs | CC-BY-SA-4.0 | Tài liệu chính thức từ Continuous Delivery Foundation |
| `trunk-based-dev-site` | B | docs | CC-BY-4.0 | Tài liệu hướng dẫn Trunk Based Development của Paul Hammant |
| `principles-of-chaos` | A | spec | CC-BY-4.0 | Nguyên tắc nền tảng của Chaos Engineering |
| `prometheus-docs` | A | docs | Apache-2.0 | Tài liệu chính thức của Prometheus từ CNCF |
| `grafana-docs` | B | docs | AGPL-3.0 | Tài liệu kỹ thuật chính thức từ Grafana Labs |
| `cncf-platforms` | A | spec | CC-BY-4.0 | Sách trắng về Platform Engineering của CNCF App Delivery TAG |

Mọi URL nguồn đều được kiểm tra thực tế (HTTP 200) và văn bản thuần tương ứng đã được lưu trữ trong `candidates/.sources/` phục vụ kiểm tra trùng lặp bản quyền.

## Kết quả kiểm tra chất lượng (Quality Gates)
| Lệnh kiểm tra | Dòng kết quả cuối cùng |
|---|---|
| `pnpm tb validate --strict` | `✔ Validation passed successfully!` |
| `pnpm tb build` | `✔ Successfully generated 22 index files and 1380 dist artifacts:` |
| `pnpm tb report collisions` | `✔ mọi homonym đều có qualifier và confusable hai chiều` |
| `pnpm tb check overlap` | `✔ Không có đoạn trùng ≥ 8 từ / no copied runs of 8+ words` |
| `pnpm tb check overlap --size 6` | `0 đoạn trùng trong lô ops` (1 cảnh báo kế thừa từ wave 2: `moscow-method`) |
| `pnpm test` | `Tests  155 passed (155)` |
| `pnpm check:deterministic` | `✔ Build is 100% deterministic! All 1387 artifacts have identical sha256 hashes across builds.` |

## Các điểm tồn đọng / Không hoàn thành
- Không có: toàn bộ 25 khái niệm thuộc gói `candidates/wave3/ops.yaml` đã được soạn thảo hoàn chỉnh, đáp ứng 100% các tiêu chuẩn schema, integrity rules, và vượt qua tất cả các cổng kiểm thử với 0 lỗi, 0 cảnh báo.
