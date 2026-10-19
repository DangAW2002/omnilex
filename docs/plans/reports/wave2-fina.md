# Báo cáo Wave 2, lô fina: Tài chính cá nhân, Ngân hàng và Đầu tư (27 khái niệm)

Trạng thái: **Hoàn thành biên soạn và vượt qua toàn bộ cổng kiểm thử** (2026-10-17). Mọi khái niệm đều ở `status: draft` với `provenance.drafted_by: ai`, tuân thủ nghiêm ngặt quy định không tự nâng cấp trạng thái.

## Danh sách khái niệm

| id | Nhãn en | Nhãn vi | Level | Nguồn A/B (định nghĩa) | Bằng chứng nhãn vi |
|---|---|---|---|---|---|
| `budget` | Budget (Personal finance) | Ngân sách (Tài chính cá nhân) | 1 | fdic (B) | wikipedia-vi |
| `savings-account` | Savings account | Tài khoản tiết kiệm | 1 | fdic (B) | wikipedia-vi |
| `emergency-fund` | Emergency fund | Quỹ khẩn cấp | 1 | investor-gov (B) | vnexpress |
| `overdraft` | Overdraft | Thấu chi | 1 | fdic (B) | wikipedia-vi |
| `personal-income-tax` | Personal income tax | Thuế thu nhập cá nhân | 1 | irs (B) | wikipedia-vi |
| `credit-card` | Credit card | Thẻ tín dụng | 1 | fdic (B) | wikipedia-vi |
| `credit-score` | Credit score | Điểm tín dụng | 1 | fdic (B) | wikipedia-vi |
| `mortgage` | Mortgage | Khoản vay thế chấp | 2 | fdic (B) | wikipedia-vi |
| `term-deposit` | Term deposit | Tiền gửi có kỳ hạn | 2 | investor-gov (B) | wikipedia-vi |
| `e-wallet` | Digital wallet | Ví điện tử | 1 | fdic (B) | wikipedia-vi |
| `bank-transfer` | Bank transfer | Chuyển khoản ngân hàng | 1 | federal-reserve (B) | wikipedia-vi |
| `insurance-premium` | Insurance premium | Phí bảo hiểm | 1 | healthcare-gov (B) | wikipedia-vi |
| `insurance-deductible` | Deductible (Insurance) | Mức khấu trừ (Bảo hiểm) | 2 | healthcare-gov (B) | wikipedia-vi |
| `stock` | Stock | Cổ phiếu | 1 | investor-gov (B) | wikipedia-vi |
| `stock-exchange` | Stock exchange | Sở giao dịch chứng khoán | 1 | investor-gov (B) | wikipedia-vi |
| `dividend` | Dividend | Cổ tức | 2 | investor-gov (B) | wikipedia-vi |
| `bond` | Bond | Trái phiếu | 1 | investor-gov (B) | wikipedia-vi |
| `bond-yield` | Yield (Finance) | Lợi suất (Tài chính) | 2 | investor-gov (B) | vietstock |
| `mutual-fund` | Mutual fund | Quỹ tương hỗ | 2 | investor-gov (B) | wikipedia-vi |
| `etf` | Exchange-Traded Fund (ETF) | Quỹ hoán đổi danh mục | 2 | investor-gov (B) | wikipedia-vi |
| `index-fund` | Index fund | Quỹ chỉ số | 2 | investor-gov (B) | wikipedia-vi |
| `diversification` | Diversification | Đa dạng hóa danh mục | 1 | investor-gov (B) | vietstock |
| `volatility` | Volatility (Finance) | Độ biến động (Tài chính) | 2 | investor-gov (B) | vietstock |
| `pe-ratio` | Price-to-earnings ratio (P/E) | Hệ số P/E | 2 | investor-gov (B) | wikipedia-vi |
| `market-capitalization` | Market capitalization | Vốn hóa thị trường | 2 | investor-gov (B) | wikipedia-vi |
| `blockchain` | Blockchain | Blockchain | 2 | nist-csrc (A) | từ mượn (kèm wikipedia-vi) |
| `cryptocurrency` | Cryptocurrency | Tiền mã hóa | 2 | nist-csrc (A) | wikipedia-vi |

