"use client";

import React from "react";
import { Win7ComputerIcon } from "./Win7Icons";
import { Check } from "lucide-react";

export type Win7ThemeId = "harmony" | "logon" | "twilight" | "emerald";

interface PersonalizeWindowProps {
  activeTheme: Win7ThemeId;
  showGadgets: boolean;
  onSelectTheme: (theme: Win7ThemeId) => void;
  onToggleGadgets: () => void;
  onOpenSystemProps?: () => void;
}

const THEMES: {
  id: Win7ThemeId;
  name: string;
  subtitle: string;
  previewStyle: React.CSSProperties;
}[] = [
  {
    id: "harmony",
    name: "Windows 7 Aero (Default)",
    subtitle: "Original Harmony Wallpaper + Sky Blue Glass",
    previewStyle: {
      backgroundImage: 'url("/wallpapers/win7-desktop.jpg")',
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
  },
  {
    id: "logon",
    name: "Windows 7 Logon Aurora",
    subtitle: "Original Logon Artwork + Deep Sapphire Glass",
    previewStyle: {
      backgroundImage: 'url("/wallpapers/win7-logon.jpg")',
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
  },
  {
    id: "twilight",
    name: "Aero Midnight Architecture",
    subtitle: "Deep Slate Aurora + Cobalt Glass",
    previewStyle: {
      background:
        "radial-gradient(circle at 75% 25%, #38bdf8 0%, #1e3a8a 45%, #090d16 100%)",
    },
  },
  {
    id: "emerald",
    name: "Aero Nature Emerald",
    subtitle: "Teal & Cyan Aurora + Frosted Glass",
    previewStyle: {
      background:
        "radial-gradient(circle at 70% 30%, #34d399 0%, #0f766e 48%, #042f2e 100%)",
    },
  },
];

export default function PersonalizeWindow({
  activeTheme,
  showGadgets,
  onSelectTheme,
  onToggleGadgets,
}: PersonalizeWindowProps) {
  return (
    <div className="flex flex-col h-full w-full bg-white text-[12px] font-sans overflow-hidden">
      {/* Control Panel Breadcrumb */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-b from-[#F4F8FC] to-[#DCE8F5] border-b border-[#AABCCF] text-[#1E395B] text-[11.5px] shrink-0">
        <Win7ComputerIcon className="w-4 h-4 shrink-0" />
        <span className="truncate">
          Control Panel &gt; Appearance and Personalization &gt;{" "}
          <strong>Personalization</strong>
        </span>
      </div>

      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* Left Control Panel Tasks Pane */}
        <aside className="w-48 bg-gradient-to-b from-[#EAF3FC] via-[#DCEBFA] to-[#CBE0F5] border-r border-[#B6CBE0] p-3 flex flex-col justify-between shrink-0 select-none">
          <div className="space-y-3">
            <div className="font-semibold text-[#153961] text-[12px]">
              Control Panel Home
            </div>
            <ul className="space-y-2 text-[11.5px] text-[#1C4B82]">
              <li>
                <button
                  type="button"
                  onClick={onToggleGadgets}
                  className="hover:underline text-left font-medium"
                >
                  • {showGadgets ? "Hide Desktop Gadgets" : "Show Desktop Gadgets"}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTheme("harmony")}
                  className="hover:underline text-left"
                >
                  • Restore Default Theme
                </button>
              </li>
            </ul>
          </div>

          <div className="text-[10.5px] text-[#3B5C7E]">
            Windows Aero Glass Compositor: <strong>Enabled</strong>
          </div>
        </aside>

        {/* Main Theme Picker Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-white">
          <div>
            <h2 className="text-[15px] font-bold text-[#153658]">
              Change the visuals and sounds on your computer
            </h2>
            <p className="text-[12px] text-[#556B82] mt-0.5">
              Click a theme to change the desktop background and Aero glass atmosphere all at once.
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-[12px] font-semibold text-[#1E395B] border-b border-[#D8E4F0] pb-1">
              Aero Themes ({THEMES.length})
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {THEMES.map((theme) => {
                const isSelected = activeTheme === theme.id;
                return (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => onSelectTheme(theme.id)}
                    className={`group flex flex-col rounded-[4px] p-2.5 border text-left transition-all ${
                      isSelected
                        ? "win7-list-selected border-[#5B9BD5]"
                        : "border-[#D0DFEE] hover:bg-[#F2F8FE]"
                    }`}
                  >
                    <div
                      style={theme.previewStyle}
                      className="w-full h-24 rounded-[3px] border border-[#7A94B0] shadow-inner relative overflow-hidden mb-2"
                    >
                      {/* Mini Aero Window Preview Frame inside Theme Thumbnail */}
                      <div className="absolute bottom-2 right-2 w-20 h-12 rounded-[3px] bg-white/40 backdrop-blur-xs border border-white/80 p-1 shadow">
                        <div className="w-full h-full bg-white/90 rounded-[1px]" />
                      </div>
                      {isSelected && (
                        <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-[2px] bg-[#1565C0] text-white text-[10px] font-semibold flex items-center gap-1 shadow">
                          <Check className="w-3 h-3" />
                          <span>Active</span>
                        </div>
                      )}
                    </div>
                    <div className="font-bold text-[12.5px] text-[#143352]">
                      {theme.name}
                    </div>
                    <div className="text-[11px] text-[#526980]">
                      {theme.subtitle}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
