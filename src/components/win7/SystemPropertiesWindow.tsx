"use client";

import React from "react";
import { PROFILE, SKILLS, EDUCATION } from "@/data/portfolioData";
import { Win7ComputerIcon, Win7BrainChipIcon, Win7PdfIcon } from "./Win7Icons";

interface SystemPropertiesWindowProps {
  onOpenExplorerFolder?: (folder: "projects" | "skills" | "education") => void;
  onOpenResume?: () => void;
}

export default function SystemPropertiesWindow({
  onOpenExplorerFolder,
  onOpenResume,
}: SystemPropertiesWindowProps) {
  return (
    <div className="flex flex-col h-full w-full bg-[#FFFFFF] text-[12px] font-sans overflow-hidden">
      {/* Control Panel Address Bar */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-b from-[#F4F8FC] to-[#DCE8F5] border-b border-[#AABCCF] text-[#1E395B] text-[11.5px]">
        <Win7ComputerIcon className="w-4 h-4 shrink-0" />
        <span className="truncate">
          Control Panel &gt; System and Security &gt; <strong>System</strong>
        </span>
      </div>

      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* Left Control Panel Sidebar */}
        <aside className="w-44 sm:w-52 bg-gradient-to-b from-[#EAF3FC] via-[#DCEBFA] to-[#CBE0F5] border-r border-[#B6CBE0] p-3 flex flex-col justify-between shrink-0 select-none">
          <div className="space-y-4">
            <div>
              <div className="font-semibold text-[#153961] mb-2 text-[12px]">
                Control Panel Home
              </div>
              <ul className="space-y-1.5 text-[11.5px] text-[#1C4B82]">
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenExplorerFolder?.("skills")}
                    className="hover:underline text-left flex items-center gap-1.5"
                  >
                    <span>• Device Manager (Skills)</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenExplorerFolder?.("projects")}
                    className="hover:underline text-left flex items-center gap-1.5"
                  >
                    <span>• Production Deployments</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenExplorerFolder?.("education")}
                    className="hover:underline text-left flex items-center gap-1.5"
                  >
                    <span>• Academic Credentials</span>
                  </button>
                </li>
              </ul>
            </div>

            <div className="pt-3 border-t border-[#B5CCE2]">
              <div className="font-semibold text-[#153961] mb-1.5 text-[11.5px]">
                See also
              </div>
              <button
                type="button"
                onClick={() => onOpenResume?.()}
                className="text-[11.5px] text-[#1C4B82] hover:underline flex items-center gap-1.5 text-left"
              >
                <Win7PdfIcon className="w-4 h-4 shrink-0" />
                <span>Open Resume.pdf (WordPad)</span>
              </button>
            </div>
          </div>

          <div className="text-[10.5px] text-[#3B5C7E]">
            Windows Experience Index: <strong>7.9 / 7.9</strong>
          </div>
        </aside>

        {/* Main System Summary Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-white">
          <div className="text-[#163A63] text-[13px] font-semibold border-b border-[#D8E4F0] pb-1.5">
            View basic information about your engineer
          </div>

          {/* Windows Edition Banner */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-[3px] bg-gradient-to-r from-[#F2F8FF] via-[#E6F2FE] to-[#F7FBFF] border border-[#C5DBF0]">
            <div className="flex items-center gap-3.5">
              <Win7BrainChipIcon className="w-12 h-12 shrink-0" />
              <div>
                <div className="text-[11px] uppercase tracking-wider text-[#396796] font-semibold">
                  Engineer Edition
                </div>
                <h2 className="text-[18px] font-bold text-[#103258]">
                  {PROFILE.name} — Ultimate Edition
                </h2>
                <p className="text-[12px] text-[#2B547E] font-medium">
                  {PROFILE.role} • Service Pack 1 (AI, Voice &amp; Fintech Systems)
                </p>
              </div>
            </div>

            {/* Windows Experience Index Badge */}
            <div className="flex items-center gap-2.5 bg-white px-3 py-2 rounded-[3px] border border-[#A6C4E2] shadow-2xs shrink-0">
              <div className="w-10 h-10 rounded-[3px] bg-gradient-to-b from-[#3E93E6] to-[#14559B] text-white font-bold text-[18px] flex items-center justify-center shadow-inner">
                7.9
              </div>
              <div className="text-[11px] leading-tight">
                <div className="font-semibold text-[#153961]">
                  Engineering Index
                </div>
                <div className="text-[#516A82]">5+ Years Production</div>
              </div>
            </div>
          </div>

          {/* System Specifications Table */}
          <div className="space-y-2">
            <h3 className="text-[12.5px] font-bold text-[#153961] border-b border-[#E3ECF5] pb-1">
              System &amp; Bio Summary
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-y-2 text-[12px] pt-1">
              <div className="sm:col-span-3 text-[#5A6E82]">Specialization:</div>
              <div className="sm:col-span-9 font-medium text-[#1E2E3E]">
                High-Concurrency Web, Mobile (Expo/Kotlin IME), Fintech Ledgers &amp; Voice AI Platforms
              </div>

              <div className="sm:col-span-3 text-[#5A6E82]">Experience Rating:</div>
              <div className="sm:col-span-9 font-medium text-[#1E2E3E]">
                5+ Years Production Full-Stack, Distributed BullMQ/Redis &amp; AI Systems Engineering
              </div>

              <div className="sm:col-span-3 text-[#5A6E82]">Location / Base:</div>
              <div className="sm:col-span-9 font-medium text-[#1E2E3E]">
                {PROFILE.location}
              </div>

              <div className="sm:col-span-3 text-[#5A6E82]">System Overview:</div>
              <div className="sm:col-span-9 text-[#2D3E50] leading-relaxed space-y-2">
                {PROFILE.aboutParagraphs.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Installed Technical Modules (Skills) */}
          <div className="space-y-2.5">
            <h3 className="text-[12.5px] font-bold text-[#153961] border-b border-[#E3ECF5] pb-1">
              Installed Hardware &amp; Software Competencies
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {SKILLS.map((cat) => (
                <div
                  key={cat.id}
                  className="p-3 rounded-[3px] bg-[#F8FBFE] border border-[#CFE0F0]"
                >
                  <div className="font-semibold text-[#163B63] mb-1.5 text-[12px]">
                    {cat.category}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.items.map((item) => (
                      <span
                        key={item}
                        className="px-2 py-0.5 bg-white border border-[#B0C9E2] rounded-[2px] text-[11px] font-mono text-[#1D4268]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="space-y-2.5">
            <h3 className="text-[12.5px] font-bold text-[#153961] border-b border-[#E3ECF5] pb-1">
              Academic Licensing &amp; Deep Learning Certifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {EDUCATION.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2.5 rounded-[3px] bg-[#F8FBFE] border border-[#CFE0F0]"
                >
                  <div>
                    <div className="font-semibold text-[#163B63]">{item.degree}</div>
                    <div className="text-[11px] text-[#526980]">
                      {item.institution} ({item.location})
                    </div>
                  </div>
                  <span className="text-[10.5px] font-mono px-2 py-0.5 bg-[#E3F0FC] text-[#174878] border border-[#A6C8EA] rounded-[2px] shrink-0">
                    {item.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
