import { parts } from "./fanParts";
import { workbench } from "./workbench";
import type { Asset, Occurrence, Vec3 } from "./assetTypes";
export const part = (
  id: string,
  name: string,
  group: string,
  position: Vec3,
  offset: Vec3,
  description: string,
  connection: Occurrence["connection"] = "fixed",
  parentId?: string,
): Occurrence => ({
  id,
  name,
  english: id,
  definitionId: id.replace(/-(left|right|\d+)$/, ""),
  group,
  position,
  offset,
  description,
  connection,
  parentId,
  relation:
    connection === "fixed"
      ? "Thuộc kết cấu cố định trong thiết kế minh họa; không tách thành hướng dẫn tháo."
      : "Liên kết được minh họa để đọc quan hệ lắp; exploded không phải quy trình tháo đã xác minh.",
  color: "#657573",
});
const lockerParts: Occurrence[] = [
  part(
    "shell",
    "Vỏ tấm gấp",
    "shell",
    [0, 0, 0],
    [0, 0, 0],
    "Hai thành, lưng, nóc và đáy có chiều dày 1,5 mm giả định, mép hồi 18 mm. Các tấm liên kết cố định thành vỏ.",
  ),
  part(
    "divider",
    "Vách ngăn cố định",
    "shell",
    [0, 0.91, 0],
    [0, 0, 0],
    "Chia hai khoang, mép gấp tựa vào thành. Không chuyển động khi mở cửa.",
  ),
  part(
    "shelf",
    "Khay ngăn trên",
    "interior",
    [0, 1.48, 0],
    [0, 0.12, 0.48],
    "Khay tấm gấp đặt trên bốn tai đỡ; có thể nhấc ra trong giả thiết của thiết kế.",
    "removable",
  ),
  part(
    "shelf-supports",
    "Tai đỡ khay",
    "shell",
    [0, 1.466, 0],
    [0, 0, 0],
    "Bốn tai cố định vào vỏ, tạo vùng tựa dưới khay.",
  ),
  part(
    "plinth",
    "Bệ chân",
    "shell",
    [0, 0.04, 0],
    [0, 0, 0],
    "Bệ cao 80 mm, chân có đệm; không có tải cho phép đã kiểm.",
  ),
  part(
    "plinth-cover",
    "Nắp bệ phía trước",
    "interior",
    [0, 0.045, 0.226],
    [0, 0, 0.28],
    "Nắp che phía trước bệ, hai vít giữ ở hai đầu.",
    "removable",
  ),
];
for (const [label, y] of [
  ["upper", 1.31],
  ["lower", 0.495],
] as const) {
  const title = label === "upper" ? "trên" : "dưới",
    id = `${label}-door`;
  lockerParts.push(
    {
      ...part(
        id,
        `Cửa ${title}`,
        label,
        [-0.231, y, 0.234],
        [label === "upper" ? -0.15 : 0.15, 0, 0.48],
        "Tấm cửa có mép hồi, khe thoáng xuyên và lỗ khóa. Bản lề bên trái; mở ra ngoài quanh trục đứng, giới hạn minh họa 105°.",
        "hinge",
      ),
      joint: { axis: [0, -1, 0], limits: [0, 105] },
    },
    part(
      `${label}-handle`,
      `Tay nắm cửa ${title}`,
      label,
      [0.399, 0, 0.021],
      [0, 0, 0.06],
      "Tay nắm cầu, hai chân bắt vào mặt cửa. Đi cùng cửa khi mở.",
      "removable",
      id,
    ),
    part(
      `${label}-lock`,
      `Khóa và cam cửa ${title}`,
      label,
      [0.397, -0.09, 0],
      [0, 0, 0.045],
      "Trụ khóa xuyên lỗ cửa; cam minh họa ở tư thế đã nhả để mở cửa. Không mô phỏng thao tác khóa/chìa hoặc cấp bảo mật.",
      "removable",
      id,
    ),
    part(
      `${label}-label`,
      `Ô nhãn cửa ${title}`,
      label,
      [0.229, 0.255, 0.004],
      [0, 0, 0.02],
      "Khung nhãn nhỏ giữ tấm ghi tên ở phía trên cửa.",
      "removable",
      id,
    ),
  );
  for (let n = 0; n < 2; n++) {
    const hy = n === 0 ? -0.275 : 0.275;
    lockerParts.push(
      part(
        `${label}-hinge-${n}`,
        `Lá bản lề ${title} ${n + 1}`,
        label,
        [-0.231, y + hy, 0.234],
        [0, 0, 0],
        "Lá cố định và hai ống khớp ngoài gắn vào vỏ; tâm ống nằm đúng trục quay cửa.",
      ),
      part(
        `${label}-moving-hinge-${n}`,
        `Khớp cửa ${title} ${n + 1}`,
        label,
        [0, hy, 0],
        [0, 0, 0],
        "Ống khớp giữa cùng lá cửa quay quanh chốt đứng, không quay quanh tâm cánh cửa.",
        "hinge",
        id,
      ),
      part(
        `${label}-pin-${n}`,
        `Chốt bản lề ${title} ${n + 1}`,
        label,
        [-0.231, y + hy, 0.234],
        [0, 0.09, 0],
        "Chốt xuyên các ống khớp đồng trục. En explode chỉ minh họa vị trí chốt được rút.",
        "removable",
      ),
    );
  }
  for (let n = 0; n < 2; n++)
    lockerParts.push(
      part(
        `${label}-handle-screw-${n}`,
        `Vít tay nắm ${title} ${n + 1}`,
        label,
        [0.399, n === 0 ? -0.048 : 0.048, -0.004],
        [0, 0, -0.035],
        "Vít tại chân tay nắm; thân đi qua lỗ cửa, đầu nằm phía trong. Ren nhỏ được lược bỏ.",
        "removable",
        id,
      ),
    );
}
export const assets: Asset[] = [
  {
    id: "fan",
    code: "EDU-FAN-01",
    title: "Quạt giáo dục",
    category: "Quạt",
    revision: 1,
    sourceKind: "educational-demo",
    url: "/models/fan-edu-v1.glb",
    description: "Tám bộ phận để quan sát cấu tạo và chuyển động quay.",
    dimensions: "Tỷ lệ minh họa · kích thước chưa xác minh",
    limitations: [
      "Demo giản lược, không phải sản phẩm hãng.",
      "Không có nội thất động cơ hoặc thông số chế tạo.",
    ],
    occurrences: parts.map((p) => ({
      ...p,
      definitionId: p.id,
      connection: "removable",
    })),
    groups: [
      { id: "head", name: "Cụm đầu quạt" },
      { id: "support", name: "Giá đỡ" },
    ],
    camera: { position: [4.4, 2.2, 7.2], target: [0, 0.25, 0], distance: 8.5 },
    floor: -1.77,
    capabilities: { explode: true, rotation: true, joints: false },
  },
  {
    id: "locker",
    code: "MV-LK02",
    title: "Locker hai ngăn",
    category: "Locker",
    revision: 1,
    sourceKind: "original-design",
    url: "/models/locker-r1.glb",
    description:
      "Tấm gấp, bản lề và khoảng trống. Mở từng cánh để đọc kết cấu phía sau.",
    dimensions: "Vỏ 500 × 450 × 1 800 mm · giả định",
    limitations: [
      "Thiết kế minh họa của MECHVERSE, chưa chế tạo/duyệt kỹ thuật.",
      "Cấp vật liệu, dung sai, tải và độ bền liên kết chưa xác minh.",
      "Explode trình bày các cụm; không phải thứ tự tháo lắp.",
    ],
    occurrences: lockerParts,
    groups: [
      { id: "shell", name: "Vỏ và kết cấu cố định" },
      { id: "upper", name: "Cửa ngăn trên" },
      { id: "lower", name: "Cửa ngăn dưới" },
      { id: "interior", name: "Khay và nắp tháo được" },
    ],
    camera: {
      position: [2, 1.65, 3.1],
      target: [0, 0.9, 0],
      distance: 3.8,
      fitRadius: 0.98,
    },
    floor: 0,
    capabilities: { explode: true, rotation: false, joints: true },
  },
];
assets.push(workbench(part));
export const getAsset = (id: string) =>
  assets.find((a) => a.id === id) ?? assets[0];
