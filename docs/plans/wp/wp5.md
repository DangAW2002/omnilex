# Ghi chú thiết kế WP5: Định dạng gói + chỉ mục dựng sẵn + manifest

Tham chiếu: Kế hoạch 1.3, 1.4d, 3.2, 3.10, D5; bàn giao 6.2 (T-S1..T-S4), 6.4 (T-P1, T-P5, T-P8).

## 1. Phạm vi

Làm trong WP5:
- `tb build` xuất **gói** theo D5 vào `dist/packs/`, cùng `dist/manifest.json`. Gói nội dung theo nhánh cấp 2; `iot`, `product` mỗi gốc một gói; meta-pack theo gốc (`it`, `finance`, `media`) và `tech` (= `it.*` + `iot` + `product`).
- Tier `terms`, `cards`, `search` (MiniSearch `toJSON` dựng sẵn), `explanations` (JSONL). Mỗi tier có `bytes` + `sha256` trong `pack.json`.
- Một cấu hình tìm kiếm duy nhất `core/src/search-config.ts` (D-2), có hash ghi vào manifest. Site bỏ cấu hình MiniSearch tự viết, dùng chung bản này.
- CLI `tb find`/`tb show` đọc manifest + gói, không gọi `loadAll()`. Thêm `tb find --pack <id,...>`; `--domain` vẫn là bộ lọc (C-2).
- MCP: không `loadAll()` khi khởi động nếu có manifest. Cache chỉ mục theo `(locale, pack)`, nạp lại khi manifest đổi.
- Site: trang tìm kiếm tải shard `search-index.json` bằng `fetch` thay vì nhúng JSON vào HTML (T-P8).
- Đọc được `formatVersion` N (=1) và N-1 (=0, tức bố cục phẳng cũ `dist/<locale>/search.json`). Bản N+1 bị bỏ qua và báo một lần (T-P5).

KHÔNG làm trong WP5 (để đúng thứ tự WP):
- Mod vẫn đọc `packages/claude-mod/data/*.json` như cũ (C-2); mod chuyển sang gói ở WP6 cùng resolver/profile.
- Resolver, phạm vi cấu hình, kho gói, lockfile, `requires` theo semver: WP6.
- `attributions.json`, `starter`, import/export, registry: WP7. Tier `vectors`: WP9.

Các đầu ra cũ (`dist/<locale>/search.json`, `terms.json`, `concepts/<id>.json`, `graph.json`, `indexes/`, `llms.txt`, `claude-mod/data/`) **giữ nguyên từng byte**.

## 2. Bố cục đầu ra

```
dist/manifest.json
dist/packs/<pack-id>/pack.json
dist/packs/<pack-id>/<locale>/terms.json
dist/packs/<pack-id>/<locale>/cards.json
dist/packs/<pack-id>/<locale>/search-index.json
dist/packs/<pack-id>/<locale>/explanations.jsonl
```

Thư mục gói trong `dist/` không có `@<version>`. Hậu tố này chỉ xuất hiện trong kho gói ở WP6. File tier ghi JSON gọn (không thụt lề) để giảm dung lượng.

## 3. Interface

### 3.1 Gán khái niệm vào gói (`core/src/packs.ts`)

```ts
export const PACK_FORMAT_VERSION = 1;

// domain chính (domains[0]) -> pack id
// "it/ai-ml/llm-agents" -> "it.ai-ml";  "iot/edge-cloud/..." -> "iot"
export function packIdForDomain(domain: string, domainsConfig: DomainsConfig): string;
export function planPacks(repoData: RepositoryData): PackPlan;  // sắp xếp ổn định theo id

interface PackPlan {
  content: Array<{ id: string; root: string; domains: string[]; conceptIds: string[] }>;
  meta: Array<{ id: string; requires: string[] }>;
  conceptPack: Map<string, string>;  // conceptId -> packId (tầng 0)
}
```

Gói được chia ở mức nào là cấu hình theo gốc, khai báo trong `config/domains.yaml`:

```yaml
- id: iot
  packing: root      # root | branch (mặc định: branch)
```

Chỉ xuất gói có ≥ 1 khái niệm. Meta-pack chỉ liệt kê các gói đã xuất. Một gói vượt 2.000 khái niệm thì build in cảnh báo; tách xuống cấp 3 làm khi thực sự cần (xem 6.2).

### 3.2 `pack.json`

