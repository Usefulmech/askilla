import type { Metadata, Viewport } from "next";
import "./globals.css";
import "katex/dist/katex.min.css";

export const metadata: Metadata = {
  title: "Askilla — Ask Anything. Sabi Everything.",
  description:
    "AI tutor designed for Nigerian learners across subjects and languages (English, Pidgin). 3MTT Knowledge Showcase 2.0.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <link rel="apple-touch-icon" href="/icon.svg" />
      </head>
      <body className="antialiased min-h-screen bg-[#F5F5F0] dark:bg-[#121212] text-[#1C1917] dark:text-[#F5F5F4] selection:bg-[#C25B32]/30 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
