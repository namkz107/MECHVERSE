MECHVERSE — Prompt bổ sung chất lượng frontend và UX
Lưu file này thành docs/FRONTEND-QUALITY.md trong repository. Đọc cùng docs/IMPLEMENTATION-PROMPT.md. Nếu chưa có code, áp dụng từ M1; nếu đã có code, kiểm hiện trạng và cải thiện trên cấu trúc hiện có. Không khởi tạo lại app.
1. Nhiệm vụ
Hãy triển khai giao diện MECHVERSE đạt mức một sản phẩm học tập có thiết kế nhất quán và có thể sử dụng thực tế. Ưu tiên hành trình học gắn với vật thể 3D; mỗi quyết định thị giác phải giúp người học nhận biết, thao tác hoặc hiểu nội dung.

Thực sự code, chạy trình duyệt khi công cụ hỗ trợ, xem kết quả render và sửa lỗi. Không chỉ tạo design document, không dùng lời nhận xét “đẹp, hiện đại, premium” thay cho bằng chứng. Không khẳng định tối ưu retention khi chưa có dữ liệu người học.

Giữ các quyết định trong prompt chính: React/TypeScript/Vite, MongoDB/Mongoose, dữ liệu demo có nhãn, quyền truy cập và quy trình kiểm chứng. Không đổi backend, mở rộng phạm vi sản phẩm hoặc thay thư viện hàng loạt chỉ để redesign.
2. Hướng thiết kế được chọn
Tạo một “phòng khám phá kỹ thuật” gọn gàng, sáng rõ và có chiều sâu thị giác:
- Sidebar xanh đen, workspace sáng dịu; dùng teal cho hành động học và amber cho selection/cảnh báo có giải thích.
- Mô hình 3D là điểm nhìn chính trong Explorer. Bài học và inspector phải dễ đọc, không bị thu nhỏ để nhường chỗ cho trang trí.
- Font Be Vietnam Pro hỗ trợ tiếng Việt. Self-host khi có file hợp lệ; dùng fallback nếu chưa có. Tối đa vài mức weight cần thiết.
- Tiêu đề lớn vừa phải, đoạn văn ngắn, phân cấp rõ. Main title có thể viết hoa; không viết hoa toàn bộ bài học.
- Surface và border tinh tế; shadow có mục đích. Không rải gradient, neon, glassmorphism hoặc glow khắp ứng dụng.
- Không chèn emoji trang trí thay icon có nghĩa. Icon-only cần accessible name và tooltip khi phù hợp.
- Dùng một bộ spacing, radius, màu, typography và component states nhất quán. Ghi tokens ngắn trong docs/DESIGN-SYSTEM.md và thực thi bằng CSS variables/theme.
Điểm bắt đầu cho màu, được phép chỉnh khi kiểm tương phản/render:
--workspace: #F5F7FA;
--surface: #FFFFFF;
--sidebar: #111C2E;
--text: #162235;
--text-muted: #526174;
--accent: #0F766E;
--selection: #B45309;
--border: #DCE3EB;
Đây là tokens khởi đầu, không phải chứng nhận đạt tương phản trong mọi tổ hợp. Kiểm tra cả text nhỏ, icon, disabled, hover, focus và selection thực tế.
3. Ưu tiên ba màn hình đầu tiên
1. Explorer: thể hiện được giá trị 3D và việc học qua bộ phận.
2. Lesson workspace: hoàn thành một bài từ bắt đầu đến phản hồi.
3. Dashboard: giúp người học tiếp tục công việc có ý nghĩa.
Hoàn thiện một hành trình xuyên suốt trước khi nhân rộng bố cục. Trang giới thiệu ngắn gọn, có thể mở demo dễ dàng. Không dành phần lớn thời gian vào hero trong khi màn hình học chưa dùng được.
4. Explorer desktop
- Thanh đầu: tên sản phẩm, nhãn demo/verified đúng trạng thái, breadcrumb và chế độ học/khám phá.
- Cây cấu tạo bên trái khoảng 220–260 px khi đủ chỗ; cuộn độc lập khi cần.
- Viewport ở giữa co giãn, không bị panel che nút hoặc làm mô hình quá nhỏ.
- Inspector/nhiệm vụ bên phải khoảng 300–360 px khi đủ chỗ. Có thể thu gọn panel.
- Toolbar 3D nhóm theo tác vụ: chọn/góc nhìn, quan sát, chuyển động, reset. Nhãn tiếng Việt dễ hiểu; thuật ngữ tiếng Anh dùng để đối chiếu.
- Slider tách cụm hiển thị giá trị, điều khiển bàn phím được; không lẫn với điều khiển quay.
- Selection phải có tín hiệu qua màu, tên và trạng thái selected trong cây. Không chỉ dựa vào màu.
- Khi chọn một bộ phận, inspector cập nhật ngay. Focus camera mượt, có thể giảm chuyển động; không đột ngột teleport hoặc xoay mất định hướng.
- Khi người học đã tự đổi camera, có nút “Về góc nhìn bài học”. Reset viewer không xóa câu trả lời.
Nhãn mô hình giáo dục giản lược phải dễ thấy nhưng không che viewport. Tại từng trường chưa có dữ liệu, dùng “Chưa xác minh” thay số liệu/vật liệu giả.
5. Lesson workspace
Mỗi bước chỉ có một hành động chính rõ ràng. Hiển thị theo chuỗi: mục tiêu ngắn → quan sát/thao tác → giải thích → bài làm → phản hồi → tiếp tục hoặc ôn.
- Mục tiêu dùng câu quan sát được, ví dụ “Phân biệt một chi tiết với một cụm”.
- Nếu bước yêu cầu chọn cánh quạt, đưa mô hình về góc dễ quan sát; cho phép chọn qua cây như cách thay thế.
- Không bắt người mới đọc toàn bộ cấu tạo động cơ trước nhiệm vụ đầu tiên.
- Kiến thức nâng cao mở theo lớp: Hiểu ngay, Khám phá thêm, Thiết kế/chế tạo.
- Thuật ngữ mới có giải thích tại chỗ; tránh tooltip là cách duy nhất đọc định nghĩa trên mobile.
- Câu trả lời sai có lý do và gợi ý quan sát lại. Không chỉ hiện dấu đỏ hoặc đáp án.
- Phản hồi đúng nêu người học đã chứng minh điều gì. Không dùng lời khen chung chung thay nội dung.
- Chuyển bài theo điều kiện và ý muốn người học; timer hoặc nút “đã xem” không tự cấp demonstrated.
- Hiển thị nguồn theo claim/mục nội dung, có thể mở mà không mất bài đang làm.
6. Dashboard và động lực học
Ưu tiên “Tiếp tục bài …”, phần cần ôn và bằng chứng tiến bộ. Tài khoản mới có lời dẫn bắt đầu, không có số liệu thành tích giả.

