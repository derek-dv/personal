"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

export interface PropertiesItemInfo {
  title: string;
  type: string;
  location: string;
  size: string;
  modified: string;
  description: string;
  tags?: string[];
  icon: React.ReactNode;
  onOpen?: () => void;
}

interface PropertiesModalProps {
  item: PropertiesItemInfo | null;
  onClose: () => void;
}

export default function PropertiesModal({
  item: info,
  onClose,
}: PropertiesModalProps) {
  const [tab, setTab] = useState<"general" | "details">("general");

  if (!info) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9998] bg-black/25 flex items-center justify-center p-4 select-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[370px] rounded-[7px] win7-aero-frame-active flex flex-col overflow-hidden text-[#1E1E1E] text-[12px] font-sans"
      >
        {/* Title Bar */}
        <div className="flex items-center justify-between h-[28px] px-2.5">
          <div className="flex items-center gap-1.5 min-w-0">
            <div className="w-4 h-4 shrink-0 flex items-center justify-center">
              {info.icon}
            </div>
            <span className="text-[12px] font-medium truncate win7-title-text">
              {info.title} Properties
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="win7-caption-btn win7-caption-btn-close flex items-center justify-center w-[36px] h-[19px] -mt-[4px] rounded-b-[4px]"
          >
            <X className="w-3.5 h-3.5 text-white" />
          </button>
        </div>

        {/* Client Body */}
        <div className="mx-[6px] mb-[6px] bg-[#F0F0F0] border border-[#556B82] rounded-[3px] p-3 flex flex-col gap-3">
          {/* Tabs: General | Shortcut / Details */}
          <div className="flex flex-col">
            <div className="flex items-center gap-0.5 pl-1 -mb-[1px] z-10">
              <button
                type="button"
                onClick={() => setTab("general")}
                className={`px-3 py-1 rounded-t-[3px] border text-[11.5px] ${
                  tab === "general"
                    ? "bg-white border-[#898C95] border-b-white font-medium"
                    : "bg-[#E4E6EA] border-[#898C95] text-[#444444]"
                }`}
              >
                General
              </button>
              <button
                type="button"
                onClick={() => setTab("details")}
                className={`px-3 py-1 rounded-t-[3px] border text-[11.5px] ${
                  tab === "details"
                    ? "bg-white border-[#898C95] border-b-white font-medium"
                    : "bg-[#E4E6EA] border-[#898C95] text-[#444444]"
                }`}
              >
                Details
              </button>
            </div>

            {/* White Tab Sheet */}
            <div className="bg-white border border-[#898C95] p-3.5 space-y-3 min-h-[250px]">
              {tab === "general" ? (
                <>
                  {/* Top Icon + Editable-style Name Input */}
                  <div className="flex items-center gap-3 pb-3 border-b border-[#D9D9D9]">
                    <div className="w-10 h-10 shrink-0 flex items-center justify-center">
                      {info.icon}
                    </div>
                    <input
                      type="text"
                      readOnly
                      value={info.title}
                      className="flex-1 px-2 py-1 border border-[#7F9DB9] rounded-[2px] text-[12px] font-medium text-[#1E1E1E] bg-white focus:outline-none"
                    />
                  </div>

                  {/* Metadata Rows */}
                  <div className="grid grid-cols-12 gap-y-2 text-[11.5px] pb-3 border-b border-[#D9D9D9]">
                    <div className="col-span-4 text-[#555555]">Type of file:</div>
                    <div className="col-span-8 text-[#1E1E1E]">{info.type}</div>

                    <div className="col-span-4 text-[#555555]">Description:</div>
                    <div className="col-span-8 text-[#1E1E1E] line-clamp-2">
                      {info.description}
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-y-2 text-[11.5px] pb-3 border-b border-[#D9D9D9]">
                    <div className="col-span-4 text-[#555555]">Location:</div>
                    <div className="col-span-8 font-mono text-[11px] text-[#1E1E1E] truncate">
                      {info.location}
                    </div>

                    <div className="col-span-4 text-[#555555]">Size:</div>
                    <div className="col-span-8 font-mono text-[11px] text-[#1E1E1E]">
                      {info.size}
                    </div>

                    <div className="col-span-4 text-[#555555]">Modified:</div>
                    <div className="col-span-8 font-mono text-[11px] text-[#1E1E1E]">
                      {info.modified}
                    </div>
                  </div>

                  {/* Attributes Checkboxes */}
                  <div className="grid grid-cols-12 items-center text-[11.5px]">
                    <div className="col-span-4 text-[#555555]">Attributes:</div>
                    <div className="col-span-8 flex items-center gap-4">
                      <label className="flex items-center gap-1.5">
                        <input type="checkbox" checked readOnly />
                        <span>Read-only</span>
                      </label>
                      <label className="flex items-center gap-1.5">
                        <input type="checkbox" disabled />
                        <span>Hidden</span>
                      </label>
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-2 text-[11.5px]">
                  <div className="font-semibold text-[#153961] border-b border-[#E0E0E0] pb-1">
                    Property / Value
                  </div>
                  <div className="grid grid-cols-12 gap-y-1.5">
                    <div className="col-span-4 text-[#555555]">Name</div>
                    <div className="col-span-8 font-medium">{info.title}</div>

                    <div className="col-span-4 text-[#555555]">Author</div>
                    <div className="col-span-8">Derek David</div>

                    <div className="col-span-4 text-[#555555]">Owner</div>
                    <div className="col-span-8">DEREK-PC\DerekDavid</div>

                    <div className="col-span-4 text-[#555555]">Computer</div>
                    <div className="col-span-8">DEREK-PC (Windows 7 Ultimate)</div>
                  </div>
                  <div className="pt-2 border-t border-[#E0E0E0] text-[#333333] leading-relaxed">
                    {info.description}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Dialog Bottom Action Buttons: Open | OK | Cancel */}
          <div className="flex items-center justify-end gap-2">
            {info.onOpen && (
              <button
                type="button"
                onClick={() => {
                  info.onOpen?.();
                  onClose();
                }}
                className="win7-btn px-4 py-1 rounded-[3px] text-[11.5px] font-semibold text-[#153961]"
              >
                Open
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="win7-btn px-5 py-1 rounded-[3px] text-[11.5px] font-medium text-[#1E1E1E]"
            >
              OK
            </button>
            <button
              type="button"
              onClick={onClose}
              className="win7-btn px-4 py-1 rounded-[3px] text-[11.5px] text-[#1E1E1E]"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
