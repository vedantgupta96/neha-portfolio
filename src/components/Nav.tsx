"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { site } from "@/data/projects";
import ThemeToggle from "./theme/ThemeToggle";

const links = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-md bg-bg/60 border-b border-border" : ""
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-lg font-extrabold tracking-tight">
          {site.name}
          <span className="text-pink">.</span>
        </Link>
        <div className="flex items-center gap-1 text-sm">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="hidden rounded-full px-4 py-2 text-muted transition-colors hover:text-ink sm:block"
            >
              {l.label}
            </Link>
          ))}
          <div className="ml-1">
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}
