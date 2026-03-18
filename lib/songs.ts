export interface Song {
  id: string;
  title: string;
  artist: string;
  src: string;
  cover: string;
  duration: string;
}

export const songs: Song[] = [
  {
    id: "1",
    title: "Can't Help Falling In Love",
    artist: "Andre Rieu",
    src: "/songs/cant-help-falling-in-love.mp3",
    cover: "/images/Andre_Rieu.jpg",
    duration: "3:30",
  },
  {
    id: "2",
    title: "Can I Call You Tonight",
    artist: "Dayglow",
    src: "/songs/can-i-call-you-tonight-official-video",
    cover: "/images/Dayglow.jpg",
    duration: "3:45",
  },
  {
    id: "3",
    title: "Happy Nation",
    artist: "Ace of Base",
    src: "/songs/happy-nation-lyrics.mp3",
    cover: "/images/ace-of-base.jpg",
    duration: "3:58",
  },
  {
    id: "4",
    title: "Karnaby",
    artist: "Karnaby",
    src: "/songs/karnaby-official-video.mp3",
    cover: "/images/karnaby.jpg",
    duration: "4:10",
  },
];