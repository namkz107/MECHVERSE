import { describe, it, expect } from "vitest";
import { createExplorerStore } from "../src/features/explorer/state";
import { Vector3 } from "three";

describe("industrial assembly contract", () => {
  it("offers three distinct groups and keeps the workbench welded frame fixed in exploded view", async () => {
    const { assets, validateAsset } =
      await import("../src/features/explorer/assets");
    expect(new Set(assets.map((a) => a.category)).size).toBe(3);
    const bench = assets.find((a) => a.id === "workbench")!;
    expect(validateAsset(bench)).toEqual([]);
    expect(bench.capabilities).toEqual({
      explode: true,
      rotation: false,
      joints: false,
    });
    expect(
      bench.occurrences.find((p) => p.id === "welded-frame")?.offset,
    ).toEqual([0, 0, 0]);
    expect(
      bench.occurrences.filter((p) => p.definitionId === "top-fastener"),
    ).toHaveLength(8);
  });
  it("has a sourced locker with stable hierarchy and real hinge metadata", async () => {
    const { assets, validateAsset } =
      await import("../src/features/explorer/assets");
    const locker = assets.find((a) => a.id === "locker")!;
    expect(locker.sourceKind).toBe("original-design");
    expect(validateAsset(locker)).toEqual([]);
    expect(locker.occurrences.filter((p) => p.joint)).toHaveLength(2);
    expect(new Set(locker.occurrences.map((p) => p.id)).size).toBe(
      locker.occurrences.length,
    );
    expect(
      locker.occurrences.find((p) => p.id === "upper-handle")?.parentId,
    ).toBe("upper-door");
    expect(
      validateAsset({
        ...locker,
        occurrences: [
          ...locker.occurrences,
          { ...locker.occurrences[0], parentId: "missing" },
        ],
      }).length,
    ).toBeGreaterThan(0);
  });
  it("switching assets clears transient state and rejects stale IDs and invalid values", () => {
    const store = createExplorerStore();
    store.getState().select("blade");
    store.getState().setAsset("locker");
    expect(store.getState().selected).toBeNull();
    store.getState().select("blade");
    expect(store.getState().selected).toBeNull();
    store.getState().setJoint("upper-door", 90);
    expect(store.getState().joints["upper-door"]).toBe(90);
    store.getState().setExplode(75);
    expect(store.getState().joints).toEqual({});
    store.getState().setJoint("upper-door", 90);
    expect(store.getState().explode).toBe(0);
    store.getState().setJoint("upper-door", 999);
    expect(store.getState().joints["upper-door"]).toBe(105);
    store.getState().setJoint("upper-door", NaN);
    expect(store.getState().joints["upper-door"]).toBe(105);
    store.getState().togglePlaying();
    expect(store.getState().playing).toBe(false);
    store.getState().setShade("cad");
    store.getState().reset();
    expect(store.getState()).toMatchObject({
      joints: {},
      selected: null,
      hidden: [],
      isolated: null,
      explode: 0,
      playing: false,
      cameraPreset: "iso",
    });
    expect(store.getState().shade).toBe("cad");
    store.getState().setAsset("unknown");
    expect(store.getState().assetId).toBe("locker");
  });
  it("hinge pivot stays fixed while free edge moves outward and reset has no accumulated drift", async () => {
    const { assets } = await import("../src/features/explorer/assets");
    const { localMatrix } = await import("../src/features/explorer/transforms");
    const door = assets
      .find((a) => a.id === "locker")!
      .occurrences.find((p) => p.id === "upper-door")!;
    const pivot = new Vector3(...door.position);
    expect(
      new Vector3().applyMatrix4(localMatrix(door, 0, 90)).distanceTo(pivot),
    ).toBeLessThan(1e-9);
    const freeEdge = new Vector3(0.45, 0, 0).applyMatrix4(
      localMatrix(door, 0, 90),
    );
    expect(freeEdge.z).toBeCloseTo(pivot.z + 0.45);
    for (let i = 0; i < 50; i++) localMatrix(door, 100, 0);
    expect(
      new Vector3().applyMatrix4(localMatrix(door, 0, 0)).toArray(),
    ).toEqual(door.position);
  });
});
