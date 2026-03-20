"use client";

import Sidebar from "./Sidebar";
import BottomPlayer from "./BottomPlayer";
import TopBar from "./TopBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen bg-[#080808] flex flex-col overflow-hidden">
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <Sidebar />

        {/* Main content with TopBar */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopBar />
          <main className="flex-1 overflow-hidden bg-[#080808]">
            {children}
          </main>
        </div>

      </div>

      {/* Bottom Player */}
      <BottomPlayer />
    </div>
  );
}