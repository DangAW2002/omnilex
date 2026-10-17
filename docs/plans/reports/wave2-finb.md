# Báo cáo Wave 2, lô finb: Tài chính doanh nghiệp và Kinh tế học vĩ mô (27 khái niệm)

Trạng thái: **Đã hoàn thành soạn thảo toàn bộ (drafted by AI)**, sẵn sàng duyệt. Tất cả 27 khái niệm đều tuân thủ nghiêm ngặt quy định: `status: draft`, `provenance.drafted_by: ai`, không tự ý nâng hạng trạng thái.

## Danh sách
| id | Nhóm | Nhãn en | Nhãn vi | Level | Nguồn A/B (definition) | Bằng chứng nhãn vi |
|---|---|---|---|---|---|---|
| `balance-sheet` | financial-statements | Balance sheet | Bảng cân đối kế toán | 1 | sec-gov (B) | wikipedia-vi |
| `income-statement` | financial-statements | Income statement | Báo cáo kết quả hoạt động kinh doanh | 1 | sec-gov (B) | wikipedia-vi |
| `cash-flow-statement` | financial-statements | Cash flow statement | Báo cáo lưu chuyển tiền tệ | 1 | sec-gov (B) | wikipedia-vi |
| `revenue` | financial-statements | Revenue | Doanh thu | 1 | investor-gov (B) | wikipedia-vi |
| `ebitda` | financial-statements | EBITDA | EBITDA | 2 | sec-gov (B) | từ mượn |
| `working-capital` | capital-structure | Working capital | Vốn lưu động | 2 | sec-gov (B) | wikipedia-vi |
| `liquidity` | capital-structure | Liquidity (Finance) | Tính thanh khoản (Tài chính) | 2 | investor-gov (B) | wikipedia-vi |
| `debt-to-equity-ratio` | capital-structure | Debt-to-equity ratio (D/E) | Hệ số nợ trên vốn chủ sở hữu (D/E) | 2 | sec-gov (B) | wikipedia-vi |
| `equity-finance` | capital-structure | Equity (Finance) | Vốn chủ sở hữu (Tài chính) | 1 | sec-gov (B) | wikipedia-vi |
| `ipo` | fundraising | Initial Public Offering (IPO) | Phát hành lần đầu ra công chúng (IPO) | 2 | investor-gov (B) | wikipedia-vi |
| `venture-capital` | fundraising | Venture capital (VC) | Đầu tư mạo hiểm (VC) | 2 | investor-gov (B) | wikipedia-vi |
| `startup-valuation` | fundraising | Pre-money valuation | Định giá trước đầu tư | 3 | sec-gov (B) | wikipedia-vi |
| `asset` | bookkeeping | Asset (Accounting) | Tài sản (Kế toán) | 1 | investor-gov (B) | wikipedia-vi |
| `liability` | bookkeeping | Liability (Accounting) | Nợ phải trả (Kế toán) | 1 | investor-gov (B) | wikipedia-vi |
| `double-entry-bookkeeping` | bookkeeping | Double-entry bookkeeping | Kế toán kép | 1 | cornell-wex (B) | wikipedia-vi |
| `depreciation-accounting` | bookkeeping | Depreciation (Accounting) | Khấu hao (Kế toán) | 2 | sec-gov (B) | wikipedia-vi |
| `accrual-accounting` | standards | Accrual accounting | Kế toán dồn tích | 2 | cornell-wex (B) | tapchikinhtetaichinh |
| `ifrs` | standards | International Financial Reporting Standards (IFRS) | Chuẩn mực Báo cáo Tài chính Quốc tế (IFRS) | 2 | ifrs-org (A) | wikipedia-vi |
| `vat` | standards | Value-Added Tax (VAT) | Thuế giá trị gia tăng (VAT) | 1 | gov-uk (B) | wikipedia-vi |
| `inflation` | inflation | Inflation | Lạm phát | 1 | bank-of-england (B) | wikipedia-vi |
| `cpi` | inflation | Consumer Price Index (CPI) | Chỉ số giá tiêu dùng (CPI) | 2 | bank-of-england (B) | wikipedia-vi |
| `deflation` | inflation | Deflation | Giảm phát | 2 | bank-of-england (B) | wikipedia-vi |
| `policy-rate` | interest-rates-monetary-policy | Policy rate | Lãi suất điều hành | 2 | bank-of-england (B) | cafef |
| `quantitative-easing` | interest-rates-monetary-policy | Quantitative easing (QE) | Nới lỏng định lượng (QE) | 3 | bank-of-england (B) | wikipedia-vi |
| `exchange-rate` | exchange-rates | Exchange rate | Tỷ giá hối đoái | 1 | ecb (B) | wikipedia-vi |
| `gdp` | inflation | Gross Domestic Product (GDP) | Tổng sản phẩm quốc nội (GDP) | 1 | bank-of-england (B) | wikipedia-vi |
| `recession` | inflation | Recession | Suy thoái kinh tế | 2 | nber (B) | wikipedia-vi |

