"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    try {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (err) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, []);

  const logout = () => {
    // Clear all app data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("likedSongs");
    localStorage.removeItem("playlists");
    localStorage.removeItem("recentSongs");
    localStorage.removeItem("queue");

    setUser(null);

    // Force full page reload to reset ALL state
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn: mounted && !!user,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}