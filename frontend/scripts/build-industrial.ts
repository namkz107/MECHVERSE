import { mkdir, writeFile } from "node:fs/promises";
import * as T from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import { assets, validateAsset } from "../src/features/explorer/assets";
import { benchGeometry } from "./workbench-geometry";
import {
  paint,
  shellPaint,
  steel,
  dark,
  box,
  plate,
  bore,
  roundRect,
  cylinder,
  tray,
  screw,
  mergeOccurrence,
} from "./industrial-geometry";
class BlobReader {
  result: ArrayBuffer | string | null = null;
  onloadend: (() => void) | null = null;
  readAsArrayBuffer(blob: Blob) {
    void blob.arrayBuffer().then((b) => {
      this.result = b;
      this.onloadend?.();
    });
  }
  readAsDataURL(blob: Blob) {
    void blob.arrayBuffer().then((b) => {
      this.result = `data:${blob.type};base64,${Buffer.from(b).toString("base64")}`;
      this.onloadend?.();
    });
  }
}
Object.assign(globalThis, { FileReader: BlobReader });
function locker(id: string, g: T.Group) {
  if (id === "shell") {
    plate(g, 0.5, 1.72, 0.0015, [0, 0.94, -0.224], shellPaint);
    for (const sign of [-1, 1]) {
      plate(
        g,
        0.45,
        1.72,
        0.0015,
        [sign * 0.249, 0.94, 0],
        shellPaint,
        [],
        [0, Math.PI / 2, 0],
      );
      box(g, [0.018, 1.72, 0.0015], [sign * 0.241, 0.94, 0.224], shellPaint);
      box(g, [0.0015, 1.72, 0.018], [sign * 0.232, 0.94, 0.215], shellPaint);
    }
    for (const y of [0.081, 1.799]) {
      plate(
        g,
        0.497,
        0.448,
        0.0015,
        [0, y, 0],
        shellPaint,
        [],
        [-Math.PI / 2, 0, 0],
      );
      box(
        g,
        [0.497, 0.018, 0.0015],
        [0, y === 0.081 ? y + 0.009 : y - 0.009, 0.224],
        shellPaint,
      );
    }
    box(g, [0.464, 0.088, 0.0015], [0, 1.753, 0.224], shellPaint);
    for (const y of [0.095, 0.906])
      box(g, [0.464, 0.018, 0.0015], [0, y, 0.224], shellPaint);
  } else if (id === "divider") tray(g, 0.496, 0.444, 0.018);
  else if (id === "shelf") tray(g, 0.458, 0.396, 0.018);
  else if (id === "shelf-supports")
    for (const x of [-1, 1])
      for (const z of [-0.155, 0.155]) {
        box(g, [0.025, 0.002, 0.035], [x * 0.236, 0, z], steel);
        box(g, [0.002, 0.025, 0.035], [x * 0.247, -0.012, z], steel);
      }
  else if (id === "plinth") {
    for (const x of [-1, 1])
      box(g, [0.035, 0.077, 0.424], [x * 0.231, 0, 0], dark, 0.003);
    box(g, [0.46, 0.06, 0.002], [0, 0, -0.222], shellPaint);
    for (const x of [-1, 1])
      for (const z of [-1, 1])
        cylinder(g, 0.023, 0.008, [x * 0.218, -0.036, z * 0.192], dark);
  } else if (id === "plinth-cover") {
    plate(g, 0.426, 0.065, 0.0015, [0, 0, 0], paint, [
      bore(-0.195, 0, 0.003),
      bore(0.195, 0, 0.003),
    ]);
    for (const x of [-0.195, 0.195]) {
      const s = new T.Group();
      s.position.set(x, 0, 0.003);
      s.rotation.y = Math.PI;
      g.add(s);
      screw(s, 0.012);
    }
  } else if (id.endsWith("-door")) {
    const holes: T.Path[] = [];
    for (const y of [0.18, 0.155, 0.13, -0.25, -0.275, -0.3])
      holes.push(roundRect(0.24, 0.009, 0.0045, 0, y));
    holes.push(bore(0.168, -0.09, 0.009));
    for (const y of [-0.048, 0.048]) holes.push(bore(0.17, y, 0.003));
    plate(g, 0.458, 0.79, 0.0015, [0.229, 0, 0], paint, holes);
    for (const x of [0.001, 0.457])
      box(g, [0.0015, 0.787, 0.018], [x, 0, -0.009], paint);
    for (const y of [-0.394, 0.394])
      box(g, [0.455, 0.0015, 0.018], [0.229, y, -0.009], paint);
    // Inside stiffener behind handle, with real access hole for lock cam.
    plate(g, 0.043, 0.27, 0.0015, [0.397, -0.025, -0.017], paint, [
      bore(0, -0.065, 0.012),
    ]);
  } else if (id.endsWith("-handle")) {
    box(g, [0.016, 0.118, 0.016], [0, 0, 0.011], dark, 0.006);
    for (const y of [-0.048, 0.048])
      box(g, [0.018, 0.019, 0.029], [0, y, -0.006], dark, 0.004);
  } else if (id.endsWith("-lock")) {
    cylinder(g, 0.011, 0.004, [0, 0, 0.004], steel, [Math.PI / 2, 0, 0]);
    cylinder(g, 0.008, 0.03, [0, 0, -0.012], steel, [Math.PI / 2, 0, 0]);
    box(g, [0.0018, 0.01, 0.001], [0, 0, 0.0065], dark);
    // Released position: cam points down, clear of the jamb during the door demonstration.
    box(g, [0.012, 0.058, 0.003], [0, -0.022, -0.029], steel);
    cylinder(g, 0.006, 0.004, [0, 0, -0.032], steel, [Math.PI / 2, 0, 0], 6);
  } else if (id.endsWith("-label")) {
    const opening = roundRect(0.073, 0.027, 0.001);
    plate(g, 0.085, 0.039, 0.001, [0, 0, 0], steel, [opening]);
    box(g, [0.077, 0.03, 0.001], [0, 0, -0.0015], shellPaint);
  } else if (id.includes("handle-screw")) screw(g);
  else if (id.includes("moving-hinge")) {
    cylinder(g, 0.006, 0.023, [0, 0, 0]);
    box(g, [0.028, 0.033, 0.002], [0.014, 0, -0.004], steel);
  } else if (id.includes("-hinge-")) {
    for (const y of [-0.019, 0.019]) cylinder(g, 0.006, 0.014, [0, y, 0]);
    box(g, [0.014, 0.053, 0.002], [-0.007, 0, -0.006], steel);
    for (const y of [-0.018, 0.018])
      cylinder(
        g,
        0.003,
        0.002,
        [-0.009, y, -0.004],
        steel,
        [Math.PI / 2, 0, 0],
        6,
      );
  } else if (id.includes("-pin-")) {
    cylinder(g, 0.0025, 0.065, [0, 0, 0]);
    cylinder(g, 0.0045, 0.003, [0, 0.034, 0]);
  } else throw new Error(`Unknown locker occurrence ${id}`);
}
await mkdir("public/models", { recursive: true });
for (const asset of assets.filter((a) => a.sourceKind === "original-design")) {
  const errors = validateAsset(asset);
  if (errors.length) throw new Error(errors.join(","));
  const scene = new T.Scene();
  scene.name = asset.code;
  const groups = new Map(
    asset.occurrences.map((p) => {
      const g = new T.Group();
      g.name = p.id;
      g.userData = { occurrenceId: p.id, definitionId: p.definitionId };
      g.position.set(...p.position);
      return [p.id, g] as const;
    }),
  );
  for (const p of asset.occurrences) {
    const g = groups.get(p.id)!;
    (p.parentId ? groups.get(p.parentId)! : scene).add(g);
    if (asset.id === "locker") locker(p.id, g);
    else benchGeometry(p.id, g);
    mergeOccurrence(g);
  }
  const glb = await new GLTFExporter().parseAsync(scene, { binary: true });
  await writeFile(`public${asset.url}`, Buffer.from(glb as ArrayBuffer));
  let triangles = 0,
    meshes = 0;
  scene.traverse((o) => {
    if (o instanceof T.Mesh) {
      meshes++;
      triangles +=
        (o.geometry.index?.count ?? o.geometry.attributes.position.count) / 3;
    }
  });
  await writeFile(
    `public${asset.url.replace(".glb", ".manifest.json")}`,
    JSON.stringify(
      {
        ...asset,
        coordinateSystem: "metres, Y-up, front +Z",
        technicalMaterial: "unspecified",
        builder: "scripts/build-industrial.ts",
        metrics: { bytes: (glb as ArrayBuffer).byteLength, meshes, triangles },
      },
      null,
      2,
    ),
  );
  console.log(
    JSON.stringify({
      asset: asset.id,
      occurrences: asset.occurrences.length,
      bytes: (glb as ArrayBuffer).byteLength,
      meshes,
      triangles,
    }),
  );
}
