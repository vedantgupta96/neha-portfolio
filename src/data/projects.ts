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
    headline?: string;
    status?: string;
    role?: string;
    timeline?: string;
    team?: string;
    ndaNote?: string;
    overview?: string;
    problem?: string;
    contributions?: string[];
    outcome?: string;
    metrics?: {
      value: string;
      label: string;
      detail?: string;
    }[];
    liveLinks?: {
      label: string;
      href: string;
    }[];
    images?: {
      src: string;
      alt: string;
      caption?: string;
      aspect?: "square" | "wide" | "panoramic";
    }[];
    features?: {
      title: string;
      body: string;
    }[];
    process?: {
      title: string;
      body: string;
      bullets?: string[];
    }[];
    reflections?: {
      title: string;
      body: string;
    }[];
    nextSlug?: string;
  };
};

export const projects: Project[] = [
  {
    slug: "awfis",
    title: "Awfis",
    summary:
      "Co-working space app for booking, access, support, food ordering, and community workflows.",
    category: "Product Design · Mobile",
    cover: "/images/awfis.png",
    accent: "#ff4d8d",
    year: "Shipped",
    detail: {
      headline:
        "A one-stop workspace app for entrepreneurs, enterprises, and flexible teams.",
      status: "Industry project · Shipped & Live",
      role: "Product Designer",
      timeline: "Workshop, research, design, testing, launch",
      team: "CEO, CTO, product owners, marketing, developers",
      ndaNote:
        "This project is protected by NDA, so only public, high-level information is shown.",
      overview:
        "Awfis is an Indian co-working space provider for startups, freelancers, entrepreneurs, and enterprises. Neha contributed to Awfis Flex Workspaces, focusing on a sharing-economy model for immediate bookings and a smoother workplace experience.",
      problem:
        "How might we design a co-working app that facilitates collaboration, simplifies booking and payment, and offers networking opportunities to entrepreneurs?",
      contributions: [
        "Partnered with client stakeholders in a three-day workshop to clarify product vision, business goals, benchmarks, and expectations.",
        "Combined surveys, interviews, observational research, affinity mapping, and on-site competitive analysis to identify user needs.",
        "Mapped onboarding, KYC, daily workplace journeys, and customer touchpoints across the physical and digital workspace experience.",
        "Explored navigation concepts, prioritized core tasks, refined visual design, and tested iterations with users.",
        "Checked color contrast with WebAIM against WCAG AA and reduced cognitive load with clearer typography and calmer visual treatment.",
      ],
      outcome:
        "The revised experience increased average task completion from 47% to 90%, increased application traffic by 14.87%, and helped user adoption grow from 2k to 7.6k.",
      metrics: [
        {
          value: "90%",
          label: "average task completion",
          detail: "up from 47% after testing and reprioritization",
        },
        {
          value: "14.87%",
          label: "increase in application traffic",
        },
        {
          value: "3.8x",
          label: "growth in user adoption",
          detail: "from 2k to 7.6k users",
        },
      ],
      liveLinks: [
        {
          label: "Google Play",
          href: "https://play.google.com/store/apps/details?id=com.awfis.mobile&pli=1",
        },
        {
          label: "App Store",
          href: "https://apps.apple.com/us/app/awfis-coworking/id1027252650",
        },
      ],
      images: [
        {
          src: "/images/awfis-mockup.png",
          alt: "Awfis mobile app mockups",
          caption: "Public Awfis app mockups from the shipped case study.",
          aspect: "square",
        },
        {
          src: "/images/awfis-design-thinking.png",
          alt: "Awfis design thinking process diagram",
          caption: "Workshop and research process used to frame the product direction.",
          aspect: "wide",
        },
        {
          src: "/images/awfis-user-journey.png",
          alt: "Awfis user journey map",
          caption: "Journey mapping connected digital touchpoints to the physical workspace.",
          aspect: "panoramic",
        },
        {
          src: "/images/awfis-live-app.png",
          alt: "Awfis live application screens",
          caption: "The live application experience across core workplace tasks.",
          aspect: "panoramic",
        },
      ],
      features: [
        {
          title: "Security",
          body: "One-time identity verification with government-issued ID to strengthen entry management, safety, and trust.",
        },
        {
          title: "Persistent Access Card",
          body: "A sticky access card kept essential workspace tools available without forcing users to hunt through the app.",
        },
        {
          title: "Simplified Booking",
          body: "Users could book rooms, review amenities, pay in app, and see upcoming bookings directly on the home page.",
        },
        {
          title: "Food & Beverage",
          body: "Snack and meal ordering supported self-pickup or delivery to a meeting room or desk.",
        },
        {
          title: "Ticketing",
          body: "Open and new tickets surfaced on the landing page with categories and notification-based status updates.",
        },
        {
          title: "Notifications & Location",
          body: "Location selection and schedule-aware notifications personalized services for each workspace visit.",
        },
      ],
      process: [
        {
          title: "Stakeholder workshop",
          body: "A three-day workshop with leadership, product, marketing, and engineering teams aligned the app around the business model, product goals, competitive landscape, and launch expectations.",
          bullets: [
            "Defined the product vision and opportunity statement.",
            "Captured business goals and stakeholder expectations.",
            "Mapped the system around user, workspace, and service needs.",
          ],
        },
        {
          title: "Research and synthesis",
          body: "Surveys, interviews, observation, and affinity mapping turned co-working behaviors into design priorities.",
          bullets: [
            "Surveyed 100+ co-working users for behavioral themes.",
            "Interviewed 20 users to validate survey findings.",
            "Identified needs around seamless booking, community, amenities, safety, and flexible workspaces.",
          ],
        },
        {
          title: "Journey and flow mapping",
          body: "The team mapped onboarding from app download through KYC verification, then charted daily workplace journeys across parking, access, meetings, food, support, and events.",
        },
        {
          title: "Concept exploration",
          body: "Navigation concepts were benchmarked against competitor apps and iterated until the team chose a homepage-led model with the access card up front and personalized actions below.",
        },
        {
          title: "Testing and iteration",
          body: "Two rounds of user testing exposed workflow friction, transparency gaps, and consistency issues. The final design reprioritized tasks, clarified the interface, and raised average task completion from 47% to 90%.",
        },
      ],
      reflections: [
        {
          title: "Research methods",
          body: "Using surveys, interviews, and observational methods together helped confirm assumptions with both quantitative and qualitative evidence.",
        },
        {
          title: "What Neha learned",
          body: "Working with stakeholders, consultants, and developers clarified the full product design-to-launch cycle.",
        },
        {
          title: "What she would change",
          body: "Further prioritize one feature set at a time to reduce complexity and make the experience easier for users to understand quickly.",
        },
      ],
      nextSlug: "cradles-to-crayons",
    },
  },
  {
    slug: "google-ads",
    title: "Google Ads — Connect Sales",
    summary: "A CRM ecosystem with AI-driven sales automation.",
    category: "Product Design · Enterprise",
    cover: "/images/google-ads.png",
    accent: "#5a6cff",
  },
  {
    slug: "nokia",
    title: "Nokia",
    summary: "A responsive platform for monetizing 5G network data.",
    category: "Product Design · Web",
    cover: "/images/nokia.png",
    accent: "#57e2ff",
  },
  {
    slug: "pearl-academy",
    title: "Pearl Academy",
    summary: "iOS & Android app enhancing the student experience.",
    category: "Product Design · Mobile",
    cover: "/images/pearl-academy.png",
    accent: "#b6e948",
  },
  {
    slug: "cradles-to-crayons",
    title: "Cradles to Crayons",
    summary: "A web platform that streamlines clothing donations.",
    category: "Product Design · Web · Social",
    cover: "/images/cradles-to-crayons.png",
    accent: "#ffd23f",
  },
  {
    slug: "linkedin",
    title: "LinkedIn",
    summary: "A design case study on networking for students.",
    category: "Case Study · Concept",
    cover: "/images/linkedin.png",
    accent: "#c99bf7",
  },
  {
    slug: "give-and-grow",
    title: "Give & Grow",
    summary: "An app for exchanging gently-used children's products.",
    category: "Product Design · Mobile · Social",
    cover: "/images/give-and-grow.png",
    accent: "#ff4d8d",
  },
  {
    slug: "outline-india",
    title: "Outline India",
    summary: "A dashboard and mobile app for field survey management.",
    category: "Product Design · Data",
    cover: "/images/outline-india.png",
    accent: "#57e2ff",
  },
  {
    slug: "rethinking-interaction",
    title: "Rethinking Interaction",
    summary: "A conceptual, pet-centric exploration of interaction design.",
    category: "Concept · Exploration",
    cover: "/images/rethinking-interaction.png",
    accent: "#b6e948",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
