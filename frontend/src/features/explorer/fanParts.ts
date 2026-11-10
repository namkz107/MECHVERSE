export type Vec3 = [number, number, number];
export type Part = {
  id: string;
  name: string;
  english: string;
  group: string;
  description: string;
  relation: string;
  position: Vec3;
  offset: Vec3;
  color: string;
};
export const parts: Part[] = [
  {
    id: "front-guard",
    name: "Lồng trước",
    english: "Front guard",
    group: "head",
    description:
      "Lớp bao phía trước cánh trong mô hình. Các nan cho phép quan sát phần bên trong.",
    relation: "Nằm phía trước cánh quạt và đối diện lồng sau.",
    position: [0, 1.15, 0.62],
    offset: [0, 0, 2.3],
    color: "#8a9ca4",
  },
  {
    id: "cap",
    name: "Núm giữ cánh",
    english: "Blade cap",
    group: "head",
    description:
      "Chi tiết minh họa tại tâm cánh, giúp nhận biết vị trí liên kết trong cụm.",
    relation: "Đặt trước tâm cánh. Ren và cách khóa thực tế chưa được dựng.",
    position: [0, 1.15, 0.44],
    offset: [0, 0, 1.8],
    color: "#d3ad76",
  },
  {
    id: "blade",
    name: "Cánh quạt",
    english: "Fan blade",
    group: "head",
    description:
      "Trong mô hình này, ba lá cánh liền với tâm được coi là một chi tiết. Khi quay, các lá cánh tương tác với không khí.",
    relation:
      "Nằm giữa hai lồng bảo vệ; tâm cánh cùng trục quay với trục minh họa.",
    position: [0, 1.15, 0.23],
    offset: [0, 0, 1.2],
    color: "#328f89",
  },
  {
    id: "rear-guard",
    name: "Lồng sau",
    english: "Rear guard",
    group: "head",
    description:
      "Lớp bao ở phía sau cánh. Hai nửa lồng giúp nhìn ranh giới ngoài–trong của cụm đầu quạt.",
    relation: "Nằm giữa cánh và vỏ động cơ trong bố cục minh họa.",
    position: [0, 1.15, -0.14],
    offset: [0, 0, -0.65],
    color: "#8a9ca4",
  },
  {
    id: "shaft",
    name: "Trục minh họa",
    english: "Illustrative shaft",
    group: "head",
    description:
      "Thanh nằm dọc tâm cánh, minh họa một trục quay. Không thể suy ra kích thước hay lắp ghép thực từ hình này.",
    relation:
      "Đi qua tâm cánh và hướng về vỏ động cơ. Liên kết bên trong chưa được dựng.",
    position: [0, 1.15, -0.05],
    offset: [0, 0, -0.1],
    color: "#9aaab4",
  },
  {
    id: "motor",
    name: "Vỏ động cơ",
    english: "Motor housing",
    group: "head",
    description:
      "Phần vỏ phía sau đầu quạt. Mô hình chỉ thể hiện hình dáng ngoài, không thể hiện cấu tạo điện bên trong.",
    relation: "Nằm sau lồng sau và được đỡ bởi trụ.",
    position: [0, 1.15, -0.57],
    offset: [0, 0, -1.4],
    color: "#344954",
  },
  {
    id: "stand",
    name: "Trụ đỡ",
    english: "Support column",
    group: "support",
    description: "Phần đứng nối vùng đầu quạt với đế trong mô hình.",
    relation:
      "Nối cụm đầu quạt với đế; cơ cấu thay đổi chiều cao chưa được dựng.",
    position: [0, -0.55, -0.48],
    offset: [0, 0, 0],
    color: "#526974",
  },
  {
    id: "base",
    name: "Đế quạt",
    english: "Base",
    group: "support",
    description: "Phần dưới cùng, tạo vùng đặt mô hình trên mặt phẳng.",
    relation:
      "Đỡ trụ và phần đầu quạt. Khối lượng và độ ổn định thực chưa được xác minh.",
    position: [0, -1.65, -0.35],
    offset: [0, -0.25, 0],
    color: "#344954",
  },
];
