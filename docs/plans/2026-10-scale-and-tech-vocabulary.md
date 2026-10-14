# Kế hoạch: tra cứu nhanh khi mở rộng + bổ sung từ vựng công nghệ

Ngày lập: 2026-10-14 · Trạng thái: đã chốt quyết định, chờ triển khai

Hai mục tiêu:

1. **Tốc độ khi tăng quy mô**: tra cứu vẫn nhanh ở 1.000 → 10.000+ khái niệm. Embedding là một lớp tùy chọn, không phải điều kiện bắt buộc.
2. **Thêm vốn từ**: ưu tiên nhóm công nghệ (IT, AI, IoT, kỹ thuật phần mềm, DevOps, PM/PO).

Hai mục tiêu phụ thuộc nhau. Ở khoảng 500 khái niệm, lần dò đầu của mod đã mất khoảng 0,6 giây. Vì vậy pha P1–P2 của mục tiêu 1 phải xong trước đợt từ vựng thứ 2 (xem [Lộ trình](#lộ-trình-gộp)).

---

## Mục tiêu 1: tốc độ tra cứu khi tăng quy mô

### 1.1 Điểm nghẽn hiện tại (đã kiểm tra trong code)

| Chỗ | Vấn đề | Độ phức tạp |
|---|---|---|
| `register.js` `buildMatchers()` | Tạo 1 regex Unicode cho mỗi term; `concepts.find()` lồng bên trong | O(T·C) khi nạp |
| `register.js` `matchedConcepts()` / `termHits()` | Chạy lần lượt từng regex trên toàn văn bản | O(T·L) mỗi câu trả lời |
| `register.js` `forwardSpans()` | **Tạo lại regex ở mỗi lần gọi** và gọi `concepts.find()` cho mỗi kết quả khớp | Tệ hơn cả `termHits` |
| `register.js` `reverseHints()` | `normalize()` mọi `plain_description` ở mỗi lần gọi | O(C·D·L) |
| `register.js` `findConcepts()` | Quét tuyến tính, normalize lại tất cả các trường ở mỗi phím gõ | O(C·fields) |
| `register.js` `loadData()` | Nạp toàn bộ `concepts-*.json` (phần lớn trong ~58 MB ở 10k) ngay khi bắt đầu phiên | I/O + parse |
| `core/query.ts` `findConcepts()` | Tạo MiniSearch mới ở mỗi lệnh | O(C) mỗi truy vấn |
| `cli` `find`/`show` | `loadAll()` đọc + parse YAML/MD của mọi khái niệm trước khi tìm | I/O tăng tuyến tính theo C |
| `mcp/index.ts` | Gọi `loadAll()` một lần (tốt), nhưng vẫn dựng MiniSearch ở mỗi lần gọi tool | O(C) mỗi lần gọi |
| site `[locale]/index.astro` | Nhúng toàn bộ `search.json` vào HTML rồi `addAll` trên trình duyệt | HTML lớn, dựng chỉ mục chậm trên máy yếu |

### 1.2 Kiến trúc đích: tra cứu theo tầng, nhận biết khả năng của môi trường

Thay vì một đường tìm duy nhất, công cụ dò xem môi trường có gì rồi chọn tầng cao nhất dùng được. Các tầng thấp luôn có sẵn.

```
Tầng 0  Tra chính xác      Map<normalizedKey, conceptId[]>         luôn bật, O(1)
Tầng 1  Nhận diện xuôi     Trie theo token (một lượt quét)         luôn bật trong mod
Tầng 2  Tìm từ vựng        MiniSearch dựng sẵn khi build, chia shard  luôn bật trong CLI/MCP/site
Tầng 3  Tìm ngữ nghĩa      Vector embedding (int8) + kết hợp RRF    tùy chọn: chỉ khi có model
```

| Bề mặt | Tầng 0 | Tầng 1 | Tầng 2 | Tầng 3 |
|---|---|---|---|---|
| Mod Claude Code | ✔ | ✔ (hover/links/badges) | ✔ tra ngược trong pane (thay `findConcepts` tự viết) | ✘ mặc định (xem 1.6) |
| CLI `tb find` | ✔ | – | ✔ | ✔ nếu cấu hình provider |
| MCP | ✔ | – | ✔ (cache trong tiến trình) | ✔ nếu có provider; nếu không thì trả top-20 để LLM tự xếp hạng lại |
| Site | ✔ | – | ✔ (tải shard khi cần) | ✘ |

### 1.3 Chế độ và gói lĩnh vực (domain packs)

Người dùng chọn **lĩnh vực nào được nạp** và **dùng tầng nào**. Hai trục này độc lập.

**Gói lĩnh vực**: dữ liệu build ra được chia theo `locale × lĩnh vực gốc` (có thể chia thêm theo nhánh cấp 2 khi một gói > ~2.000 khái niệm).

```
dist/<locale>/manifest.json            # danh sách gói, số khái niệm, hash, schemaVersion, có embedding hay không
dist/<locale>/packs/<pack>/terms.json        # khóa nhận diện (nhỏ)
dist/<locale>/packs/<pack>/cards.json        # id, label, qualifier, summary, plain_descriptions (vừa)
dist/<locale>/packs/<pack>/search-index.json # MiniSearch.toJSON()
dist/<locale>/packs/<pack>/vectors.bin       # tùy chọn, int8, kèm vectors.meta.json (model, dim, ids)
dist/<locale>/concepts/<id>.json             # bài giải thích đầy đủ, tải lười
```

Gói nên bám theo nhánh taxonomy chứ không chỉ theo gốc, vì `it` sẽ rất lớn: `it/ai-ml`, `it/software-engineering`, `it/infrastructure`, `iot`, `product`, `finance`, `media`…

**Profile** (cấu hình chung cho mod/CLI/MCP, phân lớp theo phạm vi máy/workspace/project như mô tả ở [phần 3](#phần-3-phân-phối-phạm-vi-cấu-hình-importexport)):

| Profile | Nạp gì | Dùng khi |
|---|---|---|
| `lite` | Tầng 0–1, chỉ các gói đã chọn, không nạp bài giải thích | Mặc định cho mod, máy yếu |
| `standard` | + Tầng 2 | Mặc định cho CLI/MCP/site |
| `semantic` | + Tầng 3 nếu có vectors và provider; nếu không có thì **tự hạ** về `standard` và báo một lần | Người có model local/API |

Lệnh mod mới: `/termbridge packs it/ai-ml,product` · `/termbridge packs all` · `/termbridge profile lite|standard|semantic`.
CLI: `tb find "..." --pack it/ai-ml` (thay `--domain` theo kiểu chỉ lọc kết quả, vẫn giữ `--domain` làm alias), `tb find --semantic`.

**Lợi ích phụ: phân nghĩa.** Khi chỉ nạp `it`, chữ "token" chỉ còn `token-llm`/`token-auth` thay vì thêm `token-crypto`. Hiện mod bỏ qua mọi term có >1 khái niệm (`term.concepts.length === 1`). Với gói lĩnh vực và cách "bỏ phiếu theo ngữ cảnh" (1.4c), có thể autolink an toàn hơn.

### 1.4 Thiết kế chi tiết từng tầng

**a. Tầng 0: tra chính xác.** `Map` từ khóa đã normalize sang id, dựng khi nạp. Thay toàn bộ các lệnh `concepts.find(...)` bằng `conceptsById.get(...)`. Đây là việc nhỏ nhưng loại bỏ được một vòng O(C) lồng bên trong.

**b. Tầng 1: bộ nhận diện một lượt quét (thay vòng regex).**
- Tách văn bản thành token theo `\p{L}\p{N}` (cùng ranh giới với regex hiện tại), giữ offset gốc.
- Dựng trie trên **chuỗi token** đã hạ chữ thường theo NFC (giữ dấu tiếng Việt, khớp hành vi `i` hiện tại; không bỏ dấu ở đây để "lãi" không khớp "lai").
- Quét: tại mỗi vị trí token, đi xuống trie để tìm khớp dài nhất. Độ phức tạp O(L · độ sâu tối đa), không phụ thuộc số term.
- Term `exact-case` (từ viết tắt): lưu dạng gốc ở nút lá, sau khi khớp thì so lại với chuỗi gốc.
- Dùng chung một trie cho `matchedConcepts`, `termHits`, `forwardSpans`. Trie thứ hai trên `plain_descriptions` (đã bỏ dấu) cho `reverseHints`/`reverseSpans`, thay vòng `includes`.
- Cache kết quả theo `(requestId, hash văn bản)` để không quét lại khi chỉ đổi chế độ hiển thị.
- Đặt thuật toán trong `packages/core/src/matcher.ts` (có test). Mod **được phép import file tương đối**, nên `tb build` sinh mã JS thuần (không phụ thuộc Node) vào `packages/claude-mod/hooks/runtime/`, và `register.js` import trực tiếp: `matcher.js`, `resolver.js` (phần 3), `search-config.js`, `minisearch` bản ESM. Không cần bước bundle riêng.
- Tùy chọn: trie đã tuần tự hóa (`matcher-<pack>.json`) để bỏ bước dựng khi nạp. Chỉ làm nếu benchmark cho thấy bước dựng > 50 ms.

**c. Bỏ phiếu theo ngữ cảnh cho homonym (sau khi có Tầng 1).** Với term có nhiều khái niệm, đếm số khái niệm *không mơ hồ* đã khớp trong cùng câu trả lời theo từng lĩnh vực, rồi chọn khái niệm thuộc lĩnh vực có nhiều phiếu nhất nếu chênh lệch đủ rõ. Nếu không rõ thì giữ hành vi hiện tại (không autolink, nhưng vẫn hiện ở badge kèm qualifier).

**d. Tầng 2: chỉ mục từ vựng dựng sẵn.**
- `tb build` tạo MiniSearch theo từng gói với **cùng một cấu hình** (`fields`, `boost`, `processTerm`), xuất ra `search-index.json`. Đưa cấu hình vào `core/src/search-config.ts`, dùng chung cho CLI, MCP, site và mod.
- Nạp bằng `MiniSearch.loadJSON(json, options)`. Options phải giống hệt lúc dựng; ghi `schemaVersion` và hash cấu hình vào manifest, và dựng lại nếu không khớp.
- CLI `find`/`show` **không gọi `loadAll()` nữa**: chỉ đọc manifest + shard cần dùng + `dist/<locale>/concepts/<id>.json`. Nếu `dist` cũ hơn `concepts/` (so mtime/hash trong manifest) thì in cảnh báo và quay về đường cũ.
- MCP: cache chỉ mục theo `(locale, pack)` trong tiến trình. Theo dõi file manifest để nạp lại khi build lại.
- Mod: thay `findConcepts` tự viết bằng MiniSearch, tải lười khi mở pane lần đầu (import `minisearch` ESM từ `hooks/runtime/`).

**e. Tầng 3: embedding (tùy chọn, không bao giờ bắt buộc).**
- *Dùng ở đâu*: tra ngược ("mô tả bằng lời thường"), nơi từ vựng hay trượt (ví dụ "tiền lãi đẻ ra lãi" ↔ "lãi kép"). Không dùng cho nhận diện xuôi.
- *Nội dung được embed*: `label + qualifier + plain_descriptions + summary` theo từng locale. Mỗi khái niệm có một vector, và có thể thêm vector riêng cho từng `plain_description` để tăng recall.
- *Model*: cần model đa ngôn ngữ, có tiếng Việt. Mặc định đề xuất `multilingual-e5-small` (384 chiều) chạy local qua `@huggingface/transformers` (onnx, khoảng 120 MB, tải lần đầu). Có thể thay bằng provider HTTP: Ollama hoặc endpoint tương thích OpenAI. Provider khai báo trong cấu hình; `tb build --embed` chỉ chạy khi có provider.
- *Lưu trữ*: lượng tử hóa int8 kèm scale. Ở 10k khái niệm × 384 chiều ≈ 3,8 MB mỗi locale. `vectors.meta.json` ghi model id, số chiều và hash nội dung để phát hiện vector cũ.
- *Tìm*: brute-force cosine. 10k × 384 phép int8 mất vài ms, 100k khoảng vài chục ms, nên **chưa cần ANN** (HNSW). Chỉ cân nhắc khi > 200k.
- *Kết hợp*: Reciprocal Rank Fusion giữa top-k của Tầng 2 và Tầng 3, k=60, không cần chỉnh trọng số.
- *Khi không có embedding*: điều kiện quyết định là model của truy vấn phải **trùng** model trong `vectors.meta.json`. Nếu không trùng, không có, hoặc lỗi mạng thì bỏ qua Tầng 3 im lặng và chỉ log một lần.
- *Thay thế rẻ cho MCP*: khi không có embedding, tool `find` trả top-20 ứng viên (id, label, qualifier, summary) để chính LLM xếp hạng lại. Cách này về thực chất là semantic rerank mà không tốn hạ tầng.
- *Dùng phụ*: khi soạn khái niệm mới, `tb new` hoặc `tb validate` cảnh báo khi một khái niệm mới gần (cosine > 0,9) với khái niệm đã có. Cách này giúp chống trùng lặp khi thêm từ hàng loạt (Mục tiêu 2).

### 1.5 Site

- Bỏ việc nhúng `search.json` vào HTML. Trang tìm kiếm `fetch` `search-index.json` của gói đang chọn (mặc định: gói phổ biến, hoặc tất cả nếu tổng < 2.000) rồi `loadJSON`.
- Bộ lọc lĩnh vực trên UI cũng đóng vai trò chọn gói cần tải.
- Từ 10k khái niệm trở lên: xem xét chuyển trang khái niệm sang **một trang động phía client** đọc `dist/<locale>/concepts/<id>.json`, thay vì 200k trang tĩnh. Có thể giữ trang tĩnh cho các khái niệm `verified` để phục vụ SEO.

### 1.6 Mod và embedding

Hook của mod chạy trong Claude Code, nên không nên nạp model 100 MB+ ở đó. Mặc định mod chạy Tầng 0–2. Nếu sau này cần semantic trong pane, mod gọi sang tiến trình MCP/CLI qua lệnh thay vì tự tải model. Phần này để ngoài phạm vi kế hoạch.

### 1.7 Đo đạc và ngân sách hiệu năng

Biến phép đo thủ công đã làm thành công cụ cố định:

- `bench/generate.ts`: sinh N khái niệm giả theo tỷ lệ thực, khoảng 3,8 mẫu nhận diện mỗi khái niệm, có trộn tiếng Việt có dấu, từ viết tắt và homonym.
- `bench/run.ts`: đo nạp mod, dò lần đầu và các lần sau (câu không khớp, câu dài nhiều dòng có thuật ngữ), `tb find` lạnh/nóng, dựng/nạp chỉ mục site, dung lượng `dist`.
- Lệnh `pnpm bench --sizes 1000,10000`. CI chạy cỡ 1.000 và **fail nếu vượt ngân sách**.

| Chỉ số (10k khái niệm, profile `standard`, tất cả gói) | Hiện tại | Ngân sách |
|---|---|---|
| Mod: nạp dữ liệu khi bắt đầu phiên | (đo) | ≤ 300 ms |
| Mod: lần dò đầu, câu không khớp | ~13 s | ≤ 20 ms |
| Mod: lần dò sau | ~14 ms | ≤ 2 ms |
| `tb find` lệnh lạnh (tính cả đọc file) | > 0,79 s | ≤ 200 ms |
| MCP `find` nóng | ~0,79 s | ≤ 10 ms |
| Site: tải + nạp chỉ mục một gói 2k | – | ≤ 150 ms trên máy tầm trung |
| Dữ liệu mod nạp khi bắt đầu phiên (profile `lite`, 1 gói) | ~58 MB | ≤ 5 MB |

### 1.8 Pha thực hiện (Mục tiêu 1)

| Pha | Nội dung | Kết quả đầu ra | Ước lượng |
|---|---|---|---|
| **P0** | Bộ benchmark + ngân sách trong CI | `bench/`, số liệu nền | 1–2 ngày |
| **P1** Thắng nhanh, không đổi định dạng | `conceptsById` Map; cache regex trong `forwardSpans`; normalize sẵn `plain_descriptions` khi nạp; MCP cache MiniSearch; CLI `find` đọc `dist/<locale>/search.json` thay vì `loadAll()`; tải lười bài giải thích trong mod | Lần dò sau nhanh hơn rõ rệt; `tb find` nhanh hơn 2–5 lần | 2–3 ngày |
| **P2** Bộ nhận diện trie | `core/matcher.ts` + test (ranh giới từ, tiếng Việt có dấu, exact-case, khớp dài nhất, chồng lấn); phát hành vào mod; trie cho tra ngược | Dò lần đầu ≤ 20 ms ở 10k | 3–4 ngày |
| **P3** Định dạng gói + chỉ mục dựng sẵn | `search-config.ts` dùng chung; builder xuất gói theo định dạng ở 3.2 (manifest, tier, hash); CLI/MCP/site/mod nạp qua `loadJSON`; kiểm tra dữ liệu cũ | `tb find` lạnh ≤ 200 ms | 4–5 ngày |
| **P4** Resolver + phạm vi cấu hình + kho gói | Phần 3.3–3.5: cấu hình phân lớp, kho dùng chung, lockfile, ngân sách tài nguyên; lệnh `tb pack add/remove/list/status`; `/termbridge packs`, `profile`; site tải gói khi cần; bỏ phiếu ngữ cảnh cho homonym | Mỗi project chọn được gói và tài nguyên riêng | 5–6 ngày |
| **P4b** Import/export + gói local + overlay | Phần 3.6–3.7: `tb pack export/import`, CSV/TBX, thuật ngữ riêng của project, file ghi đè | Nhóm chia sẻ và tùy biến thuật ngữ mà không fork | 4–5 ngày |
| **P5** Tầng ngữ nghĩa | Interface provider (local onnx / HTTP); `tb build --embed`; `vectors.bin`; RRF; tự hạ cấp; cảnh báo trùng khi soạn | `tb find --semantic`, MCP hybrid | 4–6 ngày |
| **P6** Site ở quy mô lớn | Trang khái niệm động, chỉ giữ trang tĩnh cho khái niệm `verified` | Thời gian build site gần như không đổi theo C | khi C > 5k |

Mỗi pha kết thúc với `pnpm test`, `pnpm tb validate --strict`, `pnpm tb build` và benchmark không vượt ngân sách.

---

## Mục tiêu 2: bổ sung từ vựng công nghệ

### 2.1 Mở rộng taxonomy (làm trước khi thêm từ)

Taxonomy `it.yaml` hiện có các nhánh software-engineering, web, data, ai-ml, infrastructure, security. Đề xuất bổ sung:

```
it/software-engineering
  + version-control      (Git, branch, PR)
  + practices            (code review, refactor, tech debt)
  devops                 → tách thành nhánh it/devops riêng:
it/devops                (mới, cấp 2)
  ci-cd · containers · observability · sre-operations · iac
it/ai-ml
  foundations · llm-agents
  + mlops                (training pipeline, model registry, eval)
  + nlp · computer-vision
  + ai-safety-governance
iot                      (gốc mới)
  devices-sensors · connectivity-protocols · edge-cloud · industrial (PLC, SCADA)
product                  (gốc mới: Sản phẩm & quản lý dự án, cho PM/PO)
  product-management · agile-scrum · delivery-planning · metrics (OKR, KPI)
```

Lý do tách `iot` và `product` thành gốc riêng: chúng sẽ thành **gói lĩnh vực độc lập** (người dùng PM không cần nạp cả `it`), và từ vựng PM/PO cũng được dùng ngoài ngành IT. Cần thêm `iot`/`product` vào `config/domains.yaml` và `config/reviewers.yaml`.

> Lưu ý: ID khái niệm là bất biến, còn đường dẫn domain thì đổi được. Chuyển `it/software-engineering/devops` sang `it/devops/...` không vi phạm quy tắc, nhưng phải cập nhật các khái niệm đang trỏ tới đường dẫn cũ (hiện chưa có khái niệm nào).

### 2.2 Thay đổi schema/builder cần có cho từ vựng công nghệ

Từ vựng công nghệ có hai đặc điểm làm quy tắc autolink hiện tại hoạt động kém:

1. **Nhiều từ viết tắt 2–3 ký tự**: API, PR, CI, MCP, RAG, SLA, KPI, OKR, MVP, IoT, JWT. Builder hiện đặt `autolink: label.length > 3`, nên **tất cả các từ này không được autolink**.
2. **Nhiều từ tiếng Anh rất phổ thông**: model, image, branch, release, commit, node, agent, pipeline, container. Nếu autolink mọi lần xuất hiện, câu trả lời của Claude sẽ bị gạch chân dày đặc.

Đề xuất thêm vào frontmatter locale (`<locale>.md`) một trường tùy chọn:

```yaml
autolink:            # mặc định: auto (giữ quy tắc hiện tại)
  label: always | never | auto
  aliases:
    MCP: always      # ghi đè cho từng alias
```

- `always` + `exact-case` cho từ viết tắt đã liệt kê (cho phép độ dài ≥ 2).
- `never` cho nhãn quá chung. Khái niệm vẫn tra được qua `tb find`, pane và tra chính xác, chỉ không bị gạch chân trong câu trả lời.
- Rule validator mới (cảnh báo): label/alias nằm trong danh sách từ phổ thông (`config/common-words.<locale>.txt`) mà không khai báo `autolink` rõ ràng.
- Cập nhật `schema/*.schema.json`, `docs/schema.md`, `skills/termbridge-author/SKILL.md`, builder, test.

### 2.3 Chọn từ dựa trên dữ liệu

Mod tác động trực tiếp lên câu trả lời của Claude Code, vì vậy nên ưu tiên **những từ thực sự xuất hiện trong các câu trả lời đó**:

- Script `tools/mine-candidates.ts` (chạy local, không gửi dữ liệu ra ngoài) đọc transcript `~/.claude/projects/**/*.jsonl` (chỉ phần text của assistant, bỏ code block), đếm n-gram 1–3 token và từ viết tắt viết hoa, lọc stopword, rồi so với các khái niệm đã có.
- Kết quả là `candidates/<domain>.yaml` (danh sách chờ, không phải khái niệm), xếp theo tần suất, có các cờ `homonym?` và `generic?`.
- Kết hợp danh sách thuật ngữ từ các nguồn trong danh mục nguồn (2.8): glossary Kubernetes/CNCF, NIST CSRC, Google ML Glossary, Scrum Guide, ISO/IEC 2382. Riêng danh sách tên thuật ngữ thì lấy được từ mọi nguồn, vì tên thuật ngữ không thuộc phạm vi bản quyền. Nội dung định nghĩa phải tuân theo quy tắc `reuse` của từng nguồn.
- Script chỉ chạy khi người dùng bật bằng `--opt-in`. Nó chỉ xuất **tên thuật ngữ và số lần xuất hiện**, không bao giờ xuất câu gốc. Mọi việc diễn ra trên máy, không gửi dữ liệu ra ngoài.

### 2.4 Danh sách hạt giống (đợt 1, khoảng 150 từ)

Danh sách gợi ý; thứ tự cuối cùng sẽ theo dữ liệu ở 2.3. Ký hiệu ⚠ đánh dấu homonym cần qualifier, ✱ đánh dấu từ viết tắt cần `autolink: always`.

**AI/ML: nền tảng (~20)**: model ⚠, training, inference, dataset, overfitting, embedding, vector database, neural network, transformer, attention, gradient descent, loss function, hyperparameter, epoch ⚠, batch size, fine-tuning, quantization, benchmark ⚠, parameter ⚠, GPU ✱.

**LLM & agent (~25)**: prompt, system prompt, context window, hallucination, RAG ✱, temperature ⚠, top-p, tool use / function calling, agent ⚠, subagent, MCP ✱, prompt caching, few-shot, chain-of-thought, reasoning model, guardrail, eval ⚠, tokenizer, LoRA ✱, distillation, grounding, structured output, jailbreak, prompt injection, context engineering.

**Kỹ thuật phần mềm & version control (~30)**: API ✱, SDK ✱, refactor, technical debt, unit test, integration test, end-to-end test, mock, regression ⚠, dependency, library, framework, race condition, idempotent, deprecation, linter, type checking, code review, pull request / PR ✱, merge conflict, branch ⚠, commit ⚠, rebase, monorepo, semantic versioning, breaking change, hotfix, feature flag, edge case, side effect.

**DevOps / cloud / SRE (~30)**: CI/CD ✱, pipeline ⚠, container ⚠, image ⚠, Kubernetes, pod, deployment ⚠, rollback, blue-green deployment, canary release, infrastructure as code, observability, log, metric ⚠, tracing, SLO / SLA / SLI ✱, incident, on-call, postmortem, load balancer, CDN ✱, serverless, environment variable, secret ⚠, staging, autoscaling, uptime, latency, throughput, rate limit.

**Web / backend / dữ liệu (~20)**: REST, endpoint, webhook, cache ⚠, index ⚠, migration ⚠, ORM ✱, transaction ⚠, pagination, queue, session ⚠, CORS ✱, JSON ✱, schema ⚠, ETL ✱, data pipeline, data warehouse, data lake, sharding, replication.

**Bảo mật (~10)**: OAuth, JWT ✱, 2FA/MFA ✱, SQL injection, XSS ✱, CSRF ✱, hashing, least privilege, CVE ✱, zero trust.

**IoT (~15)**: sensor, actuator, MQTT ✱, gateway ⚠, edge computing, firmware, OTA update ✱, digital twin, telemetry, BLE ✱, Zigbee, LoRaWAN, PLC ✱, SCADA, microcontroller.

**PM/PO (~25)**: backlog, sprint ⚠, user story, acceptance criteria, definition of done, MVP ✱, roadmap, stakeholder, OKR ✱, KPI ✱, velocity ⚠, story point, scrum, kanban, epic ⚠, retrospective, burndown chart, PRD ✱, prioritization (RICE, MoSCoW), product owner, scope creep, release ⚠, discovery, North Star metric, A/B test.

**Danh sách homonym cần quản lý trước** (dễ va chạm nhất khi thêm hàng loạt): model, pipeline, agent, container, image, branch, deployment, release, token (đã có 3 nghĩa), cache, session, epoch, index, node, gateway, transaction, schema, metric, sprint, epic, parameter, kernel, instance, shell, thread, port. Mỗi homonym cần qualifier trong vi và en, `confusable` hai chiều, và cập nhật `_homonyms.md` (tự động qua build).

### 2.5 Quy trình soạn hàng loạt

Tuân thủ `AGENTS.md` và `skills/termbridge-author/SKILL.md`. Các bước:

1. **Chốt danh sách đợt**: 20–30 khái niệm mỗi lô, cùng một nhánh taxonomy (để quan hệ `related`/`prerequisites` nhất quán).
2. **Chống trùng**: đối chiếu `indexes/<locale>/_all.md` và `_homonyms.md`; khi có Tầng 3 thì dùng cảnh báo cosine.
3. **Dựng khung**: `pnpm tb new <id> --domain ... --locales vi,en --drafted-by ai` cho từng khái niệm (có thể thêm `tb new --from candidates/<file>.yaml` để tạo cả lô).
4. **Soạn nội dung theo nguồn** (xem 2.8):
   - Tìm nguồn trước, ưu tiên tiếng Anh, bậc A/B.
   - Viết `en.md` từ nguồn theo đúng quy tắc `reuse`.
   - Agent dịch sang `vi.md` (`translation: translated`, `translated_from: en`, `translated_by: ai`).
   - Tìm bằng chứng cho nhãn tiếng Việt.
   - Luôn đặt `status: draft`, `provenance.drafted_by: ai`. Đây là việc lặp lại với khối lượng lớn, phù hợp để giao cho agent phụ theo lô. Người duyệt vẫn kiểm tra diff và chạy validate.
5. **Cổng chất lượng mỗi lô**: `pnpm tb validate --strict` và `pnpm tb build`, kèm checklist:
   - tiếng Việt: label theo cách dân IT Việt thực sự nói (nhiều từ giữ nguyên tiếng Anh, tức `label: Commit`, `loanwords: [commit]`, `aliases: [cam kết mã]` chỉ khi thực sự được dùng); theo `docs/style-guide.vi.md`;
   - ≥ 2 `plain_descriptions` viết bằng lời của người ngoài ngành (đây là nhiên liệu cho tra ngược);
   - có quyết định `autolink` cho từ viết tắt và từ phổ thông;
   - mỗi khái niệm có ≥ 1 nguồn có cấu trúc, ưu tiên bậc A/B; nhãn tiếng Việt có `label_evidence` hoặc là từ mượn giữ nguyên tiếng Anh;
   - không có đoạn văn nào chép từ nguồn `paraphrase-only`/`cite-only` (rule 16 ở 2.8).
6. **Duyệt**: chỉ người duyệt trong `config/reviewers.yaml` mới được nâng `status`. Nên duyệt theo mẫu ngẫu nhiên khoảng 20% mỗi lô, và duyệt kỹ 100% các homonym.

### 2.6 Công cụ hỗ trợ cần thêm

- `tb new --from <candidates.yaml>`: dựng khung cả lô.
- `tb report coverage --domain it`: số khái niệm theo nhánh, tỷ lệ vi/en, tỷ lệ draft/reviewed.
- `tb report collisions`: các label/alias trùng nhau giữa các khái niệm, và các term có nguy cơ autolink quá nhiều.
- Rule validator mới: `plain_descriptions` trùng nhau giữa các khái niệm (cảnh báo); từ viết tắt thiếu `autolink`; nhãn phổ thông thiếu quyết định `autolink`.

### 2.7 Mốc số lượng

| Mốc | Tổng khái niệm (≈) | Nội dung |
|---|---|---|
| Đợt 1 | ~160 | Khoảng 150 từ hạt giống ở 2.4, ưu tiên AI/LLM, kỹ thuật phần mềm, DevOps |
| Đợt 2 | ~450 | Mở rộng theo dữ liệu khai thác + IoT + PM/PO đầy đủ |
| Đợt 3 | ~1.000 | Phủ sâu từng nhánh; bắt đầu thêm `ja` nếu cần |

### 2.8 Nguồn dẫn chứng và metadata

Nội dung không được tự sinh mà không có căn cứ. Mỗi khái niệm phải truy được về nguồn. Nguồn có thể bằng bất kỳ ngôn ngữ nào, **ưu tiên tiếng Anh**. Agent viết bản `en` từ nguồn rồi dịch sang `vi` (và `ja` sau này), và mọi bước dịch đều được ghi lại.

#### a. Ràng buộc giấy phép (quan trọng)

Nội dung Termbridge dùng **CC BY 4.0** (`LICENSE-CONTENT`). Nguồn CC BY-SA, ví dụ Wikipedia, MDN, OWASP hay Scrum Guide, buộc tác phẩm phái sinh phải cũng là CC BY-SA, nên **không được chép hay phỏng theo sát**. Chỉ được lấy *sự kiện, khái niệm* rồi viết lại độc lập. Mỗi nguồn trong danh mục được gắn một mức `reuse`:

| `reuse` | Áp dụng cho | Được làm |
|---|---|---|
| `adapt` | CC0, CC BY 4.0, public domain (ví dụ tài liệu của chính phủ Mỹ), văn bản quy phạm pháp luật Việt Nam (không là đối tượng bảo hộ quyền tác giả) | Phỏng theo sát, kèm ghi công trong `attributions.json` |
| `paraphrase-only` | CC BY-SA, CC BY-NC, tài liệu của nhà cung cấp, nguồn chưa rõ giấy phép | Chỉ lấy ý, tự viết lại; trích nguyên văn tối đa 30 từ trong trường `quote` |
| `cite-only` | Tiêu chuẩn ISO/IEC/IEEE, PMBOK, sách và giáo trình có bản quyền | Chỉ dẫn chiếu; không có `quote` |

Khi không chắc về giấy phép, mặc định chọn `paraphrase-only`.

#### b. Danh mục nguồn: `config/sources.yaml`

Mỗi nguồn được khai báo một lần; khái niệm chỉ tham chiếu bằng `ref`. Nhờ vậy validator kiểm tra được và metadata không bị lặp.

```yaml
nist-csrc:
  title: NIST CSRC Glossary
  publisher: National Institute of Standards and Technology
  url: https://csrc.nist.gov/glossary
  type: glossary          # standard | spec | glossary | docs | textbook | paper | encyclopedia | law | community
  tier: A                 # A | B | C | D
  languages: [en]
  license: public-domain-us-gov
  reuse: adapt
  domains: [it/security]
  verified_license_at: 2026-10-14
```

**Bậc tin cậy**

| Bậc | Loại | Ví dụ khởi đầu (cần xác minh giấy phép khi đưa vào danh mục) |
|---|---|---|
| A | Tiêu chuẩn, đặc tả, glossary chính thức của tổ chức chuẩn hoặc dự án gốc | ISO/IEC 2382, ISO/IEC/IEEE 24765 (cite-only); NIST CSRC; IETF RFC, W3C, OASIS MQTT (paraphrase-only); Kubernetes Glossary, Google ML Glossary (adapt nếu đúng là CC BY 4.0); Scrum Guide (paraphrase-only) |
| B | Tài liệu chính thức của nhà cung cấp, giáo trình | Microsoft Learn, AWS/Google Cloud/Azure docs, MDN, Anthropic docs, OWASP, MITRE CWE, giáo trình đại học |
| C | Bách khoa, từ điển | Wikipedia (en/vi/ja), Wiktionary |
| D | Cộng đồng, chỉ để chứng minh cách dùng | Blog kỹ thuật, Viblo, báo công nghệ, Stack Overflow |

Nguồn cho **nhãn tiếng Việt**: Wikipedia tiếng Việt; bản tiếng Việt của tài liệu Microsoft/Google/AWS; văn bản pháp luật Việt Nam (ví dụ các luật về an ninh mạng, giao dịch điện tử); TCVN nếu có; giáo trình đại học; và nguồn bậc D để chứng minh cộng đồng thực sự dùng từ đó.

#### c. Metadata ở `concept.yaml` (cấp khái niệm)

```yaml
sources:
  - ref: nist-csrc
    locator: https://csrc.nist.gov/glossary/term/multifactor_authentication
    title: multifactor authentication
    language: en
    accessed: 2026-10-14
    retrieved_by: ai              # ai | human
    supports: [definition, summary, example]
    quote: "…"                    # tùy chọn; theo quy tắc reuse
    archive: https://web.archive.org/web/…   # tùy chọn
```

- `supports` cho biết nguồn chứng minh phần nào. Người duyệt dùng nó để kiểm tra đúng chỗ.
- **Tương thích ngược**: dạng chuỗi URL hiện nay vẫn hợp lệ. `tb validate --strict` cảnh báo dạng chuỗi, còn `tb sources migrate` chuyển sang dạng có cấu trúc (`ref` suy ra từ domain của URL nếu có trong danh mục).

#### d. Metadata ở `<locale>.md` (cấp ngôn ngữ)

```yaml
translation: translated           # native | translated | machine (đã có)
translated_from: en
translated_by: ai                 # ai | human
translated_at: 2026-10-14
label_evidence:                   # bằng chứng nhãn này thực sự được dùng
  - ref: wikipedia-vi
    locator: https://vi.wikipedia.org/wiki/…
    accessed: 2026-10-14
  - ref: community
    locator: https://…
    note: cách gọi phổ biến trong cộng đồng dev Việt
sources: []                       # nguồn riêng cho locale (nếu có nguồn gốc tiếng Việt)
```

**Quy tắc "không tự chế thuật ngữ"**: nhãn tiếng Việt phải hoặc có `label_evidence`, hoặc trùng nhãn tiếng Anh (từ mượn, ví dụ `Commit`, `Deploy`). Nếu agent nghĩ ra một cách dịch chưa ai dùng, nó chỉ được đặt cách dịch đó vào `aliases`, kèm `coined: true`. Cách dịch tự đặt không bao giờ được dùng làm `label`.

#### e. Rule validator mới (đánh số tiếp sau 13 rule hiện có)

| Rule | Nội dung | Mức |
|---|---|---|
| 14 | `sources[].ref` có trong `config/sources.yaml`; có `locator`, `accessed`, `language` | error (strict) |
| 15 | Nhãn tiếng Việt không trùng nhãn tiếng Anh thì phải có `label_evidence` | warn → error từ đợt 2 |
| 16 | `quote` vượt 30 từ, hoặc có `quote` với nguồn `cite-only` | error |
| 17 | Bậc nguồn theo trạng thái: `draft` ≥ 1 nguồn (cảnh báo nếu chỉ có bậc C/D); `reviewed` ≥ 1 nguồn A/B có `supports: definition`; `verified` ≥ 2 nguồn độc lập, trong đó ≥ 1 nguồn bậc A | error |
| 18 | `translation: translated` thì phải có `translated_from` và `translated_by` | error |

Cập nhật kèm theo: `schema/*.schema.json`, `docs/schema.md`, `CONTRIBUTING.md`, `skills/termbridge-author/SKILL.md`, và câu "13 integrity rules" trong `AGENTS.md`.

#### f. Công cụ

- `tb sources list|add|check`: `check` kiểm tra link chết. Lệnh này cần mạng, nên chạy định kỳ trong CI (hằng tuần), không chạy trong `validate`.
- `tb ingest <source-id>`: adapter cho từng nguồn, đọc glossary rồi sinh `candidates/*.yaml` với metadata nguồn điền sẵn. Với nguồn `adapt`, adapter kèm cả định nghĩa gốc làm tư liệu. Với các nguồn khác, adapter chỉ lấy tên thuật ngữ và URL.
- **Đầu ra build**: `attributions.json` trong mỗi gói, `ATTRIBUTION.md` ở site. Trang khái niệm, `tb show` và MCP đều hiển thị nguồn (tiêu đề, nhà xuất bản, ngôn ngữ, ngày truy cập). Bản export TBX ánh xạ sang data category `source`.

---

## Phần 3: phân phối, phạm vi cấu hình, import/export

Mục đích: người dùng tải về có thể chọn **dữ liệu nào**, **tốn bao nhiêu tài nguyên** cho **từng máy, workspace hoặc project**, và chia sẻ hay nhập thuật ngữ mà không phải fork repo.

### 3.1 Nguyên tắc

1. **Gói chỉ chứa dữ liệu** (JSON/Markdown), không bao giờ chứa code. Vì vậy import gói từ nguồn khác vẫn an toàn.
2. `concepts/` vẫn là nguồn sự thật. Gói là sản phẩm build và tái tạo được.
3. **Một resolver duy nhất** (`core/src/resolver.ts`, xuất ra `hooks/runtime/resolver.js` cho mod) cho mod, CLI, MCP và site, để các bề mặt hành xử giống nhau.
4. **Chạy được offline**. Chỉ cần mạng khi cài gói mới.
5. **Không nhân bản dữ liệu** giữa các project: dùng một kho chung trên máy.

### 3.2 Định dạng gói

```
<pack-id>@<version>/
  pack.json
  <locale>/terms.json            # tier "terms": khóa nhận diện
  <locale>/cards.json            # tier "cards": label, qualifier, summary, plain_descriptions
  <locale>/search-index.json     # tier "search": MiniSearch.toJSON()
  <locale>/explanations.jsonl    # tier "explanations": bài giải thích, mỗi dòng 1 khái niệm
  <locale>/vectors.bin           # tier "vectors" (tùy chọn) + vectors.meta.json
```

```json
{
  "id": "it.ai-ml",
  "version": "0.3.0",
  "formatVersion": 1,
  "title": { "vi": "AI và học máy", "en": "AI and machine learning" },
  "domains": ["it/ai-ml"],
  "locales": ["vi", "en"],
  "requires": { "it.core": "^0.3" },
  "concepts": 412,
  "status": { "draft": 300, "reviewed": 100, "verified": 12 },
  "tiers": {
    "terms":        { "bytes": 41200,   "sha256": "…" },
    "cards":        { "bytes": 380000,  "sha256": "…" },
    "search":       { "bytes": 610000,  "sha256": "…" },
    "explanations": { "bytes": 2100000, "sha256": "…" },
    "vectors":      { "bytes": 316000,  "sha256": "…", "model": "multilingual-e5-small", "dim": 384 }
  },
  "license": "CC-BY-4.0",
  "attributions": "attributions.json",
  "source": { "repo": "…", "commit": "…" }
}
```

`attributions.json` liệt kê các nguồn có `reuse: adapt` mà gói đã dùng (xem 2.8). Giấy phép CC BY yêu cầu ghi công khi phân phối lại.

- **Mỗi khái niệm thuộc đúng một gói**, theo domain đầu tiên (domain chính). Các domain phụ được ghi vào `alsoIn` để bộ lọc theo lĩnh vực vẫn đúng khi cài cả hai gói.
- **Quan hệ khác gói**: nếu `related`/`prerequisites` trỏ tới khái niệm thuộc gói chưa cài, UI hiện "thuộc gói `X`, chưa cài" kèm lệnh cài.
- **Meta-pack**: gói chỉ có `requires`, ví dụ `tech` gồm `it.*`, `iot` và `product`, còn `starter` là khoảng 300 từ phổ biến nhất.
- **Cài từng phần theo tier**: có thể chỉ cài `terms` + `cards` (khoảng 10% dung lượng). Bài giải thích có thể `lazy` (tải khi mở) hoặc `remote` (lấy từ site khi có mạng).
- **Phân loại ID**: gói chính thức `it.ai-ml`, gói bên thứ ba `@org/name`, gói local `local.<tên>`.

### 3.3 Phạm vi cấu hình (phân lớp)

Thứ tự từ thấp đến cao; lớp sau ghi đè lớp trước:

| # | Lớp | Vị trí | Commit vào Git? |
|---|---|---|---|
| 1 | Mặc định | đi kèm bản cài | – |
| 2 | Người dùng | `~/.termbridge/config.yaml` (đổi được bằng `TERMBRIDGE_HOME`) | – |
| 3 | Workspace / project | mọi `.termbridge/config.yaml` tìm được khi đi ngược từ thư mục hiện tại lên, dừng ở file có `root: true` (giống `.editorconfig`). Monorepo đặt cấu hình chung ở gốc, project con ghi đè. | có |
| 4 | Cá nhân trong project | `.termbridge/config.local.yaml` | không (gitignore) |
| 5 | Phiên | `/termbridge packs …`, cờ `--pack`, biến `TERMBRIDGE_PACKS`; chỉ ghi file khi có `--save user\|project` | – |

```yaml
# .termbridge/config.yaml
root: false
locale: vi
fallbackLocales: [en]
profile: standard            # lite | standard | semantic
packs:
  - +tech                    # thêm (meta-pack)
  - -finance                 # bỏ gói kế thừa từ lớp dưới
  - local:./glossary         # gói local của project
tiers:
  explanations: lazy         # eager | lazy | remote | off
  vectors: auto              # auto | on | off
limits:
  memoryMB: 64
  diskMB: 200
autoInstall: prompt          # never | prompt | always
registries:
  - https://<site>/registry.json
overrides: ./overrides.yaml
```

Quy tắc gộp:
- Giá trị đơn (`locale`, `profile`, …): lớp cao hơn thắng.
- `packs`: cộng dồn theo thứ tự với `+`/`-`. Dùng `packsReset: true` để bỏ hết những gì kế thừa.
- `limits`: lấy giá trị **nhỏ hơn** giữa các lớp, để project không vượt giới hạn người dùng đã đặt cho máy.

`tb config explain` in ra cấu hình hiệu lực kèm nguồn của từng giá trị (giống `git config --show-origin`).

### 3.4 Kho gói dùng chung và lockfile

- **Kho**: `~/.termbridge/store/<pack-id>@<version>-<sha8>/`, chỉ đọc sau khi cài, dùng chung cho mọi project.
- **Lockfile** `.termbridge/lock.json` (commit vào Git): phiên bản, sha256 của từng tier và registry đã chọn. `tb pack install --frozen` trong CI bảo đảm cả nhóm dùng đúng một bộ dữ liệu.
- **Dọn dẹp**: `tb pack prune` xóa phiên bản không còn project nào tham chiếu. Danh sách project nằm trong `~/.termbridge/projects.json`.
- **Thiếu gói khi offline**: nạp những gói đang có, cảnh báo một lần, liệt kê các gói thiếu và lệnh cài.
- **Khi phát triển ngay trong repo này**: `.termbridge/config.yaml` ở gốc repo dùng `packs: [dev:./dist]`, trỏ thẳng tới kết quả `tb build`, nên không cần qua kho.

### 3.5 Ngân sách tài nguyên

Resolver tính chi phí từ `pack.json` (số byte của từng tier, bộ nhớ ước tính) trước khi nạp. Nếu vượt `limits`, nó hạ dần theo thứ tự:

1. tắt `vectors`;
2. chuyển `explanations` sang `lazy`, rồi `remote`;
3. chỉ nạp `search-index` khi có lần tìm đầu tiên;
4. bỏ các gói có ưu tiên thấp nhất (theo thứ tự trong `packs`).

Mỗi bước hạ cấp đều được báo. `tb pack status` và `/termbridge status` hiển thị từng gói: tier nào đang nạp, bao nhiêu MB, mất bao lâu. Thứ tự gói cũng dùng để phân xử homonym khi việc bỏ phiếu theo ngữ cảnh (1.4c) hòa nhau.

### 3.6 Import / export

**Quản lý gói**

```
tb pack add <spec> [--scope project|user] [--tiers terms,cards,search]
    spec: it.ai-ml@^0.3 | https://…/x.tbpack | ./x.tbpack | ./glossary-dir
tb pack remove | update | list | status | verify | prune
tb pack install [--frozen]       # cài theo lock.json
```

Mặc định `--scope project` nếu đang ở trong một project có `.termbridge/`, ngược lại là `user`.

**Export**

```
tb pack export --domain it/ai-ml --locales vi,en --tiers terms,cards,search -o ai-ml.tbpack
tb pack export --effective -o team.tbpack     # đúng bộ project đang dùng, gồm cả overlay
tb export --format csv|tbx|jsonl [--pack …] -o out
```

- `.tbpack` là file zip có `pack.json` ở gốc.
- **CSV**: mỗi dòng ứng với một cặp khái niệm × locale, để người không phải dev soạn trên bảng tính.
- **TBX** (TBX-Basic, ISO 30042): định dạng chuẩn ngành dịch thuật, dùng được với các công cụ CAT.
- **JSONL**: dùng cho pipeline ML/RAG.

**Import vào repo hoặc gói local**

```
tb import --from csv|tbx <file> --into concepts/              # đóng góp vào repo chính
tb import --from csv|tbx <file> --into .termbridge/glossary/   # thuật ngữ riêng của project
```

Import vào `concepts/` luôn tạo `status: draft`, `provenance.drafted_by: import`, đúng theo AGENTS.md. Sau đó chạy `tb validate --strict` như mọi khái niệm khác.

**An toàn khi import**
- Chỉ chấp nhận tên và đuôi file nằm trong danh sách cho phép.
- Từ chối đường dẫn `..`, symlink và file vượt giới hạn dung lượng.
- Kiểm tra sha256 với registry hoặc lockfile.
- Validate schema cho từng file JSON.
- Markdown chỉ được hiển thị dưới dạng văn bản, không render HTML thô.

### 3.7 Thuật ngữ riêng của project và overlay

**Glossary local**: `.termbridge/glossary/<id>/concept.yaml + vi.md + en.md`, cùng định dạng với repo chính.
- Resolver tự build vào `.termbridge/.cache/` (gitignore) khi hash thay đổi.
- Validator cảnh báo nếu ID trùng với khái niệm của gói đã cài.

**Overlay** (`.termbridge/overrides.yaml`) chỉ thay đổi cách nhận diện và hiển thị, không sửa nội dung giải thích, để nội dung gốc luôn có một nguồn chuẩn:

```yaml
concepts:
  model:     { autolink: never }
  token-llm: { aliases: { vi: ["+token AI"] } }
exclude: [cookie]       # ẩn khỏi project này
prefer:
  token: token-llm      # phân nghĩa homonym trong project
```

Muốn sửa nội dung thì đóng góp ngược lên repo chính. Lệnh `tb overlay propose` sinh bản nháp thay đổi cho `concepts/` từ overlay.

### 3.8 Mỗi bề mặt xác định project như thế nào

| Bề mặt | Cách tìm project | Ghi chú |
|---|---|---|
| CLI | thư mục hiện tại, đi ngược lên | – |
| MCP | `roots` do client MCP cung cấp; nếu không có thì dùng cwd của tiến trình hoặc `TERMBRIDGE_PROJECT` | Nạp lại khi `roots` đổi |
| Mod | thư mục nơi Claude Code được khởi động (thư mục làm việc của phiên), rồi đi ngược lên như CLI | Đã xác nhận mod lấy được; cấu hình được resolve một lần ở `session.start` |
| Site | không có project | Chọn gói trên UI, lưu ở `localStorage`; nút "Tải gói" dẫn tới export |

### 3.9 Phân phối

- **CI khi phát hành**: build tất cả gói chính thức, đưa lên GitHub Releases, rồi tạo `registry.json` (id, các phiên bản, url, sha256, dung lượng, `formatVersion`) trên site GitHub Pages hiện có.
- **Plugin mod chỉ đóng sẵn gói `starter`**, đủ để dùng offline ngay sau khi cài. Gói khác tải khi cần. Nhờ vậy dung lượng plugin không tăng theo kích thước repo, khác với hiện nay khi `data/` chứa toàn bộ.
- **Registry bên thứ ba** khai báo được trong cấu hình. Gói từ các nguồn này được đánh dấu "không chính thức".

### 3.10 Tương thích phiên bản

- `formatVersion` là số nguyên. Resolver đọc được bản N và N-1. Với bản mới hơn, resolver bỏ qua gói và báo "cần cập nhật Termbridge".
- Semver của gói:
  - **major**: đổi định dạng, hoặc chuyển khái niệm sang gói khác (gói cũ giữ stub `movedTo`);
  - **minor**: thêm khái niệm;
  - **patch**: sửa nội dung.
- ID khái niệm bất biến và khái niệm `deprecated` vẫn được giữ trong gói. Vì vậy overlay, lockfile và liên kết cũ không bị gãy.

---

## Lộ trình gộp

| Tuần | Mục tiêu 1 (tốc độ) | Mục tiêu 2 (từ vựng) |
|---|---|---|
| 1 | P0 benchmark, P1 thắng nhanh | Mở rộng taxonomy; schema `autolink` (2.2); **hạ tầng nguồn** (2.8: `config/sources.yaml` khoảng 20 nguồn đầu, schema `sources`/`label_evidence`, rule 14–18, `tb sources migrate` cho 11 khái niệm hiện có); script khai thác ứng viên |
| 2 | P2 bộ nhận diện trie | `tb ingest` cho 2–3 nguồn `adapt` (NIST, Kubernetes, Google ML); đợt 1, lô 1–3 (AI/LLM, kỹ thuật phần mềm) |
| 3 | P3 định dạng gói + chỉ mục dựng sẵn | Đợt 1, lô 4–6 (DevOps, web/dữ liệu, bảo mật) |
| 4 | P4 resolver + phạm vi cấu hình + kho gói + lockfile | Đợt 2 bắt đầu (IoT, PM/PO); duyệt đợt 1 |
| 5 | P4b import/export (tbpack, CSV, TBX) + glossary local + overlay; registry trên site | Đợt 2 tiếp tục; thử nhập CSV cho người soạn không phải dev |
| 6–7 | P5 tầng ngữ nghĩa (tùy chọn) | Đợt 2 tiếp tục; dùng cảnh báo trùng của P5 |
| sau | P6 khi C > 5k | Đợt 3 |

Ràng buộc thứ tự:
- **P2 phải xong trước khi tổng số khái niệm vượt ~400.**
- **2.2 (autolink) và 2.8 (nguồn) phải xong trước đợt 1.** Nếu không, các từ viết tắt và metadata nguồn của cả trăm khái niệm sẽ phải làm lại.

## Quyết định đã chốt (2026-10-14)

| # | Vấn đề | Quyết định | Lý do |
|---|---|---|---|
| D1 | Vị trí PM/PO và IoT | **Gốc riêng**: `product` và `iot`. Thêm vào `config/domains.yaml` và `config/reviewers.yaml` | Thành gói độc lập; người làm PM không phải nạp cả `it`; từ vựng PM/PO cũng dùng ngoài ngành IT |
| D2 | Provider embedding | **Interface chung, hai provider**: local onnx (`multilingual-e5-small`, mặc định) và HTTP (Ollama hoặc endpoint tương thích OpenAI). Tầng 3 luôn là tùy chọn | Local thì không tốn phí và chạy được offline sau lần tải đầu; HTTP dành cho ai đã có hạ tầng. Không bắt buộc ai phải có model |
| D3 | Profile mặc định của mod | **`standard` với mọi gói đã cài** khi tổng < 2.000 khái niệm; từ 2.000 trở lên, phiên đầu tiên hiện thông báo gợi ý chọn gói, và trong lúc chờ thì chỉ nạp `starter` | Dưới 2.000 khái niệm, sau P2/P3 chi phí đủ nhỏ để không cần hỏi |
| D4 | Khai thác transcript local | **Có, nhưng phải bật bằng `--opt-in`**; chỉ chạy trên máy; chỉ xuất tên thuật ngữ và số lần xuất hiện, không bao giờ xuất câu gốc; `candidates/` không chứa dữ liệu cá nhân | Lấy được tín hiệu ưu tiên từ dữ liệu thật mà không làm lộ nội dung hội thoại |
| D5 | Mức chia gói | **Theo nhánh cấp 2** (`it.ai-ml`, `it.devops`, `it.software-engineering`, `iot`, `product`, `finance.*`, …) **cộng meta-pack theo gốc** (`it`, `tech`, `finance`). Một gói vượt 2.000 khái niệm thì tách xuống cấp 3 | Cấp gốc quá thô (`it` sẽ rất lớn); cấp 3 quá vụn |
| D6 | Gói `starter` | **Khoảng 300 từ phổ biến nhất** trên mọi lĩnh vực (xếp hạng theo dữ liệu ở 2.3 và mức độ cơ bản `level: 1`), gồm các tier `terms`, `cards`, `search`; giới hạn 1 MB; ưu tiên khái niệm có nguồn bậc A/B | Đủ dùng offline ngay sau khi cài; plugin nhẹ |
| D7 | Phạm vi mặc định của `tb pack add` | **Project** nếu đi ngược lên tìm thấy `.termbridge/`, ngược lại là **người dùng**; luôn in ra đã ghi vào file nào | Giống cách `npm`/`git` chọn phạm vi; không bất ngờ |
| D8 | Mod import file | **Được phép**; `hooks/runtime/` chứa JS thuần do build sinh ra | Đã xác nhận |
| D9 | Ngôn ngữ nguồn | **Nguồn đa ngôn ngữ, ưu tiên tiếng Anh**; agent viết `en` từ nguồn rồi dịch sang `vi`, ghi `translated_from`/`translated_by`; nhãn tiếng Việt phải có bằng chứng sử dụng | Nguồn tiếng Anh đầy đủ và chuẩn nhất; agent dịch tốt; nhãn tự chế làm sai lệch thuật ngữ |
| D10 | Giấy phép khi lấy nội dung | **Theo mức `reuse` của từng nguồn** (2.8a); mặc định `paraphrase-only` khi chưa rõ | Nội dung Termbridge là CC BY 4.0, không tương thích với việc phỏng theo sát nguồn CC BY-SA |

| D11 | Cách mod biết project | **Dùng thư mục nơi Claude Code được khởi động**, đi ngược lên tìm `.termbridge/` như CLI | Đã xác nhận mod lấy được thông tin này |
| D12 | Xác minh giấy phép nguồn | Mọi mục trong `config/sources.yaml` phải có `license`, `license_evidence` (URL trang giấy phép), `verified_license_at` và `reuse`. Agent chỉ được **đề xuất** `reuse: adapt` khi trang giấy phép ghi rõ CC0, CC BY hoặc public domain **và áp dụng cho đúng phần nội dung được dùng** (không phải chỉ cho code hay một mục khác). Mục `adapt` phải có `license_verified_by` là người duyệt trong `config/reviewers.yaml` thì `tb ingest` mới được dùng văn bản gốc. Còn thiếu bất kỳ điều kiện nào thì mặc định `paraphrase-only` | `adapt` cho phép phỏng theo sát văn bản, nên rủi ro pháp lý nằm ở đây. Chỉ có một điểm duyệt nhỏ, mỗi nguồn một lần |
