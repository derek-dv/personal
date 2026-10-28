"use client";

import React, { useState } from "react";
import { WindowsOrbIcon } from "./Win7Icons";
import { playWin7Sound, getWin7Muted, setWin7Muted } from "@/utils/win7Sounds";
import { Volume2, VolumeX, Power, Accessibility } from "lucide-react";

export type Win7UserAccount = "Derek" | "Guest";

interface Win7LogonScreenProps {
  onLoginSuccess: (user: Win7UserAccount) => void;
}

export default function Win7LogonScreen({
  onLoginSuccess,
}: Win7LogonScreenProps) {
  const [loggingInUser, setLoggingInUser] = useState<Win7UserAccount | null>(
    null
  );
  const [muted, setMuted] = useState<boolean>(getWin7Muted());
  const [shuttingDown, setShuttingDown] = useState(false);

  const handleSelectUser = (user: Win7UserAccount) => {
    if (loggingInUser || shuttingDown) return;
    setLoggingInUser(user);

    // Play both the iconic Windows 7 Startup chime & Logon sound
    playWin7Sound("startup", 0.75);
    setTimeout(() => {
      playWin7Sound("logon", 0.7);
    }, 350);

    setTimeout(() => {
      onLoginSuccess(user);
    }, 1500);
  };

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    setWin7Muted(next);
    if (!next) {
      playWin7Sound("ding", 0.5);
    }
  };

  const handleReboot = () => {
    if (loggingInUser) return;
    setShuttingDown(true);
    playWin7Sound("shutdown", 0.75);
    setTimeout(() => {
      setShuttingDown(false);
    }, 2200);
  };

  return (
    <div className="relative w-screen h-dvh overflow-hidden select-none flex flex-col justify-between win7-logon-wallpaper text-white">
      {/* Subtle dark vignette around edges like authentic Win7 Logon */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(2,14,32,0.58)_100%)]" />

      {/* Top Spacer */}
      <div className="relative z-10 flex justify-end p-4">
        <button
          type="button"
          onClick={toggleMute}
          title={muted ? "Unmute Windows 7 Sounds" : "Mute Windows 7 Sounds"}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-black/30 hover:bg-black/45 border border-white/35 backdrop-blur-md text-[12px] shadow transition-colors"
        >
          {muted ? (
            <>
              <VolumeX className="w-4 h-4 text-[#FF9E80]" />
              <span>Sounds Muted</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-[#7CE2FF]" />
              <span>Windows 7 Audio On</span>
            </>
          )}
        </button>
      </div>

      {/* Center User Tiles / "Welcome" Spinner */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4">
        {shuttingDown ? (
          <div className="flex flex-col items-center gap-4 animate-fade-in">
            <div className="w-9 h-9 rounded-full border-[3px] border-[#66D2FF] border-t-transparent animate-spin shadow-[0_0_12px_rgba(102,210,255,0.8)]" />
            <span className="text-xl sm:text-2xl font-normal tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
              Shutting down...
            </span>
          </div>
        ) : loggingInUser ? (
          <div className="flex flex-col items-center gap-5">
            {/* Selected User Avatar Frame */}
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-[8px] p-1.5 bg-gradient-to-b from-white/85 via-[#B3D8F8]/75 to-[#4D88C4]/80 border border-white shadow-[0_10px_28px_rgba(0,0,0,0.65)]">
              {loggingInUser === "Derek" ? (
                <div className="w-full h-full rounded-[5px] bg-gradient-to-br from-[#1F75D2] via-[#10498B] to-[#082246] flex flex-col items-center justify-center border border-[#72B8FF] relative overflow-hidden">
                  <div className="absolute -top-6 -left-6 w-20 h-20 bg-white/20 rounded-full blur-md" />
                  <span className="font-mono font-extrabold text-3xl text-white tracking-wider drop-shadow">
                    DD
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-[#99D6FF] mt-0.5">
                    Admin
                  </span>
                </div>
              ) : (
                <div className="w-full h-full rounded-[5px] bg-gradient-to-br from-[#5A87B8] via-[#345880] to-[#1D3552] flex flex-col items-center justify-center border border-[#9BC5EF] relative overflow-hidden">
                  <svg
                    className="w-14 h-14 text-white/90 drop-shadow"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Windows 7 Turquoise Spinning Ring + "Welcome" */}
            <div className="flex items-center gap-3.5">
              <div className="w-7 h-7 rounded-full border-[3.5px] border-[#5BE2FF] border-t-transparent animate-spin shadow-[0_0_10px_rgba(91,226,255,0.85)]" />
              <span className="text-2xl sm:text-3xl font-light tracking-wide text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                Welcome
              </span>
            </div>

            <div className="text-sm text-white/85 drop-shadow">
              Logging in as <strong>{loggingInUser}</strong>...
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-8">
            {/* Two Account Tiles: Derek & Guest */}
            <div className="flex flex-row items-start justify-center gap-8 sm:gap-14">
              {/* User 1: Derek */}
              <button
                type="button"
                onClick={() => handleSelectUser("Derek")}
                className="group flex flex-col items-center text-center focus:outline-none"
              >
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-[8px] p-1.5 bg-gradient-to-b from-white/80 via-[#AED6F8]/65 to-[#3D77B2]/75 border border-white/90 shadow-[0_10px_28px_rgba(0,0,0,0.65)] group-hover:scale-105 group-hover:shadow-[0_0_24px_rgba(120,215,255,0.95)] group-hover:border-white transition-all duration-150">
                  <div className="w-full h-full rounded-[5px] bg-gradient-to-br from-[#237CE0] via-[#114B8F] to-[#082246] flex flex-col items-center justify-center border border-[#7AC0FF] relative overflow-hidden">
                    {/* Gloss */}
                    <div className="absolute -top-8 -left-4 w-28 h-16 bg-white/25 rotate-[-18deg]" />
                    <span className="font-mono font-extrabold text-3xl sm:text-4xl text-white tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                      DD
                    </span>
                    <span className="text-[9.5px] font-semibold uppercase tracking-widest text-[#9FE0FF] mt-1">
                      Architect
                    </span>
                  </div>
                </div>
                <span className="mt-3 text-[16px] sm:text-[18px] font-normal text-white group-hover:underline drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                  Derek
                </span>
                <span className="text-[11.5px] text-[#B8E6FF] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                  Administrator
                </span>
              </button>

              {/* User 2: Guest */}
              <button
                type="button"
                onClick={() => handleSelectUser("Guest")}
                className="group flex flex-col items-center text-center focus:outline-none"
              >
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-[8px] p-1.5 bg-gradient-to-b from-white/75 via-[#AED6F8]/55 to-[#3D77B2]/65 border border-white/80 shadow-[0_10px_28px_rgba(0,0,0,0.65)] group-hover:scale-105 group-hover:shadow-[0_0_24px_rgba(120,215,255,0.95)] group-hover:border-white transition-all duration-150">
                  <div className="w-full h-full rounded-[5px] bg-gradient-to-br from-[#618EC0] via-[#3A5F8A] to-[#1E3654] flex flex-col items-center justify-center border border-[#9CC5EF] relative overflow-hidden">
                    <div className="absolute -top-8 -left-4 w-28 h-16 bg-white/20 rotate-[-18deg]" />
                    <svg
                      className="w-14 h-14 sm:w-16 sm:h-16 text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z" />
                    </svg>
                  </div>
                </div>
                <span className="mt-3 text-[16px] sm:text-[18px] font-normal text-white group-hover:underline drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                  Guest
                </span>
                <span className="text-[11.5px] text-[#B8E6FF] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                  Recruiter / Visitor
                </span>
              </button>
            </div>

            <p className="text-[12.5px] text-white/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)] text-center">
              Click an account tile to log on with Windows 7 Startup &amp; Logon audio
            </p>
          </div>
        )}
      </div>

      {/* Bottom Logon Bar: Ease of Access (Left), Windows 7 Branding (Center), Red Shut Down Button (Right) */}
      <div className="relative z-10 flex items-center justify-between px-5 sm:px-8 pb-5 pt-2">
        {/* Bottom-Left Ease of Access button */}
        <button
          type="button"
          onClick={toggleMute}
          title="Ease of Access & Audio Settings"
          className="w-9 h-9 rounded-[4px] bg-gradient-to-b from-white/30 to-black/40 hover:from-white/45 hover:to-black/30 border border-white/50 flex items-center justify-center shadow-md"
        >
          <Accessibility className="w-5 h-5 text-white drop-shadow" />
        </button>

        {/* Bottom-Center Windows 7 Ultimate Branding */}
        <div className="flex items-center gap-2.5">
          <WindowsOrbIcon className="w-7 h-7 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]" />
          <div className="text-left leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
            <div className="text-[15px] sm:text-[17px] font-semibold tracking-tight text-white">
              Windows <span className="font-light">7</span>{" "}
              <span className="text-[13px] font-normal text-[#B3E4FF]">
                Ultimate
              </span>
            </div>
            <div className="text-[10px] text-white/80">
              Derek David • Senior Full-Stack &amp; AI Systems Portfolio
            </div>
          </div>
        </div>

        {/* Bottom-Right Red Shut Down / Restart Button */}
        <button
          type="button"
          onClick={handleReboot}
          title="Shut down"
          className="h-9 px-3 rounded-[4px] bg-gradient-to-b from-[#F08372] via-[#D43824] to-[#981808] hover:from-[#FF9D8E] hover:via-[#E5442E] hover:to-[#B51F0C] border border-[#FFB8AD] flex items-center gap-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.65)]"
        >
          <Power className="w-4 h-4 text-white drop-shadow" />
        </button>
      </div>
    </div>
  );
}
