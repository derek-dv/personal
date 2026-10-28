"use client";

import React, { useState, useEffect } from "react";
import {
  WindowsOrbIcon,
  Win7FolderIcon,
  Win7ComputerIcon,
  Win7TerminalIcon,
  Win7MailIcon,
  Win7PdfIcon,
  Win7BrainChipIcon,
  Win7CodeAppIcon,
  Win7NotepadIcon,
  GithubIcon,
  LinkedinIcon,
} from "./Win7Icons";
import { ExplorerFolderId } from "./WindowsExplorer";
import { WindowId } from "./Win7Desktop";
import SystemPropertiesWindow from "./SystemPropertiesWindow";
import CommandPromptWindow from "./CommandPromptWindow";
import ContactMailWindow from "./ContactMailWindow";
import WordPadResumeWindow from "./WordPadResumeWindow";
import InternetExplorerWindow, { BrowserSiteId } from "./InternetExplorerWindow";
import {
  PROFILE,
  SKILLS,
  EDUCATION,
  TIMELINE_ITEMS,
  ProjectOrRole,
} from "@/data/portfolioData";
import {
  Wifi,
  Volume2,
  BatteryCharging,
  ArrowLeft,
  Search,
  ChevronRight,
  ExternalLink,
  Download,
  X,
  LogOut,
} from "lucide-react";
import { Win7UserAccount } from "./Win7LogonScreen";
import { playWin7Sound } from "@/utils/win7Sounds";

interface Win7MobileShellProps {
  initialWindow?: WindowId;
  initialExplorerFolder?: ExplorerFolderId;
  currentUser: Win7UserAccount;
  onSwitchUser: () => void;
}

type MobileView = "home" | WindowId;

const FOLDER_TITLES: Record<ExplorerFolderId, string> = {
  computer: "Computer (Derek's PC)",
  projects: "Projects & Experience",
  ml_lab: "Machine Learning Lab",
  skills: "Core Competencies",
  education: "Education & Credentials",
  documents: "About & Documents",
};

