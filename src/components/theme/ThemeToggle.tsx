"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      className="relative grid h-10 w-10 place-items-center rounded-full border border-border bg-surface text-ink transition-colors hover:bg-bg-2"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 14, opacity: 0, rotate: -40 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -14, opacity: 0, rotate: 40 }}
          transition={{ type: "spring", stiffness: 500, damping: 18 }}
          className="text-lg leading-none"
        >
          {isDark ? "☀️" : "🌙"}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
