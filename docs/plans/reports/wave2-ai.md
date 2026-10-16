# Báo cáo Wave 2, lô ai: Trí tuệ nhân tạo và Học máy (30 khái niệm)

Trạng thái: **hoàn thành bản thảo** (2026-10-16). Toàn bộ 30 khái niệm được tạo lập chính xác theo danh sách trong `candidates/wave2/ai.yaml`, giữ nguyên trạng thái `status: draft` và `provenance.drafted_by: ai` theo quy định nghiêm ngặt của dự án.

## Danh sách khái niệm
| id | Nhãn en | Nhãn vi | Level | Nguồn A/B (definition) | Bằng chứng nhãn vi |
|---|---|---|---|---|---|
| `ml-model` | Model (AI) | Model (AI) | 1 | google-ml-glossary (A) | từ mượn |
| `machine-learning` | Machine learning | Học máy | 1 | google-ml-glossary (A) | wikipedia-vi |
| `model-training` | Training (AI) | Training (AI) | 1 | google-ml-glossary (A) | từ mượn |
| `inference` | Inference (AI) | Inference (AI) | 1 | google-ml-glossary (A) | từ mượn |
| `dataset` | Dataset | Tập dữ liệu | 1 | google-ml-glossary (A) | wikipedia-vi |
| `overfitting` | Overfitting | Quá khớp | 1 | google-ml-glossary (A) | wikipedia-vi |
| `neural-network` | Neural network | Mạng nơ-ron | 1 | google-ml-glossary (A) | wikipedia-vi |
| `deep-learning` | Deep learning | Học sâu | 1 | google-cloud-docs (B) | wikipedia-vi |
| `transformer` | Transformer (AI) | Transformer (AI) | 2 | google-ml-glossary (A) | từ mượn |
| `attention-mechanism` | Attention mechanism | Attention mechanism | 2 | google-ml-glossary (A) | từ mượn |
| `gradient-descent` | Gradient descent | Gradient descent | 2 | google-ml-glossary (A) | từ mượn |
| `loss-function` | Loss function | Hàm mất mát | 2 | google-ml-glossary (A) | wikipedia-vi |
| `hyperparameter` | Hyperparameter | Siêu tham số | 2 | google-ml-glossary (A) | wikipedia-vi |
| `epoch-ml` | Epoch (AI) | Epoch (AI) | 2 | google-ml-glossary (A) | từ mượn |
| `batch-size` | Batch size | Batch size | 2 | google-ml-glossary (A) | từ mượn |
| `model-parameter` | Parameter (AI) | Parameter (AI) | 2 | google-ml-glossary (A) | từ mượn |
| `quantization` | Quantization (AI) | Lượng tử hóa (AI) | 2 | google-ml-glossary (A) | wikipedia-vi |
| `ai-benchmark` | Benchmark (AI) | Benchmark (AI) | 2 | mlcommons (A) | từ mượn |
| `gpu` | Graphics Processing Unit (GPU) | Bộ xử lý đồ họa (GPU) | 1 | aws-docs (B) | wikipedia-vi |
| `temperature-llm` | Temperature (AI) | Temperature (AI) | 2 | google-ml-glossary (A) | từ mượn |
| `top-p-sampling` | Top-p sampling | Top-p sampling | 2 | anthropic-docs (B) | từ mượn |
| `ai-agent` | Agent (AI) | Agent (AI) | 1 | google-ml-glossary (A) | từ mượn |
| `subagent` | Subagent | Subagent | 2 | google-ml-glossary (A) | từ mượn |
| `reasoning-model` | Reasoning model | Reasoning model | 2 | anthropic-docs (B) | từ mượn |
| `llm-eval` | Eval (AI) | Eval (AI) | 2 | google-ml-glossary (A) | từ mượn |
| `knowledge-distillation` | Distillation (AI) | Distillation (AI) | 2 | google-ml-glossary (A) | từ mượn |
| `grounding-ai` | Grounding (AI) | Grounding (AI) | 2 | google-ml-glossary (A) | từ mượn |
| `context-engineering` | Context engineering | Context engineering | 2 | anthropic-docs (B) | từ mượn |
| `image-classification` | Image classification | Image classification | 2 | microsoft-learn (B) | từ mượn |
| `object-detection` | Object detection | Object detection | 2 | microsoft-learn (B) | từ mượn |

