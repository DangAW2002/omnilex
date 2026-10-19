# Bàn giao triển khai: OMNILEX mở rộng quy mô + từ vựng công nghệ

> Tài liệu này dành cho agent triển khai (Claude Code hoặc agent tương đương). Đây là **hợp đồng làm việc**: các quy tắc dùng từ "PHẢI" và "KHÔNG ĐƯỢC" là bắt buộc. Khi tài liệu này mâu thuẫn với `AGENTS.md`, **`AGENTS.md` thắng**. Khi tài liệu này mâu thuẫn với kế hoạch, tài liệu này thắng, nhưng phải báo lại cho người dùng.

## 0. Mục tiêu

Triển khai kế hoạch [2026-10-scale-and-tech-vocabulary.md](./2026-10-scale-and-tech-vocabulary.md) (gọi tắt là **Kế hoạch**):

1. Tra cứu vẫn nhanh khi tăng từ 11 lên 10.000+ khái niệm (mod, CLI, MCP, site), với embedding là tùy chọn.
2. Phân phối dữ liệu theo gói, cấu hình theo phạm vi máy/workspace/project, có import/export.
3. Bổ sung từ vựng công nghệ có nguồn dẫn chứng và metadata đầy đủ.

Các quyết định D1–D12 trong Kế hoạch **đã chốt**. KHÔNG ĐƯỢC chọn phương án khác. Nếu thấy một quyết định không khả thi, dừng lại và báo cáo kèm bằng chứng.

## 1. Tài liệu PHẢI đọc trước khi làm (theo thứ tự)

1. `AGENTS.md` và `CLAUDE.md`: luật của repo
2. Kế hoạch: đọc toàn bộ, đặc biệt các mục 1.4, 1.7, 2.2, 2.8, Phần 3 và bảng quyết định
3. `docs/schema.md`, `schema/*.schema.json`
4. `docs/style-guide.vi.md`, `docs/style-guide.en.md`
5. `skills/OMNILEX-author/SKILL.md`, `CONTRIBUTING.md`
6. `docs/adr/0001-*.md`, `docs/adr/0002-claude-code-mod-adapter.md`
7. Code liên quan tới work package (WP) đang làm. Đọc code trước khi đề xuất sửa; không đoán API.
8. Khi động vào mod (`packages/claude-mod/`): dùng skill `plugin-authoring` để nắm API mod và cách chạy test mod.

## 2. Hiện trạng cần biết

- Monorepo pnpm: `packages/core` (logic), `cli`, `mcp`, `claude-mod` (JS thuần, `hooks/register.js`), `site` (Astro).
- Test:
  - `pnpm test` (vitest ở root) chạy `packages/core/test/*`.
  - **Test mod bị loại khỏi vitest ở root** (`vitest.config.ts`). Chúng dùng harness `claude-code/testing` và PHẢI được chạy riêng; tìm cách chạy qua skill `plugin-authoring`.
- CI (`.github/workflows/validate.yml`): typecheck → build → test → `tb validate --strict` → build site → `git diff --exit-code indexes/ llms.txt`.
- Máy của người dùng chạy **Windows** (Git Bash). Code và test PHẢI chạy được trên cả Windows và Linux (CI).
- Working tree có thể đang có nhiều thay đổi chưa commit. Xem quy trình ở mục 5.1.
- Mốc ban đầu đã được commit trên nhánh `chore/baseline-and-plans`, ngày 2026-10-14.

### 2.1 Việc còn mở (đã xử lý trong WP0)

- **O-1 Lệnh chạy test mod**: Đã xác định và kiểm chứng: `claude plugin test packages/claude-mod` (7/7 tests pass). Đã cập nhật vào mục 5.3.
- **O-2 Xuống dòng**: Đã tạo `.gitattributes` (`* text=auto eol=lf`, `*.bin binary`, `*.tbpack binary`), đã được người dùng phê duyệt và chạy `git add --renormalize .`.
- **O-3 Nhánh chính**: Đã xác nhận nhánh cơ sở tách các WP là `chore/baseline-and-plans` (hoặc nhánh WP trước đó theo thứ tự). WP0 tách nhánh `feat/wp0-bench-and-baseline`.

## 3. Work package và thứ tự

