# Báo cáo WP5: Định dạng gói + chỉ mục dựng sẵn + manifest

## Tóm tắt
`tb build` xuất thêm `dist/manifest.json` và `dist/packs/<id>/`: gói nội dung theo nhánh cấp 2 (D5), `iot`/`product` mỗi gốc một gói, cùng meta-pack `it`, `finance` và `tech`. Mỗi gói có các tier `terms`, `cards`, `search` (chỉ mục MiniSearch dựng sẵn) và `explanations`, mỗi file có sha256 và số byte. CLI (`find`, `show`, thêm `--pack`), MCP và trang tìm kiếm của site giờ đọc gói qua một `PackStore` duy nhất, không gọi `loadAll()`. Ở 10.000 khái niệm, `tb find` lạnh giảm từ 564 ms xuống 99,8 ms (ngân sách ≤ 200 ms). MCP nóng giảm từ 15,9 ms xuống 10,7 ms, **vẫn vượt** ngân sách ≤ 10 ms (xem phần Hiệu năng). Mọi file đầu ra cũ giữ nguyên từng byte (71/71 sha256 khớp).

## Thay đổi
| File | Loại | Ghi chú |
|---|---|---|
| `packages/core/src/search-config.ts` | Mới | Cấu hình MiniSearch duy nhất (D-2), `searchConfigHash`, `searchIndexes` (tìm hai lượt, Q4), `domainMatches` |
| `packages/core/src/pack-format.ts` | Mới | Kiểu dữ liệu định dạng gói, `packIdForDomain`, `mergeTerms`, `expandPackSelection`; thuần, không dùng API Node |
| `packages/core/src/packs.ts` | Mới | `groupPacks`, `renderPacks` (tier + sha256 + manifest + chỉ mục gộp), `writePackFiles` |
| `packages/core/src/pack-reader.ts` | Mới | `PackStore`: đọc manifest/gói qua adapter, tìm, tra tầng 0, browse, giải thích; báo mỗi thông báo một lần |
| `packages/core/src/builder.ts` | Sửa | Gom dữ liệu gói trong vòng lặp locale; `terms.json` cũ sinh bằng `mergeTerms`; ghi gói |
| `packages/core/src/query.ts` | Sửa | Dùng `search-config`; `findConcepts` không dựng lại docs ở mỗi truy vấn (trước đây tốn O(C) mỗi lần gọi) |
| `packages/core/src/types.ts`, `schema/domains.schema.json`, `config/domains.yaml` | Sửa | Trường `packing: root \| branch`; `iot`, `product` = `root` |
| `schema/pack.schema.json`, `schema/manifest.schema.json` | Mới | Schema định dạng; WP7 dùng khi import (D-9) |
| `packages/cli/src/index.ts` | Sửa | `openPackStore`; `find`/`show` qua gói; `--pack`; quay về `search.json` cũ hoặc `loadAll()` khi dist cũ |
| `packages/mcp/src/index.ts` | Sửa | `createToolHandler(rootDir, opts)`: không `loadAll()` lúc khởi động; một `PackStore` cho mỗi mtime của manifest; thông báo ra stderr |
| `packages/site/src/pages/[locale]/index.astro` | Sửa | Bỏ JSON nhúng; `fetch` chỉ mục gộp (khi có truy vấn) và `cards.json` (khi duyệt) |
| `packages/site/src/pages/data/**`, `src/lib/dist.ts` | Mới | Endpoint tĩnh xuất manifest và shard lúc build |
| `packages/site/scripts/check-output.mjs`, `package.json` | Mới/Sửa | Kiểm T-P8 ngay sau `astro build`; site phụ thuộc workspace `@omnilex/core` |
| `bench/run.ts` | Sửa | Ghi dữ liệu bench thành dist dạng gói bằng chính builder; đo MCP qua `PackStore` |
| `packages/core/test/packs.test.ts`, `search-config.test.ts` | Mới | T-P1, T-P5, T-S1, T-S2, T-S3/T-S4 ở mức store, các test tương đương |
| `packages/cli/test/find.test.ts`, `packages/mcp/test/cache.test.ts` | Sửa | T-S3 và T-S4 qua gói; vẫn giữ test cho đường cũ |
| `docs/schema.md`, `README.md`, `README.vi.md` | Sửa | Mục 4 "Build Packs"; ví dụ `--pack` |

