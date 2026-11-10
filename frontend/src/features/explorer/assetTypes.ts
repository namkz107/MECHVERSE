import type { Part, Vec3 } from "./fanParts";
export type { Vec3 } from "./fanParts";
export type Occurrence = Part & {
  parentId?: string;
  definitionId: string;
  connection: "fixed" | "removable" | "hinge";
  joint?: { axis: Vec3; limits: [number, number] };
};
export type Asset = {
  id: string;
  code: string;
  title: string;
  category: string;
  revision: number;
  sourceKind: "educational-demo" | "original-design";
  url: string;
  description: string;
  dimensions: string;
  limitations: string[];
  occurrences: Occurrence[];
  groups: { id: string; name: string }[];
  camera: {
    position: Vec3;
    target: Vec3;
    distance: number;
    fitRadius?: number;
  };
  floor: number;
  capabilities: { explode: boolean; rotation: boolean; joints: boolean };
};
export type Shade = "studio" | "cad";
export type CameraPreset = "iso" | "front" | "side" | "top" | "under";
