"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { songs } from "@/lib/songs";
import { Play, Music2, Clock, Search } from "lucide-react";
import { useMusic } from "@/context/MusicContext";

export default function Home() {
  const router = useRouter();
  const { playSong } = useMusic();
  const [activeBg, setActiveBg] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setActiveBg((prev) => (prev + 1) % songs.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  if (!mounted) return null;

  return (
    <div className="h-full overflow-y-auto" style={{ background: "#080808" }}>

      {/* ── TOP SEARCH BAR ── */}
      <div
        className="sticky top-0 z-50"
        style={{
          padding: "16px 48px",
          background: "rgba(8,8,8,0.85)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div
          onClick={() => router.push("/search")}
          className="flex items-center gap-4 px-6 rounded-2xl cursor-pointer transition-all duration-300"
          style={{
            height: "52px",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.08)",
            maxWidth: "560px",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.12)";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.4)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(124,58,237,0.15)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
            (e.currentTarget as HTMLElement).style.boxShadow = "none";
          }}
        >
          <Search size={18} style={{ color: "rgba(167,139,250,0.6)" }} className="flex-shrink-0" />
          <span
            className="flex-1 text-sm"
            style={{
              color: "rgba(255,255,255,0.25)",
              fontFamily: "Figtree, sans-serif",
            }}
          >
            Search songs, artists...
          </span>
          <div
            className="px-3 py-1 rounded-lg text-xs flex-shrink-0"
            style={{
              background: "rgba(124,58,237,0.2)",
              color: "rgba(167,139,250,0.7)",
              border: "1px solid rgba(124,58,237,0.3)",
            }}
          >
            Search
          </div>
        </div>
      </div>

      {/* ── HERO SECTION ── */}
      <div className="relative w-full" style={{ height: "380px" }}>

        {/* Blurred backgrounds */}
        {songs.map((song, index) => (
          <div
            key={song.id}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: activeBg === index ? 1 : 0 }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${song.cover})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "blur(60px)",
                transform: "scale(1.4)",
                opacity: 0.4,
              }}
            />
          </div>
        ))}

        {/* Overlays */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(180deg, rgba(8,8,8,0.3) 0%, rgba(8,8,8,0.6) 60%, rgba(8,8,8,1) 100%)",
        }} />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(90deg, rgba(8,8,8,0.7) 0%, transparent 100%)",
        }} />

        {/* Hero Content */}
        <div
          className="absolute inset-0 flex items-center"
          style={{ paddingLeft: "48px", paddingRight: "48px" }}
        >
          <div className="flex items-center gap-10 w-full">

            {/* Album Art */}
            <div
              className="flex-shrink-0 relative"
              style={{
                width: "190px",
                height: "190px",
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: "0 20px 60px rgba(0,0,0,0.8), 0 0 40px rgba(124,58,237,0.3)",
              }}
            >
              {songs.map((song, index) => (
                <img
                  key={song.id}
                  src={song.cover}
                  alt={song.title}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                  style={{ opacity: activeBg === index ? 1 : 0 }}
                />
              ))}
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p
                className="text-xs uppercase tracking-[0.25em] mb-4"
                style={{ color: "rgba(167,139,250,0.7)" }}
              >
                ✦ {greeting()}
              </p>

              {/* Song title */}
              <div className="relative mb-2" style={{ height: "72px" }}>
                {songs.map((song, index) => (
                  <h1
                    key={song.id}
                    className="absolute top-0 left-0 font-bold transition-all duration-700"
                    style={{
                      fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                      color: "white",
                      opacity: activeBg === index ? 1 : 0,
                      transform: activeBg === index ? "translateY(0)" : "translateY(12px)",
                      fontFamily: "Figtree, sans-serif",
                      fontWeight: 800,
                      lineHeight: 1.1,
                      textShadow: "0 0 40px rgba(167,139,250,0.3)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "100%",
                    }}
                  >
                    {song.title}
                  </h1>
                ))}
              </div>

              {/* Artist */}
              <div className="relative" style={{ height: "28px" }}>
                {songs.map((song, index) => (
                  <p
                    key={song.id}
                    className="absolute top-0 left-0 transition-all duration-700"
                    style={{
                      color: "rgba(255,255,255,0.45)",
                      fontSize: "16px",
                      opacity: activeBg === index ? 1 : 0,
                      transform: activeBg === index ? "translateY(0)" : "translateY(8px)",
                    }}
                  >
                    {song.artist}
                  </p>
                ))}
              </div>

              {/* Play button */}
              <button
                onClick={() => {
                  playSong(songs[activeBg]);
                  router.push("/now-playing");
                }}
                className="mt-7 flex items-center gap-3 px-8 py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                  color: "white",
                  boxShadow: "0 0 30px rgba(124,58,237,0.5)",
                }}
              >
                <Play size={16} fill="white" />
                Play Now
              </button>
            </div>

            {/* Dot indicators */}
            <div className="flex flex-col gap-2.5 flex-shrink-0">
              {songs.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveBg(index)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: "6px",
                    height: activeBg === index ? "24px" : "6px",
                    background: activeBg === index
                      ? "linear-gradient(180deg, #7c3aed, #a855f7)"
                      : "rgba(255,255,255,0.2)",
                    boxShadow: activeBg === index ? "0 0 10px rgba(124,58,237,0.6)" : "none",
                  }}
                />
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ padding: "32px 48px 40px 48px" }} className="flex flex-col gap-10">

        {/* ── TODAY'S RECOMMENDATION ── */}
        <section>
          <h2
            className="text-white text-xl font-bold mb-5"
            style={{ fontFamily: "Figtree, sans-serif" }}
          >
            Today's Recommendation 🎯
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {songs.slice(0, 2).map((song) => (
              <div
                key={song.id}
                onClick={() => {
                  playSong(song);
                  router.push("/now-playing");
                }}
                className="flex items-center gap-4 p-5 rounded-2xl cursor-pointer transition-all duration-300 group"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.12)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.3)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                <img
                  src={song.cover}
                  alt={song.title}
                  className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                  style={{ boxShadow: "0 4px 15px rgba(0,0,0,0.4)" }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold truncate">{song.title}</p>
                  <p className="text-white/40 text-xs mt-1.5 truncate">{song.artist}</p>
                </div>
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                    boxShadow: "0 0 20px rgba(124,58,237,0.5)",
                  }}
                >
                  <Play size={15} fill="white" className="text-white ml-0.5" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── ALL SONGS ── */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <Music2 size={18} className="text-purple-400" />
            <h2 className="text-white text-xl font-bold">All Songs</h2>
          </div>

          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {/* Header */}
            <div
              className="grid grid-cols-12 px-8 py-4"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
            >
              <div className="col-span-1 text-xs uppercase tracking-widest"
                style={{ color: "rgba(255,255,255,0.2)" }}>#</div>
              <div className="col-span-5 text-xs uppercase tracking-widest"
                style={{ color: "rgba(255,255,255,0.2)" }}>Title</div>
              <div className="col-span-4 text-xs uppercase tracking-widest"
                style={{ color: "rgba(255,255,255,0.2)" }}>Artist</div>
              <div className="col-span-2 flex justify-end"
                style={{ color: "rgba(255,255,255,0.2)" }}>
                <Clock size={13} />
              </div>
            </div>

            {/* Rows */}
            {songs.map((song, index) => (
              <div
                key={song.id}
                onClick={() => {
                  playSong(song);
                  router.push("/now-playing");
                }}
                className="grid grid-cols-12 px-8 py-5 cursor-pointer transition-all duration-200 group items-center"
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
                <div className="col-span-1">
                  <span className="text-sm group-hover:hidden"
                    style={{ color: "rgba(255,255,255,0.3)" }}>
                    {index + 1}
                  </span>
                  <Play size={14} fill="white" className="text-white hidden group-hover:block" />
                </div>

                <div className="col-span-5 flex items-center gap-4">
                  <img
                    src={song.cover}
                    alt={song.title}
                    className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                    style={{ boxShadow: "0 4px 15px rgba(0,0,0,0.3)" }}
                  />
                  <p
                    className="text-sm font-semibold truncate group-hover:text-purple-300 transition-colors"
                    style={{ color: "rgba(255,255,255,0.85)" }}
                  >
                    {song.title}
                  </p>
                </div>

                <div className="col-span-4">
                  <p className="text-sm truncate"
                    style={{ color: "rgba(255,255,255,0.35)" }}>
                    {song.artist}
                  </p>
                </div>

                <div className="col-span-2 flex justify-end">
                  <p className="text-sm"
                    style={{ color: "rgba(255,255,255,0.25)" }}>
                    {song.duration}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}