# Ghi chú thiết kế WP2: Schema, Validator, Nguồn dẫn chứng và Autolink

## 1. Mục tiêu và phạm vi
Triển khai hạ tầng schema mới, kiểm tra tính toàn vẹn và nguồn dẫn chứng có cấu trúc:
1. **Schema**: Mở rộng `concept.schema.json` (hỗ trợ `sources` dạng mảng đối tượng có cấu trúc bên cạnh chuỗi URL tương thích ngược) và `locale-entry.schema.json` (`autolink`, `label_evidence`, metadata dịch `translation`, `translated_from`, `translated_by`, `sources` riêng của locale).
2. **Danh mục nguồn (`config/sources.yaml`)**: Khởi tạo danh mục ~20 nguồn phổ biến (bậc A/B/C/D), tuân thủ nghiêm ngặt Quyết định D12 (xác minh bản quyền, mặc định `paraphrase-only`, chỉ đặt `reuse: adapt` khi đã kiểm tra giấy phép công cộng/CC BY).
3. **5 luật kiểm tra mới (Rule 14–18)** và cảnh báo từ phổ thông (`config/common-words.<locale>.txt`).
4. **Công cụ di trú `tb sources migrate`**: Chuyển đổi an toàn chuỗi URL cũ sang đối tượng nguồn có cấu trúc, suy diễn `ref` theo domain, xử lý an toàn URL lạ thành `ref: unknown`.
5. **Autolink trong Builder**: Hỗ trợ `autolink: always | never | auto` trên label và từng alias (cho phép từ viết tắt 2–3 ký tự autolink khi bật `always`, và tắt autolink với từ quá phổ biến khi đặt `never`).

## 2. Các file sẽ đổi / tạo mới
- **Sửa**:
  - `schema/concept.schema.json`: Thêm cấu trúc `sources[]` object song song chuỗi string (`oneOf`).
  - `schema/locale-entry.schema.json`: Thêm `autolink`, `label_evidence`, `translation_metadata`, `sources`.
  - `packages/core/src/types.ts`: Bổ sung interface `ConceptSource`, `LabelEvidence`, `AutolinkConfig`, `SourceCatalogEntry`, `SourcesConfig`.
  - `packages/core/src/loader.ts`: Nạp `config/sources.yaml` và danh sách từ phổ thông.
  - `packages/core/src/validator.ts`: Bổ sung Rules 14, 15, 16, 17, 18 và cảnh báo từ phổ thông.
  - `packages/core/src/builder.ts`: Áp dụng cờ `autolink` ghi đè khi sinh `terms.json`.
  - `packages/cli/src/index.ts`: Bổ sung lệnh `tb sources migrate` và `tb sources list`.
  - `docs/schema.md`, `AGENTS.md`: Cập nhật tài liệu 18 luật toàn vẹn.
  - `concepts/margin/concept.yaml`, `concepts/profit-margin/concept.yaml`: Di trú sang nguồn có cấu trúc.
- **Tạo mới**:
  - `docs/plans/wp/wp2.md` (ghi chú này).
  - `config/sources.yaml`: Danh mục nguồn chuẩn hóa.
  - `config/common-words.vi.txt`, `config/common-words.en.txt`: Danh sách từ phổ thông.
  - `packages/core/test/rules-14-18.test.ts`: Test T-V1 (pass/fail fixtures cho rules 14–18).
  - `packages/cli/test/sources-migrate.test.ts`: Test T-V3 (`tb sources migrate`).
  - `packages/core/test/autolink.test.ts`: Test T-V4 (`autolink: always/never/auto`).

## 3. Interface & Cấu trúc dữ liệu

### 3.1 Nguồn có cấu trúc (`ConceptSource` trong `concept.yaml`)
```typescript
export interface ConceptSource {
  ref: string;                             // Mã nguồn trong config/sources.yaml
  locator: string;                         // URL hoặc định danh trang
  title?: string;
  language?: string;                       // 'en', 'vi', etc.
  accessed: string;                        // YYYY-MM-DD
  retrieved_by?: 'ai' | 'human';
  supports?: Array<'definition' | 'summary' | 'example'>;
  quote?: string;                          // Tối đa 30 từ, chỉ cho phép khi reuse != 'cite-only'
  archive?: string;                        // Link web.archive.org (tùy chọn)
}
```