| WP | Nội dung (mục trong Kế hoạch) | Phụ thuộc |
|---|---|---|
| WP0 | Benchmark + ngân sách hiệu năng + test vàng của mod (1.7) + script `check:deterministic` + đưa vào CI | – |
| WP1 | Thắng nhanh, không đổi định dạng dữ liệu (P1 ở 1.8) | WP0 |
| WP2 | Schema và validator: `autolink` (2.2), nguồn có cấu trúc, `label_evidence`, metadata dịch, rule 14–18, `config/sources.yaml`, `tb sources migrate` (2.8, D12) | WP0 |
| WP3 | Mở rộng taxonomy, gốc `iot` và `product`, cập nhật config (2.1, D1) | WP2 |
| WP4 | Bộ nhận diện trie trong core + sinh `hooks/runtime/` cho mod (1.4b, 1.4c, D8) | WP1 |
| WP5 | Định dạng gói + chỉ mục dựng sẵn + manifest (1.4d, 3.2, D5) | WP4 |
| WP6 | Resolver, phạm vi cấu hình, kho gói, lockfile, ngân sách tài nguyên, lệnh `tb pack …`, `/OMNILEX packs/profile` (3.3–3.5, 3.8, D3, D7, D11) | WP5 |
| WP7 | Import/export (`.tbpack`, CSV, TBX, JSONL), glossary local, overlay, `attributions.json`, registry, gói `starter` (3.6, 3.7, 3.9, D6) | WP6, WP2 |
| WP8 | Nội dung: khai thác ứng viên (D4), `tb ingest`, đợt 1 (2.3–2.7) | WP2, WP3; **đợt 2 cần thêm WP4** |
| WP9 | Tầng ngữ nghĩa, tùy chọn (1.4e, D2) | WP5 |
| WP10 | Site ở quy mô lớn (1.5, P6) | **Chưa làm** cho tới khi có > 5.000 khái niệm |

Ràng buộc cứng:
- WP2 PHẢI xong trước khi tạo khái niệm mới đầu tiên của WP8.
- Tổng số khái niệm KHÔNG ĐƯỢC vượt 400 trước khi WP4 xong.

## 4. Quy tắc thiết kế (bất biến)

### 4.1 Kiến trúc
- **D-1** `concepts/` là nguồn sự thật. KHÔNG ĐƯỢC sửa tay `indexes/`, `dist/`, `llms.txt`, `packages/claude-mod/data/`, `packages/claude-mod/hooks/runtime/`. Các thư mục này chỉ được sinh qua `tb build`.
- **D-2** Logic nằm trong `packages/core`. CLI, MCP, mod và site chỉ là lớp mỏng. Mỗi thứ sau đây **chỉ có một bản cài đặt**: cấu hình tìm kiếm (`search-config`), bộ nhận diện (`matcher`), `resolver`, hàm normalize.
- **D-3** Code đưa vào `hooks/runtime/` PHẢI là JS thuần, không dùng API của Node (`fs`, `path`, `process`). Mọi I/O đi qua adapter truyền vào; trong mod, adapter dùng `$.fs.read`.
- **D-4** Build **xác định**: cùng đầu vào thì ra từng byte giống nhau. Sắp xếp ổn định, khóa JSON theo thứ tự cố định, không chèn thời gian hay đường dẫn tuyệt đối.
- **D-5** Đường dẫn trong dữ liệu xuất ra luôn dùng `/`. Đọc file thì dùng `path.join`/`path.resolve`. Phải chịu được file có xuống dòng CRLF.
- **D-6** Unicode:
  - nhận diện xuôi so khớp sau khi chuẩn hóa NFC và hạ chữ thường, **giữ dấu** ("lãi" không khớp "lai");
  - tìm kiếm và tra ngược dùng `normalizeSearchTerm` (bỏ dấu);
  - văn bản đầu vào dạng NFD vẫn phải khớp.
- **D-7** Offline trước tiên. Chỉ các lệnh sau được dùng mạng: `tb pack add|update|install`, `tb sources check`, `tb ingest`, và `tb build --embed` với provider HTTP. **Test không bao giờ dùng mạng.**
- **D-8** Tầng tùy chọn (vectors, explanations từ xa, gói thiếu) khi không có thì **tự hạ cấp và báo đúng một lần**. KHÔNG ĐƯỢC throw, KHÔNG ĐƯỢC làm hỏng các tầng thấp hơn.
- **D-9** Gói chỉ chứa dữ liệu. Khi import PHẢI:
  - chỉ chấp nhận tên file nằm trong danh sách cho phép;
  - chặn `..`, đường dẫn tuyệt đối và symlink;
  - giới hạn dung lượng;
  - kiểm tra sha256;
  - validate JSON schema.
  Markdown chỉ được render dưới dạng văn bản.

