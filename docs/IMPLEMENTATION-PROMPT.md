MECHVERSE — Blueprint triển khai bản đầu, v1.1
Ngày: 09/11/2026. Đối tượng triển khai: developer React/Node.js đồng thời đang học cơ khí từ đầu.
1. Kết luận và trạng thái bằng chứng
[có khả năng cao] Hướng sản phẩm phù hợp với mục tiêu học cơ khí bằng quan sát, thao tác và giải thích. Nền tảng web hiện có giúp người làm tập trung thêm vào phần 3D, nội dung và đánh giá. Hiệu quả học tập thực tế cần được kiểm tra với người mới; giao diện đẹp hoặc thời gian dùng lâu chưa chứng minh người học hiểu hơn.

Định vị đề xuất: “Học cơ khí qua đồ vật thật, khám phá cấu tạo bằng 3D và giải thích bằng kiến thức có nguồn.” MECHVERSE tiếp tục là tên làm việc; chưa kiểm tra tên miền, nhãn hiệu hoặc khả năng kinh doanh.

[chắc chắn] Bộ đầu vào gồm hai bản đề xuất dạng văn bản, các ảnh/wireframe tham chiếu và lộ trình cơ khí. Chưa có file CAD/GLB, repository hay hồ sơ kỹ thuật của một mẫu quạt cụ thể để kiểm thử trong lượt này. Các tài liệu kiến trúc là thiết kế đề xuất, chưa phải bằng chứng hệ thống đang hoạt động.

Những việc đã xác minh ở đây: khả năng tương tác của R3F; định dạng glTF; khả năng xử lý STEP/glTF được công cụ chuyển đổi công bố; ví dụ nhà sản xuất có nhiều loại ổ đỡ; rủi ro bịa nội dung/trích dẫn của AI; điều kiện sử dụng được MIT OCW công bố. Chưa xác minh cấu tạo, vật liệu, kích thước hoặc quyền phân phối của một asset quạt cụ thể.
2. Những quyết định cần giữ và điều chỉnh
Nội dung từ bản đề xuất	Quyết định v1.1	Lý do
Ba hệ thống Knowledge, Learning và Visualization	Giữ ranh giới nghiệp vụ	Đổi cách hiển thị hoặc AI không làm mất cấu trúc kiến thức
AI làm gia sư và điều phối	Giới hạn vào giải thích, gợi ý và đề nghị thao tác đã cho phép	Backend quản lý quyền, phiên bản, chấm điểm xác định và điều kiện hoàn thành
Tổng hợp mọi nguồn uy tín	Chọn kho nguồn giới hạn theo bài và sản phẩm	Mỗi khẳng định phải được kiểm tra trong đúng phạm vi
Quạt điện là sản phẩm đầu tiên	Giữ; mã mẫu và biến thể chưa chốt	Phải chọn theo dữ liệu kỹ thuật và asset có thể dùng
Toàn bộ 12 module đều bắt buộc ngay	Làm một hành trình học hoàn chỉnh trước	Kiểm được sản phẩm có giúp học mà không phải dựng mọi trang quản trị
RAG từ kho đã duyệt	Triển khai sau nội dung và bộ kiểm thử đầu tiên	Có tài liệu đúng vẫn có thể truy xuất sai hoặc sinh kết luận vượt nguồn
Đánh giá theo phần trăm thành thạo	Dùng trạng thái và bằng chứng ở bản đầu	Chưa có mô hình đo đã hiệu chỉnh để diễn giải con số như 85% năng lực
Website thực hành CAD	Đề bài, hình/bản vẽ, file mẫu và phiếu tự kiểm	Thao tác SOLIDWORKS vẫn diễn ra trên phần mềm người học có


Đích chất lượng: khẳng định kỹ thuật được xuất bản phải truy được đến bằng chứng, phạm vi áp dụng, phiên bản và kết quả duyệt. Đây là yêu cầu thiết kế sản phẩm, không phải lời hứa nội dung hoàn toàn không có lỗi.
3. Một trải nghiệm học hoàn chỉnh
Người mới chọn “Khám phá chiếc quạt” → nhìn vật đã lắp → nhận nhiệm vụ nhỏ → tìm/chọn bộ phận → xem giải thích vừa sức → tự giải thích hoặc làm bài → nhận phản hồi → lưu bằng chứng → ôn đúng chỗ chưa hiểu.

