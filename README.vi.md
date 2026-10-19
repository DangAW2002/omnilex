# OmniLex

OmniLex là kho thuật ngữ đa ngôn ngữ, đa lĩnh vực, mã nguồn mở, giúp người không chuyên và AI hiểu nhau chính xác.

Ưu tiên ngôn ngữ: **Tiếng Việt (`vi`)** và **Tiếng Anh (`en`)**.  
Ưu tiên lĩnh vực: **Tài chính (`finance`)**, **Media (`media`)**, và **Công nghệ thông tin (`it`)**.

## Hai chiều tra cứu trên cùng một bộ dữ liệu

1. **Người → AI (Tra ngược):** Bạn hiểu ý nghĩa nhưng không biết từ chuyên ngành ("tiền lãi lại sinh ra lãi"). OmniLex đối chiếu sang thuật ngữ chuẩn ("Lãi kép" / "Compound interest") để bạn đưa vào câu lệnh prompt cho AI chuẩn xác.
2. **AI → Người (Tra xuôi):** AI dùng thuật ngữ lạ khiến bạn bối rối. OmniLex giải thích theo từng tầng nhận thức: từ đời thường đến chuyên sâu, chỉ ra các từ dễ nhầm lẫn và gợi ý câu hỏi tiếp theo cho AI.

## Nguyên tắc cốt lõi

1. **Đơn vị gốc là khái niệm, không phải từ:** Một khái niệm có nhãn ở nhiều ngôn ngữ và có thể thuộc nhiều lĩnh vực. Hai nghĩa khác nhau của cùng một từ là hai khái niệm độc lập.
2. **Tách dữ liệu trung lập ngôn ngữ khỏi nội dung ngôn ngữ:** Quan hệ, lĩnh vực, độ khó nằm trong `concept.yaml`; lời giải thích nằm trong file riêng (`vi.md`, `en.md`).
3. **Văn bản thuần trong Git là nguồn sự thật:** YAML và Markdown, đọc được không cần công cụ; mọi chỉ mục, trang web, file cho agent đều sinh ra từ đó.
4. **Một nguồn, hai đầu ra:** Agent đọc chỉ mục Markdown và skill; người dùng tra cứu qua trang web.
5. **Độ tin cậy nhìn thấy được:** Mỗi mục thể hiện rõ trạng thái kiểm duyệt (`draft`, `reviewed`, `verified`, `deprecated`).
6. **Công cụ dòng lệnh không phụ thuộc AI:** `ol validate` và `ol build` luôn cho kết quả xác định. Việc soạn nháp qua AI được dẫn dắt bởi skill riêng.

## Bắt đầu nhanh

### Cài đặt

Yêu cầu Node.js >= 20 và pnpm 11.22.0:

```bash
pnpm install
```

### Các lệnh CLI `ol`

```bash
# Kiểm tra toàn bộ 13 luật hợp lệ
pnpm ol validate

# Kiểm tra ở chế độ nghiêm ngặt (coi cảnh báo là lỗi)
pnpm ol validate --strict

# Build sinh ra indexes, llms.txt và dist
pnpm ol build

# Tra ngược bằng ngôn ngữ đời thường
pnpm ol find "tiền lãi lại sinh ra lãi" --locale vi

# Chỉ tìm trong một số gói (danh sách gói nằm trong dist/manifest.json)
pnpm ol find "token" --locale en --pack it.ai-ml,finance

# Tra xuôi xem giải thích khái niệm
pnpm ol show compound-interest --locale vi

# Từ nhiều nghĩa: xem các lựa chọn, rồi chọn ID cụ thể
pnpm ol show Token --locale vi
pnpm ol show id:token-llm --locale vi

# Báo cáo độ phủ và trạng thái
pnpm ol report locales
pnpm ol report review
```

### Gói dữ liệu và cấu hình project

`ol build` chia dữ liệu thành gói, mỗi gói là một nhánh cấp 2 (`it.ai-ml`, `finance.investing`, …), cùng các meta-pack như `it`, `finance`, `tech`. Mỗi máy, workspace hoặc project chọn những gói mình cần:

```yaml
# .omnilex/config.yaml (commit vào Git; tùy chỉnh cá nhân để ở .omnilex/config.local.yaml)
root: true            # dừng tìm lên thư mục cha, giống .editorconfig
locale: vi
profile: standard     # lite: chỉ nhận diện và thẻ tóm tắt | standard: + tìm kiếm, bài giải thích tải lười
packs: [+tech, -it.security]
limits: { memoryMB: 64 }
```

