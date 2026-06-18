"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { MotionValue } from "framer-motion";
import * as THREE from "three";

const CANDY = ["#ff4d8d", "#b6e948", "#57e2ff", "#5a6cff", "#c99bf7", "#ffd23f"];
const HEADLINE = ["Designing", "human-", "centered", "experiences."];

export type Hero3DProps = {
  pointerX?: MotionValue<number>;
  pointerY?: MotionValue<number>;
  scrollProgress?: MotionValue<number>;
  burstSignal?: number;
};

function createHeadlineSamples() {
  if (typeof document === "undefined") return [];

  const canvas = document.createElement("canvas");
  canvas.width = 1100;
  canvas.height = 620;

  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return [];

  const displayFont =
    getComputedStyle(document.documentElement).getPropertyValue("--font-bricolage").trim() ||
    "Arial Black, sans-serif";

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffffff";
  ctx.textBaseline = "top";
  ctx.font = `900 128px ${displayFont}`;

  const lineHeight = 126;
  const left = 64;
  const top = 52;
  HEADLINE.forEach((line, i) => {
    ctx.fillText(line, left, top + i * lineHeight);
  });

  const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  const points: { x: number; y: number }[] = [];

  for (let y = 0; y < canvas.height; y += 4) {
    for (let x = 0; x < canvas.width; x += 4) {
      if (pixels[(y * canvas.width + x) * 4 + 3] > 80) {
        points.push({ x, y });
      }
    }
  }

  if (points.length === 0) return [];

  let minX = canvas.width;
  let maxX = 0;
  let minY = canvas.height;
  let maxY = 0;

  points.forEach((point) => {
    minX = Math.min(minX, point.x);
    maxX = Math.max(maxX, point.x);
    minY = Math.min(minY, point.y);
    maxY = Math.max(maxY, point.y);
  });

  const width = Math.max(maxX - minX, 1);
  const height = Math.max(maxY - minY, 1);

  return points.map((point) => ({
    x: (point.x - minX) / width - 0.5,
    y: 0.5 - (point.y - minY) / height,
  }));
}

/**
 * A drifting confetti cloud that assembles into the hero headline, then falls
 * back into a loose sphere as the visitor scrolls away.
 */
