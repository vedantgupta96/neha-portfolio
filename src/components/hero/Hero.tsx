"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { site } from "@/data/projects";

// 3D canvas is client-only; skip SSR to avoid hydration of WebGL.
const Hero3D = dynamic(() => import("./Hero3D"), { ssr: false });

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* 3D particle field */}
      <div className="absolute inset-0 -z-10">
        <Hero3D />
      </div>
      {/* radial vignette to seat the text */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_30%,#08080b_85%)]" />

      <div className="mx-auto w-full max-w-6xl px-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-muted backdrop-blur-sm"
        >
          <span className="h-2 w-2 rounded-full bg-accent" />
          {site.role} · Google
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl md:text-8xl"
        >
          Designing
          <br />
          <span className="text-accent">human-centered</span>
          <br />
          experiences.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-8 max-w-xl text-lg text-muted"
        >
          {site.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#work"
            className="rounded-full bg-accent px-6 py-3 font-medium text-background transition-transform hover:scale-105"
          >
            View work
          </a>
          <a
            href={`mailto:${site.email}`}
            className="rounded-full border border-white/15 px-6 py-3 font-medium transition-colors hover:bg-white/5"
          >
            Get in touch
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-muted"
      >
        Scroll
      </motion.div>
    </section>
  );
}
