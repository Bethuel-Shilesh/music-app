"use client";

import { useState, useRef, useEffect } from "react";
import { Song, songs } from "@/lib/songs";
import {
  Play, Pause, SkipBack, SkipForward,
  Volume2, VolumeX, Shuffle, Repeat, Heart
} from "lucide-react";

interface BottomPlayerProps {
  currentSong: Song;
  isPlaying: boolean;
  likedSongs: string[];
  onPlayPause: () => void;
  onSongChange: (song: Song) => void;
  onToggleLike: (songId: string) => void;
}

export default function BottomPlayer({
  currentSong,
  isPlaying,
  likedSongs,
  onPlayPause,
  onSongChange,
  onToggleLike,
}: BottomPlayerProps) {
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const isLiked = likedSongs.includes(currentSong.id);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying, currentSong]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const update = () => {
      const percent = (audio.currentTime / audio.duration) * 100;
      setProgress(isNaN(percent) ? 0 : percent);
      setCurrentTime(formatTime(audio.currentTime));
      setDuration(formatTime(audio.duration));
    };
    audio.addEventListener("timeupdate", update);
    return () => audio.removeEventListener("timeupdate", update);
  }, [currentSong]);

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const bar = e.currentTarget;
    const clickX = e.clientX - bar.getBoundingClientRect().left;
    audio.currentTime = (clickX / bar.offsetWidth) * audio.duration;
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) audioRef.current.volume = val;
    setMuted(val === 0);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !muted;
    setMuted(!muted);
  };

  const handleNext = () => {
    const index = songs.findIndex((s) => s.id === currentSong.id);
    const next = shuffle
      ? Math.floor(Math.random() * songs.length)
      : (index + 1) % songs.length;
    onSongChange(songs[next]);
  };

  const handlePrev = () => {
    const index = songs.findIndex((s) => s.id === currentSong.id);
    const prev = (index - 1 + songs.length) % songs.length;
    onSongChange(songs[prev]);
  };

  return (
    <div
      className="flex-shrink-0 flex items-center px-6 gap-4"
      style={{
        height: "88px",
        background: "rgba(10,10,10,0.95)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(20px)",
      }}
    >
      <audio ref={audioRef} src={currentSong.src} />

      {/* ── SONG INFO ── */}
      <div className="flex items-center gap-3 flex-shrink-0" style={{ width: "260px" }}>
        <img
          src={currentSong.cover}
          alt={currentSong.title}
          className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
          style={{ boxShadow: "0 4px 15px rgba(0,0,0,0.5)" }}
        />
        <div className="min-w-0 flex-1">
          <p
            className="text-white text-sm font-semibold truncate"
            style={{ fontFamily: "Figtree, sans-serif" }}
          >
            {currentSong.title}
          </p>
          <p className="text-white/40 text-xs truncate mt-0.5">
            {currentSong.artist}
          </p>
        </div>
        <button
          onClick={() => onToggleLike(currentSong.id)}
          className="flex-shrink-0 transition-transform hover:scale-110"
        >
          <Heart
            size={17}
            style={{
              fill: isLiked ? "#a855f7" : "none",
              color: isLiked ? "#a855f7" : "rgba(255,255,255,0.3)",
            }}
          />
        </button>
      </div>

      {/* ── CENTER CONTROLS ── */}
      <div className="flex-1 flex flex-col items-center gap-2">

        {/* Buttons */}
        <div className="flex items-center gap-5">
          <button
            onClick={() => setShuffle(!shuffle)}
            className="transition-all hover:scale-110"
            style={{ color: shuffle ? "#a855f7" : "rgba(255,255,255,0.35)" }}
          >
            <Shuffle size={16} />
          </button>

          <button
            onClick={handlePrev}
            className="transition-all hover:scale-110"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            <SkipBack size={20} />
          </button>

          <button
            onClick={onPlayPause}
            className="flex items-center justify-center rounded-full transition-all hover:scale-105"
            style={{
              width: "42px",
              height: "42px",
              background: "white",
              boxShadow: "0 0 20px rgba(255,255,255,0.2)",
            }}
          >
            {isPlaying
              ? <Pause size={18} style={{ color: "#080808" }} />
              : <Play size={18} fill="#080808" style={{ color: "#080808", marginLeft: "2px" }} />
            }
          </button>

          <button
            onClick={handleNext}
            className="transition-all hover:scale-110"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            <SkipForward size={20} />
          </button>

          <button
            onClick={() => setRepeat(!repeat)}
            className="transition-all hover:scale-110"
            style={{ color: repeat ? "#a855f7" : "rgba(255,255,255,0.35)" }}
          >
            <Repeat size={16} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-3 w-full max-w-md">
          <span className="text-xs flex-shrink-0" style={{ color: "rgba(255,255,255,0.3)", width: "32px", textAlign: "right" }}>
            {currentTime}
          </span>
          <div
            className="flex-1 rounded-full cursor-pointer group relative"
            style={{ height: "4px", background: "rgba(255,255,255,0.1)" }}
            onClick={handleProgressClick}
          >
            <div
              className="rounded-full relative transition-all"
              style={{
                height: "4px",
                width: `${progress}%`,
                background: "linear-gradient(90deg, #7c3aed, #a855f7)",
              }}
            >
              <div
                className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-all"
                style={{ boxShadow: "0 0 6px rgba(168,85,247,0.8)" }}
              />
            </div>
          </div>
          <span className="text-xs flex-shrink-0" style={{ color: "rgba(255,255,255,0.3)", width: "32px" }}>
            {duration}
          </span>
        </div>

      </div>

      {/* ── VOLUME ── */}
      <div className="flex items-center gap-3 flex-shrink-0" style={{ width: "140px" }}>
        <button onClick={toggleMute} className="transition hover:scale-110"
          style={{ color: "rgba(255,255,255,0.4)" }}>
          {muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
        </button>
        <input
          type="range" min="0" max="1" step="0.01"
          value={muted ? 0 : volume}
          onChange={handleVolume}
          className="w-full cursor-pointer"
        />
      </div>

    </div>
  );
}