Tất cả khái niệm:
- Đều có `status: draft` và `provenance: { drafted_by: ai }`.
- `en` được viết trực tiếp từ tài liệu định nghĩa chuẩn (`translation: native`). `vi` dịch từ `en` (`translation: translated`, `translated_from: en`, `translated_by: ai`, `translated_at: '2026-10-16'`).
- Mỗi ngôn ngữ đều có đúng 2 câu mô tả đời thường (`plain_descriptions`) không trùng lặp, câu tóm tắt (`summary`) súc tích, 4 mục nội dung chi tiết (Giải thích dễ hiểu, Chi tiết, Định nghĩa chuyên ngành, Ví dụ thực tế với bối cảnh Việt Nam: VND, HOSE, VN30, FPT, VCB, VNM) và 1-2 câu hỏi tiếp nối (`follow_up_questions`).
- Các quan hệ đối chiếu (`confusable`) được thiết lập hai chiều chặt chẽ kèm ghi chú phân biệt (`confusable_notes`): `stock` ↔ `bond`, `savings-account` ↔ `term-deposit`, `mutual-fund` ↔ `etf`. Đồ thị `prerequisites` hoàn toàn không có chu trình.
- Quyết định `autolink`:
  - `ETF`, `P/E`, `YTM`, `PIT`, `EFT`, `DLT`: `always` (từ viết tắt chuyên ngành);
  - `CD`: `never` (từ viết tắt đa nghĩa trong ngữ cảnh thông dụng);
  - Các từ đơn chung tiếng Anh và tiếng Việt (`budget`, `ngân sách`, `volatility`, `độ biến động`, `yield`, `lợi suất`): `label: never`.

## Các nguồn mới bổ sung trong `config/sources.yaml`

Tất cả các nguồn mới được thêm dưới phần `# wave2 fina` và thiết lập `reuse: paraphrase-only`:

| Mã ref | Bậc | Nhà xuất bản | Giấy phép | Ghi chú |
|---|---|---|---|---|
| `fdic` | B | Federal Deposit Insurance Corporation | `public-domain-us-gov` | Cung cấp định nghĩa chuẩn về ngân hàng và tài chính cá nhân |
| `healthcare-gov` | B | Centers for Medicare & Medicaid Services | `public-domain-us-gov` | Thuật ngữ bảo hiểm y tế và mức khấu trừ |
| `irs` | B | Internal Revenue Service | `public-domain-us-gov` | Thuật ngữ thuế thu nhập cá nhân |
| `federal-reserve` | B | Board of Governors of the Federal Reserve System | `public-domain-us-gov` | Thuật ngữ thanh toán và chuyển khoản ngân hàng |
| `vietstock` | D | Tai Viet Corporation | `community-terms` | Bằng chứng thuật ngữ tài chính tiếng Việt |
| `vnexpress` | D | FPT Online | `community-terms` | Bằng chứng thuật ngữ tiếng Việt (Quỹ khẩn cấp) |

*(Lưu ý: Nguồn `investor-gov` (SEC, Bậc B), `nist-csrc` (NIST, Bậc A) và `wikipedia-vi` (Bậc C) đã có sẵn từ trước trong `config/sources.yaml`).*

Toàn bộ URL của các nguồn định nghĩa và bằng chứng nhãn tiếng Việt đều đã được kiểm tra bằng request mạng thực tế (HTTP 200), lưu văn bản gốc đối chiếu vào `candidates/.sources/` và hoàn toàn loại trừ các URL lỗi chuyển hướng hoặc hết hạn.

## Kết quả các cổng kiểm thử (Gates)

| Cổng kiểm thử | Lệnh thực thi | Dòng kết quả cuối cùng | Trạng thái |
|---|---|---|---|
| **Cổng 1: Validate** | `pnpm tb validate --strict` | `✔ Validation passed successfully!` (58 concepts loaded, 0 errors, 0 warnings) | ĐẠT |
| **Cổng 2: Build** | `pnpm tb build` | `✔ Successfully generated 22 index files and 335 dist artifacts:` | ĐẠT |
| **Cổng 3: Collisions** | `pnpm tb report collisions` | `✔ mọi homonym đều có qualifier và confusable hai chiều` | ĐẠT |
| **Cổng 4: Overlap (8 từ)** | `pnpm tb check overlap` | `✔ Không có đoạn trùng ≥ 8 từ / no copied runs of 8+ words` | ĐẠT |
| **Cổng 5: Overlap chặt (6 từ)** | `pnpm tb check overlap --size 6` | `✔ Không có đoạn trùng ≥ 6 từ / no copied runs of 6+ words` | ĐẠT |

## Khái niệm chưa hoàn thành hoặc gặp trở ngại

Không có. Toàn bộ 27/27 khái niệm trong danh sách `candidates/wave2/fina.yaml` đã được hoàn thiện đầy đủ, chuẩn xác theo quy cách và đã vượt qua tất cả các kiểm tra kiểm định chất lượng nghiêm ngặt của hệ thống.
