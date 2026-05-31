// app/page.tsx

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-6">
        {/* Navbar */}
        <nav className="flex items-center justify-between py-6">
          <h1 className="text-2xl font-bold">
            Loan<span className="text-cyan-400">Flow</span>
          </h1>

          <div className="flex gap-4">
            <Link
              href="/login"
              className="rounded-lg border border-slate-600 px-4 py-2 hover:bg-slate-800"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="rounded-lg bg-cyan-500 px-4 py-2 font-medium text-black hover:bg-cyan-400"
            >
              Register
            </Link>
          </div>
        </nav>

        {/* Hero */}
        <section className="flex min-h-[75vh] flex-col items-center justify-center text-center">
          <div className="mb-4 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
            Modern Loan Management Platform
          </div>

          <h1 className="max-w-5xl text-5xl font-extrabold leading-tight md:text-7xl">
            Apply, Track & Manage
            <span className="block text-cyan-400">
              Loans End-to-End
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-slate-300">
            A complete lending platform where borrowers apply for
            loans and internal teams manage sanction, disbursement,
            and collection workflows.
          </p>

          <div className="mt-10 flex gap-4">
            <Link
              href="/register"
              className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:scale-105"
            >
              Apply Now
            </Link>

            <Link
              href="/executive-login"
              className="rounded-xl border border-slate-600 px-6 py-3 font-semibold hover:bg-slate-800"
            >
              Executive Login
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="grid gap-6 py-20 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6 backdrop-blur">
            <h3 className="mb-3 text-xl font-bold text-cyan-400">
              Eligibility Engine
            </h3>
            <p className="text-slate-300">
              Automated validation for age, salary, PAN,
              and employment criteria.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6 backdrop-blur">
            <h3 className="mb-3 text-xl font-bold text-cyan-400">
              Loan Workflow
            </h3>
            <p className="text-slate-300">
              Track every loan from application
              to closure with complete transparency.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6 backdrop-blur">
            <h3 className="mb-3 text-xl font-bold text-cyan-400">
              Role-Based Access
            </h3>
            <p className="text-slate-300">
              Separate dashboards for Sales,
              Sanction, Disbursement and Collection teams.
            </p>
          </div>
        </section>

        {/* Lifecycle */}
        <section className="pb-24">
          <h2 className="mb-12 text-center text-4xl font-bold">
            Loan Lifecycle
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-4 text-center">
            {[
              "Applied",
              "Sanctioned",
              "Disbursed",
              "Collection",
              "Closed",
            ].map((step) => (
              <div
                key={step}
                className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-6 py-4"
              >
                {step}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}