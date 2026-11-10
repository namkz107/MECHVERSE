# Trạng thái triển khai

## Industrial UI / nhiều sản phẩm — 10/11/2026

- Ưu tiên hiện tại là V0–V4 của [đặc tả Industrial](MECHVERSE_Industrial_UI_Multi_Product_Explorer_Prompt.md). M03, mở rộng giáo trình, auth/server progress, AI Tutor, giấy hoàn thành và Knowns tạm hoãn. Phần học cũ vẫn hoạt động và giữ key dữ liệu.
- `/products` có ba mẫu tương tác thuộc ba nhóm: MV-LK02 locker, MV-WB01 workbench và EDU-FAN-01 demo. Hai nhóm vỏ tủ/bồn rửa là research, chưa có asset/CTA 3D. Preview là ảnh render của đúng model, catalog không tạo Canvas/tải cả thư viện GLB. Có search không dấu, filter nhóm/trạng thái.
- Locker 30 occurrence với tấm có chiều dày, khe thoáng xuyên, mép hồi, khay/tai đỡ, bản lề/chốt, tay nắm, khóa/cam và ốc đúng vị trí. Hai cửa mở riêng quanh trục bản lề 0–105°. Workbench 16 occurrence: khung ống rỗng/giằng hàn cố định, tai đỡ có lỗ, mặt có hốc/lỗ bu lông, tám cụm fastener riêng, khay và chân. Xem [spec trước khi dựng](INDUSTRIAL-ASSEMBLIES.md).
- Hai mẫu mới là **thiết kế minh họa MECHVERSE**, chưa chế tạo hoặc duyệt kỹ thuật; không gắn hãng, cấp vật liệu, tải, IP hay chứng nhận. Quạt vẫn là demo giản lược, không đổi thành sản phẩm thật. Asset hãng chưa đủ điều kiện tích hợp public; [sourcing](ASSET-SOURCING.md) ghi rõ ứng viên/giới hạn.
- Shared Viewer phục vụ cả F01 cũ và workspace Studio/CAD mới. Canvas/ánh sáng studio được dùng lại khi đổi mẫu; fetch cũ abort, scene cũ dispose. CAD dùng feature edges, Studio giữ roughness/metalness theo profile và vân gỗ gốc. Rest/joint/explode/shading/visibility là state riêng; vỏ/khung cố định không tách tùy ý. Reset không xóa bài làm.
- Workspace có cây/search/parent/selection, inspector về vai trò/liên kết/nguồn/điều chưa biết; camera presets, focus, isolate/hide, nhãn, tách cụm/reset và controls theo capability. Mobile dùng tab, keyboard/reduced motion/fallback được kiểm trong QA. Cửa mở và explode là tổ hợp loại trừ có giải thích ngắn.
- Giữ dependencies và Yarn/start/terminal profile. Model mới được tái tạo bằng Three/GLTFExporter hiện có; không cài thư viện mới. GLB index lại trong từng occurrence giảm byte mà giữ triangle/binding; bản trước tối ưu được lưu riêng. Viewer vẫn có warning 500 kB, không đổi limit. Kết quả build/test/đo production và ảnh thực ở [QA](QA-REPORT.md), [pipeline](3D-PIPELINE.md).

## Lộ trình và modes — cập nhật 09/11/2026

- Đặc tả đầy đủ ở [CURRICULUM-LEARNING-MODES](CURRICULUM-LEARNING-MODES.md); [coverage](CURRICULUM-COVERAGE.md) có 96 phạm vi core, 5 nhánh và yêu cầu bổ trợ. `/academy/roadmap` có đầu ra/tiên quyết, trạng thái đã viết/một phần/chưa mở và nút bắt đầu M01-L01.
- Registry có 19 bài, 64 câu hỏi, 20 nguồn. M01/M02 mỗi module sáu bài nhập môn có nội dung; bảy bài kế thừa về sau chưa hoàn thiện phạm vi module. Alias giữ ID C01–C12/slug và key F01, không seed trùng.
- Mode course/cards/quiz dùng chung phiên bài; C01/C02 đi qua Explorer F01 rồi quay lại. Các mini lab trong bài lưu input/feedback; sandbox challenges độc lập vẫn tạm thời. Bài viết theo rubric lưu unreviewed; không phát XP hoặc giấy từ kết quả demo.
- Academy v1 được mở rộng bằng trường tùy chọn `learning.version: 1`: vị trí/mode/cardIndex, lịch card/revision, review events (200 gần nhất), practicals/archive, activity/archive và mục tiêu/thời gian onboarding. Bản v1 cũ không có learning vẫn đọc nguyên dữ liệu. Import/export bao gồm dữ liệu mới; parser kiểm cấu trúc/giới hạn. F01 giữ key riêng.
- Scheduler interface đơn giản dùng khoảng ngày 24h ở UTC, cấu hình 1/3/7 ngày thử nghiệm. Self-rating thẻ không tạo attempt/hoàn thành thực hành. Lesson revision cũ vào archive; thực hành/mini lab revision cũ giữ khi viết bản mới; lịch card cũ tồn tại riêng và không dùng làm bằng chứng bản mới.
- Mục tiêu hiện được tổng hợp theo bài/phạm vi; chưa chấm độc lập toàn bộ kỹ năng nhỏ. Chưa có server progress/auth/AI/review thực hành, certificate hoặc đồng bộ. Atlas và Knowns không là dependency cho đường học local.

