# Ghi chú thiết kế WP7: Import/export, glossary local, overlay, attributions, registry, gói starter

Tham chiếu: Kế hoạch 3.6, 3.7, 3.9, 2.8f, D6; bàn giao 6.5 (T-I1..T-I6), D-9.
Duyệt: người dùng giao cho agent tự quyết phần còn lại ("bạn hãy quyết định còn lại", 2026-10-15). Mục 6 ghi các quyết định đó.

## 1. Phạm vi

1. **`attributions.json`** trong mỗi gói nội dung (T-I5): liệt kê các nguồn `reuse: adapt` mà khái niệm của gói tham chiếu (ở `sources` cấp khái niệm và cấp locale), mỗi nguồn kèm danh sách id khái niệm. `pack.json` có thêm trường `attributions`.
2. **Gói `starter`** (D6, T-I6): khái niệm `level: 1`, xếp theo bậc nguồn tốt nhất (A > B > C > D), sau đó theo id; tối đa 300 khái niệm và ≤ 1 MB. Chỉ có tier `terms`, `cards`, `search`. Gói có `"role": "starter"` và không nằm trong chỉ mục gộp. Resolver không tự chọn `starter` khi đã có gói khác; nếu được chọn cùng gói khác thì `PackStore` khử trùng theo id khái niệm, gói đứng trước thắng.
3. **`.tbpack`** = zip có `pack.json` ở gốc (3.6). Đọc/ghi bằng `node:zlib` (deflate raw) với một bộ đọc/ghi ZIP nhỏ trong core, **không thêm dependency**.
   - `tb pack export <id…> [--tiers terms,cards,search] [--locales vi,en] -o <file|dir>`;
   - `tb pack export --domain <path> -o` (gói dẫn xuất `local.<slug>`);
   - `tb pack export --effective -o` (gói `local.effective`, đúng bộ project đang dùng, đã áp overlay).
   - `tb pack add ./x.tbpack | https://…/x.tbpack`: giải nén vào kho, có đủ các bước kiểm của D-9 (T-I1).
4. **Registry**:
   - `tb registry build <dir> [--base-url]` ghi `*.tbpack` và `registry.json` (`{ registryVersion: 1, packs: { id: { versions: { v: { url, sha256, bytes, formatVersion } } } } }`);
   - `tb pack add <id>@<range>` tìm trong `registries` của cấu hình (URL `http(s)`, `file:` hoặc đường dẫn local) khi không có nguồn dev/`--from`;
   - gói từ registry ghi `origin` trong lock và hiện "không chính thức" trừ khi registry tự khai `official: true`.
5. **Export/import CSV, TBX, JSONL** (`tb export --format csv|tbx|jsonl [--pack …] -o`; `tb import --from csv|tbx <file> --into concepts/|.termbridge/glossary/`):
   - CSV: mỗi dòng là một cặp khái niệm × locale. Cột chính dễ sửa trên bảng tính: `id, locale, label, qualifier, aliases, loanwords, plain_descriptions, summary, domains, level, body`, danh sách ngăn bằng `" | "`. Hai cột JSON `locale_extra`, `concept_extra` giữ phần còn lại, để đi vòng không mất.
   - TBX-Basic (ISO 30042): `conceptEntry` → `langSec` → `termSec` (`term`, `termNote` loại `administrativeStatus`), cùng `descrip` loại `definition` (summary) và `subjectField` (domains). Chỉ các trường đó đi vòng.
   - JSONL: mỗi dòng gồm card + bài giải thích, dùng cho pipeline ML/RAG.
   - Import vào `concepts/` luôn đặt `status: draft`, `provenance: { drafted_by: import }` (T-I3), bỏ thông tin duyệt. Dòng thiếu nguồn bị từ chối, vì rule 17 cần ≥ 1 nguồn.
6. **Glossary local** (3.7): `.termbridge/glossary/<id>/concept.yaml + <locale>.md`, khai báo bằng `packs: [local:./glossary]` → gói `local.<tên thư mục>`.
   - CLI/MCP dựng gói vào `.termbridge/.cache/packs/` khi dấu vân tay nguồn (đường dẫn + kích thước + mtime) đổi.
   - Mod chỉ đọc bản đã dựng; thiếu thì báo một lần.
   - ID trùng với gói đã cài thì cảnh báo.
7. **Overlay** `.termbridge/overrides.yaml` (khóa `overrides` trong cấu hình; mặc định `.termbridge/overrides.yaml` nếu có), áp lúc nạp bằng hàm thuần `applyOverlay` (T-I4):
   - `concepts.<id>.autolink: always|never`;
   - `concepts.<id>.aliases.<locale>: ["+x", "-y"]`;
   - `exclude: [id]`;
   - `prefer: { key: id }`.
   - Bài giải thích không đổi.
   - `tb overlay propose` in ra bản nháp thay đổi cho `concepts/`.
