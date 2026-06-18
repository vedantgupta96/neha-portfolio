"use client";

import { motion } from "framer-motion";

type Shape = {
  type: "blob" | "star" | "ring";
  color: string;
  size: number;
  top: string;
  left: string;
  delay: number;
};

const shapes: Shape[] = [
  { type: "blob", color: "var(--pink)", size: 90, top: "18%", left: "8%", delay: 0 },
  { type: "ring", color: "var(--cyan)", size: 70, top: "62%", left: "12%", delay: 0.4 },
  { type: "star", color: "var(--yellow)", size: 46, top: "28%", left: "86%", delay: 0.2 },
  { type: "blob", color: "var(--lime)", size: 64, top: "72%", left: "82%", delay: 0.6 },
  { type: "ring", color: "var(--lavender)", size: 52, top: "44%", left: "92%", delay: 0.8 },
];

export default function FloatingShapes() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-[5] overflow-hidden">
      {shapes.map((s, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top: s.top, left: s.left, width: s.size, height: s.size }}
          animate={{ y: [0, -22, 0], rotate: [0, 12, 0] }}
          transition={{
            duration: 5 + i,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {s.type === "blob" && (
            <div
              className="h-full w-full rounded-[42%_58%_60%_40%/45%_45%_55%_55%] opacity-70 blur-[1px]"
              style={{ background: s.color }}
            />
          )}
          {s.type === "ring" && (
            <div
              className="h-full w-full rounded-full opacity-70"
              style={{ border: `6px solid ${s.color}` }}
            />
          )}
          {s.type === "star" && (
            <svg viewBox="0 0 24 24" className="h-full w-full opacity-80">
              <path
                d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z"
                fill={s.color}
              />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
}
