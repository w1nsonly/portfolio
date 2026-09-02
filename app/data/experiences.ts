// File: data/experiences.ts
export type Experience = {
  company: string;
  /** Company site — renders the company name as a link in the row */
  href?: string;
  position: string;
  date: string;
  dateShort: string;
  /** Supports inline markdown-style links: [label](https://url) */
  bullets: string[];
  tech: string[];
};

export const experiences: Experience[] = [
  {
    company: "Bufound",
    href: "https://bufound.com",
    position: "Founder & Software Engineer",
    date: "Apr 2026 - Present",
    dateShort: "Apr '26 – Present",
    bullets: [
      "Founded Bufound, an independent software studio, and built [Biteset](https://biteset.app), a cross-platform workout and nutrition tracking app, as the sole engineer.",
      "Designed the sync layer and adaptive calorie targets, with AI-personalized guidance.",
    ],
    tech: ["React Native", "Expo Router", "TypeScript", "Supabase", "Claude API", "Sentry"],
  },
  {
    company: "BU Spark",
    position: "Full Stack Engineer",
    date: "Sep 2025 - Dec 2025",
    dateShort: "Sep '25 – Dec '25",
    bullets: [
      "Built an artifact upload and search pipeline for a university research platform.",
      "Added admin review tooling and role-based access controls for research staff.",
    ],
    tech: ["Next.js", "Supabase", "PostgreSQL", "Clerk", "TypeScript"],
  },
  {
    company: "Human Laier",
    position: "Software Engineer Intern",
    date: "Sep 2025 - Dec 2025",
    dateShort: "Sep '25 – Dec '25",
    bullets: [
      "Built an AI-powered employee engagement platform with interactive network visualizations.",
      "Shipped chat and analytics features for a full-stack SaaS product.",
    ],
    tech: ["Vertex AI", "D3.js", "TypeScript", "Node.js"],
  },
  {
    company: "City King Buffet",
    href: "https://citykingbuffetky.com/",
    position: "Software Engineer (Contract)",
    date: "Jul 2025 - Aug 2025",
    dateShort: "Jul '25 – Aug '25",
    bullets: [
      "Built a full-stack restaurant website with a dynamically managed menu.",
      "Deployed an AI support chatbot to answer common customer questions.",
    ],
    tech: ["Next.js", "Django REST", "OpenAI API", "LangChain", "Chroma"],
  },
  {
    company: "Buds Gun Shop",
    href: "https://www.budsgunshop.com/",
    position: "Data Analyst Intern",
    date: "Mar 2022 - May 2022",
    dateShort: "Mar '22 – May '22",
    bullets: [
      "Cleaned and reconciled inventory data across catalog listings to improve accuracy for online and in-store systems.",
      "Automated repetitive data-entry and reporting workflows in Excel, reducing manual processing time for the team.",
    ],
    tech: ["Excel", "SQL"],
  },
];
