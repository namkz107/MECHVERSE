import * as T from "three";
import {
  paint,
  shellPaint,
  steel,
  dark,
  wood,
  box,
  plate,
  bore,
  cylinder,
  tray,
  tube,
  roundRect,
  mesh,
} from "./industrial-geometry";
function washer(p: T.Group, y: number, outer = 0.009, inner = 0.0045) {
  const s = new T.Shape();
  s.absarc(0, 0, outer, 0, Math.PI * 2, false);
  s.holes.push(bore(0, 0, inner));
  const g = new T.ExtrudeGeometry(s, {
    depth: 0.0015,
    bevelEnabled: false,
    curveSegments: 12,
  });
  mesh(p, g, steel, [0, y, 0], [Math.PI / 2, 0, 0]);
}
export function benchGeometry(id: string, g: T.Group) {
  if (id === "welded-frame") {
    for (const x of [-0.66, 0.66])
      for (const z of [-0.26, 0.26]) {
        tube(g, [x, 0.07, z], [x, 0.82, z]);
        plate(
          g,
          0.036,
          0.036,
          0.004,
          [x, 0.073, z],
          steel,
          [bore(0, 0, 0.0045)],
          [-Math.PI / 2, 0, 0],
        );
      }
    for (const y of [0.23, 0.84]) {
      for (const z of [-0.26, 0.26]) tube(g, [-0.68, y, z], [0.68, y, z]);
      for (const x of [-0.66, 0.66]) tube(g, [x, y, -0.24], [x, y, 0.24]);
    }
    tube(g, [-0.64, 0.26, -0.26], [0.64, 0.8, -0.26], 0.025, 0.002);
    // Small fillets at structural interfaces indicate fixed joins; no weld procedure implied.
    for (const x of [-0.66, 0.66])
      for (const z of [-0.26, 0.26])
        box(g, [0.042, 0.004, 0.042], [x, 0.819, z], paint, 0.0015);
  } else if (id === "top") {
    const holes = (radius: number) =>
      [-0.2, 0.2].flatMap((z) =>
        [-0.56, -0.2, 0.2, 0.56].map((x) => bore(x, z, radius)),
      );
    for (const [height, y, radius] of [
      [0.032, -0.004, 0.0045],
      [0.008, 0.016, 0.009],
    ] as const) {
      const s = roundRect(1.5, 0.7, 0.012);
      s.holes = holes(radius);
      const geo = new T.ExtrudeGeometry(s, {
        depth: height,
        bevelEnabled: false,
        curveSegments: 12,
      });
      geo.translate(0, 0, -height / 2);
      mesh(g, geo, wood, [0, y, 0], [-Math.PI / 2, 0, 0]);
    }
  } else if (id === "lower-tray") tray(g, 1.27, 0.46, 0.03, shellPaint);
  else if (id === "mount-tabs") {
    for (const x of [-0.56, -0.2, 0.2, 0.56])
      for (const z of [-0.2, 0.2])
        plate(
          g,
          0.065,
          0.08,
          0.003,
          [x, 0.8585, z],
          paint,
          [bore(0, 0, 0.0045)],
          [-Math.PI / 2, 0, 0],
        );
  } else if (id.startsWith("top-fastener")) {
    cylinder(g, 0.0075, 0.007, [0, 0, 0], steel, [0, 0, 0], 6);
    cylinder(g, 0.004, 0.056, [0, -0.029, 0], steel);
    washer(g, -0.041);
    cylinder(g, 0.007, 0.006, [0, -0.046, 0], steel, [0, 0, 0], 6);
    box(g, [0.006, 0.0005, 0.001], [0, 0.0036, 0], dark, 0.0001);
  } else if (id.startsWith("foot-")) {
    cylinder(g, 0.035, 0.012, [0, 0.006, 0], dark);
    cylinder(g, 0.026, 0.005, [0, 0.014, 0], steel);
    cylinder(g, 0.004, 0.063, [0, 0.0435, 0], steel);
    cylinder(g, 0.008, 0.006, [0, 0.063, 0], steel, [0, 0, 0], 6);
  } else throw new Error(`Unknown bench occurrence ${id}`);
}
