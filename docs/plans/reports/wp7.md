# Báo cáo WP7: Import/export, glossary local, overlay, attributions, registry, gói starter

## Tóm tắt
OMNILEX giờ chia sẻ và nhận dữ liệu được mà không cần fork repo:
- **`.tbpack`**: zip một gói. Có thể export cả gói, hoặc gói dẫn xuất theo domain/locale/tier, hoặc đúng bộ project đang dùng (`--effective`). Import kiểm đủ các bước của D-9.
- **Registry**: `registry.json` + các file `.tbpack`; `tb pack add id@range` cài từ registry.
- **CSV, TBX-Basic, JSONL**: export và import; import vào `concepts/` luôn ra `draft` với `drafted_by: import`.
- **Glossary local** của project, dựng thành gói `local.<tên>`.
- **Overlay** theo project: `exclude`, `prefer`, `autolink`, alias.
- **`attributions.json`** trong mỗi gói.
- **Gói `starter`** (≤ 1 MB) đóng kèm mod.

Không thêm dependency nào: zip dùng `node:zlib`, XML dùng một bộ phân tích nhỏ tự viết. Cả 10 cổng kiểm tra đều qua; ở 10k, MCP nóng vẫn là chỉ số duy nhất chưa đạt (giống WP6).

## Thay đổi
| File | Loại | Ghi chú |
|---|---|---|
| `packages/core/src/zip.ts` | Mới | Đọc/ghi ZIP (stored/deflate), xác định, kiểm symlink/thư mục/mã hóa/ZIP64/kích thước/CRC32, chặn zip bomb bằng `maxOutputLength` |
| `packages/core/src/tbpack.ts` | Mới | `packDirToTbpack`, `derivePack` (lọc domain, locale, tier, chuyển đổi bằng overlay), `inspectTbpack` (D-9), `importTbpack` (thư mục tạm rồi rename) |
| `packages/core/src/pack-schema.ts` | Mới | Bản nhúng của `schema/pack.schema.json` để validate khi chạy ngoài repo; có test giữ hai bản khớp nhau |
| `packages/core/src/registry.ts` | Mới | `buildRegistry`, `findInRegistries`, `installFromRegistries` (meta-pack kéo theo gói phụ thuộc, kiểm sha256 file); hỗ trợ `http(s)`, `file:` và đường dẫn |
| `packages/core/src/exchange.ts` | Mới | CSV (RFC 4180, cột chính + `locale_extra`/`concept_extra`), TBX-Basic (ghi + bộ đọc XML nhỏ), JSONL, `writeConcepts` |
| `packages/core/src/overlay.ts` | Mới | `parseOverlay`, `overlayCards`, `overlayTerms`, `overlayLookup`, `overlayConcepts` (hàm thuần, cũng được sinh sang `hooks/runtime/`) |
| `packages/core/src/glossary.ts` | Mới | `buildLocalPack` (dựng lại theo dấu vân tay nguồn), `ensureLocalPacks`; cảnh báo id trùng |
| `packages/core/src/packs.ts` | Sửa | `conceptPackData` tách ra từ builder (builder và glossary dùng chung, D-2); `selectStarter`; `attributions.json`; `role: starter`; tùy chọn `tiers` |
| `packages/core/src/builder.ts` | Sửa | Dùng `conceptPackData`; xuất `starter` vào `dist/` và vào `packages/claude-mod/data/starter/` |
| `packages/core/src/pack-format.ts`, `schema/*.schema.json` | Sửa | `role`, `attributions`, `PackAttribution`; lựa chọn mặc định không lấy starter khi có gói khác |
| `packages/core/src/pack-reader.ts` | Sửa | Áp overlay; khử trùng khái niệm giữa các gói (gói đứng trước thắng) |
| `packages/core/src/project.ts`, `resolver.ts` | Sửa | Nguồn `local:` (đọc bản dựng trong cache), overlay đọc từ `.omnilex/overrides.yaml` hoặc khóa `overrides`, `origin` trong lock, starter chỉ được chọn khi đứng một mình |
| `packages/core/src/loader.ts` | Sửa | `loadConceptsFrom(dir)` |
| `packages/cli/src/packs.ts` | Sửa | `tb pack add <file|url|id>` (dist → registry), `tb pack export`, `tb registry build`, `tb export`, `tb import`, `tb overlay propose`; `install`/`update` cài được từ registry |
| `packages/mcp/src/index.ts` | Sửa | Overlay và glossary local |
| `packages/claude-mod/hooks/register.js` | Sửa | Overlay; rơi về `starter` đóng kèm; khử trùng cards |
| Test | Mới | `tbpack.test.ts` (13), `exchange.test.ts` (12), mod T-I4 (1) |
| `README.md`, `README.vi.md`, `packages/claude-mod/README.md`, `docs/schema.md` | Sửa | Chia sẻ/nhập dữ liệu, glossary, overlay, registry; schema mục 6 |

