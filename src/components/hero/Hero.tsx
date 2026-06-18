"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import type { MotionValue } from "framer-motion";
import { site } from "@/data/projects";
import FloatingShapes from "@/components/FloatingShapes";

type Hero3DProps = {
  pointerX?: MotionValue<number>;
  pointerY?: MotionValue<number>;
  scrollProgress?: MotionValue<number>;
  burstSignal?: number;
};

const Hero3D = dynamic<Hero3DProps>(() => import("./Hero3D"), { ssr: false });

const spring = { type: "spring" as const, stiffness: 120, damping: 12 };
const headlineLines = [
  { text: "Designing", accent: false },
  { text: "human-", accent: true },
  { text: "centered", accent: true },
  { text: "experiences.", accent: false },
];

function letterOffset(lineIndex: number, letterIndex: number) {
  const seed = lineIndex * 23 + letterIndex * 11;
  return {
    x: ((seed % 7) - 3) * 7,
    y: 24 + (seed % 5) * 6,
    rotate: ((seed % 9) - 4) * 2,
  };
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const reduceMotion = useReducedMotion();
  const [burstSignal, setBurstSignal] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax: text drifts up & fades, 3D drifts down as you scroll away.
  const textY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const canvasY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const sequence = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "KeyB",
      "KeyA",
    ];
    let index = 0;

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable='true']")) {
        return;
      }

      if (event.code === sequence[index]) {
        event.preventDefault();
        index += 1;
        if (index === sequence.length) {
          setBurstSignal((value) => value + 1);
          index = 0;
        }
        return;
      }

      index = event.code === sequence[0] ? 1 : 0;
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width) * 2 - 1);
    pointerY.set(-(((event.clientY - bounds.top) / bounds.height) * 2 - 1));
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden"
    >
      <motion.div
        style={{ y: canvasY }}
        className="pointer-events-none absolute inset-0 z-0"
      >
        <Hero3D
          pointerX={pointerX}
          pointerY={pointerY}
          scrollProgress={scrollYProgress}
          burstSignal={burstSignal}
        />
      </motion.div>
      <FloatingShapes />

      <motion.div
        style={{ y: textY, opacity: fade }}
        className="relative z-10 mx-auto w-full max-w-6xl px-6"
      >
        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={spring}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium shadow-[0_8px_30px_var(--shadow)]"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-lime" />
          {site.role} · Google
        </motion.p>

        <h1
          aria-label="Designing human-centered experiences."
          className="font-display text-5xl font-extrabold leading-[0.9] tracking-tight sm:text-8xl md:text-[8.5rem]"
        >
          {headlineLines.map((line, lineIndex) => (
            <span
              key={line.text}
              aria-hidden="true"
              className="block whitespace-nowrap"
              style={line.accent ? { color: "var(--pink)" } : undefined}
            >
              {Array.from(line.text).map((letter, letterIndex) => {
                const offset = letterOffset(lineIndex, letterIndex);

                return (
                  <motion.span
                    key={`${line.text}-${letterIndex}`}
                    initial={
                      reduceMotion
                        ? false
                        : {
                            opacity: 0,
                            x: offset.x,
                            y: offset.y,
                            rotate: offset.rotate,
                          }
                    }
                    animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                    transition={{
                      ...spring,
                      delay: 0.52 + lineIndex * 0.06 + letterIndex * 0.012,
                    }}
                    className="inline-block"
                  >
                    {letter}
                  </motion.span>
                );
              })}
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 max-w-xl text-lg text-muted"
        >
          {site.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <motion.a
            href="#work"
            whileHover={{ scale: 1.06, rotate: -1.5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 12 }}
            className="rounded-full bg-pink px-6 py-3 font-semibold text-white shadow-[0_10px_30px_var(--shadow)]"
          >
            View work →
          </motion.a>
          <motion.a
            href={`mailto:${site.email}`}
            whileHover={{ scale: 1.06, rotate: 1.5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 12 }}
            className="rounded-full border border-border bg-surface px-6 py-3 font-semibold"
          >
            Get in touch
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
