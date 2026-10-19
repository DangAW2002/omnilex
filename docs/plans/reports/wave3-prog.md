# Báo cáo Wave 3: Khái niệm Lập trình và Kỹ thuật Phần mềm (34 khái niệm)

Trạng thái: **hoàn tất bản thảo draft** (2026-10-17). Mọi khái niệm đều giữ đúng `status: draft` và `provenance.drafted_by: ai` theo nghiêm ngặt quy định AGENTS.md. Không thực hiện nâng trạng thái lên reviewed/verified.

## Danh sách khái niệm (34 khái niệm)

| id | Nhãn en | Nhãn vi | Level | Nguồn A/B (definition) | Bằng chứng nhãn vi |
|---|---|---|---|---|---|
| `variable` | Variable (Programming) | Variable (Lập trình) | 1 | mdn (B) | từ mượn |
| `function-programming` | Function (Programming) | Function (Lập trình) | 1 | mdn (B) | từ mượn |
| `class-oop` | Class (Programming) | Class (Lập trình) | 1 | mdn (B) | từ mượn |
| `object-oriented-programming` | Object-oriented programming (OOP) | Lập trình hướng đối tượng (OOP) | 1 | microsoft-learn (B) | wikipedia-vi |
| `functional-programming` | Functional programming | Lập trình hàm | 2 | microsoft-learn (B) | wikipedia-vi |
| `recursion` | Recursion | Đệ quy | 2 | mdn (B) | wikipedia-vi |
| `closure` | Closure (Programming) | Closure (Lập trình) | 2 | mdn (B) | từ mượn |
| `async-await` | Async/await | Async/await | 2 | mdn (B) | từ mượn |
| `promise` | Promise (Programming) | Promise (Lập trình) | 2 | mdn (B) | từ mượn |
| `callback` | Callback (Programming) | Callback (Lập trình) | 2 | mdn (B) | từ mượn |
| `thread-programming` | Thread (Programming) | Thread (Lập trình) | 2 | microsoft-learn (B) | từ mượn |
| `os-process` | Process (Operating system) | Process (Hệ điều hành) | 1 | microsoft-learn (B) | wikipedia-vi |
| `concurrency` | Concurrency | Concurrency | 2 | microsoft-learn (B) | từ mượn |
| `parallelism` | Parallelism (Computing) | Parallelism (Điện toán) | 2 | microsoft-learn (B) | từ mượn |
| `memory-leak` | Memory leak | Rò rỉ bộ nhớ | 2 | mdn (B) | wikipedia-vi |
| `garbage-collection` | Garbage collection | Thu gom rác | 2 | microsoft-learn (B) | wikipedia-vi |
| `compiler` | Compiler | Trình biên dịch | 1 | microsoft-learn (B) | wikipedia-vi |
| `interpreter` | Interpreter (Programming) | Trình thông dịch (Lập trình) | 1 | nist-csrc (A) | wikipedia-vi |
| `exception-handling` | Exception (Programming) | Exception (Lập trình) | 1 | microsoft-learn (B) | từ mượn |
| `stack-trace` | Stack trace | Stack trace | 2 | mdn (B) | từ mượn |
| `debugging` | Debugging | Debugging | 1 | microsoft-learn (B) | từ mượn |
| `breakpoint` | Breakpoint (Debugging) | Breakpoint (Gỡ lỗi) | 1 | microsoft-learn (B) | từ mượn |
| `regular-expression` | Regular expression (regex) | Biểu thức chính quy (regex) | 2 | mdn (B) | wikipedia-vi |
| `algorithm` | Algorithm | Thuật toán | 1 | nist-csrc (A) | wikipedia-vi |
| `data-structure` | Data structure | Cấu trúc dữ liệu | 1 | nist-dads (A) | wikipedia-vi |
| `big-o-notation` | Big O notation | Big O notation | 2 | nist-dads (A) | từ mượn |
| `hash-table` | Hash table | Bảng băm | 2 | microsoft-learn (B) | wikipedia-vi |
| `array` | Array (Programming) | Array (Lập trình) | 1 | mdn (B) | từ mượn |
| `stack-data-structure` | Stack (Data structure) | Stack (Cấu trúc dữ liệu) | 2 | microsoft-learn (B) | từ mượn |
| `binary-search` | Binary search | Tìm kiếm nhị phân | 1 | nist-dads (A) | wikipedia-vi |
| `null-reference` | Null reference | Null reference | 1 | microsoft-learn (B) | từ mượn |
| `immutability` | Immutability | Immutability | 2 | microsoft-learn (B) | từ mượn |
| `generics` | Generics (Programming) | Generics (Lập trình) | 2 | microsoft-learn (B) | từ mượn |
| `python` | Python (Programming language) | Python (Ngôn ngữ lập trình) | 1 | python-docs (A) | từ mượn |

