"use client";

import React, { useState, useEffect } from "react";
import { X, Cpu, Activity, Calendar } from "lucide-react";

interface DesktopGadgetsProps {
  visible?: boolean;
  onCloseGadgets: () => void;
  onOpenTerminal?: () => void;
}

export default function DesktopGadgets({
  visible = true,
  onCloseGadgets,
  onOpenTerminal,
}: DesktopGadgetsProps) {
  const [now, setNow] = useState<Date>(() => new Date());
  const [cpuLoad, setCpuLoad] = useState(24);
  const [ramLoad, setRamLoad] = useState(58);

  useEffect(() => {
    if (!visible) return;
    const clockInterval = setInterval(() => {
      setNow(new Date());
      setCpuLoad(Math.floor(18 + Math.random() * 22));
      setRamLoad(Math.floor(54 + Math.random() * 8));
    }, 2000);
    return () => clearInterval(clockInterval);
  }, [visible]);

  if (!visible) return null;

  const dayName = now.toLocaleDateString("en-US", { weekday: "long" });
  const monthYear = now.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  const dayNum = now.getDate();
  const timeStr = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="hidden lg:flex fixed top-4 right-4 z-[12] flex-col gap-3 w-[170px] select-none"
    >
      {/* 1. Windows 7 Clock & Calendar Gadget */}
      <div className="group relative rounded-[8px] p-3 bg-gradient-to-b from-[#1B3A5C]/80 via-[#0E243D]/85 to-[#081526]/90 backdrop-blur-md border border-white/40 shadow-[0_8px_20px_rgba(0,0,0,0.5)] text-white text-center">
        <button
          type="button"
          onClick={onCloseGadgets}
          title="Close Gadgets"
          className="opacity-0 group-hover:opacity-100 absolute top-1.5 right-1.5 w-4 h-4 rounded bg-red-600/80 hover:bg-red-500 flex items-center justify-center transition-opacity"
        >
          <X className="w-3 h-3 text-white" />
        </button>

        <div className="flex items-center justify-center gap-1.5 text-[10.5px] uppercase tracking-wider text-[#8CE0FF] font-semibold mb-1">
          <Calendar className="w-3.5 h-3.5" />
          <span>{dayName}</span>
        </div>

        <div className="text-3xl font-extrabold tracking-tight text-white drop-shadow">
          {dayNum}
        </div>
        <div className="text-[11px] text-white/80 mb-2">{monthYear}</div>

        <div className="py-1 px-2 rounded bg-black/40 border border-white/20 font-mono text-[12px] text-[#7CE2FF]">
          {timeStr}
        </div>
      </div>

      {/* 2. Windows 7 CPU & Memory Meter Gadget */}
      <div
        onClick={() => onOpenTerminal?.()}
        title="Click to open Command Prompt"
        className="group relative rounded-[8px] p-3 bg-gradient-to-b from-[#1B3A5C]/80 via-[#0E243D]/85 to-[#081526]/90 backdrop-blur-md border border-white/40 shadow-[0_8px_20px_rgba(0,0,0,0.5)] text-white cursor-pointer"
      >
        <div className="flex items-center justify-between text-[10.5px] uppercase tracking-wider text-[#8CE0FF] font-semibold mb-2">
          <span className="flex items-center gap-1">
            <Cpu className="w-3.5 h-3.5" />
            <span>System Meter</span>
          </span>
          <Activity className="w-3.5 h-3.5 text-[#56D364]" />
        </div>

        {/* CPU Gauge */}
        <div className="space-y-1 mb-2">
          <div className="flex justify-between text-[11px]">
            <span className="text-white/80">CPU (AI / Node)</span>
            <span className="font-mono text-[#7CE2FF]">{cpuLoad}%</span>
          </div>
          <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden border border-white/20">
            <div
              style={{ width: `${cpuLoad}%` }}
              className="h-full bg-gradient-to-r from-[#38BDF8] to-[#22C55E] transition-all duration-500"
            />
          </div>
        </div>

        {/* RAM Gauge */}
        <div className="space-y-1">
          <div className="flex justify-between text-[11px]">
            <span className="text-white/80">RAM (BullMQ)</span>
            <span className="font-mono text-[#FBBF24]">{ramLoad}%</span>
          </div>
          <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden border border-white/20">
            <div
              style={{ width: `${ramLoad}%` }}
              className="h-full bg-gradient-to-r from-[#38BDF8] to-[#F59E0B] transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
