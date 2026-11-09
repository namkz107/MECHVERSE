import type { Source } from "../types";
export const foundationSources: Source[] = [
  {
    id: "sw-intro",
    title: "Introducing SOLIDWORKS — Concepts, Assemblies, Mates",
    publisher: "Dassault Systèmes SolidWorks",
    author: "Dassault Systèmes SolidWorks Corporation",
    url: "https://files.solidworks.com/pdf/introsw.pdf",
    locator:
      "Trang in 11–12: Concepts / Component Based; trang 54: Assembly Definition; trang 57: Mates.",
    version: "SOLIDWORKS 2015 (Legal Notices trang 6)",
    checkedAt: "2026-11-09",
    scope:
      "Quan hệ part–assembly–subassembly và quan hệ hình học trong mô hình CAD, không xác nhận cấu tạo quạt thực.",
    usage:
      "Bảo lưu quyền; chỉ liên kết tham khảo. Không chép PDF, hình, ví dụ hoặc thao tác giao diện bản mới. https://www.solidworks.com/terms-use",
    sourceStatus: "source-checked",
  },
  {
    id: "edu-manifest",
    title: "EDU-FAN-01 — manifest của mô hình giáo dục",
    publisher: "MECHVERSE",
    author: "Mã nguồn dự án",
    url: "/models/fan-edu-v1.manifest.json",
    locator:
      "revision 1; occurrences và limitations; generator frontend/scripts/build-fan.ts.",
    version: "EDU-FAN-01 / revision 1",
    checkedAt: "2026-11-09",
    scope:
      "Định danh và bố cục minh họa của 8 occurrence. Không phải BOM hãng hoặc chứng cứ nội thất.",
    usage:
      "Dữ liệu do dự án tự dựng; không có asset hãng trong GLB. Không gán quyền kỹ thuật/nhãn hiệu của bên thứ ba.",
    sourceStatus: "source-checked",
  },
  {
    id: "nist-si",
    title: "NIST Guide to SI — SI Prefixes và viết giá trị đại lượng",
    publisher: "NIST",
    author: "Ambler Thompson, Barry N. Taylor / NIST",
    url: "https://www.nist.gov/pml/special-publication-811/nist-guide-si-chapter-4-two-classes-si-units-and-si-prefixes",
    locator:
      "§4.3, Table 5: milli = 10⁻³; §4.2.2 Table 4: moment of force dùng N·m.",
    version: "SP 811 (2008), bảng tiền tố trên bản web hiện tại",
    checkedAt: "2026-11-09",
    scope:
      "Đổi đơn vị và ký hiệu đại lượng; không dùng định nghĩa SI cũ của một số đại lượng trong SP811.",
    usage:
      "Dùng quan hệ số học, không sao chép bảng. Quyền theo từng tài liệu: https://www.nist.gov/open/license",
    sourceStatus: "source-checked",
  },
  {
    id: "nist-writing",
    title: "NIST Guide to SI — Expressing Values of Quantities",
    publisher: "NIST",
    author: "Ambler Thompson, Barry N. Taylor / NIST",
    url: "https://www.nist.gov/pml/special-publication-811/nist-guide-si-chapter-7-rules-and-style-conventions-expressing-values",
    locator:
      "§7.1: value of a quantity; §7.2: space between numerical value and unit symbol.",
    version: "SP 811, bản web",
    checkedAt: "2026-11-09",
    scope:
      "Số đo gồm giá trị và đơn vị; khoảng cách trước ký hiệu đơn vị thông thường.",
    usage:
      "Liên kết tham khảo và diễn giải gốc; không copy bảng/hình. Xem NIST open/license.",
    sourceStatus: "source-checked",
  },
  {
    id: "os-circle",
    title: "Prealgebra 2e — Properties of Circles",
    publisher: "OpenStax / Rice University",
    author: "Lynn Marecek, MaryAnne Anthony-Smith, Andrea Honeycutt Mathis",
    url: "https://openstax.org/books/prealgebra-2e/pages/9-5-solve-geometry-applications-circles-and-irregular-figures",
    locator:
      "§9.5, Properties of Circles: r, d, d = 2r; không dùng bài ví dụ của sách.",
    version: "Prealgebra 2e, 2020, bản web hiện tại",
    checkedAt: "2026-11-09",
    scope:
      "Quan hệ hình học giữa tâm, bán kính và đường kính. Ví dụ và SVG trong app tự soạn.",
    usage:
      "Nguồn hiện ghi CC BY-NC-SA 4.0, có hạn chế dùng trong dịch vụ AI. Chỉ liên kết và đối chiếu quan hệ toán học; không lưu sách thành corpus, chép lời văn/hình/bài tập. Xem Preface và footer nguồn; cần kiểm lại quyền trước thương mại hóa.",
    sourceStatus: "source-checked",
  },
  {
    id: "os-axes",
    title: "Calculus Volume 3 — Three-Dimensional Coordinate Systems",
    publisher: "OpenStax / Rice University",
    author: "Gilbert Strang, Edwin “Jed” Herman",
    url: "https://openstax.org/books/calculus-volume-3/pages/2-2-vectors-in-three-dimensions",
    locator:
      "§2.2: Three-Dimensional Coordinate Systems; tọa độ (x,y,z), mặt phẳng xy/xz/yz.",
    version: "Calculus Volume 3, 2016, bản web hiện tại",
    checkedAt: "2026-11-09",
    scope:
      "Hệ tọa độ trực giao và đọc vị trí; không suy hướng trục của mọi phần mềm CAD.",
    usage:
      "Bản hiện tại ghi CC BY-NC-SA 4.0 và hạn chế AI; chỉ tham khảo quan hệ toán học. Nội dung, số liệu và SVG tự biên soạn, không tái sử dụng art hoặc bài sách. Access for free at https://openstax.org/books/calculus-volume-3/pages/1-introduction",
    sourceStatus: "source-checked",
  },
];