## Quyết định và lệch kế hoạch
Người dùng giao cho agent tự quyết ("bạn hãy quyết định còn lại", "tiếp tục"). Q1–Q5 ghi trong `docs/plans/wp/wp7.md`:
- **Q1** không dùng `fflate`; `node:zlib` đủ dùng nên không thêm dependency.
- **Q2** `starter` là gói nội dung có `role: starter`; khái niệm trùng được khử theo id.
- **Q3** CSV có hai cột JSON để đi vòng không mất.
- **Q4** chưa làm CI phát hành.
- **Q5** `data/*.json` của mod giữ tới WP8.

Thêm:
- **Starter không có dữ liệu sử dụng (2.3)**: xếp theo `level: 1`, rồi bậc nguồn tốt nhất, rồi id. Hiện có 7 khái niệm, 36 KB.
- **Import TBX vào `concepts/` bị từ chối** khi thiếu nguồn hoặc thiếu `plain_descriptions`, vì TBX không có các trường đó và rule 17 cần ≥ 1 nguồn. Vào glossary thì được.
- **Alias thêm bằng overlay** được nhận diện và tra cứu thấy, nhưng không có trong chỉ mục tìm kiếm dựng sẵn. `exclude` được lọc sau khi tìm, có xin dư kết quả để bù.
- **MCP chỉ dựng lại glossary** khi file nó đang theo dõi thay đổi (cấu hình, lock, overlay, manifest, kho). Sửa một file trong glossary cần chạy lại lệnh CLI hoặc khởi động lại MCP.
- **Gói từ registry là "không chính thức"** trừ khi `registry.json` tự khai `official: true`. Hiện chưa có registry chính thức (site chưa phát hành).

## Cổng kiểm tra
| Lệnh | Kết quả | Dòng tóm tắt nguyên văn |
|---|---|---|
| `pnpm install --frozen-lockfile` | Đạt | `Done in 362ms using pnpm v11.22.0` (không thêm dependency) |
| `pnpm typecheck` | Đạt | `$ tsc -b` (exit 0) |
| `pnpm build` | Đạt | `✔ Successfully generated 22 index files and 180 dist artifacts` |
| `pnpm test` | Đạt | `Test Files 21 passed (21)` / `Tests 145 passed (145)` |
| `claude plugin test packages/claude-mod` | Đạt | `17 pass` / `0 fail` |
| `pnpm tb validate --strict` | Đạt | `✔ Validation passed successfully!` |
| `pnpm --filter @omnilex/site build` | Đạt | `T-P8: search page reads shards (no embedded search data)` |
| `pnpm tb build && git diff --exit-code indexes/ llms.txt` | Đạt | diff rỗng |
| `pnpm check:deterministic` | Đạt | `✔ Build is 100% deterministic! All 187 artifacts have identical sha256 hashes across builds.` |
| `pnpm bench --sizes 1000 --check` | Đạt | `✔ Scale 1000 PASSED all performance gates.` |
| `pnpm bench --sizes 10000 --check` (không thuộc CI) | Không đạt | `MCP find warm: 13.8ms > budget 10ms` |
| `claude plugin validate packages/claude-mod` | Đạt | `✔ Validation passed` |

Đầu ra cũ (`dist/<locale>/…`, `packages/claude-mod/data/*.json`, `indexes/`, `llms.txt`) vẫn khớp sha256 với ảnh chụp trước WP5 sau khi tách `conceptPackData`. Chỉ `hooks/runtime/matcher.js` và `lookup.js` khác, vì builder đã bỏ dòng `sourceMappingURL` từ WP6.

## Hiệu năng (10k, 1 lần chạy)
Mod nạp 239,6 ms (≤ 300 ☑), dựng sau 137 ms (tham khảo), `tb find` lạnh 158,9 ms (≤ 200 ☑), MCP nóng 13,8 ms (≤ 10 ✗). Lần chạy này máy chậm hơn lúc đo WP6; WP7 không đổi đường nóng nào ngoài việc lọc overlay, và lọc đó chỉ chạy khi project có overlay. Ở 1k mọi chỉ số đều đạt.

## Test
- Thêm 25 test vitest (120 → 145) và 1 test mod (16 → 17).
- Kiểm tra đột biến: bỏ kiểm `..` và danh sách tên cho phép thì 2 test T-I1 fail; đã khôi phục.
- Chạy thử đầu-cuối trên project tạm, mọi bước đều đúng:
  - `registry build` (11 gói);
  - `pack export` (cả gói và dẫn xuất);
  - `pack add finance` từ registry (meta-pack và 4 gói con);
  - `pack add ./x.tbpack`;
  - overlay có hiệu lực trong `find`/`show`;
  - `overlay propose`;
  - `export --format csv` (14 dòng);
  - `install --frozen`;
  - lock ghi `origin`.
