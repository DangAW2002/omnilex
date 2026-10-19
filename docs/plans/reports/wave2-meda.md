# Báo cáo Lô Wave 2: meda — Báo chí và Sản xuất Truyền thông (25 khái niệm)

Trạng thái: **hoàn thành và sẵn sàng duyệt** (2026-10-17). Toàn bộ 25 khái niệm đều tuân thủ nghiêm ngặt `status: draft`, `provenance.drafted_by: ai`.

## Danh sách khái niệm
| id | Nhóm | Nhãn en | Nhãn vi | Level | Nguồn A/B (definition) | Bằng chứng nhãn vi |
|---|---|---|---|---|---|---|
| `headline` | reporting | Headline | Tiêu đề | 1 | oxford-dict (B) | wiktionary-vi |
| `news-lead` | reporting | Lead (Journalism) | Lead (Báo chí) | 2 | oxford-dict (B) | từ mượn |
| `byline` | reporting | Byline | Byline | 1 | oxford-dict (B) | từ mượn |
| `inverted-pyramid` | reporting | Inverted pyramid | Kim tự tháp ngược | 2 | purdue-owl (B) | wikipedia-vi |
| `breaking-news` | genres | Breaking news | Breaking news | 1 | oxford-dict (B) | từ mượn |
| `op-ed` | genres | Op-ed | Op-ed | 2 | journalists-resource (B) | từ mượn |
| `fact-checking` | ethics | Fact-checking | Kiểm chứng thông tin | 2 | duke-reporters-lab (B) | vietnamplus |
| `anonymous-source` | ethics | Anonymous source | Nguồn tin ẩn danh | 2 | journalists-resource (B) | tuoitre |
| `press-embargo` | media-relations | Embargo (Media) | Embargo (Truyền thông) | 2 | oxford-dict (B) | từ mượn |
| `press-release` | media-relations | Press release | Thông cáo báo chí | 1 | oxford-dict (B) | baochinhphu |
| `press-conference` | media-relations | Press conference | Họp báo | 1 | oxford-dict (B) | wikipedia-vi |
| `spokesperson` | media-relations | Spokesperson | Người phát ngôn | 1 | oxford-dict (B) | wikipedia-vi |
| `crisis-communication` | crisis-communications | Crisis communication | Truyền thông khủng hoảng | 2 | uk-govs (B) | wikipedia-vi |
| `copyright` | copyright-licensing | Copyright | Bản quyền | 1 | us-copyright-office (B) | wikipedia-vi |
| `fair-use` | copyright-licensing | Fair use | Sử dụng hợp lý | 2 | us-copyright-office (B) | wikipedia-vi |
| `creative-commons` | copyright-licensing | Creative Commons | Creative Commons | 1 | creative-commons-org (A) | từ mượn |
| `paywall` | distribution-platforms | Paywall | Paywall | 1 | reuters-institute (B) | từ mượn |
| `b-roll` | video | B-roll | B-roll | 1 | nasa-svs (B) | từ mượn |
| `storyboard` | video | Storyboard | Storyboard | 1 | oxford-dict (B) | từ mượn |
| `aspect-ratio` | video | Aspect ratio | Tỷ lệ khung hình | 1 | w3c (A) | wikipedia-vi |
| `color-grading` | editing | Color grading | Color grading | 2 | blender-docs (B) | từ mượn |
| `voice-over` | audio-podcasts | Voice-over | Thuyết minh | 1 | oxford-dict (B) | wiktionary-vi |
| `podcast` | audio-podcasts | Podcast | Podcast | 1 | apple-podcasts (B) | từ mượn |
| `typography` | visual-design | Typography | Typography | 1 | w3c (A) | từ mượn |
| `visual-hierarchy` | visual-design | Visual hierarchy | Phân cấp thị giác | 2 | nngroup (B) | viblo |

Mọi khái niệm:
- Trạng thái: `status: draft`, `provenance.drafted_by: ai`.
- Nội dung: `en` viết trực tiếp từ nguồn bản ngữ (`translation: native`); `vi` dịch từ `en` (`translation: translated`, `translated_from: en`, `translated_by: ai`, `translated_at: 2026-10-16`).
- Cấu trúc bài viết: Mỗi locale đều có đúng 2 `plain_descriptions` độc nhất, 1 câu `summary` cô đọng, đủ 4 phần thân bài (`## Easy explanation`, `## Details`, `## Technical definition`, `## Examples` / `## Giải thích dễ hiểu`, `## Chi tiết`, `## Định nghĩa chuyên ngành`, `## Ví dụ`) và 2 câu hỏi tiếp nối (`follow_up_questions`).
- Thiết lập liên kết tự động (`autolink`): `news-lead` được đặt `autolink: { label: never }` ở cả hai locale theo đúng yêu cầu phân biệt homonym với `sales-lead` (batch medb).
- Qualifier: `news-lead` có qualifier `(Journalism)` / `(Báo chí)`; `press-embargo` có qualifier `(Media)` / `(Truyền thông)`.
- Quan hệ: Đồ thị quan hệ không chứa chu trình phụ thuộc (`prerequisites`), kết nối mạch lạc giữa các khái niệm trong nhóm nghiệp vụ báo chí, quan hệ công chúng, bản quyền và sản xuất nghe nhìn.