## Quyết định và lệch kế hoạch
- **Q1–Q5** trong `docs/plans/wp/wp5.md`: người dùng duyệt theo đề xuất ("ok", 2026-10-15). Q4 chọn (b): tìm hai lượt.
- **Lệch 1: thêm chỉ mục gộp `dist/<locale>/search-index.json`** (ngoài ghi chú). Lý do: BM25 tính IDF theo từng chỉ mục, nên khi gộp kết quả từ nhiều gói theo `score`, thứ tự bị lệch. Test tương đương đã bắt được: "đăng nhập" trả về `simple-interest` thay vì `token-auth`, vì gói nhỏ có điểm bị phóng đại. Khi chọn **mọi** gói (mặc định của CLI/MCP/site), store dùng chỉ mục gộp, cho thứ tự giống hệt một chỉ mục chung. Khi chọn một tập con (`--pack`), store dùng shard từng gói nên thứ tự giữa các gói vẫn có thể lệch. WP6 cần chọn cách giải quyết cho profile (dựng chỉ mục theo profile lúc `tb pack add`, hoặc gộp shard lúc nạp). **Chưa được duyệt riêng**; cần người dùng xác nhận.
- **Lệch 2: lọc domain theo ranh giới đoạn** (`domainMatches`). Trước đây `--domain it` khớp cả `iot/...`; lỗi này thành thật từ khi WP3 thêm gốc `iot`. Đã sửa ở search, MCP `browse_domain`, site và `tb report locales`. Hệ quả: tiền tố nửa đoạn như `finance/inv` không còn khớp. **Chưa được duyệt riêng**.
- `storeFields` thêm `status`, để site hiển thị trạng thái mà không cần nạp cards.
- `explanations.jsonl` bỏ `entry.filePath`, vì đó là đường dẫn tuyệt đối trên máy build (D-4, và gói sẽ được phân phối). File cũ `dist/<locale>/concepts/<id>.json` vẫn giữ trường này để không đổi byte.
- `alsoIn` có thể trỏ tới gói chưa tồn tại: `cookie` và `roi` có media là domain phụ, nhưng chưa có khái niệm nào lấy media làm domain chính, nên gói `media.digital-marketing` chưa có.
- Store đọc `pack.json` của mọi gói được chọn, kể cả khi dùng chỉ mục gộp, để giữ kiểm `formatVersion` theo từng gói (T-P5). Chi phí là khoảng 1–2 KB mỗi gói.
- Mod không đổi (C-2); mod chuyển sang gói ở WP6.

## Cổng kiểm tra
| Lệnh | Kết quả | Dòng tóm tắt nguyên văn |
|---|---|---|
| `pnpm install --frozen-lockfile` | Đạt | `Done in 297ms using pnpm v11.22.0` (lockfile đổi 3 dòng do thêm dependency workspace `@omnilex/core` cho site; không có thư viện bên ngoài mới) |
| `pnpm typecheck` | Đạt | `$ tsc -b` (exit 0) |
| `pnpm build` | Đạt | `✔ Successfully generated 22 index files and 140 dist artifacts` |
| `pnpm test` | Đạt | `Test Files 16 passed (16)` / `Tests 87 passed (87)` |
| `claude plugin test packages/claude-mod` | Đạt | `10 pass` / `0 fail` |
| `pnpm tb validate --strict` | Đạt | `✔ Validation passed successfully!` |
| `pnpm --filter @omnilex/site build` | Đạt | `T-P8: search page reads shards (no embedded search data)` |
| `pnpm tb build && git diff --exit-code indexes/ llms.txt` | Đạt | diff rỗng (exit 0) |
| `pnpm check:deterministic` | Đạt | `✔ Build is 100% deterministic! All 147 artifacts have identical sha256 hashes across builds.` |
| `pnpm bench --sizes 1000 --check` | Đạt | `✔ Scale 1000 PASSED all performance gates.` |
| `pnpm bench --sizes 10000 --check` (không thuộc CI) | **Không đạt** | `Mod load time: 1097.0ms > budget 300ms`; `MCP find warm: 10.7ms > budget 10ms` |

Đầu ra cũ: `sha256sum -c` trên 71 file trong `dist/`, `packages/claude-mod/data/`, `hooks/runtime/`, `indexes/`, `llms.txt` (chụp trước khi sửa builder): 0 file lệch.

