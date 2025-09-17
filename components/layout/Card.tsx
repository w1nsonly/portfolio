// File: components/layout/Card.tsx

import React from "react";
import { BG_ELEVATED } from "@/theme/constants";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-2xl p-4 ${BG_ELEVATED} shadow-md shadow-black/30 ${className}`}
    >
      {children}
    </div>
  );
}