8. **Mod**: khi không có project hay kho thì dùng gói `starter` đóng kèm (`packages/claude-mod/data/packs/`); `data/*.json` cũ còn giữ làm phương án cuối, cho tới khi nội dung lớn hơn `starter` (WP8).

Không làm: CI phát hành lên GitHub Releases (cần quyền và quy trình phát hành, để người dùng quyết khi phát hành); trang `ATTRIBUTION.md` trên site (để WP10).

## 2. An toàn khi nhận `.tbpack` (D-9, T-I1)
- Chỉ nhận tên file trong danh sách cho phép: `pack.json`, `attributions.json`, `<locale>/{terms.json,cards.json,search-index.json,explanations.jsonl}`, với locale khớp `^[a-z]{2,3}(-[A-Za-z0-9]+)?$`.
- Từ chối `..`, đường dẫn tuyệt đối, ký tự `\`, mục là symlink (theo thuộc tính ZIP), file nén hoặc giải nén vượt giới hạn (mặc định 64 MB mỗi file, 256 MB cả gói), và tổng kích thước giải nén vượt số khai báo.
- Validate `pack.json` bằng `schema/pack.schema.json`; parse mọi file JSON/JSONL; kiểm sha256 và số byte từng tier so với `pack.json`; nếu có `sha256` từ registry/lock thì kiểm cả file `.tbpack`.
- Giải nén vào thư mục tạm trong kho, kiểm xong mới rename. Lỗi thì xóa thư mục tạm; không file nào được ghi ra ngoài.

## 3. Interface
- `core/src/zip.ts` (Node): `writeZip(entries)`, `readZip(buffer, limits) → entries` (đọc central directory, kiểm cờ symlink và kích thước).
- `core/src/tbpack.ts` (Node): `exportPack(dir, options) → Buffer`, `importTbpack(buffer, { home, expectedSha })`, `derivePack(...)`.
- `core/src/registry.ts`: `fetchRegistry(url)`, `resolveFromRegistries(id, range, urls)`, `buildRegistry(...)`.
- `core/src/exchange.ts`: `toCsv`, `fromCsv`, `toTbx`, `fromTbx`, `toJsonl`, `writeConcepts(rows, target)`.
- `core/src/overlay.ts` (thuần): `parseOverlay`, `applyOverlay(overlay, { terms, cards }, locale)`.
- `core/src/glossary.ts` (Node): `buildLocalPack(dir, cacheDir)`.

## 4. Test
- **T-I1** zip độc: `../`, đường dẫn tuyệt đối, symlink, file quá lớn, đuôi lạ, JSON hỏng, sai sha256; mỗi trường hợp đều có thông báo rõ và không có file nào nằm ngoài thư mục đích.
- **T-I2** đi vòng:
  - `.tbpack` export → import ra dữ liệu hiệu lực giống hệt;
  - CSV export → import → export giống hệt;
  - TBX hợp lệ cấu trúc TBX-Basic và giữ được các trường hỗ trợ.
- **T-I3** import vào một bản sao repo: `draft`, `drafted_by: import`, `validate --strict` pass.
- **T-I4** overlay `exclude`, `prefer`, `autolink`, alias có hiệu lực ở nhận diện, tìm kiếm và tra cứu; bài giải thích không đổi.
- **T-I5** attributions đủ các nguồn `adapt` mà gói dùng.
- **T-I6** `starter` ≤ 1 MB, có đúng `terms`, `cards`, `search`.
- Registry dùng file local (không mạng); glossary local dựng lại khi nguồn đổi.

## 5. Rủi ro
- Bộ đọc ZIP tự viết chỉ hỗ trợ cách nén `stored` và `deflate`, không hỗ trợ ZIP64; gói > 4 GB bị từ chối.
- Alias thêm bằng overlay được tra cứu và nhận diện thấy, nhưng chỉ mục tìm kiếm dựng sẵn không thấy (không dựng lại khi nạp).

## 6. Quyết định agent tự chốt
- **Q1**: không dùng `fflate`, vì `node:zlib` đủ dùng và tránh thêm dependency.
- **Q2**: `starter` là gói nội dung có `role: starter`; trùng khái niệm thì khử theo id.
- **Q3**: CSV dùng cột chính + hai cột JSON để đi vòng không mất.
- **Q4**: chưa đụng tới CI phát hành; registry dựng được ngay trên máy bằng `tb registry build`.
- **Q5**: `data/*.json` của mod giữ tới WP8.
