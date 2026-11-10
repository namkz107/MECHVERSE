import { createStore } from "zustand/vanilla";
import { assets, getAsset, belongsTo } from "./assets";
import type { Part, Vec3 } from "./fanParts";
import type { Shade, CameraPreset } from "./assetTypes";
export { parts } from "./fanParts";
export type { Part, Vec3 } from "./fanParts";
export type ExplorerState = {
  assetId: string;
  shade: Shade;
  cameraPreset: CameraPreset;
  joints: Record<string, number>;
  labels: boolean;
  selected: string | null;
  hidden: string[];
  isolated: string | null;
  explode: number;
  playing: boolean;
  cameraVersion: number;
  resetVersion: number;
  focusVersion: number;
  setAsset: (id: string) => void;
  setShade: (mode: Shade) => void;
  setCamera: (view: CameraPreset) => void;
  setJoint: (id: string, value: number) => void;
  toggleLabels: () => void;
  select: (id: string) => void;
  toggleHidden: (id: string) => void;
  toggleIsolate: () => void;
  setExplode: (value: number) => void;
  togglePlaying: () => void;
  reset: () => void;
  focus: () => void;
};
export const explodedPosition = (p: Part, amount: number): Vec3 =>
  p.position.map(
    (v, i) => v + (p.offset[i] * Math.min(100, Math.max(0, amount))) / 100,
  ) as Vec3;
const clean = {
  selected: null,
  hidden: [] as string[],
  isolated: null,
  explode: 0,
  playing: false,
  joints: {},
  focusVersion: 0,
  cameraPreset: "iso" as CameraPreset,
};
export const createExplorerStore = () =>
  createStore<ExplorerState>((set, get) => ({
    ...clean,
    assetId: "fan",
    shade: "studio",
    labels: false,
    cameraVersion: 0,
    resetVersion: 0,
    setAsset: (id) => {
      if (assets.some((a) => a.id === id) && id !== get().assetId)
        set((s) => ({
          ...clean,
          assetId: id,
          labels: false,
          cameraVersion: s.cameraVersion + 1,
        }));
    },
    setShade: (shade) => {
      if (["studio", "cad"].includes(shade)) set({ shade });
    },
    setCamera: (cameraPreset) => {
      if (["iso", "front", "side", "top", "under"].includes(cameraPreset))
        set((s) => ({
          cameraPreset,
          focusVersion: 0,
          cameraVersion: s.cameraVersion + 1,
        }));
    },
    setJoint: (id, value) => {
      const p = getAsset(get().assetId).occurrences.find((p) => p.id === id);
      if (p?.joint && Number.isFinite(value))
        set((s) => ({
          joints: {
            ...s.joints,
            [id]: Math.max(
              p.joint!.limits[0],
              Math.min(p.joint!.limits[1], value),
            ),
          },
          explode: 0,
          playing: false,
        }));
    },
    toggleLabels: () => set((s) => ({ labels: !s.labels })),
    select: (id) => {
      const a = getAsset(get().assetId);
      if (a.occurrences.some((p) => p.id === id))
        set((s) => ({
          selected: id,
          hidden: s.hidden.filter((h) => !belongsTo(a, id, h)),
          isolated: s.isolated ? id : null,
        }));
    },
    toggleHidden: (id) => {
      if (getAsset(get().assetId).occurrences.some((p) => p.id === id))
        set((s) => ({
          hidden: s.hidden.includes(id)
            ? s.hidden.filter((h) => h !== id)
            : [...s.hidden, id],
        }));
    },
    toggleIsolate: () =>
      set((s) => ({
        isolated: s.isolated ? null : s.selected,
        hidden: [],
        playing: false,
      })),
    setExplode: (value) => {
      if (Number.isFinite(value))
        set({
          explode: Math.max(0, Math.min(100, value)),
          playing: false,
          joints: {},
        });
    },
    togglePlaying: () => {
      if (getAsset(get().assetId).capabilities.rotation)
        set((s) => ({ playing: !s.playing, explode: 0 }));
    },
    reset: () =>
      set((s) => ({
        ...clean,
        cameraVersion: s.cameraVersion + 1,
        resetVersion: s.resetVersion + 1,
        labels: false,
      })),
    focus: () => {
      if (get().selected) set((s) => ({ focusVersion: s.focusVersion + 1 }));
    },
  }));
export const explorerStore = createExplorerStore();
