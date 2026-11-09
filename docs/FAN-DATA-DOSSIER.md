# Hồ sơ sản phẩm thật và quyền tài sản

Ngày kiểm tra trực tiếp nguồn: **2026-11-09**. Trạng thái: **source-checked**, chưa được chuyên gia sản phẩm duyệt. Đây là hồ sơ nghiên cứu U0/U3, không phải xác nhận geometry đã tích hợp.

## Quyết định U3

**Blocked: chưa có quạt bàn đáp ứng đồng thời geometry có cấu trúc, độ phủ được kiểm file và quyền phân phối web rõ ràng.** Ba ứng viên dưới đây là toàn bộ shortlist của lượt này. Không thay `EDU-FAN-01` bằng nhãn sản phẩm hãng. Nghiên cứu này không phát hành CAD/GLB; có một ảnh sản phẩm Noctua được phép dùng, lưu cache để parent quyết định tích hợp case study riêng. Academy có thể tiếp tục độc lập.

Baseline [ASSET-PROFILE.md](ASSET-PROFILE.md) vẫn áp dụng: GLB giáo dục có 8 occurrence; không có nội thất động cơ, dây, vít, cơ cấu đảo gió hay lắp ghép kỹ thuật. Màu không xác nhận vật liệu. Explode không phải quy trình tháo máy.

## 1. Rowenta Turbo Silence Extreme VU2630F0

