"use client";

import React, { useState } from "react";
import {
  Win7FolderIcon,
  Win7ComputerIcon,
  Win7TerminalIcon,
  Win7MailIcon,
  Win7PdfIcon,
  Win7BrainChipIcon,
  Win7CodeAppIcon,
  GithubIcon,
  LinkedinIcon,
} from "./Win7Icons";
import { PROFILE, TIMELINE_ITEMS } from "@/data/portfolioData";
import { Search, ChevronRight, Power, ExternalLink, LogOut } from "lucide-react";
import { ExplorerFolderId } from "./WindowsExplorer";
import { Win7UserAccount } from "./Win7LogonScreen";

interface StartMenuProps {
  isOpen: boolean;
  currentUser: Win7UserAccount;
  onClose: () => void;
  onOpenWindow: (windowId: string, folder?: ExplorerFolderId) => void;
  onOpenBrowser?: (site: "github" | "linkedin") => void;
  onSwitchUser: () => void;
}

export default function StartMenu({
  isOpen,
  currentUser,
  onClose,
  onOpenWindow,
  onOpenBrowser,
  onSwitchUser,
}: StartMenuProps) {
  const [search, setSearch] = useState("");
  const [showAllPrograms, setShowAllPrograms] = useState(false);

  if (!isOpen) return null;

  const matchingProjects = search.trim()
    ? TIMELINE_ITEMS.filter(
        (i) =>
          i.company.toLowerCase().includes(search.toLowerCase()) ||
          i.role.toLowerCase().includes(search.toLowerCase()) ||
          i.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
      )
    : [];

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed bottom-[44px] left-1 sm:left-2 z-[9990] w-[calc(100vw-8px)] max-w-[430px] rounded-t-[8px] win7-start-menu select-none overflow-visible"
    >
      {/* Top User Avatar Badge Floating Out of Right Pane */}
      <button
        type="button"
        onClick={() => {
          onClose();
          onSwitchUser();
        }}
        title="Click to Switch User / Log Off"
        className="hidden sm:flex absolute -top-6 right-12 w-14 h-14 rounded-[5px] p-1 bg-gradient-to-b from-[#D7E9FA] to-[#7AA5D2] border border-[#FFFFFF]/80 shadow-[0_4px_12px_rgba(0,0,0,0.6)] items-center justify-center z-20 hover:scale-105 transition-transform"
      >
        {currentUser === "Derek" ? (
          <div className="w-full h-full rounded-[3px] bg-gradient-to-br from-[#1D6CC2] via-[#0F4584] to-[#082246] flex items-center justify-center border border-[#72B8FF]">
            <span className="font-mono font-bold text-white text-lg tracking-wider drop-shadow">
              DD
            </span>
          </div>
        ) : (
          <div className="w-full h-full rounded-[3px] bg-gradient-to-br from-[#618EC0] via-[#3A5F8A] to-[#1E3654] flex items-center justify-center border border-[#9CC5EF]">
            <span className="font-mono font-bold text-white text-xs tracking-wider drop-shadow">
              GUEST
            </span>
          </div>
        )}
      </button>

      {/* Two-Column Start Menu Body */}
      <div className="grid grid-cols-12 p-[7px] gap-[6px]">
        {/* Left White Panel (Pinned Programs / Search Results + Search Box) */}
        <div className="col-span-7 bg-white rounded-[4px] border border-[#6E869F] flex flex-col justify-between h-[410px] overflow-hidden shadow-inner">
          <div className="flex-1 overflow-y-auto p-1.5">
            {search.trim() ? (
              <div className="space-y-1">
                <div className="px-2 py-1 text-[10.5px] font-semibold text-[#3B5978] uppercase border-b border-[#E2ECF5]">
                  Search Results ({matchingProjects.length})
                </div>
                {matchingProjects.length > 0 ? (
                  matchingProjects.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        onOpenWindow("explorer", "projects");
                        onClose();
                      }}
                      className="w-full flex items-center gap-2.5 p-1.5 rounded-[3px] win7-list-hover text-left"
                    >
                      <Win7CodeAppIcon className="w-6 h-6 shrink-0" />
                      <div className="min-w-0">
                        <div className="text-[12px] font-semibold text-[#1B3552] truncate">
                          {item.company}
                        </div>
                        <div className="text-[10.5px] text-[#5B7085] truncate">
                          {item.role} • {item.date}
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="p-3 text-[11.5px] text-[#687C90]">
                    No items match your search.
                  </div>
                )}
              </div>
            ) : !showAllPrograms ? (
              <div className="space-y-1">
                {/* Pinned Programs */}
                <button
                  type="button"
                  onClick={() => {
                    onOpenWindow("explorer", "projects");
                    onClose();
                  }}
                  className="w-full flex items-center gap-2.5 p-2 rounded-[3px] win7-list-hover text-left"
                >
                  <Win7FolderIcon className="w-8 h-8 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-[12.5px] font-bold text-[#1A3350] truncate">
                      Windows Explorer
                    </div>
                    <div className="text-[10.5px] text-[#5D7287] truncate">
                      Projects, Experience &amp; Files
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onOpenWindow("terminal");
                    onClose();
                  }}
                  className="w-full flex items-center gap-2.5 p-2 rounded-[3px] win7-list-hover text-left"
                >
                  <Win7TerminalIcon className="w-8 h-8 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-[12.5px] font-bold text-[#1A3350] truncate">
                      Command Prompt
                    </div>
                    <div className="text-[10.5px] text-[#5D7287] truncate">
                      Interactive Portfolio Shell
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onOpenWindow("about");
                    onClose();
                  }}
                  className="w-full flex items-center gap-2.5 p-2 rounded-[3px] win7-list-hover text-left"
                >
                  <Win7ComputerIcon className="w-8 h-8 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-[12.5px] font-bold text-[#1A3350] truncate">
                      System Properties
                    </div>
                    <div className="text-[10.5px] text-[#5D7287] truncate">
                      About Derek, Bio &amp; Stack
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onOpenWindow("explorer", "ml_lab");
                    onClose();
                  }}
                  className="w-full flex items-center gap-2.5 p-2 rounded-[3px] win7-list-hover text-left"
                >
                  <Win7BrainChipIcon className="w-8 h-8 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-[12.5px] font-bold text-[#1A3350] truncate">
                      Voice AI &amp; Fintech Lab
                    </div>
                    <div className="text-[10.5px] text-[#5D7287] truncate">
                      Gemini, ElevenLabs &amp; Dora
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onOpenWindow("contact");
                    onClose();
                  }}
                  className="w-full flex items-center gap-2.5 p-2 rounded-[3px] win7-list-hover text-left"
                >
                  <Win7MailIcon className="w-8 h-8 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-[12.5px] font-bold text-[#1A3350] truncate">
                      Windows Live Mail
                    </div>
                    <div className="text-[10.5px] text-[#5D7287] truncate">
                      Send Message / Contact
                    </div>
                  </div>
                </button>

                <div className="my-1 border-t border-[#E1EBF5]" />

                <button
                  type="button"
                  onClick={() => {
                    onOpenWindow("resume");
                    onClose();
                  }}
                  className="w-full flex items-center gap-2.5 p-2 rounded-[3px] win7-list-hover text-left"
                >
                  <Win7PdfIcon className="w-8 h-8 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-[12.5px] font-bold text-[#1A3350] truncate">
                      Resume.pdf (WordPad)
                    </div>
                    <div className="text-[10.5px] text-[#5D7287] truncate">
                      Open in WordPad Viewer
                    </div>
                  </div>
                </button>
              </div>
            ) : (
              /* All Programs Tree List */
              <div className="space-y-1">
                <div className="px-2 py-1 text-[10.5px] font-semibold text-[#3B5978] uppercase border-b border-[#E2ECF5]">
                  All Projects &amp; Career Roles
                </div>
                {TIMELINE_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onOpenWindow("explorer", "projects");
                      onClose();
                    }}
                    className="w-full flex items-center gap-2 p-1.5 rounded-[3px] win7-list-hover text-left"
                  >
                    <Win7FolderIcon className="w-5 h-5 shrink-0" />
                    <div className="min-w-0">
                      <div className="text-[11.5px] font-semibold text-[#1A3350] truncate">
                        {item.company}
                      </div>
                      <div className="text-[10px] text-[#5D7287] truncate">
                        {item.role} ({item.date})
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* All Programs Toggle + Search Bar Footer */}
          <div className="p-1.5 border-t border-[#D6E3F0] bg-[#F3F8FD] space-y-1.5">
            <button
              type="button"
              onClick={() => setShowAllPrograms(!showAllPrograms)}
              className="w-full flex items-center justify-between px-2 py-1 rounded-[2px] win7-list-hover text-[11.5px] font-medium text-[#1A3654]"
            >
              <span>{showAllPrograms ? "Back" : "All Programs"}</span>
              <ChevronRight
                className={`w-3.5 h-3.5 transition-transform ${
                  showAllPrograms ? "rotate-180" : ""
                }`}
              />
            </button>

            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search programs and files"
                className="w-full pl-2.5 pr-7 py-1 text-[11.5px] bg-white border border-[#7E9AB8] rounded-[2px] text-[#1E1E1E] placeholder:italic placeholder:text-[#788A9C] focus:outline-none focus:border-[#2E74B5] shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]"
              />
              <Search className="w-3.5 h-3.5 text-[#4B6B8A] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Right Dark Aero Glass Panel (System Places & External Links) */}
        <div className="col-span-5 flex flex-col justify-between py-2 px-1.5 text-white text-[12px]">
          <div className="space-y-0.5 pt-2">
            <button
              type="button"
              onClick={() => {
                onOpenWindow("explorer", "documents");
                onClose();
              }}
              className="w-full text-left px-2.5 py-1.5 rounded-[3px] hover:bg-white/15 font-bold tracking-wide transition-colors truncate"
            >
              {currentUser === "Derek" ? PROFILE.username : "Guest (Visitor)"}
            </button>

            <button
              type="button"
              onClick={() => {
                onOpenWindow("explorer", "documents");
                onClose();
              }}
              className="w-full text-left px-2.5 py-1.5 rounded-[3px] hover:bg-white/15 transition-colors truncate"
            >
              Documents &amp; Bio
            </button>

            <button
              type="button"
              onClick={() => {
                onOpenWindow("explorer", "projects");
                onClose();
              }}
              className="w-full text-left px-2.5 py-1.5 rounded-[3px] hover:bg-white/15 transition-colors truncate"
            >
              Projects &amp; Roles
            </button>

            <button
              type="button"
              onClick={() => {
                onOpenWindow("explorer", "ml_lab");
                onClose();
              }}
              className="w-full text-left px-2.5 py-1.5 rounded-[3px] hover:bg-white/15 transition-colors truncate"
            >
              Machine Learning Lab
            </button>

            <div className="my-1.5 border-t border-white/20 mx-1" />

            <button
              type="button"
              onClick={() => {
                onOpenWindow("explorer", "computer");
                onClose();
              }}
              className="w-full text-left px-2.5 py-1.5 rounded-[3px] hover:bg-white/15 transition-colors truncate"
            >
              Computer
            </button>

            <button
              type="button"
              onClick={() => {
                onOpenWindow("explorer", "skills");
                onClose();
              }}
              className="w-full text-left px-2.5 py-1.5 rounded-[3px] hover:bg-white/15 transition-colors truncate"
            >
              Control Panel (Skills)
            </button>

            <button
              type="button"
              onClick={() => {
                onOpenWindow("about");
                onClose();
              }}
              className="w-full text-left px-2.5 py-1.5 rounded-[3px] hover:bg-white/15 transition-colors truncate"
            >
              System Properties
            </button>

            <div className="my-1.5 border-t border-white/20 mx-1" />

            <button
              type="button"
              onClick={() => {
                onOpenBrowser?.("github");
                onClose();
              }}
              className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-[3px] hover:bg-white/15 transition-colors text-left"
            >
              <span className="flex items-center gap-1.5 truncate">
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub (IE9)</span>
              </span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </button>

            <button
              type="button"
              onClick={() => {
                onOpenBrowser?.("linkedin");
                onClose();
              }}
              className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-[3px] hover:bg-white/15 transition-colors text-left"
            >
              <span className="flex items-center gap-1.5 truncate">
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>LinkedIn (IE9)</span>
              </span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </button>
          </div>

          {/* Switch User / Log Off & Contact Action Buttons */}
          <div className="pt-2 px-1 space-y-1.5">
            <button
              type="button"
              onClick={() => {
                onOpenWindow("contact");
                onClose();
              }}
              className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-[3px] bg-gradient-to-b from-[#4979AB]/90 to-[#1F466E]/90 hover:from-[#5B8EC2] hover:to-[#285888] border border-white/35 text-[11.5px] font-medium shadow"
            >
              <span className="flex items-center gap-1.5">
                <Power className="w-3.5 h-3.5 text-[#8CE0FF]" />
                <span>Contact Derek</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5 opacity-80" />
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onSwitchUser();
              }}
              className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-[3px] bg-gradient-to-b from-[#D25542]/85 to-[#8C2012]/90 hover:from-[#E56552] hover:to-[#A42818] border border-white/40 text-[11.5px] font-medium shadow"
            >
              <span className="flex items-center gap-1.5">
                <LogOut className="w-3.5 h-3.5 text-white" />
                <span>Switch User / Log off</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
