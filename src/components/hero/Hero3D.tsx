"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const CANDY = ["#ff4d8d", "#b6e948", "#57e2ff", "#5a6cff", "#c99bf7", "#ffd23f"];

/**
 * A drifting confetti cloud shaped into a sphere using the candy palette.
 * Rotates slowly, parallax-tilts toward the pointer, and each piece springs
 * away from the cursor — like running your hand through real confetti.
 */
function ConfettiField({ count = 2600 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const geoRef = useRef<THREE.BufferGeometry>(null);

  // `home` = resting positions; `current` = live (mutated) positions.
  const { home, current, colors } = useMemo(() => {
    const home = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = CANDY.map((c) => new THREE.Color(c));

    for (let i = 0; i < count; i++) {
      const r = 1.1 + Math.random() * 0.35;
      const theta = Math.acos(2 * Math.random() - 1);
      const phi = Math.random() * Math.PI * 2;
      home.set(
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
    return { home, current: home.slice(), colors };
  }, [count]);

  // Disable the per-particle interaction when the user prefers reduced motion.
  const reduce = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  const cursor = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    const p = ref.current;
    const geo = geoRef.current;
    if (!p || !geo) return;

    // Ambient rotation + a gentle parallax tilt toward the pointer.
    p.rotation.y += delta * 0.06;
    p.rotation.x = THREE.MathUtils.lerp(p.rotation.x, state.pointer.y * 0.25, 0.04);
    p.rotation.z = THREE.MathUtils.lerp(p.rotation.z, -state.pointer.x * 0.12, 0.04);

    if (reduce) return;

    // Pointer → world point on the sphere's plane → the sphere's local space
    // (so repulsion lines up even as the cloud rotates).
    p.updateMatrixWorld();
    cursor.current.set(
      (state.pointer.x * state.viewport.width) / 2,
      (state.pointer.y * state.viewport.height) / 2,
      0
    );
    p.worldToLocal(cursor.current);
    const cx = cursor.current.x;
    const cy = cursor.current.y;
    const cz = cursor.current.z;

    const arr = geo.attributes.position.array as Float32Array;
    const radius = 0.55; // reach of the cursor's "push"
    const strength = 0.5; // how far pieces fly at point-blank range
    const spring = 0.12; // how quickly they settle back home

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const hx = home[ix];
      const hy = home[ix + 1];
      const hz = home[ix + 2];

      // Default target is the resting position…
      let tx = hx;
      let ty = hy;
      let tz = hz;

      // …unless the cursor is close, then push radially outward from it.
      const dx = hx - cx;
      const dy = hy - cy;
      const dz = hz - cz;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (dist < radius) {
        const f = (1 - dist / radius) * strength;
        const inv = 1 / (dist || 1e-4);
        tx = hx + dx * inv * f;
        ty = hy + dy * inv * f;
        tz = hz + dz * inv * f;
      }

      // Critically-damped-ish spring toward the target.
      arr[ix] += (tx - arr[ix]) * spring;
      arr[ix + 1] += (ty - arr[ix + 1]) * spring;
      arr[ix + 2] += (tz - arr[ix + 2]) * spring;
    }
    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry ref={geoRef}>
        <bufferAttribute attach="attributes-position" args={[current, 3]} />
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
