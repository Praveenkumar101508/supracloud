"use client";

import dynamic from "next/dynamic";
import { Suspense, useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ─── Particle config per device tier ────────────────────────────────────────
function getParticleCount(): number {
  if (typeof window === "undefined") return 0;
  const w = window.innerWidth;
  if (w < 640) return 80;
  if (w < 1024) return 150;
  return 300;
}

const CYAN   = new THREE.Color("#00F5FF");
const PURPLE = new THREE.Color("#8B5CF6");
const EDGE_DIST_SQ = 2.5 * 2.5; // connect particles within 2.5 units

// ─── Neural particles ────────────────────────────────────────────────────────
function NeuralParticles({
  count,
  reduced,
  mouse,
}: {
  count: number;
  reduced: boolean;
  mouse: React.MutableRefObject<[number, number]>;
}) {
  const meshRef   = useRef<THREE.InstancedMesh>(null!);
  const linesRef  = useRef<THREE.LineSegments>(null!);
  const { size }  = useThree();

  // Stable random positions
  const { positions, velocities, colors } = useMemo(() => {
    const positions  = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const colors     = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const spread = 12;
      positions[i * 3]     = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      velocities[i * 3]     = (Math.random() - 0.5) * 0.008;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
      const c = Math.random() > 0.6 ? PURPLE : CYAN;
      colors[i * 3]     = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, velocities, colors };
  }, [count]);

  // Edge geometry (recomputed each frame — LineSegments swaps BufferAttribute)
  const lineGeom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    // pre-allocate max edges: count*(count-1)/2 but cap for GPU
    const maxEdges = Math.min(count * 6, 4000);
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(maxEdges * 6), 3));
    return g;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const colorAttr = useMemo(
    () => new THREE.InstancedBufferAttribute(colors.slice(), 3),
    [colors]
  );

  useEffect(() => {
    if (!meshRef.current) return;
    meshRef.current.geometry.setAttribute("color", colorAttr);
    for (let i = 0; i < count; i++) {
      dummy.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
      dummy.scale.setScalar(0.04 + Math.random() * 0.04);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [count, positions, dummy, colorAttr]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    const [mx, my] = mouse.current;
    const parallaxX = mx * 0.3;
    const parallaxY = my * 0.3;

    // Update positions
    for (let i = 0; i < count; i++) {
      if (!reduced) {
        positions[i * 3]     += velocities[i * 3];
        positions[i * 3 + 1] += velocities[i * 3 + 1];
        positions[i * 3 + 2] += velocities[i * 3 + 2];
        // Wrap at bounds
        const spread = 6.5;
        if (Math.abs(positions[i * 3])     > spread) velocities[i * 3]     *= -1;
        if (Math.abs(positions[i * 3 + 1]) > spread * 0.6) velocities[i * 3 + 1] *= -1;
        if (Math.abs(positions[i * 3 + 2]) > 2.5)  velocities[i * 3 + 2] *= -1;
      }

      dummy.position.set(
        positions[i * 3] + parallaxX,
        positions[i * 3 + 1] + parallaxY,
        positions[i * 3 + 2]
      );
      const pulse = 1 + Math.sin(t * 1.5 + i * 0.4) * 0.15;
      dummy.scale.setScalar((0.04 + (i % 7) * 0.01) * pulse);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;

    // Update edges
    const posAttr = lineGeom.getAttribute("position") as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    let edgeIdx = 0;
    const maxEdges = arr.length / 6;

    for (let i = 0; i < count && edgeIdx < maxEdges; i++) {
      for (let j = i + 1; j < count && edgeIdx < maxEdges; j++) {
        const dx = positions[i * 3]     - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dSq = dx * dx + dy * dy + dz * dz;
        if (dSq < EDGE_DIST_SQ) {
          arr[edgeIdx * 6]     = positions[i * 3] + parallaxX;
          arr[edgeIdx * 6 + 1] = positions[i * 3 + 1] + parallaxY;
          arr[edgeIdx * 6 + 2] = positions[i * 3 + 2];
          arr[edgeIdx * 6 + 3] = positions[j * 3] + parallaxX;
          arr[edgeIdx * 6 + 4] = positions[j * 3 + 1] + parallaxY;
          arr[edgeIdx * 6 + 5] = positions[j * 3 + 2];
          edgeIdx++;
        }
      }
    }

    // Zero out unused slots
    for (let k = edgeIdx * 6; k < Math.min((edgeIdx + 10) * 6, arr.length); k++) {
      arr[k] = 0;
    }

    posAttr.needsUpdate = true;
    lineGeom.setDrawRange(0, edgeIdx * 2);
  });

  return (
    <>
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        <sphereGeometry args={[1, 6, 6]} />
        <meshBasicMaterial vertexColors toneMapped={false} />
      </instancedMesh>

      <lineSegments ref={linesRef} geometry={lineGeom}>
        <lineBasicMaterial
          color="#00F5FF"
          opacity={0.12}
          transparent
          toneMapped={false}
        />
      </lineSegments>
    </>
  );
}

// ─── Inner scene ─────────────────────────────────────────────────────────────
function Scene({ reduced }: { reduced: boolean }) {
  const mouse = useRef<[number, number]>([0, 0]);
  const count = useMemo(() => getParticleCount(), []);

  useEffect(() => {
    if (typeof window === "undefined" || reduced) return;
    const onMove = (e: MouseEvent) => {
      mouse.current = [
        (e.clientX / window.innerWidth  - 0.5) * 2,
        -(e.clientY / window.innerHeight - 0.5) * 2,
      ];
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced]);

  return (
    <>
      <ambientLight intensity={0.3} />
      <NeuralParticles count={count} reduced={reduced} mouse={mouse} />
    </>
  );
}

// ─── Static CSS fallback (SSR / no-WebGL) ────────────────────────────────────
function StaticFallback() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,245,255,0.08) 0%, transparent 70%), " +
          "radial-gradient(ellipse 60% 40% at 80% 80%, rgba(139,92,246,0.07) 0%, transparent 60%)",
      }}
    />
  );
}

// ─── Main export (lazy-loaded, no SSR) ───────────────────────────────────────
function NeuralBackgroundCanvas() {
  const [reduced, setReduced] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (isMobile) return <StaticFallback />;

  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none -z-10"
      style={{ background: "transparent" }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene reduced={reduced} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export const NeuralBackground = dynamic(
  () => Promise.resolve(NeuralBackgroundCanvas),
  { ssr: false, loading: () => <StaticFallback /> }
);

export default NeuralBackground;
