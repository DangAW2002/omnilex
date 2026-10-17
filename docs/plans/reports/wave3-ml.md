# Báo cáo Wave 3, lô ml: Machine Learning và Trí tuệ nhân tạo (34 khái niệm)

Trạng thái: **hoàn thành bản thảo** (2026-10-17). Toàn bộ 34 khái niệm được tạo lập chính xác theo danh sách trong `candidates/wave3/ml.yaml`, giữ nguyên trạng thái `status: draft` và `provenance.drafted_by: ai` theo quy định nghiêm ngặt của dự án Termbridge.

## Danh sách khái niệm
| id | Nhãn en | Nhãn vi | Level | Nguồn A/B (definition) | Bằng chứng nhãn vi |
|---|---|---|---|---|---|
| `generative-ai` | Generative AI | Generative AI | 1 | google-ml-glossary (A) | từ mượn |
| `natural-language-processing` | Natural language processing (NLP) | Xử lý ngôn ngữ tự nhiên | 1 | google-ml-glossary (A) | wikipedia-vi |
| `computer-vision` | Computer vision | Thị giác máy tính | 1 | microsoft-learn (B) | wikipedia-vi |
| `speech-recognition` | Speech recognition | Nhận dạng tiếng nói | 2 | microsoft-learn (B) | wikipedia-vi |
| `ocr` | Optical character recognition (OCR) | Nhận dạng ký tự quang học (OCR) | 2 | microsoft-learn (B) | wikipedia-vi |
| `supervised-learning` | Supervised learning | Học có giám sát | 1 | google-ml-glossary (A) | wikipedia-vi |
| `unsupervised-learning` | Unsupervised learning | Học không giám sát | 1 | google-ml-glossary (A) | wikipedia-vi |
| `reinforcement-learning` | Reinforcement learning | Học tăng cường | 2 | google-ml-glossary (A) | wikipedia-vi |
| `rlhf` | Reinforcement learning from human feedback (RLHF) | Reinforcement learning from human feedback (RLHF) | 2 | google-ml-glossary (A) | từ mượn |
| `classification-ml` | Classification | Phân loại | 1 | google-ml-glossary (A) | wikipedia-vi |
| `regression-ml` | Regression | Hồi quy | 1 | google-ml-glossary (A) | wikipedia-vi |
| `clustering` | Clustering | Phân cụm | 1 | google-ml-glossary (A) | wikipedia-vi |
| `feature-engineering` | Feature engineering | Feature engineering | 2 | google-ml-glossary (A) | từ mượn |
| `precision-recall` | Precision and recall | Precision and recall | 2 | google-ml-glossary (A) | từ mượn |
| `f1-score` | F1 score | F1 score | 2 | google-ml-glossary (A) | từ mượn |
| `confusion-matrix` | Confusion matrix | Confusion matrix | 2 | google-ml-glossary (A) | từ mượn |
| `underfitting` | Underfitting | Underfitting | 1 | google-ml-glossary (A) | từ mượn |
| `regularization` | Regularization | Regularization | 2 | google-ml-glossary (A) | từ mượn |
| `cnn` | Convolutional neural network (CNN) | Mạng nơ-ron tích chập (CNN) | 2 | google-ml-glossary (A) | wikipedia-vi |
| `rnn` | Recurrent neural network (RNN) | Mạng nơ-ron hồi quy (RNN) | 2 | google-ml-glossary (A) | wikipedia-vi |
| `transfer-learning` | Transfer learning | Transfer learning | 2 | google-ml-glossary (A) | từ mượn |
| `foundation-model` | Foundation model | Foundation model | 2 | google-ml-glossary (A) | từ mượn |
| `open-weight-model` | Open-weight model | Open-weight model | 2 | stanford-hai (B) | từ mượn |
| `multimodal-model` | Multimodal model | Multimodal model | 2 | google-ml-glossary (A) | từ mượn |
| `diffusion-model` | Diffusion model | Diffusion model | 2 | google-cloud-docs (B) | từ mượn |
| `model-drift` | Model drift | Model drift | 2 | microsoft-learn (B) | từ mượn |
| `data-labeling` | Data labeling | Data labeling | 1 | aws-docs (B) | từ mượn |
| `synthetic-data` | Synthetic data | Synthetic data | 2 | aws-docs (B) | từ mượn |
| `semantic-search` | Semantic search | Semantic search | 2 | microsoft-learn (B) | từ mượn |
| `reranking` | Reranking | Reranking | 2 | microsoft-learn (B) | từ mượn |
| `chunking` | Chunking | Chunking | 2 | aws-docs (B) | từ mượn |
| `red-teaming` | Red teaming | Red teaming | 2 | microsoft-learn (B) | từ mượn |
| `ai-alignment` | AI alignment | AI alignment | 2 | nist-csrc (A) | từ mượn |
| `mlops` | MLOps | MLOps | 2 | aws-docs (B) | từ mượn |

