"use client";

import { useState } from "react";
import { songs } from "@/lib/songs";
import { Play, TrendingUp, Flame } from "lucide-react";
import { useMusic } from "@/context/MusicContext";
import { useRouter } from "next/navigation";

export default function TrendingPage() {
  const { playSong } = useMusic();
  const router = useRouter();

  // Simulate play counts
  const playCounts: Record<string, number> = {
    "1": 850000,
    "2": 620000,
    "3": 480000,
    "4": 320000,
    };

    const trendingSongs = songs.map((song, index) => ({
    ...song,
    plays: playCounts[song.id] || 100000,
    rank: index + 1,
    })).sort((a, b) => b.plays - a.plays);

  const formatPlays = (plays: number) => {
    if (plays >= 1000000) return `${(plays / 1000000).toFixed(1)}M plays`;
    if (plays >= 1000) return `${(plays / 1000).toFixed(0)}K plays`;
    return `${plays} plays`;
  };

  return (
    <div className="h-full overflow-y-auto" style={{ background: "#080808" }}>

      {/* ── HEADER ── */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1a0a00 0%, #080808 100%)",
          padding: "48px 48px 48px 48px",
        }}
      >
        <div
          className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(245,158,11,0.2) 0%, transparent 70%)",
            filter: "blur(60px)",
            transform: "translate(20%, -20%)",
          }}
        />

        <div className="relative z-10 flex items-center gap-6">
          <div
            className="w-20 h-20 rounded-3xl flex items-center justify-center flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #f59e0b, #d97706)",
              boxShadow: "0 0 40px rgba(245,158,11,0.5)",
            }}
          >
            <Flame size={36} className="text-white" />
          </div>
          <div>
            <p className="text-white/40 text-sm uppercase tracking-widest mb-1">Charts</p>
            <h1
              className="text-white font-bold mb-2"
              style={{
                fontSize: "42px",
                fontFamily: "Figtree, sans-serif",
                textShadow: "0 0 40px rgba(245,158,11,0.3)",
              }}
            >
              Trending Now 🔥
            </h1>
            <p className="text-white/40 text-base">
              Most played songs right now
            </p>
          </div>
        </div>
      </div>

      {/* ── TRENDING LIST ── */}
      <div style={{ padding: "40px 48px 60px 48px" }}>
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Header */}
          <div
            className="grid grid-cols-12 px-8 py-5"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
          >
            <div className="col-span-1 text-xs uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.2)" }}>#</div>
            <div className="col-span-5 text-xs uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.2)" }}>Title</div>
            <div className="col-span-3 text-xs uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.2)" }}>Artist</div>
            <div className="col-span-2 text-xs uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.2)" }}>Plays</div>
            <div className="col-span-1 flex justify-end text-xs uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.2)" }}>Time</div>
          </div>

          {trendingSongs.map((song, index) => (
            <div
              key={song.id}
              onClick={() => {
                playSong(song);
                router.push("/now-playing");
              }}
              className="grid grid-cols-12 px-8 py-5 cursor-pointer transition-all duration-200 group items-center"
              style={{
                borderBottom: index < trendingSongs.length - 1
                  ? "1px solid rgba(255,255,255,0.03)"
                  : "none",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "rgba(245,158,11,0.06)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              {/* Rank */}
              <div className="col-span-1 flex items-center gap-2">
                <span
                  className="font-bold text-base group-hover:hidden"
                  style={{
                    color: index === 0
                      ? "#f59e0b"
                      : index === 1
                      ? "rgba(255,255,255,0.5)"
                      : index === 2
                      ? "#cd7f32"
                      : "rgba(255,255,255,0.25)",
                  }}
                >
                  {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1}
                </span>
                <Play size={16} fill="white" className="text-white hidden group-hover:block" />
              </div>

              {/* Cover + Title */}
              <div className="col-span-5 flex items-center gap-4">
                <div className="relative flex-shrink-0">
                  <img
                    src={song.cover}
                    alt={song.title}
                    className="w-14 h-14 rounded-xl object-cover"
                    style={{ boxShadow: "0 4px 15px rgba(0,0,0,0.4)" }}
                  />
                  {index < 3 && (
                    <div
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                      style={{
                        background: index === 0 ? "#f59e0b" : index === 1 ? "#9ca3af" : "#cd7f32",
                        fontSize: "10px",
                      }}
                    >
                      🔥
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <p
                    className="font-semibold truncate group-hover:text-amber-300 transition-colors"
                    style={{ color: "rgba(255,255,255,0.85)", fontSize: "15px" }}
                  >
                    {song.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <TrendingUp size={12} style={{ color: "#f59e0b" }} />
                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Trending</span>
                  </div>
                </div>
              </div>

              {/* Artist */}
              <div className="col-span-3">
                <p className="text-sm truncate" style={{ color: "rgba(255,255,255,0.35)" }}>
                  {song.artist}
                </p>
              </div>

              {/* Plays */}
              <div className="col-span-2">
                <p className="text-sm font-medium" style={{ color: "rgba(245,158,11,0.7)" }}>
                  {formatPlays(song.plays)}
                </p>
              </div>

              {/* Duration */}
              <div className="col-span-1 flex justify-end">
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.25)" }}>
                  {song.duration}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}