Thứ tự lớp, từ thấp đến cao: mặc định, `~/.omnilex/config.yaml` (hoặc `$OMNILEX_HOME`), mọi `.omnilex/config.yaml` từ trên xuống tới thư mục hiện tại, `.omnilex/config.local.yaml`, rồi phiên (`--pack`, `OMNILEX_PACKS`, `/omnilex packs`). Giá trị đơn thì lớp cao hơn thắng, `packs` được cộng/trừ theo thứ tự (`packsReset: true` để làm lại từ đầu), còn `limits` lấy giá trị nhỏ nhất.

```bash
pnpm ol config explain                      # cấu hình hiệu lực và nguồn của từng giá trị
pnpm ol pack add finance --from ./dist      # cài vào ~/.omnilex/store và ghi .omnilex/lock.json
pnpm ol pack list                           # project này nạp những gói nào
pnpm ol pack status                         # tier, dung lượng, thời gian nạp của từng gói
pnpm ol pack remove finance.economics
pnpm ol pack install --frozen               # CI: lỗi nếu kho không khớp lock.json
pnpm ol pack prune                          # xóa bản trong kho không còn project nào dùng
```

Gói đã cài nằm một lần trên mỗi máy, ở `~/.omnilex/store/`, và mọi project dùng chung. Trong repo này, `.omnilex/config.yaml` đọc thẳng `dev:./dist` từ `pnpm ol build`.

### Chia sẻ, nhập dữ liệu và glossary của project

```bash
pnpm ol pack export it.ai-ml -o ai-ml.tbpack                       # một gói thành file .tbpack (zip)
pnpm ol pack export --domain it/ai-ml --locales vi,en --tiers terms,cards,search -o ai-ml-lite.tbpack
pnpm ol pack export --effective -o team.tbpack                     # đúng bộ project đang dùng, gồm cả overlay
pnpm ol pack add ./team.tbpack                                     # hoặc https://…/x.tbpack; mọi file đều được kiểm
pnpm ol registry build ./out --base-url https://example.org/packs  # các file .tbpack cùng registry.json
pnpm ol export --format csv -o terms.csv                           # có cả tbx (TBX-Basic) và jsonl
pnpm ol import --from csv terms.csv --into concepts/               # luôn là status: draft, drafted_by: import
pnpm ol import --from tbx glossary.tbx --into .omnilex/glossary/
```

- **Registry**: khai báo trong `registries:` của file cấu hình (URL, URL `file:` hoặc đường dẫn). `ol pack add <id>@<range>` cài từ registry khi không có dist nào cung cấp gói đó. Gói từ registry không tự khai `official: true` được đánh dấu "không chính thức".
- **Glossary của project**: khái niệm trong `.omnilex/glossary/<id>/` (cùng định dạng với `concepts/`) cộng với `packs: [local:./.omnilex/glossary]` sẽ thành gói `local.glossary`, tự dựng lại khi file thay đổi.
- **Overlay** `.omnilex/overrides.yaml` chỉ đổi cách nhận diện và hiển thị trong một project, không sửa bài giải thích:

```yaml
concepts:
  model: { autolink: never }
  token-llm: { aliases: { vi: ["+token AI"] } }
exclude: [cookie]
prefer:
  token: token-llm
```

`ol overlay propose` sinh bản nháp thay đổi tương ứng cho `concepts/` để đóng góp ngược lên repo. Mod Claude Code chỉ đóng sẵn gói `starter` (khoảng 300 khái niệm cơ bản, ≤ 1 MB) để dùng ngay khi chưa cài gói nào.

### Dùng trong Claude Code

Mod OmniLex thêm nhãn tra cứu và thẻ tóm tắt khi hover dưới câu trả lời hoặc câu hỏi, cùng pane `/omnilex` để tra ngược bằng lời thường và `/omnilex browse` để duyệt khái niệm theo lĩnh vực. Xem [hướng dẫn cài đặt và giới hạn hiện tại](packages/claude-mod/README.md).

### Xem trên trình duyệt (local)

Sau `pnpm build`, chạy `pnpm site` rồi mở `http://localhost:4321/`: tìm theo mô tả, hoặc để trống ô tìm và chọn lĩnh vực/nhánh để duyệt toàn bộ khái niệm, nhấn một thẻ để đọc giải thích đầy đủ. `pnpm site:build` rồi `pnpm site:preview` để xem bản tĩnh đã build.

## Giấy phép

- Mã nguồn: [MIT](LICENSE)
- Nội dung: [Creative Commons Attribution 4.0 International (CC BY 4.0)](LICENSE-CONTENT)