### 3.2 Bằng chứng nhãn & Cấu hình Autolink (`<locale>.md`)
```typescript
export interface LabelEvidence {
  ref: string;
  locator: string;
  accessed?: string;
  note?: string;
}

export interface AutolinkConfig {
  label?: 'always' | 'never' | 'auto';
  aliases?: Record<string, 'always' | 'never' | 'auto'>;
}
```

### 3.3 Danh mục nguồn (`config/sources.yaml`)
```typescript
export interface SourceCatalogEntry {
  title: string;
  publisher?: string;
  url: string;
  type: 'standard' | 'spec' | 'glossary' | 'docs' | 'textbook' | 'paper' | 'encyclopedia' | 'law' | 'community';
  tier: 'A' | 'B' | 'C' | 'D';
  languages: string[];
  license: string;
  reuse: 'adapt' | 'paraphrase-only' | 'cite-only';
  domains: string[];
  verified_license_at?: string;
  license_evidence?: string;
  license_verified_by?: string;
}
```

## 4. Đặc tả 5 Luật Validator Mới
- **Rule 14 (error ở --strict)**: Mọi `sources[].ref` phải tồn tại trong `config/sources.yaml`. Nguồn có cấu trúc bắt buộc có `locator`, `accessed` (định dạng ngày YYYY-MM-DD), và `language`.
- **Rule 15 (warning)**: Ở locale tiếng Việt, nếu `label` không trùng với nhãn tiếng Anh (không phải từ mượn nguyên gốc) thì phải có ít nhất 1 mục `label_evidence`.
- **Rule 16 (error)**: `quote` không được vượt quá 30 từ. Nếu nguồn có `reuse: cite-only`, tuyệt đối không được có trường `quote`.
- **Rule 17 (error)**: Kiểm tra bậc nguồn theo trạng thái khái niệm:
  - `draft`: Phải có ≥ 1 nguồn (cảnh báo nếu chỉ có bậc C/D).
  - `reviewed`: Phải có ≥ 1 nguồn bậc A hoặc B có `supports: definition`.
  - `verified`: Phải có ≥ 2 nguồn độc lập, trong đó có ≥ 1 nguồn bậc A.
- **Rule 18 (error)**: Nếu frontmatter có `translation: translated`, bắt buộc phải khai báo `translated_from` và `translated_by`.
- **Cảnh báo từ phổ thông**: Nếu `label` hoặc `alias` xuất hiện trong `config/common-words.<locale>.txt` mà không khai báo cấu hình `autolink` rõ ràng (`always` hoặc `never`), phát cảnh báo để tránh autolink quá mức.

