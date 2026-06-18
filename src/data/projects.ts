// ─────────────────────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH for site content.
// Edit THIS file to change the site's text, projects, bio, and links.
// (Ask Claude Code: "add a new project to projects.ts" or "update my bio".)
// ─────────────────────────────────────────────────────────────────────────────

export const site = {
  name: "Neha Sehgal",
  role: "Product Designer",
  // Short tagline shown under the hero.
  tagline:
    "Product Designer at Google with 6+ years crafting human-centered, user-friendly experiences.",
  email: "neha.sehgal96@gmail.com",
  resumeUrl: "", // optional: drop a /resume.pdf in /public and set "/resume.pdf"
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/nehasehgal7/" },
    { label: "Instagram", href: "https://www.instagram.com/neha.sehgal7/" },
    {
      label: "YouTube",
      href: "https://www.youtube.com/channel/UCVMp2F3IjTUVZ9R2SPsv7wA",
    },
  ],
} as const;

export type Project = {
  slug: string;
  title: string;
  /** One-line summary shown on the card. */
  summary: string;
  /** Short category / discipline tag. */
  category: string;
  /** Image in /public/images (cover). */
  cover: string;
  /** Hex accent used for the card's hover glow. */
  accent: string;
  /** Optional year. */
  year?: string;
  // ── Case-study detail fields (STUBS — fill these in later) ──────────────────
  detail?: {
    role?: string;
    timeline?: string;
    team?: string;
    overview?: string; // the problem / context
    contributions?: string[]; // what she did
    outcome?: string; // impact / results
  };
};

export const projects: Project[] = [
  {
    slug: "awfis",
    title: "Awfis",
    summary: "Co-working space app for seamless collaboration and booking.",
    category: "Product Design · Mobile",
    cover: "/images/awfis.png",
    accent: "#FF7A59",
  },
  {
    slug: "google-ads",
    title: "Google Ads — Connect Sales",
    summary: "A CRM ecosystem with AI-driven sales automation.",
    category: "Product Design · Enterprise",
    cover: "/images/google-ads.png",
    accent: "#4285F4",
  },
  {
    slug: "nokia",
    title: "Nokia",
    summary: "A responsive platform for monetizing 5G network data.",
    category: "Product Design · Web",
    cover: "/images/nokia.png",
    accent: "#1FB6FF",
  },
  {
    slug: "pearl-academy",
    title: "Pearl Academy",
    summary: "iOS & Android app enhancing the student experience.",
    category: "Product Design · Mobile",
    cover: "/images/pearl-academy.png",
    accent: "#C6F24E",
  },
  {
    slug: "cradles-to-crayons",
    title: "Cradles to Crayons",
    summary: "A web platform that streamlines clothing donations.",
    category: "Product Design · Web · Social",
    cover: "/images/cradles-to-crayons.png",
    accent: "#FFB020",
  },
  {
    slug: "linkedin",
    title: "LinkedIn",
    summary: "A design case study on networking for students.",
    category: "Case Study · Concept",
    cover: "/images/linkedin.png",
    accent: "#0A66C2",
  },
  {
    slug: "give-and-grow",
    title: "Give & Grow",
    summary: "An app for exchanging gently-used children's products.",
    category: "Product Design · Mobile · Social",
    cover: "/images/give-and-grow.png",
    accent: "#7C5CFF",
  },
  {
    slug: "outline-india",
    title: "Outline India",
    summary: "A dashboard and mobile app for field survey management.",
    category: "Product Design · Data",
    cover: "/images/outline-india.png",
    accent: "#19C39C",
  },
  {
    slug: "rethinking-interaction",
    title: "Rethinking Interaction",
    summary: "A conceptual, pet-centric exploration of interaction design.",
    category: "Concept · Exploration",
    cover: "/images/rethinking-interaction.png",
    accent: "#FF5C8A",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
