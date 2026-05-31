"use client";

import { useRouter } from "next/navigation";

import Container from "@/components/Container";
import Header from "@/components/Header";

const modules = [
  {
    title: "Sales",
    description:
      "Manage borrower leads and applications.",
    href: "/executive/sales",
    icon: "📈",
  },
  {
    title: "Sanction",
    description:
      "Review and approve loan requests.",
    href: "/executive/sanction",
    icon: "✅",
  },
  {
    title: "Disbursement",
    description:
      "Release approved loan amounts.",
    href: "/executive/disbursement",
    icon: "💰",
  },
  {
    title: "Collection",
    description:
      "Collect repayments from borrowers.",
    href: "/executive/collection",
    icon: "📋",
  },
];

export default function AdminDashboardPage() {
  const router = useRouter();

  return (
    <Container>
      <Header
        items={[
          "Dashboard",
          "Sales",
          "Disbursement",
          "Collection" ,
          "Sanction",
        ]}
        urls={[
          "executive/admin",
          "/executive/sales",
          "/executive/disbursement",
          "/executive/collection",
          "/executive/sanction",
        ]}
      />

      <div className="py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            Admin Dashboard
          </h1>

          <p className="mt-2 text-slate-400">
            Manage every stage of the loan
            lifecycle.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {modules.map((module) => (
            <button
              key={module.title}
              onClick={() =>
                router.push(module.href)
              }
              className="group rounded-3xl border border-slate-700 bg-slate-900/60 p-6 text-left backdrop-blur transition hover:border-cyan-400 hover:bg-slate-900"
            >
              <div className="mb-4 text-5xl">
                {module.icon}
              </div>

              <h2 className="mb-2 text-xl font-semibold group-hover:text-cyan-400">
                {module.title}
              </h2>

              <p className="mb-6 text-sm text-slate-400">
                {module.description}
              </p>

              <div className="inline-flex items-center text-cyan-400">
                Open →
              </div>
            </button>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-slate-700 bg-slate-900/60 p-8 backdrop-blur">
          <h2 className="mb-4 text-xl font-semibold">
            System Overview
          </h2>

          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-2xl bg-slate-950 p-5">
              <p className="text-sm text-slate-400">
                Sales
              </p>

              <p className="mt-2 text-3xl font-bold text-cyan-400">
                📈
              </p>
            </div>

            <div className="rounded-2xl bg-slate-950 p-5">
              <p className="text-sm text-slate-400">
                Sanction
              </p>

              <p className="mt-2 text-3xl font-bold text-green-400">
                ✅
              </p>
            </div>

            <div className="rounded-2xl bg-slate-950 p-5">
              <p className="text-sm text-slate-400">
                Disbursement
              </p>

              <p className="mt-2 text-3xl font-bold text-yellow-400">
                💰
              </p>
            </div>

            <div className="rounded-2xl bg-slate-950 p-5">
              <p className="text-sm text-slate-400">
                Collection
              </p>

              <p className="mt-2 text-3xl font-bold text-red-400">
                📋
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}