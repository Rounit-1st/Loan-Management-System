"use client";

import { useEffect, useState } from "react";

import Container from "@/components/Container";
import Header from "@/components/Header";

interface Loan {
  _id: string;

  principalAmount: number;
  totalRepayment: number;

  status: string;

  disbursedAt: string;

  borrowerProfile: {
    fullName: string;

    pan: string;

    monthlySalary: number;

    employementType: string;

    userId: {
      email: string;
      role: string;
    };
  };
}

export default function CollectionPage() {
  const [loans, setLoans] =
    useState<Loan[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [selectedLoan, setSelectedLoan] =
    useState<Loan | null>(null);

  const [showPaymentModal, setShowPaymentModal] =
    useState(false);const [utrNumber, setUtrNumber] =
  useState("");

const [amount, setAmount] =
  useState("");

const [paymentDate, setPaymentDate] =
  useState(
    new Date()
      .toISOString()
      .slice(0, 16)
  );

const [paymentLoading, setPaymentLoading] =
  useState(false);


  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/collector/pending`,
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

const openPaymentModal = (
  loan: Loan
) => {
  setSelectedLoan(loan);

  setUtrNumber("");
  setAmount("");

  setPaymentDate(
    new Date()
      .toISOString()
      .slice(0, 16)
  );

  setShowPaymentModal(true);
};

  const closePaymentModal = () => {
    setSelectedLoan(null);
    setShowPaymentModal(false);
  };

  const handlePayment = async () => {
  if (!selectedLoan) return;

  if (!utrNumber.trim()) {
    alert("UTR Number is required");
    return;
  }

  if (!amount) {
    alert("Amount is required");
    return;
  }

  if (!paymentDate) {
    alert("Payment date is required");
    return;
  }

  try {
    setPaymentLoading(true);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/collector/${selectedLoan._id}/payment`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
  utrNumber,
  amount: Number(amount),
  paymentDate,
}),
      }
    );

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Payment failed"
      );
    }

    setLoans((prev) =>
      prev.filter(
        (loan) =>
          loan._id !==
          selectedLoan._id
      )
    );

    closePaymentModal();
  } catch (err: any) {
    alert(err.message);
  } finally {
    setPaymentLoading(false);
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
          "/executive/collection",
       
        ]}
      />

      <div className="py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Collections
          </h1>

          <p className="mt-2 text-slate-400">
            Manage disbursed loans and
            collect repayments.
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
                      Borrower
                    </th>

                    <th className="px-6 py-4 text-left">
                      Email
                    </th>

                    <th className="px-6 py-4 text-left">
                      PAN
                    </th>

                    <th className="px-6 py-4 text-left">
                      Employment
                    </th>

                    <th className="px-6 py-4 text-left">
                      Amount
                    </th>

                    <th className="px-6 py-4 text-left">
                      Repayment
                    </th>

                    <th className="px-6 py-4 text-left">
                      Disbursed At
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
                        colSpan={8}
                        className="px-6 py-8 text-center text-slate-400"
                      >
                        No loans pending
                        collection.
                      </td>
                    </tr>
                  )}

                  {loans.map((loan) => (
                    <tr
                      key={loan._id}
                      className="border-b border-slate-800"
                    >
                      <td className="px-6 py-4">
                        {
                          loan
                            .borrowerProfile
                            .fullName
                        }
                      </td>

                      <td className="px-6 py-4">
                        {
                          loan
                            .borrowerProfile
                            .userId.email
                        }
                      </td>

                      <td className="px-6 py-4">
                        {
                          loan
                            .borrowerProfile
                            .pan
                        }
                      </td>

                      <td className="px-6 py-4">
                        {
                          loan
                            .borrowerProfile
                            .employementType
                        }
                      </td>

                      <td className="px-6 py-4">
                        ₹
                        {loan.principalAmount.toLocaleString()}
                      </td>

                      <td className="px-6 py-4">
                        ₹
                        {Math.round(
                          loan.totalRepayment
                        ).toLocaleString()}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-400">
                        {new Date(
                          loan.disbursedAt
                        ).toLocaleString()}
                      </td>

                      <td className="px-6 py-4">
                        <button
                          onClick={() =>
                            openPaymentModal(
                              loan
                            )
                          }
                          className="rounded-lg bg-cyan-500 px-4 py-2 font-medium text-black transition hover:bg-cyan-400"
                        >
                          Pay Loan
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

      {showPaymentModal &&
  selectedLoan && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-lg rounded-3xl border border-slate-700 bg-slate-900 p-6">
        <h2 className="mb-2 text-xl font-bold">
          Loan Payment
        </h2>

        <p className="mb-6 text-slate-400">
          Record repayment for borrower.
        </p>

        <div className="mb-6 rounded-2xl border border-slate-700 bg-slate-950 p-4">
          <p>
            <span className="text-slate-400">
              Borrower:
            </span>{" "}
            {
              selectedLoan
                .borrowerProfile
                .fullName
            }
          </p>

          <p>
            <span className="text-slate-400">
              Due Amount:
            </span>{" "}
            ₹
            {Math.round(
              selectedLoan.totalRepayment
            ).toLocaleString()}
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              UTR Number
            </label>

            <input
              type="text"
              value={utrNumber}
              onChange={(e) =>
                setUtrNumber(
                  e.target.value
                )
              }
              placeholder="TXN2026001"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Amount
            </label>

            <input
              type="number"
              value={amount}
              onChange={(e) =>
                setAmount(
                  e.target.value
                )
              }
              placeholder="10000"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Payment Date
            </label>

            <input
              type="datetime-local"
              value={paymentDate}
              onChange={(e) =>
                setPaymentDate(
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={
              closePaymentModal
            }
            disabled={
              paymentLoading
            }
            className="rounded-xl border border-slate-700 px-4 py-2 hover:bg-slate-800"
          >
            Cancel
          </button>

          <button
            onClick={
              handlePayment
            }
            disabled={
              paymentLoading
            }
            className="rounded-xl bg-cyan-500 px-4 py-2 font-semibold text-black transition hover:bg-cyan-400 disabled:opacity-50"
          >
            {paymentLoading
              ? "Submitting..."
              : "Submit Payment"}
          </button>
        </div>
      </div>
    </div>
)}
    </Container>
  );
}