Kết quả kiểm lần này và giới hạn ở đầu [QA-REPORT](QA-REPORT.md). Phần dưới là snapshot trước thay đổi lộ trình, giữ để đối chiếu.

## Snapshot trước lộ trình

Đối chiếu mã nguồn ngày **09/11/2026**. Kiểm tích hợp mới đạt FE23/23, BE9/9, browser29/29 và hai Yarn build. Chi tiết môi trường và giới hạn ở [QA-REPORT.md](QA-REPORT.md); U3 còn Blocked và tối ưu Viewer mới đạt một phần.

## Những phần đã có trong mã nguồn

- Giữ cấu trúc `frontend/`, `backend/`, `docs/`, package và `yarn.lock` riêng. Mỗi ứng dụng tiếp tục chạy bằng `yarn start`; frontend giữ Vite 5173, proxy `/api` đến backend 3001 và hành vi mở browser của script.
- Home, Academy/catalog có tìm kiếm/lọc, khóa nền tảng, lesson workspace, Practice, Challenges, Knowledge và dashboard local. Route `/`, `/academy`, `/academy/foundations`, `/learn/:slug`, `/practice`, `/challenges`, `/knowledge`, `/dashboard`, `/explorer` dùng History API/link thực và back/forward. `/?view=dashboard` được chuyển về `/dashboard`; F01 mở tại `/explorer?lesson=F01`.
- Registry hiện có **12 bài C01–C12, 48 câu hỏi, 5 dạng câu, 16 bản ghi nguồn**; mục tiêu, nội dung, ví dụ, sơ đồ, hoạt động, lời giải, nguồn và bài tự quan sát. Thống kê này được đọc từ registry, không phải số bài qua chuyên gia duyệt.
- Bốn hoạt động độc lập chính: ghép bộ phận–chức năng, đổi đơn vị/đường kính, phòng thử mô-men và hình chiếu góc thứ ba. F01 và hoạt động suy luận của từng bài được giữ. Dữ liệu giả định, có phản hồi/thử lại, không phát XP.
- Quiz có nháp, nộp, review/rationale, retry và câu sai để ôn. Câu mở dùng rubric tự kiểm; không cộng vào số câu tự chấm. Các activity riêng chưa lưu trạng thái vào repository; quiz lưu theo bài/revision.
- F01 giữ logic và key cũ; Explorer vẫn có mapping/tree/inspector, chọn mesh, hide/isolate, explode/focus/reset, hoạt cảnh có pause, reduced motion và đường học 2D khi WebGL lỗi.
- Home dùng hai bản WebP responsive 640/1280 của cùng ảnh sản phẩm Noctua có hồ sơ attribution. Đây là quạt máy tính/case study riêng, không gắn với model quạt bàn trong sandbox.

## Lưu tiến độ và đường khôi phục

`ProgressRepository` có triển khai `LocalProgressRepository`; chưa có server adapter trả kết quả. Namespace Academy: `mechverse:academy:progress`, schema `version: 1`. Phiên bài lưu `lessonId`, `revision`, phase `working`/`review`, answers và attempts. Mỗi attempt có thời điểm, đáp án, ID câu đúng/sai. Nộp khi đang review không tạo thêm attempt; retry giữ lịch sử nhưng xóa nháp để làm lại cùng bộ câu.

