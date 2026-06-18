"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { site } from "@/data/projects";

const stats = [
  { value: "6+", label: "Years of experience" },
  { value: "9", label: "Shipped case studies" },
  { value: "∞", label: "Cups of coffee" },
];

export default function About() {
  return (
    <section
      id="about"
      className="scroll-mt-24 border-t border-white/5 px-6 py-24 sm:py-32"
    >
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[260px_1fr] md:gap-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto h-52 w-52 overflow-hidden rounded-2xl border border-white/10 md:mx-0"
        >
          <Image
            src="/images/avatar.png"
            alt={site.name}
            fill
            sizes="208px"
            className="object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            About
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            I&rsquo;m {site.name}, a {site.role.toLowerCase()} at Google with
            over six years of experience. I&rsquo;m dedicated to crafting
            user-friendly, human-centered designs — turning complex problems
            into experiences that feel effortless. My work spans enterprise
            tools, consumer mobile apps, and social-impact platforms.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-white/5 pt-8">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl font-bold text-accent">
                  {s.value}
                </div>
                <div className="mt-1 text-sm text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
