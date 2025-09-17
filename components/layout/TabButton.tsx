// File: components/layout/TabButton.tsx

"use client";
import React from "react";
import { TEXT_MUTED } from "@/theme/constants";

interface TabButtonProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export default function TabButton({
  icon: Icon,
  label,
  active = false,
  onClick,
}: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg transition-colors ${
        active
          ? "bg-zinc-800 text-white"
          : `${TEXT_MUTED} hover:text-white hover:bg-zinc-800`
      }`}
      aria-current={active ? "page" : undefined}
      type="button"
    >
      <Icon size={18} />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}
