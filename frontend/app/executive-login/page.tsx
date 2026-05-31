"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/AuthLayout";

export default function ExecutiveLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        setError(
          data.message ||
            "Login failed"
        );
        return;
      }

      setSuccess(
        "Login successful"
      );


const role = data.user?.role;

setTimeout(() => {
  switch (role) {
    case "ADMIN":
      router.push("/executive/admin");
      break;

    case "SALES":
      router.push("/executive/sales");
      break;

    case "COLLECTION":
      router.push("/executive/collection");
      break;

    case "SANCTION":
      router.push("/executive/sanction");
      break;

    case "DISBURSEMENT":
        router.push("/executive/disbursement");
        break;

    default:
      setError(
        `Unknown role: ${role}`
      );
  }
}, 1000);
    } catch {
      setError(
        "Unable to connect to server"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Executive Login"
      subtitle="Login as an employee"
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
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

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
            placeholder="employee@loanflow.com"
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
              setPassword(
                e.target.value
              )
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
          {loading
            ? "Logging in..."
            : "Login"}
        </button>
      </form>

      <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-950/70 p-4">
        <h3 className="mb-4 text-center font-semibold text-cyan-400">
          Demo Credentials
        </h3>

        <div className="space-y-3 text-sm">
          <div className="rounded-lg border border-slate-700 p-3">
            <p className="font-medium text-white">
              Admin
            </p>
            <p className="text-slate-400">
              Email: admin@gmail.com
            </p>
            <p className="text-slate-400">
              Password: admin123
            </p>
          </div>

          <div className="rounded-lg border border-slate-700 p-3">
            <p className="font-medium text-white">
              Sales Executive
            </p>
            <p className="text-slate-400">
              Email: sales@gmail.com
            </p>
            <p className="text-slate-400">
              Password: sales123
            </p>
          </div>

          <div className="rounded-lg border border-slate-700 p-3">
            <p className="font-medium text-white">
              Collection Executive
            </p>
            <p className="text-slate-400">
              Email:
              collection@gmail.com
            </p>
            <p className="text-slate-400">
              Password:
              collection123
            </p>
          </div>

          <div className="rounded-lg border border-slate-700 p-3">
            <p className="font-medium text-white">
              Sanction Executive
            </p>
            <p className="text-slate-400">
              Email:
              sanction@gmail.com
            </p>
            <p className="text-slate-400">
              Password:
              sanction123
            </p>
          </div>

          <div className="rounded-lg border border-slate-700 p-3">
            <p className="font-medium text-white">
              Disbursement Executive
            </p>
            <p className="text-slate-400">
              Email:
              disbursement@gmail.com
            </p>
            <p className="text-slate-400">
              Password:
              disbursement123
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}