Hai chế độ dùng chung dữ liệu:
- Khám phá tự do: xem các bộ phận, tra thuật ngữ, mở nguồn; không tự cộng thành tích học chỉ vì đã click.
- Học có hướng dẫn: mỗi bước có mục tiêu, trạng thái 3D, giải thích, bài kiểm tra và điều kiện chuyển bước.
Một phiên khoảng 10–15 phút là mục tiêu thử nghiệm ban đầu [ước đoán], điều chỉnh theo quan sát người học. Không đưa toàn bộ cấu tạo động cơ và điện học vào bài mở đầu.
Bước trải nghiệm mẫu	Tương tác	Nội dung học	Bằng chứng hiểu
Nhìn toàn bộ	Xoay và chọn các bộ phận bên ngoài	Chi tiết, cụm, chức năng	Phân biệt một bộ phận với cả cụm
Mở phạm vi quan sát	Ẩn lớp che hoặc tách cụm đã biên soạn	Ngoài–trong, bộ phận che và bộ phận làm việc	Chỉ ra bộ phận đúng trên một góc nhìn khác
Theo dõi chuyển động	Chạy/dừng hoạt cảnh có nhãn giới hạn	Bộ phận chuyển động và phần đứng yên đã được xác minh	Giải thích quan hệ bằng lời
Xem một chi tiết	Cô lập, xoay, mở trang kiến thức	Hình dạng và nhiệm vụ của chi tiết	Nêu vai trò và bộ phận liên quan
Chuyển sang thiết kế	Đối chiếu một hình chiếu hoặc kích thước bài tập	Từ vật thể 3D sang bản vẽ	Đọc đúng một đặc điểm hình học


4. Phạm vi bản đầu
Các số lượng sau là phạm vi đề xuất [ước đoán], chưa phải khối lượng đã có nội dung/asset.
Có trong bản đầu	Cách nghiệm thu
Một mẫu quạt hoặc một cấu hình giáo dục được mô tả rõ	Có hồ sơ nhận diện; mọi chỗ giản lược được công khai
Khoảng 8–12 bài nhỏ liên kết với mô hình	Có mục tiêu, tiên quyết, nguồn, câu hỏi và giải thích đáp án
Xoay, zoom, chọn, làm nổi bật, ẩn/hiện, cô lập, tách cụm, reset	Cây chi tiết, viewport và bảng thông tin đồng bộ
Một cây cấu tạo và thông tin theo bộ phận	Phân biệt cụm, chi tiết và từng lần xuất hiện trong lắp ráp
Một số hoạt cảnh nguyên lý đã biên soạn	Đúng phạm vi đã xác minh; có nút dừng; tách với trạng thái exploded
Bài tìm chi tiết, nối chức năng và câu hỏi giải thích	Có phản hồi theo lỗi; làm lại không tạo XP vô hạn
Lưu tiến độ và ôn tập	Tải lại/đăng nhập lại vẫn còn kết quả; không ghi “đã hiểu” từ thời gian xem
Nguồn và báo lỗi nội dung	Người học truy được nguồn từ thông tin đang xem
Công cụ biên soạn tối thiểu	Nội dung có phiên bản, người duyệt và lịch sử; có thể dùng Git trước CMS đầy đủ


Sau bản đầu: hỏi đáp AI có nguồn; hình cắt có biên được biên soạn; thử thách lắp theo thứ tự đã duyệt; thêm một sản phẩm để thử khả năng tái sử dụng.

Học sau: mô phỏng lực/ứng suất, chấm tự động file CAD, nhập CAD tùy ý trên web, CAM/CNC thực hành, bảng xếp hạng, thanh toán, cộng đồng và nhiều hệ phần mềm CAD.

Trong nội dung về quạt, việc mở cấu tạo là trải nghiệm số. Chương trình đầu không đưa người mới qua thao tác sửa chữa điện hoặc vận hành thiết bị đã mở vỏ.
5. Chọn chiếc quạt đầu tiên bằng dữ liệu
Hồ sơ tối thiểu phải có
1. Nhà sản xuất, mã mẫu, phiên bản/biến thể và ảnh nhận diện nếu tuyên bố mô hình thể hiện sản phẩm thật.
2. Tài liệu kỹ thuật hoặc cấu tạo được phép dùng; đánh dấu phần tài liệu chỉ mô tả bề ngoài.
3. Asset có cấu trúc riêng cho các bộ phận cần học, nguồn và quyền sử dụng cho mục đích dự định.
4. Danh sách bộ phận: có bằng chứng gì về hình dạng, chức năng, vật liệu và cách chế tạo.
5. Người có chuyên môn kiểm cấu tạo và giải thích; lưu phạm vi duyệt, không chỉ một nút “Approved”.
Không bắt buộc mọi chi tiết ẩn đều biết ở lần đầu. Bảng kiểm độ phủ phải chỉ ra phần có thể dạy, phần giản lược và phần chưa có dữ liệu.
Ba loại tuyên bố phải tách
Loại	Ví dụ cách diễn đạt	Điều kiện
Kiến thức chung	“Ổ đỡ giúp đỡ và định vị trục theo chức năng thiết kế”	Nguồn nền tảng phù hợp; diễn đạt đúng phạm vi
Thông tin của sản phẩm	“Mẫu X phiên bản Y dùng loại ổ đỡ Z”	Bằng chứng gắn đúng mẫu/biến thể
Ví dụ học tập	“Trong bài tập này dùng đường kính giả định …”	Nhãn dữ liệu bài tập, tách khỏi thông số sản phẩm


[chắc chắn] Catalogue quạt của ebm-papst có các lựa chọn dùng sleeve bearing và ball bearing [S5]. Điều này chứng minh phải tra từng loại; không chứng minh chiếc quạt trong ảnh dùng loại nào. Bảng cấu tạo của MECHVERSE dùng tên “ổ đỡ” khi chưa xác định được loại cụ thể.

