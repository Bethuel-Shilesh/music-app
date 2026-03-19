"use client";

import { useMusic } from "@/context/MusicContext";
import { songs } from "@/lib/songs";
import { Heart, Clock, ListMusic, Play, Music2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LibraryPage() {
  const { likedSongs, currentSong, isPlaying, playSong } = useMusic();
  const router = useRouter();

  const likedSongsList = songs.filter((s) => likedSongs.includes(s.id));
  const recentSongs = songs.slice(0, 3);

  return (
    <div className="h-full overflow-y-auto" style={{ background: "#080808" }}>

      {/* ── HEADER ── */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0e0118 0%, #080808 100%)",
          padding: "48px 48px 48px 48px",
        }}
      >
        {/* Glow */}
        <div
          className="absolute top-0 left-0 w-96 h-96 pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)",
            filter: "blur(60px)",
            transform: "translate(-20%, -20%)",
          }}
        />

        <h1
          className="text-white font-bold mb-2 relative z-10"
          style={{
            fontSize: "36px",
            fontFamily: "Figtree, sans-serif",
            textShadow: "0 0 40px rgba(167,139,250,0.3)",
          }}
        >
          Your Library 📚
        </h1>
        <p className="text-white/30 text-sm relative z-10">
          Your music, your way
        </p>

        {/* Stats row */}
        <div className="flex items-center gap-5 mt-8 mb-2 relative z-10 max-w-lg">
          {[
            { icon: Heart, label: "Liked", count: likedSongs.length, color: "#ec4899" },
            { icon: Clock, label: "Recent", count: recentSongs.length, color: "#f59e0b" },
            { icon: ListMusic, label: "Queue", count: songs.length, color: "#6366f1" },
          ].map(({ icon: Icon, label, count, color }) => (
            <div
              key={label}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl flex-1"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: `${color}20` }}
              >
                <Icon size={16} style={{ color }} />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">{count}</p>
                <p className="text-white/30 text-xs">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "40px 48px 60px 48px" }} className="flex flex-col gap-16">

        {/* ── LIKED SONGS ── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(236,72,153,0.2)", border: "1px solid rgba(236,72,153,0.3)" }}
            >
              <Heart size={16} style={{ color: "#ec4899" }} />
            </div>
            <h2 className="text-white text-xl font-bold" style={{ fontFamily: "Figtree, sans-serif" }}>
              Liked Songs
            </h2>
            <span
              className="text-xs px-2 py-1 rounded-full"
              style={{ background: "rgba(236,72,153,0.15)", color: "#ec4899", border: "1px solid rgba(236,72,153,0.3)" }}
            >
              {likedSongs.length}
            </span>
          </div>

          {likedSongsList.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-16 rounded-3xl gap-4"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: "rgba(236,72,153,0.15)", border: "1px solid rgba(236,72,153,0.3)" }}
              >
                <Heart size={28} style={{ color: "rgba(236,72,153,0.6)" }} />
              </div>
              <p className="text-white/40 text-base font-semibold">No liked songs yet</p>
              <p className="text-white/20 text-sm">Click ❤️ on any song to like it</p>
            </div>
          ) : (
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {likedSongsList.map((song, index) => (
                <div
                  key={song.id}
                  onClick={() => {
                    playSong(song);
                    router.push("/now-playing");
                  }}
                  className="flex items-center gap-5 px-6 py-4 cursor-pointer transition-all duration-200 group"
                  style={{
                    borderBottom: index < likedSongsList.length - 1
                      ? "1px solid rgba(255,255,255,0.03)"
                      : "none",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(236,72,153,0.08)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                >
                  <Heart size={14} style={{ color: "#ec4899", fill: "#ec4899" }} className="flex-shrink-0" />
                  <img
                    src={song.cover}
                    alt={song.title}
                    className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                    style={{ boxShadow: "0 4px 15px rgba(0,0,0,0.4)" }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate group-hover:text-pink-300 transition-colors"
                      style={{ color: "rgba(255,255,255,0.85)" }}>
                      {song.title}
                    </p>
                    <p className="text-xs truncate mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                      {song.artist}
                    </p>
                  </div>
                  <Play size={14} fill="white" className="text-white opacity-0 group-hover:opacity-100 transition-all flex-shrink-0" />
                  <p className="text-sm flex-shrink-0" style={{ color: "rgba(255,255,255,0.25)" }}>
                    {song.duration}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── RECENTLY PLAYED ── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(245,158,11,0.2)", border: "1px solid rgba(245,158,11,0.3)" }}
            >
              <Clock size={16} style={{ color: "#f59e0b" }} />
            </div>
            <h2 className="text-white text-xl font-bold" style={{ fontFamily: "Figtree, sans-serif" }}>
              Recently Played
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {recentSongs.map((song) => (
              <div
                key={song.id}
                onClick={() => {
                  playSong(song);
                  router.push("/now-playing");
                }}
                className="flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 group"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(245,158,11,0.08)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(245,158,11,0.3)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                <img
                  src={song.cover}
                  alt={song.title}
                  className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                  style={{ boxShadow: "0 4px 15px rgba(0,0,0,0.4)" }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate text-white">{song.title}</p>
                  <p className="text-xs truncate mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                    {song.artist}
                  </p>
                </div>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all"
                  style={{ background: "rgba(245,158,11,0.3)" }}
                >
                  <Play size={14} fill="white" className="text-white ml-0.5" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── QUEUE ── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(99,102,241,0.2)", border: "1px solid rgba(99,102,241,0.3)" }}
            >
              <ListMusic size={16} style={{ color: "#6366f1" }} />
            </div>
            <h2 className="text-white text-xl font-bold" style={{ fontFamily: "Figtree, sans-serif" }}>
              Queue
            </h2>
          </div>

          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {songs.map((song, index) => {
              const isActive = currentSong.id === song.id;
              return (
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
                    background: isActive ? "rgba(99,102,241,0.08)" : "transparent",
                  }}
                  onMouseEnter={e => {
                    if (!isActive)(e.currentTarget as HTMLElement).style.background = "rgba(99,102,241,0.06)";
                  }}
                  onMouseLeave={e => {
                    if (!isActive)(e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                >
                  <div className="w-5 flex-shrink-0 flex items-center justify-center">
                    {isActive && isPlaying ? (
                      <div className="flex gap-0.5 items-end h-4">
                        <div className="w-0.5 rounded-full bg-indigo-400 animate-bounce" style={{ height: "6px", animationDelay: "0ms" }} />
                        <div className="w-0.5 rounded-full bg-indigo-400 animate-bounce" style={{ height: "14px", animationDelay: "150ms" }} />
                        <div className="w-0.5 rounded-full bg-indigo-400 animate-bounce" style={{ height: "10px", animationDelay: "300ms" }} />
                      </div>
                    ) : (
                      <>
                        <span className="text-sm group-hover:hidden" style={{ color: "rgba(255,255,255,0.25)" }}>
                          {index + 1}
                        </span>
                        <Play size={14} fill="white" className="text-white hidden group-hover:block" />
                      </>
                    )}
                  </div>

                  <img
                    src={song.cover}
                    alt={song.title}
                    className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                    style={{
                      boxShadow: isActive ? "0 0 15px rgba(99,102,241,0.5)" : "0 4px 15px rgba(0,0,0,0.4)",
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm font-semibold truncate transition-colors"
                      style={{ color: isActive ? "#a5b4fc" : "rgba(255,255,255,0.85)" }}
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
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}