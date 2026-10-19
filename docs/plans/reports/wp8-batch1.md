# Báo cáo WP8, lô 1: AI và mô hình ngôn ngữ (20 khái niệm)

Trạng thái: **đã duyệt và commit** (2026-10-16). Người dùng giao cho orchestrator tự chốt các điểm còn mở; quyết định ghi ở cuối báo cáo. Mọi khái niệm vẫn là `status: draft`: duyệt lô để commit không phải là nâng trạng thái.

## Danh sách
| id | Nhóm | Nhãn en | Nhãn vi | Level | Nguồn A/B (definition) | Bằng chứng nhãn vi |
|---|---|---|---|---|---|---|
| `llm` | llm-agents | Large Language Model (LLM) | Mô hình ngôn ngữ lớn | 1 | google-ml-glossary (A) | wikipedia-vi |
| `prompt` | llm-agents | Prompt | Prompt | 1 | google-ml-glossary (A) | từ mượn |
| `system-prompt` | llm-agents | System prompt | System prompt | 2 | anthropic-docs (B) | từ mượn |
| `context-window` | llm-agents | Context window | Cửa sổ ngữ cảnh | 1 | google-ml-glossary (A), anthropic-docs (B) | viblo |
| `hallucination` | llm-agents | Hallucination (AI) | Ảo giác (AI) | 1 | google-ml-glossary (A) | wikipedia-vi |
| `rag` | llm-agents | Retrieval-Augmented Generation (RAG) | như en | 2 | google-ml-glossary (A) | từ mượn |
| `function-calling` | llm-agents | Function calling | như en | 2 | anthropic-docs (B) | từ mượn |
| `mcp` | llm-agents | Model Context Protocol (MCP) | như en | 2 | mcp-spec (A) | từ mượn |
| `prompt-caching` | llm-agents | Prompt caching | như en | 3 | anthropic-docs (B) | từ mượn |
| `few-shot-prompting` | llm-agents | Few-shot prompting | như en | 2 | google-ml-glossary (A) | từ mượn |
| `chain-of-thought` | llm-agents | Chain-of-thought prompting | như en | 2 | google-ml-glossary (A) | từ mượn |
| `structured-output` | llm-agents | Structured output | như en | 2 | anthropic-docs (B) | từ mượn |
| `tokenizer` | nlp | Tokenizer | như en | 2 | google-ml-glossary (A) | từ mượn |
| `embedding` | nlp | Embedding | như en | 2 | google-ml-glossary (A) | từ mượn |
| `vector-database` | nlp | Vector database | Cơ sở dữ liệu vector | 2 | google-cloud-docs (B) | topdev |
| `fine-tuning` | mlops | Fine-tuning | như en | 2 | google-ml-glossary (A) | từ mượn |
| `lora` | mlops | Low-Rank Adaptation (LoRA) | như en | 3 | google-ml-glossary (A) | từ mượn |
| `prompt-injection` | ai-safety-governance | Prompt injection | như en | 2 | owasp (B) | từ mượn |
| `jailbreak` | ai-safety-governance | Jailbreak (AI) | như en | 2 | owasp (B), anthropic-docs (B) | từ mượn |
| `guardrail` | ai-safety-governance | Guardrail (AI) | như en | 2 | aws-docs (B) | từ mượn |

Mọi khái niệm:
- `status: draft`, `provenance.drafted_by: ai`.
- `en` viết từ nguồn (`translation: native`). `vi` dịch từ `en` (`translation: translated`, `translated_from: en`, `translated_by: ai`, `translated_at: 2026-10-16`), theo D9.
- Mỗi locale có 2 `plain_descriptions` và đủ 4 mục thân bài.
- Quan hệ: `rag` ↔ `fine-tuning` và `prompt-injection` ↔ `jailbreak` là `confusable` hai chiều, có `confusable_notes`. `jailbreak` có `broader: prompt-injection`, `lora` có `broader: fine-tuning`. Đồ thị prerequisites không có vòng.
- Quyết định `autolink`:
  - `LLM`, `RAG`, `MCP`, `LoRA`: `always`;
  - `Prompt`: `never`, vì từ này dày đặc trong câu trả lời về AI;
  - `CoT`: `never`, vì quá ngắn và mơ hồ.

## Nguồn mới trong `config/sources.yaml`
Tất cả đều là `reuse: paraphrase-only` (D10/D12):
| ref | Bậc | Giấy phép ghi nhận | Ghi chú |
|---|---|---|---|
| `google-ml-glossary` | A | CC BY 4.0 (footer của trang ghi rõ) | **Đề xuất `reuse: adapt`**: đúng điều kiện D12 (CC BY, áp cho văn bản của trang), nhưng cần `license_verified_by` của người duyệt |
| `anthropic-docs` | B | Không ghi giấy phép mở → `all-rights-reserved` | |
| `mcp-spec` | A | Không thấy tuyên bố giấy phép → `unknown` | |
| `topdev` | D | Điều khoản cộng đồng | Chỉ dùng làm bằng chứng nhãn |

