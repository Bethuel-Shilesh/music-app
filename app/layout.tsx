import type { Metadata } from "next";
import "./globals.css";
import Layout from "@/components/Layout";
import { MusicProvider } from "@/context/MusicContext";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Muse - Music Player",
  description: "A modern music player app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <MusicProvider>
            <Layout>{children}</Layout>
          </MusicProvider>
        </AuthProvider>
      </body>
    </html>
  );
}