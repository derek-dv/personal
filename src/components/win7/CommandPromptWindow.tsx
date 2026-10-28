"use client";

import React, { useState, useRef, useEffect } from "react";
import TypingAnimation from "@/components/TypingAnimation";
import { PROFILE, SKILLS, TIMELINE_ITEMS } from "@/data/portfolioData";
import { playWin7Sound } from "@/utils/win7Sounds";

interface CommandPromptWindowProps {
  onOpenWindow?: (windowId: string, folder?: string) => void;
}

interface LogLine {
  id: number;
  type: "cmd" | "out" | "accent";
  text: string;
}

export default function CommandPromptWindow({
  onOpenWindow,
}: CommandPromptWindowProps) {
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState<LogLine[]>([
    {
      id: 1,
      type: "out",
      text: "Microsoft Windows [Version 6.1.7601] — Derek David Engineering Console",
    },
    {
      id: 2,
      type: "out",
      text: "Copyright (c) 2009 Microsoft Corporation. Type 'help' for available commands.",
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const runCommand = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    const nextLogs: LogLine[] = [
      ...logs,
      { id: Date.now(), type: "cmd", text: `C:\\Users\\DerekDavid> ${raw}` },
    ];

    if (!cmd) {
      setLogs(nextLogs);
      return;
    }

    if (cmd === "help") {
      nextLogs.push({
        id: Date.now() + 1,
        type: "out",
        text: [
          "Available Commands:",
          "  whoami       — Display engineer bio & summary",
          "  skills       — List technical competencies & ML stack",
          "  projects     — List featured ML & full-stack roles/projects",
          "  explorer     — Launch Windows Explorer (Projects & Files)",
          "  contact      — Open Windows Mail (Contact Derek)",
          "  resume       — Download / View Resume.pdf",
          "  cls / clear  — Clear terminal screen",
        ].join("\n"),
      });
    } else if (cmd === "whoami" || cmd === "about") {
      nextLogs.push({
        id: Date.now() + 1,
        type: "accent",
        text: `${PROFILE.name} | ${PROFILE.role}\n${PROFILE.summary}`,
      });
    } else if (cmd === "skills") {
      const skillText = SKILLS.map(
        (s) => `  [${s.category}]: ${s.items.join(", ")}`
      ).join("\n");
      nextLogs.push({
        id: Date.now() + 1,
        type: "out",
        text: `Installed Technical Modules:\n${skillText}`,
      });
    } else if (cmd === "projects" || cmd === "dir" || cmd === "ls") {
      const projText = TIMELINE_ITEMS.map(
        (p) => `  ${p.date.padEnd(20)} ${p.title.padEnd(26)} (${p.company} - ${p.role})`
      ).join("\n");
      nextLogs.push({
        id: Date.now() + 1,
        type: "out",
        text: `Directory of C:\\Users\\DerekDavid\\Projects:\n\n${projText}`,
      });
    } else if (cmd === "explorer") {
      nextLogs.push({
        id: Date.now() + 1,
        type: "accent",
        text: "Launching Windows Explorer...",
      });
      onOpenWindow?.("explorer", "projects");
    } else if (cmd === "contact") {
      nextLogs.push({
        id: Date.now() + 1,
        type: "accent",
        text: "Opening Windows Live Mail...",
      });
      onOpenWindow?.("contact");
    } else if (cmd === "resume") {
      nextLogs.push({
        id: Date.now() + 1,
        type: "accent",
        text: "Opening Resume.pdf in WordPad...",
      });
      onOpenWindow?.("resume");
    } else if (cmd === "cls" || cmd === "clear") {
      setLogs([]);
      return;
    } else {
      playWin7Sound("error", 0.55);
      nextLogs.push({
        id: Date.now() + 1,
        type: "out",
        text: `'${raw}' is not recognized as an internal or external command. Type 'help' for commands.`,
      });
    }

    setLogs(nextLogs);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runCommand(input);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#0C0C0C] text-[#CCCCCC] font-mono text-[12.5px] p-4 overflow-y-auto selection:bg-white selection:text-black">
      {/* Hero Banner Inside CMD */}
      <div className="mb-4 pb-3 border-b border-[#333333] space-y-2">
        <div className="text-[#56B6C2] text-[11px] uppercase tracking-wider">
          C:\Windows\System32\cmd.exe — Portfolio Interactive Shell
        </div>
        <h1 className="text-lg sm:text-2xl font-bold text-white tracking-tight">
          Engineering intelligent systems with <TypingAnimation />
        </h1>
        <p className="text-[#B0B8C0] text-[12px] leading-relaxed max-w-2xl">
          {PROFILE.summary}
        </p>

        {/* Quick Action Buttons inside Terminal */}
        <div className="flex flex-wrap gap-2 pt-2">
          <button
            type="button"
            onClick={() => onOpenWindow?.("explorer", "projects")}
            className="px-3 py-1 bg-[#1E3A5F] hover:bg-[#295082] text-[#8CE0FF] border border-[#3E72B0] rounded-[2px] text-[11.5px] transition-colors"
          >
            [Open Projects Folder]
          </button>
          <button
            type="button"
            onClick={() => onOpenWindow?.("about")}
            className="px-3 py-1 bg-[#1D2D1E] hover:bg-[#28422A] text-[#85E89D] border border-[#3B6E40] rounded-[2px] text-[11.5px] transition-colors"
          >
            [System Properties / About]
          </button>
          <button
            type="button"
            onClick={() => onOpenWindow?.("contact")}
            className="px-3 py-1 bg-[#3A2B1D] hover:bg-[#523C28] text-[#FFDF8C] border border-[#7A593A] rounded-[2px] text-[11.5px] transition-colors"
          >
            [Contact / Mail]
          </button>
          <button
            type="button"
            onClick={() => onOpenWindow?.("resume")}
            className="px-3 py-1 bg-[#2B2B2B] hover:bg-[#3B3B3B] text-white border border-[#555555] rounded-[2px] text-[11.5px] transition-colors"
          >
            [Open Resume.pdf]
          </button>
        </div>
      </div>

      {/* Console Output History */}
      <div className="space-y-1.5 flex-1">
        {logs.map((entry) => (
          <pre
            key={entry.id}
            className={`whitespace-pre-wrap font-mono leading-relaxed ${
              entry.type === "cmd"
                ? "text-white font-semibold"
                : entry.type === "accent"
                ? "text-[#63E2B7]"
                : "text-[#CCCCCC]"
            }`}
          >
            {entry.text}
          </pre>
        ))}

        {/* Interactive Prompt Line */}
        <form onSubmit={handleSubmit} className="flex items-center gap-1.5 pt-1">
          <span className="text-white shrink-0">C:\Users\DerekDavid&gt;</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="type 'help', 'projects', 'skills', 'whoami'..."
            className="flex-1 bg-transparent text-white focus:outline-none placeholder:text-[#555555]"
          />
        </form>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