export function belongsTo(asset: Asset, id: string, ancestor: string): boolean {
  let p = asset.occurrences.find((p) => p.id === id);
  const seen = new Set<string>();
  while (p && !seen.has(p.id)) {
    if (p.id === ancestor) return true;
    seen.add(p.id);
    p = asset.occurrences.find((a) => a.id === p?.parentId);
  }
  return false;
}
export function validateAsset(a: Asset): string[] {
  const errors: string[] = [],
    ids = new Set(a.occurrences.map((p) => p.id));
  if (ids.size !== a.occurrences.length) errors.push("duplicate occurrence");
  for (const p of a.occurrences) {
    if (p.parentId && !ids.has(p.parentId))
      errors.push(`missing parent ${p.id}`);
    const seen = new Set([p.id]);
    let id = p.parentId;
    while (id) {
      if (seen.has(id)) {
        errors.push(`cycle ${p.id}`);
        break;
      }
      seen.add(id);
      id = a.occurrences.find((n) => n.id === id)?.parentId;
    }
    if ([...p.position, ...p.offset].some((n) => !Number.isFinite(n)))
      errors.push(`invalid transform ${p.id}`);
    if (
      p.joint &&
      (p.joint.limits[0] > p.joint.limits[1] ||
        Math.abs(Math.hypot(...p.joint.axis) - 1) > 1e-6)
    )
      errors.push(`invalid hinge ${p.id}`);
  }
  return errors;
}