Mọi khái niệm:
- Đặt `status: draft`, `provenance.drafted_by: ai`.
- Nội dung tiếng Anh tự viết (`translation: native`). Tiếng Việt dịch từ bản tiếng Anh (`translation: translated`, `translated_from: en`, `translated_by: ai`, `translated_at: '2026-10-17'`).
- Mỗi locale có đúng 2 `plain_descriptions` riêng biệt, không trùng lặp khái niệm khác.
- Đầy đủ 4 phần thân bài: Giải thích dễ hiểu, Chi tiết, Định nghĩa chuyên ngành, Ví dụ.
- Quan hệ phụ thuộc (prerequisites) tạo thành đồ thị có hướng không chu trình (DAG).
- Các cặp quan hệ đối xứng `confusable`:
  - `concurrency` ↔ `parallelism`
  - `compiler` ↔ `interpreter`
  - `thread-programming` ↔ `os-process`
  - `memory-leak` ↔ `garbage-collection`
  - `debugging` ↔ `breakpoint`
  - `array` ↔ `hash-table`
  - `object-oriented-programming` ↔ `functional-programming`
  Tất cả đều đối xứng hai chiều và có `confusable_notes` đầy đủ ở cả hai ngôn ngữ.
- Quyết định `autolink`:
  - `autolink.label: never` cho các từ thông dụng: `variable`, `function-programming`, `class-oop`, `promise`, `thread-programming`, `os-process`, `exception-handling`, `array`, `stack-data-structure` (và các bí danh tiếng Việt thông dụng như `Biến`, `Hàm`, `Lớp`, `Luồng`, `Tiến trình`, `Ngoại lệ`, `Mảng`, `Ngăn xếp`).
  - `autolink.aliases: always` cho các từ viết tắt chuyên ngành: `OOP` trong `object-oriented-programming`, `Regex`/`regex` trong `regular-expression`.

## Nguồn mới trong `config/sources.yaml`

Đã thêm 2 nguồn chuẩn mới ở cuối tệp `config/sources.yaml` dưới chú thích `# wave3 prog`:

```yaml
# wave3 prog
nist-dads:
  title: NIST Dictionary of Algorithms and Data Structures
  publisher: National Institute of Standards and Technology
  url: https://xlinux.nist.gov/dads/
  type: glossary
  tier: A
  languages: [en]
  license: public-domain-us-gov
  reuse: paraphrase-only
  domains: [it/software-engineering]
  verified_license_at: "2026-10-17"

python-docs:
  title: Python 3 Documentation
  publisher: Python Software Foundation
  url: https://docs.python.org/3/
  type: docs
  tier: A
  languages: [en]
  license: Python-2.0
  reuse: paraphrase-only
  domains: [it/software-engineering]
  verified_license_at: "2026-10-17"
```

Tất cả các URL nguồn và URL dẫn chứng nhãn tiếng Việt đều đã được kiểm tra thực tế qua HTTP request thật (đạt mã phản hồi HTTP 200). Toàn bộ nội dung trang nguồn đã được tải về và lưu vào `candidates/.sources/<ref>/<concept-id>.txt` phục vụ kiểm tra sao chép văn bản.

## Kết quả kiểm tra chất lượng (Quality Gates)

| Cổng kiểm tra | Dòng kết quả cuối cùng |
|---|---|
| `pnpm tb validate --strict` | `✔ Validation passed successfully!` (359 khái niệm, 0 lỗi, 0 cảnh báo) |
| `pnpm tb build` | `✔ Successfully generated 22 index files and 1407 dist artifacts:` |
| `pnpm tb report collisions` | `✔ mọi homonym đều có qualifier và confusable hai chiều` |
| `pnpm tb check overlap` | `✔ Không có đoạn trùng ≥ 8 từ / no copied runs of 8+ words` |
| `pnpm tb check overlap --size 6` | `✔ Không có đoạn trùng ≥ 6 từ / no copied runs of 6+ words` |

## Tình trạng hoàn thành khái niệm

- **Số lượng khái niệm hoàn thành**: 34/34 khái niệm.
- **Khái niệm không hoàn thành**: Không có (0 khái niệm). Toàn bộ 34 khái niệm trong danh sách ứng viên `candidates/wave3/prog.yaml` đều được soạn thảo hoàn chỉnh, đáp ứng toàn bộ các nguyên tắc thiết kế, chuẩn nguồn bậc A/B, kiểm soát trùng lặp văn bản và vượt qua tất cả các cổng kiểm tra nghiêm ngặt.
