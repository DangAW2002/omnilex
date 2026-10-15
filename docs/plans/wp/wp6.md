# Ghi chú thiết kế WP6: Resolver, phạm vi cấu hình, kho gói, lockfile, ngân sách tài nguyên

Tham chiếu: Kế hoạch 3.3–3.5, 3.8, D3, D7, D11; bàn giao 6.4 (T-P2, T-P3, T-P4, T-P6, T-P7).
Duyệt: người dùng giao cho agent tự chốt ("hãy tự chốt cho tôi, và làm luôn", 2026-10-15). Các quyết định ở mục 7 là do agent chốt.

## 1. Phạm vi

Làm:
- **Cấu hình phân lớp** (3.3): mặc định < `$TERMBRIDGE_HOME/config.yaml` (mặc định `~/.termbridge`) < mọi `.termbridge/config.yaml` từ thư mục gốc xuống thư mục hiện tại, dừng ở file có `root: true` < `.termbridge/config.local.yaml` của project gần nhất < phiên (`--pack`, `TERMBRIDGE_PACKS`, `/termbridge packs`). Hỗ trợ `+`/`-`, `packsReset`, `limits` lấy giá trị nhỏ nhất, và `tb config explain` ghi nguồn của từng giá trị.
- **Resolver** (thuần): mở rộng meta-pack theo `requires` (semver `^ ~ >= x *` và bản chính xác), báo vòng phụ thuộc rõ ràng, khi thiếu gói thì nạp phần còn lại và báo một lần kèm lệnh cài.
- **Profile và tier**: `lite` / `standard` / `semantic`, được ghi đè bằng `tiers.explanations`. `semantic` chưa có vectors (WP9) nên hạ về `standard` và báo một lần.
- **Ngân sách tài nguyên** (3.5): ước tính bộ nhớ từ số byte trong `pack.json`, và khi vượt `limits.memoryMB` thì hạ cấp theo đúng thứ tự 3.5, báo từng bước. `limits.diskMB` được kiểm khi cài vào kho.
- **Kho gói** `$TERMBRIDGE_HOME/store/<id>@<version>-<sha8>/`, kiểm sha256 từng tier khi cài. **Lockfile** `.termbridge/lock.json`. `projects.json`. Lệnh `tb pack add|remove|list|status|install [--frozen]|update|verify|prune` và `tb config explain`.
- **Nguồn gói trong WP6**: `dev:<dir>` (một `dist/` đã build) và `tb pack add --from <dir>`. Registry HTTP và `.tbpack` để WP7; vì vậy WP6 không dùng mạng (D-7).
- **Bề mặt**:
  - CLI `find`/`show` dùng cấu hình của project.
  - MCP xác định project từ `TERMBRIDGE_PROJECT` hoặc cwd (3.8).
  - Mod xác định project từ `cwd` của phiên (D11), đọc gói qua `$.fs`, thêm `/termbridge packs …`, `/termbridge profile …`, `/termbridge status`; bài giải thích tải lười.
- Repo này có `.termbridge/config.yaml` (`root: true`, `packs: [dev:./dist]`). Thêm vào `.gitignore`: `.termbridge/config.local.yaml`, `.termbridge/.cache/`.
- **Thứ tự khi chọn tập con gói** (để lại từ WP5): dựng chỉ mục gộp cho đúng tập đã chọn từ `cards.json`, cache vào `.termbridge/.cache/` (CLI/MCP) hoặc trong bộ nhớ (mod). Như vậy thứ tự luôn giống một chỉ mục chung.

Không làm (đúng thứ tự WP): registry/`.tbpack`/glossary local/overlay/`starter` (WP7), vectors (WP9), site chọn gói (WP10 hoặc sau WP7).

## 2. Định dạng file

```yaml
# .termbridge/config.yaml (và config.local.yaml, ~/.termbridge/config.yaml)
root: true
locale: vi
profile: standard            # lite | standard | semantic
packs: [dev:./dist, +tech, -finance]
packsReset: false
tiers: { explanations: lazy } # eager | lazy | remote | off
limits: { memoryMB: 64, diskMB: 200 }
```

Các khóa `fallbackLocales`, `autoInstall`, `registries`, `overrides` được đọc và giữ nguyên (WP7 dùng). Khóa lạ thì cảnh báo, không lỗi.

```json
// .termbridge/lock.json
{
  "lockfileVersion": 1,
  "packs": {
    "it.ai-ml": {
      "version": "0.1.0",
      "sha256": "<sha256 của pack.json>",
      "store": "it.ai-ml@0.1.0-1a2b3c4d",
      "tiers": { "terms": { "en": "<sha256>", "vi": "<sha256>" } }
    }
  }
}
```

Gói `dev:` không được ghi vào lock, vì đó là đầu ra build đang thay đổi. `projects.json` = `{ "projects": ["<đường dẫn tuyệt đối>"] }`.

## 3. Interface

- `core/src/semver.ts` (thuần): `parseVersion`, `satisfies(version, range)`, `maxSatisfying(versions, range)`.
- `core/src/config.ts` (thuần): `mergeConfigLayers(layers): EffectiveConfig`, gồm `values`, `origins` (khóa → nguồn), `packOps` (mỗi thao tác kèm nguồn) và `warnings`. Còn `explainConfig(effective)` trả về các dòng `key = value  # nguồn`.
- `core/src/resolver.ts` (thuần):
  - `resolvePacks(ops, catalog, notice) → { packs: ResolvedPack[], missing, errors }`;
  - `planTiers(packs, profile, tiers, limits, surface, notice) → LoadPlan` (hạ cấp theo 3.5);
  - `estimateMemoryMB(pack, plan)`.
