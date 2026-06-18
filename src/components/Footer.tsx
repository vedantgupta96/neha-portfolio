import { site } from "@/data/projects";

export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} {site.name}. Designed &amp; built with
          care.
        </p>
        <div className="flex gap-5">
          {site.socials.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-ink"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
