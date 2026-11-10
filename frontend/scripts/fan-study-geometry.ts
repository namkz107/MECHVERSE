import * as T from "three";
import { mesh, box, mat, plate, bore } from "./industrial-geometry";
import type { Vec3 } from "../src/features/explorer/assetTypes";

const polymer = mat(
  "Ivory moulded polymer / appearance study",
  "#e3e1d8",
  0,
  0.32,
);
const bladeMat = mat(
  "Satin light grey blade / appearance study",
  "#bec5c4",
  0.08,
  0.3,
);
const metal = mat(
  "Zinc plated steel / appearance study",
  "#b9bec1",
  0.83,
  0.24,
);
const core = mat("Laminated core / appearance study", "#60696e", 0.72, 0.46);
const copper = mat(
  "Copper winding / illustrative layout",
  "#bc6d35",
  0.8,
  0.26,
);
const rubber = mat("Elastomer / appearance study", "#303535", 0, 0.82);
const whiteGear = mat("Polymer gear / unverified geometry", "#d7c9a6", 0, 0.5);
const TAU = Math.PI * 2;
function disc(
  g: T.Group,
  r: number,
  length: number,
  z = 0,
  material: T.Material = metal,
  segments = 48,
) {
  return mesh(
    g,
    new T.CylinderGeometry(r, r, length, segments),
    material,
    [0, 0, z],
    [Math.PI / 2, 0, 0],
  );
}
function ring(
  g: T.Group,
  r: number,
  wire: number,
  z = 0,
  material: T.Material = metal,
) {
  return mesh(g, new T.TorusGeometry(r, wire, 6, 64), material, [0, 0, z]);
}
function annulus(
  g: T.Group,
  outer: number,
  inner: number,
  depth: number,
  z: number,
  material = metal,
) {
  const shape = new T.Shape();
  shape.absarc(0, 0, outer, 0, TAU, false);
  shape.holes.push(bore(0, 0, inner));
  const geometry = new T.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelSegments: 1,
    bevelSize: 0.003,
    bevelThickness: 0.003,
    curveSegments: 32,
  });
  geometry.translate(0, 0, z - depth / 2);
  return mesh(g, geometry, material);
}
function wire(
  g: T.Group,
  points: Vec3[],
  radius: number,
  material: T.Material,
  segments = 16,
) {
  return mesh(
    g,
    new T.TubeGeometry(
      new T.CatmullRomCurve3(points.map((p) => new T.Vector3(...p))),
      segments,
      radius,
      5,
      false,
    ),
    material,
  );
}
function screw(g: T.Group, x: number, y: number, z: number, length: number) {
  const p = new T.Group();
  p.position.set(x, y, z);
  g.add(p);
  disc(p, 0.018, length, 0);
  disc(p, 0.033, 0.025, length / 2);
  box(p, [0.039, 0.006, 0.002], [0, 0, length / 2 + 0.013], rubber, 0.001);
  box(p, [0.006, 0.039, 0.002], [0, 0, length / 2 + 0.013], rubber, 0.001);
}
// Closed wall profile; repeated partial revolutions leave genuine ventilation slots.
function ventedShell(g: T.Group, back: boolean) {
  const profile = (r0: number, r1: number, z0: number, z1: number) => [
    new T.Vector2(r0, z0),
    new T.Vector2(r1, z1),
    new T.Vector2(r1 - 0.022, z1),
    new T.Vector2(r0 - 0.022, z0),
    new T.Vector2(r0, z0),
  ];
  function band(r0: number, r1: number, z0: number, z1: number, vent: boolean) {
    const sectors = vent ? 28 : 1;
    for (let i = 0; i < sectors; i++) {
      const shape = profile(r0, r1, z0, z1);
      const geometry = new T.LatheGeometry(
        shape,
        vent ? 3 : 64,
        (i * TAU) / sectors,
        (TAU / sectors) * (vent ? 0.5 : 1),
      );
      mesh(g, geometry, polymer, [0, 0, 0], [Math.PI / 2, 0, 0]);
      // Cap the two radial sides of each slot for visible wall thickness.
      if (vent)
        for (const angle of [
          (i * TAU) / sectors,
          ((i + 0.5) * TAU) / sectors,
        ]) {
          const points = shape
            .slice(0, 4)
            .map(
              (v) =>
                new T.Vector3(
                  v.x * Math.sin(angle),
                  -v.x * Math.cos(angle),
                  v.y,
                ),
            );
          const positions = new Float32Array(
            [0, 1, 2, 0, 2, 3].flatMap((j) => points[j].toArray()),
          );
          const cap = new T.BufferGeometry();
          cap.setAttribute("position", new T.BufferAttribute(positions, 3));
          cap.setAttribute(
            "uv",
            new T.BufferAttribute(new Float32Array(12), 2),
          );
          cap.computeVertexNormals();
          const m = mesh(g, cap, polymer);
          m.material = polymer;
        }
    }
  }
  if (back) {
    band(0.395, 0.395, 0.045, -0.045, false);
    band(0.395, 0.3, -0.045, -0.15, true);
    band(0.3, 0.05, -0.15, -0.17, false);
    ring(g, 0.394, 0.007, 0.045, polymer);
  } else {
    band(0.395, 0.395, -0.165, 0, false);
    band(0.395, 0.31, 0, 0.095, true);
    band(0.31, 0.105, 0.095, 0.17, false);
    ring(g, 0.395, 0.007, -0.165, polymer);
  }
}
export function fanStudyGeometry(id: string, g: T.Group) {
  if (id === "base") {
    const profile = [
      [0, -0.065],
      [0.81, -0.065],
      [0.89, -0.025],
      [0.9, 0.02],
      [0.87, 0.065],
      [0.72, 0.13],
      [0.35, 0.17],
      [0, 0.17],
    ].map(([x, y]) => new T.Vector2(x, y));
    const base = mesh(g, new T.LatheGeometry(profile, 80), polymer);
    base.scale.z = 0.78;
    const seam = mesh(
      g,
      new T.CylinderGeometry(0.864, 0.864, 0.018, 64),
      rubber,
      [0, -0.04, 0],
    );
    seam.scale.z = 0.78;
    box(g, [0.51, 0.018, 0.21], [0, 0.138, 0.36], rubber, 0.025);
    for (let i = 0; i < 4; i++)
      box(
        g,
        [0.085, 0.025, 0.145],
        [-0.17 + i * 0.113, 0.159, 0.36],
        i === 0 ? rubber : polymer,
        0.016,
      );
    for (const x of [-0.6, 0.6])
      for (const z of [-0.36, 0.36])
        mesh(g, new T.CylinderGeometry(0.065, 0.065, 0.025, 20), rubber, [
          x,
          -0.075,
          z,
        ]);
  } else if (id === "stand") {
    mesh(
      g,
      new T.CylinderGeometry(0.095, 0.16, 1.91, 40),
      polymer,
      [0, -0.02, 0],
    );
    mesh(
      g,
      new T.CylinderGeometry(0.165, 0.18, 0.22, 40),
      polymer,
      [0, -0.87, 0],
    );
    for (const x of [-0.21, 0.21])
      box(g, [0.07, 0.32, 0.2], [x, 1.18, -0.1], polymer, 0.025);
    const axle = mesh(
      g,
      new T.CylinderGeometry(0.085, 0.085, 0.57, 32),
      metal,
      [0, 1.25, -0.1],
      [0, 0, Math.PI / 2],
    );
    axle.name = "Tilt pivot / static illustration";
    box(g, [0.12, 0.16, 0.16], [0.29, 1.25, -0.1], rubber, 0.045);
  } else if (id === "front-guard" || id === "rear-guard") {
    const front = id === "front-guard",
      sign = front ? 1 : -1;
    ring(g, 1.29, 0.022);
    ring(g, 1.274, 0.012, sign * 0.035);
    for (const r of [0.43, 0.82, 1.11])
      ring(g, r, 0.0065, sign * (0.23 * (1 - (r / 1.3) ** 2)));
    for (let i = 0; i < 48; i++) {
      const a = (i * TAU) / 48;
      const pts: Vec3[] = [0.16, 0.5, 0.9, 1.29].map((r) => [
        Math.cos(a) * r,
        Math.sin(a) * r,
        sign * 0.23 * (1 - (r / 1.29) ** 2),
      ]);
      wire(g, pts, 0.0065, metal, 9);
    }
    if (front) {
      disc(g, 0.18, 0.028, 0.24, polymer);
      ring(g, 0.153, 0.005, 0.258, metal);
    } else annulus(g, 0.17, 0.1, 0.035, -0.225);
    if (front)
      for (let i = 0; i < 4; i++) {
        const a = (i * TAU) / 4;
        const clip = box(
          g,
          [0.065, 0.09, 0.04],
          [1.29 * Math.cos(a), 1.29 * Math.sin(a), -0.005],
          polymer,
          0.01,
        );
        clip.rotation.z = a - Math.PI / 2;
      }
  } else if (id === "blade") {
    disc(g, 0.205, 0.16, 0, bladeMat);
    annulus(g, 0.205, 0.065, 0.025, 0.09, bladeMat);
    const s = new T.Shape();
    s.moveTo(0.08, 0.1);
    s.bezierCurveTo(0.18, 0.3, 0.42, 0.67, 0.2, 1.02);
    s.bezierCurveTo(0.1, 1.2, -0.37, 1.16, -0.48, 0.87);
    s.bezierCurveTo(-0.59, 0.59, -0.3, 0.23, 0.08, 0.1);
    const geo = new T.ExtrudeGeometry(s, {
      depth: 0.017,
      bevelEnabled: true,
      bevelThickness: 0.009,
      bevelSize: 0.012,
      bevelSegments: 2,
      curveSegments: 32,
    });
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i),
        y = pos.getY(i);
      pos.setZ(i, pos.getZ(i) + x * (0.4 - 0.14 * y) + 0.055 * y * y);
    }
    geo.computeVertexNormals();
    for (let i = 0; i < 3; i++)
      mesh(g, geo.clone(), bladeMat).rotation.z = (i * TAU) / 3;
    geo.dispose();
  } else if (id === "cap") {
    disc(g, 0.145, 0.115, 0, polymer);
    disc(g, 0.13, 0.018, 0.067, polymer);
    for (let i = 0; i < 24; i++) {
      const a = (i * TAU) / 24;
      box(
        g,
        [0.012, 0.012, 0.065],
        [Math.cos(a) * 0.144, Math.sin(a) * 0.144, 0],
        polymer,
        0.003,
      ).rotation.z = a;
    }
  } else if (id === "shaft") {
    disc(g, 0.043, 1.15, -0.14, metal);
    ring(g, 0.045, 0.004, 0.32);
    ring(g, 0.045, 0.004, 0.35);
  } else if (id === "motor" || id === "rear-cover")
    ventedShell(g, id === "rear-cover");
  else if (id === "stator") {
    annulus(g, 0.305, 0.185, 0.26, 0, core);
    for (let i = 0; i < 15; i++)
      ring(g, 0.306, 0.0018, -0.12 + i * 0.017, metal);
    for (let i = 0; i < 12; i++) {
      const a = (i * TAU) / 12;
      box(
        g,
        [0.035, 0.057, 0.25],
        [Math.cos(a) * 0.207, Math.sin(a) * 0.207, 0],
        core,
        0.002,
      ).rotation.z = a - Math.PI / 2;
    }
  } else if (id === "windings") {
    for (let i = 0; i < 12; i++) {
      const a = (i * TAU) / 12;
      for (let j = 0; j < 3; j++) {
        const shape = new T.CatmullRomCurve3(
          [
            new T.Vector3(0.205, -0.025, -0.12),
            new T.Vector3(0.205, -0.025, 0.15 + j * 0.008),
            new T.Vector3(0.27, 0, 0.17 + j * 0.008),
            new T.Vector3(0.285, 0.025, 0.12),
            new T.Vector3(0.285, 0.025, -0.15 - j * 0.008),
            new T.Vector3(0.22, 0, -0.17 - j * 0.008),
          ],
          true,
        );
        mesh(
          g,
          new T.TubeGeometry(shape, 24, 0.006, 4, true),
          copper,
        ).rotation.z = a;
      }
    }
  } else if (id === "rotor") {
    disc(g, 0.165, 0.275, 0, core);
    for (const z of [-0.145, 0.145]) annulus(g, 0.169, 0.045, 0.016, z, metal);
    for (let i = 0; i < 20; i++) {
      const a = (i * TAU) / 20;
      wire(
        g,
        [
          [Math.cos(a) * 0.167, Math.sin(a) * 0.167, -0.13],
          [Math.cos(a + 0.12) * 0.167, Math.sin(a + 0.12) * 0.167, 0.13],
        ],
        0.004,
        metal,
        2,
      );
    }
  } else if (id.endsWith("bearing")) {
    annulus(g, 0.29, 0.23, 0.035, 0, metal);
    annulus(g, 0.09, 0.044, 0.065, 0, metal);
    ring(g, 0.066, 0.006, 0.036, rubber);
    for (let i = 0; i < 3; i++) {
      const a = (i * TAU) / 3;
      box(
        g,
        [0.21, 0.04, 0.028],
        [Math.cos(a) * 0.17, Math.sin(a) * 0.17, 0],
        metal,
        0.008,
      ).rotation.z = a;
    }
  } else if (id === "gear-case") {
    box(g, [0.28, 0.025, 0.31], [0, -0.055, 0], polymer, 0.016);
    for (const x of [-0.13, 0.13])
      box(g, [0.02, 0.12, 0.31], [x, 0, 0], polymer, 0.008);
    for (const z of [-0.145, 0.145])
      box(g, [0.28, 0.12, 0.02], [0, 0, z], polymer, 0.008);
    mesh(g, new T.CylinderGeometry(0.02, 0.02, 0.06, 24), metal, [0, 0, -0.05]);
  } else if (id === "gear-cover") {
    plate(
      g,
      0.28,
      0.31,
      0.018,
      [0, 0, 0],
      polymer,
      [bore(0, -0.05, 0.023)],
      [-Math.PI / 2, 0, 0],
    );
  } else if (id === "gear-wheel") {
    const gear = new T.Group();
    g.add(gear);
    gear.rotation.x = -Math.PI / 2;
    annulus(gear, 0.085, 0.021, 0.035, 0, whiteGear);
    for (let i = 0; i < 24; i++) {
      const a = (i * TAU) / 24;
      box(
        gear,
        [0.016, 0.018, 0.033],
        [0.09 * Math.cos(a), 0.09 * Math.sin(a), 0],
        whiteGear,
        0.002,
      ).rotation.z = a;
    }
  } else if (id === "motor-fasteners") {
    for (let i = 0; i < 3; i++) {
      const a = (i * TAU) / 3;
      screw(g, 0.27 * Math.cos(a), 0.27 * Math.sin(a), 0, 0.55);
    }
  } else if (id === "power-cord") {
    wire(
      g,
      [
        [0, 0, -0.05],
        [0.25, -0.1, -0.36],
        [0.65, -0.18, -0.65],
        [1, -0.18, -0.3],
        [1.4, -0.18, -0.48],
      ],
      0.018,
      rubber,
      36,
    );
    box(g, [0.18, 0.08, 0.1], [1.46, -0.16, -0.48], rubber, 0.025);
    for (const z of [-0.025, 0.025])
      box(g, [0.08, 0.018, 0.012], [1.58, -0.16, -0.48 + z], metal, 0.002);
  } else throw new Error(`Unknown fan study occurrence ${id}`);
}