## Hiệu năng
| Chỉ số (10.000 khái niệm) | Trước (sau WP4, đo lại) | Sau | Ngân sách | Đạt? |
|---|---|---|---|---|
| `tb find` lạnh (đọc + nạp chỉ mục + truy vấn) | 564,2 ms | 99,8 ms | ≤ 200 ms | ☑ |
| MCP `find` nóng | 15,9 ms | 10,7 ms | ≤ 10 ms | ✗ |
| Mod: nạp | 1.333,7 ms | 1.097,0 ms | ≤ 300 ms | ✗ (WP6) |
| Mod: dò lần đầu / dò sau | 0,63 / 0,17 ms | 0,53 / 0,13 ms | ≤ 20 / ≤ 2 ms | ☑ |
| Khởi động tiến trình CLI (tham khảo) | 648,9 ms | 189,7 ms | – | – |

| Chỉ số (1.000 khái niệm, cổng CI) | Trước | Sau | Ngân sách | Đạt? |
|---|---|---|---|---|
| `tb find` lạnh | 57,7 ms | 8,9 ms | ≤ 100 ms | ☑ |
| MCP nóng | 2,44 ms | 0,88 ms | ≤ 5 ms | ☑ |
| Mod nạp | 134,6 ms | 112,6 ms | ≤ 300 ms | ☑ |

**MCP nóng ở 10k vẫn vượt ngân sách.** Truy vấn của bench ("hệ thống") có trong summary của **mọi** khái niệm giả, nên khớp 10.000/10.000 tài liệu. Riêng bước chấm điểm và sắp xếp 10.000 kết quả của MiniSearch đã tốn khoảng 9 ms, kể cả khi chỉ khớp chính xác (đo: exact 9,25 ms, exact+prefix 8,95 ms, đầy đủ 12,04 ms). Các truy vấn bình thường mất 0,3–0,5 ms. Tìm hai lượt đã bỏ được phần gần đúng; phần còn lại nằm trong thư viện. Cache kết quả truy vấn sẽ làm bench "đạt" giả, vì bench lặp lại cùng một truy vấn, nên không làm. Theo P-1, ngân sách không bị nới, chờ người dùng quyết.

## Test
- Thêm ròng 33 test: 22 trong `packages/core/test/packs.test.ts`, 5 trong `search-config.test.ts`, 2 trong `packages/cli/test/find.test.ts`, và 4 trong `packages/mcp/test/cache.test.ts` (test T-S4 cũ được viết lại thành 5 test). Tổng số test của `pnpm test` tăng từ 54 lên 87.
- Kiểm tra đột biến: sửa sai `packIdForDomain` thì 8 test T-P1/T-P5/T-S2/T-S3 fail; đã khôi phục.
- Kiểm tra trên trình duyệt (`astro preview`): duyệt danh sách hiện 11 khái niệm; "tien lai lai sinh ra lai" → Lãi kép đứng đầu; "dang nhap" → Token (Xác thực); "token" lọc `it` chỉ còn hai nghĩa IT. Request chỉ gồm `data/manifest.json`, `cards.json` của 7 gói và `data/vi/search-index.json`.
- Ma trận:
  - **T-P1** ☑ mỗi khái niệm thuộc đúng một gói theo `domains[0]`; `alsoIn`; sha256/bytes khớp mọi tier và `pack.json`; meta-pack chỉ có `requires`; `iot`/`product` không chia; JSON schema hợp lệ; JSONL không có `filePath`.
  - **T-P5** ☑ v1 nạp được; không có manifest thì là bố cục cũ (0), không báo; v2 bị bỏ qua với đúng một thông báo, không throw; một gói v2 bị bỏ qua, các gói khác vẫn dùng được.
  - **T-S1** ☑ 55 truy vấn trên 1.000 khái niệm bench: `loadJSON` cho cùng id và điểm (8 chữ số) như chỉ mục dựng mới, cả qua `searchIndexes`. T-S1 cũ (55 truy vấn) vẫn pass.
  - **T-S2** ☑ hash lệch ở manifest hoặc ở gói: dựng lại từ cards, báo một lần, kết quả bằng chỉ mục đúng, không đọc shard lệch.
  - **T-S3** ☑ CLI không gọi `loadAll`, chỉ đọc manifest + `pack.json` + chỉ mục gộp; `--pack it` chỉ đọc shard `it.*`. Hai test đường cũ vẫn pass.
  - **T-S4** ☑ MCP đọc mỗi shard một lần cho mỗi locale; nạp lại khi manifest đổi; đường repo vẫn chỉ `addAll` một lần cho mỗi locale.
  - **T-P8** ☑ HTML không còn `search-data`; mọi shard có trong output; script client fetch `search-index.json`.
  - **Tương đương** ☑ `mergeTerms` trên mọi gói ra đúng `dist/<locale>/terms.json` (so khóa không phân biệt hoa/thường, vì khóa hiển thị là cách viết gặp đầu tiên); tra tầng 0 bằng `lookupConcepts` trên 9 mục × 2 locale; top-1 và tập top-5 của `find` bằng chỉ mục repo trên 12 truy vấn thật.
  - **T-P2, T-P3, T-P4, T-P6, T-P7**: thuộc WP6.

