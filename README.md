# 🎵 Muse — Modern Music Player
### 🚀 Your Music, Your Vibe
A **full-stack modern music player web app** inspired by Spotify, featuring a **vintage vinyl turntable animation**, dynamic UI, and a premium dark theme with purple accents.
Built to deliver an immersive and interactive music experience.

> 🌐 **Live Demo → [muse-player.vercel.app](https://muse-player.vercel.app)**

---

## ✅ Project Status: Fully Completed & Deployed
Frontend, Backend, Authentication, Database and Deployment are all complete.

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
- 💿 **Now Playing** — Full-screen immersive vinyl player
- 🔍 **Search** — Real-time song search & genre browsing
- 📚 **Library** — Create and manage playlists
- ❤️ **Liked Songs** — Your favourite songs saved to database
- 🎤 **Artist** — Browse music by artist
- 🔥 **Trending** — Most played songs
- 🎭 **Mood** — Songs by mood (Happy, Sad, Party, Romantic, Workout)
- 🔐 **Auth** — Login, Signup, Change Email & Password

### 🔐 Authentication
- JWT based authentication
- Secure password hashing with bcrypt
- Liked songs and playlists saved per user account

---

## 🗄️ Database Schema
`users` · `songs` · `liked_songs` · `playlists`

---

## 🔌 API Endpoints

### 🔐 Authentication
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/change-email`
- `POST /api/auth/change-password`

### ❤️ Liked Songs
- `GET /api/user/likes`
- `POST /api/user/likes`

### 📋 Playlists
- `GET /api/user/playlists`
- `POST /api/user/playlists`
- `DELETE /api/user/playlists`

---

## 🚀 Run Locally
```bash
git clone https://github.com/Bethuel-Shilesh/music-app.git
cd music-app
npm install
npm run dev
```

Add `.env.local`:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 👨‍💻 Developer
Built by **Bethuel Shilesh**
