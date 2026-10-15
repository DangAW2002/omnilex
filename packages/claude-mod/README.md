# Termbridge cho Claude Code

Yêu cầu Claude Code 2.1.287 trở lên. Kiểm tra bằng `claude --version`.

Trong thư mục gốc của repo:

```bash
pnpm build
claude plugin validate ./packages/claude-mod
claude plugin test ./packages/claude-mod
claude --plugin-dir ./packages/claude-mod
```

Để tự nạp mod ở các phiên sau mà không cần `--plugin-dir`, đặt biến môi trường Windows `CLAUDE_CODE_PLUGIN_DIRS` thành đường dẫn tuyệt đối `D:\Users\Dang\termbridge\packages\claude-mod`, rồi mở lại terminal hoặc Claude Desktop. Đây là tùy chọn nạp plugin từ thư mục cục bộ; chưa cần xuất bản marketplace.

Trong phiên Claude Code:

- Gõ `/termbridge lang en` để xem tóm tắt, pane tra cứu và giải thích bằng tiếng Anh; gõ `/termbridge lang vi` để trở lại tiếng Việt. Gõ `/termbridge lang` để xem ngôn ngữ đang chọn. Mod nhớ lựa chọn cho các phiên sau. Mod vẫn nhận diện thuật ngữ tiếng Việt và tiếng Anh trong câu trả lời.
- Với câu ngắn một dòng, không có Markdown hoặc URL, hover **trực tiếp trên cụm thuật ngữ trong câu trả lời** để xem thẻ tóm tắt nổi phía trên; nhấn cụm đó để mở pane giải thích đầy đủ.
- Với câu hỏi ngắn chứa mô tả đời thường đã biết, hover trực tiếp trên cụm mô tả để xem thuật ngữ chuẩn. Câu hỏi cần đang ở dạng hiển thị đầy đủ.
- Với câu dài hoặc có Markdown, cách hiển thị tùy chế độ, đổi bằng `/termbridge mode <tên>` (lưu qua các phiên):
  - `hover` (mặc định): dòng văn xuôi hoặc mục list có thuật ngữ được mod tự dàn dòng để hover trực tiếp trên thuật ngữ; code, bảng, trích dẫn và các dòng khác vẫn do Markdown gốc vẽ.
  - `links`: toàn bộ tin nhắn do Markdown gốc vẽ, lần nhắc đầu của mỗi thuật ngữ thành link; nhấn link mở pane (terminal fullscreen), không có thẻ hover.
  - `badges`: giữ cách vẽ gốc và đặt nhãn tra cứu bên dưới tin nhắn.
- Gõ `/termbridge` để nhập mô tả bất kỳ. Chọn kết quả, rồi nhấn **Chèn thuật ngữ vào prompt** để đưa nhãn chuẩn vào ô nhập.
- Mod đọc cấu hình `.termbridge/` của thư mục nơi bạn khởi động Claude Code (đi ngược lên thư mục cha) và nạp đúng các gói project chọn. Không có project hay gói nào đã cài thì mod dùng gói `starter` đóng kèm (khái niệm cơ bản, ≤ 1 MB). Overlay `.termbridge/overrides.yaml` của project (exclude, prefer, autolink, alias) cũng có hiệu lực trong mod.
- `/termbridge packs it.ai-ml,finance` chỉ nạp các gói đó trong phiên này; `/termbridge packs all` trở lại lựa chọn của project. `/termbridge profile lite|standard|semantic` đổi profile trong phiên (`lite` không nạp tìm kiếm và bài giải thích). `/termbridge status` cho biết project, profile, các gói, tier đang nạp và cảnh báo.

Để thử hover trực tiếp, yêu cầu Claude trả lời đúng một dòng thuần văn bản có chữ `Lãi kép`, không dùng Markdown. Mod thay cách vẽ của riêng dòng đó; nội dung hội thoại lưu trữ không bị sửa. Đây là bản thử: cách xuống dòng, định dạng và vị trí thẻ hover trên máy của bạn vẫn cần kiểm tra trực quan. Mod vẽ giao diện trong terminal và tab Code của Claude Desktop, không vẽ trong khung chat VS Code.

Khi sửa dữ liệu thuật ngữ, chạy lại `pnpm build` rồi `/reload-plugins` trong Claude Code hoặc khởi động phiên mới. `pnpm tb build` chỉ sinh dữ liệu từ bản `core` đã biên dịch; dùng `pnpm build` sau khi sửa mã của builder.
