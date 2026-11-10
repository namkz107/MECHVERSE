import { GLTFLoader } from "three-stdlib";
import { Mesh, Material, Texture, Object3D, BufferGeometry } from "three";
export function disposeModel(scene: Object3D) {
  const geometries = new Set<BufferGeometry>(),
    materials = new Set<Material>(),
    textures = new Set<Texture>();
  scene.traverse((o) => {
    if (o instanceof Mesh) {
      geometries.add(o.geometry);
      for (const m of Array.isArray(o.material) ? o.material : [o.material]) {
        materials.add(m);
        for (const v of Object.values(m))
          if (v instanceof Texture) textures.add(v);
      }
    }
  });
  geometries.forEach((g) => g.dispose());
  materials.forEach((m) => m.dispose());
  textures.forEach((t) => t.dispose());
}
export async function loadModel(url: string, signal: AbortSignal) {
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error(`Asset HTTP ${response.status}`);
  const buffer = await response.arrayBuffer();
  signal.throwIfAborted();
  const gltf = await new GLTFLoader().parseAsync(buffer, "");
  if (signal.aborted) {
    disposeModel(gltf.scene);
    signal.throwIfAborted();
  }
  return gltf.scene;
}
