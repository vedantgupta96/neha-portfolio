import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, getProject, site, type Project } from "@/data/projects";

const imageAspect = {
  square: "aspect-square",
  wide: "aspect-[16/9]",
  panoramic: "aspect-[20/9]",
} as const;

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
    description: project.detail?.headline ?? project.summary,
  };
}

function getNextProject(project: Project) {
  const preferred = project.detail?.nextSlug
    ? getProject(project.detail.nextSlug)
    : undefined;
  if (preferred) return preferred;

  const index = projects.findIndex((p) => p.slug === project.slug);
  return projects[(index + 1) % projects.length];
}

function hasCaseStudy(project: Project) {
  const d = project.detail;
  return Boolean(
    d?.overview ||
      d?.problem ||
      d?.contributions?.length ||
      d?.features?.length ||
      d?.process?.length ||
      d?.metrics?.length ||
      d?.outcome
  );
}

function SectionHeading({
  eyebrow,
  title,
  body,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-5xl">
        {title}
      </h2>
      {body && <p className="mt-4 text-lg leading-relaxed text-muted">{body}</p>}
    </div>
  );
}

function ComingSoon({ project }: { project: Project }) {
  return (
    <div className="mt-12 rounded-lg border border-dashed border-border bg-surface p-10 text-center">
      <p className="font-display text-xl font-bold">Case study coming soon</p>
      <p className="mx-auto mt-3 max-w-md text-sm text-muted">
        Add the write-up for <strong>{project.title}</strong> by filling in the{" "}
        <code className="text-accent">detail</code> field for this project in{" "}
        <code className="text-accent">src/data/projects.ts</code>.
      </p>
    </div>
  );
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
  const nextProject = getNextProject(project);
  const quickFacts = [
    { k: "Role", v: d?.role },
    { k: "Timeline", v: d?.timeline },
    { k: "Team", v: d?.team },
    { k: "Status", v: d?.status ?? project.year },
  ].filter((fact) => fact.v);

  return (
    <article className="pb-28 pt-32">
      <section className="px-6">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/#work"
            className="text-sm text-muted transition-colors hover:text-ink"
          >
            ← Back to work
          </Link>

          <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: project.accent }}
              >
                {project.category}
              </p>
              <h1 className="mt-4 font-display text-5xl font-extrabold tracking-tight sm:text-7xl">
                {project.title}
              </h1>
              <p className="mt-6 max-w-3xl text-2xl leading-tight text-ink sm:text-3xl">
                {d?.headline ?? project.summary}
              </p>
              {d?.ndaNote && (
                <p className="mt-6 max-w-2xl rounded-lg border border-border bg-surface px-4 py-3 text-sm text-muted">
                  {d.ndaNote}
                </p>
              )}
            </div>

            {d?.metrics?.length ? (
              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {d.metrics.map((metric) => (
                  <div
                    key={`${metric.value}-${metric.label}`}
                    className="rounded-lg border border-border bg-surface p-5 shadow-[0_12px_36px_var(--shadow)]"
                  >
                    <p
                      className="font-display text-4xl font-extrabold"
                      style={{ color: project.accent }}
                    >
                      {metric.value}
                    </p>
                    <p className="mt-1 text-sm font-semibold">{metric.label}</p>
                    {metric.detail && (
                      <p className="mt-1 text-xs text-muted">{metric.detail}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="mt-16 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-border bg-paper shadow-[0_18px_50px_var(--shadow)]">
            <Image
              src={project.cover}
              alt={`${project.title} cover`}
              fill
              sizes="(max-width: 1152px) 100vw, 1152px"
              priority
              className="object-cover"
            />
          </div>

          {quickFacts.length ? (
            <dl className="mt-8 grid grid-cols-2 gap-6 border-y border-border py-8 md:grid-cols-4">
              {quickFacts.map((fact) => (
                <div key={fact.k}>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted">
                    {fact.k}
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed">{fact.v}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      </section>

      {hasCaseStudy(project) && d ? (
        <>
          <section className="mt-20 px-6">
            <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.78fr_1.22fr]">
              <SectionHeading eyebrow="Context" title="The challenge" />
              <div className="space-y-8 text-lg leading-relaxed text-muted">
                {d.overview && <p>{d.overview}</p>}
                {d.problem && (
                  <blockquote className="border-l-4 pl-5 font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
                    {d.problem}
                  </blockquote>
                )}
              </div>
            </div>
          </section>

          {d.contributions?.length ? (
            <section className="mt-20 px-6">
              <div className="mx-auto max-w-6xl border-t border-border pt-16">
                <SectionHeading
                  eyebrow="Role"
                  title="What Neha owned"
                  body="The work moved from stakeholder alignment to research, synthesis, interaction design, visual refinement, accessibility checks, and launch collaboration."
                />
                <ul className="mt-10 grid gap-4 md:grid-cols-2">
                  {d.contributions.map((contribution) => (
                    <li
                      key={contribution}
                      className="rounded-lg border border-border bg-surface p-5 text-sm leading-relaxed text-muted"
                    >
                      <span
                        className="mb-3 block h-2 w-2 rounded-full"
                        style={{ background: project.accent }}
                      />
                      {contribution}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ) : null}

          {d.features?.length ? (
            <section className="mt-20 px-6">
              <div className="mx-auto max-w-6xl border-t border-border pt-16">
                <SectionHeading
                  eyebrow="Solution"
                  title="Core product features"
                  body="The app connected the operational realities of a co-working space with the repeat actions users needed before, during, and after each visit."
                />
                <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {d.features.map((feature) => (
                    <div
                      key={feature.title}
                      className="rounded-lg border border-border bg-surface p-5"
                    >
                      <h3 className="font-display text-xl font-bold">
                        {feature.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted">
                        {feature.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          {d.images?.length ? (
            <section className="mt-20 px-6">
              <div className="mx-auto max-w-6xl border-t border-border pt-16">
                <SectionHeading eyebrow="Evidence" title="Selected visuals" />
                <div className="mt-10 grid gap-8 md:grid-cols-2">
                  {d.images.map((image, index) => (
                    <figure key={image.src} className={index > 1 ? "md:col-span-2" : undefined}>
                      <div
                        className={`relative overflow-hidden rounded-lg border border-border bg-paper ${
                          imageAspect[image.aspect ?? "wide"]
                        }`}
                      >
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          sizes={
                            index > 1
                              ? "(max-width: 1152px) 100vw, 1152px"
                              : "(max-width: 768px) 100vw, 50vw"
                          }
                          className={
                            image.aspect === "panoramic"
                              ? "object-contain"
                              : "object-contain p-4"
                          }
                        />
                      </div>
                      {image.caption && (
                        <figcaption className="mt-3 text-sm text-muted">
                          {image.caption}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          {d.process?.length ? (
            <section className="mt-20 px-6">
              <div className="mx-auto max-w-6xl border-t border-border pt-16">
                <SectionHeading
                  eyebrow="Process"
                  title="From ambiguity to a shipped product"
                />
                <div className="mt-10 divide-y divide-border">
                  {d.process.map((step, index) => (
                    <section
                      key={step.title}
                      className="grid gap-6 py-8 md:grid-cols-[160px_minmax(0,1fr)]"
                    >
                      <p
                        className="font-display text-5xl font-extrabold"
                        style={{ color: project.accent }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <div>
                        <h3 className="font-display text-2xl font-bold">
                          {step.title}
                        </h3>
                        <p className="mt-3 leading-relaxed text-muted">
                          {step.body}
                        </p>
                        {step.bullets?.length ? (
                          <ul className="mt-5 grid gap-2 text-sm text-muted sm:grid-cols-3">
                            {step.bullets.map((bullet) => (
                              <li
                                key={bullet}
                                className="rounded-lg border border-border bg-surface p-4"
                              >
                                {bullet}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    </section>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          {d.outcome && (
            <section className="mt-20 px-6">
              <div className="mx-auto max-w-6xl rounded-lg bg-surface p-8 shadow-[0_18px_50px_var(--shadow)] sm:p-10">
                <SectionHeading eyebrow="Impact" title="What changed" body={d.outcome} />
                {d.liveLinks?.length ? (
                  <div className="mt-8 flex flex-wrap gap-3">
                    {d.liveLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-border bg-bg px-5 py-3 text-sm font-semibold transition-colors hover:bg-ink hover:text-bg"
                      >
                        {link.label} ↗
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            </section>
          )}

          {d.reflections?.length ? (
            <section className="mt-20 px-6">
              <div className="mx-auto max-w-6xl border-t border-border pt-16">
                <SectionHeading eyebrow="Reflection" title="Learnings" />
                <div className="mt-10 grid gap-4 md:grid-cols-3">
                  {d.reflections.map((reflection) => (
                    <div
                      key={reflection.title}
                      className="rounded-lg border border-border bg-surface p-5"
                    >
                      <h3 className="font-display text-xl font-bold">
                        {reflection.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted">
                        {reflection.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ) : null}
        </>
      ) : (
        <section className="px-6">
          <div className="mx-auto max-w-4xl">
            <ComingSoon project={project} />
          </div>
        </section>
      )}

      <section className="mt-20 px-6">
        <div className="mx-auto max-w-6xl border-t border-border pt-10">
          <div className="grid gap-8 md:grid-cols-[1fr_1.25fr] md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                Next project
              </p>
              <Link
                href={`/work/${nextProject.slug}`}
                className="mt-2 block font-display text-3xl font-extrabold tracking-tight transition-colors hover:text-accent sm:text-4xl"
              >
                {nextProject.title} →
              </Link>
            </div>
            <Link
              href="/#contact"
              className="justify-self-start rounded-full bg-pink px-6 py-3 font-semibold text-white shadow-[0_10px_30px_var(--shadow)] transition-transform hover:scale-105 md:justify-self-end"
            >
              Like what you see? Let&rsquo;s talk →
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
