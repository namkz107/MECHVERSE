import { Suspense, useEffect, useMemo, useRef } from "react";
import {
  Canvas,
  useFrame,
  useLoader,
  useThree,
  type ThreeEvent,
} from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei/core/OrbitControls";
import { GLTFLoader } from "three-stdlib";
import { useStore } from "zustand";
import * as THREE from "three";
import { explorerStore, explodedPosition, parts } from "./state";

export const ASSET_URL = "/models/fan-edu-v1.glb";
type ModelProps = { onReady: () => void; reduced: boolean };

function Model({ onReady }: ModelProps) {
  // This educational GLB has no Draco/Meshopt extensions. Use the same loader
  // and suspense cache directly, without shipping unused decoder integrations.
  const { scene } = useLoader(GLTFLoader, ASSET_URL);
  const selected = useStore(explorerStore, (s) => s.selected);
  const hidden = useStore(explorerStore, (s) => s.hidden);
  const isolated = useStore(explorerStore, (s) => s.isolated);
  const explode = useStore(explorerStore, (s) => s.explode);
  const playing = useStore(explorerStore, (s) => s.playing);
  const cameraVersion = useStore(explorerStore, (s) => s.cameraVersion);
  const invalidate = useThree((s) => s.invalidate);
  const model = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((o) => {
      if (o instanceof THREE.Mesh) {
        o.material = (o.material as THREE.MeshStandardMaterial).clone();
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });
    const ids = clone.children.map((o) => o.userData.occurrenceId);
    if (parts.some((p) => !ids.includes(p.id)))
      throw new Error("Asset occurrence mapping mismatch");
    return clone;
  }, [scene]);
  useEffect(() => {
    onReady();
    return () =>
      model.traverse((o) => {
        if (o instanceof THREE.Mesh) (o.material as THREE.Material).dispose();
      });
  }, [model, onReady]);
  useEffect(() => {
    model.children.forEach((node) => {
      const p = parts.find((p) => p.id === node.userData.occurrenceId);
      if (!p) return;
      node.position.set(...explodedPosition(p, explode));
      node.visible = !hidden.includes(p.id) && (!isolated || isolated === p.id);
      node.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          // Three's raycaster can hit invisible meshes. Disable their hit testing too.
          o.raycast = node.visible ? THREE.Mesh.prototype.raycast : () => {};
          const m = o.material as THREE.MeshStandardMaterial;
          m.emissive.set(p.id === selected ? "#b45309" : "#000000");
          m.emissiveIntensity = p.id === selected ? 0.3 : 0;
          m.color.set(p.id === selected ? "#c8893c" : p.color);
        }
      });
    });
    invalidate();
  }, [model, selected, hidden, isolated, explode, invalidate]);
  useEffect(() => {
    for (const id of ["blade", "shaft"]) {
      const node = model.children.find((n) => n.userData.occurrenceId === id);
      if (node) node.rotation.z = 0;
    }
    invalidate();
  }, [cameraVersion, model, invalidate]);
  useEffect(() => {
    if (playing) invalidate();
  }, [playing, invalidate]);
  useFrame((_, delta) => {
    if (playing) {
      for (const id of ["blade", "shaft"]) {
        const node = model.children.find((n) => n.userData.occurrenceId === id);
        if (node) node.rotation.z += Math.min(delta, 0.05) * 2.5;
      }
      invalidate();
    }
  });
  function select(e: ThreeEvent<MouseEvent>) {
    if (e.delta > 5) return;
    let node: THREE.Object3D | null = e.object;
    while (node && !node.userData.occurrenceId) node = node.parent;
    if (node) {
      e.stopPropagation();
      explorerStore.getState().select(node.userData.occurrenceId);
    }
  }
  return <primitive object={model} onClick={select} />;
}

function CameraRig({ reduced }: { reduced: boolean }) {
  const controls = useRef<React.ComponentRef<typeof OrbitControls>>(null);
  const { camera, invalidate } = useThree();
  const reset = useStore(explorerStore, (s) => s.cameraVersion);
  const focus = useStore(explorerStore, (s) => s.focusVersion);
  const goal = useRef<{
    position: THREE.Vector3;
    target: THREE.Vector3;
  } | null>(null);
  useEffect(() => {
    const state = explorerStore.getState();
    const p = focus > 0 ? parts.find((p) => p.id === state.selected) : null;
    const target = p
      ? new THREE.Vector3(...explodedPosition(p, state.explode))
      : new THREE.Vector3(0, 0.25, 0);
    const position = p
      ? target.clone().add(new THREE.Vector3(1.3, 0.5, 4.7))
      : new THREE.Vector3(4.4, 2.2, 7.2);
    goal.current = { position, target };
    invalidate();
  }, [reset, focus, invalidate]);
  useFrame((_, dt) => {
    if (!goal.current || !controls.current) return;
    const factor = reduced ? 1 : 1 - Math.exp(-dt * 8);
    camera.position.lerp(goal.current.position, factor);
    controls.current.target.lerp(goal.current.target, factor);
    controls.current.update();
    if (camera.position.distanceTo(goal.current.position) < 0.01)
      goal.current = null;
    else invalidate();
  });
  return (
    <OrbitControls
      ref={controls}
      makeDefault
      target={[0, 0.25, 0]}
      minDistance={3}
      maxDistance={13}
      maxPolarAngle={Math.PI * 0.85}
      enableDamping={!reduced}
      dampingFactor={0.12}
      onStart={() => {
        goal.current = null;
      }}
    />
  );
}

export function clearModel() {
  useLoader.clear(GLTFLoader, ASSET_URL);
}
export default function Viewer({
  onReady,
  reduced,
}: {
  onReady: () => void;
  reduced: boolean;
}) {
  return (
    <Canvas
      camera={{ position: [4.4, 2.2, 7.2], fov: 37 }}
      dpr={[1, 1.75]}
      frameloop="demand"
      gl={{ antialias: true }}
      aria-label="Mô hình quạt 3D tương tác; dùng cây bộ phận để thao tác bằng bàn phím"
    >
      <color attach="background" args={["#edf2f3"]} />
      <ambientLight intensity={1.6} />
      <directionalLight position={[3, 6, 6]} intensity={3} />
      <directionalLight position={[-4, 2, -2]} intensity={1.7} />
      <Suspense fallback={null}>
        <Model onReady={onReady} reduced={reduced} />
      </Suspense>
      <gridHelper
        args={[20, 40, "#c9d6d8", "#dde5e6"]}
        position={[0, -1.77, 0]}
      />
      <CameraRig reduced={reduced} />
    </Canvas>
  );
}
