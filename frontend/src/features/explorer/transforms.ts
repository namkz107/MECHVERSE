import { Matrix4, Quaternion, Vector3 } from "three";
import type { Occurrence } from "./assetTypes";
export function localMatrix(p: Occurrence, explode: number, angle = 0) {
  const amount = Number.isFinite(explode)
    ? Math.max(0, Math.min(100, explode)) / 100
    : 0;
  const position = new Vector3(...p.position).addScaledVector(
    new Vector3(...p.offset),
    amount,
  );
  const q = new Quaternion();
  if (p.joint && Number.isFinite(angle))
    q.setFromAxisAngle(
      new Vector3(...p.joint.axis),
      (Math.min(p.joint.limits[1], Math.max(p.joint.limits[0], angle)) *
        Math.PI) /
        180,
    );
  return new Matrix4().compose(position, q, new Vector3(1, 1, 1));
}
