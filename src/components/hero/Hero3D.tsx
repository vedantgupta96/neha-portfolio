"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const CANDY = ["#ff4d8d", "#b6e948", "#57e2ff", "#5a6cff", "#c99bf7", "#ffd23f"];

/**
 * A drifting confetti cloud shaped into a sphere using the candy palette.
 * Rotates slowly and parallax-tilts toward the pointer.
 */
function ConfettiField({ count = 2600 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = CANDY.map((c) => new THREE.Color(c));

    for (let i = 0; i < count; i++) {
      const r = 1.1 + Math.random() * 0.35;
      const theta = Math.acos(2 * Math.random() - 1);
      const phi = Math.random() * Math.PI * 2;
      positions.set(
        [
          r * Math.sin(theta) * Math.cos(phi),
          r * Math.sin(theta) * Math.sin(phi),
          r * Math.cos(theta),
        ],
        i * 3
      );
      const c = palette[(Math.random() * palette.length) | 0];
      colors.set([c.r, c.g, c.b], i * 3);
    }
    return { positions, colors };
  }, [count]);

  useFrame((state, delta) => {
    const p = ref.current;
    if (!p) return;
    p.rotation.y += delta * 0.06;
    p.rotation.x = THREE.MathUtils.lerp(p.rotation.x, state.pointer.y * 0.4, 0.04);
    p.rotation.z = THREE.MathUtils.lerp(p.rotation.z, -state.pointer.x * 0.2, 0.04);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        sizeAttenuation
        transparent
        opacity={0.95}
        depthWrite={false}
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
      <ConfettiField />
    </Canvas>
  );
}