```json
{
  "id": "it.ai-ml",
  "version": "0.1.0",
  "formatVersion": 1,
  "kind": "content",
  "title": { "vi": "AI và học máy", "en": "AI and machine learning" },
  "domains": ["it/ai-ml"],
  "locales": ["en", "vi"],
  "requires": {},
  "concepts": 1,
  "status": { "draft": 1, "reviewed": 0, "verified": 0, "deprecated": 0 },
  "tiers": {
    "terms":        { "bytes": 0, "files": { "en": { "bytes": 0, "sha256": "…" }, "vi": { "bytes": 0, "sha256": "…" } } },
    "cards":        { "bytes": 0, "files": { … } },
    "search":       { "bytes": 0, "files": { … }, "configHash": "…" },
    "explanations": { "bytes": 0, "files": { … } }
  },
  "license": "CC-BY-4.0"
}
```

- Meta-pack: `"kind": "meta"`, chỉ có `requires` (ví dụ `{ "it.ai-ml": "^0.1.0", … }`), không có `tiers`, `concepts = 0`.
- `title` lấy từ `labels` của nút taxonomy cấp 2, hoặc `name` của gốc.
- `version` lấy từ `version` của `package.json` ở gốc repo. Tăng semver theo từng gói (3.10) là việc của CI phát hành ở WP7.
- Không ghi `source.commit` khi build local, để giữ D-4 (đầu ra chỉ phụ thuộc đầu vào). CI phát hành sẽ điền trường này.

### 3.3 `dist/manifest.json`

```json
{
  "formatVersion": 1,
  "searchConfigHash": "…",
  "locales": ["en", "vi"],
  "packs": [
    { "id": "it", "kind": "meta", "version": "0.1.0", "path": "packs/it/pack.json", "sha256": "…", "concepts": 0 },
    { "id": "it.ai-ml", "kind": "content", "version": "0.1.0", "path": "packs/it.ai-ml/pack.json", "sha256": "…", "concepts": 1 }
  ]
}
```

### 3.4 Nội dung tier (mỗi locale)

- `terms.json`: `[{ key, match, autolinkConfig?, conceptId }]`. Mỗi dòng là một khóa của một khái niệm, **chưa gộp**. Việc gộp khóa trùng giữa các gói, và luật "không autolink khi khóa trỏ > 1 khái niệm", chạy lúc nạp bằng hàm thuần `mergeTerms(tiers)`, vì homonym có thể nằm ở hai gói khác nhau. Builder dùng chính hàm này để sinh `dist/<locale>/terms.json` cũ, nên hai đường cho kết quả giống hệt.
- `cards.json`: `[{ id, label, qualifier?, summary, plain_descriptions, aliases, loanwords, domains, alsoIn, level, status }]`. `alsoIn` là danh sách id gói của các domain phụ, bỏ chính gói của khái niệm.
- `search-index.json`: `MiniSearch.toJSON()` dựng bằng `SEARCH_INDEX_OPTIONS`, thêm docs theo thứ tự id.
- `explanations.jsonl`: mỗi dòng `{ id, locale, content_locale, metadata, entry }`, cùng cấu trúc với `dist/<locale>/concepts/<id>.json`.

### 3.5 Cấu hình tìm kiếm (`core/src/search-config.ts`)

```ts
export const SEARCH_CONFIG_VERSION = 1;
export const SEARCH_INDEX_OPTIONS = { … };   // chuyển từ query.ts, không đổi giá trị
export function searchConfigHash(): string;  // sha256 của {version, fields, storeFields, searchOptions, processTerm.toString()}
```

Module này thuần, không import `node:*`, để site (trình duyệt) và mod (WP6) dùng được. Phần sha256 nằm ở builder/loader (Node). Phía trình duyệt so hash bằng chuỗi hằng được build ghi sẵn.

### 3.6 Đọc gói (`core/src/pack-reader.ts`)

```ts
export interface PackIO { readText(relPath: string): string | null }   // adapter, D-3

export function readManifest(io: PackIO): { manifest: Manifest | null; formatVersion: 0 | 1; notice?: string };
export function resolvePackSelection(manifest: Manifest, wanted?: string[]): string[]; // mở rộng meta-pack thành gói nội dung, không đệ quy vô hạn
export function findInPacks(io: PackIO, query: string,
  opts: { locale: string; packs?: string[]; domain?: string; cache?: SearchCache }): FindResult[];
export function lookupInPacks(io: PackIO, idOrLabel: string, opts: { locale: string; packs?: string[] }): Card[];   // tầng 0
export function readExplanation(io: PackIO, id: string, locale: string): ExplanationRecord | null;
```

