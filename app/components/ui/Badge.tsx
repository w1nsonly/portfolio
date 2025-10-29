// File: app/components/ui/Badge.tsx

import React from "react";

export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full px-3 py-1 text-xs font-medium bg-zinc-800 text-zinc-200">
      {children}
    </span>
  );
}
