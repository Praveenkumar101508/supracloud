"use client";

import dynamic from "next/dynamic";
import { Suspense, useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import * as THREE from "three";

// ─── Types ───────────────────────────────────────────────────────────────────
export type NovaState = "idle" | "listening" | "thinking" | "speaking";

interface NovaSphereProps {
  state?: NovaState;
  size?: number; // px, default 480 desktop / 280 mobile
}

// ─── Colour palette per state ─────────────────────────────────────────────────
const STATE_COLORS: Record<NovaState, { core: string; glow: string; ring: string }> = {
  idle:      { core: "#00F5FF", glow: "#00F5FF", ring: "#8B5CF6" },
  listening: { core: "#FF8C00", glow: "#FF8C00", ring: "#FF4444" },
  thinking:  { core: "#8B5CF6", glow: "#7C3AED", ring: "#00F5FF" },
  speaking:  { core: "#00F5FF", glow: "#00BFFF", ring: "#00F5FF" },
};

// ─── 3D core geometry ─────────────────────────────────────────────────────────
function SphereCore({ state }: { state: NovaState }) {
  const outerRef  = useRef<THREE.Mesh>(null!);
  const innerRef  = useRef<THREE.Mesh>(null!);
  const ring1Ref  = useRef<THREE.Mesh>(null!);
  const ring2Ref  = useRef<THREE.Mesh>(null!);
  const groupRef  = useRef<THREE.Group>(null!);
  const col       = STATE_COLORS[state];

  const outerMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: col.core,
        emissive: new THREE.Color(col.glow),
        emissiveIntensity: 0.6,
        wireframe: true,
        transparent: true,
        opacity: 0.55,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state]
  );

  const innerMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: col.glow,
        emissive: new THREE.Color(col.glow),
        emissiveIntensity: 1.8,
        transparent: true,
        opacity: 0.35,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state]
  );

  const ringMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: col.ring,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.4,
        wireframe: false,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state]
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const speakPulse = state === "speaking" ? Math.sin(t * 8) * 0.08 : 0;
    const thinkSpin  = state === "thinking" ? t * 1.4 : t * 0.4;

    if (groupRef.current) {
      groupRef.current.rotation.y = thinkSpin;
      groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.15;
    }
    if (outerRef.current) {
      const pulse = 1 + Math.sin(t * 2.5) * 0.04 + speakPulse;
      outerRef.current.scale.setScalar(pulse);
      outerRef.current.rotation.x = t * 0.2;
      outerRef.current.rotation.z = t * 0.15;
    }
    if (innerRef.current) {
      const ipulse = 1 + Math.sin(t * 3 + 1) * 0.06 + speakPulse * 0.7;
      innerRef.current.scale.setScalar(ipulse);
      innerRef.current.rotation.y = -t * 0.3;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.8 + Math.PI / 3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.6 + Math.PI / 6;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer wireframe icosahedron */}
      <mesh ref={outerRef} material={outerMat}>
        <icosahedronGeometry args={[1.6, 1]} />
      </mesh>

      {/* Inner glowing sphere */}
      <mesh ref={innerRef} material={innerMat}>
        <sphereGeometry args={[1.0, 24, 24]} />
      </mesh>

      {/* Orbiting torus rings */}
      <mesh ref={ring1Ref} material={ringMat}>
        <torusGeometry args={[1.9, 0.015, 8, 80]} />
      </mesh>
      <mesh ref={ring2Ref} material={ringMat}>
        <torusGeometry args={[2.1, 0.01, 8, 80]} />
      </mesh>

      {/* Ambient lighting */}
      <pointLight color={col.glow} intensity={3} distance={8} />
      <ambientLight intensity={0.2} />
    </group>
  );
}

// ─── 3D canvas wrapper ────────────────────────────────────────────────────────
function NovaSphere3D({ state, size }: { state: NovaState; size: number }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      style={{ width: size, height: size, background: "transparent" }}
    >
      <Suspense fallback={null}>
        <SphereCore state={state} />
      </Suspense>
    </Canvas>
  );
}

const NovaSphere3DLazy = dynamic(() => Promise.resolve(NovaSphere3D), {
  ssr: false,
  loading: () => null,
});

// ─── 2D SVG fallback (mobile / no-WebGL) ─────────────────────────────────────
function NovaSphere2D({ state, size }: { state: NovaState; size: number }) {
  const col = STATE_COLORS[state];
  const r   = size / 2;

  return (
    <motion.div
      style={{ width: size, height: size, position: "relative" }}
      animate={{ scale: [1, 1.03, 1] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
        <defs>
          <radialGradient id="nova-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor={col.glow}  stopOpacity="0.9" />
            <stop offset="60%"  stopColor={col.core}  stopOpacity="0.4" />
            <stop offset="100%" stopColor={col.ring}  stopOpacity="0.0" />
          </radialGradient>
          <filter id="nova-blur">
            <feGaussianBlur stdDeviation="6" result="blur" />
          </filter>
        </defs>

        {/* Glow halo */}
        <circle cx={r} cy={r} r={r * 0.85} fill={`url(#nova-grad)`} filter="url(#nova-blur)" />

        {/* Wireframe approximation: hexagon rings */}
        {[0.5, 0.68, 0.84].map((f, i) => (
          <polygon
            key={i}
            points={Array.from({ length: 6 }, (_, k) => {
              const a = (k / 6) * Math.PI * 2 - Math.PI / 6;
              return `${r + Math.cos(a) * r * f},${r + Math.sin(a) * r * f}`;
            }).join(" ")}
            fill="none"
            stroke={i === 0 ? col.glow : col.ring}
            strokeWidth={i === 0 ? 1.5 : 0.8}
            strokeOpacity={0.7 - i * 0.15}
          />
        ))}

        {/* Core circle */}
        <circle cx={r} cy={r} r={r * 0.32} fill={col.glow} fillOpacity="0.6" />
        <circle cx={r} cy={r} r={r * 0.18} fill={col.glow} fillOpacity="0.95" />
      </svg>

      {/* Listening: waveform bars */}
      {state === "listening" && (
        <div className="absolute inset-0 flex items-center justify-center gap-[3px]">
          {Array.from({ length: 7 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-[3px] rounded-full"
              style={{ background: col.glow }}
              animate={{ height: ["8px", "24px", "8px"] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.08,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Thinking: orbiting dots */}
      {state === "thinking" && (
        <div className="absolute inset-0">
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: col.ring,
                top: "50%",
                left: "50%",
                marginTop: -4,
                marginLeft: -4,
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "linear",
              }}
              transformTemplate={({ rotate }) =>
                `rotate(${rotate}) translateX(${r * 0.58}px)`
              }
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function NovaSphere({ state = "idle", size }: NovaSphereProps) {
  const [isMobile, setIsMobile] = useState(true); // default mobile-safe for SSR
  const resolvedSize = size ?? (isMobile ? 280 : 480);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const col = STATE_COLORS[state];

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: resolvedSize, height: resolvedSize }}
    >
      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          boxShadow: `0 0 ${resolvedSize * 0.25}px ${resolvedSize * 0.08}px ${col.glow}40`,
        }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Render 3D on desktop, 2D on mobile */}
      {isMobile ? (
        <NovaSphere2D state={state} size={resolvedSize} />
      ) : (
        <NovaSphere3DLazy state={state} size={resolvedSize} />
      )}
    </div>
  );
}

export default NovaSphere;
