// File: data/projects.ts

export type projectType = {
  title: string;
  description: string;
  tech: string[];
  github: string; // view code
  href?: string; // live site (optional)
  imageSrc: string;
  imageAlt: string;
};

export const projects: projectType[] = [
  {
    title: "Machine Learning for Stolen Artifacts",
    description:
     "Machine Learning for Stolen Artifacts is a full-stack web portal for the Khmer Statuary Project that enables researchers to upload, search, and moderate Cambodian artifact images for provenance research. The platform features secure submissions, standardized metadata, and admin moderation tools to aid artifact identification and repatriation efforts.",
    tech: ["Next.js", "Tailwind CSS", "FastAPI", "PostgreSQL", "SQLAlchemy", "Cloud Storage", "Clerk"],
    github: "https://github.com/w1nsonly/se-stolen-artifacts",
    imageSrc: "/project_covers/KSP_logo.png",
    imageAlt: "KSP Logo",
  },
  {
    title: "Wallet Wrapped",
    description:
      "Wallet Wrapped transforms your financial data into personalized insights and beautiful visualizations. The app combines real banking data with AI-powered analytics to create your very own 'Financial Wrapped' experience, featuring interactive dashboards, goal tracking, and engaging spending insights.",
    tech: ["Next.js", "TypeScript", "MongoDB", "Tailwind CSS", "Google Gemini AI", "Capital One Nessie API"],
    github: "https://github.com/w1nsonly/wallet-wrapped",
    href: "https://walletwrapped.us",
    imageSrc: "/project_covers/wallet_wrapped.png",
    imageAlt: "Wallet Wrapped Website",
  },
  {
    title: "All In",
    description:
      "All In is a poker game management platform where players can create tables, invite friends, and track games in real time. The app enhances the social experience of online poker with smooth gameplay and community features.",
    tech: ["MongoDB", "Express", "React", "Node", "Railway", "Firebase"],
    github: "https://github.com/w1nsonly/allin",
    href: "https://all-in-4ce60.web.app/",
    imageSrc: "/project_covers/all_in.png",
    imageAlt: "All In MERN Website",
  },
  {
    title: "City King Buffet",
    description:
      "City King Buffet is a modern website for a family-owned restaurant, featuring real-time menu updates and an AI-powered chatbot for customer support. The site creates a smooth and engaging online dining experience.",
    tech: ["Next.js", "Django REST", "LangChain", "OpenAI", "Chroma"],
    github: "https://github.com/w1nsonly/city-king-buffet",
    href: "http://citykingbuffetky.com/",
    imageSrc: "/project_covers/city_king_buffet.png",
    imageAlt: "City King Buffet Image",
  },
  {
    title: "Boston Shooting Data Dashboard",
    description:
      "The Boston Shooting Data Dashboard is an interactive tool that visualizes over 2,000 shooting incidents across the city. Users can filter by year, neighborhood, demographics, and victim count, and explore insights with maps, graphs, and tables.",
    tech: [
      "React",
      "TypeScript",
      "Leaflet",
      "GeoJSON",
      "Styled-Components",
      "Chart.js",
    ],
    github: "https://github.com/w1nsonly/BostonShootingData",
    href: "https://cs391-final-project-rho.vercel.app/",
    imageSrc: "/project_covers/boston_shooting.png",
    imageAlt: "Data dashboard showing Boston shooting incidents",
  },
  {
    title: "Airbnb Price Prediction",
    description:
      "Airbnb Price Prediction is a machine learning app that estimates rental prices in New York City. It highlights how factors like location, amenities, and host details influence pricing through data-driven insights and feature analysis.",
    tech: ["Python", "pandas", "Scikit-Learn"],
    github: "https://github.com/w1nsonly",
    imageSrc: "/project_covers/airbnb_price_prediction.png",
    imageAlt: "Machine learning predictions for Airbnb pricing",
  },
];
