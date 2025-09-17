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
    title: "All In — MERN App",
    description:
      "Developed and deployed a full-stack MERN platform on Railway, Firebase Hosting, and MongoDB Atlas, supporting authentication and game community features. Implemented game management, invitations, and real-time updates, enhancing user experience and reliability.",
    tech: ["MongoDB", "Express", "React", "Node", "Railway", "Firebase"],
    github: "https://github.com/w1nsonly",
    href: "https://all-in-4ce60.web.app/",
    imageSrc: "/all_in_website.png",
    imageAlt: "All In MERN Website",
  },
  {
    title: "City King Buffet",
    description:
      "Next.js + Django REST site for my family's restaurant with AI support chatbot (LangChain + OpenAI + Chroma). Built real-time menu updates and streamlined online experience.",
    tech: ["Next.js", "Django REST", "LangChain", "OpenAI", "Chroma"],
    github: "https://github.com/w1nsonly/city-king-buffet",
    href: "http://citykingbuffetky.com/",
    imageSrc: "/city_king_buffet.png",
    imageAlt: "City King Buffet Image",
  },
  {
    title: "Boston Shooting Data Dashboard",
    description:
      "Built a React/TypeScript dashboard to fetch & filter 2,000 Boston shooting incidents by year, neighborhood, type, gender, race, and multi-victim status. Used Leaflet+GeoJSON for neighborhood selection; Styled-Components for Card/Table/Graph views; and Chart.js for yearly trend visualization.",
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
    imageSrc: "/boston_shooting_website.png",
    imageAlt: "Data dashboard showing Boston shooting incidents",
  },
  {
    title: "Airbnb Price Prediction",
    description:
      "Developed an end-to-end pipeline to predict NYC Airbnb prices with a Random Forest regressor (R² ≈ 0.71). Cleaned & merged 28,000 listings, engineered features (amenities, location, host/review metrics), log-transformed price, and plotted top feature importances.",
    tech: ["Python", "pandas", "Scikit-Learn"],
    github: "https://github.com/w1nsonly",
    imageSrc: "/airbnb.png",
    imageAlt: "Machine learning predictions for Airbnb pricing",
  },
];
