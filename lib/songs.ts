export interface Song {
  id: string;
  title: string;
  artist: string;
  src: string;
  cover: string;
}

export const songs: Song[] = [
  {
    id: "1",
    title: "Can't Help Falling In Love",
    artist: "Andre Rieu",
    src: "/songs/cant-help-falling-in-love.mp3",
    cover: "/images/Andre_Rieu.jpg",
  },
];