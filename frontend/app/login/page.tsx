"use client";

import { useState } from "react";
import Link from "next/link";
import AuthLayout from "@/components/AuthLayout";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  setError("");
  setSuccess("");

  try {
    setLoading(true);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Login failed");
      return;
    }

    setSuccess(data.message || "Login successful! Redirecting...");

    setTimeout(() => {
      router.push("/dashboard/client");
    }, 1500);

  } catch (error) {
    console.error(error);

    setError(
      error instanceof Error
        ? error.message
        : "Something went wrong"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Login to access your account"
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div>
                    {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-400">
              {success}
            </div>
          )}
          <label className="mb-2 block text-sm text-slate-300">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-cyan-500 py-3 font-semibold text-black transition hover:bg-cyan-400 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-400">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-cyan-400"
        >
          Register
        </Link>
      </p>
    </AuthLayout>
  );
}