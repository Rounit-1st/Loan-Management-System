"use client";

import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

export default function Container({
  children,
}: ContainerProps) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-6">
        {children}
      </div>
    </main>
  );
}