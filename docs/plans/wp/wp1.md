# Ghi chú thiết kế WP1: Thắng nhanh, không đổi định dạng dữ liệu (P1)

## 1. Phạm vi
Thực hiện các tối ưu hóa P1 trong Mục 1.8 của Kế hoạch:
1. `packages/claude-mod/hooks/register.js`:
   - Dùng `conceptsById` `Map<string, Concept>` O(1) thay cho các lệnh quét tuyến tính `concepts.find()`.
   - `forwardSpans`: Tái sử dụng mảng regex biên dịch sẵn `matchers` thay vì tạo `new RegExp` trên từng term mỗi khi gọi.
   - `reverseHints`: Chuẩn hóa sẵn (`normalize`) các `plain_descriptions` khi nạp dữ liệu thay vì gọi `normalize()` trong mỗi lần so khớp.
   - Tải lười bài giải thích: Không nạp trước toàn bộ `concepts-*.json` (markdown giải thích nặng); chỉ nạp khi mở pane xem chi tiết hoặc khi được yêu cầu.
2. `packages/core/src/query.ts`:
   - Hỗ trợ hàm tìm kiếm từ `search.json` dựng sẵn hoặc nạp chỉ mục MiniSearch qua `loadJSON`.
   - Cache MiniSearch instance trong core / MCP theo `locale` (hoặc `(locale, pack)`).
3. `packages/cli/src/index.ts`:
   - `tb find`: Đọc trực tiếp `dist/<locale>/search.json` thay vì gọi `loadAll()`. So sánh mtime giữa `dist` và `concepts/`; nếu `dist` cũ hoặc chưa có thì cảnh báo và fallback về `loadAll()`.
4. `packages/mcp/src/index.ts`:
   - Cache MiniSearch instance theo locale trong tiến trình, không dựng lại ở mỗi tool call `find_term`.

## 2. Các file sẽ đổi / tạo mới
- Sửa:
  - `packages/claude-mod/hooks/register.js`
  - `packages/core/src/query.ts`
  - `packages/cli/src/index.ts`
  - `packages/mcp/src/index.ts`
- Tạo mới:
  - `docs/plans/wp/wp1.md`
  - `packages/core/test/search-index.test.ts` (test T-S1)
  - `packages/cli/test/find.test.ts` (test T-S3)
  - `packages/mcp/test/cache.test.ts` (test T-S4)

## 3. Interface & Chữ ký hàm
- `packages/core/src/query.ts`:
  - `searchFromPrebuilt(searchEntries: SearchEntry[], query: string, options?: FindOptions): FindResult[]`
  - `getSearchIndex(locale: string, entries: SearchEntry[]): MiniSearch` (cached per locale)
  - `createSearchIndex(entries: SearchEntry[]): MiniSearch`
  - `searchIndexToJSON(index: MiniSearch): any`
  - `loadSearchIndexFromJSON(json: any): MiniSearch`
- `packages/cli/src/index.ts`:
  - `findWithPrebuilt(rootDir: string, query: string, options: { locale: string; domain?: string }): FindResult[]`

## 4. Test sẽ viết
- **T-S1**: MiniSearch serialize `toJSON` rồi `loadJSON` cho kết quả giống hệt chỉ mục dựng mới trên ≥ 50 query (vi/en, có dấu/không dấu, typo, prefix).
- **T-S3**: `tb find` đọc trực tiếp `dist/<locale>/search.json` mà không gọi `loadAll()`; kiểm tra cảnh báo và fallback khi dist cũ.
- **T-S4**: MCP `find_term` gọi 3 lần nhưng chỉ khởi tạo/dựng MiniSearch 1 lần duy nhất cho mỗi locale.

## 5. Rủi ro
- Cache trong MCP: Cần hỗ trợ vô hiệu hóa cache khi manifest/dist thay đổi.
- Tải lười giải thích trong mod: Cần đảm bảo UI pane không bị trắng nội dung khi chọn term (nạp bất đồng bộ mượt mà).
