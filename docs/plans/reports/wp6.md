# Báo cáo WP6: Resolver, phạm vi cấu hình, kho gói, lockfile, ngân sách tài nguyên

## Tóm tắt
Mỗi máy, workspace và project giờ tự chọn gói qua `.omnilex/config.yaml` phân lớp (mặc định < người dùng < các project từ trên xuống, dừng ở `root: true` < `config.local` < phiên). Lựa chọn được resolve bằng một resolver chung (semver, meta-pack, phát hiện vòng phụ thuộc, báo gói thiếu) và một kế hoạch nạp tier theo profile và `limits`. Gói được cài vào kho dùng chung `~/.omnilex/store/` (có kiểm sha256), ghi vào `lock.json`, và quản lý bằng `tb pack add|remove|list|status|install [--frozen]|update|verify|prune` cùng `tb config explain`. CLI, MCP và mod đều đọc gói theo cấu hình của project, dùng cùng một code (`project.ts`, được sinh sang `hooks/runtime/`). Ở 10.000 khái niệm, mod nạp giảm từ 1.097 ms xuống 190–219 ms (ngân sách ≤ 300 ms); `tb find` lạnh khoảng 114 ms (≤ 200 ms). **MCP nóng với truy vấn xấu nhất vẫn 11–15 ms, chưa đạt ngân sách ≤ 10 ms.**

## Thay đổi
| File | Loại | Ghi chú |
|---|---|---|
| `packages/core/src/semver.ts` | Mới | `satisfies`, `maxSatisfying`: bản chính xác, `^`, `~`, `>= > <= <`, `x`/`*`, `||` |
| `packages/core/src/config.ts` | Mới | Chuẩn hóa cấu hình, gộp lớp, thao tác gói `+`/`-`/`dev:`/`local:`, `packsReset`, `limits` nhỏ nhất, `explainConfig` |
| `packages/core/src/resolver.ts` | Mới | `resolvePacks` (dev thắng kho, ưu tiên bản ghim trong lock, vòng phụ thuộc, gói thiếu, D3), `planLoad` (profile, hạ cấp theo 3.5) |
| `packages/core/src/project.ts` | Mới | Tìm lớp cấu hình, dựng catalog (dev + kho), `openProject`, `composeManifest`; dùng adapter fs async, chạy được cả trong mod |
| `packages/core/src/pack-install.ts` | Mới | Node: cài vào kho (kiểm sha256, chép sang thư mục tạm rồi rename), lockfile, `frozenInstall`, `verifyLock`, `projects.json`, `pruneStore`, sửa `packs` trong config |
| `packages/core/src/pack-reader.ts` | Sửa | `PackStore` nhận manifest đã resolve (đường dẫn tuyệt đối, nhiều nguồn), `terms()`, chỉ mục cho tập con (Q3) kèm hook cache, tier bị tắt, `PrefetchIO` cho fs async của mod |
| `packages/core/src/search-config.ts` | Sửa | Chỉ tìm gần đúng (fuzzy) khi tìm chính xác + tiền tố không ra gì (xem lệch 2) |
| `packages/core/src/builder.ts` | Sửa | Sinh 9 module core + `minisearch.js` + `js-yaml.js` (bản ESM khép kín) vào `hooks/runtime/`, viết lại import bare, bỏ dòng `sourceMappingURL` trỏ tới file `.map` không được chép |
| `packages/cli/src/packs.ts` | Mới | Lệnh `tb pack …`, `tb config explain`, `openCliStore` |
| `packages/cli/src/index.ts` | Sửa | `find`/`show` đi theo cấu hình project trước, rồi mới tới dist của repo, `search.json` cũ, `loadAll()` |
| `packages/mcp/src/index.ts` | Sửa | Handler async; project từ `OMNILEX_PROJECT` hoặc cwd; mở lại khi file cấu hình/lock/manifest/kho đổi; thông báo ra stderr |
| `packages/claude-mod/hooks/register.js` | Sửa | Project từ `e.cwd` (D11); đọc gói qua `$.fs`; `/OMNILEX packs|profile|status`; tìm trong pane bằng chỉ mục gói (tải lười); bài giải thích tải lười; reverse matcher dựng sau `session.start`; vẫn rơi về dữ liệu đóng kèm |
| `.omnilex/config.yaml`, `.gitignore` | Mới/Sửa | Repo dùng `dev:./dist`; bỏ qua `config.local.yaml` và `.cache/` |
| `bench/run.ts` | Sửa | Đo mod nạp theo đường gói; tách phần dựng sau; MCP thêm truy vấn đại diện (tham khảo); cô lập cwd/home khi đo CLI |
| Test | Mới/Sửa | `config`, `resolver`, `store` (core); `packs` (mod, T-P7); cập nhật `packs`, `search-config`, test CLI/MCP |
| `README.md`, `README.vi.md`, `packages/claude-mod/README.md`, `docs/schema.md` | Sửa | Hướng dẫn gói và cấu hình project; mục 5 của schema |

