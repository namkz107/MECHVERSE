import type { Asset, Occurrence, Vec3 } from "./assetTypes";
type MakePart = (
  id: string,
  name: string,
  group: string,
  position: Vec3,
  offset: Vec3,
  description: string,
  connection?: Occurrence["connection"],
  parentId?: string,
) => Occurrence;
export function workbench(make: MakePart): Asset {
  const occurrences: Occurrence[] = [
    make(
      "welded-frame",
      "Khung ống hàn",
      "frame",
      [0, 0, 0],
      [0, 0, 0],
      "Bốn chân ống rỗng 40×40 mm, giằng ngang và giằng chéo phía sau. Các thanh nối cố định, không tách rời khi explode.",
    ),
    make(
      "top",
      "Mặt bàn ghép",
      "surface",
      [0, 0.88, 0],
      [0, 0.26, 0],
      "Mặt dày 40 mm giả định, có tám lỗ xuyên và hốc đầu bu lông. Vân gỗ chỉ là diễn họa; chưa quy định cấp gỗ hay tải.",
      "removable",
    ),
    make(
      "lower-tray",
      "Khay dưới",
      "surface",
      [0, 0.252, 0],
      [0, 0.08, 0.42],
      "Tấm gấp có thành 30 mm, tựa trên các giằng dưới. Nhấc khỏi khung trong giả thiết của mẫu.",
      "removable",
    ),
    make(
      "mount-tabs",
      "Tai đỡ mặt bàn",
      "frame",
      [0, 0, 0],
      [0, 0, 0],
      "Tám tai có lỗ, hàn vào giằng trên và tựa dưới mặt. Cụm bu lông đi qua lỗ tương ứng.",
    ),
  ];
  for (let i = 0; i < 8; i++) {
    const x = [-0.56, -0.2, 0.2, 0.56][i % 4],
      z = i < 4 ? -0.2 : 0.2;
    occurrences.push({
      ...make(
        `top-fastener-${i}`,
        `Bu lông mặt bàn ${i + 1}`,
        "fixings",
        [x, 0.896, z],
        [0, 0.42, 0],
        "Cụm bu lông, vòng đệm và đai ốc minh họa tại tai đỡ. Có hốc đầu trên mặt bàn; ren nhỏ không dựng.",
        "removable",
      ),
      definitionId: "top-fastener",
    });
  }
  for (let i = 0; i < 4; i++)
    occurrences.push({
      ...make(
        `foot-${i}`,
        `Chân tăng chỉnh ${i + 1}`,
        "feet",
        [i % 2 ? 0.66 : -0.66, 0, i < 2 ? -0.26 : 0.26],
        [0, -0.055, 0],
        "Đệm tròn, thân vít và đai ốc khóa minh họa. Chưa có bài kiểm tải hoặc phạm vi điều chỉnh nên không có animation điều chỉnh.",
        "removable",
      ),
      definitionId: "adjustable-foot",
    });
  return {
    id: "workbench",
    code: "MV-WB01",
    title: "Bàn cơ khí",
    category: "Workbench",
    revision: 1,
    sourceKind: "original-design",
    url: "/models/workbench-r1.glb",
    description:
      "Đọc đường truyền lực từ mặt bàn qua tai đỡ, khung hàn và bốn chân. So sánh phần cố định với liên kết tháo được.",
    dimensions: "1 500 × 700 × 900 mm · danh nghĩa giả định",
    limitations: [
      "Thiết kế minh họa MECHVERSE, chưa chế tạo/duyệt kỹ thuật.",
      "Không có tải cho phép, cấp vật liệu hoặc chỉ dẫn hàn đã xác minh.",
      "Khung hàn giữ nguyên; explode không là hướng dẫn tháo từng thanh.",
    ],
    occurrences,
    groups: [
      { id: "frame", name: "Khung hàn và điểm tựa" },
      { id: "surface", name: "Mặt và khay tháo được" },
      { id: "fixings", name: "Liên kết mặt bàn" },
      { id: "feet", name: "Chân và vùng tiếp xúc" },
    ],
    camera: {
      position: [2, 1.65, 2.5],
      target: [0, 0.47, 0],
      distance: 3.25,
      fitRadius: 0.99,
    },
    floor: 0,
    capabilities: { explode: true, rotation: false, joints: false },
  };
}
