"use client";

import { useEffect, useState } from "react";
import Container from "@/components/Container";
import Header from "@/components/Header";

interface Loan {
  _id: string;
  principalAmount: number;
  tenureDays: number;
  interestRate: number;
  simpleInterest: number;
  totalRepayment: number;
  status: string;
  sanctionReason?: string;
  createdAt: string;
  sanctionedAt?: string;
  disbursedAt?: string;
}

export default function LoansPage() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/loans/my-loans`,
        {
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch loans"
        );
      }

      setLoans(data.loans || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DISBURSED":
        return "bg-green-500/20 text-green-400";

      case "SANCTIONED":
        return "bg-cyan-500/20 text-cyan-400";

      case "PENDING":
        return "bg-yellow-500/20 text-yellow-400";

      case "REJECTED":
        return "bg-red-500/20 text-red-400";

      default:
        return "bg-slate-500/20 text-slate-300";
    }
  };

  return (
    <Container>
      <Header
        items={[
          "Dashboard",
          "Loans",
          "Profile",
        ]}
        urls={[
          "/dashboard/client",
          "/loan/get-my-loans",
          "/dashboard/profile",
        ]}
      />

      <div className="py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            My Loans
          </h1>

          <p className="mt-2 text-slate-400">
            View all your loan applications.
          </p>
        </div>

        {loading && (
          <div className="rounded-3xl border border-slate-700 bg-slate-900/60 p-8 text-center text-slate-400">
            Loading loans...
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-400">
            {error}
          </div>
        )}

        {!loading &&
          !error &&
          loans.length === 0 && (
            <div className="rounded-3xl border border-slate-700 bg-slate-900/60 p-8 text-center">
              <p className="text-slate-400">
                No loans found.
              </p>
            </div>
          )}

        {!loading &&
          !error &&
          loans.length > 0 && (
            <div className="grid gap-6">
              {loans.map((loan) => (
                <div
                  key={loan._id}
                  className="rounded-3xl border border-slate-700 bg-slate-900/60 p-6 backdrop-blur"
                >
                  <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h2 className="text-xl font-semibold">
                        Loan #
                        {loan._id.slice(-6)}
                      </h2>

                      <p className="mt-1 text-sm text-slate-400">
                        Applied on{" "}
                        {new Date(
                          loan.createdAt
                        ).toLocaleDateString()}
                      </p>
                    </div>

                    <span
                      className={`rounded-lg px-4 py-2 text-sm font-medium ${getStatusColor(
                        loan.status
                      )}`}
                    >
                      {loan.status}
                    </span>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <InfoCard
                      label="Principal Amount"
                      value={`₹${loan.principalAmount.toLocaleString()}`}
                    />

                    <InfoCard
                      label="Tenure"
                      value={`${loan.tenureDays} Days`}
                    />

                    <InfoCard
                      label="Interest Rate"
                      value={`${loan.interestRate}%`}
                    />

                    <InfoCard
                      label="Simple Interest"
                      value={`₹${Math.round(
                        loan.simpleInterest
                      ).toLocaleString()}`}
                    />

                    <InfoCard
                      label="Total Repayment"
                      value={`₹${Math.round(
                        loan.totalRepayment
                      ).toLocaleString()}`}
                    />

                    <InfoCard
                      label="Sanction Reason"
                      value={
                        loan.sanctionReason ||
                        "Not Available"
                      }
                    />
                  </div>

                  {loan.sanctionedAt && (
                    <p className="mt-6 text-sm text-slate-400">
                      Sanctioned:{" "}
                      {new Date(
                        loan.sanctionedAt
                      ).toLocaleString()}
                    </p>
                  )}

                  {loan.disbursedAt && (
                    <p className="mt-2 text-sm text-slate-400">
                      Disbursed:{" "}
                      {new Date(
                        loan.disbursedAt
                      ).toLocaleString()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
      </div>
    </Container>
  );
}

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-950 p-4">
      <p className="mb-1 text-xs uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="font-medium text-white">
        {value}
      </p>
    </div>
  );
}