"use client";

import { useMusic } from "@/context/MusicContext";
import { songs } from "@/lib/songs";
import { Heart, Play } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LikedPage() {
  const { likedSongs, playSong } = useMusic();
  const router = useRouter();

  const likedSongsList = songs.filter((s) => likedSongs.includes(s.id));

  return (
    <div className="h-full overflow-y-auto" style={{ background: "#080808" }}>

      {/* ── HEADER ── */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1a0533 0%, #080808 100%)",
          padding: "48px 48px 48px 48px",
        }}
      >
        <div
          className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(236,72,153,0.2) 0%, transparent 70%)",
            filter: "blur(60px)",
            transform: "translate(20%, -20%)",
          }}
        />

        <div className="relative z-10 flex items-center gap-6">
          <div
            className="w-20 h-20 rounded-3xl flex items-center justify-center flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #ec4899, #db2777)",
              boxShadow: "0 0 40px rgba(236,72,153,0.5)",
            }}
          >
            <Heart size={36} className="text-white" fill="white" />
          </div>
          <div>
            <p className="text-white/40 text-sm uppercase tracking-widest mb-1">Playlist</p>
            <h1
              className="text-white font-bold mb-2"
              style={{
                fontSize: "42px",
                fontFamily: "Figtree, sans-serif",
                textShadow: "0 0 40px rgba(236,72,153,0.3)",
              }}
            >
              Liked Songs
            </h1>
            <p className="text-white/40 text-base">
              {likedSongsList.length} {likedSongsList.length === 1 ? "song" : "songs"}
            </p>
          </div>
        </div>

        {/* Play All button */}
        {likedSongsList.length > 0 && (
          <button
            onClick={() => {
              playSong(likedSongsList[0]);
              router.push("/now-playing");
            }}
            className="relative z-10 mt-8 flex items-center gap-3 rounded-2xl font-semibold transition-all duration-200 hover:scale-105"
            style={{
              padding: "16px 32px",
              background: "linear-gradient(135deg, #ec4899, #db2777)",
              color: "white",
              fontSize: "15px",
              boxShadow: "0 0 25px rgba(236,72,153,0.4)",
            }}
          >
            <Play size={20} fill="white" />
            Play All
          </button>
        )}
      </div>

      <div style={{ padding: "40px 48px 60px 48px" }}>

        {/* Empty state */}
        {likedSongsList.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center rounded-3xl gap-5"
            style={{
              padding: "80px 40px",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              className="w-24 h-24 rounded-3xl flex items-center justify-center"
              style={{
                background: "rgba(236,72,153,0.15)",
                border: "1px solid rgba(236,72,153,0.3)",
              }}
            >
              <Heart size={40} style={{ color: "rgba(236,72,153,0.6)" }} />
            </div>
            <div className="text-center">
              <p className="text-white/50 text-xl font-semibold mb-2">No liked songs yet</p>
              <p className="text-white/20 text-base">
                Click ❤️ on any song to add it here
              </p>
            </div>
          </div>
        ) : (

          /* Songs list */
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
              <div className="col-span-6 text-xs uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.2)" }}>Title</div>
              <div className="col-span-3 text-xs uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.2)" }}>Artist</div>
              <div className="col-span-2 flex justify-end text-xs uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.2)" }}>Duration</div>
            </div>

            {likedSongsList.map((song, index) => (
              <div
                key={song.id}
                onClick={() => {
                  playSong(song);
                  router.push("/now-playing");
                }}
                className="grid grid-cols-12 px-8 py-5 cursor-pointer transition-all duration-200 group items-center"
                style={{
                  borderBottom: index < likedSongsList.length - 1
                    ? "1px solid rgba(255,255,255,0.03)"
                    : "none",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(236,72,153,0.06)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                <div className="col-span-1 flex items-center">
                  <span className="text-base group-hover:hidden" style={{ color: "rgba(255,255,255,0.25)" }}>
                    {index + 1}
                  </span>
                  <Play size={16} fill="white" className="text-white hidden group-hover:block" />
                </div>

                <div className="col-span-6 flex items-center gap-4">
                  <img
                    src={song.cover}
                    alt={song.title}
                    className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                    style={{ boxShadow: "0 4px 15px rgba(0,0,0,0.4)" }}
                  />
                  <div className="min-w-0">
                    <p
                      className="font-semibold truncate group-hover:text-pink-300 transition-colors"
                      style={{ color: "rgba(255,255,255,0.85)", fontSize: "15px" }}
                    >
                      {song.title}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Heart size={12} style={{ color: "#ec4899", fill: "#ec4899" }} />
                      <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Liked</span>
                    </div>
                  </div>
                </div>

                <div className="col-span-3">
                  <p className="text-sm truncate" style={{ color: "rgba(255,255,255,0.35)" }}>
                    {song.artist}
                  </p>
                </div>

                <div className="col-span-2 flex justify-end">
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.25)" }}>
                    {song.duration}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}