import type { Lesson, Question, Source } from "../types";

const status = {
  revision: 1,
  sourceStatus: "source-checked",
  expertReviewStatus: "none",
  publicationScope: "personal-preview",
  group: "foundation",
  activity: "identify",
} as const;
const question = (
  id: string,
  prompt: string,
  labels: string[],
  correct: string,
  rationale: string,
  sourceRefs: string[],
): Question => ({
  id,
  kind: "choice",
  prompt,
  choices: labels.map((label, i) => ({ id: String(i), label })),
  correct,
  rationale,
  sourceRefs,
});
const block = (
  id: string,
  title: string,
  body: string[],
  sourceRefs: string[],
  kind: "theory" | "example" | "design" = "theory",
) => ({ id, title, body, sourceRefs, kind });
const designRefs = ["jpl-design", "sw-intro"];
export const beginnerSources: Source[] = [
  {
    id: "jpl-design",
    title: "Engineering Design Process Flow Chart",
    publisher: "NASA/JPL-Caltech",
    author: "Kim Orr / JPL Education",
    url: "https://www.jpl.nasa.gov/edu/resources/image/engineering-design-process-flow-chart/",
    version: "03-10-2024",
    checkedAt: "2026-11-09",
    locator: "Đoạn giới thiệu và danh sách bước 1–7",
    scope:
      "Quy trình xác định vấn đề, xây dựng, thử và cải tiến; không chứng minh một vật cụ thể an toàn.",
    usage:
      "Liên kết và diễn giải gốc; không chép hình hoặc dùng logo NASA/JPL.",
    sourceStatus: "source-checked",
  },
  {
    id: "mitutoyo-errors",
    title: "General Notes on Use of Caliper",
    publisher: "Mitutoyo",
    author: "Mitutoyo Corporation",
    url: "https://www2.mitutoyo.co.jp/eng/useful/catalog-2026/seo/0532.html",
    version: "E2026 Catalog",
    checkedAt: "2026-11-09",
    locator:
      "Trang in 13-19, General Notes 1; minimum reading and indication error",
    scope:
      "Phân biệt độ phân giải/sai số chỉ thị; ảnh hưởng lực đo và nhiệt độ.",
    usage:
      "Bảo lưu quyền; chỉ liên kết/diễn giải, không chép bảng/hình/thông số thành dữ liệu máy đo.",
    sourceStatus: "source-checked",
  },
  {
    id: "mitutoyo-check",
    title: "Calipers — origin, parallax, maintenance",
    publisher: "Mitutoyo",
    author: "Mitutoyo Corporation",
    url: "https://www2.mitutoyo.co.jp/eng/useful/catalog-2026/seo/0533.html",
    version: "E2026 Catalog",
    checkedAt: "2026-11-09",
    locator: "Trang in 13-20, các mục 3–4 và 8–9",
    scope:
      "Kiểm gốc, nhìn thẳng vạch và vệ sinh mặt đo; không thay hướng dẫn đúng loại dụng cụ.",
    usage:
      "Bảo lưu quyền; lời giảng và số bài tập tự soạn, không tái sử dụng hình của hãng.",
    sourceStatus: "source-checked",
  },
  {
    id: "os-angles",
    title: "Prealgebra 2e — Properties of Angles",
    publisher: "OpenStax / Rice University",
    author: "Lynn Marecek, MaryAnne Anthony-Smith, Andrea Honeycutt Mathis",
    url: "https://openstax.org/books/prealgebra-2e/pages/9-3-use-properties-of-angles-triangles-and-the-pythagorean-theorem",
    version: "Prealgebra 2e, 2020 / bản web",
    checkedAt: "2026-11-09",
    locator:
      "§9.3 Use the Properties of Angles; supplementary/complementary angles",
    scope: "Hai tia, đỉnh, góc vuông và quan hệ 90°/180°.",
    usage:
      "Nguồn hiện ghi CC BY-NC-SA 4.0 và giới hạn AI; chỉ đối chiếu quan hệ toán, không chép lời/hình/bài sách hoặc tạo corpus. Kiểm quyền trước thương mại hóa.",
    sourceStatus: "source-checked",
  },
];