- `findInPacks` nạp shard của từng gói (`loadSearchIndex`) rồi gộp kết quả theo `score`, sau đó áp ngưỡng `≥ 0,35 × điểm cao nhất` và lấy top 5 như hiện tại.
- Lệch `configHash` (T-S2): dựng lại chỉ mục từ `cards.json` của gói đó và cảnh báo một lần. Không dùng shard lệch.
- `formatVersion` 0: không có manifest nhưng có `dist/<locale>/search.json`, nên đi đường cũ. `formatVersion` > 1: bỏ qua và báo "cần cập nhật OMNILEX" một lần.
- `readExplanation` đọc `dist/<locale>/concepts/<id>.json` (một file nhỏ) thay vì parse cả JSONL. JSONL dành cho kho gói ở WP6, nơi không còn thư mục `concepts/`.

### 3.7 Bề mặt

- **CLI**: `findAction` ưu tiên manifest. Nếu dist cũ hơn `concepts/` thì cảnh báo và quay về `loadAll()` (giữ T-S3). `show` dùng `lookupInPacks` + `readExplanation`. Thêm `--pack`.
- **MCP**: `find_term`/`explain_term` dùng `pack-reader` với cache theo `(locale, pack)`. Mỗi lần gọi tool chỉ `stat` manifest một lần; mtime đổi thì xóa cache. `browse_domain` lọc `cards` theo prefix. Chỉ dùng `loadAll()` khi không có `dist`.
- **Site**: builder copy `dist/manifest.json` + `dist/packs/**` vào thư mục public của site. Trang tìm kiếm `fetch` manifest, nạp shard của mọi gói nội dung theo locale bằng `SEARCH_INDEX_OPTIONS` chung, và bỏ `<script id="search-data">`.

## 4. File sẽ đổi

| File | Loại | Nội dung |
|---|---|---|
| `packages/core/src/search-config.ts` | Mới | Cấu hình tìm kiếm + hash |
| `packages/core/src/packs.ts` | Mới | `planPacks`, `mergeTerms`, dựng tier, ghi `pack.json` + manifest |
| `packages/core/src/pack-reader.ts` | Mới | Đọc manifest/gói qua adapter, tìm, tra, giải thích |
| `packages/core/src/builder.ts` | Sửa | Gọi `packs.ts`; dùng `mergeTerms` cho terms cũ; copy cho site |
| `packages/core/src/query.ts` | Sửa | Import cấu hình từ `search-config.ts`; tách hàm xếp hạng dùng chung |
| `packages/core/src/types.ts`, `loader.ts` | Sửa | Kiểu `Manifest`, `PackJson`, `Card`; đọc `packing` |
| `schema/domains.schema.json` | Sửa | Trường `packing` (tùy chọn) |
| `schema/pack.schema.json`, `schema/manifest.schema.json` | Mới | Schema định dạng (WP7 dùng khi import, D-9) |
| `config/domains.yaml` | Sửa | `packing: root` cho `iot`, `product` |
| `packages/cli/src/index.ts` | Sửa | find/show qua gói, `--pack` |
| `packages/mcp/src/index.ts` | Sửa | Đọc gói, cache, nạp lại theo manifest |
| `packages/site/src/pages/[locale]/index.astro` (+ bước copy) | Sửa | Tải shard |
| `bench/run.ts` | Sửa | Đo `tb find` lạnh và MCP qua gói |
| `docs/schema.md` | Sửa | Mô tả định dạng gói |

## 5. Test (viết trước, cho phần core)