- **Nhận dạng:** hãng Rowenta/Groupe SEB; reference `VU2630F0` được ghi ở trang hỗ trợ chính hãng. Không gộp với VU264x hoặc quạt đứng VU564x/VU566x chỉ vì cùng tài liệu.
- **Nguồn đã mở:** [trang hướng dẫn đúng reference](https://www.rowenta.com/instructions-for-use/Products-/Home-Care/Fan/Turbo-Silence-Extreme/csp/1830005773), mục Documentation; [PDF chính hãng 1800136632/01](https://dam.groupeseb.com/m/363e83b3869aef0b/original/1800136632-IFU.pdf?timestamp=20220928104208), bìa và các trang hình hướng dẫn. Bìa xác định họ `VF/VU263x`, `VF/VU264x`, `VF/VU564x`, `VF/VU566x`.
- **File/kiểm tra:** PDF 4 trang, không phải CAD; tải được vào `.cache/assets-research/rowenta-vu2630f0-ifu.pdf`, 4,142,991 byte. SHA-256: `B7A127D23FDEBF18D3234F53C3648EFB8DA27D6835597ADDAFF9EDFF71CDF6AE`. Đã đọc nội dung trích xuất; công cụ web nhận PDF nhưng không trả bitmap để xác minh chi tiết hình. Chưa kiểm bằng render local; không suy ra danh mục chi tiết từ hình chưa xem được.
- **Coverage:** exterior/document family identified; nội thất, kích thước chế tạo, dung sai, loại ổ đỡ, BOM và vật liệu: **unknown**. Không tìm thấy STEP/assembly trong trang đã kiểm; không khẳng định hãng không có ở nơi khác.
- **Quyền:** trang tải manual không đưa grant phân phối lại CAD/GLB/ảnh/PDF trên website. URL legal-notice thử mở không truy cập được bằng công cụ; quyền tái phát hành **unconfirmed**. Lưu tham chiếu nghiên cứu, không public file cache.
- **Kết luận:** đúng hướng quạt bàn, nhưng chưa đủ asset để tích hợp.

## 2. Vornado 460, thị trường Australia

- **Nhận dạng:** Vornado 460 Small Air Circulator, màu Black/White; nguồn theo thị trường Australia, không trộn thông số điện với bản US. [Trang hãng tại Australia](https://vornado.com.au/products/460-small-air-circulator), mục Specifications/Owner's Guide, ghi kích thước ngoài 28.6 × 22.6 × 24.7 cm và công suất 63 W. Điện áp hiển thị tại trang sản phẩm là `200-240`; manual nêu `220-240V~50 Hz`: giữ mâu thuẫn nguồn, chưa chốt thông số này cho inspector.
- **Nguồn kỹ thuật đã mở:** [User Manuals](https://vornado.com.au/pages/user-manuals), mục X60; [Owner's Guide chính hãng](https://cdn.shopify.com/s/files/1/0034/5902/2957/files/CL3-0530_AllCircX60_Series_AU_OG_RBV01_Review.pdf?v=1683773965), PDF trang 7 (số in 12-13), mục Grille Removal (Models 360 & 460); PDF trang 8 (số in 14-15), Blade Removal. Đây là family manual, phải giữ locator đúng 460.
- **Coverage:** tài liệu xác nhận lồng trước tháo được, vít giữ lồng, cánh, trục/đai ốc và mặt phẳng ăn khớp trục-cánh; không cung cấp assembly CAD hay geometry motor/ổ đỡ. Vật liệu cấp kỹ thuật và dung sai **unknown**. Các sơ đồ PDF chưa được kiểm bitmap trong môi trường này.
- **Quyền:** [Terms of service](https://vornado.com.au/policies/terms-of-service), mục Copyrights and Trademarks, giới hạn nội dung tải về ở sử dụng cá nhân phi thương mại và yêu cầu đồng ý trước bằng văn bản cho phân phối/đăng mạng. Không đưa ảnh/manual của hãng vào public. Chưa có quyền CAD/GLB.
- **Kết luận:** dùng làm tham chiếu chức năng theo mẫu; chưa đủ geometry và quyền phát hành.

## 3. Noctua NF-A12x25r PWM - case study riêng

- **Nhận dạng/file:** quạt máy tính khung tròn 120 mm, không phải quạt bàn. [Downloads chính hãng](https://www.noctua.at/en/products/nf-a12x25r-pwm/downloads), mục 3D CAD, có STEP trong [ZIP Public-CAD](https://cdn.noctua.at/media/f3df15f3/NF-A12x25r_Public-CAD.zip?download=true). Web tool không đọc được archive; chưa tải/giải nén, kiểm số solid, đo hoặc chuyển GLB.
- **Coverage công bố:** [3D CAD models](https://www.noctua.at/en/3d-cad-models), phần giới thiệu/Disclaimer: kích thước lắp và bao ngoài được đại diện; một số hình học cánh và cấu trúc trong bị sửa nhằm bảo vệ IP. Không dùng làm mô hình hiệu suất, in 3D hay nội thất đầy đủ. Vật liệu từng node trong file: **unknown**; không gán vật liệu theo màu.
- **Quyền:** trang CAD cho phép mục đích tham chiếu, visualization và integration, có giới hạn với tái sản xuất/thương mại hóa sản phẩm. [Legal information](https://www.noctua.at/en/legal-information), mục Terms of use, có grant sử dụng miễn phí, không độc quyền và có thể bị hủy cho tài sản do Noctua tạo trên website. Grant đó phải được ghi nhận; tuy vậy hai trang không nói rõ quyền host lại CAD gốc hoặc mesh GLB dẫn xuất cho công chúng tải. Quyền phân phối mesh web vẫn **unconfirmed**, không tự suy diễn thành CC0 hay quyền tái phân phối vô hạn.
- **Kết luận:** có thể nghiên cứu riêng cho bài kích thước lắp/giới hạn CAD; không thay sản phẩm quạt bàn chính.

## Ma trận độ phủ trước tích hợp

`documented` dưới đây chỉ là tài liệu nguồn; không đồng nghĩa geometry tồn tại trong app.

| Phạm vi | EDU-FAN-01 hiện tại | Rowenta VU2630F0 | Vornado 460 AU | Noctua NF-A12x25r PWM |
| --- | --- | --- | --- | --- |
| Ngoại hình | simplified | mẫu/reference documented | exterior documented | exterior dimensions documented; file chưa kiểm |
| Cánh/lồng/khung | simplified | hình family chưa kiểm bitmap | cánh/lồng/trục documented | cánh/cấu trúc trong modified theo hãng |
| Motor/điện/ổ đỡ | absent | unknown | unknown | không hoàn toàn đại diện; file chưa kiểm |
| Vật liệu/cấp vật liệu | unknown | unknown | unknown | unknown theo occurrence |
| Geometry có selection được kiểm | 8 occurrence demo | absent trong repo | absent trong repo | chưa kiểm file |
| Quyền public CAD/GLB | nội bộ dự án; xem profile | unconfirmed | chưa có grant; nội dung web bị hạn chế | unconfirmed cho redistribution |

## Hai ảnh thật có license rõ cho nghiên cứu catalog

Hai trang file gốc được mở và đọc mục Summary, Licensing, File history ngày **2026-11-09**. Chúng là ảnh thật theo khai báo tác giả, không phải ảnh chứng minh nội thất hoặc cùng mẫu với GLB demo. Chưa xem được bitmap; độ phù hợp crop, độ nét và bố cục **chưa kiểm thị giác**. Không coi ảnh là cặp đối chiếu ảnh-3D đúng mẫu.

| ID | Trang file/nhà phát hành | Tác giả, locator, kích thước | Quyền và attribution đề xuất |
| --- | --- | --- | --- |
| PHOTO-01 | [Battery-powered electric fan on a white background at home.jpg](https://commons.wikimedia.org/wiki/File:Battery-powered_electric_fan_on_a_white_background_at_home.jpg), Wikimedia Commons | Curpharar; Own work; chụp 2024-05-11, upload 2024-05-19; 4000 × 3000 | CC BY-SA 4.0. Credit: “Battery-powered electric fan on a white background at home”, Curpharar / Wikimedia Commons, CC BY-SA 4.0. Link trang file và license; thêm thay đổi thực tế nếu crop/chỉnh ảnh. Model/SKU không được xác nhận. |
| PHOTO-02 | [Electric fan.jpg](https://commons.wikimedia.org/wiki/File:Electric_fan.jpg), Wikimedia Commons | Garonzi Stefania; Own work; chụp 2019-02-07, upload 2019-02-08; 1052 × 1052 | CC BY-SA 4.0. Credit: “Electric fan”, Garonzi Stefania / Wikimedia Commons, CC BY-SA 4.0. Link trang file và license; thêm thay đổi thực tế. File được phân loại pedestal fan; không gắn nhãn Rowenta/Vornado/Noctua. |

[License CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) cho phép chia sẻ và sửa đổi, kể cả thương mại, với credit, link license, ghi thay đổi và ShareAlike cho bản sửa. Không lấy CC0 của metadata Commons làm license cho ảnh.

Original URLs được lấy từ link Original file, không hotlink vào app:

- PHOTO-01: `https://upload.wikimedia.org/wikipedia/commons/2/2e/Battery-powered_electric_fan_on_a_white_background_at_home.jpg`
- PHOTO-02: `https://upload.wikimedia.org/wikipedia/commons/e/eb/Electric_fan.jpg`

**Tải hai ảnh Commons: Blocked tạm thời.** Download gốc trả HTTP 429 từ Wikimedia ngày kiểm tra; không thử vượt rate limit. Hai ảnh này không có JPG hợp lệ trong cache, không có local path để tích hợp. Cần tải được, xem ảnh, ghi checksum và attribution bên cạnh public asset trước khi parent quyết định đưa vào catalog.

## Ảnh Noctua cho case study riêng - sẵn sàng bàn giao

Parent yêu cầu kiểm thêm ảnh hãng khi download Commons bị 429. Nguồn: [Downloads NF-A12x25r PWM](https://www.noctua.at/en/products/nf-a12x25r-pwm/downloads), ảnh sản phẩm chính phía trên tên mẫu. Link ảnh của trang dùng image optimizer với URL nguồn `https://cdn.noctua.at/media/nf_a12x25r_pwm_1.jpg`; tải trực tiếp URL nguồn thành công ngày **2026-11-09**.

- Publisher/rightsholder: Noctua; trang pháp lý xác định Rascom Computerdistribution Ges.m.b.H.
- Bản gốc cache: `.cache/assets-research/noctua-nf-a12x25r-pwm-official.jpg` (absolute: `D:\Winter2026\MECHVERSE\.cache\assets-research\noctua-nf-a12x25r-pwm-official.jpg`). JPEG 3319 × 4000 px; 2,088,548 byte; SHA-256 `AC30DB9FBD6C5A56EE9733E10B0C34079E3B9FC7265B92DC59C2DCA6FF5563D2`.
- Đã xem bitmap local: ảnh sản phẩm trên nền trắng, cánh/khung nhìn rõ, thích hợp card/ảnh giới thiệu case study. Không sửa/crop/chuyển định dạng trong lượt nghiên cứu. Không có bằng chứng độc lập về quy trình chụp; dùng nhãn **ảnh sản phẩm chính hãng**, không gọi là scan hoặc bằng chứng nội thất.
- License evidence: [Legal information](https://www.noctua.at/en/legal-information), Terms of use, cấp quyền sử dụng ảnh do Noctua tạo, miễn phí, không độc quyền, có hiệu lực đến khi bị hủy. Đây là grant riêng của hãng, **không phải CC0/CC BY**. Trang không nêu attribution bắt buộc; vẫn giữ credit và liên kết nguồn để có provenance. Không suy ra endorsement của hãng.
- Credit đề xuất: **“Ảnh sản phẩm Noctua NF-A12x25r PWM — Noctua”**, link tên mẫu đến trang Downloads và link **“Quyền sử dụng ảnh”** đến Legal information. Nếu parent resize/crop, ghi thay đổi trong asset metadata.
- Label/scope: **“Case study riêng: quạt máy tính Noctua NF-A12x25r PWM. Ảnh hãng; CAD công bố có giản lược. Không phải model quạt bàn EDU-FAN-01.”** Có thể dùng cho U4 khi nhãn/credit rõ; ảnh không mở khóa milestone geometry U3.

Chưa chép file này vào `frontend/public`; parent quyết định tích hợp. Giữ grant/source/checksum trong metadata khi tạo bản tối ưu cho web. Không có CAD Noctua nào được tải hoặc phát hành.

## Điều kiện mở lại U3

Đối với quạt bàn: có file truy cập hợp lệ, grant phân phối website rõ, đối chiếu đúng variant, kiểm geometry từng cụm/chi tiết và vật liệu unknown được giữ rõ. Sau đó mới tạo asset revision, kiểm occurrence mapping, camera, reset và câu hỏi/progress migration. Thay ánh sáng/material hoặc thêm ảnh bên cạnh GLB demo không đạt milestone này.