export const beginnerLessons: Lesson[] = [
  {
    ...status,
    id: "M01-L01",
    slug: "co-khi-trong-doi-song",
    title: "Cơ khí bắt đầu từ đồ vật quanh bạn",
    deck: "Không cần biết tên máy: bắt đầu bằng một vật và việc nó giúp bạn làm.",
    minutes: 10,
    objectives: [
      "Nêu nhu cầu mà một đồ vật đáp ứng và đặt một câu hỏi có thể kiểm tra.",
      "Tách điều quan sát được khỏi điều cần thêm bằng chứng.",
    ],
    prerequisites: [],
    conceptIds: ["need", "function", "evidence"],
    terms: [
      { term: "Nhu cầu", meaning: "Việc người dùng muốn giải quyết." },
      {
        term: "Chức năng",
        meaning: "Việc đồ vật hoặc bộ phận thực hiện để đáp ứng nhu cầu.",
      },
      {
        term: "Bằng chứng",
        meaning:
          "Quan sát, phép đo hoặc tài liệu có thể kiểm tra, kèm phạm vi.",
      },
    ],
    blocks: [
      block(
        "M01-L01-theory",
        "Từ một chiếc bút đến một câu hỏi kỹ thuật",
        [
          "Cơ khí giúp biến nhu cầu thành đồ vật có hình dạng, bộ phận và cách làm phù hợp. Bạn có thể bắt đầu bằng bút, ghế hay quạt: đồ vật giúp làm việc gì, phần nào góp vào việc đó, và cần kiểm tra điều gì? Chưa cần nhớ tên mọi chi tiết.",
          "Với bút đang đóng nắp, bạn thấy nắp che đầu bút. Bạn chưa biết kiểu ghép bên trong chỉ từ mặt ngoài. Quan sát và suy đoán nên được ghi riêng.",
        ],
        designRefs,
      ),
      block(
        "M01-L01-example",
        "Ví dụ có lời giải: một giá đỡ điện thoại",
        [
          "Dữ kiện bài tập: cần giữ điện thoại trên bàn để đọc, chưa có mẫu hay số đo. Câu hỏi “nó có đẹp không?” chưa xác định cách thử. Câu hỏi “với điện thoại và mặt bàn đã chọn, giá có giữ được vị trí mong muốn không?” cho biết cần dựng mẫu và quan sát gì.",
          "Bài thiếu một bước: trước khi vẽ giá, cần ghi rõ ______. Điền thử rồi mở lời gợi ý ở cuối bài tự kiểm; hãy nghĩ đến đồ vật mà giá phải đỡ và điều kiện sử dụng.",
        ],
        designRefs,
        "example",
      ),
      block(
        "M01-L01-design",
        "Vì sao ta chưa mở CAD ngay?",
        [
          "CAD là cách biểu diễn và sửa hình học bằng máy tính. Hình đẹp chưa trả lời sản phẩm có đáp ứng nhu cầu không. Trước tiên ghi yêu cầu bằng lời; các bài sau nối lời đó với cấu tạo, kích thước, mô hình và kiểm tra.",
          "Ứng dụng hôm nay: đặt một vật an toàn đang đứng yên trước mặt, viết “vật này giúp…”, rồi ghi một điều nhìn thấy và một điều chưa biết. Đây là điểm khởi đầu, không phải bài thi nghề.",
        ],
        designRefs,
        "design",
      ),
    ],
    questions: [
      question(
        "M01-L01-Q1",
        "Muốn làm giá đỡ điện thoại, bạn nên làm gì trước?",
        [
          "Vẽ ngay hình bất kỳ trong CAD",
          "Làm rõ điện thoại, nơi dùng và việc giá cần đáp ứng",
          "Chọn màu trước mọi yêu cầu",
        ],
        "1",
        "Xác định vấn đề và điều kiện trước khi chọn phương án. Ở bài thiếu bước, cần biết điện thoại cần đỡ và điều kiện sử dụng.",
        designRefs,
      ),
      question(
        "M01-L01-Q2",
        "Nhìn bút đóng nắp, thông tin nào là quan sát có giới hạn?",
        [
          "Nắp đang che vùng đầu bút; chưa biết kiểu ghép bên trong",
          "Chắc chắn mọi bút dùng cùng kiểu ren",
          "Bút nhỏ nên không có cụm",
        ],
        "0",
        "Chỉ khẳng định điều dữ kiện cho phép; chưa có nguồn về phần bị che.",
        designRefs,
      ),
      question(
        "M01-L01-Q3",
        "Một mô hình 3D hiển thị đẹp chứng minh điều gì?",
        [
          "Có thể đưa ngay vào sản xuất",
          "Đã kiểm an toàn cho mọi tải",
          "Có biểu diễn hình học; vẫn cần kiểm theo yêu cầu",
        ],
        "2",
        "Mô hình là một phương tiện làm việc; thử nghiệm và đánh giá theo yêu cầu vẫn cần thiết.",
        designRefs,
      ),
    ],
    mistakes: [
      "Đợi thuộc tên mọi loại máy mới bắt đầu học.",
      "Nhìn thấy hình bên ngoài rồi khẳng định luôn cấu tạo bị che.",
    ],
    observation:
      "Ghi tên một vật, nhu cầu nó đáp ứng, một phần bạn thấy và một câu hỏi cần kiểm tra. Chỉ quan sát vật đứng yên, không tháo thiết bị điện.",
    practicalRubric: [
      "Nêu vật và nhu cầu cụ thể.",
      "Nêu một quan sát và một điều chưa biết riêng biệt.",
      "Đặt một câu hỏi có thể kiểm bằng quan sát/tài liệu hoặc phép đo.",
    ],
    sourceRefs: designRefs,
  },
  {
    ...status,
    id: "M01-L04",
    slug: "thiet-ke-che-tao-gia-cong",
    title: "Thiết kế, chế tạo và gia công khác nhau thế nào?",
    deck: "Đi từ yêu cầu đến cách làm; CAD là một công cụ trong quá trình đó.",
    minutes: 12,
    objectives: [
      "Phân biệt xác định giải pháp, tạo sản phẩm và bước gia công trong ví dụ đã cho.",
    ],
    prerequisites: ["C02"],
    conceptIds: ["design", "manufacture", "machining"],
    terms: [
      {
        term: "Thiết kế",
        meaning:
          "Xác định giải pháp đáp ứng yêu cầu, kèm thông tin để kiểm tra và thực hiện.",
      },
      {
        term: "Chế tạo",
        meaning:
          "Các công việc tạo ra sản phẩm theo phương án, trong phạm vi quy trình được chọn.",
      },
      {
        term: "Gia công cắt gọt",
        meaning:
          "Trong ví dụ này: tạo hình bằng lấy đi vật liệu; chỉ là một phần có thể có của chế tạo.",
      },
    ],
    blocks: [
      block(
        "M01-L04-theory",
        "Đừng gộp bản vẽ và vật được làm ra",
        [
          "Thiết kế xác định hình dạng, quan hệ và yêu cầu cần đạt. Chế tạo tạo vật theo phương án; có thể gồm nhiều công đoạn. Trong phạm vi ví dụ, gia công cắt gọt lấy vật liệu ra để tạo hình. Thuật ngữ chi tiết và các công nghệ được học sâu ở M11.",
          "CAD giúp thể hiện hình học và quan hệ. Nó chưa tự chọn vật liệu, quy trình hay xác nhận sản phẩm thật phù hợp.",
        ],
        ["sw-intro", "delft-manufacturing"],
      ),
      block(
        "M01-L04-example",
        "Ví dụ có lời giải: tấm có lỗ",
        [
          "Giả thiết: một tấm đã có sẵn, cần lỗ cho mối ghép. Chọn vị trí/kích thước lỗ theo chức năng thuộc thiết kế; bước tạo lỗ bằng khoan trong quy trình giả định thuộc chế tạo. Việc đo kiểm sau đó hỏi kết quả thực có phù hợp yêu cầu không.",
          "Bài thiếu bước: có hình CAD nhưng chưa ghi đơn vị. Trước khi bàn cách tạo lỗ, cần xác nhận đơn vị và yêu cầu. Không lấy kích thước từ GLB giáo dục làm bản vẽ chế tạo.",
        ],
        ["sw-intro", "delft-manufacturing"],
        "example",
      ),
      block(
        "M01-L04-design",
        "Chọn cách làm cần dữ liệu",
        [
          "Hình giống nhau có thể được tạo bằng những quy trình khác nhau. Chưa có vật liệu, số lượng và yêu cầu kiểm thì chưa đủ kết luận cách làm tối ưu. Khi học M04/M11, bạn sẽ quay lại câu hỏi này với nhiều dữ liệu hơn.",
        ],
        ["delft-manufacturing"],
        "design",
      ),
    ],
    questions: [
      question(
        "M01-L04-Q1",
        "Trong ví dụ tấm có lỗ, việc nào thuộc thiết kế?",
        [
          "Chọn vị trí lỗ theo yêu cầu lắp",
          "Khoan theo phương án đã xác định",
          "Đọc số từ dụng cụ kiểm",
        ],
        "0",
        "Quyết định yêu cầu/hình học theo chức năng là phần thiết kế; tạo lỗ là công đoạn thực hiện.",
        ["sw-intro", "delft-manufacturing"],
      ),
      question(
        "M01-L04-Q2",
        "Có hình CAD rồi, còn thiếu vật liệu và số lượng. Có thể kết luận cách làm tối ưu chưa?",
        ["Có, vì hình trông đẹp", "Chưa đủ dữ liệu để chọn quy trình"],
        "1",
        "Chọn quy trình cần xét yêu cầu và bối cảnh chế tạo, không chỉ nhìn hình.",
        ["delft-manufacturing"],
      ),
    ],
    mistakes: [
      "Đồng nhất vẽ CAD với toàn bộ thiết kế.",
      "Coi mọi quy trình chế tạo đều là cắt gọt.",
    ],
    observation:
      "Với tấm có lỗ giả định, ghi một quyết định thiết kế, một bước làm và một kiểm tra. Không thao tác máy thật.",
    sourceRefs: ["sw-intro", "delft-manufacturing"],
  },
  {
    ...status,
    id: "M01-L05",
    slug: "lap-rap-va-kiem-tra",
    title: "Lắp được rồi, cần kiểm điều gì?",
    deck: "Lắp ráp và kiểm tra có câu hỏi khác nhau; hoạt cảnh không thay bằng chứng thực.",
    minutes: 10,
    objectives: [
      "Tách quan hệ lắp trong mô hình khỏi việc kiểm sản phẩm theo yêu cầu.",
    ],
    prerequisites: ["M01-L04"],
    conceptIds: ["assembly-check", "criteria", "model-limit"],
    terms: [
      {
        term: "Lắp ráp",
        meaning: "Kết hợp các bộ phận thành cụm theo yêu cầu đã xác định.",
      },
      {
        term: "Tiêu chí kiểm",
        meaning: "Điều kiện dùng để so kết quả với yêu cầu.",
      },
      {
        term: "Hoạt cảnh",
        meaning:
          "Chuyển động được lập trình để minh họa; chưa phải phép thử vật lý.",
      },
    ],
    blocks: [
      block(
        "M01-L05-theory",
        "Hai câu hỏi phải được tách ra",
        [
          "Lắp ráp hỏi các phần kết hợp thế nào. Kiểm tra hỏi kết quả có đáp ứng yêu cầu đã ghi không. Một cụm hiển thị đúng vị trí trên CAD chưa chứng minh chi tiết thật lắp vừa hoặc chịu tải đủ.",
          "Mate mô tả quan hệ hình học. Kiểm va chạm hình học và thử chuyển động có ích trong phạm vi mô hình, nhưng cần dữ liệu thực cho dung sai, vật liệu và tải.",
        ],
        designRefs,
      ),
      block(
        "M01-L05-example",
        "Ví dụ có lời giải: nắp và hộp",
        [
          "Giả thiết bài: nắp và thân hộp là hai phần riêng. Lắp ráp là đưa chúng vào quan hệ dự kiến. Nếu yêu cầu chỉ là nắp nằm đúng vị trí trên mô hình, có thể xem quan hệ hình học. Nếu yêu cầu nắp giữ được khi cầm, cần cách thử và dữ liệu thật phù hợp; hình ảnh chưa đủ.",
          "Biến thể tự làm: đổi yêu cầu thành “mở được bằng tay”. Hãy nêu bạn cần kiểm thêm điều gì thay vì chỉ xem nắp có che miệng hộp không.",
        ],
        designRefs,
        "example",
      ),
      block(
        "M01-L05-design",
        "Dùng F01 đúng phạm vi",
        [
          "Ở F01, bạn chọn cánh, xem cây cấu tạo và quan sát vị trí. EDU-FAN-01 chỉ minh họa tám occurrence. Exploded view tách hình để quan sát, không phải hướng dẫn tháo/lắp quạt thật; chuyển động cánh là hoạt cảnh, không phải kết quả tính khí động.",
        ],
        ["edu-manifest"],
        "design",
      ),
    ],
    questions: [
      question(
        "M01-L05-Q1",
        "Nắp hộp nhìn đúng vị trí trong CAD. Kết luận nào phù hợp?",
        [
          "Đã xác nhận mọi yêu cầu của nắp thật",
          "Đã có quan hệ hình học trong mô hình; cần kiểm theo yêu cầu thực",
        ],
        "1",
        "Kết quả mô hình chỉ trả lời trong phạm vi dữ liệu; không xác nhận các điều kiện chưa kiểm.",
        designRefs,
      ),
      question(
        "M01-L05-Q2",
        "Exploded view của F01 có phải trình tự tháo quạt điện thật?",
        [
          "Có thể làm theo để tháo mọi quạt",
          "Không; đây là tách hình minh họa cấu tạo",
        ],
        "1",
        "Bố trí hình tách không cung cấp quy trình, điều kiện hay dữ liệu tháo thiết bị thật.",
        ["edu-manifest"],
      ),
    ],
    mistakes: [
      "Coi hoạt cảnh chuyển động là thử tải.",
      "Dùng exploded view làm trình tự tháo thiết bị.",
    ],
    observation:
      "Viết hai yêu cầu khác nhau cho nắp hộp giả định, và nêu mỗi yêu cầu cần kiểu bằng chứng nào.",
    sourceRefs: [...designRefs, "edu-manifest"],
  },
  {
    ...status,
    id: "M01-L06",
    slug: "tu-y-tuong-toi-san-pham",
    title: "Từ ý tưởng tới sản phẩm: bài phân tích đầu tiên",
    deck: "Gộp quan sát, cấu tạo, chức năng và kiểm tra thành một bài làm có thể xem lại.",
    minutes: 18,
    objectives: [
      "Lập phân tích một vật quen thuộc và nêu điều cần xác minh.",
      "Nhận ra các nhóm công việc trong quá trình phát triển sản phẩm.",
    ],
    prerequisites: ["M01-L05"],
    conceptIds: ["design-process", "practical-evidence", "career-orientation"],
    terms: [
      {
        term: "Phương án",
        meaning: "Một cách giải quyết yêu cầu để xem xét và so sánh.",
      },
      {
        term: "Nguyên mẫu",
        meaning: "Mẫu dùng để thử những câu hỏi cụ thể trước khi hoàn thiện.",
      },
      {
        term: "Hồ sơ",
        meaning:
          "Thông tin về yêu cầu, giải pháp, kiểm tra và thay đổi để người khác xem lại.",
      },
    ],
    blocks: [
      block(
        "M01-L06-theory",
        "Đi một vòng rồi quay lại sửa",
        [
          "Hãy bắt đầu từ nhu cầu, đề xuất phương án, tạo biểu diễn hoặc mẫu, kiểm theo yêu cầu và sửa khi cần. Quy trình có vòng quay lại, không chỉ là chuỗi click CAD một lần.",
          "Trong dự án có những công việc về thiết kế/CAD, chế tạo, lắp ráp và đo kiểm. Đây là các nhóm hoạt động định hướng học; tên nghề và nhiệm vụ thực phụ thuộc tổ chức, đào tạo và phạm vi trách nhiệm.",
        ],
        designRefs,
      ),
      block(
        "M01-L06-example",
        "Ví dụ có lời giải: bút có nắp",
        [
          "Dữ kiện giả định: bút gồm thân, ruột và nắp rời. Nhu cầu là viết; thân giữ ruột, nắp che đầu bút. Chưa có tài liệu về kiểu ghép nên ghi “cần kiểm cách giữ ruột”. Nếu yêu cầu là nắp che kín phần đầu, cần xác định phần cần che và cách quan sát; chưa kết luận vật liệu hoặc độ bền.",
          "Bài thiếu bước: đã vẽ phương án nhưng chưa so với yêu cầu. Bước cần thêm là kiểm và ghi kết quả; nếu không đạt, quay lại sửa phương án.",
        ],
        designRefs,
        "example",
      ),
      block(
        "M01-L06-design",
        "Bài tự làm và đường học tiếp",
        [
          "Chọn bút, ghế hoặc hộp an toàn. Ghi nhu cầu; một cây cấu tạo nhỏ theo dữ kiện; chức năng hai phần; điều chưa biết; một yêu cầu và cách kiểm. Nếu chỉ nhìn ngoài, ghi cấu tạo là giả định thay vì khẳng định.",
          "Bài viết lưu ở phần thực hành dưới đây. Rubric để bạn tự đối chiếu; hiện chưa có người review nên bài không tự thành chứng nhận. M02 giúp bạn thêm kích thước; M05 dẫn tới hình chiếu; M07 mở Sketch sau các nền tảng liên quan.",
        ],
        designRefs,
        "design",
      ),
    ],
    questions: [
      question(
        "M01-L06-Q1",
        "Nguyên mẫu chưa đáp ứng yêu cầu đã ghi. Nên làm gì tiếp?",
        [
          "Ghi kết quả, tìm lý do, sửa rồi kiểm lại",
          "Chỉ đổi màu và coi hoàn thành",
          "Bỏ yêu cầu để mẫu luôn đúng",
        ],
        "0",
        "Cần so với yêu cầu và cải tiến có lý do; thử lại là một phần của quá trình.",
        designRefs,
      ),
      question(
        "M01-L06-Q2",
        "Bài phân tích nào cho người khác review được?",
        [
          "Vật rất đẹp, em thấy ổn",
          "Có nhu cầu, dữ kiện cấu tạo, chức năng, giới hạn và cách kiểm",
        ],
        "1",
        "Phân tích cần nêu cơ sở để người khác xem lại, không chỉ cảm nhận.",
        designRefs,
      ),
    ],
    mistakes: [
      "Xóa yêu cầu khi phương án chưa đạt.",
      "Tự coi checklist là review của kỹ sư.",
    ],
    observation:
      "Phân tích một đồ vật quen thuộc theo năm ý ở ví dụ. Không cần chế tạo, tháo điện hay có phần mềm CAD.",
    practicalRubric: [
      "Nêu vật và nhu cầu sử dụng.",
      "Ghi cấu tạo với dữ kiện/giả định, phân biệt cụm và chi tiết.",
      "Giải thích chức năng ít nhất hai phần.",
      "Tách điều biết và điều cần xác minh.",
      "Nêu một yêu cầu, cách kiểm và điều có thể sửa khi không đạt.",
    ],
    sourceRefs: designRefs,
  },
  {
    ...status,
    id: "M02-L02",
    slug: "dai-rong-cao-day",
    title: "Dài, rộng, cao, dày: đo theo hướng nào?",
    deck: "Gọi tên kích thước cùng hướng và đơn vị, kể cả khi xoay vật.",
    minutes: 10,
    objectives: [
      "Mô tả ba kích thước độc lập và hướng đo của một khối đơn giản.",
    ],
    prerequisites: ["C03"],
    conceptIds: ["dimension-direction", "thickness"],
    terms: [
      {
        term: "Kích thước",
        meaning: "Giá trị chiều dài giữa các vị trí theo hướng xác định.",
      },
      { term: "Độ dày", meaning: "Khoảng cách giữa hai bề mặt được chỉ rõ." },
      { term: "Hướng đo", meaning: "Phương đang dùng để xác định kích thước." },
    ],
    blocks: [
      block(
        "M02-L02-theory",
        "Không gọi tên cạnh theo độ dài trên màn hình",
        [
          "Một tấm có thể có dài, rộng và dày theo ba hướng được quy định. Khi xoay vật, các kích thước vật không đổi chỉ vì cạnh hiển thị ngắn đi. Luôn ghi hai vị trí và hướng đo.",
          "Trong bài, tấm có các hướng X, Y, Z vuông góc từng đôi. Ta quy ước dài theo X, rộng theo Y và dày theo Z; đây là quy ước bài tập, không phải mọi vật đều đặt trục giống nhau.",
        ],
        ["os-axes", "sw-intro"],
      ),
      block(
        "M02-L02-example",
        "Ví dụ có lời giải: tấm 80 × 40 × 6 mm",
        [
          "Dữ kiện tự đặt: X=80 mm, Y=40 mm, Z=6 mm. Độ dày theo Z là 6 mm; không phải 80 mm dù X là cạnh dài nhất. Xoay tấm trong viewer không đổi độ dày.",
          "Bài thiếu bước: nếu ai đó chỉ ghi “tấm 80 × 40”, ta chưa biết đơn vị, hướng và độ dày. Cần hỏi bổ sung, không tự điền theo cảm giác.",
        ],
        ["os-axes", "nist-writing"],
        "example",
      ),
      block(
        "M02-L02-design",
        "Liên hệ với CAD và đo",
        [
          "Trước khi dựng, phác ba hướng và ghi số đo có đơn vị. Kiểm một kích thước tham chiếu sau khi nhập. Không đo từ phối cảnh hoặc mesh giản lược rồi coi là số chế tạo.",
        ],
        ["sw-intro", "edu-manifest"],
        "design",
      ),
    ],
    questions: [
      question(
        "M02-L02-Q1",
        "Tấm giả định X=80, Y=40, Z=6 mm, quy định dày theo Z. Độ dày là?",
        ["80 mm", "6 mm", "40 mm"],
        "1",
        "Độ dày theo hướng Z đã quy định là 6 mm, không lấy cạnh dài nhất.",
        ["os-axes"],
      ),
      question(
        "M02-L02-Q2",
        "Xoay góc nhìn CAD làm độ dày vật thay đổi không?",
        [
          "Không; góc nhìn thay đổi biểu diễn",
          "Có, cạnh trên màn hình ngắn đi",
        ],
        "0",
        "Phân biệt hình biểu diễn với kích thước hình học của vật.",
        ["sw-intro"],
      ),
    ],
    mistakes: ["Nhầm chiều dày với cạnh dài nhất trên hình."],
    observation:
      "Phác một hộp, chọn ba hướng và ghi kích thước cùng đơn vị; ghi rõ số nào giả định, số nào đo được.",
    sourceRefs: ["os-axes", "nist-writing", "sw-intro", "edu-manifest"],
  },
  {
    ...status,
    id: "M02-L04",
    slug: "goc-va-hinh-phang",
    title: "Góc và hình 2D trước khi vẽ Sketch",
    deck: "Hai tia chung đỉnh, góc vuông và hình chữ nhật trong một mặt phẳng.",
    minutes: 12,
    objectives: [
      "Nhận diện góc vuông và tính góc còn lại khi hai góc cộng thành 90°.",
    ],
    prerequisites: ["M02-L02"],
    conceptIds: ["angle", "right-angle", "plane-profile"],
    terms: [
      {
        term: "Góc",
        meaning: "Hình tạo bởi hai tia chung gốc, gốc chung là đỉnh.",
      },
      { term: "Góc vuông", meaning: "Góc có số đo 90°." },
      {
        term: "Biên dạng 2D",
        meaning: "Đường/hình nằm trong một mặt phẳng để mô tả hình học.",
      },
    ],
    blocks: [
      block(
        "M02-L04-theory",
        "Chỉ rõ đỉnh, hai hướng và đơn vị độ",
        [
          "Khi nói một góc, cần biết đỉnh và hai hướng tạo góc. Góc vuông là 90°, góc bẹt là 180°. Hai góc ghép kín một góc vuông có tổng 90°, nên phần còn thiếu bằng 90° trừ phần đã biết.",
          "Trong bài ta phác biên dạng hình chữ nhật với bốn góc vuông. Biên dạng trên mặt phẳng chưa có độ dày; việc tạo khối được học ở M08.",
        ],
        ["os-angles", "sw-intro"],
      ),
      block(
        "M02-L04-example",
        "Ví dụ có lời giải và một bước để bạn điền",
        [
          "Dữ liệu tự đặt: một góc vuông được chia bởi một tia, một phần là 35°. Phần kia là 90° − 35° = 55°. Kiểm: 35° + 55° = 90°.",
          "Thử biến thể: nếu phần đã biết là 20°, phần kia là 90° − ___ = ___. Ghi phép trừ và kiểm tổng trước khi nộp, đừng ước góc từ hình phối cảnh.",
        ],
        ["os-angles"],
        "example",
      ),
      block(
        "M02-L04-design",
        "Chuẩn bị cho Sketch",
        [
          "Trong CAD, kích thước và quan hệ dùng để thể hiện ý đồ. Hình trông gần vuông chưa bảo đảm có quan hệ vuông góc; sau này bạn sẽ kiểm ràng buộc thay vì kéo bằng mắt. Bài này chỉ là hình học nền, không hướng dẫn giao diện SOLIDWORKS mới.",
        ],
        ["sw-intro"],
        "design",
      ),
    ],
    questions: [
      question(
        "M02-L04-Q1",
        "Hai góc ghép thành góc vuông, một góc 20°. Góc còn lại là?",
        ["70°", "160°", "20°"],
        "0",
        "90° − 20° = 70°; kiểm 20° + 70° = 90°.",
        ["os-angles"],
      ),
      question(
        "M02-L04-Q2",
        "Một biên dạng nằm trên một mặt phẳng đã xác định được độ dày khối chưa?",
        ["Đã có, luôn bằng 1 mm", "Chưa; cần thông tin tạo khối/độ dày"],
        "1",
        "Phân biệt hình phẳng với khối; không tự điền một kích thước chưa có.",
        ["sw-intro"],
      ),
    ],
    mistakes: [
      "Trừ từ 180° dù đề nói góc vuông.",
      "Ước góc trên phối cảnh rồi coi là kích thước thiết kế.",
    ],
    observation:
      "Vẽ một góc vuông, thêm một tia và tự đặt một góc nhỏ hơn 90°. Tính phần còn lại và kiểm tổng.",
    sourceRefs: ["os-angles", "sw-intro"],
  },
  {
    ...status,
    id: "M02-L06",
    slug: "do-va-gioi-han-phep-do",
    title: "Đo bằng thước và hiểu giới hạn phép đo",
    deck: "Số hiển thị chưa phải độ chính xác; ghi cả cách đo và điều chưa chắc.",
    minutes: 15,
    objectives: [
      "Đọc chiều dài từ hai vạch và ghi đơn vị.",
      "Phân biệt độ phân giải với sai số; nêu kiểm tra trước khi đo bằng thước cặp.",
    ],
    prerequisites: ["C03", "C04", "C05"],
    conceptIds: ["resolution", "measurement-error", "origin-check"],
    terms: [
      {
        term: "Độ phân giải",
        meaning:
          "Mức thay đổi nhỏ nhất có thể phân biệt trên chỉ thị, không tự bằng sai số.",
      },
      {
        term: "Gốc đo",
        meaning: "Mốc bắt đầu dùng để đọc hoặc tính giá trị đo.",
      },
      {
        term: "Sai số đo",
        meaning:
          "Chênh lệch so với giá trị tham chiếu; cần dữ liệu kiểm tra, không suy từ số chữ số.",
      },
    ],
    blocks: [
      block(
        "M02-L06-theory",
        "Đọc và ghi điều dụng cụ thực sự cho biết",
        [
          "Với thước thẳng, hãy xác định mốc đầu và cuối cùng đơn vị. Nếu đầu vật ở vạch 12 mm và cuối ở 57 mm, chiều dài là hiệu hai số chứ không phải số ở cuối. Đây là hình đo giả định, không phải phép đo trên GLB.",
          "Thước cặp có các mặt đo cho những tác vụ phù hợp từng loại. Trước khi dùng cần kiểm dụng cụ, bề mặt đo và gốc theo hướng dẫn của đúng loại; nhìn thẳng vạch khi đọc. Dụng cụ có đầu sắc, chỉ thực hành với vật đứng yên và dưới hướng dẫn phù hợp.",
        ],
        ["nist-writing", "mitutoyo-check"],
      ),
      block(
        "M02-L06-example",
        "Ví dụ có lời giải: không bắt đầu ở số 0",
        [
          "Bài tập tự đặt: vật nằm từ 12 mm tới 57 mm. Tính 57 − 12 = 45 mm. Kiểm bằng 12 + 45 = 57 mm. Nếu đầu ở 8 mm và cuối 41 mm, hãy tự tính hiệu trước khi xem lời giải.",
          "Giả định màn hình dụng cụ thay đổi từng 0,01 mm. Chỉ thông tin đó chưa chứng minh sai số là ±0,01 mm. Cần thông số đúng mẫu và dữ liệu kiểm tra; không tự thêm chữ số vào kết quả thước thẳng để làm nó “chính xác hơn”.",
        ],
        ["mitutoyo-errors", "nist-writing"],
        "example",
      ),
      block(
        "M02-L06-design",
        "Khi số đo dùng để đưa ra quyết định",
        [
          "Lực đo, nhiệt độ và tình trạng dụng cụ có thể ảnh hưởng kết quả. Lặp lại phép đo và ghi cách đặt/mốc giúp nhận ra vấn đề, nhưng không tự xác nhận sai số hay đạt dung sai. M06 sẽ học giới hạn kích thước; bài này chưa cấp quyền kiểm sản phẩm hoặc vận hành máy.",
        ],
        ["mitutoyo-errors", "mitutoyo-check"],
        "design",
      ),
    ],
    questions: [
      question(
        "M02-L06-Q1",
        "Vật từ vạch 8 mm tới 41 mm trên thước giả định. Chiều dài là?",
        ["41 mm", "49 mm", "33 mm"],
        "2",
        "Chiều dài là hiệu: 41 − 8 = 33 mm; kiểm 8 + 33 = 41 mm.",
        ["nist-writing"],
      ),
      question(
        "M02-L06-Q2",
        "Chỉ biết độ phân giải 0,01 mm, có thể coi sai số luôn là ±0,01 mm không?",
        [
          "Có, số hiển thị chính là sai số",
          "Không, cần thông số và kiểm tra đúng dụng cụ",
        ],
        "1",
        "Độ phân giải và sai số chỉ thị là hai thông tin khác nhau.",
        ["mitutoyo-errors"],
      ),
      question(
        "M02-L06-Q3",
        "Trước khi đo bằng thước cặp cần chú ý gì?",
        [
          "Bỏ qua gốc vì có màn hình số",
          "Kiểm mặt đo và gốc theo hướng dẫn đúng loại",
        ],
        "1",
        "Mặt đo và gốc cần kiểm trước khi đọc; màn hình không tự thay thế kiểm tra dụng cụ.",
        ["mitutoyo-check"],
      ),
    ],
    mistakes: [
      "Lấy vạch cuối làm chiều dài dù đầu chưa ở 0.",
      "Coi số chữ số hiển thị là độ chính xác đã xác nhận.",
    ],
    observation:
      "Ghi một kích thước, dụng cụ, đơn vị, mốc đầu/cuối và điều kiện đo. Nếu chưa có dụng cụ, dùng ví dụ thước giả định và ghi rõ đây là bài tập.",
    practicalRubric: [
      "Nêu vật/dữ liệu giả định và dụng cụ.",
      "Ghi mốc đầu/cuối, hiệu và đơn vị.",
      "Nêu một giới hạn của phép đo, không gán sai số từ số chữ số.",
    ],
    sourceRefs: ["nist-writing", "mitutoyo-errors", "mitutoyo-check"],
  },
];
