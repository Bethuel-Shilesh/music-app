"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Mail, ArrowLeft } from "lucide-react";

export default function ChangeEmailPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [newEmail, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!newEmail || !confirmEmail || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (newEmail !== confirmEmail) {
      setError("Emails do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/change-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentEmail: user?.email,
          newEmail,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      setSuccess("Email updated! Please log in again.");

      // Logout after 2 seconds so user logs in with new email
      setTimeout(() => {
        logout();
      }, 2000);

    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="h-full overflow-y-auto flex items-center justify-center"
      style={{ background: "#080808", padding: "48px" }}
    >
      {/* Background glow */}
      <div
        className="fixed top-0 left-1/2 w-96 h-96 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)",
          filter: "blur(60px)",
          transform: "translateX(-50%)",
        }}
      />

      <div
        className="relative z-10 w-full flex flex-col gap-8"
        style={{
          maxWidth: "520px",
          padding: "48px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "32px",
          boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
        }}
      >
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 transition-all hover:scale-105 self-start"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          <ArrowLeft size={18} />
          <span className="text-sm">Back</span>
        </button>

        {/* Header */}
        <div className="flex flex-col gap-3">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{
              background: "rgba(124,58,237,0.15)",
              border: "1px solid rgba(124,58,237,0.3)",
            }}
          >
            <Mail size={28} style={{ color: "#a855f7" }} />
          </div>
          <div>
            <h1
              className="text-white font-bold"
              style={{ fontSize: "28px", fontFamily: "Figtree, sans-serif" }}
            >
              Change Email
            </h1>
            <p className="text-white/40 text-base mt-1">
              Current: <span style={{ color: "rgba(167,139,250,0.7)" }}>{user?.email}</span>
            </p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div
            className="px-5 py-4 rounded-2xl text-sm"
            style={{
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.3)",
              color: "#f87171",
            }}
          >
            {error}
          </div>
        )}

        {/* Success */}
        {success && (
          <div
            className="px-5 py-4 rounded-2xl text-sm"
            style={{
              background: "rgba(34,197,94,0.1)",
              border: "1px solid rgba(34,197,94,0.3)",
              color: "#4ade80",
            }}
          >
            {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* New Email */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
              New Email
            </label>
            <div
              className="flex items-center gap-3 px-5 rounded-2xl"
              style={{
                height: "60px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <Mail size={18} style={{ color: "rgba(167,139,250,0.5)" }} />
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Enter new email"
                className="flex-1 bg-transparent text-white placeholder-white/20 outline-none"
                style={{ fontSize: "15px" }}
              />
            </div>
          </div>

          {/* Confirm Email */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
              Confirm New Email
            </label>
            <div
              className="flex items-center gap-3 px-5 rounded-2xl"
              style={{
                height: "60px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <Mail size={18} style={{ color: "rgba(167,139,250,0.5)" }} />
              <input
                type="email"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
                placeholder="Confirm new email"
                className="flex-1 bg-transparent text-white placeholder-white/20 outline-none"
                style={{ fontSize: "15px" }}
              />
            </div>
          </div>

          {/* Current Password */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
              Current Password
            </label>
            <div
              className="flex items-center gap-3 px-5 rounded-2xl"
              style={{
                height: "60px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <Mail size={18} style={{ color: "rgba(167,139,250,0.5)" }} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter current password"
                className="flex-1 bg-transparent text-white placeholder-white/20 outline-none"
                style={{ fontSize: "15px" }}
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center rounded-2xl font-semibold transition-all duration-200 hover:scale-105 mt-2"
            style={{
              height: "60px",
              background: loading
                ? "rgba(124,58,237,0.5)"
                : "linear-gradient(135deg, #7c3aed, #a855f7)",
              color: "white",
              fontSize: "16px",
              boxShadow: loading ? "none" : "0 0 30px rgba(124,58,237,0.4)",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Updating...
              </div>
            ) : (
              "Update Email"
            )}
          </button>

        </form>
      </div>
    </div>
  );
}