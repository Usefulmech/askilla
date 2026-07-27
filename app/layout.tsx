import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Askilla — Ask Anything. Sabi Everything.",
  description:
    "AI tutor designed for Nigerian learners across subjects and languages (Pidgin, Yoruba, Hausa, Igbo, English). 3MTT Knowledge Showcase 2.0.",
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
    <html>
      <body className="antialiased min-h-screen bg-[#F5F5F0] dark:bg-[#121212] text-[#2D2D2D] dark:text-[#EAEAEA] selection:bg-[#D4A574]/30 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
