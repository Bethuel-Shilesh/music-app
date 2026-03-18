"use client";

import { createContext, useContext, useState, useRef, useEffect, ReactNode } from "react";
import { Song, songs } from "@/lib/songs";

interface MusicContextType {
  currentSong: Song;
  isPlaying: boolean;
  likedSongs: string[];
  progress: number;
  currentTime: string;
  duration: string;
  volume: number;
  shuffle: boolean;
  repeat: boolean;
  playSong: (song: Song) => void;
  togglePlay: () => void;
  toggleLike: (songId: string) => void;
  handleNext: () => void;
  handlePrev: () => void;
  handleProgressClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleVolume: (val: number) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
}

const MusicContext = createContext<MusicContextType | null>(null);

export function MusicProvider({ children }: { children: ReactNode }) {
  const [currentSong, setCurrentSong] = useState<Song>(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [likedSongs, setLikedSongs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [volume, setVolume] = useState(1);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(currentSong.src);
    audioRef.current.volume = volume;

    const audio = audioRef.current;

    const updateProgress = () => {
      const percent = (audio.currentTime / audio.duration) * 100;
      setProgress(isNaN(percent) ? 0 : percent);
      setCurrentTime(formatTime(audio.currentTime));
      setDuration(formatTime(audio.duration));
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSong]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSong]);

  const handleEnded = () => {
    handleNext();
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const playSong = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const togglePlay = () => setIsPlaying((prev) => !prev);

  const toggleLike = (songId: string) => {
    setLikedSongs((prev) =>
      prev.includes(songId)
        ? prev.filter((id) => id !== songId)
        : [...prev, songId]
    );
  };

  const handleNext = () => {
    const index = songs.findIndex((s) => s.id === currentSong.id);
    const next = shuffle
      ? Math.floor(Math.random() * songs.length)
      : (index + 1) % songs.length;
    setCurrentSong(songs[next]);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    const index = songs.findIndex((s) => s.id === currentSong.id);
    const prev = (index - 1 + songs.length) % songs.length;
    setCurrentSong(songs[prev]);
    setIsPlaying(true);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const bar = e.currentTarget;
    const clickX = e.clientX - bar.getBoundingClientRect().left;
    audio.currentTime = (clickX / bar.offsetWidth) * audio.duration;
  };

  const handleVolume = (val: number) => {
    setVolume(val);
    if (audioRef.current) audioRef.current.volume = val;
  };

  const toggleShuffle = () => setShuffle((prev) => !prev);
  const toggleRepeat = () => setRepeat((prev) => !prev);

  return (
    <MusicContext.Provider value={{
      currentSong,
      isPlaying,
      likedSongs,
      progress,
      currentTime,
      duration,
      volume,
      shuffle,
      repeat,
      playSong,
      togglePlay,
      toggleLike,
      handleNext,
      handlePrev,
      handleProgressClick,
      handleVolume,
      toggleShuffle,
      toggleRepeat,
    }}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) throw new Error("useMusic must be used within MusicProvider");
  return context;
}
