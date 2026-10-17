# Báo cáo Wave 3: Lô An toàn thông tin / Security (30 khái niệm)

Trạng thái: **hoàn thành soạn thảo và vượt qua toàn bộ cổng kiểm thử** (2026-10-17).  
Tất cả 30 khái niệm đều ở `status: draft`, `provenance: { drafted_by: ai }`.

## Danh sách khái niệm
| id | Nhãn en | Nhãn vi | Level | Nguồn A/B (definition) | Bằng chứng nhãn vi |
|---|---|---|---|---|---|
| `authorization` | Authorization (Security) | Authorization (Bảo mật) | 1 | nist-csrc (A) | từ mượn |
| `authentication` | Authentication | Authentication | 1 | nist-csrc (A) | từ mượn |
| `rbac` | Role-based access control (RBAC) | Role-based access control (RBAC) | 2 | nist-csrc (A) | từ mượn |
| `sso` | Single sign-on (SSO) | Single sign-on (SSO) | 2 | nist-csrc (A) | từ mượn |
| `saml` | SAML | SAML | 2 | nist-csrc (A) | từ mượn |
| `openid-connect` | OpenID Connect (OIDC) | OpenID Connect (OIDC) | 2 | nist-csrc (A) | từ mượn |
| `api-key` | API key | API key | 1 | google-cloud-docs (B) | từ mượn |
| `password-salting` | Salt (Cryptography) | Salt (Mật mã học) | 2 | nist-csrc (A) | từ mượn |
| `public-key-cryptography` | Public-key cryptography | Mật mã hóa khóa công khai | 2 | nist-csrc (A) | wikipedia-vi |
| `digital-signature` | Digital signature | Chữ ký số | 2 | nist-csrc (A) | wikipedia-vi |
| `tls-certificate` | Certificate (TLS) | Certificate (TLS) | 2 | nist-csrc (A) | từ mượn |
| `certificate-authority` | Certificate authority (CA) | Certificate authority (CA) | 2 | nist-csrc (A) | từ mượn |
| `end-to-end-encryption` | End-to-end encryption (E2EE) | End-to-end encryption (E2EE) | 2 | nist-csrc (A) | từ mượn |
| `phishing` | Phishing | Phishing | 1 | nist-csrc (A) | từ mượn |
| `ransomware` | Ransomware | Ransomware | 1 | nist-csrc (A) | từ mượn |
| `malware` | Malware | Malware | 1 | nist-csrc (A) | từ mượn |
| `ddos` | Distributed denial-of-service (DDoS) | Distributed denial-of-service (DDoS) | 2 | nist-csrc (A) | từ mượn |
| `brute-force-attack` | Brute-force attack | Brute-force attack | 1 | owasp (A) | từ mượn |
| `penetration-testing` | Penetration testing | Penetration testing | 2 | nist-csrc (A) | từ mượn |
| `sast` | Static application security testing (SAST) | Static application security testing (SAST) | 2 | owasp (A) | từ mượn |
| `dast` | Dynamic application security testing (DAST) | Dynamic application security testing (DAST) | 2 | owasp (A) | từ mượn |
| `supply-chain-attack` | Supply chain attack (Software) | Supply chain attack (Phần mềm) | 2 | nist-csrc (A) | từ mượn |
| `waf` | Web application firewall (WAF) | Web application firewall (WAF) | 2 | owasp (A) | từ mượn |
| `intrusion-detection-system` | Intrusion detection system (IDS) | Intrusion detection system (IDS) | 2 | nist-csrc (A) | từ mượn |
| `siem` | SIEM | SIEM | 2 | nist-csrc (A) | từ mượn |
| `soc-security` | Security Operations Center (SOC) | Security Operations Center (SOC) | 2 | nist-csrc (A) | từ mượn |
| `threat-modeling` | Threat modeling | Threat modeling | 2 | owasp (A) | từ mượn |
| `owasp-top-10` | OWASP Top 10 | OWASP Top 10 | 1 | owasp (A) | từ mượn |
| `zero-day` | Zero-day vulnerability | Zero-day vulnerability | 2 | nist-csrc (A) | từ mượn |
| `security-patch` | Security patch | Security patch | 1 | nist-csrc (A) | từ mượn |

