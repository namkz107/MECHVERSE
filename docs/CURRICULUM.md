# Chương trình học cơ khí — bản học thử

Cập nhật theo registry thực ngày 09/11/2026: **12 bài, 48 câu hỏi**, mỗi bài 4 câu. Có 5 dạng câu hỏi: chọn một, chọn nhiều, nhập số kèm đơn vị, ghép cặp và câu mở dùng rubric tự kiểm. Số lượng này là thống kê dữ liệu nội dung, không phải kết quả kiểm thử hay chứng nhận chất lượng chuyên môn.

Mọi bài hiện có `sourceStatus: source-checked`, `expertReviewStatus: none`, `publicationScope: personal-preview`. Người học có thể đọc và thử mà không cần tài khoản. Thời lượng trên giao diện là ước tính; đọc bài hoặc bấm hoạt động không tự chứng minh đã hiểu.

| Bài | Nội dung / đầu ra chính | Tiên quyết trong dữ liệu | Hoạt động |
| --- | --- | --- | --- |
| C01 | Nhìn đồ vật thành một hệ thống; phân biệt sản phẩm, cụm và chi tiết theo cấu tạo đã cho | Không | Nhận diện chi tiết/cụm; cầu nối F01 |
| C02 | Mỗi bộ phận làm việc gì; giải thích chức năng và liên kết | C01 | Ghép bộ phận–chức năng; cầu nối F01 |
| C03 | Một con số luôn cần đơn vị; đổi mm/m và ghi số đo | Không | Nhập chiều dài kèm đơn vị, đổi đề |
| C04 | Đọc hình dạng bằng kích thước; bán kính và đường kính | C03 | Tính đường kính từ bán kính, đổi đề |
| C05 | Định hướng trong không gian; mặt, trục và tọa độ | Không | Chọn tọa độ theo hệ trục đã quy định |
| C06 | Lực và chuyển động; cộng lực, phân biệt vận tốc/gia tốc | C03, C05 | Chọn hợp lực ngang theo dữ kiện |
| C07 | Mô-men qua cửa và cờ lê; ảnh hưởng của F, r, θ | C03, C05, C06 | Phòng thử mô-men phẳng |
| C08 | Ma sát và chức năng ổ đỡ; phân biệt khái niệm với cấu tạo sản phẩm | C02, C06 | Chọn chức năng ổ trượt giả định |
| C09 | Vật liệu và yêu cầu chức năng; so sánh bằng dữ liệu | C02, C03 | So khối lượng với cùng thể tích và điều kiện bền đã cho |
| C10 | Phương pháp chế tạo cơ bản; nối hình dạng với phương pháp có giả thiết | C01, C04, C09 | Chọn trình tự minh họa tiện/khoan |
| C11 | Từ vật thể sang hình chiếu; nêu rõ quy ước chiếu | C04, C05 | Chọn hình chiếu bằng của khối bậc theo góc thứ ba |
| C12 | Dung sai nhập môn và tư duy lắp; đọc khoảng kích thước | C03, C04 | Chọn số đo trong khoảng có kể hai biên |

Các tiên quyết là liên kết gợi ý để ôn, không khóa cứng một đường học tuyến tính. Registry dùng `content/foundations.ts` cho C01–C05, `content/advanced.ts` cho C06–C12 và ghép tại `content/index.ts`.

Mỗi bài có mục tiêu, thuật ngữ, khối lý thuyết/ví dụ/liên hệ thiết kế, sơ đồ gốc, hoạt động, câu tự kiểm và lời giải, bài quan sát riêng, nguồn theo khối/câu hỏi và liên kết học tiếp. Số liệu bài tập là giả định giáo dục. Không lấy kích thước, vật liệu hoặc nội thất quạt thật từ hình minh họa.

Bốn hoạt động chính được mở trực tiếp tại `/challenges`: ghép bộ phận–chức năng, xưởng đơn vị, phòng thử mô-men và hình chiếu. Ngoài ra có thử đường kính, các câu suy luận theo bài và F01 trong `/explorer?lesson=F01`. Tất cả dùng điều khiển click/bàn phím; có phản hồi, giải thích, thử lại và đường về lý thuyết. Hoạt động đơn vị/đường kính có 3 đề; retry của quiz bài học hiện làm lại bộ câu của cùng revision, chưa sinh biến thể tự động.

Phòng mô-men dùng `τ = rF sin θ`: F từ 0–100 N, r từ 0–1 m, θ từ 0–180° giữa vectơ r và F; có nút 0°/90°. Tính độ lớn trong mô hình phẳng, N·m là đơn vị mô-men, không gọi là năng lượng. Hình chiếu dùng khối bậc tự dựng và ghi rõ phép chiếu góc thứ ba.

Luồng học: `/` → `/academy` hoặc `/academy/foundations` → `/learn/:slug` → nộp tự kiểm → đọc lời giải → `/practice`. `/knowledge` tra thuật ngữ và nguồn; `/dashboard` hiển thị các phiên học local. Bài F01 cũ vẫn dùng key/release riêng; hoàn thành F01 không tự đánh dấu đã qua C01/C02.

Quiz lưu nháp, lần nộp và trạng thái xem lại trên thiết bị; câu mở không cộng vào số câu tự chấm. Các lựa chọn trong hoạt động minh họa là trạng thái tạm của component, chưa được lưu thành bằng chứng tiến độ. Không có XP tài khoản, AI live hoặc chấm bài chống gian lận từ server.

Xem [CONTENT-STANDARDS.md](CONTENT-STANDARDS.md) về nguồn/quyền và [IMPLEMENTATION-STATE.md](IMPLEMENTATION-STATE.md) về lưu dữ liệu. Kết quả QA tích hợp và phần chưa kiểm chứng tại [QA-REPORT.md](QA-REPORT.md).
