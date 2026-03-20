# 🎵 Muse — Modern Music Player  
### 🚀 Your Music, Your Vibe  

A **full-stack modern music player web app** inspired by Spotify, featuring a **vintage vinyl turntable animation**, dynamic UI, and a premium dark theme with purple accents.  
Built to deliver an immersive and interactive music experience.

---

## 🚧 Project Status: Work in Progress
Frontend UI is fully completed. Backend development, authentication, and deployment are currently in progress.

---

## 🛠️ Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=jsonwebtokens)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

## ✨ Features

### 🎵 Music Player
- ▶️ Play / Pause / Next / Previous controls  
- 🎛️ Vintage vinyl turntable with tonearm animation  
- 🔀 Shuffle and 🔁 Repeat modes  
- 🔊 Volume control with mute toggle  
- ⏱️ Interactive progress bar with seek  

### 📄 Pages
- 🏠 **Home** — Dynamic hero section & recommendations  
- 💿 **Now Playing** — Full-screen immersive player  
- 🔍 **Search** — Real-time song search & genre browsing  
- 📚 **Library** — Liked songs, history, and queue  
- 🔐 **Auth** — Login & Signup system  

---

## 🗄️ Database Schema *(Planned)*
`users` · `songs` · `liked_songs` · `playlists`

---

## 🔌 API Endpoints *(Planned)*

### 🔐 Authentication
- `POST /api/auth/signup`
- `POST /api/auth/login`

### 🎵 Songs
- `GET /api/songs`
- `GET /api/songs/:id`

### ❤️ Liked Songs
- `POST /api/likes/:songId`
- `DELETE /api/likes/:songId`
- `GET /api/likes`

---

## 🚀 Run Locally

```bash
git clone https://github.com/YOUR_USERNAME/music-app.git
cd music-app
npm install
npm run dev