Mô hình thiếu nội thất động cơ có hai cách xử lý: giới hạn bài học vào phần đã có bằng chứng; hoặc tạo phần nguyên lý minh họa riêng và gắn nhãn rõ. Không dùng phần minh họa làm chứng cứ cho cấu tạo thực của mẫu quạt.
Chỉ dẫn bằng chứng trên giao diện
- “Đối chiếu theo tài liệu mẫu X, phiên bản Y”: cho phần có bằng chứng phù hợp.
- “Hình học giản lược để học nguyên lý”: nêu đúng chỗ đã bỏ/sửa.
- “Chưa xác minh vật liệu/cấu tạo bên trong”: hiển thị ngay tại trường chưa có dữ liệu.
- “Đã được … duyệt ngày …, phạm vi …”: chỉ có khi có bản ghi duyệt thực tế.
Những trạng thái này phải áp dụng theo thuộc tính, không gắn một nhãn “đúng chuẩn” cho toàn bộ asset chỉ vì một phần đã được kiểm tra.
6. Nguồn kiến thức và quy trình biên soạn
Chọn nguồn theo câu hỏi
Cần xác minh	Nguồn ưu tiên	Giới hạn
Cấu tạo/thông số một sản phẩm	Tài liệu hãng, bản vẽ, catalogue đúng mã	Catalogue linh kiện khác không chứng minh linh kiện nằm trong mẫu quạt
Thao tác SOLIDWORKS	Help/Tutorials đúng sản phẩm và phiên bản	Không áp giao diện/tính năng giấy phép khác mà không kiểm
Nguyên lý, toán và cơ học	Giáo trình, khóa học cơ sở từ tổ chức có chuyên môn	Phải chỉ rõ điều kiện áp dụng và mức giản lược
Quy tắc bản vẽ và yêu cầu kỹ thuật	Tiêu chuẩn được chọn, mã và phiên bản cụ thể	Phân biệt yêu cầu tiêu chuẩn với quy tắc của bài tập
Chi tiết mua sẵn	Catalogue chính thức của đúng nhà sản xuất/mã	Không suy vật liệu hoặc cấp chính xác từ mô hình đồ họa
Mẹo thực hành	Nguồn chuyên môn hoặc kinh nghiệm có ngữ cảnh	Không tự nâng kinh nghiệm thành yêu cầu áp dụng chung


SKF có catalogue ổ lăn [S8]; đây là nguồn tham chiếu linh kiện, chưa phải hồ sơ linh kiện trong chiếc quạt đang nghiên cứu. MIT OCW có thể giúp xây nền lý thuyết; điều khoản sử dụng phải được kiểm tra theo tài liệu và mục đích [S7].
Một khẳng định kỹ thuật cần gì?
- Nội dung khẳng định và phạm vi: kiến thức chung, mẫu sản phẩm hay dữ liệu bài tập.
- Tài liệu gốc: tác giả/tổ chức, tiêu đề, URL, phiên bản và ngày truy cập.
- Vị trí bằng chứng: trang, hình, mục hoặc đoạn; không chỉ URL trang chủ.
- Điều kiện áp dụng: mẫu, cấp vật liệu, tải, nhiệt độ hoặc giả thiết có liên quan.
- Trạng thái: nháp, chờ duyệt, đã duyệt, cần kiểm lại, bị rút.
- Người duyệt và phạm vi chuyên môn đã xem; nguồn mâu thuẫn nếu có.
- Quyền cho từng loại sử dụng dự định: trích dẫn, phân phối tài liệu, asset, xử lý AI. Không coi việc tải được là đã được phép tái sử dụng.
Không dùng điểm tin cậy tự sinh của AI làm chứng nhận kỹ thuật. Nếu hai nguồn khác nhau, kiểm phạm vi/phiên bản, giữ dấu vết mâu thuẫn và chưa xuất bản kết luận chưa giải quyết.
Luồng xuất bản
Biên soạn nháp → gắn bằng chứng từng thông tin trọng yếu → kiểm quyền sử dụng → kiểm cơ khí và sư phạm → chạy kiểm tra liên kết/asset/bài tập → xuất bản một bộ phiên bản → tiếp nhận báo lỗi → sửa và duyệt lại phần bị ảnh hưởng.

AI có thể hỗ trợ soạn nháp và tìm điểm thiếu; việc duyệt chuyên môn cần người thực sự đủ năng lực cho phạm vi đó. Nếu chỉ đang tự đối chiếu tài liệu, ghi đúng trạng thái này.

