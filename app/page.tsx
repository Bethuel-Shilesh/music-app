"use client";

import { useState, useRef, useEffect } from "react";
import { songs } from "@/lib/songs";
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart } from "lucide-react";

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [volume, setVolume] = useState(1);
  const [liked, setLiked] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const song = songs[currentSongIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateProgress = () => {
      const percent = (audio.currentTime / audio.duration) * 100;
      setProgress(isNaN(percent) ? 0 : percent);
      setCurrentTime(formatTime(audio.currentTime));
      setDuration(formatTime(audio.duration));
    };
    audio.addEventListener("timeupdate", updateProgress);
    return () => audio.removeEventListener("timeupdate", updateProgress);
  }, [currentSongIndex]);

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const bar = e.currentTarget;
    const clickX = e.clientX - bar.getBoundingClientRect().left;
    const newTime = (clickX / bar.offsetWidth) * audio.duration;
    audio.currentTime = newTime;
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) audioRef.current.volume = val;
  };

  const handleNext = () => {
    const next = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(next);
    setIsPlaying(false);
    setProgress(0);
  };

  const handlePrev = () => {
    const prev = (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSongIndex(prev);
    setIsPlaying(false);
    setProgress(0);
  };

  return (
    <main className="h-screen w-screen bg-[#0a0a0a] flex overflow-hidden">
      <audio ref={audioRef} src={song.src} />

      {/* ── LEFT SIDEBAR ── */}
      <div className="w-80 h-full bg-[#0f0f0f] border-r border-purple-900/30 flex flex-col p-6 gap-6">

        {/* Logo */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm">
            🎵
          </div>
          <span className="text-white font-bold text-lg tracking-widest uppercase">
            Muse
          </span>
        </div>

        {/* Section Title */}
        <p className="text-purple-400 text-xs font-semibold uppercase tracking-widest">
          Your Library
        </p>

        {/* Song List */}
        <div className="flex flex-col gap-2 overflow-y-auto flex-1">
          {songs.map((s, index) => (
            <div
              key={s.id}
              onClick={() => {
                setCurrentSongIndex(index);
                setIsPlaying(false);
                setProgress(0);
              }}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300
                ${currentSongIndex === index
                  ? "bg-purple-900/40 border border-purple-600/40"
                  : "hover:bg-white/5 border border-transparent"
                }`}
            >
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                <img src={s.cover} alt={s.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold truncate ${
                  currentSongIndex === index ? "text-purple-300" : "text-white"
                }`}>
                  {s.title}
                </p>
                <p className="text-xs text-zinc-500 truncate">{s.artist}</p>
              </div>
              {currentSongIndex === index && isPlaying && (
                <div className="flex gap-0.5 items-end h-4">
                  <div className="w-0.5 bg-purple-400 animate-bounce h-2" style={{ animationDelay: "0ms" }} />
                  <div className="w-0.5 bg-purple-400 animate-bounce h-4" style={{ animationDelay: "150ms" }} />
                  <div className="w-0.5 bg-purple-400 animate-bounce h-3" style={{ animationDelay: "300ms" }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT PLAYER ── */}
      <div className="flex-1 h-full flex flex-col items-center justify-center gap-8 relative overflow-hidden">

        {/* Background glow */}
        <div className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }} />

        {/* ── TURNTABLE ── */}
        <div className="relative w-72 h-72">

          {/* Turntable base plate */}
          <div className="absolute inset-0 rounded-full bg-[#1a1a1a] border-4 border-[#2a2a2a]"
            style={{ boxShadow: "0 0 60px rgba(124,58,237,0.3), inset 0 0 30px rgba(0,0,0,0.8)" }} />

          {/* Vinyl grooves rings */}
          <div className="absolute inset-4 rounded-full border border-[#2e2e2e]" />
          <div className="absolute inset-8 rounded-full border border-[#2e2e2e]" />
          <div className="absolute inset-12 rounded-full border border-[#2a2a2a]" />

          {/* Spinning vinyl with cover */}
          <div
            className={`absolute inset-6 rounded-full overflow-hidden ${isPlaying ? "animate-spin" : ""}`}
            style={{
              animationDuration: "6s",
              boxShadow: isPlaying ? "0 0 30px rgba(124,58,237,0.6)" : "none",
              transition: "box-shadow 0.5s ease"
            }}
          >
            <img src={song.cover} alt={song.title} className="w-full h-full object-cover rounded-full" />
            {/* Dark overlay for vinyl look */}
            <div className="absolute inset-0 rounded-full"
              style={{ background: "radial-gradient(circle, transparent 20%, rgba(0,0,0,0.5) 70%)" }} />
          </div>

          {/* Center spindle hole */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-6 h-6 rounded-full bg-[#0a0a0a] border-2 border-purple-800/60 z-10" />
          </div>

          {/* ── TONEARM ── */}
          {/* Pivot point - top right of vinyl */}
          <div
            className="absolute z-20"
            style={{
              top: "-10px",
              right: "-10px",
              width: "20px",
              height: "20px",
            }}
          >
            {/* Pivot base circle */}
            <div className="w-5 h-5 rounded-full bg-[#333] border-2 border-purple-700/60 shadow-lg" />

            {/* Tonearm stick */}
            <div
              style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                width: "6px",
                height: "110px",
                transformOrigin: "top center",
                transform: isPlaying ? "rotate(28deg)" : "rotate(5deg)",
                transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              {/* Arm body */}
              <div
                className="w-full rounded-full"
                style={{
                  height: "85px",
                  background: "linear-gradient(180deg, #888 0%, #555 100%)",
                  boxShadow: "0 0 8px rgba(124,58,237,0.4)",
                }}
              />
              {/* Arm bend */}
              <div
                style={{
                  width: "18px",
                  height: "5px",
                  background: "#666",
                  borderRadius: "3px",
                  marginTop: "-2px",
                  marginLeft: "-6px",
                  transform: "rotate(-20deg)",
                  boxShadow: "0 0 6px rgba(124,58,237,0.3)",
                }}
              />
              {/* Needle head */}
              <div
                style={{
                  width: "8px",
                  height: "14px",
                  background: "linear-gradient(180deg, #aaa 0%, #444 100%)",
                  borderRadius: "0 0 4px 4px",
                  marginTop: "2px",
                  marginLeft: "-1px",
                  boxShadow: isPlaying ? "0 4px 10px rgba(167,139,250,0.8)" : "none",
                  transition: "box-shadow 0.5s ease",
                }}
              />
            </div>
          </div>

        </div>

        {/* Song Info */}
        <div className="flex items-center gap-4">
          <div className="text-center">
            <h1 className="text-white text-2xl font-bold tracking-wide">{song.title}</h1>
            <p className="text-purple-400 text-sm mt-1">{song.artist}</p>
          </div>
          <button onClick={() => setLiked(!liked)} className="ml-4 transition-transform hover:scale-110">
            <Heart size={22} className={liked ? "fill-purple-500 text-purple-500" : "text-zinc-600"} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-96 flex flex-col gap-2">
          <div
            className="w-full h-1.5 bg-zinc-800 rounded-full cursor-pointer relative group"
            onClick={handleProgressClick}
          >
            <div
              className="h-1.5 bg-purple-500 rounded-full transition-all relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition" />
            </div>
          </div>
          <div className="flex justify-between text-zinc-500 text-xs">
            <span>{currentTime}</span>
            <span>{duration}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-8">
          <button onClick={handlePrev} className="text-zinc-400 hover:text-white transition-colors hover:scale-110 transform">
            <SkipBack size={24} />
          </button>
          <button
            onClick={togglePlay}
            className="w-16 h-16 rounded-full bg-purple-600 hover:bg-purple-500 flex items-center justify-center text-white transition-all hover:scale-105 glow-purple"
          >
            {isPlaying ? <Pause size={26} /> : <Play size={26} fill="white" />}
          </button>
          <button onClick={handleNext} className="text-zinc-400 hover:text-white transition-colors hover:scale-110 transform">
            <SkipForward size={24} />
          </button>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-3 w-48">
          <Volume2 size={16} className="text-zinc-500" />
          <input
            type="range" min="0" max="1" step="0.01" value={volume}
            onChange={handleVolume}
            className="w-full accent-purple-500 cursor-pointer"
          />
        </div>

      </div>
    </main>
  );
}