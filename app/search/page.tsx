"use client";

import { useState, useEffect, useRef } from "react";
import { songs } from "@/lib/songs";
import { Search, Play, X, Music2 } from "lucide-react";
import { useMusic } from "@/context/MusicContext";
import { useRouter } from "next/navigation";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(true);
  const { playSong } = useMusic();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, []);

  const filtered = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(query.toLowerCase()) ||
      song.artist.toLowerCase().includes(query.toLowerCase())
  );

  const genres = [
    { label: "Pop", color: "#7c3aed", emoji: "🎤" },
    { label: "Rock", color: "#dc2626", emoji: "🎸" },
    { label: "Jazz", color: "#d97706", emoji: "🎷" },
    { label: "Classical", color: "#059669", emoji: "🎻" },
    { label: "Hip Hop", color: "#db2777", emoji: "🎧" },
    { label: "Electronic", color: "#2563eb", emoji: "🎹" },
    { label: "R&B", color: "#9333ea", emoji: "🎵" },
    { label: "Country", color: "#b45309", emoji: "🤠" },
  ];

  return (
    <div className="h-full overflow-y-auto" style={{ background: "#080808" }}>

      {/* ── HERO SEARCH HEADER ── */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0e0118 0%, #080808 100%)",
          padding: "48px 48px 40px 48px",
        }}
      >
        {/* Glow blob */}
        <div
          className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)",
            filter: "blur(60px)",
            transform: "translate(20%, -20%)",
          }}
        />

        {/* Title — hides when focused */}
        <div
          className="relative z-10 transition-all duration-500 overflow-hidden"
          style={{
            maxHeight: focused ? "0px" : "80px",
            opacity: focused ? 0 : 1,
            marginBottom: focused ? "0" : "24px",
          }}
        >
          <h1
            className="text-white font-bold mb-1"
            style={{
              fontSize: "36px",
              fontFamily: "Figtree, sans-serif",
              textShadow: "0 0 40px rgba(167,139,250,0.3)",
            }}
          >
            Search 🔍
          </h1>
          <p className="text-white/30 text-sm">
            Find your favourite songs and artists
          </p>
        </div>

        {/* Search Input */}
        <div
          className="relative z-10 transition-all duration-500"
          style={{ maxWidth: focused ? "100%" : "640px" }}
        >
          <div
            className="flex items-center gap-4 px-6 rounded-2xl transition-all duration-500"
            style={{
              height: focused ? "72px" : "64px",
              background: focused
                ? "rgba(124,58,237,0.15)"
                : "rgba(255,255,255,0.06)",
              border: focused
                ? "1px solid rgba(124,58,237,0.5)"
                : "1px solid rgba(255,255,255,0.1)",
              boxShadow: focused
                ? "0 0 40px rgba(124,58,237,0.2), 0 8px 32px rgba(0,0,0,0.3)"
                : "0 8px 32px rgba(0,0,0,0.3)",
            }}
          >
            <Search
              size={22}
              className="flex-shrink-0 transition-all duration-300"
              style={{ color: focused ? "rgba(167,139,250,0.9)" : "rgba(167,139,250,0.5)" }}
            />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => !query && setFocused(false)}
              placeholder="What do you want to listen to?"
              className="flex-1 bg-transparent text-white placeholder-white/20 outline-none transition-all duration-300"
              style={{
                fontSize: focused ? "18px" : "16px",
                fontFamily: "Figtree, sans-serif",
              }}
            />
            {query && (
              <button
                onClick={() => {
                  setQuery("");
                  setFocused(true);
                  inputRef.current?.focus();
                }}
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: "rgba(255,255,255,0.1)" }}
              >
                <X size={16} style={{ color: "rgba(255,255,255,0.6)" }} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div style={{ padding: "32px 48px 40px 48px" }}>

        {/* ── NO QUERY ── */}
        {!query && (
          <div className="flex flex-col gap-10">

            {/* Genre Grid */}
            <section>
              <h2
                className="text-white text-xl font-bold mb-5"
                style={{ fontFamily: "Figtree, sans-serif" }}
              >
                Browse by Genre
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {genres.map(({ label, color, emoji }) => (
                  <div
                    key={label}
                    className="relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-1 flex items-center justify-center"
                    style={{
                      height: "100px",
                      background: `linear-gradient(135deg, ${color}cc 0%, ${color}44 100%)`,
                      border: `1px solid ${color}40`,
                      boxShadow: `0 4px 20px ${color}30`,
                    }}
                  >
                    <span className="absolute top-2 right-3 text-5xl opacity-20">
                      {emoji}
                    </span>
                    <p
                      className="text-white font-bold text-lg relative z-10"
                      style={{ fontFamily: "Figtree, sans-serif" }}
                    >
                      {emoji} {label}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* All Songs */}
            <section>
              <div className="flex items-center gap-3 mb-5">
                <Music2 size={18} className="text-purple-400" />
                <h2
                  className="text-white text-xl font-bold"
                  style={{ fontFamily: "Figtree, sans-serif" }}
                >
                  All Songs
                </h2>
              </div>

              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {songs.map((song, index) => (
                  <div
                    key={song.id}
                    onClick={() => {
                      playSong(song);
                      router.push("/now-playing");
                    }}
                    className="flex items-center gap-5 px-6 py-4 cursor-pointer transition-all duration-200 group"
                    style={{
                      borderBottom: index < songs.length - 1
                        ? "1px solid rgba(255,255,255,0.03)"
                        : "none",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.08)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                    }}
                  >
                    <div className="w-5 flex-shrink-0 flex items-center justify-center">
                      <span className="text-sm group-hover:hidden" style={{ color: "rgba(255,255,255,0.25)" }}>
                        {index + 1}
                      </span>
                      <Play size={14} fill="white" className="text-white hidden group-hover:block" />
                    </div>
                    <img
                      src={song.cover}
                      alt={song.title}
                      className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                      style={{ boxShadow: "0 4px 15px rgba(0,0,0,0.4)" }}
                    />
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-sm font-semibold truncate group-hover:text-purple-300 transition-colors"
                        style={{ color: "rgba(255,255,255,0.85)" }}
                      >
                        {song.title}
                      </p>
                      <p className="text-xs truncate mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                        {song.artist}
                      </p>
                    </div>
                    <p className="text-sm flex-shrink-0" style={{ color: "rgba(255,255,255,0.25)" }}>
                      {song.duration}
                    </p>
                  </div>
                ))}
              </div>
            </section>

          </div>
        )}

        {/* ── SEARCH RESULTS ── */}
        {query && (
          <div>
            <p
              className="text-white/40 text-sm mb-6"
              style={{ fontFamily: "Figtree, sans-serif" }}
            >
              {filtered.length} result{filtered.length !== 1 ? "s" : ""} for{" "}
              <span className="text-purple-400">"{query}"</span>
            </p>

            {filtered.length === 0 && (
              <div
                className="flex flex-col items-center justify-center py-24 gap-5 rounded-3xl"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <div
                  className="w-20 h-20 rounded-3xl flex items-center justify-center"
                  style={{
                    background: "rgba(124,58,237,0.15)",
                    border: "1px solid rgba(124,58,237,0.3)",
                  }}
                >
                  <Search size={32} style={{ color: "rgba(167,139,250,0.6)" }} />
                </div>
                <div className="text-center">
                  <p className="text-white/50 text-lg font-semibold mb-1">No results found</p>
                  <p className="text-white/20 text-sm">Try searching for a different song or artist</p>
                </div>
              </div>
            )}

            {filtered.length > 0 && (
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {filtered.map((song, index) => (
                  <div
                    key={song.id}
                    onClick={() => {
                      playSong(song);
                      router.push("/now-playing");
                    }}
                    className="flex items-center gap-5 px-6 py-4 cursor-pointer transition-all duration-200 group"
                    style={{
                      borderBottom: index < filtered.length - 1
                        ? "1px solid rgba(255,255,255,0.03)"
                        : "none",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.08)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                    }}
                  >
                    <Play
                      size={14}
                      fill="white"
                      className="text-white flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all"
                    />
                    <img
                      src={song.cover}
                      alt={song.title}
                      className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                      style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.5)" }}
                    />
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-base font-semibold truncate group-hover:text-purple-300 transition-colors"
                        style={{ color: "rgba(255,255,255,0.85)" }}
                      >
                        {song.title}
                      </p>
                      <p className="text-sm truncate mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                        {song.artist}
                      </p>
                    </div>
                    <p className="text-sm flex-shrink-0" style={{ color: "rgba(255,255,255,0.25)" }}>
                      {song.duration}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}