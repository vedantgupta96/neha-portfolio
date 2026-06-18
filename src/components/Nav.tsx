"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { site } from "@/data/projects";

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
        scrolled
          ? "backdrop-blur-md bg-background/70 border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-display text-lg font-bold tracking-tight"
        >
          {site.name}
          <span className="text-accent">.</span>
        </Link>
        <div className="flex items-center gap-1 text-sm">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-muted transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
          <a
            href={`mailto:${site.email}`}
            className="ml-2 rounded-full bg-accent px-4 py-2 font-medium text-background transition-transform hover:scale-105"
          >
            Let&rsquo;s talk
          </a>
        </div>
      </nav>
    </header>
  );
}
