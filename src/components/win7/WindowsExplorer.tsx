"use client";

import React, { useState } from "react";
import {
  Win7FolderIcon,
  Win7ComputerIcon,
  Win7TerminalIcon,
  Win7MailIcon,
  Win7PdfIcon,
  Win7NotepadIcon,
  Win7CodeAppIcon,
  Win7BrainChipIcon,
  GithubIcon,
  LinkedinIcon,
} from "./Win7Icons";
import {
  PROFILE,
  SKILLS,
  EDUCATION,
  TIMELINE_ITEMS,
  ProjectOrRole,
} from "@/data/portfolioData";
import { ArrowLeft, ArrowRight, RotateCw, Search, ChevronRight, ExternalLink, Download, Info, Copy, FolderOpen } from "lucide-react";
import { playWin7Sound } from "@/utils/win7Sounds";
import Win7ContextMenu, { Win7MenuItem } from "./Win7ContextMenu";

export type ExplorerFolderId =
  | "computer"
  | "projects"
  | "ml_lab"
  | "skills"
  | "education"
  | "documents";

interface WindowsExplorerProps {
  initialFolder?: ExplorerFolderId;
  onOpenWindow?: (windowId: string) => void;
  onOpenBrowser?: (site: "github" | "linkedin") => void;
  onInspectItemProperties?: (item: ProjectOrRole) => void;
}

const FOLDER_META: Record<
  ExplorerFolderId,
  { label: string; breadcrumbs: string[]; description: string }
> = {
  computer: {
    label: "Computer",
    breadcrumbs: ["Computer", "Local Disk (C:)", "Users", "DerekDavid"],
    description: "System Overview & User Directories",
  },
  projects: {
    label: "Projects & Experience",
    breadcrumbs: ["Libraries", "Projects & Experience"],
    description: "Production Engineering Roles, Distributed Systems & Full-Stack Projects",
  },
  ml_lab: {
    label: "AI & Voice Systems Lab",
    breadcrumbs: ["Libraries", "AI & Voice Systems Lab"],
    description: "Voice AI, Conversational Agents, LLM Function Calling & RAG Pipelines",
  },
  skills: {
    label: "Core Competencies",
    breadcrumbs: ["Control Panel", "System and Security", "Core Competencies"],
    description: "Installed Technical Packages, Frameworks & Runtime Environments",
  },
  education: {
    label: "Education & Credentials",
    breadcrumbs: ["Libraries", "Documents", "Education & Credentials"],
    description: "MSc & BSc in Computer Science — Gombe State University",
  },
  documents: {
    label: "My Documents",
    breadcrumbs: ["Libraries", "Documents"],
    description: "Personal Bio, Resume PDF & Quick Links",
  },
};