Mọi khái niệm:
- `status: draft`, `provenance.drafted_by: ai`.
- `en` được viết mới hoàn toàn dựa trên nguồn chuẩn (`translation: native`). `vi` dịch từ `en` (`translation: translated`, `translated_from: en`, `translated_by: ai`, `translated_at: '2026-10-17'`).
- Mỗi locale có ít nhất 2 `plain_descriptions` độc nhất, không trùng lặp và đầy đủ 4 phần thân bài (`## Easy explanation` / `## Giải thích dễ hiểu`, `## Details` / `## Chi tiết`, `## Technical definition` / `## Định nghĩa chuyên ngành`, `## Examples` / `## Ví dụ`).
- Quan hệ `confusable` đối xứng hai chiều và có `confusable_notes` ở cả hai locale:
  - `authentication` ↔ `authorization`
  - `sast` ↔ `dast`
  - `saml` ↔ `openid-connect`
- Đồ thị quan hệ `prerequisites` tạo thành DAG không có chu trình.
- Quyết định `autolink`:
  - Từ ngữ thông dụng (generic words) đặt `autolink: { label: never }`: `password-salting` (`Salt`), `tls-certificate` (`Certificate`).
  - Từ viết tắt (acronyms): cấu hình `autolink: { aliases: { <ACR>: always } }` cho `RBAC`, `SSO`, `SAML`, `OIDC`, `E2EE`, `DDoS`, `SAST`, `DAST`, `WAF`, `IDS`, `SIEM`, `CA`. Khái niệm `soc-security` đặt alias `SOC` thành `never` để tránh xung đột với các ngữ cảnh phần cứng SoC.

## Mục mới trong `config/sources.yaml`
Không cần thêm mục mới. Toàn bộ các nguồn định nghĩa và bằng chứng nhãn đã tái sử dụng các ref uy tín có sẵn trong `config/sources.yaml`:
- `nist-csrc` (Bậc A, tiêu chuẩn định nghĩa an toàn thông tin NIST)
- `owasp` (Bậc A, dự án và tài liệu bảo mật ứng dụng OWASP)
- `google-cloud-docs` (Bậc B, tài liệu kỹ thuật chính thức Google Cloud)
- `wikipedia-vi` (Bậc C, bách khoa toàn thư mở tiếng Việt làm bằng chứng nhãn vi)

Mọi URL nguồn đều được kiểm tra thực tế (HTTP 200, URL đích sau redirect) và văn bản thuần tương ứng đã được lưu trữ trong `candidates/.sources/` phục vụ kiểm tra trùng lặp bản quyền.

## Kết quả kiểm tra chất lượng (Quality Gates)
| Lệnh kiểm tra | Dòng kết quả cuối cùng |
|---|---|
| `pnpm tb validate --strict` | `✔ Validation passed successfully!` |
| `pnpm tb build` | `✔ Successfully generated 22 index files and 1395 dist artifacts:` |
| `pnpm tb report collisions` | `✔ mọi homonym đều có qualifier và confusable hai chiều` |
| `pnpm tb check overlap` | `✔ Không có đoạn trùng ≥ 8 từ / no copied runs of 8+ words` |
| `pnpm tb check overlap --size 6 --concepts ...` | `✔ Không có đoạn trùng ≥ 6 từ / no copied runs of 6+ words` |
| `pnpm test` | `Tests  155 passed (155)` |
| `node scripts/check-deterministic.js` | `✔ Build is 100% deterministic! All 1402 artifacts have identical sha256 hashes across builds.` |

## Các điểm tồn đọng / Không hoàn thành
- Không có: tất cả 30 khái niệm thuộc gói `candidates/wave3/sec.yaml` đều đã được soạn thảo đầy đủ, đáp ứng 100% các tiêu chuẩn schema, integrity rules, và vượt qua tất cả các cổng kiểm thử với 0 lỗi, 0 cảnh báo.
