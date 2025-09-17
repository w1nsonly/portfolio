// File: components/ui/SpotifyPortfolio.tsx

"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home as HomeIcon,
  Briefcase,
  User as UserIcon,
  Mail,
} from "lucide-react";

import Sidebar from "./layout/Sidebar";
import NowPlayingBar from "./layout/NowPlayerBar";
import HomeSection from "./sections/Home";
import WorkSection from "./sections/Work";
import AboutSection from "./sections/About";
import ContactSection from "./sections/Contact";
import { BG, SPOTIFY_GREEN } from "@/theme/constants";

const tabs = [
  { key: "Home", icon: HomeIcon },
  { key: "Work", icon: Briefcase },
  { key: "About", icon: UserIcon },
  { key: "Contact", icon: Mail },
];

export default function SpotifyPortfolio() {
  const [active, setActive] = React.useState<string>("Home");

  const render = () => {
    switch (active) {
      case "Home":
        return <HomeSection />;
      case "Work":
        return <WorkSection />;
      case "About":
        return <AboutSection />;
      case "Contact":
        return <ContactSection />;
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen ${BG} text-white`}>
      {/* Top border glow */}
      <div
        className="fixed inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${SPOTIFY_GREEN}, transparent)`,
        }}
      />

      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 pt-6 pb-28">
        <div className="grid grid-cols-12 gap-6">
          <Sidebar tabs={tabs} active={active} onChange={setActive} />

          <main className="col-span-12 md:col-span-9 xl:col-span-10 space-y-6">
            <header className="flex items-center justify-center text-center justify-between">
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                {active}
              </h1>
            </header>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {render()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>

      <NowPlayingBar />
    </div>
  );
}