## Tự đánh giá
| Tiêu chí | Đạt/Không | Bằng chứng |
|---|---|---|
| Đúng chức năng | Đạt | 87/87 test; kiểm tra trên trình duyệt; chạy thử `tb find`/`show`/`--pack` |
| Tương thích ngược (C-1..3) | Đạt | 71/71 file cũ khớp sha256; validate strict pass; T-X2 mod pass; test đường cũ của CLI/MCP pass |
| Hiệu năng (P-1, P-2) | Không (một phần) | `tb find` lạnh 10k đạt; MCP nóng 10k 10,7 ms > 10 ms; mod nạp thuộc WP6. P-2: bỏ việc dựng docs O(C) ở mỗi lần gọi `findConcepts`; tra theo id dùng `Map` |
| Build xác định (D-4) | Đạt | `All 147 artifacts have identical sha256`; gói không chứa đường dẫn tuyệt đối hay thời gian |
| Bảo mật/an toàn dữ liệu (D-9, 5.4) | Đạt (phần WP5) | Gói chỉ có JSON/JSONL; có schema cho WP7 import. Kiểm `..`/symlink/giới hạn dung lượng khi import thuộc WP7 |
| Offline/hạ cấp (D-7, D-8) | Đạt | Không dùng mạng; T-P5/T-S2 hạ cấp kèm đúng một thông báo, không throw |
| Windows + Linux (D-5, T-X3) | Chưa kiểm Linux | Chỉ chạy trên Windows 11. Đường dẫn trong dữ liệu dùng `/`; đọc file bằng `path.join`. CI (ubuntu) sẽ kiểm |
| Tài liệu đã cập nhật | Đạt | `docs/schema.md` mục 4, README vi/en, `docs/plans/wp/wp5.md` |

## Rủi ro còn lại và việc chưa làm
- **MCP nóng 10k** vượt 0,7 ms trên truy vấn xấu nhất. Cần người dùng quyết: giữ truy vấn hiện tại làm cổng (chưa đạt), hay bổ sung truy vấn đại diện vào bench và giữ truy vấn xấu nhất ở mức tham khảo.
- **Xếp hạng khi chọn tập con gói** dựa trên điểm của nhiều chỉ mục, nên có thể lệch (Lệch 1). Phải giải quyết ở WP6, khi profile chọn gói.
- **Dist cũ**: vẫn dùng mtime của thư mục `concepts/`, nên sửa nội dung một file mà không thêm/xóa file thì không bị phát hiện (hành vi sẵn có).
- Dung lượng `dist/` tăng (bố cục cũ + gói + chỉ mục gộp) cho tới khi WP6 bỏ bố cục cũ.
- Chưa kiểm trên Linux/macOS ngay trên máy.

## Quyết định sau báo cáo (2026-10-15)
Người dùng giao cho agent tự chốt ("hãy tự chốt cho tôi, và làm luôn"):
1. **Chỉ mục gộp**: giữ. Thứ tự khi chọn tập con gói được giải quyết ở WP6.
2. **Lọc domain theo ranh giới đoạn**: giữ, vì đây là sửa lỗi.
3. **MCP nóng ở 10k**: giữ nguyên ngân sách và truy vấn cổng (P-1). Bench thêm số đo truy vấn đại diện để tham khảo; mục này còn mở trong ngân sách 1.7.
