# Hệ thống thiết kế Academy — 09/11/2026

Academy là điểm bắt đầu; Explorer là sandbox hỗ trợ quan sát. Home, catalog, lesson workspace, Practice, Challenges, Knowledge và Dashboard dùng cùng nền ivory, chữ charcoal, mảng forest và điểm nhấn sage/copper. Bài học là nội dung chính, không dùng thẻ khóa rỗng hoặc số liệu thành tích giả.

Tokens chính trong `frontend/src/academy.css`: paper `#F3F0E7`, ink `#18211D`, forest `#19251F`, sage `#C5D59C`, copper `#A85F37`, muted `#526055`, line `#D5D7CB`, accent `#315C48`. Khoảng cách theo bội 4/8px; vùng đọc có giới hạn chiều rộng, dòng thoáng. Be Vietnam Pro 400/600 được self-host từ Fontsource, gồm Latin và tiếng Việt; giấy phép SIL OFL tại `frontend/public/licenses/be-vietnam-pro-OFL.txt`. Không gọi dịch vụ font ngoài.

Home có hero hai mảng, ảnh sản phẩm có xuất xứ, collection liên kết bài thật và các lối vào học/quan sát. Ảnh Noctua NF-A12x25r PWM là case study quạt máy tính riêng, có credit và link quyền; không đại diện GLB quạt bàn hoặc xác nhận nội thất. Hai WebP 640/1280 dùng `srcset`/`sizes`; ảnh hero có kích thước xác định. Không dùng ảnh AI như chứng cứ kỹ thuật. Chưa có file ảnh tham chiếu MORVA/STILLFORM/Montarville nên không tuyên bố đối chiếu pixel.

Lesson có mục tiêu, thuật ngữ tại chỗ, lớp lý thuyết/ví dụ/kỹ thuật/thiết kế, sơ đồ SVG gốc, hoạt động, tự kiểm, nguồn và bài quan sát. Desktop có bản đồ bài ở cạnh; mobile xếp một cột. Chữ đoạn đọc 16px, focus outline 3px, controls chính nhắm 44px. Matching dùng native select với bàn phím; số và đơn vị có label; slider có khoảng và đơn vị. Nộp bài đưa focus đến kết quả, đổi route đưa focus đến heading; nguồn mở trong details và link tài liệu riêng.

Trạng thái: loading khi tải route; empty dựa dữ liệu thật; lỗi chunk có reload; lỗi lưu giữ đáp án trong phiên và có retry; câu trả lời khóa khi review, mở lại khi luyện. Personal-preview / chưa duyệt chuyên môn hiển thị riêng với trạng thái lưu. Không dùng timer/click để cấp năng lực, XP hoặc streak.

Explorer giữ bố cục cây–viewport–inspector và logic F01 trong `styles.css`, có lớp tương thích palette mới và thanh trở về Academy. Dưới 1200px dùng panel tab bên dưới; mobile navigation gọn. Source dialog native giữ/hoàn focus. Không đổi hình học hay vật liệu để gọi demo là sản phẩm thật; nhãn sandbox luôn có mặt. Màu selection không là chứng cứ vật liệu.

Chuyển động dùng CSS nhẹ; không thêm animation engine hoặc scroll hijack. Reduced motion tắt transition không cần thiết và camera damping; quay minh họa chỉ chạy sau thao tác bật, có pause. Camera/reset, hide/isolate và đường học 2D vẫn là hợp đồng của Explorer.

Render QA: Academy ở 1440×900, 1024×768, 390×844; Explorer có thêm 768×1024. Ảnh baseline và sau sửa tại `docs/qa/u0`, `u1`, `u4`, `u5`. Kết quả và giới hạn accessibility/thiết bị xem [QA-REPORT.md](QA-REPORT.md), không coi screenshot headless là benchmark điện thoại thật hoặc chứng nhận WCAG.
