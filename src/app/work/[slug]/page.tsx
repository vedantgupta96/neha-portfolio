import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, getProject, site } from "@/data/projects";

// Pre-render a static page per project at build time.
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — ${site.name}`,
    description: project.summary,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const d = project.detail;

  return (
    <article className="px-6 pb-28 pt-32">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/#work"
          className="text-sm text-muted transition-colors hover:text-foreground"
        >
          ← Back to work
        </Link>

        <p
          className="mt-10 text-xs font-medium uppercase tracking-wider"
          style={{ color: project.accent }}
        >
          {project.category}
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-6xl">
          {project.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">{project.summary}</p>

        <div className="relative mt-12 aspect-[16/9] overflow-hidden rounded-2xl border border-white/10">
          <Image
            src={project.cover}
            alt={`${project.title} cover`}
            fill
            sizes="(max-width: 896px) 100vw, 896px"
            priority
            className="object-cover"
          />
        </div>

        {/* ── Quick facts ─────────────────────────────────────────────── */}
        <dl className="mt-12 grid grid-cols-2 gap-6 border-y border-white/5 py-8 sm:grid-cols-4">
          {[
            { k: "Role", v: d?.role },
            { k: "Timeline", v: d?.timeline },
            { k: "Team", v: d?.team },
            { k: "Year", v: project.year },
          ].map((f) => (
            <div key={f.k}>
              <dt className="text-xs uppercase tracking-wider text-muted">
                {f.k}
              </dt>
              <dd className="mt-1 text-sm">{f.v ?? "—"}</dd>
            </div>
          ))}
        </dl>

        {/* ── Body. Fill project.detail in src/data/projects.ts ───────── */}
        {d?.overview || d?.contributions?.length || d?.outcome ? (
          <div className="mt-12 space-y-12">
            {d?.overview && (
              <section>
                <h2 className="font-display text-2xl font-bold">Overview</h2>
                <p className="mt-4 leading-relaxed text-muted">{d.overview}</p>
              </section>
            )}
            {d?.contributions?.length ? (
              <section>
                <h2 className="font-display text-2xl font-bold">
                  What I did
                </h2>
                <ul className="mt-4 space-y-2 text-muted">
                  {d.contributions.map((c, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="text-accent">→</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
            {d?.outcome && (
              <section>
                <h2 className="font-display text-2xl font-bold">Outcome</h2>
                <p className="mt-4 leading-relaxed text-muted">{d.outcome}</p>
              </section>
            )}
          </div>
        ) : (
          // Placeholder shown until the case study is written.
          <div className="mt-12 rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-10 text-center">
            <p className="font-display text-xl font-bold">
              Case study coming soon
            </p>
            <p className="mx-auto mt-3 max-w-md text-sm text-muted">
              Add the write-up for <strong>{project.title}</strong> by filling
              in the <code className="text-accent">detail</code> field for this
              project in{" "}
              <code className="text-accent">src/data/projects.ts</code>.
            </p>
          </div>
        )}

        <div className="mt-16 border-t border-white/5 pt-10">
          <Link
            href="/#contact"
            className="font-display text-2xl font-bold transition-colors hover:text-accent"
          >
            Like what you see? Let&rsquo;s talk →
          </Link>
        </div>
      </div>
    </article>
  );
}
