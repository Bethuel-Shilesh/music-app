"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Disc3, Eye, EyeOff, Mail, Lock } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulate login for now (we'll connect to backend later)
    setTimeout(() => {
      if (email && password) {
        router.push("/");
      } else {
        setError("Please fill in all fields");
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{ background: "#080808" }}
    >
      {/* Background glow blobs */}
      <div
        className="absolute top-0 left-0 w-96 h-96 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)",
          filter: "blur(60px)",
          transform: "translate(-30%, -30%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)",
          filter: "blur(60px)",
          transform: "translate(30%, 30%)",
        }}
      />

      {/* Card */}
      <div
        className="relative z-10 w-full flex flex-col gap-8"
        style={{
          maxWidth: "440px",
          padding: "48px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "32px",
          boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
          margin: "20px",
        }}
      >
        {/* Logo */}
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              boxShadow: "0 0 30px rgba(124,58,237,0.6)",
            }}
          >
            <Disc3 size={28} className="text-white" />
          </div>
          <div className="text-center">
            <h1
              className="text-white font-bold text-3xl tracking-wider"
              style={{
                fontFamily: "Figtree, sans-serif",
                textShadow: "0 0 20px rgba(167,139,250,0.4)",
              }}
            >
              MUSE
            </h1>
            <p className="text-white/30 text-sm mt-1">
              Welcome back! Sign in to continue
            </p>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div
            className="px-4 py-3 rounded-2xl text-sm text-center"
            style={{
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.3)",
              color: "#f87171",
            }}
          >
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label
              className="text-sm font-medium"
              style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Figtree, sans-serif" }}
            >
              Email
            </label>
            <div
              className="flex items-center gap-3 px-4 rounded-2xl transition-all duration-300"
              style={{
                height: "56px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <Mail size={18} style={{ color: "rgba(167,139,250,0.5)" }} className="flex-shrink-0" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 bg-transparent text-white placeholder-white/20 outline-none text-sm"
                style={{ fontFamily: "Figtree, sans-serif" }}
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label
              className="text-sm font-medium"
              style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Figtree, sans-serif" }}
            >
              Password
            </label>
            <div
              className="flex items-center gap-3 px-4 rounded-2xl transition-all duration-300"
              style={{
                height: "56px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <Lock size={18} style={{ color: "rgba(167,139,250,0.5)" }} className="flex-shrink-0" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="flex-1 bg-transparent text-white placeholder-white/20 outline-none text-sm"
                style={{ fontFamily: "Figtree, sans-serif" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="flex-shrink-0 transition hover:scale-110"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Forgot password */}
          <div className="flex justify-end">
            <button
              type="button"
              className="text-xs transition hover:text-purple-300"
              style={{ color: "rgba(167,139,250,0.6)" }}
            >
              Forgot password?
            </button>
          </div>

          {/* Login button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-2xl font-semibold text-sm transition-all duration-200 hover:scale-105 mt-2"
            style={{
              height: "56px",
              background: loading
                ? "rgba(124,58,237,0.5)"
                : "linear-gradient(135deg, #7c3aed, #a855f7)",
              color: "white",
              boxShadow: loading ? "none" : "0 0 30px rgba(124,58,237,0.4)",
              fontFamily: "Figtree, sans-serif",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"
                />
                Signing in...
              </div>
            ) : (
              "Sign In"
            )}
          </button>

        </form>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1" style={{ height: "1px", background: "rgba(255,255,255,0.08)" }} />
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>or</span>
          <div className="flex-1" style={{ height: "1px", background: "rgba(255,255,255,0.08)" }} />
        </div>

        {/* Sign up link */}
        <p className="text-center text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold transition hover:text-purple-300"
            style={{ color: "rgba(167,139,250,0.8)" }}
          >
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
}