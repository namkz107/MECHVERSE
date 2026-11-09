import type { Lesson, Question } from "../types";
const choice = (
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
const numeric = (
  id: string,
  prompt: string,
  correct: number,
  unit: string,
  rationale: string,
  sourceRefs: string[],
): Question => ({
  id,
  kind: "numeric",
  prompt,
  correct,
  unit,
  tolerance: unit === 'm' ? 0.000001 : 0.001,
  rationale,
  sourceRefs,
});
const status = {
  revision: 1,
  sourceStatus: "source-checked" as const,
  expertReviewStatus: "none" as const,
  publicationScope: "personal-preview" as const,
  group: "foundation" as const,
};
export const foundationLessons: Lesson[] = [
  {
    ...status,
    id: "C01",
    slug: "san-pham-cum-va-chi-tiet",
    title: "Nhìn đồ vật thành một hệ thống",
    deck: "Sản phẩm, cụm và chi tiết: ba cấp nhìn, không phải ba kích cỡ.",
    minutes: 8,
    objectives: [
      "Phân biệt sản phẩm, cụm và chi tiết theo cấu tạo đã cho.",
      "Biết khi nào ảnh bên ngoài chưa đủ để phân loại.",
    ],
    prerequisites: [],
    conceptIds: ["product", "assembly", "part"],
    terms: [
      {
        term: "Sản phẩm",
        meaning: "Đối tượng hoàn chỉnh đang được xét theo mục đích sử dụng.",
      },
      {
        term: "Cụm (assembly)",
        meaning: "Nhóm gồm các chi tiết hoặc cụm con liên hệ với nhau.",
      },
      {
        term: "Chi tiết (part)",
        meaning:
          "Đơn vị riêng được nhận diện theo mô tả cấu tạo hoặc quy ước mô hình; không suy chỉ từ kích thước.",
      },
    ],
    blocks: [
      {
        id: "C01-theory",
        title: "Một đồ vật, nhiều cấp nhìn",
        body: [
          "Khi nhìn chiếc quạt trên bàn, bạn thấy cả sản phẩm. Khi khoanh phần đầu quạt, bạn đang chọn một cụm. Bên trong phạm vi đó còn có những phần được nhận diện riêng trong mô tả cấu tạo. Cây cấu tạo là bản đồ quan hệ này: phần nằm dưới một cụm thuộc phạm vi của cụm đó.",
          "Một vật nhỏ vẫn có thể là cụm gồm nhiều chi tiết. Ngược lại, một chi tiết có thể rất lớn. Vì thế, trước khi trả lời “chi tiết hay cụm”, hãy hỏi: cấu tạo được mô tả thế nào, và ta đang xét ở cấp nào?",
        ],
        sourceRefs: ["sw-intro"],
        diagram: "identify",
      },
      {
        id: "C01-example",
        title: "Thử với một cấu tạo được cho rõ",
        kind: "example",
        body: [
          "Giả thiết bài tập: một bánh lăn gồm thân bánh, trục và đai ốc, ba phần riêng lắp với nhau. “Bánh lăn gồm ba phần” là một cụm; “trục” là một chi tiết trong mô tả này. Nếu chỉ nhìn một tấm ảnh, bạn chưa biết chắc vật được đúc liền, hàn hay lắp nhiều phần.",
          "Trong EDU-FAN-01, ba lá cánh và tâm cánh được quy ước là một chi tiết “Cánh quạt”. Đây là cách biên soạn mô hình giáo dục, không phải kết luận về mọi chiếc quạt thương mại.",
        ],
        sourceRefs: ["sw-intro", "edu-manifest"],
      },
      {
        id: "C01-design",
        title: "Liên hệ với thiết kế",
        kind: "design",
        body: [
          "Trong CAD, cấu trúc part/assembly giúp quản lý các đối tượng và quan hệ. Một part CAD cũng có thể chứa nhiều body; đừng dùng số mesh trên màn hình để đếm chi tiết cơ khí. Khi chuyển định dạng, cần giữ định danh nghiệp vụ và đối chiếu lại cây cấu tạo.",
        ],
        sourceRefs: ["sw-intro", "edu-manifest"],
      },
    ],
    activity: "identify",
    questions: [
      choice(
        "C01-Q1",
        "Giả thiết: bánh lăn gồm thân bánh, trục và đai ốc, ba phần riêng lắp với nhau. Toàn bộ bánh lăn là gì?",
        [
          "Một cụm",
          "Một chi tiết vì nó nhỏ",
          "Chưa có bất kỳ thông tin cấu tạo nào",
        ],
        "0",
        "Đề đã cung cấp ba phần riêng và mối liên hệ lắp; toàn bộ nhóm là cụm theo phạm vi đang xét.",
        ["sw-intro"],
      ),
      choice(
        "C01-Q2",
        "Đề xác định một tấm đỡ là một phần liền trong mô hình, dù dài 2 m. Nó được gọi là gì ở cấp này?",
        [
          "Cụm vì rất lớn",
          "Chi tiết theo mô tả đã cho",
          "Sản phẩm hoàn chỉnh trong mọi trường hợp",
        ],
        "1",
        "Kích thước không quyết định cấp cấu tạo. Dữ kiện một phần liền và cấp đang xét mới là cơ sở của câu trả lời.",
        ["sw-intro"],
      ),
      {
        id: "C01-Q3",
        kind: "multi",
        prompt:
          "Chọn tất cả thông tin giúp phân loại đáng tin hơn một ảnh ngoài.",
        choices: [
          { id: "bom", label: "Danh sách bộ phận và cấu trúc cụm" },
          { id: "size", label: "Kích thước nhỏ của vật" },
          { id: "description", label: "Mô tả cấu tạo hoặc giả thiết rõ" },
        ],
        correct: ["bom", "description"],
        rationale:
          "Cần thông tin về phần tử và quan hệ; kích thước nhỏ không chứng minh vật chỉ có một chi tiết.",
        sourceRefs: ["sw-intro"],
      },
      choice(
        "C01-Q4",
        "Trong EDU-FAN-01, ba lá cánh và tâm cánh được quy ước là một chi tiết. Chọn kết luận phù hợp.",
        [
          "Mọi quạt đều có cánh đúc liền như vậy",
          "Cánh là một chi tiết theo quy ước mô hình này",
          "Mỗi mesh là một chi tiết cơ khí",
        ],
        "1",
        "Chỉ kết luận trong đúng phạm vi dữ liệu. Mô hình minh họa không chứng minh cấu tạo tất cả quạt.",
        ["edu-manifest"],
      ),
    ],
    observation:
      "Chọn một vật an toàn đang đặt yên, chẳng hạn bút hoặc ghế. Ghi một điều bạn quan sát được và một điều về cấu tạo mà bạn chưa thể xác nhận. Không tháo thiết bị điện.",
    sourceRefs: ["sw-intro", "edu-manifest"],
  },
  {
    ...status,
    id: "C02",
    slug: "chuc-nang-va-lien-ket",
    title: "Mỗi bộ phận làm việc gì?",
    deck: "Từ tên gọi đến vai trò, rồi đến mối liên hệ với bộ phận bên cạnh.",
    minutes: 8,
    objectives: [
      "Giải thích vai trò của bộ phận theo giả thiết đã nêu.",
      "Phân biệt vị trí hình học với bằng chứng về cách liên kết thực.",
    ],
    prerequisites: ["C01"],
    conceptIds: ["function", "connection"],
    terms: [
      {
        term: "Chức năng",
        meaning: "Việc một phần đóng góp vào mục đích của hệ đang xét.",
      },
      {
        term: "Liên kết",
        meaning:
          "Quan hệ giữa các phần, có thể gồm vị trí, tiếp xúc hoặc ràng buộc chuyển động.",
      },
      {
        term: "Ràng buộc hình học",
        meaning:
          "Điều kiện như đồng tâm hoặc trùng mặt trong mô hình CAD; không tự mô tả toàn bộ liên kết vật lý.",
      },
    ],
    blocks: [
      {
        id: "C02-theory",
        title: "Hỏi “để làm gì?” trước khi nhớ tên",
        body: [
          "Một cái tên cho biết bạn đang nói đến phần nào. Chức năng giải thích phần đó đóng góp gì. Trong bài tập quạt giáo dục, đề quy định đế đỡ trụ; trụ nối vùng đầu quạt với đế; cánh tương tác với không khí khi quay. Đó là chức năng được nêu cho mô hình học.",
          "Khi giải thích, dùng một câu gồm chủ thể, hành động và đối tượng: “Trụ nối phần đầu quạt với đế”. Nói “trụ rất quan trọng” chưa chỉ ra chức năng. Hỏi tiếp phần đó làm việc cùng bộ phận nào để chuyển từ danh sách tên sang một hệ có quan hệ.",
        ],
        sourceRefs: ["edu-manifest"],
        diagram: "matching",
      },
      {
        id: "C02-example",
        title: "Vị trí không chứng minh cách lắp",
        kind: "example",
        body: [
          "Trong mô hình, tâm cánh nằm cùng hướng với trục minh họa. Quan sát ấy không đủ kết luận về kiểu ren, then, dung sai hoặc cách khóa cánh của quạt thật. Muốn dạy liên kết thực cần bản vẽ hoặc tài liệu đúng mẫu.",
          "Bài F01 cho bạn chọn bộ phận trên 3D. Bạn có thể quay lại bài đó để thử dùng một câu giải thích chức năng, nhưng kết quả F01 được giữ riêng, không tự chuyển thành điểm Academy.",
        ],
        sourceRefs: ["edu-manifest"],
      },
      {
        id: "C02-design",
        title: "Từ quan sát sang CAD",
        kind: "design",
        body: [
          "Quan hệ hình học trong assembly CAD giúp đặt các component theo điều kiện đã chọn. Một mate đồng tâm nói về hình học; nó không tự xác nhận ma sát, độ bền, loại ổ đỡ hay công nghệ chế tạo của vật thật.",
        ],
        sourceRefs: ["sw-intro"],
      },
    ],
    activity: "matching",
    questions: [
      {
        id: "C02-Q1",
        kind: "matching",
        prompt: "Theo giả thiết mô hình học, ghép bộ phận với vai trò.",
        items: [
          { id: "base", label: "Đế" },
          { id: "stand", label: "Trụ" },
          { id: "blade", label: "Cánh" },
        ],
        choices: [
          { id: "air", label: "Tương tác với không khí khi quay" },
          { id: "support", label: "Đỡ trụ" },
          { id: "connect", label: "Nối đầu quạt với đế" },
        ],
        correct: { base: "support", stand: "connect", blade: "air" },
        rationale:
          "Ghép theo chức năng đã được đề cung cấp, không theo màu hoặc kích cỡ.",
        sourceRefs: ["edu-manifest"],
      },
      choice(
        "C02-Q2",
        "Câu nào giải thích chức năng rõ hơn?",
        [
          "Đế rất đẹp và quan trọng",
          "Theo giả thiết bài, đế tạo vùng đặt và đỡ trụ",
          "Đế có màu tối nên chắc chắn bằng thép",
        ],
        "1",
        "Câu thứ hai nói rõ đối tượng và vai trò trong đúng phạm vi giả thiết. Màu render không xác nhận vật liệu.",
        ["edu-manifest"],
      ),
      choice(
        "C02-Q3",
        "Hai phần nhìn đồng tâm trên 3D. Bạn có thể khẳng định điều nào?",
        [
          "Chắc chắn dùng ren trái",
          "Chắc chắn có then",
          "Có thể mô tả vị trí nhìn thấy; cách khóa thực cần nguồn khác",
        ],
        "2",
        "Quan hệ hình học không tự mô tả liên kết vật lý, dung sai hoặc công nghệ chế tạo.",
        ["sw-intro", "edu-manifest"],
      ),
      {
        id: "C02-Q4",
        kind: "open",
        prompt:
          "Theo giả thiết mô hình giáo dục, viết một câu nêu chức năng của trụ và một điều về liên kết mà bạn chưa xác minh.",
        correct: "",
        rationale:
          "Câu trả lời cần tách vai trò được cho với chi tiết thực chưa có dữ liệu. Tự kiểm theo rubric, không có AI/chuyên gia chấm câu này.",
        rubric: [
          "Nêu trụ nối đầu quạt với đế.",
          "Nêu một điều chưa rõ như cách khóa hoặc dung sai.",
          "Không suy vật liệu hoặc kiểu ren từ ảnh.",
        ],
        sourceRefs: ["edu-manifest", "sw-intro"],
      },
    ],
    observation:
      "Chọn một phần của ghế hoặc bút. Viết một câu về vai trò quan sát được, rồi ghi nguồn/dữ kiện cần thêm để biết cách lắp. Không vận hành đồ vật đã tháo vỏ.",
    sourceRefs: ["edu-manifest", "sw-intro"],
  },
  {
    ...status,
    id: "C03",
    slug: "don-vi-va-so-do",
    title: "Một con số luôn cần đơn vị",
    deck: "Đổi mm ↔ m và trình bày số đo để người khác hiểu đúng.",
    minutes: 7,
    objectives: [
      "Đổi mm sang m và ngược lại.",
      "Ghi giá trị có đơn vị, không dùng số trần làm kích thước.",
    ],
    prerequisites: [],
    conceptIds: ["length", "unit", "measurement"],
    terms: [
      {
        term: "Đại lượng",
        meaning:
          "Thuộc tính có thể biểu diễn bằng giá trị và đơn vị, ví dụ chiều dài.",
      },
      { term: "Mét (m)", meaning: "Đơn vị SI của chiều dài." },
      { term: "Milimét (mm)", meaning: "Một phần nghìn mét: 1 mm = 0,001 m." },
    ],
    blocks: [
      {
        id: "C03-theory",
        title: "Đổi đơn vị, giữ nguyên chiều dài",
        body: [
          "Các cách ghi 350 mm và 0,35 m biểu diễn cùng một chiều dài. Khi dùng đơn vị nhỏ hơn, số lượng đơn vị tăng lên. Từ m sang mm nhân 1000; từ mm sang m chia 1000. Kiểm bằng cách ước lượng: một đoạn 350 mm phải ngắn hơn 1 m.",
          "Viết “chiều dài 350” còn thiếu thông tin. Đặt khoảng cách giữa số và ký hiệu đơn vị: 350 mm. mm khác m; ký hiệu đơn vị phân biệt chữ hoa/chữ thường, vì vậy hãy giữ ký hiệu chuẩn thay vì tự viết theo cảm tính.",
        ],
        sourceRefs: ["nist-si", "nist-writing"],
        diagram: "units",
      },
      {
        id: "C03-example",
        title: "Ví dụ — dữ liệu bài tập",
        kind: "example",
        body: [
          "Giả định một thanh dài 1,25 m. Đổi sang mm: 1,25 × 1000 = 1250 mm. Giả định một tấm dày 8 mm. Đổi sang m: 8 ÷ 1000 = 0,008 m. Giá trị nhỏ trong đơn vị m không có nghĩa tấm không có độ dày.",
          "Các số ở bài này do người biên soạn đặt để luyện đổi đơn vị, không phải kích thước của GLB quạt. Không dùng thước đo mesh minh họa làm số liệu chế tạo.",
        ],
        sourceRefs: ["nist-si", "edu-manifest"],
      },
      {
        id: "C03-design",
        title: "Trước khi dựng hoặc nhập CAD",
        kind: "design",
        body: [
          "Ghi đơn vị của dữ liệu đầu vào và kiểm một kích thước tham chiếu. Một mô hình hiển thị vừa màn hình vẫn có thể sai tỷ lệ. Khi đổi đơn vị, hãy xác nhận đại lượng được giữ nguyên và không nhầm việc thay nhãn với việc scale hình học.",
        ],
        sourceRefs: ["nist-si", "edu-manifest"],
      },
    ],
    activity: "units",
    questions: [
      numeric(
        "C03-Q1",
        "Giả định thanh dài 1,25 m. Nhập chiều dài tương đương, kèm đơn vị.",
        1250,
        "mm",
        "1 m = 1000 mm nên 1,25 m = 1250 mm. Hệ chấp nhận đơn vị chiều dài tương thích nếu giá trị tương đương.",
        ["nist-si"],
      ),
      numeric(
        "C03-Q2",
        "Giả định tấm dày 8 mm. Nhập độ dày tương đương, kèm đơn vị.",
        0.008,
        "m",
        "8 mm = 8/1000 m = 0,008 m.",
        ["nist-si"],
      ),
      choice(
        "C03-Q3",
        "Cách ghi nào đủ thông tin về chiều dài?",
        ["Chiều dài là 75", "Chiều dài là 75 mm", "Chiều dài là mm"],
        "1",
        "Một giá trị đại lượng cần số và đơn vị. Khoảng cách trước ký hiệu đơn vị giúp trình bày rõ.",
        ["nist-writing"],
      ),
      choice(
        "C03-Q4",
        "350 mm so với 1 m thì thế nào?",
        ["Dài hơn vì 350 > 1", "Bằng nhau", "Ngắn hơn vì 350 mm = 0,35 m"],
        "2",
        "Chỉ so sánh số sau khi đổi về cùng đơn vị. Đây cũng là một cách kiểm lỗi nhân/chia 1000.",
        ["nist-si"],
      ),
    ],
    observation:
      "Chọn một kích thước an toàn có thể đọc từ thước. Ghi giá trị, đơn vị và cách đo; chuyển sang đơn vị khác. Không ghi kết quả chính xác hơn mức bạn thực sự đọc được.",
    sourceRefs: ["nist-si", "nist-writing"],
  },
  {
    ...status,
    id: "C04",
    slug: "chieu-dai-ban-kinh-duong-kinh",
    title: "Đọc hình dạng bằng kích thước",
    deck: "Chiều dài, độ dày, bán kính và đường kính không thể dùng thay nhau.",
    minutes: 8,
    objectives: [
      "Nhận diện tâm, bán kính và đường kính trên hình đã cho.",
      "Tính d = 2r và phân biệt chiều dài với độ dày theo hướng đo.",
    ],
    prerequisites: ["C03"],
    conceptIds: ["radius", "diameter", "dimension"],
    terms: [
      {
        term: "Bán kính r",
        meaning: "Độ dài từ tâm đến một điểm trên đường tròn.",
      },
      {
        term: "Đường kính d",
        meaning: "Độ dài đoạn qua tâm, hai đầu nằm trên đường tròn; d = 2r.",
      },
      {
        term: "Độ dày",
        meaning: "Kích thước theo hướng được chỉ rõ giữa hai bề mặt trong bài.",
      },
      {
        term: "Hướng đo",
        meaning:
          "Phương xác định hai vị trí hoặc bề mặt mà kích thước liên hệ.",
      },
    ],
    blocks: [
      {
        id: "C04-theory",
        title: "Đầu mút và hướng đo quyết định ý nghĩa",
        body: [
          "Bán kính đi từ tâm đến đường tròn. Đường kính đi xuyên tâm, nối hai phía của đường tròn nên dài gấp đôi bán kính. Một đoạn không đi qua tâm không được gọi là đường kính chỉ vì nối hai điểm trên đường tròn.",
          "Với tấm hình hộp trong bài, chiều dài và độ dày là hai kích thước theo hai hướng đã đánh dấu. Nếu đổi góc nhìn, tên không tự đổi theo cạnh nào đang trông dài hơn trên màn hình. Hãy đọc nhãn và hướng đo trước khi tính.",
        ],
        sourceRefs: ["os-circle"],
        diagram: "geometry",
      },
      {
        id: "C04-example",
        title: "Ví dụ — đĩa tròn giả định",
        kind: "example",
        body: [
          "Giả định đĩa có bán kính 15 mm và độ dày 4 mm. Đường kính là 2 × 15 = 30 mm. Độ dày vẫn là 4 mm: quan hệ d = 2r không áp dụng cho mọi kích thước của vật.",
          "Hình tự dựng ở bài chỉ minh họa các đại lượng. Nó không có dung sai hay vật liệu được xác minh, và không phải bản vẽ để gia công.",
        ],
        sourceRefs: ["os-circle"],
      },
      {
        id: "C04-design",
        title: "Liên hệ sketch",
        kind: "design",
        body: [
          "Trước khi nhập một giá trị cho hình tròn trong CAD, kiểm ô đang yêu cầu radius hay diameter. Nhập nhầm 15 mm vào ô đường kính khi đề cho bán kính 15 mm làm kích thước hình học sai một hệ số 2.",
        ],
        sourceRefs: ["os-circle"],
      },
    ],
    activity: "geometry",
    questions: [
      numeric(
        "C04-Q1",
        "Giả định r = 15 mm. Nhập đường kính, kèm đơn vị.",
        30,
        "mm",
        "d = 2r = 2 × 15 = 30 mm.",
        ["os-circle"],
      ),
      numeric(
        "C04-Q2",
        "Giả định d = 42 mm. Nhập bán kính, kèm đơn vị.",
        21,
        "mm",
        "r = d/2 = 21 mm.",
        ["os-circle"],
      ),
      choice(
        "C04-Q3",
        "Đoạn nào là đường kính?",
        [
          "Từ tâm đến đường tròn",
          "Nối hai điểm trên đường tròn và đi qua tâm",
          "Bất kỳ đoạn nối hai điểm nào trong hình",
        ],
        "1",
        "Đường kính cần hai đầu trên đường tròn và đi qua tâm. Đoạn từ tâm đến biên là bán kính.",
        ["os-circle"],
      ),
      choice(
        "C04-Q4",
        "Tấm giả định được ghi dài 80 mm theo X, dày 4 mm theo Z. Xoay góc nhìn có làm độ dày thành 80 mm không?",
        [
          "Có, cạnh thấy dài nhất luôn là độ dày",
          "Không, ý nghĩa theo hướng đo đã cho",
          "Không thể dùng đơn vị mm cho độ dày",
        ],
        "1",
        "Phải giữ quan hệ kích thước với hướng đo. Việc xoay camera chỉ đổi cách quan sát.",
        ["os-circle", "os-axes"],
      ),
    ],
    observation:
      "Vẽ một hình tròn, đánh dấu tâm, một bán kính và một đường kính. Ghi đơn vị giả định và kiểm hai đoạn có đúng quan hệ gấp đôi không.",
    sourceRefs: ["os-circle", "os-axes"],
  },
  {
    ...status,
    id: "C05",
    slug: "mat-truc-va-hinh-khoi",
    title: "Định hướng trong không gian",
    deck: "Ba trục, các mặt phẳng và một cách mô tả vị trí rõ ràng.",
    minutes: 8,
    objectives: [
      "Đọc tọa độ (x,y,z) theo hệ đã cho.",
      "Nhận diện mặt phẳng xy và khối hộp/trụ trong ví dụ.",
    ],
    prerequisites: [],
    conceptIds: ["axis", "plane", "solid"],
    terms: [
      { term: "Gốc tọa độ O", meaning: "Điểm (0,0,0), nơi các trục gặp nhau." },
      { term: "Trục X, Y, Z", meaning: "Ba hướng của hệ trực giao đang dùng." },
      { term: "Mặt phẳng xy", meaning: "Mặt phẳng chứa X và Y, có z = 0." },
      {
        term: "Khối trụ",
        meaning: "Khối hình học lý tưởng có hai đáy tròn song song trong bài.",
      },
    ],
    blocks: [
      {
        id: "C05-theory",
        title: "Hãy nêu hệ trục trước khi nói hướng",
        body: [
          "Trong hệ trực giao ba chiều, các trục vuông góc nhau và vị trí được ghi theo thứ tự (x,y,z). Điểm (20,10,0) có hoành độ 20, tung độ 10 và tọa độ Z bằng 0, nên nằm trên mặt phẳng xy của hệ đã cho. Đơn vị của các tọa độ phải được nêu cùng hình.",
          "Tên “trên”, “trước”, “bên phải” cần một quy ước quan sát. Không phải mọi phần mềm đều hiển thị cùng trục hướng lên. Bài này dùng sơ đồ có nhãn X,Y,Z; viewer quạt hiện có Y hướng lên. Đọc nhãn thay vì nhớ màu hoặc vị trí trên màn hình.",
        ],
        sourceRefs: ["os-axes", "edu-manifest"],
        diagram: "coordinates",
      },
      {
        id: "C05-example",
        title: "Ví dụ — một tấm hộp giả định",
        kind: "example",
        body: [
          "Cho tấm hộp theo X dài 60 mm, theo Y rộng 30 mm, theo Z dày 5 mm. Nhìn theo hướng Z vào mặt xy, bạn thấy hình chữ nhật 60 × 30 mm trong phép chiếu trực giao lý tưởng. Độ dày 5 mm cần một hướng nhìn khác để thể hiện rõ.",
          "Một trục trong bài có thể được giản lược thành khối trụ để học. Điều đó không chứng minh trục thực không có bậc, rãnh, lỗ hoặc dung sai.",
        ],
        sourceRefs: ["os-axes"],
      },
      {
        id: "C05-design",
        title: "Chuẩn bị cho bản vẽ và sketch",
        kind: "design",
        body: [
          "Chọn một mặt phẳng làm nơi đặt sketch và diễn đạt rõ hai hướng trong mặt đó. Bước đầu là thống nhất cách đặt tên; bài hình chiếu sau sẽ thêm quy ước vị trí các hình. Không suy dữ liệu bị che chỉ từ một góc nhìn.",
        ],
        sourceRefs: ["os-axes", "sw-intro"],
      },
    ],
    activity: "coordinates",
    questions: [
      choice(
        "C05-Q1",
        "Trong hệ đang xét, điểm (20,10,0) mm nằm trên mặt phẳng nào?",
        ["xy", "xz với y = 0", "yz với x = 0"],
        "0",
        "Tọa độ z = 0 nên điểm thuộc mặt phẳng xy; x và y ở đây khác 0.",
        ["os-axes"],
      ),
      choice(
        "C05-Q2",
        "Ba trục của hệ tọa độ trực giao ba chiều có quan hệ nào?",
        [
          "Luôn song song nhau",
          "Vuông góc từng đôi",
          "Chỉ có hai trục cần đặt tên",
        ],
        "1",
        "Hệ trực giao dùng ba trục vuông góc từng đôi.",
        ["os-axes"],
      ),
      choice(
        "C05-Q3",
        "Tấm giả định dài X=60, rộng Y=30, dày Z=5 mm. Nhìn vuông góc vào mặt xy thấy kích thước nào?",
        ["60 × 30 mm", "60 × 5 mm", "30 × 5 mm"],
        "0",
        "Mặt xy chứa các hướng X,Y. Hướng Z là hướng nhìn nên chiều dày không hiện thành cạnh của mặt này.",
        ["os-axes"],
      ),
      {
        id: "C05-Q4",
        kind: "multi",
        prompt: "Chọn các mô tả đủ ngữ cảnh để trao đổi hình học.",
        choices: [
          {
            id: "unit",
            label: "Điểm A có tọa độ (20,10,0) mm trong hệ đã chỉ rõ",
          },
          {
            id: "screen",
            label: "Đi lên theo màn hình luôn là +Z trong mọi app",
          },
          {
            id: "axis",
            label: "Chiều dày 5 mm được đo theo Z của hệ đang xét",
          },
        ],
        correct: ["unit", "axis"],
        rationale:
          "Cần hệ tọa độ, hướng và đơn vị. Hướng hiển thị trên màn hình không phải quy ước chung cho mọi phần mềm.",
        sourceRefs: ["os-axes", "edu-manifest"],
      },
    ],
    observation:
      "Vẽ một hộp có ba mũi tên X,Y,Z. Ghi đơn vị và đặt một điểm trên mặt xy. Mô tả lại vị trí mà không dùng các từ “bên này/bên kia”.",
    sourceRefs: ["os-axes", "sw-intro", "edu-manifest"],
  },
];
