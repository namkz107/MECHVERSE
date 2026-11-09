# Academy upgrade — U0–U5

> **For agentic workers:** implement inline with executing-plans; independent research uses dispatching-parallel-agents. Spec: `docs/UPGRADE-ACADEMY-REALISM.md`.

## Intent and design
Giữ frontend/backend, Yarn, `yarn start`, profile terminal và F01 (`mechverse:demo:f01`, release `edu-fan-f01-demo-v1`). Academy là điểm bắt đầu, Explorer là công cụ quan sát. Mở rộng app hiện có bằng route native History API có back/forward và link URL thực, không đổi framework hoặc thêm router/animation engine chỉ để trang trí. CSS đủ cho microinteraction; nguồn font hợp lệ được self-host nếu có.

Trang catalog dùng ivory/forest/sage/copper, chữ lớn và ảnh có xuất xứ. Lesson workspace đọc được, sơ đồ SVG chính xác, feedback/rationale chỉ mở sau submit. Phân biệt source-checked, expert review none và personal-preview; không cấp XP hay nhận đã hiểu từ click.

## Execution
- [x] U0: baseline frontend/backend/build/E2E mới, hồ sơ source/asset, snapshot và số liệu chunk. Không đọc secrets hay dùng Atlas test.
- [x] U1: registry + validator, C01–C05 (20 câu), quiz có lời giải, catalog/search/filter, route `/academy`, `/academy/foundations`, `/learn/:slug`, progress local versioned và migration F01 không ghi đè. Test RED → GREEN scoring, source resolution, backup/import và resume. Một journey mới từ home đến review/ôn đạt trước mở rộng.
- [x] U2: C06–C12, tối thiểu40 câu toàn khóa, matching/units/torque/projection và hoạt động nhận diện cũ. Thêm Practice, Challenges, Knowledge dùng dữ liệu thực; export/import và lưu lỗi không giả thành công.
- [ ] U3 **Blocked**: tối đa3 asset ứng viên, kiểm quyền web và coverage. Không đạt thì ghi Blocked riêng; giữ EDU-FAN-01 ở sandbox, không đổi nhãn thành sản phẩm thật.
- [x] U4: home/catalog editorial, Academy/learning/dashboard/explorer nhất quán; ảnh có quyền và attribution; không tuyên bố tái tạo ảnh tham chiếu khi file ảnh gốc chưa có trong repo.
- [ ] U5 **QA đạt / hiệu năng còn một phần**: full regression và browser 1440×900,1024×768,390×844; code-split home/academy/explorer/viewer, đo chunk/network trước–sau, tài liệu thực trạng, review độc lập, không deploy.

## Files / interfaces
- `frontend/src/features/academy/types.ts`: Lesson, Source, Question/Answer và activity contracts.
- `content/foundations.ts`, `content/advanced.ts`, `content/sources.ts`: bài biên soạn và locator/usage của nguồn.
- `quiz.ts`: đánh giá pure cho choice/multi/numeric/matching/open-rubric; không grading server giả.
- `progress.ts`: ProgressRepository/LocalProgressRepository, version1 namespace riêng, dữ liệu quiz theo revision; giữ F01 key và snapshot backup.
- `Academy.tsx`, `LessonWorkspace.tsx`, `Activities.tsx`, `StudyPages.tsx`: nội dung và tương tác, không card rỗng.
- `frontend/src/App.tsx`: routing + navigation mới; app cũ giữ tại `features/explorer/ExplorerApp.tsx` với import phù hợp, không xóa logic F01.
- `frontend/src/academy.css`: tokens mới, layout responsive; quy tắc chỉ scoped cho app mới, sau đó áp lớp tương thích Explorer.

## Review focus / constraints
- Source IDs và locator phải resolve, review không tự nâng; kết quả quiz không bị coi là validated competence.
- Numeric: decimal comma, đơn vị, tolerance, zero/negative/nonfinite; torque r×F×sinθ, N·m phân biệt energy.
- Quiz session giữ draft qua reload, submit/review, retry giữ lịch sử; hoạt động số có biến thể; đọc bài không tự đạt.
- F01 cũ giữ nguyên key/release/answer, không tự suy từ F01 completed rằng C01 đã qua; backup và rollback không xóa dữ liệu.
- Local storage/import lỗi vẫn giữ phiên, báo thật, không dùng `innerHTML` cho file nhập.
- Không scaffold, không đổi manager, không tự sửa `.env`, không DB write/deploy.

## Ledger
- U0 đã kiểm bằng lượt baseline mới. Không Git/AGENTS.md tìm thấy trong workspace.
- Ảnh tham chiếu MORVA/STILLFORM/Montarville mới có mô tả trong spec, chưa có file ảnh tương ứng; dùng hướng thiết kế riêng và ghi giới hạn.
- U0 complete: baseline mới FE9/9,BE9/9,E2E12/12; build đạt, Viewer989114bytes. Snapshot tại docs/qa/u0.
- U1 complete: FE20/20 (gồm8testAcademy+3activity),build đạt; browserU1 5/5, ba viewport yêu cầu, C01journey và F01key unchanged. Nghiên cứu ảnh Noctua dùng grant riêng, chỉcase study, không public CAD.

- U2/U4: 12 bài,48 câu,5 dạng,16 nguồn; bốn hoạt động chính; home và toàn luồng dùng hệ thiết kế mới. U3 Blocked, xem dossier. U5 mới: FE23/23,BE9/9,E2E29/29,hai Yarn build đạt; render ba viewport và production smoke/network. Viewer giảm25.855B nhưng warning500kB còn. Chi tiết QA-REPORT.md.