Mọi URL nguồn và URL bằng chứng đều đã kiểm bằng request thật (HTTP 200), không đoán. Các anchor của Google ML Glossary lấy từ thuộc tính `id` trong HTML gốc. Tài liệu Anthropic dùng URL cuối cùng sau chuyển hướng (`platform.claude.com`). Bằng chứng nhãn tiếng Việt được kiểm là trang có chứa đúng cụm từ (Viblo 27 lần, TopDev 49 lần; có trang Wikipedia tiếng Việt cho "Mô hình ngôn ngữ lớn" và "Ảo giác (trí tuệ nhân tạo)").

## Kết quả kiểm tra
| Kiểm tra | Kết quả |
|---|---|
| **T-C1** `tb validate --strict` | `✔ Validation passed successfully!` (31 khái niệm, 0 cảnh báo) |
| **T-C2** `tb report collisions` | Lô này không tạo homonym mới. Nhóm cũ `margin`/`profit-margin` (chung khóa "margin") đã được thêm qualifier, xem quyết định 3. Hiện tại: `✔ mọi homonym đều có qualifier và confusable hai chiều` |
| **T-C3** | Script kiểm: 20/20 có ≥ 1 nguồn A/B với `supports: definition`; nhãn vi hoặc trùng en, hoặc có `label_evidence` (4 khái niệm) |
| **T-C4** | Mẫu ngẫu nhiên 20% với **seed 20261016** → `context-window`, `structured-output`, `llm`, `rag`. Đã đọc toàn văn theo checklist 2.5: đạt cả 4 (nhãn, mô tả đời thường, quyết định autolink, nguồn, bằng chứng nhãn, không chép). Không có homonym mới để soát 100%. Khi soát thêm ngoài mẫu đã sửa 1 lỗi nội dung: ví dụ của `prompt-caching` nói lần đầu "trả đủ giá", trong khi nguồn ghi phí ghi cache bằng 1,25 lần giá thường |
| **T-C5** `tb check overlap` | Lần đầu bắt được 2 đoạn trùng ≥ 8 từ (định nghĩa `context-window` giống Google, định nghĩa `mcp` giống tài liệu MCP). Ở ngưỡng chặt 6 từ còn thêm `fine-tuning`, `prompt`, `tokenizer`. Đã viết lại cả 5 định nghĩa ở hai locale và một summary. Hiện tại: `✔ no copied runs of 8+ words` và `✔ no copied runs of 6+ words`, so với 15 văn bản nguồn đã tải về |
| Cổng 5.3 | build, test (155/155), mod test (17/17), validate strict, site build (65 trang), `check:deterministic` (247 file), `bench:check` (1k) đều đạt |
| Tra ngược | `tb find "AI tự bịa ra thông tin"` → Ảo giác (AI); `tb find "cho AI tra tài liệu của mình"` → Retrieval-Augmented Generation |

Văn bản nguồn đã tải nằm trong `candidates/.sources/` (gitignore, vì có bản quyền), chỉ dùng cho T-C5.

## Review chéo (Gemini qua agy)
Một bản sao chỉ gồm nội dung của dự án (không gửi văn bản nguồn có bản quyền) được giao cho agy review độc lập: 17 OK, 3 MINOR. Orchestrator thẩm định từng mục:
| id | Nhận xét của agy | Xử lý |
|---|---|---|
| `embedding` | "vector dày" là dịch thô của *dense vector* | Nhận: đổi thành "vector đặc" (vi) |
| `lora` | summary "added to the model" gợi ý sai cơ chế; LoRA học ΔW = BA | Nhận: "low-rank matrices that represent the weight update" (en, vi) |
| `mcp` | Thiếu "2.0"; đề xuất "HTTP + SSE" | Nhận một phần: thêm JSON-RPC 2.0, stdio cho server cục bộ, HTTP cho server từ xa. **Không** ghi SSE vì đặc tả hiện hành đã thay transport HTTP+SSE bằng Streamable HTTP |

Sau khi sửa: `tb check overlap` sạch ở cả ngưỡng 8 và 6 từ; build, validate strict, 155/155 vitest, 17/17 test mod, site 65 trang, `check:deterministic` 247 file, `bench:check` 1k đều đạt.

## Quyết định (orchestrator chốt theo ủy quyền của người dùng)
1. **Lô 1: duyệt và commit.** 20 khái niệm, các nguồn mới, file sinh tự động và báo cáo này.
2. **`google-ml-glossary` vẫn ở `reuse: paraphrase-only`.** Trang ghi CC BY 4.0 nên đủ điều kiện `adapt`, nhưng D12 yêu cầu `license_verified_by` là một người duyệt đã tự kiểm. Agent không ghi handle của người khác cho việc người đó chưa trực tiếp làm. Mọi định nghĩa đều đã viết lại và qua kiểm trùng, nên giữ `paraphrase-only` không mất gì. Người duyệt có thể đổi sau bằng một commit một dòng.
3. **Thêm qualifier cho `margin`/`profit-margin`:** en `(Trading)` / `(Accounting)`, vi `(Chứng khoán)` / `(Kế toán)`. Ghi chú: báo cáo trước ghi hai khái niệm này là `reviewed`, nhưng thực tế cả hai đang ở `status: draft`, nên việc sửa nằm trong quyền của agent. Trạng thái không đổi.
