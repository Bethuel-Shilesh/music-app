"use client";

import { songs } from "@/lib/songs";
import { Play, Music2 } from "lucide-react";
import { useMusic } from "@/context/MusicContext";
import { useRouter } from "next/navigation";

export default function ArtistPage() {
  const { playSong } = useMusic();
  const router = useRouter();

  // Group songs by artist
  const artists = songs.reduce((acc, song) => {
    if (!acc[song.artist]) {
      acc[song.artist] = [];
    }
    acc[song.artist].push(song);
    return acc;
  }, {} as Record<string, typeof songs>);

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
          className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)",
            filter: "blur(60px)",
            transform: "translate(20%, -20%)",
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
          Artists 🎤
        </h1>
        <p className="text-white/30 text-base relative z-10">
          Browse music by your favourite artists
        </p>
      </div>

      {/* ── ARTISTS ── */}
      <div style={{ padding: "40px 48px 60px 48px" }} className="flex flex-col gap-16">
        {Object.entries(artists).map(([artist, artistSongs]) => (
          <section key={artist}>

            {/* Artist Header */}
            <div
              className="flex items-center gap-6 p-6 rounded-3xl mb-8"
              style={{
                background: "rgba(124,58,237,0.08)",
                border: "1px solid rgba(124,58,237,0.15)",
              }}
            >
              {/* Artist Avatar */}
              <div
                className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0"
                style={{
                  boxShadow: "0 0 30px rgba(124,58,237,0.4)",
                }}
              >
                <img
                  src={artistSongs[0].cover}
                  alt={artist}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Artist Info */}
              <div className="flex-1 min-w-0">
                <p className="text-purple-400/60 text-xs uppercase tracking-widest mb-2">Artist</p>
                <h2
                  className="text-white font-bold truncate"
                  style={{
                    fontSize: "32px",
                    fontFamily: "Figtree, sans-serif",
                    textShadow: "0 0 20px rgba(167,139,250,0.3)",
                  }}
                >
                  {artist}
                </h2>
                <p className="text-white/40 text-base mt-1">
                  {artistSongs.length} {artistSongs.length === 1 ? "song" : "songs"}
                </p>
              </div>

              {/* Play All button */}
              <button
                onClick={() => {
                  playSong(artistSongs[0]);
                  router.push("/now-playing");
                }}
                className="flex items-center gap-3 rounded-2xl font-semibold transition-all duration-200 hover:scale-105 flex-shrink-0"
                style={{
                  padding: "16px 32px",
                  background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                  color: "white",
                  fontSize: "15px",
                  boxShadow: "0 0 25px rgba(124,58,237,0.5)",
                }}
              >
                <Play size={20} fill="white" />
                Play All
              </button>
            </div>

            {/* Artist Songs */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {artistSongs.map((song, index) => (
                <div
                  key={song.id}
                  onClick={() => {
                    playSong(song);
                    router.push("/now-playing");
                  }}
                  className="flex items-center gap-6 cursor-pointer transition-all duration-200 group"
                  style={{
                    padding: "20px 32px",
                    borderBottom: index < artistSongs.length - 1
                      ? "1px solid rgba(255,255,255,0.04)"
                      : "none",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.08)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                >
                  {/* Number / Play */}
                  <div className="w-8 flex items-center justify-center flex-shrink-0">
                    <span className="text-base group-hover:hidden" style={{ color: "rgba(255,255,255,0.25)" }}>
                      {index + 1}
                    </span>
                    <Play size={18} fill="white" className="text-white hidden group-hover:block" />
                  </div>

                  {/* Cover */}
                  <img
                    src={song.cover}
                    alt={song.title}
                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                    style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }}
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-semibold truncate group-hover:text-purple-300 transition-colors"
                      style={{ color: "rgba(255,255,255,0.85)", fontSize: "16px" }}
                    >
                      {song.title}
                    </p>
                    <p className="text-sm truncate mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                      {song.artist}
                    </p>
                  </div>

                  {/* Duration */}
                  <p className="text-base flex-shrink-0" style={{ color: "rgba(255,255,255,0.25)" }}>
                    {song.duration}
                  </p>
                </div>
              ))}
            </div>

          </section>
        ))}
      </div>
    </div>
  );
}