Khi revision bài thay đổi, `ensureSession` chuyển phiên cũ vào `archives` và tạo phiên mới. Không tự coi kết quả revision cũ là hoàn tất revision mới. Parser kiểm cấu trúc/giới hạn kích thước và không nhận schema ngoài version 1; chưa có migration tổng quát cho phiên bản tương lai.

F01 vẫn dùng `mechverse:demo:f01`, release `edu-fan-f01-demo-v1`. Load Academy đọc bản F01 hợp lệ làm `legacyF01`, không ghi đè key đó và không chuyển F01 completed thành C01 completed. Export Academy có thể chứa snapshot legacy đã đọc; import Academy không ghi phục hồi vào key F01 riêng.

Khi import hợp lệ, repository sao raw Academy hiện tại vào `mechverse:academy:progress:backup`, rồi thay bằng dữ liệu nhập; **import thay thế, không merge**. Khi save gặp raw cũ không hợp lệ, lưu raw đó vào backup trước khi ghi mới. Nếu backup/save bị lỗi, báo thất bại và giữ tiến độ hiện tại trong phiên. Giao diện có retry save và xuất/nhập JSON; chưa có nút rollback riêng. Có thể khôi phục bản version 1 hợp lệ bằng cách giữ nguyên dữ liệu backup, xuất thành JSON và nhập qua giao diện; không xóa key F01. Backup lỗi/khác version cần xử lý riêng, không sửa trực tiếp rồi coi là migrate đã kiểm.

Local storage không phải tài khoản hoặc đồng bộ nhiều thiết bị. Đáp án nằm phía client, chưa có chấm bài chống gian lận phía server. Dashboard ghi trạng thái nhiệm vụ đã nộp, không chứng nhận năng lực.

## Quyết định thư viện và hiệu năng

Giữ React/TypeScript/Vite, Zustand, Three/R3F/Drei và Yarn; không thêm router hoặc animation engine. Native controls phục vụ bàn phím, CSS cho tương tác nhẹ; SVG gốc cho sơ đồ và ảnh responsive có `srcset`/`sizes`. Home/Academy/lesson/study pages/Explorer/Viewer được lazy-load; giữ lesson workspace đọc được, không scroll hijack.

Viewer dùng trực tiếp `useLoader` với GLTFLoader hiện có và import hẹp OrbitControls, bỏ tích hợp decoder không dùng cho GLB không nén. Đối chứng giảm 25.855 byte Viewer (989.314 → 963.459), gzip giảm 7.454 byte; cảnh báo trên 500 kB còn nguyên. Không chỉ chia chunk để giấu cảnh báo. Xem [VIEWER-PERFORMANCE.md](VIEWER-PERFORMANCE.md); chưa có benchmark điện thoại thật.

## Phần còn thiếu / giới hạn

**U3 Blocked:** không có geometry quạt bàn thật đã tích hợp với quyền phân phối và coverage được xác minh. Sandbox vẫn là EDU-FAN-01, 8 occurrence, không có nội thất động cơ/điện và cấp vật liệu thực. Ảnh Noctua không hoàn thành milestone này; CAD Noctua chưa được phát hành trong app.

Nội dung hiện đều `source-checked`, `expertReviewStatus: none`, `personal-preview`. Nguồn và quyền có giới hạn theo [CONTENT-STANDARDS.md](CONTENT-STANDARDS.md) và hồ sơ nghiên cứu; chưa có quy trình xuất bản/duyệt chuyên gia hoặc quản trị thu hồi nguồn tự động. Retry quiz chưa sinh biến thể mới; biến thể hiện có ở hoạt động số.

Backend giữ Express/TypeScript, health/readiness, MongoDB config và các model ProductVariant/AssetRevision/LessonRevision. **Atlas live chưa xác minh**; chưa có auth, CRUD sản phẩm hoàn chỉnh, server progress/XP hoặc AI Tutor. Academy local không phụ thuộc các phần này. Không có deploy/push, sửa secrets hoặc dùng Atlas làm database test trong nhiệm vụ nâng cấp.

QA cuối đã render các màn trên desktop/tablet/mobile headless, kiểm production smoke/network và xem ảnh thật. Practice giữ câu sai khi đang retry; URL lỗi có màn không tìm thấy, chunk lesson lỗi có recovery. Kết luận chi tiết và phần chưa kiểm chứng tại [QA-REPORT.md](QA-REPORT.md).
