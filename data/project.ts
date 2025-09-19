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
      "All In is a poker game management platform where players can create tables, invite friends, and track games in real time. The app enhances the social experience of online poker with smooth gameplay and community features.",
    tech: ["MongoDB", "Express", "React", "Node", "Railway", "Firebase"],
    github: "https://github.com/w1nsonly/allin",
    href: "https://all-in-4ce60.web.app/",
    imageSrc: "/all_in_website.png",
    imageAlt: "All In MERN Website",
  },
  {
    title: "City King Buffet",
    description:
      "City King Buffet is a modern website for a family-owned restaurant, featuring real-time menu updates and an AI-powered chatbot for customer support. The site creates a smooth and engaging online dining experience.",
    tech: ["Next.js", "Django REST", "LangChain", "OpenAI", "Chroma"],
    github: "https://github.com/w1nsonly/city-king-buffet",
    href: "http://citykingbuffetky.com/",
    imageSrc: "/city_king_buffet.png",
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
    imageSrc: "/boston_shooting_website.png",
    imageAlt: "Data dashboard showing Boston shooting incidents",
  },
  {
    title: "Airbnb Price Prediction",
    description:
      "Airbnb Price Prediction is a machine learning app that estimates rental prices in New York City. It highlights how factors like location, amenities, and host details influence pricing through data-driven insights and feature analysis.",
    tech: ["Python", "pandas", "Scikit-Learn"],
    github: "https://github.com/w1nsonly",
    imageSrc: "/airbnb.png",
    imageAlt: "Machine learning predictions for Airbnb pricing",
  },
];
