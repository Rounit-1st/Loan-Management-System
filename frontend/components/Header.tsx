"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

interface HeaderProps {
  items: string[];
  urls: string[];
}

export default function Header({
  items,
  urls,
}: HeaderProps) {
  const router = useRouter();

  return (
    <header className="border-b border-slate-800">
      <div className="container mx-auto flex items-center justify-between px-6 py-6">
        <Link href="/">
          <h1 className="text-2xl font-bold text-white">
            Loan
            <span className="text-cyan-400">
              Flow
            </span>
          </h1>
        </Link>

        <div className="flex items-center gap-3">
          {items.map((item, index) => (
            <button
              key={item}
              onClick={() =>
                router.push(urls[index])
              }
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-400 hover:bg-slate-800 hover:text-cyan-400"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}