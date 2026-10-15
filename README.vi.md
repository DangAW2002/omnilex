# Termbridge

Termbridge là kho thuật ngữ đa ngôn ngữ, đa lĩnh vực, mã nguồn mở, giúp người không chuyên và AI hiểu nhau chính xác.

Ưu tiên ngôn ngữ: **Tiếng Việt (`vi`)** và **Tiếng Anh (`en`)**.  
Ưu tiên lĩnh vực: **Tài chính (`finance`)**, **Media (`media`)**, và **Công nghệ thông tin (`it`)**.

## Hai chiều tra cứu trên cùng một bộ dữ liệu

1. **Người → AI (Tra ngược):** Bạn hiểu ý nghĩa nhưng không biết từ chuyên ngành ("tiền lãi lại sinh ra lãi"). Termbridge đối chiếu sang thuật ngữ chuẩn ("Lãi kép" / "Compound interest") để bạn đưa vào câu lệnh prompt cho AI chuẩn xác.
2. **AI → Người (Tra xuôi):** AI dùng thuật ngữ lạ khiến bạn bối rối. Termbridge giải thích theo từng tầng nhận thức: từ đời thường đến chuyên sâu, chỉ ra các từ dễ nhầm lẫn và gợi ý câu hỏi tiếp theo cho AI.

## Nguyên tắc cốt lõi

1. **Đơn vị gốc là khái niệm, không phải từ:** Một khái niệm có nhãn ở nhiều ngôn ngữ và có thể thuộc nhiều lĩnh vực. Hai nghĩa khác nhau của cùng một từ là hai khái niệm độc lập.
2. **Tách dữ liệu trung lập ngôn ngữ khỏi nội dung ngôn ngữ:** Quan hệ, lĩnh vực, độ khó nằm trong `concept.yaml`; lời giải thích nằm trong file riêng (`vi.md`, `en.md`).
3. **Văn bản thuần trong Git là nguồn sự thật:** YAML và Markdown, đọc được không cần công cụ; mọi chỉ mục, trang web, file cho agent đều sinh ra từ đó.
4. **Một nguồn, hai đầu ra:** Agent đọc chỉ mục Markdown và skill; người dùng tra cứu qua trang web.
5. **Độ tin cậy nhìn thấy được:** Mỗi mục thể hiện rõ trạng thái kiểm duyệt (`draft`, `reviewed`, `verified`, `deprecated`).
6. **Công cụ dòng lệnh không phụ thuộc AI:** `tb validate` và `tb build` luôn cho kết quả xác định. Việc soạn nháp qua AI được dẫn dắt bởi skill riêng.

## Bắt đầu nhanh

### Cài đặt

Yêu cầu Node.js >= 20 và pnpm 11.22.0:

```bash
pnpm install
```

### Các lệnh CLI `tb`

```bash
# Kiểm tra toàn bộ 13 luật hợp lệ
pnpm tb validate

# Kiểm tra ở chế độ nghiêm ngặt (coi cảnh báo là lỗi)
pnpm tb validate --strict

# Build sinh ra indexes, llms.txt và dist
pnpm tb build

# Tra ngược bằng ngôn ngữ đời thường
pnpm tb find "tiền lãi lại sinh ra lãi" --locale vi

# Chỉ tìm trong một số gói (danh sách gói nằm trong dist/manifest.json)
pnpm tb find "token" --locale en --pack it.ai-ml,finance

# Tra xuôi xem giải thích khái niệm
pnpm tb show compound-interest --locale vi

# Từ nhiều nghĩa: xem các lựa chọn, rồi chọn ID cụ thể
pnpm tb show Token --locale vi
pnpm tb show id:token-llm --locale vi

# Báo cáo độ phủ và trạng thái
pnpm tb report locales
pnpm tb report review
```

### Gói dữ liệu và cấu hình project

`tb build` chia dữ liệu thành gói, mỗi gói là một nhánh cấp 2 (`it.ai-ml`, `finance.investing`, …), cùng các meta-pack như `it`, `finance`, `tech`. Mỗi máy, workspace hoặc project chọn những gói mình cần:

```yaml
# .termbridge/config.yaml (commit vào Git; tùy chỉnh cá nhân để ở .termbridge/config.local.yaml)
root: true            # dừng tìm lên thư mục cha, giống .editorconfig
locale: vi
profile: standard     # lite: chỉ nhận diện và thẻ tóm tắt | standard: + tìm kiếm, bài giải thích tải lười
packs: [+tech, -it.security]
limits: { memoryMB: 64 }
```

Thứ tự lớp, từ thấp đến cao: mặc định, `~/.termbridge/config.yaml` (hoặc `$TERMBRIDGE_HOME`), mọi `.termbridge/config.yaml` từ trên xuống tới thư mục hiện tại, `.termbridge/config.local.yaml`, rồi phiên (`--pack`, `TERMBRIDGE_PACKS`, `/termbridge packs`). Giá trị đơn thì lớp cao hơn thắng, `packs` được cộng/trừ theo thứ tự (`packsReset: true` để làm lại từ đầu), còn `limits` lấy giá trị nhỏ nhất.

```bash
pnpm tb config explain                      # cấu hình hiệu lực và nguồn của từng giá trị
pnpm tb pack add finance --from ./dist      # cài vào ~/.termbridge/store và ghi .termbridge/lock.json
pnpm tb pack list                           # project này nạp những gói nào
pnpm tb pack status                         # tier, dung lượng, thời gian nạp của từng gói
pnpm tb pack remove finance.economics
pnpm tb pack install --frozen               # CI: lỗi nếu kho không khớp lock.json
pnpm tb pack prune                          # xóa bản trong kho không còn project nào dùng
```

Gói đã cài nằm một lần trên mỗi máy, ở `~/.termbridge/store/`, và mọi project dùng chung. Trong repo này, `.termbridge/config.yaml` đọc thẳng `dev:./dist` từ `pnpm tb build`. Cài từ registry trực tuyến sẽ có ở WP7.

### Dùng trong Claude Code

Mod Termbridge thêm nhãn tra cứu và thẻ tóm tắt khi hover dưới câu trả lời hoặc câu hỏi, cùng pane `/termbridge` để tra ngược bằng lời thường. Xem [hướng dẫn cài đặt và giới hạn hiện tại](packages/claude-mod/README.md).

## Giấy phép

- Mã nguồn: [MIT](LICENSE)
- Nội dung: [Creative Commons Attribution 4.0 International (CC BY 4.0)](LICENSE-CONTENT)