- `core/src/pack-reader.ts`:
  - `PackStore` nhận được manifest đã resolve (nhiều nguồn);
  - đường dẫn tier suy ra từ `path` của gói;
  - chỉ mục cho tập con dựng từ cards, kèm hook cache;
  - `terms(locale)`, `cardsFor(locale)`;
  - `PrefetchIO` dùng chung cho mod (đọc bất đồng bộ trước, sau đó store chạy đồng bộ).
- `core/src/project.ts` (Node):
  - tìm các lớp cấu hình;
  - dựng catalog từ `dev:` và kho;
  - `installPack`, `verifyStorePack`, đọc/ghi lock;
  - `pruneStore`, `openProject(cwd, session) → { effective, plan, store }`.
- `hooks/runtime/`: thêm `resolver.js`, `config.js`, `semver.js`, `pack-format.js`, `pack-reader.js`, `search-config.js`, `minisearch.js`, `js-yaml.js`. Các file này do build chép sang từ `core/dist` và `node_modules` (bản ESM khép kín), có viết lại import bare thành đường dẫn tương đối.

## 4. Mod

- `session.start`: đọc lớp cấu hình qua `$.fs.exists`/`$.fs.read`, đi từ `e.cwd` ngược lên. Home lấy từ `$.env.get('TERMBRIDGE_HOME')`, nếu không có thì dùng `HOME`/`USERPROFILE` + `/.termbridge`.
- Nạp `pack.json`, `terms` (vi + en) và `cards` (locale hiện tại) của các gói được chọn. Search shard chỉ nạp khi tìm lần đầu trong pane; bài giải thích nạp khi mở khái niệm; không nạp ở `lite`.
- `$.fs.read` từ chối file > 4 MiB, nên mod chỉ đọc shard theo gói, không đọc chỉ mục gộp cỡ lớn.
- Không resolve được gói nào thì dùng `data/*.json` đóng kèm như cũ (C-2); WP7 thay bằng gói `starter`.
- D3: không có cấu hình `packs` thì chọn mọi gói đã cài. Nếu tổng ≥ 2.000 khái niệm thì báo gợi ý chọn gói một lần và chỉ nạp `starter` (khi chưa có `starter` thì dùng dữ liệu đóng kèm).

## 5. Test

- **T-P2** `config.test.ts`: thứ tự lớp, `root: true`, `+`/`-`, `packsReset`, `limits` nhỏ nhất, explain đúng nguồn.
- **T-P3** `resolver.test.ts`: semver (`^0.x`, `~`, `>=`, `*`), meta-pack lồng nhau, vòng phụ thuộc, thiếu gói báo một lần.
- **T-P4**: hạ cấp đúng thứ tự, mỗi bước một thông báo; `semantic` hạ về `standard`.
- **T-P6** `store.test.ts` (thư mục tạm, `TERMBRIDGE_HOME` riêng):
  - cài từ `dist` và kiểm sha;
  - sai hash thì fail;
  - `install --frozen` fail khi lock lệch;
  - hai project dùng chung một bản trong kho;
  - `prune` giữ bản đang được tham chiếu.
- **T-P7** (mod, `claude plugin test`, `$` giả):
  - project từ `cwd`;
  - `/termbridge packs`, `profile`, `status`;
  - đổi locale;
  - bài giải thích tải lười (không đọc trước khi mở);
  - fallback về dữ liệu đóng kèm.
- **Thứ tự khi chọn tập con**: kết quả bằng chỉ mục dựng mới trên cùng tập khái niệm.
- CLI: `tb pack …`/`tb config explain` trên thư mục tạm.

## 6. Rủi ro

1. Mod nạp ≤ 300 ms ở 10k: cần đo; nếu dựng trie hoặc reverse matcher quá chậm thì cân nhắc trie tuần tự hóa (1.4b).
2. Explanations JSONL của một gói 2.000 khái niệm có thể chạm 4 MiB. Dev dist có file đơn `concepts/<id>.json`; kho chỉ có JSONL, nên để WP7 chia nhỏ nếu cần.
3. Ghi `config.yaml` bằng js-yaml làm mất comment khi `tb pack add/remove` sửa file.

## 7. Quyết định agent tự chốt

- **Q1**: `dev:<dir>` vừa là nguồn vừa chọn mọi gói nội dung của nguồn đó; các thao tác `+`/`-` sau đó lọc tiếp.
- **Q2**: nguồn cài trong WP6 chỉ gồm `--from <dist>` và nguồn `dev:`; registry để WP7.
- **Q3**: khi chọn tập con, dựng chỉ mục gộp từ cards (và cache) thay vì gộp điểm của nhiều shard.
- **Q4**: hệ số ước tính bộ nhớ: terms/cards ×3, search ×2, explanations ×1,5 so với số byte JSON. Hệ số được ghi trong code và báo cáo.
- **Q5**: mod dùng MiniSearch qua `PackStore` cho pane ở `standard`; ở `lite`, pane chỉ tra chính xác (tầng 0).