## 5. Danh mục 20 nguồn đề xuất khởi đầu (`config/sources.yaml`)
| Ref | Tên nguồn | Bậc | Giấy phép | Reuse |
|---|---|---|---|---|
| `nist-csrc` | NIST CSRC Glossary | A | public-domain-us-gov | `adapt` (NIST chính phủ Mỹ) |
| `ietf` | IETF RFC Database | A | IETF Trust | `paraphrase-only` |
| `w3c` | W3C Standards & Technical Reports | A | W3C Document License | `paraphrase-only` |
| `iso-iec` | ISO/IEC Information Technology Standards | A | Copyright ISO/IEC | `cite-only` |
| `k8s-glossary` | Kubernetes Standard Glossary | A | CC BY 4.0 | `adapt` (CC BY 4.0 xác nhận) |
| `scrum-guide` | The Scrum Guide | A | CC BY-SA 4.0 | `paraphrase-only` |
| `microsoft-learn` | Microsoft Learn Technical Documentation | B | CC BY 4.0 / Microsoft Docs | `paraphrase-only` |
| `google-cloud-docs` | Google Cloud Documentation | B | Proprietary Documentation | `paraphrase-only` |
| `aws-docs` | AWS Documentation | B | Proprietary Documentation | `paraphrase-only` |
| `mdn` | MDN Web Docs | B | CC-BY-SA 2.5+ | `paraphrase-only` |
| `owasp` | OWASP Foundation Documentation & Cheatsheets | B | CC BY-SA 4.0 | `paraphrase-only` |
| `mitre-cwe` | MITRE Common Weakness Enumeration | B | Terms of Use | `paraphrase-only` |
| `investor-gov` | U.S. SEC Investor.gov | B | public-domain-us-gov | `adapt` (SEC chính phủ Mỹ) |
| `sec-gov` | U.S. Securities and Exchange Commission | B | public-domain-us-gov | `adapt` (SEC chính phủ Mỹ) |
| `wikipedia-en` | Wikipedia (English) | C | CC BY-SA 4.0 | `paraphrase-only` |
| `wikipedia-vi` | Wikipedia (Tiếng Việt) | C | CC BY-SA 4.0 | `paraphrase-only` |
| `wiktionary-vi` | Wiktionary (Tiếng Việt) | C | CC BY-SA 4.0 | `paraphrase-only` |
| `viblo` | Viblo Community Technical Posts | D | Community | `paraphrase-only` |
| `vn-law-cyber` | Văn bản QPPL Việt Nam (Luật An ninh mạng, Giao dịch ĐT) | A | public-domain-vn-law | `adapt` (Khoản 2 Điều 19 Luật SHTT VN) |
| `unknown` | Placeholder cho URL chưa rõ danh mục khi migrate | D | Unknown | `paraphrase-only` |

*(Lưu ý D12: Các nguồn đề xuất `reuse: adapt` gồm NIST, investor.gov, sec.gov thuộc public domain chính phủ Mỹ, và văn bản quy phạm pháp luật Việt Nam theo luật Việt Nam không thuộc đối tượng bảo hộ quyền tác giả. Kubernetes Glossary có giấy phép CC BY 4.0).*

## 6. Kế hoạch kiểm thử
- **T-V1**: Bộ fixture kiểm tra Rules 14–18 độc lập (ít nhất 1 ca pass và 1 ca fail cho từng rule, kiểm tra đúng `ruleId` và mức lỗi `error`/`warning`).
- **T-V2**: 13 rule kiểm tra hiện có tiếp tục vượt qua 100% test case hiện có.
- **T-V3**: `tb sources migrate` biến đổi chuỗi URL của `margin` và `profit-margin` sang dạng cấu trúc, suy diễn đúng `ref: investor-gov` và `ref: sec-gov`, idempotent (chạy lại không thay đổi kết quả).
- **T-V4**: `autolink` áp dụng thành công: từ 2 ký tự viết tắt có `autolink: always` được đưa vào `terms.json`, từ có `autolink: never` bị loại khỏi `terms.json`, từ trong `common-words.txt` thiếu cấu hình bị cảnh báo.

## 7. Rủi ro và biện pháp xử lý
- **Rủi ro 1**: 11 khái niệm hiện có chưa đủ nguồn bậc A/B theo Rule 17 khi ở trạng thái `reviewed`.
  - *Xử lý*: Giữ quy tắc Rule 17 áp dụng nghiêm ngặt cho các khái niệm mới bổ sung hoặc di trú các khái niệm `reviewed` hiện có (`compound-interest`, `interest-rate`, `principal`, v.v.) bổ sung nguồn tham chiếu chuẩn từ danh mục `config/sources.yaml`.
- **Rủi ro 2**: `tb validate --strict` phát hiện cảnh báo từ phổ thông trên các khái niệm sẵn có.
  - *Xử lý*: Cập nhật cấu hình `autolink: auto/never` cụ thể cho các nhãn trong `concepts/` để đảm bảo validation vượt qua 100% ở chế độ strict.
