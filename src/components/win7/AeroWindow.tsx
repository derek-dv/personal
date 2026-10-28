"use client";

import React, { useState, useRef, useEffect } from "react";

export interface AeroWindowProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  isFocused: boolean;
  zIndex: number;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onToggleMaximize: (id: string) => void;
  onFocus: (id: string) => void;
  onTitleBarContextMenu?: (e: React.MouseEvent, id: string) => void;
  children: React.ReactNode;
}

export default function AeroWindow({
  id,
  title,
  icon,
  isOpen,
  isMinimized,
  isMaximized,
  isFocused,
  zIndex,
  defaultPosition = { x: 80, y: 40 },
  defaultSize = { width: 860, height: 560 },
  onClose,
  onMinimize,
  onToggleMaximize,
  onFocus,
  onTitleBarContextMenu,
  children,
}: AeroWindowProps) {
  const [pos, setPos] = useState(defaultPosition);
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const nextX = Math.max(0, Math.min(window.innerWidth - 180, e.clientX - dragOffset.current.x));
      const nextY = Math.max(0, Math.min(window.innerHeight - 80, e.clientY - dragOffset.current.y));
      setPos({ x: nextX, y: nextY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  if (!isOpen || isMinimized) return null;

  const handleTitleBarMouseDown = (e: React.MouseEvent) => {
    onFocus(id);
    if (isMaximized) return;
    // Ignore clicks on window control buttons
    if ((e.target as HTMLElement).closest("button")) return;
    setIsDragging(true);
    dragOffset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };
  };

  const windowStyle: React.CSSProperties = isMaximized
    ? {
        top: 0,
        left: 0,
        width: "100vw",
        height: "calc(100vh - 44px)",
        zIndex,
        borderRadius: 0,
      }
    : {
        top: pos.y,
        left: pos.x,
        width: `min(${defaultSize.width}px, calc(100vw - 16px))`,
        height: `min(${defaultSize.height}px, calc(100vh - 64px))`,
        zIndex,
      };

  return (
    <div
      onMouseDown={() => onFocus(id)}
      style={windowStyle}
      className={`fixed flex flex-col select-none transition-shadow duration-150 ${
        isMaximized ? "" : "rounded-[7px]"
      } ${
        isFocused
          ? "win7-aero-frame-active"
          : "win7-aero-frame-inactive"
      }`}
    >
      {/* Aero Glass Title Bar */}
      <div
        onMouseDown={handleTitleBarMouseDown}
        onDoubleClick={() => onToggleMaximize(id)}
        onContextMenu={(e) => {
          if (onTitleBarContextMenu) {
            e.preventDefault();
            e.stopPropagation();
            onFocus(id);
            onTitleBarContextMenu(e, id);
          }
        }}
        className="relative flex items-center justify-between h-[30px] px-2.5 cursor-default shrink-0"
      >
        {/* Title & Icon */}
        <div className="flex items-center gap-2 min-w-0 pr-2">
          <div className="w-4 h-4 shrink-0 flex items-center justify-center drop-shadow">
            {icon}
          </div>
          <span className="text-[12.5px] font-medium truncate win7-title-text">
            {title}
          </span>
        </div>

        {/* Top-Right Aero Window Controls (Min / Max / Close) */}
        <div className="flex items-start -mt-[5px] mr-[1px] shrink-0">
          {/* Minimize */}
          <button
            type="button"
            title="Minimize"
            onClick={(e) => {
              e.stopPropagation();
              onMinimize(id);
            }}
            className="win7-caption-btn win7-caption-btn-left flex items-center justify-center w-[29px] h-[20px]"
          >
            <span className="w-[9px] h-[2px] bg-white shadow-[0_1px_1px_rgba(0,0,0,0.7)] translate-y-[3px]" />
          </button>

          {/* Maximize / Restore */}
          <button
            type="button"
            title={isMaximized ? "Restore Down" : "Maximize"}
            onClick={(e) => {
              e.stopPropagation();
              onToggleMaximize(id);
            }}
            className="win7-caption-btn win7-caption-btn-mid flex items-center justify-center w-[27px] h-[20px]"
          >
            <span className="w-[10px] h-[8px] border-[1.8px] border-white shadow-[0_1px_1px_rgba(0,0,0,0.7)]" />
          </button>

          {/* Close (Red Glow) */}
          <button
            type="button"
            title="Close"
            onClick={(e) => {
              e.stopPropagation();
              onClose(id);
            }}
            className="win7-caption-btn win7-caption-btn-close flex items-center justify-center w-[45px] h-[20px]"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
              <path
                d="M1.5 1.5L8.5 8.5M8.5 1.5L1.5 8.5"
                stroke="#FFFFFF"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Inner Client Area */}
      <div className="flex-1 flex flex-col min-h-0 mx-[6px] mb-[6px] bg-[#F0F4F9] rounded-[3px] border border-[#556B82] shadow-inner overflow-hidden text-[#1E1E1E] select-text">
        {children}
      </div>
    </div>
  );
}
