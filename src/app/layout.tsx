import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar, Footer, ChatBubble } from '../components';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hello from Parag",
  description: "A simple website to showcase my work and projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white min-h-screen flex flex-col`}
        style={{ background: '#fff' }}
      >
        <Navbar />
        <main className="flex-1 pt-10 flex flex-col items-stretch justify-start" style={{ background: '#fff' }}>
          {children}
        </main>
        <Footer />
        <ChatBubble />
      </body>
    </html>
  );
}