Gamification phục vụ mục tiêu:
- Nhiệm vụ ngắn có kết quả rõ: tìm chi tiết, nối chức năng, giải thích, áp dụng vào góc nhìn mới.
- XP là phần thưởng, hiển thị tách trạng thái hiểu kiến thức.
- Phân biệt đã xem, đang luyện, đã chứng minh và cần ôn.
- Demo progress ghi rõ chưa tương đương kết quả của nội dung đã kiểm duyệt.
- Không thông báo dồn dập, tạo áp lực streak, popup chặn học hoặc bịa số người đang online.
Đề xuất các sự kiện để đánh giá sau này: bắt đầu demo, chọn bộ phận mục tiêu, hoàn thành nhiệm vụ, loại lỗi, quay lại ôn và tiếp tục bài. Không gửi nội dung chat/câu trả lời cá nhân ra dịch vụ analytics bên ngoài mặc định. Số lượt click hoặc thời gian ở trang chưa tự chứng minh chất lượng học.
7. Responsive và khả năng tiếp cận
- Kiểm thực tế ở 1440×900, 768×1024 và 390×844; không chỉ thu nhỏ ảnh desktop.
- Tablet/mobile chuyển panel thành tab hoặc drawer; giữ viewport có kích thước hữu ích. Thao tác cảm ứng và cuộn trang không xung đột vô lý với orbit.
- Tránh thanh cuộn ngang, nút bị bàn phím che, toolbar tràn và đoạn tiếng Việt bị cắt.
- Chữ nội dung khoảng 16 px trở lên khi thích hợp; dòng đủ thoáng, độ dài đọc vừa phải. Không dùng nowrap toàn đoạn.
- Thao tác chính có vùng chạm nhắm khoảng 44×44 CSS px hoặc lớn hơn khi phù hợp; không dồn icon sát nhau.
- Tab order có nghĩa, focus visible, label đầy đủ và điều khiển slider bằng bàn phím.
- Dialog/drawer giữ focus phù hợp và trả về trigger khi đóng; Escape hoạt động theo hành vi mong đợi.
- Có cách học qua cây/danh sách và nội dung 2D khi WebGL không dùng được.
- Hoạt cảnh có pause; reduced motion tắt hoặc giảm chuyển động không cần thiết.
8. Trạng thái và hiệu năng
Mỗi màn hình có loading, empty, error, retry và disabled state đúng nguyên nhân.
- DB lỗi: không báo bài đã được lưu. Giữ câu trả lời trong phiên nếu phù hợp và cho retry có kiểm soát.
- AI chưa cấu hình: có giải thích ngắn, tiếp tục học được; không có chat mẫu giả làm câu trả lời live.
- Asset lỗi: báo đúng mô hình không tải được và cho đường học thay thế; không lặng lẽ thay ảnh rồi gọi là viewer.
- Bài chưa duyệt: có trạng thái và điều kiện mở, không giả số bài đã hoàn thành.
- Skeleton gần bố cục cuối để giảm nhảy layout; tránh spinner chiếm toàn màn hình quá lâu mà không giải thích.
Lazy-load viewer và asset, không tải cả thư viện ngay khi mở dashboard. Không thêm post-processing nặng chỉ để đẹp ảnh. Ghi thiết bị, độ phân giải và điều kiện khi đo; không công bố FPS hoặc thời gian tải chưa đo.
9. Cách thực hiện để hạn chế sửa đi sửa lại
1. Đọc prompt chính một lần để nắm ràng buộc, kiểm hiện trạng và lấy file liên quan bằng tìm kiếm có mục tiêu. Không lặp dump toàn repo/lockfile vào context.
2. Chốt một hướng thiết kế như trên, ghi quyết định ngắn. Không sinh ba phương án đầy đủ khi chưa được yêu cầu.
3. Làm tokens, app shell và component chung tối thiểu, rồi hoàn thiện Explorer trước.
4. Nối một bài học demo chạy thật. Sau khi luồng này ổn mới áp dụng cùng hệ thống sang Dashboard và trang khác.
5. Chạy app, xem desktop/mobile bằng browser tools nếu có, sửa lỗi thị giác và tương tác đã quan sát. Thực hiện một lượt kiểm lại sau sửa; không redesign vô hạn.
6. Test logic bị ảnh hưởng: selection/mapping/reset, lesson state, form/focus và persistence theo phạm vi sửa. Không chạy lại toàn bộ kiểm tra không liên quan sau mỗi thay đổi màu.
7. Khi đạt acceptance criteria, dừng mở rộng; ghi việc sau vào backlog.
Giữ báo cáo ngắn: thay đổi chính, bằng chứng kiểm tra, lỗi còn mở và bước tiếp. Không in lại toàn bộ code hoặc toàn bộ hai prompt trong mỗi câu trả lời. Không lược bỏ kiểm tra quan trọng để giảm độ dài báo cáo.
10. Acceptance criteria
- Người mới nhìn thấy hành động bắt đầu; không cần đoán giữa nhiều CTA ngang hàng.
- Viewer là 3D thật; chọn qua viewport/cây đồng bộ và reset ổn định.
- Inspector giải thích ngắn trước, chi tiết kỹ thuật sau, nguồn/giới hạn truy được.
- Một bài demo có thể đi hết chuỗi quan sát → nhiệm vụ → phản hồi mà không có nút chết.
- Bài làm, demo/verified, trạng thái lưu và XP phản ánh đúng dữ liệu.
- Không có overflow ngang hoặc panel che tác vụ chính ở các viewport kiểm tra.
- Keyboard, focus, dialog và reduced motion đã được kiểm trong phạm vi thực hiện.
- Typography, spacing, màu và component states nhất quán qua ba màn hình ưu tiên.
- Không có số liệu, nguồn, tính năng hoặc kết quả QA giả.
- Ghi ảnh QA và phát hiện thực tế vào docs/QA-REPORT.md khi công cụ cho phép. Nếu không có browser/screenshot, ghi rõ chưa kiểm trực quan, không tự đánh dấu đã đạt.
11. Bắt đầu
Đọc docs/IMPLEMENTATION-PROMPT.md, kiểm milestone hiện tại và áp dụng yêu cầu này vào phần frontend phù hợp. Tiến hành code và kiểm tra, không chỉ trả về kế hoạch thiết kế. Giữ nguyên dữ liệu và công việc đã có. Nếu milestone nền tảng chưa sẵn sàng, hoàn tất phần cần thiết rồi triển khai Explorer cùng một bài demo xuyên suốt.