Mọi khái niệm tuân thủ đầy đủ quy cách:
- `status: draft`, `provenance.drafted_by: ai`.
- Nội dung tiếng Anh: `translation: native`; tiếng Việt: `translation: translated`, `translated_from: en`, `translated_by: ai`, `translated_at: '2026-10-16'`.
- Mỗi locale có đúng 2 `plain_descriptions` độc nhất (không trùng lặp giữa các khái niệm), một câu `summary` súc tích, và 4 phần thân bài đầy đủ (`Easy explanation` / `Giải thích dễ hiểu`, `Details` / `Chi tiết`, `Technical definition` / `Định nghĩa chuyên ngành`, `Examples` / `Ví dụ`).
- Quan hệ `confusable` được khai báo đối xứng hai chiều và có ghi chú `confusable_notes` đầy đủ ở cả hai locale:
  - `machine-learning` ↔ `deep-learning`
  - `model-training` ↔ `inference`
  - `model-parameter` ↔ `hyperparameter`
  - `image-classification` ↔ `object-detection`
  - `temperature-llm` ↔ `top-p-sampling`
  - `ai-benchmark` ↔ `llm-eval`
- Quyết định `autolink`:
  - `GPU`: `autolink: { aliases: { GPU: always } }` theo chỉ dẫn viết tắt.
  - Các từ vựng chung dễ gây nhầm lẫn hoặc xuất hiện dày đặc (`Model`, `Training`, `Parameter`, `Temperature`, `Agent`): thiết lập `autolink: { label: never }`.

## Nguồn mới trong `config/sources.yaml`
Bổ sung một nguồn chuẩn bậc A ở cuối tệp dưới mục ghi chú `# wave2 ai`:
```yaml
# wave2 ai
mlcommons:
  title: MLCommons Standards & Benchmarks
  publisher: MLCommons Association
  url: https://mlcommons.org
  type: standard
  tier: A
  languages: [en]
  license: unknown
  reuse: paraphrase-only
  domains: [it/ai-ml]
  verified_license_at: "2026-10-16"
  license_evidence: https://mlcommons.org/benchmarks/
```

Mọi URL nguồn định nghĩa và bằng chứng nhãn tiếng Việt đều đã được tải và kiểm tra trả về HTTP 200 thực tế:
- `google-ml-glossary` (Tier A): 22 khái niệm
- `mlcommons` (Tier A): `ai-benchmark`
- `anthropic-docs` (Tier B): `top-p-sampling`, `reasoning-model`, `context-engineering`
- `google-cloud-docs` (Tier B): `deep-learning`
- `microsoft-learn` (Tier B): `image-classification`, `object-detection`
- `aws-docs` (Tier B): `gpu`
- Bằng chứng nhãn tiếng Việt `wikipedia-vi` (Tier C): 9 khái niệm có thuật ngữ tiếng Việt chuẩn mực (`machine-learning`, `dataset`, `overfitting`, `neural-network`, `deep-learning`, `loss-function`, `hyperparameter`, `quantization`, `gpu`).

Văn bản nguồn của toàn bộ 30 khái niệm đã được lưu vào thư mục git-ignored `candidates/.sources/<ref>/<concept-id>.txt` phục vụ kiểm tra sao chép.

## Kết quả kiểm tra chất lượng (Gates)
| Lệnh kiểm tra | Dòng kết quả cuối cùng |
|---|---|
| `pnpm tb validate --strict` | `✔ Validation passed successfully!` |
| `pnpm tb build` | `✔ Successfully generated 22 index files and 330 dist artifacts:` |
| `pnpm tb report collisions` | `✔ mọi homonym đều có qualifier và confusable hai chiều` |
| `pnpm tb check overlap` | `✔ Không có đoạn trùng ≥ 8 từ / no copied runs of 8+ words` |
| `pnpm tb check overlap --size 6` | `✔ Không có đoạn trùng ≥ 6 từ / no copied runs of 6+ words` |

## Khái niệm chưa hoàn thành
Không có. Toàn bộ 30/30 khái niệm trong `candidates/wave2/ai.yaml` đều đã được soạn thảo hoàn chỉnh, đáp ứng 100% các tiêu chí và vượt qua tất cả các cổng kiểm tra nghiêm ngặt.
