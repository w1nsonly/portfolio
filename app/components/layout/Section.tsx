// File: app/components/layout/Section.tsx

import React from "react";
import Card from "./Card";
import { TEXT_MUTED } from "@/app/theme/constants";

interface SectionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function Section({ title, subtitle, children }: SectionProps) {
  return (
    <Card className="border border-zinc-800/60">
      <div className="flex flex-col items-center justify-center text-center mb-6">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        {subtitle && <p className={`${TEXT_MUTED} text-sm mt-1`}>{subtitle}</p>}
      </div>
      {children}
    </Card>
  );
}