- Ma trận:
  - **T-I1** ☑ từ chối `../`, đường dẫn tuyệt đối, ổ đĩa, `\`, tên lạ, file không khai báo, thiếu file đã khai báo, symlink, vượt giới hạn từng file hoặc cả gói, zip bomb, JSON hỏng, `pack.json` sai schema, sai sha256 từng file, sai sha256 so với registry/lock, file không phải zip. Mỗi trường hợp có thông báo rõ; kho không có gì mới và thư mục tạm bị xóa.
  - **T-I2** ☑
    - `.tbpack` export → import: file trong kho giống từng byte, cùng kết quả tìm kiếm và bài giải thích;
    - CSV export → import → export giống hệt; ký tự `,`, `"` và xuống dòng đi vòng được;
    - TBX hợp lệ cấu trúc TBX-Basic (namespace ISO 30042, `tbxHeader`/`text`) và các trường hỗ trợ đi vòng;
    - JSONL: mỗi dòng đọc được.
  - **T-I3** ☑ import CSV của 11 khái niệm vào bản sao repo → `draft`, `drafted_by: import`; sau `tb build`, `validate --strict` không có lỗi hay cảnh báo; nội dung giữ nguyên. Thiếu nguồn thì từ chối; đã có thì bỏ qua nếu không có `--overwrite`.
  - **T-I4** ☑ `exclude`, `prefer`, `autolink: never` và alias thêm/bớt có hiệu lực ở nhận diện, tra cứu và tìm kiếm; bài giải thích không đổi; `openProject` đọc `overrides.yaml` và theo dõi file này; trong mod, thuật ngữ bị exclude không được hover, alias mới thì được.
  - **T-I5** ☑ `attributions.json` của mọi gói khớp đúng tập nguồn `adapt` mà khái niệm của gói dùng (đối chiếu từ `concepts/`), giấy phép khớp `config/sources.yaml`; sha256 nằm trong `pack.json`.
  - **T-I6** ☑ `starter` có `role: starter`, đúng `terms`/`cards`/`search`, ≤ 1 MB, gồm toàn bộ khái niệm `level: 1` (tối đa 300); bản đóng kèm mod chỉ có `starter`.
  - **Glossary local** ☑ chưa dựng thì báo; dựng xong thì `local.glossary` tra cứu được và có bài giải thích; không đổi thì không dựng lại; sửa file thì dựng lại; id trùng thì cảnh báo.
  - **Registry** ☑ cài meta-pack kèm gói phụ thuộc mà không dùng mạng; id không có thì báo lỗi; `.tbpack` bị sửa thì bị từ chối.

## Tự đánh giá
| Tiêu chí | Đạt/Không | Bằng chứng |
|---|---|---|
| Đúng chức năng | Đạt | 145/145 vitest, 17/17 test mod, chạy thử đầu-cuối |
| Tương thích ngược (C-1..3) | Đạt | validate strict; đầu ra cũ khớp sha256; T-X2 pass |
| Hiệu năng (P-1, P-2) | Không (một phần) | Như WP6: MCP nóng 10k chưa đạt; overlay chỉ chạy khi có |
| Build xác định (D-4) | Đạt | `All 187 artifacts identical`; zip ghi xác định (tên đã sắp xếp, thời gian cố định) |
| Bảo mật/an toàn dữ liệu (D-9, 5.4) | Đạt | Ma trận T-I1; XML bỏ qua DTD và entity ngoài, không bao giờ tải về |
| Offline/hạ cấp (D-7, D-8) | Đạt | Chỉ `pack add|install|update` có thể dùng mạng; test chỉ dùng file local |
| Windows + Linux (D-5, T-X3) | Chưa kiểm Linux | Windows 11; CI sẽ kiểm |
| Tài liệu đã cập nhật | Đạt | README vi/en, README mod, `docs/schema.md` mục 6, `wp7.md` |

## Rủi ro còn lại và việc chưa làm
- MCP nóng 10k (từ WP5).
- CI phát hành (build gói → GitHub Releases → `registry.json` trên site) chưa làm; cần quyền repo và quyết định về quy trình phát hành.
- Trang `ATTRIBUTION.md` trên site và chọn gói trên site (3.8) chưa làm.
- Bộ đọc ZIP không hỗ trợ ZIP64 (gói > 4 GB).
- Explanations JSONL có thể vượt giới hạn 4 MiB của `$.fs.read` trong mod khi một gói rất lớn (từ WP6).
