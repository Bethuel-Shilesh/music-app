"use client";

import { useMusic } from "@/context/MusicContext";
import { ArrowLeft, Heart, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NowPlaying() {
  const router = useRouter();
  const {
    currentSong,
    isPlaying,
    likedSongs,
    toggleLike,
  } = useMusic();

  const isLiked = likedSongs.includes(currentSong.id);

  return (
    <div
      className="h-full w-full relative overflow-hidden flex flex-col"
      style={{ background: "#080808" }}
    >
      {/* Blurred background */}
      <div
        className="absolute inset-0 transition-all duration-1000"
        style={{
          backgroundImage: `url(${currentSong.cover})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(80px)",
          transform: "scale(1.4)",
          opacity: 0.3,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(8,8,8,0.6) 0%, rgba(8,8,8,0.85) 50%, rgba(8,8,8,1) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-16 py-10 items-center justify-center gap-10">

        {/* Top bar */}
        <div className="absolute top-8 left-8 right-8 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all hover:scale-105"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-medium">Back</span>
          </button>

          <p
            className="text-white/40 text-sm uppercase tracking-widest"
            style={{ fontFamily: "Figtree, sans-serif" }}
          >
            Now Playing
          </p>

          <button
            className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all hover:scale-105"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            <Share2 size={16} />
            <span className="text-sm font-medium">Share</span>
          </button>
        </div>

        {/* ── TURNTABLE ── */}
        <div className="relative" style={{ width: "300px", height: "300px" }}>

          {/* Base plate */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: "linear-gradient(135deg, #1a1a1a, #111)",
              border: "4px solid #2a2a2a",
              boxShadow: "0 0 80px rgba(124,58,237,0.3), inset 0 0 40px rgba(0,0,0,0.8)",
            }}
          />

          {/* Groove rings */}
          {[16, 32, 48, 64].map((inset) => (
            <div
              key={inset}
              className="absolute rounded-full"
              style={{
                inset: `${inset}px`,
                border: "1px solid rgba(255,255,255,0.04)",
              }}
            />
          ))}

          {/* Spinning vinyl */}
          <div
            className={`absolute rounded-full overflow-hidden ${isPlaying ? "animate-spin" : ""}`}
            style={{
              inset: "24px",
              animationDuration: "6s",
              boxShadow: isPlaying
                ? "0 0 40px rgba(124,58,237,0.6)"
                : "0 0 20px rgba(0,0,0,0.5)",
              transition: "box-shadow 0.5s ease",
            }}
          >
            <img
              src={currentSong.cover}
              alt={currentSong.title}
              className="w-full h-full object-cover rounded-full"
            />
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: "radial-gradient(circle, transparent 20%, rgba(0,0,0,0.55) 70%)",
              }}
            />
          </div>

          {/* Center hole */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="w-7 h-7 rounded-full z-10"
              style={{
                background: "#080808",
                border: "2px solid rgba(124,58,237,0.5)",
                boxShadow: "0 0 10px rgba(124,58,237,0.3)",
              }}
            />
          </div>

          {/* ── TONEARM ── */}
          <div className="absolute z-20" style={{ top: "-12px", right: "-12px" }}>
            <div
              className="w-6 h-6 rounded-full"
              style={{
                background: "linear-gradient(135deg, #444, #222)",
                border: "2px solid rgba(124,58,237,0.5)",
                boxShadow: "0 0 10px rgba(124,58,237,0.3)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "12px",
                left: "12px",
                width: "7px",
                height: "120px",
                transformOrigin: "top center",
                transform: isPlaying ? "rotate(28deg)" : "rotate(5deg)",
                transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <div
                className="w-full rounded-full"
                style={{
                  height: "90px",
                  background: "linear-gradient(180deg, #999 0%, #555 100%)",
                  boxShadow: "0 0 10px rgba(124,58,237,0.3)",
                }}
              />
              <div
                style={{
                  width: "20px",
                  height: "6px",
                  background: "#777",
                  borderRadius: "3px",
                  marginTop: "-2px",
                  marginLeft: "-7px",
                  transform: "rotate(-20deg)",
                }}
              />
              <div
                style={{
                  width: "9px",
                  height: "16px",
                  background: "linear-gradient(180deg, #bbb 0%, #444 100%)",
                  borderRadius: "0 0 4px 4px",
                  marginTop: "2px",
                  marginLeft: "-1px",
                  boxShadow: isPlaying
                    ? "0 4px 12px rgba(167,139,250,0.9)"
                    : "none",
                  transition: "box-shadow 0.5s ease",
                }}
              />
            </div>
          </div>
        </div>

        {/* Song Info */}
        <div className="flex flex-col items-center gap-2">
          <h1
            className="text-white text-3xl font-bold text-center"
            style={{
              fontFamily: "Figtree, sans-serif",
              textShadow: "0 0 30px rgba(167,139,250,0.3)",
            }}
          >
            {currentSong.title}
          </h1>
          <p className="text-white/40 text-base">{currentSong.artist}</p>

          {/* Like button */}
          <button
            onClick={() => toggleLike(currentSong.id)}
            className="mt-2 transition-transform hover:scale-110"
          >
            <Heart
              size={24}
              style={{
                fill: isLiked ? "#a855f7" : "none",
                color: isLiked ? "#a855f7" : "rgba(255,255,255,0.3)",
              }}
            />
          </button>
        </div>

      </div>
    </div>
  );
}