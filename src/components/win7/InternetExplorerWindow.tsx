"use client";

import React, { useState } from "react";
import { GithubIcon, LinkedinIcon, Win7IEIcon } from "./Win7Icons";
import {
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Star,
  Home,
  ShieldCheck,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { playWin7Sound } from "@/utils/win7Sounds";

export type BrowserSiteId = "github" | "linkedin";

interface InternetExplorerWindowProps {
  initialSite?: BrowserSiteId;
  onOpenWindow?: (windowId: string) => void;
}

const SITE_META: Record<
  BrowserSiteId,
  {
    url: string;
    proxyUrl: string;
    tabTitle: string;
    securityLabel: string;
  }
> = {
  github: {
    url: "https://github.com/derek-dv",
    proxyUrl: "/api/ie-proxy?site=github",
    tabTitle: "derek-dv (Derek David) · GitHub",
    securityLabel: "GitHub, Inc. [US]",
  },
  linkedin: {
    url: "https://www.linkedin.com/in/derek-dv",
    proxyUrl: "/api/ie-proxy?site=linkedin",
    tabTitle: "Derek David | LinkedIn",
    securityLabel: "LinkedIn Corporation [US]",
  },
};

export default function InternetExplorerWindow({
  initialSite = "github",
  onOpenWindow,
}: InternetExplorerWindowProps) {
  const [history, setHistory] = useState<BrowserSiteId[]>([initialSite]);
  const [historyIdx, setHistoryIdx] = useState(0);
  const [reloadNonce, setReloadNonce] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const currentSite = history[historyIdx];
  const meta = SITE_META[currentSite];

  const navigateTo = (site: BrowserSiteId) => {
    playWin7Sound("nav", 0.5);
    setIsLoading(true);
    if (site === currentSite) {
      setReloadNonce((n) => n + 1);
      return;
    }
    const next = history.slice(0, historyIdx + 1);
    next.push(site);
    setHistory(next);
    setHistoryIdx(next.length - 1);
  };

  const goBack = () => {
    if (historyIdx > 0) {
      playWin7Sound("nav", 0.5);
      setIsLoading(true);
      setHistoryIdx(historyIdx - 1);
    }
  };

  const goForward = () => {
    if (historyIdx < history.length - 1) {
      playWin7Sound("nav", 0.5);
      setIsLoading(true);
      setHistoryIdx(historyIdx + 1);
    }
  };

  const handleRefresh = () => {
    playWin7Sound("nav", 0.45);
    setIsLoading(true);
    setReloadNonce((n) => n + 1);
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#FFFFFF] text-[12px] font-sans overflow-hidden select-text">
      {/* 1. IE9 Aero Address Bar & Navigation Orbs */}
      <div className="flex items-center gap-2 px-2.5 py-1.5 bg-gradient-to-b from-[#F2F7FC] via-[#E1EDF9] to-[#D2E2F3] border-b border-[#9EB5CE] select-none shrink-0">
        {/* Back / Forward Orbs */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={goBack}
            disabled={historyIdx === 0}
            title="Back"
            className="w-7 h-7 rounded-full flex items-center justify-center win7-nav-orb disabled:opacity-40"
          >
            <ArrowLeft className="w-4 h-4 text-white drop-shadow" />
          </button>
          <button
            type="button"
            onClick={goForward}
            disabled={historyIdx >= history.length - 1}
            title="Forward"
            className="w-7 h-7 rounded-full flex items-center justify-center win7-nav-orb disabled:opacity-40"
          >
            <ArrowRight className="w-4 h-4 text-white drop-shadow" />
          </button>
        </div>

        {/* URL Address Bar with SSL Badge */}
        <div className="flex-1 flex items-center justify-between h-[26px] px-2 bg-white border border-[#7E9AB8] rounded-[2px] shadow-[inset_0_1px_2px_rgba(0,0,0,0.08)] min-w-0">
          <div className="flex items-center gap-1.5 min-w-0 flex-1">
            {isLoading ? (
              <Loader2 className="w-3.5 h-3.5 text-[#1B6EC2] animate-spin shrink-0" />
            ) : currentSite === "github" ? (
              <GithubIcon className="w-3.5 h-3.5 text-[#24292F] shrink-0" />
            ) : (
              <LinkedinIcon className="w-3.5 h-3.5 text-[#0A66C2] shrink-0" />
            )}
            <span className="font-mono text-[11.5px] text-[#143558] truncate">
              {meta.url}
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 bg-[#E6F7EA] border border-[#96D6A6] rounded-[2px] text-[10px] text-[#1A6B31] font-medium">
              <ShieldCheck className="w-3 h-3" />
              <span>{meta.securityLabel}</span>
            </span>
            <button
              type="button"
              onClick={handleRefresh}
              title="Refresh (F5)"
              className="p-0.5 hover:bg-[#E5F3FB] rounded text-[#3B5978]"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right IE Toolbar Icons */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() => navigateTo("github")}
            title="Home (GitHub)"
            className="win7-cmd-btn p-1.5 rounded-[2px] text-[#1E395B]"
          >
            <Home className="w-4 h-4" />
          </button>
          <a
            href={meta.url}
            target="_blank"
            rel="noopener noreferrer"
            title="Open live URL in external browser tab"
            className="win7-btn px-2.5 py-1 rounded-[2px] text-[11px] font-semibold text-[#153961] flex items-center gap-1"
          >
            <ExternalLink className="w-3 h-3 text-[#1B5E9E]" />
            <span className="hidden sm:inline">External Tab</span>
          </a>
        </div>
      </div>

      {/* 2. IE9 Tabs + Favorites Bar */}
      <div className="flex items-center justify-between px-2.5 pt-1 bg-gradient-to-b from-[#DCE9F7] to-[#CFE0F2] border-b border-[#9AB2CC] select-none shrink-0">
        {/* Browser Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto">
          <button
            type="button"
            onClick={() => navigateTo("github")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-t-[4px] border border-b-0 text-[11.5px] transition-colors ${
              currentSite === "github"
                ? "bg-white border-[#8AA4C0] text-[#142D47] font-semibold shadow-2xs"
                : "bg-[#E5EFFA]/75 border-[#A5BCD4] text-[#3F5873] hover:bg-white/70"
            }`}
          >
            <GithubIcon className="w-3.5 h-3.5 text-[#24292F]" />
            <span className="truncate max-w-[160px]">
              derek-dv (Derek David) · GitHub
            </span>
          </button>

          <button
            type="button"
            onClick={() => navigateTo("linkedin")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-t-[4px] border border-b-0 text-[11.5px] transition-colors ${
              currentSite === "linkedin"
                ? "bg-white border-[#8AA4C0] text-[#142D47] font-semibold shadow-2xs"
                : "bg-[#E5EFFA]/75 border-[#A5BCD4] text-[#3F5873] hover:bg-white/70"
            }`}
          >
            <LinkedinIcon className="w-3.5 h-3.5 text-[#0A66C2]" />
            <span className="truncate max-w-[160px]">
              Derek David | LinkedIn
            </span>
          </button>
        </div>

        {/* Favorites Bar Quick Bookmarks */}
        <div className="hidden lg:flex items-center gap-1.5 pb-1 text-[11px] text-[#1E395B]">
          <Star className="w-3.5 h-3.5 text-[#E6A100] fill-[#FFD24C]" />
          <span className="font-semibold">Favorites:</span>
          <button
            type="button"
            onClick={() => navigateTo("github")}
            className="hover:underline px-1"
          >
            GitHub
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => navigateTo("linkedin")}
            className="hover:underline px-1"
          >
            LinkedIn
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => onOpenWindow?.("resume")}
            className="hover:underline px-1"
          >
            Resume.pdf (WordPad)
          </button>
        </div>
      </div>

      {/* 3. Live Webpage Iframe Viewport via /api/ie-proxy */}
      <div className="relative flex-1 w-full h-full bg-white overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 z-10 bg-white/80 backdrop-blur-[1px] flex flex-col items-center justify-center gap-2 text-[#1E395B]">
            <Loader2 className="w-7 h-7 text-[#1B6EC2] animate-spin" />
            <span className="text-[12px] font-medium">
              Connecting to {meta.url}...
            </span>
          </div>
        )}
        <iframe
          key={`${currentSite}-${reloadNonce}`}
          src={`${meta.proxyUrl}&_r=${reloadNonce}`}
          title={meta.tabTitle}
          onLoad={() => setIsLoading(false)}
          className="w-full h-full border-0 bg-white"
        />
      </div>

      {/* 4. IE9 Bottom Status Bar */}
      <div className="flex items-center justify-between px-3 py-1 bg-gradient-to-b from-[#F1F6FB] to-[#E1ECF7] border-t border-[#B8C9DC] text-[11px] text-[#354E68] select-none shrink-0">
        <div className="flex items-center gap-2">
          <Win7IEIcon className="w-3.5 h-3.5" />
          <span>
            {isLoading ? `Waiting for ${meta.url}...` : `Done — ${meta.url}`}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <span className="flex items-center gap-1 text-[#1A6B31]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Internet | Protected Mode: On</span>
          </span>
          <span>•</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
}