### 4.2 Tương thích ngược
- **C-1** 11 khái niệm hiện có PHẢI qua `tb validate --strict` sau mỗi WP. Được phép chuyển đổi dữ liệu, nhưng chỉ qua lệnh migrate có test.
- **C-2** `sources` dạng chuỗi vẫn hợp lệ; `--domain` vẫn là alias của bộ lọc. Mod vẫn đọc được `data/*.json` cũ cho tới khi WP6 chuyển hẳn sang gói.
- **C-3** Kết quả nhận diện của bộ trie PHẢI **giống hệt** bản regex cũ trên bộ dữ liệu so sánh (xem T-M2). Chỉ được khác ở những hành vi mới có chủ đích (autolink `always`/`never`, bỏ phiếu ngữ cảnh), và các khác biệt đó phải có test riêng.

### 4.3 Hiệu năng
- **P-1** Ngân sách ở bảng 1.7 của Kế hoạch là **cổng bắt buộc**. KHÔNG ĐƯỢC nới ngân sách để cho qua. Nếu không đạt, dừng lại và báo cáo kèm số đo.
- **P-2** Không thêm vòng lặp O(C) vào đường nóng (mỗi câu trả lời, mỗi phím gõ, mỗi truy vấn). Mọi phép tra theo id dùng `Map`.

### 4.4 Phụ thuộc
- **Dep-1** Được dùng thư viện đã có (`minisearch`, `yaml`, `commander`, …).
- **Dep-2** Thư viện mới PHẢI nhỏ, không có dependency con nặng, và lý do phải ghi trong báo cáo WP. Gợi ý: `fflate` cho zip.
- **Dep-3** Thư viện cho model embedding (`@huggingface/transformers` hoặc tương đương) chỉ được khai báo là `optionalDependencies` và nạp bằng `import()` động. Thiếu thư viện thì đi theo D-8.

### 4.5 Phong cách
- Viết giống code xung quanh: cách đặt tên, mật độ comment (ít), kiểu ESM, TypeScript strict trong core.
- Thông báo cho người dùng cuối viết bằng tiếng Việt và tiếng Anh, theo cơ chế `UI_TEXT` hoặc i18n sẵn có.

## 5. Quy trình bắt buộc

### 5.1 Trước khi bắt đầu phiên
1. Chạy `git status`.
   - Nếu working tree **có thay đổi chưa commit** mà không phải do bạn tạo trong phiên này: **DỪNG**. Hỏi người dùng muốn commit làm mốc, hay làm tiếp trên trạng thái hiện tại.
   - KHÔNG ĐƯỢC `stash`, `reset`, `checkout --` hay xóa file của người dùng.
2. Chạy toàn bộ cổng kiểm tra (5.3) trên trạng thái hiện tại và ghi lại kết quả làm **mốc ban đầu**. Nếu mốc đã có lỗi, ghi lại nguyên văn, báo người dùng, và không tự sửa lỗi nằm ngoài WP.

### 5.2 Vòng làm việc cho mỗi WP
1. **Branch**: `feat/wp<N>-<slug>`, tách từ HEAD mà người dùng chỉ định. Mặc định là HEAD hiện tại sau khi đã có mốc.
2. **Hiểu**: đọc code liên quan. Viết ghi chú thiết kế ngắn tại `docs/plans/wp/wp<N>.md`, gồm:
   - phạm vi;
   - các file sẽ đổi;
   - interface (kiểu dữ liệu, chữ ký hàm, định dạng file);
   - test sẽ viết;
   - rủi ro.
   Với WP có thay đổi schema hoặc định dạng (WP2, WP5, WP6, WP7): **DỪNG** sau bước này và chờ người dùng duyệt ghi chú.
