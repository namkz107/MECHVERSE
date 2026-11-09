# T01 — Quạt giáo dục EDU-FAN-01 / revision 1

- Loại: mô hình giáo dục do mã nguồn dự án tạo ra; không phải bản sao CAD của sản phẩm hãng.
- Tác giả hình học: được tạo trong lượt triển khai này bằng `frontend/scripts/build-fan.ts`, không lấy asset/tài liệu bên thứ ba. Quyền của các thư viện xem trong yarn.lock và giấy phép tương ứng; chưa xác lập giấy phép phân phối mã nguồn toàn dự án.
- Runtime: `frontend/public/models/fan-edu-v1.glb`, manifest `frontend/public/models/fan-edu-v1.manifest.json`; tái tạo bằng `yarn asset:build` từ thư mục `frontend/`.
- 8 occurrence: đế, trụ, vỏ động cơ, trục minh họa, lồng sau, cánh, lồng trước, núm giữ. Cánh gồm ba hình học dùng chung một occurrence; chọn mesh bất kỳ của cánh phải về cùng ID.
- Cây cấu tạo: sản phẩm → cụm đầu quạt / cụm giá đỡ → occurrence. Đây là phân nhóm bài tập, không khẳng định quy trình lắp/tháo thực tế.
- Hình học dùng hệ Y-up, mặt trước +Z. Đơn vị scene mang tính minh họa, chưa đối chiếu kích thước thực; không có thước đo hay kích thước chế tạo.
- Giản lược: không dựng nội thất điện/động cơ, dây, vít hoặc cơ cấu đảo gió; không có ren/lắp ghép kỹ thuật. Explode là bố cục quan sát, không hướng dẫn tháo thiết bị.
- Màu dùng để nhận diện. Vật liệu, cấp vật liệu, công suất, tốc độ, loại ổ đỡ: chưa xác minh.
- Chuyển động: chỉ quay cánh/trục quanh Z để minh họa khác biệt chuyển động/đứng yên, không mô phỏng điện hoặc lưu chất; tốc độ không đại diện thông số thực.
- Nội dung F01: định nghĩa chi tiết/cụm theo quy ước của mô hình, bản nháp demo chưa được chuyên gia duyệt. Không dùng kết quả demo như chứng nhận kỹ năng.

## Độ phủ
Được dùng: nhận diện hình dạng bên ngoài, chọn bộ phận, phân nhóm chi tiết/cụm trong mô hình. Chưa dùng để dạy: vật liệu thực, dung sai, cấu tạo động cơ, loại ổ đỡ, cách chế tạo thực hoặc an toàn sửa chữa.

## Điều kiện thay asset
Asset thật cần hồ sơ hãng/mã/biến thể, quyền sử dụng, nguồn theo thuộc tính và người duyệt. Phải tạo revision và release mới, kiểm lại mọi occurrence mapping, camera, câu hỏi và migration demo progress.