- **T-P1** `packs.test.ts`: mỗi khái niệm nằm đúng một gói theo `domains[0]`, `alsoIn` đúng; sha256/bytes trong `pack.json` khớp file; meta-pack chỉ có `requires`; `iot`/`product` không bị chia; gói rỗng không được xuất.
- **T-P5**: manifest `formatVersion` 1 nạp được; không có manifest thì đi đường bố cục cũ (0); `formatVersion` 2 bị bỏ qua, báo đúng một lần, không throw (D-8).
- **T-S1** `search-config.test.ts`: chỉ mục `toJSON` → `loadJSON` cho kết quả **giống hệt** chỉ mục dựng mới trên ≥ 50 truy vấn (vi/en, có/không dấu, sai chính tả nhẹ, tiền tố), chạy trên dữ liệu bench có seed cố định.
- **T-S2**: `configHash` lệch thì dựng lại từ cards, cảnh báo một lần, kết quả bằng kết quả của chỉ mục đúng.
- **T-S3**: `tb find` khi dist mới không gọi `loadAll` và chỉ đọc manifest + shard của các gói được chọn (đếm số lần `readText`); dist cũ thì cảnh báo + quay về.
- **T-S4** (`packages/mcp/test`): qua nhiều lần gọi tool, mỗi `(locale, pack)` chỉ được nạp một lần (spy); đổi manifest thì nạp lại.
- **Tương đương**: `mergeTerms` trên mọi gói cho ra `dist/<locale>/terms.json` giống hệt bản cũ; `findInPacks` trả cùng tập top-5 như `findConcepts` cũ trên bộ truy vấn của T-S1 với 11 khái niệm thật.
- **T-P8**: sau khi build site, HTML trang tìm kiếm không còn chứa `search-data`, có tham chiếu tới manifest/shard, và các file shard có mặt trong output.
- `check:deterministic` đã quét toàn bộ `dist/`, nên tự bao phủ `dist/packs/`.

## 6. Rủi ro

1. **Ngân sách 10k**: mục tiêu của WP5 (P3) là `tb find` lạnh ≤ 200 ms (hiện 564 ms) và MCP nóng ≤ 10 ms (hiện 15,9 ms). `loadJSON` cho 10k khái niệm có thể vẫn tốn khoảng 150–250 ms. Nếu không đạt, phương án là chỉ nạp shard của các gói khớp `--domain`/`--pack`. MCP nóng chậm chủ yếu do `fuzzy` trên từ vựng lớn; muốn giảm phải đổi cách xếp hạng (xem quyết định Q4). Mod nạp ≤ 300 ms phụ thuộc profile, để lại WP6.
2. **Điểm số giữa nhiều chỉ mục**: IDF của MiniSearch tính theo từng gói, nên khi gộp kết quả theo `score`, thứ tự có thể khác so với một chỉ mục chung. Test tương đương sẽ đo độ lệch trên dữ liệu thật và dữ liệu bench, rồi đưa vào báo cáo.
3. **Phát hiện dist cũ**: mtime của thư mục `concepts/` không đổi khi chỉ sửa nội dung một file. Đây là hành vi sẵn có, WP5 giữ nguyên. Làm chặt hơn (so hash đầu vào) sẽ tốn O(C) I/O ở mỗi lệnh.
4. **Dung lượng `dist`**: thêm khoảng gấp đôi (tier gói + bố cục cũ) cho tới khi WP6 bỏ bố cục cũ. `dist/` không commit nên không ảnh hưởng repo.

## 7. Cần người dùng duyệt

- **Q1** Bố cục `dist/packs/<id>/<locale>/…` + `dist/manifest.json` (gộp 1.3 và 3.2; theo 3.2 thì gói là đơn vị, locale nằm bên trong). Đề xuất: **đồng ý**.
- **Q2** `tiers.<tier>.files.<locale>` có `bytes` + `sha256` cho từng locale (ví dụ ở 3.2 chỉ có một hash cho mỗi tier, trong khi tier lại có nhiều file theo locale). Đề xuất: **đồng ý**.
- **Q3** Thêm `packing: root|branch` vào `config/domains.yaml` để encode D5 (`iot`, `product` không chia). Đây là thay đổi schema config, dữ liệu cũ vẫn hợp lệ vì trường này tùy chọn. Đề xuất: **đồng ý**.
- **Q4** Hiệu năng MCP nóng ở 10k: (a) giữ cấu hình tìm kiếm, chấp nhận chưa đạt và báo cáo số đo; hoặc (b) tìm hai lượt: chính xác + tiền tố trước, chỉ chạy `fuzzy` khi có < 5 kết quả. Phương án (b) đổi thứ tự kết quả ở vài truy vấn sai chính tả, nhưng T-S1 vẫn giữ. Đề xuất: **(b)**, có test so sánh trước/sau.
- **Q5** `version` của mọi gói = version của repo (`0.1.0`), không ghi `source.commit` khi build local. Đề xuất: **đồng ý**.
