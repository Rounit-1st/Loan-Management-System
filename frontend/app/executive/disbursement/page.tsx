"use client";

import { useEffect, useState } from "react";

import Container from "@/components/Container";
import Header from "@/components/Header";

interface Loan {
  _id: string;
  principalAmount: number;
  tenureDays: number;
  interestRate: number;
  totalRepayment: number;
  status: string;
  sanctionReason: string;
  sanctionedAt: string;
}

export default function DisbursementPage() {
  const [loans, setLoans] =
    useState<Loan[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [processingId, setProcessingId] =
    useState("");

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/disbursement/pending`,
        {
          credentials: "include",
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to fetch loans"
        );
      }

      setLoans(data.loans || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDisburse = async (
    loanId: string
  ) => {
    try {
      setProcessingId(loanId);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/disbursement/${loanId}/disburse`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to disburse loan"
        );
      }

      setLoans((prev) =>
        prev.filter(
          (loan) =>
            loan._id !== loanId
        )
      );
    } catch (err: any) {
      alert(err.message);
    } finally {
      setProcessingId("");
    }
  };

  return (
    <Container>
      <Header
        items={[
          "Home",
          "Refresh",
        ]}
        urls={[
          "/",
          "/executive/disbursement",
       
        ]}
      />

      <div className="py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Loan Disbursement
          </h1>

          <p className="mt-2 text-slate-400">
            Disburse sanctioned loan
            applications.
          </p>
        </div>

        {loading && (
          <div className="rounded-3xl border border-slate-700 bg-slate-900/60 p-8 text-center">
            Loading loans...
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-400">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="overflow-hidden rounded-3xl border border-slate-700 bg-slate-900/60 backdrop-blur">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700 bg-slate-950/50">
                    <th className="px-6 py-4 text-left">
                      Loan ID
                    </th>

                    <th className="px-6 py-4 text-left">
                      Amount
                    </th>

                    <th className="px-6 py-4 text-left">
                      Tenure
                    </th>

                    <th className="px-6 py-4 text-left">
                      Repayment
                    </th>

                    <th className="px-6 py-4 text-left">
                      Sanction Reason
                    </th>

                    <th className="px-6 py-4 text-left">
                      Sanctioned At
                    </th>

                    <th className="px-6 py-4 text-left">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {loans.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-6 py-8 text-center text-slate-400"
                      >
                        No loans pending
                        disbursement.
                      </td>
                    </tr>
                  )}

                  {loans.map((loan) => (
                    <tr
                      key={loan._id}
                      className="border-b border-slate-800"
                    >
                      <td className="px-6 py-4">
                        {loan._id.slice(
                          -8
                        )}
                      </td>

                      <td className="px-6 py-4">
                        ₹
                        {loan.principalAmount.toLocaleString()}
                      </td>

                      <td className="px-6 py-4">
                        {
                          loan.tenureDays
                        }{" "}
                        days
                      </td>

                      <td className="px-6 py-4">
                        ₹
                        {Math.round(
                          loan.totalRepayment
                        ).toLocaleString()}
                      </td>

                      <td className="px-6 py-4">
                        {
                          loan.sanctionReason
                        }
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-400">
                        {new Date(
                          loan.sanctionedAt
                        ).toLocaleString()}
                      </td>

                      <td className="px-6 py-4">
                        <button
                          onClick={() =>
                            handleDisburse(
                              loan._id
                            )
                          }
                          disabled={
                            processingId ===
                            loan._id
                          }
                          className="rounded-lg bg-cyan-500 px-4 py-2 font-medium text-black transition hover:bg-cyan-400 disabled:opacity-50"
                        >
                          {processingId ===
                          loan._id
                            ? "Processing..."
                            : "Disburse"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}