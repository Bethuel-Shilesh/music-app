"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { LogOut, KeyRound, Mail, ChevronDown, Search } from "lucide-react";

export default function TopBar() {
  const { user, isLoggedIn, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isSearchPage = pathname === "/search";

  return (
    <div
      className="flex-shrink-0 flex items-center px-8 py-4 relative z-50"
      style={{
        background: "rgba(8,8,8,0.9)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        minHeight: "72px",
        gap: "16px",
      }}
    >

      {/* ── LEFT SPACER ── */}
      <div className="flex-1" />

      {/* ── SEARCH BAR (centered, hidden on search page) ── */}
      {!isSearchPage && (
        <div
          onClick={() => router.push("/search")}
          className="flex items-center gap-3 px-6 rounded-2xl cursor-pointer transition-all duration-200"
          style={{
            height: "48px",
            width: "420px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.12)";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.4)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(124,58,237,0.15)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
            (e.currentTarget as HTMLElement).style.boxShadow = "none";
          }}
        >
          <Search size={16} style={{ color: "rgba(167,139,250,0.6)" }} className="flex-shrink-0" />
          <span
            className="flex-1 text-sm"
            style={{ color: "rgba(255,255,255,0.25)", fontFamily: "Figtree, sans-serif" }}
          >
            Search songs, artists...
          </span>
        </div>
      )}

      {/* ── RIGHT SPACER ── */}
      <div className="flex-1 flex justify-end">

        {/* ── AUTH ── */}
        {isLoggedIn ? (
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-3 rounded-2xl transition-all duration-200 hover:scale-105"
              style={{
                padding: "10px 20px",
                background: "rgba(124,58,237,0.15)",
                border: "1px solid rgba(124,58,237,0.3)",
                boxShadow: "0 0 20px rgba(124,58,237,0.1)",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                  color: "white",
                  boxShadow: "0 0 15px rgba(124,58,237,0.5)",
                }}
              >
                {user?.name.charAt(0).toUpperCase()}
              </div>
              <div className="text-left">
                <p className="text-white text-sm font-semibold">{user?.name}</p>
                <p className="text-white/40 text-xs">{user?.email}</p>
              </div>
              <ChevronDown
                size={16}
                className="text-white/40 transition-transform duration-200"
                style={{ transform: showDropdown ? "rotate(180deg)" : "rotate(0deg)" }}
              />
            </button>

            {showDropdown && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />
                <div
                  className="absolute right-0 top-full mt-3 rounded-3xl overflow-hidden z-50"
                  style={{
                    width: "280px",
                    background: "rgba(15,15,15,0.98)",
                    border: "1px solid rgba(124,58,237,0.25)",
                    boxShadow: "0 25px 60px rgba(0,0,0,0.8)",
                  }}
                >
                  {/* User Info */}
                  <div className="p-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="flex items-center gap-4">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl flex-shrink-0"
                        style={{
                          background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                          color: "white",
                          boxShadow: "0 0 20px rgba(124,58,237,0.5)",
                        }}
                      >
                        {user?.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="text-white text-base font-bold truncate">{user?.name}</p>
                        <p className="text-white/40 text-sm truncate mt-0.5">{user?.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-3 flex flex-col gap-1">
                    <button
                      onClick={() => { setShowDropdown(false); router.push("/profile/change-email"); }}
                      className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-200 text-left"
                      style={{ background: "transparent", border: "1px solid transparent" }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.1)";
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.2)";
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.background = "transparent";
                        (e.currentTarget as HTMLElement).style.borderColor = "transparent";
                      }}
                    >
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(124,58,237,0.15)" }}>
                        <Mail size={18} style={{ color: "#a855f7" }} />
                      </div>
                      <div>
                        <p className="text-white text-sm font-semibold">Change Email</p>
                        <p className="text-white/30 text-xs mt-0.5">Update your email address</p>
                      </div>
                    </button>

                    <button
                      onClick={() => { setShowDropdown(false); router.push("/profile/change-password"); }}
                      className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-200 text-left"
                      style={{ background: "transparent", border: "1px solid transparent" }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.1)";
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.2)";
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.background = "transparent";
                        (e.currentTarget as HTMLElement).style.borderColor = "transparent";
                      }}
                    >
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(124,58,237,0.15)" }}>
                        <KeyRound size={18} style={{ color: "#a855f7" }} />
                      </div>
                      <div>
                        <p className="text-white text-sm font-semibold">Change Password</p>
                        <p className="text-white/30 text-xs mt-0.5">Update your password</p>
                      </div>
                    </button>
                  </div>

                  {/* Logout */}
                  <div className="p-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <button
                      onClick={() => { setShowDropdown(false); logout(); }}
                      className="w-full flex items-center justify-center gap-3 rounded-2xl font-semibold transition-all duration-200 hover:scale-105"
                      style={{
                        padding: "16px",
                        background: "rgba(239,68,68,0.12)",
                        border: "1px solid rgba(239,68,68,0.25)",
                        color: "#f87171",
                        fontSize: "15px",
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.2)";
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.12)";
                      }}
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/login")}
              className="rounded-2xl font-semibold text-sm transition-all hover:scale-105"
              style={{
                padding: "12px 28px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              Log in
            </button>
            <button
              onClick={() => router.push("/signup")}
              className="rounded-2xl font-semibold text-sm transition-all hover:scale-105"
              style={{
                padding: "12px 28px",
                background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                color: "white",
                boxShadow: "0 0 25px rgba(124,58,237,0.4)",
              }}
            >
              Sign up
            </button>
          </div>
        )}
      </div>
    </div>
  );
}