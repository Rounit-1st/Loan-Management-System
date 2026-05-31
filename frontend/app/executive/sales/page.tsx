"use client";

import { useEffect, useState } from "react";

import Container from "@/components/Container";
import Header from "@/components/Header";

interface Lead {
  _id: string;
  fullName: string;
  pan: string;
  dob: string;
  monthlySalary: number;
  employementType: string;
  brePassed: boolean;
  userId: {
    _id: string;
    email: string;
    role: string;
  };
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] =
    useState(true);
  const [error, setError] =
    useState("");

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/sales/leads`,
          {
            credentials: "include",
          }
        );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Failed to fetch leads"
          );
        }

        setLeads(data.leads);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  return (
    <Container>
      <Header
        items={[
          "Leads",
          "home",
          
        ]}
        urls={[
          "/executive/sales",
          "/",
         
        ]}
      />

      <div className="py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            Sales Leads
          </h1>

          <p className="mt-2 text-slate-400">
            View all eligible borrowers.
          </p>
        </div>

        {loading && (
          <div className="rounded-3xl border border-slate-700 bg-slate-900/60 p-8 text-center backdrop-blur">
            Loading leads...
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-400">
            {error}
          </div>
        )}

        {!loading &&
          !error &&
          leads.length === 0 && (
            <div className="rounded-3xl border border-slate-700 bg-slate-900/60 p-8 text-center text-slate-400 backdrop-blur">
              No leads found.
            </div>
          )}

        {!loading &&
          !error &&
          leads.length > 0 && (
            <div className="overflow-hidden rounded-3xl border border-slate-700 bg-slate-900/60 backdrop-blur">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-slate-700 bg-slate-950/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold">
                        Name
                      </th>

                      <th className="px-6 py-4 text-left text-sm font-semibold">
                        Email
                      </th>

                      <th className="px-6 py-4 text-left text-sm font-semibold">
                        PAN
                      </th>

                      <th className="px-6 py-4 text-left text-sm font-semibold">
                        Salary
                      </th>

                      <th className="px-6 py-4 text-left text-sm font-semibold">
                        Employment
                      </th>

                      <th className="px-6 py-4 text-left text-sm font-semibold">
                        BRE
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {leads.map((lead) => (
                      <tr
                        key={lead._id}
                        className="border-b border-slate-800 transition hover:bg-slate-800/40"
                      >
                        <td className="px-6 py-4">
                          {
                            lead.fullName
                          }
                        </td>

                        <td className="px-6 py-4 text-slate-300">
                          {
                            lead.userId
                              .email
                          }
                        </td>

                        <td className="px-6 py-4">
                          {lead.pan}
                        </td>

                        <td className="px-6 py-4">
                          ₹
                          {lead.monthlySalary.toLocaleString()}
                        </td>

                        <td className="px-6 py-4">
                          {
                            lead.employementType
                          }
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`rounded-lg px-3 py-1 text-xs font-medium ${
                              lead.brePassed
                                ? "bg-green-500/20 text-green-400"
                                : "bg-yellow-500/20 text-yellow-400"
                            }`}
                          >
                            {lead.brePassed
                              ? "Passed"
                              : "Pending"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="border-t border-slate-700 px-6 py-4 text-sm text-slate-400">
                Total Leads:{" "}
                {leads.length}
              </div>
            </div>
          )}
      </div>
    </Container>
  );
}