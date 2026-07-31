import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

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
  title: "Derek David | ML & Full-Stack Engineer",
  description: "Portfolio of Derek David, Machine Learning & Full-Stack Software Engineer with 5+ years of experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1 w-full max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-16">
          {children}
        </main>
        <footer className="w-full border-t border-[var(--border)] py-8 text-center text-sm text-[var(--muted-foreground)] font-mono">
          © {new Date().getFullYear()} Derek David. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
