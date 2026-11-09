import { mkdir, writeFile } from "node:fs/promises";
import * as T from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import { parts } from "../src/features/explorer/state";

// GLTFExporter uses the browser FileReader API for binary packing, not for textures.
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
const scene = new T.Scene();
scene.name = "EDU-FAN-01";
const material = (color: string, metalness = 0.25) =>
  new T.MeshStandardMaterial({ color, metalness, roughness: 0.42 });
const mesh = (
  geo: T.BufferGeometry,
  mat: T.Material,
  parent: T.Group,
  pos: [number, number, number] = [0, 0, 0],
) => {
  const m = new T.Mesh(geo, mat);
  m.position.set(...pos);
  parent.add(m);
  return m;
};
function cylinder(
  parent: T.Group,
  r: number,
  length: number,
  mat: T.Material,
  pos: [number, number, number] = [0, 0, 0],
) {
  const m = mesh(new T.CylinderGeometry(r, r, length, 32), mat, parent, pos);
  m.rotation.x = Math.PI / 2;
  return m;
}
function ring(
  parent: T.Group,
  r: number,
  thick: number,
  mat: T.Material,
  z = 0,
) {
  mesh(new T.TorusGeometry(r, thick, 6, 80), mat, parent, [0, 0, z]);
}
for (const part of parts) {
  const g = new T.Group();
  g.name = part.id;
  g.userData = { occurrenceId: part.id };
  g.position.set(...part.position);
  scene.add(g);
  const mat = material(part.color);
  switch (part.id) {
    case "base": {
      const b = mesh(new T.CylinderGeometry(0.85, 0.96, 0.18, 64), mat, g);
      b.scale.z = 0.8;
      const control = mesh(
        new T.BoxGeometry(0.45, 0.05, 0.24),
        material("#253b46"),
        g,
        [0, 0.11, 0.25],
      );
      control.rotation.x = -0.1;
      for (let i = 0; i < 3; i++)
        mesh(
          new T.BoxGeometry(0.08, 0.025, 0.11),
          material(i === 0 ? "#d3ad76" : "#7a9198"),
          g,
          [-0.12 + i * 0.12, 0.15, 0.25],
        );
      break;
    }
    case "stand":
      mesh(new T.CylinderGeometry(0.11, 0.15, 2.05, 32), mat, g);
      mesh(
        new T.CylinderGeometry(0.16, 0.18, 0.4, 32),
        material("#344954"),
        g,
        [0, -0.8, 0],
      );
      break;
    case "motor":
      cylinder(g, 0.36, 0.72, mat);
      cylinder(g, 0.31, 0.025, material("#263944"), [0, 0, -0.375]);
      for (let i = 0; i < 8; i++) {
        const a = (i * Math.PI) / 4;
        mesh(new T.BoxGeometry(0.035, 0.12, 0.02), material("#101f29"), g, [
          Math.sin(a) * 0.22,
          Math.cos(a) * 0.22,
          -0.4,
        ]);
      }
      break;
    case "shaft":
      cylinder(g, 0.055, 0.83, mat);
      break;
    case "cap":
      cylinder(g, 0.17, 0.15, mat);
      cylinder(g, 0.13, 0.02, material("#b08957"), [0, 0, 0.09]);
      break;
    case "blade": {
      cylinder(g, 0.2, 0.15, mat);
      const s = new T.Shape();
      s.moveTo(0.09, 0.08);
      s.bezierCurveTo(0.4, 0.35, 0.1, 0.88, -0.19, 1.01);
      s.bezierCurveTo(-0.61, 1.17, -0.68, 0.7, -0.43, 0.44);
      s.bezierCurveTo(-0.2, 0.19, -0.03, 0.13, 0.09, 0.08);
      const geo = new T.ExtrudeGeometry(s, {
        depth: 0.05,
        bevelEnabled: true,
        bevelSegments: 2,
        steps: 1,
        bevelSize: 0.025,
        bevelThickness: 0.025,
        curveSegments: 24,
      });
      for (let i = 0; i < 3; i++)
        mesh(geo, mat, g).rotation.z = (i * Math.PI * 2) / 3;
      break;
    }
    case "front-guard":
    case "rear-guard": {
      const front = part.id === "front-guard";
      const sign = front ? 1 : -1;
      ring(g, 1.29, 0.028, mat);
      ring(g, 1.26, 0.018, mat, sign * 0.08);
      ring(g, 0.84, 0.012, mat, sign * 0.17);
      ring(g, 0.4, 0.012, mat, sign * 0.23);
      for (let i = 0; i < 40; i++) {
        const a = (i * Math.PI * 2) / 40;
        const points = [
          new T.Vector3(Math.cos(a) * 0.17, Math.sin(a) * 0.17, sign * 0.25),
          new T.Vector3(Math.cos(a) * 0.7, Math.sin(a) * 0.7, sign * 0.2),
          new T.Vector3(Math.cos(a) * 1.29, Math.sin(a) * 1.29, 0),
        ];
        mesh(
          new T.TubeGeometry(
            new T.CatmullRomCurve3(points),
            8,
            0.009,
            4,
            false,
          ),
          mat,
          g,
        );
      }
      if (front) {
        cylinder(g, 0.18, 0.035, material("#344954"), [0, 0, 0.27]);
        ring(g, 0.125, 0.006, material("#d3ad76"), 0.294);
      }
      break;
    }
  }
}
await mkdir("public/models", { recursive: true });
const glb = await new GLTFExporter().parseAsync(scene, { binary: true });
await writeFile(
  "public/models/fan-edu-v1.glb",
  Buffer.from(glb as ArrayBuffer),
);
await writeFile(
  "public/models/fan-edu-v1.manifest.json",
  JSON.stringify(
    {
      id: "EDU-FAN-01",
      revision: 1,
      status: "educational-demo",
      geometry: "fan-edu-v1.glb",
      coordinateSystem: "Y-up, front +Z",
      scale: "illustrative-unverified",
      occurrences: parts.map(({ id, position, offset }) => ({
        id,
        nodeBinding: id,
        assembled: position,
        explodedOffset: offset,
      })),
      limitations: [
        "No real product identity",
        "No validated dimensions or technical materials",
        "No motor internals",
        "Exploded layout is not a disassembly procedure",
      ],
    },
    null,
    2,
  ),
);
console.log(
  `Generated EDU-FAN-01: ${(glb as ArrayBuffer).byteLength} bytes, ${parts.length} occurrences.`,
);
