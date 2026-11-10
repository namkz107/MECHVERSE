import { describe, it, expect } from "vitest";
import { readFile } from "node:fs/promises";
import { GLTFLoader } from "three-stdlib";
import { Mesh, Raycaster, Vector3, Box3, Quaternion } from "three";
import { assets } from "../src/features/explorer/assets";
import { localMatrix } from "../src/features/explorer/transforms";
async function load(id: string) {
  const a = assets.find((a) => a.id === id)!;
  const bytes = await readFile(new URL(`../public${a.url}`, import.meta.url));
  const gltf = await new GLTFLoader().parseAsync(
    bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength),
    "",
  );
  gltf.scene.updateMatrixWorld(true);
  return gltf.scene;
}
describe("exported engineering geometry", () => {
  it("has actual vent openings through the door sheet and attached hardware follows its pivot", async () => {
    const scene = await load("locker"),
      door = scene.getObjectByName("upper-door")!,
      handle = scene.getObjectByName("upper-handle")!;
    const sheet = door.children.filter((o) => o instanceof Mesh);
    // Door opening is shown with the illustrative latch released, clear of its jamb.
    expect(
      new Box3()
        .setFromObject(scene.getObjectByName("upper-lock")!)
        .getSize(new Vector3()).x,
    ).toBeLessThan(0.03);
    const ray = (y: number) =>
      new Raycaster(
        new Vector3(-0.002, y, 1),
        new Vector3(0, 0, -1),
      ).intersectObjects(sheet, false);
    expect(ray(1.49)).toHaveLength(0);
    expect(ray(1.48).length).toBeGreaterThan(0);
    const before = handle.getWorldPosition(new Vector3()),
      p = assets
        .find((a) => a.id === "locker")!
        .occurrences.find((p) => p.id === "upper-door")!;
    localMatrix(p, 0, 90).decompose(door.position, door.quaternion, door.scale);
    scene.updateMatrixWorld(true);
    const pivot = new Vector3(...p.position),
      expected = before
        .clone()
        .sub(pivot)
        .applyQuaternion(
          new Quaternion().setFromAxisAngle(new Vector3(0, -1, 0), Math.PI / 2),
        )
        .add(pivot);
    expect(
      handle.getWorldPosition(new Vector3()).distanceTo(expected),
    ).toBeLessThan(1e-6);
  });
  it("keeps all occurrence bindings and nominal envelopes, including individual repeat fasteners", async () => {
    for (const id of ["locker", "workbench"]) {
      const a = assets.find((a) => a.id === id)!,
        scene = await load(id),
        ids: string[] = [];
      scene.traverse((o) => {
        if (o.userData.occurrenceId) ids.push(o.userData.occurrenceId);
      });
      expect(ids.sort()).toEqual(a.occurrences.map((p) => p.id).sort());
      const size = new Box3().setFromObject(scene).getSize(new Vector3());
      if (id === "locker") {
        expect(size.y).toBeCloseTo(1.8, 1);
        expect(size.x).toBeCloseTo(0.5, 1);
      } else {
        expect(size.x).toBeCloseTo(1.5, 2);
        expect(size.y).toBeCloseTo(0.9, 2);
      }
    }
  });
});