3. **Test trước** cho logic trong core: viết test thất bại, sau đó mới cài đặt.
4. **Cài đặt** theo từng commit nhỏ, mỗi commit đều qua cổng kiểm tra.
5. **Chạy cổng kiểm tra** (5.3), toàn bộ, ngay trên máy.
6. **Tự review** theo checklist ở 7.2, đọc lại toàn bộ diff của WP.
7. **Báo cáo** WP theo mẫu ở 7.1, lưu tại `docs/plans/reports/wp<N>.md`.
8. **Commit** theo Conventional Commits (`feat(core): …`, `test(mod): …`), kèm dòng attribution theo quy định của repo hoặc môi trường.
9. **DỪNG** và chờ người dùng xác nhận trước khi sang WP kế tiếp, trừ khi người dùng đã cho phép chạy liên tục.

### 5.3 Cổng kiểm tra (PHẢI pass, chạy ngay trên máy, không suy đoán)

```bash
pnpm install --frozen-lockfile        # chỉ bỏ --frozen-lockfile khi WP có thêm dependency
pnpm typecheck
pnpm build
pnpm test
claude plugin test packages/claude-mod
pnpm tb validate --strict
pnpm --filter @omnilex/site build
pnpm tb build && git diff --exit-code indexes/ llms.txt   # file sinh ra đã commit phải khớp
pnpm check:deterministic              # từ sau WP0: build 2 lần, so sha256 mọi file trong dist/, packages/claude-mod/data/, hooks/runtime/
pnpm bench --sizes 1000 --check       # từ sau WP0; fail nếu vượt ngân sách
```

`dist/` nằm trong `.gitignore`, nên độ xác định của build phải kiểm bằng `check:deterministic` (script Node chạy được trên mọi hệ điều hành, do WP0 tạo), không dùng `git diff`. WP0 cũng PHẢI thêm `check:deterministic` và `bench --check` vào `.github/workflows/validate.yml`.

Từ WP4 trở đi, chạy thêm `pnpm bench --sizes 10000` và đưa số đo vào báo cáo; không cần chạy trong CI.

### 5.4 KHÔNG ĐƯỢC
- push, mở PR, tạo tag hay release nếu người dùng chưa yêu cầu rõ ràng;
- nâng `status` lên `reviewed`/`verified`, xóa khái niệm, đổi `id`, sửa file sinh tự động;
- skip, xóa hoặc nới test, rule validator hay ngân sách hiệu năng để cho qua;
- sửa `node_modules`, patch package đã cài, mock thay hành vi thật trong test tích hợp;
- commit nội dung transcript, dữ liệu cá nhân, secret, hay đoạn văn bản chép từ nguồn `paraphrase-only`/`cite-only`;
- đặt `reuse: adapt` cho nguồn mà chưa có `license_verified_by` của người duyệt (D12);
- tự chế nhãn tiếng Việt (2.8d);
- tuyên bố một việc "đã xong" hay "đã pass" khi không có output của lệnh làm bằng chứng.

### 5.5 Điểm dừng bắt buộc (hỏi người dùng)
- Working tree bẩn khi bắt đầu phiên (5.1).
- Ghi chú thiết kế của WP2, WP5, WP6, WP7 (5.2 bước 2).
- Mọi thay đổi làm dữ liệu hiện có không còn hợp lệ nếu không migrate.
- Thêm dependency mới.
- Lệch khỏi bất kỳ quyết định D1–D12 nào.
- Mục `config/sources.yaml` đề xuất `reuse: adapt`.
- Mỗi lô nội dung WP8, trước khi commit: đưa danh sách và kết quả kiểm tra cho người dùng xem.
- Cổng kiểm tra fail mà sau 2 lần sửa có lý do vẫn chưa qua.

### 5.6 Khi giao việc cho agent phụ
Được giao các việc khối lượng lớn và lặp lại, ví dụ soạn nội dung theo lô hay sinh test hàng loạt. Bạn vẫn **chịu trách nhiệm kiểm chứng**:
- đọc diff;
- tự chạy lại cổng kiểm tra trong trạng thái sạch;
- không tin báo cáo "đã pass" của agent phụ;
- kiểm tra xem agent phụ có sửa môi trường (lockfile, `node_modules`, config test) để ép test qua không.

## 6. Kế hoạch kiểm thử bắt buộc

Mỗi mục phải có test tự động, trừ khi được ghi rõ là kiểm tra thủ công. Báo cáo WP PHẢI đánh dấu từng mục thuộc WP đó.

### 6.1 Bộ nhận diện (WP4)
- **T-M1** Ranh giới từ Unicode:
  - "Lãi kép" khớp trong "…về lãi kép." và không khớp trong "lãi képx";
  - chữ cái hoặc số dính liền thì không khớp;
  - dấu câu ở biên vẫn khớp.
