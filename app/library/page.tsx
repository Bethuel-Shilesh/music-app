"use client";

import { useState } from "react";
import { useMusic } from "@/context/MusicContext";
import { songs } from "@/lib/songs";
import { Play, Plus, ListMusic, Music2, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface Playlist {
  id: string;
  name: string;
  songs: string[];
}

export default function LibraryPage() {
  const { playSong } = useMusic();
  const router = useRouter();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [selectedSongs, setSelectedSongs] = useState<string[]>([]);

  const handleCreatePlaylist = () => {
    if (!playlistName.trim()) return;
    const newPlaylist: Playlist = {
      id: Date.now().toString(),
      name: playlistName,
      songs: selectedSongs,
    };
    setPlaylists([...playlists, newPlaylist]);
    setPlaylistName("");
    setSelectedSongs([]);
    setShowCreate(false);
  };

  const toggleSong = (songId: string) => {
    setSelectedSongs((prev) =>
      prev.includes(songId)
        ? prev.filter((id) => id !== songId)
        : [...prev, songId]
    );
  };

  const deletePlaylist = (id: string) => {
    setPlaylists(playlists.filter((p) => p.id !== id));
  };

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
        <div
          className="absolute top-0 left-0 w-96 h-96 pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)",
            filter: "blur(60px)",
            transform: "translate(-20%, -20%)",
          }}
        />
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h1
              className="text-white font-bold mb-2"
              style={{
                fontSize: "42px",
                fontFamily: "Figtree, sans-serif",
                textShadow: "0 0 40px rgba(167,139,250,0.3)",
              }}
            >
              Your Library 📚
            </h1>
            <p className="text-white/30 text-base">
              Create and manage your playlists
            </p>
          </div>

          {/* Create Playlist Button */}
          <button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-3 rounded-2xl font-semibold transition-all duration-200 hover:scale-105"
            style={{
              padding: "16px 32px",
              background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              color: "white",
              fontSize: "15px",
              boxShadow: "0 0 25px rgba(124,58,237,0.4)",
            }}
          >
            <Plus size={20} />
            Create Playlist
          </button>
        </div>
      </div>

      <div style={{ padding: "40px 48px 60px 48px" }} className="flex flex-col gap-12">

        {/* ── CREATE PLAYLIST MODAL ── */}
        {showCreate && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(10px)" }}
          >
            <div
              className="relative w-full flex flex-col gap-6"
              style={{
                maxWidth: "560px",
                padding: "40px",
                background: "rgba(15,15,15,0.98)",
                border: "1px solid rgba(124,58,237,0.25)",
                borderRadius: "32px",
                boxShadow: "0 25px 60px rgba(0,0,0,0.8)",
                margin: "20px",
              }}
            >
              {/* Close */}
              <button
                onClick={() => setShowCreate(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-xl flex items-center justify-center transition hover:scale-110"
                style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}
              >
                <X size={16} />
              </button>

              <h2
                className="text-white font-bold"
                style={{ fontSize: "24px", fontFamily: "Figtree, sans-serif" }}
              >
                Create New Playlist
              </h2>

              {/* Playlist Name */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Playlist Name
                </label>
                <input
                  type="text"
                  value={playlistName}
                  onChange={(e) => setPlaylistName(e.target.value)}
                  placeholder="My Awesome Playlist"
                  className="rounded-2xl px-5 text-white placeholder-white/20 outline-none"
                  style={{
                    height: "56px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    fontSize: "15px",
                  }}
                />
              </div>

              {/* Select Songs */}
              <div className="flex flex-col gap-3">
                <label className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Select Songs ({selectedSongs.length} selected)
                </label>
                <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
                  {songs.map((song) => {
                    const selected = selectedSongs.includes(song.id);
                    return (
                      <div
                        key={song.id}
                        onClick={() => toggleSong(song.id)}
                        className="flex items-center gap-4 px-4 py-3 rounded-2xl cursor-pointer transition-all duration-200"
                        style={{
                          background: selected ? "rgba(124,58,237,0.2)" : "rgba(255,255,255,0.03)",
                          border: selected ? "1px solid rgba(124,58,237,0.4)" : "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        <img
                          src={song.cover}
                          alt={song.title}
                          className="w-10 h-10 rounded-xl object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold truncate" style={{ color: selected ? "#e9d5ff" : "rgba(255,255,255,0.7)" }}>
                            {song.title}
                          </p>
                          <p className="text-xs truncate mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>
                            {song.artist}
                          </p>
                        </div>
                        <div
                          className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{
                            background: selected ? "linear-gradient(135deg, #7c3aed, #a855f7)" : "rgba(255,255,255,0.08)",
                          }}
                        >
                          {selected && <span className="text-white text-xs">✓</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Create Button */}
              <button
                onClick={handleCreatePlaylist}
                disabled={!playlistName.trim()}
                className="w-full flex items-center justify-center gap-2 rounded-2xl font-semibold transition-all duration-200 hover:scale-105"
                style={{
                  height: "56px",
                  background: playlistName.trim()
                    ? "linear-gradient(135deg, #7c3aed, #a855f7)"
                    : "rgba(124,58,237,0.3)",
                  color: "white",
                  fontSize: "16px",
                  boxShadow: playlistName.trim() ? "0 0 25px rgba(124,58,237,0.4)" : "none",
                  cursor: playlistName.trim() ? "pointer" : "not-allowed",
                }}
              >
                <Plus size={18} />
                Create Playlist
              </button>
            </div>
          </div>
        )}

        {/* ── MY PLAYLISTS ── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.3)" }}
            >
              <ListMusic size={18} style={{ color: "#a855f7" }} />
            </div>
            <h2
              className="text-white text-2xl font-bold"
              style={{ fontFamily: "Figtree, sans-serif" }}
            >
              My Playlists
            </h2>
            <span
              className="text-sm px-3 py-1 rounded-full"
              style={{
                background: "rgba(124,58,237,0.15)",
                color: "#a855f7",
                border: "1px solid rgba(124,58,237,0.3)",
              }}
            >
              {playlists.length}
            </span>
          </div>

          {playlists.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center rounded-3xl gap-5"
              style={{
                padding: "60px 40px",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                className="w-20 h-20 rounded-3xl flex items-center justify-center"
                style={{
                  background: "rgba(124,58,237,0.15)",
                  border: "1px solid rgba(124,58,237,0.3)",
                }}
              >
                <ListMusic size={36} style={{ color: "rgba(167,139,250,0.6)" }} />
              </div>
              <div className="text-center">
                <p className="text-white/50 text-lg font-semibold mb-2">No playlists yet</p>
                <p className="text-white/20 text-sm">Click "Create Playlist" to get started</p>
              </div>
              <button
                onClick={() => setShowCreate(true)}
                className="flex items-center gap-2 rounded-2xl font-semibold transition-all hover:scale-105"
                style={{
                  padding: "14px 28px",
                  background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                  color: "white",
                  fontSize: "14px",
                  boxShadow: "0 0 20px rgba(124,58,237,0.4)",
                }}
              >
                <Plus size={16} />
                Create Playlist
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-5">
              {playlists.map((playlist) => (
                <div
                  key={playlist.id}
                  className="rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
                  }}
                >
                  {/* Playlist Header */}
                  <div
                    className="p-6"
                    style={{
                      background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(168,85,247,0.05))",
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center"
                        style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
                      >
                        <ListMusic size={22} className="text-white" />
                      </div>
                      <button
                        onClick={() => deletePlaylist(playlist.id)}
                        className="w-8 h-8 rounded-xl flex items-center justify-center transition hover:scale-110"
                        style={{ background: "rgba(239,68,68,0.15)", color: "#f87171" }}
                      >
                        <X size={14} />
                      </button>
                    </div>
                    <h3
                      className="text-white font-bold text-lg truncate"
                      style={{ fontFamily: "Figtree, sans-serif" }}
                    >
                      {playlist.name}
                    </h3>
                    <p className="text-white/40 text-sm mt-1">
                      {playlist.songs.length} {playlist.songs.length === 1 ? "song" : "songs"}
                    </p>
                  </div>

                  {/* Playlist Songs */}
                  <div className="p-4 flex flex-col gap-2">
                    {playlist.songs.length === 0 ? (
                      <p className="text-white/20 text-sm text-center py-4">No songs added</p>
                    ) : (
                      songs
                        .filter((s) => playlist.songs.includes(s.id))
                        .map((song) => (
                          <div
                            key={song.id}
                            onClick={() => {
                              playSong(song);
                              router.push("/now-playing");
                            }}
                            className="flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all duration-200 group"
                            style={{ background: "transparent" }}
                            onMouseEnter={e => {
                              (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.1)";
                            }}
                            onMouseLeave={e => {
                              (e.currentTarget as HTMLElement).style.background = "transparent";
                            }}
                          >
                            <img
                              src={song.cover}
                              alt={song.title}
                              className="w-10 h-10 rounded-xl object-cover flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate group-hover:text-purple-300 transition-colors"
                                style={{ color: "rgba(255,255,255,0.8)" }}>
                                {song.title}
                              </p>
                              <p className="text-xs truncate mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>
                                {song.artist}
                              </p>
                            </div>
                            <Play size={14} fill="white" className="text-white opacity-0 group-hover:opacity-100 transition-all flex-shrink-0" />
                          </div>
                        ))
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── SUGGESTED SONGS ── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.3)" }}
            >
              <Music2 size={18} style={{ color: "#a855f7" }} />
            </div>
            <h2
              className="text-white text-2xl font-bold"
              style={{ fontFamily: "Figtree, sans-serif" }}
            >
              Suggested Songs
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {songs.map((song) => (
              <div
                key={song.id}
                onClick={() => {
                  playSong(song);
                  router.push("/now-playing");
                }}
                className="flex items-center gap-4 rounded-2xl cursor-pointer transition-all duration-300 group"
                style={{
                  padding: "16px 20px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.1)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.25)";
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
                  <p className="font-semibold truncate group-hover:text-purple-300 transition-colors"
                    style={{ color: "rgba(255,255,255,0.85)", fontSize: "15px" }}>
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
                  className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                    boxShadow: "0 0 20px rgba(124,58,237,0.5)",
                  }}
                >
                  <Play size={16} fill="white" className="text-white ml-0.5" />
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}