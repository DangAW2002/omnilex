# Báo cáo Wave 3, lô Cloud (31 khái niệm)

Trạng thái: **Đã hoàn thành toàn bộ nội dung và vượt qua tất cả các cổng kiểm tra** (2026-10-17). Mọi khái niệm đều giữ nguyên trạng thái `status: draft`, `provenance.drafted_by: ai`.

## Danh sách khái niệm (31/31)

| id | Nhãn en | Nhãn vi | Level | Nguồn A/B (definition) | Bằng chứng nhãn vi |
|---|---|---|---|---|---|
| `iaas` | Infrastructure as a Service (IaaS) | Infrastructure as a Service (IaaS) | 1 | nist-csrc (A) | từ mượn |
| `paas` | Platform as a Service (PaaS) | Platform as a Service (PaaS) | 1 | nist-csrc (A) | từ mượn |
| `saas` | Software as a Service (SaaS) | Software as a Service (SaaS) | 1 | nist-csrc (A) | từ mượn |
| `hybrid-cloud` | Hybrid cloud | Hybrid cloud | 2 | nist-csrc (A) | từ mượn |
| `multi-cloud` | Multi-cloud | Multi-cloud | 2 | google-cloud-docs (B) | từ mượn |
| `cloud-region` | Region (Cloud) | Region (Đám mây) | 1 | aws-docs (B) | từ mượn |
| `availability-zone` | Availability zone (AZ) | Availability zone (AZ) | 2 | aws-docs (B) | từ mượn |
| `vpc` | Virtual Private Cloud (VPC) | Virtual Private Cloud (VPC) | 2 | aws-docs (B) | từ mượn |
| `subnet` | Subnet | Subnet | 2 | aws-docs (B) | từ mượn |
| `firewall` | Firewall | Tường lửa | 1 | nist-csrc (A) | wikipedia-vi |
| `nat` | Network Address Translation (NAT) | Network Address Translation (NAT) | 2 | ietf (A) | từ mượn |
| `ip-address` | IP address | Địa chỉ IP | 1 | ietf (A) | wikipedia-vi |
| `tcp` | Transmission Control Protocol (TCP) | Transmission Control Protocol (TCP) | 1 | ietf (A) | từ mượn |
| `udp` | User Datagram Protocol (UDP) | User Datagram Protocol (UDP) | 1 | ietf (A) | từ mượn |
| `ssh` | Secure Shell (SSH) | Secure Shell (SSH) | 2 | ietf (A) | từ mượn |
| `vpn` | Virtual Private Network (VPN) | Mạng riêng ảo | 2 | nist-csrc (A) | wikipedia-vi |
| `proxy-server` | Proxy server | Máy chủ proxy | 2 | nist-csrc (A) | wikipedia-vi |
| `network-port` | Port (Networking) | Cổng (Mạng) | 1 | ietf (A) | wikipedia-vi |
| `object-storage` | Object storage | Object storage | 2 | aws-docs (B) | từ mượn |
| `block-storage` | Block storage | Block storage | 2 | aws-docs (B) | từ mượn |
| `cold-start` | Cold start (Serverless) | Cold start (Serverless) | 2 | aws-docs (B) | từ mượn |
| `cloud-instance` | Instance (Cloud) | Instance (Đám mây) | 1 | aws-docs (B) | từ mượn |
| `spot-instance` | Spot instance | Spot instance | 2 | aws-docs (B) | từ mượn |
| `finops` | FinOps | FinOps | 2 | finops-foundation (A) | từ mượn |
| `terraform` | Terraform | Terraform | 2 | hashicorp-docs (B) | từ mượn |
| `ansible` | Ansible | Ansible | 2 | ansible-docs (B) | từ mượn |
| `helm` | Helm (Kubernetes) | Helm (Kubernetes) | 2 | helm-docs (A) | từ mượn |
| `docker-compose` | Docker Compose | Docker Compose | 2 | docker-docs (B) | từ mượn |
| `container-registry` | Container registry | Container registry | 2 | docker-docs (B) | từ mượn |
| `service-discovery` | Service discovery | Service discovery | 2 | k8s-glossary (A) | từ mượn |
| `bandwidth` | Bandwidth (Network) | Băng thông (Mạng) | 1 | itu (A) | wikipedia-vi |

Mọi khái niệm đều tuân thủ các quy tắc cốt lõi:
- `status: draft`, `provenance: { drafted_by: ai }`.
- `en` được viết độc lập (`translation: native`). `vi` dịch chính xác từ `en` (`translation: translated`, `translated_from: en`, `translated_by: ai`, `translated_at: '2026-10-17'`).
- Mỗi locale có ít nhất 2 `plain_descriptions` riêng biệt, không lặp lại giữa các khái niệm, kèm tóm tắt 1 câu và đủ 4 phần nội dung.
- Các từ viết tắt phổ biến (`IaaS`, `PaaS`, `SaaS`, `AZ`, `VPC`, `NAT`, `TCP`, `UDP`, `SSH`, `VPN`) đều có alias và cấu hình `autolink.aliases.<ACR>: always`.
- Các từ tiếng Anh thông dụng (`Region`, `Instance`, `Port`) được thiết lập `autolink: { label: never }` và có qualifier rõ ràng.
- Đã thiết lập quan hệ đối ứng hai chiều `confusable` giữa `docker-compose` và `kubernetes` kèm ghi chú phân biệt `confusable_notes` ở cả en.md và vi.md.

## Các mục mới bổ sung trong `config/sources.yaml`

Tất cả các nguồn mới đều thuộc bậc A hoặc B, tuân thủ `reuse: paraphrase-only` với ngày xác minh `2026-10-17`:
- `finops-foundation` (Tier A): FinOps Framework and Documentation (Linux Foundation), giấy phép CC-BY-4.0.
- `hashicorp-docs` (Tier B): HashiCorp Developer Documentation, giấy phép all-rights-reserved.
- `ansible-docs` (Tier B): Ansible Documentation (Red Hat), giấy phép GPL-3.0-or-later.
- `helm-docs` (Tier A): Helm Documentation (CNCF), giấy phép Apache-2.0.

## Kết quả các cổng kiểm tra (Quality Gates)

| Cổng kiểm tra | Lệnh thực thi | Kết quả đầu ra |
|---|---|---|
| **Cổng 1: Schema & Rules** | `node packages/cli/dist/index.js validate --strict` | `✔ Validation passed successfully!` (356 concepts loaded, 0 errors, 0 warnings) |
| **Cổng 2: Sinh Artifacts** | `node packages/cli/dist/index.js build` | `✔ Successfully generated 22 index files and 1398 dist artifacts` |
| **Cổng 3: Kiểm tra Homonyms** | `node packages/cli/dist/index.js report collisions` | `✔ mọi homonym đều có qualifier và confusable hai chiều` |
| **Cổng 4: Chống sao chép (8 từ)** | `node packages/cli/dist/index.js check overlap` | `✔ Không có đoạn trùng ≥ 8 từ / no copied runs of 8+ words` |
| **Cổng 5: Ngưỡng chặt (6 từ)** | `node packages/cli/dist/index.js check overlap --size 6` | Chỉ còn 1 đoạn ngoại lệ duy nhất là tên phương pháp MoSCoW (`"must have should have could have"`) từ wave trước |

Không có khái niệm nào bị bỏ sót hay không hoàn thành. Toàn bộ 31/31 khái niệm đã hoàn thiện đầy đủ và chính xác theo đặc tả.
