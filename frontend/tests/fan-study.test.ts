import { readFile } from "node:fs/promises";
import { describe, it, expect } from "vitest";
import { Box3, Mesh, Raycaster, Vector3 } from "three";
import { GLTFLoader } from "three-stdlib";
import { fanStudy } from "../src/features/explorer/fanStudy";
import { legacyFan, validateAsset } from "../src/features/explorer/assets";
import { localMatrix } from "../src/features/explorer/transforms";

async function load() {
  const file = await readFile(`public${fanStudy.url}`);
  const { scene } = await new GLTFLoader().parseAsync(
    file.buffer.slice(file.byteOffset, file.byteOffset + file.byteLength),
    "",
  );
  scene.updateMatrixWorld(true);
  return scene;
}
describe("fan study revision and teaching compatibility", () => {
  it("keeps the lesson asset separate and binds all study components, including visible internals", async () => {
    expect(legacyFan.url).toBe("/models/fan-edu-v1.glb");
    expect(legacyFan.occurrences).toHaveLength(8);
    expect(validateAsset(fanStudy)).toEqual([]);
    const scene = await load();
    expect(scene.children.map((n) => n.userData.occurrenceId).sort()).toEqual(
      fanStudy.occurrences.map((p) => p.id).sort(),
    );
    for (const id of [
      "stator",
      "windings",
      "rotor",
      "front-bearing",
      "rear-cover",
      "gear-wheel",
    ]) {
      expect(
        new Box3().setFromObject(scene.getObjectByName(id)!).isEmpty(),
      ).toBe(false);
    }
    for (const p of fanStudy.occurrences) {
      const node = scene.getObjectByName(p.id)!;
      localMatrix(p, 100).decompose(node.position, node.quaternion, node.scale);
    }
    scene.updateMatrixWorld(true);
    const coreBounds = new Box3().setFromObject(
      scene.getObjectByName("stator")!,
    );
    const coverBounds = new Box3().setFromObject(
      scene.getObjectByName("motor")!,
    );
    expect(coreBounds.intersectsBox(coverBounds)).toBe(false);
  });
  it("uses real vent apertures instead of dark decals", async () => {
    const scene = await load(),
      shell = scene.getObjectByName("motor")!;
    const meshes = shell.children.filter((m) => m instanceof Mesh);
    const ray = (fraction: number) => {
      const a = (fraction * Math.PI * 2) / 28;
      return new Raycaster(
        new Vector3(0.35 * Math.sin(a), 1.15 - 0.35 * Math.cos(a), 1),
        new Vector3(0, 0, -1),
      ).intersectObjects(meshes, false);
    };
    expect(ray(0.75)).toHaveLength(0);
    expect(ray(0.25).length).toBeGreaterThan(0);
  });
});
