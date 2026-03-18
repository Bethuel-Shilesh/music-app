import type { Metadata } from "next";
import "./globals.css";
import Layout from "@/components/Layout";
import { MusicProvider } from "@/context/MusicContext";

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
        <MusicProvider>
          <Layout>{children}</Layout>
        </MusicProvider>
      </body>
    </html>
  );
}