"use client";

import { useState } from "react";

import Container from "@/components/Container";
import Header from "@/components/Header";
import CenteredContainer from "@/components/CenteredContainer";

export default function ApplyLoanPage() {
  const [principalAmount, setPrincipalAmount] =
    useState("");

  const [tenureDays, setTenureDays] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [loan, setLoan] = useState<any>(null);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");
    setLoan(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/loans/apply`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            principalAmount:
              Number(principalAmount),
            tenureDays:
              Number(tenureDays),
          }),
        }
      );

      const data =
        await response.json();

      if (response.status === 201) {
        setSuccess(data.message);
        setLoan(data.loan);
        return;
      }

      setError(
        data.message ||
          "Failed to apply for loan"
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
    <Container>
      <Header
        items={[
          "Dashboard",
          "My Loans",
          "Profile",
        ]}
        urls={[
          "/dashboard/client",
          "/loan/get-my-loans",
          "/dashboard/profile",
        ]}
      />

      <CenteredContainer>
        <h1 className="mb-2 text-center text-3xl font-bold">
          Apply For Loan
        </h1>

        <p className="mb-8 text-center text-slate-400">
          Submit a new loan request
        </p>

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
              Principal Amount
            </label>

            <input
              type="number"
              min={1}
              value={principalAmount}
              onChange={(e) =>
                setPrincipalAmount(
                  e.target.value
                )
              }
              placeholder="50000"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-cyan-400"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Tenure (Days)
            </label>

            <input
              type="number"
              min={1}
              value={tenureDays}
              onChange={(e) =>
                setTenureDays(
                  e.target.value
                )
              }
              placeholder="90"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-cyan-400"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-cyan-500 py-3 font-semibold text-black transition hover:bg-cyan-400 disabled:opacity-50"
          >
            {loading
              ? "Submitting..."
              : "Apply For Loan"}
          </button>
        </form>

        {loan && (
          <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-950 p-5">
            <h2 className="mb-4 text-lg font-semibold">
              Loan Summary
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              <Info
                label="Principal Amount"
                value={`₹${loan.principalAmount.toLocaleString()}`}
              />

              <Info
                label="Tenure"
                value={`${loan.tenureDays} Days`}
              />

              <Info
                label="Interest Rate"
                value={`${loan.interestRate}%`}
              />

              <Info
                label="Simple Interest"
                value={`₹${Math.round(
                  loan.simpleInterest
                ).toLocaleString()}`}
              />

              <Info
                label="Total Repayment"
                value={`₹${Math.round(
                  loan.totalRepayment
                ).toLocaleString()}`}
              />

              <Info
                label="Status"
                value={loan.status}
              />
            </div>
          </div>
        )}
      </CenteredContainer>
    </Container>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="mb-1 text-sm text-slate-400">
        {label}
      </p>

      <div className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3">
        {value}
      </div>
    </div>
  );
}