"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Project } from "@/data/projects";

// Pick black or white text for legibility on a given hex background.
function inkOn(hex: string): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const L = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return L > 0.6 ? "#17142e" : "#ffffff";
}

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Alternating columns drift in opposite directions as you scroll.
  const dir = index % 2 === 0 ? -1 : 1;
  const y = useTransform(scrollYProgress, [0, 1], [40 * dir, -40 * dir]);

  const fg = inkOn(project.accent);

  return (
    <motion.div ref={ref} style={{ y }}>
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ type: "spring", stiffness: 90, damping: 14 }}
      >
        <Link href={`/work/${project.slug}`} className="group block">
          <motion.div
            whileHover={{ scale: 1.03, rotate: dir * 0.8 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 14 }}
            className="overflow-hidden rounded-3xl p-3 shadow-[0_18px_50px_var(--shadow)]"
            style={{ background: project.accent, color: fg }}
          >
            {/* white paper panel holding the cover */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-paper">
              <Image
                src={project.cover}
                alt={`${project.title} cover`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              />

              {/* Figma-style selection redlines — a designer's wink, on hover. */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              >
                {/* selection frame */}
                <div className="absolute inset-0.75 rounded-2xl border-[1.5px] border-blue" />
                {/* corner handles */}
                {["left-[1px] top-[1px]", "right-[1px] top-[1px]", "left-[1px] bottom-[1px]", "right-[1px] bottom-[1px]"].map(
                  (pos) => (
                    <span
                      key={pos}
                      className={`absolute ${pos} h-2 w-2 rounded-xs border-[1.5px] border-blue bg-white`}
                    />
                  )
                )}
                {/* layer-name tag */}
                <span className="absolute left-2 top-2 rounded-sm bg-blue px-1.5 py-0.5 font-mono text-[10px] font-medium leading-none text-white">
                  {project.title}
                </span>
                {/* width × height dimension pill */}
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-sm bg-pink px-1.5 py-0.5 font-mono text-[10px] font-medium leading-none text-white">
                  720 × 450
                </span>
              </div>
            </div>

            <div className="flex items-start justify-between gap-4 px-3 py-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-xs font-semibold uppercase tracking-wider opacity-80">
                    {project.category}
                  </p>
                  {project.detail && (
                    <span className="rounded-full border border-current px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider opacity-80">
                      Full case study
                    </span>
                  )}
                </div>
                <h3 className="mt-1 font-display text-2xl font-extrabold tracking-tight">
                  {project.title}
                </h3>
                <p className="mt-1 max-w-md text-sm opacity-90">
                  {project.summary}
                </p>
              </div>
              <span className="mt-1 shrink-0 text-xl transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </div>
          </motion.div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
