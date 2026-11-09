import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { parts } from "../src/features/explorer/state";

describe("exported GLB and application occurrence contract", () => {
  it("loads real geometry with exactly the supported stable occurrence IDs", async () => {
    const file = await readFile("public/models/fan-edu-v1.glb");
    const gltf = await new GLTFLoader().parseAsync(
      file.buffer.slice(file.byteOffset, file.byteOffset + file.byteLength),
      "",
    );
    const ids = gltf.scene.children.map((o) => o.userData.occurrenceId);
    expect(ids.sort()).toEqual([
      "base",
      "blade",
      "cap",
      "front-guard",
      "motor",
      "rear-guard",
      "shaft",
      "stand",
    ]);
    const blade = gltf.scene.children.find(
      (o) => o.userData.occurrenceId === "blade",
    )!;
    expect(blade.children.length).toBeGreaterThan(1);
    expect(blade.position.toArray()).toEqual([0, 1.15, 0.23]);
  });
  it("the manifest binds every application occurrence once to the same assembled position", async () => {
    const manifest = JSON.parse(
      await readFile("public/models/fan-edu-v1.manifest.json", "utf8"),
    );
    expect(manifest.occurrences).toHaveLength(8);
    for (const part of parts) {
      const matching = manifest.occurrences.filter(
        (o: { id: string }) => o.id === part.id,
      );
      expect(matching).toHaveLength(1);
      expect(matching[0].nodeBinding).toBe(part.id);
      expect(matching[0].assembled).toEqual(part.position);
    }
  });
});
