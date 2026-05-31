"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";

type ProfileState = "loading" | "not-found" | "exists" | "error";

export default function DashboardPage() {
  const router = useRouter();

  const [state, setState] =
    useState<ProfileState>("loading");

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/profile`,
          {
            credentials: "include",
          }
        );

        const data = await res.json();

        if (res.status === 404) {
          setState("not-found");
          return;
        }

        if (!res.ok) {
          setError(
            data.message || "Failed to fetch profile"
          );
          setState("error");
          return;
        }

        setState("exists");
      } catch (error) {
        console.error(error);
        setError("Unable to connect to server");
        setState("error");
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header
              items={[
                "Home",
                "My Loans",
                "Profile",
              
              ]}
              urls={[
                "/",
                "/loan/get-my-loans",
                "/dashboard/profile",
                
              ]}
            />
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6">
        <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
          <h1 className="mb-2 text-center text-3xl font-bold">
            Dashboard
          </h1>

          <p className="mb-8 text-center text-slate-400">
            Loan Management Portal
          </p>

          {state === "loading" && (
            <div className="text-center text-slate-400">
              Loading...
            </div>
          )}

          {state === "error" && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-center text-red-400">
              {error}
            </div>
          )}

          {state === "not-found" && (
            <button
              onClick={() =>
                router.push("/dashboard/complete_profile")
              }
              className="w-full rounded-xl bg-cyan-500 py-3 font-semibold text-black transition hover:bg-cyan-400"
            >
              Complete Profile
            </button>
          )}

          {state === "exists" && (
            <div className="space-y-4">
              <button
                onClick={() =>
                  router.push("/dashboard/profile")
                }
                className="w-full rounded-xl bg-cyan-500 py-3 font-semibold text-black transition hover:bg-cyan-400"
              >
                View Profile
              </button>

              <button
                onClick={() =>
                  router.push("/loan/apply")
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 font-semibold text-white transition hover:border-cyan-400"
              >
                Apply For Loan
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}