## Quyết định và lệch kế hoạch
Người dùng giao cho agent tự chốt ("hãy tự chốt cho tôi, và làm luôn"), nên không có điểm dừng duyệt ghi chú. Các quyết định:
- **Q1–Q5** như ghi trong `docs/plans/wp/wp6.md`: `dev:` vừa là nguồn vừa chọn gói; nguồn cài chỉ gồm `--from` và `dev:` (registry để WP7); tập con dùng chỉ mục dựng từ cards kèm cache; hệ số bộ nhớ ×3/×3/×2/×1,5; pane của mod dùng MiniSearch ở `standard` và tra chính xác ở `lite`.
- **Lệch 1: `tb find --pack` thay thế lựa chọn** (lớp phiên với `packsReset`), còn `OMNILEX_PACKS` thì cộng thêm. Lý do: `--pack` ở WP5 có nghĩa "chỉ tìm trong các gói này".
- **Lệch 2: đổi luật Q4 của WP5**, fuzzy chỉ chạy khi lượt chính xác ra 0 kết quả (trước đây là khi < 5). Đo ở 10k: truy vấn theo nhãn thường chỉ khớp 1–3 khái niệm nên lần nào cũng kéo theo fuzzy (6–10 ms), mô tả dài thì 50–60 ms. Sau khi đổi: nhãn 2–5 ms. Lỗi gõ (0 kết quả chính xác) vẫn được sửa bằng fuzzy, có test.
- **Lệch 3: reverse matcher dựng ngay sau `session.start`** qua `$.clock.after(0)`, không chặn phiên. Nếu câu trả lời đầu đến trước thì dựng tại chỗ một lần, nên kết quả không đổi. Bench báo riêng phần này (khoảng 95 ms ở 10k).
- **Lock ghi cả meta-pack** đã cài, để `install --frozen` trên máy mới cài lại được cả `+finance`.
- **Sửa lỗi có sẵn**: nhánh `catch` của `loadData` trong mod gán vào biến `matchers` không tồn tại. Trước đây nhánh này chưa từng chạy; nay nó là đường fallback nên lỗi lộ ra.
- MCP chưa dùng `roots` của client (3.8), vì server JSON-RPC tối giản chưa có capability này; tạm dùng `OMNILEX_PROJECT` hoặc cwd.
- Ghi `config.yaml` bằng js-yaml làm mất comment khi `tb pack add/remove` sửa file.

## Cổng kiểm tra
| Lệnh | Kết quả | Dòng tóm tắt nguyên văn |
|---|---|---|
| `pnpm install --frozen-lockfile` | Đạt | exit 0 (không thêm dependency) |
| `pnpm typecheck` | Đạt | `$ tsc -b` (exit 0) |
| `pnpm build` | Đạt | `✔ Successfully generated 22 index files and 149 dist artifacts` |
| `pnpm test` | Đạt | `Test Files 19 passed (19)` / `Tests 120 passed (120)` |
| `claude plugin test packages/claude-mod` | Đạt | `16 pass` / `0 fail` |
| `pnpm tb validate --strict` | Đạt | `✔ Validation passed successfully!` |
| `pnpm --filter @omnilex/site build` | Đạt | `T-P8: search page reads shards (no embedded search data)` |
| `pnpm tb build && git diff --exit-code indexes/ llms.txt` | Đạt | diff rỗng (exit 0) |
| `pnpm check:deterministic` | Đạt | `✔ Build is 100% deterministic! All 156 artifacts have identical sha256 hashes across builds.` |
| `pnpm bench --sizes 1000 --check` | Đạt | `✔ Scale 1000 PASSED all performance gates.` |
| `pnpm bench --sizes 10000 --check` (không thuộc CI) | **Không đạt** | `MCP find warm: 11.4ms > budget 10ms` (3 lần chạy: 15,3 / 11,4 / 12,4 ms) |
| `claude plugin validate packages/claude-mod` | Đạt | `✔ Validation passed` |

