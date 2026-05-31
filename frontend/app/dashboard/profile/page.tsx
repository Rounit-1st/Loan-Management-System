"use client";

import { useEffect, useState } from "react";
import Container from "@/components/Container";
import Header from "@/components/Header";

interface Borrower {
  _id: string;
  userId: string;
  fullName: string;
  pan: string;
  dob: string;
  monthlySalary: number;
  employementType: string;
  brePassed: boolean;
}

export default function ProfilePage() {
  const [borrower, setBorrower] =
    useState<Borrower | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/profile`,
          {
            credentials: "include",
          }
        );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Failed to fetch profile"
          );
        }

        setBorrower(data.borrower);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <>
      <Header
        items={[
          "Dashboard",
          "Loans",
          "Profile",
          "Upload Salary Slip"
        ]}
        urls={[
          "/dashboard/client",
          "/loan/get-my-loans",
          "/dashboard/profile",
          "/dashboard/upload-salary-slip",
          ]}></Header>
    <Container>
      <section className="flex min-h-[85vh] items-center justify-center py-10">
        <div className="w-full max-w-2xl rounded-3xl border border-slate-700 bg-slate-900/60 p-8 backdrop-blur">
          <h1 className="mb-2 text-center text-3xl font-bold">
            Profile
          </h1>

          <p className="mb-8 text-center text-slate-400">
            Your borrower details
          </p>

          {loading && (
            <div className="text-center text-slate-400">
              Loading profile...
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-400">
              {error}
            </div>
          )}

          {!loading &&
            !error &&
            borrower && (
              <div className="space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <ProfileField
                    label="Full Name"
                    value={
                      borrower.fullName
                    }
                  />

                  <ProfileField
                    label="PAN Number"
                    value={borrower.pan}
                  />

                  <ProfileField
                    label="Date of Birth"
                    value={new Date(
                      borrower.dob
                    ).toLocaleDateString()}
                  />

                  <ProfileField
                    label="Monthly Salary"
                    value={`₹${borrower.monthlySalary.toLocaleString()}`}
                  />

                  <ProfileField
                    label="Employment Type"
                    value={
                      borrower.employementType
                    }
                  />

                  <div>
                    <p className="mb-2 text-sm text-slate-400">
                      BRE Status
                    </p>

                    <span
                      className={`inline-flex rounded-lg px-3 py-2 text-sm font-medium ${
                        borrower.brePassed
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {borrower.brePassed
                        ? "Passed"
                        : "Pending"}
                    </span>
                  </div>
                </div>
              </div>
            )}
        </div>
      </section>
    </Container>
    </>
  );
}

function ProfileField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="mb-2 text-sm text-slate-400">
        {label}
      </p>

      <div className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3">
        {value}
      </div>
    </div>
  );
}