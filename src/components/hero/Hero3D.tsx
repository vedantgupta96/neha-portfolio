"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * A drifting particle cloud shaped into a sphere, with a violet→lime gradient.
 * Rotates slowly and parallax-tilts toward the pointer. Pure R3F, no heavy deps.
 */
function ParticleField({ count = 3500 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const a = new THREE.Color("#7c5cff"); // violet
    const b = new THREE.Color("#c6f24e"); // lime
    const tmp = new THREE.Color();

    for (let i = 0; i < count; i++) {
      // Even-ish distribution on a sphere shell, with a little radial jitter.
      const r = 1.15 + Math.random() * 0.25;
      const theta = Math.acos(2 * Math.random() - 1);
      const phi = Math.random() * Math.PI * 2;
      const x = r * Math.sin(theta) * Math.cos(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(theta);
      positions.set([x, y, z], i * 3);

      tmp.copy(a).lerp(b, (y + r) / (2 * r));
      colors.set([tmp.r, tmp.g, tmp.b], i * 3);
    }
    return { positions, colors };
  }, [count]);

  useFrame((state, delta) => {
    const p = ref.current;
    if (!p) return;
    p.rotation.y += delta * 0.05;
    // subtle parallax tilt following the cursor
    p.rotation.x = THREE.MathUtils.lerp(p.rotation.x, state.pointer.y * 0.35, 0.04);
    p.rotation.z = THREE.MathUtils.lerp(p.rotation.z, -state.pointer.x * 0.15, 0.04);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        vertexColors
        sizeAttenuation
        transparent
        opacity={0.95}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function Hero3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3], fov: 55 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ParticleField />
    </Canvas>
  );
}
