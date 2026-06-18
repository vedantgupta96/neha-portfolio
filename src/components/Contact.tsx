"use client";

import { motion } from "framer-motion";
import { site } from "@/data/projects";

export default function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-white/5 px-6 py-28 sm:py-40"
    >
      <div className="mx-auto max-w-6xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-sm uppercase tracking-[0.3em] text-muted"
        >
          Let&rsquo;s build something
        </motion.p>

        <motion.a
          href={`mailto:${site.email}`}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-6 inline-block font-display text-4xl font-bold tracking-tight transition-colors hover:text-accent sm:text-6xl md:text-7xl"
        >
          {site.email}
        </motion.a>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {site.socials.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium transition-colors hover:bg-white/5"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