[chắc chắn] MIT OCW công bố điều kiện CC BY-NC-SA 4.0 cùng các lưu ý về nội dung có ngoại lệ [S7]. Hệ thống cần lưu điều kiện của từng nguồn và kiểm mục đích sử dụng, đặc biệt trước khi phát triển mô hình thu phí hoặc đưa nội dung vào xử lý AI. Tài liệu này không kết luận rằng mọi hình thức dùng OCW đều được phép.
7. Kiến trúc kỹ thuật gọn cho developer React/Node.js
Đây là quyết định triển khai đề xuất, không phải kết quả benchmark giữa các framework.
Thành phần	Mặc định bản đầu	Phạm vi
Web	React + TypeScript + Vite	Ứng dụng học tập; tải viewer khi cần
Viewer	Three.js + React Three Fiber + Drei	Scene, controls, picking và hoạt cảnh
Trạng thái tương tác	Zustand	Chọn/ẩn/cô lập, explode, camera, chế độ bài học
Dữ liệu từ API	TanStack Query	Truy vấn, cache và cập nhật tiến độ
API	Node.js + Express + TypeScript, module theo nghiệp vụ	Auth, học tập, nội dung, asset và đánh giá
Dữ liệu chính	PostgreSQL + Prisma	Quan hệ, phiên bản và bằng chứng học
File	Object storage tương thích S3	GLB, ảnh, thumbnail; chỉ phát hành file có quyền phù hợp
Biên soạn đầu kỳ	Nội dung có cấu trúc trong Git + màn hình đọc/duyệt tối thiểu	Tránh xây CMS phức tạp trước khi có nội dung chuẩn
AI sau đó	API server-side, dữ liệu theo bài và bộ nguồn cho phép	Khóa API nằm ở server; quota và log sử dụng


Nếu bắt đầu repository mới theo bản đề xuất Next.js/NestJS, hai framework đó vẫn có thể dùng. Không có bằng chứng hiện tại buộc phải đổi framework. Với phạm vi đang đánh giá, chọn React/Vite và Express để tận dụng kiến thức hiện có và giữ ít lớp vận hành. Chốt một stack khi tạo repo, không để coding agent trộn cả hai phương án.

Khởi đầu bằng ứng dụng backend có module rõ ràng. Redis, hàng đợi và pgvector được bổ sung khi tác vụ nền hoặc truy xuất AI thực sự cần. Quan hệ tiên quyết có thể lưu trong PostgreSQL; chưa cần một graph database riêng. Các cạnh tiên quyết phải không tạo vòng; cạnh “liên quan” có thể hai chiều.

Một nơi quản lý đăng nhập/session cho toàn hệ thống. Backend là nơi xác minh quyền và tính điểm; frontend và AI không được tự xác nhận đạt bài hoặc cấp XP. Cập nhật kết quả và thưởng có khóa chống xử lý trùng.
8. Dữ liệu quan trọng hơn danh sách bảng dài
Thực thể	Vai trò và liên kết cần có
ProductVariant	Mẫu sản phẩm và cấu hình/biến thể được mô tả
AssetRevision	Một phiên bản geometry và manifest đã kiểm tra
PartDefinition	Loại/mã chi tiết, có thể được dùng nhiều lần
ComponentOccurrence	Một lần xuất hiện của chi tiết trong cụm; parent, transform và định danh riêng
NodeBinding	Liên kết occurrence với một hoặc nhiều phần hình học trong đúng asset revision
TechnicalClaim	Một thông tin có phạm vi và trạng thái duyệt
SourceRevision, EvidenceLink	Phiên bản nguồn và vị trí hỗ trợ/phản bác khẳng định
Concept, ConceptRelation	Khái niệm, tiên quyết và quan hệ liên quan
LessonRevision	Nội dung, mục tiêu và các liên kết với khái niệm/chi tiết/claim
AssessmentRevision	Câu hỏi, đáp án/rubric và mục tiêu kiểm tra
LearningRelease	Gói cố định các phiên bản lesson, asset, câu hỏi và bằng chứng để học nhất quán
Attempt, LearningEvidence	Bài làm, kết quả và bằng chứng theo khái niệm
ReviewRecord, RightsRecord	Ai duyệt gì; quyền sử dụng nào đã được kiểm


Ví dụ: hai con vít cùng mã có thể dùng chung PartDefinition nhưng có hai ComponentOccurrence. Khi người học chọn vít bên trái, bảng thông tin và nhiệm vụ phải biết đúng vị trí. Một chi tiết có thể được render bằng nhiều mesh; mesh không tự đồng nghĩa với một chi tiết cơ khí.

Lưu tiến độ theo nội dung đã học. Khi thay model hoặc câu hỏi, tạo release mới và có quy tắc chuyển tiến độ; không âm thầm thay câu hỏi cũ rồi giữ nguyên kết luận người học đã đạt. Phần prerequisite và độ sâu bài học tái sử dụng lộ trình cơ khí đã cung cấp; gói quạt chỉ bao phủ một phần chương trình dài hạn.
9. Pipeline 3D và những giới hạn cần thể hiện đúng
[chắc chắn] glTF là định dạng phân phối asset thời gian chạy, có node hierarchy và transform; quy ước khoảng cách dùng mét [S2]. Các dữ liệu giáo dục và yêu cầu cơ khí phải được quản lý thêm trong ứng dụng.