Mọi khái niệm:
- Đều có `status: draft` và `provenance.drafted_by: ai`.
- Bản tiếng Anh (`en.md`) viết từ nguồn chính thống (`translation: native`), diễn đạt bằng ngôn từ độc lập, không sao chép nguyên văn.
- Bản tiếng Việt (`vi.md`) dịch chuẩn hóa từ bản tiếng Anh (`translation: translated`, `translated_from: en`, `translated_by: ai`, `translated_at: '2026-10-16'`).
- Mỗi ngôn ngữ đều có đủ 2 `plain_descriptions` ngắn gọn, trực diện, 1 câu `summary`, và 4 phần thân bài tiêu chuẩn (`Easy explanation`/`Giải thích dễ hiểu`, `Details`/`Chi tiết`, `Technical definition`/`Định nghĩa chuyên ngành`, `Examples`/`Ví dụ`) cùng 1-2 câu hỏi tiếp nối (`follow_up_questions`).
- Các ví dụ ngữ cảnh Việt Nam tự nhiên (sử dụng đơn vị VND, bối cảnh doanh nghiệp và cơ quan quản lý tại Việt Nam như Ngân hàng Nhà nước, Tổng cục Thuế, chuẩn mực kế toán Việt Nam VAS/VFRS).
- Quan hệ và phân biệt:
  - `working-capital` ↔ `liquidity` là cặp `confusable` 2 chiều có ghi chú phân biệt chi tiết trong cả `en.md` và `vi.md`.
  - `inflation` ↔ `deflation` là cặp `confusable` 2 chiều có ghi chú phân biệt chi tiết trong cả `en.md` và `vi.md`.
  - `asset` ↔ `liability` liên kết bổ trợ chặt chẽ trong hệ thống bảng cân đối và kế toán kép.
  - Các nhánh tiên quyết (`prerequisites`) không có chu trình/vòng lặp.
- Thiết lập `autolink`:
  - Từ thông dụng hàng ngày được thiết lập `autolink.label: never`: `equity-finance`, `asset`, `liability`.
  - Các chữ viết tắt chuyên ngành được gán `autolink.aliases.<ACR>: always`: `EBITDA`, `D/E`, `IPO`, `VC`, `IFRS`, `VAT`, `GTGT`, `CPI`, `QE`, `GDP`.

## Nguồn mới trong `config/sources.yaml`
Tất cả các nguồn mới được bổ sung ở cuối file `config/sources.yaml` dưới comment `# wave2 finb`, tuân thủ nghiêm ngặt `reuse: paraphrase-only` và `verified_license_at: '2026-10-16'`:

| ref | Bậc | Tên tổ chức / Nguồn | Giấy phép | Ghi chú sử dụng |
|---|---|---|---|---|
| `bank-of-england` | B | Bank of England | all-rights-reserved | Nguồn định nghĩa cho các khái niệm kinh tế vĩ mô và tiền tệ |
| `ifrs-org` | A | IFRS Foundation | all-rights-reserved | Nguồn chuẩn mực định nghĩa IFRS |
| `cornell-wex` | B | Legal Information Institute (Cornell Law School) | all-rights-reserved | Nguồn định nghĩa kế toán kép và kế toán dồn tích |
| `gov-uk` | B | GOV.UK | all-rights-reserved | Nguồn quy chuẩn định nghĩa cơ chế thuế giá trị gia tăng (VAT) |
| `nber` | B | National Bureau of Economic Research | all-rights-reserved | Nguồn thẩm quyền định nghĩa chu kỳ kinh tế và suy thoái |
| `ecb` | B | European Central Bank | all-rights-reserved | Nguồn chuẩn ngân hàng trung ương cho tỷ giá hối đoái |
| `cafef` | D | CafeF (VCCorp) | all-rights-reserved | Bằng chứng nhãn tiếng Việt cho `policy-rate` ("Lãi suất điều hành") |
| `tapchikinhtetaichinh` | D | Tạp chí Kinh tế và Tài chính | all-rights-reserved | Bằng chứng nhãn tiếng Việt cho `accrual-accounting` ("Kế toán dồn tích") |

Tất cả các locator URL (cả định nghĩa và bằng chứng nhãn) đều đã được gửi HTTP request thực tế xác thực thành công mã phản hồi HTTP 200 và nội dung trang phản ánh chính xác thuật ngữ. Văn bản thuần trích xuất từ 27 trang định nghĩa nguồn đã được lưu trữ đầy đủ tại `candidates/.sources/<ref>/<concept-id>.txt` để phục vụ công tác kiểm tra trùng lặp bản quyền.

## Kết quả kiểm tra chất lượng (Quality Gates)

Tất cả các cổng kiểm thử và kiểm tra tính toàn vẹn bắt buộc đều đạt kết quả 100% sạch:

| Lệnh cổng kiểm tra | Kết quả dòng cuối | Trạng thái |
|---|---|---|
| `pnpm tb validate --strict` | `✔ Validation passed successfully!` | Đạt (0 errors, 0 warnings trên toàn bộ 58 concepts) |
| `pnpm tb build` | `✔ Successfully generated 22 index files and 335 dist artifacts:` | Đạt (chỉ mục và dist artifacts đồng bộ tuyệt đối) |
| `pnpm tb report collisions` | `✔ mọi homonym đều có qualifier và confusable hai chiều` | Đạt (tất cả homonym có qualifier và liên kết đầy đủ) |
| `pnpm tb check overlap` | `✔ Không có đoạn trùng ≥ 8 từ / no copied runs of 8+ words` | Đạt (không trùng lặp cụm từ ≥ 8 từ với nguồn) |
| `pnpm tb check overlap --size 6` | `✔ Không có đoạn trùng ≥ 6 từ / no copied runs of 6+ words` | Đạt (không trùng lặp cụm từ ≥ 6 từ với nguồn) |

## Vấn đề tồn đọng hoặc khái niệm chưa hoàn thành
Không có. Tất cả 27 khái niệm trong lô `finb` đều đã được khởi tạo, soạn thảo hoàn chỉnh, khớp định dạng vàng và vượt qua toàn bộ các kiểm thử nghiêm ngặt.
