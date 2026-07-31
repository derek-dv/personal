"use client";

import { useState, useEffect } from "react";

const stack = [
  "PyTorch",
  "Machine Learning",
  "LLMs",
  "TypeScript",
  "React.js",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "Kafka",
];

export default function TypingAnimation() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = stack[index];
    let typingSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && text === currentWord) {
      typingSpeed = 2000; // Pause at end of word
      setTimeout(() => setIsDeleting(true), typingSpeed);
      return;
    }

    if (isDeleting && text === "") {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % stack.length);
      return;
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
    <span className="font-mono text-[var(--accent)] font-semibold inline-flex border-r-2 border-[var(--foreground)] pr-1 animate-pulse">
      {text || "\u00A0"}
    </span>
  );
}
