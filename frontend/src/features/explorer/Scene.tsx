import { useEffect, useRef, useState, useMemo } from "react";
import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei/core/OrbitControls";
import { Html } from "@react-three/drei/web/Html";
import { useStore } from "zustand";
import * as T from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { explorerStore } from "./state";
import { belongsTo } from "./assets";
import type { Asset } from "./assetTypes";
import { localMatrix } from "./transforms";
import { loadModel, disposeModel } from "./modelLoader";
import { woodTexture } from "./woodTexture";

export function StudioEnvironment() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const generator = new T.PMREMGenerator(gl),
      room = new RoomEnvironment(),
      env = generator.fromScene(room, 0.04);
    scene.environment = env.texture;
    scene.environmentIntensity = 0.85;
    return () => {
      scene.environment = null;
      env.dispose();
      room.dispose();
      generator.dispose();
    };
  }, [gl, scene]);
  return null;
}
export function Scene({
  asset,
  onReady,
  reduced,
}: {
  asset: Asset;
  onReady: () => void;
  reduced: boolean;
}) {
  const state = useStore(explorerStore),
    { gl, invalidate } = useThree();
  const [model, setModel] = useState<T.Group | null>(null),
    [error, setError] = useState<Error | null>(null);
  const roots = useMemo(() => new Map<string, T.Object3D>(), [model]);
  const meshInfo = useMemo(
    () =>
      new Map<
        T.Mesh,
        {
          source: T.MeshStandardMaterial;
          original: T.MeshStandardMaterial;
          generatedMap: boolean;
          cad: T.MeshStandardMaterial;
          edge: T.LineSegments;
          id: string;
        }
      >(),
    [model],
  );
  const visible = useRef(true),
    spin = useRef(0);
  useEffect(() => {
    const abort = new AbortController();
    let loaded: T.Group | undefined;
    loadModel(asset.url, abort.signal)
      .then((m) => {
        loaded = m;
        const found = new Set<string>();
        m.traverse((o) => {
          if (o.userData.occurrenceId) found.add(o.userData.occurrenceId);
        });
        if (asset.occurrences.some((p) => !found.has(p.id)))
          throw new Error("Asset occurrence mapping mismatch");
        setModel(m);
      })
      .catch((e) => {
        if (!abort.signal.aborted)
          setError(e instanceof Error ? e : new Error(String(e)));
      });
    return () => {
      abort.abort();
      if (loaded) disposeModel(loaded);
    };
  }, [asset]);
  useEffect(() => {
    const el = gl.domElement;
    const observer = new IntersectionObserver((entries) => {
      visible.current = entries[0]?.isIntersecting ?? true;
      if (visible.current) invalidate();
    });
    observer.observe(el);
    const visibility = () => {
      if (document.hidden) explorerStore.setState({ playing: false });
      invalidate();
    };
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [gl, invalidate]);
  useEffect(() => {
    if (!model) return;
    model.traverse((o) => {
      if (o.userData.occurrenceId) roots.set(o.userData.occurrenceId, o);
    });
    const meshes: T.Mesh[] = [];
    model.traverse((o) => {
      if (o instanceof T.Mesh) meshes.push(o);
    });
    for (const mesh of meshes) {
      let owner: T.Object3D | null = mesh;
      while (owner && !owner.userData.occurrenceId) owner = owner.parent;
      if (!owner) continue;
      const source = mesh.material as T.MeshStandardMaterial,
        original = source.clone();
      const generatedMap =
        original.name.startsWith("Laminated wood") && !original.map;
      if (generatedMap) {
        original.map = woodTexture();
        original.color.set("#ffffff");
        original.needsUpdate = true;
      }
      const cad = new T.MeshStandardMaterial({
        color: source.name.startsWith("Copper")
          ? source.color
          : ["front-guard", "rear-guard"].includes(owner.userData.occurrenceId)
            ? "#899498"
            : "#c9cece",
        metalness: 0.08,
        roughness: 0.66,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
      });
      const edge = new T.LineSegments(
        new T.EdgesGeometry(mesh.geometry, 30),
        new T.LineBasicMaterial({
          color: "#43504f",
          transparent: true,
          opacity: 0.38,
        }),
      );
      edge.raycast = () => {};
      mesh.add(edge);
      // Fine guard wires caused striped self-shadows across the stand.
      mesh.castShadow = !["front-guard", "rear-guard"].includes(
        owner.userData.occurrenceId,
      );
      mesh.receiveShadow = true;
      meshInfo.set(mesh, {
        source,
        original,
        generatedMap,
        cad,
        edge,
        id: owner.userData.occurrenceId,
      });
    }
    onReady();
    invalidate();
    return () => {
      for (const [mesh, info] of meshInfo) {
        mesh.material = info.source;
        mesh.remove(info.edge);
        info.edge.geometry.dispose();
        (info.edge.material as T.Material).dispose();
        if (info.generatedMap) info.original.map?.dispose();
        info.original.dispose();
        info.cad.dispose();
      }
      meshInfo.clear();
      roots.clear();
    };
  }, [model, roots, meshInfo, onReady, invalidate]);
  useEffect(() => {
    if (!model) return;
    for (const p of asset.occurrences) {
      const node = roots.get(p.id);
      if (!node) continue;
      localMatrix(p, state.explode, state.joints[p.id] ?? 0).decompose(
        node.position,
        node.quaternion,
        node.scale,
      );
      if (
        asset.capabilities.rotation &&
        ["blade", "shaft", "rotor"].includes(p.id)
      )
        node.rotation.z = spin.current;
    }
    for (const [mesh, info] of meshInfo) {
      const hidden = state.hidden.some((id) => belongsTo(asset, info.id, id));
      const show =
        !hidden &&
        (!state.isolated || belongsTo(asset, info.id, state.isolated));
      mesh.visible = show;
      mesh.raycast = show ? T.Mesh.prototype.raycast : () => {};
      mesh.material = state.shade === "cad" ? info.cad : info.original;
      const material = mesh.material as T.MeshStandardMaterial;
      const selected =
        state.selected && belongsTo(asset, info.id, state.selected);
      material.emissive.set(selected ? "#1b796e" : "#000000");
      material.emissiveIntensity = selected ? 0.18 : 0;
      // Guard wire silhouettes already read clearly; avoid drawing every tube facet.
      info.edge.visible =
        (state.shade === "cad" &&
          !["front-guard", "rear-guard", "windings"].includes(info.id)) ||
        !!selected;
      (info.edge.material as T.LineBasicMaterial).color.set(
        selected ? "#17685f" : "#43504f",
      );
    }
    invalidate();
  }, [
    model,
    asset,
    state.selected,
    state.hidden,
    state.isolated,
    state.explode,
    state.joints,
    state.shade,
    roots,
    meshInfo,
    invalidate,
  ]);
  useEffect(() => {
    spin.current = 0;
    for (const id of ["blade", "shaft", "rotor"]) {
      const node = roots.get(id);
      if (node) node.rotation.z = 0;
    }
    invalidate();
  }, [state.resetVersion, roots, invalidate]);
  useEffect(() => {
    invalidate();
  }, [state.playing, state.labels, invalidate]);
  useFrame((_, dt) => {
    if (state.playing && !document.hidden && visible.current) {
      spin.current += Math.min(dt, 0.05) * 2.5;
      for (const id of ["blade", "shaft", "rotor"]) {
        const node = roots.get(id);
        if (node) node.rotation.z = spin.current;
      }
      invalidate();
    }
    if (asset.capabilities.rotation)
      gl.domElement.dataset.rotorAngle = String(
        roots.get("blade")?.rotation.z ?? 0,
      );
  });
  // Expose measured renderer counters as read-only diagnostics for QA, never as FPS claims.
  useEffect(() => {
    let id = 0;
    const measure = () => {
      const dom = gl.domElement;
      dom.dataset.asset = asset.id;
      dom.dataset.calls = String(gl.info.render.calls);
      dom.dataset.triangles = String(gl.info.render.triangles);
      dom.dataset.geometries = String(gl.info.memory.geometries);
      dom.dataset.textures = String(gl.info.memory.textures);
      dom.dataset.shade = state.shade;
      dom.dataset.explode = String(state.explode);
      dom.dataset.joints = JSON.stringify(state.joints);
    };
    id = requestAnimationFrame(() => {
      id = requestAnimationFrame(measure);
    });
    return () => cancelAnimationFrame(id);
  }, [
    gl,
    asset,
    model,
    state.shade,
    state.explode,
    state.joints,
    state.selected,
    state.cameraVersion,
  ]);
  function select(e: ThreeEvent<MouseEvent>) {
    if (e.delta > 5) return;
    let owner: T.Object3D | null = e.object;
    while (owner && !owner.userData.occurrenceId) owner = owner.parent;
    if (owner) {
      e.stopPropagation();
      explorerStore.getState().select(owner.userData.occurrenceId);
    }
  }
  if (error) throw error;
  return (
    <>
      {model && <primitive object={model} onClick={select} dispose={null} />}
      {state.labels && state.selected && roots.has(state.selected) && (
        <OccurrenceCallout
          roots={roots}
          id={state.selected}
          name={asset.occurrences.find((p) => p.id === state.selected)!.name}
        />
      )}
      <CameraRig asset={asset} roots={roots} reduced={reduced} />
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, asset.floor - 0.002, 0]}
        receiveShadow
        visible={state.cameraPreset !== "under"}
      >
        <planeGeometry args={[200, 200]} />
        <shadowMaterial
          transparent
          opacity={state.shade === "cad" ? 0.06 : 0.14}
        />
      </mesh>
    </>
  );
}
function OccurrenceCallout({
  roots,
  id,
  name,
}: {
  roots: Map<string, T.Object3D>;
  id: string;
  name: string;
}) {
  const anchor = useRef<T.Group>(null);
  // Run before Html's projection callback, after the current assembly transform.
  useFrame(() => {
    const node = roots.get(id);
    if (node && anchor.current) {
      node.updateWorldMatrix(true, false);
      node.getWorldPosition(anchor.current.position);
      anchor.current.updateMatrixWorld();
    }
  }, -1);
  return (
    <group ref={anchor}>
      <Html center style={{ pointerEvents: "none" }}>
        <span className="scene-callout">
          {name}
          <i />
        </span>
      </Html>
    </group>
  );
}
function CameraRig({
  asset,
  roots,
  reduced,
}: {
  asset: Asset;
  roots: Map<string, T.Object3D>;
  reduced: boolean;
}) {
  const controls = useRef<React.ComponentRef<typeof OrbitControls>>(null),
    { camera, size, invalidate } = useThree(),
    state = useStore(explorerStore);
  const goal = useRef<{ position: T.Vector3; target: T.Vector3 } | null>(null);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      let target = new T.Vector3(...asset.camera.target),
        distance =
          asset.camera.distance * Math.max(1, (size.height / size.width) * 0.8);
      if (asset.camera.fitRadius && camera instanceof T.PerspectiveCamera) {
        const vertical = (camera.fov * Math.PI) / 180,
          horizontal =
            2 * Math.atan((Math.tan(vertical / 2) * size.width) / size.height);
        distance = Math.max(
          asset.camera.distance,
          (asset.camera.fitRadius /
            Math.sin(Math.min(vertical, horizontal) / 2)) *
            1.08,
        );
      }
      let offset = new T.Vector3(...asset.camera.position)
        .sub(target)
        .normalize();
      const view = state.cameraPreset;
      if (view === "front") offset.set(0, 0.03, 1);
      if (view === "side") offset.set(1, 0.03, 0);
      if (view === "top") offset.set(0, 1, 0.001);
      if (view === "under") offset.set(0.8, -0.65, 1).normalize();
      if (state.focusVersion > 0 && state.selected) {
        const node = roots.get(state.selected);
        if (node) {
          const bound = new T.Box3().setFromObject(node);
          if (!bound.isEmpty()) {
            bound.getCenter(target);
            distance = Math.max(
              bound.getSize(new T.Vector3()).length() * 1.8,
              asset.id === "fan" ? 3 : 0.25,
            );
            if (asset.id !== "fan")
              offset
                .set(0.3, 0.2, 1)
                .applyQuaternion(node.getWorldQuaternion(new T.Quaternion()))
                .normalize();
            if (asset.id === "workbench")
              offset.set(0.35, view === "under" ? -0.65 : 1, 0.45).normalize();
          }
        }
      } else if (state.explode > 0 && camera instanceof T.PerspectiveCamera) {
        if (asset.id === "fan" && view === "iso")
          offset.set(0.28, 0.12, 1).normalize();
        const bounds = new T.Box3();
        for (const node of roots.values())
          bounds.union(new T.Box3().setFromObject(node));
        if (!bounds.isEmpty()) {
          bounds.getCenter(target);
          const vertical = T.MathUtils.degToRad(camera.fov);
          const horizontal =
            2 * Math.atan((Math.tan(vertical / 2) * size.width) / size.height);
          const right = new T.Vector3()
            .crossVectors(new T.Vector3(0, 1, 0), offset)
            .normalize();
          const up = new T.Vector3().crossVectors(offset, right).normalize();
          let fitted = 0;
          for (const x of [bounds.min.x, bounds.max.x])
            for (const y of [bounds.min.y, bounds.max.y])
              for (const z of [bounds.min.z, bounds.max.z]) {
                const point = new T.Vector3(x, y, z).sub(target);
                fitted = Math.max(
                  fitted,
                  point.dot(offset) +
                    Math.max(
                      Math.abs(point.dot(right)) / Math.tan(horizontal / 2),
                      Math.abs(point.dot(up)) / Math.tan(vertical / 2),
                    ),
                );
              }
          distance = fitted * 1.1;
        }
      }
      goal.current = {
        position: target.clone().addScaledVector(offset, distance),
        target,
      };
      invalidate();
    });
    return () => cancelAnimationFrame(frame);
  }, [
    asset,
    state.explode,
    state.cameraVersion,
    state.focusVersion,
    size.width,
    size.height,
    roots,
    invalidate,
  ]);
  useFrame((_, dt) => {
    if (!goal.current || !controls.current) return;
    const f = reduced ? 1 : 1 - Math.exp(-dt * 10);
    camera.position.lerp(goal.current.position, f);
    controls.current.target.lerp(goal.current.target, f);
    controls.current.update();
    if (camera.position.distanceTo(goal.current.position) < 0.001)
      goal.current = null;
    else invalidate();
  });
  return (
    <OrbitControls
      ref={controls}
      makeDefault
      target={asset.camera.target}
      minDistance={asset.id === "fan" ? 3 : 0.1}
      maxDistance={asset.camera.distance * 3}
      maxPolarAngle={Math.PI * 0.97}
      enableDamping={!reduced}
      dampingFactor={0.12}
      onStart={() => {
        goal.current = null;
      }}
    />
  );
}
