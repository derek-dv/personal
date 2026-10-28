"use client";

import React, { useState } from "react";
import AeroWindow from "./AeroWindow";
import WindowsExplorer, { ExplorerFolderId } from "./WindowsExplorer";
import SystemPropertiesWindow from "./SystemPropertiesWindow";
import CommandPromptWindow from "./CommandPromptWindow";
import ContactMailWindow from "./ContactMailWindow";
import WordPadResumeWindow from "./WordPadResumeWindow";
import InternetExplorerWindow, { BrowserSiteId } from "./InternetExplorerWindow";
import PersonalizeWindow, { Win7ThemeId } from "./PersonalizeWindow";
import DesktopGadgets from "./DesktopGadgets";
import PropertiesModal, { PropertiesItemInfo } from "./PropertiesModal";
import Win7ContextMenu, { Win7MenuItem } from "./Win7ContextMenu";
import StartMenu from "./StartMenu";
import Taskbar, { TaskbarWindowItem } from "./Taskbar";
import Win7MobileShell from "./Win7MobileShell";
import Win7LogonScreen, { Win7UserAccount } from "./Win7LogonScreen";
import { playWin7Sound } from "@/utils/win7Sounds";
import { ProjectOrRole } from "@/data/portfolioData";
import {
  RotateCw,
  FolderPlus,
  FilePlus,
  Sparkles,
  Monitor,
  Clock,
  Info,
  Shield,
  FolderOpen,
  Maximize2,
  Minimize2,
  X,
  Layers,
} from "lucide-react";
import {
  Win7FolderIcon,
  Win7ComputerIcon,
  Win7TerminalIcon,
  Win7MailIcon,
  Win7PdfIcon,
  Win7NotepadIcon,
  Win7BrainChipIcon,
  Win7IEIcon,
  Win7CodeAppIcon,
  GithubIcon,
  LinkedinIcon,
} from "./Win7Icons";

export type WindowId =
  | "explorer"
  | "terminal"
  | "about"
  | "contact"
  | "resume"
  | "ie"
  | "personalize";

interface WindowState {
  id: WindowId;
  title: string;
  shortTitle: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  defaultPosition: { x: number; y: number };
  defaultSize: { width: number; height: number };
}

interface DesktopShortcutItem {
  id: string;
  label: string;
  type: string;
  size: string;
  location: string;
  modified: string;
  description: string;
  renderIcon: (iconClass: string) => React.ReactNode;
  action: () => void;
}

interface Win7DesktopProps {
  initialWindow?: WindowId;
  initialExplorerFolder?: ExplorerFolderId;
}

