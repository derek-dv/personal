"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronRight, Check } from "lucide-react";

export interface Win7MenuItem {
  id: string;
  label?: string;
  shortcut?: string;
  icon?: React.ReactNode;
  checked?: boolean;
  disabled?: boolean;
  bold?: boolean;
  divider?: boolean;
  onClick?: () => void;
  action?: () => void;
  submenu?: Win7MenuItem[];
}

interface Win7ContextMenuProps {
  x: number;
  y: number;
  items: Win7MenuItem[];
  onClose: () => void;
}

export default function Win7ContextMenu({
  x,
  y,
  items,
  onClose,
}: Win7ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Clamp coordinates so menu stays inside viewport
  const menuWidth = 225;
  const estimatedHeight = items.length * 26 + 16;
  const clampedX =
    typeof window !== "undefined"
      ? Math.min(x, window.innerWidth - menuWidth - 8)
      : x;
  const clampedY =
    typeof window !== "undefined"
      ? Math.min(y, window.innerHeight - estimatedHeight - 48)
      : y;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      style={{ top: Math.max(4, clampedY), left: Math.max(4, clampedX) }}
      onClick={(e) => e.stopPropagation()}
      onContextMenu={(e) => e.preventDefault()}
      className="fixed z-[10000] w-[225px] py-[3px] px-[2px] bg-[#F0F0F0] border border-[#979797] rounded-[2px] shadow-[2px_3px_10px_rgba(0,0,0,0.45)] select-none text-[12px] text-[#1E1E1E] font-sans"
    >
      {/* Vertical Icon Gutter Line (Classic Windows 7 Menu Left Gutter) */}
      <div className="pointer-events-none absolute top-[2px] bottom-[2px] left-[28px] w-[1px] bg-[#E2E3E3] border-r border-white" />

      {items.map((item) => {
        if (item.divider) {
          return (
            <div
              key={item.id}
              className="my-[3px] ml-[30px] mr-[2px] h-[1px] bg-[#E0E0E0] border-b border-white"
            />
          );
        }

        const isHovered = hoveredId === item.id;
        const hasSubmenu = Boolean(item.submenu && item.submenu.length > 0);

        return (
          <div
            key={item.id}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="relative"
          >
            <button
              type="button"
              disabled={item.disabled}
              onClick={() => {
                if (item.disabled || hasSubmenu) return;
                item.onClick?.();
                item.action?.();
                onClose();
              }}
              className={`w-full flex items-center justify-between h-[24px] px-1.5 rounded-[2px] text-left transition-colors ${
                item.disabled
                  ? "opacity-45 cursor-default"
                  : isHovered
                  ? "bg-gradient-to-b from-[#EDF5FD] to-[#D9EAFB] border border-[#7DA2CE] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]"
                  : "border border-transparent"
              }`}
            >
              {/* Left Gutter Icon / Checkmark */}
              <div className="flex items-center min-w-0 flex-1">
                <div className="w-[24px] h-[20px] flex items-center justify-center shrink-0 mr-2">
                  {item.checked ? (
                    <span className="w-[18px] h-[18px] rounded-[2px] bg-[#D5E8FA] border border-[#7DA2CE] flex items-center justify-center">
                      <Check className="w-3 h-3 text-[#153961]" />
                    </span>
                  ) : (
                    item.icon || null
                  )}
                </div>

                {/* Label */}
                <span
                  className={`truncate ${
                    item.bold ? "font-bold text-[#0F2742]" : "font-normal"
                  }`}
                >
                  {item.label}
                </span>
              </div>

              {/* Right Shortcut or Submenu Arrow */}
              <div className="flex items-center gap-1 pl-2 shrink-0">
                {item.shortcut && (
                  <span className="text-[11px] text-[#5F6A75]">
                    {item.shortcut}
                  </span>
                )}
                {hasSubmenu && (
                  <ChevronRight className="w-3.5 h-3.5 text-[#333333]" />
                )}
              </div>
            </button>

            {/* Flyout Submenu */}
            {hasSubmenu && isHovered && item.submenu && (
              <div
                style={{
                  left:
                    typeof window !== "undefined" &&
                    clampedX + menuWidth * 2 > window.innerWidth
                      ? -menuWidth + 4
                      : menuWidth - 4,
                  top: -3,
                }}
                className="absolute z-[10010] w-[215px] py-[3px] px-[2px] bg-[#F0F0F0] border border-[#979797] rounded-[2px] shadow-[2px_3px_10px_rgba(0,0,0,0.45)]"
              >
                <div className="pointer-events-none absolute top-[2px] bottom-[2px] left-[28px] w-[1px] bg-[#E2E3E3] border-r border-white" />
                {item.submenu.map((sub) => {
                  if (sub.divider) {
                    return (
                      <div
                        key={sub.id}
                        className="my-[3px] ml-[30px] mr-[2px] h-[1px] bg-[#E0E0E0] border-b border-white"
                      />
                    );
                  }
                  return (
                    <button
                      key={sub.id}
                      type="button"
                      disabled={sub.disabled}
                      onClick={() => {
                        if (sub.disabled) return;
                        sub.onClick?.();
                        sub.action?.();
                        onClose();
                      }}
                      className="w-full flex items-center justify-between h-[24px] px-1.5 rounded-[2px] text-left border border-transparent hover:bg-gradient-to-b hover:from-[#EDF5FD] hover:to-[#D9EAFB] hover:border-[#7DA2CE]"
                    >
                      <div className="flex items-center min-w-0 flex-1">
                        <div className="w-[24px] h-[20px] flex items-center justify-center shrink-0 mr-2">
                          {sub.checked ? (
                            <span className="w-[18px] h-[18px] rounded-[2px] bg-[#D5E8FA] border border-[#7DA2CE] flex items-center justify-center">
                              <Check className="w-3 h-3 text-[#153961]" />
                            </span>
                          ) : (
                            sub.icon || null
                          )}
                        </div>
                        <span
                          className={`truncate ${
                            sub.bold ? "font-bold text-[#0F2742]" : "font-normal"
                          }`}
                        >
                          {sub.label}
                        </span>
                      </div>
                      {sub.shortcut && (
                        <span className="text-[11px] text-[#5F6A75] pl-2">
                          {sub.shortcut}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