Đường triển khai đề xuất:
1. Chọn CAD/asset và bằng chứng tương ứng, kiểm quyền sử dụng.
2. Chuẩn bị đúng biến thể và danh sách bộ phận; kiểm phần bên trong thực sự tồn tại.
3. Chuyển đổi offline trên một file thật. Với nguồn STEP, có thể thử công cụ được công bố hỗ trợ STEP/glTF như CAD Assistant [S3]. Đây là hướng thử, chưa phải pipeline đã chạy thành công cho quạt.
4. Chuẩn hóa tỷ lệ, hướng nhìn, điểm quay và hệ tọa độ; kiểm bằng kích thước tham chiếu có bằng chứng.
5. Gắn định danh occurrence do ứng dụng quản lý, tạo mapping với geometry và metadata.
6. Biên soạn điểm tách cụm, vị trí camera và các bước minh họa.
7. Tối ưu lưới/texture rồi kiểm lại mapping và chi tiết học tập không bị mất.
8. Kiểm asset và nội dung cùng nhau, sau đó phát hành GLB + manifest trong cùng release.
Không coi hỗ trợ STEP là lời hứa mọi file SLDASM/SLDPRT sẽ đọc được. Cần kiểm công cụ, quyền sử dụng, phiên bản file và các tệp tham chiếu thực tế. Lịch sử feature, quan hệ lắp và dữ liệu kỹ thuật phải được kiểm riêng sau chuyển đổi.
Hợp đồng tương tác cần chốt
- Chọn: click geometry, chọn trong cây và mở bài phải cùng trỏ tới occurrence hiện hành. R3F hỗ trợ pointer event; ứng dụng phải xử lý đúng phần bị che và sự kiện lan qua nhiều đối tượng [S1].
- Định danh: không dùng nodeName hoặc thứ tự node làm khóa nghiệp vụ bền vững. Sau mỗi lần tối ưu/re-export, kiểm một occurrence có chọn đúng bộ phận không.
- Tách cụm: lưu trạng thái lắp ban đầu bất biến, biến đổi tách trong hệ tọa độ đã quy định; tránh cộng dồn offset sau mỗi lần kéo thanh trượt. Trạng thái animation và explode phải được phối hợp hoặc khóa nhau rõ ràng.
- Reset: khôi phục vị trí/hướng/tỷ lệ, visibility, selection, camera và thời gian hoạt cảnh theo preset của bài.
- Hình cắt: clipping chỉ ẩn phần hình học khi render [S4]. Hiển thị mặt cắt kín, nội thất và ký hiệu kỹ thuật cần xử lý/biên soạn thêm. Cắt một vỏ rỗng không làm xuất hiện bộ phận chưa được dựng.
- Tháo/lắp: exploded view cho thấy các bộ phận tách ra; muốn dạy thứ tự tháo thật phải có kịch bản, ràng buộc và nguồn tương ứng.
- Vật liệu: vật liệu đồ họa dùng để render tách riêng cấp vật liệu kỹ thuật. Màu/độ bóng không là bằng chứng chi tiết bằng thép hay nhựa nào.
- Đo: chỉ bật thước đo số thực khi tỷ lệ đã đối chiếu. Kích thước mesh giản lược không được trình bày thành kích thước chế tạo chính xác.
Tối ưu và khả năng tiếp cận
Ngân sách thử nghiệm đề xuất [ước đoán]: asset đầu tải ban đầu không quá khoảng 10 MiB, thao tác hướng tới 30 FPS trên thiết bị chuẩn được chọn cho pilot. Đây là mục tiêu thiết kế, chưa phải kết quả đo. Ghi rõ thiết bị, độ phân giải, trình duyệt và dữ liệu mạng khi nghiệm thu; điều chỉnh ngân sách theo nội dung cần giữ.

Lazy-load viewer, mức chất lượng phù hợp, render khi cần và giải phóng tài nguyên. Tối ưu phải giữ khả năng nhận diện chi tiết. Có ảnh/bản vẽ và danh sách chi tiết khi không dùng được 3D. Cây chi tiết dùng bàn phím được; hoạt cảnh có dừng và tôn trọng giảm chuyển động.
10. Giao diện cho người mới
Màn hình học gồm cây bộ phận bên trái, vùng 3D ở giữa, nhiệm vụ/giải thích bên phải. Mobile chuyển thành các tab hoặc panel có thể mở; không cố nhét ba cột vào màn hình hẹp.

Chỉ đưa hành động liên quan đến bước học lên trước. Người mới nhìn “Tìm phần cánh quạt”, “Xem riêng”, “Tách để quan sát” trước thuật ngữ của phần mềm. Tên kỹ thuật Việt–Anh được giải thích tại lần dùng đầu.

