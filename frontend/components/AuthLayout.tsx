import Link from "next/link";
import { ReactNode } from "react";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthLayout({
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-6">
        {/* Navbar */}
        <nav className="flex items-center justify-between py-6">
          <Link href="/">
            <h1 className="text-2xl font-bold">
              Loan<span className="text-cyan-400">Flow</span>
            </h1>
          </Link>

          <Link
            href="/"
            className="rounded-lg border border-slate-700 px-4 py-2 hover:bg-slate-800"
          >
            Home
          </Link>
        </nav>

        <section className="flex min-h-[85vh] items-center justify-center">
          <div className="w-full max-w-md rounded-3xl border border-slate-700 bg-slate-900/60 p-8 backdrop-blur">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold">{title}</h1>

              <p className="mt-2 text-slate-400">
                {subtitle}
              </p>
            </div>

            {children}
          </div>
        </section>
      </div>
    </main>
  );
}