export default function WindowsExplorer({
  initialFolder = "projects",
  onOpenWindow,
  onOpenBrowser,
  onInspectItemProperties,
}: WindowsExplorerProps) {
  const [history, setHistory] = useState<ExplorerFolderId[]>([initialFolder]);
  const [historyIdx, setHistoryIdx] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<ProjectOrRole | null>(
    TIMELINE_ITEMS[0]
  );
  const [typeFilter, setTypeFilter] = useState<
    "ALL" | "Experience" | "AI & Voice Project" | "Fintech & Full-Stack"
  >("ALL");
  const [explorerMenu, setExplorerMenu] = useState<{
    x: number;
    y: number;
    items: Win7MenuItem[];
  } | null>(null);

  const currentFolder = history[historyIdx];
  const meta = FOLDER_META[currentFolder];

  const navigateTo = (folder: ExplorerFolderId) => {
    if (folder === currentFolder) return;
    playWin7Sound("nav", 0.55);
    const nextHistory = history.slice(0, historyIdx + 1);
    nextHistory.push(folder);
    setHistory(nextHistory);
    setHistoryIdx(nextHistory.length - 1);
    setSearchQuery("");
  };

  const goBack = () => {
    if (historyIdx > 0) {
      playWin7Sound("nav", 0.55);
      setHistoryIdx(historyIdx - 1);
    }
  };

  const goForward = () => {
    if (historyIdx < history.length - 1) {
      playWin7Sound("nav", 0.55);
      setHistoryIdx(historyIdx + 1);
    }
  };

  // Filtered project/experience items
  const filteredTimeline = TIMELINE_ITEMS.filter((item) => {
    const matchesSearch =
      !searchQuery.trim() ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    if (currentFolder === "ml_lab") {
      return (
        matchesSearch &&
        (item.type === "AI & Voice Project" ||
          item.id === "dora" ||
          item.id === "praix")
      );
    }
    if (typeFilter !== "ALL") {
      return matchesSearch && item.type === typeFilter;
    }
    return matchesSearch;
  });

  const renderItemIcon = (item: ProjectOrRole) => {
    if (item.type === "AI & Voice Project") return <Win7BrainChipIcon className="w-8 h-8" />;
    if (item.type === "Fintech & Full-Stack") return <Win7CodeAppIcon className="w-8 h-8" />;
    return <Win7ComputerIcon className="w-8 h-8" />;
  };

  const handleRowContextMenu = (e: React.MouseEvent, item: ProjectOrRole) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedProject(item);
    setExplorerMenu({
      x: e.clientX,
      y: e.clientY,
      items: [
        {
          id: "open-item",
          label: "Inspect in Preview Pane",
          bold: true,
          icon: <FolderOpen className="w-3.5 h-3.5 text-[#1B5790]" />,
          action: () => setSelectedProject(item),
        },
        {
          id: "copy-summary",
          label: "Copy Engineering Summary",
          icon: <Copy className="w-3.5 h-3.5 text-[#3B5978]" />,
          action: () => {
            if (typeof navigator !== "undefined" && navigator.clipboard) {
              navigator.clipboard.writeText(
                `${item.company} — ${item.role} (${item.date}): ${item.description}`
              );
            }
            playWin7Sound("ding", 0.45);
          },
        },
        { id: "div-1", label: "", divider: true },
        {
          id: "open-cmd",
          label: "Open Command Prompt here",
          icon: <Win7TerminalIcon className="w-3.5 h-3.5" />,
          action: () => onOpenWindow?.("terminal"),
        },
        { id: "div-2", label: "", divider: true },
        {
          id: "props",
          label: "Properties",
          shortcut: "Alt+Enter",
          icon: <Info className="w-3.5 h-3.5 text-[#1B5790]" />,
          action: () => onInspectItemProperties?.(item),
        },
      ],
    });
  };

  const handleBackgroundContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExplorerMenu({
      x: e.clientX,
      y: e.clientY,
      items: [
        {
          id: "view-folder",
          label: "View",
          submenu: [
            {
              id: "v-projects",
              label: "Projects & Experience",
              checked: currentFolder === "projects",
              action: () => navigateTo("projects"),
            },
            {
              id: "v-ml",
              label: "AI & Voice Systems Lab",
              checked: currentFolder === "ml_lab",
              action: () => navigateTo("ml_lab"),
            },
            {
              id: "v-skills",
              label: "Core Competencies",
              checked: currentFolder === "skills",
              action: () => navigateTo("skills"),
            },
            {
              id: "v-computer",
              label: "Computer Overview",
              checked: currentFolder === "computer",
              action: () => navigateTo("computer"),
            },
          ],
        },
        {
          id: "refresh-exp",
          label: "Refresh",
          shortcut: "F5",
          icon: <RotateCw className="w-3.5 h-3.5 text-[#1B5790]" />,
          action: () => {
            playWin7Sound("nav", 0.45);
            setSearchQuery("");
          },
        },
        { id: "div-bg-1", label: "", divider: true },
        {
          id: "open-resume-exp",
          label: "Open Resume.pdf in WordPad",
          icon: <Win7PdfIcon className="w-3.5 h-3.5" />,
          action: () => onOpenWindow?.("resume"),
        },
        {
          id: "open-terminal-exp",
          label: "Open Command Prompt here",
          icon: <Win7TerminalIcon className="w-3.5 h-3.5" />,
          action: () => onOpenWindow?.("terminal"),
        },
      ],
    });
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#FFFFFF] text-[12px] font-sans">
      {/* 1. Explorer Navigation Bar (Back/Forward + Breadcrumb Address Bar + Search Box) */}
      <div className="flex items-center gap-2 px-2.5 py-1.5 bg-gradient-to-b from-[#F4F8FC] via-[#E6F0FA] to-[#DCE8F5] border-b border-[#AABCCF]">
        {/* Back / Forward Round Aero Buttons */}
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

        {/* Breadcrumb Address Bar */}
        <div className="flex-1 flex items-center justify-between h-[26px] px-2 bg-white/95 border border-[#8FA6BF] rounded-[2px] shadow-[inset_0_1px_2px_rgba(0,0,0,0.08)] min-w-0">
          <div className="flex items-center gap-1 overflow-x-auto whitespace-nowrap">
            <Win7FolderIcon className="w-4 h-4 shrink-0 mr-1" />
            {meta.breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <button
                  type="button"
                  onClick={() => idx === 0 && navigateTo("computer")}
                  className="px-1 py-0.5 hover:bg-[#E5F3FB] hover:border-[#70C0E7] border border-transparent rounded-[2px] text-[#1E395B] font-medium transition-colors"
                >
                  {crumb}
                </button>
                {idx < meta.breadcrumbs.length - 1 && (
                  <ChevronRight className="w-3 h-3 text-[#6D8196] shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            title="Refresh"
            className="p-1 hover:bg-[#E5F3FB] rounded text-[#3B5978] shrink-0"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Search Box */}
        <div className="relative w-40 sm:w-52 h-[26px] shrink-0">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${meta.label}`}
            className="w-full h-full pl-2.5 pr-7 bg-white/95 border border-[#8FA6BF] rounded-[2px] text-[12px] text-[#1E1E1E] placeholder:italic placeholder:text-[#7A8B9E] focus:outline-none focus:border-[#3C7FB1] shadow-[inset_0_1px_2px_rgba(0,0,0,0.08)]"
          />
          <Search className="w-3.5 h-3.5 text-[#5D7B9D] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* 2. Windows 7 Command Bar (Teal/Blue Metallic Strip) */}
      <div className="flex items-center justify-between px-3 py-1 bg-gradient-to-b from-[#F5F9FD] via-[#E3EFFA] to-[#D6E6F6] border-b border-[#B6C7D9] text-[#1E395B] shrink-0 overflow-x-auto">
        <div className="flex items-center gap-1 whitespace-nowrap">
          <button
            type="button"
            onClick={() => navigateTo("computer")}
            className="win7-cmd-btn px-2.5 py-1 rounded-[2px] flex items-center gap-1.5"
          >
            <span>Organize</span>
          </button>
          <span className="h-4 w-[1px] bg-[#B8C9DC] mx-1" />
          <button
            type="button"
            onClick={() => navigateTo("projects")}
            className={`win7-cmd-btn px-2.5 py-1 rounded-[2px] ${
              currentFolder === "projects" ? "bg-[#D9ECFF] border-[#7DA2CE]" : ""
            }`}
          >
            All Projects & Roles
          </button>
          <button
            type="button"
            onClick={() => navigateTo("ml_lab")}
            className={`win7-cmd-btn px-2.5 py-1 rounded-[2px] ${
              currentFolder === "ml_lab" ? "bg-[#D9ECFF] border-[#7DA2CE]" : ""
            }`}
          >
            ML & Deep Learning
          </button>
          <button
            type="button"
            onClick={() => navigateTo("skills")}
            className={`win7-cmd-btn px-2.5 py-1 rounded-[2px] ${
              currentFolder === "skills" ? "bg-[#D9ECFF] border-[#7DA2CE]" : ""
            }`}
          >
            System Skills
          </button>
          <button
            type="button"
            onClick={() => navigateTo("education")}
            className={`win7-cmd-btn px-2.5 py-1 rounded-[2px] ${
              currentFolder === "education" ? "bg-[#D9ECFF] border-[#7DA2CE]" : ""
            }`}
          >
            Education
          </button>
        </div>

        <div className="hidden md:flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onOpenWindow?.("resume")}
            className="win7-cmd-btn px-2.5 py-1 rounded-[2px] flex items-center gap-1.5 text-[#114070] font-medium"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Open Resume.pdf</span>
          </button>
        </div>
      </div>

      {/* 3. Main Explorer Split Body: Left Tree Pane + Center Content Pane */}
      <div className="flex-1 flex min-h-0 overflow-hidden bg-white">
        {/* Left Navigation Tree Pane */}
        <aside className="w-48 sm:w-56 border-r border-[#D6E2EE] bg-[#F7FAFE] p-2 overflow-y-auto shrink-0 select-none">
          {/* Favorites */}
          <div className="mb-3">
            <div className="px-2 py-1 text-[11px] font-semibold text-[#1E395B] uppercase tracking-wider flex items-center gap-1">
              <span>Favorites</span>
            </div>
            <ul className="space-y-0.5 mt-0.5">
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo("computer")}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] text-left ${
                    currentFolder === "computer"
                      ? "win7-list-selected font-medium"
                      : "win7-list-hover"
                  }`}
                >
                  <Win7ComputerIcon className="w-4 h-4 shrink-0" />
                  <span className="truncate">Derek&apos;s PC</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo("projects")}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] text-left ${
                    currentFolder === "projects"
                      ? "win7-list-selected font-medium"
                      : "win7-list-hover"
                  }`}
                >
                  <Win7FolderIcon className="w-4 h-4 shrink-0" />
                  <span className="truncate">Projects & Roles</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo("ml_lab")}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] text-left ${
                    currentFolder === "ml_lab"
                      ? "win7-list-selected font-medium"
                      : "win7-list-hover"
                  }`}
                >
                  <Win7BrainChipIcon className="w-4 h-4 shrink-0" />
                  <span className="truncate">ML Research Lab</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Libraries */}
          <div className="mb-3">
            <div className="px-2 py-1 text-[11px] font-semibold text-[#1E395B] uppercase tracking-wider">
              Libraries
            </div>
            <ul className="space-y-0.5 mt-0.5">
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo("documents")}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] text-left ${
                    currentFolder === "documents"
                      ? "win7-list-selected font-medium"
                      : "win7-list-hover"
                  }`}
                >
                  <Win7NotepadIcon className="w-4 h-4 shrink-0" />
                  <span className="truncate">About & Bio</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo("skills")}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] text-left ${
                    currentFolder === "skills"
                      ? "win7-list-selected font-medium"
                      : "win7-list-hover"
                  }`}
                >
                  <Win7CodeAppIcon className="w-4 h-4 shrink-0" />
                  <span className="truncate">Core Competencies</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo("education")}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] text-left ${
                    currentFolder === "education"
                      ? "win7-list-selected font-medium"
                      : "win7-list-hover"
                  }`}
                >
                  <Win7FolderIcon className="w-4 h-4 shrink-0" />
                  <span className="truncate">Education & Certs</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Network & Quick Apps */}
          <div>
            <div className="px-2 py-1 text-[11px] font-semibold text-[#1E395B] uppercase tracking-wider">
              System & Network
            </div>
            <ul className="space-y-0.5 mt-0.5">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenWindow?.("terminal")}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] text-left win7-list-hover"
                >
                  <Win7TerminalIcon className="w-4 h-4 shrink-0" />
                  <span className="truncate">Command Prompt</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenWindow?.("contact")}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] text-left win7-list-hover"
                >
                  <Win7MailIcon className="w-4 h-4 shrink-0" />
                  <span className="truncate">Windows Mail</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenBrowser?.("github")}
                  className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-[2px] text-left win7-list-hover"
                >
                  <span className="flex items-center gap-2 truncate">
                    <GithubIcon className="w-4 h-4 text-[#24292F] shrink-0" />
                    <span className="truncate">GitHub (IE9)</span>
                  </span>
                  <ExternalLink className="w-3 h-3 text-[#6E849B] shrink-0" />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenBrowser?.("linkedin")}
                  className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-[2px] text-left win7-list-hover"
                >
                  <span className="flex items-center gap-2 truncate">
                    <LinkedinIcon className="w-4 h-4 text-[#0A66C2] shrink-0" />
                    <span className="truncate">LinkedIn (IE9)</span>
                  </span>
                  <ExternalLink className="w-3 h-3 text-[#6E849B] shrink-0" />
                </button>
              </li>
            </ul>
          </div>
        </aside>

        {/* Right Folder Content Area */}
        <div
          onContextMenu={handleBackgroundContextMenu}
          className="flex-1 flex flex-col min-w-0 overflow-y-auto p-4 bg-white"
        >
          {/* VIEW: COMPUTER (Hard Disk Drives + System Folders) */}
          {currentFolder === "computer" && (
            <div className="space-y-6">
              {/* Group: Hard Disk Drives */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[#1E395B] font-semibold text-[13px]">
                    Hard Disk Drives (2)
                  </span>
                  <div className="flex-1 h-[1px] bg-gradient-to-r from-[#B8CCE0] to-transparent" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => navigateTo("projects")}
                    className="flex items-center gap-3 p-3 rounded-[3px] border border-transparent win7-list-hover text-left"
                  >
                    <Win7ComputerIcon className="w-12 h-12 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-[#1E395B]">
                        Production Systems (C:)
                      </div>
                      <div className="w-full h-3.5 bg-[#E6E6E6] border border-[#B2B2B2] rounded-[2px] overflow-hidden my-1">
                        <div className="h-full w-[78%] bg-gradient-to-b from-[#66C7FF] via-[#2693DF] to-[#1369B3]" />
                      </div>
                      <div className="text-[11px] text-[#5A6B7C]">
                        5+ Years Active Experience • Distributed & Full-Stack
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => navigateTo("ml_lab")}
                    className="flex items-center gap-3 p-3 rounded-[3px] border border-transparent win7-list-hover text-left"
                  >
                    <Win7BrainChipIcon className="w-12 h-12 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-[#1E395B]">
                        AI &amp; Voice Systems (D:)
                      </div>
                      <div className="w-full h-3.5 bg-[#E6E6E6] border border-[#B2B2B2] rounded-[2px] overflow-hidden my-1">
                        <div className="h-full w-[72%] bg-gradient-to-b from-[#66C7FF] via-[#2693DF] to-[#1369B3]" />
                      </div>
                      <div className="text-[11px] text-[#5A6B7C]">
                        Gemini API • OpenAI Realtime • ElevenLabs • BullMQ
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Group: Portfolio Folders */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[#1E395B] font-semibold text-[13px]">
                    System Folders &amp; Libraries (5)
                  </span>
                  <div className="flex-1 h-[1px] bg-gradient-to-r from-[#B8CCE0] to-transparent" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  <button
                    type="button"
                    onClick={() => navigateTo("projects")}
                    className="flex flex-col items-center p-3 rounded-[3px] win7-list-hover text-center"
                  >
                    <Win7FolderIcon className="w-12 h-12 mb-1.5" />
                    <span className="font-medium text-[#1E395B]">Projects &amp; Experience</span>
                    <span className="text-[11px] text-[#6C7E90]">9 items</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => navigateTo("skills")}
                    className="flex flex-col items-center p-3 rounded-[3px] win7-list-hover text-center"
                  >
                    <Win7CodeAppIcon className="w-12 h-12 mb-1.5" />
                    <span className="font-medium text-[#1E395B]">Core Competencies</span>
                    <span className="text-[11px] text-[#6C7E90]">4 categories</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => navigateTo("education")}
                    className="flex flex-col items-center p-3 rounded-[3px] win7-list-hover text-center"
                  >
                    <Win7FolderIcon className="w-12 h-12 mb-1.5" />
                    <span className="font-medium text-[#1E395B]">Education</span>
                    <span className="text-[11px] text-[#6C7E90]">2 degrees</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => navigateTo("documents")}
                    className="flex flex-col items-center p-3 rounded-[3px] win7-list-hover text-center"
                  >
                    <Win7NotepadIcon className="w-12 h-12 mb-1.5" />
                    <span className="font-medium text-[#1E395B]">About_Derek.txt</span>
                    <span className="text-[11px] text-[#6C7E90]">Biography</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenWindow?.("resume")}
                    className="flex flex-col items-center p-3 rounded-[3px] win7-list-hover text-center"
                  >
                    <Win7PdfIcon className="w-12 h-12 mb-1.5" />
                    <span className="font-medium text-[#1E395B]">Resume.pdf</span>
                    <span className="text-[11px] text-[#6C7E90]">WordPad Document</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: PROJECTS & EXPERIENCE / ML LAB (Details Table + Inspector) */}
          {(currentFolder === "projects" || currentFolder === "ml_lab") && (
            <div className="flex flex-col h-full gap-4">
              {/* Filter Tabs */}
              {currentFolder === "projects" && (
                <div className="flex flex-wrap items-center gap-1.5 pb-2 border-b border-[#E3ECF5]">
                  {(
                    [
                      "ALL",
                      "Experience",
                      "AI & Voice Project",
                      "Fintech & Full-Stack",
                    ] as const
                  ).map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setTypeFilter(f)}
                      className={`px-2.5 py-1 rounded-[2px] text-[11.5px] border transition-colors ${
                        typeFilter === f
                          ? "win7-list-selected font-semibold text-[#1E395B]"
                          : "border-transparent hover:bg-[#EEF6FD] text-[#4C6278]"
                      }`}
                    >
                      {f === "ALL" ? "All Items (9)" : f}
                    </button>
                  ))}
                </div>
              )}

              {/* Explorer Details Table */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 min-h-0">
                <div className="lg:col-span-7 border border-[#D5E1EE] rounded-[2px] overflow-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gradient-to-b from-[#FAFBFD] to-[#EBF2F9] border-b border-[#CBD8E6] text-[#354E68] text-[11px] font-normal select-none">
                        <th className="py-1.5 px-2.5 border-r border-[#DCE6F0]">Name</th>
                        <th className="py-1.5 px-2.5 border-r border-[#DCE6F0]">Date Modified</th>
                        <th className="py-1.5 px-2.5 border-r border-[#DCE6F0] hidden sm:table-cell">
                          Type
                        </th>
                        <th className="py-1.5 px-2.5 text-right hidden md:table-cell">Size</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F0F4F8]">
                      {filteredTimeline.map((item) => {
                        const isSelected = selectedProject?.id === item.id;
                        return (
                          <tr
                            key={item.id}
                            onClick={() => setSelectedProject(item)}
                            onContextMenu={(e) => handleRowContextMenu(e, item)}
                            className={`cursor-pointer transition-colors ${
                              isSelected ? "win7-list-selected" : "win7-list-hover"
                            }`}
                          >
                            <td className="py-2 px-2.5 flex items-center gap-2 font-medium text-[#1E395B]">
                              <div className="w-5 h-5 shrink-0 flex items-center justify-center">
                                {renderItemIcon(item)}
                              </div>
                              <div className="truncate">
                                <div className="truncate">{item.company}</div>
                                <div className="text-[10.5px] text-[#5E7287] font-normal">
                                  {item.role}
                                </div>
                              </div>
                            </td>
                            <td className="py-2 px-2.5 text-[#4E6378] whitespace-nowrap font-mono text-[11px]">
                              {item.date}
                            </td>
                            <td className="py-2 px-2.5 text-[#4E6378] hidden sm:table-cell whitespace-nowrap">
                              {item.type}
                            </td>
                            <td className="py-2 px-2.5 text-[#4E6378] text-right font-mono text-[11px] hidden md:table-cell whitespace-nowrap">
                              {item.size}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Right File Inspector / Preview Pane */}
                <div className="lg:col-span-5 bg-gradient-to-b from-[#F6FAFE] to-[#EAF2FA] border border-[#CBD9E8] rounded-[3px] p-4 flex flex-col justify-between">
                  {selectedProject ? (
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 pb-3 border-b border-[#D2E0EE]">
                        <div className="w-12 h-12 shrink-0 flex items-center justify-center">
                          {renderItemIcon(selectedProject)}
                        </div>
                        <div className="min-w-0">
                          <span className="inline-block px-2 py-0.5 text-[10px] font-mono font-semibold bg-[#D9ECFF] text-[#144B82] border border-[#96C2EC] rounded-[2px] mb-1">
                            {selectedProject.date}
                            {selectedProject.location ? ` • ${selectedProject.location}` : ""}
                          </span>
                          <h3 className="text-[14px] font-bold text-[#143252] leading-snug">
                            {selectedProject.company}
                          </h3>
                          <p className="text-[12px] font-medium text-[#2E5C8A]">
                            {selectedProject.role}
                          </p>
                        </div>
                      </div>

                      <p className="text-[#2A3B4D] leading-relaxed text-[12px]">
                        {selectedProject.description}
                      </p>

                      <div className="space-y-1.5">
                        <div className="text-[11px] font-semibold text-[#1E395B] uppercase tracking-wider">
                          Key Engineering Highlights:
                        </div>
                        <ul className="space-y-1 text-[11.5px] text-[#2C3E50] list-disc pl-4">
                          {selectedProject.highlights.map((bullet, idx) => (
                            <li key={idx}>{bullet}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-2">
                        <div className="text-[11px] font-semibold text-[#1E395B] mb-1.5">
                          Dependencies & Stack:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedProject.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 text-[11px] font-mono bg-white border border-[#ACC4DC] text-[#1A436E] rounded-[2px] shadow-2xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-[#5C7085] text-center py-8">
                      Select a project or role to view properties.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* VIEW: SKILLS (Control Panel System Packages) */}
          {currentFolder === "skills" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#D5E2F0]">
                <div>
                  <h2 className="text-[15px] font-bold text-[#153658]">
                    Installed Core Competencies & Technical Stack
                  </h2>
                  <p className="text-[11.5px] text-[#556B82]">
                    Control Panel &gt; Programs and Features &gt; Engineering Capabilities
                  </p>
                </div>
                <span className="text-[11px] font-mono bg-[#E6F1FC] border border-[#A5C6E8] px-2.5 py-1 rounded-[2px] text-[#1B4A7A]">
                  Status: All Modules Verified
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {SKILLS.map((skill) => (
                  <div
                    key={skill.id}
                    className="p-3.5 rounded-[3px] bg-gradient-to-b from-[#FFFFFF] to-[#F4F8FD] border border-[#C6D7E8] shadow-2xs"
                  >
                    <div className="flex items-center gap-2.5 mb-2.5 pb-1.5 border-b border-[#E2ECF5]">
                      <Win7CodeAppIcon className="w-6 h-6 shrink-0" />
                      <h3 className="font-bold text-[13px] text-[#183B61]">
                        {skill.category}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {skill.items.map((item) => (
                        <span
                          key={item}
                          className="px-2.5 py-1 bg-white border border-[#9BB9D8] rounded-[2px] text-[11.5px] font-mono text-[#183B61] hover:bg-[#E7F3FF] transition-colors"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW: EDUCATION & CERTIFICATIONS */}
          {currentFolder === "education" && (
            <div className="space-y-4">
              <div className="pb-2 border-b border-[#D5E2F0]">
                <h2 className="text-[15px] font-bold text-[#153658]">
                  Academic Degrees & Deep Learning Certifications
                </h2>
                <p className="text-[11.5px] text-[#556B82]">
                  Verified academic history and specialized neural network training
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {EDUCATION.map((ed) => (
                  <div
                    key={ed.id}
                    className="flex items-start gap-3 p-3.5 rounded-[3px] bg-gradient-to-b from-white to-[#F5F9FD] border border-[#C7D7E7]"
                  >
                    <Win7FolderIcon className="w-10 h-10 shrink-0" />
                    <div>
                      <span className="inline-block px-2 py-0.5 text-[10px] font-mono bg-[#E3F0FC] text-[#174878] border border-[#A6C8EA] rounded-[2px] mb-1">
                        {ed.date}
                      </span>
                      <h3 className="font-bold text-[13px] text-[#163759]">
                        {ed.degree}
                      </h3>
                      <p className="text-[12px] text-[#4A6078]">
                        {ed.institution} — {ed.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW: MY DOCUMENTS / BIO */}
          {currentFolder === "documents" && (
            <div className="space-y-5 max-w-3xl">
              <div className="flex items-center gap-3 pb-3 border-b border-[#D5E2F0]">
                <Win7ComputerIcon className="w-12 h-12 shrink-0" />
                <div>
                  <h2 className="text-[16px] font-bold text-[#153658]">
                    {PROFILE.name} — {PROFILE.role}
                  </h2>
                  <p className="text-[12px] text-[#4C647D]">
                    {PROFILE.location} • {PROFILE.email}
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-[13px] text-[#243444] leading-relaxed bg-[#F8FBFE] p-4 rounded-[3px] border border-[#CEDOEE]">
                {PROFILE.aboutParagraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => onOpenWindow?.("resume")}
                  className="win7-btn px-4 py-1.5 rounded-[3px] font-medium text-[#1E395B] flex items-center gap-2"
                >
                  <Win7PdfIcon className="w-4 h-4" />
                  <span>Open Resume.pdf in WordPad</span>
                </button>
                <button
                  type="button"
                  onClick={() => navigateTo("projects")}
                  className="win7-btn px-4 py-1.5 rounded-[3px] font-medium text-[#1E395B]"
                >
                  Browse Experience & Projects
                </button>
                <button
                  type="button"
                  onClick={() => onOpenWindow?.("contact")}
                  className="win7-btn px-4 py-1.5 rounded-[3px] font-medium text-[#1E395B]"
                >
                  Compose Message
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 4. Windows 7 Bottom Details / Status Pane */}
      <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-b from-[#F1F6FB] to-[#E1ECF7] border-t border-[#B8C9DC] text-[#1E395B] shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <Win7FolderIcon className="w-7 h-7 shrink-0" />
          <div className="truncate">
            <div className="font-semibold text-[12px] truncate">
              {meta.label} — {PROFILE.name}
            </div>
            <div className="text-[11px] text-[#4F657B] truncate">
              {meta.description}
            </div>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[11px] text-[#4A6077] font-mono shrink-0">
          <span>Windows 7 Ultimate (Aero)</span>
          <span>•</span>
          <span>{PROFILE.experienceYears} Experience</span>
        </div>
      </div>

      {explorerMenu && (
        <Win7ContextMenu
          x={explorerMenu.x}
          y={explorerMenu.y}
          items={explorerMenu.items}
          onClose={() => setExplorerMenu(null)}
        />
      )}
    </div>
  );
}
