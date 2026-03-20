"use client";

import { songs } from "@/lib/songs";
import { Home, Mic2, Library, Heart, Clock, ListMusic, Disc3 } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMusic } from "@/context/MusicContext";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentSong, isPlaying, likedSongs, playSong } = useMusic();

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/artist", icon: Mic2, label: "Artist" },
    { href: "/library", icon: Library, label: "Library" },
  ];

  const libraryItems = [
    { icon: Heart, label: "Liked", sub: `${likedSongs.length} songs`, color: "#ec4899" },
    { icon: Clock, label: "Recent", sub: "8 played", color: "#f59e0b" },
    { icon: ListMusic, label: "Queue", sub: "Up next", color: "#6366f1" },
  ];

  return (
    <div
      className="hidden md:flex w-72 h-full flex-col flex-shrink-0 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0e0118 0%, #080808 100%)",
        borderRight: "1px solid rgba(124,58,237,0.12)",
      }}
    >
      {/* Top glow */}
      <div
        className="absolute top-0 left-0 w-72 h-72 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)",
          filter: "blur(40px)",
          transform: "translate(-20%, -20%)",
        }}
      />

      {/* ── LOGO ── */}
      <div className="flex-shrink-0 px-6 flex items-center gap-3" style={{ height: "80px" }}>
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #a855f7)",
            boxShadow: "0 0 25px rgba(124,58,237,0.6)",
          }}
        >
          <Disc3 size={22} className="text-white" />
        </div>
        <div>
          <p
            className="text-white font-bold text-2xl tracking-wider"
            style={{ fontFamily: "Figtree, sans-serif", textShadow: "0 0 20px rgba(167,139,250,0.4)" }}
          >
            MUSE
          </p>
          <p className="text-purple-400/40 text-xs tracking-widest">Music Player</p>
        </div>
      </div>

      {/* ── NAV GRID ── */}
      <div className="flex-shrink-0 px-5" style={{ marginBottom: "20px" }}>
        <div className="grid grid-cols-3 gap-2">
          {navItems.map(({ href, icon: Icon, label }) => {
            const active = pathname === href;
            return (
              <Link key={href} href={href}>
                <div
                  className="flex flex-col items-center justify-center gap-2 rounded-2xl cursor-pointer transition-all duration-300"
                  style={{
                    height: "100px",
                    background: active
                      ? "linear-gradient(135deg, rgba(124,58,237,0.35), rgba(168,85,247,0.15))"
                      : "rgba(255,255,255,0.03)",
                    border: active
                      ? "1px solid rgba(124,58,237,0.5)"
                      : "1px solid rgba(255,255,255,0.06)",
                    boxShadow: active ? "0 0 20px rgba(124,58,237,0.2)" : "none",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: active ? "rgba(124,58,237,0.4)" : "rgba(255,255,255,0.06)",
                    }}
                  >
                    <Icon size={18} style={{ color: active ? "#e9d5ff" : "rgba(255,255,255,0.35)" }} />
                  </div>
                  <span className="text-xs font-medium" style={{ color: active ? "#e9d5ff" : "rgba(255,255,255,0.35)" }}>
                    {label}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div
        className="flex-shrink-0 mx-5"
        style={{
          height: "1px",
          marginBottom: "20px",
          background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.3), transparent)",
        }}
      />

      {/* ── LIBRARY GRID ── */}
      <div className="flex-shrink-0 px-5" style={{ marginBottom: "20px" }}>
        <div className="grid grid-cols-3 gap-2">
          {libraryItems.map(({ icon: Icon, label, sub, color, href }) => (
          <div
            key={label}
            onClick={() => router.push(href)}
            className="flex flex-col items-center justify-center gap-2 rounded-2xl cursor-pointer transition-all duration-300"
              style={{
                height: "100px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = `${color}18`;
                (e.currentTarget as HTMLElement).style.borderColor = `${color}50`;
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${color}20` }}
              >
                <Icon size={18} style={{ color }} />
              </div>
              <span className="text-xs font-semibold text-center px-1" style={{ color: "rgba(255,255,255,0.6)" }}>
                {label}
              </span>
              <span className="text-xs text-center px-1" style={{ color: "rgba(255,255,255,0.25)" }}>
                {sub}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div
        className="flex-shrink-0 mx-5"
        style={{
          height: "1px",
          marginBottom: "20px",
          background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.3), transparent)",
        }}
      />

      {/* ── PLAYLIST LABEL ── */}
      <div className="flex-shrink-0 px-6" style={{ marginBottom: "10px" }}>
        <p
          className="text-xs font-semibold uppercase tracking-[0.2em]"
          style={{ color: "rgba(167,139,250,0.35)", fontFamily: "Figtree, sans-serif" }}
        >
          Playlist
        </p>
      </div>

      {/* ── PLAYLIST SONGS ── */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 flex flex-col gap-2 relative z-10">
        {songs.map((song) => {
          const active = currentSong.id === song.id;
          return (
            <div
              key={song.id}
              onClick={() => {
                playSong(song);
                router.push("/now-playing");
              }}
              className="flex items-center gap-3 px-4 rounded-2xl cursor-pointer transition-all duration-200"
              style={{
                height: "68px",
                background: active ? "rgba(124,58,237,0.15)" : "transparent",
                border: active ? "1px solid rgba(124,58,237,0.3)" : "1px solid transparent",
              }}
              onMouseEnter={e => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.1)";
                }
              }}
              onMouseLeave={e => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.borderColor = "transparent";
                }
              }}
            >
              <div className="relative flex-shrink-0">
                <img
                  src={song.cover}
                  alt={song.title}
                  className="w-11 h-11 rounded-xl object-cover"
                  style={{ boxShadow: active ? "0 0 15px rgba(124,58,237,0.5)" : "none" }}
                />
                {active && isPlaying && (
                  <div
                    className="absolute inset-0 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(0,0,0,0.55)" }}
                  >
                    <div className="flex gap-0.5 items-end h-4">
                      <div className="w-0.5 rounded-full bg-purple-400 animate-bounce" style={{ height: "6px", animationDelay: "0ms" }} />
                      <div className="w-0.5 rounded-full bg-purple-400 animate-bounce" style={{ height: "14px", animationDelay: "150ms" }} />
                      <div className="w-0.5 rounded-full bg-purple-400 animate-bounce" style={{ height: "10px", animationDelay: "300ms" }} />
                    </div>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate" style={{ color: active ? "#e9d5ff" : "rgba(255,255,255,0.6)" }}>
                  {song.title}
                </p>
                <p className="text-xs truncate mt-1" style={{ color: "rgba(255,255,255,0.25)" }}>
                  {song.artist}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}