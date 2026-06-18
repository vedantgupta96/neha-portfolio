"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.08 }}
    >
      <Link
        href={`/work/${project.slug}`}
        className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-card"
      >
        {/* accent glow on hover */}
        <div
          className="pointer-events-none absolute -inset-px z-10 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ boxShadow: `inset 0 0 0 1px ${project.accent}66` }}
        />
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={project.cover}
            alt={`${project.title} cover`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        <div className="flex items-start justify-between gap-4 p-6">
          <div>
            <p
              className="mb-2 text-xs font-medium uppercase tracking-wider"
              style={{ color: project.accent }}
            >
              {project.category}
            </p>
            <h3 className="font-display text-2xl font-bold tracking-tight">
              {project.title}
            </h3>
            <p className="mt-1.5 max-w-md text-sm text-muted">
              {project.summary}
            </p>
          </div>
          <span className="mt-1 shrink-0 text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-foreground">
            ↗
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