- **T-M2 (oracle)** So sánh với bản regex cũ: sinh ≥ 2.000 văn bản ngẫu nhiên với seed cố định, trộn term/alias, biến thể hoa thường, dấu câu, xuống dòng, tiếng Việt NFC và NFD. Kết quả (start, end, conceptId) của bộ trie PHẢI trùng với bản regex cũ, giữ lại trong test làm oracle. Mọi khác biệt có chủ đích được liệt kê và có test riêng.
- **T-M3** Khớp dài nhất và chồng lấn: "compound interest rate" chọn cụm dài nhất; các khoảng không chồng lên nhau.
- **T-M4** `exact-case`: "API" khớp, "api" không khớp. Từ viết tắt 2 ký tự có `autolink: always` thì khớp; `autolink: never` thì không bao giờ khớp.
- **T-M5** Giữ dấu: "lai kep" không khớp "Lãi kép" ở nhận diện xuôi, nhưng vẫn tìm ra được qua `find`.
- **T-M6** Văn bản rỗng, chỉ có khoảng trắng, chỉ có code fence, emoji/ký tự rộng (offset vẫn đúng), văn bản 50 KB.
- **T-M7** Homonym: term có nhiều khái niệm thì không autolink khi không có ngữ cảnh. Bỏ phiếu ngữ cảnh chọn đúng khái niệm khi một lĩnh vực có nhiều phiếu hơn rõ rệt; hòa thì dùng thứ tự gói hoặc `prefer` của overlay.
- **T-M8** Tra ngược: `plain_descriptions` khớp sau khi bỏ dấu; giữ ngưỡng ≥ 12 ký tự như hiện tại.

### 6.2 Tìm kiếm (WP1, WP5)
- **T-S1** Chỉ mục `toJSON` rồi `loadJSON` cho kết quả **giống hệt** chỉ mục dựng mới trên một bộ ≥ 50 truy vấn (vi/en, có dấu và không dấu, sai chính tả nhẹ, tiền tố).
- **T-S2** Cấu hình tìm kiếm khác hash trong manifest thì dựng lại hoặc cảnh báo, không trả kết quả sai.
- **T-S3** `tb find` không còn gọi `loadAll()` khi `dist` mới (kiểm bằng spy hoặc đếm số file đã đọc); `dist` cũ thì cảnh báo và quay về đường cũ.
- **T-S4** MCP chỉ dựng hoặc nạp chỉ mục một lần cho mỗi `(locale, pack)` qua nhiều lần gọi tool (spy).

### 6.3 Schema, validator, nguồn (WP2, WP3)
- **T-V1** Mỗi rule 14–18 có ít nhất một fixture pass và một fixture fail, kiểm đúng `ruleId` và mức lỗi.
- **T-V2** 13 rule cũ vẫn pass toàn bộ test hiện có.
- **T-V3** `tb sources migrate`:
  - chạy hai lần cho kết quả như nhau (idempotent);
  - chuỗi URL được chuyển sang dạng có cấu trúc, `ref` suy ra đúng;
  - URL lạ chuyển sang `ref: unknown` kèm cảnh báo, không làm mất dữ liệu.
- **T-V4** `autolink`: mặc định giữ quy tắc cũ; `always`/`never` được áp vào `terms.json`; cảnh báo từ phổ thông (`config/common-words.<locale>.txt`).
- **T-V5** Taxonomy mới: domain `iot/...` và `product/...` hợp lệ; `reviewers.yaml` có mục cho domain mới.

### 6.4 Gói, resolver, cấu hình (WP5, WP6)
- **T-P1** Builder xuất gói đúng định dạng 3.2:
  - mỗi khái niệm nằm trong đúng một gói (theo domain chính), có `alsoIn`;
  - sha256 trong `pack.json` khớp nội dung;
  - meta-pack chỉ có `requires`.
- **T-P2** Thứ tự phân lớp cấu hình: mặc định < người dùng < workspace/project (đi ngược lên, dừng ở `root: true`) < `config.local` < phiên. Kiểm các trường hợp:
  - `+`/`-` gói;
  - `packsReset`;
  - `limits` lấy giá trị nhỏ nhất;
  - `tb config explain` ghi đúng nguồn của từng giá trị.
