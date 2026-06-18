"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { site } from "@/data/projects";

const stats = [
  { value: "6+", label: "Years experience", color: "var(--pink)" },
  { value: "9", label: "Case studies", color: "var(--cyan)" },
  { value: "∞", label: "Cups of coffee", color: "var(--yellow)" },
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 rounded-[2rem] bg-paper p-8 text-paper-ink shadow-[0_24px_70px_var(--shadow)] sm:p-12 md:grid-cols-[260px_1fr] md:gap-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -6 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -3 }}
            viewport={{ once: true }}
            whileHover={{ rotate: 0, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 180, damping: 12 }}
            className="relative mx-auto h-56 w-56 overflow-hidden rounded-3xl ring-4 ring-lime md:mx-0"
          >
            <Image
              src="/images/avatar.png"
              alt={site.name}
              fill
              sizes="224px"
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
              Hey, I&rsquo;m Neha
              <span className="text-pink"> 👋</span>
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper-ink/70">
              A {site.role.toLowerCase()} at Google with over six years of
              experience. I turn complex problems into experiences that feel
              effortless — across enterprise tools, consumer mobile apps, and
              social-impact platforms. I care about the details most people
              never notice.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 140, delay: i * 0.08 }}
                  className="rounded-2xl p-4"
                  style={{ background: `${s.color}22` }}
                >
                  <div
                    className="font-display text-3xl font-extrabold"
                    style={{ color: s.color }}
                  >
                    {s.value}
                  </div>
                  <div className="mt-1 text-sm text-paper-ink/60">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
