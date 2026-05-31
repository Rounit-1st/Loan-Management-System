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
  createdAt: string;
}

export default function LeadsPage() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedLoanId, setSelectedLoanId] =
    useState("");

  const [actionType, setActionType] =
    useState<"approve" | "reject" | null>(
      null
    );

  const [reason, setReason] =
    useState("");

  const [actionLoading, setActionLoading] =
    useState(false);

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/sanction/pending`,
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

  const openApproveModal = (
    loanId: string
  ) => {
    setSelectedLoanId(loanId);
    setActionType("approve");
    setReason("");
  };

  const openRejectModal = (
    loanId: string
  ) => {
    setSelectedLoanId(loanId);
    setActionType("reject");
    setReason("");
  };

  const closeModal = () => {
    setSelectedLoanId("");
    setActionType(null);
    setReason("");
  };

  const handleDecision = async () => {
    if (!reason.trim()) return;

    try {
      setActionLoading(true);

      const endpoint =
        actionType === "approve"
          ? `/api/sanction/${selectedLoanId}/approve`
          : `/api/sanction/${selectedLoanId}/reject`;

      const payload =
        actionType === "approve"
          ? {
              sanctionReason: reason,
            }
          : {
              rejectionReason: reason,
            };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}${endpoint}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            payload
          ),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Action failed"
        );
      }

      setLoans((prev) =>
        prev.filter(
          (loan) =>
            loan._id !==
            selectedLoanId
        )
      );

      closeModal();
    } catch (err: any) {
      alert(
        err.message ||
          "Something went wrong"
      );
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <Container>
      <Header
        items={[
          "home",
          "sanction"
        ]}
        urls={[
          "/",
          "/executive/sanction",
        ]}
      />

      <div className="py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Pending Loans
          </h1>

          <p className="mt-2 text-slate-400">
            Review and process loan
            applications
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
                      Interest
                    </th>

                    <th className="px-6 py-4 text-left">
                      Repayment
                    </th>

                    <th className="px-6 py-4 text-left">
                      Status
                    </th>

                    <th className="px-6 py-4 text-left">
                      Created
                    </th>

                    <th className="px-6 py-4 text-left">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {loans.length === 0 && (
                    <tr>
                      <td
                        colSpan={8}
                        className="px-6 py-8 text-center text-slate-400"
                      >
                        No pending loans
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
                        {
                          loan.interestRate
                        }
                        %
                      </td>

                      <td className="px-6 py-4">
                        ₹
                        {Math.round(
                          loan.totalRepayment
                        ).toLocaleString()}
                      </td>

                      <td className="px-6 py-4">
                        <span className="rounded-lg bg-yellow-500/20 px-3 py-1 text-sm text-yellow-400">
                          {
                            loan.status
                          }
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-400">
                        {new Date(
                          loan.createdAt
                        ).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              openApproveModal(
                                loan._id
                              )
                            }
                            className="rounded-lg bg-green-500 px-3 py-2 text-sm font-medium text-black transition hover:bg-green-400"
                          >
                            Approve
                          </button>

                          <button
                            onClick={() =>
                              openRejectModal(
                                loan._id
                              )
                            }
                            className="rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-400"
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {actionType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-lg rounded-3xl border border-slate-700 bg-slate-900 p-6">
            <h2 className="mb-2 text-xl font-bold">
              {actionType ===
              "approve"
                ? "Approve Loan"
                : "Reject Loan"}
            </h2>

            <p className="mb-5 text-slate-400">
              {actionType ===
              "approve"
                ? "Please provide the sanction reason."
                : "Please provide the rejection reason."}
            </p>

            <textarea
              value={reason}
              onChange={(e) =>
                setReason(
                  e.target.value
                )
              }
              rows={5}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 outline-none focus:border-cyan-400"
              placeholder={
                actionType ===
                "approve"
                  ? "Enter sanction reason..."
                  : "Enter rejection reason..."
              }
            />

            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={closeModal}
                disabled={
                  actionLoading
                }
                className="rounded-xl border border-slate-700 px-4 py-2 hover:bg-slate-800"
              >
                Cancel
              </button>

              <button
                onClick={
                  handleDecision
                }
                disabled={
                  actionLoading ||
                  !reason.trim()
                }
                className={`rounded-xl px-4 py-2 font-semibold transition disabled:opacity-50 ${
                  actionType ===
                  "approve"
                    ? "bg-green-500 text-black hover:bg-green-400"
                    : "bg-red-500 text-white hover:bg-red-400"
                }`}
              >
                {actionLoading
                  ? "Submitting..."
                  : actionType ===
                    "approve"
                  ? "Approve"
                  : "Reject"}
              </button>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}