## Hiệu năng
| Chỉ số (10.000 khái niệm, 3 lần chạy) | Trước (sau WP5) | Sau | Ngân sách | Đạt? |
|---|---|---|---|---|
| Mod: nạp khi bắt đầu phiên | 1.097 ms | 190–219 ms | ≤ 300 ms | ☑ |
| Mod: dựng sau khi bắt đầu (tham khảo) | – | 93–96 ms | – | – |
| Mod: dò lần đầu / dò sau | 0,53 / 0,13 ms | 0,5 / 0,15 ms | ≤ 20 / ≤ 2 ms | ☑ |
| `tb find` lạnh | 99,8 ms | 112–115 ms | ≤ 200 ms | ☑ |
| MCP nóng, truy vấn xấu nhất | 10,7 ms | 11,4–15,3 ms | ≤ 10 ms | ✗ |
| MCP nóng, truy vấn đại diện (tham khảo) | – | 14–18 ms | – | – |
| Dữ liệu mod nạp lúc bắt đầu | 19,19 MB | 8,44 MB | (5 MB cho 1 gói `lite`) | – |

Ở 1.000 khái niệm (cổng CI) mọi chỉ số đều đạt: mod nạp 31 ms, `tb find` lạnh 11 ms, MCP nóng 0,98 ms, dữ liệu 0,85 MB.

Về MCP nóng ở 10k:
- **Truy vấn xấu nhất** ("hệ thống") khớp cả 10.000 khái niệm giả. Riêng phần chấm điểm của MiniSearch đã mất khoảng 12 ms kể cả khi tắt tiền tố, nên đổi luật fuzzy không giúp được ca này.
- **Truy vấn đại diện** cao (14–18 ms) vì bộ sinh dữ liệu cho mọi mô tả cùng mở đầu "cách gọi đời thường cho …": mỗi từ khớp gần hết dữ liệu, kể cả khi tắt tiền tố vẫn khoảng 24 ms. Đây là đặc điểm của dữ liệu giả.
- Ngân sách và truy vấn cổng giữ nguyên (P-1).

## Test
- Thêm ròng 33 test vitest (87 → 120): `config` 7, `resolver` 13, `store` 11, `packs` +1, `cache` (MCP) +1. Thêm 6 test mod (10 → 16).
- Kiểm tra đột biến: bỏ xử lý `-id` trong resolver thì T-P3 fail; đảo phép so sánh trong `limits` thì T-P2 fail. Đã khôi phục.
- Chạy thử đầu-cuối trên project tạm với `OMNILEX_HOME` riêng: `pack add finance --from dist` (cài 5 gói), `find`/`show` qua kho, `pack remove`, `install --frozen` trên kho trống (đạt), rồi với lock rỗng (fail, liệt kê đúng 3 gói lệch).
- Ma trận:
  - **T-P2** ☑ thứ tự lớp; `root: true` dừng đúng chỗ; `config.local` của project gần nhất; `+`/`-`; `packsReset`; `limits` nhỏ nhất kèm nguồn; explain đúng nguồn; khóa lạ hoặc giá trị sai chỉ cảnh báo; đường dẫn Windows/POSIX.
  - **T-P3** ☑ semver (`^0.x`, `^0.0.x`, `~`, khoảng, pre-release, `||`); meta-pack lồng nhau; ghim từ lock; `-` sau `+`; vòng phụ thuộc báo `a → b → a` và vẫn giữ phần còn lại; gói thiếu được liệt kê; D3 chọn tất cả; dev thắng kho; meta-pack được ghi vào lock.
  - **T-P4** ☑ tier theo profile và bề mặt; hạ cấp đúng thứ tự (explanations → search → bỏ gói cuối), mỗi bước một thông báo; vừa ngân sách thì không hạ; `semantic` hạ về `standard`.
  - **T-P5** ☑ (từ WP5, vẫn pass) manifest/pack mới hơn bị bỏ qua.
  - **T-P6** ☑ cài và kiểm từng tier; dùng lại bản đã cài; meta-pack cài cả gói phụ thuộc; sai hash thì fail và không để lại thư mục dở; bản trong kho bị sửa thì bị phát hiện; `--frozen` fail khi lock lệch hoặc sai sha; hai project dùng chung một bản; `prune` giữ bản đang được tham chiếu và quên project đã xóa; `diskMB`.
  - **T-P7** ☑ (`claude plugin test`, `$` giả):
    - project lấy từ `cwd`;
    - `/OMNILEX status`, `packs <id>` / `packs all`, `profile lite` đều chạy đúng;
    - bài giải thích không được đọc lúc khởi động hay lúc gõ, chỉ được đọc khi mở khái niệm;
    - `lang en` nạp cards tiếng Anh và tra ngược vẫn đúng;
    - không có project thì dùng dữ liệu đóng kèm.
  - **T-P8** ☑ (từ WP5, vẫn pass).
  - **Thứ tự khi chọn tập con** ☑ khớp với một chỉ mục dựng mới trên đúng tập khái niệm đó; lần sau đọc từ cache, không đọc lại cards.
  - **MCP theo project** ☑ phục vụ đúng gói project chọn; đổi config thì nạp lại.

