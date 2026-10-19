# Ghi chú thiết kế WP0: Benchmark + Ngân sách hiệu năng + Deterministic Build + Mod Golden Tests

## 1. Phạm vi
- Giải quyết 3 việc mở O-1, O-2, O-3 (mục 2.1 của Handoff):
  - O-1: Chốt lệnh chạy test mod là `claude plugin test packages/claude-mod`.
  - O-2: Thêm `.gitattributes` (`* text=auto eol=lf`, file nhị phân `binary`). Dừng hỏi người dùng trước khi chạy `git add --renormalize .`.
  - O-3: Xác nhận nhánh WP tách từ `chore/baseline-and-plans` (nhánh hiện tại `feat/wp0-bench-and-baseline`).
- Xây dựng công cụ benchmark và sinh dữ liệu giả định theo seed:
  - `bench/generate.ts`: Sinh N khái niệm giả (1k, 10k) theo seed cố định, đúng tỷ lệ thực (~3.8 mẫu nhận diện/khái niệm, tiếng Việt có dấu, từ viết tắt, homonym).
  - `bench/run.ts`: Chạy benchmark đo nạp mod, lần dò đầu (câu không khớp, câu dài có thuật ngữ), lần dò sau, CLI `tb find` lạnh/nóng, MCP `find` nóng, dung lượng dist.
  - Ngân sách CI: `pnpm bench --sizes 1000 --check` fail khi vượt ngân sách quy đổi từ bảng 1.7.
- Kiểm tra tính xác định của build:
  - `scripts/check-deterministic.js`: Xóa dist/data, build lần 1 tính sha256; build lần 2 tính sha256; so sánh từng file trong `dist/`, `packages/claude-mod/data/`, `packages/claude-mod/hooks/runtime/`.
- Test vàng của mod (T-X2):
  - `packages/claude-mod/tests/golden-replies.test.ts`: Bộ 30 câu trả lời mẫu kiểu Claude Code (vi/en, markdown phong phú: list, heading, code fence, table, link, câu dài) chạy trên mod hiện tại để chụp snapshot các spans/badges/cards làm mốc oracle cho WP4.
- Cập nhật scripts ở root `package.json` và thêm gates vào `.github/workflows/validate.yml`.
- Cập nhật `docs/plans/2026-10-handoff.md`.

## 2. Các file sẽ đổi / tạo mới
- Tạo mới:
  - `.gitattributes`
  - `docs/plans/wp/wp0.md`
  - `scripts/check-deterministic.js`
  - `bench/tsconfig.json`
  - `bench/generate.ts`
  - `bench/run.ts`
  - `packages/claude-mod/tests/golden-replies.test.ts`
- Cập nhật:
  - `package.json` (thêm scripts: `check:deterministic`, `bench`, `bench:check`)
  - `.github/workflows/validate.yml` (thêm gates `check:deterministic`, `bench --sizes 1000 --check`)
  - `docs/plans/2026-10-handoff.md` (giải quyết O-1, O-2, O-3)

## 3. Interface & Định dạng
- **`bench/generate.ts`**:
  - `generateMockDataset(size: number, seed: number): MockDataset`
  - Output gồm: `terms-{locale}.json`, `concepts-{locale}.json`, `search-{locale}.json`.
  - Phân bố: ~3.8 patterns/khái niệm, 10% từ viết tắt (exact-case), 5% homonym, tiếng Việt NFC có dấu.
- **`bench/run.ts`**:
  - CLI options: `--sizes <1000,10000>`, `--check`, `--seed <number>`.
  - Output: In bảng số đo (ms, MB) và so sánh với ngân sách bảng 1.7.
  - Exit code: 0 nếu pass mọi chỉ số trong ngân sách, 1 nếu vượt ngân sách khi có `--check`.
- **`scripts/check-deterministic.js`**:
  - Thực thi: `node scripts/check-deterministic.js`.
  - Quét đệ quy `dist/` và `packages/claude-mod/data/`.
  - Build 1 -> hash map 1; Build 2 -> hash map 2. So khớp từng hash.
  - Exit code: 0 nếu khớp 100%, 1 nếu có file lệch hash hoặc lệch danh sách file.
- **`packages/claude-mod/tests/golden-replies.test.ts`**:
  - Dùng harness `claude-code/testing`.
  - 30 fixture texts đa dạng ngữ cảnh thực tế của Claude Code.

## 4. Test sẽ viết
- T-B1: Kiểm tra tính tất định của dữ liệu mock sinh từ seed.
- T-B2: Chạy `pnpm bench --sizes 1000 --check` kiểm tra ngân sách.
- T-X2: 30 test vàng cho mod chạy qua `claude plugin test packages/claude-mod`.

## 5. Rủi ro
- Benchmark trên môi trường máy khác nhau có độ lệch xung nhịp CPU: Sử dụng warmup runs và trung bình 3-5 lần đo để giảm nhiễu.
- O-2 renormalize chạm nhiều file: Phải hỏi người dùng trước khi chạy `git add --renormalize .`.