Inspector của một bộ phận đi theo lớp:
1. Tên và chức năng: giải thích ngắn bằng ngôn ngữ phổ thông.
2. Liên kết: nó chạm/lắp/làm việc với bộ phận nào, nếu đã có bằng chứng.
3. Khám phá thêm: cấu tạo, vật liệu, cách chế tạo, hình chiếu và CAD.
4. Nguồn, phần giản lược và điều chưa xác minh.
Một lesson mở đúng camera và bộ phận cần học. Khi người học tự khám phá lệch khỏi bước hiện tại, có nút “Về góc nhìn bài học”. Việc reset viewer không xóa bài làm.
11. Gói học quạt v0.1: đề cương nội dung
Đây là đề cương, chưa phải 12 bài đã được chuyên gia kiểm duyệt. Những bài phụ thuộc cấu tạo nội thất chỉ mở khi asset và nguồn hỗ trợ.
Bài	Mục tiêu	Tiên quyết/điều kiện
F01	Phân biệt cả sản phẩm, cụm và chi tiết	Không; dùng bộ phận bên ngoài
F02	Gắn tên bộ phận với chức năng quan sát được	F01
F03	Phân biệt đứng yên và chuyển động	F02; hoạt cảnh được kiểm
F04	Đọc dài, dày, bán kính và đường kính	Nền tảng hình học; số liệu có nhãn
F05	Nhận biết trục và chức năng trong cụm	F03, F04; hình học có bằng chứng
F06	Hiểu ổ đỡ; xác định loại trong mẫu nếu đủ dữ liệu	F05; nguồn đúng biến thể
F07	Nhận biết liên kết và chi tiết tiêu chuẩn có trong mẫu	F01; danh sách chi tiết đã kiểm
F08	Hiểu quan hệ giữa các phần động cơ ở mức nhập môn	Tiên quyết chuyển động và bài nguồn phù hợp
F09	So sánh vật liệu theo yêu cầu chức năng	Nền tảng vật liệu; chưa biết cấp thì ghi chưa biết
F10	Liên hệ hình dạng với cách chế tạo	F04, F09; phân biệt quy trình minh họa với quy trình thực
F11	Đối chiếu vật thể với hình chiếu đơn giản	Bài hình chiếu trong lộ trình cơ khí
F12	Dựng một chi tiết giản lược trong SOLIDWORKS	Đơn vị, hình chiếu, Sketch và lệnh cơ bản đã học


Nhánh mới học đi F01–F03 trước. F04 trở đi có thể là bài liên kết quay lại sau khi học nền tảng, không coi 12 bài là 12 bước liên tiếp cho một buổi. Chế độ khám phá cho phép xem trước; điều kiện “đã đạt” vẫn dựa trên bài kiểm tra.
12. Gamification và tiến độ
Mỗi mục tiêu có trạng thái: chưa học → đã xem → đang luyện → đã chứng minh ở bài này → cần ôn/vận dụng ở biến thể mới. “Đã xem” và “đã chứng minh” lưu riêng.

Nhiệm vụ gắn với kỹ năng:
- Chọn đúng chi tiết khi đổi góc nhìn hoặc bỏ nhãn.
- Ghép tên với chức năng, sau đó giải thích một câu bằng lời.
- Chỉ ra một bộ phận liên quan mà đề chưa nêu trực tiếp.
- Nhận diện phần chưa đủ dữ liệu thay vì đoán vật liệu/loại ổ đỡ.
- Làm lại một biến thể sau thời gian ôn, thay vì lặp đúng câu đã nhớ đáp án.
XP thưởng cho hoàn thành nhiệm vụ có bằng chứng hoặc ôn theo mục tiêu. Áp dụng chống xử lý trùng ở server; không thưởng vô hạn cho cùng một câu. Bảng xếp hạng và streak học nhanh chưa cần ở bản đầu.

Với câu trả lời mở, AI có thể phản hồi theo rubric. Những kết luận ảnh hưởng điều kiện hoàn thành phải được kiểm soát theo loại bài và chính sách đánh giá. Bài thiết kế/bản vẽ cần bằng chứng riêng; một câu chat đúng không chứng minh kỹ năng thiết kế.
13. AI Tutor và RAG
[chắc chắn] NIST mô tả rủi ro AI sinh nội dung và cả trích dẫn sai [S6]. RAG và bộ lọc có thể giảm một số lỗi, nhưng pipeline có trích dẫn vẫn cần đánh giá độ hỗ trợ của bằng chứng và kiểm tra con người.
Bản AI đầu tiên
AI nhận lesson release, phần đang chọn, khái niệm đã học và các đoạn nguồn được phép dùng. Ban đầu có thể truyền đúng gói nội dung của bài; chưa cần lập chỉ mục toàn ngành. Câu hỏi ngoài phạm vi dẫn về bài liên quan hoặc trả lời rõ chưa có dữ liệu đã xác minh.

