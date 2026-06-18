"use client";

import { motion } from "framer-motion";
import { site } from "@/data/projects";

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 90, damping: 14 }}
          className="rounded-[2.5rem] bg-blue px-8 py-20 text-center text-white shadow-[0_24px_70px_var(--shadow)] sm:px-12"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/80">
            Let&rsquo;s build something
          </p>

          <motion.a
            href={`mailto:${site.email}`}
            whileHover={{ scale: 1.04, rotate: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 12 }}
            className="mt-6 inline-block font-display text-3xl font-extrabold tracking-tight break-words sm:text-6xl"
          >
            {site.email}
          </motion.a>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {site.socials.map((s) => (
              <motion.a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.08, y: -3 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 12 }}
                className="rounded-full bg-white/15 px-6 py-3 text-sm font-semibold backdrop-blur-sm transition-colors hover:bg-white/25"
              >
                {s.label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