## Nguồn mới trong `config/sources.yaml`
Tất cả các nguồn mới được bổ sung ở cuối file dưới chú thích `# wave2 meda`, đều thiết lập `reuse: paraphrase-only` và ngày xác minh `2026-10-16`:

| ref | Bậc | Loại | Nhà xuất bản | Giấy phép | Ghi chú |
|---|---|---|---|---|---|
| `oxford-dict` | B | dictionary | Oxford University Press | all-rights-reserved | Từ điển học thuật Đại học Oxford |
| `purdue-owl` | B | guide | Purdue University | all-rights-reserved | Trung tâm Hướng dẫn Viết Đại học Purdue |
| `journalists-resource` | B | research | Shorenstein Center, Harvard Kennedy School | CC-BY-ND-4.0 | Trung tâm nghiên cứu báo chí Đại học Harvard |
| `duke-reporters-lab` | B | research | Sanford School of Public Policy, Duke University | all-rights-reserved | Phòng thí nghiệm Báo chí Đại học Duke |
| `reuters-institute` | B | research | Reuters Institute, University of Oxford | CC-BY-4.0 | Viện Nghiên cứu Báo chí Reuters, ĐH Oxford |
| `uk-govs` | B | standard | Government Communication Service, UK Government | Open-Government-Licence-v3.0 | Tiêu chuẩn truyền thông chính phủ Anh |
| `us-copyright-office` | B | docs | U.S. Copyright Office, Library of Congress | public-domain-us-gov | Cơ quan Bản quyền Hoa Kỳ |
| `creative-commons-org` | A | docs | Creative Commons | CC-BY-4.0 | Tổ chức bản quyền mở Creative Commons |
| `apple-podcasts` | B | docs | Apple Inc. | all-rights-reserved | Tài liệu chính thức Apple Podcasts for Creators |
| `blender-docs` | B | docs | Blender Foundation | CC-BY-SA-4.0 | Hướng dẫn sử dụng phần mềm Blender |
| `nasa-svs` | B | docs | NASA | public-domain-us-gov | Thư viện Scientific Visualization Studio của NASA |
| `nngroup` | B | research | Nielsen Norman Group | all-rights-reserved | Nghiên cứu trải nghiệm người dùng Nielsen Norman |
| `vietnamplus` | B | news | Thông tấn xã Việt Nam (VNA) | all-rights-reserved | Bằng chứng nhãn tiếng Việt |
| `baochinhphu` | B | news | Cổng Thông tin điện tử Chính phủ | all-rights-reserved | Bằng chứng nhãn tiếng Việt |
| `tuoitre` | D | news | Báo Tuổi Trẻ | all-rights-reserved | Bằng chứng nhãn tiếng Việt |

Mọi URL nguồn (`locator`) và bằng chứng nhãn đều đã được gửi yêu cầu mạng thực tế (HTTP 200) và dẫn thẳng tới trang đích cuối cùng sau chuyển hướng. Các văn bản nguồn tương ứng phục vụ kiểm tra sao chép đã được lưu đầy đủ trong thư mục `candidates/.sources/`.

## Kết quả các cổng kiểm tra (Gates)
| Cổng kiểm tra | Lệnh thực hiện | Kết quả đầu ra |
|---|---|---|
| **Độ khớp cấu trúc & quy tắc** | `pnpm tb validate --strict` | `✔ Validation passed successfully!` (56 khái niệm nạp vào, 0 lỗi, 0 cảnh báo) |
| **Sinh artifacts & chỉ mục** | `pnpm tb build` | `✔ Successfully generated 22 index files and 372 dist artifacts:` |
| **Xung đột định danh** | `pnpm tb report collisions` | `✔ mọi homonym đều có qualifier và confusable hai chiều` |
| **Kiểm tra trùng văn bản (8 từ)** | `pnpm tb check overlap` | `✔ Không có đoạn trùng ≥ 8 từ / no copied runs of 8+ words` |
| **Kiểm tra trùng văn bản (6 từ)** | `pnpm tb check overlap --size 6` | `✔ Không có đoạn trùng ≥ 6 từ / no copied runs of 6+ words` |
| **Kiểm thử đơn vị** | `pnpm test` | `Test Files 22 passed (22) \| Tests 155 passed (155)` |
| **Kiểm tra kiểu dữ liệu** | `pnpm typecheck` | `tsc -b` thoát mã 0 không lỗi |
| **Tính tất định của bản build** | `node scripts/check-deterministic.js` | `✔ Build is 100% deterministic! All 379 artifacts have identical sha256 hashes across builds.` |
| **Kiểm chuẩn hiệu năng** | `pnpm bench:check` | `✔ Scale 1000 PASSED all performance gates. ✔ Benchmark completed successfully.` |

## Khái niệm không hoàn thành được
Không có. Toàn bộ 25/25 khái niệm của lô `meda` đều được soạn thảo đầy đủ, chuẩn xác, độc lập về câu chữ và vượt qua tất cả các cổng kiểm định nghiêm ngặt.