Mọi khái niệm tuân thủ đầy đủ quy cách:
- `status: draft`, `provenance.drafted_by: ai`.
- Nội dung tiếng Anh: `translation: native`; tiếng Việt: `translation: translated`, `translated_from: en`, `translated_by: ai`, `translated_at: '2026-10-17'`.
- Mỗi locale có đúng 2 `plain_descriptions` độc nhất (không trùng lặp giữa các khái niệm), một câu `summary` súc tích, và 4 phần thân bài đầy đủ (`Easy explanation` / `Giải thích dễ hiểu`, `Details` / `Chi tiết`, `Technical definition` / `Định nghĩa chuyên ngành`, `Examples` / `Ví dụ`). Các số liệu trong ví dụ đều là số liệu giả định minh họa chặt chẽ và trùng khớp hoàn toàn giữa tiếng Anh và tiếng Việt.
- Quan hệ `confusable` được khai báo đối xứng hai chiều và có ghi chú `confusable_notes` đầy đủ ở cả hai locale:
  - `supervised-learning` ↔ `unsupervised-learning`
  - `classification-ml` ↔ `regression-ml`
  - `underfitting` ↔ `overfitting` (đã cập nhật đối xứng hai chiều vào khái niệm `overfitting` có sẵn)
  - `cnn` ↔ `rnn`
- Quyết định `autolink`:
  - `NLP`, `OCR`, `RLHF`, `RNN`: `autolink.aliases.<ACR>: always`.
  - `CNN`: `autolink.aliases.CNN: never` (tránh liên kết nhầm kênh truyền hình).
  - `RL`, `ASR`: `autolink.aliases.<ACR>: always`.
  - Các từ vựng chung dễ gây nhầm lẫn (`Classification`, `Regression`): thiết lập `autolink: { label: never }`.

## Nguồn mới trong `config/sources.yaml`
Bổ sung nguồn học thuật chuẩn bậc B ở cuối tệp dưới mục ghi chú `# wave3 ml`:
```yaml
# wave3 ml
stanford-hai:
  title: Stanford HAI (Human-Centered Artificial Intelligence)
  publisher: Stanford University
  url: https://hai.stanford.edu
  type: docs
  tier: B
  languages: [en]
  license: all-rights-reserved
  reuse: paraphrase-only
  domains: [it/ai-ml]
  verified_license_at: "2026-10-17"
```

Mọi URL nguồn định nghĩa và bằng chứng nhãn tiếng Việt đều đã được tải thực tế và kiểm tra trả về HTTP 200:
- `google-ml-glossary` (Tier A): 20 khái niệm
- `nist-csrc` (Tier A): `ai-alignment`
- `microsoft-learn` (Tier B): `computer-vision`, `speech-recognition`, `ocr`, `model-drift`, `semantic-search`, `reranking`, `red-teaming`
- `aws-docs` (Tier B): `data-labeling`, `synthetic-data`, `chunking`, `mlops`
- `google-cloud-docs` (Tier B): `diffusion-model`
- `stanford-hai` (Tier B): `open-weight-model`
- Bằng chứng nhãn tiếng Việt `wikipedia-vi` (Tier C): 11 khái niệm có thuật ngữ tiếng Việt chuẩn (`natural-language-processing`, `computer-vision`, `speech-recognition`, `ocr`, `supervised-learning`, `unsupervised-learning`, `reinforcement-learning`, `classification-ml`, `regression-ml`, `clustering`, `cnn`, `rnn`).

Văn bản nguồn của toàn bộ 34 khái niệm đã được lưu vào thư mục git-ignored `candidates/.sources/<ref>/<concept-id>.txt` phục vụ kiểm tra sao chép.

## Kết quả kiểm tra chất lượng (Gates)
| Lệnh kiểm tra | Dòng kết quả cuối cùng |
|---|---|
| `pnpm tb validate --strict` | `✔ Validation passed successfully!` |
| `pnpm tb build` | `✔ Successfully generated 22 index files and 1407 dist artifacts:` |
| `pnpm tb report collisions` | `✔ mọi homonym đều có qualifier và confusable hai chiều` |
| `pnpm tb check overlap` | `✔ Không có đoạn trùng ≥ 8 từ / no copied runs of 8+ words` |
| `pnpm tb check overlap --size 6` | `✔ Không có đoạn trùng ≥ 6 từ trong lô ml / no copied runs of 6+ words in batch ml` |

## Khái niệm chưa hoàn thành
Không có. Toàn bộ 34/34 khái niệm trong `candidates/wave3/ml.yaml` đều đã được soạn thảo hoàn chỉnh, đáp ứng 100% các tiêu chí và vượt qua tất cả các cổng kiểm tra nghiêm ngặt.