## Tự đánh giá
| Tiêu chí | Đạt/Không | Bằng chứng |
|---|---|---|
| Đúng chức năng | Đạt | 120/120 vitest, 16/16 test mod, chạy thử đầu-cuối |
| Tương thích ngược (C-1..3) | Đạt | validate strict pass; T-X2 (30 câu × 3 chế độ) pass trên dữ liệu đóng kèm; không có `.omnilex/` thì CLI/MCP vẫn đi đường WP5 (test CLI/MCP cũ vẫn pass) |
| Hiệu năng (P-1, P-2) | Không (một phần) | Mod nạp và `tb find` lạnh ở 10k đạt; MCP nóng 10k chưa đạt; P-2: tra theo id dùng `Map`, các bảng tra được cache theo lựa chọn |
| Build xác định (D-4) | Đạt | `All 156 artifacts have identical sha256` |
| Bảo mật/an toàn dữ liệu (D-9, 5.4) | Đạt (phần WP6) | Cài kiểm sha256 từng file trước khi rename; chỉ chép các file tier khai báo trong `pack.json`. Import gói lạ (`..`, symlink, schema) là việc của WP7 |
| Offline/hạ cấp (D-7, D-8) | Đạt | Không dùng mạng; gói thiếu, cấu hình sai, đọc file lỗi đều chỉ báo và hạ cấp, không throw |
| Windows + Linux (D-5, T-X3) | Chưa kiểm Linux | Chạy trên Windows 11; có test đường dẫn `D:/` và `/`; CI (ubuntu) sẽ kiểm |
| Tài liệu đã cập nhật | Đạt | README vi/en (mục gói và cấu hình), README mod, `docs/schema.md` mục 5, ghi chú `wp6.md` |

## Rủi ro còn lại và việc chưa làm
- **MCP nóng 10k** chưa đạt ngân sách ở truy vấn xấu nhất. Hướng tiếp: viết lại phần chấm điểm cho các term khớp phần lớn dữ liệu (IDF gần 0), hoặc thêm stopword cho tìm kiếm. Cả hai cách đều đổi thứ tự kết quả nên cần quyết riêng.
- Explanations JSONL của gói trong kho có thể vượt giới hạn 4 MiB của `$.fs.read` khi một gói có khoảng 2.000 khái niệm dài; khi đó mod không đọc được bài giải thích (hạ cấp im lặng, báo một lần). WP7 nên chia nhỏ file.
- Phát hiện dist cũ vẫn dựa trên mtime của thư mục `concepts/`.
- Site chưa có chọn gói (3.8); registry, `.tbpack`, `local:`, overlay, `starter` thuộc WP7.