- **T-P3** Phụ thuộc: phạm vi semver của `requires` được resolve đúng; vòng phụ thuộc báo lỗi rõ; thiếu gói khi offline thì nạp phần còn lại và cảnh báo một lần.
- **T-P4** Ngân sách tài nguyên: vượt `limits` thì hạ cấp đúng thứ tự 3.5, và mỗi bước đều được báo.
- **T-P5** `formatVersion` N và N-1 nạp được; N+1 bị bỏ qua kèm thông báo.
- **T-P6** Kho và lockfile:
  - `install --frozen` fail khi lock không khớp;
  - sai hash thì fail;
  - `prune` giữ lại phiên bản đang được tham chiếu;
  - hai project dùng chung một bản trong kho.
- **T-P7** Mod với `$` giả:
  - xác định project từ thư mục khởi động (D11);
  - `/OMNILEX packs`, `/OMNILEX profile`, `/OMNILEX status` hoạt động;
  - đổi locale vẫn đúng;
  - bài giải thích tải lười.
- **T-P8** Site build được, và trang tìm kiếm đọc shard thay vì JSON nhúng trong HTML (kiểm trên kết quả build).

### 6.5 Import/export, overlay (WP7)
- **T-I1** Bảo mật: zip có `../`, đường dẫn tuyệt đối, symlink, file vượt dung lượng, đuôi lạ, JSON hỏng, sai sha256. Mỗi trường hợp đều bị từ chối với thông báo rõ, và không có file nào được ghi ra ngoài thư mục đích.
- **T-I2** Đi vòng: `export` → `import` → dữ liệu hiệu lực giống hệt. Tương tự cho CSV. TBX là XML hợp lệ với cấu trúc TBX-Basic, và các trường được hỗ trợ đi vòng không mất.
- **T-I3** `tb import --into concepts/` luôn tạo `status: draft`, `provenance.drafted_by: import`, và kết quả qua `validate --strict`.
- **T-I4** Overlay: `exclude`, `prefer`, ghi đè `autolink`, thêm alias đều có hiệu lực; nội dung bài giải thích không bị đổi.
- **T-I5** `attributions.json` liệt kê đủ các nguồn `adapt` mà gói đã dùng.
- **T-I6** Gói `starter` ≤ 1 MB, gồm đúng các tier `terms`, `cards`, `search`.

### 6.6 Tầng ngữ nghĩa (WP9)
- **T-E1** Provider giả, xác định (vector sinh từ hash), dùng trong mọi test; không tải model thật.
- **T-E2** Lượng tử hóa int8: sai số cosine sau khi giải lượng tử ≤ 0,02.
- **T-E3** RRF trộn đúng thứ hạng trên fixture biết trước.
- **T-E4** Model khác `vectors.meta.json`, thiếu thư viện tùy chọn, hay provider lỗi mạng: đều hạ về `standard`, báo một lần, và kết quả bằng đúng kết quả của Tầng 2.

### 6.7 Tích hợp đầu-cuối
- **T-X1** CLI chạy dưới dạng tiến trình con trên một repo fixture trong thư mục tạm. Kiểm tra mã thoát và output chính của: `build`, `find`, `show`, `validate`, `pack add/remove/list/status/export/import`, `config explain`.
- **T-X2** **Test vàng của mod**: khoảng 30 câu trả lời mẫu kiểu Claude (vi/en, có danh sách, tiêu đề, code fence, link, câu dài nhiều dòng). Snapshot gồm các khoảng ở chế độ hover/links/badges được tạo ở WP0 bằng **code cũ**. Từ đó, mọi thay đổi snapshot phải được giải thích trong báo cáo.
- **T-X3** Test chạy được trên Windows (máy người dùng) và Linux (CI).

### 6.8 Hiệu năng (WP0 tạo, mọi WP sau giữ)
- **T-B1** `bench/generate.ts` sinh dữ liệu xác định theo seed, đúng tỷ lệ thật (khoảng 3,8 mẫu nhận diện mỗi khái niệm, có tiếng Việt có dấu, từ viết tắt, homonym).
- **T-B2** `pnpm bench --sizes 1000 --check` fail khi vượt ngân sách, quy đổi tuyến tính từ bảng 1.7.
- **T-B3** Báo cáo mỗi WP có bảng số đo trước và sau ở 1.000 và 10.000 khái niệm.

