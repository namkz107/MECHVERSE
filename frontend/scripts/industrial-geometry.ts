import * as T from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import {
  mergeGeometries,
  mergeVertices,
} from "three/examples/jsm/utils/BufferGeometryUtils.js";
import type { Vec3 } from "../src/features/explorer/assetTypes";
export const mat = (
  name: string,
  color: string,
  metalness: number,
  roughness: number,
) => {
  const m = new T.MeshStandardMaterial({ color, metalness, roughness });
  m.name = name;
  return m;
};
export const paint = mat(
    "Powder coating / appearance only",
    "#617570",
    0.22,
    0.57,
  ),
  shellPaint = mat(
    "Warm grey coating / appearance only",
    "#adb5ad",
    0.15,
    0.64,
  ),
  steel = mat("Satin metal / grade unspecified", "#b2b5b1", 0.75, 0.32),
  dark = mat("Dark polymer / unspecified", "#303735", 0.05, 0.68),
  wood = mat("Laminated wood / appearance only", "#b78b55", 0, 0.65);
export function mesh(
  parent: T.Object3D,
  geo: T.BufferGeometry,
  material: T.Material,
  pos: Vec3 = [0, 0, 0],
  rot: Vec3 = [0, 0, 0],
) {
  const m = new T.Mesh(geo, material);
  m.position.set(...pos);
  m.rotation.set(...rot);
  parent.add(m);
  return m;
}
export function box(
  p: T.Object3D,
  size: Vec3,
  pos: Vec3,
  material: T.Material = paint,
  r = 0.001,
) {
  return mesh(
    p,
    new RoundedBoxGeometry(
      ...size,
      2,
      Math.min(r, ...size.map((v) => v * 0.3)),
    ),
    material,
    pos,
  );
}
export function roundRect(w: number, h: number, r: number, cx = 0, cy = 0) {
  const s = new T.Shape(),
    x = cx - w / 2,
    y = cy - h / 2;
  r = Math.min(r, w / 2, h / 2);
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}
export function bore(x: number, y: number, r: number) {
  const p = new T.Path();
  p.absarc(x, y, r, 0, Math.PI * 2, true);
  return p;
}
export function plate(
  p: T.Object3D,
  w: number,
  h: number,
  t: number,
  pos: Vec3,
  material: T.Material,
  holes: T.Path[] = [],
  rot: Vec3 = [0, 0, 0],
) {
  const shape = roundRect(w, h, 0.0015);
  shape.holes = holes;
  const geo = new T.ExtrudeGeometry(shape, {
    depth: t,
    bevelEnabled: false,
    curveSegments: 8,
  });
  geo.translate(0, 0, -t / 2);
  return mesh(p, geo, material, pos, rot);
}
export function cylinder(
  p: T.Object3D,
  r: number,
  length: number,
  pos: Vec3,
  material: T.Material = steel,
  rot: Vec3 = [0, 0, 0],
  segments = 20,
) {
  return mesh(
    p,
    new T.CylinderGeometry(r, r, length, segments),
    material,
    pos,
    rot,
  );
}
export function tray(
  p: T.Object3D,
  w: number,
  d: number,
  lip: number,
  material = shellPaint,
) {
  plate(p, w, d, 0.0015, [0, 0, 0], material, [], [-Math.PI / 2, 0, 0]);
  for (const x of [-1, 1])
    box(p, [0.0015, lip, d], [x * (w / 2 - 0.00075), lip / 2, 0], material);
  for (const z of [-1, 1])
    box(p, [w, lip, 0.0015], [0, lip / 2, z * (d / 2 - 0.00075)], material);
}
export function screw(p: T.Object3D, length = 0.012) {
  cylinder(
    p,
    0.0025,
    length,
    [0, 0, length / 2],
    steel,
    [Math.PI / 2, 0, 0],
    12,
  );
  cylinder(p, 0.005, 0.003, [0, 0, -0.0015], steel, [Math.PI / 2, 0, 0], 6);
  box(p, [0.004, 0.0009, 0.0003], [0, 0, -0.0031], dark, 0.0001);
}
export function tube(
  p: T.Object3D,
  start: Vec3,
  end: Vec3,
  width = 0.04,
  thickness = 0.002,
) {
  const dir = new T.Vector3(...end).sub(new T.Vector3(...start));
  const shape = roundRect(width, width, 0.003);
  shape.holes.push(
    roundRect(width - 2 * thickness, width - 2 * thickness, 0.001),
  );
  const geo = new T.ExtrudeGeometry(shape, {
    depth: dir.length(),
    bevelEnabled: false,
    curveSegments: 4,
  });
  const m = mesh(p, geo, paint, start);
  m.quaternion.setFromUnitVectors(new T.Vector3(0, 0, 1), dir.normalize());
  return m;
}
// Merge only direct meshes sharing a material within one occurrence. Never flatten semantic nodes.
export function mergeOccurrence(group: T.Group) {
  const buckets = new Map<T.Material, T.BufferGeometry[]>();
  for (const child of [...group.children]) {
    if (!(child instanceof T.Mesh)) continue;
    child.updateMatrix();
    const geo = (
      child.geometry.index
        ? child.geometry.toNonIndexed()
        : child.geometry.clone()
    ).applyMatrix4(child.matrix);
    const material = child.material as T.Material;
    buckets.set(material, [...(buckets.get(material) ?? []), geo]);
    group.remove(child);
    child.geometry.dispose();
  }
  for (const [material, geometries] of buckets) {
    const merged = mergeGeometries(geometries);
    if (!merged) throw new Error("Cannot merge occurrence");
    const compact = mergeVertices(merged, 1e-6);
    compact.normalizeNormals();
    mesh(group, compact, material);
    merged.dispose();
    geometries.forEach((g) => g.dispose());
  }
}
