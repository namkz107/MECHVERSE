import type { Asset, Occurrence, Vec3 } from "./assetTypes";
import { parts } from "./fanParts";

const component = (
  id: string,
  name: string,
  position: Vec3,
  offset: Vec3,
  description: string,
): Occurrence => ({
  id,
  name,
  english: id,
  definitionId: id,
  group: "internals",
  position,
  offset,
  description,
  relation:
    "Bố trí minh họa do MECHVERSE tự dựng; chưa đối chiếu bản vẽ của một mẫu quạt thương mại. Không dùng để chế tạo hoặc suy ra thứ tự tháo.",
  connection: "removable",
  color: "#b5b9bc",
});

// Keep the eight teaching IDs and the original EDU asset intact for the F01 lesson.
// The product explorer uses an independent, richer study assembly.
export const fanStudy: Asset = {
  id: "fan",
  code: "MV-FN02",
  title: "Quạt bàn · nghiên cứu cấu tạo",
  category: "Quạt",
  revision: 2,
  sourceKind: "original-design",
  url: "/models/fan-study-r2.glb",
  description:
    "19 bộ phận và cụm minh họa: vỏ thông gió, cánh cong, trục, ổ đỡ, stator, rotor và cơ cấu đảo gió. Tách cụm để nhìn cấu tạo phía trong.",
  dimensions: "Tỷ lệ minh họa · chưa xác minh kích thước chế tạo",
  limitations: [
    "Thiết kế nghiên cứu do MECHVERSE tự dựng, không phải bản sao sản phẩm hãng hoặc CAD đã duyệt.",
    "Hình học, cuộn dây và cơ cấu đảo gió thể hiện quan hệ không gian; chưa xác minh thiết kế điện, ăn khớp, dung sai hoặc tải.",
    "Màu vật liệu chỉ thể hiện ngoại hình. Explode là bố cục quan sát, không phải hướng dẫn sửa chữa.",
    "F01 tiếp tục dùng asset EDU-FAN-01 và tám ID cũ; tiến độ học không đổi.",
  ],
  occurrences: [
    ...parts.map((p): Occurrence => ({
      ...p,
      definitionId: p.id,
      connection: "removable",
      name: p.id === "motor" ? "Nửa vỏ trước động cơ" : p.name,
      description:
        p.id === "blade"
          ? "Ba cánh có bề mặt cong và thay đổi góc nghiêng theo bán kính; cùng nối vào một bầu cánh. Biên dạng tự dựng, chưa kiểm khí động học."
          : p.id === "motor"
            ? "Nửa vỏ nhựa trước, có khe thông gió xuyên và gờ ghép vỏ. Tách khỏi phần điện cơ để nhìn bên trong."
            : p.id === "stand"
              ? "Trụ, khớp nghiêng và hai má đỡ đầu quạt. Khớp chưa mô phỏng chuyển động."
              : p.description,
      relation:
        "Thuộc thiết kế nghiên cứu MV-FN02; cấu tạo và vật liệu chưa được duyệt kỹ thuật.",
      offset:
        p.id === "motor"
          ? [-1.05, 2.65, 0.17]
          : p.id === "front-guard"
            ? [2.2, 0.2, -0.42]
            : p.id === "rear-guard"
              ? [-2.2, 0.2, 0.34]
              : p.id === "blade"
                ? [0, 1.75, 0.17]
                : p.id === "cap"
                  ? [0, 2.25, 0.46]
                  : p.id === "stand" || p.id === "base"
                    ? [0, 0, 0]
                    : p.offset,
    })),
    component(
      "rear-cover",
      "Nửa vỏ sau thông gió",
      [0, 1.15, -0.78],
      [1.05, 2.65, 0.38],
      "Vỏ có các khe thông gió xuyên bề mặt và vành ghép; không dùng vệt màu đen để giả lỗ.",
    ),
    component(
      "stator",
      "Lõi stator minh họa",
      [0, 1.15, -0.55],
      [0, 0.65, 0.05],
      "Lõi dạng vành, các rãnh và đường phân lớp bề mặt; kích thước và số rãnh chỉ là giả thiết hình học.",
    ),
    component(
      "windings",
      "Cụm cuộn dây minh họa",
      [0, 1.15, -0.55],
      [0, 0.65, 0.55],
      "Các vòng dây màu đồng đi qua vùng rãnh và nhô ở hai đầu lõi. Không mô phỏng sơ đồ quấn hoặc đặc tính điện.",
    ),
    component(
      "rotor",
      "Rotor minh họa",
      [0, 1.15, -0.55],
      [0, 0.05, 0.05],
      "Khối rotor có rãnh nghiêng, nằm trong lỗ stator và đồng trục với trục minh họa. Không mô phỏng điện từ.",
    ),
    component(
      "front-bearing",
      "Gối đỡ phía trước",
      [0, 1.15, -0.29],
      [-0.8, 0.35, 0.29],
      "Vành đỡ với lỗ trục và ba tai liên kết, kèm vòng đỡ tại tâm; chưa xác định loại ổ hoặc dung sai.",
    ),
    component(
      "rear-bearing",
      "Gối đỡ phía sau",
      [0, 1.15, -0.8],
      [0.8, 0.35, 0.3],
      "Vành đỡ phía sau với lỗ trục đồng tâm; hình học chỉ dùng để quan sát quan hệ lắp.",
    ),
    component(
      "gear-case",
      "Vỏ hộp đảo gió minh họa",
      [0, 0.88, -0.78],
      [0, -0.38, 0.08],
      "Khay vỏ hộp và các trụ đỡ, để hở phía trên cho quan sát. Chưa có thiết kế truyền động đã kiểm.",
    ),
    component(
      "gear-cover",
      "Nắp hộp đảo gió",
      [0, 0.97, -0.78],
      [0.85, -0.27, 0.08],
      "Nắp có gờ lắp, lỗ trụ và vít; tách riêng với khay vỏ.",
    ),
    component(
      "gear-wheel",
      "Bánh răng minh họa",
      [0, 0.91, -0.83],
      [0, -0.06, 0],
      "Bánh răng có lỗ tâm và răng hình học đơn giản. Chưa dùng biên dạng thân khai hoặc xác minh ăn khớp; không chạy như mô phỏng cơ cấu.",
    ),
    component(
      "motor-fasteners",
      "Bộ vít liên kết động cơ",
      [0, 1.15, -0.55],
      [-1.1, 1.65, 0.05],
      "Ba vít xuyên các tai liên kết, có đầu và rãnh vít; ren chi tiết được lược bỏ.",
    ),
    component(
      "power-cord",
      "Dây và phích minh họa",
      [0, -1.55, -0.48],
      [0, 0, 0],
      "Dây mềm và phích gắn phía sau đế; không đại diện thông số hoặc chuẩn an toàn điện.",
    ),
  ],
  groups: [
    { id: "head", name: "Cụm đầu quạt" },
    { id: "internals", name: "Bên trong động cơ · minh họa" },
    { id: "support", name: "Giá đỡ và đế" },
  ],
  camera: {
    position: [4.1, 2.1, 7.8],
    target: [0, 0.3, -0.1],
    distance: 8.8,
    fitRadius: 2.1,
  },
  floor: -1.77,
  capabilities: { explode: true, rotation: true, joints: false },
};
