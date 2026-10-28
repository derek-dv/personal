import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Derek David | Senior Full-Stack & AI Systems Engineer (Windows 7 Edition)",
  description:
    "Interactive Windows 7 Aero portfolio of Derek David, Senior Full-Stack & AI Systems Engineer with 5+ years of experience in TypeScript, React, Next.js, React Native, Node.js, Voice AI, and Fintech.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased w-screen h-screen overflow-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
