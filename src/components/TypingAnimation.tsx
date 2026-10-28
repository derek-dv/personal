"use client";

import { useState, useEffect } from "react";

const stack = [
  "TypeScript",
  "Next.js 16 & React 19",
  "Node.js & Express 5",
  "React Native (Expo 54)",
  "Voice AI & WebSockets",
  "Google Gemini API",
  "OpenAI Realtime & ElevenLabs",
  "Atomic Fintech Ledgers",
  "PostgreSQL & BullMQ",
  "Kotlin Android IME",
];

export default function TypingAnimation() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = stack[index];
    let typingSpeed = isDeleting ? 45 : 85;

    if (!isDeleting && text === currentWord) {
      typingSpeed = 1800; // Pause at end of word
      const pauseTimer = setTimeout(() => setIsDeleting(true), typingSpeed);
      return () => clearTimeout(pauseTimer);
    }

    if (isDeleting && text === "") {
      const nextTimer = setTimeout(() => {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % stack.length);
      }, 50);
      return () => clearTimeout(nextTimer);
    }

    const timer = setTimeout(() => {
      setText((prev) =>
        isDeleting
          ? prev.slice(0, -1)
          : currentWord.slice(0, prev.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, index]);

  return (
    <span className="font-mono text-[#61AFEF] font-semibold inline-flex border-r-2 border-white pr-1 animate-pulse">
      {text || "\u00A0"}
    </span>
  );
}
