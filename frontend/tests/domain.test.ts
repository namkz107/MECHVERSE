import { describe, expect, it } from "vitest";
import {
  createExplorerStore,
  explodedPosition,
  parts,
} from "../src/features/explorer/state";
import {
  initialLesson,
  advanceLesson,
  restoreLesson,
  saveLesson,
  RELEASE,
} from "../src/features/lesson/lesson";

describe("Explorer occurrence contract", () => {
  it("rejects unknown IDs and synchronizes selected parts while hidden state stays explicit", () => {
    const store = createExplorerStore();
    store.getState().select("blade");
    expect(store.getState().selected).toBe("blade");
    store.getState().select("not-a-part");
    expect(store.getState().selected).toBe("blade");
    store.getState().toggleHidden("blade");
    expect(store.getState().hidden).toContain("blade");
    store.getState().select("blade");
    expect(store.getState().hidden).not.toContain("blade");
  });
  it("explodes from immutable assembly positions without accumulating offsets", () => {
    const blade = parts.find((p) => p.id === "blade")!;
    expect(explodedPosition(blade, 100)).toEqual([0, 1.15, 1.43]);
    expect(explodedPosition(blade, 0)).toEqual([0, 1.15, 0.23]);
    expect(explodedPosition(blade, 100)).toEqual([0, 1.15, 1.43]);
  });
  it("reset restores all viewer fields without owning or clearing lesson evidence", () => {
    const store = createExplorerStore();
    store.getState().select("blade");
    store.getState().toggleHidden("motor");
    store.getState().toggleIsolate();
    store.getState().setExplode(70);
    store.getState().reset();
    expect(store.getState()).toMatchObject({
      selected: null,
      hidden: [],
      isolated: null,
      explode: 0,
      playing: false,
    });
    expect(store.getState().cameraVersion).toBe(1);
  });
  it("playing and exploding are mutually exclusive", () => {
    const store = createExplorerStore();
    store.getState().setExplode(50);
    store.getState().togglePlaying();
    expect(store.getState()).toMatchObject({ playing: true, explode: 0 });
    store.getState().setExplode(20);
    expect(store.getState().playing).toBe(false);
  });
});

describe("F01 evidence and local demo persistence", () => {
  it("gates each task and never completes from observation or the wrong part", () => {
    const start = advanceLesson(initialLesson, { type: "observe" });
    expect(start.stage).toBe("find");
    expect(
      advanceLesson(start, { type: "identify", part: "motor" }).stage,
    ).toBe("find");
    const found = advanceLesson(start, { type: "identify", part: "blade" });
    expect(found.stage).toBe("classify");
    expect(
      advanceLesson(found, { type: "classify", answer: "assembly" }).stage,
    ).toBe("classify");
    expect(
      advanceLesson(found, { type: "classify", answer: "part" }).stage,
    ).toBe("complete");
    expect(
      advanceLesson(initialLesson, { type: "classify", answer: "part" }).stage,
    ).toBe("observe");
  });
  it("restores only the same release with valid evidence and ignores corrupt input", () => {
    expect(restoreLesson("{bad")).toEqual(initialLesson);
    expect(
      restoreLesson(JSON.stringify({ release: "old", stage: "complete" })),
    ).toEqual(initialLesson);
    expect(
      restoreLesson(
        JSON.stringify({
          release: RELEASE,
          stage: "complete",
          found: false,
          answer: "",
        }),
      ),
    ).toEqual(initialLesson);
    const completed = {
      release: RELEASE,
      stage: "complete",
      found: true,
      answer: "part",
    };
    expect(restoreLesson(JSON.stringify(completed)).stage).toBe("complete");
  });
  it("reports storage failure instead of pretending an answer was saved", () => {
    const denied = {
      setItem: () => {
        throw new Error("quota");
      },
    };
    expect(saveLesson(initialLesson, denied)).toBe(false);
    let stored = "";
    expect(
      saveLesson(initialLesson, {
        setItem: (_key, value) => {
          stored = value;
        },
      }),
    ).toBe(true);
    expect(JSON.parse(stored).release).toBe(RELEASE);
  });
});
