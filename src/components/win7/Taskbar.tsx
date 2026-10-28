"use client";

import React, { useState, useEffect } from "react";
import { WindowsOrbIcon, GithubIcon, LinkedinIcon } from "./Win7Icons";
import { Volume2, VolumeX, Wifi, ChevronUp } from "lucide-react";
import { getWin7Muted, setWin7Muted, playWin7Sound } from "@/utils/win7Sounds";

export interface TaskbarWindowItem {
  id: string;
  title: string;
  shortTitle: string;
  icon: React.ReactNode;
  isOpen: boolean;
  isMinimized: boolean;
  isFocused: boolean;
}

interface TaskbarProps {
  windows: TaskbarWindowItem[];
  isStartOpen: boolean;
  onToggleStart: () => void;
  onTaskbarAppClick: (id: string) => void;
  onOpenBrowser?: (site: "github" | "linkedin") => void;
  onShowDesktop: () => void;
  onTaskbarContextMenu?: (e: React.MouseEvent) => void;
}

export default function Taskbar({
  windows,
  isStartOpen,
  onToggleStart,
  onTaskbarAppClick,
  onOpenBrowser,
  onShowDesktop,
  onTaskbarContextMenu,
}: TaskbarProps) {
  const [clock, setClock] = useState<{ time: string; date: string }>({
    time: "09:35 AM",
    date: "10/28/2026",
  });
  const [muted, setMuted] = useState<boolean>(getWin7Muted());

  const handleToggleMute = () => {
    const next = !muted;
    setMuted(next);
    setWin7Muted(next);
    if (!next) {
      playWin7Sound("ding", 0.55);
    }
  };

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setClock({
        time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        date: now.toLocaleDateString([], {
          month: "numeric",
          day: "numeric",
          year: "numeric",
        }),
      });
    };
    updateClock();
    const timer = setInterval(updateClock, 15000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer
      onClick={(e) => e.stopPropagation()}
      onContextMenu={(e) => {
        if (onTaskbarContextMenu) {
          e.preventDefault();
          e.stopPropagation();
          onTaskbarContextMenu(e);
        }
      }}
      className="fixed bottom-0 left-0 right-0 h-[44px] z-[9995] flex items-center justify-between win7-taskbar select-none"
    >
      {/* Left: Start Orb + Superbar Pinned & Running Applications */}
      <div className="flex items-center h-full pl-1 gap-1.5 min-w-0 flex-1">
        {/* Windows 7 Start Orb */}
        <button
          type="button"
          title="Start"
          onClick={onToggleStart}
          className={`relative flex items-center justify-center w-[46px] h-[44px] -mt-[2px] rounded-full transition-transform active:scale-95 ${
            isStartOpen
              ? "brightness-125 drop-shadow-[0_0_10px_rgba(95,205,255,0.95)]"
              : "hover:brightness-115 hover:drop-shadow-[0_0_8px_rgba(95,205,255,0.8)]"
          }`}
        >
          <WindowsOrbIcon className="w-[40px] h-[40px]" />
        </button>

        {/* Pinned / Running App Buttons */}
        <div className="flex items-center gap-1 h-[38px] overflow-x-auto pr-2">
          {windows.map((win) => {
            const isRunning = win.isOpen;
            const isActive = win.isOpen && !win.isMinimized && win.isFocused;

            return (
              <button
                key={win.id}
                type="button"
                title={win.title}
                onClick={() => onTaskbarAppClick(win.id)}
                className={`group relative flex items-center gap-2 px-3 h-[36px] rounded-[3px] transition-all shrink-0 ${
                  isActive
                    ? "win7-superbar-item-active"
                    : isRunning
                    ? "win7-superbar-item-running"
                    : "win7-superbar-item-pinned"
                }`}
              >
                <div className="w-6 h-6 shrink-0 flex items-center justify-center drop-shadow">
                  {win.icon}
                </div>
                <span className="hidden md:inline text-[12px] text-white/95 font-normal truncate max-w-[130px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                  {win.shortTitle}
                </span>

                {/* Bottom Aero Running Indicator Bar */}
                {isRunning && (
                  <span
                    className={`absolute bottom-[1px] left-2 right-2 h-[2px] rounded-full ${
                      isActive ? "bg-[#7CE2FF]" : "bg-white/60"
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right: Notification Area (System Tray) + Clock + Aero Peek Sliver */}
      <div className="flex items-center h-full shrink-0">
        <div className="flex items-center gap-2.5 px-2.5 h-full text-white/90">
          <ChevronUp className="w-3.5 h-3.5 opacity-80 hidden sm:inline" />

          <button
            type="button"
            onClick={() => onOpenBrowser?.("github")}
            title="Open GitHub in Internet Explorer"
            className="hover:text-[#7CE2FF] transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => onOpenBrowser?.("linkedin")}
            title="Open LinkedIn in Internet Explorer"
            className="hover:text-[#7CE2FF] transition-colors"
          >
            <LinkedinIcon className="w-4 h-4" />
          </button>

          <span title="Network: Connected (Remote Worldwide)" className="hidden sm:inline">
            <Wifi className="w-4 h-4 opacity-90" />
          </span>

          <button
            type="button"
            onClick={handleToggleMute}
            title={muted ? "Unmute Windows 7 Sounds" : "Mute Windows 7 Sounds"}
            className="hover:text-[#7CE2FF] transition-colors"
          >
            {muted ? (
              <VolumeX className="w-4 h-4 text-[#FF9E80]" />
            ) : (
              <Volume2 className="w-4 h-4 opacity-90" />
            )}
          </button>
        </div>

        {/* System Clock & Date */}
        <div
          title={clock.date}
          className="flex flex-col items-center justify-center px-2.5 h-[36px] rounded-[2px] hover:bg-white/10 text-white text-[11px] leading-tight mr-1 cursor-default"
        >
          <span>{clock.time}</span>
          <span className="text-[10.5px] text-white/85">{clock.date}</span>
        </div>

        {/* Far-right Show Desktop / Aero Peek Sliver */}
        <button
          type="button"
          onClick={onShowDesktop}
          title="Show desktop"
          className="w-[14px] h-full border-l border-white/35 bg-gradient-to-b from-white/25 via-white/10 to-white/25 hover:from-[#80D4FF]/50 hover:to-[#3AA6FF]/40 transition-colors"
        />
      </div>
    </footer>
  );
}
