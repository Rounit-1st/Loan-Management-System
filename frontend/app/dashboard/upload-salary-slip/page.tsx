"use client";

import { useState } from "react";
import Container from "@/components/Container";
import Header from "@/components/Header";
import CenteredContainer from "@/components/CenteredContainer";
import { useRouter } from "next/navigation";

const ALLOWED_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
];

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function UploadSalarySlipPage() {
  const [file, setFile] = useState<File | null>(
    null
  );

  const [loading, setLoading] =
    useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] =
    useState("");

 const router = useRouter();

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setError("");
    setSuccess("");

    const selectedFile =
      e.target.files?.[0];

    if (!selectedFile) return;

    if (
      !ALLOWED_TYPES.includes(
        selectedFile.type
      )
    ) {
      setError(
        "Only PDF, JPG and PNG files are allowed."
      );
      return;
    }

    if (
      selectedFile.size >
      MAX_FILE_SIZE
    ) {
      setError(
        "File size must be less than 5 MB."
      );
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!file) {
      setError(
        "Please select a salary slip."
      );
      return;
    }

    try {
      setLoading(true);

      const formData =
        new FormData();

      formData.append(
        "salarySlip",
        file
      );

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/profile/upload-salary-slip`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const data =
        await response.json();

      if (response.ok) {
        setSuccess(
          "Salary slip uploaded successfully."
        );
        setFile(null);
        setTimeout(() => {
          router.push("/dashboard/client");
        }, 3000);
        return;
        
      }

      setError(
        data.message ||
          "Failed to upload salary slip."
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
          "Profile",
          "Loans",
        ]}
        urls={[
          "/dashboard/client",
          "/dashboard/profile",
          "/loan/get-my-loans",
        ]}
      />

      <CenteredContainer>
        <h1 className="mb-2 text-center text-3xl font-bold">
          Upload Salary Slip
        </h1>

        <p className="mb-8 text-center text-slate-400">
          Upload your latest salary slip
          for verification.
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
              Salary Slip
            </label>

            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={
                handleFileChange
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-cyan-500 file:px-4 file:py-2 file:font-semibold file:text-black hover:file:bg-cyan-400"
            />

            <p className="mt-2 text-xs text-slate-500">
              PDF, JPG or PNG • Max
              5 MB
            </p>
          </div>

          {file && (
            <div className="rounded-xl border border-slate-700 bg-slate-950 p-3 text-sm text-slate-300">
              Selected: {file.name}
            </div>
          )}

          <button
            type="submit"
            disabled={
              loading || !file
            }
            className="w-full rounded-xl bg-cyan-500 py-3 font-semibold text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Uploading..."
              : "Upload Salary Slip"}
          </button>
        </form>
      </CenteredContainer>
    </Container>
  );
}