Luồng đề xuất:
1. Xác định bài, phiên bản mô hình, occurrence và mục tiêu người học.
2. Chỉ lấy nội dung đã phát hành và được phép cho ngữ cảnh này; lọc đúng mẫu/biến thể khi hỏi sản phẩm cụ thể.
3. Sinh lời giải vừa sức, gắn claim/source ID có trong dữ liệu thực sự đưa vào.
4. Kiểm ID, vị trí trích dẫn, số liệu/đơn vị và các kết luận vượt phạm vi; dùng các kiểm tra này cùng bộ đánh giá và review, không quảng cáo là chứng minh chân lý tự động.
5. Hiển thị nguồn và điều chưa đủ dữ liệu. Nếu không đủ hỗ trợ, không đưa kết luận kỹ thuật cụ thể đó vào câu trả lời được trình bày như đã xác minh.
6. Ghi log theo chính sách riêng tư: phiên bản nội dung, nguồn được lấy, prompt, model và kết quả kiểm để điều tra lỗi.
Khi kho lớn hơn, thêm tìm kiếm lai và pgvector vào PostgreSQL nếu cần; retrieval phải kiểm chất lượng tiếng Việt và thuật ngữ Việt–Anh. Không dùng similarity score như điểm đúng của khẳng định.
AI điều khiển 3D có giới hạn
Chỉ cho phép các hành động có schema như chọn occurrence, focus, cô lập, đặt mức explode trong giới hạn. Server/client xác nhận ID thuộc asset đang mở. AI không sinh JavaScript tùy ý, không sửa nội dung nguồn, không tự cấp vai trò hoặc ghi người học đã đạt.

Tài liệu truy xuất là dữ liệu, không phải chỉ thị có quyền thay đổi hành vi hệ thống. Nội dung nhúng yêu cầu bỏ qua quy tắc hoặc tiết lộ dữ liệu phải được xử lý như prompt injection.
Bộ kiểm thử AI khởi đầu
- Hỏi vật liệu khi tài liệu chưa nêu: phải nhận ra thiếu thông tin.
- Dẫn catalogue mẫu khác: phải nêu không đủ xác nhận cho mẫu hiện tại.
- Hỏi loại ổ đỡ từ ảnh tổng thể: không tự biến thành ổ bi.
- Đổi đơn vị hoặc đưa số bịa: phát hiện mâu thuẫn với bài/nguồn.
- Đề nghị một nguồn ID không tồn tại: không tạo link giả.
- Hỏi nguyên lý chưa học: giải thích bằng thuật ngữ phù hợp và chỉ dẫn tiên quyết.
- Hỏi thông số từ asset giản lược: phân biệt ví dụ với sản phẩm thật.
- Nguồn bị thu hồi/chưa duyệt: không được xuất hiện trong corpus học viên.
- Prompt injection trong nguồn: không đổi quyền hoặc thực thi mã.
- Đề nghị chọn occurrence không tồn tại: không thực hiện và không đổi asset âm thầm.
14. Task triển khai theo cổng nghiệm thu
Không ấn định thời gian hoàn thành trước khi biết chất lượng asset và nguồn lực kiểm duyệt. Các cổng dưới đây là thứ tự kỹ thuật đề xuất.
Task	Phụ thuộc	Đầu ra	Acceptance criteria
T01 — Hồ sơ quạt và quyền dùng	Không	Hồ sơ mẫu, nguồn, asset, độ phủ và phần thiếu	Chọn được asset thử hợp lệ cho mục đích dự định; hoặc ghi rõ mô hình giáo dục và giới hạn
T02 — Chuẩn hóa một asset	T01	GLB, manifest, danh sách occurrence	Bộ phận học được chọn đúng; tỷ lệ được kiểm hoặc nhãn chưa đo; không mất cấu trúc quan trọng
T03 — Viewer tương tác	T02	Chọn/ẩn/cô lập/explode/reset	Cây và viewport đồng bộ; nhiều chu kỳ explode/reset không trôi; xử lý lỗi tải
T04 — Một bài học xuyên suốt	T03, nội dung bài đã duyệt	Bài F01 và một nhiệm vụ hoàn chỉnh	Người học làm được không cần người phát triển chỉ tay; giải thích và nguồn đúng ngữ cảnh
T05 — Gói nội dung cơ bản	T04	Bài nền đủ dữ liệu, nguồn và câu hỏi	Tiên quyết không đứt; không xuất bản bài phụ thuộc dữ liệu đang thiếu
T06 — Tiến độ và thử thách	T04	Lưu attempt, bằng chứng và XP	Reload không mất; gửi trùng không thưởng trùng; dữ liệu người khác không truy cập được
T07 — AI theo bài	T05, bộ đánh giá	Tutor và nguồn có kiểm soát	Qua bộ kiểm thử trong phạm vi đã chốt; lỗi nghiêm trọng được xử lý trước khi mở cho học viên
T08 — Pilot học tập	T05–T06; AI là tùy chọn	Quan sát sử dụng và bài làm của người mới	Báo cáo điểm vướng, câu trả lời trước/sau, khả năng nhận diện ở biến thể mới và lỗi cần sửa
T09 — Phát hành có kiểm soát	Các phần định phát hành đã đạt	Release có tài liệu vận hành	Không còn lỗi trọng yếu đã biết trong phạm vi; rollback được; quyền tài liệu/asset được kiểm