export default function Win7MobileShell({
  initialWindow = "terminal",
  initialExplorerFolder = "projects",
  currentUser,
  onSwitchUser,
}: Win7MobileShellProps) {
  // On "/", default to the touch-friendly Home screen OR let user jump into apps;
  // if routed to /projects, /about, /contact, open that app directly.
  const [activeView, setActiveView] = useState<MobileView>(
    initialWindow === "terminal" ? "home" : initialWindow
  );
  const [folder, setFolder] = useState<ExplorerFolderId>(initialExplorerFolder);
  const [ieSite, setIeSite] = useState<BrowserSiteId>("github");
  const [ieKey, setIeKey] = useState(0);
  const [selectedProject, setSelectedProject] = useState<ProjectOrRole | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [clock, setClock] = useState("09:35 AM");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setClock(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    };
    update();
    const id = setInterval(update, 15000);
    return () => clearInterval(id);
  }, []);

  const openApp = (view: MobileView, targetFolder?: ExplorerFolderId) => {
    playWin7Sound("nav", 0.5);
    if (targetFolder) {
      setFolder(targetFolder);
      setSelectedProject(null);
    }
    setActiveView(view);
    setIsStartOpen(false);
  };

  const openBrowser = (site: BrowserSiteId) => {
    playWin7Sound("nav", 0.5);
    setIeSite(site);
    setIeKey((k) => k + 1);
    setActiveView("ie");
    setIsStartOpen(false);
  };

  const filteredItems = TIMELINE_ITEMS.filter((item) => {
    const matchesSearch =
      !searchQuery.trim() ||
      item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    if (folder === "ml_lab") {
      return (
        matchesSearch &&
        (item.type === "AI & Voice Project" ||
          item.id === "dora" ||
          item.id === "praix")
      );
    }
    return matchesSearch;
  });

  const renderProjectIcon = (item: ProjectOrRole) => {
    if (item.type === "AI & Voice Project") return <Win7BrainChipIcon className="w-8 h-8" />;
    if (item.type === "Fintech & Full-Stack") return <Win7CodeAppIcon className="w-8 h-8" />;
    return <Win7ComputerIcon className="w-8 h-8" />;
  };

  return (
    <div className="relative w-screen h-dvh flex flex-col overflow-hidden select-none win7-harmony-wallpaper">
      <div className="pointer-events-none absolute inset-0 win7-wallpaper-rays" />

      {/* 1. Top Aero Glass Status Bar */}
      <header className="relative z-30 h-9 px-3 flex items-center justify-between bg-[#0B223D]/70 backdrop-blur-md border-b border-white/30 text-white text-[11.5px] shrink-0">
        <div className="flex items-center gap-2 font-medium truncate">
          <span className="inline-block w-2 h-2 rounded-full bg-[#52E5FF] shadow-[0_0_6px_#52E5FF]" />
          <span className="truncate">Windows 7 Aero Touch</span>
        </div>
        <div className="flex items-center gap-2.5 shrink-0">
          <Wifi className="w-3.5 h-3.5 opacity-90" />
          <Volume2 className="w-3.5 h-3.5 opacity-90" />
          <BatteryCharging className="w-4 h-4 text-[#7CE2FF]" />
          <span className="font-mono text-[11px]">{clock}</span>
        </div>
      </header>

      {/* 2. Main Viewport Area */}
      <main className="relative z-10 flex-1 min-h-0 flex flex-col overflow-hidden">
        {/* VIEW A: HOME DESKTOP LAUNCHER (Touch-friendly Aero Hero + Single-Tap Icon Grid) */}
        {activeView === "home" && (
          <div className="flex-1 overflow-y-auto p-3.5 space-y-4">
            {/* Aero Glass Welcome Card */}
            <div className="win7-aero-frame-active rounded-[8px] p-3.5 text-white">
              <div className="bg-[#0C1D31]/80 border border-white/25 rounded-[5px] p-3.5 space-y-2.5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-[5px] bg-gradient-to-br from-[#2B86E5] to-[#0C3B75] border border-[#85CAFF] flex items-center justify-center font-mono font-bold text-white text-base shadow">
                    DD
                  </div>
                  <div className="min-w-0">
                    <h1 className="text-[16px] font-bold text-white leading-tight truncate">
                      {PROFILE.name}
                    </h1>
                    <p className="text-[11.5px] text-[#84D2FF] font-medium truncate">
                      {PROFILE.role}
                    </p>
                  </div>
                </div>

                <p className="text-[12px] text-white/90 leading-relaxed">
                  {PROFILE.summary}
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => openApp("explorer", "projects")}
                    className="px-3 py-1.5 rounded-[4px] bg-gradient-to-b from-[#4CA8FF] to-[#1A68C7] border border-[#9CD5FF] text-white text-[11.5px] font-semibold shadow"
                  >
                    Explore Projects &amp; Roles
                  </button>
                  <button
                    type="button"
                    onClick={() => openApp("about")}
                    className="px-3 py-1.5 rounded-[4px] bg-white/15 hover:bg-white/25 border border-white/35 text-white text-[11.5px] font-medium"
                  >
                    System Bio &amp; Stack
                  </button>
                </div>
              </div>
            </div>

            {/* Single-Tap Desktop Folders & Applications Grid */}
            <div>
              <div className="px-1 mb-2 text-[11px] font-semibold uppercase tracking-wider text-white/90 drop-shadow">
                Touch any icon to launch
              </div>
              <div className="grid grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => openApp("explorer", "projects")}
                  className="flex flex-col items-center p-2 rounded-[6px] bg-white/10 active:bg-white/25 border border-white/25 backdrop-blur-xs text-center"
                >
                  <Win7FolderIcon className="w-10 h-10 mb-1 drop-shadow" />
                  <span className="text-[11px] text-white font-medium leading-tight win7-desktop-label">
                    Projects
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => openApp("explorer", "ml_lab")}
                  className="flex flex-col items-center p-2 rounded-[6px] bg-white/10 active:bg-white/25 border border-white/25 backdrop-blur-xs text-center"
                >
                  <Win7BrainChipIcon className="w-10 h-10 mb-1 drop-shadow" />
                  <span className="text-[11px] text-white font-medium leading-tight win7-desktop-label">
                    ML Lab
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => openApp("explorer", "skills")}
                  className="flex flex-col items-center p-2 rounded-[6px] bg-white/10 active:bg-white/25 border border-white/25 backdrop-blur-xs text-center"
                >
                  <Win7CodeAppIcon className="w-10 h-10 mb-1 drop-shadow" />
                  <span className="text-[11px] text-white font-medium leading-tight win7-desktop-label">
                    Skills
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => openApp("about")}
                  className="flex flex-col items-center p-2 rounded-[6px] bg-white/10 active:bg-white/25 border border-white/25 backdrop-blur-xs text-center"
                >
                  <Win7ComputerIcon className="w-10 h-10 mb-1 drop-shadow" />
                  <span className="text-[11px] text-white font-medium leading-tight win7-desktop-label">
                    System Info
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => openApp("terminal")}
                  className="flex flex-col items-center p-2 rounded-[6px] bg-white/10 active:bg-white/25 border border-white/25 backdrop-blur-xs text-center"
                >
                  <Win7TerminalIcon className="w-10 h-10 mb-1 drop-shadow" />
                  <span className="text-[11px] text-white font-medium leading-tight win7-desktop-label">
                    CMD Shell
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => openApp("contact")}
                  className="flex flex-col items-center p-2 rounded-[6px] bg-white/10 active:bg-white/25 border border-white/25 backdrop-blur-xs text-center"
                >
                  <Win7MailIcon className="w-10 h-10 mb-1 drop-shadow" />
                  <span className="text-[11px] text-white font-medium leading-tight win7-desktop-label">
                    Contact
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => openApp("resume")}
                  className="flex flex-col items-center p-2 rounded-[6px] bg-white/10 active:bg-white/25 border border-white/25 backdrop-blur-xs text-center"
                >
                  <Win7PdfIcon className="w-10 h-10 mb-1 drop-shadow" />
                  <span className="text-[11px] text-white font-medium leading-tight win7-desktop-label">
                    Resume.pdf
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => openBrowser("github")}
                  className="flex flex-col items-center p-2 rounded-[6px] bg-white/10 active:bg-white/25 border border-white/25 backdrop-blur-xs text-center"
                >
                  <div className="w-10 h-10 mb-1 rounded-[6px] bg-[#1B2026] border border-white/40 flex items-center justify-center text-white shadow">
                    <GithubIcon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] text-white font-medium leading-tight win7-desktop-label">
                    GitHub (IE9)
                  </span>
                </button>
              </div>
            </div>

            {/* Quick Featured Roles & ML Projects Preview Strip */}
            <div className="win7-aero-frame-active rounded-[8px] p-1.5">
              <div className="bg-white/95 rounded-[5px] p-3 space-y-2.5 text-[#1E395B]">
                <div className="flex items-center justify-between border-b border-[#D5E2F0] pb-1.5">
                  <span className="font-bold text-[12.5px] flex items-center gap-1.5">
                    <Win7FolderIcon className="w-4 h-4" />
                    <span>Recent Engineering Highlights</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => openApp("explorer", "projects")}
                    className="text-[11px] font-semibold text-[#1864B4] flex items-center gap-0.5"
                  >
                    <span>View All (9)</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-2">
                  {TIMELINE_ITEMS.slice(0, 3).map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setFolder("projects");
                        setSelectedProject(item);
                        setActiveView("explorer");
                      }}
                      className="w-full flex items-center justify-between gap-2 p-2 rounded-[4px] bg-[#F3F8FD] active:bg-[#DCEBFC] border border-[#CFE0F2] text-left"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 shrink-0 flex items-center justify-center">
                          {renderProjectIcon(item)}
                        </div>
                        <div className="min-w-0">
                          <div className="text-[12px] font-bold text-[#153556] truncate">
                            {item.company}
                          </div>
                          <div className="text-[11px] text-[#4C647D] truncate">
                            {item.role} • {item.date}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#5D7894] shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW B: MAXIMIZED AERO MOBILE APPLICATION WINDOW */}
        {activeView !== "home" && (
          <div className="flex-1 flex flex-col m-1.5 rounded-[7px] win7-aero-frame-active overflow-hidden min-h-0">
            {/* Aero Title Bar with Back to Desktop & Red Close Button */}
            <div className="flex items-center justify-between h-[34px] px-2.5 shrink-0">
              <button
                type="button"
                onClick={() => {
                  if (activeView === "explorer" && selectedProject) {
                    setSelectedProject(null);
                  } else {
                    setActiveView("home");
                  }
                }}
                className="flex items-center gap-1.5 min-w-0 pr-2"
              >
                <span className="w-6 h-6 rounded-full win7-nav-orb flex items-center justify-center shrink-0">
                  <ArrowLeft className="w-3.5 h-3.5 text-white" />
                </span>
                <span className="text-[12.5px] font-semibold truncate win7-title-text">
                  {activeView === "explorer"
                    ? FOLDER_TITLES[folder]
                    : activeView === "about"
                    ? "System Properties — About"
                    : activeView === "terminal"
                    ? "Command Prompt — cmd.exe"
                    : activeView === "resume"
                    ? "Resume.pdf — WordPad"
                    : activeView === "ie"
                    ? "Windows Internet Explorer 9"
                    : "Windows Live Mail — Contact"}
                </span>
              </button>

              <button
                type="button"
                title="Close to Desktop"
                onClick={() => {
                  setSelectedProject(null);
                  setActiveView("home");
                }}
                className="win7-caption-btn win7-caption-btn-close flex items-center justify-center w-[40px] h-[22px] rounded-[4px]"
              >
                <X className="w-3.5 h-3.5 text-white drop-shadow" />
              </button>
            </div>

            {/* Inner Client Content */}
            <div className="flex-1 flex flex-col min-h-0 mx-[4px] mb-[4px] bg-[#F4F8FC] rounded-[4px] border border-[#556B82] overflow-hidden text-[#1E1E1E]">
              {/* MOBILE EXPLORER VIEW */}
              {activeView === "explorer" && (
                <div className="flex flex-col h-full min-h-0 bg-white">
                  {/* Horizontal Scrollable Folder Switcher Pills */}
                  <div className="flex items-center gap-1.5 px-2.5 py-2 bg-gradient-to-b from-[#F5F9FD] to-[#DCE8F6] border-b border-[#B4C6DA] overflow-x-auto shrink-0">
                    {(
                      [
                        { id: "projects", label: "Projects (9)" },
                        { id: "ml_lab", label: "ML Lab" },
                        { id: "skills", label: "Skills" },
                        { id: "education", label: "Education" },
                        { id: "documents", label: "Bio" },
                        { id: "computer", label: "Computer" },
                      ] as { id: ExplorerFolderId; label: string }[]
                    ).map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => {
                          setFolder(tab.id);
                          setSelectedProject(null);
                        }}
                        className={`px-2.5 py-1 rounded-[3px] text-[11.5px] whitespace-nowrap border transition-colors ${
                          folder === tab.id
                            ? "win7-list-selected font-semibold text-[#14375A]"
                            : "bg-white/80 border-[#B8CCE0] text-[#3D5670]"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Search Input for Projects / ML Lab */}
                  {(folder === "projects" || folder === "ml_lab") && !selectedProject && (
                    <div className="px-3 py-2 bg-[#F2F7FC] border-b border-[#D5E2F0] shrink-0">
                      <div className="relative">
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder={`Search ${FOLDER_TITLES[folder]}...`}
                          className="w-full pl-3 pr-8 py-1.5 text-[12px] bg-white border border-[#8FA6BF] rounded-[3px] focus:outline-none focus:border-[#2E74B5]"
                        />
                        <Search className="w-4 h-4 text-[#5D7B9D] absolute right-2.5 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>
                  )}

                  {/* Explorer Folder Content */}
                  <div className="flex-1 overflow-y-auto p-3">
                    {/* Selected Project Inspector Sheet */}
                    {selectedProject ? (
                      <div className="space-y-3.5">
                        <button
                          type="button"
                          onClick={() => setSelectedProject(null)}
                          className="win7-btn px-3 py-1 rounded-[3px] text-[11.5px] font-semibold text-[#183B61] inline-flex items-center gap-1.5"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                          <span>Back to Folder List</span>
                        </button>

                        <div className="p-3.5 rounded-[4px] bg-gradient-to-b from-[#F7FAFE] to-[#EAF2FA] border border-[#C5D7EA] space-y-3">
                          <div className="flex items-start gap-3 pb-2.5 border-b border-[#D2E0EE]">
                            <div className="w-11 h-11 shrink-0 flex items-center justify-center">
                              {renderProjectIcon(selectedProject)}
                            </div>
                            <div>
                              <span className="inline-block px-2 py-0.5 text-[10px] font-mono font-semibold bg-[#D9ECFF] text-[#144B82] border border-[#96C2EC] rounded-[2px] mb-1">
                                {selectedProject.date}
                              </span>
                              <h2 className="text-[15px] font-bold text-[#143252]">
                                {selectedProject.company}
                              </h2>
                              <p className="text-[12px] font-medium text-[#2E5C8A]">
                                {selectedProject.role}
                              </p>
                            </div>
                          </div>

                          <p className="text-[12.5px] text-[#26384A] leading-relaxed">
                            {selectedProject.description}
                          </p>

                          <div className="space-y-1.5">
                            <div className="text-[11px] font-bold text-[#1E395B] uppercase">
                              Key Engineering Highlights:
                            </div>
                            <ul className="space-y-1.5 text-[12px] text-[#2C3E50] list-disc pl-4">
                              {selectedProject.highlights.map((h, i) => (
                                <li key={i}>{h}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="pt-1">
                            <div className="text-[11px] font-bold text-[#1E395B] mb-1.5">
                              Stack &amp; Dependencies:
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {selectedProject.tags.map((t) => (
                                <span
                                  key={t}
                                  className="px-2 py-0.5 text-[11px] font-mono bg-white border border-[#ACC4DC] text-[#1A436E] rounded-[2px]"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        {/* Folder: Projects or ML Lab */}
                        {(folder === "projects" || folder === "ml_lab") && (
                          <div className="space-y-2">
                            {filteredItems.map((item) => (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => setSelectedProject(item)}
                                className="w-full flex items-center justify-between gap-2.5 p-2.5 rounded-[4px] border border-[#D6E3F0] bg-[#FAFDFE] active:bg-[#DCEBFC] text-left shadow-2xs"
                              >
                                <div className="flex items-start gap-2.5 min-w-0">
                                  <div className="w-8 h-8 shrink-0 flex items-center justify-center mt-0.5">
                                    {renderProjectIcon(item)}
                                  </div>
                                  <div className="min-w-0">
                                    <div className="text-[13px] font-bold text-[#153556] truncate">
                                      {item.company}
                                    </div>
                                    <div className="text-[11.5px] font-medium text-[#2B5988] truncate">
                                      {item.role}
                                    </div>
                                    <div className="text-[10.5px] font-mono text-[#5B7085] mt-0.5">
                                      {item.date} • {item.type}
                                    </div>
                                  </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-[#5D7894] shrink-0" />
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Folder: Skills */}
                        {folder === "skills" && (
                          <div className="space-y-3">
                            {SKILLS.map((cat) => (
                              <div
                                key={cat.id}
                                className="p-3 rounded-[4px] bg-[#F7FAFE] border border-[#C6D7E8]"
                              >
                                <div className="flex items-center gap-2 mb-2 pb-1 border-b border-[#E2ECF5]">
                                  <Win7CodeAppIcon className="w-5 h-5" />
                                  <h3 className="font-bold text-[13px] text-[#183B61]">
                                    {cat.category}
                                  </h3>
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                  {cat.items.map((skill) => (
                                    <span
                                      key={skill}
                                      className="px-2 py-0.5 bg-white border border-[#9BB9D8] rounded-[2px] text-[11px] font-mono text-[#183B61]"
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Folder: Education */}
                        {folder === "education" && (
                          <div className="space-y-2.5">
                            {EDUCATION.map((ed) => (
                              <div
                                key={ed.id}
                                className="flex items-start gap-3 p-3 rounded-[4px] bg-[#F7FAFE] border border-[#C7D7E7]"
                              >
                                <Win7FolderIcon className="w-9 h-9 shrink-0" />
                                <div>
                                  <span className="inline-block px-2 py-0.5 text-[10px] font-mono bg-[#E3F0FC] text-[#174878] border border-[#A6C8EA] rounded-[2px] mb-1">
                                    {ed.date}
                                  </span>
                                  <h3 className="font-bold text-[13px] text-[#163759]">
                                    {ed.degree}
                                  </h3>
                                  <p className="text-[12px] text-[#4A6078]">
                                    {ed.institution}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Folder: Documents / Bio */}
                        {folder === "documents" && (
                          <div className="space-y-3.5">
                            <div className="p-3.5 rounded-[4px] bg-[#F7FAFE] border border-[#C7D7E7] space-y-2.5 text-[12.5px] leading-relaxed text-[#243444]">
                              {PROFILE.aboutParagraphs.map((p, idx) => (
                                <p key={idx}>{p}</p>
                              ))}
                            </div>
                            <button
                              type="button"
                              onClick={() => openApp("resume")}
                              className="win7-btn w-full py-2 px-3 rounded-[3px] font-semibold text-[#153961] flex items-center justify-center gap-2"
                            >
                              <Download className="w-4 h-4" />
                              <span>Open Resume.pdf in WordPad</span>
                            </button>
                          </div>
                        )}

                        {/* Folder: Computer */}
                        {folder === "computer" && (
                          <div className="space-y-3">
                            <button
                              type="button"
                              onClick={() => setFolder("projects")}
                              className="w-full flex items-center gap-3 p-3 rounded-[4px] border border-[#C8D9EA] bg-[#F7FAFE] text-left"
                            >
                              <Win7ComputerIcon className="w-11 h-11 shrink-0" />
                              <div className="flex-1 min-w-0">
                                <div className="font-bold text-[12.5px] text-[#1E395B]">
                                  Production Systems (C:)
                                </div>
                                <div className="w-full h-3 bg-[#E6E6E6] border border-[#B2B2B2] rounded-[2px] overflow-hidden my-1">
                                  <div className="h-full w-[78%] bg-gradient-to-b from-[#66C7FF] via-[#2693DF] to-[#1369B3]" />
                                </div>
                                <div className="text-[11px] text-[#5A6B7C]">
                                  5+ Years Full-Stack &amp; Distributed Systems
                                </div>
                              </div>
                            </button>

                            <button
                              type="button"
                              onClick={() => setFolder("ml_lab")}
                              className="w-full flex items-center gap-3 p-3 rounded-[4px] border border-[#C8D9EA] bg-[#F7FAFE] text-left"
                            >
                              <Win7BrainChipIcon className="w-11 h-11 shrink-0" />
                              <div className="flex-1 min-w-0">
                                <div className="font-bold text-[12.5px] text-[#1E395B]">
                                  Deep Learning GPU Cluster (D:)
                                </div>
                                <div className="w-full h-3 bg-[#E6E6E6] border border-[#B2B2B2] rounded-[2px] overflow-hidden my-1">
                                  <div className="h-full w-[64%] bg-gradient-to-b from-[#66C7FF] via-[#2693DF] to-[#1369B3]" />
                                </div>
                                <div className="text-[11px] text-[#5A6B7C]">
                                  PyTorch • CNNs • LSTMs • Gemini API
                                </div>
                              </div>
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* MOBILE SYSTEM PROPERTIES (ABOUT) */}
              {activeView === "about" && (
                <SystemPropertiesWindow
                  onOpenExplorerFolder={(f) => openApp("explorer", f)}
                  onOpenResume={() => openApp("resume")}
                />
              )}

              {/* MOBILE COMMAND PROMPT */}
              {activeView === "terminal" && (
                <CommandPromptWindow
                  onOpenWindow={(wId, f) =>
                    openApp(wId as MobileView, f as ExplorerFolderId | undefined)
                  }
                />
              )}

              {/* MOBILE CONTACT MAIL */}
              {activeView === "contact" && (
                <ContactMailWindow onOpenBrowser={(site) => openBrowser(site)} />
              )}

              {/* MOBILE WORDPAD RESUME VIEWER */}
              {activeView === "resume" && (
                <WordPadResumeWindow onOpenBrowser={(site) => openBrowser(site)} />
              )}

              {/* MOBILE INTERNET EXPLORER 9 */}
              {activeView === "ie" && (
                <InternetExplorerWindow
                  key={ieKey}
                  initialSite={ieSite}
                  onOpenWindow={(wId) => openApp(wId as MobileView)}
                />
              )}
            </div>
          </div>
        )}
      </main>

      {/* 3. Mobile Start Menu Drawer */}
      {isStartOpen && (
        <div
          onClick={() => setIsStartOpen(false)}
          className="fixed inset-0 bottom-[50px] z-40 bg-black/45 backdrop-blur-[2px] flex items-end p-1.5"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-h-[82vh] rounded-[8px] win7-start-menu p-2 flex flex-col gap-2 overflow-hidden"
          >
            {/* User Header */}
            <div className="flex items-center justify-between px-2.5 py-2 rounded-[5px] bg-white/10 border border-white/20 text-white">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-[4px] bg-gradient-to-br from-[#2B86E5] to-[#0C3B75] border border-[#85CAFF] flex items-center justify-center font-mono font-bold text-sm">
                  {currentUser === "Derek" ? "DD" : "G"}
                </div>
                <div>
                  <div className="text-[13px] font-bold leading-tight">
                    {currentUser === "Derek" ? PROFILE.name : "Guest (Visitor)"}
                  </div>
                  <div className="text-[10.5px] text-[#8CE0FF]">
                    {PROFILE.role}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => openApp("resume")}
                className="px-2.5 py-1 rounded-[3px] bg-[#1E5693] border border-white/40 text-[11px] font-medium flex items-center gap-1"
              >
                <Download className="w-3 h-3" />
                <span>CV</span>
              </button>
            </div>

            {/* White Program List */}
            <div className="bg-white rounded-[5px] border border-[#6E869F] p-1.5 grid grid-cols-2 gap-1.5 text-[#1A3350]">
              <button
                type="button"
                onClick={() => openApp("home")}
                className="flex items-center gap-2 p-2 rounded-[3px] win7-list-hover text-left"
              >
                <Win7ComputerIcon className="w-7 h-7 shrink-0" />
                <div className="min-w-0">
                  <div className="text-[12px] font-bold truncate">Desktop</div>
                  <div className="text-[10px] text-[#5D7287] truncate">Home View</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => openApp("explorer", "projects")}
                className="flex items-center gap-2 p-2 rounded-[3px] win7-list-hover text-left"
              >
                <Win7FolderIcon className="w-7 h-7 shrink-0" />
                <div className="min-w-0">
                  <div className="text-[12px] font-bold truncate">Projects</div>
                  <div className="text-[10px] text-[#5D7287] truncate">9 Roles &amp; Apps</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => openApp("explorer", "ml_lab")}
                className="flex items-center gap-2 p-2 rounded-[3px] win7-list-hover text-left"
              >
                <Win7BrainChipIcon className="w-7 h-7 shrink-0" />
                <div className="min-w-0">
                  <div className="text-[12px] font-bold truncate">ML Lab</div>
                  <div className="text-[10px] text-[#5D7287] truncate">PyTorch &amp; AI</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => openApp("explorer", "skills")}
                className="flex items-center gap-2 p-2 rounded-[3px] win7-list-hover text-left"
              >
                <Win7CodeAppIcon className="w-7 h-7 shrink-0" />
                <div className="min-w-0">
                  <div className="text-[12px] font-bold truncate">Skills</div>
                  <div className="text-[10px] text-[#5D7287] truncate">Competencies</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => openApp("about")}
                className="flex items-center gap-2 p-2 rounded-[3px] win7-list-hover text-left"
              >
                <Win7NotepadIcon className="w-7 h-7 shrink-0" />
                <div className="min-w-0">
                  <div className="text-[12px] font-bold truncate">About Me</div>
                  <div className="text-[10px] text-[#5D7287] truncate">Bio &amp; Degree</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => openApp("terminal")}
                className="flex items-center gap-2 p-2 rounded-[3px] win7-list-hover text-left"
              >
                <Win7TerminalIcon className="w-7 h-7 shrink-0" />
                <div className="min-w-0">
                  <div className="text-[12px] font-bold truncate">CMD Shell</div>
                  <div className="text-[10px] text-[#5D7287] truncate">Terminal</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => openApp("contact")}
                className="col-span-2 flex items-center justify-center gap-2 p-2 rounded-[3px] bg-[#E5F2FF] border border-[#96C2EC] text-[#143C66] font-bold text-[12px]"
              >
                <Win7MailIcon className="w-5 h-5" />
                <span>Send Message / Contact Derek</span>
              </button>
            </div>

            {/* External Links Footer */}
            <div className="flex items-center justify-between px-2 pt-0.5 text-white text-[11.5px]">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => openBrowser("github")}
                  className="flex items-center gap-1 hover:text-[#7CE2FF]"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub (IE9)</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-75" />
                </button>
                <button
                  type="button"
                  onClick={() => openBrowser("linkedin")}
                  className="flex items-center gap-1 hover:text-[#7CE2FF]"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  <span>LinkedIn (IE9)</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-75" />
                </button>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsStartOpen(false);
                  onSwitchUser();
                }}
                className="px-2.5 py-1 rounded-[3px] bg-[#C93B2B] border border-white/40 text-[11px] font-medium flex items-center gap-1"
              >
                <LogOut className="w-3 h-3" />
                <span>Switch User</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Bottom Windows 7 Aero Superbar Dock */}
      <footer className="relative z-50 h-[50px] px-1.5 flex items-center justify-between win7-taskbar shrink-0">
        {/* Start Orb */}
        <button
          type="button"
          onClick={() => setIsStartOpen((prev) => !prev)}
          className={`flex items-center justify-center w-[44px] h-[44px] rounded-full active:scale-95 transition-transform ${
            isStartOpen
              ? "brightness-125 drop-shadow-[0_0_10px_rgba(95,205,255,0.95)]"
              : ""
          }`}
        >
          <WindowsOrbIcon className="w-[38px] h-[38px]" />
        </button>

        {/* Quick Superbar Dock Tabs */}
        <div className="flex-1 flex items-center justify-around px-1 gap-1">
          <button
            type="button"
            onClick={() => openApp("home")}
            className={`flex-1 flex flex-col items-center justify-center h-[40px] rounded-[4px] ${
              activeView === "home" && !isStartOpen
                ? "win7-superbar-item-active"
                : "win7-superbar-item-pinned"
            }`}
          >
            <Win7ComputerIcon className="w-5 h-5" />
            <span className="text-[9.5px] text-white/95 leading-none mt-0.5">
              Desktop
            </span>
          </button>

          <button
            type="button"
            onClick={() => openApp("explorer", "projects")}
            className={`flex-1 flex flex-col items-center justify-center h-[40px] rounded-[4px] ${
              activeView === "explorer" && !isStartOpen
                ? "win7-superbar-item-active"
                : "win7-superbar-item-pinned"
            }`}
          >
            <Win7FolderIcon className="w-5 h-5" />
            <span className="text-[9.5px] text-white/95 leading-none mt-0.5">
              Explorer
            </span>
          </button>

          <button
            type="button"
            onClick={() => openApp("about")}
            className={`flex-1 flex flex-col items-center justify-center h-[40px] rounded-[4px] ${
              activeView === "about" && !isStartOpen
                ? "win7-superbar-item-active"
                : "win7-superbar-item-pinned"
            }`}
          >
            <Win7BrainChipIcon className="w-5 h-5" />
            <span className="text-[9.5px] text-white/95 leading-none mt-0.5">
              About
            </span>
          </button>

          <button
            type="button"
            onClick={() => openApp("terminal")}
            className={`flex-1 flex flex-col items-center justify-center h-[40px] rounded-[4px] ${
              activeView === "terminal" && !isStartOpen
                ? "win7-superbar-item-active"
                : "win7-superbar-item-pinned"
            }`}
          >
            <Win7TerminalIcon className="w-5 h-5" />
            <span className="text-[9.5px] text-white/95 leading-none mt-0.5">
              CMD
            </span>
          </button>

          <button
            type="button"
            onClick={() => openApp("contact")}
            className={`flex-1 flex flex-col items-center justify-center h-[40px] rounded-[4px] ${
              activeView === "contact" && !isStartOpen
                ? "win7-superbar-item-active"
                : "win7-superbar-item-pinned"
            }`}
          >
            <Win7MailIcon className="w-5 h-5" />
            <span className="text-[9.5px] text-white/95 leading-none mt-0.5">
              Mail
            </span>
          </button>
        </div>

        {/* Far-right Show Desktop Sliver */}
        <button
          type="button"
          title="Show Desktop"
          onClick={() => openApp("home")}
          className="w-[12px] h-full border-l border-white/35 bg-gradient-to-b from-white/25 via-white/10 to-white/25 active:from-[#80D4FF]/60"
        />
      </footer>
    </div>
  );
}
