"use client";

import { useState } from "react";
import AuthLayout from "@/components/AuthLayout";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Container from "@/components/Container";

export default function CompleteProfilePage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [pan, setPan] = useState("");
  const [dob, setDob] = useState("");
  const [monthlySalary, setMonthlySalary] =
    useState("");
  const [employementType, setEmployementType] =
    useState("Salaried");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] =
    useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/profile`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            fullName,
            pan: pan.toUpperCase(),
            dob,
            monthlySalary:
              Number(monthlySalary),
            employementType,
          }),
        }
      );

      const data =
        await response.json();

      if (response.status === 201) {
        setSuccess(
          "Profile completed successfully."
        );

        setFullName("");
        setPan("");
        setDob("");
        setMonthlySalary("");

        setTimeout(() => {
          router.push("/dashboard/profile");
        }, 1500);

        return;
      }

      setError(
        data.message ||
          "Something went wrong"
      );
    } catch {
      setError(
        "Unable to connect to server."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Header
        items={[
          "Dashboard",
          "My Loans",
          "Profile",
          "Logout",
        ]}
        urls={[
          "/dashboard/client",
          "/loans",
          "/profile",
          "/logout",
        ]}
      />
    <Container>
        
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
            Full Name
          </label>

          <input
            type="text"
            value={fullName}
            onChange={(e) =>
              setFullName(
                e.target.value
              )
            }
            placeholder="Arun Kumar"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-cyan-400"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            PAN Number
          </label>

          <input
            type="text"
            maxLength={10}
            value={pan}
            onChange={(e) =>
              setPan(
                e.target.value.toUpperCase()
              )
            }
            placeholder="ABCDE1234F"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 uppercase outline-none transition focus:border-cyan-400"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Date of Birth
          </label>

          <input
            type="date"
            value={dob}
            onChange={(e) =>
              setDob(e.target.value)
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-cyan-400"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Monthly Salary
          </label>

          <input
            type="number"
            min={0}
            value={monthlySalary}
            onChange={(e) =>
              setMonthlySalary(
                e.target.value
              )
            }
            placeholder="15000"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-cyan-400"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Employment Type
          </label>

          <select
            value={employementType}
            onChange={(e) =>
              setEmployementType(
                e.target.value
              )
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-cyan-400"
          >
            <option value="Salaried">
              Salaried
            </option>

            <option value="Self-Employed">
              Self Employed
            </option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-cyan-500 py-3 font-semibold text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Submitting..."
            : "Next"}
        </button>
      </form>
    </Container>
    </>
  );
}