"use client";

import { ReactNode } from "react";

interface CenteredContainerProps {
  children: ReactNode;
  maxWidth?: string;
}

export default function CenteredContainer({
  children,
  maxWidth = "max-w-4xl",
}: CenteredContainerProps) {
  return (
    <section className="flex min-h-[85vh] items-center justify-center py-8">
      <div
        className={`w-full ${maxWidth} rounded-3xl border border-slate-700 bg-slate-900/60 p-8 backdrop-blur`}
      >
        {children}
      </div>
    </section>
  );
}