export default function Win7Desktop({
  initialWindow = "terminal",
  initialExplorerFolder = "projects",
}: Win7DesktopProps) {
  const [explorerFolder, setExplorerFolder] = useState<ExplorerFolderId>(
    initialExplorerFolder
  );
  const [explorerKey, setExplorerKey] = useState(0);
  const [ieSite, setIeSite] = useState<BrowserSiteId>("github");
  const [ieKey, setIeKey] = useState(0);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<Win7UserAccount | null>(null);

  // Desktop "The Works" state (Context Menu, View, Sort, Gadgets, Themes, Properties, Custom Folders)
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    items: Win7MenuItem[];
  } | null>(null);
  const [iconSize, setIconSize] = useState<"large" | "medium" | "small">(
    "medium"
  );
  const [showDesktopIcons, setShowDesktopIcons] = useState(true);
  const [showGadgets, setShowGadgets] = useState(true);
  const [sortOrder, setSortOrder] = useState<"default" | "name" | "reverse">(
    "default"
  );
  const [activeTheme, setActiveTheme] = useState<Win7ThemeId>("harmony");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [propertiesInfo, setPropertiesInfo] =
    useState<PropertiesItemInfo | null>(null);
  const [customShortcuts, setCustomShortcuts] = useState<
    Array<{ id: string; label: string; kind: "folder" | "note"; created: string }>
  >([]);

  const [windows, setWindows] = useState<Record<WindowId, WindowState>>(() => ({
    explorer: {
      id: "explorer",
      title: "Projects & Experience — Windows Explorer",
      shortTitle: "Windows Explorer",
      isOpen: initialWindow === "explorer" || initialWindow === "terminal",
      isMinimized: false,
      isMaximized: false,
      zIndex: initialWindow === "explorer" ? 25 : 21,
      defaultPosition: { x: 70, y: 28 },
      defaultSize: { width: 920, height: 560 },
    },
    terminal: {
      id: "terminal",
      title: "Administrator: C:\\Windows\\System32\\cmd.exe — Derek David",
      shortTitle: "Command Prompt",
      isOpen: initialWindow === "terminal",
      isMinimized: false,
      isMaximized: false,
      zIndex: initialWindow === "terminal" ? 25 : 20,
      defaultPosition: { x: 180, y: 75 },
      defaultSize: { width: 760, height: 470 },
    },
    about: {
      id: "about",
      title: "System Properties — Control Panel\\System and Security\\System",
      shortTitle: "System Properties",
      isOpen: initialWindow === "about",
      isMinimized: false,
      isMaximized: false,
      zIndex: initialWindow === "about" ? 25 : 19,
      defaultPosition: { x: 110, y: 42 },
      defaultSize: { width: 860, height: 550 },
    },
    contact: {
      id: "contact",
      title: "New Message — Windows Live Mail",
      shortTitle: "Windows Mail",
      isOpen: initialWindow === "contact",
      isMinimized: false,
      isMaximized: false,
      zIndex: initialWindow === "contact" ? 25 : 18,
      defaultPosition: { x: 140, y: 55 },
      defaultSize: { width: 780, height: 510 },
    },
    resume: {
      id: "resume",
      title: "Resume.pdf — WordPad",
      shortTitle: "WordPad (Resume)",
      isOpen: initialWindow === "resume",
      isMinimized: false,
      isMaximized: false,
      zIndex: initialWindow === "resume" ? 25 : 17,
      defaultPosition: { x: 120, y: 24 },
      defaultSize: { width: 880, height: 600 },
    },
    ie: {
      id: "ie",
      title: "Windows Internet Explorer 9 — derek-dv",
      shortTitle: "Internet Explorer",
      isOpen: initialWindow === "ie",
      isMinimized: false,
      isMaximized: false,
      zIndex: initialWindow === "ie" ? 25 : 16,
      defaultPosition: { x: 95, y: 32 },
      defaultSize: { width: 920, height: 580 },
    },
    personalize: {
      id: "personalize",
      title:
        "Personalization — Control Panel\\Appearance and Personalization\\Personalization",
      shortTitle: "Personalization",
      isOpen: initialWindow === "personalize",
      isMinimized: false,
      isMaximized: false,
      zIndex: initialWindow === "personalize" ? 25 : 15,
      defaultPosition: { x: 155, y: 48 },
      defaultSize: { width: 780, height: 520 },
    },
  }));

  const bringToFront = (id: WindowId) => {
    setWindows((curr) => {
      const maxZ = Math.max(
        25,
        ...(Object.values(curr) as WindowState[]).map((w) => w.zIndex)
      );
      return {
        ...curr,
        [id]: {
          ...curr[id],
          zIndex: maxZ + 1,
        },
      };
    });
  };

  const openWindow = (id: string, folder?: ExplorerFolderId) => {
    const winId = id as WindowId;
    playWin7Sound("nav", 0.55);
    if (winId === "explorer" && folder) {
      setExplorerFolder(folder);
      setExplorerKey((k) => k + 1);
    }
    setWindows((curr) => {
      const maxZ = Math.max(
        25,
        ...(Object.values(curr) as WindowState[]).map((w) => w.zIndex)
      );
      return {
        ...curr,
        [winId]: {
          ...curr[winId],
          isOpen: true,
          isMinimized: false,
          zIndex: maxZ + 1,
        },
      };
    });
    setIsStartOpen(false);
    setContextMenu(null);
  };

  const openBrowser = (site: BrowserSiteId) => {
    playWin7Sound("nav", 0.55);
    setIeSite(site);
    setIeKey((k) => k + 1);
    setWindows((curr) => {
      const maxZ = Math.max(
        25,
        ...(Object.values(curr) as WindowState[]).map((w) => w.zIndex)
      );
      return {
        ...curr,
        ie: {
          ...curr.ie,
          title:
            site === "github"
              ? "derek-dv (Derek David) · GitHub — Windows Internet Explorer"
              : "Derek David | LinkedIn — Windows Internet Explorer",
          isOpen: true,
          isMinimized: false,
          zIndex: maxZ + 1,
        },
      };
    });
    setIsStartOpen(false);
    setContextMenu(null);
  };

  const closeWindow = (id: string) => {
    const winId = id as WindowId;
    playWin7Sound("minimize", 0.45);
    setWindows((curr) => ({
      ...curr,
      [winId]: {
        ...curr[winId],
        isOpen: false,
        isMinimized: false,
      },
    }));
  };

  const minimizeWindow = (id: string) => {
    const winId = id as WindowId;
    playWin7Sound("minimize", 0.5);
    setWindows((curr) => ({
      ...curr,
      [winId]: {
        ...curr[winId],
        isMinimized: true,
      },
    }));
  };

  const toggleMaximizeWindow = (id: string) => {
    const winId = id as WindowId;
    playWin7Sound("restore", 0.5);
    setWindows((curr) => ({
      ...curr,
      [winId]: {
        ...curr[winId],
        isMaximized: !curr[winId].isMaximized,
      },
    }));
    bringToFront(winId);
  };

  const triggerDesktopRefresh = () => {
    playWin7Sound("nav", 0.45);
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 140);
  };

  const handleCascadeWindows = () => {
    playWin7Sound("restore", 0.5);
    setWindows((curr) => {
      const next = { ...curr };
      let z = 30;
      (Object.keys(next) as WindowId[]).forEach((id) => {
        if (next[id].isOpen) {
          next[id] = {
            ...next[id],
            isMinimized: false,
            isMaximized: false,
            zIndex: z++,
          };
        }
      });
      return next;
    });
  };

  const handleSwitchUser = () => {
    setIsStartOpen(false);
    setContextMenu(null);
    playWin7Sound("logoff", 0.7);
    setCurrentUser(null);
  };

  // Determine which open, non-minimized window has the highest zIndex
  const focusedWindowId = (Object.values(windows) as WindowState[])
    .filter((w) => w.isOpen && !w.isMinimized)
    .sort((a, b) => b.zIndex - a.zIndex)[0]?.id;

  const handleTaskbarAppClick = (id: string) => {
    const winId = id as WindowId;
    const target = windows[winId];
    setIsStartOpen(false);
    setContextMenu(null);

    if (!target.isOpen) {
      openWindow(winId);
      return;
    }
    if (target.isMinimized) {
      openWindow(winId);
      return;
    }
    if (focusedWindowId === winId) {
      minimizeWindow(winId);
    } else {
      bringToFront(winId);
    }
  };

  const handleShowDesktop = () => {
    setIsStartOpen(false);
    setContextMenu(null);
    const anyVisible = (Object.values(windows) as WindowState[]).some(
      (w) => w.isOpen && !w.isMinimized
    );
    setWindows((curr) => {
      const updated = { ...curr };
      (Object.keys(updated) as WindowId[]).forEach((k) => {
        if (updated[k].isOpen) {
          updated[k] = { ...updated[k], isMinimized: anyVisible };
        }
      });
      return updated;
    });
  };

  const getWindowIcon = (id: WindowId, sizeClass = "w-4 h-4") => {
    switch (id) {
      case "explorer":
        return <Win7FolderIcon className={sizeClass} />;
      case "terminal":
        return <Win7TerminalIcon className={sizeClass} />;
      case "about":
        return <Win7ComputerIcon className={sizeClass} />;
      case "contact":
        return <Win7MailIcon className={sizeClass} />;
      case "resume":
        return <Win7NotepadIcon className={sizeClass} />;
      case "ie":
        return <Win7IEIcon className={sizeClass} />;
      case "personalize":
        return <Win7CodeAppIcon className={sizeClass} />;
    }
  };

  const taskbarItems: TaskbarWindowItem[] = (
    [
      "ie",
      "explorer",
      "terminal",
      "resume",
      "about",
      "contact",
      "personalize",
    ] as WindowId[]
  )
    .filter((id) => id !== "personalize" || windows.personalize.isOpen)
    .map((id) => ({
      id,
      title: windows[id].title,
      shortTitle: windows[id].shortTitle,
      icon: getWindowIcon(id, "w-6 h-6"),
      isOpen: windows[id].isOpen,
      isMinimized: windows[id].isMinimized,
      isFocused: focusedWindowId === id,
    }));

  const baseShortcuts: DesktopShortcutItem[] = [
    {
      id: "sc-computer",
      label: "Derek's PC",
      type: "System Folder",
      size: "64-bit OS",
      location: "C:\\Users\\DerekDavid\\Desktop",
      modified: "October 2026",
      description:
        "Windows 7 System Properties, Windows Experience Index (7.9 / 7.9), and hardware overview.",
      renderIcon: (cls) => <Win7ComputerIcon className={`${cls} drop-shadow-md`} />,
      action: () => openWindow("about"),
    },
    {
      id: "sc-projects",
      label: "Projects & Roles",
      type: "File Folder",
      size: "9 items (18.4 MB)",
      location: "C:\\Users\\DerekDavid\\Libraries\\Projects",
      modified: "October 2026",
      description:
        "Complete timeline of Derek David's engineering roles and production systems (Connectivo, Sky Enterprise, Manaknight, Dora, PraixAI).",
      renderIcon: (cls) => <Win7FolderIcon className={`${cls} drop-shadow-md`} />,
      action: () => openWindow("explorer", "projects"),
    },
    {
      id: "sc-ml",
      label: "Voice AI & Fintech",
      type: "AI Systems Directory",
      size: "5 modules (12.8 MB)",
      location: "C:\\Users\\DerekDavid\\Libraries\\AI_Lab",
      modified: "October 2026",
      description:
        "Dora Autonomous Voice-First Banking Assistant and PraixAI Real-Time Voice-to-Voice Conversational AI Platform.",
      renderIcon: (cls) => <Win7BrainChipIcon className={`${cls} drop-shadow-md`} />,
      action: () => openWindow("explorer", "ml_lab"),
    },
    {
      id: "sc-cmd",
      label: "Command Prompt",
      type: "Win32 Application (cmd.exe)",
      size: "302 KB",
      location: "C:\\Windows\\System32\\cmd.exe",
      modified: "October 2026",
      description:
        "Interactive Windows 7 Command Prompt shell with custom commands (whoami, skills, experience, projects, resume, ie).",
      renderIcon: (cls) => <Win7TerminalIcon className={`${cls} drop-shadow-md`} />,
      action: () => openWindow("terminal"),
    },
    {
      id: "sc-mail",
      label: "Contact Mail",
      type: "Windows Live Mail Shortcut",
      size: "48 KB",
      location: "C:\\Program Files\\Windows Live\\Mail",
      modified: "October 2026",
      description:
        "Compose and send an email directly to Derek David (derekdavid62@gmail.com).",
      renderIcon: (cls) => <Win7MailIcon className={`${cls} drop-shadow-md`} />,
      action: () => openWindow("contact"),
    },
    {
      id: "sc-resume",
      label: "Resume.pdf",
      type: "WordPad PDF Document (.pdf)",
      size: "148 KB",
      location: "C:\\Users\\DerekDavid\\Documents\\Resume.pdf",
      modified: "October 2026",
      description:
        "Official Resume of Derek David — Senior Full-Stack & AI Systems Engineer. Opens directly in WordPad.",
      renderIcon: (cls) => <Win7PdfIcon className={`${cls} drop-shadow-md`} />,
      action: () => openWindow("resume"),
    },
    {
      id: "sc-github",
      label: "GitHub (IE9)",
      type: "Internet Shortcut (.url)",
      size: "4 KB",
      location: "https://github.com/derek-dv",
      modified: "October 2026",
      description:
        "Opens Derek David's live GitHub profile (github.com/derek-dv) inside Windows Internet Explorer 9.",
      renderIcon: (cls) => (
        <div
          className={`${cls} rounded-[6px] bg-gradient-to-b from-[#2B3137] to-[#161B22] border border-white/40 flex items-center justify-center text-white shadow-md`}
        >
          <GithubIcon className="w-3/5 h-3/5" />
        </div>
      ),
      action: () => openBrowser("github"),
    },
    {
      id: "sc-linkedin",
      label: "LinkedIn (IE9)",
      type: "Internet Shortcut (.url)",
      size: "4 KB",
      location: "https://linkedin.com/in/derek-dv",
      modified: "October 2026",
      description:
        "Opens Derek David's LinkedIn profile (linkedin.com/in/derek-dv) inside Windows Internet Explorer 9.",
      renderIcon: (cls) => (
        <div
          className={`${cls} rounded-[6px] bg-gradient-to-b from-[#1E88E5] to-[#0A66C2] border border-white/40 flex items-center justify-center text-white shadow-md`}
        >
          <LinkedinIcon className="w-3/5 h-3/5" />
        </div>
      ),
      action: () => openBrowser("linkedin"),
    },
    ...customShortcuts.map(
      (cs): DesktopShortcutItem => ({
        id: cs.id,
        label: cs.label,
        type: cs.kind === "folder" ? "File Folder" : "Text Document (.txt)",
        size: cs.kind === "folder" ? "0 bytes" : "2 KB",
        location: `C:\\Users\\DerekDavid\\Desktop\\${cs.label}`,
        modified: cs.created,
        description:
          cs.kind === "folder"
            ? "User-created desktop folder."
            : "User-created desktop note.",
        renderIcon: (cls) =>
          cs.kind === "folder" ? (
            <Win7FolderIcon className={`${cls} drop-shadow-md`} />
          ) : (
            <Win7NotepadIcon className={`${cls} drop-shadow-md`} />
          ),
        action: () =>
          cs.kind === "folder"
            ? openWindow("explorer", "documents")
            : openWindow("resume"),
      })
    ),
  ];

  const sortedShortcuts = [...baseShortcuts].sort((a, b) => {
    if (sortOrder === "name") return a.label.localeCompare(b.label);
    if (sortOrder === "reverse") return b.label.localeCompare(a.label);
    return 0;
  });

  // Right-click menu builders
  const handleDesktopContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsStartOpen(false);
    setSelectedIcon(null);

    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      items: [
        {
          id: "view",
          label: "View",
          icon: <Monitor className="w-3.5 h-3.5 text-[#1B5790]" />,
          submenu: [
            {
              id: "view-large",
              label: "Large icons",
              checked: iconSize === "large",
              action: () => setIconSize("large"),
            },
            {
              id: "view-medium",
              label: "Medium icons",
              checked: iconSize === "medium",
              action: () => setIconSize("medium"),
            },
            {
              id: "view-small",
              label: "Small icons",
              checked: iconSize === "small",
              action: () => setIconSize("small"),
            },
            { id: "div-v1", label: "", divider: true },
            {
              id: "view-icons",
              label: "Show desktop icons",
              checked: showDesktopIcons,
              action: () => setShowDesktopIcons((v) => !v),
            },
            {
              id: "view-gadgets",
              label: "Show desktop gadgets",
              checked: showGadgets,
              action: () => setShowGadgets((v) => !v),
            },
          ],
        },
        {
          id: "sort",
          label: "Sort by",
          submenu: [
            {
              id: "sort-default",
              label: "Default (System Order)",
              checked: sortOrder === "default",
              action: () => setSortOrder("default"),
            },
            {
              id: "sort-name",
              label: "Name (A to Z)",
              checked: sortOrder === "name",
              action: () => setSortOrder("name"),
            },
            {
              id: "sort-reverse",
              label: "Name (Z to A)",
              checked: sortOrder === "reverse",
              action: () => setSortOrder("reverse"),
            },
          ],
        },
        {
          id: "refresh",
          label: "Refresh",
          shortcut: "F5",
          icon: <RotateCw className="w-3.5 h-3.5 text-[#1B5790]" />,
          action: triggerDesktopRefresh,
        },
        { id: "div-1", label: "", divider: true },
        {
          id: "new",
          label: "New",
          submenu: [
            {
              id: "new-folder",
              label: "Folder",
              icon: <FolderPlus className="w-3.5 h-3.5 text-[#D99B26]" />,
              action: () => {
                playWin7Sound("ding", 0.45);
                setCustomShortcuts((prev) => [
                  ...prev,
                  {
                    id: `custom-folder-${Date.now()}`,
                    label: `New Folder (${prev.length + 1})`,
                    kind: "folder",
                    created: "Just now",
                  },
                ]);
              },
            },
            {
              id: "new-note",
              label: "Text Document",
              icon: <FilePlus className="w-3.5 h-3.5 text-[#2B6CB0]" />,
              action: () => {
                playWin7Sound("ding", 0.45);
                setCustomShortcuts((prev) => [
                  ...prev,
                  {
                    id: `custom-note-${Date.now()}`,
                    label: `Notes_${prev.length + 1}.txt`,
                    kind: "note",
                    created: "Just now",
                  },
                ]);
              },
            },
          ],
        },
        { id: "div-2", label: "", divider: true },
        {
          id: "open-cmd-here",
          label: "Open Command Prompt here",
          icon: <Win7TerminalIcon className="w-3.5 h-3.5" />,
          action: () => openWindow("terminal"),
        },
        {
          id: "sys-props",
          label: "System Properties",
          icon: <Win7ComputerIcon className="w-3.5 h-3.5" />,
          action: () => openWindow("about"),
        },
        { id: "div-3", label: "", divider: true },
        {
          id: "gadgets",
          label: "Gadgets",
          icon: <Clock className="w-3.5 h-3.5 text-[#1E6BA8]" />,
          action: () => {
            playWin7Sound("nav", 0.45);
            setShowGadgets(true);
          },
        },
        {
          id: "personalize",
          label: "Personalize",
          icon: <Sparkles className="w-3.5 h-3.5 text-[#1B5790]" />,
          action: () => openWindow("personalize"),
        },
      ],
    });
  };

  const handleShortcutContextMenu = (
    e: React.MouseEvent,
    sc: DesktopShortcutItem
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedIcon(sc.id);
    setIsStartOpen(false);

    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      items: [
        {
          id: "sc-open",
          label: "Open",
          bold: true,
          icon: <FolderOpen className="w-3.5 h-3.5 text-[#1B5790]" />,
          action: sc.action,
        },
        {
          id: "sc-admin",
          label: "Run as administrator",
          icon: <Shield className="w-3.5 h-3.5 text-[#D99B26]" />,
          action: sc.action,
        },
        {
          id: "sc-loc",
          label: "Open file location in Explorer",
          icon: <Win7FolderIcon className="w-3.5 h-3.5" />,
          action: () => openWindow("explorer", "computer"),
        },
        { id: "sc-div-1", label: "", divider: true },
        {
          id: "sc-props",
          label: "Properties",
          shortcut: "Alt+Enter",
          icon: <Info className="w-3.5 h-3.5 text-[#1B5790]" />,
          action: () => {
            playWin7Sound("nav", 0.45);
            setPropertiesInfo({
              title: sc.label,
              type: sc.type,
              location: sc.location,
              size: sc.size,
              modified: sc.modified,
              description: sc.description,
              icon: sc.renderIcon("w-10 h-10"),
              onOpen: sc.action,
            });
          },
        },
      ],
    });
  };

  const handleTitleBarContextMenu = (e: React.MouseEvent, id: string) => {
    const winId = id as WindowId;
    const win = windows[winId];

    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      items: [
        {
          id: "win-restore",
          label: "Restore",
          disabled: !win.isMaximized,
          icon: <Maximize2 className="w-3.5 h-3.5 text-[#4A6078]" />,
          action: () => toggleMaximizeWindow(winId),
        },
        {
          id: "win-min",
          label: "Minimize",
          icon: <Minimize2 className="w-3.5 h-3.5 text-[#4A6078]" />,
          action: () => minimizeWindow(winId),
        },
        {
          id: "win-max",
          label: "Maximize",
          disabled: win.isMaximized,
          icon: <Maximize2 className="w-3.5 h-3.5 text-[#1B5790]" />,
          action: () => toggleMaximizeWindow(winId),
        },
        { id: "win-div", label: "", divider: true },
        {
          id: "win-close",
          label: "Close",
          bold: true,
          shortcut: "Alt+F4",
          icon: <X className="w-3.5 h-3.5 text-[#C62828]" />,
          action: () => closeWindow(winId),
        },
      ],
    });
  };

  const handleTaskbarContextMenu = (e: React.MouseEvent) => {
    setIsStartOpen(false);
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      items: [
        {
          id: "tb-explorer",
          label: "Windows Explorer",
          icon: <Win7FolderIcon className="w-3.5 h-3.5" />,
          action: () => openWindow("explorer", "projects"),
        },
        {
          id: "tb-cascade",
          label: "Cascade / Restore all windows",
          icon: <Layers className="w-3.5 h-3.5 text-[#1B5790]" />,
          action: handleCascadeWindows,
        },
        {
          id: "tb-show-desktop",
          label: "Show the desktop",
          action: handleShowDesktop,
        },
        { id: "tb-div-1", label: "", divider: true },
        {
          id: "tb-taskmgr",
          label: "Start Command Prompt (Task Shell)",
          bold: true,
          icon: <Win7TerminalIcon className="w-3.5 h-3.5" />,
          action: () => openWindow("terminal"),
        },
        { id: "tb-div-2", label: "", divider: true },
        {
          id: "tb-props",
          label: "Properties",
          icon: <Info className="w-3.5 h-3.5 text-[#1B5790]" />,
          action: () => openWindow("personalize"),
        },
      ],
    });
  };

  const handleInspectProjectProperties = (item: ProjectOrRole) => {
    playWin7Sound("nav", 0.45);
    setPropertiesInfo({
      title: `${item.company} — ${item.role}`,
      type: item.type,
      location: `C:\\Users\\DerekDavid\\Projects\\${item.id}`,
      size: item.size,
      modified: item.date,
      description: item.description,
      tags: item.tags,
      icon: <Win7FolderIcon className="w-10 h-10" />,
    });
  };

  if (!currentUser) {
    return (
      <Win7LogonScreen
        onLoginSuccess={(user) => {
          setCurrentUser(user);
        }}
      />
    );
  }

  const iconBoxDimensions =
    iconSize === "large"
      ? { btn: "w-[98px] p-2", icon: "w-14 h-14", rows: "grid-rows-5" }
      : iconSize === "small"
      ? { btn: "w-[72px] p-1", icon: "w-8 h-8", rows: "grid-rows-8" }
      : { btn: "w-[82px] p-1.5", icon: "w-11 h-11", rows: "grid-rows-6" };

  const wallpaperThemeClass = `win7-theme-${activeTheme}`;

  return (
    <>
      {/* Mobile / Small Screen Touch-Friendly Windows 7 Aero Fallback (< 768px) */}
      <div className="block md:hidden w-screen h-dvh overflow-hidden">
        <Win7MobileShell
          initialWindow={initialWindow === "personalize" ? "about" : initialWindow}
          initialExplorerFolder={initialExplorerFolder}
          currentUser={currentUser}
          onSwitchUser={handleSwitchUser}
        />
      </div>

      {/* Desktop Windows 7 Aero Window Manager (>= 768px) */}
      <div
        onClick={() => {
          setSelectedIcon(null);
          setIsStartOpen(false);
          setContextMenu(null);
        }}
        onContextMenu={handleDesktopContextMenu}
        className={`hidden md:block relative w-screen h-screen overflow-hidden select-none ${wallpaperThemeClass}`}
      >
        {/* Subtle Windows 7 Aurora Light Rays Overlay */}
        <div className="pointer-events-none absolute inset-0 win7-wallpaper-rays" />

        {/* Desktop Shortcuts Grid (Left Side) */}
        {showDesktopIcons && !isRefreshing && (
          <div
            className={`relative z-10 p-3 grid grid-flow-col ${iconBoxDimensions.rows} gap-y-2 gap-x-3 w-fit max-h-[calc(100vh-52px)]`}
          >
            {sortedShortcuts.map((sc) => {
              const isSelected = selectedIcon === sc.id;
              return (
                <button
                  key={sc.id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIcon(sc.id);
                    setIsStartOpen(false);
                    setContextMenu(null);
                  }}
                  onDoubleClick={(e) => {
                    e.stopPropagation();
                    sc.action();
                  }}
                  onContextMenu={(e) => handleShortcutContextMenu(e, sc)}
                  className={`group flex flex-col items-center justify-start ${iconBoxDimensions.btn} rounded-[3px] transition-all ${
                    isSelected ? "win7-desktop-icon-selected" : "win7-desktop-icon"
                  }`}
                >
                  <div className="mb-1 transition-transform group-active:scale-95">
                    {sc.renderIcon(iconBoxDimensions.icon)}
                  </div>
                  <span className="text-[11.5px] leading-tight text-white text-center font-normal win7-desktop-label line-clamp-2">
                    {sc.label}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Windows 7 Desktop Gadgets (Right Side) */}
        {showGadgets && (
          <DesktopGadgets
            onCloseGadgets={() => setShowGadgets(false)}
            onOpenTerminal={() => openWindow("terminal")}
          />
        )}

        {/* Aero Windows Manager */}
        <AeroWindow
          id="explorer"
          title={windows.explorer.title}
          icon={getWindowIcon("explorer")}
          isOpen={windows.explorer.isOpen}
          isMinimized={windows.explorer.isMinimized}
          isMaximized={windows.explorer.isMaximized}
          isFocused={focusedWindowId === "explorer"}
          zIndex={windows.explorer.zIndex}
          defaultPosition={windows.explorer.defaultPosition}
          defaultSize={windows.explorer.defaultSize}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onToggleMaximize={toggleMaximizeWindow}
          onFocus={() => bringToFront("explorer")}
          onTitleBarContextMenu={handleTitleBarContextMenu}
        >
          <WindowsExplorer
            key={explorerKey}
            initialFolder={explorerFolder}
            onOpenWindow={(wId) => openWindow(wId)}
            onOpenBrowser={(site) => openBrowser(site)}
            onInspectItemProperties={handleInspectProjectProperties}
          />
        </AeroWindow>

        <AeroWindow
          id="terminal"
          title={windows.terminal.title}
          icon={getWindowIcon("terminal")}
          isOpen={windows.terminal.isOpen}
          isMinimized={windows.terminal.isMinimized}
          isMaximized={windows.terminal.isMaximized}
          isFocused={focusedWindowId === "terminal"}
          zIndex={windows.terminal.zIndex}
          defaultPosition={windows.terminal.defaultPosition}
          defaultSize={windows.terminal.defaultSize}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onToggleMaximize={toggleMaximizeWindow}
          onFocus={() => bringToFront("terminal")}
          onTitleBarContextMenu={handleTitleBarContextMenu}
        >
          <CommandPromptWindow
            onOpenWindow={(wId, folder) =>
              openWindow(wId, folder as ExplorerFolderId | undefined)
            }
          />
        </AeroWindow>

        <AeroWindow
          id="about"
          title={windows.about.title}
          icon={getWindowIcon("about")}
          isOpen={windows.about.isOpen}
          isMinimized={windows.about.isMinimized}
          isMaximized={windows.about.isMaximized}
          isFocused={focusedWindowId === "about"}
          zIndex={windows.about.zIndex}
          defaultPosition={windows.about.defaultPosition}
          defaultSize={windows.about.defaultSize}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onToggleMaximize={toggleMaximizeWindow}
          onFocus={() => bringToFront("about")}
          onTitleBarContextMenu={handleTitleBarContextMenu}
        >
          <SystemPropertiesWindow
            onOpenExplorerFolder={(folder) => openWindow("explorer", folder)}
            onOpenResume={() => openWindow("resume")}
          />
        </AeroWindow>

        <AeroWindow
          id="contact"
          title={windows.contact.title}
          icon={getWindowIcon("contact")}
          isOpen={windows.contact.isOpen}
          isMinimized={windows.contact.isMinimized}
          isMaximized={windows.contact.isMaximized}
          isFocused={focusedWindowId === "contact"}
          zIndex={windows.contact.zIndex}
          defaultPosition={windows.contact.defaultPosition}
          defaultSize={windows.contact.defaultSize}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onToggleMaximize={toggleMaximizeWindow}
          onFocus={() => bringToFront("contact")}
          onTitleBarContextMenu={handleTitleBarContextMenu}
        >
          <ContactMailWindow onOpenBrowser={(site) => openBrowser(site)} />
        </AeroWindow>

        <AeroWindow
          id="resume"
          title={windows.resume.title}
          icon={getWindowIcon("resume")}
          isOpen={windows.resume.isOpen}
          isMinimized={windows.resume.isMinimized}
          isMaximized={windows.resume.isMaximized}
          isFocused={focusedWindowId === "resume"}
          zIndex={windows.resume.zIndex}
          defaultPosition={windows.resume.defaultPosition}
          defaultSize={windows.resume.defaultSize}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onToggleMaximize={toggleMaximizeWindow}
          onFocus={() => bringToFront("resume")}
          onTitleBarContextMenu={handleTitleBarContextMenu}
        >
          <WordPadResumeWindow onOpenBrowser={(site) => openBrowser(site)} />
        </AeroWindow>

        <AeroWindow
          id="ie"
          title={windows.ie.title}
          icon={getWindowIcon("ie")}
          isOpen={windows.ie.isOpen}
          isMinimized={windows.ie.isMinimized}
          isMaximized={windows.ie.isMaximized}
          isFocused={focusedWindowId === "ie"}
          zIndex={windows.ie.zIndex}
          defaultPosition={windows.ie.defaultPosition}
          defaultSize={windows.ie.defaultSize}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onToggleMaximize={toggleMaximizeWindow}
          onFocus={() => bringToFront("ie")}
          onTitleBarContextMenu={handleTitleBarContextMenu}
        >
          <InternetExplorerWindow
            key={ieKey}
            initialSite={ieSite}
            onOpenWindow={(wId) => openWindow(wId)}
          />
        </AeroWindow>

        <AeroWindow
          id="personalize"
          title={windows.personalize.title}
          icon={getWindowIcon("personalize")}
          isOpen={windows.personalize.isOpen}
          isMinimized={windows.personalize.isMinimized}
          isMaximized={windows.personalize.isMaximized}
          isFocused={focusedWindowId === "personalize"}
          zIndex={windows.personalize.zIndex}
          defaultPosition={windows.personalize.defaultPosition}
          defaultSize={windows.personalize.defaultSize}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onToggleMaximize={toggleMaximizeWindow}
          onFocus={() => bringToFront("personalize")}
          onTitleBarContextMenu={handleTitleBarContextMenu}
        >
          <PersonalizeWindow
            activeTheme={activeTheme}
            onSelectTheme={(t) => setActiveTheme(t)}
            showGadgets={showGadgets}
            onToggleGadgets={() => setShowGadgets((v) => !v)}
            onOpenSystemProps={() => openWindow("about")}
          />
        </AeroWindow>

        {/* Windows 7 Properties Modal Dialog */}
        <PropertiesModal
          item={propertiesInfo}
          onClose={() => setPropertiesInfo(null)}
        />

        {/* Windows 7 Right-Click Context Menu */}
        {contextMenu && (
          <Win7ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            items={contextMenu.items}
            onClose={() => setContextMenu(null)}
          />
        )}

        {/* Authentic Windows 7 Start Menu */}
        <StartMenu
          isOpen={isStartOpen}
          currentUser={currentUser}
          onClose={() => setIsStartOpen(false)}
          onOpenWindow={(wId, folder) => openWindow(wId, folder)}
          onOpenBrowser={(site) => openBrowser(site)}
          onSwitchUser={handleSwitchUser}
        />

        {/* Windows 7 Aero Glass Superbar Taskbar */}
        <Taskbar
          windows={taskbarItems}
          isStartOpen={isStartOpen}
          onToggleStart={() => {
            playWin7Sound("nav", 0.5);
            setContextMenu(null);
            setIsStartOpen((prev) => !prev);
          }}
          onTaskbarAppClick={handleTaskbarAppClick}
          onOpenBrowser={(site) => openBrowser(site)}
          onShowDesktop={handleShowDesktop}
          onTaskbarContextMenu={handleTaskbarContextMenu}
        />
      </div>
    </>
  );
}