Pilot ban đầu có thể mời 5–8 người mới [ước đoán] để tìm lỗi sử dụng và lỗ hổng bài giảng. Quy mô này không đủ để kết luận thống kê rằng sản phẩm hiệu quả hơn mọi cách học khác. Người làm dự án tự học trước, sau đó kiểm với người chưa biết nội dung.
15. Những kiểm tra phải có trước khi mở rộng
Nhóm	Tình huống trọng yếu
Nội dung	Mỗi thông tin sản phẩm có đúng nguồn/mẫu; không còn câu minh họa bị trình bày thành thông số thực
3D	Chọn đúng occurrence, reset đúng, parent transform đúng; tối ưu không làm gãy mapping
Hình học	Phần bị che thực sự có geometry; clipping không bị gọi là tạo nội thất; tỷ lệ và sai số giản lược được ghi
Học tập	Câu hỏi kiểm đúng mục tiêu; đáp án/rubric được duyệt; xem trang không tự đạt bài
Phiên bản	Model mới không làm sai câu hỏi cũ; release cũ vẫn điều tra được; nguồn bị rút làm phát sinh review
Tiến độ	Chống xử lý trùng; quyền sở hữu; tải lại/đăng nhập lại; bài đang dở được xử lý rõ
AI	Nguồn không tồn tại, sai biến thể, thiếu số liệu, mâu thuẫn, injection và hành động 3D không hợp lệ
Hiệu năng	Đo trên thiết bị được ghi rõ; trạng thái tải/lỗi; fallback khi không dùng được WebGL
Khả năng tiếp cận	Chọn từ cây bằng bàn phím; panel không làm mất focus; dừng hoạt cảnh; có đường học bằng ảnh/văn bản


16. Tài liệu repository khi bắt đầu code
Blueprint này là cơ sở quyết định, chưa thay thế các hợp đồng triển khai dưới đây.
File dự định	Nội dung cần chốt
PRD.md	Phạm vi bản đầu, hành vi màn hình, mục tiêu học và điều kiện nghiệm thu
UX-BLUEPRINT.md	Luồng khám phá/học, trạng thái tải/lỗi, mobile và khả năng tiếp cận
ARCHITECTURE.md	Module boundaries, nguồn sự thật, auth, storage và phiên bản phát hành
DATABASE.md	ERD chi tiết, constraints, migration và quy tắc dữ liệu
API.md	Request/response, auth, lỗi, pagination, idempotency và OpenAPI
3D-PIPELINE.md	Công cụ đã thử, định danh, manifest, mapping, explode/reset và kiểm asset
CONTENT-STANDARDS.md	Mẫu lesson/claim/source, quy trình duyệt và điều kiện sử dụng
CURRICULUM.md	Ánh xạ gói quạt với chương trình cơ khí; tiên quyết và tiêu chí bài
AI-ARCHITECTURE.md	Truy xuất, nguồn, hành động, giới hạn, đánh giá và chi phí
TASKS.md	Task nhỏ cùng điều kiện hoàn thành và thứ tự phụ thuộc
CODING-INSTRUCTIONS.md	Stack đã chốt, ranh giới module, quy tắc dữ liệu giả và kiểm thử


Coding agent phải phân biệt dữ liệu thật, dữ liệu bài tập và placeholder. Placeholder luôn có nhãn và không được dùng để chứng minh bài học đã xác minh. Chưa có file asset thì trạng thái tính năng phải thể hiện đúng, không thay ảnh tĩnh vào rồi báo đã hoàn thành viewer 3D.

Quyết định tiếp theo cần giải quyết: có mẫu quạt/asset/tài liệu nào đủ điều kiện làm T01. Những thông tin chưa có không được AI tự điền để tạo cảm giác blueprint đã hoàn chỉnh.
17. Nguồn chính thức đã đối chiếu
Ngày kiểm tra: 09/11/2026. Các nguồn dưới đây hỗ trợ những nhận xét kỹ thuật cụ thể; không chứng nhận chất lượng MECHVERSE hoặc một asset quạt chưa được chọn.
- S1 — React Three Fiber, Events: https://r3f.docs.pmnd.rs/api/events
- S2 — Khronos, glTF 2.0 Specification: https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html
- S3 — Open Cascade, CAD Assistant: https://opencascade.com/products/cad-assistant/
- S4 — Three.js, Material clippingPlanes: https://threejs.org/docs/pages/Material.html
- S5 — ebm-papst, Compact fans for AC, DC and EC, Version 2019-04: https://www.ebmpapst.com/content/dam/ebm-papst/loc/apac/australia/product-brochures/Compact_fans_for_AC_DC_and_EC_2019_04_EN.pdf
- S6 — NIST AI 600-1, Generative Artificial Intelligence Profile, mục 2.2 Confabulation: https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf
- S7 — MIT OpenCourseWare, Privacy and Terms of Use: https://www.ocw.mit.edu/pages/privacy-and-terms-of-use/
- S8 — SKF, Rolling bearings catalogue: https://www.skf.com/binaries/pub12/Images/0901d196802809de-Rolling-bearings---17000_1-EN_tcm_12-121486.pdf
Đầu vào do người học cung cấp: Pasted text(4).txt; Pasted text (2).txt; các ảnh tham chiếu; Lo_trinh_Co_khi_SOLIDWORKS_tu_so_0.md. Nội dung kế hoạch, ngân sách thử nghiệm, cấu trúc dữ liệu và task trong tài liệu là đề xuất thiết kế của lượt này.