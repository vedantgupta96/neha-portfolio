"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { site } from "@/data/projects";
import FloatingShapes from "@/components/FloatingShapes";

const Hero3D = dynamic(() => import("./Hero3D"), { ssr: false });

const spring = { type: "spring" as const, stiffness: 120, damping: 12 };

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax: text drifts up & fades, 3D drifts down as you scroll away.
  const textY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const canvasY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      <motion.div style={{ y: canvasY }} className="absolute inset-0 -z-10">
        <Hero3D />
      </motion.div>
      <FloatingShapes />

      <motion.div
        style={{ y: textY, opacity: fade }}
        className="mx-auto w-full max-w-6xl px-6"
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

        <h1 className="font-display text-6xl font-extrabold leading-[0.9] tracking-tight sm:text-8xl md:text-[8.5rem]">
          {["Designing", "human-", "centered"].map((line, i) => (
            <motion.span
              key={line}
              initial={{ opacity: 0, y: 60, rotate: -4 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ ...spring, delay: 0.1 + i * 0.12 }}
              className="block"
              style={i === 1 || i === 2 ? { color: "var(--pink)" } : undefined}
            >
              {line}
            </motion.span>
          ))}
          <motion.span
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.45 }}
            className="block"
          >
            experiences.
          </motion.span>
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
