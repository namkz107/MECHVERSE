# Chuẩn nội dung Academy

Áp dụng cho bản học thử cá nhân ngày 09/11/2026. Registry sau lộ trình M01/M02 có 19 bài, 64 câu hỏi và 20 bản ghi nguồn. Đây là số liệu cấu trúc đọc từ mã nguồn, không phải số bài được chuyên gia duyệt. Khung 96 bài trong [coverage](CURRICULUM-COVERAGE.md) được phân trạng thái; chỉ bài có nội dung mới mở được.

Gói nhập môn bổ sung diễn giải/ví dụ/câu hỏi/SVG gốc; NASA/JPL (quy trình thiết kế), Mitutoyo E2026 trang 13-19/13-20 (giới hạn phép đo/kiểm gốc) và OpenStax §9.3 (góc) được đọc ngày 09/11/2026, locator và quyền trong `content/beginner.ts`. Chỉ liên kết và đối chiếu trong phạm vi ghi; không sao chép art, bảng hoặc khóa học. Tên module đầy đủ không đồng nghĩa mọi độ sâu đã viết. Card lấy định nghĩa từ cùng lesson revision; self-rating tách khỏi bài tự chấm và practical unreviewed.

## Phạm vi và trạng thái

`source-checked` nghĩa là hồ sơ nguồn đã được đối chiếu trong phạm vi/locator được ghi. Không đồng nghĩa nội dung được chuyên gia phê duyệt, nguồn cho phép mọi cách tái sử dụng, hay người học đã đạt năng lực. Mọi bài hiện có `expertReviewStatus: none` và `publicationScope: personal-preview`; không tự đổi sang verified.

Schema nguồn gồm ID, tiêu đề, tác giả/nhà xuất bản, URL, locator, phiên bản, ngày kiểm, phạm vi và điều kiện sử dụng. Bài, khối nội dung và câu hỏi gắn `sourceRefs`. Schema hiện chỉ có `source-checked`/`needs-recheck`, chưa có quy trình quản trị nguồn bị thu hồi tự động. Khi phát hiện nguồn thay đổi hoặc quyền bị hủy, phải đánh dấu cần kiểm lại, xem lại nội dung liên quan và revision trước khi phát hành tiếp.

`validateRegistry` kiểm ID trùng, nguồn thiếu/tham chiếu không tồn tại, nội dung/lời giải/rubric thiếu, đáp án không khớp lựa chọn, giá trị/tolerance không hợp lệ và tiên quyết thiếu/vòng lặp. Validator cũng phát hiện bài source-checked tham chiếu nguồn needs-recheck. Việc hợp lệ về cấu trúc không thay thế kiểm khoa học hoặc pháp lý.

## Biên soạn và kiểm tra kiến thức

- Viết diễn giải, ví dụ, dữ kiện, câu hỏi và SVG gốc. Ghi rõ giả thiết; không sao chép lời văn, hình, bảng hoặc bài tập của sách/hãng vào ứng dụng.
- Câu hỏi kiểm mục tiêu cụ thể, có đáp án và lý do riêng. Chỉ mở kết quả/rationale sau nộp; nguồn và lý thuyết được đọc trước đó.
- Chọn nhiều phải khớp toàn bộ tập đáp án; ghép cặp phải đủ mục. Số nhập chấp nhận dấu phẩy/chấm thập phân, đổi về đơn vị cùng đại lượng trước khi so tolerance; chặn giá trị không hữu hạn. Câu mở dùng rubric tự kiểm, không giả báo đã chấm đúng.
- Lưu lịch sử lần nộp; nộp lại khi đang review không tạo thêm lượt. Retry quay về làm bài, không phát điểm hoặc XP. Quiz và đáp án nằm phía client: không tuyên bố chống gian lận như server.
- Sơ đồ kỹ thuật dùng SVG/HTML chính xác trong phạm vi mô hình. Không dùng ảnh AI để tạo số đo/ký hiệu cần đúng. Không kết luận chi tiết liền chỉ từ ảnh bên ngoài; không mặc định mọi quạt cùng loại động cơ, ổ đỡ hoặc cơ cấu.
- Bài quan sát không hướng dẫn tháo thiết bị có điện, vận hành máy hoặc xác định giới hạn an toàn từ ví dụ giả định.

## Nguồn và quyền hiện có

Các locator/phiên bản/ngày kiểm cụ thể nằm tại `content/sources.ts`, `content/advanced.ts` và [CONTENT-RESEARCH-ADVANCED.md](CONTENT-RESEARCH-ADVANCED.md). Nguồn bao gồm NIST về SI, OpenStax về quan hệ toán/vật lý, SOLIDWORKS 2015 về part/assembly/hình chiếu, SKF về chức năng ổ đỡ, TU Delft về chế tạo và KEYENCE về dung sai/lắp.

Hồ sơ kiểm ngày 09/11/2026 ghi bản OpenStax hiện tại và khóa TU Delft liên quan có CC BY-NC-SA 4.0; OpenStax còn có điều kiện riêng đối với dịch vụ AI. Không mặc định giấy phép cũ, không lưu sách thành corpus/RAG, không đưa toàn văn/hình/bài tập vào app, và không coi personal-preview tự cấp quyền thương mại. SOLIDWORKS/SKF/KEYENCE không được gán giấy phép mở: chỉ dùng liên kết, quan hệ thực tế và diễn giải gốc trong phạm vi hồ sơ; cần xem lại quyền khi đổi cách sử dụng/phát hành.

Hai URL SOLIDWORKS Help 2025 chỉ trả vỏ trang khi kiểm, chưa đọc được thân bài nên không dùng làm nguồn đã đối chiếu. Tài liệu PDF 2015 được ghi đúng phiên bản, không mô tả giao diện phần mềm mới theo bản cũ.

Ảnh Noctua NF-A12x25r PWM trên trang chủ là case study quạt máy tính riêng, có credit, nguồn và grant ảnh của hãng trong `public/images/noctua-case.attribution.json`. Grant ảnh không phải CC0 và không chứng minh quyền phân phối CAD/GLB. Không gắn ảnh đó với model quạt bàn EDU-FAN-01 hoặc dùng để xác nhận nội thất. Chi tiết quyền/shortlist xem [FAN-DATA-DOSSIER.md](FAN-DATA-DOSSIER.md).

Thay nội dung cần tăng revision khi ảnh hưởng câu hỏi/đánh giá; giữ lịch sử phiên trước trong archives và tạo phiên revision mới để ôn lại. Không tự xóa bằng chứng cũ hay nâng trạng thái expert review. Quy trình xuất bản công khai và phê duyệt chuyên gia còn chưa triển khai.

Kết quả QA tích hợp và phần chưa kiểm chứng tại [QA-REPORT.md](QA-REPORT.md). Test/validator không thay thế duyệt chuyên gia hoặc xác nhận quyền dùng ở phạm vi khác.