### 6.9 Chất lượng nội dung (WP8, mỗi lô)
- **T-C1** `tb validate --strict` không có lỗi; cảnh báo nào còn lại phải có lý do.
- **T-C2** Chạy `tb report collisions`; mọi homonym mới có qualifier ở vi và en, `confusable` hai chiều.
- **T-C3** Mỗi khái niệm có ≥ 1 nguồn A/B với `supports: definition`; nhãn tiếng Việt có `label_evidence` hoặc là từ mượn.
- **T-C4** Kiểm tra thủ công mẫu ngẫu nhiên 20% (seed ghi trong báo cáo) theo checklist ở 2.5, cùng 100% homonym. Ghi kết quả từng khái niệm.
- **T-C5** Không có đoạn nào trùng nguyên văn ≥ 8 từ liên tiếp với `quote` hoặc văn bản nguồn `paraphrase-only` đã lấy về. Tự viết script kiểm tra cho việc này.

## 7. Đánh giá

### 7.1 Mẫu báo cáo WP (`docs/plans/reports/wp<N>.md`)

```markdown
# Báo cáo WP<N>: <tên>

## Tóm tắt
<3–5 câu: đã làm gì, cho ai, kết quả chính>

## Thay đổi
| File | Loại | Ghi chú |

## Quyết định và lệch kế hoạch
<mỗi điểm: nội dung, lý do, đã được người dùng duyệt chưa>

## Cổng kiểm tra
| Lệnh | Kết quả | Dòng tóm tắt nguyên văn |

## Hiệu năng
| Chỉ số | Trước | Sau | Ngân sách | Đạt? |

## Test
- Đã thêm: <số lượng> test, ở <các file>
- Ma trận: T-xx ☑ / ☐ (lý do nếu ☐)

## Tự đánh giá
| Tiêu chí | Đạt/Không | Bằng chứng |
| Đúng chức năng | | |
| Tương thích ngược (C-1..3) | | |
| Hiệu năng (P-1, P-2) | | |
| Build xác định (D-4) | | |
| Bảo mật/an toàn dữ liệu (D-9, 5.4) | | |
| Offline/hạ cấp (D-7, D-8) | | |
| Windows + Linux (D-5, T-X3) | | |
| Tài liệu đã cập nhật | | |

## Rủi ro còn lại và việc chưa làm
```

Quy tắc chấm điểm: một tiêu chí chỉ được ghi **Đạt** khi có bằng chứng (output lệnh, tên test, số đo). Không có bằng chứng thì ghi **Không**, hoặc "Chưa kiểm" kèm lý do.

### 7.2 Checklist tự review diff
- [ ] Không còn code chết, `console.log` gỡ lỗi, TODO không có chủ.
- [ ] Không có vòng O(C) mới trên đường nóng; tra theo id dùng `Map`.
- [ ] Mọi hàm trong `hooks/runtime/` không dùng API Node.
- [ ] Đường dẫn và xuống dòng an toàn cho Windows.
- [ ] Thông báo người dùng có cả vi và en.
- [ ] Đã cập nhật `docs/schema.md`, `SKILL.md`, `AGENTS.md` (số rule), README (lệnh mới) nếu WP có ảnh hưởng.
- [ ] Không có file sinh tự động nào bị sửa tay; `check:deterministic` pass.
- [ ] Test thất bại khi đảo ngược phần cài đặt chính (kiểm nhanh bằng cách tạm sửa sai một chỗ).

### 7.3 Định nghĩa "xong" cho toàn bộ bàn giao (trừ WP9, WP10)
1. Tất cả cổng kiểm tra ở 5.3 pass trên Linux (CI) và Windows (máy người dùng).
2. Ngân sách 1.7 đạt ở 10.000 khái niệm giả (WP4 trở đi), có số đo trong báo cáo.
3. Toàn bộ ma trận 6.1–6.5, 6.7–6.8 đã đánh dấu ☑, hoặc có lý do được người dùng chấp nhận.
4. Đợt 1 khoảng 150 khái niệm ở trạng thái `draft`, qua T-C1–T-C5, có báo cáo lô.
5. Hướng dẫn người dùng: README (vi/en) có mục cài và chọn gói, cấu hình `.omnilex/`, import/export.
6. Báo cáo tổng `docs/plans/reports/final.md`: tóm tắt các WP, số đo cuối, rủi ro còn lại, đề xuất bước tiếp (WP9, WP10, đợt 2).
