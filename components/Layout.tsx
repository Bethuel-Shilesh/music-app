"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import BottomPlayer from "./BottomPlayer";
import { songs, Song } from "@/lib/songs";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [currentSong, setCurrentSong] = useState<Song>(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [likedSongs, setLikedSongs] = useState<string[]>([]);

  const toggleLike = (songId: string) => {
    setLikedSongs((prev) =>
      prev.includes(songId)
        ? prev.filter((id) => id !== songId)
        : [...prev, songId]
    );
  };

  return (
    <div className="h-screen w-screen bg-[#080808] flex flex-col overflow-hidden">
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <Sidebar
          currentSong={currentSong}
          isPlaying={isPlaying}
          likedSongs={likedSongs}
          onSongSelect={(song) => {
            setCurrentSong(song);
            setIsPlaying(true);
          }}
        />

        {/* Main content */}
        <main className="flex-1 overflow-hidden bg-[#080808] pl-0">
          {children}
        </main>

      </div>

      {/* Bottom Player */}
      <BottomPlayer
        currentSong={currentSong}
        isPlaying={isPlaying}
        likedSongs={likedSongs}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onSongChange={(song) => setCurrentSong(song)}
        onToggleLike={toggleLike}
      />
    </div>
  );
}