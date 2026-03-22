"use client";

import { useState } from "react";
import { songs } from "@/lib/songs";
import { Play } from "lucide-react";
import { useMusic } from "@/context/MusicContext";
import { useRouter } from "next/navigation";

const moods = [
  {
    id: "happy",
    label: "Happy",
    emoji: "😊",
    color: "#f59e0b",
    gradient: "linear-gradient(135deg, #f59e0b, #fbbf24)",
    description: "Feel good vibes",
    songs: ["1", "2"],
  },
  {
    id: "sad",
    label: "Sad",
    emoji: "😢",
    color: "#6366f1",
    gradient: "linear-gradient(135deg, #4f46e5, #6366f1)",
    description: "Let it out",
    songs: ["3"],
  },
  {
    id: "party",
    label: "Party",
    emoji: "🎉",
    color: "#ec4899",
    gradient: "linear-gradient(135deg, #ec4899, #f472b6)",
    description: "Turn it up!",
    songs: ["1", "4"],
  },
  {
    id: "romantic",
    label: "Romantic",
    emoji: "💕",
    color: "#ef4444",
    gradient: "linear-gradient(135deg, #ef4444, #f87171)",
    description: "Love is in the air",
    songs: ["1", "3"],
  },
  {
    id: "workout",
    label: "Workout",
    emoji: "💪",
    color: "#10b981",
    gradient: "linear-gradient(135deg, #059669, #10b981)",
    description: "Push your limits",
    songs: ["2", "4"],
  },
];

export default function MoodPage() {
  const { playSong } = useMusic();
  const router = useRouter();
  const [activeMood, setActiveMood] = useState<string | null>(null);

  const activeMoodData = moods.find((m) => m.id === activeMood);
  const moodSongs = activeMoodData
    ? songs.filter((s) => activeMoodData.songs.includes(s.id))
    : [];

  return (
    <div className="h-full overflow-y-auto" style={{ background: "#080808" }}>

      {/* ── HEADER ── */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0a0a1a 0%, #080808 100%)",
          padding: "48px 48px 48px 48px",
        }}
      >
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
            fontSize: "42px",
            fontFamily: "Figtree, sans-serif",
            textShadow: "0 0 40px rgba(167,139,250,0.3)",
          }}
        >
          Mood 🎭
        </h1>
        <p className="text-white/30 text-base relative z-10">
          Pick your mood and we'll play the perfect songs
        </p>
      </div>

      <div style={{ padding: "40px 48px 60px 48px" }} className="flex flex-col gap-12">

        {/* ── MOOD GRID ── */}
        <section>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {moods.map((mood) => {
              const isActive = activeMood === mood.id;
              return (
                <div
                  key={mood.id}
                  onClick={() => setActiveMood(isActive ? null : mood.id)}
                  className="flex flex-col items-center justify-center gap-3 rounded-3xl cursor-pointer transition-all duration-300"
                  style={{
                    padding: "32px 16px",
                    background: isActive
                      ? mood.gradient
                      : "rgba(255,255,255,0.03)",
                    border: isActive
                      ? `1px solid ${mood.color}80`
                      : "1px solid rgba(255,255,255,0.06)",
                    boxShadow: isActive
                      ? `0 0 30px ${mood.color}40`
                      : "none",
                    transform: isActive ? "translateY(-4px)" : "translateY(0)",
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.background = `${mood.color}18`;
                      (e.currentTarget as HTMLElement).style.borderColor = `${mood.color}50`;
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    }
                  }}
                >
                  <span style={{ fontSize: "48px" }}>{mood.emoji}</span>
                  <p
                    className="font-bold text-lg"
                    style={{
                      color: isActive ? "white" : "rgba(255,255,255,0.7)",
                      fontFamily: "Figtree, sans-serif",
                    }}
                  >
                    {mood.label}
                  </p>
                  <p
                    className="text-xs text-center"
                    style={{ color: isActive ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.3)" }}
                  >
                    {mood.description}
                  </p>
                  <div
                    className="px-3 py-1 rounded-full text-xs font-medium mt-1"
                    style={{
                      background: isActive ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.05)",
                      color: isActive ? "white" : "rgba(255,255,255,0.3)",
                    }}
                  >
                    {mood.songs.length} songs
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── MOOD SONGS ── */}
        {activeMood && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <span style={{ fontSize: "32px" }}>{activeMoodData?.emoji}</span>
              <h2
                className="text-white text-2xl font-bold"
                style={{ fontFamily: "Figtree, sans-serif" }}
              >
                {activeMoodData?.label} Playlist
              </h2>
            </div>

            {moodSongs.length === 0 ? (
              <div
                className="flex items-center justify-center rounded-3xl"
                style={{
                  padding: "60px",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <p className="text-white/30 text-lg">No songs for this mood yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {moodSongs.map((song) => (
                  <div
                    key={song.id}
                    onClick={() => {
                      playSong(song);
                      router.push("/now-playing");
                    }}
                    className="flex items-center gap-4 rounded-2xl cursor-pointer transition-all duration-300 group"
                    style={{
                      padding: "20px 24px",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.background = `${activeMoodData?.color}15`;
                      (e.currentTarget as HTMLElement).style.borderColor = `${activeMoodData?.color}40`;
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
                      className="w-16 h-16 rounded-2xl object-cover flex-shrink-0"
                      style={{ boxShadow: "0 4px 15px rgba(0,0,0,0.4)" }}
                    />
                    <div className="flex-1 min-w-0">
                      <p
                        className="font-semibold truncate transition-colors"
                        style={{ color: "rgba(255,255,255,0.85)", fontSize: "15px" }}
                      >
                        {song.title}
                      </p>
                      <p className="text-sm truncate mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                        {song.artist}
                      </p>
                      <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.2)" }}>
                        {song.duration}
                      </p>
                    </div>
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
                      style={{
                        background: activeMoodData?.gradient,
                        boxShadow: `0 0 20px ${activeMoodData?.color}50`,
                      }}
                    >
                      <Play size={18} fill="white" className="text-white ml-0.5" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* No mood selected state */}
        {!activeMood && (
          <div
            className="flex flex-col items-center justify-center rounded-3xl gap-4"
            style={{
              padding: "60px",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <span style={{ fontSize: "56px" }}>🎭</span>
            <p className="text-white/50 text-xl font-semibold">Select a mood above</p>
            <p className="text-white/20 text-base">We'll show you the perfect songs</p>
          </div>
        )}

      </div>
    </div>
  );
}