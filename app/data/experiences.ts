// File: data/experiences.ts
export type Experience = {
  company: string;
  position: string;
  date: string;
  bullets: string[];
  tech: string[];
};

export const experiences: Experience[] = [
  {
    company: "Biteset",
    position: "Founding Software Engineer",
    date: "Apr 2026 - Present",
    bullets: [
      "Building a cross-platform fitness and nutrition app solo, from mobile UI to backend sync.",
      "Using AI to generate personalized workout and nutrition recommendations for users.",
    ],
    tech: ["React Native", "Expo Router", "TypeScript", "Supabase", "Claude API", "Sentry"],
  },
  {
    company: "BU Spark",
    position: "Full Stack Engineer",
    date: "Sep 2025 - Dec 2025",
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
    bullets: [
      "Built an AI-powered employee engagement platform with interactive network visualizations.",
      "Shipped chat and analytics features for a full-stack SaaS product.",
    ],
    tech: ["Vertex AI", "D3.js", "TypeScript", "Node.js"],
  },
  {
    company: "City King Buffet",
    position: "Software Engineer (Contract)",
    date: "Jul 2025 - Aug 2025",
    bullets: [
      "Built a full-stack restaurant website with a dynamically managed menu.",
      "Deployed an AI support chatbot to answer common customer questions.",
    ],
    tech: ["Next.js", "Django REST", "OpenAI API", "LangChain", "Chroma"],
  },
  {
    company: "Buds Gun Shop",
    position: "Inventory Data Management Intern",
    date: "Mar 2022 - May 2022",
    bullets: [
      "Cleaned and reconciled inventory data across catalog listings to improve accuracy for online and in-store systems.",
      "Automated repetitive data-entry and reporting workflows in Excel, reducing manual processing time for the team.",
    ],
    tech: ["Excel", "SQL"],
  },
];