function ConfettiField({
  count = 2800,
  pointerX,
  pointerY,
  scrollProgress,
  burstSignal = 0,
}: Hero3DProps & { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const geoRef = useRef<THREE.BufferGeometry>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  const intro = useRef(0);
  const burstEnergy = useRef(0);

  // `home` = scattered cloud; `title` = headline shape; `current` = live positions.
  const { home, title, current, colors } = useMemo(() => {
    const home = new Float32Array(count * 3);
    const title = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = CANDY.map((c) => new THREE.Color(c));
    const headlineSamples = createHeadlineSamples();

    for (let i = 0; i < count; i++) {
      const r = 1.2 + Math.random() * 0.85;
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

      const sample = headlineSamples[(Math.random() * headlineSamples.length) | 0];
      if (sample) {
        title.set(
          [
            sample.x,
            sample.y,
            (Math.random() - 0.5) * 0.08,
          ],
          i * 3
        );
      } else {
        title.set([0, 0, 0], i * 3);
      }

      const c = palette[(Math.random() * palette.length) | 0];
      colors.set([c.r, c.g, c.b], i * 3);
    }
    return { home, title, current: home.slice(), colors };
  }, [count]);

  // Disable the per-particle interaction when the user prefers reduced motion.
  const reduce = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  const cursor = useRef(new THREE.Vector3());

  useEffect(() => {
    if (burstSignal === 0 || reduce) return;

    const geo = geoRef.current;
    if (!geo) return;

    const arr = geo.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const x = arr[ix];
      const y = arr[ix + 1];
      const z = arr[ix + 2];
      const inv = 1 / (Math.sqrt(x * x + y * y + z * z) || 1e-4);
      const force = 0.45 + Math.random() * 1.05;

      arr[ix] += x * inv * force;
      arr[ix + 1] += y * inv * force;
      arr[ix + 2] += z * inv * force + (Math.random() - 0.5) * 0.65;
    }

    geo.attributes.position.needsUpdate = true;
    burstEnergy.current = 1;
  }, [burstSignal, count, reduce]);

  useFrame((state, delta) => {
    const p = ref.current;
    const geo = geoRef.current;
    if (!p || !geo) return;

    const px = pointerX?.get() ?? state.pointer.x;
    const py = pointerY?.get() ?? state.pointer.y;
    const scroll = scrollProgress?.get() ?? 0;
    const scrollScatter = THREE.MathUtils.smoothstep(scroll, 0.08, 0.5);

    intro.current = reduce ? 0 : Math.min(1, intro.current + delta * 0.72);
    burstEnergy.current = Math.max(0, burstEnergy.current - delta * 0.9);

    const assembly = reduce ? 0 : intro.current * (1 - scrollScatter);
    const textScale = Math.min(state.viewport.width * 0.72, 4.5);
    const textHeight = textScale * 0.52;
    const desktopShift = state.viewport.width > 4 ? -state.viewport.width * 0.03 : 0;
    const targetLift = state.viewport.width > 4 ? 0.05 : 0.2;

    // Ambient rotation + a gentle parallax tilt toward the pointer.
    p.rotation.y += delta * (0.04 + burstEnergy.current * 0.28);
    p.rotation.x = THREE.MathUtils.lerp(p.rotation.x, py * 0.22, 0.04);
    p.rotation.z = THREE.MathUtils.lerp(p.rotation.z, -px * 0.1, 0.04);

    if (reduce) return;

    // Pointer → world point on the field's plane → local space.
    p.updateMatrixWorld();
    cursor.current.set(
      (px * state.viewport.width) / 2,
      (py * state.viewport.height) / 2,
      0
    );
    p.worldToLocal(cursor.current);
    const cx = cursor.current.x;
    const cy = cursor.current.y;
    const cz = cursor.current.z;

    const arr = geo.attributes.position.array as Float32Array;
    const radius = 0.48 + assembly * 0.18;
    const strength = 0.38 + burstEnergy.current * 0.24;
    const spring = 0.08 + assembly * 0.055 + burstEnergy.current * 0.045;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const hx = home[ix];
      const hy = home[ix + 1];
      const hz = home[ix + 2];
      const txHeadline = title[ix] * textScale + desktopShift;
      const tyHeadline = title[ix + 1] * textHeight + targetLift;
      const tzHeadline = title[ix + 2];

      let tx = THREE.MathUtils.lerp(hx, txHeadline, assembly);
      let ty = THREE.MathUtils.lerp(hy, tyHeadline, assembly);
      let tz = THREE.MathUtils.lerp(hz, tzHeadline, assembly);

      // If the cursor is close, push radially outward from it.
      const dx = tx - cx;
      const dy = ty - cy;
      const dz = tz - cz;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (dist < radius) {
        const f = (1 - dist / radius) * strength;
        const inv = 1 / (dist || 1e-4);
        tx += dx * inv * f;
        ty += dy * inv * f;
        tz += dz * inv * f;
      }

      arr[ix] += (tx - arr[ix]) * spring;
      arr[ix + 1] += (ty - arr[ix + 1]) * spring;
      arr[ix + 2] += (tz - arr[ix + 2]) * spring;
    }
    geo.attributes.position.needsUpdate = true;

    if (materialRef.current) {
      materialRef.current.size = 0.025 + assembly * 0.007 + burstEnergy.current * 0.018;
      materialRef.current.opacity = 0.56 + assembly * 0.24 + burstEnergy.current * 0.08;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry ref={geoRef}>
        <bufferAttribute attach="attributes-position" args={[current, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={0.03}
        vertexColors
        sizeAttenuation
        transparent
        opacity={0.92}
        depthWrite={false}
      />
    </points>
  );
}

export default function Hero3D(props: Hero3DProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3], fov: 55 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      className="pointer-events-none"
    >
      <ConfettiField {...props} />
    </Canvas>
  );
}
